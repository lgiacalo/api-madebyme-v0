import mysql from 'mysql';
import fs from 'fs';
import { sleep } from '../utils/utils.js';
import { parse as parseUrl } from 'url';

export default class DbManager {
    /**
     * @param {string | object} connect
     * Connection depuis une chaîne de caractere mysql://.....
     * Ou depuis un objet { url: 'mysql://...', options: { mysqlOptions }}
     */
    constructor(connect, keepNullValue = false, usePool = true, waitAfterInsert = null, options = {}) {
        connect = typeof connect === 'object' ? {
            ...connect.options,
            ...this.parseMyslUrl(connect.url),
        } : connect;
        if (usePool) {
            this.pool = mysql.createPool(connect);
        } else {
            this.pool = mysql.createConnection(connect);
            this.pool.connect();
        }

        this.useCoalesce = keepNullValue;
        this.waitAfterInsert = waitAfterInsert;
        this.clearOnError = options.clearOnError || false;

        this.array = [];
        this.count = 0;
        this.savedBunkInsertionColumns = null;
        this.savedBunkDeletionColumns = null;
        this.savedBunkInsertionTable = null;
        this.savedBunkDeletionTable = null;

        this.updates = {};
        this.functionMySQLWithoutParams = ['NOW()', 'CURRENT_TIMESTAMP', 'CURRENT_TIMESTAMP()'];
    }

    parseMyslUrl(adresse) {
        // ne gère pas l'objet query car pour l'instant on ne s'en sert pas
        const url = parseUrl(adresse, true);
        const auth = url.auth.split(':');
        return {
            host: url.hostname,
            port: url.port,
            database: url.pathname.substr(1),
            user: auth.shift(),
            password: auth.join(':'),
        }
    }

    close() {
        this.pool.end();
    }

    async insert(table, data) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connect) => {
                if (err) {
                    fs.appendFileSync('cache/errors/sql-errors.log', JSON.stringify(err) + '\n');
                    console.error('Erreur SQL (voir logs)');
                    return reject(err);
                }
                connect.query(`INSERT INTO ${table} SET ?`, data, function(error, results, fields) {
                    if (error) {
                        fs.appendFileSync('cache/errors/sql-errors.log', JSON.stringify(error) + '\n');
                        console.error('Erreur SQL (voir logs)');
                        reject(error);
                    }
                    resolve(results);
                });
                connect.release();
                // resolve();
            });
        });
    }

    async insertObject(table, object, update = false) {
        return this.insertArray(table, Object.keys(object), Object.values(object), update);
    }

    abstractArray(table, columns, array, update = false, queryType = '') {
        let query = null;
        let keysUpdate = '';
        // console.log('columns: ', columns, typeof(columns));
        
        let keys = columns.replace(/\s/g, '').replace(/`/g, '').split(',');
        
        // let keys = typeof(columns) === 'string' ? columns.replace(/\s/g, '').replace(/`/g, '').split(',') : columns;

        if (queryType === 'insert') {
            console.log(`Inserting ${array.length} lines in MySQL`);

            for (const key of keys) {
                if (this.ignoredKeysWhenUpdate?.includes(key)) { // Pour le sirene-importer
                    continue;
                }
                keysUpdate = this.useCoalesce ? keysUpdate.concat(`${key} = COALESCE(VALUES(${key}), ${key}), `) : keysUpdate.concat(`${key} = VALUES(${key}), `) ;
            }

            if (update) {
                query = `INSERT INTO ${table} (${columns}) VALUES ?  ON DUPLICATE KEY UPDATE ${keysUpdate.slice(0, keysUpdate.length - 2)}`;
            } else {
                query = `INSERT INTO ${table} (${columns}) VALUES ?`;
            }
            return this.generatePromise(query, array);
        } else if (queryType === 'delete') {
            console.log(`Deleting ${array.length} lines in MySQL`);
            query = `DELETE FROM ${table} WHERE (${columns}) IN ( ? )`; 
            return this.generatePromise(query, array);
        }
    }

    async insertArray(table, columns, array, update = false) {
        return this.abstractArray(table, columns, array, update, 'insert');
    }

    async deleteArray(table, columns, array) {
        return this.abstractArray(table, columns, array, false, 'delete');
    }

    async abstractBunk(table, object, length, update = false , insert = false){
        const data = [];
        this.array.push(data);
        for (const key in object) {
            data.push(object[key]);
        }       
        object = Object.keys(object).join(',');
        
        const condition = insert ? this.savedBunkInsertionTable && this.savedBunkInsertionTable !== table : this.savedBunkDeletionTable && this.savedBunkDeletionTable !== table;
        if (condition) {
            insert ? await this.triggerBunkInsertion(this.savedBunkInsertionTable, this.savedBunkInsertionColumns, update) : await this.triggerBunkDeletion(this.savedBunkDeletionTable, this.savedBunkDeletionColumns, update);
        }

        insert ? this.savedBunkInsertionTable = table : this.savedBunkDeletionTable = table;
        insert ? this.savedBunkInsertionColumns = object : this.savedBunkDeletionColumns = object;

        this.count++;
        if (this.count >= length) {
            insert ? await this.triggerBunkInsertion(this.savedBunkInsertionTable, object, update) : await this.triggerBunkDeletion(this.savedBunkDeletionTable, object);
            if (this.waitAfterInsert) {
                console.log(`Attente de ${this.waitAfterInsert} millisecondes`);
                await sleep(this.waitAfterInsert);
            }
        }
    }

    async abstractTriggerBunk(table, columns = null, update = false, insert = false) {
        if (!this.count > 0) {
            return;
        }
        insert ? await this.insertArray(table, columns || this.savedBunkInsertionColumns, this.array, update) : await this.deleteArray(table, columns || this.savedBunkDeletionColumns, this.array);
        this.count = 0;
        this.array = [];
    }

    async insertAsBunk(table, object, length, update = false) {
        await this.abstractBunk(table, object, length, update, true);
    }

    async deleteAsBunk(table, columns, length) {
        await this.abstractBunk(table, columns, length);
    }

    async triggerBunkInsertion(table, columns = null, update = false) {
        return this.abstractTriggerBunk(table, columns, update, true);
    }

    async triggerBunkDeletion(table, columns = null) {
        return this.abstractTriggerBunk(table, columns);
    }



    async triggerBulkUpdate(table = null) {
        const hashes = Object.keys(this.updates).filter((hash) => !table || this.updates[hash].table === table);
        const promises = [];

        for (let hash of hashes) {
            promises.push(this.executeUpdateBulk(hash));
        }

        return Promise.all(promises);
    }

    async executeUpdateBulk(hash) {
        const { table, set, where, count } = this.updates[hash];
        delete this.updates[hash];

        for (let key in set) {
            this.functionMySQLWithoutParams.includes(set[key]) && (set[key] = mysql.raw(set[key]));
        }

        const entriesWhere = Object.entries(where);
        const query = `UPDATE ${table} SET ? WHERE ${entriesWhere.map(([key, _]) => `${key} in (?)`).join(' AND ')};`;

        console.log(`Updating in MySQL on ${count} WHERE`);
        return this.generatePromise(query, [set, ...entriesWhere.map(([_, val]) => val)], true);
    }
    
    async truncate(table) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connect) => {
                if (err) {
                    fs.appendFileSync('cache/errors/sql-errors.log', JSON.stringify(err) + '\n');
                    console.error('Erreur SQL (voir logs)');
                    return reject(err);
                }
                connect.query(`TRUNCATE TABLE ${table}`, [], function(error, results, fields) {
                    if (error) return console.log('ERROR', error);
                    resolve();
                });
                connect.release();
            });
        });
    }

    async query2(query, data) {
        return this.query(query, data);
    }

    async query(query, data, returnFirst = false) {
        return new Promise((resolve, reject) => {
            this.pool.query(query, data, (error, results) => {
                if (error) {
                    return reject(error);
                }
                if (returnFirst) {
                    return resolve(results[0]);
                }
                resolve(results);
            });
        });
    }


    async generatePromise(query, array, isArray = false) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connect) => {
                if (err) {
                    fs.appendFileSync('cache/errors/sql-errors.log', JSON.stringify(err) + '\n');
                    console.error('Erreur SQL (voir logs)');
                    return reject(err);
                }
                connect.query(query, (Array.isArray(array) && isArray) ? array : [array], (error, results, fields) => {
                    if (error) {
                        fs.appendFileSync('cache/errors/sql-errors.log', JSON.stringify(error) + '\n');
                        console.error('Erreur SQL (voir logs)');
                        if (this.clearOnError) {
                            this.clearManagerOnErrorLine();
                        }
                        connect.release();
                        return reject(error);
                    }
                    connect.release();
                    return resolve();
                });
            });
        });
    }

    clearManagerOnErrorLine() {
        this.array = [];
        this.count = 0;
    }


// import stream from 'stream';
// import Crypto from 'crypto';

    // async queryAsStream (query, data, rowCallback) {
    //     return new Promise((resolve, reject) => {
    //         this.pool.query(query, data)
    //             .on('error', error => reject(error))
    //             .stream()
    //             .pipe(new stream.Transform({
    //                 objectMode: true,
    //                 transform: rowCallback
    //             }))
    //             .on('finish', () => {
    //                 resolve();
    //             })
    //             .on('error', e => {
    //                 reject(e);
    //             });
    //     });
    // }


    // async updateAsBulk(table, objSet, objWhere, length) {
    //     const hash = this.getHashUpdate(table, objSet, objWhere);

    //     if (!this.updates[hash]) {
    //         this.updates[hash] = {
    //             table,
    //             set: JSON.parse(JSON.stringify(objSet)),
    //             where: JSON.parse(JSON.stringify(objWhere)),
    //             count: 0,
    //         };
    //     } else {
    //         for (let key in objWhere) {
    //             this.updates[hash].where[key] = [this.updates[hash].where[key], JSON.parse(JSON.stringify(objWhere[key]))].flat();
    //         }
    //     }

    //     this.updates[hash].count += Math.max(...Object.values(objWhere).map(x => (x && Array.isArray(x)) ? x.length : 1));
    //     if (this.updates[hash].count >= length) {
    //         return await this.executeUpdateBulk(hash);
    //     }
    // }

    // getHashUpdate(table, objSet, objWhere = {}) {
    //     const objSetSort = Object.fromEntries(Object.entries(objSet).sort((a, b) => a[0].localeCompare(b[0])));
    //     const keyWhereSort = Object.keys(objWhere).sort();

    //     const hash = Crypto.createHash('sha256');
    //     const stringHash = JSON.stringify({ table, set: objSetSort, where: keyWhereSort });
    //     hash.update(stringHash);

    //     return hash.digest('hex');
    // }
}
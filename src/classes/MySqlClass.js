import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import { createClient } from '@typeform/api-client';
import DbManager from '../classes/DbManager.js';
import { getObjetUser, getObjetShop, getObjetProduct } from '../utils/fieldsDB.js';

const dbManager = new DbManager(process.env.MYSQL_URL);
const typeformAPI = createClient({ token: process.env.TOKEN_TYPEFORM });


class MySqlClass {

    constructor() {
        this.tables = {
            user: 'user',
            shop: 'shop',
            product: 'product',
            typeform: 'typeform'
        };
    }

    // SAVE
    async saveMetaShop(data, alreadySave = false) {
        const answers = data.form_response.answers;

        try {
            const user = await this.saveUser(answers);
            const shop = await this.saveShopUser(answers, user.id_user);
            const products = await this.saveProductsShop(answers, user.id_user, shop.id_shop);

            let form_meta = null;
            if (!alreadySave) {
                form_meta = await this.saveTypeform(data, {
                    id_user: user.id_user,
                    id_shop: shop.id_shop,
                    name: data.form_response.definition.title,
                    uid_form: data.form_response.form_id,
                    type: 'response_meta',
                });
            }

            console.log(`Enregistrement d'une nouvelle boutique par ${user.email}`);
            return { user, shop, products, form_meta };
        } catch (err) {
            console.error("Error saveMetaShop() - Erreur lors de la gestion d'un nouveau metashop :", { err, data });
            fs.appendFileSync('cache/errors/saveMetaShop-errors.log', JSON.stringify({ err, data }, null, 4) + '\n');
            return null;
        }
    }

    async saveNewOrderFromShop(raw) {
        try {
            // Recuperation des infos du shop
            const shop = await this.getShop({ uid_shop: raw.form_response.form_id });

            // Recuperation des infos de l'utilisateur
            const user = await this.getUser({ id_user: shop.id_user });

            // Enregistrement de la response
            const response_shop = await this.saveTypeform(raw, {
                id_user: user.id_user,
                id_shop: shop.id_shop,
                name: shop.name,
                type: 'response_shop',
                uid_form: shop.uid_shop,
                url_form: shop.url_shop
            });

            console.log(`Nouvelle commande de ${raw.form_response.answers.find(ans => ans.field.ref === 'email_address_customer').email} pour la boutique ${shop.name} (${shop.url_shop})`);
            // TODO: DEV: ajouter l'enregistrement des commandes
            return { user, shop, response_shop };

        } catch (err) {
            console.error("Error saveNewOrderFromShop() - Erreur lors de l'enregistrement d'un submit shop :", { err, infos: raw });
            fs.appendFileSync('cache/errors/saveNewOrderFromShop-errors.log', JSON.stringify({ err, infos: raw }, null, 4) + '\n');
            return null;
        }
    }


    // UPDATE
    async updateShopUrl(id_shop, uid_shop, url_shop) {
        await dbManager.query2(`UPDATE shop SET uid_shop = ?, url_shop = ? WHERE id_shop = ?`, [uid_shop, url_shop, id_shop]);
    }

    // INSERT Tables
    async saveTypeform(raw, infos) {
        const { insertId } = await dbManager.insert(this.tables.typeform, { ...infos, raw: JSON.stringify(raw) });
        return { id_typeform: insertId, ...infos, raw };
    }

    async saveUser(answers) {
        const user = getObjetUser(answers);
        // TODO: CHECK: ajouter verification du formatage de l'email

        if (!Object.keys(user).length) {
            throw new Error('Error: pas de donnée user');
        }

        const { insertId } = await dbManager.insert(this.tables.user, user);
        user.id_user = insertId;

        return user;
    }

    async saveShopUser(answers, id_user) {
        const shop = getObjetShop(answers);

        if (!Object.keys(shop).length) {
            throw new Error('Error: pas de donnée shop');
        }

        const { insertId } = await dbManager.insert(this.tables.shop, { id_user, ...shop });
        shop.id_user = id_user;
        shop.id_shop = insertId;

        return shop;
    }

    async saveProductsShop(answers, id_user, id_shop) {
        const len = answers.find(answer => answer.field.ref === 'number_products').number;
        if (!len) {
            throw new Error('Error: pas de donnée product');
        }

        const products = [];
        for (let i = 1;i <= len;i += 1) {
            // TODO: CHECK: retour getObjectProduct
            const product = { id_shop, id_user, ...getObjetProduct(answers, i) };

            // Enregistrement de la photo, recuperation de son url
            if (product.picture_api_url) {
                const picture = await typeformAPI.images.add({ url: product.picture_api_url });
                product.picture_typeform_url = picture.src;
            }

            await dbManager.insertAsBunk(this.tables.product, product, len);

            products.push(product);
        }
        return products;
    }


    // SELECT
    async getUser(whereData) {
        const field = Object.keys(whereData)[0];
        let sqlRequest = `SELECT * FROM ${this.tables.user} where ${field} = ?`;

        const resultats = await dbManager.query2(sqlRequest, [whereData[field]]);
        if (resultats.length !== 1) {
            throw new Error(`Error: Recherche ${this.tables.shop}(${field} = ${whereData[field]}), ${resultats.length} resultat: `);
        }

        return resultats[0];
    }

    async getShop(whereData) {
        const field = Object.keys(whereData)[0];
        let sqlRequest = `SELECT * FROM ${this.tables.shop} where ${field} = ?`;

        const resultats = await dbManager.query2(sqlRequest, [whereData[field]]);
        if (resultats.length !== 1) {
            throw new Error(`Error: Recherche ${this.tables.shop}(${field} = ${whereData[field]}), ${resultats.length} resultat: `);
        }

        return resultats[0];
    }


}

export default new MySqlClass();
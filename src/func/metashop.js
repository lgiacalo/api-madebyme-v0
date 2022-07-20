import dotenv from 'dotenv';
import fs from 'fs';
import { createClient } from '@typeform/api-client'
import DbManager from '../connexions/DbManager.js';
import { getObjetUser, getObjetShop, getObjetProduct } from '../utils/fieldsDB.js';
dotenv.config();

const typeformAPI = createClient({ token: process.env.TOKEN_TYPEFORM });
const dbManager = new DbManager(process.env.MYSQL_URL);

// Default link typeform:  https://mabyme-shops.typeform.com/to/{uid}

export async function saveInfoMetaShopDB(data, alreadySave = false) {
    const answers = data.form_response.answers;

    try {
        const user = await saveUser(answers);
        const shop = await saveShopUser(answers, user.id_user);
        const products = await saveProductsShop(answers, user.id_user, shop.id_shop);

        let form_meta = null
        if (!alreadySave) {
            form_meta = await saveTypeform(data, {
                id_user: user.id_user,
                id_shop: shop.id_shop,
                name: data.form_response.definition.title,
                uid_form: data.form_response.form_id,
                type: 'response_meta',
            })
        }

        return { user, shop, products, form_meta };
    } catch (err) {
        console.log("Error metashop.js - Erreur lors de la gestion d'un nouveau metashop :", { err, data });
        fs.appendFileSync('cache/errors/metashop-errors.log', JSON.stringify({ err, data }, null , 4) + '\n');
        return null;
    }
}

export async function saveTypeform(raw, infos) {
    const { insertId } = await dbManager.insert('typeform', { ...infos, raw: JSON.stringify(raw) });
    return { id_typeform: insertId, ...infos, raw };
}

async function saveUser(answers) {
    const user = getObjetUser(answers);
    // TODO: CHECK: ajouter verification du formatage de l'email

    if (!Object.keys(user).length) {
        throw new Error('Error: pas de donnée user');
    }

    const { insertId } = await dbManager.insert('user', user);
    user.id_user = insertId;

    return user;
}


async function saveShopUser(answers, id_user) {
    const shop = getObjetShop(answers);

    if (!Object.keys(shop).length) {
        throw new Error('Error: pas de donnée shop');
    }

    const { insertId } = await dbManager.insert('shop', { id_user, ...shop });
    shop.id_user = id_user;
    shop.id_shop = insertId;

    return shop;
}

async function saveProductsShop(answers, id_user, id_shop) {
    const len = answers.find(answer => answer.field.ref === 'number_products').number;
    if (!len) {
        throw new Error('Error: pas de donnée product');
    }

    const products = [];
    for (let i = 1; i <= len; i += 1) {
        // TODO: CHECK: retour getObjectProduct
        const product = { id_shop, id_user, ...getObjetProduct(answers, i) };

        // Enregistrement de la photo, recuperation de son url
        if (product.picture_api_url) {
            const picture = await typeformAPI.images.add({ url: product.picture_api_url });
            product.picture_typeform_url = picture.src;
        }
        
        await dbManager.insertAsBunk('product', product, len);

        products.push(product);
    }
    
    return products;
}

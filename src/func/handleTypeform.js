import dotenv from 'dotenv';
import fs from 'fs';
import { createClient } from '@typeform/api-client'
import DbManager from '../connexions/DbManager.js';
import { getObjetUser, getObjetShop, getObjetProduct } from '../utils/fieldsDB.js';
dotenv.config();

const typeformAPI = createClient({ token: process.env.TOKEN_TYPEFORM });
const dbManager = new DbManager(process.env.MYSQL_URL);

const typeTypeform = ['metashop', 'shop'];


export function handleSubmitTypeform(type, data) {
    console.log('handleSubmitTypeform: ', { type });

    if (type === 'metashop') {
        handleMetashop(data);
    } else {
        console.log('un autre type de typeform');
    }
}


async function handleMetashop(data) {
    
    const infos = await saveInfoMetaShopDB(data);
    if (!infos) {
        return;
    }

    console.log('infos: ', infos);
    console.log('Faire la suite');
    
}


async function saveInfoMetaShopDB(data) {
    const answers = data.form_response.answers;

    try {
        const user = await saveUser(answers);
        const shop = await saveShopUser(answers, user.id_user);
        const products = await saveProductsShop(answers, user.id_user, shop.id_shop);

        return { user, shop, products };
    } catch (err) {
        console.log("Error handleMetashop() - Erreur lors de la gestion d'un nouveau metashop :", { err, data });
        fs.appendFileSync('cache/errors/handleMetashop-errors.log', JSON.stringify({ err, data }, null , 4) + '\n');
        return null;
    }
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
        const picture = await typeformAPI.images.add({ url: product.picture_api_url });
        product.picture_typeform_url = picture.src;
        
        await dbManager.insertAsBunk('product', product, len);

        products.push(product);
    }
    
    return products;
}

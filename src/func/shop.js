import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import { createClient } from '@typeform/api-client';
import DbManager from '../connexions/DbManager.js';
import { saveTypeform } from './metashop.js';

import templateShop from '../templates/shop_v1.js';

const typeformAPI = createClient({ token: process.env.TOKEN_TYPEFORM });
const dbManager = new DbManager(process.env.MYSQL_URL);


export async function saveInfoShopDB(data) {
    try {
        // Recuperation des infos du shop
        const shop = await getSelectDB('shop', { uid_shop: data.form_response.form_id });

        // Recuperation des infos de l'utilisateur
        const user = await getSelectDB('user', { id_user: shop.id_user })


        // Enregistrement de la response
        const response_shop = await saveTypeform(data, {
            id_user: user.id_user,
            id_shop: shop.id_shop,
            name: shop.name,
            type: 'response_shop',
            uid_form: shop.uid_shop,
            url_form: shop.url_shop
        });

        
        // TODO: DEV: ajouter l'enregistrement des commandes
        return { user, shop, response_shop };
        
    } catch (err) {
        console.log("Error shop.js - Erreur lors de l'enregistrement d'un submit shop :", { err, infos: data });
        fs.appendFileSync('cache/errors/saveInfoShopDB-errors.log', JSON.stringify({ err, infos: data }, null, 4) + '\n');
        return null;
    }

}

async function getSelectDB(table, whereData) {
    const field = Object.keys(whereData)[0];
    let sqlRequest = `SELECT * FROM ${table} where ${field} = ?`;

    const resultats = await dbManager.query2(sqlRequest, [whereData[field]]);
    if (resultats.length !== 1) {
        throw new Error(`Error: Recherche ${table}(${field} = ${whereData[field]}), ${resultats.length} resultat: `)
    }

    return resultats[0];
}

export async function createShop({ user, shop, products, form_meta }) {
    // TODO: CHECK: ajouter des verifications pour ne pas creer la boutique avec des infos manquantes

    try {
        const templateFilled = fillTemplateShop(templateShop, { shop, products });
        const res = await typeformAPI.forms.create({ data: templateFilled });

        await typeformAPI.webhooks.create({
            uid: res.id,
            tag: 'webhook_response_shop',
            url: 'http://82.180.155.37:3001/api/typeform/submit?typeform=shop',
            enabled: true,
        })

        const form_shop = await saveTypeform(res, {
            id_user: user.id_user,
            id_shop: shop.id_shop,
            name: shop.name,
            type: 'form_shop',
            uid_form: res.id,
            url_form: res._links.display
        });

        const sqlRequest = `UPDATE shop SET uid_shop = ?, url_shop = ? WHERE id_shop = ${shop.id_shop}`;
        await dbManager.query2(sqlRequest, [res.id, res._links.display]);

        shop.uid_shop = res.id;
        shop.url_shop = res._links.display;
        return form_shop;

    } catch (err) {
        console.log("Error shop.js - Erreur lors de la creation d'un nouveau shop :", { err, infos: { user, shop, products, form_meta } });
        fs.appendFileSync('cache/errors/createShop-errors.log', JSON.stringify({ err, infos: { user, shop, products, form_meta } }, null, 4) + '\n');
        return null;
    }

}


function fillTemplateShop(template, info, workspaceHref = 'https://api.typeform.com/workspaces/pQJdtf') {

    // Edit template shop
    template.title = info.shop.name;
    // Worskspace: Shops
    template.workspace.href = workspaceHref;
    // Settings
    template.settings.meta.title = info.shop.name;
    template.settings.meta.description = info.shop.name;
    // Variables
    template.variables.shop_name = info.shop.name;
    template.variables.payment_type = info.shop.payment_type || 'cash';
    template.variables.order_type = info.shop.order_type || 'collect';
    template.variables.delivery_fees = info.shop.delivery_fees || 0;
    // Variables products
    info.products.forEach((product, index) => {
        template.variables[`name_product_${index + 1}`] = product.name;
        template.variables[`price_product_${index + 1}`] = product.price;

        // Default image: https://images.typeform.com/images/ztxXB72M5URi
        if (product.picture_typeform_url) {
            const indexField = template.fields.findIndex(f => f.ref === `number_product_${index + 1}`);
            template.fields[indexField].attachment.href = product.picture_typeform_url;
            template.fields[indexField].attachment.properties.description = product.name;
        }
    });

    return template;
}
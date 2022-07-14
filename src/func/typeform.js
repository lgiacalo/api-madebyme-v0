import dotenv from 'dotenv';
import { createClient } from '@typeform/api-client'
import DbManager from '../connexions/DbManager.js';
import { getObjetUser, getObjetShop, getObjetProduct } from '../utils/rename.js';
dotenv.config();

const typeformAPI = createClient({ token: process.env.TOKEN_TYPEFORM });
const dbManager = new DbManager(process.env.MYSQL_URL);

const typeTypeform = ['metashop', 'shop'];


export function handleSubmitTypeform(type, data) {
    console.log('handleSubmitTypeform: ', { type });
    console.log(' process.env.TOKEN_TYPEFORM: ',  process.env.TOKEN_TYPEFORM);
    

    if (type === 'metashop') {
        handleMetashop(data);
    } else {
        console.log('un autre type de typeform');
    }
}

// TODO: DEV: faire une fonction qui enregistre les infos du nouveau metashop
async function handleMetashop(data) {
    const answers = data.form_response.answers;

    try {
        const id_user = await saveUserMetashop(answers);
        console.log('id_user: ', id_user);
        const id_shop = await saveShopUser(answers, id_user);
        console.log('id_shop: ', id_shop);
        await saveProductsShop(answers, id_user, id_shop);

    } catch (err) {
        console.log("Error handleMetashop() - Erreur lors de la gestion d'un nouveau metashop :", err); 
    }
    
}


async function saveUserMetashop(answers) {
    const user = getObjetUser(answers);
    // TODO: CHECK: ajouter verification du formatage de l'email

    if (!Object.keys(user).length) {
        return null;
    }

    const { insertId } = await dbManager.insert('user', user);
    return insertId;
}


async function saveShopUser(answers, id_user) {
    const shop = getObjetShop(answers);

    if (!Object.keys(shop).length) {
        return null;
    }

    const { insertId } = await dbManager.insert('shop', { id_user, ...shop });
    return insertId;
}

async function saveProductsShop(answers, id_user, id_shop) {
    const len = answers.find(answer => answer.field.ref === 'number_products').number;

    for (let i = 1; i <= len; i += 1) {
        // TODO: CHECK: retour getObjectProduct
        await dbManager.insertAsBunk('product', {id_shop, id_user, ...getObjetProduct(answers, i)}, len);
    }
    
    return ;
}

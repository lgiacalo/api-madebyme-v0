import dotenv from 'dotenv';
dotenv.config();
import { saveInfoMetaShopDB } from './metashop.js'
import { createShop } from './shop.js';


export function handleSubmitTypeform(type, data) {
    console.log('handleSubmitTypeform: ', { type });

    if (type === 'metashop') {
        handleSubmitMetashop(data);
    } else if (type === 'shop') {
        console.log('Gestion handleSubmitShop');
    } else {
        console.log('un autre type de typeform');
    }
}

async function handleSubmitMetashop(data) {
    
    const infos = await saveInfoMetaShopDB(data);
    if (!infos) {
        return;
    }

    const form_shop = await createShop(infos);
    console.log('{infos}: ', { ...infos, form_shop });

    // Envoyer email
    
}

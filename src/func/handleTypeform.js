import dotenv from 'dotenv';
dotenv.config();
import SendGrid from '../classes/SendGridClass.js';
import MySql from '../classes/MySqlClass.js';
import Typeform from '../classes/TypeformClass.js';

export function handleSubmitTypeform(type, data) {
    console.log('handleSubmitTypeform: ', { type });

    if (type === 'metashop') {
        handleSubmitMetashop(data);
    } else if (type === 'shop') {
        handleSubmitShop(data);
    } else {
        console.log('un autre type de typeform');
    }
}

async function handleSubmitMetashop(data) {
    
    const infos = await MySql.saveMetaShop(data);
    if (!infos) {
        return;
    }

    const form_shop = await Typeform.createShop(infos);
    if (!form_shop) {
        return;
    }
    
    await SendGrid.sendToNewShop(infos.user.email, { url_shop: infos.shop.url_shop })
}

async function handleSubmitShop(data) {

    const infos = await MySql.saveNewOrderFromShop(data);
    if (!infos) {
        return null;
    }

    // Vendeur: Envoyer un email au vendeur avec les infos de la commande et l'acheteur !
    // Acheteur: envoyer un email pour lui notifier la prise en compte de la commande et quil sera bientot contacté par le vendeur
}
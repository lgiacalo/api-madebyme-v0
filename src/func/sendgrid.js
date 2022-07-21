
import SendGrid from '@sendgrid/mail'
import fs from 'fs';

SendGrid.setApiKey(process.env.SENDGRID_API_KEY);

// templateId:
//  Dynamic Creation Boutique : SENDGRID_TEMPLATE_ID_CREATION_SHOP
//  Dynamic Client confirmation commande: SENDGRID_TEMPLATE_ID_
//  Dynamic Vendeur information d'une nouvelle commande avec les infos: SENDGRID_TEMPLATE_ID_
// 

export async function sendEmailNewShop(email, infos) {
    const msg = {
        to: email,
        from: 'hello@shunt-app.io',
        templateId: process.env.SENDGRID_TEMPLATE_ID_CREATION_SHOP,
        dynamicTemplateData: infos,
      };

    await sendEmail(msg)
    
}

// export async function sendEmailNewOrder(email, infos);
// export async function sendEmailConfirmOrder(email, infos);

async function sendEmail(msg) {
    try {
        await SendGrid.send(msg);
        console.log(`Email envoyé à `, msg.to);
        
    } catch (err) {
        console.log("Error sendgrid.js - Erreur lors de l'envoi d'un email :", { err, msg });
        fs.appendFileSync('cache/errors/sendgrid-errors.log', JSON.stringify({ err, msg }, null , 4) + '\n');
        return null;
    }
}
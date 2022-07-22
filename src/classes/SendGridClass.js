import dotenv from 'dotenv';
dotenv.config();
import SendGrid from '@sendgrid/mail'
import fs from 'fs';

class SendGridClass {

    constructor() {
        SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
        this.from = 'hello@shunt-app.io';
        this.template = {
            creation: process.env.SENDGRID_TEMPLATE_ID_CREATION_SHOP,
        }
    }

    async sendToNewShop(email, dynamicData) {
        const msg = {
            to: email,
            from: this.from,
            templateId: this.template.creation,
            dynamicTemplateData: dynamicData,
          };
    
        await this.send(msg, 'creation');
        
    }

    async sendNewOrderToSeller(email, infos){}
    async sendConfirmOrderToBuyer(email, infos){}

    async send(msg, log) {
        try {
            await SendGrid.send(msg);
            console.log(`Email de ${log || 'type inconnu'} envoyé à`, msg.to);
            
        } catch (err) {
            console.log("Error sendgrid.js - Erreur lors de l'envoi d'un email :", { err, msg });
            fs.appendFileSync('cache/errors/sendgrid-errors.log', JSON.stringify({ err, msg }, null , 4) + '\n');
            return null;
        }
    }
}

export default new SendGridClass();
import EmailProvider from './EmailProvider.js';
import sgMail from '@sendgrid/mail';

export default class SendGridProvider extends EmailProvider {
    constructor(apiKey) {
        super();
        sgMail.setApiKey(apiKey);
    }

    async sendEmail(to, from, subject, body) {
        const msg = {
            to,
            from,
            subject,
            text: body,
        };
     
        try {
            await sgMail.send(msg);
            console.log('Email sent via SendGrid'); 
        } catch (error) {
            console.error('Error sending email via SendGrid');
            throw error;
        }
    }
}
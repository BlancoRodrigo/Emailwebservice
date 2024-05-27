import Email from '../models/Email.js'
import User from '../models/User.js'

import SendGridProvider from '../emailProviders/SendGridProvider.js';
import MailgunProvider from '../emailProviders/MailgunProvider.js';

const providers = [
    new SendGridProvider(process.env.SENDGRID_API_KEY),
    // new MailgunProvider(process.env.MAILGUN_API_KEY, process.env.MAILGUN_DOMAIN)
    //Problemas para loguearme en mailgun.
] 


export async function providerSend (to, from, subject, message) {
    for (const provider of providers) {
        try {
            await provider.sendEmail(to, from, subject, message);
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email through provider:', error);
        }
    }
    throw new Error('All email providers failed to send the email');
}

export const emailRegister = async (sender_id, receiver_id, subject, message) => {  
    const newEmail = await Email.create({
        sender_id,
        receiver_id,
        subject,
        message
    });
    return newEmail.id_mail;
}

export const findInboxEmails = async (receiver_id) => {
    const emails = await Email.findAll({ where: { receiver_id } });
    return emails;
}

export const findSentEmails = async (sender_id) => {
    const emails = await Email.findAll({ where: { sender_id } });
    return emails;
}

export const findUserByEmail = async (email) => {
    const user = await User.findOne({ where: { email } });  
    return user;
}
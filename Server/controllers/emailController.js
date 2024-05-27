import { findInboxEmails, findSentEmails, findUserByEmail, emailRegister, providerSend } from '../services/emailService.js';

export const getInboxEmails = async (req, res) => {
    try {
        const emails = await findInboxEmails(userId); //UserId is passed in params
        res.status(200).json(emails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};

export const getSentEmails = async (req, res) => {
    try {
        const emails = await findSentEmails(userId); //UserId is passed in params
        res.status(200).json(emails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};

export const sendEmail = async (req, res) => {
    const {to, subject, message, from} = req.body;
    try {
        const emailSent = await providerSend(to, from, subject, message);
        if (emailSent) {
            const senderId = await findUserByEmail(from);
            const receiverId = await findUserByEmail(to);
            const email = await emailRegister(senderId, receiverId, subject, message);
            res.status(200).json(email);
        }else{
            res.status(500).json({ message: 'Error sending email' });
        }

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
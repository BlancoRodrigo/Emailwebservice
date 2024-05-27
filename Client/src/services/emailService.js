import api from './api';

//inbox emails
export const getInboxEmails = async (userId) => {
    try {
        const response = await api.get('api/emails/inbox', {params: {userId}});
        return response.data;
    }catch (error) {
        console.log('Error getting inbox emails', error);
    }
}
//Using axios allows to especify the params in the get request
//Axios will construct the URL including the params. '/emails/inbox?userId=123'

//Send email
export const sendEmail = async (emailData) => {
    try {
        const response = await api.post('api/emails/send', emailData);
        return response.data;
    } catch (error) {
        console.log('Error sending email', error);
    }
}


//Sent emails
export const getSentEmails = async (userId) => {
    try {
        const response = await api.get('/emails/sent', {params: {userId}});
        return response.data;
    } catch (error) {
        console.log('Error getting sent emails', error);
    }
}



import EmailProvider from "./EmailProvider.js";
import FormData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(FormData);

export default class MailgunProvider extends EmailProvider {
    constructor(apiKey, domain) {
        super();
        this.client = mailgun.client({ username: "api", key: apiKey });
        this.domain = domain;
    }
    
    async sendEmail(to, from, subject, body) {
        const data = {
        from,
        to,
        subject,
        text: body,
        };
    
        try {
        await this.client.messages.create(this.domain, data);
        console.log("Email sent via Mailgun");
        } catch (error) {
        console.error("Error sending email via Mailgun",error);
        throw error;
        }
    }
}   

//this.client.messages.create method used to send email via Mailgun
//this.domain is the domain registred with Mailgun

//Data contains the email information
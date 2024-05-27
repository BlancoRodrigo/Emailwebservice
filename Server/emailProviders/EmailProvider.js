export default class EmailProvider {
    constructor() {
        if (new.target === EmailProvider) {
            throw new Error('Cannot instantiate from EmailProvider');
        }
    }
    async sendEmail(email) {
        throw new Error('sendEmail method not implemented');
    }
}
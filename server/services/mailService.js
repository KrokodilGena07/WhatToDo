import nodemailer from 'nodemailer';

class MailService {
    constructor() {
        this.transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }

    async sendActivationMail(to, link) {
        await this.transport.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: `Activate account on ${process.env.API_URL}`,
            text: '',
            html: `<div>
                <h1>This is activation link</h1>
                <h2>Follow the link to activate your account</h2>
                <a href='${link}'>${link}</a>
            </div>`
        });
    }
}

export default new MailService();
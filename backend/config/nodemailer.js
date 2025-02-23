import nodemailer from 'nodemailer';
import { ACCOUNT_EMAIL, EMAIL_PASSWORD } from './env.js';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        user: ACCOUNT_EMAIL,
        pass: EMAIL_PASSWORD
    }
});

export default transporter;
import nodemailer from 'nodemailer';
import { EMAIL, EMAIL_PASSWORD } from './env.js';

const transporter = nodemailer.createTransport({
    host: "gmail",
    auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD
    }
});
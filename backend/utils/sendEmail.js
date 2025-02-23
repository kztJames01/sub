import dayjs from "dayjs";
import { emailTemplates } from "../utils/email-template.js";
import transporter from "../config/nodemailer.js";
export const sendReminderEmail = async ({ type, subscription }) => {
    
    if (!type || !subscription) throw new Error("Missing required fields");

    const template = emailTemplates.find(t => t.label === type);
    if (!template) throw new Error("Template not found");

    const accountEmail = process.env.ACCOUNT_EMAIL;
    if (!accountEmail) throw new Error("ACCOUNT_EMAIL is not set");

    const mailInfo = {
        userName: subscription.user.name,
        subscriptionName: subscription.name,
        planName: subscription.frequency,
        price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
        paymentMethod: subscription.paymentMethod,
        renewalDate: dayjs(subscription.renewalDate).format('DD/MM/YYYY'),
    }
    const message = template.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);

    const mailOptions = {
        from: accountEmail,
        to: subscription.user.email,
        subject: subject,
        html: message,
      }
    
      transporter.sendMail(mailOptions, (error, info) => {
        if(error) return console.log(error, 'Error sending email');
    
        console.log('Email sent: ' + info.response);
      })
}


import dayjs from "dayjs";

export const sendReminderEmail = async (to, type, subscription) => {
    if(!to || !type || !subscription) throw new Error("Missing required fields");

    const template = emailTemplates.find(t => t.type === type);
    if(!template) throw new Error("Template not found");


    const mailInfo = {
        userName: subscription.user.name,
        subscriptionName: subscription.name,
        subscriptionPrice: `${subscription.currency}${subscription.price} (${subscription.frequency})`,
        paymentMethod: subscription.user.paymentMethod,
        subscriptionRenewalDate: dayjs(subscription.renewalDate).format('DD/MM/YYYY'),
    }
    const message = template.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);

    const mailOptions = {
        from: accountEmail,
        to: to,
        subject: subject,
        html: message,
      }
    
      transporter.sendMail(mailOptions, (error, info) => {
        if(error) return console.log(error, 'Error sending email');
    
        console.log('Email sent: ' + info.response);
      })
}
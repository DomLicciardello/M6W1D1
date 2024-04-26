import nodemailer from "nodemailer";
import { config } from "dotenv";

config();

// Funzione per inviare mail:
export const sendEmail = async (sendTo, mailBody) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.SMTP_MAIL_USERNAME,
            pass: process.env.SMTP_MAIL_PASSWORD,
},
    });

    try {
        const mail = await transporter.sendMail({
            from: "Epicode Tester <david.kshlerin60@ethereal.email>",
            to: sendTo,
            subject: "Epicode Testing",
            html: mailBody,
/*             // Per aggiungere un allegato:
            attachments: [{
                filename: "epicode.jpg",
                path: "./percorso_file.jpg",
            }], */
        });
    
        console.log(mail.messageId);
    } catch (err) {
        console.log(err);
    }
};
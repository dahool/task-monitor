import { environment } from '@/env/environment'
import nodemailer from 'nodemailer';

// Define a function to send an email
export const sendFailNotification = async (jobName: string, output: string) => {

    // Create a transporter
    const transporter = nodemailer.createTransport({
        host: environment.mail.host,
        port: environment.mail.port,
        secure: false
    });

    // Define email options
    const mailOptions = {
        from: environment.mail.from,
        to: environment.mail.recipient,
        subject: `Job ${jobName} failed`,
        text: output
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }

};

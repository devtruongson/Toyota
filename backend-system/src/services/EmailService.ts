const nodemailer = require('nodemailer');
require('dotenv').config();

class EmailService {
    async SendEmailSalesRegistrationByCustomer(data: { email: string; html: string }) {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            // debug: true,
            // logger: true,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_APP_NAME, // generated ethereal user
                pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'Vinfast Nguyễn Tiến Trung', // sender address
            to: data.email, // list of receivers
            subject: `Chúng tôi xin phép gửi thông tin đến bạn`, // Subject line
            html: data.html, // html body
        });
    }
}

export default new EmailService();

const nodemailer = require("nodemailer");
require('dotenv').config();

const mailer = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_ACCOUNT_CONFIG, // generated ethereal user
        pass: process.env.EMAIL_ACCOUNT_KEY, // generated ethereal password
    },
});

// mailer.verify().then(() => {
//     console.log("Email Enviado");
// });

module.exports = mailer;
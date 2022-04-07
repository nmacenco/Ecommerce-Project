require("dotenv").config();
const { EMAIL_ACCOUNT_CONFIG,EMAIL_ACCOUNT_KEY } = process.env;
const nodemailer = require("nodemailer");

const mailer = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: EMAIL_ACCOUNT_CONFIG, // generated ethereal user
        pass: EMAIL_ACCOUNT_KEY, // generated ethereal password
    },
    
});

// mailer.verify().then(() => {
//     console.log("Email Enviado");
// });

module.exports = mailer;
<<<<<<< HEAD
require("dotenv").config();
const { EMAIL_ACCOUNT_CONFIG,EMAIL_ACCOUNT_KEY } = process.env;
const nodemailer = require("nodemailer");

=======
const nodemailer = require("nodemailer");


>>>>>>> 3c96f383148fc64e735e5fadd85925058b79fb4e
const mailer = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
<<<<<<< HEAD
        user: EMAIL_ACCOUNT_CONFIG, // generated ethereal user
        pass: EMAIL_ACCOUNT_KEY, // generated ethereal password
    },
    
=======
        user: 'najupasa@gmail.com', // generated ethereal user
        pass: 'ukksgmnesuhrogae', // generated ethereal password
    },
>>>>>>> 3c96f383148fc64e735e5fadd85925058b79fb4e
});

// mailer.verify().then(() => {
//     console.log("Email Enviado");
// });

module.exports = mailer;
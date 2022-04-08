const nodemailer = require("nodemailer");


const mailer = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'najupasa@gmail.com', // generated ethereal user
        pass: 'ukksgmnesuhrogae', // generated ethereal password
    },
});

// mailer.verify().then(() => {
//     console.log("Email Enviado");
// });

module.exports = mailer;
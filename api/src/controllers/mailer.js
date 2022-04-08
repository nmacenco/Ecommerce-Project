const mailer = require("../utils/mailer-setup");

const sendMail = async (req, res) => {
    let { emailToAddress, emailToSubject, emailToBody } = req.body;

    try {

        let info = await mailer.sendMail({
<<<<<<< HEAD
            from: 'E-commerce Henry PF" <najupasa@gmail.com>',
=======
            from: '"Ecommerce Henry PF" <najupasa@gmail.com>',
>>>>>>> 3c96f383148fc64e735e5fadd85925058b79fb4e
            to: emailToAddress,
            subject: emailToSubject,
            html: emailToBody
        });

        info ?
            res.status(200).send({
                successMsg: "Mail successfully sent."
            })
<<<<<<< HEAD
            : res.status(401).send({ errorMsg: "Mail can not be sent." });
=======
            : res.status(401).json({ errorMsg: "Mail can not be sent." });
>>>>>>> 3c96f383148fc64e735e5fadd85925058b79fb4e
    } catch (error) {
        res.status(500).send({ errorMsg: error.message });
    }
};


module.exports = sendMail;

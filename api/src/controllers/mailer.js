const mailer = require("../utils/mailer-setup");

const sendMail = async (req, res) => {
    let { emailToAddress, emailToSubject, emailToBody } = req.body;

    try {

        let info = await mailer.sendMail({
            from: 'E-commerce Henry PF" <najupasa@gmail.com>',
            to: emailToAddress,
            subject: emailToSubject,
            html: emailToBody
        });

        info ?
            res.status(200).send({
                successMsg: "Mail successfully sent."
            })
            : res.status(401).send({ errorMsg: "Mail can not be sent." });
    } catch (error) {
        res.status(500).send({ errorMsg: error.message });
    }
};


module.exports = sendMail;
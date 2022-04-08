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

const sendMailPassword = async (req, res) => {
    let { emailToAddress, emailToSubject, emailToBody } = req.body;
    try {
        let info = await mailer.sendMail({
            from: 'E-commerce Henry PF" <najupasa@gmail.com>',
            to: emailToAddress,
            subject: emailToSubject,
            html: emailToBody,
            auth: {
                user: 'user@example.com',
                refreshToken: '1/XXxXxsss-xxxXXXXXxXxx0XXXxxXXx0x00xxx',
                accessToken: 'ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x',
                expires: 1484314697598.
            }
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

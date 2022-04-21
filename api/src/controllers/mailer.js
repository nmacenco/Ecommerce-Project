const mailer = require("../utils/mailer-setup");

const sendMail = async (req, res) => {
  let { emailToAddress, emailToSubject, emailToBody } = req.body;

  try {
    let info = await mailer.sendMail({
      from: 'E-commerce Henry PF" <pcshop.ecommerce@gmail.com>',
      to: emailToAddress,
      subject: emailToSubject,
      html: emailToBody,
    });

    info
      ? res.status(200).send({
        successMsg: "Mail successfully sent.",
      })
      : res.status(401).send({ errorMsg: "User doesn't" });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const sendMailPassword = async (emailToAddress, emailToSubject, emailToBody) => {
  let info = await mailer.sendMail({
    from: 'E-commerce Henry PF" <pcshop.ecommerce@gmail.com>',
    to: emailToAddress,
    subject: emailToSubject,
    html: emailToBody,
  });
};

const sendMailOrder = async (emailToAddress, emailToSubject, emailToBody) => {
  let info = await mailer.sendMail({
    from: 'E-commerce Henry PF" <pcshop.ecommerce@gmail.com>',
    to: emailToAddress,
    subject: emailToSubject,
    html: emailToBody,
  });
};

const sendMailState = async (emailToAddress, emailToSubject, emailToBody) => {
  let info = await mailer.sendMail({
    from: 'E-commerce Henry PF" <pcshop.ecommerce@gmail.com>',
    to: emailToAddress,
    subject: emailToSubject,
    html: emailToBody,
  });
};


module.exports = { sendMail, sendMailPassword, sendMailOrder, sendMailState };

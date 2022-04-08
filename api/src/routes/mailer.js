const express = require("express");
const sendMail = require("../controllers/mailer.js");
const sendMailPassword = require("../controllers/mailer.js");

//Creating routes and adding the controllers.

const mailRouter = express.Router();

mailRouter.put("/admin/email", sendMail);
mailRouter.put("/admin/emailpwd", sendMailPassword);

module.exports = mailRouter;

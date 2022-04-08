const express = require("express");
const sendMail = require("../controllers/mailer.js");

//Creating routes and adding the controllers.

const mailRouter = express.Router();

mailRouter.put("/admin/email", sendMail);

module.exports = mailRouter;
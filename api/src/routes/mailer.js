const express = require("express");
const { sendMail } = require("../controllers/mailer.js");
const { sendPasswordResetMail, sendForcedPasswordResetMail } = require("../controllers/user");
const {isLoggedIn, isAdmin} = require("../middleware/auth");

//Creating routes and adding the controllers.
const mailRouter = express.Router();

mailRouter.put("/admin/email", sendMail);

//guest request password reset
mailRouter.post("/forgotPasswordReset", sendPasswordResetMail);

//admin forces password reset
mailRouter.post("/forcedPasswordReset",isLoggedIn, isAdmin, sendForcedPasswordResetMail);

module.exports = mailRouter;

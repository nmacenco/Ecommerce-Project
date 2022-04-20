const { User, Order, OrderDetail, Country } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");
const { sendMailPassword } = require("./mailer");
require("dotenv").config();

const URL_PWD = process.env.USER_PWD_CHANGE_URL || "http://localhost:3000";

const createUser = async (req, res) => {
  try {
    let { name, surname, email, password, CountryId } = req.body;
    if (!name || !surname || !email || !CountryId || !password) {
      res.status(400).send({ errorMsg: "Missing data." });
    } else {
      const isUserCreated = await User.findOne({
        where: {
          email,
          signedInWithGoogle: false,
        },
      });
      if (isUserCreated) {
        res.status(400).send({ errorMsg: "Email already exists." });
      } else {
        password = await bcrypt.hash(password, 8);

        const isActive = false;
        const newUser = await User.create({
          name,
          surname,
          email,
          password,
          CountryId,
          isActive,
        });
        const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY);
        await newUser.update({ activationToken: token });
        await sendMailPassword(
          email,
          "Please activate your account to continue.",
          `<p>Click <a href="${URL_PWD}/validateAccount/${token}">here</a> to activate your account.</p>`
        );
        res.status(201).send({
          successMsg: "User activation email sent.",
        });
      }
    }
  } catch (error) {
    res.status(500).json({ errorMsg: error.message });
  }
};

const activateAccount = async (req, res) => {
  try {
    let activationToken = req.params.id;
    if (!activationToken) {
      return res.status(400).send({ errorMsg: "Invalid activation token" });
    }
    const payload = jwt.verify(activationToken, process.env.SECRET_KEY);
    await User.update(
      { isActive: true, activationToken: null },
      {
        where: {
          id: payload.id,
          activationToken,
        },
      }
    );
    res.status(200).send({ successMsg: "User successfully activated." });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const updateUser = async (req, res) => {
  const id = req.userID;
  if (!id) {
    return res.status(400).send({ errorMsg: "Id not provided." });
  }
  let user = await User.findOne({ where: { id } });
  if (!user) {
    return res.status(404).send({ errorMsg: "User not found." });
  }
  if (user.signedInWithGoogle) {
    return res.status(400).send({
      errorMsg: "You cannot modify all your data, please try other route.",
    });
  }
  let {
    name,
    surname,
    email,
    billing_address,
    default_shipping_address,
    CountryId,
  } = req.body;
  try {
    if (
      !name ||
      !surname ||
      !email ||
      !billing_address ||
      !default_shipping_address ||
      !CountryId
    ) {
      return res.status(400).send({ errorMsg: "Missing data." });
    }
    if (email !== user.email) {
      let doesEmailExist = await User.findOne({
        where: {
          email,
          signedInWithGoogle: false,
        },
      });
      if (doesEmailExist) {
        return res.status(400).send({ errorMsg: "Email is already in use." });
      }
    }
    let updatedUser = await user.update({
      name,
      surname,
      email,
      billing_address,
      default_shipping_address,
      CountryId,
    });
    res.status(200).send({
      successMsg: "User successfully updated.",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const getSingleUser = async (req, res) => {
  try {
    let id = req.userID;
    if (!id) {
      res.status(400).send({ errorMsg: "Missing data." });
    } else {
      let user = await User.findOne({
        where: { id },
        include: [
          {
            model: Country,
            attributes: ["id", "name", "code"],
          },
        ],
      });
      if (user) {
        user = {
          name: user.name,
          surname: user.surname,
          email: user.email,
          billing_address: user.billing_address,
          default_shipping_address: user.default_shipping_address,
          country: user.Country.name,
          countryCode: user.Country.code,
        };
        return res
          .status(200)
          .send({ successfulMsg: "Here is your user data.", data: user });
      }
      res.status(404).send({ errorMsg: "User not found." });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const googleSignIn = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      where: { email, signedInWithGoogle: true },
    });
    if (!user) {
      return res.status(404).send({ errorMsg: "User not found." });
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
    await User.update(
      { tokens: sequelize.fn("array_append", sequelize.col("tokens"), token) },
      { where: { id: user.id } }
    );
    res.header("auth-token", token).send({
      successMsg: "You signed in successfully.",
      data: { name: user.name, role: user.role },
    });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const googleSignUp = async (req, res) => {
  try {
    const { email, name, surname } = req.body;
    const isCreated = await User.findOne({
      where: { email, signedInWithGoogle: true },
    });
    if (isCreated) {
      return res.status(400).send({ errorMsg: "User already exists." });
    }
    const isActive = true;
    const signedInWithGoogle = true;
    const CountryId = 1;
    const [user /*created*/] = await User.findOrCreate({
      where: {
        email,
        name,
        surname,
        isActive,
        signedInWithGoogle,
        CountryId,
      },
    });
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
    await User.update(
      { tokens: sequelize.fn("array_append", sequelize.col("tokens"), token) },
      { where: { id: user.id } }
    );
    res
      .header("auth-token", token)
      .status(201)
      .send({
        successMsg: "User has been created.",
        data: { role: user.role, name: user.name },
      });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const googleUpdateProfile = async (req, res) => {
  try {
    let { billing_address, default_shipping_address, CountryId } = req.body;
    let user = await User.findOne({ where: { id: req.userID } });
    await user.update({
      billing_address,
      default_shipping_address,
      CountryId,
    });
    res.status(200).send({ successMsg: "Google user updated successfully." });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
        signedInWithGoogle: false,
      },
    });
    if (!user) {
      return res.status(404).send({ errorMsg: "Email or password is wrong." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ errorMsg: "Invalid password." });
    }
    if (!user.isActive) {
      return res.status(400).send({ errorMsg: "User is not active." });
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
    await User.update(
      { tokens: sequelize.fn("array_append", sequelize.col("tokens"), token) },
      { where: { id: user.id } }
    );
    res.header("auth-token", token).send({
      successMsg: "You signed in successfully.",
      data: { name: user.name, role: user.role },
    });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const logOut = async (req, res) => {
  try {
    let id = req.userID;
    let token = req.token;
    let loggedOutUser = await User.findOne({ where: { id } });
    let tokens = loggedOutUser.tokens;
    tokens = tokens.filter((tok) => tok !== token);
    await User.update(
      {
        tokens,
      },
      {
        where: {
          id: loggedOutUser.id,
        },
      }
    );
    res.status(200).send({ successMsg: "User has been logged out" });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const passwordReset = async (req, res) => {
  try {
    let id = req.userID;
    let { password, passwordConfirm, actualPassword } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send({ errorMsg: "User not found." });
    }
    if (!actualPassword || !password || !passwordConfirm) {
      return res.status(400).send({ errorMsg: "Missing data." });
    }
    const passwordMatch = await bcrypt.compare(actualPassword, user.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .send({ errorMsg: "Actual password is incorrect." });
    }
    if (password !== passwordConfirm) {
      return res.status(400).send({ errorMsg: "Passwords don't match." });
    }
    if (password === actualPassword) {
      return res
        .status(400)
        .send({ errorMsg: "New password is equal than the last one." });
    }
    password = await bcrypt.hash(password, 8);
    await user.update({
      password,
    });
    res.status(200).send({ successMsg: "Password successfully changed." });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const sendPasswordResetMail = async (req, res) => {
  try {
    let { email } = req.body;
    if (!email) {
      return res.status(400).send({ errorMsg: "Invalid email address." });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ errorMsg: "User not found." });
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
    await user.update({ passwordResetToken: token, needsPasswordReset: true });
    await sendMailPassword(
      email,
      "Required password reset",
      `<p>Click <a href='${URL_PWD}/sessions/recover/${token}>here</a> to reset your password</p>`
    );
    res.status(200).send({ successMsg: "Password reset sent." });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const sendForcedPasswordResetMail = async (req, res) => {
  try {
    let { email } = req.body;
    if (!email) {
      return res.status(400).send({ errorMsg: "Invalid email address." });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ errorMsg: "User not found." });
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
    await user.update({
      passwordResetToken: token,
      needsPasswordReset: true,
      isActive: false,
    });
    await sendMailPassword(
      email,
      "Required password reset",
      `<p>Click <a href="${URL_PWD}/sessions/recover/${token}">here</a> to reset your password</p>`
    );
    res.status(200).send({ successMsg: "Password reset sent." });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const forgotAndForcedResetPassword = async (req, res) => {
  try {
    let token = req.params.id;
    if (!token) {
      return res.status(400).send({ errorMsg: "No token provided." });
    }
    let { password, passwordConfirm } = req.body;
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    const id = payload.id;
    const user = await User.findOne({
      where: { id, passwordResetToken: token },
    });
    if (!user) {
      return res.status(404).send({ errorMsg: "User not found." });
    }
    if (!password || !passwordConfirm) {
      return res.status(400).send({ errorMsg: "Missing data." });
    }
    if (password !== passwordConfirm) {
      return res.status(400).send({ errorMsg: "Passwords don't match." });
    }
    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (isPasswordEqual) {
      return res
        .status(400)
        .send({ errorMsg: "New password is equal than the last one." });
    }
    password = await bcrypt.hash(password, 8);
    await user.update({
      password,
      passwordResetToken: "",
      needsPasswordReset: false,
      isActive: true,
    });
    res.status(200).send({ successMsg: "Password successfully changed." });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

module.exports = {
  createUser,
  updateUser,
  getSingleUser,
  signIn,
  logOut,
  googleUpdateProfile,
  passwordReset,
  sendPasswordResetMail,
  forgotAndForcedResetPassword,
  sendForcedPasswordResetMail,
  activateAccount,
  googleSignIn,
  googleSignUp,
};

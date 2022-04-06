const { User, Order, OrderDetail, Country } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");
require("dotenv").config();
require("../auth/passport-setup");

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
        const newUser = await User.create({
          name,
          surname,
          email,
          password,
          CountryId,
        });
        const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY);
        await User.update(
          {
            tokens: sequelize.fn(
              "array_append",
              sequelize.col("tokens"),
              token
            ),
          },
          { where: { id: newUser.id } }
        );
        res
          .status(201)
          .header("auth-token", token)
          .send({ successMsg: "User successfully created." });
      }
    }
  } catch (error) {
    res.status(500).json({ errorMsg: error.message });
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
    password,
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
    !password
      ? (password = user.password)
      : (password = await bcrypt.hash(password, 8));
    let updatedUser = await user.update({
      name,
      surname,
      password,
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

const googleLogIn = (req, res) => {
  try {
    const data = req.user.dataValues;
    const tokens = data.tokens;
    const token = tokens[tokens.length - 1];
    res
      .header("auth-token", token)
      .send({ successMsg: "User authenticated with google.", data: data });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const googleLogOut = async (req, res) => {
  try {
    req.session = null;
    let id = req.userID;
    let token = req.token;
    let loggedOutUser = await User.findOne({
      where: { id, signedInWithGoogle: true },
    });
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
    req.logout();
    res.send({ successMsg: "You have been logged out." });
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
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
    await User.update(
      { tokens: sequelize.fn("array_append", sequelize.col("tokens"), token) },
      { where: { id: user.id } }
    );
    res
      .header("auth-token", token)
      .send({ successMsg: "You signed in successfully." });
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

const getUserOrders = async (req, res) => {
  const { id } = req.userID;
  try {
    console.log(id);
    if (id) {
      let dataOrders = await Order.findAll({
        where: {
          UserId: id,
        },
      });
      if (!dataOrders.length) {
        res.status(404).send({ errorMsg: "Oders not found" });
      }
      dataOrders = dataOrders.map((Order) => {
        return {
          id: Order.id,
          total_amount: Order.total_amount,
          email_address: Order.email_address,
          billing_address: Order.billing_address,
          UserId: Order.UserId,
          status: Order.status,
        };
      });
      res
        .status(200)
        .send({ successMsg: "Here are your Ordes.", data: dataOrders });
    } else {
      res.status(404).send({ errorMsg: "missing id" });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error });
  }
};

module.exports = {
  createUser,
  updateUser,
  getSingleUser,
  getUserOrders,
  signIn,
  logOut,
  googleLogIn,
  googleLogOut,
  googleUpdateProfile,
};

const { User, Country } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//controllers that only admin can access.

const adminGetUsers = async (req, res) => {
  try {
    let users = await User.findAll({
      include: [
        {
          model: Country,
          attributes: ["id", "name", "code"],
        },
      ],
    });
    if (!users.length) {
      res.status(400).send({ errorMsg: "There are no users." });
    } else {
      users = users.map((user) => {
        return {
          id: user.id,
          name: user.name,
          surname: user.surname,
          password: user.password,
          email: user.email,
          billing_address: user.billing_address,
          default_shipping_address: user.default_shipping_address,
          role: user.role,
          isActive: user.isActive,
          country: user.Country.name,
          countryCode: user.Country.code,
          CountryId: user.Country.id,
          tokens: user.tokens,
          needsPasswordReset: user.needsPasswordReset,
        };
      });
      res.status(200).send({ successMsg: "Here are your users.", users });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const adminGetUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      return res.status(400).send({ errorMsg: "Id was not provided." });
    }
    let user = await User.findOne({
      where: { id },
      include: [
        {
          model: Country,
          attributes: ["id", "name"],
        },
      ],
    });
    if (!user) {
      return res.status(404).send({ errorMsg: "User not found." });
    }
    user = {
      name: user.name,
      surname: user.surname,
      email: user.email,
      billing_address: user.billing_address,
      default_shipping_address: user.default_shipping_address,
      country: user.Country.name,
      countryCode: user.Country.id,
      role: user.role,
      isActive: user.isActive,
      tokens: user.tokens,
      signedInWithGoogle: user.signedInWithGoogle,
      needsPasswordReset: user.needsPasswordReset,
    };
    res.status(200).send({ successMsg: "Here is your user.", data: user });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const adminUpdateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      return res.status(400).send({ errorMsg: "Id not provided." });
    }
    let user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).send({ errorMsg: "User not found." });
    }
    let { needsPasswordReset, role, isActive } = req.body;
    if (needsPasswordReset === undefined || !role || isActive === undefined) {
      return res.status(400).send({ errorMsg: "Missing data." });
    }
    await user.update({
      needsPasswordReset,
      role,
      isActive,
    });
    res
      .status(200)
      .send({ successMsg: "User successfully updated." });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const adminCreateUser = async (req, res) => {
  try {
    let {
      name,
      surname,
      email,
      password,
      CountryId,
      role,
      isActive,
      billing_address,
      default_shipping_address,
    } = req.body;
    if (
      !name ||
      !surname ||
      !email ||
      !CountryId ||
      !password ||
      role === undefined ||
      isActive === undefined ||
      !billing_address ||
      !default_shipping_address
    ) {
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
        await User.create({
          name,
          surname,
          email,
          password,
          CountryId,
          billing_address,
          default_shipping_address,
          role,
          isActive,
        });
        res.status(201).send({ successMsg: "User successfully created." });
      }
    }
  } catch (error) {
    res.status(500).json({ errorMsg: error.message });
  }
};

module.exports = {
  adminGetUsers,
  adminGetUser,
  adminUpdateUser,
  adminCreateUser,
};

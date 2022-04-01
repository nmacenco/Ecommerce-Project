const { User, Order, OrderDetail, Country } = require("../db");
const bcrypt = require("bcrypt");

const createUser = async (req, res, next) => {
  try {
    let {
      name,
      surname,
      email,
      password,
      billing_address,
      default_shipping_address,
      CountryId,
      role = "user", //predefined value, as guest cannot be other than user. only admin can provide another role
      isActive = true,
    } = req.body;
    if (
      !name ||
      !surname ||
      !email ||
      !billing_address ||
      !default_shipping_address ||
      !CountryId ||
      !role ||
      !password
    ) {
      res.status(400).send({ errorMsg: "Missing data." });
    } else {
      const isUserCreated = await User.findOne({
        where: {
          email,
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
          billing_address,
          default_shipping_address,
          CountryId,
          role,
          isActive,
        });
        res
          .status(201)
          .send({ successMsg: "User successfully created.", newUser });
      }
    }
  } catch (error) {
    res.status(500).json({ errorMsg: error });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  let {
    name,
    surname,
    password,
    email,
    billing_address,
    default_shipping_address,
    isActive = true,
    role = "user",
    CountryId,
  } = req.body;
  try {
    if (
      !id ||
      !name ||
      !surname ||
      !password ||
      !email ||
      !billing_address ||
      !default_shipping_address ||
      !CountryId
    ) {
      res.status(400).send({ errorMsg: "Missing data." });
    } else {
      let userToUpdate = await User.findOne({
        where: {
          id,
        },
      });
      if (!userToUpdate) {
        res.status(404).send({ errorMsg: "User not found." });
      } else {
        let doesEmailExist = await User.findOne({
          where: {
            email,
          },
        });
        if (doesEmailExist) {
          res.status(400).send({ errorMsg: "Email is already in use." });
        } else {
          password = await bcrypt.hash(password, 8);
          let updatedUser = await userToUpdate.update({
            name,
            surname,
            password,
            email,
            billing_address,
            default_shipping_address,
            isActive,
            role,
            CountryId,
          });
          res.status(200).send({
            successMsg: "User successfully updated.",
            data: updatedUser,
          });
        }
      }
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error });
  }
};

const getUsers = async (req, res) => {
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
          password: user.password,
          email: user.email,
          billing_address: user.billing_address,
          default_shipping_address: user.default_shipping_address,
          role: user.role,
          isActive: user.isActive,
          country: user.Country.name,
          countryCode: user.Country.code,
          CountryId: user.Country.id,
        };
      });
      res.status(200).send({ successMsg: "Here are your users.", users });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error });
  }
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).json({ errorMsg: "Missing data." });
    } else {
      const singleUser = await User.findByPk(id);
      singleUser
        ? res
            .status(200)
            .send({
              successfulMsg: "Here is your user data.",
              data: singleUser,
            })
        : res.status(404).send({ errorMsg: "User not found." });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error });
  }
};

const getUserOrders = (req, res, next) => {};

const signIn = (req, res, next) => {};

const logOut = (req, res, next) => {};

module.exports = {
  createUser,
  updateUser,
  getUsers,
  getSingleUser,
  getUserOrders,
  signIn,
  logOut,
};

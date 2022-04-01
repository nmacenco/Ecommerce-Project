const { User, Order, OrderDetail } = require("../db");

const createUser = async (req, res, next) => {
  try {
    const {
      name,
      surname,
      email,
      billing_address,
      default_shipping_address,
      country_id,
      role,
      isActive,
    } = req.body;
    console.log(req.body);
    if (
      !name ||
      !surname ||
      !email ||
      !billing_address ||
      !default_shipping_address ||
      !country_id ||
      !role
    ) {
      res.status(404).json({ errorMsg: "missing data" });
    } else {
      const newUser = await User.create({
        name,
        surname,
        email,
        billing_address,
        default_shipping_address,
        country_id,
        role,
        isActive,
      });
      res.status(200).json({ successfulMsg: "successful", newUser });
    }
  } catch (error) {
    res.status(500).json({ errorMsg: "ERROR", error });
  }
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const siglesUser = await User.findOne({
      where: {
        id: id,
      },
    });
    siglesUser
      ? await siglesUser.update({
          name: "Francisco2",
          surname: "Lubo2",
          password: "admin",
          email: "franciscolubo2@hotmail.com",
          billing_address: "Entre rios2",
          default_shipping_address: "Entre rios2",
          role: "admin",
          isActive: false,
          CountryId: 282,
        })(res.status(200).send({ successfulMsg: "successful", siglesUser }))
      : res.status(404).json({ errorMsg: "user not found" });
  } catch (error) {
    res.status(404).send({ errorMsg: "ERROR", error });
  }
};

const getUsers = async (req, res, next) => {
  try {
    let users = await User.findAll({});
    res.status(200).send({ successfulMsg: "successful", users });
  } catch (error) {
    res.status(404).send({ errorMsg: "ERROR", error });
  }
};

const getSingleUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(404).json({ errorMsg: "missing data" });
    } else {
      const siglesUser = await User.findByPk(id);
      siglesUser
        ? res.status(200).send({ successfulMsg: "successful", siglesUser })
        : res.status(404).json({ errorMsg: "user not found" });
    }
  } catch (error) {
    res.status(404).send({ errorMsg: "ERROR", error });
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

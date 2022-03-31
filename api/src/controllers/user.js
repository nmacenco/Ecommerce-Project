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
    console.log(req.body)
    if (
      !name ||
      !surname ||
      !email ||
      !billing_address ||
      !default_shipping_address ||
      // !country_id ||
      !role
    ) {
      res.status(404).json({ "errorMsg": "missing data" });
    } else {
      const newUser = await User.create({
        name,
        surname,
        email,
        billing_address,
        default_shipping_address,
        // country_id,
        role,
        isActive,
      });
      res.status(200).json({ "successfulMsg": "successful", newUser });
    }
  } catch (error) {
    res.status(500).json({ "errorMsg": "ERROR", error });
  }
};

const updateUser = (req, res, next) => {};

const getUsers = async (req, res, next) => {
  try {
    let users = await User.findAll({});
    res.status(200).send({ "successfulMsg": "successful", users });
  } catch (error) {
    res.status(404).send({ "errorMsg": "ERROR", error });
  }
};

const getSingleUser = (req, res, next) => {};

const getUserOrders = (req, res, next) => {};

module.exports = {
  createUser,
  updateUser,
  getUsers,
  getSingleUser,
  getUserOrders,
};

const { Order, User } = require("../db");

const getOrders = async (req, res, next) => {
  try {
    let Orders = await Order.findAll({
      // include: [
      //   {
      //     model: User,
      //     attributes: ["id", "name","surname","email" ],
      //   },
      // ],
    });
    if (!Orders.length) {
      res.status(404).send({ errorMsg: "Oders not found." });
    }
    Orders = Orders.map((Order) => {
      return {
        id: Order.id,
        total_amount: Order.total_amount,
        email_address: Order.email_address,
        status: Order.status,
        billing_address: Order.billing_address,
      };
    });
    res.status(200).send({ successMsg: "Here are your Orders.", Orders });
  } catch (error) {
    res.status(500).send({ errorMsg: error });
  }
};

const setOrder = async (req, res, next) => {
  try {
    let { total_amount, email_address, billing_address, status, UserId } =
      req.body;
    console.log(req.body);
    if (!total_amount || !email_address || !billing_address || !status) {
      res.status(402).send({ errorMsg: "Missing data." });
    } else {
      let neworder = await Order.create({
        total_amount,
        email_address,
        billing_address,
        UserId,
        status,
      });
      res.status(201).json(neworder);
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

module.exports = {
  getOrders,
  setOrder,
};

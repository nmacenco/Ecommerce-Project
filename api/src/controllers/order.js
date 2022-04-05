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
        name: Order.name,
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
const setOrder = async (req, res, next) => {};

module.exports = {
  getOrders,
  setOrder,
};

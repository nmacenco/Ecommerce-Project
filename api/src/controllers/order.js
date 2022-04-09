const { Order, User } = require("../db");

const getOrders = async (req, res, next) => {
  try {
    let Orders = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "surname", "email"],
        },
      ],
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

const getUserOrdersServer = async (req, res) => {
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

//create order (when user creates account, or if there are no pending orders)
const createOrder = async (req, res) => {
  try {
    let { total_amount, email_address, billing_address, status, UserId } =
      req.body;
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

//Add order detail, delete order detail or modify order detail (use aux functions)
const updateOrder = async (req, res) => {
  try {
  } catch (error) {}
};

//send actual order (cart) with it's order-details included.
const getActiveOrder = async (req, res) => {
  try {
  } catch (error) {}
};

//order-detail aux functions

const updateOrderDetail = async (id, quantity) => {
  try {
    if (!amount || !quantity || !OrderId || !ProductId) {
      res.status(402).send({ errorMsg: "Missing data." });
    } else {
      let neworderDetail = await Order_detail.findByPk(id);
      if (!neworderDetail) {
        res.status(401).send({ errorMsg: "Order detail not found." });
      } else {
        let UporderDetail = await neworderDetail.update({
          amount,
          quantity,
          OrderId,
          ProductId,
        });

        res.status(201).json({
          successMsg: "Here are your UP Ordesdetail.",
          data: UporderDetail,
        });
      }
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const deleteOrderDetail = async (id) => {
  try {
  } catch (error) {}
};

const createOrderDetail = async (OrderId, ProductId, quantity) => {
  try {
    if (!amount || !quantity || !OrderId || !ProductId) {
      res.status(402).send({ errorMsg: "Missing data." });
    } else {
      let neworderDetail = await Order_detail.create({
        amount,
        quantity,
        OrderId,
        ProductId,
      });
      res.status(201).json({
        successMsg: "Here are your Ordesdetail.",
        data: neworderDetail,
      });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const getUserOrders = async (id) => {
  try {
  } catch (error) {}
};

module.exports = {
  getOrders,
  createOrder,
  getActiveOrder,
  updateOrder,
  getUserOrdersServer,
};

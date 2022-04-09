const { Order, User, Order_detail } = require("../db");

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
//Possible status: PENDING BILLED DELIVERED COMPLETED
const createOrder = async (req, res) => {
  try {
    let { total_amount, email_address, billing_address, UserId } =
      req.body;
    if (!email_address || !billing_address || !UserId) {
      res.status(402).send({ errorMsg: "Missing data." });
    } else {
      let singleOrder = await Order.findOne({
        where: {
          UserId,
          status: "PENDING",
        }
      });
      if (!singleOrder) {
        let neworder = await Order.create({
          total_amount,
          email_address,
          billing_address,
          UserId,
        });
        res.status(201).send(neworder);
      } else {
        res.status(201).send(singleOrder);
      }
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

//Add order detail, delete order detail or modify order detail (use aux functions)
const updateOrder = async (req, res) => {
  try {
  } catch (error) { }
};

//send actual order (cart) with it's order-details included.
const getActiveOrder = async (req, res) => {
  try {
  } catch (error) { }
};

//order-detail aux functions

const updateOrderDetail = async (id, quantity, OrderId, ProductId, amount) => {
  try {
    if (!amount || !quantity || !OrderId || !ProductId) {
      return "Missing data";
    } else {
      let neworderDetail = await Order_detail.findByPk(id);
      if (!neworderDetail) {
        return "order not found";
      } else {
        let UporderDetail = await neworderDetail.update({
          amount,
          quantity,
          OrderId,
          ProductId,
        });
        return { msg: "updated user", data: neworderDetail };
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

const deleteOrderDetail = async (id) => {
  try {
    if (!id) {
      return "Put an id";
    } else {
      let deletedOrderDetail = await Order_detail.destroy({
        where: {
          id,
        },
      });

      return `OrderDetail was removed: ${deletedOrderDetail}`;
    }
  } catch (error) {
    console.log(error.message);
  }
};

const createOrderDetail = async (OrderId, ProductId, quantity, amount) => {
  try {
    if (!amount || !quantity || !OrderId || !ProductId) {
      return "Missing data.";
    } else {
      const neworderDetail = await Order_detail.create({
        amount,
        quantity,
        OrderId,
        ProductId,
      });
      return { msg: "user created", data: neworderDetail };
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getUserOrders = async (id) => {
  try {
    if (id) {
      let dataOrders = await Order.findAll({
        where: {
          UserId: id,
        },
      });
      if (!dataOrders.length) {
        return "this user has no orders";
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
      return { msg: "User orders", data: dataOrders };
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getOrders,
  createOrder,
  getActiveOrder,
  updateOrder,
  getUserOrdersServer,
};

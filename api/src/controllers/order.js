const { Order, User, Order_detail } = require("../db");

const getOrders = async (req, res) => {
  try {
    let Orders = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "surname", "email"],
        },
        // ALERT: acuerdense de incluir las order details de cada orden.
      ],
    });
    if (!Orders.length) {
      return res.status(404).send({ errorMsg: "Orders not found." });
    }
    Orders = Orders.map((Order) => {
      return {
        id: Order.id,
        total_amount: Order.total_amount,
        email_address: Order.email_address,
        status: Order.status,
        billing_address: Order.billing_address,
        UserId: Order.UserId,
        userName: Order.User.name,
      };
    });
    res.status(200).send({ successMsg: "Here are your Orders.", data: Orders });
  } catch (error) {
    res.status(500).send({ errorMsg: error });
  }
};

const getUserOrdersServer = async (req, res) => {
  const id = req.userID;
  try {
    if (id) {
      let dataOrders = await Order.findAll({
        where: {
          UserId: id,
        },
         // ALERT: acuerdense de incluir las order details de cada orden.
      });
      if (!dataOrders.length) {
        return res.status(404).send({ errorMsg: "Orders not found." });
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
        .send({ successMsg: "Here are your Orders.", data: dataOrders });
    } else {
      res.status(404).send({ errorMsg: "Missing id." });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error });
  }
};

//create order (when user creates account, or if there are no pending orders)
//Possible status: PENDING BILLED DELIVERED COMPLETED
const createOrder = async (req, res) => {
  try {
    let { total_amount, email_address, billing_address, UserId } = req.body;
    if (!email_address || !billing_address || !UserId) {
      res.status(402).send({ errorMsg: "Missing data." });
    } else {
      let singleOrder = await Order.findOne({
        where: {
          UserId,
          status: "PENDING",
        },
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
  } catch (error) {}
};

//send actual order (cart) with it's order-details included.
const getActiveOrder = async (req, res) => {
  try {
    const id = req.userID;
    const activeOrder = Order.findOne({
      where: {
        UserId: id,
        status: "PENDING",
      },
    });
    if (!activeOrder) {
      return res
        .status(404)
        .send({ errorMsg: "You don't have an active order." });
    }
    res
      .status(200)
      .send({ successMsg: "Here is your order.", data: activeOrder });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

//order-detail aux functions

const updateOrderDetail = async (id, quantity, OrderId, ProductId, amount) => {
  try {
    if (!amount || !quantity || !OrderId || !ProductId) {
      return "Missing data";
    } else {
      let orderDetail = await Order_detail.findByPk(id);
      if (!orderDetail) {
        return "order not found";
      } else {
        let UpdatedOrderDetail = await orderDetail.update({
          amount,
          quantity,
          OrderId,
          ProductId,
        });
        return { msg: "updated user", data: UpdatedOrderDetail };
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

const deleteOrderDetail = async (id) => {
  try {
    if (!id) {
      return "Missing id.";
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
      const orderDetail = await Order_detail.create({
        amount,
        quantity,
        OrderId,
        ProductId,
      });
      return { msg: "user created", data: orderDetail };
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
         // ALERT: acuerdense de incluir las order details de cada orden.
      });
      if (!dataOrders.length) {
        return "This user has no orders.";
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

const { Order, User, Order_detail, Product } = require("../db");

const getOrders = async (req, res) => {
  try {
    let Orders = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "surname", "email"],
        },
        {
          model: Order_detail,
          attributes: ["amount", "quantity"],
          include: [
            {
              model: Product,
              attributes: ["name"],
            },
          ],
        },
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
        user: Order.User.name + " " + Order.User.surname,
        billing_address: Order.billing_address,
        detail:
          Order.Order_details.length > 0
            ? Order.Order_details.map((detail) => {
                return { detail };
              })
            : [],
      };
    });
    res.status(200).send({ successMsg: "Here are your Orders.", data: Orders });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const getUserOrdersServer = async (req, res) => {
  const id = req.userID;

  try {
    if (id) {
      let Orders = await Order.findAll({
        where: {
          UserId: id,
        },
        include: [
          {
            model: User,
            attributes: ["id", "name", "surname", "email"],
          },
          {
            model: Order_detail,
            attributes: ["amount", "quantity"],
            include: [
              {
                model: Product,
                attributes: ["name"],
              },
            ],
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
          user: Order.User.name + " " + Order.User.surname,
          billing_address: Order.billing_address,
          detail:
            Order.Order_details.length > 0
              ? Order.Order_details.map((detail) => {
                  return { detail };
                })
              : [],
        };
      });

      res
        .status(200)
        .send({ successMsg: "Here are your Orders.", data: Orders });
    } else {
      res.status(404).send({ errorMsg: "Missing id." });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

//create order (when user creates account, or if there are no pending orders)
//Possible status: PENDING BILLED DELIVERED COMPLETED

const createOrder = async (req, res) => {
  const UserId = req.userID;
  // const { UserId } = req.params;
  try {
    let { allProductsOrder } = req.body;

    if (!UserId) {
      res.status(402).send({ errorMsg: "Missing data." });
    } else {
      let newOrderCreated = await Order.findOne({
        where: {
          UserId,
          status: "PENDING",
        },
      });
      if (!newOrderCreated) {
        let newOrder = await Order.create({
          UserId,
        });
        newOrderCreated = newOrder;
      }

      if (allProductsOrder) {
        for (let index = 0; index < allProductsOrder.length; index++) {
          createOrderDetail(
            newOrderCreated.id,
            allProductsOrder[index].ProductId,
            allProductsOrder[index].quantity,
            allProductsOrder[index].amount
          );
        }
      }
      res.status(201).send({
        successMsg: "Here are your new order.",
        data: newOrderCreated,
      });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const updateOrderState = async (req, res) => {
  // const id = req.params.id;
  const id = req.userID;
  let { status } = req.body;
  try {
    if (!id) {
      res.status(404).send({ errorMsg: "Missing id." });
    } else {
      let orderState = await Order.update(
        { status: status },
        { where: { id: id } }
      );
      if (!orderState) {
        res.status(404).send({ errorMsg: "order not found" });
      } else {
        res
          .status(201)
          .send({ successMsg: "Order has been updated", data: orderState });
      }
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

//send actual order (cart) with it's order-details included.
const getActiveOrder = async (req, res) => {
  try {
    const id = req.userID;
    let activeOrder = await Order.findOne({
      where: {
        UserId: id,
        status: "PENDING",
      },
      include: [
        {
          model: User,
          attributes: ["id", "name", "surname", "email"],
        },
        {
          model: Order_detail,
          attributes: ["amount", "quantity"],
          include: [
            {
              model: Product,
              attributes: ["name"],
            },
          ],
        },
      ],
    });
    if (!activeOrder) {
      return res
        .status(404)
        .send({ errorMsg: "You don't have an active order." });
    }
    activeOrder = {
      id: activeOrder.id,
      total_amount: activeOrder.total_amount,
      email_address: activeOrder.email_address,
      status: activeOrder.status,
      user: activeOrder.User.name + " " + activeOrder.User.surname,
      billing_address: activeOrder.billing_address,
      detail:
        activeOrder.Order_details.length > 0
          ? activeOrder.Order_details.map((detail) => {
              return { detail };
            })
          : [],
    };
    res
      .status(200)
      .send({ successMsg: "Here is your order.", data: activeOrder });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

// *******add and remove a product from the detail******

//Add order detail, delete order detail or modify order detail (use aux functions)
const addproductsOrder = async (req, res) => {
  const id = req.userID;
  // const { id } = req.params;
  try {
    const { Productid } = req.body;
    if (!Productid) {
      return res.status(404).send({ errorMsg: "You don't have any products." });
    } else {
      let product = await Product.findOne({
        where: {
          id: Productid,
        },
      });
      const { activeUserOrder } = await orderuseractive(id);

      let orderDetail = await Order_detail.findOne({
        where: {
          OrderId: activeUserOrder.id,
          ProductId: Productid,
        },
      });

      if (!orderDetail) {
        const newOrderProduct = await createOrderDetail(
          activeUserOrder.id,
          Productid,
          (quantity = 1)
        );
        res.status(200).send({
          successMsg: "Order has been CREATE",
          data: newOrderProduct,
        });
      } else {
        const amountoltal = product.price * orderDetail.quantity + 1;
        let UpdatedOrderDetail = await orderDetail.update({
          amount: amountoltal,
          quantity: orderDetail.quantity + 1,
        });
        res.status(201).send({
          successMsg: "Order has been updated",
          data: UpdatedOrderDetail,
        });
      }
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const removeproductsOrder = async (req, res) => {
  const id = req.userID;
  // const { id } = req.params;
  try {
    const { Productid } = req.body;
    let product = await Product.findOne({
      where: {
        id: Productid,
      },
    });
    const { activeUserOrder } = await orderuseractive(id);
    let orderDetail = await Order_detail.findOne({
      where: {
        OrderId: activeUserOrder.id,
        ProductId: Productid,
      },
    });
    const amountoltal = product.price * orderDetail.quantity - 1;

    let UpdatedOrderDetail = await orderDetail.update({
      amount: amountoltal,
      quantity: orderDetail.quantity - 1,
    });
    res.status(201).send({
      successMsg: "Order has been updated",
      data: UpdatedOrderDetail,
    });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const deleteproductsOrder = async (req, res) => {
  const id = req.userID;
  // // const { id } = req.params;
  try {
    const { Productid } = req.body;
    if (!Productid) {
      return res.status(404).send({ errorMsg: "You don't have any products." });
    } else {
      const { activeUserOrder } = await orderuseractive(id);
      let orderDetail = await Order_detail.findOne({
        where: {
          OrderId: activeUserOrder.id,
          ProductId: Productid,
        },
      });
      deleteOrderDetail(orderDetail.id);
      res.status(201).send({
        successMsg: "Order has been delete",
      });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

//                           PRODUCT ID
const deleteOrderDetail = async (id) => {
  try {
    let deletedOrderDetail = await Order_detail.destroy({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

const createOrderDetail = async (OrderId, ProductId, quantity, amount) => {
  try {
    const orderDetailyet = await Order_detail.findOne({
      where: {
        OrderId,
        ProductId,
      },
    });
    let product = await Product.findOne({
      where: {
        id: ProductId,
      },
    });

    if (!orderDetailyet) {
      const newOrderProduct = await Order_detail.create({
        amount: product.price * quantity,
        quantity,
        OrderId,
        ProductId,
      });
      return newOrderProduct;
    } else {
      await orderDetailyet.update({
        amount: orderDetailyet.amount + amount,
        quantity: orderDetailyet.quantity + quantity,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const orderuseractive = async (id) => {
  try {
    let activeUserOrder = await Order.findOne({
      where: {
        UserId: id,
        status: "PENDING",
      },
      include: [
        {
          model: User,
          attributes: ["id", "name", "surname", "email"],
        },
        {
          model: Order_detail,
          attributes: ["amount", "quantity"],
          include: [
            {
              model: Product,
              attributes: ["name"],
            },
          ],
        },
      ],
    });
    if (!activeUserOrder) {
      return "no active orders";
    }
    activeUserOrder = {
      id: activeUserOrder.id,
      total_amount: activeUserOrder.total_amount,
      email_address: activeUserOrder.email_address,
      status: activeUserOrder.status,
      user: activeUserOrder.User.name + " " + activeUserOrder.User.surname,
      billing_address: activeUserOrder.billing_address,
      detail:
        activeUserOrder.Order_details.length > 0
          ? activeUserOrder.Order_details.map((detail) => {
              return { detail };
            })
          : [],
    };
    return { activeUserOrder };
  } catch (error) {
    return error.message;
  }
};

const getUserOrders = async (id) => {
  try {
    if (id) {
      let dataOrders = await Order.findAll({
        where: {
          UserId: id,
        },
        include: [
          {
            model: User,
            attributes: ["id", "name", "surname", "email"],
          },
          {
            model: Order_detail,
            attributes: ["amount", "quantity"],
            include: [
              {
                model: Product,
                attributes: ["name"],
              },
            ],
          },
        ],
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
          detail:
            Order.Order_details.length > 0
              ? Order.Order_details.map((detail) => {
                  return { detail };
                })
              : [],
        };
      });
      return { dataOrders };
    }
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  getOrders,
  createOrder,
  getActiveOrder,
  updateOrderState,
  getUserOrdersServer,
  addproductsOrder,
  removeproductsOrder,
  deleteproductsOrder,
  getUserOrders,
};

const { Order, User, Order_detail, Product } = require("../db");
require("dotenv").config();
const {
  ORDER_STATUS_PENDING,
  ORDER_STATUS_BILLED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_FINISHED,
} = process.env;

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
              attributes: ["name", "id", "image", "price"],
            },
          ],
        },
      ],
    });
    if (Orders.length <= 0) {
      return res.status(404).send({ errorMsg: "Orders not found." });
    }
    Orders = Orders.map((Order) => {
      return {
        id: Order.id,
        total_amount: Order.total_amount,
        email_address: Order.email_address,
        status: Order.status,
        user: Order.User.name + " " + Order.User.surname,
        userID: Order.User.id,
        billing_address: Order.billing_address,
        details:
          Order.Order_details.length > 0
            ? Order.Order_details.map((detail) => {
                return {
                  id: detail.id,
                  amount: detail.amount,
                  quantity: detail.quantity,
                  productName: detail.Product.name,
                  productId: detail.Product.id,
                  image: detail.Product.image,
                  price: detail.Product.price,
                };
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
  try {
    const id = req.userID;
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
          attributes: ["amount", "quantity", "id"],
          include: [
            {
              model: Product,
              attributes: ["name", "id", "image", "price"],
            },
          ],
        },
      ],
    });
    if (!Orders.length) {
      return res.status(404).send({ errorMsg: "You don't have orders." });
    }
    Orders = Orders.map((Order) => {
      return {
        id: Order.id,
        total_amount: Order.total_amount,
        email_address: Order.email_address,
        status: Order.status,
        user: Order.User.name + " " + Order.User.surname,
        userID: Order.User.id,
        billing_address: Order.billing_address,
        details:
          Order.Order_details.length > 0
            ? Order.Order_details.map((detail) => {
                return {
                  id: detail.id,
                  amount: detail.amount,
                  quantity: detail.quantity,
                  productName: detail.Product.name,
                  productId: detail.Product.id,
                  image: detail.Product.image,
                  price: detail.Product.price,
                };
              })
            : [],
      };
    });

    res.status(200).send({ successMsg: "Here are your orders.", data: Orders });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

//create order (when user creates account, or if there are no pending orders)
//Possible status: PENDING BILLED DELIVERED COMPLETED
//Fine
const createOrder = async (req, res) => {
  const UserId = req.userID;
  try {
    let allProductsOrder = req.body;
    if (!UserId) {
      res.status(400).send({ errorMsg: "Missing data." });
    } else {
      let user = await User.findOne({ where: { id: UserId } });
      let [newOrder, created] = await Order.findOrCreate({
        where: { UserId, status: "PENDING" },
      });
      if (created) {
        await newOrder.update({
          email_address: user.email,
          billing_address: user.billing_address,
        });
      }
      if (!allProductsOrder.length) {
        return res.status(200).send({
          successMsg: "Order successfully created/updated.",
          data: newOrder,
        });
      }
      for (let product of allProductsOrder) {
        const amount = product.count * product.price;
        await createOrderDetail(
          newOrder.id,
          product.ProductId,
          product.count,
          amount
        );
      }
      let orderDetails = await Order_detail.findAll({
        where: { OrderId: newOrder.id },
      });
      const totalAmount = orderDetails.reduce((a, detail) => {
        return a + detail.dataValues.amount;
      }, 0);
      await newOrder.update({
        total_amount: totalAmount,
      });
      res.status(201).send({
        successMsg: "Order successfully created/updated.",
        data: newOrder,
      });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const updateOrderState = async (req, res) => {
  const id = req.params.id;
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
              attributes: ["name", "id", "image", "price"],
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
      userID: Order.User.id,
      billing_address: activeOrder.billing_address,
      details:
        activeOrder.Order_details.length > 0
          ? activeOrder.Order_details.map((detail) => {
              return {
                id: detail.id,
                amount: detail.amount,
                quantity: detail.quantity,
                productName: detail.Product.name,
                productId: detail.Product.id,
                image: detail.Product.image,
                price: detail.Product.price,
              };
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
const addProductsOrder = async (req, res) => {
  const id = req.userID;
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
      const { activeUserOrder } = await userActiveOrder(id);

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
          //no le paso amount...
        );
        res.status(200).send({
          successMsg: "Order has been CREATE",
          data: newOrderProduct,
        });
      } else {
        const amountoltal = product.price * orderDetail.quantity + 1;
        //No actualiza total amount de la order...
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

const removeProductsOrder = async (req, res) => {
  const id = req.userID;
  // const { id } = req.params;
  try {
    const { Productid } = req.body;
    let product = await Product.findOne({
      where: {
        id: Productid,
      },
    });
    const { activeUserOrder } = await userActiveOrder(id);
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

const deleteProductsOrder = async (req, res) => {
  const id = req.userID;
  try {
    const { Productid } = req.body;
    if (!Productid) {
      return res.status(404).send({ errorMsg: "You don't have any products." });
    } else {
      const { activeUserOrder } = await userActiveOrder(id);
      let orderDetail = await Order_detail.findOne({
        where: {
          OrderId: activeUserOrder.id,
          ProductId: Productid,
        },
      });
      await deleteOrderDetail(orderDetail.id);
      res.status(201).send({
        successMsg: "Order has been deleted",
      });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

//PRODUCT ID
const deleteOrderDetail = async (id) => {
  try {
    await Order_detail.destroy({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

//Fine
const createOrderDetail = async (OrderId, ProductId, quantity, amount) => {
  try {
    let product = await Product.findOne({
      where: {
        id: ProductId,
      },
    });
    if (!product) {
      throw new Error("Product not found");
    }
    let isOrderDetailCreated = await Order_detail.findOne({
      where: { OrderId, ProductId },
    });
    if (isOrderDetailCreated) {
      await isOrderDetailCreated.update({
        quantity: isOrderDetailCreated.quantity + quantity,
        amount: isOrderDetailCreated.amount + amount,
      });
      return isOrderDetailCreated;
    } else {
      let newOrderDetail = await Order_detail.create({
        OrderId,
        ProductId,
        quantity,
        amount,
      });
      return newOrderDetail;
    }
  } catch (error) {
    console.log(error.message);
  }
};

const userActiveOrder = async (id) => {
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
              attributes: ["name", "id", "image", "price"],
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
      userID: activeUserOrder.User.id,
      billing_address: activeUserOrder.billing_address,
      detail:
        activeUserOrder.Order_details.length > 0
          ? activeUserOrder.Order_details.map((detail) => {
              return {
                id: detail.id,
                amount: detail.amount,
                quantity: detail.quantity,
                productName: detail.Product.name,
                productId: detail.Product.id,
                image: detail.Product.image,
                price: detail.Product.price,
              };
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
                attributes: ["name", "id", "image", "price"],
              },
            ],
          },
        ],
      });
      if (dataOrders.length <= 0) {
        return "This user has no orders.";
      }
      dataOrders = dataOrders.map((Order) => {
        return {
          id: Order.id,
          total_amount: Order.total_amount,
          email_address: Order.email_address,
          billing_address: Order.billing_address,
          UserID: Order.User.id,
          status: Order.status,
          detail:
            Order.Order_details.length > 0
              ? Order.Order_details.map((detail) => {
                  return {
                    id: detail.id,
                    amount: detail.amount,
                    quantity: detail.quantity,
                    productName: detail.Product.name,
                    productId: detail.Product.id,
                    image: detail.Product.image,
                    price: detail.Product.price,
                  };
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

const updatePaypalOrder = async (req, res) => {
  let { paymentMethod } = req.body;
  try {
    let orderPaypal = await Order.findById(req.params.id);
    if (!orderPaypal) {
      res.status(401).send({ message: "Order Not Found" });
    } else {
      let updatedOrder = await orderPaypal.update({
        status: ORDER_STATUS_BILLED,
        isPaid: true,
        paidAt: Date.now(),
        paymentMethod: paymentMethod,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        isDelivered: false,
        email_address: email_address,
        billing_address: billing_address,
      });
      res.status(201).send({ successMsg: "Order Paid", data: updatedOrder });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};
module.exports = {
  getOrders,
  createOrder,
  getActiveOrder,
  updateOrderState,
  getUserOrdersServer,
  addProductsOrder,
  removeProductsOrder,
  deleteProductsOrder,
  getUserOrders,
  updatePaypalOrder,
};

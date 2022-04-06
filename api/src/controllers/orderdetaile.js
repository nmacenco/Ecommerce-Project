const { Order_detail } = require("../db");

const getOrderdetailes = async (req, res) => {
  const { productId, OrderiD } = req.body;
  try {
    console.log(productId, OrderiD);
    if (productId && OrderiD) {
      let OrdersDetail = await Order_detail.findAll({
        where: {
          OrderId: OrderiD,
          ProductId: productId,
        },
      });
      if (!OrdersDetail.length) {
        res.status(404).send({ errorMsg: "OrdersDetail detaile not found" });
      }
      OrdersDetail = OrdersDetail.map((Order) => {
        return {
          id: Order.id,
          amount: Order.amount,
          quantity: Order.quantity,
          OrderId: Order.OrderId,
          ProductId: Order.ProductId,
        };
      });
      res
        .status(200)
        .send({ successMsg: "Here are your Ordes.", data: OrdersDetail });
    } else {
      res.status(404).send({ errorMsg: "missing id" });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error });
  }
};
const setOrderDetail = async (req, res) => {
  try {
    let { amount, quantity, OrderId, ProductId } = req.body;
    console.log(req.body);
    if (!amount || !quantity || !ProductId || !OrderId) {
      res.status(402).send({ errorMsg: "Missing data." });
    } else {
      let neworderDetail = await Order_detail.create({
        amount,
        quantity,
        OrderId,
        ProductId,
      });
      res
        .status(201)
        .json({ successMsg: "Here are your Ordes.", data: neworderDetail });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

module.exports = { getOrderdetailes, setOrderDetail };

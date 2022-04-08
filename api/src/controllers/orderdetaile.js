const { Order_detail, Order, Product } = require("../db");

const getOrdersdetailes = async (req, res) => {
  try {
    let OrdersDetail = await Order_detail.findAll({
      include: [
        {
          model: Order,
          attributes: ["id", "email_address"],
        },
        {
          model: Product,
          attributes: ["name", "price"],
        },
      ],
    });
    if (!OrdersDetail.length) {
      res.status(404).send({ errorMsg: "OrdersDetail detaile not found" });
    }
    OrdersDetail = OrdersDetail.map((Order) => {
      return {
        id: Order.id,
        amount: Order.amount,
        quantity: Order.quantity,
        Order: Order.Order,
        Product: Order.Product,
      };
    });
    res
      .status(200)
      .send({ successMsg: "Here are your Ordes.", data: OrdersDetail });
  } catch (error) {
    res.status(500).send({ errorMsg: error });
  }
};
const getOrderdetail = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).send({ errorMsg: "Missing data." });
    } else {
      let OrdersDetail = await Order_detail.findOne({
        where: {
          id,
        },
        include: [
          {
            model: Order,
            attributes: ["id", "email_address"],
          },
          {
            model: Product,
            attributes: ["name", "price"],
          },
        ],
      });
      if (!OrdersDetail.length) {
        res.status(404).send({ errorMsg: "OrdersDetail detaile not found" });
      }
      OrdersDetail = OrdersDetail.map((Order) => {
        return {
          id: Order.id,
          amount: Order.amount,
          quantity: Order.quantity,
          Order: Order.Order,
          Product: Order.Product,
        };
      });
      res
        .status(200)
        .send({ successMsg: "Here are your Ordes.", data: OrdersDetail });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error });
  }
};

const updateOrderDetail = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    let { amount, quantity, OrderId, ProductId } = req.body;

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

const setOrderDetail = async (req, res) => {
  try {
    let { amount, quantity, OrderId, ProductId } = req.body;

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

module.exports = {
  getOrdersdetailes,
  setOrderDetail,
  updateOrderDetail,
  getOrderdetail,
};

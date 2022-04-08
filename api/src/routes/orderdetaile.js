const express = require("express");
const {
  getOrdersdetailes,
  setOrderDetail,
  updateOrderDetail,
} = require("../controllers/orderdetaile");

//Creating routes and adding the controllers.

const orderDetailRouter = express.Router();
orderDetailRouter.get("/ordersdetail", getOrdersdetailes);
orderDetailRouter.put("/ordersdetail/:id", updateOrderDetail);

orderDetailRouter.post("/ordersdetail", setOrderDetail);

module.exports = orderDetailRouter;

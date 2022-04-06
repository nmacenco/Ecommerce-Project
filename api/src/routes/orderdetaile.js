const express = require("express");
const {
  getOrderdetailes,
  setOrderDetail,
} = require("../controllers/orderdetaile");

//Creating routes and adding the controllers.

const orderDetailRouter = express.Router();

orderDetailRouter.get("/ordersdetail", getOrderdetailes);

orderDetailRouter.post("/ordersdetail", setOrderDetail);

module.exports = orderDetailRouter;

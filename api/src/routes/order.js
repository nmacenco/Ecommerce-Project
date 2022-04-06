const express = require("express");
const { setOrder } = require("../controllers/order");

//Creating routes and adding the controllers.

const orderRouter = express.Router();

// orderRouter.get("/orders", getOrders);

orderRouter.post("/orders", setOrder);

module.exports = orderRouter;

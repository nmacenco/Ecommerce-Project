const express = require("express");
const { getOrders, createOrder,getActiveOrder,updateOrder,getUserOrdersServer } = require("../controllers/order");
const { isLoggedIn, isAdmin } = require("../middleware/auth");

//Creating routes and adding the controllers.

const orderRouter = express.Router();


//user
orderRouter.post("/auth/orders", isLoggedIn, createOrder);
orderRouter.put("/auth/orders/:id", isLoggedIn, updateOrder);
orderRouter.get("/auth/orders", isLoggedIn, getUserOrdersServer);
orderRouter.get("/auth/orders/:id",isLoggedIn, getActiveOrder);


//admin
orderRouter.get("/orders",isLoggedIn, isAdmin, getOrders);

//make route for admin to see specifically user orders.

module.exports = orderRouter;

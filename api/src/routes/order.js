const express = require("express");
const {
  getOrders,
  createOrder,
  getActiveOrder,
  updateOrderState,
  getUserOrdersServer,
  addproductsOrder,
  remuveproductsOrder,
  deleteproductsOrder,getUserOrders
} = require("../controllers/order");
const { isLoggedIn, isAdmin } = require("../middleware/auth");

//Creating routes and adding the controllers.

const orderRouter = express.Router();

//user
orderRouter.post("/auth/orders/", createOrder); //a new product is added to the cart here

orderRouter.put("/auth/orders/:id", isLoggedIn, updateOrderState);
orderRouter.get("/auth/orders/user/:id", isLoggedIn, getUserOrdersServer);
orderRouter.put("/auth/orders/add/:id", isLoggedIn, addproductsOrder);// add one more existing product +
orderRouter.put("/auth/orders/remuve/:id", isLoggedIn, remuveproductsOrder);//remuve one more existing product -
orderRouter.delete("/auth/orders/delete/:id", isLoggedIn, deleteproductsOrder);
orderRouter.get("/auth/orders/:id", isLoggedIn, getActiveOrder);

//admin
orderRouter.get("/admin/orders", getOrders);
orderRouter.get("/admin/orders", getUserOrders); //is all your status
//make route for admin to see specifically user orders.

module.exports = orderRouter;

const express = require("express");
const {
  getOrders,
  createOrder,
  getActiveOrder,
  updateOrderState,
  getUserOrdersServer,
  addproductsOrder,
  removeproductsOrder,
  deleteproductsOrder,
  getUserOrders,
  updatePaypalOrder,
  updateOrder
} = require("../controllers/order");
const { isLoggedIn, isAdmin } = require("../middleware/auth");

//Creating routes and adding the controllers.

const orderRouter = express.Router();

//user

orderRouter.get("/auth/orders/:id", isLoggedIn, getActiveOrder);
orderRouter.get("/auth/orders/user/:id", isLoggedIn, getUserOrdersServer);
orderRouter.put("/auth/orders/info/:id", isLoggedIn,updateOrder);

orderRouter.post("/auth/orders",isLoggedIn, createOrder); //a new product is added to the cart here
orderRouter.put("/auth/orders/add/:id", isLoggedIn, addproductsOrder);// add one more existing product +
orderRouter.put("/auth/orders/remove/:id", isLoggedIn, removeproductsOrder);//remuve one more existing product -
orderRouter.put('/auth/:id/pay', isLoggedIn, updatePaypalOrder )
orderRouter.delete("/auth/orders/delete/:id", isLoggedIn, deleteproductsOrder);

//admin
orderRouter.get("/admin/orders", getOrders);
orderRouter.get("/admin/orders/userall/:id", getUserOrders); //is all your status
orderRouter.put("/admin/orders/state/:id", isLoggedIn, isAdmin,updateOrderState);
//make route for admin to see specifically user orders.

module.exports = orderRouter;

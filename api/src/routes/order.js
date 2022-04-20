const express = require("express");
const {
  getOrders,
  createOrder,
  getActiveOrder,
  updateOrderState,
  getUserOrdersServer,
  addProductsOrder,
  removeProductsOrder,
  deleteProductsOrder,
  updatePaypalOrder,
  updateOrder,
} = require("../controllers/order");
const { isLoggedIn, isAdmin } = require("../middleware/auth");

//Creating routes and adding the controllers.

const orderRouter = express.Router();

//user
orderRouter.post("/auth/orders", isLoggedIn, createOrder); //a new product is added to the cart here

orderRouter.put("/auth/orders/info/:id", isLoggedIn, updateOrder);
orderRouter.get("/auth/orders/user", isLoggedIn, getUserOrdersServer);
orderRouter.put("/auth/orders/add", isLoggedIn, addProductsOrder); // add one more existing product +
orderRouter.put("/auth/orders/remove", isLoggedIn, removeProductsOrder); //remove one more existing product -
orderRouter.delete(
  "/auth/orders/delete/:ProductId",
  isLoggedIn,
  deleteProductsOrder
);
orderRouter.get("/auth/orders", isLoggedIn, getActiveOrder);
orderRouter.put("/auth/orders/pay/:id", isLoggedIn, updatePaypalOrder);


//admin
orderRouter.put(
  "/admin/orders/state/:id",
  isLoggedIn,
  isAdmin,
  updateOrderState
);
orderRouter.get("/admin/orders", isLoggedIn, isAdmin, getOrders);

module.exports = orderRouter;

const express = require("express");
const {
  getOrders,
  createOrder,
  getActiveOrder,
  updateOrderState,
  getUserOrdersServer,
  addproductsOrder,
  remuveproductsOrder,
  deleteproductsOrder,
  getUserOrders,
  detailAllOrdersUser,
} = require("../controllers/order");
const { isLoggedIn, isAdmin } = require("../middleware/auth");

//Creating routes and adding the controllers.

const orderRouter = express.Router();

// //user
orderRouter.post("/auth/orders/:UserId", createOrder); //a new product is added to the cart here

// orderRouter.put("/auth/orders/:id",  updateOrderState);
// orderRouter.get("/auth/orders/user/:id",  getUserOrdersServer);
// orderRouter.put("/auth/orders/add/:id",  addproductsOrder);// add one more existing product +
// orderRouter.put("/auth/orders/remuve/:id",  remuveproductsOrder);//remuve one more existing product -
// orderRouter.delete("/auth/orders/delete/:id",  deleteproductsOrder);
// orderRouter.get("/auth/orders/:id",  getActiveOrder);

orderRouter.put("/auth/orders/:id", isLoggedIn, updateOrderState);
orderRouter.get("/auth/orders/user/:id", isLoggedIn, getUserOrdersServer);
orderRouter.put("/auth/orders/add/:id", isLoggedIn, addproductsOrder); // add one more existing product +
orderRouter.put("/auth/orders/remuve/:id", isLoggedIn, remuveproductsOrder); //remuve one more existing product -
orderRouter.delete("/auth/orders/delete/:id", isLoggedIn, deleteproductsOrder);
orderRouter.get("/auth/orders/:id", isLoggedIn, getActiveOrder);
orderRouter.get("/auth/orders/userOrders/:id", isLoggedIn, detailAllOrdersUser);

//admin
orderRouter.get("/admin/orders", getOrders);
orderRouter.get("/admin/orders/userall/:id", getUserOrders); //is all your status
//make route for admin to see specifically user orders.

module.exports = orderRouter;

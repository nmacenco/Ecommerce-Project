const express = require("express");
const { getOrders, createOrder,getActiveOrder,updateOrderState,getUserOrdersServer,addproductsOrder } = require("../controllers/order");
const { isLoggedIn, isAdmin } = require("../middleware/auth");

//Creating routes and adding the controllers.

const orderRouter = express.Router();


//user
orderRouter.post("/auth/orders",  createOrder);
orderRouter.put("/auth/orders/:id",  updateOrderState);
orderRouter.get("/auth/orders/user/:id", getUserOrdersServer);
orderRouter.put("/auth/orders/update/:id", addproductsOrder);
orderRouter.get("/auth/orders/:id", getActiveOrder);


// orderRouter.post("/auth/orders", isLoggedIn, createOrder);
// orderRouter.put("/auth/orders/:id", isLoggedIn, updateOrderState);
// orderRouter.put("/auth/orders/update/:id", isLoggedIn, addproductsOrder);
// orderRouter.get("/auth/orders", isLoggedIn, getUserOrdersServer);
// orderRouter.get("/auth/orders/:id",isLoggedIn, getActiveOrder);


//admin
orderRouter.get("/admin/orders", getOrders);


//make route for admin to see specifically user orders.

module.exports = orderRouter;

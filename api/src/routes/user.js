const express = require("express");
const {
  createUser,
  updateUser,
  getUsers,
  getSingleUser,
  getUserOrders,
  signIn,
  logOut,
} = require("../controllers/user.js");
const { isAdmin, isLoggedIn } = require("../middleware/auth");

//Creating routes and adding the controllers.
const userRouter = express.Router();

//admin
userRouter.get("/admin/users", /* isAdmin */ getUsers);
userRouter.get("/admin/users/:id", /* isAdmin */ getSingleUser);
userRouter.put("/admin/users/:id", /* isAdmin */ updateUser);
userRouter.get("/admin/users/:id/getOrders", /* isAdmin */ getUserOrders);

//user
userRouter.get("/auth/users/:id", /* isLoggedIn */ getSingleUser);
userRouter.put("/auth/users/:id", /* isLoggedIn */ updateUser);
userRouter.get("/auth/users/:id/getOrders", /* isLoggedIn */ getUserOrders);
userRouter.delete("/auth/logout", /* isLoggedIn */ logOut);

//guest
userRouter.post("/users", createUser);
userRouter.post("/signIn", signIn);

module.exports = userRouter;

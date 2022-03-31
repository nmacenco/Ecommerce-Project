const express = require("express");
const {
  createUser,
  updateUser,
  getUsers,
  getSingleUser,
  getUserOrders,
} = require("../controllers/user.js");

//Creating routes and adding the controllers.

const userRouter = express.Router();

userRouter.get("/users", getUsers);

userRouter.get("/users/:id", getSingleUser);

userRouter.put("/users/:id", updateUser);

userRouter.get("/users/:id/getOrders", getUserOrders);

userRouter.post("/users", createUser);

module.exports = userRouter;

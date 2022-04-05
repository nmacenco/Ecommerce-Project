const express = require("express");
const {
  createUser,
  updateUser,
  getSingleUser,
  getUserOrders,
  signIn,
  logOut,
  googleLogIn,
  googleLogOut,
} = require("../controllers/user.js");
const { getUsers } = require("../controllers/admin");
require("../auth/passport-setup");
const passport = require("passport");
const { isAdmin, isLoggedIn } = require("../middleware/auth");

//Creating routes and adding the controllers.
const userRouter = express.Router();

//admin
userRouter.get("/admin/users", /* isAdmin */ getUsers);
userRouter.get("/admin/users/:id", /* isAdmin */ getSingleUser);
userRouter.put("/admin/users/:id", /* isAdmin */ updateUser);
userRouter.get("/admin/users/:id/getOrders", /* isAdmin */ getUserOrders);
userRouter.post("/admin/users", /* isAdmin */ createUser);

//user
userRouter.get("/auth/users", isLoggedIn, getSingleUser);
userRouter.put("/auth/users", isLoggedIn, updateUser);
userRouter.get("/auth/users", isLoggedIn, getUserOrders);
userRouter.delete("/auth/logOut", isLoggedIn, logOut);

//guest local sign in, sign up and sign out
userRouter.post("/signUp", createUser);
userRouter.post("/signIn", signIn);
userRouter.post("/logOut", logOut);

//guest google sign in/login in and log out
userRouter.get(
  "/signInWithGoogle",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
userRouter.get(
  "/signInWithGoogle/callback",
  passport.authenticate("google"),
  googleLogIn
);
userRouter.get("/googleLogOut", googleLogOut);

module.exports = userRouter;

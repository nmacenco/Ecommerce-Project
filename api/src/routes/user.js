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
  googleUpdateProfile,
  passwordReset,
  forgotAndForcedResetPassword
} = require("../controllers/user.js");
const {
  adminGetUsers,
  adminGetUser,
  adminUpdateUser,
  adminCreateUser,
} = require("../controllers/admin");
require("../auth/passport-setup");
const passport = require("passport");
const { isAdmin, isLoggedIn } = require("../middleware/auth");

//Creating routes and adding the controllers.
const userRouter = express.Router();

//admin
userRouter.get("/admin/users", isLoggedIn, isAdmin, adminGetUsers);
userRouter.get("/admin/users/:id", isLoggedIn, isAdmin, adminGetUser);
userRouter.put("/admin/users/:id", isLoggedIn, isAdmin, adminUpdateUser);
userRouter.get(
  "/admin/users/getOrders/:id",
  isLoggedIn,
  isAdmin,
  getUserOrders
);
userRouter.post("/admin/users", isLoggedIn, isAdmin, adminCreateUser);

//user
userRouter.get("/auth/users", isLoggedIn, getSingleUser);
userRouter.put("/auth/users", isLoggedIn, updateUser);
userRouter.get("/auth/users", isLoggedIn, getUserOrders);
userRouter.delete("/auth/logOut", isLoggedIn, logOut);
userRouter.put("/auth/users/passwordReset", isLoggedIn, passwordReset);

//guest local sign in, sign up and sign out
userRouter.put("/forcedPasswordReset/:id", forgotAndForcedResetPassword);
userRouter.post("/signUp", createUser);
userRouter.post("/signIn", signIn);
userRouter.put("/forgotPassword/:id", forgotAndForcedResetPassword);

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
userRouter.get("/googleLogOut", isLoggedIn, googleLogOut);
userRouter.put("/updateGoogleProfile", isLoggedIn, googleUpdateProfile);

module.exports = userRouter;

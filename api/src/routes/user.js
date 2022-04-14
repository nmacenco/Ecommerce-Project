const express = require("express");
const {
  createUser,
  updateUser,
  getSingleUser,
  signIn,
  logOut,
  googleUpdateProfile,
  passwordReset,
  forgotAndForcedResetPassword,
  activateAccount,
  googleSignIn,
  googleSignUp,
} = require("../controllers/user.js");
const {
  adminGetUsers,
  adminGetUser,
  adminUpdateUser,
  adminCreateUser,
} = require("../controllers/admin");
const { isAdmin, isLoggedIn } = require("../middleware/auth");

//Creating routes and adding the controllers.
const userRouter = express.Router();

//admin
userRouter.get("/admin/users", isLoggedIn, isAdmin, adminGetUsers);
userRouter.get("/admin/users/:id", isLoggedIn, isAdmin, adminGetUser);
userRouter.put("/admin/users/:id", isLoggedIn, isAdmin, adminUpdateUser);
userRouter.post("/admin/users", isLoggedIn, isAdmin, adminCreateUser);

//user
userRouter.get("/auth/users", isLoggedIn, getSingleUser);
userRouter.put("/auth/users", isLoggedIn, updateUser);
userRouter.delete("/auth/logOut", isLoggedIn, logOut);
userRouter.put("/auth/users/passwordReset", isLoggedIn, passwordReset);

//guest
userRouter.put("/submitPasswordReset/:id", forgotAndForcedResetPassword);
userRouter.post("/signUp", createUser);
userRouter.post("/signIn", signIn);
userRouter.get("/activateAccount/:id", activateAccount);

//google
userRouter.post("/signInWithGoogle", googleSignIn);
userRouter.post("/signUpWithGoogle", googleSignUp);
userRouter.put("/updateGoogleProfile", isLoggedIn, googleUpdateProfile);

module.exports = userRouter;

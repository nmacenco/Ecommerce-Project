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
userRouter.get("/auth/users/:id", /* isLoggedIn */ getSingleUser);
userRouter.put("/auth/users/:id", /* isLoggedIn */ updateUser);
userRouter.get("/auth/users/:id/getOrders", /* isLoggedIn */ getUserOrders);
userRouter.delete("/auth/logout", /* isLoggedIn */ logOut);

//guest
userRouter.post("/users", createUser);
userRouter.post("/signIn", signIn);
userRouter.get(
  "/signInWithGoogle",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

userRouter.get(
  "/signInWithGoogle/callback",
  passport.authenticate("google", {
    successRedirect: "/api/success",
    failureRedirect: "/api/failed",
  })
);

userRouter.get("/failed", (req, res) => {
  res.send({ error: "Error al autenticar" });
});

userRouter.get("/success", (req, res) => {
  res.send({ Bien: "Usted ha sido logueado." });
});

userRouter.get("/googleLogOut", (req, res) => {
  console.log("logged out!");
  req.session = null;
  req.logout();
  res.redirect('/api/users');
});
module.exports = userRouter;

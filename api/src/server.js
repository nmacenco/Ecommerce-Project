const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const {
  productRouter,
  userRouter,
  countryRouter,
  categoryRouter,
  brandRouter,
  subCategoryRouter,
  orderRouter,
  reviewsRouter,
  questionsRouter,  
  mailRouter,
} = require("./routes/allRoutes.js");
const server = express();
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();

//Adding middleware and configuring server
server.name = "API";
server.use(cors());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cookieParser());
server.use(morgan("dev"));
server.use(session({ secret: "SECRET" }));
server.use(passport.initialize());
server.use(passport.session());
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.ORIGIN || "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Adding routes
server.use("/api", productRouter);
server.use("/api", userRouter);
server.use("/api", countryRouter);
server.use("/api", categoryRouter);
server.use("/api", brandRouter);
server.use("/api", subCategoryRouter);
server.use("/api", orderRouter);
server.use("/api", reviewsRouter);
server.use("/api", questionsRouter);
server.use("/api", mailRouter);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;

const productRouter = require("./product");
const userRouter = require("./user");
const countryRouter = require("./country");
const categoryRouter = require("./category");
const brandRouter = require("./brand");
const subCategoryRouter = require("./subcategory");
const orderRouter = require("./order.js");
const reviewsRouter = require("./review");
const questionsRouter = require("./question");
const mailRouter = require("./mailer");
const wishlistRouter = require("./wishlist");

module.exports = {
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
  wishlistRouter,
};

const express = require("express");
const {
  createProduct,
  updateProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
} = require("../controllers/product.js");

//Creating routes and adding the controllers.

const productRouter = express.Router();
const { isAdmin } = require("../middleware/auth");

//guest and user
productRouter.get("/products", getProducts);
productRouter.get("/products/:id", getSingleProduct);

//admin
productRouter.put("/admin/products/:id", /* isAdmin */ updateProduct);
productRouter.post("/admin/products", /* isAdmin */ createProduct);
productRouter.delete("/admin/products/:id", /* isAdmin */ deleteProduct);

module.exports = productRouter;

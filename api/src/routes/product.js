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

productRouter.get("/products", getProducts);

productRouter.get("/products/:id", getSingleProduct);

productRouter.put("/products/:id", updateProduct);

productRouter.post("/products", createProduct);

productRouter.delete("/products/:id", deleteProduct);


module.exports = productRouter;

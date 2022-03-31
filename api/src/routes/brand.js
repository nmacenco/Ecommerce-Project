const express = require("express");
const { getBrands, createBrand } = require("../controllers/brand.js");

//Creating routes and adding the controllers.

const brandRouter = express.Router();

brandRouter.get("/brands", getBrands);

brandRouter.post("/brands", createBrand);

module.exports = brandRouter;

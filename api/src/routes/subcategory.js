const express = require("express");
const { getSubCategories, createSubCategory } = require("../controllers/subcategory.js");

//Creating routes and adding the controllers.

const subCategoryRouter = express.Router();

subCategoryRouter.get("/subcategories", getSubCategories);

subCategoryRouter.post("/subcategories", createSubCategory);

module.exports = subCategoryRouter;
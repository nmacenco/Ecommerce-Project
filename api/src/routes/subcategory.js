const express = require("express");
const { getSubCategories, createSubCategory,deleteSubcategory } = require("../controllers/subcategory.js");

//Creating routes and adding the controllers.

const subCategoryRouter = express.Router();

subCategoryRouter.get("/subcategories", getSubCategories);
subCategoryRouter.post("/subcategories", createSubCategory);
subCategoryRouter.delete("/subcategories/:id", deleteSubcategory);

module.exports = subCategoryRouter;
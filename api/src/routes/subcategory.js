const express = require("express");
const { getSubCategories, createSubCategory,deleteSubcategory } = require("../controllers/subcategory.js");

//Creating routes and adding the controllers.

const subCategoryRouter = express.Router();
const { isLoggedIn, isAdmin } = require("../middleware/auth");


subCategoryRouter.get("/subcategories", getSubCategories);
subCategoryRouter.post("/admin/subcategories", isLoggedIn, isAdmin, createSubCategory);
subCategoryRouter.delete("/admin/subcategories/:id",isLoggedIn, isAdmin, deleteSubcategory);

module.exports = subCategoryRouter;
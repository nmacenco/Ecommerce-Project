const express = require("express");
const { getCategories, createCategory, deleteCategory } = require("../controllers/category.js");

//Creating routes and adding the controllers.

const categoryRouter = express.Router();
const { isLoggedIn, isAdmin } = require("../middleware/auth");

categoryRouter.get("/categories", getCategories);

categoryRouter.post("/admin/categories", isLoggedIn, isAdmin, createCategory);
categoryRouter.delete("/admin/categories/:id",isLoggedIn, isAdmin, deleteCategory);


module.exports = categoryRouter;

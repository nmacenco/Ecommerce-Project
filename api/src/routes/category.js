const express = require("express");
const { getCategories, createCategory, deleteCategory } = require("../controllers/category.js");

//Creating routes and adding the controllers.

const categoryRouter = express.Router();

categoryRouter.get("/categories", getCategories);

categoryRouter.post("/categories", createCategory);
categoryRouter.delete("/categories/:id", deleteCategory);

module.exports = categoryRouter;

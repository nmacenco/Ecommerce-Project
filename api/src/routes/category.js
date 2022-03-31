const express = require("express");
const { getCategories, createCategory } = require("../controllers/category.js");

//Creating routes and adding the controllers.

const categoryRouter = express.Router();

categoryRouter.get("/categories", getCategories);

categoryRouter.post("/categories", createCategory);

module.exports = categoryRouter;

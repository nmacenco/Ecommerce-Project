const { Category } = require("../db");

const getCategories = async (req, res, next) => {
  try {
    let dataCategory = await Category.findAll({});
    if (!dataCategory.length) {
      res.status(404).send({ errorMsg: "Categories not found." });
    }
    res
      .status(200)
      .send({ successMsg: "Here are your categories.", data:dataCategory });
  } catch (error) {
    res.status(500).send({ errorMsg: error });
  }
};

const createCategory = async (req, res, next) => {
  try {
    let { name } = req.body;
    if (!name) {
      res.status(400).send({ errorMsg: "Missing data." });
    } else {
      const newCategory = await Category.create({ name });
      res
        .status(201)
        .send({ successMsg: "Category successfully created.", data:newCategory });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error });
  }
};

module.exports = { getCategories, createCategory };

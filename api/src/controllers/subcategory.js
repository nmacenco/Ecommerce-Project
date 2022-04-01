const { Subcategory } = require("../db");

const getSubCategories = async (req, res, next) => {
  try {
    let dataSubCategory = await Subcategory.findAll({});
    if (!dataSubCategory.length) {
      res.status(404).send({ errorMsg: "Subcategories not found." });
    }
    res.status(200).send({
      successMsg: "Here are your subcategories.",
      data: dataSubCategory,
    });
  } catch (error) {
    res.status(500).send({ errorMsg: error });
  }
};

const createSubCategory = async (req, res, next) => {
  try {
    let { name, CategoryId } = req.body;
    if (!name || !CategoryId) {
      res.status(400).send({ errorMsg: "Missing data" });
    } else {
      const newSubCategory = await Subcategory.create({
        name,
        CategoryId,
      });
      res.status(201).send({
        successMsg: "Subcategory successfully created.",
        data: newSubCategory,
      });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

module.exports = { getSubCategories, createSubCategory };

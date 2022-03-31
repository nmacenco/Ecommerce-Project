const { Subcategory } = require("../db");

const getSubCategories = (req, res, next) => {
    try {
        let dataSubCategory = await Subcategory.findAll({
        });
        res.status(200).json(dataSubCategory);
      } catch (error) {
        res.status(500);
        console.log(error);
      }
};

const createSubCategory = (req, res, next) => {
        try {
      let { name, category_id } = req.body;
      if (!name) {
        res.status(404).send("Falta data");
      } else {
        const newSubCategory = await Subcategory.create({ name,category_id });
        res.status(200).json(newSubCategory);
      }
    } catch (error) {
      console.log(error);
    }
};

module.exports = { getSubCategories, createSubCategory };
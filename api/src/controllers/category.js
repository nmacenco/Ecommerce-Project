const { Category } = require("../db");

const getCategories = (req, res, next) => {
    try {
        let dataCategory = await Category.findAll({
        });
        res.status(200).json(dataCategory);
      } catch (error) {
        res.status(500);
        console.log(error);
      }
};

const createCategory = (req, res, next) => {
        try {
      let { name } = req.body;
      if (!name) {
        res.status(404).send("Falta data");
      } else {
        const newCategory = await Category.create({ name });
        res.status(200).json(newCategory);
      }
    } catch (error) {
      console.log(error);
    }
};

module.exports = { getCategories, createCategory };









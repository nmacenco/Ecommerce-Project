const { Category, Subcategory } = require("../db");

const getCategories = async (req, res, next) => {
  try {
    let dataCategory = await Category.findAll({});
    if (!dataCategory.length) {
      res.status(404).send({ errorMsg: "Categories not found." });
    }
    dataCategory = dataCategory.map((category) => {
      return {
        name: category.name,
        id: category.id,
      };
    });
    res
      .status(200)
      .send({ successMsg: "Here are your categories.", data: dataCategory });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const createCategory = async (req, res, next) => {
  try {
    let { name } = req.body;
    if (!name) {
      res.status(400).send({ errorMsg: "Missing data." });
    } else {
      const [newCategory, created] = await Category.findOrCreate({
        where: {
          name,
        },
      });
      created
        ? res.status(201).send({
            successMsg: "Category successfully created.",
            data: newCategory,
          })
        : res.status(400).send({ errorMsg: "Category already exists." });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const id = req.params.id;
  try {
    let dataSubcategory = await Subcategory.findAll({
      where: {
        CategoryId: id,
      },
    });
    if (dataSubcategory.length <=0) {
      let deleteCategorydb = await Category.destroy({
        where: {
          id,
        },
      });
      deleteCategorydb
        ? res.status(200).send({
          successMsg: "Category has been deleted.",
          data: deleteCategorydb,
        })
        : res.status(401).send({ errorMsg: "Category doesn't exist" });
    } else {
      res.status(401).send({ errorMsg: "Category can't be deleted because has associated Subcategories" });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};




module.exports = { getCategories, createCategory,deleteCategory };

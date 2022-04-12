const { Subcategory, Product } = require("../db");

const getSubCategories = async (req, res, next) => {
  try {
    let dataSubCategory = await Subcategory.findAll({});
    if (!dataSubCategory.length) {
      res.status(404).send({ errorMsg: "Subcategories not found." });
    }
    dataSubCategory = dataSubCategory.map((sub) => {
      return {
        name: sub.name,
        id: sub.id,
        CategoryId: sub.CategoryId,
      };
    });
    res.status(200).send({
      successMsg: "Here are your subcategories.",
      data: dataSubCategory,
    });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const createSubCategory = async (req, res, next) => {
  try {
    let { name, CategoryId } = req.body;
    if (!name || !CategoryId) {
      res.status(400).send({ errorMsg: "Missing data" });
    } else {
      const [newSubCategory, created] = await Subcategory.findOrCreate({
        where: {
          name,
          CategoryId,
        },
      });
      created
        ? res.status(201).send({
          successMsg: "Subcategory successfully created.",
          data: newSubCategory,
        })
        : res.status(400).send({ errorMsg: "Subcategory already exists." });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const deleteSubcategory = async (req, res) => {
  const id = req.params.id;
  try {
    let dataProduct = await Product.findAll({
      where: {
        SubcategoryId: id,
      },
    });
    if (dataProduct.length <=0) {
      let deletedSubcategory = await Subcategory.destroy({
        where: {
          id,
        },
      });
      deletedSubcategory
        ? res.status(200).send({
          successMsg: "Subcategory has been deleted.",
          data: deletedSubcategory,
        })
        : res.status(401).send({ errorMsg: "Subcategory doesn't exist" });
    } else {
      res.status(401).send({ errorMsg: "Subcategory can't be deleted because have associated products" });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};


module.exports = { getSubCategories, createSubCategory, deleteSubcategory };

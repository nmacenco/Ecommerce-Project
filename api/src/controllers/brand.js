const { Brand, Product_Brand } = require("../db");

const getBrands = async (req, res, next) => {
  try {
    let databrand = await Brand.findAll({
      //find the game in the database and return
    });
    res.status(200).json(databrand);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

const createBrand = async (req, res, next) => {
  try {
    let { name } = req.body;
    if (!name) {
      res.status(404).send("Falta data");
    } else {
      const newbrand = await Brand.create({ name });
      console.log(newbrand);
      res.status(200).json(newbrand);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getBrands, createBrand };

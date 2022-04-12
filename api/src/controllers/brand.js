const { Brand } = require("../db");

const getBrands = async (req, res, next) => {
  try {
    let dataBrand = await Brand.findAll({});
    if (!dataBrand.length) {
      res.status(404).send({ errorMsg: "Brands not found" });
    }
    dataBrand = dataBrand.map((brand) => {
      return {
        name: brand.name,
        id: brand.id,
      };
    });
    res
      .status(200)
      .send({ successMsg: "Here are your brands.", data: dataBrand });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const createBrand = async (req, res, next) => {
  try {
    let { name } = req.body;
    if (!name) {
      res.status(400).send({ errorMsg: "Missing data" });
    } else {
      const [newBrand, created] = await Brand.findOrCreate({
        where: {
          name,
        },
      });
      created
        ? res
            .status(201)
            .send({ successMsg: "Brand successfully created.", data: newBrand })
        : res.status(400).send({ errorMsg: "Brand already exists." });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

module.exports = { getBrands, createBrand };

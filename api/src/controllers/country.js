const { Country } = require("../db");

const getCountries = async (req, res, next) => {
  try {
    let countries = await Country.findAll({});
    if (!countries.length) {
      res.status(404).send({ errorMsg: "Countries not found." });
    }
    res.status(200).send({ successMsg: "successfully", countries });
  } catch (error) {
    res.status(500).send({ errorMsg: error });
  }
};
const setCountries = async (req, res) => {
  try {
    let { name, code } = req.body;
    if (!name || !code) {
      res.status(400).send({ errorMsg: "Missing data" });
    } else {
      const newCountry = await Country.create({ name, code });
      res
        .status(201)
        .send({ successMsg: "Country successfully created.", data: newCountry });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error });
  }
};

module.exports = { getCountries, setCountries };

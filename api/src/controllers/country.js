const { Country } = require("../db");

const getCountries = async (req, res, next) => {
  try {
    let countries = await Country.findAll({});
    if (!countries.length) {
      res.status(404).send({ errorMsg: "Countries not found." });
    }
    countries = countries.map((country) => {
      return {
        name: country.name,
        code: country.code,
        id: country.id,
      };
    });
    res.status(200).send({ successMsg: "Here are your countries.", countries });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};
const setCountries = async (req, res) => {
  try {
    let { name, code } = req.body;
    if (!name || !code) {
      res.status(400).send({ errorMsg: "Missing data." });
    } else {
      const [newCountry, created] = await Country.findOrCreate({
        where: {
          name,
          code,
        },
      });
      created
        ? res.status(201).send({
            successMsg: "Country successfully created.",
            data: newCountry,
          })
        : res.status(400).send({ errorMsg: "Country already exists." });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

module.exports = { getCountries, setCountries };

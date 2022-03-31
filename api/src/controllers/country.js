const { Country } = require("../db");

const getCountries = async (req, res, next) => {
  try {
    let users = await Country.findAll({});
    res.status(200).send({ successMsg: "successfully", users });
  } catch (error) {
    res.status(404).send({ errorMsg: "ERROR", error });
  }
};
const setCountries = async (req, res) => {
  try {
    let { name, code } = req.body;
    if (!name || !code) {
      res.status(404).send({ errorMsg: "Missing data" });
    } else {
      const newCountry = await Country.create({ name, code });
      res
        .status(200)
        .send({ successMsg: "successfully created.", data: newCountry });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error });
  }
};

module.exports = { getCountries, setCountries };

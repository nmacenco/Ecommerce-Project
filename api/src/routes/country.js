const express = require("express");
const  getCountries  = require("../controllers/country.js");

//Creating routes and adding the controllers.

const countryRouter = express.Router();

countryRouter.get("/countries", getCountries);

module.exports = countryRouter;

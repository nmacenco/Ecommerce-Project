const { Category, Brand, Subcategory, Product, Country } = require("../db");
const fs = require("fs");
const axios = require("axios");

//Just to fill the db.
const bulkCreateCategories = async () => {
  try {
    let data = fs.readFileSync(__dirname + "/../json/categories.json", "utf8");
    data = JSON.parse(data);
    for (let i = 0; i < data.length; i++) {
      await Category.findOrCreate({
        where: {
          name: data[i].name,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const bulkCreateBrands = async () => {
  try {
    let data = fs.readFileSync(__dirname + "/../json/brands.json", "utf8");
    data = JSON.parse(data);
    for (let i = 0; i < data.length; i++) {
      await Brand.findOrCreate({
        where: {
          name: data[i].name,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const bulkCreateSubcategories = async () => {
  try {
    let data = fs.readFileSync(
      __dirname + "/../json/subcategories.json",
      "utf8"
    );
    data = JSON.parse(data);
    for (let i = 0; i < data.length; i++) {
      await Subcategory.findOrCreate({
        where: {
          name: data[i].name,
          CategoryId: data[i].category_id,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const bulkCreateProducts = async () => {
  try {
    let data = fs.readFileSync(__dirname + "/../json/products.json", "utf8");
    data = JSON.parse(data);
    for (let i = 0; i < data.length; i++) {
      await Product.findOrCreate({
        where: {
          name: data[i].name,
          image: data[i].image,
          price: parseFloat(data[i].price.trim().replace("US$ ", "")).toFixed(
            2
          ),
          description: data[i].description,
          weight: data[i].weight,
          stock: data[i].stock,
          soldCount: data[i].soldCount,
          BrandId: data[i].BrandId,
          SubcategoryId: data[i].SubcategoryId,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const bulkCreateCountries = async () => {
  try {
    let response = await axios.get("https://restcountries.com/v3.1/all");
    const countries = response.data.map((country) => {
      return { name: country.name.common, code: country.cca3 };
    });
    for (let i = 0; i < countries.length; i++) {
      Country.findOrCreate({
        where: {
          name: countries[i].name,
          code: countries[i].code,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  bulkCreateCategories,
  bulkCreateBrands,
  bulkCreateSubcategories,
  bulkCreateProducts,
  bulkCreateCountries,
};

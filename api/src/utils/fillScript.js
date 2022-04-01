const { Category, Brand, Subcategory } = require("../db");
const fs = require("fs");

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
   let data = fs.readFileSync(__dirname +"/../json/brands.json", "utf8" )
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

const bulkCreateSubcategories = async()=>{
  try {
    let data = fs.readFileSync(__dirname +"/../json/subcategories.json", "utf8" );
    data = JSON.parse(data);
    for(let i = 0; i < data.length; i++) {
      Subcategory.findOrCreate({
        where: {
          name: data[i].name,
          CategoryId: data[i].category_id
        }
      })
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  bulkCreateCategories,
  bulkCreateBrands,
  bulkCreateSubcategories
};

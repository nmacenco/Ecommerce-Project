const server = require("./src/server.js");
const { conn } = require("./src/db.js");
const {
  bulkCreateCategories,
  bulkCreateBrands,
  bulkCreateSubcategories,
  bulkCreateProducts,
  bulkCreateCountries
} = require("./src/utils/fillScript");

// Syncing all the models at once.
const PORT = process.env.PORT || 3001;

conn.sync({ force: false }).then(() => {
  server.listen(PORT, async () => {
    console.log(`Listening at port ${PORT}`); // eslint-disable-line no-console

    //Fill database from here. Disable the second time if force: false is activated.
    await bulkCreateCategories();
    await bulkCreateBrands();
    await bulkCreateSubcategories();
    await bulkCreateProducts();
    await bulkCreateCountries();
  });
});

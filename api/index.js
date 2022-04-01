const server = require("./src/server.js");
const { conn } = require("./src/db.js");
const {
  bulkCreateCategories,
  bulkCreateBrands,
  bulkCreateSubcategories,
} = require("./src/utils/fillScript");

// Syncing all the models at once.
const PORT = process.env.PORT || 3001;

conn.sync({ force: true }).then(() => {
  server.listen(PORT, async () => {
    console.log(`Listening at port ${PORT}`); // eslint-disable-line no-console

    //Fill database from here.
    await bulkCreateCategories();
    await bulkCreateBrands();
    await bulkCreateSubcategories();
  });
});

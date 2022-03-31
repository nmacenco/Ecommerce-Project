const server = require('./src/server.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
const PORT = process.env.PORT || 3001;

conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`); // eslint-disable-line no-console
  });
});
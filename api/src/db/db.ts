require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

let sequelize = new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        { logging: false, native: false }
      );
const basename = path.basename(__filename);
const modelDefiners: any = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "../models"))
  .filter(
    (file: any) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file: any) => {
    modelDefiners.push(require(path.join(__dirname, "../models", file)));
    console.log(modelDefiners)
  });
// console.log(modelDefiners)
// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model: any) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);
console.log(sequelize.models);
// // En sequelize.models están todos los modelos importados como propiedades
// // Para relacionarlos hacemos un destructuring
 const { User, Product } = sequelize.models;

//Relations, from M to N
// Type.belongsToMany(Pokemon, { through: "pokemon_types" });
// Pokemon.belongsToMany(Type, { through: "pokemon_types" });

module.exports = {
  ...sequelize.models,
  db: sequelize,
};

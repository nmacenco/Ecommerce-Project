require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

//Connection
let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        { logging: false, native: false }
      );

//Injecting models into connection
const basename = path.basename(__filename);
const modelDefiners = [];
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });
modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

//Models
const {
  Brand,
  Category,
  Country,
  Order,
  Order_detail,
  Product,
  Question,
  Review,
  Subcategory,
  User,
} = sequelize.models;

//Entity-relations
User.hasMany(Order);
Order.belongsTo(User);
User.hasMany(Review);
Review.belongsTo(User);
User.hasMany(Question);
Question.belongsTo(User);
Order.hasMany(Order_detail);
Order_detail.belongsTo(Order);
Product.hasMany(Order_detail);
Order_detail.belongsTo(Product);
Product.hasMany(Review);
Review.belongsTo(Product);
Product.hasMany(Question);
Question.belongsTo(Product);
Brand.hasMany(Product);
Product.belongsTo(Brand);
Subcategory.hasMany(Product);
Product.belongsTo(Subcategory);
Category.hasMany(Subcategory);
Subcategory.belongsTo(Category);
Country.hasMany(User);
User.belongsTo(Country);
Product.belongsToMany(User, { through: "Wish_List" });
User.belongsToMany(Product, { through: "Wish_List" });


module.exports = {
  ...sequelize.models,
  conn: sequelize,
};

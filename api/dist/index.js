"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db/db");
const server_1 = __importDefault(require("./server/server"));
db_1.Product.belongsToMany(db_1.Category, { through: 'product_category' });
db_1.Category.belongsToMany(db_1.Product, { through: 'product_category' });
// Product.associate = function (models) {
//     Product.belongsToMany(models.User, {
//         as: 'users' ,
//         through : 'products_users',
//         foreignKey : 'id_product' ,
//         otherKey : 'id_user',
//         timestamps : false 
//     }),
db_1.Brand.sync({ force: true })
    .then(() => { })
    .catch((error) => {
    console.log(error);
});
db_1.Category.sync({ force: true })
    .then(() => { })
    .catch((error) => {
    console.log(error);
});
db_1.Country.sync({ force: true })
    .then(() => { })
    .catch((error) => {
    console.log(error);
});
db_1.Order.sync({ force: true })
    .then(() => { })
    .catch((error) => {
    console.log(error);
});
db_1.Order_Detail.sync({ force: true })
    .then(() => { })
    .catch((error) => {
    console.log(error);
});
db_1.Product.sync({ force: true })
    .then(() => { })
    .catch((error) => {
    console.log(error);
});
db_1.Question.sync({ force: true })
    .then(() => { })
    .catch((error) => {
    console.log(error);
});
db_1.Review.sync({ force: true })
    .then(() => { })
    .catch((error) => {
    console.log(error);
});
db_1.Subcategory.sync({ force: true })
    .then(() => { })
    .catch((error) => {
    console.log(error);
});
db_1.User.sync({ force: true })
    .then(() => { })
    .catch((error) => {
    console.log(error);
});
// Category.belongsToMany(Product, { through: 'dog_temperament' });
// Product.belongsToMany(Category, { through: 'dog_temperament' });
db_1.User.hasMany(db_1.sequelize.models.Order, {});
const PORT = process.env.PORT || 3001;
server_1.default.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`); // eslint-disable-line no-console
});
//# sourceMappingURL=index.js.map
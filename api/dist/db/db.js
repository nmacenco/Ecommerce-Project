"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.User = exports.Subcategory = exports.Review = exports.Question = exports.Product = exports.Order_Detail = exports.Order = exports.Country = exports.Category = exports.Brand = void 0;
require('dotenv').config();
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
let sequelize = new sequelize_1.Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, { logging: false, native: false });
exports.sequelize = sequelize;
// const { User, Product } = sequelize.models;
const Brand = sequelize.define('Brand', {
    id: {
        type: sequelize_2.DataTypes.UUID,
        defaultValue: sequelize_2.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
    },
});
exports.Brand = Brand;
const Category = sequelize.define('Category', {
    id: {
        type: sequelize_2.DataTypes.UUID,
        defaultValue: sequelize_2.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
    },
});
exports.Category = Category;
const Country = sequelize.define('Country', {
    id: {
        type: sequelize_2.DataTypes.UUID,
        defaultValue: sequelize_2.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
    },
});
exports.Country = Country;
const Order = sequelize.define('Order', {
    id: {
        type: sequelize_2.DataTypes.UUID,
        defaultValue: sequelize_2.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    // user_id: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    // },
    total_amount: {
        type: sequelize_2.DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
        defaultValue: true,
    },
});
exports.Order = Order;
const Order_Detail = sequelize.define('Order_Detail', {
    id: {
        type: sequelize_2.DataTypes.UUID,
        defaultValue: sequelize_2.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    order_id: {
        type: sequelize_2.DataTypes.UUID,
        allowNull: false,
    },
    product_id: {
        type: sequelize_2.DataTypes.UUID,
        allowNull: false,
    },
    price: {
        type: sequelize_2.DataTypes.FLOAT,
        allowNull: false,
    },
    quantity: {
        type: sequelize_2.DataTypes.INTEGER,
        allowNull: false,
    },
});
exports.Order_Detail = Order_Detail;
const Product = sequelize.define('Product', {
    id: {
        type: sequelize_2.DataTypes.UUID,
        defaultValue: sequelize_2.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    subcategory_id: {
        type: sequelize_2.DataTypes.UUID,
        allowNull: false,
    },
    brand_id: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: true,
    },
    price: {
        type: sequelize_2.DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        type: sequelize_2.DataTypes.TEXT,
        allowNull: true,
    },
    weight: {
        type: sequelize_2.DataTypes.FLOAT,
        allowNull: false,
    },
    stock: {
        type: sequelize_2.DataTypes.INTEGER,
        allowNull: false,
    },
    soldCount: {
        type: sequelize_2.DataTypes.INTEGER,
        allowNull: false,
    },
});
exports.Product = Product;
const Question = sequelize.define('Question', {
    id: {
        type: sequelize_2.DataTypes.UUID,
        defaultValue: sequelize_2.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    product_id: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_2.DataTypes.TEXT,
        allowNull: false,
    },
    answer: {
        type: sequelize_2.DataTypes.TEXT,
    },
});
exports.Question = Question;
const Review = sequelize.define('Review', {
    id: {
        type: sequelize_2.DataTypes.UUID,
        defaultValue: sequelize_2.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    //fk
    product_id: {
        type: sequelize_2.DataTypes.UUID,
        allowNull: false,
    },
    //fk
    user_id: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_2.DataTypes.TEXT,
        allowNull: false,
    },
    stars: {
        type: sequelize_2.DataTypes.INTEGER,
        allowNull: false,
    },
});
exports.Review = Review;
const Subcategory = sequelize.define('Subcategory', {
    id: {
        type: sequelize_2.DataTypes.UUID,
        defaultValue: sequelize_2.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    category_id: {
        type: sequelize_2.DataTypes.UUID,
        allowNull: false,
    },
    name: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
    },
});
exports.Subcategory = Subcategory;
const User = sequelize.define('User', {
    id: {
        type: sequelize_2.DataTypes.UUID,
        defaultValue: sequelize_2.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
    },
    surname: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
    },
    billing_address: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
    },
    default_shipping_address: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
    },
    country_id: {
        type: sequelize_2.DataTypes.UUID,
        allowNull: false,
    },
    role: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
    },
});
exports.User = User;
//# sourceMappingURL=db.js.map
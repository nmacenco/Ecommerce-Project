"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    sequelize.define("product", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        subcategory_id: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
        },
        brand_id: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false,
        },
        description: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
        },
        weight: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false,
        },
        stock: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        soldCount: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
    });
};
//# sourceMappingURL=Product.js.map
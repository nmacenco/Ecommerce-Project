"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    sequelize.define("user", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        surname: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        billing_address: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        default_shipping_address: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        country_id: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
        },
        role: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    });
};
//# sourceMappingURL=User.js.map
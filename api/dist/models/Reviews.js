"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    sequelize.define("Reviews", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        //fk
        product_id: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
        },
        //fk
        user_id: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        stars: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
    });
};
//# sourceMappingURL=Reviews.js.map
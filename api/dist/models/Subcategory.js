"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    sequelize.define("subcategory", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        category_id: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        }
    });
};
//# sourceMappingURL=Subcategory.js.map
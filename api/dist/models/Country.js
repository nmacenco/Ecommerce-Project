"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    sequelize.define("country", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        }
    });
};
//# sourceMappingURL=Country.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
exports.default = (sequelize) => {
    // defino el modelo
    sequelize.define("order_detail", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        order_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
};
//# sourceMappingURL=OrderDetail.js.map
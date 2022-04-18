const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define("Order", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    total_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    orderIdPayment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email_address: {
      type: DataTypes.STRING,
      allowNull: true,
      isEmail: true,
    },
    billing_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    shipping_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },    
    paymentSource: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    shippingPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    taxPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    paidAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "PENDING",
    },
  });
};
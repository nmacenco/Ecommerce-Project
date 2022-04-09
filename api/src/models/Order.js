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
      defaultValue:0,
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
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "PENDING",
    },
  });
};

const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      unique: true,
    },
    billing_address: {
      type: DataTypes.STRING,
      allowNull: true,
<<<<<<< HEAD
      defaultValue: "",
=======
>>>>>>> 429270e707e5c43d403ea7580f2600d53bb1deae
    },
    default_shipping_address: {
      type: DataTypes.STRING,
      allowNull: true,
<<<<<<< HEAD
      defaultValue: "",
    },
    tokens: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: [],
=======
>>>>>>> 429270e707e5c43d403ea7580f2600d53bb1deae
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tokens: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: [],
    },    
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
};

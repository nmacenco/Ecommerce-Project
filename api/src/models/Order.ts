const { DataTypes } = require("sequelize");

export default (sequelize: any) => {
  sequelize.define("order", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: true,
    },
  });
};

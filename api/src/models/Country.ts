import { DataTypes } from "sequelize";

export default (sequelize: any) => {
  sequelize.define("country", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};

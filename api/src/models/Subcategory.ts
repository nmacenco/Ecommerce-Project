import { DataTypes } from "sequelize";

export default (sequelize: any) => {
  sequelize.define("subcategory", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};

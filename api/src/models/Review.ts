import { DataTypes } from "sequelize";

export default (sequelize: any) => {
  sequelize.define("subcategory", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    //fk
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    //fk
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};

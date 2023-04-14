module.exports = (sequelize, dataTypes) => {
  let alias = "Cart";

  let cols = {
    id: {
      type: dataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: dataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
    },
    product_id: {
      type: dataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
    },
    cantidad: {
      type: dataTypes.INTEGER(11).UNSIGNED,
    },
  };
  let config = {
    tableName: "cart",
    timestamps: false,
  };
  const Cart = sequelize.define(alias, cols, config);
};

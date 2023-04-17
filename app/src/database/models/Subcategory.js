module.exports = (sequelize, dataTypes) => {
    let alias = "Subcategory";
  
    let cols = {
      id: {
        type: dataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: dataTypes.STRING(50),
        allowNull: false,
      },
      categories_id:{
        type: dataTypes.INTEGER(11).UNSIGNED,
        allowNull:false
      }
    };
    let config = {
      tableName: "subcategory",
      timestamps: false,
    };
    const Subcategory = sequelize.define(alias, cols, config);

    Subcategory.associate = (models) => {
      Subcategory.belongsTo(models.Category, {
        as: "category",
        foreignKey: "categories_id",
      });
      Subcategory.hasMany(models.Product, {
        as: "products",
        foreignKey: "subcategory_id",
      });
    };
    return Subcategory
  };
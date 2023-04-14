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
    return Subcategory
  };
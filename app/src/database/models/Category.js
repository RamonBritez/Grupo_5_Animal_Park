module.exports = (sequelize, dataTypes) => {
    let alias = "Category";
  
    let cols = {
      id: {
        type: dataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name:{
        type:dataTypes.STRING(30)
      }
    }
let config={
    timestamps:false,
    tableName:"roles"
}
const Category = sequelize.define(alias, cols, config);
Category.associate = (models) => {
  Category.hasMany(models.Product, {
    as: "products",
    foreignKey: "category_id",
  });
};
return Category
}
module.exports = (sequelize, dataTypes) => {
    let alias = "Role";
  
    let cols = {
      id: {
        type: dataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      rol: {
        type: dataTypes.STRING(20),
        allowNull: false,
      },
    };
    let config = {
      tableName: "roles",
      timestamps: false,
    };
    const Role = sequelize.define(alias, cols, config);
    return Role
  };
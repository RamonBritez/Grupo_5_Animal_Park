module.exports = (sequelize, dataTypes) => {
  let alias = "User";
  let cols = {
    id: {
      type: dataTypes.INTEGER(11).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    first_name: {
      type: dataTypes.STRING(20),
      allowNull: false,
    },
    last_name: {
      type: dataTypes.STRING(20),
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING(50),
      allowNull: false,
    },
    avatar: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    pass: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    rol_id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
    },
    address_id: {
      type: dataTypes.INTEGER(11).UNSIGNED,
    },
  };
  let config = {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  const User = sequelize.define(alias, cols, config);

  User.associate = (models) => {
    User.belongsTo(models.Role, {
      as: "user_rol",

      foreignKey: "rol_id",
    });
  };

  return User;
};

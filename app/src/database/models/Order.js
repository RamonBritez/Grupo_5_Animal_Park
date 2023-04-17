module.exports = (sequelize, dataTypes) => {
  let alias = "Order";

  let cols = {
    id: {
      type: dataTypes.INTEGER(11).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    user_id: {
      type: dataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
    },
    total_price: {
      type: dataTypes.DOUBLE(7, 2),
      allowNull: false,
    },
    total_item: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
    },
    active: {
      type: dataTypes.TINYINT(3).UNSIGNED,
      allowNull: false,
    },
  };

  let config = {
    tableName: "orders",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  const Order = sequelize.define(alias, cols, config);

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      as: "user",
      foreignKey: "user_id",
    });
    Order.hasMany(models.Cart, {
      as: "cart",
      foreignKey: "order_id",
    });
  };

  return Order;
};

/*   
    Movie.associate = (models) => {
      Movie.belongsTo(models.Genre, {
        as: "genre",
        foreignKey: "genre_id",
      });
  
      Movie.belongsToMany(models.Actor, {
        as: "actors",
        through: "actor_movie",
        foreignKey: "movie_id",
        otherKey: "actor_id",
        timestamps: false,
      });
    };
  
    return Movie;
  };
   */

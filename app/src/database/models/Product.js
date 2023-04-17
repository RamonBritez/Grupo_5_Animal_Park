module.exports = (sequelize, dataTypes) => {
  let alias = "Product";

  let cols = {
    id: {
      type: dataTypes.INTEGER(11).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: dataTypes.STRING(350),
      allowNull: false,
    },
    price: {
      type: dataTypes.DECIMAL(7, 2).UNSIGNED,
      allowNull: false,
    },
    discount: {
      type: dataTypes.TINYINT(3).UNSIGNED,
      defaultValue: 0,
    },
    weight: {
      type: dataTypes.DECIMAL(4, 1).UNSIGNED,
      defaultValue: 0.0,
    },
    subcategory_id: {
      type: dataTypes.INTEGER(11).UNSIGNED,
    },
    pet_id: {
      type: dataTypes.INTEGER(11).UNSIGNED,
    },
    active: {
      type: dataTypes.TINYINT(1).UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    brand_id: {
      type: dataTypes.INTEGER(11),
    },
  };

  let config = {
    tableName: "products",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  const Product = sequelize.define(alias, cols, config);
  Product.associate = (models) => {
    Product.belongsTo(models.User, {
      as: "user",
      foreignKey: "user_id",
    });
    Product.hasMany(models.Cart, {
      as: "carts",
      foreignKey: "product_id",
    });
    Product.belongsTo(models.Pet, {
      as: "pet",
      foreignKey: "pet_id",
    });
    Product.belongsTo(models.Subcategory, {
        as: "subcategory",
        foreignKey: "subcategory_id",
      });
    Product.belongsTo(models.Brand, {
        as: "brand",
        foreignKey: "brand_id",
      });
    Product.hasMany(models.ProductImage, {
      as: "images",
      foreignKey: "product_id",
    });
  };
  return Product;
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

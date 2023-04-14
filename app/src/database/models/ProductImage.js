module.exports = (sequelize, dataTypes) => {
    let alias = "ProductImage";
  
    let cols = {
      id: {
        type: dataTypes.INTEGER(11).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      image: {
        type: dataTypes.STRING(100),
        allowNull: false,
      },
      product_id: {
        type: dataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
      },
    };
  
    let config = {
      tableName: "product_images",
      timestamps: false
    };
  
    const ProductImage = sequelize.define(alias, cols, config);
  
    return ProductImage;
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
  
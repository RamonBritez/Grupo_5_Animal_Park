module.exports = (sequelize, dataTypes) => {
    let alias = "Brand";
  
    let cols = {
      id: {
        type: dataTypes.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      brand: {
        type: dataTypes.STRING(100),
        allowNull: false,
      }
    };
  
    let config = {
      tableName: "brands",
      timestamps: false
    };
  
    const Brand = sequelize.define(alias, cols, config);
  
    return Brand;
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
  
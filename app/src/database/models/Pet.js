module.exports = (sequelize, dataTypes) => {
    let alias = "Pet";
  
    let cols = {
      id: {
        type: dataTypes.INTEGER(11).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      pet: {
        type: dataTypes.STRING(30),
        allowNull: false,
      }
    };
  
    let config = {
      tableName: "pets",
      timestamps: false
    };
  
    const Pet = sequelize.define(alias, cols, config);
    Pet.associate = (models) => {
      Pet.hasMany(models.Product, {
        as: "products",
        foreignKey: "pet_id",
      });
    };
    return Pet;
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
  
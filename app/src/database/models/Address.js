module.exports = (sequelize, dataTypes) => {
    let alias = "Address";
  
    let cols = {
      id: {
        type: dataTypes.INTEGER(11).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      address: {
        type: dataTypes.STRING(100),
      },
      postal_code: {
        type: dataTypes.STRING(50),
      },
      province: {
        type: dataTypes.STRING(50),
      },
      city: {
        type: dataTypes.STRING(50),
      },
      user_id: {
        type: dataTypes.INTEGER(11).UNSIGNED,
        allowNull: false
      }
    };
  
    let config = {
      tableName: "adresses",
      timestamps: false
    };
  
    const Address = sequelize.define(alias, cols, config);
  
    Address.associate = (models) => {
      Address.belongsTo(models.User, {
        as: "user",
  
        foreignKey: "user_id",
      });
    }
    return Address;
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
  
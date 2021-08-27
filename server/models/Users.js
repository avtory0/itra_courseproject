module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        login: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "normal"
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "user"
        }
    })

    Users.associate =(models) => {
        Users.hasMany(models.Collections, {
            onDelete: "cascade",
        });
  
        Users.hasMany(models.Likes, {
            onDelete: "cascade",
        });

        Users.hasMany(models.Comments, {
            onDelete: "cascade",
        });
    }


    return Users
}
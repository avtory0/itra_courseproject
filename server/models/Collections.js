module.exports = (sequelize, DataTypes) => {
    const Collections = sequelize.define("Collections", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        theme: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    Collections.associate =(models) => {
        Collections.hasMany(models.Items, {
            onDelete: "cascade",
        })
    }
    return Collections
}
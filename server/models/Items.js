module.exports = (sequelize, DataTypes) => {
    const Items = sequelize.define("Items", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tags: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    Items.associate =(models) => {
        Items.hasMany(models.Likes, {
            onDelete: "cascade",
        });

        Items.hasMany(models.Comments, {
            onDelete: "cascade",
        });
    }

    return Items
}
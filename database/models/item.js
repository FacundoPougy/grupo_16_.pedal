module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('Item', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        color: {
            type: DataTypes.ENUM('Blanco', 'Negro', 'Rojo', 'Azul', 'Verde', 'Amarillo', 'Naranja', 'Morado', 'Gris', 'Marrón', 'Rosa'),
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        tableName: 'items',
        timestamps: false
    });

    Item.associate = (models) => {
        Item.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'product_id'
        });
        Item.belongsTo(models.ShoppingCart, {
            as: 'shopping_cart',
            foreignKey: 'item_id'
        });
    };

    return Item;
};
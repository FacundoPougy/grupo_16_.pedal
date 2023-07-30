module.exports = (sequelize, DataType) => {
    const alias = 'Item';

    const cols = {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        color: {
            type: DataType.ENUM('Blanco', 'Negro', 'Rojo', 'Azul', 'Verde', 'Amarillo', 'Naranja', 'Morado', 'Gris', 'Marrón', 'Rosa'),
            allowNull: false
        },
        stock: {
            type: DataType.INTEGER,
            allowNull: false
        },
        image: {
            type: DataType.STRING(255),
            allowNull: false
        }
    }

    const config = {
        tableName: 'items',
        timestamps: false
    }

    const Item = sequelize.define(alias, cols, config);

    Item.associate = models => {
        Item.belongsToMany(models.User, {
            as: 'users',
            foreignKey: 'item_id',
            through: 'ShoppingCart'
        });
    };

    return Item;
}

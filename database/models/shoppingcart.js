module.exports = (sequelize, DataType) => {
    const alias = 'ShoppingCart';

    const cols = {
        user_id: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        item_id: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {
                model: 'items',
                key: 'id'
            }
        },
        quantity: {
            type: DataType.INTEGER,
            allowNull: false
        }
    };

    const config = {
        tableName: 'shopping_cart',
        timestamps: false
    };

    const ShoppingCart = sequelize.define(alias, cols, config);

    return ShoppingCart;
};

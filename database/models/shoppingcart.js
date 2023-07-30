module.exports = (sequelize, DataType) => {
  const alias = 'ShoppingCart';

  const cols = {
      id: {
          type: DataType.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      user_id: {
          type: DataType.INTEGER,
          allowNull: false,
          references: {
              model: 'users',
              key: 'id'
          }
      },
      product_id: {
          type: DataType.INTEGER,
          allowNull: false,
          references: {
              model: 'products',
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

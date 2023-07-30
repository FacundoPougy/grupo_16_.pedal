module.exports = (sequelize, DataType) => {
  const alias = 'StockItem';

  const cols = {
      id: {
          type: DataType.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true
      },
      product_id: {
          type: DataType.INTEGER,
          allowNull: false,
          references: {
              model: 'products',
              key: 'id'
          }
      },
      color: {
          type: DataType.ENUM('Red', 'Green', 'Blue', 'Black', 'White'),
          allowNull: false
      },
      stock: {
          type: DataType.BIGINT,
          allowNull: false
      },
      image: {
          type: DataType.STRING(255),
          allowNull: false
      }
  };

  const config = {
      tableName: 'stock_items',
      timestamps: false
  };

  const StockItem = sequelize.define(alias, cols, config);

  return StockItem;
};

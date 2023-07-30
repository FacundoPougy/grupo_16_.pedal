module.exports = (sequelize, DataType) => {
  const alias = 'Product';

  const cols = {
      id: {
          type: DataType.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      name: {
          type: DataType.STRING(255),
          allowNull: false
      },
      description: {
          type: DataType.TEXT,
          allowNull: false
      },
      category: {
          type: DataType.STRING(50),
          allowNull: false
      },
      price: {
          type: DataType.DECIMAL(10, 2),
          allowNull: false
      },
      stars: {
          type: DataType.DECIMAL(3, 1),
          allowNull: false
      }
  };

  const config = {
      tableName: 'products',
      timestamps: false
  };

  const Product = sequelize.define(alias, cols, config);

  return Product;
};

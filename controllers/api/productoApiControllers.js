const { Product } = require("../../database/models");

const { Sequelize } = require("sequelize");

function groupByID(products, callback) {
  const productsById = products.reduce((acc, product) => {
    const productId = product.id;
    if (!acc[productId]) {
      acc[productId] = {
        id: productId,
        name: product.name,
        description: product.description,
        price: product.price,
        main_image: product.main_image,
        category: product.category,
        detail: `/api/products/${productId}`,
        items: [],
      };
    }

    callback(product, acc[productId]);

    return acc;
  }, {});

  return Object.values(productsById);
}

function itemsConcat(product, productGroup) {
  const item = product.items;

  productGroup.items.push({
    id: item.id,
    color: item.color,
    stock: item.stock,
    product_id: item.product_id,
    image: item.image,
  });
}

module.exports = {
  getAll: async (req, res) => {
    try {
      const products = await Product.findAll({
        include: "items",
        nest: true,
        raw: true,
      });

      const countByCategory = await Product.findAll({
        attributes: [
          "category",
          [Sequelize.fn("COUNT", Sequelize.col("category")), "count"],
        ],
        group: ["category"],
      });

      // construyo un objeto literal con una propiedad por category
      const countByCategoryObject = {};
      countByCategory.forEach((category) => {
        countByCategoryObject[category.category] = category.dataValues.count;
      });

      const productResults = groupByID(products, itemsConcat);

      const response = {
        count: productResults.length,
        countByCategory: countByCategoryObject,
        products: productResults,
      };

      res.json(response);
    } catch (error) {
      console.error("Error al obtener la lista de productos:", error);
      res.status(500).json({
        error: "Ha ocurrido un error al obtener la lista de productos",
      });
    }
  },
  getProduct: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const product = await Product.findByPk(id, {
        include: "items",
      });

      if (!product) {
        res.status(404).json({
          error: "Producto no encontrado",
        });
        return;
      }

      res.json({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        main_image: product.main_image,
        items: product.items,
      });
    } catch (error) {
      console.error("Error al obtener el detalle del producto:", error);
      res.status(500).json({
        error: "Ha ocurrido un error al obtener el detalle del producto",
      });
    }
  },
};

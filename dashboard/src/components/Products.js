import React, { useEffect, useState } from 'react';
import '../static/css/Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        
        if (!response.ok) {
          throw new Error('No se pudo obtener la información de los productos');
        }
        
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="products-container">
      <h2>Productos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Stock: {product.items.reduce((total, item) => total + item.stock, 0)}</p>
            <img src={product.items[0].image} alt={product.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;

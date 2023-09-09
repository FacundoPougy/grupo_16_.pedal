import React, { useEffect, useState } from 'react';
import '../static/css/Products.css';


const SingleItem = ({item}) => {
  return (
  <div className='item-single'>
    <img src={"http://localhost:3000/"+item.image} alt={"Item_"+item.id} />
  </div>
  );
}

const SingleProduct = ({product}) => {
  return (
    <article className='product-single'>

      <div className='titles'>
        <div className='product-title'>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>

        <div className='item-title'>
          <h3>Items</h3>
          <p>Stock total: </p>
        </div>
      </div>

      <div className='togle-container'>
        <div className='product-complete'>
          <img src={"http://localhost:3000/"+product.main_image} alt={"Image_"+product.name} />
        </div>

        <div className='items-complete'>
          {product.items.map((item) => (
            <SingleItem key={item.id} item={item}></SingleItem>
          ))}
        </div>
      </div>

    </article>
  );
}


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
    <section className='products-section'>
      <h2>Productos</h2>
    <div className="products-container">
        {products.map((product) => (
          <SingleProduct key={product.id} product={product}></SingleProduct>
          ))}
    </div>
    </section>
  );
};

export default Products;

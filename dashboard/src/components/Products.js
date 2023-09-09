import React, { useEffect, useState } from 'react';
import '../static/css/Products.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown,faShoppingCart } from '@fortawesome/free-solid-svg-icons';


const SingleItem = ({item}) => {
  return (
  <div className='item-single'>
    <img src={"http://localhost:3000/"+item.image} alt={"Item_"+item.id} />
    <div className='info-item'>
      <p>{"Stock: " + item.stock}</p>
      <p>{"Color: " + item.color}</p>
    </div>
  </div>
  );
}

const SingleProduct = ({product}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleContainer = () => {
    setIsVisible(!isVisible);
  };

  return (
    <article className='product-single'>

      <div className='titles'>
        <FontAwesomeIcon className='arrow-icon' icon={isVisible ? faArrowUp : faArrowDown} onClick={toggleContainer}/>
        
        <div className='product-title'>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>

        <div className='item-title'>
          <h3>Items</h3>
          <p>Stock total:{product.items.reduce((itemAccumulator, item) => itemAccumulator + item.stock,0)}</p>
        </div>
      </div>

      {isVisible && (
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
      )}

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
      <h2> <FontAwesomeIcon icon={faShoppingCart} /> Productos</h2>
    <div className="products-container">
        {products.map((product) => (
          <SingleProduct key={product.id} product={product}></SingleProduct>
          ))}
    </div>
    </section>
  );
};

export default Products;

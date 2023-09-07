import React, { useState, useEffect, useRef } from 'react';

const TotalPanel = ({ label, total }) => (
  <div className="total-panel">
    <h3>{label}</h3>
    <span>{total}</span>
  </div>
);

const TotalsPanel = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        
        const data = await response.json();

        if (isMounted.current) {
          setTotalProducts(data.count);
          setTotalCategories(Object.keys(data.countByCategory).length);
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    }

    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className="app">
      <h1>Estadísticas</h1>
      <div className="total-panels">
        <TotalPanel label="Total de productos" total={totalProducts} />
        <TotalPanel label="Total de categorías de productos" total={totalCategories} />
      </div>
    </div>
  );
};

export default TotalsPanel;

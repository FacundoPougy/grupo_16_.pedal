import React, { useState, useEffect, useRef } from 'react';
import '../static/css/TotalsPanel.css'


const TotalPanel = ({ label, total }) => (
  <div className="total-panel">
    <h3>{label}</h3>
    <span>{total}</span>
  </div>
);

const TotalsPanel = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        const responseUsers = await fetch('http://localhost:3000/api/users');
        
        const data = await response.json();
        const dataUsers = await responseUsers.json();

        if (isMounted.current) {
          setTotalProducts(data.count);
          setTotalCategories(Object.keys(data.countByCategory).length);
          setTotalUsers(dataUsers.count);
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
      <h1>Totales</h1>
      <div className="total-panels">
        <TotalPanel label="Total de productos: " total={totalProducts} />
        <TotalPanel label="Total de categorías de productos: " total={totalCategories} />
        <TotalPanel label="Total de usuarios: " total={totalUsers} />
      </div>
    </div>
  );
};

export default TotalsPanel;

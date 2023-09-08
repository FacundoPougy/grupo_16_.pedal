import React, { useState, useEffect, useRef } from 'react';
import '../static/css/TotalsPanel.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faFolder } from '@fortawesome/free-solid-svg-icons';

const TotalPanel = ({ label, total, icon }) => (
  <div className="total">
    <h3>{label}</h3>
    <div className="number-icon">
      <FontAwesomeIcon icon={icon} />
      <span className='numero'>{total}</span>
    </div>

  </div>
);

const TotalsPanel = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  const isMounted = useRef(true);

  useEffect(() => {
    
    async function fetchData() {
      try {
        if (isMounted.current) {
          const response = await fetch('http://localhost:3000/api/products');
          const responseUsers = await fetch('http://localhost:3000/api/users');
        
          const data = await response.json();
          const dataUsers = await responseUsers.json();

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
    <div className="totals-panel-container">
      <div className="totals-panel-container inner">
        <h1 className="title-totals">Totales</h1>
        <div className="total-panels-each">
          <TotalPanel label="Productos: " total={totalProducts} icon={faShoppingCart}/>
          <TotalPanel label="N° de Categorías: " total={totalCategories} icon={faFolder} />
          <TotalPanel label="Usuarios: " total={totalUsers} icon={faUser}/>
        </div>
      </div>
    </div>
  );
};

export default TotalsPanel;

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import Bars from 'react-bars';
import '../static/css/Categorias.css'


const Categorias = () => {

  const [countByCategory, setcountByCategory] = useState([]);

  const isMounted = useRef(true);

  useEffect(() => {
    
    async function fetchData() {
      try {
        if (isMounted.current) {
          const response = await fetch('http://localhost:3000/api/products');
        
          const {countByCategory} = await response.json();

          const total = Object.values(countByCategory).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
          
          const transformedData = Object.keys(countByCategory).map((category) => ({
            label: category+"s:"+countByCategory[category],
            value: countByCategory[category],
            barColor:'var(--naranja)',
            maxValue:total,
            barBackgroundColor:'var(--blanquito)',
          }));

          setcountByCategory(transformedData);
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
    <div className="categoria-container">
      <div className='title-categoria'>
        <p> <FontAwesomeIcon icon={faFolder} />  Categorias</p>
      </div>
    <div className="bars-container">
      <Bars data={countByCategory} />
    </div>
    </div>
  );
};

export default Categorias;

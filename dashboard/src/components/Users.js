import React, { useEffect, useState } from 'react';
import '../static/css/Users.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/Users');
        
        if (!response.ok) {
          throw new Error('No se pudo obtener la información de los useros');
        }
        
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className='Users-section'>
      <h2>Usuarios</h2>
    <div className="Users-container">

    </div>
    </section>
  );
};

export default Users;

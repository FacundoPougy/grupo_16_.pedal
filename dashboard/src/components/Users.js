import React, { useState, useEffect, useRef } from 'react';
import '../static/css/Users.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser} from '@fortawesome/free-solid-svg-icons';


const User = ({ user }) => {
  return (
    <div className="user-card">
      <img src={"http://localhost:3000/"+user.image} alt={`${user.name} ${user.lastName}`} className="user-image" />
      <div className="user-details">
        <p>{user.name} {user.lastName}</p>
        <p>Email: {user.email}</p>
        <p>Tipo: {user.type}</p>
      </div>
    </div>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);
  
  const isMounted = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isMounted.current) {
        const response = await fetch('http://localhost:3000/api/users');
        
        if (!response.ok) {
          throw new Error('No se pudo obtener la información de los usuarioss');
        }
        
        const data = await response.json();
        setUsers(data.users);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {
      isMounted.current = false;
    };

  }, []);

  return (
    <section className='Users-section'>
      
      <h2> <FontAwesomeIcon icon={faUser} /> Usuarios</h2>
      <div className="Users-container">
        {users.map(user => (
        <User key={user.id} user={user} />
      ))}
      </div>
    </section>
  );
};

export default Users;

import React from 'react';
import { Link } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css' // Importa los estilos de Bootstrap
import '../static/css/Header.css'


const Header = (props) => {
  return (
    <header>
      <nav className="main-header navbar navbar-expand-lg navbar-light main-header">
        <Link className="navbar-brand" to="/">
            <img className="logo-img" src={props.logoImage} alt="Logo de .pedal" />
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users">Usuarios</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;

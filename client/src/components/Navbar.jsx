import React from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={`navbar navbar-expand-lg navbar-custom ${styles.navbar}`}>
      <div className="container-fluid">
        <div className="navbar-header">
          <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="pruebas.html">Inicio</a>
              <a className="nav-link" href="contacto.html">Contacto</a>
              <a className="nav-link" href="soporte.html">Soporte</a>
              <a className="nav-link" href="preguntas.html">Preguntas</a>
              <a className="nav-link" href="sobreNosotros.html">Sobre Nosotros</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

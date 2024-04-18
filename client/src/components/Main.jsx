
/**
 * 
 * import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"; // Importación de useNavigate

function Main() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate(); // Inicialización de useNavigate para la navegación

  useEffect(() => {
    fetch("/usuarios")
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      
      <button onClick={() => navigate('/historia-de-la-vida')}>Historia de la Vida</button>
      <button onClick={() => navigate('/eventos-locales')}>Eventos Locales</button>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Primer Apellido</th>
            <th>Segundo Apellido</th>
            <th>Fecha de Nacimiento</th>
            <th>Usuario</th>
            <th>Perfil</th>
            <th>Foto</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario._id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido1}</td>
              <td>{usuario.apellido2}</td>
              <td>{new Date(usuario.fechaNac).toLocaleDateString()}</td>
              <td>{usuario.username}</td>
              <td>{usuario.profile}</td>
              <td>
                {usuario.url ? (
                  <img
                    src={usuario.url}
                    alt="Foto de usuario"
                    style={{ width: "50px", height: "50px" }}
                  />
                ) : (
                  "Sin Foto"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Main;
 */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Asegúrate de corregir esta importación. La correcta es:
import {jwtDecode} from 'jwt-decode'; // Se corrige la importación

function Main() {
  const [usuarios, setUsuarios] = useState([]);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    console.log(token)
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username);
      } catch (error) {
        console.error('Error decodificando el token:', error);
        localStorage.removeItem('jwtToken');
        // Aquí se ha removido la redirección automática a /login
      }
    }
  
    const cargarUsuarios = async () => {
      try {
        const respuesta = await fetch("/usuarios", {
          credentials: 'include', // Necesario para incluir cookies en la solicitud
        });
        const data = await respuesta.json();
        setUsuarios(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    cargarUsuarios();
  }, [navigate])
/*
  const handleLogout = async () => {
    try {
      await fetch('/logout', {
        method: 'POST', // Confirma que este método coincida con el endpoint en el backend
        credentials: 'include',
         // Importante para incluir cookies de sesión
      });
      localStorage.removeItem('jwtToken'); // Borra el token almacenado localmente
      // Se ha modificado la redirección a una ruta neutral o se ha removido completamente
    } catch (error) {
      console.error('Error al hacer logout:', error);
    }
  };
  */

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:9010/logout', {
        method: 'POST', // Asegúrate de que el método coincide con el definido en tu backend
        credentials: 'include', // Necesario para manejar las cookies de sesión, si las usas
      });
      const data = await response.json();
      if (data.logoutSuccess) {
        // Usa React Router para redirigir al login o cualquier página inicial
        //REDIRIGE A 
        //A LAS PAGINAS INTERNAS DE REACTnavigate('/historia-de-la-vida'); 
        // Asegúrate de tener `useNavigate` de React Router
        window.location.href = "http://localhost:9010/"
      }
    } catch (error) {
      console.error('Error al hacer logout:', error);
    }
  };
  
  
  return (
    <div>
      <h1>Bienvenido, {username}</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => navigate('/historia-de-la-vida')}>Historia de la Vida</button>
      <button onClick={() => navigate('/eventos-locales')}>Eventos Locales</button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Primer Apellido</th>
            <th>Segundo Apellido</th>
            <th>Fecha de Nacimiento</th>
            <th>Usuario</th>
            <th>Perfil</th>
            <th>Foto</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario._id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido1}</td>
              <td>{usuario.apellido2}</td>
              <td>{new Date(usuario.fechaNac).toLocaleDateString()}</td>
              <td>{usuario.username}</td>
              <td>{usuario.profile}</td>
              <td>
                {usuario.url ? (
                  <img src={usuario.url} alt="Foto de usuario" style={{ width: "50px", height: "50px" }} />
                ) : "Sin Foto"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Main;

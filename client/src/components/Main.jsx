import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // Importación de useNavigate

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
      {/* Botones para la navegación */}
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

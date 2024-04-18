import jwtDecode from 'jwt-decode';

function ComponenteBienvenida() {
  const token = localStorage.getItem('token'); // Asume que el token se almacena en el almacenamiento local
  const decoded = jwtDecode(token);
  
  return <h2>Bienvenido, {decoded.nombre}</h2>;
}
export default ComponenteBienvenida
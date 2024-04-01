import React from 'react';
import './App.css';
// Asegúrate de que todas las importaciones estén correctas
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DatosCentrales from './components/Main'; // Importante: asegúrate de que el camino esté correcto
import HistoriaDeLaVida from './components/HistoriaVida'; // Asumiendo que están en la carpeta components
import EventosLocales from './components/EventosLocales'; // Asumiendo que están en la carpeta components

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <p>IDEAS ENTRELAZADAS, FUNCIONA MAMON</p>
          <nav>
            <ul>
              <li>
                <Link to="/datosCentrales">Usuarios</Link> {/* Corregido para usar la ruta absoluta */}
              </li>
              <li>
                <Link to="/historia-de-la-vida">Historia de la Vida</Link> {/* Nuevo enlace */}
              </li>
              <li>
                <Link to="/eventos-locales">Eventos Locales</Link> {/* Nuevo enlace */}
              </li>
              {/* Añade más enlaces según necesites */}
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/datosCentrales" element={<DatosCentrales />} />
          <Route path="/historia-de-la-vida" element={<HistoriaDeLaVida />} />
          <Route path="/eventos-locales" element={<EventosLocales />} />
          <Route path="/" element={<p>Bienvenido a Ideas Entrelazadas</p>} /> {/* Ruta por defecto */}
          {/* Añade más rutas según necesites */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

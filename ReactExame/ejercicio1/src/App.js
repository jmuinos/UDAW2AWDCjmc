import React from 'react';
import Personas from './components/Personas'; // Ajusta la ruta según tu estructura de carpetas
import datosPersonas from './personas.json'; // Asegúrate de tener el JSON en este path

function App() {
  return (
      <div className="App">
        <Personas datos={datosPersonas} />
      </div>
  );
}

export default App;

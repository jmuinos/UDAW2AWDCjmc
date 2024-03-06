import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [pilotos, setPilotos] = useState([]);
  const [filtro, setFiltro] = useState('todos');
  const [orden, setOrden] = useState('nombre');
  const [paginaActual, setPaginaActual] = useState(1);
  const pilotosPorPagina = 3;
  
  useEffect(() => {
    fetch('pilotos.json')
        .then(response => response.json())
        .then(data => {
          setPilotos(data.pilotos);
        })
        .catch(error => console.error('Error al cargar los pilotos:', error));
  }, []);
  
  const obtenerNacionalidades = () => {
    const nacionalidades = new Set(pilotos.map(piloto => piloto.nacionalidad));
    return ['todos', ...nacionalidades];
  };
  
  const filtrarYOrdenarPilotos = () => {
    return pilotos
        .filter(piloto => filtro === 'todos' || piloto.nacionalidad === filtro)
        .sort((a, b) => {
          if (orden === 'nombre') {
            return a.nombre.localeCompare(b.nombre);
          } else if (orden === 'equipo') {
            return a.equipo.localeCompare(b.equipo);
          }
          return 0;
        })
        .slice((paginaActual - 1) * pilotosPorPagina, paginaActual * pilotosPorPagina);
  };
  
  const cambiarPagina = (numero) => setPaginaActual(numero);
  
  const totalPaginas = Math.ceil(pilotos.filter(piloto => filtro === 'todos' || piloto.nacionalidad === filtro).length / pilotosPorPagina);
  
  return (
      <div className="App">
        <select onChange={(e) => setOrden(e.target.value)}>
          <option value="nombre">Nombre</option>
          <option value="equipo">Equipo</option>
        </select>
        <select onChange={(e) => setFiltro(e.target.value)}>
          {obtenerNacionalidades().map(nacionalidad => (
              <option key={nacionalidad} value={nacionalidad}>{nacionalidad}</option>
          ))}
        </select>
        <div>
          {filtrarYOrdenarPilotos().map((piloto, index) => (
              <div key={index} className="piloto" onClick={() => console.log(`${piloto.nombre} destacado`)}>
                {`${piloto.nombre} - ${piloto.equipo} - ${piloto.nacionalidad}`}
              </div>
          ))}
        </div>
        <div>
          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(numero => (
              <button key={numero} onClick={() => cambiarPagina(numero)}>{numero}</button>
          ))}
        </div>
      </div>
  );
};

export default App;

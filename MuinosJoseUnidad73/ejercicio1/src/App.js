import React, { useState, useEffect } from 'react';
import './App.css'; // Asegúrate de que el archivo CSS está correctamente vinculado

function App() {
    const [tareas, setTareas] = useState([]);
    const [nuevaTarea, setNuevaTarea] = useState('');
    
    useEffect(() => {
        // Cargar tareas iniciales desde la carpeta public
        fetch('tareasIniciales.json')
            .then(response => response.json())
            .then(data => {
                setTareas(data); // Actualiza el estado con las tareas cargadas
            })
            .catch(error => console.error("Error al cargar las tareas iniciales:", error));
    }, []);
    
    const anadirTarea = () => {
        if (nuevaTarea.trim() !== '') {
            const nuevasTareas = [...tareas, { texto: nuevaTarea, realizada: false }];
            setTareas(nuevasTareas);
            setNuevaTarea(''); // Limpiar input
        }
    };
    
    const marcarTarea = (index) => {
        const nuevasTareas = [...tareas];
        nuevasTareas[index].realizada = !nuevasTareas[index].realizada;
        setTareas(nuevasTareas);
    };
    
    return (
        <div className="App">
            <h2>Lista de Tareas</h2>
            <input
                type="text"
                placeholder="Añadir nueva tarea"
                value={nuevaTarea}
                onChange={(e) => setNuevaTarea(e.target.value)}
            />
            <button onClick={anadirTarea}>Añadir Tarea</button>
            <ul>
                {tareas.map((tarea, index) => (
                    <li key={index} className={tarea.realizada ? 'tarea-realizada' : ''}>
                        <input
                            type="checkbox"
                            checked={tarea.realizada}
                            onChange={() => marcarTarea(index)}
                        /> {tarea.texto}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;

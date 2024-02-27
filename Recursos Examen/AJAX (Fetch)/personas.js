// Definición de la fuente de datos JSON
let file = "personas.json";

// Opciones para el elemento select, generadas dinámicamente
let selectOptions = Array.from({ length: 20 }, (_, i) => i + 1);

// Array para almacenar los objetos Persona después de la carga de datos
let personas = [];

// Clase Persona para estructurar los datos de cada persona
class Persona {
    constructor(nombre, pais, email, foto) {
        this.nombre = nombre;
        this.pais = pais;
        this.email = email;
        this.foto = foto;
    }
}

// Función inicial que se llama cuando se carga el documento
window.onload = async function () {
    try {
        await cargarTareasIniciales();
        rellenarSelect(selectOptions);
    } catch (error) {
        console.error("Error al cargar las tareas iniciales:", error);
    }
};

// Función asincrónica para cargar los datos de personas desde un archivo JSON
async function cargarTareasIniciales() {
    const response = await fetch(file);
    if (!response.ok) {
        throw new Error('Falló la carga de personas iniciales');
    }
    const data = await response.json();
    personas = data.results.map(({ name: { first: nombre }, location: { country: pais }, email, picture: { medium: foto } }) =>
        new Persona(nombre, pais, email, foto)
    );
}

// Función para rellenar el elemento select con opciones
function rellenarSelect(selectOpciones) {
    const select = document.getElementById('personasSelect');
    selectOpciones.forEach(opcion => {
        const option = document.createElement('option');
        option.value = opcion;
        option.textContent = opcion.toString();
        select.appendChild(option);
    });
}

// Función para renderizar y mostrar los datos de las personas seleccionadas
function mostrarDatosPersonas() {
    const contenedor = document.getElementById('datosPersonas');
    
    // Limpiar el contenedor antes de agregar nuevos elementos
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
    
    const numeroPersonas = parseInt(document.getElementById('personasSelect').value);
    let personasAUXSorted = personas.slice(0, numeroPersonas).sort((a, b) => a.pais.localeCompare(b.pais));
    
    personasAUXSorted.forEach(persona => {
        const li = document.createElement('li');
        
        // Concatenar y crear texto para cada detalle de la persona excepto la foto
        const textoPersona = `Nombre: ${persona.nombre} | País: ${persona.pais} | Email: ${persona.email} | Foto: `;
        li.appendChild(document.createTextNode(textoPersona));
        
        // Crear y añadir un elemento img para la foto
        const img = document.createElement('img');
        img.src = persona.foto;
        img.alt = "Foto de persona";
        li.appendChild(img);
        
        // Añadir el elemento li al contenedor ul
        contenedor.appendChild(li);
    });
}

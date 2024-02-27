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

$(document).ready(function() {
    cargarTareasIniciales().then(() => {
        rellenarSelect(selectOptions);
    }).catch(error => {
        console.error("Error al cargar las tareas iniciales:", error);
    });
});

// Función para cargar los datos de personas desde un archivo JSON con jQuery
async function cargarTareasIniciales() {
    try {
        let data = await $.ajax({
            url: file,
            dataType: 'json'
        });
        personas = data.results.map(({ name: { first: nombre }, location: { country: pais }, email, picture: { medium: foto } }) =>
            new Persona(nombre, pais, email, foto)
        );
    } catch (error) {
        throw new Error('Falló la carga de personas iniciales');
    }
}

// Función para rellenar el elemento select con opciones usando jQuery
function rellenarSelect(selectOpciones) {
    const $select = $('#personasSelect');
    selectOpciones.forEach(opcion => {
        $('<option>')
            .val(opcion)
            .text(opcion.toString())
            .appendTo($select);
    });
}

// Función para renderizar y mostrar los datos de las personas seleccionadas usando jQuery
function mostrarDatosPersonas() {
    const $contenedor = $('#datosPersonas');
    
    // Limpiar el contenedor antes de agregar nuevos elementos
    $contenedor.empty();
    
    const numeroPersonas = parseInt($('#personasSelect').val());
    let personasAUXSorted = personas.slice(0, numeroPersonas).sort((a, b) => a.pais.localeCompare(b.pais));
    
    personasAUXSorted.forEach(persona => {
        const $li = $('<li>');
        
        // Concatenar y crear texto para cada detalle de la persona excepto la foto
        const textoPersona = `Nombre: ${persona.nombre} | País: ${persona.pais} | Email: ${persona.email} | Foto: `;
        $li.append(document.createTextNode(textoPersona));
        
        // Crear y añadir un elemento img para la foto usando jQuery
        $('<img>', {
            src: persona.foto,
            alt: "Foto de persona"
        }).appendTo($li);
        
        // Añadir el elemento li al contenedor
        $contenedor.append($li);
    });
}

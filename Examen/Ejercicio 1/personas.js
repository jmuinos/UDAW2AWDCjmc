let file = "personas.json";
let selectOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

window.onload = function () {
    rellenarSelect(selectOptions);
};

let personas;

fetch(file)
    .then(response => response.text())
    .then(data => {
        personas = JSON.parse(data)
    });

class Persona {
    constructor(nombre, pais, email, foto) {
        this.nombre = nombre;
        this.pais = pais;
        this.email = email;
        this.foto = foto;
    }
}

function rellenarSelect(selectOpciones) {
    const select = document.getElementById('personasSelect');
    selectOpciones.forEach(opcion => {
        const option = document.createElement('option');
        option.value = JSON.stringify(opcion);
        option.textContent = opcion.toString();
        select.appendChild(option);
    });
}

function mostrarDatosPersonas() {
    let inner = '';
    let personasAUX = [];
    const contenedor = document.getElementById('datosPersonas');
    const numeroPersonas = document.getElementById('personasSelect').value;

    for (let i = 0; i < numeroPersonas; i++) {
        let nombre = personas["results"][i]["name"]["first"];
        let pais = personas["results"][i]["location"]["country"];
        let email = personas["results"][i]["email"];
        let foto = personas["results"][i]["picture"]["medium"];

        personasAUX.push(new Persona(nombre, pais, email, foto));
    }

    let personasAUXSorted = personasAUX.sort((a, b) => a.pais.localeCompare(b.pais));

    personasAUXSorted.forEach(personaAUX => {
        inner += `<li>Nombre: ${personaAUX.nombre} | País: ${personaAUX.pais} | Email: ${personaAUX.email} | Foto: ${personaAUX.foto}</li>`;
    })

    contenedor.innerHTML = inner;
}


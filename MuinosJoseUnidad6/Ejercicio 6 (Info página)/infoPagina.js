function analizarContenido(doc, contenedorResultados) {
	const parrafos = doc.getElementsByTagName('p');
	const enlaces = doc.getElementsByTagName('a');
	
	const textoSegundoParrafo = parrafos.length > 1 ? parrafos[1].innerText : 'No hay segundo párrafo.';
	const direccionPrimerEnlace = enlaces.length > 0 ? enlaces[0].href : 'No hay enlaces.';
	const direccionPenultimoEnlace = enlaces.length > 1 ? enlaces[enlaces.length - 2].href : 'No hay suficientes enlaces.';
	const enlacesEspeciales = Array.from(enlaces).filter(enlace => enlace.href.includes('/wiki/Municipio')).length;
	const numeroEnlacesPrimerParrafo = parrafos.length > 0 ? parrafos[0].getElementsByTagName('a').length : 0;
	
	const resultadosHTML = `
        <p>Número de párrafos: ${parrafos.length}</p>
        <p>Texto del segundo párrafo: ${textoSegundoParrafo}</p>
        <p>Número de enlaces: ${enlaces.length}</p>
        <p>Dirección del primer enlace: ${direccionPrimerEnlace}</p>
        <p>Dirección del penúltimo enlace: ${direccionPenultimoEnlace}</p>
        <p>Número de enlaces que apuntan a /wiki/Municipio: ${enlacesEspeciales}</p>
        <p>Número de enlaces del primer párrafo: ${numeroEnlacesPrimerParrafo}</p>
    `;
	
	contenedorResultados.innerHTML = resultadosHTML;
}

// Analizar la página principal al cargar
document.addEventListener('DOMContentLoaded', () => {
	const contenedorResultados = document.getElementById('resultados');
	analizarContenido(document, contenedorResultados);
});

// Cargar y analizar contenido del iframe
document.getElementById('cargarArchivo').addEventListener('change', function(event) {
	const archivo = event.target.files[0];
	if (archivo) {
		const reader = new FileReader();
		reader.onload = function(e) {
			const contenido = e.target.result;
			const iframe = document.getElementById('iframeCargado');
			iframe.srcdoc = contenido;
			iframe.onload = () => {
				try {
					const docIframe = iframe.contentDocument || iframe.contentWindow.document;
					analizarContenido(docIframe, document.getElementById('resultados'));
				} catch (error) {
					console.error("No se puede acceder al contenido del iframe.");
				}
			};
		};
		reader.readAsText(archivo);
	}
});

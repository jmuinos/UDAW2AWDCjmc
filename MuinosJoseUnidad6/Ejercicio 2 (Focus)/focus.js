document.addEventListener('DOMContentLoaded', () => {
	enfocarUltimoInput();
});

function enfocarUltimoInput() {
	// Selecciona todos los formularios y accede al último
	const formularios = document.querySelectorAll('form');
	const ultimoFormulario = formularios[formularios.length - 1];
	
	// Dentro del último formulario, selecciona todos los inputs de tipo texto y accede al último
	const inputsTexto = ultimoFormulario.querySelectorAll("input[type='text']");
	const ultimoInputTexto = inputsTexto[inputsTexto.length - 1];
	
	// Coloca el foco en el último input de tipo texto, si existe
	if (ultimoInputTexto) {
		ultimoInputTexto.focus();
	}
}

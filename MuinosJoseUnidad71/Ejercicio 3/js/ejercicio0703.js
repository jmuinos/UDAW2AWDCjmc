import {setCookie, getCookie} from "./cookies.js";

/**
 * Inicializa y muestra el modal de usuario.
 */
function mostrarModalUsuario() {
	modalUsuario.show();
}

/**
 * Incrementa el contador de visitas en las cookies.
 */
function incrementarVisitas() {
	const visitas = getCookie('visitas');
	const visitasActualizadas = visitas ? parseInt(visitas) + 1 : 1;
	setCookie('visitas', visitasActualizadas, 30);
}

/**
 * Función para cerrar la ventana del juego en el navegador
 */
function salirDelJuego() {
	//Es necesario hacer determinar el opener porque la página del juego no se ha abierto mediante un script y, cuando
	// esto es así, al hacer window.close se cerraría el navegador en lugar de solo la pestaña actual.
	window.opener = self;
	// Aquí estaría mejor preguntar antes si está seguro
	window.close();
}

// Inicialización del modal
const modalUsuario = new bootstrap.Modal(document.getElementById('modal-usuario'), {
	keyboard: false
});

// Configuración del modal
modalUsuario._element.addEventListener('show.bs.modal', () => {
	const usuarioCookie = getCookie('usuario');
	const modalTitle = modalUsuario._element.querySelector('.modal-title');
	const modalBodyInput = modalUsuario._element.querySelector('.modal-body input');
	
	modalTitle.textContent = usuarioCookie ? `¡Hola ${usuarioCookie}!` : '';
	modalBodyInput.value = usuarioCookie || '';
});

// Evento para el botón Cambiar usuario
document.getElementById('cambiar-usuario-btn').addEventListener('click', mostrarModalUsuario);


// Evento para el botón Salir
document.getElementById('salir-btn').addEventListener('click', salirDelJuego);


// Evento para comprobar la existencia de la cookie y mostrar el modal
document.addEventListener('DOMContentLoaded', () => {
	const usuarioCookie = getCookie('usuario');
	
	if (usuarioCookie) {
		incrementarVisitas();
		// Actualizar el contenido de visitas en el DOM con el nuevo valor
		document.getElementById('usuario-visitas').textContent = getCookie('visitas');
	} else {
		mostrarModalUsuario();
	}
	
	// Actualizar el nombre de usuario en el DOM
	document.getElementById('usuario-nombre').textContent = usuarioCookie;
});


// Evento para guardar el nombre del usuario y establecer la cookie
document.querySelector('#btn-guardar-usuario.btn.btn-primary').addEventListener('click', () => {
	let nombreUsuario = document.getElementById('user-name-modal').value;
	if (nombreUsuario) {
		setCookie('usuario', nombreUsuario, 30);
		setCookie('visitas', 1, 30);
		
		modalUsuario.hide();
		
		// Actualizar el contenido de usuario y visitas en el DOM
		document.getElementById('usuario-nombre').textContent = nombreUsuario;
		document.getElementById('usuario-visitas').textContent = "1"; // Ya que es la primera visita del nuevo usuario
	}
});


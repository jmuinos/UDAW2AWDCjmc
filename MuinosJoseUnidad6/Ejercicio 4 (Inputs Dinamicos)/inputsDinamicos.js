document.getElementById('crearInputTexto').addEventListener('click', function() {
	const nombre = prompt('¿Cuál es el nombre del input de texto?');
	const input = document.createElement('input');
	input.type = 'text';
	input.name = nombre;
	document.getElementById('formulario').appendChild(input);
	confirm(`Elemento creado: Input de texto con nombre ${nombre}`);
});

document.getElementById('crearInputPassword').addEventListener('click', function() {
	const nombre = prompt('¿Cuál es el nombre del input de password?');
	const input = document.createElement('input');
	input.type = 'password';
	input.name = nombre;
	document.getElementById('formulario').appendChild(input);
	confirm(`Elemento creado: Input de password con nombre ${nombre}`);
});

document.getElementById('crearTextarea').addEventListener('click', function() {
	const nombre = prompt('¿Cuál es el nombre del textarea?');
	const textarea = document.createElement('textarea');
	textarea.name = nombre;
	textarea.cols = 40;
	textarea.rows = 5;
	document.getElementById('formulario').appendChild(textarea);
	confirm(`Elemento creado: Textarea con nombre ${nombre}`);
});

document.getElementById('crearLabel').addEventListener('click', function() {
	const forInput = prompt('¿A qué input va referido este label (atributo for)?');
	const label = document.createElement('label');
	label.setAttribute('for', forInput);
	label.textContent = forInput;
	document.getElementById('formulario').appendChild(label);
	confirm(`Elemento creado: Label referido a ${forInput}`);
});

document.getElementById('crearImagen').addEventListener('click', function() {
	const src = prompt('¿Cuál es la ruta de la imagen?');
	const img = document.createElement('img');
	img.src = src;
	document.getElementById('formulario').appendChild(img);
	confirm(`Elemento creado: Imagen con ruta ${src}`);
});

document.getElementById('crearCheckbox').addEventListener('click', function() {
	const nombre = prompt('¿Cuál es el nombre del checkbox?');
	const valor = prompt('¿Cuál es el valor del checkbox?');
	const input = document.createElement('input');
	input.type = 'checkbox';
	input.name = nombre;
	input.value = valor;
	document.getElementById('formulario').appendChild(input);
	confirm(`Elemento creado: Checkbox con nombre ${nombre} y valor ${valor}`);
});

document.getElementById('crearRadio').addEventListener('click', function() {
	const nombre = prompt('¿Cuál es el nombre del radio?');
	const valor = prompt('¿Cuál es el valor del radio?');
	const input = document.createElement('input');
	input.type = 'radio';
	input.name = nombre;
	input.value = valor;
	document.getElementById('formulario').appendChild(input);
	confirm(`Elemento creado: Radio con nombre ${nombre} y valor ${valor}`);
});

document.getElementById('crearBoton').addEventListener('click', function() {
	const nombre = prompt('¿Cuál es el nombre del botón?');
	const valor = prompt('¿Cuál es el valor del botón?');
	const button = document.createElement('button');
	button.type = 'submit';
	button.name = nombre;
	button.value = valor;
	button.textContent = 'Enviar';
	document.getElementById('formulario').appendChild(button);
	confirm(`Elemento creado: Botón con nombre ${nombre} y valor ${valor}`);
});

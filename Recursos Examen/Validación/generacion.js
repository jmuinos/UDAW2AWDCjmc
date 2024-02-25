export function crearInputsDinamicos() {
	const form = document.getElementById('formulario');
	
	// Tipos de inputs a añadir
	const tiposDeInputs = [
		{tipo: 'text', id: 'nombre', placeholder: 'Nombre'},
		{tipo: 'text', id: 'apellidos', placeholder: 'Apellidos'},
		{tipo: 'text', id: 'email', placeholder: 'Ej: pepito@mail.com'},
		{tipo: 'text', id: 'telefono', placeholder: 'Ej: 123456789'},
		{tipo: 'text', id: 'nif', placeholder: 'Ej: 00000000-B'},
		{tipo: 'number', id: 'edad', placeholder: 'Edad'},
		{tipo: 'date', id: 'fecha'},
		{tipo: 'time', id: 'hora'},
		{
			tipo: 'select',
			id: 'provincia',
			opciones: ['Seleccione Provincia', 'A Coruña', 'Lugo', 'Ourense', 'Pontevedra']
		},
		{tipo: 'checkbox', id: 'condiciones', textContent: 'Aceptar condiciones'},
		{tipo: 'submit', id: 'formularioBtn', valor: 'Enviar'}
	];
	
	tiposDeInputs.forEach(input => {
		let inputElement;
		
		if (input.tipo === 'select') {
			inputElement = document.createElement('select');
			inputElement.id= input.id;
			input.opciones.forEach(opcion => {
				const opcionElement = document.createElement('option');
				opcionElement.value = opcion;
				opcionElement.textContent = opcion;
				inputElement.appendChild(opcionElement);
			});
		} else if (input.tipo === 'checkbox') {
			inputElement = document.createElement('div');
			
			let checkbox = document.createElement('input');
			checkbox.type = input.tipo;
			checkbox.id = input.id;
			inputElement.appendChild(checkbox);
			
			let label = document.createElement('label');
			label.setAttribute('for', inputElement.id);
			label.textContent = input.textContent;
			inputElement.appendChild(label);
		} else {
			inputElement = document.createElement('input');
			inputElement.type = input.tipo;
			inputElement.id = input.id;
			
			if (input.tipo === 'submit') {
				inputElement.value = input.valor;
				inputElement.id = input.id;
			} else {
				inputElement.placeholder = input.placeholder || '';
				inputElement.id = input.id;
			}
		}
		
		form.appendChild(inputElement);
	});
}

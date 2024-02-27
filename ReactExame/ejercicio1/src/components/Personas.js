import React from 'react';
import Persona from './Persona';

function Personas({ datos }) {
	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Country</th>
					<th>Email</th>
					<th>Picture</th>
				</tr>
			</thead>
			<tbody>
				{datos.results.map((persona, index) => (
					<Persona key={index} persona={persona}/>
				))}
			</tbody>
		</table>
	);
}

export default Personas;

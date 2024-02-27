import React from 'react';

function Persona({ persona }) {
	return (
				<tr>
					<td>{persona.name.first}</td>
					<td>{persona.location.country}</td>
					<td>{persona.email}</td>
					<td><img src={persona.picture.medium} alt="profile"/></td>
				</tr>
	);
}

export default Persona;

import React from 'react';

function Mascotas({ mascota }) {
  return (
    <div className="Mascota">
      <img src={mascota.imagen} alt={mascota.nombre} />
      <h2>{mascota.nombre}</h2>
      <p>Tipo: {mascota.tipo}</p>
      <p>Edad: {mascota.edad}</p>
      <p>Sexo: {mascota.genero}</p>
      <p>Estado: {mascota.estado}</p>
      <p>
        <strong>Descripción Física:</strong> {mascota.desc_fisica}
      </p>
      <p>
        <strong>Descripción de Personalidad:</strong> {mascota.desc_personalidad}
      </p>
      <a href={mascota.url} target="_blank" rel="noopener noreferrer">
        Más información
      </a>
    </div>
  );
}

export default Mascotas;
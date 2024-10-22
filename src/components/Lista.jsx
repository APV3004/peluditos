import React from 'react';

const Lista = ({ mascotas, seleccionarMascota }) => {
  return (
    <div className="lista">
      {mascotas.map(mascota => (
        <div key={mascota.id} className="mascota">
          <img src={mascota.imagen} alt={mascota.nombre} />
          <h3>{mascota.nombre}</h3>
          <p><strong>Tipo:</strong> {mascota.tipo}</p>
          <p><strong>Edad:</strong> {mascota.edad}</p>
          <p><strong>Género:</strong> {mascota.genero}</p>
          <p><strong>Estado:</strong> {mascota.estado === 'adopcion' ? 'En Adopción' : 'Adoptado'}</p>
          <p><strong>Descripción Física:</strong> {mascota.desc_fisica.replace(/<\/?p>/g, '')}</p>
          <p><strong>Descripción Personalidad:</strong> {mascota.desc_personalidad.replace(/<\/?p>/g, '')}</p>
          <a href={mascota.url} target="_blank" rel="noopener noreferrer">
            Ver más detalles
          </a>
          {/* Botón de adoptar */}
          <button className="adoptar-boton" onClick={() => seleccionarMascota(mascota)}>Adoptar</button>
        </div>
      ))}
    </div>
  );
};

export default Lista;
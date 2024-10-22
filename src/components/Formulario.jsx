import React, { useState } from 'react';

const Formulario = ({ mascota }) => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const mensaje = `Adoptando a: ${mascota.nombre}\nNombre: ${nombre}\nCorreo: ${correo}\nDirección: ${direccion}`;
    alert(mensaje);
    console.log('Solicitud de adopción enviada:', {
      mascota: mascota.nombre,
      nombre,
      correo,
      direccion
    });
  };

  return (
    <div className="formulario">
      <h2>Formulario de adopción para {mascota.nombre}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
        </label>
        <label>
          Correo Electrónico:
          <input type="email" value={correo} onChange={e => setCorreo(e.target.value)} />
        </label>
        <label>
          Dirección:
          <input type="text" value={direccion} onChange={e => setDireccion(e.target.value)} />
        </label>
        <button type="submit">Enviar Solicitud</button>
      </form>
    </div>
  );
};

export default Formulario;
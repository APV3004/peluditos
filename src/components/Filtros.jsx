import React from 'react';

const Filtros = ({ tipo, setTipo, edad, setEdad, edadesDisponibles, genero, setGenero, estado, setEstado, buscar }) => {
  return (
    <div className="filtros">
      <label>
        Tipo de mascota:
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="Todos">Todos</option>
          <option value="Perro">Perro</option>
          <option value="Gato">Gato</option>
        </select>
      </label>

      <label>
        Edad:
        <select value={edad} onChange={(e) => setEdad(e.target.value)}>
          <option value="Todas">Todas</option>
          {edadesDisponibles.map((edad, index) => (
            <option key={index} value={edad}>{edad}</option>
          ))}
        </select>
      </label>

      <label>
        Género:
        <select value={genero} onChange={(e) => setGenero(e.target.value)}>
          <option value="Todos">Todos</option>
          <option value="macho">Macho</option>
          <option value="hembra">Hembra</option>
        </select>
      </label>

      <label>
        Estado:
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="Todos">Todos</option>
          <option value="adopcion">En Adopción</option>
          <option value="adoptado">Adoptado</option>
        </select>
      </label>

      <button className="buscar-boton" onClick={buscar}>Buscar</button>
    </div>
  );
};

export default Filtros;
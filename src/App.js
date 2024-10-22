import React, { useState, useEffect } from 'react';
import Lista from './components/Lista';
import Filtros from './components/Filtros';
import Formulario from './components/Formulario'; // Aquí renombramos el formulario
import './App.css';

function App() {
  const [mascotas, setMascotas] = useState([]);
  const [filtros, setFiltros] = useState({
    tipo: 'Todos',
    edad: 'Todas',
    genero: 'Todos',
    estado: 'Todos'
  });
  const [filteredMascotas, setFilteredMascotas] = useState([]);
  const [edadesDisponibles, setEdadesDisponibles] = useState([]);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);

  useEffect(() => {
    // Llamada a la API de mascotas
    fetch('https://huachitos.cl/api/animales')
      .then(response => response.json())
      .then(data => {
        setMascotas(data.data);

        // Extraer las edades únicas para llenar el filtro de edades, agrupando por "Mes/Meses" y "Año/Años"
        const agruparEdades = (edades) => {
          return edades.map(edad => {
            if (edad.includes('Mes')) {
              return edad.replace(/Mes(es)?/, 'Mes'); // Unificar en "Mes"
            } else if (edad.includes('Año')) {
              return edad.replace(/Año(s)?/, 'Año'); // Unificar en "Año"
            }
            return edad;
          });
        };

        // Obtener las edades únicas
        let edadesUnicas = [...new Set(agruparEdades(data.data.map(mascota => mascota.edad)))];

        // Función para transformar edades a formato plural
        const formatearEdad = (edad) => {
          if (edad.includes('Mes')) {
            const valor = parseInt(edad);
            return valor === 1 ? `${valor} mes` : `${valor} meses`;
          } else if (edad.includes('Año')) {
            const valor = parseInt(edad);
            return valor === 1 ? `${valor} año` : `${valor} años`;
          }
          return edad;
        };

        // Función para ordenar las edades, con prioridad a "Cachorro" como primera opción y "Adulto" como la última
        const ordenarEdades = (edades) => {
          return edades.sort((a, b) => {
            if (a === 'Cachorro') return -1;
            if (b === 'Cachorro') return 1;
            if (a === 'Adulto') return 1;
            if (b === 'Adulto') return -1;

            const extraerValor = (edad) => {
              if (edad.includes('Mes')) {
                return parseInt(edad) / 12; // Convertir meses a fracciones de año
              } else {
                return parseInt(edad); // Si es año, se devuelve el número directamente
              }
            };
            return extraerValor(a) - extraerValor(b);
          });
        };

        // Formatear y ordenar las edades agrupadas
        setEdadesDisponibles(ordenarEdades(edadesUnicas).map(formatearEdad));
      })
      .catch(error => console.log(error));
  }, []);

  const handleBuscar = () => {
    // Filtrar las mascotas cuando se haga clic en "Buscar"
    let filtradas = mascotas.filter(mascota => {
      const edadFormateada = mascota.edad.includes('Mes') ? `${parseInt(mascota.edad)} meses` : `${parseInt(mascota.edad)} años`;
      return (
        (filtros.tipo === 'Todos' || mascota.tipo === filtros.tipo) &&
        (filtros.edad === 'Todas' || edadFormateada === filtros.edad) && // Filtrar edades agrupadas correctamente
        (filtros.genero === 'Todos' || mascota.genero === filtros.genero) &&
        (filtros.estado === 'Todos' || mascota.estado === filtros.estado)
      );
    });

    setFilteredMascotas(filtradas);
  };

  return (
    <div className="container">
      <h1>Adopta a un Amigo Peludito!!!</h1>
      <Filtros
        tipo={filtros.tipo}
        setTipo={(value) => setFiltros(prev => ({ ...prev, tipo: value }))}
        edad={filtros.edad}
        setEdad={(value) => setFiltros(prev => ({ ...prev, edad: value }))}
        edadesDisponibles={edadesDisponibles}  // Pasamos las edades disponibles
        genero={filtros.genero}
        setGenero={(value) => setFiltros(prev => ({ ...prev, genero: value }))}
        estado={filtros.estado}
        setEstado={(value) => setFiltros(prev => ({ ...prev, estado: value }))}
        buscar={handleBuscar}  // El botón ahora ejecuta esta función
      />
      {filteredMascotas.length > 0 ? (
        <Lista mascotas={filteredMascotas} seleccionarMascota={setMascotaSeleccionada} />
      ) : (
        <p className="no-mascotas">No se encontraron mascotas</p>
      )}
      
      {/* Formulario de Adopción */}
      {mascotaSeleccionada && (
        <Formulario mascota={mascotaSeleccionada} />
      )}
    </div>
  );
}

export default App;
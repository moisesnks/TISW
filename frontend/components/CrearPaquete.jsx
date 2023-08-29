import React, { useState, useEffect } from 'react';
import { createPackage, fetchDestinos } from '../src/api'; // Importa fetchDestinos
import './CrearPaquete.css'; // Importa el archivo CSS

function CrearPaquete({ onPackageCreated }) {
  const [nombre, setNombre] = useState('');
  const [destinoId, setDestinoId] = useState('');
  const [precio, setPrecio] = useState('');
  const [destinos, setDestinos] = useState([]); // Agrega estado para almacenar la lista de destinos

  // Carga la lista de destinos al cargar el componente
  useEffect(() => {
    const loadDestinos = async () => {
      try {
        const destinosData = await fetchDestinos();
        setDestinos(destinosData);
      } catch (error) {
        console.error('Error fetching destinos:', error);
      }
    };
    loadDestinos();
  }, []);

  const handleCreate = async () => {
    const newPackage = {
      nombre: nombre,
      destino_id: destinoId, // Cambia 'id' por 'destino_id'
      precio: precio
    };

    try {
      const createdPackage = await createPackage(newPackage);
      onPackageCreated(createdPackage);
      alert('Paquete creado correctamente.');
      
    } catch (error) {
      console.error('Error creating package:', error);
      alert('Error al crear el paquete.');
    }
    // Recarga la página para reflejar los cambios
    window.location.reload();
  };

  return (
    <div className="crear-paquete-container">
      <h3>Crear Nuevo Paquete</h3>
      <div className="form-group">
        <label htmlFor="nombrePaquete">Nombre:</label>
        <input type="text" id="nombrePaquete" value={nombre} onChange={e => setNombre(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="destinoId">Destino:</label> {/* Cambia a un campo de selección */}
        <select id="destinoId" value={destinoId} onChange={e => setDestinoId(e.target.value)}>
          <option value="">Selecciona un destino</option>
          {destinos.map(destino => (
            <option key={destino.id} value={destino.id}>
              {destino.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="precio">Precio:</label>
        <input type="number" id="precio" value={precio} onChange={e => setPrecio(e.target.value)} />
      </div>
      <button className="create-button" onClick={handleCreate}>Crear Paquete</button>
    </div>
  );
}

export default CrearPaquete;

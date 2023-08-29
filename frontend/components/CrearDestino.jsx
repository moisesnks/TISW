import React, { useState } from 'react';
import { createDestino } from '../src/api';
import './CrearDestino.css'; // Importa el archivo CSS

function CrearDestino({ onDestinoCreated }) {
  const [nombre, setNombre] = useState('');
  const [pais, setPais] = useState('');

  const handleCreate = async () => {
    const newDestino = {
      nombre: nombre,
      pais: pais
    };

    try {
      const createdDestino = await createDestino(newDestino);
      onDestinoCreated(createdDestino);
      alert('Destino creado correctamente.');
    } catch (error) {
      console.error('Error creating destino:', error);
      alert('Error al crear el destino.');
    }
    // Recarga la página para reflejar los cambios
    window.location.reload();
  };

  return (
    <div className="crear-destino-container">
      <h3>Crear Nuevo Destino</h3>
      <div className="form-group">
        <label htmlFor="nombreDestino">Nombre:</label>
        <input type="text" id="nombreDestino" value={nombre} onChange={e => setNombre(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="pais">País:</label>
        <input type="text" id="pais" value={pais} onChange={e => setPais(e.target.value)} />
      </div>
      <button className="create-button" onClick={handleCreate}>Crear Destino</button>
    </div>
  );
}

export default CrearDestino;

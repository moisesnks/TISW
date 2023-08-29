import React, { useState, useEffect } from 'react';
import { updateDestino, deleteDestino, fetchDestinos } from '../src/api'; // Importa las funciones necesarias desde api.js

function ModificarDestino() {
  const [destinoId, setDestinoId] = useState('');
  const [nombre, setNombre] = useState('');
  const [pais, setPais] = useState('');
  const [destinos, setDestinos] = useState([]);

  useEffect(() => {
    fetchDestinos()
      .then(data => setDestinos(data))
      .catch(error => console.error('Error fetching destinos:', error));
  }, []);

  const handleDestinoChange = (event) => {
    const selectedDestino = destinos.find(destino => destino.id === parseInt(event.target.value, 10));
    if (selectedDestino) {
      setDestinoId(selectedDestino.id);
      setNombre(selectedDestino.nombre);
      setPais(selectedDestino.pais);
    } else {
      setDestinoId('');
      setNombre('');
      setPais('');
    }
  };

  const handleUpdate = async () => {
    if (!destinoId) {
      alert('Selecciona un destino para actualizar.');
      return;
    }

    const updatedDestino = {
      id: destinoId,
      nombre: nombre,
      pais: pais
    };

    try {
      await updateDestino(updatedDestino);
      alert('Destino actualizado correctamente.');
      setDestinoId('');
      setNombre('');
      setPais('');
      // Recarga la página para reflejar los cambios
      window.location.reload();
    } catch (error) {
      console.error('Error updating destino:', error);
      alert('Error al actualizar el destino.');
    }
  };

  const handleDelete = async () => {
    if (!destinoId) {
      alert('Selecciona un destino para eliminar.');
      return;
    }
  
    const confirmation = window.confirm('¿Estás seguro de que deseas eliminar este destino?');
    if (!confirmation) {
      return;
    }
  
    try {
      await deleteDestino(destinoId);
      alert('Destino eliminado correctamente.');
      setDestinoId('');
      setNombre('');
      setPais('');
  
      // Recarga la página para reflejar los cambios
      window.location.reload();
    } catch (error) {
      console.error('Error deleting destino:', error);
      alert('Error al eliminar el destino.');
    }
  };

  return (
    <div>
      <h2>Modificar Destino</h2>
      <div>
        <label htmlFor="destinoIdUpdate">Selecciona un destino:</label>
        <select id="destinoIdUpdate" value={destinoId} onChange={handleDestinoChange}>
          <option value="">Seleccione un destino</option>
          {destinos.map(destino => (
            <option key={destino.id} value={destino.id}>
              {destino.nombre}
            </option>
          ))}
        </select>
      </div>
      {destinoId && (
        <>
          <div>
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
          </div>
          <div>
            <label htmlFor="pais">País:</label>
            <input type="text" id="pais" value={pais} onChange={e => setPais(e.target.value)} />
          </div>
          <button onClick={handleUpdate}>Actualizar Destino</button>
          <button className="delete-button" onClick={handleDelete}>Eliminar Destino</button>
        </>
      )}
    </div>
  );
}

export default ModificarDestino;

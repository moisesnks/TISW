import React, { useState, useEffect } from 'react';
import { updatePackage, fetchPaquetes, deletePackage, fetchDestinos } from '../src/api'; // Importa las funciones necesarias desde api.js

function ModificarPaquete() {
  const [paqueteId, setPaqueteId] = useState('');
  const [nombre, setNombre] = useState('');
  const [destinoId, setDestinoId] = useState('');
  const [precio, setPrecio] = useState('');
  const [paquetes, setPaquetes] = useState([]);
  const [destinos, setDestinos] = useState([]);

  useEffect(() => {
    fetchPaquetes()
      .then(data => setPaquetes(data))
      .catch(error => console.error('Error fetching paquetes:', error));

    fetchDestinos()
      .then(data => setDestinos(data))
      .catch(error => console.error('Error fetching destinos:', error));
  }, []);

  const handlePackageChange = (event) => {
    const selectedPackage = paquetes.find(paquete => paquete.id === parseInt(event.target.value, 10));
    if (selectedPackage) {
      setPaqueteId(selectedPackage.id);
      setNombre(selectedPackage.nombre);
      setDestinoId(selectedPackage.destino_id);
      setPrecio(selectedPackage.precio);
    } else {
      setPaqueteId('');
      setNombre('');
      setDestinoId('');
      setPrecio('');
    }
  };

  const handleUpdate = async () => {
    if (!paqueteId) {
      alert('Selecciona un paquete para actualizar.');
      return;
    }

    const updatedPackage = {
      id: paqueteId,
      nombre: nombre,
      destino_id: destinoId,
      precio: precio
    };

    try {
      await updatePackage(updatedPackage);
      alert('Paquete actualizado correctamente.');
      setPaqueteId('');
      setNombre('');
      setDestinoId('');
      setPrecio('');
      // Recarga la página para reflejar los cambios
      window.location.reload();
    } catch (error) {
      console.error('Error updating package:', error);
      alert('Error al actualizar el paquete.');
    }
  };

  const handleDelete = async () => {
    if (!paqueteId) {
      alert('Selecciona un paquete para eliminar.');
      return;
    }
  
    const confirmation = window.confirm('¿Estás seguro de que deseas eliminar este paquete?');
    if (!confirmation) {
      return;
    }
  
    try {
      await deletePackage(paqueteId);
      alert('Paquete eliminado correctamente.');
      setPaqueteId('');
      setNombre('');
      setDestinoId('');
      setPrecio('');
  
      // Recarga la página para reflejar los cambios
      window.location.reload();
    } catch (error) {
      console.error('Error deleting package:', error);
      alert('Error al eliminar el paquete.');
    }
  };

  return (
    <div>
      <h2>Modificar Paquete</h2>
      <div>
        <label htmlFor="paqueteIdUpdate">Selecciona un paquete:</label>
        <select id="paqueteIdUpdate" value={paqueteId} onChange={handlePackageChange}>
          <option value="">Seleccione un paquete</option>
          {paquetes.map(paquete => (
            <option key={paquete.id} value={paquete.id}>
              {paquete.nombre}
            </option>
          ))}
        </select>
      </div>
      {paqueteId && (
        <>
          <div>
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
          </div>
          <div>
            <label htmlFor="destinoId">Destino:</label>
            <select id="destinoId" value={destinoId} onChange={e => setDestinoId(e.target.value)}>
              <option value="">Seleccione un destino</option>
              {destinos.map(destino => (
                <option key={destino.id} value={destino.id}>
                  {destino.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="precio">Precio:</label>
            <input type="number" id="precio" value={precio} onChange={e => setPrecio(e.target.value)} />
          </div>
          <button onClick={handleUpdate}>Actualizar Paquete</button>
          <button className="delete-button" onClick={handleDelete}>Eliminar Paquete</button>
        </>
      )}
    </div>
  );
}

export default ModificarPaquete;

import React, { useState, useEffect } from 'react';
import { updatePackage, fetchPaquetes } from '../src/api'; // Importa la función updatePackage y fetchPaquetes desde api.js

function ModificarPaquete() {
  const [paqueteId, setPaqueteId] = useState('');
  const [nombre, setNombre] = useState('');
  const [destinoId, setDestinoId] = useState('');
  const [precio, setPrecio] = useState('');
  const [paquetes, setPaquetes] = useState([]);

  useEffect(() => {
    fetchPaquetes()
      .then(data => setPaquetes(data))
      .catch(error => console.error('Error fetching paquetes:', error));
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
    } catch (error) {
      console.error('Error updating package:', error);
      alert('Error al actualizar el paquete.');
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
            <label htmlFor="destinoId">Destino ID:</label>
            <input type="number" id="destinoId" value={destinoId} onChange={e => setDestinoId(e.target.value)} />
          </div>
          <div>
            <label htmlFor="precio">Precio:</label>
            <input type="number" id="precio" value={precio} onChange={e => setPrecio(e.target.value)} />
          </div>
          <button onClick={handleUpdate}>Actualizar Paquete</button>
        </>
      )}
    </div>
  );
}

export default ModificarPaquete;

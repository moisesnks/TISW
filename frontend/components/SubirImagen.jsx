import React, { useState, useEffect } from 'react';
import { updateImage, fetchPaquetes } from '../src/api'; // Importa la función updateImage y fetchPaquetes desde api.js
import Compressor from 'compressorjs';

function SubirImagen() {
  const [paqueteId, setPaqueteId] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [paquetes, setPaquetes] = useState([]);

  useEffect(() => {
    fetchPaquetes()
      .then(data => setPaquetes(data))
      .catch(error => console.error('Error fetching paquetes:', error));
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!paqueteId || !selectedFile) {
      alert('Selecciona un paquete y una imagen para subir.');
      return;
    }

    const compressedFile = await new Compressor(selectedFile, {
      quality: 0.6,
      maxWidth: 800,
      maxHeight: 800,
      success(result) {
        const formData = new FormData();
        formData.append('image', result);

        updateImage(paqueteId, formData)
          .then(() => {
            alert('Imagen subida correctamente.');
            setPaqueteId('');
            setSelectedFile(null);
          })
          .catch((error) => {
            console.error('Error subiendo imagen:', error);
            alert('Error al subir la imagen.');
          });
      },
      error(err) {
        console.error('Error comprimiendo imagen:', err);
      },
    });
  };

  return (
    <div>
      <h2>Subir Imagen</h2>
      <div>
        <label htmlFor="paqueteIdImage">Selecciona un paquete:</label>
        <select id="paqueteIdImage" value={paqueteId} onChange={(e) => setPaqueteId(e.target.value)}>
          <option value="">Seleccione un paquete</option>
          {paquetes.map(paquete => (
            <option key={paquete.id} value={paquete.id}>
              {paquete.nombre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="image">Selecciona una imagen:</label>
        <input type="file" id="image" accept="image/*" onChange={handleFileChange} />
      </div>
      <button onClick={handleUpload}>Subir Imagen</button>
    </div>
  );
}

export default SubirImagen;

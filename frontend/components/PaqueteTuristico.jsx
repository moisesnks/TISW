import React, { useState } from 'react';
import './PaqueteTuristico.css'; // Importa el archivo CSS

function PaqueteTuristico({ paquetes }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    const prevIndex = (currentIndex - 1 + paquetes.length) % paquetes.length;
    setCurrentIndex(prevIndex);
  };

  const goToNextSlide = () => {
    const nextIndex = (currentIndex + 1) % paquetes.length;
    setCurrentIndex(nextIndex);
  };

  // Función auxiliar para convertir ArrayBuffer en una cadena base64
  function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  return (
    <div className="paquete-container">
      <button className="slider-btn prev" onClick={goToPrevSlide}>
        &#8249;
      </button>
      <img
        className="paquete-img"
        src={`data:image/jpeg;base64,${arrayBufferToBase64(paquetes[currentIndex].img.data)}`}
        alt={`Imagen de ${paquetes[currentIndex].nombre}`}
      />
      <div className="paquete-overlay">
        <div className="bottom-left">Destino: {paquetes[currentIndex].nombre}</div>
        <div className="bottom-right">Precio: {paquetes[currentIndex].precio}</div>
      </div>
      <button className="slider-btn next" onClick={goToNextSlide}>
        &#8250;
      </button>
    </div>
  );
}

export default PaqueteTuristico;

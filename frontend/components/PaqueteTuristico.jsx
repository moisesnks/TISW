import React, { useState, useEffect } from 'react';
import './PaqueteTuristico.css'; // Importa el archivo CSS

function PaqueteTuristico({ paquetes }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para ir al siguiente slide
  const goToNextSlide = () => {
    const nextIndex = (currentIndex + 1) % paquetes.length;
    setCurrentIndex(nextIndex);
  };

  // Efecto para avanzar al siguiente slide automáticamente
  useEffect(() => {
    const interval = setInterval(goToNextSlide, 3000); // Cambia de slide cada 3 segundos

    return () => {
      clearInterval(interval); // Limpia el intervalo al desmontar el componente
    };
  }, [currentIndex]);

  // Función auxiliar para convertir ArrayBuffer en una cadena base64
  function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  const currentPackage = paquetes[currentIndex];

  return (
    <div className="paquete-container">
      {currentPackage && (
        <>
          <button className="slider-btn prev" onClick={goToNextSlide}>
            &#8249;
          </button>
          {currentPackage.img && (
            <img
              className="paquete-img"
              src={`data:image/jpeg;base64,${arrayBufferToBase64(currentPackage.img.data)}`}
              alt={`Imagen de ${currentPackage.nombre}`}
            />
          )}
          <div className="paquete-overlay">
            <div className="bottom-left">Destino: {currentPackage.nombre}</div>
            <div className="bottom-right">Precio: {currentPackage.precio}</div>
          </div>
          <button className="slider-btn next" onClick={goToNextSlide}>
            &#8250;
          </button>
        </>
      )}
    </div>
  );
}

export default PaqueteTuristico;

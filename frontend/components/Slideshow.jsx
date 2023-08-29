import React, { useState, useEffect } from 'react';

function Slideshow({ paquetes }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % paquetes.length);
    }, 3000); // Cambia de slide cada 3 segundos

    return () => clearInterval(interval);
  }, [currentSlide, paquetes]);

  return (
    <div className="slideshow-container">
      <h4>Slideshow</h4>
      <div className="slideshow">
        {paquetes.map((paquete, index) => (
          <div
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            key={index}
          >
            <img
              alt={`Imagen de ${paquete.nombre}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slideshow;

import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchDestinos, fetchPaquetes } from './api'; 
import SubirImagen from '../components/SubirImagen'; 
import PaqueteTuristico from '../components/PaqueteTuristico'; 
import ModificarPaquete from '../components/ModificarPaquete'; 
import CrearPaquete from '../components/CrearPaquete';
import CrearDestino from '../components/CrearDestino'; // Importa el componente

function App() {
  const [destinos, setDestinos] = useState([]);
  const [paquetes, setPaquetes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDestinos()
      .then(data => setDestinos(data))
      .catch(error => console.error('Error fetching destinos:', error));

    fetchPaquetes()
      .then(data => {
        setPaquetes(data);
        setIsLoading(false);
      })
      .catch(error => console.error('Error fetching paquetes:', error));
  }, []);

  const handlePackageCreated = newPackage => {
    setPaquetes([...paquetes, newPackage]);
  };

  const handleDestinoCreated = newDestino => {
    setDestinos([...destinos, newDestino]); // Agrega el nuevo destino a la lista
  };

  return (
    <div className="Container">
      <div className='Paquetes'>
        <h1>Paquetes Turísticos</h1>
        {!isLoading && <PaqueteTuristico paquetes={paquetes} />}
      </div>
      <div className='Admin'>
        <div className='AdminSection'>
          <ModificarPaquete />
        </div>
        <div className='AdminSection'>
          <SubirImagen />
        </div>
        <div className='AdminSection'>
          <CrearDestino onDestinoCreated={handleDestinoCreated}/>
        </div>
        <div className='AdminSection'>
          <CrearPaquete onPackageCreated={handlePackageCreated} />
        </div>
      </div>
    </div>
  );
}

export default App;

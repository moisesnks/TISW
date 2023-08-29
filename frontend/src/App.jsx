import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchDestinos, fetchPaquetes } from './api'; 
import SubirImagen from '../components/SubirImagen'; 
import PaqueteTuristico from '../components/PaqueteTuristico'; 
import ModificarPaquete from '../components/ModificarPaquete'; 

function App() {
  const [destinos, setDestinos] = useState([]);
  const [paquetes, setPaquetes] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    fetchDestinos()
      .then(data => setDestinos(data))
      .catch(error => console.error('Error fetching destinos:', error));

    fetchPaquetes()
      .then(data => setPaquetes(data))
      .catch(error => console.error('Error fetching paquetes:', error));
  }, []);

  const handlePackageUpdated = (updatedId, updatedPackage) => {
    const updatedPackages = paquetes.map(paquete =>
      paquete.id === updatedId ? updatedPackage : paquete
    );
    setPaquetes(updatedPackages);
    setSelectedPackage(null); // Limpiar la selección después de actualizar
  };

  return (
    <div className="Container">
      <div className='Paquetes'>
        <h1>Paquetes Turísticos</h1>
        <PaqueteTuristico 
          paquetes = {paquetes}> 
        </PaqueteTuristico>
        
      </div>
      <div className='Admin'>
        <div className='AdminSection'>
          <ModificarPaquete />
        </div>
        <div className='AdminSection'>
          <SubirImagen />
        </div>
      </div>
    </div>
  );
}

export default App;

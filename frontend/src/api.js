import axios from 'axios';
import Compressor from 'compressorjs';


const API_URL = 'http://localhost:3001/api'; // Actualiza la URL según tu configuración

export const fetchDestinos = async () => {
  try {
    const response = await axios.get(`${API_URL}/destinos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching destinos:', error);
    throw error;
  }
};

export const fetchPaquetes = async () => {
    try {
      const response = await axios.get(`${API_URL}/paquetes`);
      return response.data;
    } catch (error) {
      console.error('Error fetching paquetes:', error);
      throw error;
    }
  };
  
export const updateImage = async (paqueteId, imageData) => {
try {
    const response = await axios.put(`${API_URL}/paquetes/${paqueteId}/image`, imageData, {
    headers: {
        'Content-Type': 'application/octet-stream'
    }
    });

    return response.data;
} catch (error) {
    console.error('Error updating image:', error);
    throw error;
}
};

export const updatePackage = async (updatedPackage) => {
  try {
    const response = await axios.put(`${API_URL}/paquetes/${updatedPackage.id}`, updatedPackage);
    return response.data;
  } catch (error) {
    console.error('Error updating package:', error);
    throw error;
  }
};

// Otras funciones para enviar datos al backend, como crear o actualizar paquetes


const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Obtener lista de paquetes
router.get('/paquetes', async (req, res) => {
  try {
    const paquetes = await db.query('SELECT * FROM paquetes');
    res.json(paquetes.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
});

// Agregar un nuevo paquete
router.post('/paquetes', async (req, res) => {
  try {
    const { nombre, destino_id, precio } = req.body;
    const newPaquete = await db.query(
      'INSERT INTO paquetes (nombre, destino_id, precio) VALUES ($1, $2, $3) RETURNING *',
      [nombre, destino_id, precio]
    );
    res.json(newPaquete.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
});


// Actualizar la imagen de un paquete
router.put('/paquetes/:id/image', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const imageBuffer = req.file.buffer;

  try {
    await db.query('UPDATE paquetes SET img = $1 WHERE id = $2', [imageBuffer, id]);
    res.send('Imagen actualizada correctamente');
  } catch (error) {
    console.error('Error actualizando la imagen:', error);
    res.status(500).send('Error en el servidor');
  }
});

// Actualizar un paquete
router.put('/paquetes/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, destino_id, precio } = req.body;

  try {
    const updatedPaquete = await db.query(
      'UPDATE paquetes SET nombre = $1, destino_id = $2, precio = $3 WHERE id = $4 RETURNING *',
      [nombre, destino_id, precio, id]
    );
    res.json(updatedPaquete.rows[0]);
  } catch (error) {
    console.error('Error actualizando paquete:', error);
    res.status(500).send('Error en el servidor');
  }
});

// Eliminar un paquete
router.delete('/paquetes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPaquete = await db.query('DELETE FROM paquetes WHERE id = $1 RETURNING *', [id]);
    if (deletedPaquete.rows.length === 0) {
      res.status(404).json({ message: 'Paquete no encontrado' });
    } else {
      res.json({ message: 'Paquete eliminado correctamente', deletedPackage: deletedPaquete.rows[0] });
    }
  } catch (error) {
    console.error('Error deleting package:', error);
    res.status(500).send('Error en el servidor');
  }
});

module.exports = router;

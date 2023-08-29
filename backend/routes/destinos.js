const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener lista de destinos
router.get('/destinos', async (req, res) => {
  try {
    const destinos = await db.query('SELECT * FROM destinos');
    res.json(destinos.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
});

// Agregar un nuevo destino
router.post('/destinos', async (req, res) => {
  try {
    const { nombre, pais } = req.body;
    const newDestino = await db.query('INSERT INTO destinos (nombre, pais) VALUES ($1, $2) RETURNING *', [nombre, pais]);
    res.json(newDestino.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
});

// Actualizar un destino
router.put('/destinos/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, pais } = req.body;

  try {
    const updatedDestino = await db.query(
      'UPDATE destinos SET nombre = $1, pais = $2 WHERE id = $3 RETURNING *',
      [nombre, pais, id]
    );
    res.json(updatedDestino.rows[0]);
  } catch (error) {
    console.error('Error actualizando destino:', error);
    res.status(500).send('Error en el servidor');
  }
});

// Eliminar un destino
router.delete('/destinos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDestino = await db.query('DELETE FROM destinos WHERE id = $1 RETURNING *', [id]);
    if (deletedDestino.rows.length === 0) {
      res.status(404).json({ message: 'Destino no encontrado' });
    } else {
      res.json({ message: 'Destino eliminado correctamente', deletedDestino: deletedDestino.rows[0] });
    }
  } catch (error) {
    console.error('Error eliminando destino:', error);
    res.status(500).send('Error en el servidor');
  }
});


module.exports = router;

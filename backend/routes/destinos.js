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

module.exports = router;

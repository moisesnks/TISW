const express = require('express');
const router = express.Router();
const paquetesRouter = require('./paquetes'); // Importa el router de paquetes
const destinosRouter = require('./destinos'); // Importa el router de destinos

router.use('/api', paquetesRouter); // Utiliza el router de paquetes
router.use('/api', destinosRouter); // Utiliza el router de destinos

module.exports = router;

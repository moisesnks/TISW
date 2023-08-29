const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Importa los routers de las células
const paquetesRouter = require('./routes/paquetes');
const destinosRouter = require('./routes/destinos');
// Agrega más routers para otras células si es necesario

// Utiliza los routers de las células
app.use('/api', paquetesRouter);
app.use('/api', destinosRouter);
// Utiliza más routers para otras células si es necesario

app.listen(port, () => {
  console.log(`Server corriendo en el puerto: ${port}`);
});

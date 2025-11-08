// server.js

const express = require('express');
const cors = require('cors');
const autorController = require('./autorController');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // 💡 Permite peticiones desde el frontend Render
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ----------------------
// ENDPOINTS DE LA API
// ----------------------
app.post('/api/autores', autorController.crearAutor);
app.get('/api/autores', autorController.obtenerAutores);
app.get('/api/autores/:id', autorController.obtenerAutorPorId);
app.put('/api/autores/:id', autorController.actualizarAutor);
app.delete('/api/autores/:id', autorController.eliminarAutor);

// Inicializar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor API REST escuchando en http://localhost:${PORT}`);
});

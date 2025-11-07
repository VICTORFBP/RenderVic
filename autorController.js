// autorController.js
const pool = require('../db');

// ✅ Obtener todos los autores
exports.obtenerAutores = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM autor ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener autores:', error);
    res.status(500).json({ error: 'Error al obtener autores' });
  }
};

// ✅ Obtener un autor por ID
exports.obtenerAutorPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM autor WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Autor no encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener autor:', error);
    res.status(500).json({ error: 'Error al obtener autor' });
  }
};

// ✅ Crear un nuevo autor
exports.crearAutor = async (req, res) => {
  try {
    const { nombre, nacionalidad } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: 'El nombre es obligatorio' });
    }

    const result = await pool.query(
      'INSERT INTO autor (nombre, nacionalidad) VALUES ($1, $2) RETURNING *',
      [nombre, nacionalidad]
    );

    res.status(201).json({
      mensaje: 'Autor creado exitosamente',
      autor: result.rows[0],
    });
  } catch (error) {
    console.error('Error al crear autor:', error);
    res.status(500).json({ error: 'Error al crear autor' });
  }
};

// ✅ Actualizar un autor existente
exports.actualizarAutor = async (req, res) => {
  const { id } = req.params;
  const { nombre, nacionalidad } = req.body;

  try {
    const result = await pool.query(
      'UPDATE autor SET nombre = $1, nacionalidad = $2 WHERE id = $3 RETURNING *',
      [nombre, nacionalidad, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Autor no encontrado' });
    }

    res.status(200).json({
      mensaje: 'Autor actualizado exitosamente',
      autor: result.rows[0],
    });
  } catch (error) {
    console.error('Error al actualizar autor:', error);
    res.status(500).json({ error: 'Error al actualizar autor' });
  }
};

// ✅ Eliminar un autor
exports.eliminarAutor = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM autor WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Autor no encontrado' });
    }

    res.status(200).json({
      mensaje: 'Autor eliminado exitosamente',
      autor: result.rows[0],
    });
  } catch (error) {
    console.error('Error al eliminar autor:', error);
    res.status(500).json({ error: 'Error al eliminar autor' });
  }
};

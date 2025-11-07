// db.js (PostgreSQL - versión completa con creación automática)
const { Pool } = require('pg');

// 🧩 Configuración de la conexión a PostgreSQL (Render)
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  ssl: { rejectUnauthorized: false }, // Render requiere SSL
});

// ✅ Función para verificar y crear la tabla si no existe
(async () => {
  try {
    console.log("🔄 Verificando existencia de la tabla 'autor'...");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS autor (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        nacionalidad VARCHAR(50),
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Tabla 'autor' verificada o creada correctamente.");
  } catch (err) {
    console.error("❌ Error al crear/verificar la tabla 'autor':", err);
  }
})();

// Exportar el pool para usar en los controladores
module.exports = pool;

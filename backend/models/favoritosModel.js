import pool from "../config/db.js";

export const crearFavorito = async (usuario_id, marcha_id) => {
  await pool.query(
    `INSERT INTO usuarios_favoritos (usuario_id, marcha_id)
     VALUES (?, ?)`,
    [usuario_id, marcha_id]
  );
};

export const eliminarFavorito = async (usuario_id, marcha_id) => {
  await pool.query(
    `DELETE FROM usuarios_favoritos WHERE usuario_id=? AND marcha_id=?`,
    [usuario_id, marcha_id]
  );
};

export const obtenerFavoritosPorUsuario = async (usuario_id) => {
  const [rows] = await pool.query(
    `SELECT * FROM marchas 
     INNER JOIN usuarios_favoritos ON marchas.id = usuarios_favoritos.marcha_id
     WHERE usuarios_favoritos.usuario_id = ?`,
    [usuario_id]
  );
  return rows;
};

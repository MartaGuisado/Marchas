
import pool from "../config/db.js";

export const obtenerMarchas = async () => {
  const [rows] = await pool.query("SELECT * FROM marchas");
  return rows;
};

export const obtenerMarchaPorId = async (id) => {
  const [rows] = await pool.query("SELECT * FROM marchas WHERE id = ?", [id]);
  return rows[0];
};

export const crearMarcha = async (marcha) => {
  const { titulo, anio, descripcion, duracion_segundos, tipo } = marcha;
  const [result] = await pool.query(
    "INSERT INTO marchas (titulo, anio, descripcion, duracion_segundos, tipo) VALUES (?, ?, ?, ?, ?)",
    [titulo, anio, descripcion, duracion_segundos, tipo]
  );
  return result.insertId;
};

export const actualizarMarcha = async (id, data) => {
  await pool.query(
    `UPDATE marchas SET titulo=?, anio=?, descripcion=?, duracion_segundos=?, tipo=?, dedicatoria=?, updated_at=NOW() WHERE id=?`,
    [
      data.titulo,
      data.anio,
      data.descripcion,
      data.duracion_segundos,
      data.tipo,
      data.dedicatoria,
      id
    ]
  );
};

export const eliminarMarchaPorId = async (id) => {
  await pool.query("DELETE FROM marchas WHERE id=?", [id]);
};
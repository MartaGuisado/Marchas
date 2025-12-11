import pool from "../config/db.js";

export const obtenerAutor = async () => {
  const [rows] = await pool.query("SELECT * FROM autores");
  return rows;
};

export const obtenerAutorPorId = async (id) => {
  const [rows] = await pool.query("SELECT * FROM autores WHERE id = ?", [id]);
  return rows[0];
};

export const crearAutor = async (data) => {
  const [result] = await pool.query(
    `INSERT INTO autores (nombre, fecha_nacimiento, fecha_fallecimiento, created_at, updated_at)
     VALUES (?, ?, ?, NOW(), NOW())`,
    [data.nombre, data.fecha_nacimiento, data.fecha_fallecimiento]
  );
  return result.insertId;
};

export const actualizarAutor = async (id, data) => {
  await pool.query(
    `UPDATE autores SET nombre=?, fecha_nacimiento=?, fecha_fallecimiento=?, updated_at=NOW() WHERE id=?`,
    [data.nombre, data.fecha_nacimiento, data.fecha_fallecimiento, id]
  );
};

export const eliminarAutorPorId = async (id) => {
  await pool.query("DELETE FROM autores WHERE id=?", [id]);
};

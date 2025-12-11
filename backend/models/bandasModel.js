import pool from "../config/db.js";

export const obtenerBandas = async () => {
  const [rows] = await pool.query("SELECT * FROM bandas");
  return rows;
};

export const obtenerBandaPorId = async (id) => {
  const [rows] = await pool.query("SELECT * FROM bandas WHERE id = ?", [id]);
  return rows[0];
};

export const crearBanda = async (data) => {
  const [result] = await pool.query(
    `INSERT INTO bandas (nombre, tipo, localidad, anio_fundacion, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [data.nombre, data.tipo, data.localidad, data.anio_fundacion, new Date(), new Date()]
  );
  return result.insertId;
};

export const actualizarBanda = async (id, data) => {
  await pool.query(
    `UPDATE bandas SET nombre=?, tipo=?, localidad=?, anio_fundacion=?, updated_at=NOW() WHERE id=?`,
    [
      data.nombre,
      data.tipo,
      data.localidad,
      data.anio_fundacion,
      id
    ]
  );
};

export const eliminarBandaPorId = async (id) => {
  await pool.query("DELETE FROM bandas WHERE id=?", [id]);
};

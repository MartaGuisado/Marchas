import pool from "../config/db.js";

export const crearUsuario = async (nombre, email, hashedPassword) => {
  const [result] = await pool.query(
    `INSERT INTO usuarios (nombre, email, password)
     VALUES (?, ?, ?)`,
    [nombre, email, hashedPassword]
  );
  return result.insertId;
};

export const obtenerUsuarios = async () => {
  const [rows] = await pool.query("SELECT * FROM usuarios");
  return rows;
};

export const obtenerUsuarioPorEmail = async (email) => {
  const [rows] = await pool.query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email]
  );
  return rows[0];
};

export const obtenerUsuarioPorId = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM usuarios WHERE id = ?",
    [id]
  );
  return rows[0];
};

export const actualizarUsuario = async (id, data) => {
  await pool.query(
    `UPDATE usuarios 
     SET nombre = ?, email = ?, updated_at = NOW()
     WHERE id = ?`,
    [data.nombre, data.email, id]
  );
};

export const eliminarUsuarioPorId = async (id) => {
  await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
};

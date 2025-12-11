import pool from "../config/db.js";

export const crearUsuario = async (nombre, email, hashedPassword) => {
  const [result] = await pool.query(
    `INSERT INTO usuarios (nombre, email, password)
     VALUES (?, ?, ?)`,
    [nombre, email, hashedPassword]
  );
  return result.insertId;
};

export const obtenerUsuarioPorEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
  return rows[0];
};

export const obtenerUsuarioPorId = async (id) => {
  const [rows] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);
  return rows[0];
};
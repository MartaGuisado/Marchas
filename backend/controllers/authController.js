// backend/controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  crearUsuario,
  obtenerUsuarioPorEmail
} from "../models/usuariosModel.js";

/* ===========================
   REGISTRO
=========================== */
export const registro = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const existingUser = await obtenerUsuarioPorEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await crearUsuario(nombre, email, hashedPassword);

    res.status(201).json({
      message: "Usuario registrado",
      userId
    });
  } catch (error) {
    console.error("❌ Error en registro:", error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

/* ===========================
   LOGIN
=========================== */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await obtenerUsuarioPorEmail(email);

    // 🔎 DEBUG CLAVE (PUNTO 5)
    console.log("🧪 USER DESDE BD:", user);

    if (!user) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    // ⚠️ OJO AQUÍ: revisaremos este campo tras ver el console.log
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login correcto",
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email
      }
    });

  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

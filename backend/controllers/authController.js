import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as Usuario from "../models/usuariosModel.js";

export const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Comprobar si el usuario ya existe
    const existe = await Usuario.obtenerUsuarioPorEmail(email);
    if (existe) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await Usuario.crearUsuario(
      nombre,
      email,
      hashedPassword
    );

    res.status(201).json({
      message: "Usuario registrado correctamente",
      userId
    });

  } catch (err) {
    console.error("❌ Error en register:", err);
    res.status(500).json({    error: "Error al registrar usuario",
    details: err.message
  });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Usuario.obtenerUsuarioPorEmail(email);
    if (!user) {
      return res.status(400).json({ error: "Credenciales inválidas" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login correcto",
      token
    });

  } catch (err) {
    console.error("❌ Error en login:", err);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

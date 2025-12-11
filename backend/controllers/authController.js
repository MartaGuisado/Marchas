// controllers/authController.js
import bcrypt from "bcrypt"; // Importación de paquete de terceros
import jwt from "jsonwebtoken"; // Importación de paquete de terceros
import User from "../models/usuariosModel.js"; // Nota 1: Módulo local con extensión .js

export const register = async (req, res) => { // Nota 2: Exportación nombrada
  try {
    const { username, email, password } = req.body;

    // 

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashed
    });

    res.json({ message: "Usuario registrado", userId: user._id });
  } catch (err) {
    // Manejo de errores
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

export const login = async (req, res) => { // Nota 2: Exportación nombrada
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Credenciales inválidas" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(400).json({ error: "Credenciales inválidas" });

    // Nota 3: La variable de entorno (process.env.JWT_SECRET) sigue funcionando igual.
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.json({ message: "Login correcto", token });
  } catch (err) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};
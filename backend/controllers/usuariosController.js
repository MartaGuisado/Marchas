// backend/controllers/usuariosController.js
import * as Usuario from "../models/usuariosModel.js"; // Importación correcta (agrupada)

export const getUsuarios = async (req, res, next) => {
  try {
    // CORRECCIÓN: Cambiar findAll() por la función real del modelo (ej. obtenerUsuarios)
    const usuarios = await Usuario.obtenerUsuarios(); 
    res.json(usuarios);
  } catch (err) {
    next(err);
  }
};

export const getUsuario = async (req, res, next) => {
  try {
    // CORRECCIÓN: Cambiar findByPk() por la función real del modelo (ej. obtenerUsuarioPorId)
    const usuario = await Usuario.obtenerUsuarioPorId(req.params.id);
    res.json(usuario);
  } catch (err) {
    next(err);
  }
};

export const updateUsuario = async (req, res, next) => {
  try {
    // CORRECCIÓN: Cambiar update() por la función real del modelo (ej. actualizarUsuario)
    // Las funciones SQL suelen requerir el ID y los datos como argumentos separados
    await Usuario.actualizarUsuario(req.params.id, req.body);
    res.json({ message: "Usuario actualizado" });
  } catch (err) {
    next(err);
  }
};

export const deleteUsuario = async (req, res, next) => {
  try {
    // CORRECCIÓN: Cambiar destroy() por la función real del modelo (ej. eliminarUsuarioPorId)
    await Usuario.eliminarUsuarioPorId(req.params.id);
    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    next(err);
  }
};
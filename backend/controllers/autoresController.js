// backend/controllers/autoresController.js
import * as Autor from "../models/autoresModel.js"; // Importación agrupada

export const createAutor = async (req, res, next) => {
  try {
    // CORRECCIÓN: Usar crearAutor
    const autor = await Autor.crearAutor(req.body); 
    res.status(201).json(autor);
  } catch (err) {
    next(err);
  }
};

export const getAutores = async (req, res, next) => {
  try {
    // CORRECCIÓN: Usar obtenerAutor
    const autores = await Autor.obtenerAutor(); 
    res.json(autores);
  } catch (err) {
    next(err);
  }
};

export const getAutor = async (req, res, next) => {
  try {
    // CORRECCIÓN: Usar obtenerAutorPorId
    const autor = await Autor.obtenerAutorPorId(req.params.id); 
    res.json(autor);
  } catch (err) {
    next(err);
  }
};

export const updateAutor = async (req, res, next) => {
  try {
    // CORRECCIÓN: Usar actualizarAutor
    await Autor.actualizarAutor(req.params.id, req.body);
    res.json({ message: "Autor actualizado" });
  } catch (err) {
    next(err);
  }
};

export const deleteAutor = async (req, res, next) => {
  try {
    // CORRECCIÓN: Usar eliminarAutorPorId
    await Autor.eliminarAutorPorId(req.params.id); 
    res.json({ message: "Autor eliminado" });
  } catch (err) {
    next(err);
  }
};
// backend/controllers/bandasController.js
import * as Banda from "../models/bandasModel.js"; // Asegurar importación agrupada

export const obtenerBandas = async (req, res, next) => {
  try {
    // CORRECCIÓN: Usar obtenerBandas (asumido que se llama igual)
    const bandas = await Banda.obtenerBandas(); 
    res.json(bandas);
  } catch (err) {
    next(err);
  }
};

export const obtenerBandaPorId = async (req, res, next) => {
  try {
    // CORRECCIÓN: Usar obtenerBandaPorId
    const banda = await Banda.obtenerBandaPorId(req.params.id); 
    res.json(banda);
  } catch (err) {
    next(err);
  }
};

export const crearBanda = async (req, res, next) => {
  try {
    // CORRECCIÓN: Usar crearBanda
    const nuevaBandaId = await Banda.crearBanda(req.body);
    res.status(201).json({ id: nuevaBandaId, message: "Banda creada" });
  } catch (err) {
    next(err);
  }
};

export const actualizarBanda = async (req, res, next) => {
  try {
    // CORRECCIÓN: Usar actualizarBanda
    await Banda.actualizarBanda(req.params.id, req.body);
    res.json({ message: "Banda actualizada" });
  } catch (err) {
    next(err);
  }
};

export const eliminarBandaPorId = async (req, res, next) => {
  try {
    // CORRECCIÓN: Usar eliminarBandaPorId
    await Banda.eliminarBandaPorId(req.params.id);
    res.json({ message: "Banda eliminada" });
  } catch (err) {
    next(err);
  }
};
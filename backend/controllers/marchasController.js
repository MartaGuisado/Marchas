import * as Marcha from "../models/marchasModel.js";

export const createMarcha = async (req, res) => {
  try {
    const nuevaMarchaId = await Marcha.crearMarcha(req.body);
    res.status(201).json({ id: nuevaMarchaId, message: "Marcha creada" });
  } catch (err) {
    res.status(500).json({ error: "Error al crear marcha" });
  }
};

export const getMarchas = async (req, res) => {
  try {
    const marchas = await Marcha.obtenerMarchas();
    res.json(marchas);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener marchas" });
  }
};

export const getMarcha = async (req, res) => {
  try {
    const marcha = await Marcha.obtenerMarchaPorId(req.params.id);
    res.json(marcha);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener marcha" });
  }
};

export const updateMarcha = async (req, res) => {
  try {
    await Marcha.actualizarMarcha(req.params.id, req.body);
    res.json({ message: "Marcha actualizada" });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar marcha" });
  }
};

export const deleteMarcha = async (req, res) => {
  try {
    await Marcha.eliminarMarcha(req.params.id);
    res.json({ message: "Marcha eliminada" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar marcha" });
  }
};

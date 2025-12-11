// controllers/marchaController.js
import * as Marcha from "../models/marchasModel.js";

export const createMarcha = async (req, res) => { // Exportación nombrada
 try {
 const { titulo, compositor, anio, banda } = req.body;
 const marcha = await Marcha.create({
 titulo,
 compositor,
 anio,
 banda
 });
 res.json(marcha);
 } catch (err) {
 res.status(500).json({ error: "Error al crear marcha" });
 }
};

export const getMarchas = async (req, res) => {
 try {

 const marchas = await Marcha.find(); 
 res.json(marchas);
 } catch (err) {
 res.status(500).json({ error: "Error al obtener marchas" });
 }
};

export const getMarcha = async (req, res) => {
 try {
 const marcha = await Marcha.findById(req.params.id);
 res.json(marcha);
 } catch (err) {
 res.status(500).json({ error: "Error al obtener marcha" });
 }
};

export const updateMarcha = async (req, res) => {
 try {
 const marcha = await Marcha.findByIdAndUpdate(req.params.id, req.body, {
 new: true // Devuelve el documento actualizado
 });
 res.json(marcha);
 } catch (err) {
 res.status(500).json({ error: "Error al actualizar marcha" });
 }
};

export const deleteMarcha = async (req, res) => {
 try {
 await Marcha.findByIdAndDelete(req.params.id);
 res.json({ message: "Marcha eliminada" });
 } catch (err) {
 res.status(500).json({ error: "Error al eliminar marcha" });
 }
};
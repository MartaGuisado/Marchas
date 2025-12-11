// backend/controllers/bandasController.js
import * as Banda from "../models/bandasModel.js";

export const createBanda = async (req, res, next) => { 
try {
const banda = await Banda.create(req.body);
 res.status(201).json(banda);
} catch (err) {
 next(err);
}
};

export const getBandas = async (req, res, next) => {
 try {
 const bandas = await Banda.findAll();
 res.json(bandas);
 } catch (err) {
 next(err);
 
 }
};

export const getBanda = async (req, res, next) => {
 try {
 const banda = await Banda.findByPk(req.params.id);
 res.json(banda);
 } catch (err) {
 next(err);
 }
};

export const updateBanda = async (req, res, next) => {
 try {
 await Banda.update(req.body, { where: { id: req.params.id } });
 res.json({ message: "Banda actualizada" });
 } catch (err) {
 next(err);
 }
};

export const deleteBanda = async (req, res, next) => {
 try {
  await Banda.destroy({ where: { id: req.params.id } });    res.json({ message: "Banda eliminada" });
} catch (err) {
  next(err);
 }
};
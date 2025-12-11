// backend/controllers/autoresController.js
import * as Autor from "../models/autoresModel.js"; // Importación del modelo

export const createAutor = async (req, res, next) => {
 try {
 const autor = await Autor.create(req.body);
 res.status(201).json(autor);
 } catch (err) {
 next(err);
}
};

export const getAutores = async (req, res, next) => {
 try {
 const autores = await Autor.findAll();
 res.json(autores);
 } catch (err) {
 next(err);
 }
};

export const getAutor = async (req, res, next) => {
 try {
 const autor = await Autor.findByPk(req.params.id);
 res.json(autor);
 } catch (err) {
 next(err);
}
};

export const updateAutor = async (req, res, next) => {
 try {
 
 await Autor.update(req.body, {
 where: { id: req.params.id },
});
 res.json({ message: "Autor actualizado" });
 } catch (err) {
 next(err);
 }
};

export const deleteAutor = async (req, res, next) => {  try {
 await Autor.destroy({ where: { id: req.params.id } });
 res.json({ message: "Autor eliminado" });
 } catch (err) {
 next(err);
 }
};
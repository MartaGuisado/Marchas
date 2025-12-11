// backend/controllers/usuariosController.js
import * as Usuario from "../models/usuariosModel.js"; 

export const getUsuarios = async (req, res, next) => { // Exportación nombrada
 try {
 const usuarios = await Usuario.findAll(); 
 res.json(usuarios);
 } catch (err) {
next(err);
 }
};

export const getUsuario = async (req, res, next) => { // Exportación nombrada
 try {
 const usuario = await Usuario.findByPk(req.params.id);
 res.json(usuario);
 } catch (err) {
 next(err);
 }
};

export const updateUsuario = async (req, res, next) => { // Exportación nombrada
 try {

await Usuario.update(req.body, { where: { id: req.params.id } });
 res.json({ message: "Usuario actualizado" });
 } catch (err) {
 next(err);
 }
};

export const deleteUsuario = async (req, res, next) => { // Exportación nombrada
 try {
 // Utiliza el método 'destroy' del modelo Sequelize
 await Usuario.destroy({ where: { id: req.params.id } });
res.json({ message: "Usuario eliminado" });
 } catch (err) {
 next(err);
}
};
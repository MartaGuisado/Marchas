// backend/controllers/favoritosController.js
import * as Favorito from "../models/favoritosModel.js"; 

export const addFavorito = async (req, res, next) => {
 try {
 // Utilizamos 'req.user.id', que es establecido por el middleware de autenticación (authMiddleware)
 const { marcha_id } = req.body;
 const usuario_id = req.user.id; 

 await Favorito.create({ usuario_id, marcha_id });

 res.json({ message: "Añadida a favoritos" });
 } catch (err) {
 next(err);
}
};

export const getFavoritos = async (req, res, next) => {
 try {
 // Consulta para obtener solo los favoritos del usuario autenticado
 const lista = await Favorito.findAll({
where: { usuario_id: req.user.id },
});

 res.json(lista);
} catch (err) {
 next(err);
 }
};

export const removeFavorito = async (req, res, next) => {
 try {
 const { marcha_id } = req.params;

 // Eliminar la entrada usando la clave compuesta (usuario_id + marcha_id) 
 await Favorito.destroy({
 where: { usuario_id: req.user.id, marcha_id }, 
});

 res.json({ message: "Eliminada de favoritos" });
 } catch (err) {
 next(err);
 }
};
// backend/controllers/favoritosController.js
import * as Favorito from "../models/favoritosModel.js"; 

export const addFavorito = async (req, res, next) => {
 try {
 // Obtenido del middleware de autenticación
 const { marcha_id } = req.body;
 const usuario_id = req.user.id; 

 // CORRECCIÓN: Usar la función SQL crearFavorito
 await Favorito.crearFavorito(usuario_id, marcha_id);

 res.json({ message: "Añadida a favoritos" });
 } catch (err) {
 next(err);
}
};

export const getFavoritos = async (req, res, next) => {
 try {
 // Consulta para obtener solo los favoritos del usuario autenticado
 const usuario_id = req.user.id;

 // CORRECCIÓN: Usar la función SQL obtenerFavoritosPorUsuario
 // Pasamos el ID directamente, ya que la función del modelo debe filtrar por él.
 const lista = await Favorito.obtenerFavoritosPorUsuario(usuario_id); 

 res.json(lista);
} catch (err) {
 next(err);
 }
};

export const removeFavorito = async (req, res, next) => {
 try {
 const { marcha_id } = req.params;
 const usuario_id = req.user.id;

 // CORRECCIÓN: Usar la función SQL eliminarFavorito
 // Le pasamos el ID de la marcha y el ID del usuario para eliminar la fila correcta.
 await Favorito.eliminarFavorito(usuario_id, marcha_id);

 res.json({ message: "Eliminada de favoritos" });
 } catch (err) {
 next(err);
 }
};
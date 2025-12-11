// backend/routes/favoritosRoutes.js
import express from "express";
import auth from "../middleware/authMiddleware.js"; 
import * as favoritosController from "../controllers/favoritosController.js"; 


const router = express.Router();

// Las rutas requieren el middleware 'auth' para asegurar que el usuario esté logueado
router.post("/", auth, favoritosController.addFavorito); 
router.get("/", auth, favoritosController.getFavoritos);
router.delete("/:marcha_id", auth, favoritosController.removeFavorito);

export default router;
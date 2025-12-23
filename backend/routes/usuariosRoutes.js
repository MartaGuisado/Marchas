// backend/routes/usuariosRoutes.js
import express from "express";
import auth from "../middleware/authMiddleware.js"; // Importación del middleware ya convertido
import * as usuariosController from "../controllers/usuariosController.js"; // Importación del controlador ya convertido

const router = express.Router();

// Las rutas GET no requieren autenticación
router.get("/", auth, usuariosController.getUsuarios);
router.get("/:id", usuariosController.getUsuario);

// Las rutas PUT y DELETE (modificación/eliminación) sí requieren autenticación (auth middleware)
router.put("/:id", auth, usuariosController.updateUsuario); 
router.delete("/:id", auth, usuariosController.deleteUsuario);

export default router; // Exportación por defecto del enrutador
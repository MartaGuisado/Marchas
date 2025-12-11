// routes/marchaRoutes.js
import express from "express";
import auth from "../middleware/authMiddleware.js"; // Importación del middleware ya convertido
import * as marchasController from "../controllers/marchasController.js"; // Importación del controlador ya convertido

const router = express.Router();

// Las rutas POST, PUT y DELETE requieren autenticación (middleware 'auth')
router.post("/", auth, marchasController.createMarcha);
router.get("/", marchasController.getMarchas);
router.get("/:id", marchasController.getMarcha);
router.put("/:id", auth, marchasController.updateMarcha);
router.delete("/:id", auth, marchasController.deleteMarcha);

export default router;
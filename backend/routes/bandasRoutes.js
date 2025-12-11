// backend/routes/bandasRoutes.js

import express from "express";
import auth from "../middleware/authMiddleware.js"; // Corregir path si es necesario
import { 
    obtenerBandas, 
    obtenerBandaPorId, 
    crearBanda, 
    actualizarBanda, 
    eliminarBandaPorId 
} from "../controllers/bandasController.js"; // <-- Importación Nombrada y Desestructurada

const router = express.Router();

// Usar las funciones directamente:
router.post("/", auth, crearBanda); // <--- CORRECCIÓN APLICADA
router.get("/", obtenerBandas);
router.get("/:id", obtenerBandaPorId);
router.put("/:id", auth, actualizarBanda);
router.delete("/:id", auth, eliminarBandaPorId);

export default router;
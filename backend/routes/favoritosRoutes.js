import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  obtenerFavoritos,
  agregarFavorito
} from "../controllers/favoritosController.js";

const router = express.Router();

router.get("/", authMiddleware, obtenerFavoritos);
router.post("/", authMiddleware, agregarFavorito);

export default router;

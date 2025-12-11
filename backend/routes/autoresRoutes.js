import express from "express";
import {
  getAutores,
  getAutor,
  createAutor,
  updateAutor,
  deleteAutor
} from "../controllers/autoresController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAutores);
router.get("/:id", getAutor);
router.post("/", auth, createAutor);
router.put("/:id", auth, updateAutor);
router.delete("/:id", auth, deleteAutor);

export default router;
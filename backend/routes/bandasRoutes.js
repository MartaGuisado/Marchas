// backend/routes/bandasRoutes.js
import express from "express";
import { default as auth } from "../middleware/authMiddleware.js";
import * as bandasController from "../controllers/bandasController.js";

const router = express.Router();

router.post("/", auth, bandasController.createBanda);
router.get("/", bandasController.getBandas);
router.get("/:id", bandasController.getBanda);
router.put("/:id", auth, bandasController.updateBanda);
router.delete("/:id", auth, bandasController.deleteBanda);

export default router;

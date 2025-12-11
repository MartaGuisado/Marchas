import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import marchasRoutes from "./routes/marchasRoutes.js";
import autoresRoutes from "./routes/autoresRoutes.js";
import bandasRoutes from "./routes/bandasRoutes.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import favoritosRoutes from "./routes/favoritosRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/marchas", marchasRoutes);
app.use("/api/autores", autoresRoutes);
app.use("/api/bandas", bandasRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/favoritos", favoritosRoutes);

// Middleware global de errores
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🎧 Servidor escuchando en http://localhost:${PORT}`);
});


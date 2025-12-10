// routes/marchas.routes.js
import { Router } from 'express';

const router = Router();

// GET /api/marchas
router.get('/', (req, res) => {
  res.json({
    ok: true,
    mensaje: 'Aquí devolveremos la lista de marchas desde la base de datos'
  });
});

export default marchasRoutes;
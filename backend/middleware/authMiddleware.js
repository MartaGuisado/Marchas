// backend/middlewares/authMiddleware.js
import jwt from "jsonwebtoken"; // Nota 1

export default function auth(req, res, next) { // Nota 2
 // El token se extrae del encabezado 'Authorization', limpiando el prefijo 'Bearer '
 const token = req.header("Authorization")?.replace("Bearer ", "");

// 1. Verificar si existe el token
 if (!token) {
 return res.status(401).json({ message: "Acceso denegado. Falta token." });
 }

 try {
 // 2. Verificar y decodificar el token JWT 
 const decoded = jwt.verify(token, process.env.JWT_SECRET);
 
 // 3. Adjuntar la información del usuario a la solicitud y pasar al siguiente middleware/controlador
 req.user = decoded; 
 next();
 } catch (error) {
 // Error si el token no es válido (ej. expirado o falsificado)
 return res.status(400).json({ message: "Token inválido." });
 }
};
export default function errorHandler(err, req, res, next) {
  console.error("🔥 Error:", err);

  res.status(err.status || 500).json({
    message: err.publicMessage || "Error interno del servidor",
    error: err.message
  });
}

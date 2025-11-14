import express from "express";
import dotenv from "dotenv";
import { testConnection } from "./db.js";
import productsRouter from "./routes/products.routes.js";
import customersRouter from "./routes/customers.routes.js";

dotenv.config();
const app = express();
app.use(express.json());

// Ruta de prueba básica (para descartar errores)
app.get("/", (req, res) => {
  res.send("Servidor Node REST activo ✅");
});

// Endpoint de healthcheck
app.get("/health", async (req, res) => {
  try {
    await testConnection();
    res.json({ ok: true, db: "connected", timestamp: new Date() });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Rutas API
app.use("/products", productsRouter);
app.use("/customers", customersRouter);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});

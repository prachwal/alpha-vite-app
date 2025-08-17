import { Router } from "express";

const router = Router();

// Endpoint do sprawdzania stanu serwera
router.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.VITE_APP_VERSION || "1.0.0",
  });
});

// Endpoint hello
router.get("/hello", (req, res) => {
  const name = req.query.name || "World";
  res.json({
    message: `Hello, ${name}!`,
    appName: process.env.VITE_APP_NAME || "Alpha Vite App",
    timestamp: new Date().toISOString(),
  });
});

// Endpoint do testowania
router.get("/test", (req, res) => {
  res.json({
    message: "Test endpoint works!",
    environment: process.env.NODE_ENV || "development",
    userAgent: req.headers["user-agent"],
    ip: req.ip,
  });
});

// Endpoint do zwracania informacji o aplikacji
router.get("/info", (req, res) => {
  res.json({
    name: process.env.VITE_APP_NAME || "Alpha Vite App",
    version: process.env.VITE_APP_VERSION || "1.0.0",
    description: process.env.VITE_APP_DESCRIPTION || "SSR Preact application",
    environment: process.env.NODE_ENV || "development",
    nodeVersion: process.version,
  });
});

export default router;

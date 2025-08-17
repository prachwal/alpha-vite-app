import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import express from "express";
import apiRoutes from "./routes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");

// Constants
const isProduction =
  process.env.NODE_ENV === "production" || process.env.VERCEL;
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";

// Cached production assets - with error handling for Vercel
let templateHtml = "";
if (isProduction) {
  try {
    const htmlPath = join(rootDir, "dist/client/index.html");
    templateHtml = await fs.readFile(htmlPath, "utf-8");
  } catch (error) {
    console.warn("Could not read template HTML:", error.message);
  }
}

// Create http server
const app = express();

// API routes
app.use("/api", apiRoutes);

// Add Vite or respective production middlewares
/** @type {import('vite').ViteDevServer | undefined} */
let vite;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;
  app.use(compression());
  app.use(base, sirv(join(rootDir, "dist/client"), { extensions: [] }));
}

// Serve HTML
app.use("*all", async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, "");

    /** @type {string} */
    let template;
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile(join(rootDir, "index.html"), "utf-8");
      template = await vite.transformIndexHtml(url, template);
    } else {
      template = templateHtml;
    }

    // For now, serve client-side rendered app (SSR disabled due to preact-iso compatibility)
    const appHtml = '<div id="app"></div>';

    const html = template
      .replace(`<!--app-head-->`, "")
      .replace(`<!--app-html-->`, appHtml);

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server for local development
if (!process.env.VERCEL) {
  const port = process.env.PORT || 5173;
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
}

export default app;

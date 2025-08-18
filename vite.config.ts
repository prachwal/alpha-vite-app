import { createRequire } from "module";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    preact({
      babel: {
        // Change cwd to load Preact Babel plugins
        cwd: createRequire(import.meta.url).resolve("@preact/preset-vite"),
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@test": path.resolve(__dirname, "./src/test"),
    },
  },
});

import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/", "src/test/", "**/*.d.ts"],
    },
    // VS Code Test Explorer integration
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: ["node_modules", "dist", ".idea", ".git", ".cache"],
    // Enable better debugging
    testTimeout: 30000,
    hookTimeout: 30000,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@components": resolve(__dirname, "./src/components"),
      "@services": resolve(__dirname, "./src/services"),
      "@pages": resolve(__dirname, "./src/pages"),
      "@assets": resolve(__dirname, "./src/assets"),
      "@utils": resolve(__dirname, "./src/utils"),
      "@hooks": resolve(__dirname, "./src/hooks"),
      "@test": resolve(__dirname, "./src/test"),
    },
  },
  plugins: [],
});

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    coverage: {
      enabled: true,
      reporter: ["text", "json", "json-summary", "lcovonly"],
    },
  },
});

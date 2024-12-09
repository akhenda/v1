import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      // provider: "v8",
      reporter: ["text", "json", "json-summary", "lcovonly"],
    },
    // reporters: ["default"],
    // outputFile: './results.json',
  },
});

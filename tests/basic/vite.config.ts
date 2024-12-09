/// <reference types="vitest/config" />

// Configure Vitest (https://vitest.dev/config/)

import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    /* for example, use global to avoid globals imports (describe, test, expect): */
    // globals: true,
    coverage: {
      enabled: true,
      provider: "v8",
      reporter: ["text", "json", "json-summary", "lcovonly"],
    },
  },
})

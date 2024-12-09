import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    /* for example, use global to avoid globals imports (describe, test, expect): */
    // globals: true,
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text', 'json', 'json-summary', 'lcovonly'],
    },
    reporters: ['default', 'junit'],
    outputFile: './coverage/test-report.junit.xml',
  },
});

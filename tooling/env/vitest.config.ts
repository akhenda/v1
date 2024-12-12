import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      reporter: ['text', 'json', 'json-summary', 'lcovonly'],
    },
    reporters: ['default', 'junit'],
    outputFile: './coverage/test-report.junit.xml',
    setupFiles: ['./src/test-setup.ts'],
  },
});

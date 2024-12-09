import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    coverage: {
      enabled: true,
      reporter: ['text', 'json', 'json-summary', 'lcovonly'],
    },
    reporters: ['default', 'junit'],
    outputFile: './coverage/test-report.junit.xml',
  },
});

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    /* for example, use global to avoid globals imports (describe, test, expect): */
    // globals: true,
    typecheck: { enabled: true },
    coverage: { enabled: false },
    reporters: ['default', 'junit'],
    outputFile: './coverage/test-report.junit.xml',
  },
});

import path from 'node:path'

import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@app': path.resolve('.', 'src/app'),
      '@domain': path.resolve('.', 'src/domain'),
      '@infrastructure': path.resolve('.', 'src/infrastructure'),
    },
  },
  test: {
    include: ['./tests/**/*.test.ts', './tests/**/*.spec.ts'],
    environment: 'node',
    setupFiles: ['./vitest.setup.ts'],
  },
})

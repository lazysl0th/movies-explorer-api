import path from 'node:path'

import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@app': path.resolve('.', 'src/app'),
      '@modules': path.resolve('.', 'src/modules'),
      '@infrastructure': path.resolve('.', 'src/infrastructure'),
      '@shared': path.resolve('.', 'src/shared'),
    },
  },
  test: {
    include: ['./test/**/*.test.ts', './test/**/*.spec.ts'],
    environment: 'node',
  },
})

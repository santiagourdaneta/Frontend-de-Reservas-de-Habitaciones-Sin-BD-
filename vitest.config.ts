import { nuxt } from '@nuxt/kit'
import { defineVitestConfig } from '@nuxt/test-utils/config';
import { fileURLToPath } from 'url';


export default defineVitestConfig({
  test: {
    environment: 'nuxt',
   exclude: ['**/tests/e2e/**', '**/node_modules/**'],
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url)),
      '@': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
})
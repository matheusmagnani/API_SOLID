import { defineConfig } from 'vitest/config'
// import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [],
  test: {
    environmentMatchGlobs: [
      [ 'src/http/controllers/**','prisma']
    ]
  }
})
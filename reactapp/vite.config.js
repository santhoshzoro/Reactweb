import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use base only for production (GitHub Pages). In dev, keep '/'
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/Reactweb/' : '/',
  plugins: [react()],
  build: {
    outDir: '../docs',
    emptyOutDir: true,
  },
}))

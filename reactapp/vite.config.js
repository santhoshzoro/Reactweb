import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config for GitHub Pages under repo: /Reactweb/
// - base ensures correct asset paths on Pages
// - outDir builds directly into ../docs used by Pages
export default defineConfig({
  base: '/Reactweb/',
  plugins: [react()],
  build: {
    outDir: '../docs',
    emptyOutDir: true, // allow cleaning docs even though it's outside project root
  },
})

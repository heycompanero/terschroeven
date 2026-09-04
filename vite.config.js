import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' so a build also works from a GitHub Pages project subpath.
// Keep every runtime asset path relative — 'img/x.jpg', never '/img/x.jpg'.
export default defineConfig({
  plugins: [react()],
  base: './',
})

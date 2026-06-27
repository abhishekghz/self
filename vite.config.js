import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' makes the build work both at a domain root and under a GitHub
// Pages project subpath (e.g. username.github.io/repo/).
export default defineConfig({
  base: './',
  plugins: [react()],
})

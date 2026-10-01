import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    cssCodeSplit: false,
    target: 'es2019',
  },
  ssr: { noExternal: ['@fontsource-variable/vazirmatn'] },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 550,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('react-dom') || id.includes(`${'node_modules'}/react/`)) return 'react'
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('gsap') || id.includes('lenis')) return 'animation'
          if (id.includes('lucide-react') || id.includes('clsx') || id.includes('tailwind-merge')) return 'ui'
        },
      },
    },
  },
})

import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/ip-address-tracker-master/',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()],
     }),
     tailwindcss()
  ],
})

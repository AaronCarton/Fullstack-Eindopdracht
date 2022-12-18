import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { VitePluginFonts } from 'vite-plugin-fonts'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      rules: [
        ['font-title', { 'font-family': 'barber-complete, sans-serif;' }],
        ['font-subtitle', { 'font-family': 'fredoka one, sans-serif;' }],
      ],
    }),
    VitePWA({
      strategies: 'generateSW',
    }),
    VitePluginFonts({
      typekit: {
        id: 'cst1irc',
        defer: true,
        injectTo: 'head',
      },
    }),
  ],
})

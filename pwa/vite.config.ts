import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { VitePluginFonts } from 'vite-plugin-fonts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      rules: [['font-title', { 'font-family': 'barber-complete, sans-serif;' }]],
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

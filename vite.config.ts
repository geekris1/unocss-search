import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { presetAttributify, presetUno, transformerAttributifyJsx, presetIcons } from 'unocss'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), UnoCSS({
    presets: [presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'height': '1.3em',
        'width': '1.3em',
        'vertical-align': 'text-bottom',
      },
    }), presetAttributify(), presetUno()]
  })],
})

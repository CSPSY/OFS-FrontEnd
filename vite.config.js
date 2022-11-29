import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import {ArcoResolver} from 'unplugin-vue-components/resolvers'

export default defineConfig({
    hmr: true,
    plugins: [
        vue(),
            Components({
            resolvers: [
                ArcoResolver()
            ]
        })
    ],
    server: {
        open: true,
        port: 8080,
        inline: true,
    }
})

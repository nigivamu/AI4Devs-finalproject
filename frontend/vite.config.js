import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        allowedHosts: ['nilson.tech', 'valdes.lat'],
        port: 3000,
        host: true,
        open: true
    }
})

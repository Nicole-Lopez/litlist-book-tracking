import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@adapters': fileURLToPath(new URL('./src/adapters', import.meta.url)),
			'@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
			'@components': fileURLToPath(new URL('./src/components', import.meta.url)),
			'@constants': fileURLToPath(new URL('./src/constants', import.meta.url)),
			'@contexts': fileURLToPath(new URL('./src/contexts', import.meta.url)),
			'@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
			'@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
			'@models': fileURLToPath(new URL('./src/models', import.meta.url)),
			'@types': fileURLToPath(new URL('./src/types', import.meta.url)),
			'@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
			'@router': fileURLToPath(new URL('./src/router', import.meta.url)),
			'@services': fileURLToPath(new URL('./src/services', import.meta.url)),
			'@utilities': fileURLToPath(new URL('./src/utilities', import.meta.url)),
		},
	},
	plugins: [react()],
})

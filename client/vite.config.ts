import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@adapters': path.resolve(__dirname, './src/adapters'),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@components': path.resolve(__dirname, './src/components'),
			'@constants': path.resolve(__dirname, './src/constants'),
			'@contexts': path.resolve(__dirname, './src/contexts'),
			'@styles': path.resolve(__dirname, './src/styles'),
			'@hooks': path.resolve(__dirname, './src/hooks'),
			'@models': path.resolve(__dirname, './src/models'),
			'@types': path.resolve(__dirname, './src/types'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@router': path.resolve(__dirname, './src/router'),
			'@services': path.resolve(__dirname, './src/services'),
			'@utilities': path.resolve(__dirname, './src/utilities'),
		},
	},
	plugins: [react()],
})

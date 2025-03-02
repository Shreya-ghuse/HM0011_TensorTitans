import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd()); // Load environment variables
	console.log("Target: ", env.VITE_API_BASE_URL);

	return {
		plugins: [
			react(),
			tailwindcss(),
		],
		resolve: {
			alias: {
			'@': '/src',
			},
		},
		base: env.VITE_BASE_PATH, // Base path changes for production
		server: {
			proxy: {
			'/api': {
				target: env.VITE_API_BASE_URL,
				changeOrigin: true,
				secure: false,
			},
			},
		},
		define: {
			'process.env': JSON.stringify(env), // Make env variables available in frontend
		},
	}
});

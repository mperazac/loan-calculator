/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	test: {
		globals: true,
		environment: 'happy-dom',
		//setupFiles: ['./vitest.setup.ts'],
		include: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
		watchExclude: ['.*\\/node_modules\\/.*', '.*\\/build\\/.*'],
		watch: false,
	},
});

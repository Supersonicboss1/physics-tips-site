import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	server: {
		watch: {
			// This is required for WSL2
			usePolling: true,
		},
	},
};

export default config;

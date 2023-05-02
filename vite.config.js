import { sveltekit } from '@sveltejs/kit/vite';
// import {svelte} from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
});

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [svelte()],
//   build: {
//     outDir: './docs', // relative to index.html
//     // emptyOutDir: true, // true if outDir is inside root. if outDir is not inside root, uncomment this.
//   }
// })
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	base: "/foodsec-data-vis",
	plugins: [sveltekit()],
	build: {
		outDir: './docs', // relative to index.html
		// emptyOutDir: true, // true if outDir is inside root. if outDir is not inside root, uncomment this.
	  }
});

import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        resume: resolve(__dirname, 'src/resume/index.html'),
        about: resolve(__dirname, 'src/about/index.html'),
        blog: resolve(__dirname, 'src/blog/index.html'),
      },
    },
  },
});
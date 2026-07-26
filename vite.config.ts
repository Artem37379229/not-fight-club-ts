import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
    plugins: [
        eslint({
            include: ['src/**/*.ts'],
            exclude: ['node_modules/**', 'dist/**'],
        }),
    ],
    build: {
        cssMinify: 'esbuild'
    }
});
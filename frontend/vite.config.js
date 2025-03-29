import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    new NodePolyfillPlugin(), // Use 'new' to instantiate the plugin
  ],
});

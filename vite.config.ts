import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'serve-root-aline-photo',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const url = req.url?.split('?')[0] || '';
            if (url.toLowerCase().startsWith('/aline')) {
              const rootDir = process.cwd();
              const rootFiles = fs.readdirSync(rootDir);
              const matchingFile = rootFiles.find(
                (f) =>
                  f.toLowerCase().startsWith('aline') &&
                  !f.endsWith('.tsx') &&
                  !f.endsWith('.ts') &&
                  !f.endsWith('.js') &&
                  !f.endsWith('.json')
              );
              if (matchingFile) {
                const filePath = path.join(rootDir, matchingFile);
                const stat = fs.statSync(filePath);
                res.writeHead(200, {
                  'Content-Type': 'image/jpeg',
                  'Content-Length': stat.size,
                });
                fs.createReadStream(filePath).pipe(res);
                return;
              }
            }
            next();
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('.', import.meta.url)),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

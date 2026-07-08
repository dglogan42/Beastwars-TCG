import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// GitHub project pages: https://<user>.github.io/Beastwars-TCG/
// Local / custom host: base `/`
// Override anytime: BASE_PATH=/my-path/
function resolveBase(mode) {
  if (process.env.BASE_PATH) return process.env.BASE_PATH;
  if (process.env.GITHUB_PAGES === 'true' || mode === 'pages') return '/Beastwars-TCG/';
  return '/';
}

export default defineConfig(({ mode }) => {
  const base = resolveBase(mode);

  return {
    base,
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: [
          'favicon.svg',
          'icons/icon-180.png',
          'icons/icon-192.png',
          'icons/icon-512.png',
          'icons/icon-maskable-512.png',
        ],
        manifest: {
          name: 'Beast Wars TCG Live',
          short_name: 'BW TCG',
          description:
            'Beast Wars Transformers trading card game — playable as a web app on desktop and mobile.',
          theme_color: '#d40f10',
          background_color: '#0a0a10',
          display: 'standalone',
          display_override: ['standalone', 'minimal-ui', 'browser'],
          orientation: 'any',
          scope: base,
          start_url: base,
          lang: 'en',
          categories: ['games', 'entertainment'],
          icons: [
            {
              src: 'icons/icon-192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'icons/icon-512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'icons/icon-maskable-512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
          shortcuts: [
            {
              name: 'Battle',
              short_name: 'Battle',
              description: 'Start a duel vs Predacon AI',
              url: `${base}battle`,
              icons: [{ src: 'icons/icon-192.png', sizes: '192x192' }],
            },
            {
              name: 'Collection',
              short_name: 'Cards',
              description: 'Browse the Beastdex card collection',
              url: `${base}collection`,
              icons: [{ src: 'icons/icon-192.png', sizes: '192x192' }],
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff2,json}'],
          navigateFallback: 'index.html',
          runtimeCaching: [
            {
              urlPattern: ({ url }) => url.origin === 'https://fonts.googleapis.com',
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
                cacheableResponse: { statuses: [0, 200] },
              },
            },
            {
              urlPattern: ({ url }) => url.origin === 'https://fonts.gstatic.com',
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
                cacheableResponse: { statuses: [0, 200] },
              },
            },
          ],
        },
        devOptions: {
          enabled: false,
        },
      }),
    ],
    server: {
      host: true,
      port: 5173,
    },
    preview: {
      host: true,
      port: 4173,
    },
  };
});

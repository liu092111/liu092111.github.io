// @ts-check
import { defineConfig } from 'astro/config';

// Deployed to GitHub Pages at the account root, so no `base` prefix is needed.
export default defineConfig({
  site: 'https://liu092111.github.io',
  trailingSlash: 'ignore',

  // `/cost` shipped in an earlier build before the route was renamed to match
  // its nav label. Kept so any link already in the wild still lands.
  redirects: {
    '/cost': '/value',
  },

  vite: {
    server: {
      watch: {
        // The repository lives on a Windows drive mounted into WSL, and drvfs
        // does not deliver inotify events. Without polling the dev server
        // silently serves the snapshot it started with: every save appears to
        // do nothing, and `npm run build` is the only thing telling the truth.
        // Polling costs a little CPU and is the only thing that works here.
        usePolling: true,
        interval: 400,
        // Polling stats every watched path on a schedule, so the watch set has
        // to be small or startup never finishes over drvfs. Only `src` and the
        // config files can change during a session.
        ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**', '**/.astro/**'],
      },
    },
  },
});

// @ts-check
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';

/**
 * The dev server needs a polling watcher only when the repository sits on a
 * Windows drive mounted into WSL: drvfs does not deliver inotify events, so a
 * native watcher silently serves the snapshot it started with and every save
 * appears to do nothing. Everywhere else (macOS, native Linux, WSL's own ext4)
 * native events work and polling would only burn CPU.
 *
 * `ASTRO_POLL=1` forces polling on, `ASTRO_POLL=0` forces it off, for any
 * setup this detection gets wrong.
 */
function needsPolling() {
  if (process.env.ASTRO_POLL === '1') return true;
  if (process.env.ASTRO_POLL === '0') return false;
  if (process.platform !== 'linux') return false;

  let isWsl = Boolean(process.env.WSL_DISTRO_NAME);
  if (!isWsl) {
    try {
      isWsl = /microsoft/i.test(readFileSync('/proc/version', 'utf8'));
    } catch {
      isWsl = false;
    }
  }
  // drvfs mounts Windows drives under /mnt/<letter>.
  return isWsl && process.cwd().startsWith('/mnt/');
}

// Deployed to GitHub Pages at the account root, so no `base` prefix is needed.
export default defineConfig({
  site: 'https://liu092111.github.io',

  /* URL shape: `/about`, never `/about/`.
     GitHub Pages serves `/about` straight from `about.html`, but answers
     `/about` with a 301 to `/about/` when the page is `about/index.html`.
     Emitting files (not directories) makes the slash-less links used across
     the site the real addresses, so canonical URLs and nav clicks resolve
     without a redirect. `trailingSlash: 'never'` makes the dev server enforce
     the same shape, so a stray `/about/` link fails locally instead of in
     production. `npm run check:links` verifies the built output. */
  trailingSlash: 'never',
  build: {
    format: 'file',
  },

  // `/cost` shipped in an earlier build before the route was renamed to match
  // its nav label. Kept so any link already in the wild still lands.
  redirects: {
    '/cost': '/value',
  },

  vite: {
    server: {
      watch: needsPolling()
        ? {
            usePolling: true,
            interval: 400,
            // Polling stats every watched path on a schedule, so the watch set
            // has to be small or startup never finishes over drvfs.
            ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**', '**/.astro/**'],
          }
        : undefined,
    },
  },
});

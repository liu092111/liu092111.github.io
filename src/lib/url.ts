/* One definition of what a page's address looks like, shared by everything
   that prints or compares one (canonical tags, Open Graph, nav state).
   The shape is set in astro.config.mjs: `/about`, never `/about/`. */

/**
 * Reduce any form Astro may report for a page (`/about/`, `/about.html`,
 * `/about/index.html`) to its canonical route path, e.g. `/about`.
 * The homepage is `/`.
 */
export function routePath(pathname: string): string {
  const path = pathname
    .replace(/\/index\.html$/, '')
    .replace(/\.html$/, '')
    .replace(/\/+$/, '');
  return path === '' ? '/' : path;
}

/** Absolute canonical URL for a pathname on this site. */
export function canonicalUrl(pathname: string, site: URL): string {
  return new URL(routePath(pathname), site).href;
}

/**
 * Verify every internal address in the built site resolves the way GitHub
 * Pages will serve it: directly, with no redirect and no 404.
 *
 * Checks `href`/`src`/`srcset` attributes and canonical/og:url values in
 * every HTML file under dist/. For a path `/x`, Pages serves `x` or `x.html`
 * directly; if only `x/index.html` exists it answers with a 301 first, and a
 * trailing-slash link to a file-format page is a 404. Both are reported.
 *
 * Run after `npm run build`. Exits non-zero on any failure, so CI blocks the
 * deploy instead of shipping a broken or redirecting link.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const SITE = 'https://liu092111.github.io';

if (!existsSync(DIST)) {
  console.error('dist/ not found. Run `npm run build` first.');
  process.exit(1);
}

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) yield* htmlFiles(full);
    else if (name.endsWith('.html')) yield full;
  }
}

const isFile = (p) => existsSync(p) && statSync(p).isFile();

/** Returns null when `path` is served directly, otherwise the reason it is not. */
function resolve(path) {
  if (path === '/') return isFile(join(DIST, 'index.html')) ? null : 'missing index.html';
  if (path.endsWith('/')) return 'trailing slash (site URLs are /page, not /page/)';

  const target = join(DIST, decodeURIComponent(path));
  if (isFile(target) || isFile(`${target}.html`)) return null;
  if (isFile(join(target, 'index.html'))) return 'served only via a 301 redirect to add a slash';
  return 'not found';
}

/** Internal paths referenced by one HTML document. */
function references(html) {
  const found = [];
  for (const [, , value] of html.matchAll(/\s(href|src)="([^"]*)"/g)) found.push(value);
  for (const [, value] of html.matchAll(/\ssrcset="([^"]*)"/g)) {
    for (const candidate of value.split(',')) found.push(candidate.trim().split(/\s+/)[0]);
  }
  for (const [, value] of html.matchAll(/property="og:url" content="([^"]*)"/g)) found.push(value);

  return found
    .map((ref) => (ref.startsWith(SITE) ? ref.slice(SITE.length) || '/' : ref))
    .filter((ref) => ref.startsWith('/') && !ref.startsWith('//'))
    .map((ref) => ref.replace(/[?#].*$/, '') || '/');
}

const failures = [];
let checked = 0;

for (const file of htmlFiles(DIST)) {
  const page = '/' + relative(DIST, file);
  for (const ref of new Set(references(readFileSync(file, 'utf8')))) {
    checked++;
    const problem = resolve(ref);
    if (problem) failures.push(`${page}: ${ref} — ${problem}`);
  }
}

if (failures.length > 0) {
  console.error(`✗ ${failures.length} internal link problem(s):\n`);
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}
console.log(`✓ ${checked} internal references resolve without a redirect.`);

/**
 * Refresh src/data/journal.json from the vocus salon "工程師的日常筆記".
 *
 * Runs before every build (npm `prebuild`), so a post published on vocus
 * shows up on /journal with the next build; the scheduled run in
 * .github/workflows/deploy.yml rebuilds daily so nothing has to be pushed.
 *
 * vocus has no RSS. This reads the same JSON endpoint the salon page itself
 * loads, which is public but undocumented and may change. On any failure the
 * committed journal.json is left as it is and the build carries on with it,
 * so the page never goes empty because vocus is down or changed its API.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const SALON_ID = '6ab8ce2f5396f334ab9587f0';
const API = 'https://api.vocus.cc/api/contents';
const PAGE_SIZE = 20;
const OUT = fileURLToPath(new URL('../src/data/journal.json', import.meta.url));

async function fetchPage(page) {
  const url = `${API}?num=${PAGE_SIZE}&page=${page}&salonId=${SALON_ID}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(15_000) });
  if (!res.ok) throw new Error(`${url} answered ${res.status}`);
  const body = await res.json();
  if (!Array.isArray(body.contents)) throw new Error(`${url} has no contents array`);
  return body;
}

async function fetchAll() {
  const posts = [];
  for (let page = 1; page <= 50; page++) {
    const { contents, count } = await fetchPage(page);
    for (const item of contents) {
      const a = item.article;
      // Only free, published articles: a paywalled link is a dead end here.
      if (item.type !== 'article' || item.isPay || !a?.title || !item.contentId) continue;
      posts.push({
        id: item.contentId,
        title: a.title,
        url: `https://vocus.cc/article/${item.contentId}`,
        date: item.publishAt,
        cover: a.noThumbnailImage ? null : (a.thumbnailUrl ?? null),
      });
    }
    if (contents.length < PAGE_SIZE || page * PAGE_SIZE >= count) break;
  }
  return posts.sort((x, y) => y.date.localeCompare(x.date));
}

try {
  const posts = await fetchAll();
  const next = JSON.stringify(posts, null, 2) + '\n';
  let prev = '';
  try {
    prev = readFileSync(OUT, 'utf8');
  } catch {}
  if (next !== prev) writeFileSync(OUT, next);
  console.log(`journal: ${posts.length} post(s) from vocus${next === prev ? ', unchanged' : ', updated'}.`);
} catch (err) {
  console.warn(`journal: could not reach vocus (${err.message}); keeping the saved list.`);
}

/* Everything the writing section needs to agree on, in one place: which
   tracks exist, which posts count as published, and when the section is
   substantial enough to advertise. The listing, the post route and the
   masthead all read from here, so none of them can drift from the others. */
import { getCollection, type CollectionEntry } from 'astro:content';

/* The two tracks, in display order. `key` is both the collection name in
   src/content.config.ts and the URL segment in /writing/<key>/<slug>. */
export const TRACKS = [
  {
    key: 'notes',
    no: '6.1',
    title: 'Notes',
    blurb: 'Product design, systems, evidence and the decisions that determine what gets built.',
  },
  {
    key: 'career',
    no: '6.2',
    title: 'Career',
    blurb:
      'How this path was actually walked: interviews, coffee chats, and the parts nobody puts on a résumé. Usually written in Chinese.',
  },
] as const;

export type TrackKey = (typeof TRACKS)[number]['key'];
export type Track = (typeof TRACKS)[number];
export type Post = CollectionEntry<TrackKey>;

/**
 * How many published posts the section needs before it is advertised: listed
 * in the masthead and open to search engines. Below this the page still builds
 * (so a direct link never 404s) but carries `noindex`, because an index of one
 * or zero posts reads as abandoned rather than new.
 */
export const LAUNCH_THRESHOLD = 2;

export function getTrack(key: TrackKey): Track {
  // TRACKS is exhaustive over TrackKey, so this cannot miss.
  return TRACKS.find((t) => t.key === key)!;
}

/* Every page asks isWritingLive() for the masthead, so without a cache a
   build queries each collection once per page, and Astro logs its
   "collection is empty" warning each time, burying any warning that matters.
   Content cannot change during a build, so cache for its lifetime. In dev
   the cache is skipped: posts are added while the server runs, and a stale
   answer there would be a confusing bug. */
const cache = new Map<string, Promise<unknown>>();
function once<T>(key: string, compute: () => Promise<T>): Promise<T> {
  if (import.meta.env.DEV) return compute();
  if (!cache.has(key)) cache.set(key, compute());
  return cache.get(key) as Promise<T>;
}

/**
 * Posts for one track, newest first.
 *
 * Drafts are included in dev and excluded from the built site, so a
 * half-finished post can be read at its real URL without being published.
 */
export function getPosts(track: TrackKey): Promise<Post[]> {
  return once(`posts:${track}`, async () => {
    const posts: Post[] = await getCollection(track, ({ data }) => import.meta.env.DEV || !data.draft);
    return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  });
}

/**
 * Whether the section has launched. Counts only non-draft posts, in dev too,
 * so the masthead in dev matches what the built site will show.
 */
export function isWritingLive(): Promise<boolean> {
  return once('live', async () => {
    const counts = await Promise.all(
      TRACKS.map(async (t) => (await getCollection(t.key, ({ data }) => !data.draft)).length)
    );
    return counts.reduce((a, b) => a + b, 0) >= LAUNCH_THRESHOLD;
  });
}

/** Route path of a post, in the site's canonical URL shape. */
export function postHref(track: TrackKey, post: Post): string {
  return `/writing/${track}/${post.id}`;
}

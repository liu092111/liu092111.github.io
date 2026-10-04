/* When a page last changed, for the sitemap's <lastmod>.

   Taken from git rather than the build clock: every build would otherwise
   claim every page changed today, and search engines learn to ignore a
   lastmod that is always "now". The deploy workflow checks out full history
   (fetch-depth: 0) so this sees real commit dates; without history, or
   outside a repository, it returns undefined and the sitemap omits the tag. */
import { execFileSync } from 'node:child_process';

/** ISO date (YYYY-MM-DD) of the newest commit touching any of `files`. */
export function lastModified(files: string[]): string | undefined {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...files], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return out || undefined;
  } catch {
    return undefined;
  }
}

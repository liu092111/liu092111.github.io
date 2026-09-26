# liu092111.github.io

Source for [liu092111.github.io](https://liu092111.github.io) — Flora Liu's personal site.

Built with [Astro](https://astro.build), no UI framework. The only client-side JavaScript is
a small inline count-up on the home readout; the page is complete without it.

LinkedIn reach on the home page is copied by hand into `LINKEDIN_STATS` in
`src/data/site.ts` (LinkedIn → Analytics → Content, past 365 days). It cannot be fetched
live: creator analytics are private to the account. Update the numbers and `asOf` together.
Every push to `master` builds, link-checks and deploys through `.github/workflows/deploy.yml`.

```bash
npm install
npm run dev            # local server
npm run build          # production build into dist/
npm run check          # astro check (types and templates)
npm run check:links    # after a build: every internal link resolves with no redirect
npm run audit:drafts   # list unresolved <DraftNote> placeholders
```

On WSL with the repo on a Windows drive (`/mnt/c/...`), the dev server switches to a
polling file watcher automatically. Set `ASTRO_POLL=1` or `ASTRO_POLL=0` to override.

## Layout

| Path                    | What it is                                                              |
| ----------------------- | ----------------------------------------------------------------------- |
| `src/data/site.ts`      | Single source of truth for copy and structured facts. Edit here first.   |
| `src/pages/`            | One file per route. The three numbered essays are the site's argument.   |
| `src/layouts/`          | `Base.astro` (shell, head, nav) and `Essay.astro` (the numbered essays). |
| `src/components/`       | `Figure` (captioned figures) and `DraftNote` (dev-only placeholders).    |
| `src/lib/`              | Shared logic: URL shape (`url.ts`) and the writing section (`writing.ts`). |
| `src/content/`          | Writing, in two tracks — see `src/content/README.md`.                    |
| `src/styles/global.css` | Design tokens and shared element styles.                                |
| `scripts/`              | Build checks run in CI.                                                 |
| `tools/`                | `site_chart_style.py`, so exported matplotlib charts match the site.     |

## Numbering

Every page is a numbered document: home `00`, the essays `01`–`03`, Speaking `04`,
About `05`, Writing `06`. Sections inside a page are `<page>.<n>` (home is `0.1`–`0.4`).
Two-digit numbers only ever mean pages; anything listed inside a section is lettered.
The full table is at the top of `src/data/site.ts`.

## URLs

Pages live at `/about`, never `/about/`. The build emits `about.html` (not
`about/index.html`) because GitHub Pages serves the former directly but answers the latter
with a 301. Write internal links without a trailing slash; `npm run check:links` fails the
deploy if one slips through.

## Publishing rules this repo follows

- **Nothing from work.** No Amazon devices, data, documents or conclusions, in any form.
- **Own figures only.** No excerpt of a paid standard (IEC, ISTA, ASTM …), no vendor
  product photography, no client deliverable from a past internship. A diagram here is
  either drawn from scratch in this repo or exported from data that is mine to publish.
- **No chart presented as a measurement unless it is one.** Concept diagrams are fine and
  are drawn as such; a plot that looks like test data must actually be test data.

Two figures from the 2024 version of this site broke the second rule and were removed from
history in Sept 2026, which is why commits before then no longer match their originals.

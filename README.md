# liu092111.github.io

Source for [liu092111.github.io](https://liu092111.github.io) — Flora Liu's personal site.

Built with [Astro](https://astro.build), no client-side JavaScript, no UI framework.
Every push to `master` builds and deploys through `.github/workflows/deploy.yml`.

```bash
npm install
npm run dev      # local server
npm run build    # production build into dist/
npm run check    # astro check (types and templates)
npm run audit:drafts   # list unresolved <DraftNote> placeholders
```

## Layout

| Path                 | What it is                                                              |
| -------------------- | ----------------------------------------------------------------------- |
| `src/data/site.ts`   | Single source of truth for copy and structured facts. Edit here first.   |
| `src/pages/`         | One file per route. The three numbered essays are the site's argument.   |
| `src/layouts/`       | `Base.astro` (shell, head, nav) and `Essay.astro` (the numbered essays). |
| `src/components/`    | Inline-SVG concept diagrams and the shared `Figure` caption treatment.   |
| `src/content/`       | Writing, in two tracks — see `src/content/README.md`.                    |
| `src/styles/global.css` | Design tokens and shared element styles.                             |
| `tools/`             | `site_chart_style.py`, so exported matplotlib charts match the site.     |

## Publishing rules this repo follows

- **Nothing from work.** No Amazon devices, data, documents or conclusions, in any form.
- **Own figures only.** No excerpt of a paid standard (IEC, ISTA, ASTM …), no vendor
  product photography, no client deliverable from a past internship. A diagram here is
  either drawn from scratch in this repo or exported from data that is mine to publish.
- **No chart presented as a measurement unless it is one.** Concept diagrams are fine and
  are drawn as such; a plot that looks like test data must actually be test data.

Two figures from the 2024 version of this site broke the second rule and were removed from
history in Sept 2026, which is why commits before then no longer match their originals.

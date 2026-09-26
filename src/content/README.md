# Writing

Two separate tracks. Keep them separate — mixing them dilutes both audiences.

| Folder   | Track     | Audience                  | Typical language |
| -------- | --------- | ------------------------- | ---------------- |
| `notes/` | Technical | Engineers, hiring readers | English          |
| `career/`| Career    | Students, job seekers     | Chinese          |

Track names, numbers and blurbs are defined once in `src/lib/writing.ts`.

## Adding a post

Create `src/content/notes/some-slug.md` (or `career/`):

```markdown
---
title: Why an average lifetime is a dangerous number
description: One sentence for search results and link previews.
date: 2026-09-20
draft: true
tags: [reliability, statistics]
lang: en
---

Body in Markdown.
```

It is served at `/writing/notes/some-slug` and listed on `/writing`. Set `lang: zh` for a
Chinese post so the page declares the right language.

## Drafts

`draft: true` means:

- **`npm run dev`** — the post is listed and readable at its real URL, marked "draft".
- **`npm run build`** — the post is left out entirely: no page, no listing entry.

Remove the flag (or set `draft: false`) to publish.

## When the section goes public

`/writing` and every published post are always built, so a shared link never breaks. The
section is only *advertised* once it has `LAUNCH_THRESHOLD` published posts (set in
`src/lib/writing.ts`, currently 2) across both tracks. Before that:

- the **Writing** entry is hidden from the masthead, and
- `/writing` carries `noindex`, so search engines skip a near-empty index.

Both switch on by themselves at the next build after the threshold is met; there is nothing
to edit by hand.

## Planned first pieces

1. `notes/` — Tested by one company, built by another, decided by a third
2. `notes/` — Reliability analysis on a public failure dataset
3. `career/` — 從機械系走到品牌廠硬體工程師

# Writing

Two separate tracks. Keep them separate — mixing them dilutes both audiences.

| Folder   | Track     | Audience                  | Typical language |
| -------- | --------- | ------------------------- | ---------------- |
| `notes/` | Technical | Engineers, hiring readers | English          |
| `career/`| Career    | Students, job seekers     | Chinese          |

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

`draft: true` keeps it out of listings until you remove the flag.

## Not yet routed

The collections are configured but **no listing or detail pages exist yet**, on purpose —
an empty writing section looks worse than none. Once there are two or three posts
ready, the routes and the nav entries get added together.

Planned first pieces:

1. `notes/` — Tested by one company, built by another, decided by a third
2. `notes/` — Reliability analysis on a public failure dataset
3. `career/` — 從機械系走到品牌廠硬體工程師

---
title: Reference
layout: default
nav_order: 3
---

# Reference

Quick-reference for the commands, files, and conventions used across the tutorials. For step-by-step context, see the [tutorial series](tutorials/).

## Installation commands

| Task | Command |
|---|---|
| Install Node.js LTS via Homebrew (macOS) | `brew install node` |
| Install Node.js LTS via nvm | `nvm install --lts && nvm use --lts` |
| Install pnpm | `npm install -g pnpm` |
| Install Claude Code | `npm install -g @anthropic-ai/claude-code` |
| Generate SSH key for GitHub | `ssh-keygen -t ed25519 -C "you@example.com"` |
| Verify GitHub SSH | `ssh -T git@github.com` |

## Starter commands

Run from `starter/`.

| Task | Command |
|---|---|
| Install dependencies | `pnpm install` |
| Generate a sample `cv.docx` | `pnpm cv:sample` |
| Parse `content/cv.docx` into data modules and BibTeX | `pnpm cv:update` (or `./update-cv.sh`) |
| Start the dev server | `pnpm dev` |
| Build for production | `pnpm build` |
| Run the production build locally | `pnpm start` |
| Lint | `pnpm lint` |

## Project file layout

```
starter/
├── content/
│   └── cv.docx
├── scripts/
│   ├── parse-cv.ts
│   ├── generate-sample-cv.ts
│   ├── parsers/
│   │   ├── shared.ts
│   │   ├── publications.ts
│   │   ├── projects.ts
│   │   ├── fellowships.ts
│   │   ├── talks.ts
│   │   └── teaching.ts
│   └── writers/
│       ├── typescript.ts
│       └── bibtex.ts
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── research/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── teaching/page.tsx
│   │   ├── news/page.tsx
│   │   └── contact/page.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── data/
│       ├── types.ts
│       ├── publications.ts      (generated)
│       ├── projects.ts          (generated)
│       ├── fellowships.ts       (generated)
│       ├── talks.ts             (generated)
│       ├── teaching.ts          (generated)
│       └── news.ts              (hand-edited)
├── public/
│   └── cv/
│       └── publications.bib    (generated)
└── update-cv.sh
```

## Word CV section headings

The parser recognises these headings, case-insensitive, with or without punctuation:

| Heading alternatives | Output |
|---|---|
| Publications, Peer-Reviewed Publications, Journal Articles | `publications.ts` + `publications.bib` |
| Projects, Grants, Funded Projects | `projects.ts` |
| Fellowships, Awards, Fellowships and Awards, Honors | `fellowships.ts` |
| Talks, Invited Talks, Presentations | `talks.ts` |
| Teaching, Courses | `teaching.ts` |

## Entry formats

### Publication (APA 7 journal article)

```
Last, F. M., & Other, A. B. (2024). Title of the paper. Journal Name, 12(3), 45-67. https://doi.org/10.xxxx/yyyy
```

### Project

```
Project title (2024 - 2026). Role: Principal Investigator. Funder: Agency Name. Optional summary sentence.
```

### Fellowship

```
Fellowship Name, Awarding Body, 2024.
```

### Talk

```
Talk title. Venue Name, Location, Month 2024.
```

### Teaching

```
CODE 5521: Course Title (Level). Term 1, Term 2.
```

## Git commands

| Task | Command |
|---|---|
| Configure global identity | `git config --global user.name "..."` / `git config --global user.email "..."` |
| Initialize a repository | `git init` |
| Add remote | `git remote add origin git@github.com:USER/REPO.git` |
| First push | `git push -u origin main` |
| Create a feature branch | `git checkout -b branch-name` |
| View current branch | `git branch --show-current` |

## Deployment

| Task | Where |
|---|---|
| Create a Vercel project | [vercel.com/new](https://vercel.com/new) |
| Add a custom domain | Vercel dashboard > Settings > Domains |
| Set environment variables | Vercel dashboard > Settings > Environment Variables |
| Verify DNS | `dig yourdomain.com +short` |
| Roll back a deployment | Vercel dashboard > Deployments > Promote to Production |

## Common troubleshooting

| Problem | Fix |
|---|---|
| `command not found: pnpm` | Restart terminal or add `~/.npm-global/bin` to `PATH` |
| `Permission denied (publickey)` on push | Re-add SSH public key at [github.com/settings/ssh/new](https://github.com/settings/ssh/new) |
| `EACCES` on global npm install | `npm config set prefix ~/.npm-global` |
| `EADDRINUSE` on `pnpm dev` | `pnpm dev -- --port 3001` |
| Parser reports unparsed lines | Match the entry to the format above, or extend the regex in `scripts/parsers/` |
| Build fails on `Named capturing groups` | Set `"target": "ES2020"` (or later) in `tsconfig.json` |

## Docs and external resources

| Topic | Link |
|---|---|
| Next.js | [nextjs.org/docs](https://nextjs.org/docs) |
| Tailwind CSS | [tailwindcss.com/docs](https://tailwindcss.com/docs) |
| Vercel | [vercel.com/docs](https://vercel.com/docs) |
| Claude Code | [docs.claude.com/claude-code](https://docs.claude.com/claude-code) |
| Zod | [zod.dev](https://zod.dev) |
| Mammoth | [github.com/mwilliamson/mammoth.js](https://github.com/mwilliamson/mammoth.js) |

## Navigation

- [README](README.md) — overview
- [Tutorial series](tutorials/) — step-by-step guide
- [Starter](starter/) — reference implementation
- [Contributing](CONTRIBUTING.md)

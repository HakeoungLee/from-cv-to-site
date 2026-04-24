# Starter

A reference Next.js project that implements the stack described in the [From CV to Site](https://github.com/HakeoungLee/from-cv-to-site) tutorials. Fork or copy this directory as your starting point.

## What you get

- Next.js 16 with the App Router, TypeScript, and Tailwind CSS v4
- Routes for home, research, projects, teaching, news, and contact
- Typed data modules for publications, projects, fellowships, talks, teaching, and news
- A Word CV parser that produces those modules and a BibTeX file
- A minimal Header and Footer shared across pages
- `next/font` loading for Inter and Source Serif 4

## Quick start

```bash
pnpm install
pnpm cv:sample   # generates content/cv.docx with example entries
pnpm cv:update   # parses content/cv.docx into src/data/
pnpm dev         # http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) to see the site. The research, projects, teaching, and news pages are populated from the generated data.

## CV workflow

Replace `content/cv.docx` with your own Word CV, then run:

```bash
./update-cv.sh
```

The parser recognises the following section headings (case-insensitive):

| Section | Output file |
|---|---|
| Publications / Peer-Reviewed Publications | `src/data/publications.ts` |
| Projects / Grants | `src/data/projects.ts` |
| Fellowships / Awards / Honors | `src/data/fellowships.ts` |
| Talks / Invited Talks / Presentations | `src/data/talks.ts` |
| Teaching / Courses | `src/data/teaching.ts` |
| Publications (same source) | `public/cv/publications.bib` |

See [Tutorial 5: CV Automation](../tutorials/05-cv-automation.md) for the expected entry formats.

## Project layout

```
starter/
├── content/
│   └── cv.docx            # your Word CV (generated sample included)
├── scripts/
│   ├── parse-cv.ts        # entry point for the CV parser
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
│   ├── app/               # routes (home, research, projects, ...)
│   ├── components/        # Header, Footer
│   └── data/              # generated modules + news (hand-edited)
├── public/
│   └── cv/
│       └── publications.bib
├── update-cv.sh
└── package.json
```

## Customization

- **Fonts.** Change in `src/app/layout.tsx`. The defaults are Inter (sans) and Source Serif 4 (serif).
- **Colors.** Edit the CSS variables in `src/app/globals.css`.
- **Pages.** Edit files in `src/app/<route>/page.tsx`. Placeholder content is marked `[like this]`.
- **Navigation.** Edit the `NAV` array in `src/components/Header.tsx`.
- **Metadata.** Update the title, description, and `metadataBase` in `src/app/layout.tsx`.

## Extending the parser

The parsers accept a single APA-style format per section. To support additional formats, edit the corresponding file in `scripts/parsers/` and add regex alternatives or parsing branches. Schemas in each parser are defined with [Zod](https://zod.dev) and enforce the shape of parsed entries.

## Requirements

- Node.js 20 or newer
- pnpm 9 or newer

See [Tutorial 3: Tech Setup](../tutorials/03-tech-setup.md) for installation instructions.

## License

MIT, matching the parent repository.

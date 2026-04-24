---
title: "7. Maintaining & Extending"
layout: single
permalink: /tutorials/07-maintaining/
sidebar:
  nav: "tutorials"
toc: true
toc_label: "On this page"
toc_sticky: true
---

# 7. Maintaining & Extending

> Part 7 of the [From CV to Site](../README.md) tutorial series.

## Prerequisites

- Completed [Tutorial 6](06-deploying.md)
- Site is live at your custom domain

## Scope

This tutorial covers routine maintenance, common extensions, and operational practices. It does not introduce new architecture.

## Regular maintenance tasks

### Adding a publication

1. Add the entry to `content/cv.docx` following the APA 7 format required by the parser
2. Run `./update-cv.sh` at the project root
3. Review the diff in `src/data/publications.ts` and `public/cv/publications.bib`
4. Commit and push:

```bash
git add content/cv.docx src/data/ public/cv/
git commit -m "Add publication: [short title]"
git push
```

Vercel redeploys automatically.

### Adding a news entry

News items are typically stored as a TypeScript array. Edit `src/data/news.ts`:

```ts
export const news = [
  {
    date: "2026-04-20",
    title: "Keynote at Conference Name",
    summary: "Short description.",
    link: "https://example.com/optional-link",
  },
  // ...existing entries
] as const;
```

Newest entries go first. Commit and push.

### Updating project status

Projects with defined start and end dates can be filtered in code (active vs. completed). For status changes (e.g., "proposed" to "funded"), update the entry in the CV or `src/data/projects.ts` directly.

If you keep `status` on each project, filter in the page component:

```ts
const active = projects.filter((p) => p.status === "active");
const completed = projects.filter((p) => p.status === "completed");
```

### Updating personnel

Edit `src/data/people.ts`:

```ts
export const people = [
  {
    name: "Full Name",
    role: "Ph.D. Student",
    startYear: 2024,
    endYear: null,
    bio: "Short bio.",
    photo: "/people/name.jpg",
    links: { scholar: "https://...", github: "https://..." },
  },
] as const;
```

Add photos to `public/people/` at a consistent size (e.g., 400x400, compressed).

## Adding new pages

To add a new route, for example `/writing`:

1. Create `src/app/writing/page.tsx`
2. Add the route to the header navigation in `src/components/Header.tsx`
3. If the page needs data, create `src/data/writing.ts`
4. Commit and push

Use an existing page as a template to maintain typographic and layout consistency.

## Handling dependency updates

Review dependencies quarterly. Two levels of update are common:

**Patch and minor updates:**

```bash
pnpm update
pnpm dev    # verify locally
```

**Major updates (Next.js, React, Tailwind):**

```bash
pnpm outdated
pnpm update next react react-dom --latest
```

Read the relevant changelog before major updates. For Next.js, the [upgrade guide](https://nextjs.org/docs/app/guides/upgrading) lists required code changes per release. Test the dev server and key routes before pushing.

## Monitoring the deployment

Vercel's **Deployments** tab shows build status and logs. Check it after every push.

For uptime and performance, Vercel Analytics (free on Hobby) is sufficient for academic sites. Enable it at **Settings** > **Analytics**.

If you want external monitoring, services such as [UptimeRobot](https://uptimerobot.com) offer free checks at 5-minute intervals.

## Backup strategy

Your Git repository on GitHub is the primary backup. Additional practices:

- Keep a local clone on a secondary machine or external drive
- Ensure `content/cv.docx` is tracked in Git (do not add it to `.gitignore`)
- Mirror the repository to a second host (for example, GitLab) if desired:

```bash
git remote add mirror git@gitlab.com:YOUR_USERNAME/my-site.git
git push mirror main
```

## Performance considerations

Next.js generates static HTML at build time by default, which is optimal for academic sites. To keep pages fast:

- Compress images before adding them to `public/`. Use [Squoosh](https://squoosh.app) or the `sharp` CLI for JPEG, PNG, and WebP conversion
- Use the `Image` component from `next/image` for photos that appear above the fold
- Avoid adding client-side JavaScript where static HTML will suffice (no `"use client"` directive unless required)

## Accessibility

Verify basic accessibility at each update:

- All images have `alt` text
- Heading hierarchy is sequential (no skipping levels)
- Contrast passes WCAG AA (4.5:1 for body text)
- Pages are navigable by keyboard

Use Chrome's built-in Lighthouse (DevTools > Lighthouse) for a quick audit.

## Extending the CV parser

The parser in Tutorial 5 handles APA 7 journal articles. To support additional formats:

1. Add a new parser file in `scripts/parsers/`
2. Extend `ENTRY_REGEX` or add a branch for the new format
3. Validate parsed entries with a Zod schema
4. Register the new section in `scripts/parse-cv.ts`

### Example: adding a preprints section

Preprints (arXiv, OSF, SSRN) do not include a journal and often use a different identifier pattern. Adding support requires three short changes.

**1. New parser at `scripts/parsers/preprints.ts`:**

```ts
import { z } from "zod";
import { htmlToLines, stripTags } from "./shared";

const PreprintSchema = z.object({
  authors: z.array(z.string()).nonempty(),
  year: z.number().int(),
  title: z.string().min(1),
  repository: z.enum(["arXiv", "OSF", "SSRN", "bioRxiv", "other"]),
  identifier: z.string().min(1),
  url: z.string().url().optional(),
});

export type Preprint = z.infer<typeof PreprintSchema>;

const ENTRY_RE =
  /^(?<authors>.+?)\s*\((?<year>\d{4})\)\.\s*(?<title>.+?)\.\s*(?<repo>arXiv|OSF|SSRN|bioRxiv):\s*(?<id>[\w./-]+)\.?\s*(?<url>https?:\/\/\S+)?\s*$/i;

export function parsePreprints(html: string) {
  const items: Preprint[] = [];
  const unparsed: string[] = [];
  for (const line of htmlToLines(html)) {
    const m = ENTRY_RE.exec(stripTags(line));
    if (!m?.groups) { unparsed.push(stripTags(line)); continue; }
    const g = m.groups;
    const parsed = {
      authors: g.authors.split(/,\s*&\s+|\s+&\s+/).map((a) => a.trim()),
      year: Number(g.year),
      title: g.title.trim(),
      repository: g.repo as Preprint["repository"],
      identifier: g.id,
      url: g.url,
    };
    const res = PreprintSchema.safeParse(parsed);
    if (res.success) items.push(res.data); else unparsed.push(stripTags(line));
  }
  return { items, unparsed };
}
```

**2. Register the section in `scripts/parse-cv.ts`:**

```ts
import { parsePreprints } from "./parsers/preprints";

// Add to the configs array:
{
  keys: ["preprints", "workingpapers"],
  parse: parsePreprints,
  outFile: "preprints.ts",
  exportName: "preprints",
  typeName: "Preprint",
},
```

**3. Add the type to `src/data/types.ts`** (use the same `Preprint` type, exported from the types module), and create `src/data/preprints.ts` as a generated file stub following the pattern of the others.

After these changes, a CV section headed `Preprints` with entries like `Doe, J., & Smith, A. (2025). Title. arXiv: 2501.12345. https://arxiv.org/abs/2501.12345.` parses correctly.

### Other formats worth adding

- **Book chapters**: parse editors, publisher, and chapter page range
- **Conference proceedings**: distinguish from journal articles (often no volume or DOI)
- **Software / datasets**: capture version, repository URL, and license
- **Non-English titles**: no code change required, but verify `lang="en"` on the root layout does not interfere with screen readers for those sections

## Working with Claude Code for maintenance

Claude Code remains useful for routine tasks:

- Generating a new page from a design brief
- Debugging build errors
- Extending the CV parser to a new entry format
- Migrating to a newer Next.js major version

Keep your design brief and relevant files open in the session. Claude Code performs best with concrete context.

## When to seek help

Use the following resources before asking elsewhere:

| Question type | Resource |
|---|---|
| Next.js routing, data fetching, builds | [Next.js documentation](https://nextjs.org/docs) |
| Tailwind utility classes | [Tailwind documentation](https://tailwindcss.com/docs) |
| Vercel deployment and DNS | [Vercel documentation](https://vercel.com/docs) |
| Claude Code features | [Claude Code documentation](https://docs.claude.com/claude-code) |
| Bugs or unclear steps in this guide | [Issues on the repository](https://github.com/HakeoungLee/from-cv-to-site/issues) |

## Conclusion

At this point, you have:

- A live academic website at a custom domain
- A CV-based workflow for publications, projects, fellowships, talks, and teaching
- A Git-based deployment pipeline through Vercel
- A documented design brief that guides future changes
- The skills to add pages, update content, and extend the site without external help

Subsequent changes are variations on the patterns covered in this series. Return to specific tutorials as needed.

---

*Questions or feedback: open an issue on the [repository](https://github.com/HakeoungLee/from-cv-to-site) or email [hannahlee@virginia.edu](mailto:hannahlee@virginia.edu).*

[Back to README](../README.md)

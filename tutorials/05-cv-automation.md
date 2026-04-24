# 5. CV Automation

> Part 5 of the [From CV to Site](../README.md) tutorial series.

## Prerequisites

- Completed [Tutorial 4](04-building-pages.md)
- An existing Word CV (`.docx`) with publications, projects, and related sections
- A code editor for reviewing and adjusting generated files

## What this automation does

The CV automation parses your Word CV and generates TypeScript data files that power the site. Editing your CV is the single source of truth; the site updates by running one script.

Input:

- `cv.docx` placed at the project root or in `content/`

Output:

- `src/data/publications.ts`
- `src/data/projects.ts`
- `src/data/fellowships.ts`
- `src/data/talks.ts`
- `src/data/teaching.ts`
- `public/cv/publications.bib` (BibTeX export)

## Supported CV sections

The parser recognizes sections by heading. Expected section headings (case-insensitive, adjustable in the script):

| Section heading | Target data file |
|---|---|
| `Publications` or `Peer-Reviewed Publications` | `publications.ts` |
| `Projects` or `Grants` | `projects.ts` |
| `Fellowships` or `Awards` | `fellowships.ts` |
| `Talks` or `Invited Talks` | `talks.ts` |
| `Teaching` | `teaching.ts` |

## Word CV formatting requirements

The parser is sensitive to entry format. Structure each section as a list where every entry follows a predictable pattern.

**Publications (APA 7):**

```
Last, F. M., & Second, A. B. (2024). Title of the paper. Journal Name, 12(3), 45-67. https://doi.org/10.xxxx/yyyy
```

Required elements in order:

1. Authors in `Last, F. M.` form, separated by commas, with `&` before the last author
2. Year in parentheses followed by a period
3. Title ending in a period
4. Italicized journal name followed by a comma
5. Volume(issue), page range
6. Optional DOI URL

**Projects / grants:**

```
Project title (2023 - 2025). Role: Principal Investigator. Funder: Agency Name. Amount: $X.
```

**Fellowships:**

```
Fellowship Name, Awarding Body, 2024.
```

**Talks:**

```
Talk title. Conference or venue name, Location, Month Year.
```

Consistency matters more than any specific format. The parser can be adjusted to other conventions if yours is consistent.

## Required libraries

Install the following dev dependencies at the project root:

```bash
pnpm add -D mammoth tsx zod
```

- `mammoth` converts `.docx` to HTML or plain text
- `tsx` runs TypeScript files directly
- `zod` validates parsed entries against a schema

## Folder layout

```
my-site/
├── content/
│   └── cv.docx
├── scripts/
│   ├── parse-cv.ts
│   ├── parsers/
│   │   ├── publications.ts
│   │   ├── projects.ts
│   │   ├── fellowships.ts
│   │   ├── talks.ts
│   │   └── teaching.ts
│   └── writers/
│       ├── typescript.ts
│       └── bibtex.ts
├── src/
│   └── data/                (generated)
└── update-cv.sh
```

## The parse-cv.ts script

The entry point reads the CV, splits it into sections, dispatches each section to its parser, and writes the output files.

```ts
// scripts/parse-cv.ts
import mammoth from "mammoth";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { parsePublications } from "./parsers/publications";
import { parseProjects } from "./parsers/projects";
import { parseFellowships } from "./parsers/fellowships";
import { parseTalks } from "./parsers/talks";
import { parseTeaching } from "./parsers/teaching";
import { toTypeScript } from "./writers/typescript";
import { toBibTeX } from "./writers/bibtex";

const CV_PATH = "content/cv.docx";

async function main() {
  const buffer = await readFile(CV_PATH);
  const { value: html } = await mammoth.convertToHtml({ buffer });

  const sections = splitBySection(html);

  const publications = parsePublications(sections.publications ?? "");
  const projects = parseProjects(sections.projects ?? "");
  const fellowships = parseFellowships(sections.fellowships ?? "");
  const talks = parseTalks(sections.talks ?? "");
  const teaching = parseTeaching(sections.teaching ?? "");

  await mkdir("src/data", { recursive: true });
  await mkdir("public/cv", { recursive: true });

  await writeFile("src/data/publications.ts", toTypeScript("publications", publications));
  await writeFile("src/data/projects.ts", toTypeScript("projects", projects));
  await writeFile("src/data/fellowships.ts", toTypeScript("fellowships", fellowships));
  await writeFile("src/data/talks.ts", toTypeScript("talks", talks));
  await writeFile("src/data/teaching.ts", toTypeScript("teaching", teaching));
  await writeFile("public/cv/publications.bib", toBibTeX(publications));

  console.log(`Wrote ${publications.length} publications, ${projects.length} projects.`);
}

function splitBySection(html: string): Record<string, string> {
  const sections: Record<string, string> = {};
  const headingRegex = /<h[12][^>]*>(.*?)<\/h[12]>/gi;
  // implementation: iterate headings, collect content until next heading
  // returns a map keyed by normalized heading name
  return sections;
}

main().catch((err) => { console.error(err); process.exit(1); });
```

Implement `splitBySection` to iterate through the HTML, match headings against the recognized section names, and collect the content between them.

## Publication parser

A publication parser using regular expressions against the APA 7 format:

```ts
// scripts/parsers/publications.ts
import { z } from "zod";

const PublicationSchema = z.object({
  authors: z.array(z.string()),
  year: z.number(),
  title: z.string(),
  venue: z.string(),
  volume: z.string().optional(),
  issue: z.string().optional(),
  pages: z.string().optional(),
  doi: z.string().optional(),
});

export type Publication = z.infer<typeof PublicationSchema>;

const ENTRY_REGEX =
  /^(?<authors>.+?)\s*\((?<year>\d{4})\)\.\s*(?<title>.+?)\.\s*(?<venue>.+?)(?:,\s*(?<volume>\d+)(?:\((?<issue>\d+)\))?)?(?:,\s*(?<pages>[\d\-–]+))?\.?(?:\s*(?<doi>https?:\/\/doi\.org\/\S+))?/;

export function parsePublications(html: string): Publication[] {
  const text = htmlToEntries(html);
  return text
    .map(parseOne)
    .filter((pub): pub is Publication => pub !== null);
}

function parseOne(line: string): Publication | null {
  const match = ENTRY_REGEX.exec(line);
  if (!match?.groups) return null;
  const { authors, year, title, venue, volume, issue, pages, doi } = match.groups;
  const parsed = {
    authors: authors.split(/,\s*&?\s*|\s+&\s+/).map((a) => a.trim()),
    year: Number(year),
    title: title.trim(),
    venue: venue.trim(),
    volume,
    issue,
    pages,
    doi,
  };
  const result = PublicationSchema.safeParse(parsed);
  return result.success ? result.data : null;
}

function htmlToEntries(html: string): string[] {
  return html
    .replace(/<li[^>]*>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}
```

This parser extracts authors, year, title, venue, volume, issue, pages, and DOI. Entries that fail the regex are returned as `null` and excluded from the output.

## BibTeX generation

Generate a `.bib` file from parsed publications.

```ts
// scripts/writers/bibtex.ts
import type { Publication } from "../parsers/publications";

export function toBibTeX(publications: Publication[]): string {
  return publications.map(entryToBibTeX).join("\n\n");
}

function entryToBibTeX(pub: Publication): string {
  const firstAuthor = pub.authors[0]?.split(",")[0]?.toLowerCase() ?? "anon";
  const key = `${firstAuthor}${pub.year}`;
  const fields = [
    `  author = {${pub.authors.join(" and ")}}`,
    `  title = {${pub.title}}`,
    `  journal = {${pub.venue}}`,
    `  year = {${pub.year}}`,
    pub.volume && `  volume = {${pub.volume}}`,
    pub.issue && `  number = {${pub.issue}}`,
    pub.pages && `  pages = {${pub.pages}}`,
    pub.doi && `  doi = {${pub.doi}}`,
  ].filter(Boolean).join(",\n");
  return `@article{${key},\n${fields}\n}`;
}
```

## TypeScript writer

Serialize parsed entries as a typed TypeScript module that the site imports.

```ts
// scripts/writers/typescript.ts
export function toTypeScript<T>(name: string, items: T[]): string {
  const json = JSON.stringify(items, null, 2);
  return `// Generated by scripts/parse-cv.ts. Do not edit by hand.\n\nexport const ${name} = ${json} as const;\n`;
}
```

## The update-cv.sh wrapper

Create a shell script at the project root that runs the parser and reports results.

```bash
#!/usr/bin/env bash
# update-cv.sh
set -euo pipefail

if [ ! -f content/cv.docx ]; then
  echo "Missing content/cv.docx"
  exit 1
fi

pnpm tsx scripts/parse-cv.ts
echo "CV data updated. Review src/data/ and commit changes."
```

Make it executable:

```bash
chmod +x update-cv.sh
```

Run it:

```bash
./update-cv.sh
```

## Consuming generated data in pages

Import the generated modules in your page components:

```tsx
// src/app/research/page.tsx
import { publications } from "@/data/publications";

export default function Research() {
  const byYear = Object.groupBy(publications, (p) => p.year);
  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-serif mb-8">Research</h1>
      {years.map((year) => (
        <section key={year} className="mb-8">
          <h2 className="text-sm uppercase tracking-wider text-neutral-500 mb-3">
            {year}
          </h2>
          <ul className="space-y-4">
            {byYear[year].map((p, i) => (
              <li key={i}>
                <p>{p.authors.join(", ")} ({p.year}). {p.title}. <em>{p.venue}</em>.</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
```

## Testing with sample data

Create `content/cv.docx` with two or three entries per section and run `./update-cv.sh`. Confirm that:

- `src/data/publications.ts` contains the expected array
- `public/cv/publications.bib` contains valid BibTeX
- The research page renders entries from the generated module

## Handling edge cases

**Non-standard entries.** Book chapters, conference proceedings, and preprints often follow different patterns. Extend `ENTRY_REGEX` or add conditional branches in `parseOne` for each variant.

**Missing DOIs.** Older publications may lack a DOI. The regex allows the DOI group to be absent.

**Unicode characters.** Names with accents or non-Latin characters pass through unchanged. Verify `lang="en"` in the root layout covers your content, or adjust per page.

**Multi-line entries.** If Word wraps long entries across lines, ensure `htmlToEntries` splits on list items rather than newlines.

**Entries that fail to parse.** Log them to the console. Fix the CV formatting or extend the parser until the log is empty.

## Maintenance workflow

1. Edit `content/cv.docx`
2. Run `./update-cv.sh`
3. Review generated files in `src/data/`
4. Commit changes with Git

## Next tutorial

[Tutorial 6: Deploying](06-deploying.md)

---

*Questions or feedback: open an issue on the [repository](https://github.com/HakeoungLee/from-cv-to-site) or email [hannahlee@virginia.edu](mailto:hannahlee@virginia.edu).*

[Back to README](../README.md)

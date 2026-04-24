import mammoth from "mammoth";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { splitBySection } from "./parsers/shared";
import { parsePublications } from "./parsers/publications";
import { parseProjects } from "./parsers/projects";
import { parseFellowships } from "./parsers/fellowships";
import { parseTalks } from "./parsers/talks";
import { parseTeaching } from "./parsers/teaching";
import { toTypeScript } from "./writers/typescript";
import { toBibTeX } from "./writers/bibtex";

const CV_PATH = resolve("content/cv.docx");
const DATA_DIR = resolve("src/data");
const BIB_DIR = resolve("public/cv");

type SectionConfig<T> = {
  keys: string[];
  parse: (html: string) => { items: T[]; unparsed: string[] };
  outFile: string;
  exportName: string;
  typeName: string;
};

async function main() {
  const buffer = await readFile(CV_PATH);
  const { value: html, messages } = await mammoth.convertToHtml({ buffer });
  if (messages.length) {
    for (const msg of messages) console.warn(`[mammoth] ${msg.type}: ${msg.message}`);
  }

  const sections = splitBySection(html);

  await mkdir(DATA_DIR, { recursive: true });
  await mkdir(BIB_DIR, { recursive: true });

  const configs: SectionConfig<unknown>[] = [
    {
      keys: ["publications", "peerreviewedpublications", "journalarticles"],
      parse: parsePublications as SectionConfig<unknown>["parse"],
      outFile: "publications.ts",
      exportName: "publications",
      typeName: "Publication",
    },
    {
      keys: ["projects", "grants", "fundedprojects"],
      parse: parseProjects as SectionConfig<unknown>["parse"],
      outFile: "projects.ts",
      exportName: "projects",
      typeName: "Project",
    },
    {
      keys: ["fellowships", "awards", "fellowshipsandawards", "honors"],
      parse: parseFellowships as SectionConfig<unknown>["parse"],
      outFile: "fellowships.ts",
      exportName: "fellowships",
      typeName: "Fellowship",
    },
    {
      keys: ["talks", "invitedtalks", "presentations"],
      parse: parseTalks as SectionConfig<unknown>["parse"],
      outFile: "talks.ts",
      exportName: "talks",
      typeName: "Talk",
    },
    {
      keys: ["teaching", "courses"],
      parse: parseTeaching as SectionConfig<unknown>["parse"],
      outFile: "teaching.ts",
      exportName: "teaching",
      typeName: "TeachingItem",
    },
  ];

  let unparsedTotal = 0;
  let publicationsForBib: unknown[] = [];

  for (const cfg of configs) {
    const body = findSection(sections, cfg.keys);
    const { items, unparsed } = cfg.parse(body ?? "");
    if (cfg.exportName === "publications") publicationsForBib = items;

    const out = toTypeScript({
      exportName: cfg.exportName,
      typeName: cfg.typeName,
      items,
    });
    await writeFile(resolve(DATA_DIR, cfg.outFile), out);

    if (unparsed.length) {
      unparsedTotal += unparsed.length;
      console.warn(
        `\n[${cfg.exportName}] ${unparsed.length} unparsed line(s):`
      );
      for (const line of unparsed) console.warn(`  - ${line}`);
    }
    console.log(`[${cfg.exportName}] wrote ${items.length} item(s).`);
  }

  const bib = toBibTeX(publicationsForBib as never);
  await writeFile(resolve(BIB_DIR, "publications.bib"), bib);
  console.log(`[bibtex] wrote ${publicationsForBib.length} entries.`);

  if (unparsedTotal > 0) {
    console.warn(
      `\nFinished with ${unparsedTotal} unparsed line(s). Review CV formatting or extend parsers.`
    );
  } else {
    console.log("\nAll entries parsed successfully.");
  }
}

function findSection(
  sections: Record<string, string>,
  keys: string[]
): string | undefined {
  for (const key of keys) {
    if (sections[key]) return sections[key];
  }
  return undefined;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

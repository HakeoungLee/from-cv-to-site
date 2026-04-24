import type { Publication } from "../parsers/publications";

export function toBibTeX(publications: Publication[]): string {
  const seen = new Map<string, number>();
  return publications.map((pub) => entryToBibTeX(pub, seen)).join("\n\n") + "\n";
}

function entryToBibTeX(pub: Publication, seen: Map<string, number>): string {
  const firstAuthorLast =
    pub.authors[0]?.split(",")[0]?.trim().replace(/\s+/g, "").toLowerCase() ?? "anon";
  const base = `${firstAuthorLast}${pub.year}`;
  const count = (seen.get(base) ?? 0) + 1;
  seen.set(base, count);
  const key = count === 1 ? base : `${base}${String.fromCharCode(96 + count)}`;

  const fields: string[] = [];
  fields.push(`  author = {${pub.authors.join(" and ")}}`);
  fields.push(`  title = {${escapeBibTeX(pub.title)}}`);
  fields.push(`  journal = {${escapeBibTeX(pub.venue)}}`);
  fields.push(`  year = {${pub.year}}`);
  if (pub.volume) fields.push(`  volume = {${pub.volume}}`);
  if (pub.issue) fields.push(`  number = {${pub.issue}}`);
  if (pub.pages) fields.push(`  pages = {${pub.pages}}`);
  if (pub.doi) fields.push(`  doi = {${pub.doi.replace(/^https?:\/\/(?:dx\.)?doi\.org\//, "")}}`);

  return `@article{${key},\n${fields.join(",\n")}\n}`;
}

function escapeBibTeX(s: string): string {
  return s.replace(/([&%$#_{}])/g, "\\$1");
}

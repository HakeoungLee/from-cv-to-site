import { z } from "zod";
import { htmlToLines, stripTags } from "./shared";

const PublicationSchema = z.object({
  authors: z.array(z.string()).nonempty(),
  year: z.number().int(),
  title: z.string().min(1),
  venue: z.string().min(1),
  volume: z.string().optional(),
  issue: z.string().optional(),
  pages: z.string().optional(),
  doi: z.string().optional(),
});

export type Publication = z.infer<typeof PublicationSchema>;

// APA 7 journal article, inline italics preserved as <em>...</em>.
// Example:
// Last, F. M., & Other, A. B. (2024). Title of the paper. <em>Journal Name</em>,
// 12(3), 45-67. https://doi.org/10.xxxx/yyyy
const ENTRY_RE =
  /^(?<authors>.+?)\s*\((?<year>\d{4})\)\.\s*(?<title>.+?)\.\s*<em>(?<venue>[^<]+?)<\/em>(?:,\s*(?<volume>\d+)(?:\((?<issue>\d+(?:[-–]\d+)?)\))?)?(?:,\s*(?<pages>[\d\-–]+))?\.?(?:\s*(?<doi>https?:\/\/(?:doi\.org|dx\.doi\.org)\/\S+))?\s*$/;

// Fallback: venue without italics
const ENTRY_RE_NO_ITALIC =
  /^(?<authors>.+?)\s*\((?<year>\d{4})\)\.\s*(?<title>.+?)\.\s*(?<venue>[^,.]+?)(?:,\s*(?<volume>\d+)(?:\((?<issue>\d+(?:[-–]\d+)?)\))?)?(?:,\s*(?<pages>[\d\-–]+))?\.?(?:\s*(?<doi>https?:\/\/(?:doi\.org|dx\.doi\.org)\/\S+))?\s*$/;

export function parsePublications(html: string): {
  items: Publication[];
  unparsed: string[];
} {
  const lines = htmlToLines(html);
  const items: Publication[] = [];
  const unparsed: string[] = [];

  for (const line of lines) {
    const match = ENTRY_RE.exec(line) ?? ENTRY_RE_NO_ITALIC.exec(stripTags(line));
    if (!match?.groups) {
      unparsed.push(stripTags(line));
      continue;
    }
    const g = match.groups;
    const parsed = {
      authors: splitAuthors(g.authors),
      year: Number(g.year),
      title: stripTags(g.title).trim(),
      venue: stripTags(g.venue).trim(),
      volume: g.volume,
      issue: g.issue,
      pages: g.pages?.replace(/–/g, "-"),
      doi: g.doi,
    };
    const result = PublicationSchema.safeParse(parsed);
    if (result.success) items.push(result.data);
    else unparsed.push(stripTags(line));
  }

  items.sort((a, b) => b.year - a.year);
  return { items, unparsed };
}

function splitAuthors(raw: string): string[] {
  return stripTags(raw)
    .split(/,\s*&\s+|\s+&\s+|;\s+/)
    .flatMap((chunk) => chunk.split(/,\s*(?=[A-Z][a-z]+,)/))
    .map((a) => a.trim())
    .filter(Boolean);
}

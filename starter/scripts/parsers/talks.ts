import { z } from "zod";
import { htmlToLines, stripTags } from "./shared";

const TalkSchema = z.object({
  title: z.string().min(1),
  venue: z.string().min(1),
  location: z.string().optional(),
  month: z.string().optional(),
  year: z.number().int(),
});

export type Talk = z.infer<typeof TalkSchema>;

// Example: "Talk title. Conference Name, City, Month 2024."
const ENTRY_RE =
  /^(?<title>.+?)\.\s*(?<venue>.+?),\s*(?<location>[^,]+?),\s*(?:(?<month>[A-Za-z]+)\s+)?(?<year>\d{4})\.?\s*$/;
const ENTRY_RE_NO_LOC =
  /^(?<title>.+?)\.\s*(?<venue>.+?),\s*(?:(?<month>[A-Za-z]+)\s+)?(?<year>\d{4})\.?\s*$/;

export function parseTalks(html: string): { items: Talk[]; unparsed: string[] } {
  const lines = htmlToLines(html);
  const items: Talk[] = [];
  const unparsed: string[] = [];

  for (const line of lines) {
    const clean = stripTags(line);
    const match = ENTRY_RE.exec(clean) ?? ENTRY_RE_NO_LOC.exec(clean);
    if (!match?.groups) {
      unparsed.push(clean);
      continue;
    }
    const g = match.groups;
    const parsed = {
      title: g.title.trim(),
      venue: g.venue.trim(),
      location: g.location?.trim(),
      month: g.month?.trim(),
      year: Number(g.year),
    };
    const result = TalkSchema.safeParse(parsed);
    if (result.success) items.push(result.data);
    else unparsed.push(clean);
  }

  items.sort((a, b) => b.year - a.year);
  return { items, unparsed };
}

import { z } from "zod";
import { htmlToLines, stripTags } from "./shared";

const FellowshipSchema = z.object({
  name: z.string().min(1),
  awarder: z.string().min(1),
  year: z.number().int(),
});

export type Fellowship = z.infer<typeof FellowshipSchema>;

// Example: "Fellowship Name, Awarding Body, 2024."
const ENTRY_RE = /^(?<name>.+?),\s*(?<awarder>.+?),\s*(?<year>\d{4})\.?\s*$/;

export function parseFellowships(html: string): {
  items: Fellowship[];
  unparsed: string[];
} {
  const lines = htmlToLines(html);
  const items: Fellowship[] = [];
  const unparsed: string[] = [];

  for (const line of lines) {
    const clean = stripTags(line);
    const match = ENTRY_RE.exec(clean);
    if (!match?.groups) {
      unparsed.push(clean);
      continue;
    }
    const parsed = {
      name: match.groups.name.trim(),
      awarder: match.groups.awarder.trim(),
      year: Number(match.groups.year),
    };
    const result = FellowshipSchema.safeParse(parsed);
    if (result.success) items.push(result.data);
    else unparsed.push(clean);
  }

  items.sort((a, b) => b.year - a.year);
  return { items, unparsed };
}

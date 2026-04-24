import { z } from "zod";
import { htmlToLines, stripTags } from "./shared";

const TeachingSchema = z.object({
  title: z.string().min(1),
  code: z.string().optional(),
  level: z.string().optional(),
  terms: z.array(z.string()).nonempty(),
});

export type TeachingItem = z.infer<typeof TeachingSchema>;

// Example: "EDLF 5521: Learning Analytics (Graduate). Fall 2024, Spring 2025."
const ENTRY_RE =
  /^(?:(?<code>[A-Z]{2,}\s?\d{3,4})[:.\s-]+)?(?<title>.+?)(?:\s*\((?<level>[^)]+?)\))?\.\s*(?<terms>.+?)\.?\s*$/;

export function parseTeaching(html: string): {
  items: TeachingItem[];
  unparsed: string[];
} {
  const lines = htmlToLines(html);
  const items: TeachingItem[] = [];
  const unparsed: string[] = [];

  for (const line of lines) {
    const clean = stripTags(line);
    const match = ENTRY_RE.exec(clean);
    if (!match?.groups) {
      unparsed.push(clean);
      continue;
    }
    const { code, title, level, terms } = match.groups;
    const termList = terms
      .split(/,\s*|\s*;\s*/)
      .map((t) => t.trim())
      .filter(Boolean);

    const parsed = {
      title: title.trim(),
      code: code?.trim(),
      level: level?.trim(),
      terms: termList,
    };
    const result = TeachingSchema.safeParse(parsed);
    if (result.success) items.push(result.data);
    else unparsed.push(clean);
  }

  return { items, unparsed };
}

import { z } from "zod";
import { htmlToLines, stripTags } from "./shared";

const ProjectSchema = z.object({
  title: z.string().min(1),
  startYear: z.number().int(),
  endYear: z.number().int().optional(),
  role: z.string().optional(),
  funder: z.string().optional(),
  summary: z.string().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;

// Example: "Project title (2023 - 2025). Role: Principal Investigator. Funder: NSF. Amount: $X."
const ENTRY_RE =
  /^(?<title>.+?)\s*\((?<startYear>\d{4})\s*(?:[-–]\s*(?<endYear>\d{4}|present))?\)\.\s*(?<rest>.*)$/i;

export function parseProjects(html: string): {
  items: Project[];
  unparsed: string[];
} {
  const lines = htmlToLines(html);
  const items: Project[] = [];
  const unparsed: string[] = [];

  for (const line of lines) {
    const clean = stripTags(line);
    const match = ENTRY_RE.exec(clean);
    if (!match?.groups) {
      unparsed.push(clean);
      continue;
    }
    const { title, startYear, endYear, rest } = match.groups;
    const role = extractField(rest, "Role");
    const funder = extractField(rest, "Funder");
    const summary = stripFields(rest).trim() || undefined;

    const parsed = {
      title: title.trim(),
      startYear: Number(startYear),
      endYear:
        endYear && endYear !== "present" ? Number(endYear) : undefined,
      role,
      funder,
      summary,
    };

    const result = ProjectSchema.safeParse(parsed);
    if (result.success) items.push(result.data);
    else unparsed.push(clean);
  }

  items.sort((a, b) => b.startYear - a.startYear);
  return { items, unparsed };
}

function extractField(text: string, key: string): string | undefined {
  const re = new RegExp(`${key}:\\s*([^.]+?)\\.`, "i");
  const m = re.exec(text);
  return m?.[1]?.trim();
}

function stripFields(text: string): string {
  return text
    .replace(/(Role|Funder|Amount):\s*[^.]+?\.\s*/gi, "")
    .replace(/\s+/g, " ");
}

export function stripTags(input: string): string {
  return input
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

const SEP = "\x1f"; // ASCII unit separator; will not appear in normal text

// Split an HTML fragment into list-item-like lines. mammoth converts Word bullet
// lists to <li>, and paragraphs to <p>. We treat both as entry boundaries.
export function htmlToLines(html: string): string[] {
  return html
    .replace(/<\/?(ul|ol)[^>]*>/g, "")
    .replace(/<\/li>/g, SEP)
    .replace(/<li[^>]*>/g, "")
    .replace(/<\/p>/g, SEP)
    .replace(/<p[^>]*>/g, "")
    .split(SEP)
    .map((s) => s.replace(/[\t ]+/g, " ").trim())
    .filter((s) => s.length > 0);
}

// Split a heading-delimited HTML body into sections keyed by normalized heading.
// Mammoth outputs headings as <h1>...<h6> with the original text inside.
export function splitBySection(html: string): Record<string, string> {
  const sections: Record<string, string> = {};
  const headingRe = /<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi;
  const boundaries: { index: number; key: string; length: number }[] = [];

  let m: RegExpExecArray | null;
  while ((m = headingRe.exec(html)) !== null) {
    boundaries.push({
      index: m.index,
      key: normalizeHeading(stripTags(m[1])),
      length: m[0].length,
    });
  }

  for (let i = 0; i < boundaries.length; i++) {
    const cur = boundaries[i];
    const next = boundaries[i + 1];
    const start = cur.index + cur.length;
    const end = next ? next.index : html.length;
    const body = html.slice(start, end);
    if (!sections[cur.key]) sections[cur.key] = body;
    else sections[cur.key] += body;
  }

  return sections;
}

export function normalizeHeading(raw: string): string {
  return raw.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

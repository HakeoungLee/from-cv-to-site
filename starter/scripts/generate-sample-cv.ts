import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  TextRun,
} from "docx";
import { writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const entries = {
  publications: [
    {
      authors: "Doe, J., & Smith, A. B.",
      year: 2025,
      title: "Evidence for cross-modal learning gains in classroom settings",
      venue: "Journal of Learning Sciences",
      volume: "34",
      issue: "2",
      pages: "145-172",
      doi: "https://doi.org/10.1000/jls.2025.0001",
    },
    {
      authors: "Doe, J., Lee, H., & Chen, W.",
      year: 2024,
      title: "Multimodal participation analytics in small-group discussions",
      venue: "Computers & Education",
      volume: "210",
      pages: "104-121",
      doi: "https://doi.org/10.1000/ce.2024.0042",
    },
    {
      authors: "Smith, A. B., & Doe, J.",
      year: 2023,
      title: "A framework for interpreting nonverbal contributions in learning",
      venue: "Educational Researcher",
      volume: "52",
      issue: "7",
      pages: "400-415",
    },
  ],
  projects: [
    {
      raw: "Inclusive Classroom Analytics (2024 - 2026). Role: Principal Investigator. Funder: National Science Foundation. An IRB-approved study examining multimodal engagement in K-12 classrooms.",
    },
    {
      raw: "Peer Collaboration Platform (2023 - 2024). Role: Co-Investigator. Funder: Institute Internal Grant. A browser-based platform for supporting peer review in undergraduate writing courses.",
    },
  ],
  fellowships: [
    "AERA Early Career Fellowship, American Educational Research Association, 2024.",
    "Spencer Foundation Dissertation Fellowship, Spencer Foundation, 2021.",
  ],
  talks: [
    "Rethinking participation in learning analytics. Learning Analytics and Knowledge Conference, Vancouver, March 2025.",
    "Cross-modal signals in group discussion. AERA Annual Meeting, Chicago, April 2024.",
    "Designing classroom tools that see students. Invited Lecture, Stanford GSE, October 2023.",
  ],
  teaching: [
    "EDLF 5521: Learning Analytics (Graduate). Fall 2024, Spring 2025.",
    "EDLF 7230: Research Methods in Education (Doctoral). Fall 2023, Fall 2024.",
    "EDLF 3010: Introduction to Educational Research (Undergraduate). Spring 2024.",
  ],
};

function section(title: string, paragraphs: Paragraph[]): Paragraph[] {
  return [
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      children: [new TextRun({ text: title, bold: true })],
    }),
    ...paragraphs,
  ];
}

function bulletParas(lines: string[]): Paragraph[] {
  return lines.map(
    (line) =>
      new Paragraph({
        bullet: { level: 0 },
        children: [new TextRun(line)],
      })
  );
}

function italicPub(p: typeof entries.publications[number]): Paragraph {
  const parts: TextRun[] = [];
  parts.push(
    new TextRun(`${p.authors} (${p.year}). ${p.title}. `)
  );
  parts.push(new TextRun({ text: p.venue, italics: true }));
  const tail: string[] = [];
  if (p.volume) {
    tail.push(`, ${p.volume}${p.issue ? `(${p.issue})` : ""}`);
  }
  if (p.pages) tail.push(`, ${p.pages}`);
  tail.push(".");
  if (p.doi) tail.push(` ${p.doi}`);
  parts.push(new TextRun(tail.join("")));
  return new Paragraph({ bullet: { level: 0 }, children: parts });
}

async function main() {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            heading: HeadingLevel.TITLE,
            children: [new TextRun("Curriculum Vitae — Sample")],
          }),
          ...section("Publications", entries.publications.map(italicPub)),
          ...section(
            "Projects",
            bulletParas(entries.projects.map((p) => p.raw))
          ),
          ...section("Fellowships", bulletParas(entries.fellowships)),
          ...section("Talks", bulletParas(entries.talks)),
          ...section("Teaching", bulletParas(entries.teaching)),
        ],
      },
    ],
  });

  await mkdir(resolve("content"), { recursive: true });
  const out = await Packer.toBuffer(doc);
  await writeFile(resolve("content/cv.docx"), out);
  console.log("Wrote content/cv.docx (" + out.length + " bytes)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

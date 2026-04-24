import { projects } from "@/data/projects";

export const metadata = { title: "Projects" };

export default function Projects() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="prose-serif text-4xl font-semibold mb-8">Projects</h1>
      {projects.length === 0 ? (
        <p className="text-neutral-500">
          No projects yet. Generate them by running{" "}
          <code className="text-sm">./update-cv.sh</code>.
        </p>
      ) : (
        <ul className="space-y-8">
          {projects.map((p, i) => (
            <li key={i}>
              <h2 className="prose-serif text-xl font-semibold mb-1">{p.title}</h2>
              <p className="text-sm text-neutral-500 mb-2">
                {p.startYear}
                {p.endYear ? `–${p.endYear}` : "–present"}
                {p.role ? ` · ${p.role}` : ""}
                {p.funder ? ` · ${p.funder}` : ""}
              </p>
              {p.summary ? <p className="leading-relaxed">{p.summary}</p> : null}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

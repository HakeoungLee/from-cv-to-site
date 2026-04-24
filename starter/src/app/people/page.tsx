import { people } from "@/data/people";

export const metadata = { title: "People" };

export default function People() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="prose-serif text-4xl font-semibold mb-8">People</h1>
      {people.length === 0 ? (
        <p className="text-neutral-500">
          Remove <code className="text-sm">src/app/people/</code> if this site is for a solo researcher.
        </p>
      ) : (
        <ul className="space-y-8">
          {people.map((p, i) => (
            <li key={i}>
              <h2 className="prose-serif text-xl font-semibold">{p.name}</h2>
              <p className="text-sm text-neutral-500 mb-2">
                {p.role}
                {p.startYear
                  ? ` · ${p.startYear}${p.endYear === null ? "–present" : p.endYear ? `–${p.endYear}` : ""}`
                  : ""}
              </p>
              {p.bio ? <p className="leading-relaxed">{p.bio}</p> : null}
              {p.links ? (
                <ul className="mt-2 flex flex-wrap gap-x-4 text-sm">
                  {p.links.scholar ? (
                    <li><a href={p.links.scholar}>Google Scholar</a></li>
                  ) : null}
                  {p.links.github ? (
                    <li><a href={p.links.github}>GitHub</a></li>
                  ) : null}
                  {p.links.website ? (
                    <li><a href={p.links.website}>Website</a></li>
                  ) : null}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

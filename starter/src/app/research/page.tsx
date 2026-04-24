import { publications } from "@/data/publications";

export const metadata = { title: "Research" };

export default function Research() {
  const byYear = new Map<number, typeof publications>();
  for (const pub of publications) {
    const list = byYear.get(pub.year) ?? [];
    list.push(pub);
    byYear.set(pub.year, list);
  }
  const years = Array.from(byYear.keys()).sort((a, b) => b - a);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="prose-serif text-4xl font-semibold mb-4">Research</h1>
      <p className="text-neutral-600 mb-12 leading-relaxed">
        A short paragraph describing your research themes. Replace with the overview
        that best reflects the common thread across your work.
      </p>

      <section className="mb-12">
        <h2 className="prose-serif text-2xl font-semibold mb-4">Themes</h2>
        <ul className="space-y-3 text-base">
          <li>
            <strong>Theme 1.</strong> One-sentence description.
          </li>
          <li>
            <strong>Theme 2.</strong> One-sentence description.
          </li>
          <li>
            <strong>Theme 3.</strong> One-sentence description.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="prose-serif text-2xl font-semibold mb-6">Publications</h2>
        {years.length === 0 ? (
          <p className="text-neutral-500">
            No publications yet. Generate them by running{" "}
            <code className="text-sm">./update-cv.sh</code>.
          </p>
        ) : (
          years.map((year) => (
            <div key={year} className="mb-8">
              <h3 className="text-xs uppercase tracking-wider text-neutral-500 mb-3">
                {year}
              </h3>
              <ul className="space-y-4">
                {byYear.get(year)!.map((p, i) => (
                  <li key={i} className="leading-relaxed">
                    {p.authors.join(", ")} ({p.year}). {p.title}.{" "}
                    <em>{p.venue}</em>
                    {p.volume ? `, ${p.volume}` : ""}
                    {p.issue ? `(${p.issue})` : ""}
                    {p.pages ? `, ${p.pages}` : ""}.
                    {p.doi ? (
                      <>
                        {" "}
                        <a href={p.doi} className="text-sm">
                          DOI
                        </a>
                      </>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </section>
    </main>
  );
}

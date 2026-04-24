export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <h1 className="prose-serif text-4xl md:text-5xl font-semibold tracking-tight mb-4">
        Your Lab or Name
      </h1>
      <p className="text-lg text-neutral-600 mb-12 leading-relaxed">
        A one-sentence description of your research. Keep it specific enough that a
        prospective student would know whether to email you.
      </p>

      <section className="mb-12">
        <h2 className="text-xs uppercase tracking-wider text-neutral-500 mb-3">
          Currently
        </h2>
        <ul className="space-y-2 text-base">
          <li>Working on [current project].</li>
          <li>Reading [current paper or book].</li>
          <li>Teaching [current course].</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xs uppercase tracking-wider text-neutral-500 mb-3">
          Recent
        </h2>
        <ul className="space-y-2 text-base">
          <li>
            Paper accepted at <em>Journal Name</em>. See{" "}
            <a href="/research">research</a>.
          </li>
          <li>
            Talk at <em>Conference Name</em>.
          </li>
        </ul>
      </section>
    </main>
  );
}

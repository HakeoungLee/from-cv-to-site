export const metadata = { title: "Contact" };

export default function Contact() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="prose-serif text-4xl font-semibold mb-8">Contact</h1>

      <section className="space-y-4 leading-relaxed">
        <p>
          Email: <a href="mailto:you@example.edu">you@example.edu</a>
        </p>
        <p>
          Office: Building Name, Room 000
          <br />
          Institution Name
          <br />
          City, State
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xs uppercase tracking-wider text-neutral-500 mb-3">
          Elsewhere
        </h2>
        <ul className="space-y-2 text-base">
          <li>
            <a href="https://scholar.google.com/citations?user=XXXX">Google Scholar</a>
          </li>
          <li>
            <a href="https://orcid.org/0000-0000-0000-0000">ORCID</a>
          </li>
          <li>
            <a href="https://github.com/your-handle">GitHub</a>
          </li>
        </ul>
      </section>
    </main>
  );
}

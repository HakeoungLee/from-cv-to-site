import { teaching } from "@/data/teaching";

export const metadata = { title: "Teaching" };

export default function Teaching() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="prose-serif text-4xl font-semibold mb-8">Teaching</h1>
      {teaching.length === 0 ? (
        <p className="text-neutral-500">
          Courses will appear here after running{" "}
          <code className="text-sm">./update-cv.sh</code>.
        </p>
      ) : (
        <ul className="space-y-6">
          {teaching.map((t, i) => (
            <li key={i}>
              <h2 className="prose-serif text-xl font-semibold mb-1">{t.title}</h2>
              <p className="text-sm text-neutral-500">
                {t.code ? `${t.code} · ` : ""}
                {t.level ? `${t.level} · ` : ""}
                {t.terms.join(", ")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

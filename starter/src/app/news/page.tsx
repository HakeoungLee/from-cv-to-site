import { news } from "@/data/news";

export const metadata = { title: "News" };

export default function News() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="prose-serif text-4xl font-semibold mb-8">News</h1>
      <ul className="space-y-6">
        {news.map((item, i) => (
          <li key={i} className="border-l-2 border-neutral-200 pl-4">
            <time className="text-xs uppercase tracking-wider text-neutral-500">
              {item.date}
            </time>
            <h2 className="prose-serif text-lg font-semibold mt-1">{item.title}</h2>
            {item.summary ? (
              <p className="mt-1 leading-relaxed">{item.summary}</p>
            ) : null}
            {item.link ? (
              <p className="mt-1 text-sm">
                <a href={item.link}>Read more</a>
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </main>
  );
}

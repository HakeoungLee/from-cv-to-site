import Link from "next/link";

const NAV = [
  { href: "/research", label: "Research" },
  { href: "/projects", label: "Projects" },
  { href: "/people", label: "People" },
  { href: "/teaching", label: "Teaching" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="border-b border-neutral-200">
      <nav className="mx-auto max-w-3xl px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <Link href="/" className="prose-serif text-lg font-semibold no-underline">
          Your Name
        </Link>
        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="no-underline hover:underline">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

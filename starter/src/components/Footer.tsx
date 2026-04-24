export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 mt-16">
      <div className="mx-auto max-w-3xl px-6 py-8 text-sm text-neutral-500 flex flex-col sm:flex-row justify-between gap-2">
        <p>Your Name, Your Institution.</p>
        <p>
          Built with{" "}
          <a
            href="https://github.com/HakeoungLee/from-cv-to-site"
            className="no-underline hover:underline"
          >
            from-cv-to-site
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

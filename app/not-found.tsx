import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center px-6 py-16">
      <section className="placeholder-shell">
        <p className="metadata-label">404 / ROUTE NOT FOUND</p>
        <h1>This route does not exist.</h1>
        <Link className="text-link" href="/en">
          Return to the English entry
        </Link>
      </section>
    </main>
  );
}

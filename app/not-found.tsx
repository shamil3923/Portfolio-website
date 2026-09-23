import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-editorial grid min-h-[70svh] place-items-center text-center">
      <div>
        <p className="font-mono text-sm text-signal">404</p>
        <h1 className="mt-4 font-display text-4xl text-bone sm:text-5xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-bone-muted">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.02]"
        >
          ← Back home
        </Link>
      </div>
    </main>
  );
}

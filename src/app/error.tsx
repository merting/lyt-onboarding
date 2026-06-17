"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-2xl font-bold tracking-tight">Something went wrong</h1>
      <p className="max-w-md text-center text-neutral-600 dark:text-neutral-400">
        An error occurred while loading this page.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"
      >
        Try again
      </button>
    </main>
  );
}

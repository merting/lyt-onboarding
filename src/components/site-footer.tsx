import Link from "next/link";

export function SiteFooter(): React.ReactElement {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-3xl flex-col gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <span>© {new Date().getFullYear()} LYT</span>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/status"
            className="transition-colors hover:text-foreground"
          >
            System status
          </Link>
          <a
            href="/api/health"
            className="transition-colors hover:text-foreground"
          >
            Health API
          </a>
        </div>
      </div>
    </footer>
  );
}

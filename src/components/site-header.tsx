"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { isNavItemActive, primaryNavItems } from "@/config/nav";

export function SiteHeader(): React.ReactElement {
  const pathname = usePathname();

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight hover:opacity-80"
        >
          LYT
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap gap-4 text-sm font-medium">
            {primaryNavItems.map(({ href, label }) => {
              const active = isNavItemActive(pathname, href);

              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={
                      active
                        ? "font-medium text-foreground"
                        : "text-muted-foreground transition-colors hover:text-foreground"
                    }
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

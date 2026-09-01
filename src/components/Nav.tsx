"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mark } from "./Mark";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/vault", label: "Vault" },
  { href: "/pursuits", label: "Pursuits" },
  { href: "/ask", label: "Ask" },
];

export function Nav() {
  const path = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-rule/80 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-page items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-ink no-underline"
          aria-label="Fathom home"
        >
          <span className="text-brass transition-transform group-hover:translate-y-px">
            <Mark className="h-6 w-6" />
          </span>
          <span className="font-display text-xl tracking-tight sm:text-[1.35rem]">Fathom</span>
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          {LINKS.map((l) => {
            const active = l.href === "/" ? path === "/" : path.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`font-label rounded-sm px-2.5 py-2 no-underline transition-colors sm:px-3 ${
                  active ? "text-brass" : "text-mute hover:text-ink"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

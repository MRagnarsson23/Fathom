"use client";

import Link from "next/link";
import { SearchBox } from "@/components/SearchBox";
import { CATALOG } from "@/lib/catalog";
import { useFathom } from "@/lib/useFathom";
import { formatMinutes, minutesForBook } from "@/lib/utils";

export default function HomePage() {
  const { hydrated, vault, recent, books, progress } = useFathom();
  const recentBooks = recent
    .map((id) => books.find((b) => b.id === id))
    .filter(Boolean)
    .slice(0, 3);

  return (
    <div className="enter">
      <p className="font-label text-brass">A reading instrument</p>
      <h1 className="mt-5 max-w-3xl font-display text-[2.4rem] leading-[1.12] text-ink sm:text-6xl">
        What book do you want to master?
      </h1>
      <p className="mt-6 max-w-measure text-lg leading-relaxed text-mute sm:text-xl">
        Fathom turns a nonfiction book into a fixed set of load-bearing ideas, then teaches them at
        the depth you choose. The concepts do not change. Only how far you go.
      </p>

      <div className="mt-12 max-w-3xl">
        <SearchBox autoFocus />
      </div>

      {hydrated && recentBooks.length > 0 ? (
        <section className="mt-16" aria-labelledby="continue-heading">
          <h2 id="continue-heading" className="font-label text-faint">
            Continue
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {recentBooks.map((b) => {
              if (!b) return null;
              const p = progress[b.id];
              const n = p?.masteredConceptIds.length ?? 0;
              return (
                <li key={b.id}>
                  <Link
                    href={`/book/${b.id}`}
                    className="block rounded-sm border border-rule bg-raised p-4 no-underline hover:border-brass/40"
                  >
                    <p className="font-display text-xl text-ink">{b.title}</p>
                    <p className="mt-1 text-sm text-mute">{b.author}</p>
                    <p className="mt-3 font-label text-faint">
                      {n} / {b.concepts.length} mastered
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <section className="mt-16" aria-labelledby="catalog-heading">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 id="catalog-heading" className="font-label text-faint">
              Seed catalog
            </h2>
            <p className="mt-2 max-w-measure text-mute">
              Four well-known books, fully structured. Original teaching language — not excerpts.
            </p>
          </div>
          {hydrated ? (
            <p className="font-label text-faint">{vault.length} in vault</p>
          ) : (
            <p className="font-label text-faint pulse-soft">Loading</p>
          )}
        </div>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {CATALOG.map((book) => (
            <li key={book.id}>
              <Link
                href={`/book/${book.id}`}
                className="group flex h-full flex-col rounded-sm border border-rule bg-raised p-6 no-underline transition-colors hover:border-brass/50"
              >
                <p className="font-label text-brass">{book.concepts.length} concepts</p>
                <h3 className="mt-3 font-display text-3xl leading-tight text-ink group-hover:text-brass">
                  {book.title}
                </h3>
                <p className="mt-1 text-mute">{book.author}</p>
                <p className="mt-4 flex-1 leading-relaxed text-mute">{book.subtitle}</p>
                <p className="mt-6 font-label text-faint">
                  Study {formatMinutes(minutesForBook(book, "study"))}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20 grid gap-10 border-t border-rule pt-12 sm:grid-cols-3">
        <div>
          <p className="font-label text-brass">Same concepts</p>
          <p className="mt-3 leading-relaxed text-mute">
            Scan, Study, and Master walk the identical set. Depth is how thoroughly each idea is
            taught, not a different outline.
          </p>
        </div>
        <div>
          <p className="font-label text-brass">A permanent vault</p>
          <p className="mt-3 leading-relaxed text-mute">
            Mastered concepts stay searchable. Pursuits turn them into concrete moves for a life you
            named.
          </p>
        </div>
        <div>
          <p className="font-label text-brass">Ask only what you know</p>
          <p className="mt-3 leading-relaxed text-mute">
            Cross-book questions are answered from the vault alone, with citations. If you have not
            learned it, Fathom will say so.
          </p>
        </div>
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { DepthPicker } from "@/components/DepthPicker";
import { EmptyState } from "@/components/EmptyState";
import { generatorDisclaimer } from "@/lib/generator";
import { useFathom } from "@/lib/useFathom";
import { depthMeta, formatMinutes, minutesForBook, padNum } from "@/lib/utils";

export default function BookPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const f = useFathom();
  const book = f.getBook(id);
  const progress = f.bookProgress(id);

  useEffect(() => {
    if (f.hydrated && book) f.rememberConcept(book.id, progress.lastConceptId ?? book.concepts[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [f.hydrated, book?.id]);

  const featured = useMemo(() => {
    if (!book) return null;
    const next = book.concepts.find((c) => !progress.masteredConceptIds.includes(c.id));
    return next ?? book.concepts[0];
  }, [book, progress.masteredConceptIds]);

  if (!f.hydrated) {
    return <p className="font-label pulse-soft text-faint">Opening the book…</p>;
  }

  if (!book) {
    return (
      <EmptyState
        kicker="Unknown title"
        title="This book is not on the shelf"
        body="Search from Home and Fathom will structure it locally into a set of load-bearing concepts."
        href="/"
        action="Find a book"
      />
    );
  }

  const depth = progress.depth;
  const mastered = progress.masteredConceptIds.length;
  const startId =
    progress.lastConceptId && book.concepts.some((c) => c.id === progress.lastConceptId)
      ? progress.lastConceptId
      : (featured?.id ?? book.concepts[0].id);

  return (
    <article className="enter">
      <p className="font-label text-brass">{book.generated ? "Structured locally" : "Seed catalog"}</p>
      <h1 className="mt-4 font-display text-5xl leading-tight text-ink sm:text-6xl">{book.title}</h1>
      <p className="mt-3 text-xl text-mute">
        {book.author}
        {book.year ? ` · ${book.year}` : ""}
      </p>
      <p className="mt-5 max-w-measure text-lg leading-relaxed text-mute">{book.subtitle}</p>

      {book.generated ? (
        <p className="mt-6 max-w-measure border-l-2 border-brass/50 pl-4 text-sm leading-relaxed text-mute">
          {generatorDisclaimer(book)}
        </p>
      ) : (
        <p className="mt-6 max-w-measure text-sm leading-relaxed text-faint">
          Teaching language is original to Fathom. It is not a quotation from the book.
        </p>
      )}

      <div className="mt-12">
        <DepthPicker book={book} value={depth} onChange={(d) => f.setDepth(book.id, d)} />
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => router.push(`/book/${book.id}/learn/${startId}`)}
          className="rounded-sm bg-brass px-5 py-2.5 font-sans text-sm font-medium text-paper"
        >
          {mastered > 0 ? "Continue session" : `Begin ${depthMeta(depth).label}`}
        </button>
        <p className="text-sm text-mute">
          {mastered} of {book.concepts.length} mastered · {formatMinutes(minutesForBook(book, depth))} at{" "}
          {depthMeta(depth).label}
        </p>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_20rem]">
        <section aria-labelledby="concepts-heading">
          <h2 id="concepts-heading" className="font-label text-faint">
            Concepts
          </h2>
          <ol className="mt-5 divide-y divide-rule border-y border-rule">
            {book.concepts.map((c) => {
              const done = progress.masteredConceptIds.includes(c.id);
              return (
                <li key={c.id}>
                  <Link
                    href={`/book/${book.id}/learn/${c.id}`}
                    className="flex gap-4 py-4 no-underline hover:bg-raised/60"
                  >
                    <span className="font-label w-10 shrink-0 pt-1 text-faint">{padNum(c.number)}</span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-baseline gap-3">
                        <span className="font-display text-2xl text-ink">{c.title}</span>
                        {done ? <span className="font-label text-brass">Mastered</span> : null}
                      </span>
                      <span className="mt-1 block text-mute">{c.summary}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>

        {featured ? (
          <aside className="h-fit rounded-sm border border-rule bg-raised p-6">
            <p className="font-label text-faint">Featured · next up</p>
            <h3 className="mt-3 font-display text-2xl text-ink">{featured.title}</h3>
            <p className="mt-3 leading-relaxed text-mute">{featured.scan}</p>
            <Link
              href={`/book/${book.id}/learn/${featured.id}`}
              className="mt-6 inline-block font-label text-brass no-underline"
            >
              Open concept {padNum(featured.number)}
            </Link>
          </aside>
        ) : null}
      </div>
    </article>
  );
}

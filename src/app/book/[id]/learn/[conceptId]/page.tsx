"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { EmptyState } from "@/components/EmptyState";
import { useFathom } from "@/lib/useFathom";
import { conceptText, depthMeta, padNum } from "@/lib/utils";

export default function LearnPage() {
  const { id, conceptId } = useParams<{ id: string; conceptId: string }>();
  const router = useRouter();
  const f = useFathom();
  const book = f.getBook(id);
  const progress = f.bookProgress(id);
  const depth = progress.depth;
  const meta = depthMeta(depth);
  const concept = book?.concepts.find((c) => c.id === conceptId);
  const index = book?.concepts.findIndex((c) => c.id === conceptId) ?? -1;
  const prev = index > 0 ? book?.concepts[index - 1] : undefined;
  const next = book && index >= 0 && index < book.concepts.length - 1 ? book.concepts[index + 1] : undefined;
  const mastered = concept ? f.isMastered(id, concept.id) : false;

  useEffect(() => {
    if (f.hydrated && book && concept) f.rememberConcept(book.id, concept.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [f.hydrated, book?.id, concept?.id]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "n" || e.key === "ArrowRight") {
        if (next) router.push(`/book/${id}/learn/${next.id}`);
      } else if (e.key === "p" || e.key === "ArrowLeft") {
        if (prev) router.push(`/book/${id}/learn/${prev.id}`);
      } else if (e.key === "m") {
        if (book && concept && !mastered) f.markMastered(book, concept.id, depth);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!f.hydrated) {
    return <p className="font-label pulse-soft text-faint">Preparing the concept…</p>;
  }

  if (!book || !concept) {
    return (
      <EmptyState
        kicker="Missing concept"
        title="Nothing to teach here"
        body="Return to the book and pick a concept from the list."
        href={book ? `/book/${book.id}` : "/"}
        action="Back"
      />
    );
  }

  function goNext() {
    if (next) router.push(`/book/${book!.id}/learn/${next.id}`);
    else router.push(`/book/${book!.id}`);
  }

  return (
    <article className="enter mx-auto max-w-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href={`/book/${book.id}`} className="font-label text-faint no-underline hover:text-brass">
          {book.title}
        </Link>
        <p className="font-label text-brass">
          {meta.label} · ~{meta.minutes} min
        </p>
      </div>

      <p className="mt-8 font-label text-mute">
        Concept {padNum(concept.number)} / {padNum(book.concepts.length)}
      </p>
      <div className="mt-3 h-px w-full bg-rule" aria-hidden>
        <div
          className="h-px bg-brass"
          style={{ width: `${(concept.number / book.concepts.length) * 100}%` }}
        />
      </div>

      <h1 className="mt-8 font-display text-4xl leading-tight text-ink sm:text-5xl">{concept.title}</h1>
      <p className="mt-4 text-lg text-mute">{concept.summary}</p>

      <div className="prose-fathom mt-10 text-lg leading-[1.7] text-ink">
        {conceptText(concept, depth)
          .split(/(?<=\.)\s+(?=[A-Z])/)
          .reduce<string[][]>((acc, sentence, i, arr) => {
            if (i === 0 || acc[acc.length - 1].join(" ").length > 280) acc.push([sentence]);
            else acc[acc.length - 1].push(sentence);
            void arr;
            return acc;
          }, [])
          .map((group, i) => (
            <p key={i}>{group.join(" ")}</p>
          ))}
      </div>

      {book.generated ? (
        <p className="mt-8 text-sm text-faint">
          Generated reading aid. Not a claim about the book’s real contents.
        </p>
      ) : null}

      <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-rule pt-8">
        {mastered ? (
          <button
            type="button"
            onClick={() => f.unmark(book.id, concept.id)}
            className="rounded-sm border border-rule px-4 py-2.5 font-sans text-sm text-mute"
          >
            Remove from vault
          </button>
        ) : (
          <button
            type="button"
            onClick={() => f.markMastered(book, concept.id, depth)}
            className="rounded-sm bg-brass px-5 py-2.5 font-sans text-sm font-medium text-paper"
          >
            Mark mastered
          </button>
        )}
        <button
          type="button"
          onClick={goNext}
          className="rounded-sm border border-brass/40 px-5 py-2.5 font-sans text-sm text-brass"
        >
          {next ? "Next concept" : "Return to book"}
        </button>
        {prev ? (
          <Link
            href={`/book/${book.id}/learn/${prev.id}`}
            className="font-sans text-sm text-mute no-underline hover:text-ink"
          >
            Previous
          </Link>
        ) : null}
        {mastered ? <span className="font-label text-brass">In the vault</span> : null}
      </div>
      <p className="mt-6 text-sm text-faint">Keyboard: M to master, N next, P previous.</p>
    </article>
  );
}

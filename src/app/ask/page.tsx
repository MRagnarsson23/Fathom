"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { askVault, type AskResult } from "@/lib/ask";
import { EmptyState } from "@/components/EmptyState";
import { useFathom } from "@/lib/useFathom";

const PROMPTS = [
  "How do I start a hard thing without waiting to feel ready?",
  "What should I do when other people pull me off course?",
  "How do I keep a practice after I miss a day?",
  "Where does inner freedom meet the shape of a room?",
];

export default function AskPage() {
  const { hydrated, vault, generated } = useFathom();
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<AskResult | null>(null);

  const booksInVault = useMemo(() => new Set(vault.map((v) => v.bookId)).size, [vault]);

  async function run(question: string) {
    const next = question.trim();
    if (!next) return;
    setQ(next);
    setBusy(true);
    await new Promise((r) => setTimeout(r, 420));
    setResult(askVault(next, vault, generated));
    setBusy(false);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    run(q);
  }

  if (!hydrated) {
    return <p className="font-label pulse-soft text-faint">Opening the desk…</p>;
  }

  return (
    <div className="enter mx-auto max-w-2xl">
      <p className="font-label text-brass">Only from what you have learned</p>
      <h1 className="mt-4 font-display text-5xl text-ink">Ask</h1>
      <p className="mt-4 text-lg leading-relaxed text-mute">
        Ask a question. Fathom answers from mastered concepts alone, mapping extensions, supports,
        and contradictions across books. If the vault is thin, it will say so and point at what
        would fill the gap.
      </p>

      <form onSubmit={onSubmit} className="mt-10">
        <label htmlFor="ask-q" className="font-label text-faint">
          Your question
        </label>
        <textarea
          id="ask-q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          rows={4}
          placeholder="What would you like the vault to speak to?"
          className="mt-3 w-full resize-y rounded-sm border border-rule bg-raised px-4 py-3 text-lg text-ink placeholder:text-faint"
        />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={busy || q.trim().length < 2}
            className="rounded-sm bg-brass px-5 py-2.5 font-sans text-sm font-medium text-paper disabled:opacity-40"
          >
            {busy ? "Searching the vault…" : "Ask the vault"}
          </button>
          <p className="text-sm text-faint">
            {vault.length} concept{vault.length === 1 ? "" : "s"} · {booksInVault} book
            {booksInVault === 1 ? "" : "s"}
          </p>
        </div>
      </form>

      {vault.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            kicker="Nothing to cite"
            title="The vault has no language yet"
            body="Master concepts from at least one book — better, two — then return. Fathom will refuse to guess beyond what you have kept."
            href="/book/atomic-habits"
            action="Master a concept"
          />
        </div>
      ) : (
        <ul className="mt-8 flex flex-col gap-2">
          {PROMPTS.map((p) => (
            <li key={p}>
              <button
                type="button"
                onClick={() => run(p)}
                className="text-left text-sm text-mute underline-offset-4 hover:text-brass hover:underline"
              >
                {p}
              </button>
            </li>
          ))}
        </ul>
      )}

      {result ? (
        <section className="mt-12 border-t border-rule pt-10" aria-live="polite">
          <p className="font-label text-faint">
            {result.kind === "answer" ? "From the vault" : "Gap"}
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink">{result.question}</h2>
          <p className="mt-2 text-mute">{result.summary}</p>
          <div className="prose-fathom mt-8 text-lg leading-[1.7] text-ink">
            {result.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {result.citations.length > 0 ? (
            <div className="mt-10">
              <h3 className="font-label text-faint">Citations</h3>
              <ul className="mt-4 space-y-4">
                {result.citations.map((c) => (
                  <li key={`${c.bookId}-${c.conceptId}`} className="border-l-2 border-brass/40 pl-4">
                    <Link
                      href={`/book/${c.bookId}/learn/${c.conceptId}`}
                      className="font-display text-xl text-ink no-underline hover:text-brass"
                    >
                      {c.bookTitle} · {c.conceptTitle}
                    </Link>
                    <p className="mt-1 text-sm text-mute">
                      {c.author} · Concept {c.conceptNumber} · {c.depth}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-faint">{c.excerpt}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {result.gaps.length > 0 ? (
            <div className="mt-10">
              <h3 className="font-label text-faint">Would fill the gap</h3>
              <ul className="mt-4 space-y-2">
                {result.gaps.map((g) => (
                  <li key={`${g.bookId}-${g.conceptId}`}>
                    <Link
                      href={`/book/${g.bookId}/learn/${g.conceptId}`}
                      className="text-brass no-underline hover:underline"
                    >
                      {g.conceptTitle}
                    </Link>
                    <span className="text-mute"> · {g.bookTitle}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}

"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { EmptyState } from "@/components/EmptyState";
import { useFathom } from "@/lib/useFathom";

export default function PursuitsPage() {
  const { hydrated, pursuits, vault, addPursuit, removePursuit, addMove, removeMove } = useFathom();
  const [name, setName] = useState("");
  const [active, setActive] = useState<string | null>(null);
  const [pick, setPick] = useState("");

  if (!hydrated) {
    return <p className="font-label pulse-soft text-faint">Gathering pursuits…</p>;
  }

  function onCreate(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    const p = addPursuit(name.trim());
    setName("");
    setActive(p.id);
  }

  const current = pursuits.find((p) => p.id === (active ?? pursuits[0]?.id));

  return (
    <div className="enter">
      <p className="font-label text-brass">Toward something named</p>
      <h1 className="mt-4 font-display text-5xl text-ink">Pursuits</h1>
      <p className="mt-4 max-w-measure text-lg leading-relaxed text-mute">
        Name what you are working toward. Then turn a mastered concept into a concrete move — not a
        quote, a next action.
      </p>

      <form onSubmit={onCreate} className="mt-10 flex max-w-xl flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="pursuit-name">
          Pursuit name
        </label>
        <input
          id="pursuit-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Speak with presence, get strong again, write clearly…"
          className="flex-1 rounded-sm border border-rule bg-raised px-4 py-3 text-ink placeholder:text-faint"
        />
        <button
          type="submit"
          className="rounded-sm bg-brass px-5 py-3 font-sans text-sm font-medium text-paper"
        >
          Create pursuit
        </button>
      </form>

      {pursuits.length === 0 ? (
        <div className="mt-12">
          <EmptyState
            kicker="No pursuits yet"
            title="Name the life you want the reading to serve"
            body="A pursuit is a short phrase: Speak with presence. Get strong again. Write clearly. After you master a concept, it can become a move on that list."
            href="/vault"
            action="Open the vault"
          />
        </div>
      ) : (
        <div className="mt-12 grid gap-10 lg:grid-cols-[18rem_1fr]">
          <ul className="h-fit divide-y divide-rule border-y border-rule">
            {pursuits.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => setActive(p.id)}
                  className={`w-full px-1 py-4 text-left ${
                    current?.id === p.id ? "text-brass" : "text-ink hover:text-brass"
                  }`}
                >
                  <span className="block font-display text-xl">{p.name}</span>
                  <span className="font-label text-faint">
                    {p.moves.length} move{p.moves.length === 1 ? "" : "s"}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {current ? (
            <section>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <h2 className="font-display text-4xl text-ink">{current.name}</h2>
                <button
                  type="button"
                  onClick={() => {
                    removePursuit(current.id);
                    setActive(null);
                  }}
                  className="font-label text-faint hover:text-clay"
                >
                  Delete pursuit
                </button>
              </div>

              {vault.length === 0 ? (
                <p className="mt-6 max-w-measure text-mute">
                  Master a concept first. Then it can become a move here.{" "}
                  <Link href="/book/atomic-habits" className="text-brass">
                    Start with Atomic Habits
                  </Link>
                  .
                </p>
              ) : (
                <form
                  className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const entry = vault.find((v) => `${v.bookId}::${v.conceptId}` === pick);
                    if (!entry) return;
                    addMove(current.id, entry);
                    setPick("");
                  }}
                >
                  <div className="flex-1">
                    <label htmlFor="move-from" className="font-label text-faint">
                      Draw a move from the vault
                    </label>
                    <select
                      id="move-from"
                      value={pick}
                      onChange={(e) => setPick(e.target.value)}
                      className="mt-2 w-full rounded-sm border border-rule bg-raised px-3 py-2.5 text-ink"
                    >
                      <option value="">Choose a mastered concept…</option>
                      {vault.map((v) => (
                        <option key={`${v.bookId}::${v.conceptId}`} value={`${v.bookId}::${v.conceptId}`}>
                          {v.bookTitle} — {v.conceptTitle}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={!pick}
                    className="rounded-sm border border-brass/40 px-4 py-2.5 font-sans text-sm text-brass disabled:opacity-40"
                  >
                    Add move
                  </button>
                </form>
              )}

              {current.moves.length === 0 ? (
                <p className="mt-10 text-mute">
                  No moves yet. Pick a mastered concept and Fathom will write a concrete action from
                  its teaching.
                </p>
              ) : (
                <ol className="mt-10 divide-y divide-rule border-y border-rule">
                  {current.moves.map((m, i) => (
                    <li key={m.id} className="flex gap-4 py-5">
                      <span className="font-label w-8 shrink-0 text-faint">{String(i + 1).padStart(2, "0")}</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-lg leading-relaxed text-ink">{m.text}</p>
                        <p className="mt-2 text-sm text-mute">
                          From {m.conceptTitle} · {m.bookTitle}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeMove(current.id, m.id)}
                        className="font-label shrink-0 text-faint hover:text-clay"
                        aria-label={`Remove move ${m.conceptTitle}`}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          ) : null}
        </div>
      )}
    </div>
  );
}

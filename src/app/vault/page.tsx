"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { EmptyState } from "@/components/EmptyState";
import { useFathom } from "@/lib/useFathom";
import { formatDate, padNum } from "@/lib/utils";

export default function VaultPage() {
  const { hydrated, vault, pursuits, addMove, addPursuit } = useFathom();
  const [q, setQ] = useState("");
  const [book, setBook] = useState("all");
  const [open, setOpen] = useState<string | null>(null);
  const [pursuitPick, setPursuitPick] = useState<string>("");
  const [newPursuit, setNewPursuit] = useState("");
  const [flash, setFlash] = useState<string | null>(null);

  const books = useMemo(() => {
    const map = new Map<string, string>();
    vault.forEach((v) => map.set(v.bookId, v.bookTitle));
    return Array.from(map, ([id, title]) => ({ id, title }));
  }, [vault]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return vault.filter((v) => {
      if (book !== "all" && v.bookId !== book) return false;
      if (!needle) return true;
      return `${v.conceptTitle} ${v.summary} ${v.text} ${v.bookTitle} ${v.author}`.toLowerCase().includes(needle);
    });
  }, [vault, q, book]);

  if (!hydrated) {
    return <p className="font-label pulse-soft text-faint">Opening the vault…</p>;
  }

  function attach(bookId: string, conceptId: string) {
    const entry = vault.find((v) => v.bookId === bookId && v.conceptId === conceptId);
    if (!entry) return;
    let pid = pursuitPick;
    if (!pid && newPursuit.trim()) {
      const p = addPursuit(newPursuit.trim());
      pid = p.id;
      setNewPursuit("");
    }
    if (!pid) {
      setFlash("Name a pursuit or choose one first.");
      return;
    }
    addMove(pid, entry);
    setFlash(`Saved a move to your pursuit.`);
    setOpen(null);
  }

  return (
    <div className="enter">
      <p className="font-label text-brass">Kept on purpose</p>
      <h1 className="mt-4 font-display text-5xl text-ink">Vault</h1>
      <p className="mt-4 max-w-measure text-lg leading-relaxed text-mute">
        Every concept you mark mastered lives here. Search it. Filter it. Turn a kept idea into a
        move for a pursuit.
      </p>

      {vault.length === 0 ? (
        <div className="mt-12">
          <EmptyState
            kicker="Empty vault"
            title="Nothing kept yet"
            body="Walk Atomic Habits at Study depth and mark a few concepts mastered. They will appear here, searchable, for the rest of the life of this browser."
            href="/book/atomic-habits"
            action="Open Atomic Habits"
          />
        </div>
      ) : (
        <>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="vault-search">
              Search mastered concepts
            </label>
            <input
              id="vault-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search concepts, books, language…"
              className="flex-1 rounded-sm border border-rule bg-raised px-4 py-3 text-ink placeholder:text-faint"
            />
            <label className="sr-only" htmlFor="vault-book">
              Filter by book
            </label>
            <select
              id="vault-book"
              value={book}
              onChange={(e) => setBook(e.target.value)}
              className="rounded-sm border border-rule bg-raised px-4 py-3 text-ink sm:w-56"
            >
              <option value="all">All books</option>
              {books.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.title}
                </option>
              ))}
            </select>
          </div>
          {flash ? <p className="mt-4 text-sm text-brass">{flash}</p> : null}
          <p className="mt-4 font-label text-faint">
            {filtered.length} concept{filtered.length === 1 ? "" : "s"}
          </p>
          <ul className="mt-6 divide-y divide-rule border-y border-rule">
            {filtered.map((v) => {
              const key = `${v.bookId}::${v.conceptId}`;
              const expanded = open === key;
              return (
                <li key={key} className="py-5">
                  <button
                    type="button"
                    className="w-full text-left"
                    aria-expanded={expanded}
                    onClick={() => setOpen(expanded ? null : key)}
                  >
                    <span className="font-label text-faint">
                      {v.bookTitle} · {padNum(v.conceptNumber)} · {v.depth}
                    </span>
                    <span className="mt-1 block font-display text-2xl text-ink">{v.conceptTitle}</span>
                    <span className="mt-1 block text-mute">{v.summary}</span>
                  </button>
                  {expanded ? (
                    <div className="mt-4 max-w-measure">
                      <p className="leading-relaxed text-ink">{v.text}</p>
                      <p className="mt-3 text-sm text-faint">Kept {formatDate(v.masteredAt)}</p>
                      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end">
                        <div className="flex-1">
                          <label htmlFor={`p-${key}`} className="font-label text-faint">
                            Add as a move
                          </label>
                          <select
                            id={`p-${key}`}
                            value={pursuitPick}
                            onChange={(e) => setPursuitPick(e.target.value)}
                            className="mt-2 w-full rounded-sm border border-rule bg-raised px-3 py-2 text-ink"
                          >
                            <option value="">Choose a pursuit…</option>
                            {pursuits.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex-1">
                          <label htmlFor={`np-${key}`} className="font-label text-faint">
                            Or name a new one
                          </label>
                          <input
                            id={`np-${key}`}
                            value={newPursuit}
                            onChange={(e) => setNewPursuit(e.target.value)}
                            placeholder="Speak with presence"
                            className="mt-2 w-full rounded-sm border border-rule bg-raised px-3 py-2 text-ink placeholder:text-faint"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => attach(v.bookId, v.conceptId)}
                          className="rounded-sm bg-brass px-4 py-2 font-sans text-sm text-paper"
                        >
                          Save move
                        </button>
                      </div>
                      <Link
                        href={`/book/${v.bookId}/learn/${v.conceptId}`}
                        className="mt-4 inline-block font-label text-brass no-underline"
                      >
                        Reopen concept
                      </Link>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

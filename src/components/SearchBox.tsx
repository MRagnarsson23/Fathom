"use client";

import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Book } from "@/lib/types";
import { useFathom } from "@/lib/useFathom";
import { CATALOG } from "@/lib/catalog";

export function SearchBox({ autoFocus = false }: { autoFocus?: boolean }) {
  const router = useRouter();
  const { books, structureBook, hydrated } = useFathom();
  const [q, setQ] = useState("");
  const [author, setAuthor] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = "book-typeahead";

  const matches = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const pool = hydrated ? books : CATALOG;
    if (!needle) return pool.slice(0, 6);
    return pool
      .filter((b) => `${b.title} ${b.author}`.toLowerCase().includes(needle))
      .slice(0, 8);
  }, [q, books, hydrated]);

  const exact = matches.find((b) => b.title.toLowerCase() === q.trim().toLowerCase());
  const canGenerate = q.trim().length > 1 && !exact;

  const options: { kind: "book" | "generate"; book?: Book; label: string; sub?: string }[] = [
    ...matches.map((b) => ({
      kind: "book" as const,
      book: b,
      label: b.title,
      sub: b.author,
    })),
    ...(canGenerate
      ? [
          {
            kind: "generate" as const,
            label: `Structure “${q.trim()}” into concepts`,
            sub: "A local reading map — not the book’s table of contents",
          },
        ]
      : []),
  ];

  useEffect(() => {
    setActive(0);
  }, [q]);

  function goBook(book: Book) {
    router.push(`/book/${book.id}`);
  }

  async function generate() {
    if (!q.trim() || busy) return;
    setBusy(true);
    await new Promise((r) => setTimeout(r, 720));
    const book = structureBook(q, author);
    router.push(`/book/${book.id}`);
  }

  function choose(i: number) {
    const opt = options[i];
    if (!opt) return;
    if (opt.kind === "book" && opt.book) goBook(opt.book);
    else generate();
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (options[active]) choose(active);
    else if (canGenerate) generate();
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) setOpen(true);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, Math.max(options.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="relative">
      <label htmlFor="book-search" className="font-label text-faint">
        Book title
      </label>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            id="book-search"
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={open && options[active] ? `opt-${active}` : undefined}
            placeholder="Atomic Habits, Meditations, or any title…"
            autoFocus={autoFocus}
            autoComplete="off"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 160)}
            onKeyDown={onKey}
            className="w-full rounded-sm border border-rule bg-raised px-4 py-3.5 text-lg text-ink placeholder:text-faint/80"
          />
          {open && options.length > 0 ? (
            <ul
              id={listId}
              role="listbox"
              aria-label="Matching books"
              className="absolute z-30 mt-1 max-h-80 w-full overflow-auto rounded-sm border border-rule bg-inset py-1 shadow-2xl shadow-black/40"
            >
              {options.map((opt, i) => (
                <li key={`${opt.kind}-${opt.label}`} role="none">
                  <button
                    id={`opt-${i}`}
                    type="button"
                    role="option"
                    aria-selected={i === active}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => choose(i)}
                    className={`flex w-full flex-col px-4 py-2.5 text-left ${
                      i === active ? "bg-brass/15" : "hover:bg-raised"
                    }`}
                  >
                    <span className={opt.kind === "generate" ? "text-brass" : "text-ink"}>
                      {opt.label}
                    </span>
                    {opt.sub ? <span className="text-sm text-mute">{opt.sub}</span> : null}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {canGenerate ? (
          <div className="sm:w-56">
            <label htmlFor="book-author" className="sr-only">
              Author (optional)
            </label>
            <input
              id="book-author"
              type="text"
              placeholder="Author (optional)"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full rounded-sm border border-rule bg-raised px-4 py-3.5 text-lg text-ink placeholder:text-faint/80"
            />
          </div>
        ) : null}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={busy || q.trim().length < 1}
          className="rounded-sm bg-brass px-5 py-2.5 font-sans text-sm font-medium text-paper disabled:opacity-50"
        >
          {busy ? "Listening for the load-bearing ideas…" : exact ? "Open book" : "Master this book"}
        </button>
        {busy ? (
          <span className="pulse-soft font-label text-brass" role="status">
            Structuring locally
          </span>
        ) : (
          <p className="text-sm text-faint">Type to search, or enter any title. Arrow keys to move.</p>
        )}
      </div>
    </form>
  );
}

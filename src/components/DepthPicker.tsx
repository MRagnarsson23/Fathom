"use client";

import type { Book, Depth } from "@/lib/types";
import { DEPTHS, formatMinutes, minutesForBook } from "@/lib/utils";

export function DepthPicker({
  book,
  value,
  onChange,
}: {
  book: Book;
  value: Depth;
  onChange: (d: Depth) => void;
}) {
  return (
    <fieldset>
      <legend className="font-label text-faint">Depth</legend>
      <p className="mt-2 max-w-measure text-sm leading-relaxed text-mute">
        Every depth walks the same {book.concepts.length} concepts. Depth only changes how far each
        one is taught — and therefore how many minutes it takes.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {DEPTHS.map((d) => {
          const selected = value === d.id;
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => onChange(d.id)}
              aria-pressed={selected}
              className={`rounded-sm border px-4 py-4 text-left transition-colors ${
                selected
                  ? "border-brass bg-brass/10"
                  : "border-rule bg-raised hover:border-mute/40"
              }`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-display text-xl text-ink">{d.label}</span>
                <span className="font-label text-faint">
                  {formatMinutes(minutesForBook(book, d.id))}
                </span>
              </div>
              <p className="mt-2 text-sm leading-snug text-mute">{d.blurb}</p>
              <p className="mt-3 font-label text-faint">{d.minutes} min / concept</p>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

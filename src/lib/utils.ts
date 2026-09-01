import type { Book, Concept, Depth } from "./types";

export const DEPTHS: { id: Depth; label: string; minutes: number; blurb: string }[] = [
  {
    id: "scan",
    label: "Scan",
    minutes: 3,
    blurb: "One sharp sentence. The shape of the idea.",
  },
  {
    id: "study",
    label: "Study",
    minutes: 7,
    blurb: "The working mechanism, with a concrete example.",
  },
  {
    id: "master",
    label: "Master",
    minutes: 13,
    blurb: "Nuance, edge cases, and a memorable application.",
  },
];

export function depthMeta(depth: Depth) {
  return DEPTHS.find((d) => d.id === depth)!;
}

export function minutesForBook(book: Book, depth: Depth) {
  return book.concepts.length * depthMeta(depth).minutes;
}

export function formatMinutes(total: number) {
  if (total < 60) return `~${total} min`;
  const h = Math.floor(total / 60);
  const m = total % 60;
  return m === 0 ? `~${h} hr` : `~${h} hr ${m} min`;
}

export function slugify(input: string) {
  const s = input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return s || "untitled";
}

export function hashString(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function uid(prefix = "id") {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}

export function vaultKey(bookId: string, conceptId: string) {
  return `${bookId}::${conceptId}`;
}

export function conceptText(concept: Concept, depth: Depth) {
  return concept[depth];
}

export function padNum(n: number) {
  return String(n).padStart(2, "0");
}

export function formatDate(ts: number) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(ts));
}

export function parseTitleQuery(raw: string): { title: string; author: string } {
  const trimmed = raw.trim();
  const by = trimmed.match(/^(.*?)\s+by\s+(.+)$/i);
  if (by) return { title: by[1].trim(), author: by[2].trim() };
  const em = trimmed.match(/^(.*?)\s+[—–-]\s+(.+)$/);
  if (em) return { title: em[1].trim(), author: em[2].trim() };
  return { title: trimmed, author: "" };
}

import type { Book, BookProgress, Depth, ProgressMap, Pursuit, VaultEntry } from "./types";
import { CATALOG } from "./catalog";
import { vaultKey } from "./utils";

const KEYS = {
  vault: "fathom:vault",
  pursuits: "fathom:pursuits",
  progress: "fathom:progress",
  generated: "fathom:generated",
  recent: "fathom:recent",
} as const;

function canUse() {
  return typeof window !== "undefined";
}

function read<T>(key: string, fallback: T): T {
  if (!canUse()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (!canUse()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event("fathom:storage"));
}

export function getGeneratedBooks(): Book[] {
  return read<Book[]>(KEYS.generated, []);
}

export function saveGeneratedBook(book: Book) {
  const all = getGeneratedBooks().filter((b) => b.id !== book.id);
  all.unshift(book);
  write(KEYS.generated, all.slice(0, 40));
}

export function getAllBooks(): Book[] {
  const generated = getGeneratedBooks();
  const ids = new Set(CATALOG.map((b) => b.id));
  return [...CATALOG, ...generated.filter((b) => !ids.has(b.id))];
}

export function getBook(id: string): Book | undefined {
  return getAllBooks().find((b) => b.id === id);
}

export function getProgress(): ProgressMap {
  return read<ProgressMap>(KEYS.progress, {});
}

export function getBookProgress(bookId: string): BookProgress {
  return (
    getProgress()[bookId] ?? {
      depth: "study",
      masteredConceptIds: [],
    }
  );
}

export function setBookDepth(bookId: string, depth: Depth) {
  const all = getProgress();
  const current = all[bookId] ?? { depth, masteredConceptIds: [] as string[] };
  all[bookId] = { ...current, depth };
  write(KEYS.progress, all);
}

export function setLastConcept(bookId: string, conceptId: string) {
  const all = getProgress();
  const current = all[bookId] ?? { depth: "study" as Depth, masteredConceptIds: [] as string[] };
  all[bookId] = { ...current, lastConceptId: conceptId };
  write(KEYS.progress, all);
}

export function getVault(): VaultEntry[] {
  return read<VaultEntry[]>(KEYS.vault, []).sort((a, b) => b.masteredAt - a.masteredAt);
}

export function isMastered(bookId: string, conceptId: string) {
  return getVault().some((v) => v.bookId === bookId && v.conceptId === conceptId);
}

export function masterConcept(book: Book, conceptId: string, depth: Depth): VaultEntry | null {
  const concept = book.concepts.find((c) => c.id === conceptId);
  if (!concept) return null;
  const entry: VaultEntry = {
    bookId: book.id,
    bookTitle: book.title,
    author: book.author,
    conceptId: concept.id,
    conceptTitle: concept.title,
    conceptNumber: concept.number,
    depth,
    text: concept[depth],
    summary: concept.summary,
    moveHint: concept.moveHint,
    masteredAt: Date.now(),
  };
  const vault = getVault().filter((v) => vaultKey(v.bookId, v.conceptId) !== vaultKey(book.id, conceptId));
  vault.unshift(entry);
  write(KEYS.vault, vault);

  const all = getProgress();
  const current = all[book.id] ?? { depth, masteredConceptIds: [] as string[] };
  const ids = new Set(current.masteredConceptIds);
  ids.add(conceptId);
  all[book.id] = {
    ...current,
    depth,
    masteredConceptIds: Array.from(ids),
    lastConceptId: conceptId,
  };
  write(KEYS.progress, all);
  return entry;
}

export function unmasterConcept(bookId: string, conceptId: string) {
  write(
    KEYS.vault,
    getVault().filter((v) => !(v.bookId === bookId && v.conceptId === conceptId)),
  );
  const all = getProgress();
  const current = all[bookId];
  if (current) {
    all[bookId] = {
      ...current,
      masteredConceptIds: current.masteredConceptIds.filter((id) => id !== conceptId),
    };
    write(KEYS.progress, all);
  }
}

export function getPursuits(): Pursuit[] {
  return read<Pursuit[]>(KEYS.pursuits, []).sort((a, b) => b.createdAt - a.createdAt);
}

export function savePursuits(pursuits: Pursuit[]) {
  write(KEYS.pursuits, pursuits);
}

export function getRecentIds(): string[] {
  return read<string[]>(KEYS.recent, []);
}

export function touchRecent(bookId: string) {
  const next = [bookId, ...getRecentIds().filter((id) => id !== bookId)].slice(0, 8);
  write(KEYS.recent, next);
}

export function onStorage(cb: () => void) {
  if (!canUse()) return () => {};
  const handler = () => cb();
  window.addEventListener("fathom:storage", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("fathom:storage", handler);
    window.removeEventListener("storage", handler);
  };
}

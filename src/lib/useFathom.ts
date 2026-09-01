"use client";

import { useCallback, useEffect, useState } from "react";
import type { Book, Depth, ProgressMap, Pursuit, PursuitMove, VaultEntry } from "./types";
import {
  getAllBooks,
  getBook,
  getBookProgress,
  getGeneratedBooks,
  getProgress,
  getPursuits,
  getRecentIds,
  getVault,
  masterConcept,
  onStorage,
  saveGeneratedBook,
  savePursuits,
  setBookDepth,
  setLastConcept,
  touchRecent,
  unmasterConcept,
} from "./storage";
import { generateBook } from "./generator";
import { parseTitleQuery, uid } from "./utils";

export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}

export function useFathom() {
  const hydrated = useHydrated();
  const [, bump] = useState(0);
  const refresh = useCallback(() => bump((n) => n + 1), []);

  useEffect(() => onStorage(refresh), [refresh]);

  const books = hydrated ? getAllBooks() : [];
  const vault = hydrated ? getVault() : [];
  const pursuits = hydrated ? getPursuits() : [];
  const progress = hydrated ? getProgress() : ({} as ProgressMap);
  const recent = hydrated ? getRecentIds() : [];
  const generated = hydrated ? getGeneratedBooks() : [];

  return {
    hydrated,
    books,
    vault,
    pursuits,
    progress,
    recent,
    generated,
    refresh,
    getBook: (id: string) => (hydrated ? getBook(id) : undefined),
    bookProgress: (id: string) => getBookProgress(id),
    setDepth: (bookId: string, depth: Depth) => {
      setBookDepth(bookId, depth);
      refresh();
    },
    rememberConcept: (bookId: string, conceptId: string) => {
      setLastConcept(bookId, conceptId);
      touchRecent(bookId);
      refresh();
    },
    markMastered: (book: Book, conceptId: string, depth: Depth) => {
      masterConcept(book, conceptId, depth);
      touchRecent(book.id);
      refresh();
    },
    unmark: (bookId: string, conceptId: string) => {
      unmasterConcept(bookId, conceptId);
      refresh();
    },
    isMastered: (bookId: string, conceptId: string) =>
      vault.some((v) => v.bookId === bookId && v.conceptId === conceptId),
    structureBook: (raw: string, author?: string) => {
      const parsed = parseTitleQuery(raw);
      const title = parsed.title;
      const auth = (author ?? parsed.author).trim();
      const existing = getAllBooks().find(
        (b) => b.title.toLowerCase() === title.toLowerCase() && (!auth || b.author.toLowerCase() === auth.toLowerCase()),
      );
      if (existing) {
        touchRecent(existing.id);
        refresh();
        return existing;
      }
      const book = generateBook(title, auth);
      saveGeneratedBook(book);
      touchRecent(book.id);
      refresh();
      return book;
    },
    addPursuit: (name: string) => {
      const p: Pursuit = { id: uid("p"), name: name.trim(), createdAt: Date.now(), moves: [] };
      savePursuits([p, ...getPursuits()]);
      refresh();
      return p;
    },
    removePursuit: (id: string) => {
      savePursuits(getPursuits().filter((p) => p.id !== id));
      refresh();
    },
    addMove: (pursuitId: string, entry: VaultEntry, text?: string) => {
      const move: PursuitMove = {
        id: uid("m"),
        bookId: entry.bookId,
        conceptId: entry.conceptId,
        bookTitle: entry.bookTitle,
        conceptTitle: entry.conceptTitle,
        text: (text ?? entry.moveHint).trim(),
        createdAt: Date.now(),
      };
      savePursuits(
        getPursuits().map((p) => (p.id === pursuitId ? { ...p, moves: [move, ...p.moves] } : p)),
      );
      refresh();
      return move;
    },
    removeMove: (pursuitId: string, moveId: string) => {
      savePursuits(
        getPursuits().map((p) =>
          p.id === pursuitId ? { ...p, moves: p.moves.filter((m) => m.id !== moveId) } : p,
        ),
      );
      refresh();
    },
  };
}

export type Depth = "scan" | "study" | "master";

export interface Concept {
  id: string;
  number: number;
  title: string;
  summary: string;
  scan: string;
  study: string;
  master: string;
  moveHint: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  year?: number;
  subtitle: string;
  seed: boolean;
  generated?: boolean;
  concepts: Concept[];
}

export interface VaultEntry {
  bookId: string;
  bookTitle: string;
  author: string;
  conceptId: string;
  conceptTitle: string;
  conceptNumber: number;
  depth: Depth;
  text: string;
  summary: string;
  moveHint: string;
  masteredAt: number;
}

export interface PursuitMove {
  id: string;
  bookId: string;
  conceptId: string;
  bookTitle: string;
  conceptTitle: string;
  text: string;
  createdAt: number;
}

export interface Pursuit {
  id: string;
  name: string;
  createdAt: number;
  moves: PursuitMove[];
}

export interface BookProgress {
  depth: Depth;
  masteredConceptIds: string[];
  lastConceptId?: string;
}

export type ProgressMap = Record<string, BookProgress>;

import type { Book, VaultEntry } from "./types";
import { CATALOG } from "./catalog";

const STOP = new Set(
  "a an the of to in for on and or is are was were be been being it this that those these with from as at by into than then so if but not no yes how what why when where who whom which your my our their his her its you i we they do does did can could should would will just about over after before into onto out up down more most less also very than too own same other such only because while during without within across between among per via".split(
    " ",
  ),
);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 2 && !STOP.has(w));
}

function scoreText(queryTokens: string[], text: string) {
  if (queryTokens.length === 0) return 0;
  const tokens = tokenize(text);
  if (tokens.length === 0) return 0;
  const set = new Set(tokens);
  let hits = 0;
  let weight = 0;
  for (const q of queryTokens) {
    if (set.has(q)) {
      hits += 1;
      weight += 3;
      continue;
    }
    for (const t of set) {
      if (t.startsWith(q) || q.startsWith(t)) {
        hits += 0.5;
        weight += 1;
        break;
      }
    }
  }
  return weight + hits * (hits / queryTokens.length);
}

export type Relation = "extends" | "supports" | "tensions" | "applies";

export interface Citation {
  bookTitle: string;
  author: string;
  conceptTitle: string;
  conceptNumber: number;
  bookId: string;
  conceptId: string;
  depth: string;
  excerpt: string;
}

export interface GapSuggestion {
  bookTitle: string;
  author: string;
  conceptTitle: string;
  bookId: string;
  conceptId: string;
  reason: string;
}

export interface AskResult {
  kind: "empty" | "gap" | "answer";
  question: string;
  summary: string;
  paragraphs: string[];
  citations: Citation[];
  relations: { from: Citation; to: Citation; kind: Relation; note: string }[];
  gaps: GapSuggestion[];
}

const TENSIONS: { a: string; b: string; note: string }[] = [
  {
    a: "citadel",
    b: "environment",
    note: "The inner citadel locates freedom in judgment; environment-as-hand locates behavior in the room. They can cooperate (a designed room that protects judgment) or quarrel (stoic grit used to endure a room you could have changed).",
  },
  {
    a: "control",
    b: "social-proof",
    note: "The dichotomy of control says other minds are not yours to command; social proof says other minds are often how you decide. The useful synthesis: other people are data, not masters.",
  },
  {
    a: "identity",
    b: "commitment",
    note: "Identity-before-outcome and commitment-consistency are cousins. One builds a self on purpose; the other can trap a self that was installed by a small yes. Watch which one you are in.",
  },
  {
    a: "citadel",
    b: "liking",
    note: "Liking leaks into yes. The citadel asks whether warmth is a reason. You can keep the friendship and still refuse the proposition.",
  },
  {
    a: "assent",
    b: "automaticity",
    note: "Impression-and-assent and click-whirr are the same pause wearing two traditions. Name the tape before you sign it.",
  },
  {
    a: "never-miss-twice",
    b: "present",
    note: "Repair the streak in the present tense. The recovery is a next action, not a story about the past miss.",
  },
  {
    a: "scarcity",
    b: "mortality",
    note: "Manufactured scarcity mimics mortality's urgency. One is a countdown on a landing page; the other is a fact. Proportion is the difference.",
  },
  {
    a: "reciprocity",
    b: "duty",
    note: "Reciprocity can counterfeit duty. A true role-based act does not require an unasked gift to get started.",
  },
];

function excerpt(text: string, n = 180) {
  const t = text.trim();
  if (t.length <= n) return t;
  return t.slice(0, n).replace(/\s+\S*$/, "") + "…";
}

function toCitation(v: VaultEntry): Citation {
  return {
    bookTitle: v.bookTitle,
    author: v.author,
    conceptTitle: v.conceptTitle,
    conceptNumber: v.conceptNumber,
    bookId: v.bookId,
    conceptId: v.conceptId,
    depth: v.depth,
    excerpt: excerpt(v.text),
  };
}

function findRelations(top: VaultEntry[]) {
  const rels: AskResult["relations"] = [];
  for (let i = 0; i < top.length; i++) {
    for (let j = i + 1; j < top.length; j++) {
      const A = top[i];
      const B = top[j];
      const pair = TENSIONS.find(
        (t) =>
          (t.a === A.conceptId && t.b === B.conceptId) ||
          (t.a === B.conceptId && t.b === A.conceptId),
      );
      if (pair) {
        rels.push({
          from: toCitation(A),
          to: toCitation(B),
          kind: "tensions",
          note: pair.note,
        });
        continue;
      }
      const overlap = scoreText(tokenize(A.conceptTitle + " " + A.summary), B.conceptTitle + " " + B.summary);
      if (A.bookId !== B.bookId && overlap >= 2) {
        rels.push({
          from: toCitation(A),
          to: toCitation(B),
          kind: "supports",
          note: `${A.conceptTitle} and ${B.conceptTitle} share enough language to be read as allies. Test them in the same week before you fuse them.`,
        });
      } else if (A.bookId !== B.bookId) {
        rels.push({
          from: toCitation(A),
          to: toCitation(B),
          kind: "extends",
          note: `${B.bookTitle} can extend ${A.bookTitle} if you let ${B.conceptTitle} supply a move that ${A.conceptTitle} leaves abstract.`,
        });
      }
    }
  }
  return rels.slice(0, 3);
}

function gapSuggestions(queryTokens: string[], vault: VaultEntry[], catalog: Book[]): GapSuggestion[] {
  const mastered = new Set(vault.map((v) => `${v.bookId}::${v.conceptId}`));
  const scored: (GapSuggestion & { score: number })[] = [];
  for (const book of catalog) {
    for (const c of book.concepts) {
      if (mastered.has(`${book.id}::${c.id}`)) continue;
      const s = scoreText(queryTokens, `${c.title} ${c.summary} ${c.scan} ${c.study}`);
      if (s <= 0) continue;
      scored.push({
        bookTitle: book.title,
        author: book.author,
        conceptTitle: c.title,
        bookId: book.id,
        conceptId: c.id,
        reason: `Would add ${c.title.toLowerCase()} from ${book.title}.`,
        score: s,
      });
    }
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 3).map(({ score: _s, ...rest }) => rest);
}

export function askVault(question: string, vault: VaultEntry[], extraBooks: Book[] = []): AskResult {
  const q = question.trim();
  const tokens = tokenize(q);
  const catalog = [...CATALOG, ...extraBooks];

  if (!q) {
    return {
      kind: "empty",
      question: q,
      summary: "Ask a question about something you are trying to do or understand.",
      paragraphs: [],
      citations: [],
      relations: [],
      gaps: [],
    };
  }

  if (vault.length === 0) {
    return {
      kind: "gap",
      question: q,
      summary: "Your vault is empty. Fathom will only answer from concepts you have actually marked mastered.",
      paragraphs: [
        "Walk a book first. Atomic Habits, Meditations, or Influence will give you a set of load-bearing ideas. Master even two or three, then ask again. The answer will cite only what you have learned.",
      ],
      citations: [],
      relations: [],
      gaps: gapSuggestions(tokens, vault, catalog),
    };
  }

  const ranked = vault
    .map((entry) => ({
      entry,
      score: scoreText(
        tokens,
        `${entry.conceptTitle} ${entry.summary} ${entry.text} ${entry.bookTitle} ${entry.moveHint}`,
      ),
    }))
    .sort((a, b) => b.score - a.score);

  const useful = ranked.filter((r) => r.score > 0.8).slice(0, 4);
  const gaps = gapSuggestions(tokens, vault, catalog);

  if (useful.length === 0 || ranked[0].score < 1.2) {
    const near = ranked[0]?.entry;
    const paragraphs = [
      "Your vault does not yet hold enough on this. Fathom will not invent an answer from books you have not learned.",
    ];
    if (near && ranked[0].score > 0) {
      paragraphs.push(
        `The nearest thing you have is ${near.conceptTitle} from ${near.bookTitle}, which only glancingly touches the question. Treat it as a starting thread, not an answer.`,
      );
    }
    if (gaps.length) {
      paragraphs.push(
        "To fill the gap, learn " +
          gaps.map((g) => `${g.conceptTitle} in ${g.bookTitle}`).join("; ") +
          ". Then ask again.",
      );
    }
    return {
      kind: "gap",
      question: q,
      summary: "Not enough in the vault yet.",
      paragraphs,
      citations: near && ranked[0].score > 0 ? [toCitation(near)] : [],
      relations: [],
      gaps,
    };
  }

  const top = useful.map((u) => u.entry);
  const citations = top.map(toCitation);
  const relations = findRelations(top);

  const lead = top[0];
  const paragraphs: string[] = [];
  paragraphs.push(
    `From what you have actually learned: ${lead.conceptTitle} (${lead.bookTitle}) is the strongest hold you have on this. ${excerpt(lead.text, 280)}`,
  );

  if (top[1]) {
    paragraphs.push(
      `${top[1].bookTitle} adds ${top[1].conceptTitle.toLowerCase()}. ${excerpt(top[1].text, 220)}`,
    );
  }

  if (relations.length) {
    paragraphs.push(
      relations
        .map((r) => {
          if (r.kind === "tensions") {
            return `Tension: ${r.from.conceptTitle} and ${r.to.conceptTitle}. ${r.note}`;
          }
          if (r.kind === "supports") {
            return `Support: ${r.from.conceptTitle} and ${r.to.conceptTitle}. ${r.note}`;
          }
          return `Extension: ${r.from.conceptTitle} → ${r.to.conceptTitle}. ${r.note}`;
        })
        .join(" "),
    );
  }

  paragraphs.push(
    `A concrete move from your vault: ${lead.moveHint} If the question is a pursuit, attach this move to it rather than collecting another idea.`,
  );

  if (gaps.length && useful.length < 3) {
    paragraphs.push(
      "Still thin. Learning " +
        gaps[0].conceptTitle +
        " from " +
        gaps[0].bookTitle +
        " would give the vault another angle.",
    );
  }

  return {
    kind: "answer",
    question: q,
    summary: `Answered from ${top.length} mastered concept${top.length === 1 ? "" : "s"} across ${new Set(top.map((t) => t.bookId)).size} book${new Set(top.map((t) => t.bookId)).size === 1 ? "" : "s"}.`,
    paragraphs,
    citations,
    relations,
    gaps,
  };
}

# Fathom

Fathom helps people actually keep the ideas from nonfiction books.

You name a book. Fathom resolves it into a **fixed set of load-bearing concepts**. Depth does not change which ideas you walk — only how far each one is taught, and therefore how many minutes it takes.

- **Scan** — one sharp sentence. About 3 minutes per concept.
- **Study** — the working mechanism, with a concrete example. About 7 minutes.
- **Master** — nuance, edge cases, and a memorable application. About 13 minutes.

Mastered concepts are saved to a permanent vault (in this browser). You can name a **pursuit** and turn a kept idea into a concrete move. **Ask** answers questions only from what you have actually learned, citing book and concept. If the vault is thin, Fathom says so and points at what would fill the gap.

This is a local, original product. Teaching language for seed books is written for Fathom; it is not quotation from the books.

## Seed catalog

Four well-known books, fully structured (10 concepts each, all three depths):

1. **Atomic Habits** — James Clear
2. **Meditations** — Marcus Aurelius
3. **Influence** — Robert Cialdini
4. **East of Eden** — John Steinbeck

Any other title can be structured locally into 8-12 concepts with a deterministic generator. That map is a reading aid, not the book's table of contents. Fathom says so on the page.

## How to run

Requires Node.js 18+. From the project directory:

```
cd fathom
npm install
npm run dev
```

Open http://localhost:3000

Production:

```
npm run build
npm start
```

There is no auth, no payments, and no API key. All progress, vault entries, pursuits, and generated books live in localStorage.

## Demo path

1. Home: search Atomic Habits (it is in the catalog) and open it.
2. Choose Study (about 7 min per concept). Begin the session.
3. Walk a few concepts. Press Mark mastered (or keyboard M). Use N / P or arrows to move.
4. Open Vault. Search. Expand a concept. Optionally add it as a move to a new pursuit such as Write clearly.
5. Open Pursuits. Create Get strong again. Draw a move from a mastered concept.
6. Return home. Open Meditations or Influence. Master two or three more concepts.
7. Open Ask. Try: How do I start a hard thing without waiting to feel ready? or Where does inner freedom meet the shape of a room? Read the citations.
8. Optional: type a title that is not in the catalog (for example Deep Work by Cal Newport) and structure it. Read the disclaimer. The concepts are a local map, not the book's real contents.

## Routes

- `/` Home: title search and seed catalog
- `/book/[id]` Book: depth picker, concept list, featured card
- `/book/[id]/learn/[conceptId]` Learning session: one concept at the chosen depth
- `/vault` Searchable mastered concepts
- `/pursuits` Named aims and concrete moves
- `/ask` Vault Q and A with citations

## Limitations

Unknown-book generation. Without a live model, titles not in the seed catalog are structured by a deterministic local generator (templates keyed off title and author). The same title always produces the same concept set. It is a plausible set of load-bearing questions a careful reader would bring, not a reconstruction of the book. The UI never presents it as the real table of contents.

Ask. There is no network model. Ask is client-side retrieval over mastered concept text (keyword / overlap ranking) plus a small set of known tensions between seed ideas (for example inner citadel vs environment, dichotomy of control vs social proof). If overlap is weak, Fathom reports a gap and suggests an unmastered catalog concept. It will not invent from books you have not marked mastered.

Storage. Everything is per-browser localStorage. Clearing site data clears the vault. There is no sync and no account.

## Stack

Next.js App Router, TypeScript, Tailwind CSS. No backend.

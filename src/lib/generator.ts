import type { Book, Concept } from "./types";
import { hashString, slugify } from "./utils";

/**
 * Local, deterministic generator for titles not in the seed catalog.
 * This is a structured reading aid — never a claim to the book's real contents.
 */

const ARCHETYPES: {
  title: (t: string, a: string) => string;
  summary: (t: string) => string;
  scan: (t: string, a: string) => string;
  study: (t: string, a: string) => string;
  master: (t: string, a: string) => string;
  move: (t: string) => string;
}[] = [
  {
    title: (t) => `The Central Claim of ${t}`,
    summary: (t) => `What ${t} is actually arguing, once the anecdotes are stripped.`,
    scan: (t, a) =>
      `At the load-bearing center of ${t}, ${a} is not collecting facts — they are asking you to accept one claim that would rearrange how you act.`,
    study: (t, a) =>
      `A careful reader of ${t} looks for the sentence the rest of the book is secretly defending. Mechanism: anecdotes, studies, and asides are usually servants of one wager. Find the wager and the chapters snap into a hierarchy. Example: after an hour with ${a}, write the claim in twelve words. If you need forty, you still have a tour, not a thesis. Bring those twelve words back to the next chapter and see what is evidence and what is décor.`,
    master: (t, a) =>
      `Unknown books are full of true-sounding passengers. The work with ${t} is to distinguish the claim you could disagree with from the mood the prose puts you in. Edge cases: some books have two claims, and the second quietly cancels the first; some hide the claim in a story so charming you never notice you assented. Application: write ${a}'s claim as a falsifiable sentence. Then write the strongest objection a skeptical friend would raise. Carry both through the rest of the book. Fathom generated this map from the title — it is a way to read, not a table of contents.`,
    move: (t) =>
      `Write the central claim of ${t} in twelve words, then the strongest objection, and keep both on the same card.`,
  },
  {
    title: () => "The Mechanism, Not the Motto",
    summary: () => "How the idea is supposed to work in a Tuesday afternoon, not a keynote.",
    scan: (t, a) =>
      `${t} is only useful if ${a}'s idea has moving parts you can watch — cause, delay, feedback — not a motto you can quote.`,
    study: (t, a) =>
      `A motto consoles. A mechanism predicts. When you read ${t}, ask what would have to be true in the world for ${a} to be right, and what you would observe if they were wrong. Example: if the book praises a practice, specify the first ten minutes, the friction, and the feedback that would tell you it is working. If you cannot, you have a poster, not a method.`,
    master: (t, a) =>
      `Readers of ${t} often leave with vocabulary and without a causal chain. Edge cases: some mechanisms are real but slow, and impatience will call them false; some are metaphors dressed as gears. Application: draw ${a}'s idea as three boxes and two arrows. If you need a fourth box, you may have two ideas. If you cannot draw arrows, you do not yet have a mechanism. Use this as a reading aid for ${t}, not as a claim that this is the author's outline.`,
    move: (t) =>
      `Draw the idea from ${t} as three boxes and two arrows. If you cannot, you do not yet have a mechanism.`,
  },
  {
    title: () => "The Diagnosis Beneath the Advice",
    summary: () => "What the book thinks is wrong with us, before it tells us what to do.",
    scan: (t, a) =>
      `Before ${a} offers a practice in ${t}, they offer a diagnosis: a picture of the error you are already making.`,
    study: (t, a) =>
      `Advice without diagnosis is a solution looking for a host. In ${t}, notice what ${a} thinks the default human mistake is — inattention, fear, vanity, a bad room, a bad story. Example: two readers can follow the same chapter and be treating different diseases. Name the disease the book is written against. Then ask whether that is, in fact, yours.`,
    master: (t, a) =>
      `A wrong diagnosis makes even good practices expensive. Edge cases: ${t} may diagnose a cultural problem and prescribe an individual fix, or the reverse; you can agree with the illness and refuse the medicine. Application: write one sentence, \"${a} thinks my problem is ___.\" If that sentence is false for you, harvest the stories and leave the program. This is a lens for ${t}, generated from the title, not a summary of its chapters.`,
    move: (t) =>
      `Write one sentence: this book thinks my problem is ___. Keep or reject the program on that basis.`,
  },
  {
    title: () => "The Hidden Constraint",
    summary: () => "What the idea quietly requires: time, status, health, or a particular room.",
    scan: (t, a) =>
      `Every argument in ${t} leans on a constraint ${a} may not put in bold: time, money, temperament, a quiet room, a body that sleeps.`,
    study: (t, a) =>
      `Ideas fail more often from unstated requirements than from false claims. Read ${t} with a pencil for the life the advice assumes. Example: a practice that needs an undisturbed morning is a different object for a parent of two than for a fellow with a study. Naming the constraint is not cynicism. It is how you adapt the tool instead of discarding the person.`,
    master: (t, a) =>
      `${a} is not obliged to write your life. You are obliged not to pretend you live theirs. Edge cases: some constraints are real and some are excuses; the test is whether a smaller version of the practice could still run. Application: list three things ${t} seems to require that you do not currently have. For each, either acquire a sliver of it or redesign the practice to survive without it. Fathom is guessing at the pressure points of a book it has not read.`,
    move: (t) =>
      `List three things ${t} seems to require that you lack, and redesign the practice to survive without one of them.`,
  },
  {
    title: () => "The Practice on an Ordinary Day",
    summary: () => "The smallest action that would count as living the idea this week.",
    scan: (t, a) =>
      `If ${t} cannot become a next action on an ordinary day, ${a} has given you a worldview, not a craft.`,
    study: (t, a) =>
      `Translation is the reader's job. Take the most vivid scene in ${t} and shrink it until it fits between breakfast and the first obligation. Example: if the book hymns attention, the practice might be one page with the phone in another room — not a month in the woods. The woods are a story. The page is a vote.`,
    master: (t, a) =>
      `Grandeur is the enemy of repetition. Edge cases: some ideas in ${t} really cannot shrink (a once-in-a-life decision); do not pretend those are daily habits. Others can shrink so far they become superstition. Application: write a two-minute version of ${a}'s counsel that you could do tomorrow without announcing it. Do it once before you buy anything the book implies you need. This practice is inferred from the title, not copied from a chapter.`,
    move: (t) =>
      `Write a two-minute version of the counsel in ${t} and do it once tomorrow without announcing it.`,
  },
  {
    title: () => "The Failure Mode",
    summary: () => "How a sincere reader would misuse the idea and call it fidelity.",
    scan: (t, a) =>
      `Every strong idea in ${t} has a way to go rotten: ${a}'s counsel, applied without proportion, becomes a new vice.`,
    study: (t, a) =>
      `Ask of ${t}: what would a zealot do with this? Stoic calm becomes coldness. Habit becomes rigidity. Influence becomes manipulation. Example: a reader who quotes ${a} to win an argument they could have had in plain speech is already in the failure mode. The book is not the zealot's fault. The unexamined application is.`,
    master: (t, a) =>
      `The failure mode is often the idea with the volume turned up, not a different idea. Edge cases: some books are already close to their failure mode; some fail by being ignored rather than overdone. Application: write the parody of ${t} you do not want to become. Pin it next to the claim. When your week starts to resemble the parody, turn the volume down. Fathom generated this warning from the title alone.`,
    move: (t) =>
      `Write the parody of ${t} you refuse to become, and check your week against it once.`,
  },
  {
    title: () => "The Identity the Book Offers",
    summary: () => "The kind of person the pages invite you to join.",
    scan: (t, a) =>
      `${t} is not only an argument. It is an invitation to become a certain kind of person, and ${a} is the host.`,
    study: (t, a) =>
      `Notice the we in the prose: who is included, who is faintly mocked, what counts as seriousness. Example: a book about making can make you a maker, or it can make you a person who buys tools and talks about making. The identity is downstream of the repetitions, not the merch. Ask whether you want the we ${t} is selling.`,
    master: (t, a) =>
      `Borrowed identity is efficient and expensive. Edge cases: you can take the tools and refuse the tribe; you can also need the tribe to keep the tools alive. Application: finish the sentence, \"If I let ${t} work, I become someone who ___.\" If that someone is a costume, keep the useful chapter and leave the costume. This is a reading posture for a book Fathom has not opened.`,
    move: (t) =>
      `Finish: if I let this book work, I become someone who ___. Keep the tools; refuse any costume you do not want.`,
  },
  {
    title: () => "The Room the Idea Needs",
    summary: () => "Which environment would make the book's counsel almost automatic.",
    scan: (t, a) =>
      `${a}'s counsel in ${t} will either be carried by the room you live in, or fought by it until you lose.`,
    study: (t, a) =>
      `Translate the book into furniture, software defaults, and the first object you see in the morning. Example: if ${t} is about attention, the room cannot face a feed. If it is about conversation, the table has to exist. You do not rise to ${a}'s sentences. You fall to the shape of the week.`,
    master: (t, a) =>
      `Changing the room is not a substitute for changing your mind, but it is often the only way the mind gets a fair fight. Edge cases: shared rooms, travel, illness. Application: pick one object to add and one to remove so that ${t}'s practice is the path of least resistance for seven days. Fathom is inventing a spatial reading of a title, not reporting a chapter on design.`,
    move: (t) =>
      `Add one object and remove one so that the practice in ${t} is the path of least resistance for seven days.`,
  },
  {
    title: () => "What Compounds If You Continue",
    summary: () => "The slow harvest if the idea is kept, and the slow leak if it is not.",
    scan: (t, a) =>
      `The worth of ${t} is not a weekend of enthusiasm. It is what would be true in a year if ${a}'s idea were kept poorly, and if it were kept well.`,
    study: (t, a) =>
      `Imagine two futures that differ only by a small weekly fidelity to ${t}. That difference is the book's real size. Example: a single difficult conversation, handled in the manner the book implies, is nothing. Fifty of them are a reputation, a marriage, a craft. Read for the slope, not the anecdote.`,
    master: (t, a) =>
      `Compounding cuts both ways, and ${a} may underplay the negative slope. Edge cases: some ideas plateau; some explode and then demand a different book. Application: write a one-year picture in two columns — if I keep a small version of this, if I only quote it. Put a date on a review. This generator is offering a temporal frame for ${t}, not its research.`,
    move: (t) =>
      `Write a one-year picture in two columns: if I keep a small version of ${t}, and if I only quote it.`,
  },
  {
    title: () => "Transfer: Taking the Idea Into a Life It Did Not Describe",
    summary: () => "How to carry the idea into work, love, or a pursuit the author never named.",
    scan: (t, a) =>
      `${t} was not written for your particular pursuit. Transfer is the act of carrying ${a}'s idea into a life the table of contents never named.`,
    study: (t, a) =>
      `Ask: where in my week is this idea expensive, and where is it cheap? Example: a principle about attention at a desk may also be a principle about listening at a table, or about not performing toughness when you are hurt. The book ends. The transfer is the rest of your life. Name one domain ${a} did not mention.`,
    master: (t, a) =>
      `Bad transfer is metaphor drunk: everything becomes an instance of the idea, and you become a person with a hammer. Good transfer is modest and testable. Edge cases: some ideas should not transfer (a wartime ethic into a friendship). Application: pick a pursuit you already named. Write one concrete move that would count as ${t} showing up there this week. If you cannot, you have not learned it yet — you have only enjoyed it. Fathom built this transfer prompt from the title, not from the author's index.`,
    move: (t) =>
      `Name one domain the author did not mention, and write one testable move that would count as ${t} showing up there this week.`,
  },
];

function pick<T>(seed: number, arr: T[], offset: number): T {
  return arr[(seed + offset * 17) % arr.length];
}

function authorLabel(author: string, title: string) {
  return author.trim() || `the author of ${title}`;
}

export function generateBook(title: string, author: string): Book {
  const cleanTitle = title.trim() || "Untitled";
  const cleanAuthor = author.trim();
  const seed = hashString(`${cleanTitle.toLowerCase()}|${cleanAuthor.toLowerCase()}`);
  const n = 8 + (seed % 5); // 8–12
  const a = authorLabel(cleanAuthor, cleanTitle);
  const used = new Set<number>();
  const concepts: Concept[] = [];

  for (let i = 0; i < n; i++) {
    let idx = (seed + i * 31) % ARCHETYPES.length;
    let guard = 0;
    while (used.has(idx) && guard < ARCHETYPES.length) {
      idx = (idx + 1) % ARCHETYPES.length;
      guard++;
    }
    used.add(idx);
    const arch = ARCHETYPES[idx];
    const id = slugify(arch.title(cleanTitle, a)) + "-" + (i + 1);
    concepts.push({
      id,
      number: i + 1,
      title: arch.title(cleanTitle, a),
      summary: arch.summary(cleanTitle),
      scan: arch.scan(cleanTitle, a),
      study: arch.study(cleanTitle, a),
      master: arch.master(cleanTitle, a),
      moveHint: arch.move(cleanTitle),
    });
  }

  const id = `${slugify(cleanTitle)}-${(seed % 10000).toString().padStart(4, "0")}`;

  return {
    id,
    title: cleanTitle,
    author: cleanAuthor || "Unknown",
    subtitle: "A structured reading aid — not this book's table of contents.",
    seed: false,
    generated: true,
    concepts,
  };
}

export function generatorDisclaimer(book: Book) {
  return `Fathom has not read ${book.title}. These ${book.concepts.length} ideas are a load-bearing map a careful reader could bring to the book, synthesized locally from the title${book.author && book.author !== "Unknown" ? ` and from ${book.author}` : ""}. They are not the author's chapters, claims, or wording.`;
}

export { pick };

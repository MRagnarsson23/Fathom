import type { Book } from "./types";

export const CATALOG: Book[] = [
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    year: 2018,
    subtitle: "Tiny change, identity, and the room you fall to.",
    seed: true,
    concepts: [
      {
        id: "compounding",
        number: 1,
        title: "The Compounding of Tiny Change",
        summary: "A 1% daily tilt is invisible in a week and undeniable in a year.",
        scan: "A 1% daily shift is invisible in a week and undeniable in a year; habits are interest paid on identity.",
        study:
          "Most people overestimate a burst of effort and underestimate a boring 1% tilt. The math is unsentimental: improve a little each day and the year is a different life; decay a little and the year is a different ruin. The mechanism is accumulation, not intensity. Example: ten pages after breakfast will not feel like a literary life in March. By December it is twenty books, and the person who reads is no longer theoretical. You are not waiting for a mood. You are making a slope.",
        master:
          "The trap is the plateau of latent potential — work that does not yet show. People quit in the valley between effort and evidence, then conclude the method was false. Two edge cases: a tiny change in the wrong direction also compounds (the nightly scroll that steals the morning); and not all 1% changes are equal. A 1% improvement at a bottleneck — sleep, the first hour, the cue that starts the chain — outweighs 1% on a vanity metric. Application: pick one lever at the start of a chain you care about. For thirty days, measure showing up, not outcomes. The outcome is a lagging indicator. The identity is the leading one. Do not advertise the streak until it can survive being ignored.",
        moveHint:
          "Choose one 1% action at the start of a chain you already live, and count days of showing up — not results — for thirty days.",
      },
      {
        id: "identity",
        number: 2,
        title: "Identity Before Outcome",
        summary: "Lasting habits are votes for a type of person, not a finish line.",
        scan: "Lasting habits are votes for a type of person, not a finish line you can un-become the day after you cross it.",
        study:
          "Outcome goals expire the day they are hit. Identity goals have no expiry. The mechanism is self-consistency: we protect the story we believe about ourselves. A person who is \"trying to quit\" still smokes in the story; a person who is not a smoker finds the next cigarette out of character. Example: \"I want to write a book\" can end at a file. \"I am a person who writes\" has to be fed tomorrow morning. Cast the vote small enough that you cannot talk yourself out of it.",
        master:
          "Identity without evidence is cosplay. You do not install a new self by affirmation; you cast votes with action, then let the story catch up. Edge cases: identity can become a cage (\"I am not a math person\" is also a habit of self), and outcome still matters for the world — identity is the engine, not an excuse to ignore results. Beware borrowed identities from a feed. Application: finish this sentence before you pick a system: \"I am becoming a person who ___.\" Then design the smallest daily vote that would be awkward to deny. If you would be embarrassed to skip it in front of someone you respect, it is the right size.",
        moveHint:
          "Write \"I am becoming a person who ___\" and attach one daily vote so small it would be awkward to deny.",
      },
      {
        id: "loop",
        number: 3,
        title: "The Habit Loop",
        summary: "Cue, craving, response, reward — change any beat and the loop retunes.",
        scan: "Every habit is a four-beat loop: cue, craving, response, reward. Change any beat and the loop retunes.",
        study:
          "A cue is the spark — time, place, prior action, emotion, people. Craving is the prediction of relief or pleasure, not the thing itself. Response is the behavior, gated by friction. Reward is what the brain tags as worth repeating, which updates the craving next time. The loop is amoral; it will serve reading or rumination with equal loyalty. Example: phone buzz (cue), itch not to miss out (craving), unlock (response), novelty (reward). Write one loop you want and one you do not, in four words each.",
        master:
          "You cannot reliably delete a loop by white-knuckling the response. You can starve it (remove the cue), reroute it (same cue, better response), or spoil it (make the reward unsatisfying). Edge cases: emotion-cued habits (anxiety to snack) look like lack of discipline and are misread as hunger; rewards that are too delayed never close the loop, which is why \"get fit in June\" loses to \"feel the endorphin tonight.\" Application: change a single beat this week. One beat is enough. If you cannot name all four beats of a habit you resent, you are arguing with a ghost. Name them on paper first.",
        moveHint:
          "Write one wanted loop and one unwanted loop in four beats, then change a single beat this week.",
      },
      {
        id: "obvious",
        number: 4,
        title: "Make It Obvious",
        summary: "If the cue is invisible, the habit does not exist.",
        scan: "If the cue is invisible, the habit does not exist. Design what you see, and you design what you do.",
        study:
          "Motivation is a poor cue. Environment is a reliable one. The mechanism is attention: what is in sight is in mind. Implementation intention (\"When X, I will Y\") and habit stacking (\"After I pour coffee, I write one sentence\") manufacture obvious cues on purpose. Example: a guitar on a stand in the living room is practiced; a guitar in a case in the closet is an aspiration. Place the next action where your body will trip over it.",
        master:
          "Obviousness cuts both ways. Junk cues are also obvious — the chair that faces the TV, the phone on the nightstand. Edge cases: digital cues are engineered to be more obvious than your intentions; travel and illness destroy cues, so you need a portable version (a card, a phrase, a timebox). Application: pick the habit. Place one object in the path of your morning so that not doing it would require moving the object. That object is now the cue. Do not add a second habit until the first object has been obeyed for a week.",
        moveHint:
          "Put one object in tomorrow morning's path so that skipping the habit would require moving it.",
      },
      {
        id: "attractive",
        number: 5,
        title: "Make It Attractive",
        summary: "Pair the needed with the wanted until the needed inherits the want.",
        scan: "We repeat what we anticipate will feel good. Pair the needed with the wanted until the needed inherits the want.",
        study:
          "Anticipation spikes more than the prize. Temptation bundling — only podcasts on the run, only the good tea when journaling — hijacks that spike for a habit you respect. Social attractiveness matters too: we copy the norms of the tribe we want to belong to. Example: a running club makes six in the morning feel like membership, not punishment. You are not becoming more virtuous. You are borrowing a feeling the brain already knows how to chase.",
        master:
          "Attractiveness is not ease, and it is not bribery forever. If the bundle becomes the point, the habit dies when the podcast ends. Edge cases: shame is a common, failing attempt to make the alternative unattractive; some necessary habits stay mildly unattractive, and then you lean on obvious and easy instead of pretending to love them. Application: name the habit you resist. Attach a pleasure that can only happen during it — not after, during. Protect that pairing for two weeks. If you still hate the work, shrink it rather than sweetening it further.",
        moveHint:
          "Attach one pleasure that can happen only during the resisted habit, and protect the pairing for two weeks.",
      },
      {
        id: "easy",
        number: 6,
        title: "Make It Easy",
        summary: "The habit that wins has the fewest steps to the first two minutes.",
        scan: "The habit that wins is the one with the fewest steps between you and the first two minutes.",
        study:
          "Energy, not time, is the scarce resource at the moment of choice. Reduce activation energy until the first two minutes are laughably small: put on shoes, open the document, one push-up. The two-minute rule is not the whole habit; it is a gateway that makes showing up automatic. Example: sleeping in workout clothes does more for morning training than a stirring speech at nine at night. Friction is a design choice, not a moral failing.",
        master:
          "Easy is not lazy. Once the doorway is automatic, you expand. The failure mode is staying in the two-minute version forever and calling it a system. The opposite failure is making the ideal session so large that you skip days. Edge case: some work cannot be two minutes (deep writing, a long lift). Then make the start easy and put a hard stop you respect, so restarting tomorrow stays easy. Application: write the two-minute version of your target habit. For seven days you are only allowed to do that. Expansion comes after the streak exists.",
        moveHint:
          "Write the two-minute version of the habit and, for seven days, allow yourself only that.",
      },
      {
        id: "satisfying",
        number: 7,
        title: "Make It Satisfying",
        summary: "What is rewarded is repeated; close the loop the same day.",
        scan: "What is rewarded is repeated; what is punished is postponed. Close the loop the same day.",
        study:
          "The brain learns from endings. Immediate satisfaction — a checkbox, a visible streak, a pleasant close — trains the loop faster than a distant health outcome. Habit tracking works because it is a small, instant win. Example: moving a paperclip from one jar to another after each call makes progress tactile; the quota at month-end does not. You are not a child for wanting the click. You are an animal with a nervous system.",
        master:
          "Satisfaction can be gamed poorly — junk food is satisfying. You want a reward that does not undo the habit. Edge cases: missing a day feels unsatisfying, so the rule \"never miss twice\" prevents a miss from becoming a new identity; public tracking can backfire into performance. Application: attach a two-second close to the habit, a mark on a calendar you can see from bed. Protect the chain. If you break it, restart within twenty-four hours, not next Monday. The close is part of the work, not a decoration after it.",
        moveHint:
          "Give the habit a two-second close you can see (a mark, a clip, a check) and restart within a day if the chain breaks.",
      },
      {
        id: "environment",
        number: 8,
        title: "Environment as the Invisible Hand",
        summary: "You do not rise to your goals; you fall to the shape of the room.",
        scan: "You do not rise to your goals. You fall to the shape of the room you live in.",
        study:
          "Willpower is what you use when the room is against you. Redesign the room. Increase friction for the habits you want less of and decrease it for the ones you want more of. People look like they have different personalities in different kitchens. Example: a writer whose desk faces a blank wall writes; the same writer facing a browser writes email. Geography is cheaper than grit. Move the furniture before you lecture yourself.",
        master:
          "Environment includes people, software defaults, and the city you chose. You cannot tidy your way out of a social circle that treats your goal as weird. Edge case: shared spaces — you cannot always redesign a partner's kitchen. Then use a time-environment (the six o'clock hour that is yours) or a micro-environment (a tray, a bag, a corner). Application: this Sunday, change five frictions: two additions in the path of the good habit, three removals in the path of the bad. Do not add motivation. Add geography. Then leave the sermon out of it.",
        moveHint:
          "Change five frictions this week: two that make the good habit closer, three that make the bad habit farther.",
      },
      {
        id: "stacking",
        number: 9,
        title: "Habit Stacking",
        summary: "New behavior needs an old anchor already running without debate.",
        scan: "New behavior needs an old anchor. Attach the next action to a habit that already runs without debate.",
        study:
          "\"After [current habit], I will [new habit]\" borrows the cue of something reliable. Coffee, shutting the laptop, parking the car, brushing teeth — these are already automatic. The stack should be specific in time and place, and the new action small enough that the anchor can carry it. Example: after I close the front door, I put on walking shoes. After I sit with coffee, I write three lines. The old habit is the cue you no longer have to remember.",
        master:
          "Stacks fail when the anchor is inconsistent (\"after I feel inspired\") or when the new habit is too heavy for the anchor (\"after I pour coffee, I write a chapter\"). They also fail in chains that become brittle: if one step is skipped, the rest collapse. Build short stacks, not a Rube Goldberg morning. Edge case: stacking a new habit onto a habit you are still installing doubles the failure rate. Anchor to something boring and old. Application: write three stacks using only anchors you did yesterday without thinking. Run one for a week.",
        moveHint:
          "Write one stack using an anchor you did yesterday without thinking, and run only that stack for a week.",
      },
      {
        id: "never-miss-twice",
        number: 10,
        title: "Never Miss Twice",
        summary: "A miss is an accident; two misses is the start of a different person.",
        scan: "A miss is an accident. Two misses is the start of a different person. Restart before the story changes.",
        study:
          "Perfectionism kills streaks because one broken day is treated as a verdict. The compound curve cares about the trend, not a single point. The rule is operational: if you skip, the next occurrence is non-negotiable, even in a two-minute form. Example: travel wrecks the gym; a hotel-room set of push-ups keeps the identity warm until the room is yours again. You are not pretending the miss did not happen. You are refusing to let it elect a new self.",
        master:
          "This is not an excuse to miss once on purpose. It is a repair protocol. Edge cases: illness and grief are not misses — they are the season; shrink the habit, do not perform toughness. Chronic missing means the system is too hard or the cue is gone; go back to obvious and easy rather than shaming yourself into week three. Application: pre-commit the recovery: \"If I miss, my next action is ___ at the next cue.\" Write it down. The plan to restart is part of the habit. Forgiveness without a next cue is just a nicer way to quit.",
        moveHint:
          "Write the recovery line now: if I miss, my next action is ___ at the next cue — then keep that paper where you will see it.",
      },
    ],
  },
  {
    id: "meditations",
    title: "Meditations",
    author: "Marcus Aurelius",
    year: 180,
    subtitle: "The inner citadel, the present act, and a finite day.",
    seed: true,
    concepts: [
      {
        id: "citadel",
        number: 1,
        title: "The Inner Citadel",
        summary: "There is a room weather cannot enter; live from that room.",
        scan: "There is a part of you that weather cannot enter. The work is to live from that room, not from the weather.",
        study:
          "Stoic psychology locates freedom inward: impressions arrive uninvited, but judgment is yours. The inner citadel is not numbness; it is the refusal to hand the steering to pain, praise, or panic. Example: a slight in a meeting can occupy the evening, or it can be noted as an impression of insult and left at the door. The citadel is the pause between stimulus and story. You are not asked to feel nothing. You are asked not to be governed.",
        master:
          "People confuse the citadel with repression. If you wall off feeling, you do not become free; you become brittle. The citadel judges, it does not anesthetize. Edge cases: injustice that requires action is not weather to ignore — the citadel keeps you from being owned by rage while you still act. Depression can mimic detachment; the test is whether you can still do the next duty with care. Application: when heat rises, name the impression out loud (this is anger arriving). Take one breath before you assign it meaning. That breath is the gate. Do not skip the naming. Unnamed weather moves in.",
        moveHint:
          "When heat rises, name the impression out loud and take one breath before you assign it a story.",
      },
      {
        id: "control",
        number: 2,
        title: "Dichotomy of Control",
        summary: "Judgment, aim, and effort are yours; the rest is not yours to command.",
        scan: "Some things are up to you — judgment, aim, effort — and the rest is not yours to command. Waste no peace on the rest.",
        study:
          "You can choose the quality of your action, not whether the action succeeds, is praised, or is understood. Anxiety is often a category error: trying to control the third thing. Example: you can write a clear memo; you cannot make a committee wise. Prepare the memo. Release the committee. The split is a practical tool, not a slogan. Draw it on paper when the mind starts bargaining with other people.",
        master:
          "The split is not passivity. Effort, preparation, and courage are inside the circle; outcomes, other minds, the timing of death are outside. Edge cases: people dump too much into not-up-to-me and stop trying — if it is your role, the attempt is yours. People also smuggle outcomes back in as cover for not actually trying. Application: for one worry today, draw two columns: mine / not mine. Act only on the first. Recite the second once, then return to work. Repeat the columns until they are boring. Boring is the point.",
        moveHint:
          "For one live worry, draw two columns — mine / not mine — and act only on the first today.",
      },
      {
        id: "present",
        number: 3,
        title: "Present Action",
        summary: "The only life you can live is the one in front of your hands.",
        scan: "The only life you can live is the one in front of your hands. The rest is memory and rehearsal.",
        study:
          "The present is the only theater of virtue. Past harm cannot be undone in the past; future harm has not arrived. Duty is always a present-tense verb. Example: while walking to a hard conversation, the mind runs the fight ten times. None of those fights count. The conversation will be the one you actually have. Presence here is not a wellness hobby. It is moral focus: this act, these hands, this hour.",
        master:
          "Planning is a present action; rumination is not. The test is whether the thought changes what you do next. Edge case: grief lives in the present as a fact of the body — you do not stay present by denying it; you stay present by not adding a second story. Another: you cannot be-here-now your way out of a duty that belongs later this week; put it on a list, then return. Application: pick the next twenty-five minutes. Name the one action that belongs there. When the mind leaves, escort it back to the hands. Do not escort it back to the argument.",
        moveHint:
          "Name the one action that belongs in the next twenty-five minutes, and escort the mind back to the hands when it leaves.",
      },
      {
        id: "mortality",
        number: 4,
        title: "Mortality as Whetstone",
        summary: "You will die; the fact is a whetstone for proportion, not a mood.",
        scan: "You will die, and so will the people you love. The fact is a whetstone, not a mood.",
        study:
          "Memento mori is not decor. It is a tool for proportion. Petty anger, status hunger, delay — they look different against a finite day. Used well, mortality hurries kindness and loosens grip; it does not paralyze. Example: the email you are afraid to send is not the hill. The unsaid word to a parent might be. Let the fact rank your errands. Most of them will drop a rank.",
        master:
          "Used badly, mortality becomes nihilism (nothing matters) or panic (everything must happen now). The useful version is: some things matter more, so stop spending yourself on the rest. Edge case: those already close to death or depression may need the opposite medicine — more ordinary future, not more skull. Do not prescribe this concept as a dare. Application: once a week, ask: if this were the last ordinary Tuesday, what would I still do, and what would I drop? Drop one thing. Do one thing. Leave the rest of the list alone.",
        moveHint:
          "Once this week, drop one errand that would not survive a last ordinary Tuesday, and do one thing that would.",
      },
      {
        id: "duty",
        number: 5,
        title: "Duty and the Common Good",
        summary: "You are a part of a city; excellence is usefulness to the whole.",
        scan: "You are a part of a city, not a private atom. Your excellence is measured in usefulness to the whole.",
        study:
          "Nature made humans for cooperation the way it made eyes for seeing. Justice, in this frame, is the virtue of playing your role without theatrics. Example: the unglamorous work of listening in a meeting, or keeping a promise no one would have caught you breaking, is the job. You do not need an audience for a duty to count. In fact the duties without an audience are the ones that train the rest.",
        master:
          "Duty can be twisted into self-erasure or into the claim that the office is always right. The argument is for a conscience inside a role, not for obedient machinery. Edge cases: unjust roles exist — the inner citadel still chooses, and sometimes duty is refusal. Busyness is not duty. Application: name your actual roles this month (parent, neighbor, craftsperson). For each, one act that serves the whole and is not performative. Do those before you optimize your reputation. If the act would look the same with the lights off, it is probably the right one.",
        moveHint:
          "Name one real role you hold and do one unperformative act of use for that whole today.",
      },
      {
        id: "assent",
        number: 6,
        title: "Impression and Assent",
        summary: "The world hits as impression; suffering begins when you hastily agree.",
        scan: "The world hits you as a first impression. Suffering begins when you hastily agree with a story about it.",
        study:
          "An impression is: someone spoke sharply. Assent is: I have been disrespected and must strike back. The discipline is to slow the second move. You can say it appears that without saying it is. Example: a delayed reply feels like contempt until you remember the other person's sick child. The feeling was fast; the truth was slow. Train the delay. The delay is the whole art.",
        master:
          "You will not stop impressions. Training is about which ones get your signature. Edge cases: some impressions are accurate and urgent — a fire is a fire; the practice is not universal doubt. Over-training can become dissociation. Application: for twenty-four hours, prepend I am telling myself that to one recurring judgment. See whether you still want to sign it. If you do, sign it on purpose. An owned judgment is different from a reflex.",
        moveHint:
          "For one recurring judgment today, prepend I am telling myself that before you sign it.",
      },
      {
        id: "nature",
        number: 7,
        title: "Nature and the Whole",
        summary: "You are a piece of nature, brief and belonging; events are material.",
        scan: "You are a piece of nature, brief and belonging. What happens is material, not insult.",
        study:
          "To live according to nature is to accept that you are a part, that parts perish, and that the whole continues. This is meant to shrink personal grievance. Example: rain on the harvest is not the sky being unfair to you; it is weather. Your work is the next skillful act inside the weather. The consolation is scale, not a shrug. You still plant. You just stop litigating the clouds.",
        master:
          "Cosmic consolation can sound cold to someone in pain. Use it to widen the frame, not to scold grief. Edge case: nature is not a reason to ignore human-made injustice. An empire is not the cosmos. Application: when something breaks that you cannot repair, say: This too is material. Then ask what virtue the material calls for — patience, courage, repair, or letting go. Name the virtue. Do the smallest act that expresses it. Leave the poetry for later.",
        moveHint:
          "When something breaks you cannot repair, name the virtue it calls for and do the smallest act that expresses it.",
      },
      {
        id: "obstacle",
        number: 8,
        title: "Obstacle as Material",
        summary: "What stands in the way is raw material for the next right action.",
        scan: "What stands in the way is the way. The obstacle is the raw material of the next right action.",
        study:
          "A blocked path is not a verdict on you; it is a new fact. The move is to ask what virtue this fact allows — patience in delay, courage in threat, justice in conflict. Example: a cancelled meeting is not a lost day; it is an unexpected hour. A difficult colleague is a gym for temper. You do not have to like the gym. You have to use the weight.",
        master:
          "This is not everything-happens-for-a-reason. It is everything-that-happens-can-be-used. Some obstacles are lethal or cruel; using them does not mean endorsing them. Edge case: toxic positivity dressed in old clothes. Do not tell a grieving person their loss is a gift. Application: name one current obstacle. Write the virtue it demands, and the smallest action that would express that virtue today. Do that action. Leave the slogan off the page. If you cannot name a virtue, you have not looked at the obstacle yet — only at your preference that it vanish.",
        moveHint:
          "Name one current obstacle, write the virtue it demands, and do the smallest action that would express that virtue today.",
      },
      {
        id: "above",
        number: 9,
        title: "The View from Above",
        summary: "Rise until your drama looks like a street in a century, then return to duty.",
        scan: "Rise in the mind until your drama looks like a street in a city in a century. Then return and do the next small duty.",
        study:
          "The view from above is a scale correction. Empires as ants, fame as a whisper. It does not make your work meaningless; it makes your self-importance lighter so the work can be cleaner. Example: after a humiliation, picture the room from the ceiling, the building from the hill, the city from a quiet altitude. The heat drops. You can still apologize, or not. Altitude is for proportion, not for escape.",
        master:
          "Used as escape, the view from above becomes contempt for ordinary people. The aim is humility, not loftiness. Edge case: depression already feels like nothing matters; do not add altitude, add a single concrete duty. Application: once, in a spike of status-anxiety, write your annoyance in one sentence, then write it as a historian in two hundred years would. Act from the second sentence. If the second sentence still wants an action, the action is real. If it only wants a performance, sit down.",
        moveHint:
          "In the next spike of status-anxiety, write the annoyance as a historian would, and act only from that second sentence.",
      },
      {
        id: "temper",
        number: 10,
        title: "Temper of Appetite and Anger",
        summary: "Appetite and anger are the two leaks; rule them or they rule the day.",
        scan: "Appetite and anger are the two leaks in the citadel. Rule them or they will rule the day in your name.",
        study:
          "Temperance is not joylessness. It is command of the impulses that turn a person into a passenger. Anger claims to be justice and is usually vanity in armor. Appetite claims to be need and is often just the next craving. Example: the extra drink, the cruel remark in a thread — both are minutes where you were not at the helm. The work is to notice the hand leaving the wheel while there is still time to put it back.",
        master:
          "Suppression without understanding returns as explosion. See the impulse early, name it, and choose a response you would still respect at night. Edge cases: anger at genuine wrong is information — the vice is being used by it. Body needs (food, rest, touch) are not enemies. Application: pick the leak that costs you more. For one week, insert a delay of ten breaths before you indulge it. Record what happens to the urge by breath eight. If it is still a true need, meet it on purpose. If it has thinned, you just met yourself.",
        moveHint:
          "Pick the leak that costs you more and insert ten breaths before you indulge it, once a day this week.",
      },
    ],
  },
  {
    id: "influence",
    title: "Influence",
    author: "Robert Cialdini",
    year: 1984,
    subtitle: "The shortcuts of yes, and how to keep your own mind.",
    seed: true,
    concepts: [
      {
        id: "reciprocity",
        number: 1,
        title: "Reciprocity",
        summary: "We repay what is given, even a small unasked gift.",
        scan: "We repay what is given. Even a small, unasked gift opens a door we feel rude to close.",
        study:
          "Reciprocity is a social survival rule: if I give, you owe, and the group stays glued. Compliance professionals give first — a sample, a concession, a favor — so that the request feels like repayment. The concession version: start large, retreat to the real ask; the retreat itself is a gift you now owe. Example: a free assessment that ends in a contract; a colleague who helped you move and now needs a weekend. The feeling of debt arrives faster than the evaluation of the ask.",
        master:
          "Reciprocity is not fake; it is human. The defense is to receive with thanks and still evaluate the request on its merits. Uninvited gifts do not create true debt. Edge cases: cultures differ in how long a debt lives; you can use reciprocity ethically by going first in generosity without a hidden invoice. Application: when you feel a sudden obligation after a gift, name the principle. Ask: would I say yes if this arrived with no prelude? Answer that question, not the debt. Keep the thanks. Drop the trance.",
        moveHint:
          "When a gift arrives with a request, ask whether you would say yes with no prelude — then answer that, not the debt.",
      },
      {
        id: "commitment",
        number: 2,
        title: "Commitment and Consistency",
        summary: "A small public yes becomes a self we then labor to protect.",
        scan: "Once we have taken a stand, we torture the facts to look like the kind of person who was right.",
        study:
          "A small yes — a petition, a public statement, a foot in the door — becomes a self-image that later, larger yeses must protect. Written and public commitments bind harder than private ones. Example: after telling friends you are a runner now, skipping feels like a character flaw, not a scheduling choice. Sales uses this: get the tiny agreement first. The form is not paperwork. It is a mirror you will not want to crack.",
        master:
          "Consistency is a virtue until it is a cage. The defense is to honor your past self without worshipping him. That was true for me then is a grown-up sentence. Edge cases: identity commitments can be used for good (the two-minute habit); sunk-cost is this principle wearing a finance hat. Application: before a small yes, ask what larger yes it implies. If you would not want that, do not sign the small one. If you already signed, you are allowed to update. Updating is not hypocrisy. It is remaining in contact with the facts.",
        moveHint:
          "Before the next small yes, write the larger yes it implies. Sign only if you want that larger one.",
      },
      {
        id: "social-proof",
        number: 3,
        title: "Social Proof",
        summary: "In uncertainty we look sideways and file the crowd as true.",
        scan: "In uncertainty we look sideways. If many people are doing it, the brain files it as true.",
        study:
          "Especially in ambiguity, we treat the crowd as data. Laugh tracks, bestseller labels, long lines, testimonials, and people like you are all hired crowds. The more similar the others, the stronger the pull. Example: a restaurant with a queue that was seeded by the host; a donor wall that makes the next gift feel normal. You are not weak for looking. You are saving effort. The question is whether the crowd can see better than you.",
        master:
          "Social proof is often rational — other people do know things. It fails in cascades (everyone looking at everyone) and in manufactured crowds. Edge cases: pluralistic ignorance, where everyone waits for someone else to act in an emergency; nighttime reviews and fake scarcity of testimonials. Application: when a crowd is steering you, ask two questions. Are these people real and similar? Do they have a better view than I do? If not, look at the thing, not the line. A line is a fact about other people. It is not yet a fact about the thing.",
        moveHint:
          "When a crowd steers you, ask if they are real, similar, and better placed than you — then look at the thing, not the line.",
      },
      {
        id: "authority",
        number: 4,
        title: "Authority",
        summary: "Titles and uniforms borrow the trust we meant to give to expertise.",
        scan: "Titles, uniforms, and confident jargon borrow the trust we meant to give to expertise.",
        study:
          "From childhood we are rewarded for obeying legitimate authority. The cue, however, can be counterfeited: a white coat, a diploma on a call, a calm voice. We outsource judgment to save effort. Example: a senior advisor selling a product; an actor in a coat in an ad. The shadow is ordinary people harming when a lab coat asks. Authority is a shortcut. Shortcuts can be paved to the wrong door.",
        master:
          "Real authority is a gift to the layperson — you cannot be an expert in everything. The defense is to verify the domain and the incentive. A pilot is an authority in the cockpit, not in your diet. Edge case: the anti-authoritarian reflex that rejects all expertise is not wisdom. Application: before you follow, ask: authority in what, according to whom, paid by whom? Two of those three should be clear. If none are clear, you are following a costume. Costumes are allowed in theater. They are expensive in life.",
        moveHint:
          "Before following a confident voice, answer: authority in what, according to whom, paid by whom?",
      },
      {
        id: "liking",
        number: 5,
        title: "Liking",
        summary: "We say yes to people we like, and liking is easy to manufacture.",
        scan: "We say yes to people we like — and we like those who are similar, flattering, and on our side against a common bother.",
        study:
          "Attractiveness, similarity, praise, familiarity, and cooperation all increase liking, which then leaks into compliance. Parties in living rooms, I noticed we went to the same school, and good-cop negotiation are this principle at work. Example: you take a meeting because the sender was warm, then find yourself agreeing to a scope you would have refused from a colder letter. Warmth is not evidence. It is weather in the room.",
        master:
          "Liking is not a crime; it is how friendship works. The defense is to separate the person from the proposition. You can like someone and still say no. Edge cases: negotiators who manufacture a common enemy; you can ethically earn liking by actually being useful and decent. Application: when you feel a swell of warmth during a pitch, pause and rate the offer as if it came from someone you found irritating. If it still stands, proceed. If it collapses, you were buying the warmth. Pay for coffee, not for the contract.",
        moveHint:
          "When warmth swells during a pitch, rate the offer as if it came from someone you find irritating.",
      },
      {
        id: "scarcity",
        number: 6,
        title: "Scarcity",
        summary: "What might vanish feels more valuable; we chase the loss.",
        scan: "What might vanish feels more valuable. We chase the loss, not the thing.",
        study:
          "Limited numbers, limited time, and newly restricted freedoms spike desire. Loss is louder than gain. Only two seats left and this conversation is closing are cousins. Example: a book you ignored until it went out of print; a person who became magnetic the day they left. The countdown is doing work your reasons did not volunteer for. Notice who started the clock.",
        master:
          "Scarcity is sometimes real: a genuine deadline, a dying craft. It is often theater. The defense is to ask whether you wanted it yesterday. If the want appeared with the countdown, it is the countdown you want. Edge case: delay can be costly in markets — but then the cost should be specifiable in a sentence. Application: impose a twenty-four-hour rule on scarce offers that are not true emergencies. Genuine scarcity will still be there, or it was never for you. A true emergency does not need a banner. It needs a reason.",
        moveHint:
          "On the next scarce offer that is not an emergency, wait twenty-four hours and ask if you wanted it yesterday.",
      },
      {
        id: "unity",
        number: 7,
        title: "Unity",
        summary: "Shared identity turns a request into something that feels like loyalty.",
        scan: "Shared identity — we, not just like us — turns influence into something that feels like loyalty.",
        study:
          "The self can be shared with a group: family, fandom, nation, people like us who. Requests that come from inside the we are hard to refuse without feeling like a traitor. Example: as a fellow parent, or from our community, can move a donation faster than a stranger's data. The pronoun is doing the selling. Once you hear we as a tool, you can still belong without being deputized.",
        master:
          "Unity can found solidarity and also found exclusion. The defense is to notice when we is being invoked to skip argument. Edge case: genuine mutual obligation — your actual team — is not a trick. Application: when a pitch uses we, name the group. Ask whether you would accept the same request from outside it. Loyalty is a virtue. Being deputized is not. If the request cannot survive being restated without the pronoun, it was the pronoun you were buying.",
        moveHint:
          "When a pitch uses we, name the group and ask if you would accept the same request from outside it.",
      },
      {
        id: "contrast",
        number: 8,
        title: "Contrast and Framing",
        summary: "Nothing is judged alone; what came just before sets the scale.",
        scan: "Nothing is judged alone. What came just before sets the scale, and the second thing looks cheap, reasonable, or extreme by comparison.",
        study:
          "A costly coat makes the sweater look thrifty. A moderate request after a rejected extreme request feels like relief — that is also reciprocity wearing a different coat. Three-tier pricing lives here: good, better, best, with the middle as the destination all along. Example: a consultant's proposal where the middle was the plan from the start. You thought you chose. You were walked.",
        master:
          "Contrast is how perception works, not merely a trick. You can use it to help: show the cost of inaction next to the cost of action. Defense: get a third, independent anchor — a market price, a night's sleep, a colleague with no stake. Edge case: contrast can hide quality differences that actually matter. Application: before you accept the reasonable option, write what you would have chosen if you had seen only that option. If the answer changes, the frame was doing the work. Keep the option that survives isolation.",
        moveHint:
          "Before accepting the reasonable option, write what you would choose if you had seen only that option.",
      },
      {
        id: "automaticity",
        number: 9,
        title: "Automaticity",
        summary: "We run decision tapes at speed; professionals press the buttons.",
        scan: "We run decision shortcuts at speed. Professionals press the buttons that start those tapes.",
        study:
          "The mind cannot deliberate every request. Heuristics — if expert, obey; if gift, repay; if crowd, follow — are usually adaptive and occasionally hijacked. The warning is not never use shortcuts. It is know when the tape is running without you. Example: you say yes to a late-afternoon message because it was phrased as a tiny favor. You did not decide. You completed a pattern.",
        master:
          "The ethical line: using principles to help people do what they already have reason to do, versus using them to override a person's reasons. Edge case: you will press these buttons accidentally in your own leadership. Application: install one tripwire this month — a phrase (let me look at this tomorrow) that stalls automatic yes. Use it on any request that arrived with a principle attached. The stall is not rudeness. It is how an adult keeps a mind.",
        moveHint:
          "Install one tripwire phrase this month that stalls an automatic yes until tomorrow.",
      },
      {
        id: "defense",
        number: 10,
        title: "The Defense of Clear Seeing",
        summary: "Name the principle while you still have a choice.",
        scan: "Influence is constant. The skill is not cynicism, but naming the principle while you still have a choice.",
        study:
          "Each principle has a legitimate version (true authority, real scarcity, earned liking) and a counterfeit. The practical defense is a pause plus a name. Once you can say this is social proof, the spell thins. Example: a page with a countdown, testimonials, a founder in a coat, and a gift document — four principles in one screen. Naming them is the whole move. You do not need a counter-spell. You need a noun.",
        master:
          "Do not become the person who sees manipulation in every kindness. That is another shortcut. The aim is proportion: trust more, but on purpose. Edge case: in intimate life, over-applying these labels poisons the well. Application: keep a two-column note for a week — influence I was glad of, influence I resented. The first column teaches you what to practice; the second teaches you what to refuse. Gladness is data. So is resentment. Both are how you train the pause.",
        moveHint:
          "Keep a two-column note for a week: influence you were glad of, and influence you resented.",
      },
    ],
  },
  {
    id: "east-of-eden",
    title: "East of Eden",
    author: "John Steinbeck",
    year: 1952,
    subtitle: "Thou mayest, the inherited story, and the choice after the wound.",
    seed: true,
    concepts: [
      {
        id: "timshel",
        number: 1,
        title: "Thou Mayest",
        summary: "The hinge word is permission: you may choose, not you must, and not you will.",
        scan: "The load-bearing word is permission. You may choose. Not you must, and not you will.",
        study:
          "A family can hand you a script that feels like weather: blood, a parent's favor, a reputation already in the room. The counter-claim is a small Hebrew hinge — thou mayest — which is neither commandment nor prophecy. Command says the good is an order you obey or fail. Prophecy says the path is already decided. Permission says the next act is still available, including after a wound you did not pick. Example: you can spend a decade proving you were the rejected child, or you can spend a Tuesday telling the truth and doing one decent thing the script did not budget for. The second is smaller. It is also the only one that counts as a choice.",
        master:
          "People hear thou mayest as a pep talk and miss the cost. Permission is not a mood, and it is not a guarantee that the people who wounded you will recast you. Edge cases: some inheritances are real constraints (illness, a locked door, another person's will); mayest does not mean you can have any outcome, only that you are not excused from the next right act. Another: the slogan can become a way to blame people who are drowning. Application: name one thing you have been treating as fate — a temper, a role, a family verdict. Write the version of this week that would count as choosing anyway. Do that version once, without announcing a new self. The word is a tool. It rusts if you only quote it.",
        moveHint:
          "Name one act you have been treating as fate, and do the smallest version this week that would still count as a choice.",
      },
      {
        id: "inheritance",
        number: 2,
        title: "Inheritance Is Not a Verdict",
        summary: "Blood, story, and temperament arrive uninvited; they are material, not a sentence.",
        scan: "What you inherit — face, temper, a family tale — arrives before you do. It is material. It is not a verdict.",
        study:
          "A child is born into a story already in motion: whose son, which brother, what the town thinks the bloodline is for. The mechanism is confusion of origin with ending. Origin explains a pressure; it does not finish a person. Example: a household that treats one child's gifts as proof of goodness and the other's as proof of stain will get the performances it paid for. The inherited script is cheap to run and expensive to keep. You are allowed to use the material without signing the sentence.",
        master:
          "Denying inheritance is a different trap — pretending you have no temper, no history, no face in the family album. The work is to name the material accurately and still refuse the verdict. Edge cases: some patterns are medical or legal, not merely narrative; do not therapy-talk your way out of a real constraint. Some people use inheritance as cover for a choice they are making this afternoon. Application: write two columns — what arrived without my consent, what I am still choosing. Act only on the second this week. Recite the first once so it stops impersonating destiny. If a column is empty, you have not looked yet.",
        moveHint:
          "Write two columns — arrived without consent / still mine to choose — and act only on the second this week.",
      },
      {
        id: "brothers",
        number: 3,
        title: "The Two Gifts",
        summary: "The favored and the unfavored replay; comparison is the first wound.",
        scan: "Wherever two children compete for one love, an old story restarts: a gift accepted, a gift refused, a wound that looks like character.",
        study:
          "The pattern is older than any one family. One offering is received; the other is overlooked; the overlooked person then has to decide whether to become better or to become dangerous. The mechanism is not mystery — it is scarce attention. A parent's eyes are a currency. Example: two siblings, one easy to praise, one harder to read. The easy one becomes good by being seen; the hard one becomes a problem by being unseen. You cannot fix the old offering. You can stop using comparison as a moral science.",
        master:
          "This is not a brief for spoiling everyone equally. People are not interchangeable, and love that cannot tell children apart is another kind of neglect. Edge cases: the 'rejected' role can become a career; some favored children are crushed by being the good one. Application: if you are in a two-gift story — as parent, sibling, or the one still auditioning — stop arguing about who deserved the love. Name the comparison you run. For one week, refuse to use it as evidence about anyone's soul. Measure the next act, not the ranking. Rankings are how the wound stays employed.",
        moveHint:
          "Name the comparison you run (favored / unfavored) and refuse to use it as evidence about anyone's soul this week.",
      },
      {
        id: "withheld-love",
        number: 4,
        title: "Love That Picks One Child",
        summary: "Unequal love trains hunger in one and blindness in the other.",
        scan: "A love that can only land on one child trains hunger in the other, and a dangerous innocence in the chosen.",
        study:
          "Preferential love is not a preference for a hobby; it is a climate. The chosen child learns that being seen is the same as being good. The unchosen learns that effort is a petition that may never be stamped. Both educations leak into later rooms — marriages, shops, the way a person enters a kitchen. Example: a father who lights up for one face and goes dim for the other is not hiding a secret. He is teaching a syllabus. The unchosen will spend years trying to become the face that works. That project has no graduation.",
        master:
          "You cannot retroactively equalize a childhood. You can stop impersonating the parent who withheld, including toward yourself. Edge cases: some children are genuinely easier to love in a given season (illness, temperament); the vice is making that ease into a moral ranking. Adults who were unchosen often pick partners who will reenact the dimming, because it feels like home. Application: notice whom you brighten for and whom you go dim on — a child, a colleague, a friend. For seven days, give the dimmed one one unit of unearned, specific attention. Not a speech. A look, a question, a seat. If you were the dimmed one, give that unit to yourself on paper: one thing you did that did not require an audience.",
        moveHint:
          "Give one unit of specific, unearned attention this week to someone you usually go dim on — including yourself, on paper.",
      },
      {
        id: "naming",
        number: 5,
        title: "What We Call a Person",
        summary: "Names and roles become tracks; a careless label is a future tense.",
        scan: "What you call a person — son, monster, good one, lost cause — becomes a track they then have to walk, or waste a life resisting.",
        study:
          "A name is not only a sound. It is a job description handed to a nervous system. Families name children into parts; towns name families into myths; we name ourselves into corners. The mechanism is expectancy: people become easier to see in the shape you already drew. Example: call a child the difficult one long enough and you will get difficulty on schedule, then cite the schedule as proof. Renaming is not magic. It is a refusal to keep pouring concrete.",
        master:
          "True names matter too — some labels are accurate (thief, after the theft). The work is not universal rebranding. It is refusing a label that pretends to be a soul. Edge cases: a person may need a hard name for a hard act; withholding it is sentiment. A person may also be trapped in a childhood nickname that no longer fits. Application: write the name you use in your head for someone you resent, including yourself. Replace it for a week with a name that includes one true act they could still do. Speak to that. If the old name was earned by a crime, keep the crime on the record. Drop only the forever.",
        moveHint:
          "Replace one private label (including your own) with a name that still allows a next true act, and use only that name for a week.",
      },
      {
        id: "monster",
        number: 6,
        title: "The Person We Call Irredeemable",
        summary: "Calling someone a monster can be a fact about harm, or a way to stop looking.",
        scan: "Some people do terrible things. Calling them a monster can name the harm — or it can be a way to stop looking, including at yourself.",
        study:
          "There is a temptation to put all the darkness in one body so the rest of the family can stay clean. The mechanism is convenience: a villain simplifies the ledger. Example: if one person is evil by nature, then no one else has to examine the withheld love, the lie, the profit. Sometimes the harm is real and the person is dangerous. Sometimes the word monster is how a household refuses its own part. You need both eyes. One eye for the harm. One for the alibi.",
        master:
          "This is not a brief for hugging wolves. Some people will not choose, and you are allowed to leave, lock a door, and tell the truth to a child. Edge cases: the irredeemable label, applied to yourself after a shame, becomes a permission to stop trying; applied to an enemy, it becomes a permission to stop being just. Application: pick one person you have filed as beyond the human (it may be you). Write two sentences: the harm that is true, and the choice that remains available to someone — you, a witness, a court, a distance. Do the smallest act that honors both sentences. If the only remaining choice is to get out, that is still a choice. It is not a failure of charity.",
        moveHint:
          "For one person you have filed as beyond the human, write the true harm and the choice that remains — then do the smallest act that honors both.",
      },
      {
        id: "witness",
        number: 7,
        title: "A Witness Who Sees Straight",
        summary: "One clear-seeing person can interrupt a family's trance by telling the true story.",
        scan: "A family in a trance needs one person who will not decorate the lie. Clear seeing is a form of love that does not require being blood.",
        study:
          "Trances are cheap to maintain: a myth about who is good, a silence about who was hurt, a clever servant of the story. A witness — a neighbor, a cook, a friend who can hold a word until it means what it means — breaks the trance by description, not by sermon. Example: someone who will say you are favoring one child, or that word does not mean what you hope, or that woman is not a puzzle you can marry into safety. The gift is not comfort. It is a map that matches the ground.",
        master:
          "Witnesses can be wrong, and they can enjoy their clarity too much. The test is whether their seeing leaves you more able to choose, or only more ashamed. Edge cases: a witness who is actually a gossip; a family that treats any outside eye as betrayal. Application: be the witness once this week in a room you actually inhabit — one true sentence, timed, without a speech. Or, if you are inside the trance, ask one person who is not on the payroll of your myth: what do you see that I am decorating? Write the answer down. Do not argue it into fog the same day.",
        moveHint:
          "Speak one true, unadorned sentence in a room you inhabit — or ask a person outside your myth what they see, and write it down.",
      },
      {
        id: "valley",
        number: 8,
        title: "Place as Pressure",
        summary: "Land, town, and weather are not backdrop; they press on what a person can easily become.",
        scan: "A valley is not scenery. Place presses on appetite, class, and the stories a person can afford to tell.",
        study:
          "People like to think character is portable. It is partly a local product: soil, money, who lives next door, what the town rewards. The mechanism is pressure, not fate — the same soul in a different climate would have different easy sins. Example: a dry year, a new railroad, a respectable street versus a back-room economy. None of these write a moral ending. All of them change the friction. You do not rise above geography by ignoring it. You read the pressure, then choose inside it.",
        master:
          "Geographic excuse is the failure mode: the town made me. The opposite failure is spiritual tourism — pretending you could have been good anywhere while staying in the room that makes your vice cheap. Edge cases: you cannot always leave; then you change a micro-climate (a table, a job, a friend) rather than a county. Application: name the place-pressure on your worst habit this month — the street, the feed, the kitchen, the people who laugh when you are small. Change one friction in that place. Do not write a manifesto about who you are. Move a chair, a route, a standing invitation. Geography is cheaper than a new personality.",
        moveHint:
          "Name the place that makes your worst habit cheap, and change one friction there this week — a chair, a route, an invitation.",
      },
      {
        id: "chosen",
        number: 9,
        title: "The Hunger to Be Chosen",
        summary: "The unfavored child's project is to win a love that was never equally offered.",
        scan: "The unchosen spend years trying to become the face that works. That project has no graduation. The adult work is to stop auditioning.",
        study:
          "Hunger to be chosen feels like love but behaves like a job interview that never ends. The mechanism is a hope that if the performance is finally perfect, the dim parent (or their stand-in) will light up. Example: overwork, a gift that is really a plea, cruelty aimed at the rival who got the warmth for free. None of these collect the missing vote. They collect a life spent at the door. You can want to be loved. You cannot extract a childhood from a person who will not give it.",
        master:
          "Stopping the audition is not becoming unlovable. It is moving the petition to people and work that can actually answer. Edge cases: some love is still available if you ask plainly once; martyrdom ('I need nothing') is the hunger in costume. Another: you may have children now, and their hunger is not a chance to win your old case. Application: write the audition you are still running — for whom, with what performance. Cancel one performance this week. Put the energy into a room where you are already, boringly, wanted, or into a craft that does not require a favorite. If no such room exists, build a small one: one person, one hour, no proving.",
        moveHint:
          "Name the audition you are still running and cancel one performance this week; spend that hour where you do not have to prove you are the favorite.",
      },
      {
        id: "confession",
        number: 10,
        title: "Telling the True Story",
        summary: "The first free act is often speech: what you did, what was done, what you will do next.",
        scan: "Choice begins when the true story is spoken — not the decorated one, and not the one that keeps a parent comfortable.",
        study:
          "Families run on official versions. Confession, in this sense, is not a ritual of shame. It is a report: I did this; this was done to me; here is the next act. The mechanism is that an unspoken story keeps choosing for you. Example: a son who never says the gift was refused will keep offering worse gifts. A parent who never says I favored the other one will keep favoring. Speech does not repair the past. It returns the present to a person who can still move.",
        master:
          "Confession can be a performance too — a flood of feeling that asks to be absolved without a next act. Edge cases: some truths are not owed to the person who would use them as a weapon; tell them to a witness who can hold them. Some truths are owed to a child who is still being misnamed. Application: pick one story you have been decorating. Tell the undecorated version to one safe person, or to paper if no such person exists. End with a next act in the present tense. If you cannot name a next act, you have vented, not confessed. Venting is weather. Confession is a hinge.",
        moveHint:
          "Tell one undecorated story to a safe person or to paper, and end it with a next act in the present tense.",
      },
    ],
  },
];

export function seedBooks(): Book[] {
  return CATALOG;
}

export function getSeedById(id: string): Book | undefined {
  return CATALOG.find((b) => b.id === id);
}

export function searchSeeds(query: string): Book[] {
  const q = query.trim().toLowerCase();
  if (!q) return CATALOG;
  return CATALOG.filter((b) => {
    const hay = `${b.title} ${b.author} ${b.subtitle}`.toLowerCase();
    return hay.includes(q) || q.split(/\s+/).every((w) => hay.includes(w));
  });
}

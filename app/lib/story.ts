/** Samana-feel immersive story — time metaphor 7:04 → 7:12 PM. */

export type StoryZone =
  | "hero"
  | "missed"
  | "lost"
  | "rewind"
  | "textback"
  | "quote"
  | "booked"
  | "review"
  | "ending";

export type StoryBeat = {
  id: StoryZone;
  start: number;
  end: number;
  /** Clock label shown in the mono readout */
  clock: string;
  /** Zone name under the clock */
  zone: string;
  /** Centre pill CTA label */
  pill: string;
  /** Bottom-left copy */
  word: string;
  subhead: string;
  lines: [string, string, string];
  /** Phone scene state */
  phone: "idle" | "ring" | "missed" | "lost" | "text" | "quote" | "booked" | "review";
  accent: "mint" | "orange" | "ink";
};

export const STORY: StoryBeat[] = [
  {
    id: "hero",
    start: 0,
    end: 0.1,
    clock: "7:04 PM",
    zone: "OPENING",
    pill: "Book a free 15-min call →",
    word: "Missed.",
    subhead: "Stop losing jobs to missed calls.",
    lines: [
      "Booking-first sites for Ontario trades.",
      "From $300. Free demo of your site first.",
      "Built by Adil in Southern Ontario.",
    ],
    phone: "idle",
    accent: "ink",
  },
  {
    id: "missed",
    start: 0.1,
    end: 0.22,
    clock: "7:04 PM",
    zone: "MISSED CALL",
    pill: "See the fix →",
    word: "Buzz.",
    subhead: "You're under a furnace. The phone rings in your jacket.",
    lines: [
      "One missed ring.",
      "The lead is still warm — for now.",
      "Most people won't leave a voicemail.",
    ],
    phone: "ring",
    accent: "orange",
  },
  {
    id: "lost",
    start: 0.22,
    end: 0.34,
    clock: "7:08 PM",
    zone: "LOST",
    pill: "Don't let this happen →",
    word: "Gone.",
    subhead: "No answer. No text back.",
    lines: [
      "By 7:20 they've called the next guy.",
      "They just keep scrolling.",
      "That job leaves with them.",
    ],
    phone: "lost",
    accent: "orange",
  },
  {
    id: "rewind",
    start: 0.34,
    end: 0.42,
    clock: "7:04 PM",
    zone: "REWIND",
    pill: "Watch it catch →",
    word: "Again.",
    subhead: "Same call. Same night. Uptisement is running.",
    lines: [
      "Watch the lead catch instead of fade.",
      "Text goes out from your number.",
      "You stay on the job.",
    ],
    phone: "missed",
    accent: "ink",
  },
  {
    id: "textback",
    start: 0.42,
    end: 0.54,
    clock: "7:05 PM",
    zone: "TEXT BACK",
    pill: "Book a free 15-min call →",
    word: "Caught.",
    subhead: "A text goes out within a minute.",
    lines: [
      "They reply while you're still on the job.",
      "Replies land on the phone you already use.",
      "The lead doesn't die in your jacket.",
    ],
    phone: "text",
    accent: "mint",
  },
  {
    id: "quote",
    start: 0.54,
    end: 0.66,
    clock: "7:07 PM",
    zone: "QUOTE",
    pill: "Get a free demo →",
    word: "Range.",
    subhead: "A rough written range the same night.",
    lines: [
      "They send a photo of the problem.",
      "You approve before it goes.",
      "Customers never climb — crew photos only.",
    ],
    phone: "quote",
    accent: "mint",
  },
  {
    id: "booked",
    start: 0.66,
    end: 0.78,
    clock: "7:10 PM",
    zone: "BOOKED",
    pill: "Book a free 15-min call →",
    word: "Booked.",
    subhead: "They pick 9:00 AM. It lands on your calendar.",
    lines: [
      "And on your lead board.",
      "New → Warm → Booked, no copy-paste.",
      "You never left the job.",
    ],
    phone: "booked",
    accent: "mint",
  },
  {
    id: "review",
    start: 0.78,
    end: 0.9,
    clock: "7:12 PM",
    zone: "REVIEW",
    pill: "Book a free 15-min call →",
    word: "After.",
    subhead: "Thank-you + your Google review link.",
    lines: [
      "Two hours after the visit.",
      "Same link to everyone.",
      "No review gating.",
    ],
    phone: "review",
    accent: "mint",
  },
  {
    id: "ending",
    start: 0.9,
    end: 1,
    clock: "7:12 PM",
    zone: "DONE",
    pill: "Book your free demo →",
    word: "Yours.",
    subhead: "You made it to 7:12 PM. That job's booked.",
    lines: [
      "Websites from $300.",
      "Hosting & updates $30/mo.",
      "Fixed price in writing after the call.",
    ],
    phone: "booked",
    accent: "mint",
  },
];

export function beatAt(progress: number): StoryBeat {
  const p = Math.min(1, Math.max(0, progress));
  for (let i = STORY.length - 1; i >= 0; i--) {
    if (p >= STORY[i].start) return STORY[i];
  }
  return STORY[0];
}

/** Minutes past 7:00 for a smooth clock interpolate */
export function clockFromProgress(progress: number): { h: number; m: number; label: string } {
  const beat = beatAt(progress);
  // Parse beat clock as base; blend within beat for smoothness
  const match = /^(\d+):(\d+)/.exec(beat.clock);
  const h = match ? Number(match[1]) : 19;
  const m = match ? Number(match[2]) : 4;
  return { h, m, label: beat.clock };
}

/** Homepage "7:04 PM" scroll story chapter ranges (0–1 progress). */

export type ChapterId =
  | "hero"
  | "704"
  | "without"
  | "rewind"
  | "textback"
  | "quote"
  | "booked"
  | "after"
  | "notTrade"
  | "site"
  | "proof"
  | "book";

export type Chapter = {
  id: ChapterId;
  start: number;
  end: number;
  eyebrow?: string;
  title: string;
  body: string;
  body2?: string;
  theme: "dusk" | "ink" | "paper" | "mint";
  demo?: "A1" | "A2" | "A3" | "A4" | "A5" | "A7";
};

export const CHAPTERS: Chapter[] = [
  {
    id: "hero",
    start: 0,
    end: 0.08,
    eyebrow:
      "Web design · AI automations · AI consulting · Southern Ontario · Since 2023",
    title: "Stop losing jobs to missed calls.",
    body: "Booking-first websites and simple automations for owner-run trades and local shops across Ontario. From $300. Free demo of your site first.",
    theme: "dusk",
  },
  {
    id: "704",
    start: 0.08,
    end: 0.18,
    title: "7:04 PM. You're under a furnace on a job. Your phone buzzes in your jacket.",
    body: "One missed ring. The lead is still warm — for now.",
    theme: "ink",
  },
  {
    id: "without",
    start: 0.18,
    end: 0.3,
    title: "No answer. No text back. By 7:20 they've called the next guy on Google.",
    body: "Most people won't leave a voicemail. They just keep scrolling.",
    theme: "ink",
  },
  {
    id: "rewind",
    start: 0.3,
    end: 0.34,
    title: "Same call. Same night. This time, Uptisement is running.",
    body: "Watch the lead catch instead of fade.",
    theme: "dusk",
  },
  {
    id: "textback",
    start: 0.34,
    end: 0.46,
    title: "A text goes out from your number within a minute...",
    body: "They reply. You stay on the job. The lead doesn't die in your jacket.",
    theme: "paper",
    demo: "A1",
  },
  {
    id: "quote",
    start: 0.46,
    end: 0.56,
    title:
      "They send a photo of the problem. A rough written range is ready the same night. You approve it before it goes.",
    body: "Customers never climb. Crew or existing photos only.",
    theme: "paper",
    demo: "A2",
  },
  {
    id: "booked",
    start: 0.56,
    end: 0.64,
    title:
      "They pick 9:00 AM. It lands on your calendar and your lead board. You never left the job.",
    body: "New → Warm → Booked, without copy-paste.",
    theme: "mint",
    demo: "A7",
  },
  {
    id: "after",
    start: 0.64,
    end: 0.72,
    title:
      "Two hours after the visit, they get a thank-you and your Google review link.",
    body: "Same link to everyone. No review gating.",
    theme: "paper",
    demo: "A3",
  },
  {
    id: "notTrade",
    start: 0.72,
    end: 0.78,
    title:
      "Salon, spa, clinic? Same idea: cancels get backfilled from your waitlist, and DMs get answered and booked.",
    body: "One night, many shops — the routing stays simple.",
    theme: "dusk",
    demo: "A4",
  },
  {
    id: "site",
    start: 0.78,
    end: 0.86,
    title:
      "It all starts with a site that puts Book on screen one. Websites from $300. Hosting and updates $30/mo.",
    body: "Honest labels on every piece of work.",
    theme: "paper",
  },
  {
    id: "proof",
    start: 0.86,
    end: 0.92,
    title: "In business since 2023 · Built by Adil in Southern Ontario.",
    body: "Four client notes, word for word.",
    theme: "paper",
  },
  {
    id: "book",
    start: 0.92,
    end: 1,
    title:
      "Book 15 minutes. I'll show you where calls are slipping and the one fix I'd ship first. Free demo of your site.",
    body: "No pitch deck. Fixed price in writing after the call.",
    theme: "ink",
  },
];

export function chapterAt(progress: number): Chapter {
  const p = Math.min(1, Math.max(0, progress));
  for (let i = CHAPTERS.length - 1; i >= 0; i--) {
    if (p >= CHAPTERS[i].start) return CHAPTERS[i];
  }
  return CHAPTERS[0];
}

export type WorkLabel = "Client site" | "Site offline" | "Client";

export type WorkItem = {
  title: string;
  label: WorkLabel;
  /** Remy note — verbatim from approved copy. */
  remyNote: string;
  review: {
    quote: string;
    attribution: string;
  };
  href?: string;
};

/** Work page projects — no invented deliverables, industries, or results. */
export const WORK_ITEMS: WorkItem[] = [
  {
    title: "RHR Tax",
    label: "Client site",
    href: "https://rhrtax.ca",
    remyNote:
      "I asked my boss Adil what to write here, but he’s busy helping clients. Check back soon, or just ask him on a call. — Remy",
    review: {
      quote:
        "Adil is really friendly and helpful for all kinds of problems digitally.",
      attribution: "RHR Tax",
    },
  },
  {
    title: "Chocor",
    label: "Site offline",
    remyNote:
      "The write-up for this project is still on Adil’s desk. I asked; his next client call started first. Their review is below, or you can ask him on a 15-min call. — Remy",
    review: {
      quote: "I really like how fast the development was.",
      attribution: "Chocor",
    },
  },
  {
    title: "Kuzz Kreations",
    label: "Client",
    remyNote:
      "I pinged Adil for a short story about this one, but he’s snowed under with actual client work — the good kind. Check back soon, or claim a free demo and you’ll see how we work. — Remy",
    review: {
      quote: "Such a quick response and the rates are so good.",
      attribution: "Kuzz Kreations",
    },
  },
  {
    title: "Miami Hair Spa",
    label: "Client",
    remyNote:
      "I asked Adil for a few lines on what we did here, but he’s tied up with clients this week. The review is theirs; for the details, ask him on a call. — Remy",
    review: {
      quote:
        "Been working with Adil for 3 years for all kinds of automations and development, and happy since.",
      attribution: "Miami Hair Spa",
    },
  },
];

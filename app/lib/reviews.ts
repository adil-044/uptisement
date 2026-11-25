export type Review = {
  quote: string;
  attribution: string;
};

/** Real client reviews — use verbatim (light typo fixes only). Homepage attributions match approved copy. */
export const REVIEWS: Review[] = [
  {
    quote: "I really like how fast the development was.",
    attribution: "Chocor",
  },
  {
    quote:
      "Adil is really friendly and helpful for all kinds of problems digitally.",
    attribution: "RHR Tax",
  },
  {
    quote: "Such a quick response and the rates are so good.",
    attribution: "Kuzz Kreations",
  },
  {
    quote:
      "Been working with Adil for 3 years for all kinds of automations and development, and happy since.",
    attribution: "Miami Hair Spa",
  },
];

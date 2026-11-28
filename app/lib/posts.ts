export type BlogPost = {
  slug: string;
  title: string;
  /** Visible H1 on the post page. */
  headline: string;
  description: string;
  excerpt: string;
  datePublished: string;
  dateModified: string;
  dateDisplay: string;
  author: string;
  ogImage: string;
  ogImageAlt: string;
};

export const POSTS: BlogPost[] = [
  {
    slug: "website-cost-small-business-ontario",
    title: "Small Business Website Cost in Ontario (2026) | Uptisement",
    headline:
      "How much does a website cost for a small business in Ontario? (2026)",
    description:
      "What a small business website costs in Ontario in 2026: agency, freelancer and DIY prices, hosting and domain costs, and what trades and salons need.",
    excerpt:
      "Most Ontario small businesses that hire a web design firm pay roughly $500 to $4,000 for a starter website, going by the prices Ontario firms publish themselves, plus hosting every month and a domain every year.",
    datePublished: "2026-11-28",
    dateModified: "2026-11-28",
    dateDisplay: "November 28, 2026",
    author: "Adil Khatri",
    ogImage: "/blog/og/website-cost-small-business-ontario.png",
    ogImageAlt:
      "How much does a website cost for a small business in Ontario? — Uptisement",
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((post) => post.slug === slug);
}

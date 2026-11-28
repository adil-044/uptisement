import type { Metadata } from "next";
import Link from "next/link";
import { DemoFormSection } from "@/app/components/DemoFormSection";
import { MaskedHeading } from "@/app/components/MaskedHeading";
import { Reveal } from "@/app/components/Reveal";
import { SITE_NAME, SITE_URL } from "@/app/lib/config";
import { POSTS } from "@/app/lib/posts";

const TITLE = "Blog";
const DESCRIPTION =
  "Website prices for Ontario trades, salons and small businesses: costs, guides and straight answers from Uptisement.";
const CANONICAL = "/blog/";
const OG_IMAGE = `${SITE_URL}/blog/og/website-cost-small-business-ontario.png`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${CANONICAL}`,
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESCRIPTION,
    siteName: SITE_NAME,
    locale: "en_CA",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Uptisement Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function BlogIndexPage() {
  return (
    <>
      <section className="section pb-8 pt-32 md:pt-40">
        <div className="container-x wrap max-w-3xl">
          <p className="eyebrow">Guides · Ontario</p>
          <MaskedHeading
            priority
            className="mt-4 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02]"
          >
            Blog
          </MaskedHeading>
          <p className="section-lede mt-4">
            Straight answers about websites, booking and automations for Ontario
            trades and salons.
          </p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x wrap max-w-3xl">
          <ul className="divide-y divide-[var(--color-border)]">
            {POSTS.map((post, i) => (
              <Reveal key={post.slug} stagger={i}>
                <li className="py-8 first:pt-0">
                  <p className="text-sm text-[var(--color-muted)]">
                    <time dateTime={post.datePublished}>{post.dateDisplay}</time>
                  </p>
                  <h2 className="mt-2 font-display text-2xl text-[var(--color-text)] md:text-3xl">
                    <Link
                      href={`/blog/${post.slug}/`}
                      className="transition hover:text-[var(--color-accent-text)]"
                    >
                      {post.headline}
                    </Link>
                  </h2>
                  <p className="mt-3 text-[var(--color-muted)]">{post.excerpt}</p>
                  <p className="mt-4">
                    <Link
                      href={`/blog/${post.slug}/`}
                      className="link-plain text-sm font-medium"
                    >
                      Read article →
                    </Link>
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <DemoFormSection />
    </>
  );
}

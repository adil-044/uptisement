import type { Metadata } from "next";
import Link from "next/link";
import { DemoFormSection } from "@/app/components/DemoFormSection";
import { FAQList } from "@/app/components/FAQList";
import { JsonLd } from "@/app/components/JsonLd";
import { Reveal } from "@/app/components/Reveal";
import {
  FOUNDER,
  PHONE_DISPLAY,
  PHONE_TEL,
  SITE_NAME,
  SITE_URL,
} from "@/app/lib/config";
import { getPost } from "@/app/lib/posts";

const post = getPost("website-cost-small-business-ontario")!;
const CANONICAL = `/blog/${post.slug}/`;
const CANONICAL_ABS = `${SITE_URL}${CANONICAL}`;
const OG_IMAGE_ABS = `${SITE_URL}${post.ogImage}`;

export const metadata: Metadata = {
  title: {
    absolute: post.title,
  },
  description: post.description,
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "article",
    url: CANONICAL_ABS,
    title: post.title,
    description: post.description,
    siteName: SITE_NAME,
    locale: "en_CA",
    publishedTime: post.datePublished,
    modifiedTime: post.dateModified,
    authors: [FOUNDER],
    images: [
      {
        url: OG_IMAGE_ABS,
        width: 1200,
        height: 630,
        alt: post.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: post.title,
    description: post.description,
    images: [OG_IMAGE_ABS],
  },
};

const FAQ_ITEMS = [
  {
    question:
      "How much does a basic website cost for a small business in Ontario?",
    answer:
      "Published prices from Ontario web design firms put a starter site of about 3–5 pages at roughly $500–$4,000, with larger custom sites costing more. A DIY builder has no build fee but a monthly plan. Uptisement's booking-first websites start at $300 one time.",
  },
  {
    question: "How much does a website cost per month in Canada?",
    answer:
      "Expect a domain at about $15–$30 a year plus hosting. Basic hosting often runs about $10–$30 a month, and agency hosting-and-maintenance packages commonly cost more. Uptisement hosting is $30 a month for a site of up to 5 pages, including admin access.",
  },
  {
    question: "Why is Uptisement's starting price lower than most agencies?",
    answer:
      "The scope is focused: booking-first websites for local businesses, not large custom web apps. You don't have to take our word on quality, either. You see a free, personalised demo of your site within 24 hours, before you pay anything.",
  },
  {
    question: "Do I own my website and domain?",
    answer:
      "With Uptisement, yes. You own your website and your domain. If you cancel hosting, we hand over the site files and domain access. With any provider, confirm ownership in writing before you sign.",
  },
  {
    question: "How long does it take to get a small business website?",
    answer:
      "Starter-site timelines published by the Ontario firms we looked at range from about one week to six weeks, and custom sites and stores take longer. With Uptisement, your free demo arrives within 24 hours, and after you approve it, the complete website is delivered within 24 hours, including 2 rounds of revisions.",
  },
  {
    question: "Can I cancel Uptisement hosting?",
    answer:
      "Yes. Hosting is month to month with no contract. Cancel any time with 30 days' notice by email or text. You keep your site and domain.",
  },
] as const;

const articleLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.headline,
  description: post.description,
  datePublished: post.datePublished,
  dateModified: post.dateModified,
  author: {
    "@type": "Person",
    name: FOUNDER,
    jobTitle: "Founder",
    url: `${SITE_URL}/about/`,
  },
  publisher: {
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/brand/logo-icon.png`,
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": CANONICAL_ABS,
  },
  image: OG_IMAGE_ABS,
  inLanguage: "en-CA",
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${SITE_URL}/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: `${SITE_URL}/blog/`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: post.headline,
      item: CANONICAL_ABS,
    },
  ],
};

export default function WebsiteCostOntarioPostPage() {
  return (
    <>
      <JsonLd data={articleLd} />
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbLd} />

      <article>
        <section className="section pb-8 pt-32 md:pt-40">
          <div className="container-x wrap max-w-3xl">
            <p className="eyebrow">
              <Link href="/blog/" className="link-plain">
                Blog
              </Link>
            </p>
            <h1 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.08] text-[var(--color-text)]">
              How much does a website cost for a small business in Ontario?
              (2026)
            </h1>
            <p className="mt-5 text-sm text-[var(--color-muted)]">
              By Adil Khatri, founder of Uptisement · Published{" "}
              <time dateTime="2026-11-28">November 28, 2026</time>
            </p>
          </div>
        </section>

        <section className="section pt-0">
          <div className="container-x wrap max-w-3xl blog-prose">
            <Reveal>
              <p>
                <strong>Short answer:</strong> Most Ontario small businesses that
                hire a web design firm pay roughly $500 to $4,000 for a starter
                website, going by the prices Ontario firms publish themselves,
                plus hosting every month and a domain every year. Building it
                yourself on a site builder costs less in cash
                (Squarespace&apos;s Canadian plans start at CA$21 a month billed
                yearly), but more of your time. At Uptisement, a booking-first
                website starts at $300 one time, hosting is $30 a month, and you
                see a free preview of your site before you pay anything.
              </p>
              <p>
                I run Uptisement, so I have a stake in this question. Below are
                the numbers other Ontario firms publish, what actually moves the
                price, what a trade or salon really needs from a website, and the
                monthly costs that are easy to forget. Treat every number here as
                a starting point, and check it against two or three quotes of
                your own.
              </p>
            </Reveal>

            <Reveal>
              <h2>Typical website prices in Ontario (2026)</h2>
              <p>
                Prices vary a lot because &quot;a website&quot; can mean a
                three-page site with your phone number on it or a fifty-page
                online store. Here is what published Ontario and Canadian pricing
                pages showed when I read them in November 2026. These are typical
                ranges, not quotes, and most firms list prices before HST.
                Published examples include{" "}
                <a
                  href="https://topreach.ca/website-design/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TopReach
                </a>{" "}
                at $499 for up to five pages,{" "}
                <a
                  href="https://formory.ca/pricing/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Formory
                </a>{" "}
                at $990 for up to six pages,{" "}
                <a
                  href="https://leadlls.com/web-design/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Lead Web Studio
                </a>{" "}
                at $899–$2,999, and{" "}
                <a
                  href="https://marketingflow.ca/web-design-pricing/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MarketingFlow
                </a>{" "}
                at $500–$2,999.
              </p>
              <div className="blog-table-wrap" role="region" aria-label="Typical website prices" tabIndex={0}>
                <table className="legal-table">
                  <thead>
                    <tr>
                      <th scope="col">Option</th>
                      <th scope="col">Typical one-time cost</th>
                      <th scope="col">Typical ongoing cost</th>
                      <th scope="col">Who does the work</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>DIY builder (Wix, Squarespace and similar)</td>
                      <td>No build fee</td>
                      <td>
                        Squarespace Canada: CA$21–$32/month billed yearly on its
                        Basic and Core plans (CA$30–$45 paid monthly), before tax
                      </td>
                      <td>You</td>
                    </tr>
                    <tr>
                      <td>Freelancer</td>
                      <td>
                        Varies widely. One Ontario agency puts it at about
                        $500–$3,000
                      </td>
                      <td>Varies</td>
                      <td>One person</td>
                    </tr>
                    <tr>
                      <td>Starter site from a local firm (about 3–5 pages)</td>
                      <td>Roughly $500–$4,000</td>
                      <td>Hosting, often around $20–$30/month</td>
                      <td>A small studio or agency</td>
                    </tr>
                    <tr>
                      <td>Larger custom site (about 6–12 pages)</td>
                      <td>Roughly $3,000–$10,000</td>
                      <td>Hosting, plus maintenance if you want it</td>
                      <td>An agency</td>
                    </tr>
                    <tr>
                      <td>Online store</td>
                      <td>
                        Often from about $3,500, and more for big catalogues
                      </td>
                      <td>Platform fees, apps and hosting</td>
                      <td>An agency</td>
                    </tr>
                    <tr>
                      <td>Uptisement</td>
                      <td>From $300</td>
                      <td>
                        $30/month hosting (sites up to 5 pages, plus admin
                        access)
                      </td>
                      <td>Adil, directly</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                The honest takeaway: there is no single &quot;going rate.&quot;
                Two quotes are only comparable once you know what each one
                includes and what it leaves out.
              </p>
            </Reveal>

            <Reveal>
              <h2>What actually drives the price</h2>
              <p>
                Page count matters less than most people think. These are the
                things that really move a quote:
              </p>
              <ol>
                <li>
                  <strong>What the site has to do.</strong> A site that shows
                  your services and takes enquiries is a different job from one
                  with online booking, a quote form, payments, a store or
                  connections to other software. Every feature adds build and
                  testing time.
                </li>
                <li>
                  <strong>Custom design or a proven layout.</strong> Fully custom
                  design costs more. For most local service businesses, a clean
                  layout built around booking does the job.
                </li>
                <li>
                  <strong>Who writes the words.</strong> Copywriting is one of
                  the most common things left out of a quote. If it isn&apos;t
                  included, someone still has to write it, and that someone is
                  often you.
                </li>
                <li>
                  <strong>Photos.</strong> Real photos of your work, your truck
                  or your chairs usually beat stock photos. Budget for them or
                  plan to take your own.
                </li>
                <li>
                  <strong>Revisions and waiting.</strong> Long rounds of changes
                  and waiting on content are what stretch a two-week project into
                  two months.
                </li>
                <li>
                  <strong>Who you&apos;re paying.</strong> You, a freelancer or
                  an agency with a team and an office all have different costs
                  built into the price.
                </li>
              </ol>
            </Reveal>

            <Reveal>
              <h2>DIY vs freelancer vs agency vs Uptisement</h2>
              <p>
                <strong>DIY builder.</strong> The lowest cash cost. You pick a
                template, write the copy, set up booking tools yourself and keep
                it updated. It&apos;s a good fit if you enjoy building things
                and have the evenings for it. The real cost is your time.
              </p>
              <p>
                <strong>Freelancer.</strong> Quality and price vary more here
                than anywhere else. A good freelancer can be great value. Before
                you hire, ask to see live sites they built a while ago, confirm
                you&apos;ll own the domain and the site, and ask who fixes things
                after launch.
              </p>
              <p>
                <strong>Agency.</strong> You get a team and a bigger scope:
                strategy, copywriting, custom design and integrations. Expect a
                larger project fee, a timeline of weeks or more, and sometimes a
                monthly retainer. It makes sense for bigger or more complex
                projects.
              </p>
              <p>
                <strong>Uptisement.</strong> We build one kind of site:
                booking-first websites for trades, salons and local businesses in
                Ontario. Here&apos;s how it works, as listed on our{" "}
                <Link href="/pricing/">pricing page</Link>:
              </p>
              <ul>
                <li>
                  <strong>Free demo first.</strong> Fill in a short form and you
                  get a personalised preview of your website within 24 hours. No
                  card and no contract.
                </li>
                <li>
                  <strong>From $300, one time.</strong> After you approve the
                  demo, a complete website is delivered within 24 hours,
                  including 2 rounds of revisions.
                </li>
                <li>
                  <strong>$30 a month for hosting.</strong> That covers a website
                  of up to 5 pages, plus admin access so you can log in and
                  manage the site yourself. We host online stores too; ask about
                  them on a 15-minute call.
                </li>
                <li>
                  <strong>You own your website and your domain.</strong>
                </li>
              </ul>
              <p>
                We&apos;re not the right fit for everyone. If you need a large
                custom web app or a big in-house team, a larger agency is a
                better match. If you want to design the site yourself, a DIY
                builder is.
              </p>
            </Reveal>

            <Reveal>
              <h2>What trades and salons actually need</h2>
              <p>
                A plumber, an HVAC company, a hair salon and a barbershop
                don&apos;t need a 30-page website. They need a site that turns
                someone on a phone into a booked job or appointment. That usually
                means:
              </p>
              <ul>
                <li>
                  <strong>Click-to-call.</strong> Your phone number at the top of
                  every page, tappable on a phone.
                </li>
                <li>
                  <strong>
                    Online booking or a request form that works after hours.
                  </strong>{" "}
                  A homeowner looking you up at 7 p.m., or a client wanting a cut
                  at 9 p.m., shouldn&apos;t have to wait until you open. If you
                  already use a booking tool, the site should send people
                  straight to it.
                </li>
                <li>
                  <strong>Speed on a phone.</strong> A slow or awkward mobile
                  site loses people before they ever call.
                </li>
                <li>
                  <strong>A link to your Google Business Profile.</strong> Link
                  your website and your Google Business Profile to each other,
                  and keep your business name, phone number and address the same
                  on both. That&apos;s also where your reviews live.
                </li>
                <li>
                  <strong>Your services and the towns you serve,</strong> in
                  plain words, so customers (and search engines) know exactly
                  what you do and where.
                </li>
                <li>
                  <strong>Optional automations, later.</strong> Missed-call
                  text-back, instant quote ranges you approve before they go out,
                  review requests and booking reminders. At Uptisement these are
                  priced on a 15-minute call, and you can start with one.
                </li>
              </ul>
              <p>
                See what this looks like for <Link href="/trades/">trades</Link>{" "}
                and for{" "}
                <Link href="/salons/">salons, spas and barbers</Link>.
              </p>
            </Reveal>

            <Reveal>
              <h2>Ongoing costs: domain, hosting and maintenance</h2>
              <p>
                The build price is the number everyone compares. The recurring
                costs are what you keep paying. Typical figures from Ontario
                firms&apos; published pages:
              </p>
              <ul>
                <li>
                  <strong>Domain:</strong> about $15–$30 a year for a .ca or
                  .com. Make sure it&apos;s registered in your name.
                </li>
                <li>
                  <strong>Hosting:</strong> roughly $10–$30 a month for basic
                  hosting. Managed &quot;hosting and maintenance&quot; packages
                  from agencies often run more, around $70–$200 a month.
                </li>
                <li>
                  <strong>SSL certificate (the padlock):</strong> this should be
                  free with any decent host in 2026.
                </li>
                <li>
                  <strong>Maintenance and edits:</strong> optional. Some firms
                  charge a monthly care plan, others bill by the hour. Ask which
                  before you sign.
                </li>
                <li>
                  <strong>Site-builder plans:</strong> if you go DIY, the monthly
                  plan is your hosting.
                </li>
              </ul>
              <p>
                <strong>Uptisement hosting</strong> is $30 a month for a website
                of up to 5 pages, with admin access. It&apos;s month to month
                with no contract. You can cancel any time with 30 days&apos;
                notice by email or text, and because you own your site and
                domain, we hand over the site files and domain access when you
                leave. There are no partial-month refunds: hosting runs to the
                end of the paid month, then stops. Full details are on the{" "}
                <Link href="/pricing/">pricing page</Link>.
              </p>
              <p>
                As a simple first-year example at Uptisement: a $300 website plus
                12 months of hosting at $30 comes to $660, before any add-ons.
                Ask about your domain on the call.
              </p>
            </Reveal>

            <Reveal>
              <h2>How to compare quotes without getting burned</h2>
              <p>Ask every web designer the same five questions:</p>
              <ol>
                <li>
                  What&apos;s excluded? (Copywriting, photos, booking setup and
                  edits after launch are common gaps.)
                </li>
                <li>
                  What does it cost every month after launch, and what does that
                  cover?
                </li>
                <li>Who owns the website and the domain?</li>
                <li>
                  What happens if I cancel? Do I get my files and domain?
                </li>
                <li>Can I see something before I pay?</li>
              </ol>
              <p>
                A quote that answers all five clearly is usually an honest one,
                whatever the price.
              </p>
            </Reveal>

            <Reveal>
              <h2>FAQ</h2>
              <div className="mt-2">
                <FAQList
                  items={FAQ_ITEMS.map((item) => ({
                    question: item.question,
                    answer: item.answer,
                  }))}
                />
              </div>
            </Reveal>

            <Reveal>
              <h2>See your site before you pay</h2>
              <p>
                If you run a trade, salon, spa or barbershop in Ontario, the
                easiest way to find out what your website would cost, and whether
                you like it, is to see it.{" "}
                <Link href="/#claim-demo">Claim a free demo</Link> and get a
                personalised preview within 24 hours, or call{" "}
                <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>. Full prices are
                on the <Link href="/pricing/">pricing page</Link>.
              </p>
            </Reveal>
          </div>
        </section>
      </article>

      <DemoFormSection />
    </>
  );
}

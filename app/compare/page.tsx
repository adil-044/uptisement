import type { Metadata } from "next";
import {
  CompareMatrix,
  type CompareRow,
} from "@/app/components/CompareMatrix";
import { DemoFormSection } from "@/app/components/DemoFormSection";
import { MaskedHeading } from "@/app/components/MaskedHeading";
import { Reveal } from "@/app/components/Reveal";
import { SpotlightCard } from "@/app/components/SpotlightCard";

export const metadata: Metadata = {
  title: {
    absolute: "Compare Uptisement | DIY, agencies and freelancers",
  },
  description:
    "See how Uptisement compares with building it yourself, hiring a big agency, or working with a freelancer. Free demo first. Websites from $300.",
  alternates: { canonical: "/compare/" },
};

const ROWS: CompareRow[] = [
  {
    criterion: "Price",
    group: "cost",
    uptisement:
      "Free demo. Websites from $300, one time. Hosting $30/month. Automations and consulting priced on a 15-min call.",
    diy: "You pay the platform. Plans and add-ons vary.",
    agency:
      "Typically a much larger project fee, sometimes plus a monthly retainer. Varies.",
    freelancer: "Varies widely.",
  },
  {
    criterion: "Time to launch",
    group: "time",
    uptisement:
      "A free demo within 24 hours. After you approve it, a complete website is delivered within 24 hours, including 2 rounds of revisions.",
    diy: "You build it yourself. It takes as long as you spend on it.",
    agency: "Varies, often weeks or more.",
    freelancer: "Varies.",
  },
  {
    criterion: "Free demo first",
    group: "time",
    uptisement:
      "Yes. A personalised preview of your site, free, within 24 hours.",
    diy: "No. You set it up yourself.",
    agency:
      "Uncommon. You usually get a proposal or a discovery call, not a preview of your site.",
    freelancer: "Uncommon. Varies.",
  },
  {
    criterion: "Built for booking",
    group: "ownership",
    uptisement: "Yes. Sites are built around getting customers to book.",
    diy: "Possible, if you set up booking tools yourself.",
    agency: "Varies.",
    freelancer: "Varies.",
  },
  {
    criterion: "Automations available",
    group: "ownership",
    uptisement:
      "Yes. Missed-call text-back, instant quotes, review requests and booking reminders, priced on a 15-min call.",
    diy: "You add them yourself, or buy platform add-ons.",
    agency: "Varies. Sometimes part of a larger package.",
    freelancer: "Varies.",
  },
  {
    criterion: "Who does the work",
    group: "ownership",
    uptisement: "Uptisement builds it for you. You work directly with Adil.",
    diy: "You build it yourself.",
    agency: "A team.",
    freelancer: "One freelancer.",
  },
  {
    criterion: "Support",
    group: "other",
    uptisement: "You work directly with Adil.",
    diy: "Platform help articles and platform support, not someone who already knows your business.",
    agency: "Varies. Often tied to a retainer.",
    freelancer: "Varies. Often winds down when the project ends.",
  },
];

const NOT_FIT = [
  "If you enjoy building and want to design the site yourself, a DIY builder is a better match.",
  "If you need a large custom web app, a national brand campaign, or a big in-house team around you, a larger agency is a better match.",
  "If you already have a freelancer or agency you trust for a wider scope of work, you may not need us.",
  "If you need a live website tomorrow, we can’t promise that. We can send a demo within 24 hours. Going live happens after you approve it.",
];

export default function ComparePage() {
  return (
    <>
      <section className="section pb-8 pt-40 md:pt-48">
        <div className="container-x wrap max-w-3xl">
          <p className="eyebrow">Compare us</p>
          <MaskedHeading className="mt-4 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02]">
            How we compare.
          </MaskedHeading>
          <Reveal delay={0.1}>
            <p className="section-lede">
              You can build a site yourself, hire a big agency, or work with a
              freelancer. Uptisement is a fourth option: a free preview of a
              booking-first site, then a simple path to go live if you want it.
            </p>
            <p className="mt-4 text-[var(--color-muted)]">
              This is a straight comparison. No named local companies, and no
              made-up numbers for anyone else.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x wrap">
          <CompareMatrix rows={ROWS} />
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x wrap max-w-3xl">
          <Reveal>
            <h2 className="font-display text-3xl text-[var(--color-text)] md:text-4xl">
              When we’re not the right fit
            </h2>
            <p className="mt-3 text-[var(--color-muted)]">
              We’re not the right fit for everyone, and that’s fine.
            </p>
          </Reveal>
          <div className="bento mt-8">
            {NOT_FIT.map((line, i) => (
              <Reveal key={line} delay={i * 0.05} className="bento-6">
                <SpotlightCard className="h-full">
                  <p className="text-[var(--color-muted)]">{line}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-8 text-[var(--color-text)]">
              If you just need a clear, booking-first site, and maybe one
              automation later, we’re built for that. The free demo is the
              easiest way to see if it feels right.
            </p>
          </Reveal>
        </div>
      </section>

      <DemoFormSection headline="See a preview for your business." />
    </>
  );
}

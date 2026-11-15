import { EMAIL } from "@/app/lib/config";
import { BookLink } from "./BookLink";

export function CTA() {
  return (
    <section className="section" aria-labelledby="close-title">
      <div className="container-x">
        <div className="bg-[var(--color-ink)] px-6 py-12 text-[var(--color-paper)] md:px-12 md:py-16">
          <h2 id="close-title" className="max-w-[14ch] text-3xl text-white md:text-5xl">
            Find out where you&apos;re losing jobs.
          </h2>
          <p className="mt-5 max-w-xl text-[color-mix(in_srgb,white_78%,transparent)]">
            Book a call and get a free demo. 15 minutes, no pitch deck. I&apos;ll look at your
            site and how calls are handled, and tell you the one fix I&apos;d ship first — with a
            fixed price in writing.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <BookLink className="btn !bg-[var(--color-accent)] !text-white hover:!bg-white hover:!text-[var(--color-ink)]">
              Book a 15-min call
            </BookLink>
            <BookLink className="btn !border !border-white/30 !bg-transparent !text-white hover:!bg-white/10">
              Get a free demo
            </BookLink>
          </div>
          <p className="mt-6 text-sm text-white/65">
            Prefer email?{" "}
            <a className="underline underline-offset-2" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

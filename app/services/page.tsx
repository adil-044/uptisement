import type { Metadata } from "next";
import { ServiceCards } from "../components/ServiceCards";
import { Pricing } from "../components/Pricing";
import { CTA } from "../components/CTA";
import { Process } from "../components/Process";
import { BookLink } from "../components/BookLink";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services — Web design, AI automations & AI consulting",
  description:
    "Booking-first websites from $300, AI automations (missed-call text-back, quote estimator, lead CRM), and AI consulting for Ontario trades.",
  alternates: { canonical: "/services/" },
};

export default function ServicesPage() {
  return (
    <div className="pt-24">
      <div className="container-x pt-8 pb-4">
        <p className="eyebrow">Services</p>
        <h1 className="mt-3 max-w-[16ch] text-4xl md:text-6xl">
          Three ways to stop losing jobs.
        </h1>
        <p className="section-lede">
          Web design, AI automations, and AI consulting for owner-run trades and local shops
          across Ontario.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <BookLink>Book a 15-min call</BookLink>
          <Link href="/automations/" className="btn btn-secondary">
            Try the demos
          </Link>
        </div>
      </div>
      <ServiceCards />
      <Pricing />
      <Process />
      <CTA />
    </div>
  );
}

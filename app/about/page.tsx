import type { Metadata } from "next";
import { About } from "../components/About";
import { CTA } from "../components/CTA";
import { Reviews } from "../components/Reviews";
import { SinceCounter } from "../components/SinceCounter";

export const metadata: Metadata = {
  title: "About — Adil Khatri, Southern Ontario",
  description:
    "Uptisement is built by Adil Khatri in Southern Ontario — booking-first websites and simple automations for owner-run trades since 2023.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <div className="pt-24">
      <About />
      <SinceCounter />
      <Reviews />
      <CTA />
    </div>
  );
}

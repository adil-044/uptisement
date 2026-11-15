import type { Metadata } from "next";
import { Pricing } from "../components/Pricing";
import { FAQ } from "../components/FAQ";
import { CTA } from "../components/CTA";

export const metadata: Metadata = {
  title: "Pricing — From $300 websites, $30/mo hosting",
  description:
    "Booking-first websites from $300. Hosting & updates $30/mo. Automations and consulting scoped on a 15-min call with a fixed written quote.",
  alternates: { canonical: "/pricing/" },
};

export default function PricingPage() {
  return (
    <div className="pt-24">
      <Pricing />
      <FAQ />
      <CTA />
    </div>
  );
}

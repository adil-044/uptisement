import type { Metadata } from "next";
import { ServiceCards } from "../components/ServiceCards";
import { Pricing } from "../components/Pricing";
import { AutomationDemo } from "../components/AutomationDemo";
import { CTA } from "../components/CTA";
import { Process } from "../components/Process";

export const metadata: Metadata = {
  title: "Services — Web design, AI automations & AI consulting",
  description:
    "Booking-first websites from $300, AI automations (missed-call text-back, quote estimator, lead CRM), and AI consulting for Ontario trades.",
  alternates: { canonical: "/services/" },
};

export default function ServicesPage() {
  return (
    <div className="pt-24">
      <ServiceCards />
      <Pricing />
      <AutomationDemo />
      <Process />
      <CTA />
    </div>
  );
}

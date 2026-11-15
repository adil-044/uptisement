import { About } from "./components/About";
import { AutomationDemo } from "./components/AutomationDemo";
import { CTA } from "./components/CTA";
import { FAQ } from "./components/FAQ";
import { Hero } from "./components/Hero";
import { Pricing } from "./components/Pricing";
import { ProblemStrip } from "./components/ProblemStrip";
import { Process } from "./components/Process";
import { Reviews } from "./components/Reviews";
import { ServiceCards } from "./components/ServiceCards";
import { SinceCounter } from "./components/SinceCounter";
import { TradesMarquee } from "./components/TradesMarquee";
import { WorkShowcase } from "./components/WorkShowcase";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TradesMarquee />
      <ProblemStrip />
      <ServiceCards />
      <Pricing />
      <AutomationDemo />
      <WorkShowcase />
      <Reviews />
      <SinceCounter />
      <About />
      <Process />
      <FAQ />
      <CTA />
    </>
  );
}

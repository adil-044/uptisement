import { DEMO_BANNER } from "@/app/lib/demo-state";

export function DemoBanner({ className = "" }: { className?: string }) {
  return (
    <p className={`demo-banner ${className}`} role="note">
      {DEMO_BANNER}
    </p>
  );
}

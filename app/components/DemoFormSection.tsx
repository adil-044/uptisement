import { DemoForm } from "./DemoForm";

type Props = {
  headline?: string;
  formId?: string;
};

/** Shared final CTA block used on every marketing page. */
export function DemoFormSection({
  headline = "Your free demo is 24 hours away.",
  formId = "demo-bottom",
}: Props) {
  return (
    <section
      id="claim-demo"
      className="section border-t border-[color-mix(in_srgb,white_8%,transparent)]"
      aria-labelledby={`${formId}-heading`}
    >
      <div className="container-x wrap grid gap-8 lg:grid-cols-[1fr_minmax(0,24rem)] lg:items-start">
        <div>
          <p className="eyebrow">Free demo</p>
          <h2
            id={`${formId}-heading`}
            className="mt-3 max-w-xl font-display text-3xl font-bold tracking-tight text-white md:text-4xl"
          >
            {headline}
          </h2>
        </div>
        <DemoForm id={formId} />
      </div>
    </section>
  );
}

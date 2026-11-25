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
      className="section border-t border-[var(--color-border)]"
      aria-labelledby={`${formId}-heading`}
    >
      <div className="container-x wrap grid gap-10 lg:grid-cols-[1fr_minmax(0,24rem)] lg:items-start">
        <div>
          <p className="eyebrow">Free demo</p>
          <h2
            id={`${formId}-heading`}
            className="mt-4 max-w-xl font-display text-4xl text-[var(--color-text)] md:text-5xl"
          >
            {headline}
          </h2>
        </div>
        <DemoForm id={formId} />
      </div>
    </section>
  );
}

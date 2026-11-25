type FaqItem = {
  question: string;
  answer: React.ReactNode;
};

type Props = {
  items: FaqItem[];
  id?: string;
};

export function FAQList({ items, id = "faq" }: Props) {
  return (
    <div id={id} className="divide-y divide-[color-mix(in_srgb,white_10%,transparent)]">
      {items.map((item) => (
        <details key={item.question} className="faq-item group">
          <summary>
            <span>{item.question}</span>
            <span
              aria-hidden
              className="text-[var(--color-mint)] transition group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="faq-body">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}

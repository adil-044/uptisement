import type { Chapter } from "@/app/lib/chapters";

type Props = {
  chapter: Chapter;
  children?: React.ReactNode;
  className?: string;
  id?: string;
};

export function ChapterSection({ chapter, children, className = "", id }: Props) {
  const isHero = chapter.id === "hero";
  const TitleTag = isHero ? "h1" : "h2";

  return (
    <section
      id={id ?? `chapter-${chapter.id}`}
      data-chapter={chapter.id}
      data-theme={chapter.theme}
      className={`chapter ${className}`}
      aria-labelledby={`title-${chapter.id}`}
    >
      <div className="container-x w-full">
        <div className="chapter-panel">
          {chapter.eyebrow && <p className="eyebrow">{chapter.eyebrow}</p>}
          <TitleTag
            id={`title-${chapter.id}`}
            className={`mt-3 font-extrabold tracking-[-0.03em] ${
              isHero
                ? "text-[clamp(2.4rem,8vw,5rem)]"
                : "text-[clamp(1.6rem,4.5vw,2.75rem)]"
            }`}
          >
            {chapter.title}
          </TitleTag>
          <p className="chapter-body mt-4 text-lg">{chapter.body}</p>
          {chapter.body2 && (
            <p className="chapter-body mt-3 text-[var(--color-muted)]">{chapter.body2}</p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}

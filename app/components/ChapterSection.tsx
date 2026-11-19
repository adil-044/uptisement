import type { Chapter } from "@/app/lib/chapters";
import { ChapterHeading } from "./ChapterHeading";

type Props = {
  chapter: Chapter;
  children?: React.ReactNode;
  className?: string;
  id?: string;
  /** Taste-skill hero entrance marker */
  dataEnter?: boolean;
};

export function ChapterSection({
  chapter,
  children,
  className = "",
  id,
  dataEnter = false,
}: Props) {
  const isHero = chapter.id === "hero";
  const sectionId = id ?? `chapter-${chapter.id}`;

  return (
    <section
      id={sectionId}
      data-chapter={chapter.id}
      data-theme={chapter.theme}
      data-enter={dataEnter ? "" : undefined}
      className={`chapter ${isHero ? "hero" : ""} ${className}`}
      aria-labelledby={`title-${chapter.id}`}
      style={
        isHero
          ? undefined
          : ({ ["--h" as string]: chapter.demo ? "2" : "1" } as React.CSSProperties)
      }
    >
      <div className="container-x wrap w-full">
        <div className={`chapter-panel ${isHero ? "measure" : ""}`}>
          {chapter.eyebrow && (
            <p className="eyebrow" data-enter-line={dataEnter ? "1" : undefined}>
              {chapter.eyebrow}
            </p>
          )}
          <ChapterHeading
            as={isHero ? "h1" : "h2"}
            id={`title-${chapter.id}`}
            text={chapter.title}
            className={`mt-3 font-extrabold tracking-[-0.03em] ${
              isHero
                ? "text-[clamp(2.4rem,8vw,5rem)]"
                : "text-[clamp(1.6rem,4.5vw,2.75rem)]"
            }`}
            dataEnter={dataEnter}
          />
          <p
            className="chapter-body mt-4 text-lg"
            data-enter-rest={dataEnter ? "" : undefined}
          >
            {chapter.body}
          </p>
          {chapter.body2 && (
            <p className="chapter-body mt-3 text-[var(--color-muted)]">{chapter.body2}</p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}

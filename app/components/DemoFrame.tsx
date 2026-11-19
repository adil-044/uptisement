import { DemoBanner } from "./DemoBanner";
import { LabelPill } from "./LabelPill";
import { BookLink } from "./BookLink";

type Props = {
  title: string;
  children: React.ReactNode;
  storyboard?: { title: string; detail: string }[];
  onReplay?: () => void;
  className?: string;
  id?: string;
};

export function DemoFrame({
  title,
  children,
  storyboard,
  onReplay,
  className = "",
  id,
}: Props) {
  return (
    <div id={id} className={`demo-frame p-4 md:p-5 ${className}`}>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <LabelPill kind="Interactive demo (simulated)" />
        <h3 className="text-lg md:text-xl">{title}</h3>
      </div>
      <DemoBanner />
      {children}
      {storyboard && storyboard.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
            How it works
          </p>
          <div className="storyboard">
            {storyboard.map((frame) => (
              <figure key={frame.title}>
                <strong>{frame.title}</strong>
                {frame.detail}
              </figure>
            ))}
          </div>
        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        {onReplay && (
          <button type="button" className="btn btn-secondary !min-h-10 !text-sm" onClick={onReplay}>
            Replay
          </button>
        )}
        <BookLink className="btn btn-book !min-h-10 !text-sm">Book a 15-min call</BookLink>
      </div>
    </div>
  );
}

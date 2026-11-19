import type { WorkLabel } from "@/app/lib/work";

export function LabelPill({
  kind,
  children,
}: {
  kind?: WorkLabel | string;
  children?: React.ReactNode;
}) {
  return (
    <span className="label-pill" data-kind={kind}>
      {children ?? kind}
    </span>
  );
}

type Props = {
  names: string[];
  prefix?: string;
};

/** Seamless client-name trust strip. */
export function LogoLoop({
  names,
  prefix = "Serving Southern Ontario since 2023 · Trusted by",
}: Props) {
  const row = [...names, ...names];
  return (
    <div className="logo-loop py-1" aria-label={prefix}>
      <div className="logo-loop__track">
        {row.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="whitespace-nowrap font-display text-xl italic text-[var(--color-muted)] md:text-2xl"
          >
            {i % names.length === 0 && i > 0 ? null : null}
            {name}
          </span>
        ))}
      </div>
      <p className="sr-only">
        {prefix} {names.join(", ")}
      </p>
    </div>
  );
}

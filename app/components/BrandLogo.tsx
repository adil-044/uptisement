import Link from "next/link";

type Props = {
  className?: string;
  size?: "nav" | "footer";
};

/**
 * Original Uptisement lockup language from the live site:
 * top-left corner mark + sans-serif "Uptisement" wordmark.
 * Recreated as SVG icon + Geist text so it stays crisp at small nav sizes
 * (the PNG lockups are 1024² canvases and read soft when shrunk).
 */
export function BrandLogo({ className = "", size = "nav" }: Props) {
  const icon = size === "nav" ? 18 : 22;
  const text = size === "nav" ? "text-[1.05rem] md:text-[1.125rem]" : "text-xl";

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 text-[var(--color-text)] no-underline ${className}`}
      aria-label="Uptisement home"
    >
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <path
          d="M3 3h13M3 3v13"
          stroke="currentColor"
          strokeWidth="3.25"
          strokeLinecap="square"
        />
      </svg>
      <span className={`font-semibold tracking-[-0.03em] ${text}`}>
        Uptisement
      </span>
    </Link>
  );
}

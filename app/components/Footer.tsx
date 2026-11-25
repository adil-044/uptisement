import Link from "next/link";
import { AREA_SHORT, BOOK_URL, EMAIL, SINCE_YEAR } from "@/app/lib/config";
import { HaloButton } from "./HaloButton";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] pb-14 pt-14">
      <div className="container-x wrap grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Link href="/" className="wordmark text-2xl">
            uptisement
          </Link>
          <p className="mt-3 max-w-sm text-sm text-[var(--color-muted)]">
            {AREA_SHORT} · Since {SINCE_YEAR}
          </p>
          <p className="mt-3 text-sm">
            <a href={`mailto:${EMAIL}`} className="link-plain">
              {EMAIL}
            </a>
          </p>
          <div className="mt-6">
            <HaloButton href="/#claim-demo">Claim free demo</HaloButton>
          </div>
          <p className="mt-4 text-sm">
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-book
              className="link-plain"
            >
              Rather talk first? Book a 15-min call →
            </a>
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
            Navigate
          </p>
          <ul className="mt-4 space-y-1 text-sm">
            {[
              ["/services/", "Services"],
              ["/work/", "Work"],
              ["/pricing/", "Pricing"],
              ["/about/", "About"],
              ["/compare/", "Compare us"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="inline-flex min-h-11 items-center">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
            More
          </p>
          <ul className="mt-4 space-y-1 text-sm">
            <li>
              <Link href="/trades/" className="inline-flex min-h-11 items-center">
                For trades
              </Link>
            </li>
            <li>
              <Link href="/salons/" className="inline-flex min-h-11 items-center">
                For salons, spas and barbers
              </Link>
            </li>
            <li>
              <Link href="/privacy/" className="inline-flex min-h-11 items-center">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/cookies/" className="inline-flex min-h-11 items-center">
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-x wrap mt-12 flex flex-wrap gap-4 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-muted)]">
        <span className="inline-flex min-h-11 items-center">
          © {new Date().getFullYear()} Uptisement
        </span>
        <span className="inline-flex min-h-11 items-center">Since {SINCE_YEAR}</span>
      </div>
    </footer>
  );
}

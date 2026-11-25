import Link from "next/link";
import { AREA_SHORT, EMAIL, SINCE_YEAR } from "@/app/lib/config";
import { BookLink } from "./BookLink";

export function Footer() {
  return (
    <footer className="border-t border-[color-mix(in_srgb,white_10%,transparent)] pb-12 pt-12">
      <div className="container-x wrap grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 font-display text-lg font-bold"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/uptisement-logo-mark.png"
              alt=""
              width={26}
              height={26}
              className="h-[26px] w-[26px] rounded-sm"
              decoding="async"
            />
            Uptisement
          </Link>
          <p className="mt-3 max-w-sm text-sm text-[color-mix(in_srgb,white_65%,transparent)]">
            {AREA_SHORT} · Since {SINCE_YEAR}
          </p>
          <p className="mt-2 text-sm">
            <a
              href={`mailto:${EMAIL}`}
              className="font-semibold text-[var(--color-mint)] underline underline-offset-2"
            >
              {EMAIL}
            </a>
          </p>
          <div className="mt-5">
            <BookLink className="btn btn-book !text-sm">Book a 15-min call</BookLink>
          </div>
        </div>
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-wider">
            Navigate
          </p>
          <ul className="mt-3 space-y-1 text-sm">
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
          <p className="font-display text-sm font-bold uppercase tracking-wider">
            More
          </p>
          <ul className="mt-3 space-y-1 text-sm">
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
      <div className="container-x wrap mt-10 flex flex-wrap gap-4 border-t border-[color-mix(in_srgb,white_10%,transparent)] pt-6 text-xs text-[color-mix(in_srgb,white_55%,transparent)]">
        <span className="inline-flex min-h-11 items-center">
          © {new Date().getFullYear()} Uptisement
        </span>
        <span className="inline-flex min-h-11 items-center">Since {SINCE_YEAR}</span>
      </div>
    </footer>
  );
}

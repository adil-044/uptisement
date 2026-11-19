import Image from "next/image";
import Link from "next/link";
import { AREA_SHORT, EMAIL, SINCE_YEAR } from "@/app/lib/config";
import { BookLink } from "./BookLink";

export function Footer() {
  return (
    <footer className="border-t border-[color-mix(in_srgb,var(--color-ink)_12%,transparent)] pb-12 pt-12">
      <div className="container-x wrap grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 font-display text-lg font-bold"
          >
            <Image
              src="/brand/uptisement-logo-locked.png"
              alt=""
              width={26}
              height={26}
            />
            Uptisement
          </Link>
          <p className="mt-3 max-w-sm text-sm text-[var(--color-muted)]">
            Web design, AI automations &amp; AI consulting for Ontario trades. Since{" "}
            {SINCE_YEAR}.
          </p>
          <div className="mt-5">
            <BookLink className="btn btn-book !text-sm">Book a 15-min call</BookLink>
          </div>
        </div>
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-wider">Navigate</p>
          <ul className="mt-3 space-y-1 text-sm">
            {[
              ["/services/", "Services"],
              ["/automations/", "Automations"],
              ["/work/", "Work"],
              ["/pricing/", "Pricing"],
              ["/about/", "About"],
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
          <p className="font-display text-sm font-bold uppercase tracking-wider">Contact</p>
          <ul className="mt-3 space-y-1 text-sm">
            <li>
              <a href={`mailto:${EMAIL}`} className="inline-flex min-h-11 items-center">
                {EMAIL}
              </a>
            </li>
            <li className="flex min-h-11 items-center">{AREA_SHORT}</li>
            <li>
              <Link href="/privacy.html" className="inline-flex min-h-11 items-center">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/cookies.html" className="inline-flex min-h-11 items-center">
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-x wrap mt-10 flex flex-wrap gap-4 border-t border-[var(--color-line)] pt-6 text-xs text-[var(--color-muted)]">
        <span className="inline-flex min-h-11 items-center">
          © {new Date().getFullYear()} Uptisement
        </span>
        <span className="inline-flex min-h-11 items-center">Since {SINCE_YEAR}</span>
        <Link href="/lab.html" className="inline-flex min-h-11 items-center">
          Lab
        </Link>
        <Link href="/ig-dm/" className="inline-flex min-h-11 items-center">
          IG DM demo
        </Link>
      </div>
    </footer>
  );
}

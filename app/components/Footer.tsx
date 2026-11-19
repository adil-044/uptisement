import Image from "next/image";
import Link from "next/link";
import { AREA_SHORT, EMAIL, SINCE_YEAR } from "@/app/lib/config";
import { BookLink } from "./BookLink";

export function Footer() {
  return (
    <footer className="border-t border-[color-mix(in_srgb,var(--color-ink)_12%,transparent)] pb-12 pt-12">
      <div className="container-x grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 font-display text-lg font-bold">
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
            <BookLink className="btn btn-primary !text-sm">Book a 15-min call</BookLink>
          </div>
        </div>
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-wider">Navigate</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/services/">Services</Link>
            </li>
            <li>
              <Link href="/automations/">Automations</Link>
            </li>
            <li>
              <Link href="/work/">Work</Link>
            </li>
            <li>
              <Link href="/pricing/">Pricing</Link>
            </li>
            <li>
              <Link href="/about/">About</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-wider">Contact</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </li>
            <li>{AREA_SHORT}</li>
            <li>
              <Link href="/privacy.html">Privacy</Link>
            </li>
            <li>
              <Link href="/cookies.html">Cookies</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-x mt-10 flex flex-wrap gap-4 border-t border-[var(--color-line)] pt-6 text-xs text-[var(--color-muted)]">
        <span>© {new Date().getFullYear()} Uptisement</span>
        <span>Since {SINCE_YEAR}</span>
        <Link href="/lab.html">Lab</Link>
        <Link href="/ig-dm/">IG DM demo</Link>
      </div>
    </footer>
  );
}

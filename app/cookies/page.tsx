import type { Metadata } from "next";
import Link from "next/link";
import { CookiePreferences } from "@/app/components/CookiePreferences";
import { EMAIL, MICROSOFT_PRIVACY_URL } from "@/app/lib/config";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Cookie and tracking preferences for Uptisement — essential tools, Microsoft Clarity, and optional marketing categories.",
  alternates: { canonical: "/cookies/" },
};

export default function CookiesPage() {
  return (
    <section className="section pb-16 pt-32 md:pt-40">
      <div className="container-x wrap max-w-3xl legal-prose">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-3 font-display text-4xl text-[var(--color-text)]">
          Cookie Policy
        </h1>
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          Effective: 10 September 2026 · See also{" "}
          <Link href="/privacy/">Privacy Policy</Link>
        </p>
        <p className="mt-5">
          We use cookies and similar technologies (localStorage, scripts, tags)
          so the site works and so we can understand how people use it. You can
          manage optional marketing preferences below, and you can always block
          analytics in your browser or with an ad blocker.
        </p>

        <h2 id="clarity-analytics">Microsoft Clarity</h2>
        <p>
          We use <strong>Microsoft Clarity</strong> to understand how visitors
          use uptisement.com — things like clicks, scrolling, and session
          replays — so we can improve the site. Clarity uses cookies and similar
          technology. Data from Clarity is processed by Microsoft. You can read
          Microsoft’s privacy statement here:{" "}
          <a
            href={MICROSOFT_PRIVACY_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            privacy.microsoft.com/privacystatement
          </a>
          .
        </p>
        <p>
          To opt out of Clarity (and similar analytics), use your browser’s
          privacy or tracking settings, clear site cookies, or use an ad
          blocker / tracking-protection extension. If you reject non-essential
          cookies in our preferences panel, we treat that as a preference signal
          for optional marketing tags; browser-level blocks are the reliable
          way to stop analytics scripts from running.
        </p>

        <h2 id="preferences">Manage preferences</h2>
        <CookiePreferences />

        <h2>Categories</h2>
        <div className="overflow-x-auto">
          <table className="legal-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Examples</th>
                <th>When</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Essential</td>
                <td>
                  Consent store (<code>upti_consent_v2</code>), theme preference
                  (<code>theme</code>), UTM handoff for bookings
                </td>
                <td>Always</td>
              </tr>
              <tr>
                <td>Analytics</td>
                <td>Microsoft Clarity (session insight / heatmaps)</td>
                <td>In use — see above; opt out via browser / blocker</td>
              </tr>
              <tr>
                <td>Marketing</td>
                <td>Meta Pixel, LinkedIn Insight (if enabled)</td>
                <td>Only if you accept in preferences</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Your choices by region</h2>
        <ul>
          <li>
            <strong>EEA / UK / similar</strong> — use browser controls and our
            preferences panel; contact us if you need help exercising rights.
          </li>
          <li>
            <strong>California / US state privacy laws</strong> — Reject
            non-essential in preferences opts out of sale/share via optional ad
            cookies.
          </li>
          <li>
            <strong>Canada</strong> — meaningful notice for optional tracking;
            PIPEDA principles in our Privacy Policy; CASL for commercial
            messages.
          </li>
        </ul>

        <h2>How long</h2>
        <p>
          Preference choice: up to 12 months (then we ask again if we show a
          prompt). Vendor cookies follow each vendor’s lifetime. Clear site data
          in your browser to reset sooner.
        </p>

        <h2>Contact</h2>
        <p>
          <a href={`mailto:${EMAIL}?subject=Cookie%20preferences`}>{EMAIL}</a>
        </p>
      </div>
    </section>
  );
}

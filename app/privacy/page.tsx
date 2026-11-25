import type { Metadata } from "next";
import Link from "next/link";
import { EMAIL, SITE_URL } from "@/app/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Uptisement privacy policy for visitors and clients in Canada and other regions where we operate.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <section className="section pb-16 pt-32 md:pt-40">
      <div className="container-x wrap max-w-3xl legal-prose">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-3 font-display text-4xl text-[var(--color-text)]">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          Effective: 10 September 2026 · Controller: Uptisement · Contact:{" "}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a> · Southern Ontario
        </p>
        <p className="remy-note mt-5 !border-l-[var(--color-line)] !bg-[color-mix(in_srgb,white_6%,transparent)]">
          <strong className="text-[var(--color-text)]">Not legal advice.</strong> This policy
          explains how we handle personal data for a global audience (including
          GDPR/UK GDPR, CCPA/CPRA, PIPEDA, and similar laws). Laws vary by
          country; we apply the stricter practical standard where we can.
        </p>

        <h2>1. Who we are</h2>
        <p>
          Uptisement provides AI consulting, custom automation, and web makeovers
          for operators. Website:{" "}
          <a href={SITE_URL}>uptisement.com</a>.
        </p>

        <h2>2. Data we collect</h2>
        <ul>
          <li>
            <strong>Contact &amp; booking data</strong> — name, email, business
            details you send by email or Calendly (and any phone number you
            choose to share).
          </li>
          <li>
            <strong>Technical data</strong> — IP address (often
            truncated/anonymized where tools allow), device/browser, pages
            viewed, approximate location, referrer.
          </li>
          <li>
            <strong>Cookies &amp; similar tech</strong> — see{" "}
            <Link href="/cookies/">Cookie Policy</Link>. Analytics/ads load only
            with your consent where required.
          </li>
          <li>
            <strong>Communications</strong> — messages you send us; for Canadian
            commercial electronic messages we follow CASL (consent,
            identification, unsubscribe).
          </li>
        </ul>
        <p>
          We do <strong>not</strong> knowingly collect data from children under
          16 (or under 13 where that is the local age). If you believe a child
          provided data, email us to delete it.
        </p>

        <h2>3. Why we use data (purposes &amp; legal bases)</h2>
        <ul>
          <li>
            <strong>Provide services &amp; book calls</strong> — contract /
            steps prior to contract.
          </li>
          <li>
            <strong>Respond to inquiries</strong> — legitimate interests or
            consent.
          </li>
          <li>
            <strong>Site security &amp; essential operation</strong> —
            legitimate interests.
          </li>
          <li>
            <strong>Analytics (e.g. Microsoft Clarity, Google Analytics)</strong>{" "}
            — consent where required (EEA/UK and similar).
          </li>
          <li>
            <strong>Advertising / remarketing (e.g. Meta Pixel)</strong> —
            consent where required.
          </li>
          <li>
            <strong>Legal compliance</strong> — legal obligation (including tax,
            CASL records where applicable).
          </li>
        </ul>

        <h2>4. Sharing</h2>
        <p>
          We share data with processors who help us run the business, under
          contracts where required:
        </p>
        <ul>
          <li>Hosting / GitHub Pages</li>
          <li>Calendly (scheduling)</li>
          <li>Email / phone providers (including Quo)</li>
          <li>
            Analytics / ads vendors only if you consent (Clarity, Google, Meta,
            etc.)
          </li>
        </ul>
        <p>
          We do not sell personal information for money. Under CCPA/CPRA, some ad
          cookies may be considered a “sale” or “share” — you can opt out via
          Cookie preferences / Reject non-essential.
        </p>

        <h2>5. International transfers</h2>
        <p>
          We serve clients in the US, Canada, and remotely worldwide. Data may be
          processed in the United States and other countries. Where GDPR/UK GDPR
          applies, we rely on appropriate safeguards (e.g. Standard Contractual
          Clauses used by vendors) or your consent for optional tools.
        </p>

        <h2>6. Retention</h2>
        <p>
          Inquiry and client records: kept as long as needed for the relationship
          and legal/accounting duties, then deleted or anonymized. Analytics/ad
          data: per each vendor’s retention settings. Consent records: kept to
          prove compliance.
        </p>

        <h2>7. Your rights</h2>
        <p>
          Depending on your country/state, you may have rights to access,
          correct, delete, port, restrict, or object to processing; withdraw
          consent; and lodge a complaint with a supervisory authority.
        </p>
        <ul>
          <li>
            <strong>EEA/UK</strong> — GDPR / UK GDPR rights; complaint to your
            local DPA / ICO.
          </li>
          <li>
            <strong>Canada</strong> — PIPEDA access/correction; CASL unsubscribe
            for CEMs.
          </li>
          <li>
            <strong>California &amp; similar US states</strong> — know, delete,
            correct, opt out of sale/share, limit sensitive data use where
            applicable. Non-discrimination for exercising rights.
          </li>
        </ul>
        <p>
          Request:{" "}
          <a href={`mailto:${EMAIL}?subject=Privacy%20request`}>{EMAIL}</a> with
          subject “Privacy request”. We may need to verify identity. We aim to
          respond within timelines required by your law (often 30–45 days).
        </p>

        <h2>8. Do Not Sell or Share (CCPA/CPRA)</h2>
        <p>
          <Link href="/cookies/#preferences">Manage cookie preferences</Link> or
          choose <strong>Reject non-essential</strong> on the banner to opt out
          of analytics/ads cookies that may constitute sale/share.
        </p>

        <h2>9. Security</h2>
        <p>
          We use reasonable technical and organizational measures. No method of
          transmission is 100% secure.
        </p>

        <h2>10. Changes</h2>
        <p>
          We may update this policy. The Effective date above will change.
          Continued use after changes means you reviewed the update.
        </p>

        <h2>11. Contact</h2>
        <p>
          Uptisement · <a href={`mailto:${EMAIL}`}>{EMAIL}</a> · Southern Ontario
          · <a href={SITE_URL}>uptisement.com</a>
        </p>
      </div>
    </section>
  );
}

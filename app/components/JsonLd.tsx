import {
  AREA,
  EMAIL,
  FOUNDER,
  GBP_URL,
  INSTAGRAM_URL,
  PHONE_E164,
  SITE_NAME,
  SITE_URL,
  SINCE_YEAR,
  TAGLINE,
} from "@/app/lib/config";

const DESCRIPTION =
  "Websites and AI automations for trades, salons and local businesses across Ontario. Booking-first websites from $300, with a free preview before you pay.";

/*
 * TODO(Adil): add a fuller `address` (addressLocality) once a public business
 * location is confirmed. Do not add placeholder values.
 */
export function JsonLd() {
  const sameAs = [INSTAGRAM_URL, GBP_URL].filter(Boolean);

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        description: TAGLINE,
        publisher: { "@id": `${SITE_URL}/#business` },
      },
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": `${SITE_URL}/#business`,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/brand/logo-icon.png`,
        image: `${SITE_URL}/brand/logo-lockup-light.png`,
        email: EMAIL,
        telephone: PHONE_E164,
        slogan: TAGLINE,
        description: DESCRIPTION,
        foundingDate: String(SINCE_YEAR),
        address: {
          "@type": "PostalAddress",
          addressRegion: "ON",
          addressCountry: "CA",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Ontario, Canada",
        },
        knowsAbout: [
          "Website design",
          "Online booking websites",
          "AI automations",
          "Missed-call text-back",
          "Google review requests",
          "Appointment reminders",
        ],
        priceRange: "From $300",
        founder: {
          "@type": "Person",
          name: FOUNDER,
        },
        ...(GBP_URL ? { hasMap: GBP_URL } : {}),
        sameAs,
        disambiguatingDescription: AREA,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

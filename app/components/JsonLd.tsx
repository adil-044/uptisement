import { AREA, EMAIL, FOUNDER, SITE_NAME, SITE_URL, SINCE_YEAR } from "@/app/lib/config";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    url: SITE_URL,
    email: EMAIL,
    description:
      "Web design, AI automations, and AI consulting for owner-run trades and local businesses across Ontario.",
    foundingDate: String(SINCE_YEAR),
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Ontario, Canada",
      },
      {
        "@type": "AdministrativeArea",
        name: "Southern Ontario, Canada",
      },
    ],
    founder: {
      "@type": "Person",
      name: FOUNDER,
    },
    priceRange: "From $300",
    sameAs: [
      "https://github.com/adil-044/uptisement",
      "https://calendly.com/uptisement/30min",
    ],
    slogan: AREA,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

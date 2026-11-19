import type { Metadata } from "next";
import { JsonLd } from "./components/JsonLd";
import { MotionRoot } from "./components/MotionRoot";
import { SiteChrome } from "./components/SiteChrome";
import { SITE_URL } from "./lib/config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Booking-first websites & AI automations for Ontario trades | Uptisement",
    template: "%s | Uptisement",
  },
  description:
    "Web design from $300, missed-call text-back, and AI consulting for owner-run HVAC, roofing, and local businesses across Ontario. Free demo. Book a 15-min call.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Booking-first websites for Ontario trades | Uptisement",
    description:
      "Web design, AI automations & AI consulting for owner-run trades across Ontario. From $300. Free demo of your site.",
    images: [
      {
        url: "/brand/uptisement-logo-locked-with-services.png",
        width: 1200,
        height: 630,
        alt: "Uptisement",
      },
    ],
    siteName: "Uptisement",
  },
  twitter: {
    card: "summary_large_image",
    title: "Booking-first websites for Ontario trades | Uptisement",
    description:
      "Web design, AI automations & AI consulting for owner-run trades across Ontario.",
    images: ["/brand/uptisement-logo-locked-with-services.png"],
  },
  icons: {
    icon: "/brand/uptisement-logo-locked.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-type="software" data-motion="" data-radius="soft">
      <head>
        <meta name="page-type" content="software" />
        <meta name="site-kind" content="software" />
        <meta name="theme-color" content="#0B1220" />
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("m-enter");`,
          }}
        />
        <link
          rel="preload"
          href="/fonts/manrope.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/syne.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
      </head>
      <body className="site-shell font-body antialiased">
        <MotionRoot>
          <JsonLd />
          <div className="site-bg" aria-hidden="true" />
          <SiteChrome>{children}</SiteChrome>
        </MotionRoot>
      </body>
    </html>
  );
}

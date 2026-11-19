import type { Metadata } from "next";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { JsonLd } from "./components/JsonLd";
import { MobileBookBar } from "./components/MobileBookBar";
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Syne:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="site-shell font-body antialiased">
        <JsonLd />
        <div className="site-bg" aria-hidden="true" />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileBookBar />
      </body>
    </html>
  );
}

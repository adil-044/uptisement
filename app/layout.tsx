import type { Metadata } from "next";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { JsonLd } from "./components/JsonLd";
import { MobileBookBar } from "./components/MobileBookBar";
import { MotionRoot } from "./components/MotionRoot";
import { SmoothScroll } from "./components/SmoothScroll";
import { SITE_URL } from "./lib/config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "See your new website before you pay a cent | Uptisement",
    template: "%s | Uptisement",
  },
  description:
    "Tell us about your business. Within 24 hours we’ll send a free, personalised preview of a booking-first website built for you. From $300. Southern Ontario.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "See your new website before you pay a cent | Uptisement",
    description:
      "Tell us about your business. Within 24 hours we’ll send a free, personalised preview of a booking-first website built for you. From $300. Southern Ontario.",
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
    title: "See your new website before you pay a cent | Uptisement",
    description:
      "Free personalised website demo within 24 hours. From $300. Southern Ontario.",
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
        <meta name="theme-color" content="#0B1220" />
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
          <SmoothScroll />
          <JsonLd />
          <a className="skip-link" href="#content">
            Skip to content
          </a>
          <div className="site-bg" aria-hidden="true" />
          <Header />
          <main id="content">{children}</main>
          <Footer />
          <MobileBookBar />
        </MotionRoot>
      </body>
    </html>
  );
}

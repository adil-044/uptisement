import type { Metadata } from "next";
import { ClarityEvents } from "./components/ClarityEvents";
import { ClarityInit } from "./components/ClarityInit";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { JsonLd } from "./components/JsonLd";
import { MobileBookBar } from "./components/MobileBookBar";
import { MotionRoot } from "./components/MotionRoot";
import { ScrollProgress } from "./components/ScrollProgress";
import { SmoothScroll } from "./components/SmoothScroll";
import { ThemeProvider } from "./components/ThemeProvider";
import { geistSans, instrumentSerif } from "./lib/fonts";
import { GOOGLE_SITE_VERIFICATION, SITE_URL } from "./lib/config";
import { THEME_BOOT_SCRIPT } from "./lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Websites and AI automations for Ontario trades & salons — see yours before you pay | Uptisement",
    template: "%s | Uptisement",
  },
  description:
    "Uptisement builds booking-first websites and AI automations for trades, salons and local businesses across Ontario. See a free preview of your site within 24 hours, before you pay. Websites from $300.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Websites and AI automations for Ontario trades & salons — see yours before you pay | Uptisement",
    description:
      "Uptisement builds booking-first websites and AI automations for trades, salons and local businesses across Ontario. See a free preview of your site within 24 hours, before you pay. Websites from $300.",
    siteName: "Uptisement",
  },
  twitter: {
    card: "summary_large_image",
    title: "Websites and AI automations for Ontario trades & salons — see yours before you pay | Uptisement",
    description:
      "Websites and AI automations for Ontario trades and salons. Free preview within 24 hours, before you pay. From $300.",
  },
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#050505" />
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
        <link
          rel="preload"
          href="/fonts/geist-sans.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/instrument-serif.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
      </head>
      <body className="site-shell font-body antialiased">
        <MotionRoot>
          <ThemeProvider>
            <ClarityInit />
            <ClarityEvents />
            <SmoothScroll />
            <ScrollProgress />
            <JsonLd />
            <a className="skip-link" href="#content">
              Skip to content
            </a>
            <div className="site-bg" aria-hidden="true" />
            <Header />
            <main id="content">{children}</main>
            <Footer />
            <MobileBookBar />
          </ThemeProvider>
        </MotionRoot>
      </body>
    </html>
  );
}

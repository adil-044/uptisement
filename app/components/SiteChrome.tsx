"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MobileBookBar } from "./MobileBookBar";

/**
 * Site chrome (header/footer/book bar) for all pages except the immersive homepage.
 * Keeping `/` chrome-free improves LCP and matches Samana-style shell.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const immersive = pathname === "/" || pathname === "";

  useEffect(() => {
    if (immersive) {
      document.documentElement.dataset.immersive = "1";
      document.documentElement.dataset.story = "1";
    } else {
      delete document.documentElement.dataset.immersive;
      delete document.documentElement.dataset.story;
    }
  }, [immersive]);

  return (
    <>
      {!immersive ? <Header /> : null}
      <main>{children}</main>
      {!immersive ? (
        <>
          <Footer />
          <MobileBookBar />
        </>
      ) : null}
    </>
  );
}

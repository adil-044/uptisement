"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { clarityEvent, claritySet } from "@/app/lib/clarity";

function pageTypeFromPath(pathname: string | null): string {
  if (!pathname || pathname === "/") return "home";
  const seg = pathname.replace(/^\/|\/$/g, "").split("/")[0];
  return seg || "home";
}

/**
 * Delegated click tracking for booking + phone links site-wide.
 * Also sets a soft page_type tag when the route changes.
 */
export function ClarityEvents() {
  const pathname = usePathname();

  useEffect(() => {
    claritySet("page_type", pageTypeFromPath(pathname));
  }, [pathname]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as Element | null)?.closest?.(
        "a[href], button[data-book]",
      ) as HTMLElement | null;
      if (!el) return;

      if (el instanceof HTMLAnchorElement) {
        const href = el.getAttribute("href") || "";
        if (href.startsWith("tel:")) {
          clarityEvent("phone_click");
          return;
        }
        if (
          el.hasAttribute("data-book") ||
          href.includes("calendly.com")
        ) {
          clarityEvent("book_call_click");
        }
      }
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}

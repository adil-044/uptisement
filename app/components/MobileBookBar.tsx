"use client";

import { BOOK_URL } from "@/app/lib/config";
import { HaloButton } from "./HaloButton";

/** Sticky mobile bar — Halo demo CTA + plain book link. */
export function MobileBookBar() {
  return (
    <div
      className="mobile-book-bar md:!hidden"
      role="region"
      aria-label="Claim demo"
    >
      <div className="flex items-center gap-3">
        <HaloButton href="/#claim-demo" className="flex-1 !min-h-11 !text-sm">
          Claim free demo
        </HaloButton>
        <a
          href={BOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-book
          className="link-plain shrink-0 text-sm"
        >
          Book a call
        </a>
      </div>
    </div>
  );
}

"use client";

import { BookLink } from "./BookLink";

/** Sticky mobile bar — demo first, book secondary. Always in the DOM. */
export function MobileBookBar() {
  return (
    <div className="mobile-book-bar md:!hidden" role="region" aria-label="Claim demo">
      <div className="grid grid-cols-[1.2fr_1fr] gap-2">
        <a href="/#claim-demo" className="btn btn-mint w-full !text-sm">
          Claim free demo
        </a>
        <BookLink className="btn btn-secondary w-full !text-sm">
          Book a call
        </BookLink>
      </div>
    </div>
  );
}

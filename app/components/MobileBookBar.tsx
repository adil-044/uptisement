"use client";

import { BookLink } from "./BookLink";

export function MobileBookBar() {
  return (
    <div className="mobile-book-bar md:!hidden">
      <BookLink className="btn btn-primary w-full">Book a 15-min call</BookLink>
    </div>
  );
}

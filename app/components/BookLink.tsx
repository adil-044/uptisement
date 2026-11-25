"use client";

import { BOOK_URL } from "@/app/lib/config";

type Props = {
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
  id?: string;
  onClick?: () => void;
};

/** Secondary booking CTA — plain text link only (not a glowing button). */
export function BookLink({
  children,
  className = "link-plain",
  onClick,
  id,
  ...rest
}: Props) {
  return (
    <a
      href={BOOK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      data-book
      id={id}
      onClick={onClick}
      {...rest}
    >
      {children}
    </a>
  );
}

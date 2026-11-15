"use client";

import { useEffect } from "react";

export function ClientRedirect({ href }: { href: string }) {
  useEffect(() => {
    window.location.replace(href);
  }, [href]);

  return (
    <div className="container-x py-32">
      <p className="text-[var(--color-muted)]">
        Redirecting…{" "}
        <a className="underline" href={href}>
          Continue
        </a>
      </p>
    </div>
  );
}

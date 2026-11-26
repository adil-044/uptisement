"use client";

import Script from "next/script";
import { CLARITY_PROJECT_ID } from "@/app/lib/config";

/**
 * Microsoft Clarity — afterInteractive so it never blocks first paint / LCP.
 * Must not run before the theme boot script (that stays inline in <head>).
 */
export function ClarityInit() {
  const id = CLARITY_PROJECT_ID;
  if (!id) return null;

  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">{`
(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", ${JSON.stringify(id)});
`}</Script>
  );
}

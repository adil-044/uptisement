"use client";

/**
 * Soft aurora hero wash — CSS only on first paint (no shader blocking LCP).
 * Respects prefers-reduced-motion via CSS (static blobs).
 */
export function SoftAurora() {
  return (
    <div className="soft-aurora" aria-hidden="true">
      <div className="soft-aurora__blob soft-aurora__blob--a" />
      <div className="soft-aurora__blob soft-aurora__blob--b" />
      <div className="soft-aurora__blob soft-aurora__blob--c" />
    </div>
  );
}

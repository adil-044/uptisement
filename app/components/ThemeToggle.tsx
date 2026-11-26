"use client";

import { clarityEvent } from "@/app/lib/clarity";
import { useTheme } from "./ThemeProvider";

type Props = {
  className?: string;
  /** Larger hit target for mobile menu row */
  size?: "nav" | "menu";
};

/** Sun/moon control — overrides system preference and persists to localStorage. */
export function ThemeToggle({ className = "", size = "nav" }: Props) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";
  const dim = size === "nav" ? "h-9 w-9" : "h-11 w-11";

  return (
    <button
      type="button"
      onClick={() => {
        clarityEvent("theme_toggle");
        toggleTheme();
      }}
      className={`inline-flex ${dim} items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text)] transition hover:border-[color-mix(in_srgb,var(--color-purple)_40%,var(--color-border))] hover:bg-[color-mix(in_srgb,var(--color-purple)_8%,transparent)] ${className}`}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Dark mode" : "Light mode"}
    >
      {isLight ? (
        <MoonIcon />
      ) : (
        <SunIcon />
      )}
    </button>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 2.5v2.25M12 19.25V21.5M4.22 4.22l1.59 1.59M18.19 18.19l1.59 1.59M2.5 12h2.25M19.25 12H21.5M4.22 19.78l1.59-1.59M18.19 5.81l1.59-1.59"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20.5 14.2A8.2 8.2 0 0 1 9.8 3.5 7.4 7.4 0 1 0 20.5 14.2Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

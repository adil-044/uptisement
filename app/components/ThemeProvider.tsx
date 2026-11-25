"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  THEME_STORAGE_KEY,
  resolveTheme,
  themeColorFor,
  type ThemePreference,
} from "@/app/lib/theme";

type ThemeContextValue = {
  theme: ThemePreference;
  /** True when localStorage has an explicit override. */
  isOverridden: boolean;
  setTheme: (theme: ThemePreference) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStored(): string | null {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
}

function applyTheme(theme: ThemePreference) {
  document.documentElement.setAttribute("data-theme", theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", themeColorFor(theme));
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemePreference>("dark");
  const [isOverridden, setIsOverridden] = useState(false);

  useEffect(() => {
    const stored = readStored();
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const next = resolveTheme(stored, mq.matches);
    setThemeState(next);
    setIsOverridden(stored === "light" || stored === "dark");
    applyTheme(next);

    const onChange = (e: MediaQueryListEvent) => {
      const current = readStored();
      if (current === "light" || current === "dark") return;
      const resolved = e.matches ? "light" : "dark";
      setThemeState(resolved);
      applyTheme(resolved);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const setTheme = useCallback((next: ThemePreference) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* ignore quota / private mode */
    }
    setIsOverridden(true);
    setThemeState(next);
    applyTheme(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [setTheme, theme]);

  return (
    <ThemeContext.Provider
      value={{ theme, isOverridden, setTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}

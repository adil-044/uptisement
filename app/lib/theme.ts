export const THEME_STORAGE_KEY = "theme";

export type ThemePreference = "light" | "dark";

export function resolveTheme(
  stored: string | null,
  prefersLight: boolean,
): ThemePreference {
  if (stored === "light" || stored === "dark") return stored;
  return prefersLight ? "light" : "dark";
}

export function themeColorFor(theme: ThemePreference): string {
  return theme === "light" ? "#FAFAFA" : "#050505";
}

/** Inline blocking script — keep in sync with ThemeProvider. */
export const THEME_BOOT_SCRIPT = `(function(){try{var k='theme';var s=localStorage.getItem(k);var light=window.matchMedia('(prefers-color-scheme: light)').matches;var t=(s==='light'||s==='dark')?s:(light?'light':'dark');document.documentElement.setAttribute('data-theme',t);var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',t==='light'?'#FAFAFA':'#050505');}catch(e){}})();`;

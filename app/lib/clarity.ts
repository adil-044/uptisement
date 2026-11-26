declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

/** Fire a Clarity custom event if the tag is loaded. */
export function clarityEvent(name: string) {
  try {
    if (typeof window !== "undefined" && typeof window.clarity === "function") {
      window.clarity("event", name);
    }
  } catch {
    /* ignore */
  }
}

/** Optional Clarity custom tag (e.g. page_type). */
export function claritySet(key: string, value: string) {
  try {
    if (typeof window !== "undefined" && typeof window.clarity === "function") {
      window.clarity("set", key, value);
    }
  } catch {
    /* ignore */
  }
}

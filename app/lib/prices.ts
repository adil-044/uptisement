/**
 * Single source for publishable prices.
 * Only websites-from-$300, hosting $30/mo, and Free demo are concrete.
 * Everything else uses STARTING_PRICE_LABEL until Adil confirms.
 */

export const WEBSITE_FROM = "Websites from $300";
export const WEBSITE_FROM_SHORT = "From $300";
export const HOSTING_MONTHLY = "Hosting & updates $30/mo";
export const HOSTING_MONTHLY_SHORT = "$30/mo";
export const FREE_DEMO = "Free demo";

/** Shown for every non-confirmed price. */
export const STARTING_PRICE_LABEL = "Starting price on a 15-min call";

// PRICE: confirm with Adil
export const AUTOMATION_PRICE = STARTING_PRICE_LABEL;

// PRICE: confirm with Adil
export const BUNDLE_PRICE = STARTING_PRICE_LABEL;

// PRICE: confirm with Adil
export const CONSULTING_PRICE = STARTING_PRICE_LABEL;

export type PriceKey =
  | "website"
  | "hosting"
  | "freeDemo"
  | "automation"
  | "bundle"
  | "consulting";

export function priceLabel(key: PriceKey): string {
  switch (key) {
    case "website":
      return WEBSITE_FROM;
    case "hosting":
      return HOSTING_MONTHLY;
    case "freeDemo":
      return FREE_DEMO;
    case "automation":
      return AUTOMATION_PRICE;
    case "bundle":
      return BUNDLE_PRICE;
    case "consulting":
      return CONSULTING_PRICE;
  }
}

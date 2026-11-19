import { priceLabel, type PriceKey } from "@/app/lib/prices";

export function PriceTag({
  priceKey,
  label,
  className = "font-display text-2xl font-bold",
}: {
  priceKey?: PriceKey;
  label?: string;
  className?: string;
}) {
  const text = label ?? (priceKey ? priceLabel(priceKey) : "");
  return <p className={className}>{text}</p>;
}

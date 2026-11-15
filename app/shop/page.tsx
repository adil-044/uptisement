import type { Metadata } from "next";
import { ClientRedirect } from "../components/ClientRedirect";

export const metadata: Metadata = {
  title: "Shop",
  robots: { index: false },
};

export default function ShopRedirectPage() {
  return <ClientRedirect href="/#how" />;
}

import type { Metadata } from "next";
import { ClientRedirect } from "../components/ClientRedirect";

export const metadata: Metadata = {
  title: "Offer",
  robots: { index: false },
};

export default function OfferRedirectPage() {
  return <ClientRedirect href="/pricing/" />;
}

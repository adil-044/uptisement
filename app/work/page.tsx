import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookLink } from "../components/BookLink";
import { CTA } from "../components/CTA";
import { WORK_DISCLAIMER, WORK_ITEMS, type WorkItem } from "../lib/work";

export const metadata: Metadata = {
  title: "Work — Client sites, demos & pitch concepts",
  description:
    "Real client sites plus honestly labelled demo builds and pitch concepts for Ontario trades and local businesses.",
  alternates: { canonical: "/work/" },
};

function WorkCardBody({ item }: { item: WorkItem }) {
  return (
    <>
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-paper-warm)]">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`object-cover object-top ${item.offline ? "opacity-80" : "transition duration-500 group-hover:scale-[1.03]"}`}
        />
      </div>
      <div className="mt-3">
        <span className="label-pill" data-kind={item.label}>
          {item.label}
        </span>
        <h3 className="mt-2 text-xl">{item.title}</h3>
        <p className="mt-1 text-sm text-[var(--color-muted)]">{item.subline}</p>
        {item.offline && (
          <p className="mt-1 text-xs font-semibold text-[var(--color-muted)]">Site offline</p>
        )}
      </div>
    </>
  );
}

function WorkGrid({
  items,
  heading,
}: {
  items: typeof WORK_ITEMS;
  heading: string;
}) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl md:text-3xl">{heading}</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const className = "group block focus-visible:outline-offset-4";

          if (item.offline || !item.href) {
            return (
              <div key={item.title} className={className} aria-label={`${item.title} — site offline`}>
                <WorkCardBody item={item} />
              </div>
            );
          }

          if (item.external || item.href.startsWith("http") || item.href.endsWith(".html")) {
            return (
              <a
                key={item.title}
                href={item.href}
                className={className}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
              >
                <WorkCardBody item={item} />
              </a>
            );
          }

          return (
            <Link key={item.title} href={item.href} className={className}>
              <WorkCardBody item={item} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default function WorkPage() {
  const clients = WORK_ITEMS.filter((w) => w.group === "client");
  const trades = WORK_ITEMS.filter((w) => w.group === "trades");
  const other = WORK_ITEMS.filter((w) => w.group === "other");

  return (
    <div className="pt-28">
      <div className="container-x section !pt-0">
        <p className="eyebrow">Portfolio</p>
        <h1 className="mt-3 text-4xl md:text-6xl">Work</h1>
        <p className="section-lede">{WORK_DISCLAIMER}</p>
        <div className="mt-6">
          <BookLink>Book a 15-min call</BookLink>
        </div>

        <WorkGrid items={clients} heading="Client sites" />
        <WorkGrid items={trades} heading="Trades demos & concepts" />
        <WorkGrid items={other} heading="Other local businesses" />
      </div>
      <CTA />
    </div>
  );
}

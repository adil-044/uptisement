export type WorkLabel =
  | "Client site"
  | "Pitch concept"
  | "Demo build"
  | "Interactive demo (simulated)";

export type WorkItem = {
  title: string;
  label: WorkLabel;
  subline: string;
  href: string;
  image: string;
  imageAlt: string;
  external?: boolean;
  group: "client" | "trades" | "other";
};

export const WORK_DISCLAIMER =
  "Client sites are live projects built for paying clients. Pitch concepts are unsolicited redesigns for real businesses that did not commission them. Demo builds and interactive demos are fictional or simulated — no real SMS or AI is running.";

export const WORK_ITEMS: WorkItem[] = [
  {
    title: "Chocor",
    label: "Client site",
    subline: "Live client site built by Adil",
    href: "https://chocor.com",
    image: "/work/chocor.jpg",
    imageAlt: "Chocor client site",
    external: true,
    group: "client",
  },
  {
    title: "RHR Tax",
    label: "Client site",
    subline: "Live client site — tax and accounting",
    href: "https://rhrtax.ca",
    image: "/work/rhrtax.jpg",
    imageAlt: "Screenshot of the rhrtax.ca client website",
    external: true,
    group: "client",
  },
  {
    title: "Emergency HVAC",
    label: "Pitch concept",
    subline: "Redesign concept: urgency + book-first layout",
    href: "https://adil-044.github.io/emergency-hvac-ottawa/",
    image:
      "https://images.pexels.com/photos/5463575/pexels-photo-5463575.jpeg?auto=compress&cs=tinysrgb&w=900",
    imageAlt: "HVAC technician on a call-out",
    external: true,
    group: "trades",
  },
  {
    title: "Trade roofing",
    label: "Demo build",
    subline: 'Fictional roofer: "Leak today? Crew today." booking path',
    href: "/demos/roofing.html",
    image:
      "https://images.pexels.com/photos/32050401/pexels-photo-32050401.jpeg?auto=compress&cs=tinysrgb&w=900",
    imageAlt: "Roofers on a residential job",
    group: "trades",
  },
  {
    title: "Boiler / hydronic",
    label: "Demo build",
    subline: "Fictional heating co: no-heat urgency layout",
    href: "/demos/boiler.html",
    image:
      "https://images.pexels.com/photos/7859953/pexels-photo-7859953.jpeg?auto=compress&cs=tinysrgb&w=900",
    imageAlt: "Technician working on heating equipment",
    group: "trades",
  },
  {
    title: "Missed-call SMS",
    label: "Interactive demo (simulated)",
    subline: "See the text-back fire",
    href: "/demos/sms.html",
    image:
      "https://images.pexels.com/photos/3943951/pexels-photo-3943951.jpeg?auto=compress&cs=tinysrgb&w=900",
    imageAlt: "Phone in hand for follow-up texts",
    group: "trades",
  },
  {
    title: "Quote estimator",
    label: "Interactive demo (simulated)",
    subline: "Job notes in, rough range out, you approve",
    href: "/demos/estimator.html",
    image:
      "https://images.pexels.com/photos/16243258/pexels-photo-16243258.jpeg?auto=compress&cs=tinysrgb&w=900",
    imageAlt: "Workshop tools for quote estimating",
    group: "trades",
  },
  {
    title: "Hot-lead CRM",
    label: "Interactive demo (simulated)",
    subline: "New → Warm → Booked board",
    href: "/demos/crm.html",
    image:
      "https://images.pexels.com/photos/19432567/pexels-photo-19432567.jpeg?auto=compress&cs=tinysrgb&w=900",
    imageAlt: "Lead pipeline board concept",
    group: "trades",
  },
  {
    title: "Book above the fold",
    label: "Demo build",
    subline: "Calendar or call on screen one",
    href: "/demos/book-fold.html",
    image:
      "https://images.pexels.com/photos/8488061/pexels-photo-8488061.jpeg?auto=compress&cs=tinysrgb&w=900",
    imageAlt: "Booking path above the fold concept",
    group: "trades",
  },
  {
    title: "Saco Hair",
    label: "Pitch concept",
    subline: "Salon redesign concept",
    href: "https://adil-044.github.io/saco-hair-ottawa/",
    image:
      "https://images.pexels.com/photos/7750144/pexels-photo-7750144.jpeg?auto=compress&cs=tinysrgb&w=700",
    imageAlt: "Salon chair redesign concept",
    external: true,
    group: "other",
  },
  {
    title: "Magnolia Spa",
    label: "Pitch concept",
    subline: "Spa redesign concept",
    href: "https://adil-044.github.io/magnolia-spa-ottawa/",
    image:
      "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=700",
    imageAlt: "Spa atmosphere redesign concept",
    external: true,
    group: "other",
  },
  {
    title: "Glorious Nails",
    label: "Pitch concept",
    subline: "Nail studio redesign concept",
    href: "https://adil-044.github.io/glorious-nails-ottawa/",
    image:
      "https://images.pexels.com/photos/3992850/pexels-photo-3992850.jpeg?auto=compress&cs=tinysrgb&w=700",
    imageAlt: "Nail studio redesign concept",
    external: true,
    group: "other",
  },
  {
    title: "Beau More",
    label: "Pitch concept",
    subline: "Nail spa redesign concept",
    href: "https://adil-044.github.io/beaumore-demo/",
    image:
      "https://images.pexels.com/photos/34885844/pexels-photo-34885844.jpeg?auto=compress&cs=tinysrgb&w=700",
    imageAlt: "Nail spa redesign concept",
    external: true,
    group: "other",
  },
  {
    title: "John A",
    label: "Pitch concept",
    subline: "Barbershop redesign concept",
    href: "https://adil-044.github.io/john-a-atelier/",
    image:
      "https://images.pexels.com/photos/18503604/pexels-photo-18503604.jpeg?auto=compress&cs=tinysrgb&w=700",
    imageAlt: "Barbershop redesign concept",
    external: true,
    group: "other",
  },
  {
    title: "OG Barbershop",
    label: "Pitch concept",
    subline: "Barbershop booking concept",
    href: "https://adil-044.github.io/og-barbershop-demo/",
    image:
      "https://images.pexels.com/photos/12074386/pexels-photo-12074386.jpeg?auto=compress&cs=tinysrgb&w=700",
    imageAlt: "Barbershop booking concept",
    external: true,
    group: "other",
  },
];

export const TRADES = [
  "HVAC",
  "Roofing",
  "Plumbing",
  "Electrical",
  "Landscaping",
  "General contracting",
  "Renovations",
  "Cleaning",
  "Auto service",
  "Local retail",
];

/**
 * Shared demo lead board state — A1 / A5 feed into A7.
 * Module-level store so demos on the same page can sync without a heavy provider.
 */

export type DemoLeadStage = "new" | "warm" | "booked";

export type DemoLead = {
  id: string;
  name: string;
  source: "text-back" | "ig-dm" | "seed";
  stage: DemoLeadStage;
  note?: string;
};

type Listener = () => void;

const SEED: DemoLead[] = [
  { id: "seed-1", name: "Alex (furnace)", source: "seed", stage: "new" },
  { id: "seed-2", name: "Sam (gutter)", source: "seed", stage: "warm" },
];

let leads: DemoLead[] = [...SEED];
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((l) => l());
}

export function getDemoLeads(): DemoLead[] {
  return leads.map((l) => ({ ...l }));
}

export function subscribeDemoLeads(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function upsertDemoLead(lead: Omit<DemoLead, "stage"> & { stage?: DemoLeadStage }) {
  const existing = leads.find((l) => l.id === lead.id);
  if (existing) {
    Object.assign(existing, lead);
  } else {
    leads = [{ ...lead, stage: lead.stage ?? "new" }, ...leads];
  }
  emit();
}

export function advanceDemoLead(id: string) {
  const order: DemoLeadStage[] = ["new", "warm", "booked"];
  const lead = leads.find((l) => l.id === id);
  if (!lead) return;
  const i = order.indexOf(lead.stage);
  if (i < order.length - 1) {
    lead.stage = order[i + 1];
    emit();
  }
}

export function resetDemoLeads() {
  leads = SEED.map((l) => ({ ...l }));
  emit();
}

export const DEMO_BANNER =
  "Interactive demo (simulated): no real SMS, call or AI runs";

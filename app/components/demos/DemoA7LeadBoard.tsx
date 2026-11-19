"use client";

import { LayoutGroup, m, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import {
  advanceDemoLead,
  getDemoLeads,
  resetDemoLeads,
  subscribeDemoLeads,
  type DemoLead,
  type DemoLeadStage,
} from "@/app/lib/demo-state";
import { DemoFrame } from "../DemoFrame";

const STAGES: { id: DemoLeadStage; label: string }[] = [
  { id: "new", label: "New" },
  { id: "warm", label: "Warm" },
  { id: "booked", label: "Booked" },
];

const STORYBOARD = [
  { title: "1 · New", detail: "Lead lands from text-back or DM." },
  { title: "2 · Warm", detail: "Tap to advance." },
  { title: "3 · Booked", detail: "Mint column — job caught." },
];

export function DemoA7LeadBoard() {
  const [leads, setLeads] = useState<DemoLead[]>(() => getDemoLeads());
  const reduce = useReducedMotion();

  useEffect(() => subscribeDemoLeads(() => setLeads(getDemoLeads())), []);

  return (
    <DemoFrame
      title="Hot-lead board"
      storyboard={STORYBOARD}
      onReplay={() => resetDemoLeads()}
      id="lead-board"
    >
      <p className="mb-3 text-sm text-[var(--color-muted)]">
        Leads from the text-back and IG DM demos land here. Tap a card to advance.
      </p>
      <LayoutGroup id="lead-board">
        <div className="grid gap-3 sm:grid-cols-3">
          {STAGES.map((stage) => (
            <div
              key={stage.id}
              className={`rounded-md p-3 ${
                stage.id === "booked"
                  ? "bg-[color-mix(in_srgb,var(--color-mint)_14%,white)]"
                  : "bg-white border border-[var(--color-line)]"
              }`}
            >
              <h4 className="font-display text-sm font-bold uppercase tracking-wide">
                {stage.label}
              </h4>
              <ul className="mt-2 space-y-2 min-h-[3rem]">
                {leads
                  .filter((l) => l.stage === stage.id)
                  .map((lead) => (
                    <li key={lead.id}>
                      <m.button
                        type="button"
                        layout={!reduce}
                        layoutId={reduce ? undefined : `lead-${lead.id}`}
                        transition={
                          reduce
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 360, damping: 28 }
                        }
                        whileHover={reduce ? undefined : { scale: 1.02 }}
                        whileTap={reduce ? undefined : { scale: 0.98 }}
                        className="w-full rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-2.5 py-2 text-left text-sm"
                        onClick={() => advanceDemoLead(lead.id)}
                      >
                        <span className="font-semibold">{lead.name}</span>
                        <span className="mt-0.5 block text-xs text-[var(--color-muted)]">
                          {lead.source}
                          {lead.note ? ` · ${lead.note}` : ""}
                        </span>
                      </m.button>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </LayoutGroup>
    </DemoFrame>
  );
}

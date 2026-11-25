"use client";

import { useState, type FormEvent } from "react";
import { BOOK_URL, FORM_SUBJECT, FORM_SUBMIT_URL } from "@/app/lib/config";

const BUSINESS_TYPES = [
  "HVAC",
  "Plumbing",
  "Salon",
  "Spa",
  "Barber",
  "Dental",
  "Other",
] as const;

type Status = "idle" | "submitting" | "success" | "error";

type Props = {
  id?: string;
  /** Compact spacing for hero placement */
  compact?: boolean;
};

/**
 * Claim-your-free-demo form. Does not animate.
 * Submits via FormSubmit AJAX. Agents must not POST test entries.
 */
export function DemoForm({ id = "demo-form", compact = false }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch(FORM_SUBMIT_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: data,
      });

      if (!res.ok) {
        throw new Error(`Submit failed (${res.status})`);
      }

      const json = (await res.json().catch(() => null)) as
        | { success?: boolean; message?: string }
        | null;

      if (json && json.success === false) {
        throw new Error(json.message || "Submit failed");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? "Something went wrong. Email sales@uptisement.com or book a call."
          : "Something went wrong. Email sales@uptisement.com or book a call.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className="form-panel"
        role="status"
        aria-live="polite"
        id={id}
      >
        <p className="font-display text-xl font-bold text-[var(--color-mint)]">
          Got it. Your demo lands in your inbox within 24 hours.
        </p>
        <p className={`text-sm text-[color-mix(in_srgb,white_70%,transparent)] ${compact ? "mt-2" : "mt-3"}`}>
          Rather talk first?{" "}
          <a
            href={BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-book
            className="font-semibold text-[var(--color-mint)] underline underline-offset-2"
          >
            Book a 15-min call →
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      id={id}
      className={`form-panel grid ${compact ? "gap-3" : "gap-3.5"}`}
      onSubmit={onSubmit}
      noValidate={false}
    >
      <h2 className="font-display text-xl font-bold tracking-tight text-white">
        Claim your free demo
      </h2>

      <input type="hidden" name="_subject" value={FORM_SUBJECT} />
      <input type="hidden" name="_template" value="table" />
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="form-field">
        <label htmlFor={`${id}-business`}>Business name</label>
        <input
          id={`${id}-business`}
          name="business_name"
          type="text"
          required
          autoComplete="organization"
        />
      </div>

      <div className="form-field">
        <label htmlFor={`${id}-type`}>Type of business</label>
        <select id={`${id}-type`} name="business_type" required defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          {BUSINESS_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor={`${id}-city`}>City</label>
        <input
          id={`${id}-city`}
          name="city"
          type="text"
          required
          autoComplete="address-level2"
        />
      </div>

      <div className="form-field">
        <label htmlFor={`${id}-website`}>
          Current website <span className="font-normal opacity-70">(optional)</span>
        </label>
        <input
          id={`${id}-website`}
          name="website"
          type="url"
          inputMode="url"
          placeholder="https://"
          autoComplete="url"
        />
      </div>

      <div className="form-field">
        <label htmlFor={`${id}-name`}>Your name</label>
        <input
          id={`${id}-name`}
          name="name"
          type="text"
          required
          autoComplete="name"
        />
      </div>

      <div className="form-field">
        <label htmlFor={`${id}-email`}>Email</label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>

      <button
        type="submit"
        className="btn btn-mint w-full"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : "Claim my free demo"}
      </button>

      <p className="text-center text-sm text-[color-mix(in_srgb,white_68%,transparent)]">
        Free. No obligation. From $300 if you love it.
      </p>

      <p className="text-center text-sm">
        <a
          href={BOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-book
          className="font-semibold text-[var(--color-mint)] underline underline-offset-2"
        >
          Rather talk first? Book a 15-min call →
        </a>
      </p>

      {status === "error" ? (
        <p className="text-sm text-[#ffb199]" role="alert">
          {errorMsg}
        </p>
      ) : null}
    </form>
  );
}

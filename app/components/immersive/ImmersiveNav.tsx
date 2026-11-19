"use client";

import Link from "next/link";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useId, useState } from "react";
import { BOOK_URL } from "@/app/lib/config";

const LINKS: { href: string; label: string; time: string }[] = [
  { href: "/", label: "Home", time: "7:04 PM" },
  { href: "/automations/", label: "Automations", time: "7:05 PM" },
  { href: "/work/", label: "Work", time: "7:07 PM" },
  { href: "/pricing/", label: "Pricing", time: "7:10 PM" },
  { href: "/about/", label: "About", time: "7:12 PM" },
];

type Props = {
  pillLabel: string;
};

export function ImmersiveNav({ pillLabel }: Props) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="immersive-nav">
        <a
          href={BOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="immersive-nav__pill"
          data-cursor="circle"
          data-book
        >
          <span className="immersive-nav__pill-label">{pillLabel}</span>
        </a>

        <div className="immersive-nav__menu-wrap">
          <span className="immersive-nav__menu-label font-mono">MENU</span>
          <button
            type="button"
            className="immersive-nav__burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden className={`immersive-nav__burger-icon${open ? " is-open" : ""}`}>
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <m.div
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="immersive-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className="immersive-menu__scrim"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <m.div
              className="immersive-menu__card"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <nav aria-label="Site">
                <ul className="immersive-menu__list">
                  {LINKS.map((item, i) => (
                    <li key={item.href} className="immersive-menu__item">
                      <div className="immersive-menu__mask">
                        <m.div
                          initial={{ y: "110%" }}
                          animate={{ y: "0%" }}
                          transition={{
                            duration: 0.45,
                            delay: 0.04 + i * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <Link
                            href={item.href}
                            className="immersive-menu__link"
                            onClick={() => setOpen(false)}
                          >
                            <span>{item.label}</span>
                            <span className="immersive-menu__time font-mono">{item.time}</span>
                          </Link>
                        </m.div>
                      </div>
                    </li>
                  ))}
                </ul>
              </nav>
              <a
                href={BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="immersive-menu__cta"
                data-cursor="circle"
                data-book
                onClick={() => setOpen(false)}
              >
                Book a free 15-min call →
              </a>
            </m.div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

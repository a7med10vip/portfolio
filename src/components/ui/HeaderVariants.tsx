"use client";

/* Five candidate headers, all built from the hero's vocabulary: floating
   capsules, the teal gradient, circular badges and the eye mark.
   Rendered side by side at /header-lab so one can be picked. */

import { useEffect, useState } from "react";
import { DISPLAY, EYE_MASK, G_BADGE, G_PILL, INK, MINT, NAV_LINKS, TEAL } from "./brand";

/* eslint-disable @next/next/no-img-element */

const POD = {
  background: "rgba(255,255,255,0.82)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(0,0,0,0.07)",
  boxShadow: "0 2px 18px rgba(4,50,58,0.07)",
  borderRadius: 9999,
} as const;

const linkBase =
  "px-4 py-2 rounded-full text-[13px] font-medium transition-colors duration-200 whitespace-nowrap";

function Links({ tone = "light", active }: { tone?: "light" | "dark"; active?: string }) {
  return (
    <div className="flex items-center gap-0.5">
      {NAV_LINKS.map((l) => {
        const isActive = active === l.label;
        return (
          <a
            key={l.label}
            href={l.href}
            className={linkBase}
            style={{
              color: isActive
                ? tone === "dark"
                  ? TEAL
                  : TEAL
                : tone === "dark"
                  ? "rgba(255,255,255,0.78)"
                  : "rgba(0,0,0,0.55)",
              background: isActive ? (tone === "dark" ? "#fff" : MINT) : "transparent",
              fontWeight: isActive ? 700 : 500,
            }}
          >
            {l.label}
          </a>
        );
      })}
    </div>
  );
}

function ArChip({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <a
      href="/ar"
      title="العربية"
      className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-[12px] font-bold transition-transform duration-200 hover:-translate-y-0.5"
      style={{
        background: tone === "dark" ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.05)",
        color: tone === "dark" ? "#fff" : "#0A0A0A",
        border: `1px solid ${tone === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.06)"}`,
      }}
    >
      <img src="/flags/sa.svg" alt="" width={18} height={18} style={{ borderRadius: "50%" }} />
      AR
    </a>
  );
}

function Wordmark({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <a href="#" className="heading text-lg" style={{ color: tone === "dark" ? "#fff" : "#0A0A0A" }}>
      Ahmed<span style={{ color: tone === "dark" ? MINT : TEAL }}>.</span>
    </a>
  );
}

/* ─────────────── 1 · Split Pods ─────────────── */

export function HeaderSplitPods({ active }: { active?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div style={{ ...POD, padding: "10px 22px" }}>
        <Wordmark />
      </div>

      <div style={{ ...POD, padding: "6px 8px" }}>
        <Links active={active} />
      </div>

      <div style={{ ...POD, padding: "6px" }} className="flex items-center gap-1.5">
        <ArChip />
        <a
          href="#contact"
          className="inline-flex items-center h-9 px-5 rounded-full text-[13px] font-bold transition-transform duration-200 hover:-translate-y-0.5"
          style={{ background: MINT, color: TEAL, border: `2px solid ${TEAL}`, boxShadow: `3px 3px 0 0 ${TEAL}` }}
        >
          Let&apos;s Talk
        </a>
      </div>
    </div>
  );
}

/* ─────────────── 2 · Eye CTA ─────────────── */

export function HeaderEyeCta({ active }: { active?: string }) {
  return (
    <nav style={{ ...POD, padding: "6px 34px 6px 20px" }} className="relative">
      <div className="flex items-center gap-1">
        <Wordmark />
        <span className="w-4" />
        <Links active={active} />
        <ArChip />

        {/* the hero's pill-plus-badge, shrunk to CTA size */}
        <span className="relative inline-flex items-center ml-2" style={{ paddingRight: 26 }}>
          <a
            href="#contact"
            className="inline-flex items-center h-9 pl-5 pr-7 rounded-full text-[13px] font-bold text-white transition-transform duration-200 hover:-translate-y-0.5"
            style={{ background: G_PILL, boxShadow: "0 6px 16px rgba(0,77,90,0.28)" }}
          >
            Let&apos;s Talk
          </a>
          <span
            className="absolute pointer-events-none flex items-center justify-center rounded-full"
            style={{
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              width: 44,
              height: 44,
              background: "#fff",
              boxShadow: "0 6px 14px rgba(4,50,58,0.16)",
            }}
          >
            <span style={{ width: 26, height: 14, background: G_BADGE, display: "block", ...EYE_MASK }} />
          </span>
        </span>
      </div>
    </nav>
  );
}

/* ─────────────── 3 · Inverted Bar ─────────────── */

export function HeaderInverted({ active }: { active?: string }) {
  return (
    <nav
      className="rounded-full"
      style={{ background: G_PILL, padding: "6px 6px 6px 22px", boxShadow: "0 10px 30px rgba(0,77,90,0.28)" }}
    >
      <div className="flex items-center gap-1">
        <Wordmark tone="dark" />
        <span className="w-4" />
        <Links tone="dark" active={active} />
        <ArChip tone="dark" />
        <a
          href="#contact"
          className="inline-flex items-center h-9 px-5 rounded-full text-[13px] font-bold ml-1 transition-transform duration-200 hover:-translate-y-0.5"
          style={{ background: "#fff", color: TEAL }}
        >
          Let&apos;s Talk
        </a>
      </div>
    </nav>
  );
}

/* ─────────────── 4 · Morph Dock ─────────────── */

export function HeaderMorphDock({ active, forceScrolled }: { active?: string; forceScrolled?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const isDocked = forceScrolled ?? scrolled;

  useEffect(() => {
    if (forceScrolled !== undefined) return;
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [forceScrolled]);

  return (
    <nav
      className="transition-all duration-500 ease-out"
      style={{
        width: isDocked ? "auto" : "100%",
        maxWidth: isDocked ? undefined : 1240,
        background: isDocked ? "rgba(255,255,255,0.88)" : "transparent",
        backdropFilter: isDocked ? "blur(20px)" : "none",
        WebkitBackdropFilter: isDocked ? "blur(20px)" : "none",
        border: `1px solid ${isDocked ? "rgba(0,0,0,0.07)" : "transparent"}`,
        boxShadow: isDocked ? "0 6px 26px rgba(4,50,58,0.10)" : "none",
        borderRadius: 9999,
        padding: isDocked ? "6px 6px 6px 20px" : "6px 4px",
      }}
    >
      <div className="flex items-center justify-between gap-1">
        <Wordmark />
        <div className="flex items-center gap-0.5">
          {NAV_LINKS.map((l) => {
            const isActive = active === l.label;
            return (
              <a
                key={l.label}
                href={l.href}
                className="relative px-4 py-2 text-[13px] font-medium transition-colors duration-200"
                style={{ color: isActive ? TEAL : "rgba(0,0,0,0.58)", fontWeight: isActive ? 700 : 500 }}
              >
                {l.label}
                <span
                  className="absolute left-1/2 -translate-x-1/2 rounded-full transition-all duration-300"
                  style={{
                    bottom: 0,
                    width: isActive ? 5 : 0,
                    height: 5,
                    background: TEAL,
                  }}
                />
              </a>
            );
          })}
        </div>
        <div className="flex items-center gap-1.5">
          <ArChip />
          <a
            href="#contact"
            className="inline-flex items-center h-9 px-5 rounded-full text-[13px] font-bold transition-transform duration-200 hover:-translate-y-0.5"
            style={{ background: TEAL, color: "#fff" }}
          >
            Let&apos;s Talk
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ─────────────── 5 · Brand Mark + Status ─────────────── */

export function HeaderBrandMark({ active }: { active?: string }) {
  return (
    <nav style={{ ...POD, padding: "6px 6px 6px 8px" }}>
      <div className="flex items-center gap-1">
        <a href="#" className="flex items-center gap-2.5 pr-3">
          <span
            className="flex items-center justify-center rounded-full"
            style={{ width: 38, height: 38, background: G_PILL }}
          >
            <span style={{ width: 22, height: 12, background: "#fff", display: "block", ...EYE_MASK }} />
          </span>
          <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 19, color: INK, letterSpacing: "0.01em" }}>
            Ahmed
          </span>
        </a>

        <Links active={active} />

        <span
          className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-[12px] font-bold ml-1"
          style={{ background: MINT, color: TEAL }}
        >
          <span className="relative flex" style={{ width: 7, height: 7 }}>
            <span
              className="absolute inset-0 rounded-full"
              style={{ background: "#00A99B", animation: "hdr-ping 1.8s ease-out infinite" }}
            />
            <span className="relative rounded-full" style={{ width: 7, height: 7, background: "#00A99B" }} />
          </span>
          Open to work
        </span>

        <ArChip />
        <a
          href="#contact"
          className="inline-flex items-center h-9 px-5 rounded-full text-[13px] font-bold ml-1 transition-transform duration-200 hover:-translate-y-0.5"
          style={{ background: TEAL, color: "#fff" }}
        >
          Let&apos;s Talk
        </a>
      </div>

      <style>{`@keyframes hdr-ping { 0% { transform: scale(1); opacity: 0.8 } 80%,100% { transform: scale(2.4); opacity: 0 } }`}</style>
    </nav>
  );
}

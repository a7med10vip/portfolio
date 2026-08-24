"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SECTIONS } from "@/app/soueast-delivery/data";
import { G, D, LINE, MONO } from "./theme";

/** Deep targets the palette can reach that are not whole sections. */
const DEEP = [
  { id: "s05", label: "The S09 turntable", hint: "72 frames, drag it" },
  { id: "s09", label: "What a salesperson cannot see", hint: "stock:read without stock:price" },
  { id: "s07", label: "reserve_unit()", hint: "one function, two doors" },
  { id: "s12", label: "How every number was counted", hint: "the commands" },
];

export default function DeliveryNav() {
  const [active, setActive] = useState("s01");
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [hint, setHint] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Which section is being read. The band is deliberately narrow and off-centre:
     a section counts as active once its top third is above the middle of the
     viewport, which is where a reader's eye actually is. */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? window.scrollY / h : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* The tour the sibling decks run on first visit, reduced to one line. Nobody
     wants fifteen steps; they want to be told the shortcut exists. */
  useEffect(() => {
    if (typeof localStorage === "undefined") return;
    if (localStorage.getItem("sd-hint-v1")) return;
    const t = window.setTimeout(() => setHint(true), 4200);
    const t2 = window.setTimeout(() => {
      setHint(false);
      localStorage.setItem("sd-hint-v1", "1");
    }, 13000);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(t2);
    };
  }, []);

  const results = useMemo(() => {
    const all = [
      ...SECTIONS.map((s) => ({ id: s.id, n: s.n, label: s.label, hint: s.desc, deep: false })),
      ...DEEP.map((d) => ({ id: d.id, n: "→", label: d.label, hint: d.hint, deep: true })),
    ];
    if (!q.trim()) return all;
    const needle = q.toLowerCase().replace(/\s+/g, "");
    /* Subsequence match, so "rtatl" finds "The route atlas". */
    const hit = (s: string) => {
      const h = s.toLowerCase();
      let i = 0;
      for (const ch of needle) {
        i = h.indexOf(ch, i);
        if (i === -1) return false;
        i++;
      }
      return true;
    };
    return all.filter((r) => hit(r.label + r.hint));
  }, [q]);

  const jump = (id: string) => {
    setOpen(false);
    setHint(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = /input|textarea/i.test((e.target as HTMLElement)?.tagName ?? "");
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setOpen((o) => !o);
        setQ("");
        setSel(0);
        setHint(false);
        localStorage.setItem("sd-hint-v1", "1");
        return;
      }
      if (!open) {
        if (typing) return;
        const i = SECTIONS.findIndex((s) => s.id === active);
        if (e.key === "j") jump(SECTIONS[Math.min(i + 1, SECTIONS.length - 1)].id);
        if (e.key === "k") jump(SECTIONS[Math.max(i - 1, 0)].id);
        return;
      }
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSel((s) => Math.min(s + 1, results.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSel((s) => Math.max(s - 1, 0));
      }
      if (e.key === "Enter" && results[sel]) jump(results[sel].id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, sel, active]);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 30);
  }, [open]);

  const current = SECTIONS.find((s) => s.id === active) ?? SECTIONS[0];

  return (
    <>
      {/* ── the rail ──────────────────────────────────────────────────────── */}
      <div
        className="fixed top-0 left-0 right-0 z-[60]"
        style={{ background: "rgba(255,255,255,.86)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${RULEISH}` }}
      >
        <div className="flex items-center justify-between px-4 md:px-7" style={{ height: 46 }}>
          <div className="flex items-center gap-2.5 min-w-0">
            <img src="/soueast-delivery/brand/soueast-wordmark-brand.png" alt="Soueast" style={{ width: 104, height: "auto" }} />
            <span className="hidden sm:block" style={{ width: 1, height: 14, background: LINE }} />
            <span className="hidden sm:block text-[10px] font-bold" style={{ color: D }}>
              DELIVERY
            </span>
          </div>

          <button
            onClick={() => {
              setOpen(true);
              setQ("");
              setSel(0);
            }}
            className="flex items-center gap-2.5 min-w-0 px-3 py-1.5 rounded-full transition-colors"
            style={{ border: `1px solid ${LINE}`, background: "#fff" }}
          >
            <span className="text-[10.5px] font-bold tabular-nums" style={{ color: G, fontFamily: MONO }}>
              {current.n}
            </span>
            <span className="text-[11.5px] truncate" style={{ color: D, maxWidth: "38vw" }}>
              {current.label}
            </span>
            <span
              className="hidden md:block text-[9.5px] font-bold px-1.5 py-0.5 rounded"
              style={{ background: `${G}15`, color: G }}
            >
              ⌘K
            </span>
          </button>
        </div>
        <div style={{ height: 2, background: `${G}1A` }}>
          <div style={{ height: 2, width: `${progress * 100}%`, background: G, transition: "width .1s linear" }} />
        </div>
      </div>

      {/* ── the dot rail ──────────────────────────────────────────────────── */}
      <nav
        className="fixed left-0 top-1/2 -translate-y-1/2 z-[58] hidden xl:flex flex-col gap-2 pl-4 group"
        aria-label="Sections"
      >
        {SECTIONS.map((s) => {
          const on = s.id === active;
          return (
            <button
              key={s.id}
              onClick={() => jump(s.id)}
              className="flex items-center gap-2.5 h-3.5"
              title={s.label}
            >
              <span
                className="block rounded-full transition-all duration-300"
                style={{
                  width: on ? 22 : 9,
                  height: 3,
                  background: on ? G : `${D}20`,
                }}
              />
              <span
                className="text-[10.5px] whitespace-nowrap transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0"
                style={{ color: on ? G : D }}
              >
                {s.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* ── the hint ──────────────────────────────────────────────────────── */}
      {hint && !open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[62] flex items-center gap-2 px-4 py-2.5 rounded-full"
          style={{ background: "#fff", border: `1px solid ${G}40` }}
        >
          <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded" style={{ background: `${G}15`, color: G }}>
            ⌘K
          </span>
          <span className="text-[12px]" style={{ color: D }}>
            jump to any section
          </span>
        </button>
      )}

      {/* ── the palette ───────────────────────────────────────────────────── */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-[68]"
            style={{ background: "rgba(10,10,10,.45)", backdropFilter: "blur(8px)" }}
            onClick={() => setOpen(false)}
          />
          <div
            className="fixed z-[70] left-1/2 -translate-x-1/2"
            style={{
              top: "18vh",
              width: "min(560px, 92vw)",
              background: "#fff",
              borderRadius: 20,
              border: `1px solid ${LINE}`,
              overflow: "hidden",
            }}
            role="dialog"
            aria-label="Jump to a section"
          >
            <div className="flex items-center gap-3 px-5" style={{ height: 56, borderBottom: `1px solid ${RULEISH}` }}>
              <span style={{ color: G, fontSize: 15 }}>⌕</span>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setSel(0);
                }}
                placeholder="Jump to a section, or something inside one…"
                className="flex-1 outline-none text-[14px]"
                style={{ color: D, background: "transparent" }}
              />
              <span className="text-[9.5px] font-bold" style={{ color: D }}>
                ESC
              </span>
            </div>
            <div style={{ maxHeight: "46vh", overflowY: "auto" }}>
              {results.map((r, i) => (
                <button
                  key={`${r.id}-${r.label}`}
                  onClick={() => jump(r.id)}
                  onMouseEnter={() => setSel(i)}
                  className="w-full flex items-center gap-3.5 px-5 py-3 text-left"
                  style={{ background: i === sel ? `${G}0F` : "transparent" }}
                >
                  <span
                    className="text-[10.5px] font-bold tabular-nums w-5 shrink-0"
                    style={{ color: i === sel ? G : D, opacity: i === sel ? 1 : 0.25, fontFamily: MONO }}
                  >
                    {r.n}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13.5px] truncate" style={{ color: D }}>
                      {r.label}
                    </span>
                    <span className="block text-[11px] truncate" style={{ color: D }}>
                      {r.hint}
                    </span>
                  </span>
                  {r.deep && (
                    <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0" style={{ background: `${G}12`, color: G }}>
                      IN PAGE
                    </span>
                  )}
                </button>
              ))}
              {results.length === 0 && (
                <p className="px-5 py-8 text-center text-[12.5px]" style={{ color: D }}>
                  Nothing by that name.
                </p>
              )}
            </div>
            <div
              className="flex items-center gap-4 px-5 py-2.5 text-[10px]"
              style={{ borderTop: `1px solid ${RULEISH}`, color: D }}
            >
              <span>↑↓ move</span>
              <span>⏎ jump</span>
              <span className="hidden sm:inline">J / K step through sections</span>
            </div>
          </div>
        </>
      )}
    </>
  );
}

const RULEISH = "#F0F0F0";

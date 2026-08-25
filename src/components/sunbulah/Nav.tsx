"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SECTIONS } from "@/app/sunbulah/data";
import { S, D, LINE, MONO } from "./theme";

/** تنقّل بين الأقسام: شريط تقدّم أعلى الصفحة، ولوحة قفز على ⌘K. */
export default function Nav() {
  const [active, setActive] = useState("s01");
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
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

  const results = useMemo(() => {
    if (!q.trim()) return SECTIONS;
    const n = q.trim();
    return SECTIONS.filter((s) => (s.label + s.desc).includes(n));
  }, [q]);

  const jump = (id: string) => {
    setOpen(false);
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
        return;
      }
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, results.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
      if (e.key === "Enter" && results[sel]) jump(results[sel].id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, sel]);

  useEffect(() => { if (open) window.setTimeout(() => inputRef.current?.focus(), 30); }, [open]);

  const current = SECTIONS.find((s) => s.id === active) ?? SECTIONS[0];

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-[60]"
        style={{ background: "rgba(255,255,255,.9)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${LINE}` }}
      >
        <div className="flex items-center justify-between px-4 md:px-7" style={{ height: 48 }}>
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="heading text-[14px]" style={{ color: D }}>مجموعة السنبلة</span>
            <span style={{ width: 1, height: 14, background: LINE }} />
            <span className="text-[11px]" style={{ color: S }}>تدقيق الحضور الرقمي</span>
          </div>
          <button
            onClick={() => { setOpen(true); setQ(""); setSel(0); }}
            className="flex items-center gap-2.5 min-w-0 px-3 py-1.5 rounded-full"
            style={{ border: `1px solid ${LINE}`, background: "#fff" }}
          >
            <span className="text-[12px] tabular-nums ltr" style={{ color: S, fontFamily: MONO }}>{current.n}</span>
            <span className="text-[11.5px] truncate" style={{ color: D, maxWidth: "40vw" }}>{current.label}</span>
            <span className="hidden md:block text-[11px] px-1.5 py-0.5 rounded ltr" style={{ background: `${S}18`, color: S }}>⌘K</span>
          </button>
        </div>
        <div style={{ height: 2, background: `${S}1F` }}>
          <div style={{ height: 2, width: `${progress * 100}%`, background: S, transition: "width .1s linear" }} />
        </div>
      </div>

      <nav className="fixed right-0 top-1/2 -translate-y-1/2 z-[58] hidden xl:flex flex-col gap-2 pr-4 group">
        {SECTIONS.map((s) => {
          const on = s.id === active;
          return (
            <button key={s.id} onClick={() => jump(s.id)} className="flex items-center gap-2.5 h-3.5 flex-row-reverse" title={s.label}>
              <span className="block rounded-full transition-all duration-300"
                style={{ width: on ? 22 : 9, height: 3, background: on ? S : `${D}22` }} />
              <span className="text-[12px] whitespace-nowrap transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                style={{ color: on ? S : D }}>{s.label}</span>
            </button>
          );
        })}
      </nav>

      {open && (
        <>
          <div className="fixed inset-0 z-[68]" style={{ background: "rgba(20,19,15,.5)", backdropFilter: "blur(8px)" }} onClick={() => setOpen(false)} />
          <div className="fixed z-[70] left-1/2 -translate-x-1/2" role="dialog"
            style={{ top: "18vh", width: "min(560px, 92vw)", background: "#fff", borderRadius: 20, border: `1px solid ${LINE}`, overflow: "hidden" }}>
            <div className="flex items-center gap-3 px-5" style={{ height: 56, borderBottom: `1px solid ${LINE}` }}>
              <span style={{ color: S, fontSize: 15 }}>⌕</span>
              <input ref={inputRef} value={q} onChange={(e) => { setQ(e.target.value); setSel(0); }}
                placeholder="اقفز إلى قسم…" className="flex-1 outline-none text-[14px]" style={{ color: D, background: "transparent" }} />
              <span className="text-[11px] ltr" style={{ color: D, opacity: .4 }}>ESC</span>
            </div>
            <div style={{ maxHeight: "48vh", overflowY: "auto" }}>
              {results.map((r, i) => (
                <button key={r.id} onClick={() => jump(r.id)} onMouseEnter={() => setSel(i)}
                  className="w-full flex items-center gap-3.5 px-5 py-3 text-right"
                  style={{ background: i === sel ? `${S}12` : "transparent" }}>
                  <span className="text-[12px] w-5 shrink-0 ltr" style={{ color: i === sel ? S : D, opacity: i === sel ? 1 : .35, fontFamily: MONO }}>{r.n}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13.5px] truncate" style={{ color: D }}>{r.label}</span>
                    <span className="block text-[11px] truncate" style={{ color: D, opacity: .45 }}>{r.desc}</span>
                  </span>
                  <span className="text-[10.5px] px-1.5 py-0.5 rounded shrink-0" style={{ background: r.part === "audit" ? `${S}12` : "#F3EFE6", color: r.part === "audit" ? S : D }}>
                    {r.part === "audit" ? "تدقيق" : "تصور"}
                  </span>
                </button>
              ))}
              {results.length === 0 && <p className="px-5 py-8 text-center text-[12.5px]" style={{ color: D, opacity: .4 }}>لا شيء بهذا الاسم.</p>}
            </div>
          </div>
        </>
      )}
    </>
  );
}

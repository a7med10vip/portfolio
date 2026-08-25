"use client";

import { useEffect, useRef, useState } from "react";
import { SECTIONS } from "@/app/sunbulah/data";
import { S, D, LINE } from "./theme";

const NAV_W = 246;

/** لون لكل قسم، يتتبعه المؤشر أثناء القراءة. */
const COLORS: Record<string, string> = {
  s01: "#A8842C", s02: "#B4231E", s03: "#2E7D32", s04: "#C2410C",
  s05: "#1F6F6B", s06: "#14130F", s07: "#7C6A3E", s08: "#8B5CF6",
  s09: "#A8842C", s10: "#B87333", s11: "#8C7A3F", s12: "#1F6F6B",
  s13: "#3B82F6", s14: "#7A5C3E",
};

/**
 * قائمة عائمة تُسحب إلى أي مكان في الشاشة، وتتذكر موضعها.
 *
 * الوثيقة طويلة وتُقرأ على مهل، والقائمة الثابتة في جانب واحد تحجب دائمًا شيئًا
 * يريد القارئ رؤيته. فتُترك له.
 */
export default function SunbulahNav() {
  const [active, setActive] = useState("s01");
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [hint, setHint] = useState(false);
  const offset = useRef<{ x: number; y: number } | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  /* الموضع الأول: يمين الشاشة ووسطها رأسيًا، ما لم يكن محفوظًا. */
  useEffect(() => {
    let initial: { x: number; y: number } | null = null;
    try {
      const saved = localStorage.getItem("sb-nav-pos");
      if (saved) initial = JSON.parse(saved);
    } catch {}
    const h = navRef.current?.offsetHeight ?? 480;
    if (!initial) initial = { x: window.innerWidth - NAV_W - 20, y: Math.max(72, window.innerHeight / 2 - h / 2) };
    initial.x = Math.max(8, Math.min(window.innerWidth - NAV_W - 8, initial.x));
    initial.y = Math.max(60, Math.min(window.innerHeight - h - 8, initial.y));
    setPos(initial);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    try { if (localStorage.getItem("sb-nav-hint") === "1") return; } catch {}
    const t = window.setTimeout(() => setHint(true), 2600);
    const t2 = window.setTimeout(() => {
      setHint(false);
      try { localStorage.setItem("sb-nav-hint", "1"); } catch {}
    }, 12000);
    return () => { window.clearTimeout(t); window.clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const move = (e: PointerEvent) => {
      if (!offset.current) return;
      const h = navRef.current?.offsetHeight ?? 480;
      setPos({
        x: Math.max(8, Math.min(window.innerWidth - NAV_W - 8, e.clientX - offset.current.x)),
        y: Math.max(60, Math.min(window.innerHeight - h - 8, e.clientY - offset.current.y)),
      });
    };
    const up = () => {
      setDragging(false);
      offset.current = null;
      setPos((p) => {
        if (p) { try { localStorage.setItem("sb-nav-pos", JSON.stringify(p)); } catch {} }
        return p;
      });
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
  }, [dragging]);

  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  if (!pos) return null;
  const audit = SECTIONS.filter((s) => s.part === "audit");
  const concept = SECTIONS.filter((s) => s.part === "concept");

  return (
    <>
      <aside
        ref={navRef as React.RefObject<HTMLElement>}
        dir="rtl"
        className="fixed z-[92] hidden lg:block select-none"
        style={{
          top: pos.y, left: pos.x, width: NAV_W,
          background: "#fff", border: `1px solid ${LINE}`, borderRadius: 18,
          boxShadow: `4px 4px 0 0 ${D}`, cursor: dragging ? "grabbing" : "default",
        }}
      >
        <header
          onPointerDown={(e) => {
            const r = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
            offset.current = { x: e.clientX - r.left, y: e.clientY - r.top };
            setDragging(true);
            setHint(false);
            try { localStorage.setItem("sb-nav-hint", "1"); } catch {}
          }}
          className="flex items-center gap-2.5 px-4 py-3"
          style={{ cursor: "grab", borderBottom: `1px solid ${LINE}` }}
        >
          <span className="grid place-items-center rounded-lg shrink-0" style={{ width: 26, height: 26, background: `${S}18` }}>
            <span style={{ width: 11, height: 11, borderRadius: 3, background: S }} />
          </span>
          <span className="flex-1 min-w-0">
            <span className="heading block text-[12.5px] truncate" style={{ color: D }}>أقسام الوثيقة</span>
            <span className="block text-[11px] truncate" style={{ color: D, opacity: .45 }}>اسحبني لأي مكان</span>
          </span>
          <button onClick={() => setCollapsed((c) => !c)} aria-label={collapsed ? "توسيع" : "طي"}
            className="text-[15px] leading-none px-1" style={{ color: D, opacity: .4 }}>
            {collapsed ? "+" : "−"}
          </button>
        </header>

        {!collapsed && (
          <nav className="py-2 max-h-[58vh] overflow-y-auto">
            <p className="text-[11px] px-4 pt-2 pb-1.5" style={{ color: D, opacity: .35 }}>التدقيق</p>
            {audit.map((s) => <Row key={s.id} s={s} active={active} onClick={jump} />)}
            <p className="text-[11px] px-4 pt-3 pb-1.5" style={{ color: D, opacity: .35 }}>التصور</p>
            {concept.map((s) => <Row key={s.id} s={s} active={active} onClick={jump} />)}
          </nav>
        )}
      </aside>

      {hint && (
        <div dir="rtl" className="fixed z-[93] hidden lg:block rounded-2xl px-4 py-3"
          style={{
            top: pos.y + 8, left: pos.x - 268, width: 250,
            background: D, color: "#fff", borderRadius: 16, boxShadow: `4px 4px 0 0 ${S}`,
          }}>
          <p className="heading text-[12.5px] mb-1.5">القائمة تتحرك معك</p>
          <p className="text-[11.5px] leading-loose" style={{ opacity: .75 }}>
            اسحب رأس القائمة وضعها في المكان الذي يناسبك أثناء القراءة. ستتذكر موضعها.
          </p>
        </div>
      )}

      {/* على الجوال: شريط تقدّم علوي فقط */}
      <MobileBar active={active} />
    </>
  );
}

function Row({ s, active, onClick }: { s: (typeof SECTIONS)[number]; active: string; onClick: (id: string) => void }) {
  const on = s.id === active;
  const c = COLORS[s.id] ?? S;
  return (
    <button onClick={() => onClick(s.id)}
      className="w-full flex items-center gap-2.5 px-4 py-2 text-right transition-colors"
      style={{ background: on ? `${c}12` : "transparent" }}>
      <span className="shrink-0 rounded-full transition-all"
        style={{ width: on ? 4 : 4, height: on ? 18 : 4, background: on ? c : `${D}22` }} />
      <span className="text-[10px] tabular-nums shrink-0" style={{ color: on ? c : D, opacity: on ? 1 : .3, direction: "ltr" }}>{s.n}</span>
      <span className="text-[12px] truncate flex-1" style={{ color: D, opacity: on ? 1 : .62 }}>{s.label}</span>
    </button>
  );
}

function MobileBar({ active }: { active: string }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const f = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? window.scrollY / h : 0);
    };
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  const cur = SECTIONS.find((s) => s.id === active) ?? SECTIONS[0];
  return (
    <div dir="rtl" className="fixed top-0 left-0 right-0 z-[92] lg:hidden"
      style={{ background: "rgba(255,255,255,.94)", backdropFilter: "blur(18px)", borderBottom: `1px solid ${LINE}` }}>
      <div className="flex items-center gap-2.5 px-4" style={{ height: 44 }}>
        <span className="text-[11px] tabular-nums" style={{ color: COLORS[cur.id] ?? S, direction: "ltr" }}>{cur.n}</span>
        <span className="text-[12.5px] truncate" style={{ color: D }}>{cur.label}</span>
      </div>
      <div style={{ height: 2, background: `${S}22` }}>
        <div style={{ height: 2, width: `${p * 100}%`, background: COLORS[cur.id] ?? S, transition: "width .1s linear" }} />
      </div>
    </div>
  );
}

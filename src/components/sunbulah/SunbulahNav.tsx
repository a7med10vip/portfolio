"use client";

import { useEffect, useRef, useState } from "react";
import { SECTIONS } from "@/app/sunbulah/data";
import { S, D, LINE } from "./theme";
import { FaWheatAwn, FaBars, FaXmark } from "react-icons/fa6";

const NAV_W = 246;

/** لون لكل قسم، يتتبعه المؤشر أثناء القراءة. */
const COLORS: Record<string, string> = {
  s01: "#004D5A", s02: "#B4231E", s03: "#8B5CF6", s04: "#00A99B",
  s05: "#C2410C", s06: "#0A0A0A", s07: "#004D5A", s08: "#00A99B",
  s09: "#8B5CF6" };

/**
 * قائمة عائمة تسحب إلى أي مكان في الشاشة وتتذكر موضعها.
 *
 * الوثيقة طويلة وتقرأ على مهل والقائمة الثابتة في جانب واحد تحجب دائما شيئا
 * يريد القارئ رؤيته. فتترك له.
 */
export default function SunbulahNav() {
  const [active, setActive] = useState("s01");
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [hint, setHint] = useState(false);
  const offset = useRef<{ x: number; y: number } | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  /* الموضع الأول: يمين الشاشة ووسطها رأسيا، ما لم يكن محفوظا. */
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
        y: Math.max(60, Math.min(window.innerHeight - h - 8, e.clientY - offset.current.y)) });
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

  return (
    <>
      <aside
        ref={navRef as React.RefObject<HTMLElement>}
        dir="rtl"
        className="fixed z-[92] hidden lg:block select-none"
        style={{
          top: pos.y, left: pos.x, width: NAV_W,
          background: "#fff", border: `1px solid ${LINE}`, borderRadius: 18, cursor: dragging ? "grabbing" : "default" }}
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
          <span className="grid place-items-center rounded-lg shrink-0" style={{ width: 28, height: 28, background: `${S}14` }}>
            <FaWheatAwn size={14} color={S} />
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
            {SECTIONS.map((s) => <Row key={s.id} s={s} active={active} onClick={jump} />)}
          </nav>
        )}
      </aside>

      {hint && (
        <div dir="rtl" className="fixed z-[93] hidden lg:block rounded-2xl px-4 py-3"
          style={{
            top: pos.y + 8, left: pos.x - 268, width: 250,
            background: D, color: "#fff", borderRadius: 16 }}>
          <p className="heading text-[12.5px] mb-1.5">القائمة تتحرك معك</p>
          <p className="text-[11.5px] leading-loose" style={{ opacity: .75 }}>
            اسحب رأس القائمة وضعها في المكان الذي يناسبك أثناء القراءة. ستتذكر موضعها.
          </p>
        </div>
      )}

      {/* على الجوال: شريط تقدم علوي فقط */}
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

/**
 * الجوال: شريط علوي يعرض القسم الحالي وتقدم القراءة، ويفتح قائمة كاملة عند
 * لمسه. القائمة العائمة على اليمين لا وجود لها هنا؛ فأر لا يوجد وإصبع لا
 * يسحب لوحة أثناء القراءة.
 */
function MobileBar({ active }: { active: string }) {
  const [p, setP] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const f = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? window.scrollY / h : 0);
    };
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  /* القائمة المفتوحة تمنع تمرير الصفحة تحتها. */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const cur = SECTIONS.find((s) => s.id === active) ?? SECTIONS[0];
  const colour = COLORS[cur.id] ?? S;

  const go = (id: string) => {
    setOpen(false);
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  };

  return (
    <>
      <div dir="rtl" className="fixed top-0 left-0 right-0 z-[94] lg:hidden"
        style={{ background: "rgba(255,255,255,.96)", backdropFilter: "blur(18px)", borderBottom: `1px solid ${LINE}` }}>
        <button onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center gap-3 px-4 text-right" style={{ height: 52 }}>
          <span className="grid place-items-center rounded-lg shrink-0" style={{ width: 30, height: 30, background: `${colour}14` }}>
            <FaWheatAwn size={13} color={colour} />
          </span>
          <span className="flex-1 min-w-0">
            <span className="ar-body block text-[10.5px]" style={{ color: colour }}>
              القسم <span className="ltr">{cur.n}</span> من <span className="ltr">{SECTIONS.length}</span>
            </span>
            <span className="ar-heading block text-[13.5px] truncate" style={{ color: D }}>{cur.label}</span>
          </span>
          <span className="grid place-items-center rounded-full shrink-0"
            style={{ width: 34, height: 34, background: open ? colour : `${colour}12`, color: open ? "#fff" : colour }}>
            {open ? <FaXmark size={14} /> : <FaBars size={14} />}
          </span>
        </button>
        <div style={{ height: 2, background: `${S}1F` }}>
          <div style={{ height: 2, width: `${p * 100}%`, background: colour, transition: "width .1s linear" }} />
        </div>
      </div>

      {open && (
        <div dir="rtl" className="fixed inset-0 z-[93] lg:hidden overflow-y-auto"
          style={{ background: "#fff", paddingTop: 54 }}>
          <nav className="px-4 py-5">
            <p className="ar-body text-[11.5px] px-2 pb-3" style={{ color: D, opacity: .45 }}>أقسام الوثيقة</p>
            {SECTIONS.map((sec) => {
              const on = sec.id === active;
              const c = COLORS[sec.id] ?? S;
              return (
                <button key={sec.id} onClick={() => go(sec.id)}
                  className="w-full flex items-start gap-3.5 px-3 rounded-[14px] text-right mb-1.5"
                  style={{ minHeight: 62, background: on ? `${c}0F` : "transparent", border: `1px solid ${on ? `${c}33` : "transparent"}` }}>
                  <span className="ar-body text-[11.5px] ltr shrink-0 pt-4" style={{ color: c, width: 22, fontWeight: 600 }}>{sec.n}</span>
                  <span className="min-w-0 flex-1 py-3.5">
                    <span className="ar-heading block text-[14.5px]" style={{ color: on ? c : D }}>{sec.label}</span>
                    <span className="ar-body block text-[11.5px] mt-1 leading-loose" style={{ color: D, opacity: .55 }}>{sec.desc}</span>
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}

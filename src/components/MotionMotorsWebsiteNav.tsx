"use client";

import { useEffect, useRef, useState } from "react";
/* eslint-disable @next/next/no-img-element */

const NAV_W = 250;
const TIP_W = 320;

const NAV_ITEMS: { id: string; label: string; color: string; tourDesc: string }[] = [
  { id: "brief", label: "Brief", color: "#30c280",
    tourDesc: "What was received from Motion Motors — the bilingual sitemap, the section-by-section copy, the S05 sample model, and the brand context." },
  { id: "landscape", label: "Landscape", color: "#4271B8",
    tourDesc: "What the four reference sites (Honda, Soueast, Nabooda, Chery KSA) give us — and where we improve on each." },
  { id: "approach", label: "Approach", color: "#C4823B",
    tourDesc: "Three principles that govern every page: brochure-with-a-lead-engine, bilingual-by-construction, trust-lives-everywhere." },
  { id: "ia", label: "Architecture", color: "#735AAB",
    tourDesc: "The eleven sitemap items expanded into a real information architecture — over thirty-five routes across the bilingual site." },
  { id: "templates", label: "Templates", color: "#30c280",
    tourDesc: "Six reusable page templates so the site can scale to dozens of pages without re-engaging design." },
  { id: "magnetic", label: "Magnetic · Phase 2", color: "#B85454",
    tourDesc: "Twelve interactive moments that let a visitor live the car before they touch it — grouped into three worlds. Marked as Phase 2 / Optional; outside the 4-week launch scope." },
  { id: "model", label: "Model Page", color: "#4271B8",
    tourDesc: "The S05 sample applied universally — twelve blocks per model that scale to S06, S07, S08, S09 and beyond." },
  { id: "leads", label: "Lead Engine", color: "#C4823B",
    tourDesc: "Four paths into a single CRM record: Test Drive, Get-a-Quote, WhatsApp, and Finance pre-qualification." },
  { id: "finance", label: "Finance", color: "#735AAB",
    tourDesc: "An interactive ANB-aware installment calculator that lives on every model page and offer page." },
  { id: "aftersales", label: "After-Sales", color: "#30c280",
    tourDesc: "The relationship after delivery — a logged-in owner account, automated post-purchase SMS + WhatsApp, service booking, warranty, parts, roadside, and service plans." },
  { id: "bilingual", label: "Bilingual", color: "#4271B8",
    tourDesc: "AR and EN are first-class. Locale-aware routing, parallel content models, RTL primitives baked into the foundation." },
  { id: "stack", label: "Tech Stack", color: "#C4823B",
    tourDesc: "What we build with and why — Next.js 16, Sanity, Supabase, plus integrations for CRM, WhatsApp, ANB, and analytics." },
  { id: "brand", label: "Brand", color: "#735AAB",
    tourDesc: "Four pillars that translate the Motion Motors logo into a web design language: type, color, motif, photography." },
  { id: "phases", label: "Calendar", color: "#30c280",
    tourDesc: "The launch calendar — four weekly sprints, one milestone per week, from kickoff to live in a month." },
  { id: "compliance", label: "SDAIA · PDPL", color: "#735AAB",
    tourDesc: "Saudi Personal Data Protection Law compliance — consent management, data subject rights, residency, audit log, breach plan." },
  { id: "open", label: "Confirmed & Open", color: "#4271B8",
    tourDesc: "What is locked after the May 19 client review, and the one item still pending — the FSD for the DMS layer." },
];

const DRAG_NOTE = {
  title: "Move me anywhere",
  desc: "Drag this menu by the header (avatar + title) and place it wherever feels right — left, right, top, bottom. The position is remembered between visits.",
};

export default function MotionMotorsWebsiteNav() {
  const [active, setActive] = useState<string>("brief");
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [tourIdx, setTourIdx] = useState<number | null>(null);
  const [tipPos, setTipPos] = useState<{ x: number; y: number; placement: "left" | "right" } | null>(null);
  const dragOffset = useRef<{ x: number; y: number } | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const TOUR_LEN = NAV_ITEMS.length + 1;

  useEffect(() => {
    let initial: { x: number; y: number } | null = null;
    try {
      const saved = localStorage.getItem("mmw-nav-pos");
      if (saved) initial = JSON.parse(saved);
    } catch { /* ignore */ }
    if (!initial) {
      const h = navRef.current?.offsetHeight ?? 600;
      initial = {
        x: Math.max(8, window.innerWidth - NAV_W - 20),
        y: Math.max(16, window.innerHeight / 2 - h / 2),
      };
    }
    const h = navRef.current?.offsetHeight ?? 600;
    initial.x = Math.max(8, Math.min(window.innerWidth - NAV_W - 8, initial.x));
    initial.y = Math.max(8, Math.min(window.innerHeight - h - 8, initial.y));
    setPos(initial);
  }, []);

  useEffect(() => {
    const items = NAV_ITEMS.map(n => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let done = false;
    try { done = localStorage.getItem("mmw-tour-done") === "1"; } catch { /* ignore */ }
    if (done) return;
    const t = setTimeout(() => setTourIdx(0), 1200);
    return () => clearTimeout(t);
  }, []);

  const finishTour = () => {
    setTourIdx(null);
    try { localStorage.setItem("mmw-tour-done", "1"); } catch { /* ignore */ }
  };
  const nextTour = () => {
    if (tourIdx === null) return;
    if (tourIdx >= TOUR_LEN - 1) finishTour();
    else setTourIdx(tourIdx + 1);
  };

  useEffect(() => {
    if (tourIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finishTour();
      else if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "Enter") nextTour();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tourIdx]);

  useEffect(() => {
    if (tourIdx === null || !navRef.current) {
      setTipPos(null);
      return;
    }
    const computePos = () => {
      const isDrag = tourIdx === NAV_ITEMS.length;
      const target = isDrag
        ? navRef.current?.querySelector<HTMLElement>("[data-drag-handle]")
        : navRef.current?.querySelector<HTMLElement>(`[data-nav-item="${NAV_ITEMS[tourIdx].id}"]`);
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const placeRight = rect.left < TIP_W + 32;
      const x = placeRight ? rect.right + 16 : rect.left - TIP_W - 16;
      const y = rect.top + rect.height / 2;
      setTipPos({ x, y, placement: placeRight ? "right" : "left" });
    };
    const raf = requestAnimationFrame(computePos);
    window.addEventListener("resize", computePos);
    window.addEventListener("scroll", computePos, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", computePos);
      window.removeEventListener("scroll", computePos);
    };
  }, [tourIdx, pos]);

  const tourHighlightId = tourIdx !== null && tourIdx < NAV_ITEMS.length ? NAV_ITEMS[tourIdx].id : null;
  const isDragStep = tourIdx !== null && tourIdx === NAV_ITEMS.length;
  const tourTitle = isDragStep
    ? DRAG_NOTE.title
    : tourIdx !== null
      ? NAV_ITEMS[tourIdx].label
      : "";
  const tourDesc = isDragStep
    ? DRAG_NOTE.desc
    : tourIdx !== null
      ? NAV_ITEMS[tourIdx].tourDesc
      : "";
  const tourColor = isDragStep
    ? "#30c280"
    : tourIdx !== null
      ? NAV_ITEMS[tourIdx].color
      : "#30c280";

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pos) return;
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    document.body.style.userSelect = "none";
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragOffset.current || !navRef.current) return;
    const h = navRef.current.offsetHeight;
    const nextX = Math.max(8, Math.min(window.innerWidth - NAV_W - 8, e.clientX - dragOffset.current.x));
    const nextY = Math.max(8, Math.min(window.innerHeight - h - 8, e.clientY - dragOffset.current.y));
    setPos({ x: nextX, y: nextY });
  };

  const onPointerUp = () => {
    if (dragOffset.current) {
      dragOffset.current = null;
      setDragging(false);
      document.body.style.userSelect = "";
      try { localStorage.setItem("mmw-nav-pos", JSON.stringify(pos)); } catch { /* ignore */ }
    }
  };

  return (
    <>
      <aside
        ref={navRef}
        aria-label="Section navigation"
        className="fixed z-[65] hidden xl:flex flex-col rounded-[18px] overflow-hidden"
        style={{
          width: NAV_W,
          left: pos?.x,
          top: pos?.y,
          visibility: pos ? "visible" : "hidden",
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: dragging ? "0 18px 50px rgba(0,0,0,0.18)" : "0 12px 40px rgba(0,0,0,0.08)",
          transition: dragging ? "none" : "box-shadow 250ms ease",
          fontFamily: "var(--font-bricolage), system-ui, sans-serif",
        }}
      >
        <div
          data-drag-handle
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="px-4 pt-4 pb-3 flex flex-col gap-2 select-none"
          style={{
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            cursor: dragging ? "grabbing" : "grab",
            touchAction: "none",
          }}
        >
          <div className="flex items-center justify-center py-1">
            <img
              src="/motionmotors/logo-en.png"
              alt="Motion Motors"
              className="pointer-events-none"
              style={{ height: 28, width: "auto", objectFit: "contain" }}
              draggable={false}
            />
          </div>
          <div className="flex items-center justify-center gap-1 pt-1" style={{ opacity: 0.35 }}>
            <span className="block rounded-full" style={{ width: 3, height: 3, background: "#0A0A0A" }} />
            <span className="block rounded-full" style={{ width: 3, height: 3, background: "#0A0A0A" }} />
            <span className="block rounded-full" style={{ width: 3, height: 3, background: "#0A0A0A" }} />
            <span className="block rounded-full" style={{ width: 3, height: 3, background: "#0A0A0A" }} />
            <span className="block rounded-full" style={{ width: 3, height: 3, background: "#0A0A0A" }} />
          </div>
        </div>

        <div className="p-1.5 flex flex-col gap-0.5">
          {NAV_ITEMS.map((item, i) => {
            const isActive = active === item.id;
            const isTourHighlighted = tourHighlightId === item.id;
            const showAccent = isActive || isTourHighlighted;
            return (
              <button
                key={item.id}
                data-nav-item={item.id}
                onClick={() => handleClick(item.id)}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-[10px] text-left cursor-pointer border-0 relative"
                style={{
                  background: isTourHighlighted
                    ? `${item.color}30`
                    : isActive
                      ? `${item.color}1c`
                      : "transparent",
                  transition: "background 350ms cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: isTourHighlighted ? `0 0 0 2px ${item.color}` : "none",
                }}
                onMouseEnter={(e) => { if (!showAccent) e.currentTarget.style.background = "rgba(0,0,0,0.03)"; }}
                onMouseLeave={(e) => { if (!showAccent) e.currentTarget.style.background = "transparent"; }}
                aria-label={item.label}
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className="block rounded-full flex-shrink-0"
                  style={{
                    width: showAccent ? 8 : 5,
                    height: showAccent ? 8 : 5,
                    background: item.color,
                    boxShadow: showAccent ? `0 0 0 3px ${item.color}33` : "none",
                    opacity: showAccent ? 1 : 0.55,
                    transition: "all 350ms cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
                <span
                  style={{
                    color: showAccent ? "#0A0A0A" : "rgba(0,0,0,0.35)",
                    fontWeight: showAccent ? 700 : 500,
                    fontSize: 11,
                    width: 18,
                    fontVariantNumeric: "tabular-nums",
                    transition: "color 350ms",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="truncate flex-1"
                  style={{
                    color: showAccent ? "#0A0A0A" : "rgba(0,0,0,0.55)",
                    fontWeight: showAccent ? 700 : 500,
                    fontSize: 12,
                    transition: "color 350ms",
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {tourIdx !== null && (
        <div
          className="hidden xl:block fixed inset-0 z-[55]"
          style={{
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            transition: "opacity 400ms ease",
          }}
          aria-hidden
        />
      )}

      {tourIdx !== null && tipPos && (
        <div
          className="hidden xl:flex fixed z-[70] flex-col rounded-[18px] overflow-hidden"
          style={{
            width: TIP_W,
            left: tipPos.x,
            top: tipPos.y,
            transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.99)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
            transition: "left 400ms cubic-bezier(0.4, 0, 0.2, 1), top 400ms cubic-bezier(0.4, 0, 0.2, 1)",
            fontFamily: "var(--font-bricolage), system-ui, sans-serif",
          }}
          role="dialog"
          aria-label="Onboarding tour"
        >
          <span
            aria-hidden
            className="absolute top-1/2 -translate-y-1/2"
            style={{
              [tipPos.placement === "left" ? "right" : "left"]: -8,
              width: 14,
              height: 14,
              background: "rgba(255,255,255,0.99)",
              transform: "translateY(-50%) rotate(45deg)",
              borderTop: tipPos.placement === "right" ? "1px solid rgba(0,0,0,0.08)" : "none",
              borderLeft: tipPos.placement === "right" ? "1px solid rgba(0,0,0,0.08)" : "none",
              borderBottom: tipPos.placement === "left" ? "1px solid rgba(0,0,0,0.08)" : "none",
              borderRight: tipPos.placement === "left" ? "1px solid rgba(0,0,0,0.08)" : "none",
            } as React.CSSProperties}
          />

          <div className="h-1 w-full" style={{ background: "rgba(0,0,0,0.05)" }}>
            <div
              className="h-full"
              style={{
                width: `${((tourIdx + 1) / TOUR_LEN) * 100}%`,
                background: tourColor,
                transition: "width 400ms cubic-bezier(0.4, 0, 0.2, 1), background 400ms",
              }}
            />
          </div>

          <div className="p-5">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="block w-2.5 h-2.5 rounded-full" style={{ background: tourColor }} />
              <span style={{ fontSize: 10, color: "rgba(0,0,0,0.45)", fontWeight: 700, letterSpacing: 1 }}>
                {isDragStep ? "Tip" : `Step ${String(tourIdx! + 1).padStart(2, "0")} of ${String(TOUR_LEN).padStart(2, "0")}`}
              </span>
            </div>

            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0A0A0A", lineHeight: 1.3, marginBottom: 6 }}>
              {tourTitle}
            </h3>
            <p style={{ fontSize: 12.5, lineHeight: 1.7, color: "rgba(0,0,0,0.65)", marginBottom: 16 }}>
              {tourDesc}
            </p>

            <button
              onClick={nextTour}
              className="w-full py-2.5 rounded-full cursor-pointer border-0"
              style={{
                background: tourColor,
                color: tourColor === "#0A0A0A" ? "#fff" : "#0A0A0A",
                boxShadow: `0 4px 16px ${tourColor}55`,
                fontSize: 12,
                fontWeight: 700,
                transition: "background 350ms, box-shadow 350ms, transform 200ms",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {tourIdx! >= TOUR_LEN - 1 ? "Got it" : "Next →"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

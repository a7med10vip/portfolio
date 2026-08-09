"use client";

import { useEffect, useRef, useState } from "react";
/* eslint-disable @next/next/no-img-element */

const NAV_W = 280;

const NAV_ITEMS: { id: string; label: string; color: string; part: string }[] = [
  // Part I — Foundation
  { id: "doc-control", label: "Document Control", color: "#30c280", part: "I · Foundation" },
  { id: "glossary", label: "Glossary", color: "#30c280", part: "I · Foundation" },
  { id: "system-overview", label: "System Overview", color: "#30c280", part: "I · Foundation" },
  { id: "actors", label: "Actors & Roles", color: "#30c280", part: "I · Foundation" },
  { id: "data-model", label: "Data Model", color: "#30c280", part: "I · Foundation" },
  { id: "auth", label: "Auth & Permissions", color: "#30c280", part: "I · Foundation" },
  { id: "integrations", label: "Integration Map", color: "#30c280", part: "I · Foundation" },
  { id: "notifications", label: "Notifications Matrix", color: "#30c280", part: "I · Foundation" },
  // Part II — Features
  { id: "f-owner", label: "Owner Account", color: "#4271B8", part: "II · Features" },
  { id: "f-service", label: "Service Booking", color: "#4271B8", part: "II · Features" },
  { id: "f-warranty", label: "Warranty Tracking", color: "#4271B8", part: "II · Features" },
  { id: "f-parts", label: "Parts Catalog", color: "#4271B8", part: "II · Features" },
  { id: "f-automation", label: "Post-Purchase Auto", color: "#4271B8", part: "II · Features" },
  { id: "f-reservation", label: "Online Reservation", color: "#4271B8", part: "II · Features" },
  { id: "f-roadside", label: "Roadside Assistance", color: "#4271B8", part: "II · Features" },
  { id: "f-plans", label: "Service Plans", color: "#4271B8", part: "II · Features" },
  // Part III — Cross-cutting
  { id: "nfr", label: "Non-Functional Reqs", color: "#735AAB", part: "III · Cross-cutting" },
  { id: "pdpl", label: "PDPL / SDAIA Hooks", color: "#735AAB", part: "III · Cross-cutting" },
  { id: "acceptance", label: "Acceptance Criteria", color: "#735AAB", part: "III · Cross-cutting" },
  { id: "open", label: "Open Items", color: "#735AAB", part: "III · Cross-cutting" },
];

export default function MotionMotorsFSDNav() {
  const [active, setActive] = useState<string>("doc-control");
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const dragOffset = useRef<{ x: number; y: number } | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let initial: { x: number; y: number } | null = null;
    try {
      const saved = localStorage.getItem("mmw-fsd-nav-pos");
      if (saved) initial = JSON.parse(saved);
    } catch { /* ignore */ }
    if (!initial) {
      initial = {
        x: Math.max(8, window.innerWidth - NAV_W - 20),
        y: 80,
      };
    }
    initial.x = Math.max(8, Math.min(window.innerWidth - NAV_W - 8, initial.x));
    initial.y = Math.max(8, Math.min(window.innerHeight - 200, initial.y));
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
      { rootMargin: "-30% 0px -60% 0px" }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

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
      try { localStorage.setItem("mmw-fsd-nav-pos", JSON.stringify(pos)); } catch { /* ignore */ }
    }
  };

  const partColors: Record<string, string> = {
    "I · Foundation": "#30c280",
    "II · Features": "#4271B8",
    "III · Cross-cutting": "#735AAB",
  };

  const grouped = NAV_ITEMS.reduce((acc, item) => {
    if (!acc[item.part]) acc[item.part] = [];
    acc[item.part].push(item);
    return acc;
  }, {} as Record<string, typeof NAV_ITEMS>);

  return (
    <aside
      ref={navRef}
      aria-label="FSD navigation"
      className="fixed z-[65] hidden xl:flex flex-col rounded-[18px] overflow-hidden print:hidden"
      style={{
        width: collapsed ? 56 : NAV_W,
        left: pos?.x,
        top: pos?.y,
        maxHeight: "calc(100vh - 32px)",
        visibility: pos ? "visible" : "hidden",
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: dragging ? "0 18px 50px rgba(0,0,0,0.18)" : "0 12px 40px rgba(0,0,0,0.08)",
        transition: dragging ? "none" : "box-shadow 250ms ease, width 280ms cubic-bezier(0.4,0,0.2,1)",
        fontFamily: "var(--font-bricolage), system-ui, sans-serif",
      }}
    >
      {/* Header / drag handle */}
      <div
        data-drag-handle
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="px-3 pt-3 pb-2 flex items-center justify-between select-none"
        style={{
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          cursor: dragging ? "grabbing" : "grab",
          touchAction: "none",
        }}
      >
        {!collapsed && (
          <img
            src="/motionmotors/logo-en.png"
            alt="Motion Motors"
            className="pointer-events-none"
            style={{ height: 22, width: "auto", objectFit: "contain" }}
            draggable={false}
          />
        )}
        <button
          onClick={(e) => { e.stopPropagation(); setCollapsed(c => !c); }}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label={collapsed ? "Expand" : "Collapse"}
          className="border-0 cursor-pointer rounded p-1"
          style={{
            background: "transparent",
            color: "rgba(0,0,0,0.45)",
            fontSize: 14,
            fontWeight: 700,
            transition: "color 200ms",
          }}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      {!collapsed && (
        <>
          <div className="px-3 py-2.5 flex items-center justify-center" style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
            <span style={{ fontSize: 10, color: "rgba(0,0,0,0.45)", fontWeight: 700, letterSpacing: 1 }}>
              INTERNAL · v0.1 DRAFT
            </span>
          </div>

          <div className="overflow-y-auto p-1.5" style={{ scrollbarWidth: "thin" }}>
            {Object.entries(grouped).map(([part, items]) => (
              <div key={part} className="mb-2">
                <div className="px-2.5 py-1.5 flex items-center gap-2">
                  <span style={{ width: 5, height: 5, borderRadius: 3, background: partColors[part] }} />
                  <span style={{ fontSize: 9, color: "rgba(0,0,0,0.4)", fontWeight: 700, letterSpacing: 1 }}>
                    PART {part.toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  {items.map((item, i) => {
                    const globalIdx = NAV_ITEMS.findIndex(x => x.id === item.id);
                    const isActive = active === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleClick(item.id)}
                        className="flex items-center gap-2 px-2.5 py-1.5 rounded-[8px] text-left cursor-pointer border-0"
                        style={{
                          background: isActive ? `${item.color}1c` : "transparent",
                          transition: "background 250ms",
                        }}
                        onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "rgba(0,0,0,0.03)"; }}
                        onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                        aria-current={isActive ? "true" : undefined}
                      >
                        <span
                          className="block rounded-full flex-shrink-0"
                          style={{
                            width: isActive ? 7 : 4,
                            height: isActive ? 7 : 4,
                            background: item.color,
                            boxShadow: isActive ? `0 0 0 3px ${item.color}33` : "none",
                            opacity: isActive ? 1 : 0.5,
                            transition: "all 250ms",
                          }}
                        />
                        <span style={{
                          color: isActive ? "#0A0A0A" : "rgba(0,0,0,0.4)",
                          fontWeight: 700,
                          fontSize: 10,
                          width: 18,
                          fontVariantNumeric: "tabular-nums",
                        }}>
                          {String(globalIdx + 1).padStart(2, "0")}
                        </span>
                        <span className="truncate flex-1" style={{
                          color: isActive ? "#0A0A0A" : "rgba(0,0,0,0.6)",
                          fontWeight: isActive ? 700 : 500,
                          fontSize: 11.5,
                        }}>
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}

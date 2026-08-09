"use client";

/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  FaArrowRight, FaTrashCan, FaLandmark, FaUsers, FaNewspaper, FaMicrophone,
  FaGlobe, FaCalendarDays, FaLocationDot, FaQrcode, FaBell, FaWhatsapp, FaDesktop,
  FaTableColumns, FaChartColumn, FaCircleCheck, FaClock, FaTicket, FaCar,
  FaMagnifyingGlass, FaShieldHalved, FaTowerBroadcast, FaBolt, FaShareNodes, FaCamera,
  FaFileLines, FaHandshake, FaFlagCheckered, FaChildren, FaPaperPlane, FaArrowTrendUp,
  FaEye, FaHandPointer, FaChevronDown, FaStopwatch,
  FaLocationArrow, FaLayerGroup, FaGaugeHigh, FaStar, FaLock, FaUserCheck, FaBriefcase,
  FaFilter, FaMobileScreen, FaRoute, FaGripVertical, FaMicrochip, FaSitemap, FaLightbulb,
} from "react-icons/fa6";

/* ═══════════════════════════════════════════════════════════════════════════
   COLOUR LAW
   Red is the only brand colour on this page — headings, actions, accents,
   emphasis. The supporting hues appear in exactly one place: to tell one
   feature or one programme track apart from another inside the product UI
   (platform branches, tracks, live statuses, audience rules). Nowhere else.
   Red tokens are Show Motors brand red.
   ═══════════════════════════════════════════════════════════════════════════ */
const RED      = "#D7263D";
const RED_DEEP = "#A8182C";
const RED_SOFT = "#E85064";

const INK   = "#0C1116";
const BODY  = "#4A5560";
const MUTED = "#8A94A0";
const RULE  = "#E7EAEE";
const WASH  = "#F7F9FA";

/* Feature hues — ONLY for track / status / branch identity */
const F_NAVY  = "#17325C";
const F_TEAL  = "#0B7C8C";
const F_GREEN = "#1E7A4C";
const F_SAND  = "#B0781A";
const F_PLUM  = "#7C3E6E";
const F_SLATE = "#5A6772";

const SHOW_START = Date.UTC(2026, 7, 26, 7, 0, 0); // 26 Aug 2026, 10:00 (UTC+3)

/* ═══════════ Primitives ═══════════ */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

const card: React.CSSProperties = { background: "#fff", border: `1px solid ${RULE}`, borderRadius: 20 };
const cardTop = (c: string = RED): React.CSSProperties => ({ background: "#fff", border: `1px solid ${RULE}`, borderTop: `3px solid ${c}`, borderRadius: 20 });

function SH({ n, title, accent, sub }: { n: string; title: string; accent?: string; sub?: string }) {
  return (
    <div className="text-center mb-12">
      <p className="text-[11px] font-bold tracking-[3px] mb-3" style={{ color: RED }}>{n}</p>
      <h2 className="heading text-3xl md:text-5xl mb-4" style={{ color: INK, lineHeight: 1.08 }}>
        {title} {accent && <span style={{ color: RED }}>{accent}</span>}
      </h2>
      {sub && <p className="text-[13.5px] md:text-[15px] max-w-2xl mx-auto leading-relaxed" style={{ color: BODY }}>{sub}</p>}
    </div>
  );
}

function Chip({ children, color = RED }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-bold whitespace-nowrap"
      style={{ background: `${color}12`, color, border: `1px solid ${color}28` }}
    >
      {children}
    </span>
  );
}

/* ═══════════ Navigation ═══════════ */
type NavItem = { id: string; label: string };
type NavGroup = { group: string; items: NavItem[] };
const NAV_GROUPS: NavGroup[] = [
  { group: "Foundation", items: [
    { id: "overview", label: "The Idea" },
    { id: "platform", label: "Platform Map" },
    { id: "landing", label: "Two Landing Pages" },
    { id: "registration", label: "Registration & Pass" },
  ] },
  { group: "Content & Reach", items: [
    { id: "newsroom", label: "JIMS Newsroom" },
    { id: "speakers", label: "Speakers" },
    { id: "distribution", label: "External Listings" },
  ] },
  { group: "Schedule & Events", items: [
    { id: "schedule", label: "JIMS Live Schedule" },
    { id: "anatomy", label: "Anatomy of an Event" },
    { id: "myschedule", label: "My JIMS Schedule" },
    { id: "whatsapp", label: "WhatsApp & WATI" },
    { id: "actions", label: "Action per Event Type" },
    { id: "eventpage", label: "Event Pages & Search" },
  ] },
  { group: "On-site & Ops", items: [
    { id: "qr", label: "QR On-site" },
    { id: "screens", label: "Venue Screens" },
    { id: "dashboard", label: "Operations Dashboard" },
  ] },
  { group: "Value & Delivery", items: [
    { id: "measure", label: "What We Can Measure" },
    { id: "reports", label: "Sponsor Reporting" },
    { id: "journey", label: "Visitor Journey" },
    { id: "phases", label: "Delivery Phases" },
    { id: "outcome", label: "The Outcome" },
  ] },
];
const ALL_IDS = NAV_GROUPS.flatMap((g) => g.items.map((i) => i.id));

function SectionNav({ active, go }: { active: string; go: (id: string) => void }) {
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(NAV_GROUPS.map((g, i) => [g.group, i === 0])) as Record<string, boolean>
  );
  useEffect(() => {
    const g = NAV_GROUPS.find((gr) => gr.items.some((it) => it.id === active));
    if (g) setOpen((o) => (o[g.group] ? o : { ...o, [g.group]: true }));
  }, [active]);

  const asideRef = useRef<HTMLElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const drag = useRef<{ dx: number; dy: number } | null>(null);

  return (
    <aside
      ref={asideRef}
      className={`hidden xl:flex flex-col fixed z-40 p-2 rounded-[16px]${pos ? "" : " right-5 top-1/2 -translate-y-1/2"}`}
      style={{ width: 208, background: "rgba(255,255,255,0.94)", border: `1px solid ${RULE}`, boxShadow: "0 8px 32px rgba(0,0,0,0.06)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", maxHeight: "84vh", overflowY: "auto", ...(pos ? { left: pos.x, top: pos.y, right: "auto" } : {}) }}
    >
      <div
        onPointerDown={(e) => {
          const el = asideRef.current; if (!el) return;
          const r = el.getBoundingClientRect();
          drag.current = { dx: e.clientX - r.left, dy: e.clientY - r.top };
          if (!pos) setPos({ x: r.left, y: r.top });
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          e.preventDefault();
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          const el = asideRef.current; const w = el?.offsetWidth ?? 208; const h = el?.offsetHeight ?? 420;
          setPos({
            x: Math.max(8, Math.min(e.clientX - drag.current.dx, window.innerWidth - w - 8)),
            y: Math.max(8, Math.min(e.clientY - drag.current.dy, window.innerHeight - h - 8)),
          });
        }}
        onPointerUp={() => { drag.current = null; }}
        className="flex items-center gap-2 px-2 py-2 mb-1"
        style={{ borderBottom: `1px solid ${RULE}`, cursor: "grab", touchAction: "none", userSelect: "none" }}
        title="Drag to move"
      >
        <FaGripVertical size={12} color={MUTED} style={{ flexShrink: 0 }} />
        <div>
          <p className="heading text-[12px] leading-tight" style={{ color: INK }}>JIMS 2026</p>
          <p className="text-[9px]" style={{ color: MUTED }}>Digital Platform Proposal</p>
        </div>
      </div>
      {NAV_GROUPS.map((g) => {
        const isOpen = open[g.group];
        const hasActive = g.items.some((it) => it.id === active);
        return (
          <div key={g.group} className="mb-0.5">
            <button
              onClick={() => setOpen((o) => ({ ...o, [g.group]: !o[g.group] }))}
              className="flex items-center gap-2 px-2.5 py-2 rounded-[8px] w-full text-left cursor-pointer border-0"
              style={{ background: hasActive ? `${RED}0D` : "transparent", transition: "background 200ms" }}
              aria-expanded={isOpen}
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: hasActive ? RED : MUTED }} />
              <span className="text-[11px] font-bold flex-1 truncate" style={{ color: INK }}>{g.group}</span>
              <FaChevronDown size={11} color={MUTED} style={{ transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform 200ms" }} />
            </button>
            {isOpen && (
              <div className="flex flex-col pb-1">
                {g.items.map((it) => {
                  const on = active === it.id;
                  return (
                    <button
                      key={it.id}
                      onClick={() => go(it.id)}
                      className="flex items-center gap-2.5 pl-4 pr-2.5 py-1.5 rounded-[7px] text-left cursor-pointer border-0 ml-1.5"
                      style={{ background: on ? `${RED}12` : "transparent", borderLeft: `1px solid ${RULE}`, transition: "background 200ms" }}
                    >
                      <span className="rounded-full flex-shrink-0" style={{ width: on ? 6 : 4, height: on ? 6 : 4, background: on ? RED : MUTED, boxShadow: on ? `0 0 0 3px ${RED}26` : "none", opacity: on ? 1 : 0.45, transition: "all 200ms" }} />
                      <span className="text-[10.5px] font-semibold truncate" style={{ color: on ? INK : BODY }}>{it.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
}

/* ═══════════ Platform map — one root, four branches (feature identity) ═══════════ */
const BRANCHES: { t: string; d: string; color: string; icon: IconType; leaves: string[] }[] = [
  { t: "Register", d: "Every audience enters through one of two doors and leaves with a pass.", color: F_NAVY, icon: FaTicket,
    leaves: ["Business & Government page", "Visitors page", "Delegations & groups", "Media accreditation", "QR Pass"] },
  { t: "Publish", d: "The show stops being announced once and starts being published daily.", color: RED, icon: FaNewspaper,
    leaves: ["JIMS Newsroom", "Speakers", "Event detail pages", "External event listings"] },
  { t: "Plan", d: "The four days become a live, searchable, personal schedule.", color: F_TEAL, icon: FaCalendarDays,
    leaves: ["JIMS Live Schedule", "Tracks & filters", "My JIMS Schedule", "WhatsApp reminders"] },
  { t: "Operate & Measure", d: "One control room feeds the site, the screens and the reports.", color: F_GREEN, icon: FaGaugeHigh,
    leaves: ["Operations dashboard", "Live event status", "QR check-in", "Venue screens", "Sponsor reports"] },
];

function PlatformTree() {
  return (
    <div>
      <div className="flex justify-center">
        <div className="px-7 py-3 rounded-full heading text-base flex items-center gap-2.5" style={{ background: RED, color: "#fff" }}>
          <FaSitemap size={15} color="#fff" /> The JIMS Platform
        </div>
      </div>
      <div className="flex justify-center"><div style={{ width: 2, height: 24, background: RULE }} /></div>
      <div className="hidden md:flex justify-center"><div style={{ height: 2, width: "76%", background: RULE }} /></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {BRANCHES.map((b) => (
          <div key={b.t} className="flex flex-col items-center">
            <div className="hidden md:block" style={{ width: 2, height: 20, background: `${b.color}55` }} />
            <div className="w-full h-full p-5 mt-3 md:mt-0" style={cardTop(b.color)}>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${b.color}12` }}>
                  <b.icon size={16} color={b.color} />
                </span>
                <p className="heading text-[15px]" style={{ color: INK }}>{b.t}</p>
              </div>
              <p className="text-[12px] leading-relaxed mb-4" style={{ color: BODY }}>{b.d}</p>
              <div className="flex flex-col gap-1.5">
                {b.leaves.map((l) => (
                  <span key={l} className="flex items-center gap-2 text-[11.5px]" style={{ color: BODY }}>
                    <span className="flex-shrink-0" style={{ width: 12, height: 1, background: `${b.color}70` }} />
                    <span style={{ borderBottom: `1px dashed ${RULE}`, paddingBottom: 1 }}>{l}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════ Numbered flow on a connector line ═══════════ */
function FlowLine({ steps }: { steps: { n: string; t: string; d: string; icon: IconType }[] }) {
  return (
    <div className="relative">
      <div className="hidden lg:block absolute left-[8%] right-[8%] z-0" style={{ top: 32, height: 2, background: `${RED}30` }} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
        {steps.map((s) => (
          <div key={s.n} className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="rounded-full flex items-center justify-center" style={{ width: 64, height: 64, background: "#fff", border: `2px solid ${RED}` }}>
                <s.icon size={21} color={RED} />
              </div>
              <span className="absolute -top-1 -right-1 rounded-full flex items-center justify-center text-[10.5px] font-bold" style={{ width: 24, height: 24, background: RED, color: "#fff" }}>{s.n}</span>
            </div>
            <h4 className="heading text-[14px] mb-1" style={{ color: INK }}>{s.t}</h4>
            <p className="text-[11.5px] leading-snug" style={{ color: BODY }}>{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════ Live Schedule — the interactive core ═══════════ */
type TrackKey = "main" | "launch" | "tech" | "biz" | "drive" | "ent" | "family" | "media";
const TRACKS: Record<TrackKey, { name: string; short: string; color: string; icon: IconType }> = {
  main:   { name: "Main Stage",             short: "Main Stage",    color: INK,     icon: FaStar },
  launch: { name: "Vehicle Launches",       short: "Launches",      color: RED,     icon: FaCar },
  tech:   { name: "Mobility & Technology",  short: "Technology",    color: F_TEAL,  icon: FaBolt },
  biz:    { name: "Business & Government",  short: "Business",      color: F_NAVY,  icon: FaLandmark },
  drive:  { name: "Test Drives",            short: "Test Drives",   color: F_GREEN, icon: FaGaugeHigh },
  ent:    { name: "Entertainment",          short: "Entertainment", color: F_SAND,  icon: FaFlagCheckered },
  family: { name: "Family Experiences",     short: "Family",        color: F_PLUM,  icon: FaChildren },
  media:  { name: "Media Sessions",         short: "Media",         color: F_SLATE, icon: FaCamera },
};

type StatusKey = "booking" | "soon" | "live" | "full" | "ended";
const STATUSES: Record<StatusKey, { label: string; color: string; note: string }> = {
  booking: { label: "Booking Available", color: F_GREEN, note: "Seats or slots are still open." },
  soon:    { label: "Starting Soon",     color: F_SAND,  note: "Fires the 15-minute WhatsApp reminder." },
  live:    { label: "Live Now",          color: RED,     note: "Pushed to the site, the screens and My Schedule at once." },
  full:    { label: "Full Capacity",     color: F_SLATE, note: "Booking closes, the waiting list opens." },
  ended:   { label: "Ended",             color: MUTED,   note: "Replaced by recap, photos and a rating request." },
};

type AudienceKey = "all" | "business" | "media" | "invite" | "limited" | "family";
const AUDIENCES: Record<AudienceKey, { label: string; color: string; d: string }> = {
  all:      { label: "Open to Everyone",    color: F_GREEN, d: "No pass tier required beyond entry." },
  business: { label: "Business Only",       color: F_NAVY,  d: "Business or exhibitor pass is checked at the door." },
  media:    { label: "Media Only",          color: F_SLATE, d: "Accredited media badge required." },
  invite:   { label: "Invitation Required", color: F_PLUM,  d: "Access is requested and approved by the organising team." },
  limited:  { label: "Limited Capacity",    color: F_SAND,  d: "Bookable seats or slots, first come first served." },
  family:   { label: "Family Friendly",     color: F_TEAL,  d: "Designed for visitors arriving with children." },
};

type Ev = { time: string; title: string; place: string; track: TrackKey; audience: AudienceKey; status: StatusKey; action: string; brand?: string };
type Day = { n: number; label: string; date: string; state: "Live" | "Upcoming"; hours: string; headline: string; events: Ev[] };

const DAYS: Day[] = [
  {
    n: 1, label: "Day 1", date: "Wednesday, August 26", state: "Live", hours: "10:00 AM – 10:00 PM",
    headline: "Soueast S09 Regional Reveal",
    events: [
      { time: "11:00 AM – 12:00 PM", title: "The Future of Automotive Mobility in Saudi Arabia", place: "Executive Forum — Business Lounge", track: "biz", audience: "invite", status: "booking", action: "Request Access" },
      { time: "2:00 PM – 3:00 PM", title: "Government Mobility Delegation Tour", place: "Business Lounge → Halls A & B", track: "biz", audience: "business", status: "booking", action: "Book a Meeting" },
      { time: "6:00 PM – 6:30 PM", title: "Soueast S09 Regional Reveal", place: "Main Stage — Hall A", track: "launch", audience: "all", status: "soon", action: "Add to My Schedule", brand: "Soueast" },
      { time: "7:15 PM – 7:45 PM", title: "Test Drive Session", place: "Test Drive Zone", track: "drive", audience: "limited", status: "full", action: "Join Waiting List" },
      { time: "8:00 PM – 8:40 PM", title: "Drift Show", place: "Outdoor Arena", track: "ent", audience: "all", status: "live", action: "Get Directions" },
    ],
  },
  {
    n: 2, label: "Day 2", date: "Thursday, August 27", state: "Upcoming", hours: "10:00 AM – 10:00 PM",
    headline: "EV Technology Talk",
    events: [
      { time: "12:00 PM – 1:00 PM", title: "Media Roundtable", place: "Media Center", track: "media", audience: "media", status: "booking", action: "Request Media Access" },
      { time: "4:00 PM – 5:00 PM", title: "EV Technology Talk", place: "Hall B — Tech Stage", track: "tech", audience: "all", status: "booking", action: "Set Reminder" },
      { time: "5:30 PM – 6:00 PM", title: "Motion Motors Lineup Showcase", place: "Hall A — Booth 12", track: "launch", audience: "all", status: "booking", action: "Add to My Schedule", brand: "Motion Motors" },
      { time: "7:00 PM – 8:00 PM", title: "Family Experience Zone", place: "Zone C", track: "family", audience: "family", status: "booking", action: "Add to Family Schedule" },
      { time: "8:30 PM – 9:00 PM", title: "Test Drive Session", place: "Test Drive Zone", track: "drive", audience: "limited", status: "booking", action: "Book a Slot" },
    ],
  },
  {
    n: 3, label: "Day 3", date: "Friday, August 28", state: "Upcoming", hours: "2:00 PM – 11:00 PM",
    headline: "Regional Vehicle Reveal",
    events: [
      { time: "3:00 PM – 4:00 PM", title: "Fleet Managers Forum", place: "Business Lounge", track: "biz", audience: "business", status: "booking", action: "Request Access" },
      { time: "5:00 PM – 6:00 PM", title: "Regional Vehicle Reveal", place: "Main Stage — Hall A", track: "launch", audience: "all", status: "booking", action: "Add to My Schedule" },
      { time: "6:30 PM – 7:00 PM", title: "Mobility Technology Session", place: "Hall B — Tech Stage", track: "tech", audience: "all", status: "booking", action: "Set Reminder" },
      { time: "8:00 PM – 9:30 PM", title: "Family Night", place: "Zone C", track: "family", audience: "family", status: "booking", action: "Add to Family Schedule" },
    ],
  },
  {
    n: 4, label: "Day 4", date: "Saturday, August 29", state: "Upcoming", hours: "10:00 AM – 11:00 PM",
    headline: "Closing Highlights",
    events: [
      { time: "1:00 PM – 2:00 PM", title: "Investors & Partners Meetings", place: "Business Lounge — Meeting Rooms", track: "biz", audience: "invite", status: "booking", action: "Book a Meeting" },
      { time: "4:00 PM – 5:00 PM", title: "Test Drive Finale", place: "Test Drive Zone", track: "drive", audience: "limited", status: "booking", action: "Book a Slot" },
      { time: "6:00 PM – 7:00 PM", title: "Closing Highlights", place: "Main Stage — Hall A", track: "main", audience: "all", status: "booking", action: "Add to My Schedule" },
      { time: "7:30 PM – 8:30 PM", title: "Awards & Closing Show", place: "Outdoor Arena", track: "ent", audience: "all", status: "booking", action: "Get Directions" },
    ],
  },
];

const FILTERS: { key: "all" | TrackKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "launch", label: "Car Launches" },
  { key: "drive", label: "Test Drives" },
  { key: "tech", label: "Technology" },
  { key: "biz", label: "Business" },
  { key: "ent", label: "Entertainment" },
  { key: "family", label: "Family" },
  { key: "media", label: "Media" },
];

function EventRow({ e, saved, onSave }: { e: Ev; saved: boolean; onSave: () => void }) {
  const t = TRACKS[e.track];
  const st = STATUSES[e.status];
  const au = AUDIENCES[e.audience];
  return (
    <div className="p-4 md:p-5 grid grid-cols-1 md:grid-cols-[128px_1fr_auto] gap-4 items-start" style={{ ...card, borderLeft: `3px solid ${t.color}` }}>
      <div>
        <p className="text-[12.5px] font-bold" style={{ color: INK }}>{e.time.split(" – ")[0]}</p>
        <p className="text-[11px]" style={{ color: MUTED }}>{e.time.split(" – ")[1]}</p>
        <span className="inline-flex items-center gap-1.5 mt-2 text-[10.5px] font-bold" style={{ color: t.color }}>
          <t.icon size={11} /> {t.short}
        </span>
      </div>
      <div>
        <div className="flex items-center gap-2 flex-wrap mb-1.5">
          <h4 className="heading text-[15px] md:text-[16px]" style={{ color: INK }}>{e.title}</h4>
          {e.brand && <Chip color={t.color}>{e.brand}</Chip>}
        </div>
        <p className="flex items-center gap-1.5 text-[12px] mb-3" style={{ color: BODY }}>
          <FaLocationDot size={11} color={MUTED} /> {e.place}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-bold" style={{ background: `${st.color}12`, color: st.color, border: `1px solid ${st.color}28` }}>
            <span className="rounded-full" style={{ width: 6, height: 6, background: st.color }} /> {st.label}
          </span>
          <Chip color={au.color}>{au.label}</Chip>
        </div>
      </div>
      <div className="flex md:flex-col gap-2 md:items-end">
        <button
          onClick={onSave}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[11.5px] font-bold cursor-pointer whitespace-nowrap"
          style={saved
            ? { background: RED, color: "#fff", border: `1px solid ${RED}` }
            : { background: "#fff", color: RED, border: `1.5px solid ${RED}` }}
        >
          {saved ? <><FaCircleCheck size={12} /> Saved</> : <>{e.action}</>}
        </button>
        <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-[11px] font-semibold" style={{ background: WASH, color: BODY }}>
          <FaLocationArrow size={11} /> Directions
        </span>
      </div>
    </div>
  );
}

function ScheduleDemo() {
  const [dayIdx, setDayIdx] = useState(0);
  const [filter, setFilter] = useState<"all" | TrackKey>("all");
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const day = DAYS[dayIdx];
  const list = useMemo(() => (filter === "all" ? day.events : day.events.filter((e) => e.track === filter)), [day, filter]);

  return (
    <div className="rounded-[26px] overflow-hidden" style={{ border: `1px solid ${RULE}`, background: "#fff" }}>
      {/* browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#fff", borderBottom: `1px solid ${RULE}` }}>
        <span className="flex gap-1.5">
          {[1, 2, 3].map((c) => <span key={c} className="rounded-full" style={{ width: 9, height: 9, background: RULE }} />)}
        </span>
        <span className="mx-auto text-[11px] px-3 py-1 rounded-full" style={{ background: WASH, color: MUTED }}>jims.com.sa/schedule</span>
      </div>

      <div className="p-4 md:p-6">
        {/* day tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-4">
          {DAYS.map((d, i) => {
            const on = i === dayIdx;
            return (
              <button
                key={d.n}
                onClick={() => setDayIdx(i)}
                className="text-left px-4 py-3 rounded-[14px] cursor-pointer"
                style={{ background: on ? RED : "#fff", border: `1px solid ${on ? RED : RULE}`, transition: "all 200ms" }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] font-bold" style={{ color: on ? "#fff" : INK }}>{d.label}</span>
                  <span className="inline-flex items-center gap-1 text-[9.5px] font-bold px-1.5 py-0.5 rounded-full"
                    style={d.state === "Live"
                      ? { background: on ? "rgba(255,255,255,0.2)" : `${RED}12`, color: on ? "#fff" : RED }
                      : { background: on ? "rgba(255,255,255,0.16)" : WASH, color: on ? "#fff" : MUTED }}>
                    {d.state === "Live" && <span className="rounded-full" style={{ width: 5, height: 5, background: on ? "#fff" : RED }} />}
                    {d.state}
                  </span>
                </div>
                <p className="text-[10.5px]" style={{ color: on ? "rgba(255,255,255,0.72)" : MUTED }}>{d.date}</p>
              </button>
            );
          })}
        </div>

        {/* day summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-4">
          {[
            { icon: FaClock, l: "Show hours", v: day.hours },
            { icon: FaLayerGroup, l: "Events today", v: `${day.events.length} sessions` },
            { icon: FaStar, l: "Headline", v: day.headline },
            { icon: FaLocationDot, l: "Zones in use", v: "Halls A & B · Zone C · Arena" },
          ].map((s) => (
            <div key={s.l} className="p-3.5 rounded-[14px]" style={{ background: "#fff", border: `1px solid ${RULE}` }}>
              <p className="flex items-center gap-1.5 text-[10px] font-bold mb-1.5" style={{ color: MUTED }}><s.icon size={10} /> {s.l}</p>
              <p className="text-[12px] font-semibold leading-snug" style={{ color: INK }}>{s.v}</p>
            </div>
          ))}
        </div>

        {/* search + filters */}
        <div className="flex items-center gap-2 px-4 py-2.5 mb-3 rounded-full" style={{ background: "#fff", border: `1px solid ${RULE}` }}>
          <FaMagnifyingGlass size={13} color={MUTED} />
          <span className="text-[12.5px]" style={{ color: MUTED }}>Search brands, cars, experiences or speakers…</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4" style={{ scrollbarWidth: "none" }}>
          {FILTERS.map((f) => {
            const on = filter === f.key;
            const c = f.key === "all" ? RED : TRACKS[f.key].color;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="px-3.5 py-1.5 rounded-full text-[11.5px] font-bold whitespace-nowrap flex-shrink-0 cursor-pointer"
                style={on ? { background: c, color: "#fff", border: `1px solid ${c}` } : { background: "#fff", color: BODY, border: `1px solid ${RULE}` }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* events */}
        <div className="flex flex-col gap-2.5">
          {list.length === 0 && (
            <div className="p-8 text-center rounded-[16px]" style={{ background: "#fff", border: `1px dashed ${RULE}` }}>
              <FaFilter size={16} color={MUTED} className="mx-auto mb-2" />
              <p className="text-[12.5px]" style={{ color: BODY }}>No sessions in this track on {day.label} — the filter tells the visitor that instantly instead of showing an empty day.</p>
            </div>
          )}
          {list.map((e) => (
            <EventRow
              key={`${day.n}-${e.title}`}
              e={e}
              saved={!!saved[`${day.n}-${e.title}`]}
              onSave={() => setSaved((s) => ({ ...s, [`${day.n}-${e.title}`]: !s[`${day.n}-${e.title}`] }))}
            />
          ))}
        </div>

        <p className="text-[10.5px] mt-4 text-center" style={{ color: MUTED }}>
          Working prototype — pick a day, filter a track, save a session. Content is illustrative; statuses are shown as they would appear during show days.
        </p>
      </div>
    </div>
  );
}

/* ═══════════ Annotated event card ═══════════ */
function EventAnatomy() {
  const notes: { n: string; t: string; d: string }[] = [
    { n: "1", t: "Start and end time", d: "Drives the reminder, the conflict warning and the day view sort order." },
    { n: "2", t: "Track colour bar", d: "One hue per track, carried across the site, the screens and the map." },
    { n: "3", t: "Title, brand and venue", d: "The exhibitor gets billing on every surface their session appears on." },
    { n: "4", t: "Live status", d: "Changed once in the dashboard, reflected everywhere within seconds." },
    { n: "5", t: "Audience rule", d: "Tells the visitor upfront whether this session is open to them." },
    { n: "6", t: "One primary action", d: "The action matches the event type — never a generic register button." },
  ];
  return (
    <div className="grid lg:grid-cols-[1.15fr_1fr] gap-6 items-start">
      <div className="p-5 md:p-6" style={{ ...card, borderLeft: `4px solid ${RED}` }}>
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded" style={{ background: `${RED}12`, color: RED }}>1</span>
            <p className="text-[15px] font-bold mt-1.5" style={{ color: INK }}>6:00 PM – 6:30 PM</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-bold" style={{ background: `${F_SAND}12`, color: F_SAND, border: `1px solid ${F_SAND}28` }}>
            <span className="rounded-full" style={{ width: 6, height: 6, background: F_SAND }} /> Starting Soon <span style={{ color: MUTED }}>· 4</span>
          </span>
        </div>
        <h4 className="heading text-2xl mb-1.5" style={{ color: INK }}>Soueast S09 Regional Reveal <span className="text-[11px] align-super" style={{ color: RED }}>3</span></h4>
        <p className="flex items-center gap-1.5 text-[12.5px] mb-3" style={{ color: BODY }}><FaLocationDot size={12} color={MUTED} /> Main Stage — Hall A</p>
        <p className="text-[13px] leading-relaxed mb-4" style={{ color: BODY }}>
          The regional reveal of the Soueast S09 — design, technology and performance walked through on the main stage.
        </p>
        <div className="flex items-center gap-2 flex-wrap mb-5">
          <Chip color={RED}><FaCar size={10} /> Vehicle Launch <span style={{ opacity: 0.6 }}>· 2</span></Chip>
          <Chip color={F_GREEN}>Open to Everyone <span style={{ opacity: 0.6 }}>· 5</span></Chip>
          <Chip color={F_SLATE}>Soueast</Chip>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12.5px] font-bold" style={{ background: RED, color: "#fff" }}>
            <FaCalendarDays size={13} /> Add to My Schedule <span style={{ opacity: 0.65 }}>· 6</span>
          </span>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12.5px] font-bold" style={{ background: "#fff", color: INK, border: `1.5px solid ${RULE}` }}>
            <FaLocationArrow size={13} /> Get Directions
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        {notes.map((x) => (
          <div key={x.n} className="flex items-start gap-3 p-3.5 rounded-[14px]" style={{ background: WASH, border: `1px solid ${RULE}` }}>
            <span className="rounded-full flex items-center justify-center text-[10.5px] font-bold flex-shrink-0" style={{ width: 22, height: 22, background: RED, color: "#fff" }}>{x.n}</span>
            <div>
              <p className="text-[12.5px] font-bold" style={{ color: INK }}>{x.t}</p>
              <p className="text-[11.5px] leading-snug" style={{ color: BODY }}>{x.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════ WhatsApp phone mock ═══════════ */
type Bubble = { text: string; buttons?: string[]; time: string };
const WA_THREADS: { t: string; d: string; msgs: Bubble[] }[] = [
  {
    t: "The 15-minute reminder", d: "The single message that converts a saved session into an attended one.",
    msgs: [
      { text: "The Soueast S09 Regional Reveal you saved starts in 15 minutes at Main Stage — Hall A.", buttons: ["Open Map", "Remove Reminder"], time: "5:45 PM" },
    ],
  },
  {
    t: "Change and capacity", d: "Operations changes reach the visitor before they walk to the wrong hall.",
    msgs: [
      { text: "The session location has changed to Main Stage — Hall B.", buttons: ["Open Map"], time: "3:12 PM" },
      { text: "This session has reached full capacity. You can join the waiting list.", buttons: ["Join Waiting List"], time: "4:02 PM" },
    ],
  },
  {
    t: "Test drive and follow-up", d: "The booked experiences and the after-show conversation.",
    msgs: [
      { text: "Your booked test drive starts in 20 minutes. Please head to the Test Drive Zone.", buttons: ["Open Map"], time: "6:55 PM" },
      { text: "Thank you for attending. Share your rating of the experience.", buttons: ["Rate Now"], time: "9:30 PM" },
    ],
  },
];

function PhoneMock({ msgs }: { msgs: Bubble[] }) {
  return (
    <div className="mx-auto" style={{ width: 268, borderRadius: 30, border: `8px solid ${INK}`, background: "#ECE5DD", overflow: "hidden", boxShadow: "0 24px 60px -24px rgba(0,0,0,0.30)" }}>
      <div className="px-3 py-2.5 flex items-center gap-2.5" style={{ background: "#075E54" }}>
        <span className="rounded-full flex items-center justify-center" style={{ width: 30, height: 30, background: "#fff" }}>
          <span className="heading text-[10px]" style={{ color: "#075E54" }}>JIMS</span>
        </span>
        <div>
          <p className="text-[11.5px] font-bold" style={{ color: "#fff" }}>JIMS 2026</p>
          <p className="text-[9px]" style={{ color: "rgba(255,255,255,0.7)" }}>Official event account</p>
        </div>
      </div>
      <div className="p-3 flex flex-col gap-2.5" style={{ minHeight: 236 }}>
        {msgs.map((m, i) => (
          <div key={i} className="rounded-[12px] p-2.5" style={{ background: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,0.08)" }}>
            <p className="text-[11.5px] leading-relaxed" style={{ color: INK }}>{m.text}</p>
            <p className="text-[8.5px] text-right mt-1" style={{ color: MUTED }}>{m.time}</p>
            {m.buttons && (
              <div className="mt-2 pt-2 flex flex-col gap-1.5" style={{ borderTop: `1px solid ${RULE}` }}>
                {m.buttons.map((b) => (
                  <span key={b} className="text-[11px] font-bold text-center py-1.5 rounded-[8px]" style={{ color: "#00A5F4", background: "#F7FBFF" }}>{b}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════ QR pass ═══════════ */
function QrArt({ size = 118, color = INK }: { size?: number; color?: string }) {
  const n = 21;
  const cell = size / n;
  const cells: React.ReactNode[] = [];
  const finder = (r: number, c: number) =>
    (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7);
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (finder(r, c)) continue;
      const v = (r * 31 + c * 17 + ((r * c) % 7) + ((r + c) % 3)) % 5;
      if (v < 2) cells.push(<rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell} height={cell} fill={color} />);
    }
  }
  const eye = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width={cell * 7} height={cell * 7} fill="none" stroke={color} strokeWidth={cell} />
      <rect x={x + cell * 2} y={y + cell * 2} width={cell * 3} height={cell * 3} fill={color} />
    </g>
  );
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Visitor pass QR code illustration">
      <rect width={size} height={size} fill="#fff" />
      {cells}
      {eye(cell * 0.5, cell * 0.5)}
      {eye(size - cell * 7.5, cell * 0.5)}
      {eye(cell * 0.5, size - cell * 7.5)}
    </svg>
  );
}

/* ═══════════ Venue screen (a real screen — the one dark surface on the page) ═══════════ */
function ScreenMock() {
  const rows = [
    { tag: "LIVE", tagColor: RED, title: "Soueast S09 Reveal", where: "Main Stage — Hall A", when: "Now" },
    { tag: "IN 10 MIN", tagColor: F_SAND, title: "Future Mobility Panel", where: "Hall B — Tech Stage", when: "6:40 PM" },
    { tag: "NEXT SLOT", tagColor: F_GREEN, title: "Test Drive", where: "Test Drive Zone", when: "6:45 PM" },
    { tag: "OPEN NOW", tagColor: F_PLUM, title: "Family Experience", where: "Zone C", when: "Until 9:00 PM" },
  ];
  return (
    <div className="rounded-[20px] overflow-hidden" style={{ background: INK, border: `1px solid ${INK}` }}>
      <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="flex items-center gap-2.5">
          <span className="heading text-[15px]" style={{ color: "#fff" }}>Happening Now</span>
          <span className="rounded-full" style={{ width: 7, height: 7, background: RED_SOFT }} />
        </div>
        <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>Day 1 · Wednesday, August 26</span>
      </div>
      <div>
        {rows.map((r) => (
          <div key={r.title} className="px-6 py-4 flex items-center gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <span className="text-[9.5px] font-bold px-2 py-1 rounded flex-shrink-0" style={{ background: r.tagColor, color: "#fff", minWidth: 74, textAlign: "center" }}>{r.tag}</span>
            <div className="flex-1 min-w-0">
              <p className="heading text-[14px] truncate" style={{ color: "#fff" }}>{r.title}</p>
              <p className="text-[11px] truncate" style={{ color: "rgba(255,255,255,0.5)" }}>{r.where}</p>
            </div>
            <span className="text-[12px] font-bold flex-shrink-0" style={{ color: "rgba(255,255,255,0.8)" }}>{r.when}</span>
          </div>
        ))}
      </div>
      <div className="px-6 py-3 flex items-center justify-between" style={{ background: "rgba(255,255,255,0.04)" }}>
        <span className="text-[10.5px]" style={{ color: "rgba(255,255,255,0.45)" }}>Scan any pass to check in · jims.com.sa/schedule</span>
        <span className="text-[10.5px]" style={{ color: "rgba(255,255,255,0.45)" }}>Updated live from the dashboard</span>
      </div>
    </div>
  );
}

/* ═══════════ Operations dashboard ═══════════ */
function DashboardMock() {
  const rows: { title: string; time: string; place: string; status: StatusKey; booked: string; cap: number }[] = [
    { title: "Soueast S09 Regional Reveal", time: "6:00 PM", place: "Main Stage — Hall A", status: "soon", booked: "412 / 500", cap: 82 },
    { title: "Test Drive Session", time: "7:15 PM", place: "Test Drive Zone", status: "full", booked: "40 / 40", cap: 100 },
    { title: "Drift Show", time: "8:00 PM", place: "Outdoor Arena", status: "live", booked: "Open entry", cap: 0 },
    { title: "Fleet Managers Forum", time: "3:00 PM", place: "Business Lounge", status: "booking", booked: "63 / 120", cap: 53 },
  ];
  return (
    <div className="rounded-[20px] overflow-hidden" style={{ border: `1px solid ${RULE}`, background: "#fff" }}>
      <div className="px-5 py-3.5 flex items-center justify-between" style={{ borderBottom: `1px solid ${RULE}`, background: WASH }}>
        <span className="flex items-center gap-2 heading text-[13px]" style={{ color: INK }}><FaTableColumns size={14} color={RED} /> Live Operations — Day 1</span>
        <span className="text-[10.5px] px-2.5 py-1 rounded-full" style={{ background: `${RED}12`, color: RED, fontWeight: 700 }}>Organiser access</span>
      </div>
      <div className="hidden md:grid grid-cols-[1.6fr_0.7fr_1.1fr_1fr_0.9fr] gap-3 px-5 py-2.5 text-[10px] font-bold" style={{ color: MUTED, borderBottom: `1px solid ${RULE}` }}>
        <span>Session</span><span>Time</span><span>Location</span><span>Status</span><span>Booked</span>
      </div>
      {rows.map((r) => {
        const st = STATUSES[r.status];
        return (
          <div key={r.title} className="grid grid-cols-1 md:grid-cols-[1.6fr_0.7fr_1.1fr_1fr_0.9fr] gap-2 md:gap-3 px-5 py-3.5 items-center" style={{ borderBottom: `1px solid ${RULE}` }}>
            <span className="text-[12.5px] font-semibold" style={{ color: INK }}>{r.title}</span>
            <span className="text-[11.5px]" style={{ color: BODY }}>{r.time}</span>
            <span className="text-[11.5px]" style={{ color: BODY }}>{r.place}</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-bold w-fit" style={{ background: `${st.color}12`, color: st.color, border: `1px solid ${st.color}28` }}>
              <span className="rounded-full" style={{ width: 5, height: 5, background: st.color }} /> {st.label}
            </span>
            <div>
              <span className="text-[11.5px] font-semibold" style={{ color: INK }}>{r.booked}</span>
              {r.cap > 0 && (
                <div className="mt-1 rounded-full overflow-hidden" style={{ height: 4, background: RULE }}>
                  <div style={{ width: `${r.cap}%`, height: "100%", background: r.cap >= 100 ? F_SLATE : RED, borderRadius: 4 }} />
                </div>
              )}
            </div>
          </div>
        );
      })}
      <div className="px-5 py-3 flex flex-wrap gap-2">
        {["Change time", "Change location", "Change status", "Adjust seats", "Edit description", "Assign speaker", "Push to screens"].map((a) => (
          <span key={a} className="text-[10.5px] font-semibold px-2.5 py-1 rounded-full" style={{ background: WASH, color: BODY, border: `1px solid ${RULE}` }}>{a}</span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════ Sponsor funnel — one hue (red), magnitude by length and shade ═══════════ */
const FUNNEL: { label: string; v: number }[] = [
  { label: "Viewed the launch page", v: 1800 },
  { label: "Added it to their schedule", v: 720 },
  { label: "Attended in person", v: 510 },
  { label: "Opened directions to the hall", v: 240 },
  { label: "Requested more information", v: 160 },
  { label: "Booked a test drive", v: 95 },
  { label: "Asked the dealer to contact them", v: 65 },
];
function SponsorFunnel() {
  const max = FUNNEL[0].v;
  const shades = [RED_DEEP, "#C22036", RED, "#E04A5D", "#E8707F", "#F0969F", "#F5BCC2"];
  return (
    <div className="p-6 md:p-8" style={card}>
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <p className="text-[10.5px] font-bold tracking-[2px] mb-1" style={{ color: RED }}>SAMPLE SPONSOR REPORT</p>
          <h4 className="heading text-xl" style={{ color: INK }}>Soueast S09 Regional Reveal</h4>
          <p className="text-[12px]" style={{ color: MUTED }}>Day 1 · Main Stage — Hall A · illustrative figures</p>
        </div>
        <div className="flex gap-2.5">
          <div className="px-3.5 py-2 rounded-[12px] text-center" style={{ background: WASH, border: `1px solid ${RULE}` }}>
            <p className="heading text-lg" style={{ color: INK }}>40%</p>
            <p className="text-[10px]" style={{ color: MUTED }}>page → saved</p>
          </div>
          <div className="px-3.5 py-2 rounded-[12px] text-center" style={{ background: WASH, border: `1px solid ${RULE}` }}>
            <p className="heading text-lg" style={{ color: RED }}>71%</p>
            <p className="text-[10px]" style={{ color: MUTED }}>saved → attended</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {FUNNEL.map((f, i) => (
          <div key={f.label} className="grid grid-cols-[1fr] md:grid-cols-[220px_1fr] gap-2 md:gap-4 items-center">
            <span className="text-[12px] font-medium" style={{ color: BODY }}>{f.label}</span>
            <div className="flex items-center gap-3">
              <div className="flex-1" style={{ background: WASH, borderRadius: 4, height: 26, overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(f.v / max) * 100}%` }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.9, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ height: "100%", background: shades[i], borderTopRightRadius: 4, borderBottomRightRadius: 4 }}
                />
              </div>
              <span className="text-[13px] font-bold tabular-nums" style={{ color: INK, minWidth: 46, textAlign: "right" }}>{f.v.toLocaleString("en-US")}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[11px] mt-5 pt-4" style={{ color: MUTED, borderTop: `1px solid ${RULE}` }}>
        Every step above is a number the platform already holds — page views, saves, QR check-ins, map opens, form submits and booking records. The report is a read of the database, not a survey.
      </p>
    </div>
  );
}

/* ═══════════ Visitor journey ═══════════ */
const JOURNEY: { phase: string; icon: IconType; steps: string[] }[] = [
  { phase: "Before the show", icon: FaMobileScreen, steps: [
    "Sees the campaign, a Newsroom story or an external listing",
    "Lands on the Visitors or the Business & Government page",
    "Registers and receives a QR pass",
    "Browses the JIMS Live Schedule",
    "Adds sessions to My JIMS Schedule",
    "Gets confirmation and reminders on WhatsApp",
  ] },
  { phase: "During the show", icon: FaTicket, steps: [
    "Enters with the QR pass",
    "Receives a welcome message on arrival",
    "Opens the schedule for the day",
    "Gets a reminder before each saved session",
    "Uses directions to reach the hall or zone",
    "Attends sessions and test drives — attendance is recorded",
  ] },
  { phase: "After the show", icon: FaHandshake, steps: [
    "Receives a thank-you message",
    "Gets a recap of the sessions attended",
    "Receives offers from the vehicles shown interest in",
    "Can book a test drive after the show",
    "Shares a rating of the experience",
    "Leads are followed up with the exhibitors",
  ] },
];

/* ═══════════ Delivery phases ═══════════ */
const PHASES: { n: string; title: string; icon: IconType; items: string[]; note: string }[] = [
  { n: "01", title: "Register", icon: FaTicket, note: "Everything needed to open registration and start collecting the audience.",
    items: ["Business & Government landing page", "Visitors landing page", "Registration system", "QR pass", "WATI integration", "JIMS Newsroom"] },
  { n: "02", title: "Publish & Plan", icon: FaCalendarDays, note: "The schedule goes live and the visitor starts building a personal plan.",
    items: ["JIMS Live Schedule", "Speakers section", "Event detail pages", "Search and filters", "My JIMS Schedule", "WhatsApp reminders"] },
  { n: "03", title: "Book", icon: FaUserCheck, note: "Seats, slots and meetings become real inventory with capacity rules.",
    items: ["Booking and capacity management", "Test drive booking", "Business meeting booking", "Access requests", "Live event status", "Interactive venue map"] },
  { n: "04", title: "Operate & Report", icon: FaChartColumn, note: "Show days run from one dashboard, and the value is proven afterwards.",
    items: ["QR check-in for sessions", "Exhibitor and sponsor reports", "Live operations dashboard", "Screen integration", "Post-event follow-up", "Advanced analytics"] },
];

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function JimsProposal() {
  const [active, setActive] = useState("overview");
  const [prog, setProg] = useState(0);
  const [left, setLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, SHOW_START - Date.now());
      setLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setProg((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100);
      let cur = ALL_IDS[0];
      for (const id of ALL_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) cur = id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const [waIdx, setWaIdx] = useState(0);

  return (
    <main style={{ background: "#fff", color: INK }}>
      <style>{`
        section[id], footer[id] { scroll-margin-top: 90px; }
        @media (min-width: 1024px) { section[id], footer[id] { scroll-margin-top: 20px; } }
        .jims-grid { background-image: linear-gradient(${RULE} 1px, transparent 1px), linear-gradient(90deg, ${RULE} 1px, transparent 1px); background-size: 56px 56px; }
        @keyframes jimsTicker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .jims-ticker { display: flex; width: max-content; animation: jimsTicker 34s linear infinite; }
        @keyframes jimsMouse { 0% { transform: translateY(0); opacity: 1; } 75% { transform: translateY(9px); opacity: 0; } 76% { transform: translateY(0); opacity: 0; } 100% { opacity: 1; } }
      `}</style>

      {/* progress */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 60 }}>
        <div style={{ height: "100%", width: `${prog}%`, background: RED, transition: "width 0.1s" }} />
      </div>

      <SectionNav active={active} go={go} />

      {/* mobile bar */}
      <nav className="xl:hidden" style={{ position: "fixed", top: 3, left: 0, right: 0, zIndex: 50, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(14px)", borderBottom: `1px solid ${RULE}` }}>
        <div className="px-4 h-12 flex items-center justify-between">
          <span className="heading text-[13px]" style={{ color: INK }}>JIMS 2026 · Platform Proposal</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${RED}12`, color: RED, fontWeight: 700 }}>26–29 Aug</span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto px-4 pb-2" style={{ scrollbarWidth: "none" }}>
          {ALL_IDS.map((id) => {
            const label = NAV_GROUPS.flatMap((g) => g.items).find((i) => i.id === id)!.label;
            const on = active === id;
            return (
              <button key={id} onClick={() => go(id)} className="text-[11px] px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0 cursor-pointer border-0"
                style={{ background: on ? RED : WASH, color: on ? "#fff" : BODY, fontWeight: on ? 700 : 500 }}>
                {label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative overflow-hidden px-5 pt-32 pb-16 xl:pt-24 flex flex-col items-center justify-center" style={{ background: "#fff", minHeight: "100vh" }}>
        <div className="jims-grid absolute inset-0 pointer-events-none" style={{ opacity: 0.5, maskImage: "radial-gradient(ellipse at 50% 35%, #000 20%, transparent 72%)", WebkitMaskImage: "radial-gradient(ellipse at 50% 35%, #000 20%, transparent 72%)" }} />
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex items-center gap-2 mb-6">
            <span className="text-[11px] font-bold px-3 py-1.5 rounded-full" style={{ background: WASH, color: BODY, border: `1px solid ${RULE}` }}>Jeddah International Motor Show</span>
            <span className="text-[11px] font-bold px-3 py-1.5 rounded-full" style={{ background: `${RED}0F`, color: RED }}>26–29 August 2026</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08 }}
            className="heading mb-2" style={{ fontSize: "clamp(56px,13vw,148px)", lineHeight: 0.9, color: INK, letterSpacing: "-0.03em" }}>
            JIMS<span style={{ color: RED }}>.</span>2026
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.14 }}
            className="heading text-lg md:text-2xl mb-4" style={{ color: INK }}>
            Digital Event Platform & Visitor Experience
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[14px] md:text-[16px] leading-relaxed mb-9 max-w-2xl" style={{ color: BODY }}>
            A proposal to develop the JIMS platform into the show&rsquo;s main point of contact with every audience — before, during and after the four days at JCEE, Jeddah.
          </motion.p>

          {/* countdown */}
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.26 }} className="mb-8">
            <div className="flex items-stretch rounded-[18px] overflow-hidden" style={{ border: `1px solid ${RULE}`, background: "#fff" }}>
              {[
                { v: left?.d, l: "days" }, { v: left?.h, l: "hours" }, { v: left?.m, l: "minutes" }, { v: left?.s, l: "seconds" },
              ].map((c, i) => (
                <div key={c.l} className="px-5 md:px-8 py-4 text-center" style={{ borderLeft: i > 0 ? `1px solid ${RULE}` : "none" }}>
                  <p className="heading tabular-nums" style={{ fontSize: "clamp(22px,5vw,36px)", lineHeight: 1, color: INK }}>
                    {c.v === undefined || c.v === null ? "—" : String(c.v).padStart(2, "0")}
                  </p>
                  <p className="text-[9.5px] font-bold mt-1.5 tracking-wider" style={{ color: MUTED }}>{c.l.toUpperCase()}</p>
                </div>
              ))}
            </div>
            <p className="text-[10.5px] mt-2" style={{ color: MUTED }}>to doors open · Day 1 · JCEE, Jeddah</p>
          </motion.div>

          {/* from / to */}
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.32 }} className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl mb-9 text-left">
            <div className="p-5" style={card}>
              <p className="text-[10px] font-bold tracking-[2px] mb-2" style={{ color: MUTED }}>PREPARED BY</p>
              <p className="text-[14px] font-bold" style={{ color: INK }}>Ahmed Ali</p>
              <p className="text-[11.5px]" style={{ color: BODY }}>Head of Digital Product &amp; Growth</p>
              <p className="text-[11.5px]" style={{ color: MUTED }}>hello@ahmedali.online</p>
            </div>
            <div className="p-5" style={cardTop()}>
              <p className="text-[10px] font-bold tracking-[2px] mb-2" style={{ color: RED }}>PREPARED FOR</p>
              <p className="text-[14px] font-bold" style={{ color: INK }}>Jeddah International Motor Show 2026</p>
              <p className="text-[11.5px]" style={{ color: BODY }}>Jeddah Center for Forums &amp; Events (JCEE)</p>
              <p className="text-[11.5px]" style={{ color: MUTED }}>26–29 August 2026</p>
            </div>
          </motion.div>

          <div className="flex flex-col items-center gap-2">
            <div style={{ width: 24, height: 38, border: `1.5px solid ${RULE}`, borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 5 }}>
              <div style={{ width: 3, height: 6, borderRadius: 2, background: RED, animation: "jimsMouse 1.6s ease-in-out infinite" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ticker */}
      <div className="py-3 overflow-hidden" style={{ background: "#fff", borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}` }}>
        <div className="jims-ticker">
          {[0, 1].map((k) => (
            <div key={k} className="flex items-center gap-8 pr-8">
              {["Registration & QR Pass", "JIMS Newsroom", "Speakers", "JIMS Live Schedule", "My JIMS Schedule", "WhatsApp Reminders", "Test Drive Booking", "Venue Screens", "Live Operations Dashboard", "Sponsor Reporting"].map((t) => (
                <span key={t} className="flex items-center gap-8 text-[12px] font-semibold whitespace-nowrap" style={{ color: BODY }}>
                  {t} <span className="rounded-full" style={{ width: 5, height: 5, background: RED }} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════ 01 · THE IDEA ═══════════ */}
      <section id="overview" className="px-5 py-24" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SH n="01 · THE IDEA" title="More than a" accent="registration site"
              sub="The platform becomes the main point of contact between the show and every audience it serves — before the doors open, across the four days, and after the halls close." />
          </Reveal>

          <Reveal>
            <div className="grid md:grid-cols-[1.1fr_1fr] gap-5 mb-6">
              <div className="p-7 md:p-9" style={{ ...card, borderLeft: `4px solid ${RED}` }}>
                <p className="text-[10.5px] font-bold tracking-[2px] mb-4" style={{ color: RED }}>THE SHIFT</p>
                <p className="heading text-2xl md:text-[32px] leading-snug mb-6" style={{ color: INK }}>
                  A site that takes a name once, becomes a platform the visitor keeps coming back to.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { a: "One form", b: "Two clear doors" },
                    { a: "A static agenda", b: "A live schedule" },
                    { a: "A page view", b: "A personal plan" },
                    { a: "A headcount", b: "A measured funnel" },
                  ].map((x) => (
                    <div key={x.a} className="p-3.5 rounded-[14px]" style={{ background: WASH, border: `1px solid ${RULE}` }}>
                      <p className="text-[11px] line-through" style={{ color: MUTED }}>{x.a}</p>
                      <p className="text-[12.5px] font-bold mt-0.5" style={{ color: RED }}>{x.b}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-7" style={card}>
                <p className="text-[10.5px] font-bold tracking-[2px] mb-4" style={{ color: RED }}>WHAT THE PLATFORM COVERS</p>
                <div className="flex flex-col gap-2.5">
                  {[
                    { icon: FaTicket, t: "Visitor, company and government registration" },
                    { icon: FaNewspaper, t: "Show news and updates" },
                    { icon: FaMicrophone, t: "Speakers and sessions" },
                    { icon: FaCalendarDays, t: "A live, always-current schedule" },
                    { icon: FaUserCheck, t: "A personal schedule for every visitor" },
                    { icon: FaWhatsapp, t: "Reminders and updates over WhatsApp" },
                    { icon: FaChartColumn, t: "Attendance and engagement measurement" },
                    { icon: FaFileLines, t: "Clear reporting for organisers, sponsors and exhibitors" },
                  ].map((x) => (
                    <div key={x.t} className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ background: `${RED}0D` }}>
                        <x.icon size={14} color={RED} />
                      </span>
                      <span className="text-[12.5px]" style={{ color: BODY }}>{x.t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {[
                { icon: FaArrowTrendUp, t: "More registrations" },
                { icon: FaUserCheck, t: "Higher actual attendance" },
                { icon: FaStar, t: "A better visitor experience" },
                { icon: FaRoute, t: "Smoother crowd flow inside the venue" },
                { icon: FaChartColumn, t: "Measurable commercial value for sponsors and exhibitors" },
              ].map((g, i) => (
                <div key={g.t} className="p-5 text-center" style={cardTop()}>
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-full mb-3" style={{ background: `${RED}0D` }}>
                    <g.icon size={17} color={RED} />
                  </span>
                  <p className="text-[10px] font-bold mb-1" style={{ color: RED }}>GOAL {i + 1}</p>
                  <p className="text-[12.5px] font-semibold leading-snug" style={{ color: INK }}>{g.t}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 02 · PLATFORM MAP ═══════════ */}
      <section id="platform" className="px-5 py-24" style={{ background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SH n="02 · PLATFORM MAP" title="One platform," accent="four branches"
              sub="Every component in this proposal belongs to one of four branches — the only place on this page where a second colour is used, because here colour tells one branch from another." />
          </Reveal>
          <Reveal><PlatformTree /></Reveal>
        </div>
      </section>

      {/* ═══════════ 03 · LANDING PAGES ═══════════ */}
      <section id="landing" className="px-5 py-24" style={{ background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SH n="03 · LANDING PAGES" title="Two doors," accent="not twenty"
              sub="The registration journey is split into two landing pages only, so the experience stays clear instead of turning into a menu of forms." />
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-5">
            {[
              {
                icon: FaBriefcase, kicker: "PAGE ONE", title: "Business & Government",
                who: ["Government entities", "Companies", "Fleet managers", "Procurement managers", "Investors", "Potential partners", "Exhibitors", "Sponsors", "Media and specialists"],
                content: [
                  "Why the show matters to the automotive and mobility sector",
                  "Participating entities and brands",
                  "Meeting and partnership opportunities",
                  "Sessions and events dedicated to business",
                  "Government and trade delegation information",
                  "Request attendance or a meeting",
                  "Register individuals or full delegations",
                  "Invitation to closed sessions",
                ],
                actions: ["Register as Business Visitor", "Register Government Delegation", "Request Access", "Book a Meeting", "Become an Exhibitor", "Become a Sponsor", "Media Accreditation"],
              },
              {
                icon: FaUsers, kicker: "PAGE TWO", title: "Visitors",
                who: ["Individuals", "Families", "Car enthusiasts", "People planning to buy a car", "People interested in new technology", "Visitors looking for experiences and entertainment"],
                content: [
                  "The headline cars and brands taking part",
                  "Test drives",
                  "Vehicle launches",
                  "Live shows",
                  "Family activities",
                  "Technology and innovation",
                  "Show dates and location",
                  "How to register and enter",
                ],
                actions: ["Get My Pass", "View Live Schedule", "Explore Experiences", "Book a Test Drive", "Build My Schedule", "Get Directions"],
              },
            ].map((p, i) => (
              <Reveal key={p.title} delay={i * 0.07}>
                <div className="h-full p-7 md:p-8" style={cardTop()}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-12 h-12 rounded-[14px] flex items-center justify-center flex-shrink-0" style={{ background: `${RED}0D` }}>
                      <p.icon size={20} color={RED} />
                    </span>
                    <div>
                      <p className="text-[10px] font-bold tracking-[2px]" style={{ color: RED }}>{p.kicker}</p>
                      <h3 className="heading text-2xl" style={{ color: INK }}>{p.title}</h3>
                    </div>
                  </div>

                  <p className="text-[10.5px] font-bold tracking-[1.5px] mb-2.5" style={{ color: MUTED }}>WHO IT TARGETS</p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {p.who.map((w) => (
                      <span key={w} className="px-2.5 py-1 rounded-full text-[10.5px] font-semibold" style={{ background: WASH, color: BODY, border: `1px solid ${RULE}` }}>{w}</span>
                    ))}
                  </div>

                  <p className="text-[10.5px] font-bold tracking-[1.5px] mb-2.5" style={{ color: MUTED }}>WHAT IT SHOWS</p>
                  <div className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5 mb-6">
                    {p.content.map((c) => (
                      <span key={c} className="flex items-start gap-2 text-[12px]" style={{ color: BODY }}>
                        <FaCircleCheck size={12} color={RED} className="flex-shrink-0 mt-0.5" /> {c}
                      </span>
                    ))}
                  </div>

                  <p className="text-[10.5px] font-bold tracking-[1.5px] mb-2.5" style={{ color: MUTED }}>PRIMARY ACTIONS</p>
                  <div className="flex flex-wrap gap-2">
                    {p.actions.map((a, j) => (
                      <span key={a} className="px-3.5 py-2 rounded-full text-[11.5px] font-bold"
                        style={j === 0 ? { background: RED, color: "#fff" } : { background: "#fff", color: RED, border: `1.5px solid ${RED}30` }}>
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 04 · REGISTRATION & PASS ═══════════ */}
      <section id="registration" className="px-5 py-24" style={{ background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SH n="04 · REGISTRATION & PASS" title="From a click to a" accent="scannable pass"
              sub="One flow, two entry points. Whatever door the visitor comes through, they leave with a QR pass and a WhatsApp thread that stays open until after the show." />
          </Reveal>

          <Reveal>
            <div className="mb-10">
              <FlowLine steps={[
                { n: "1", t: "Arrive", d: "From an ad, a Newsroom story or an external event listing.", icon: FaHandPointer },
                { n: "2", t: "Choose a door", d: "Visitors, or Business & Government.", icon: FaRoute },
                { n: "3", t: "Register", d: "Individual, family, company or full delegation.", icon: FaFileLines },
                { n: "4", t: "Get the pass", d: "A QR pass tied to a Visitor ID.", icon: FaQrcode },
                { n: "5", t: "Stay connected", d: "Confirmation and updates over WhatsApp.", icon: FaWhatsapp },
              ]} />
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-[minmax(0,300px)_1fr] gap-6 items-start">
            <Reveal>
              <div className="p-6 rounded-[22px]" style={{ background: "#fff", border: `1px solid ${RULE}` }}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="heading text-[15px]" style={{ color: INK }}>JIMS 2026</p>
                    <p className="text-[10.5px]" style={{ color: MUTED }}>Visitor Pass</p>
                  </div>
                  <Chip>Visitor</Chip>
                </div>
                <div className="flex justify-center py-3 mb-4 rounded-[14px]" style={{ background: WASH }}>
                  <QrArt />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[["Visitor ID", "JIMS-26-0148"], ["Valid", "26–29 Aug"], ["Access", "Halls A · B · Zone C"], ["Entry", "Gate 2"]].map(([k, v]) => (
                    <div key={k}>
                      <p className="text-[9.5px] font-bold" style={{ color: MUTED }}>{k.toUpperCase()}</p>
                      <p className="text-[12px] font-semibold" style={{ color: INK }}>{v}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[10.5px] leading-relaxed pt-3" style={{ color: MUTED, borderTop: `1px solid ${RULE}` }}>
                  The same code opens the gate, checks the visitor into sessions, and links every action back to one profile.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.07}>
              <div className="p-7" style={card}>
                <h4 className="heading text-xl mb-1" style={{ color: INK }}>What the pass unlocks on-site</h4>
                <p className="text-[12.5px] mb-5" style={{ color: BODY }}>
                  The entry QR — or the Visitor ID behind it — is reused everywhere instead of issuing a second credential for every activity.
                </p>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {[
                    { icon: FaCircleCheck, t: "Confirm attendance at a session" },
                    { icon: FaLock, t: "Enter a limited-capacity session" },
                    { icon: FaMicrophone, t: "Register speaker attendance" },
                    { icon: FaShieldHalved, t: "Verify a Business or Media pass" },
                    { icon: FaGaugeHigh, t: "Claim a test drive slot" },
                    { icon: FaClock, t: "Join a waiting list" },
                    { icon: FaBriefcase, t: "Enter the Business Lounge" },
                    { icon: FaChartColumn, t: "Measure real attendance, not registrations" },
                    { icon: FaStar, t: "Trigger the post-session rating request" },
                  ].map((x) => (
                    <div key={x.t} className="flex items-center gap-2.5 p-3 rounded-[12px]" style={{ background: WASH, border: `1px solid ${RULE}` }}>
                      <x.icon size={14} color={RED} className="flex-shrink-0" />
                      <span className="text-[12px]" style={{ color: BODY }}>{x.t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 05 · NEWSROOM ═══════════ */}
      <section id="newsroom" className="px-5 py-24" style={{ background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SH n="05 · NEWSROOM" title="JIMS" accent="Newsroom"
              sub="A daily news section inside the site that becomes the official source for every show update — and the content engine everything else draws from." />
          </Reveal>

          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-5 mb-5">
            <Reveal>
              <div className="p-6 md:p-7 h-full" style={cardTop()}>
                <p className="text-[10.5px] font-bold tracking-[2px] mb-4" style={{ color: RED }}>WHAT GETS PUBLISHED</p>
                <div className="grid sm:grid-cols-2 gap-x-5 gap-y-2">
                  {[
                    "A new company joins the show", "A new sponsor or partner is announced",
                    "A car brand confirms participation", "A new speaker is announced",
                    "A vehicle reveal is confirmed", "A new test drive experience is announced",
                    "Interviews with participants", "Preparation updates",
                    "Participating government entities", "Sponsor updates",
                    "A daily recap during show days", "Photos and videos from the floor",
                    "Post-event results and statistics",
                  ].map((x) => (
                    <span key={x} className="flex items-start gap-2 text-[12px]" style={{ color: BODY }}>
                      <span className="rounded-full flex-shrink-0 mt-1.5" style={{ width: 5, height: 5, background: RED }} /> {x}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.07}>
              <div className="p-6 md:p-7 h-full" style={card}>
                <p className="text-[10.5px] font-bold tracking-[2px] mb-4" style={{ color: MUTED }}>HEADLINES, AS THEY WOULD READ</p>
                <div className="flex flex-col gap-2.5">
                  {[
                    { h: "Soueast Joins JIMS 2026 as Strategic Sponsor", tag: "Sponsor" },
                    { h: "Motion Motors Confirms Participation at JIMS 2026", tag: "Exhibitor" },
                    { h: "New Automotive Technology Experience Announced", tag: "Experience" },
                    { h: "Government Mobility Leaders to Join JIMS 2026", tag: "Government" },
                    { h: "Regional Vehicle Reveal Confirmed for Jeddah", tag: "Launch" },
                    { h: "Day One Highlights from JIMS 2026", tag: "Recap" },
                  ].map((n) => (
                    <div key={n.h} className="flex items-start gap-3 p-3.5 rounded-[14px]" style={{ background: WASH, border: `1px solid ${RULE}` }}>
                      <FaNewspaper size={14} color={RED} className="flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-[12.5px] font-semibold leading-snug" style={{ color: INK }}>{n.h}</p>
                        <span className="text-[10px] font-bold" style={{ color: MUTED }}>{n.tag}</span>
                      </div>
                      <FaShareNodes size={12} color={MUTED} className="flex-shrink-0 mt-0.5" />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            <div className="p-6 md:p-8" style={card}>
              <div className="grid lg:grid-cols-[1fr_auto_1.2fr] gap-6 items-center">
                <div>
                  <p className="text-[10.5px] font-bold tracking-[2px] mb-3" style={{ color: RED }}>ONE STORY, MANY PLACES</p>
                  <h4 className="heading text-xl mb-2" style={{ color: INK }}>Every published story is written once and reused everywhere.</h4>
                  <p className="text-[12.5px] leading-relaxed" style={{ color: BODY }}>
                    Each piece becomes a link that can be pushed into campaigns, shared by the sponsor it features, and indexed by search — building an official archive of the show as it goes.
                  </p>
                </div>
                <div className="hidden lg:flex items-center justify-center">
                  <span className="rounded-full flex items-center justify-center" style={{ width: 40, height: 40, background: WASH, border: `1px solid ${RULE}` }}>
                    <FaArrowRight size={15} color={RED} />
                  </span>
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {["LinkedIn", "Instagram", "X", "Facebook", "WhatsApp", "Email marketing", "Google Search", "Press and media sites"].map((c) => (
                      <span key={c} className="px-3 py-1.5 rounded-full text-[11.5px] font-semibold" style={{ background: WASH, color: BODY, border: `1px solid ${RULE}` }}>{c}</span>
                    ))}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-x-5 gap-y-1.5">
                    {[
                      "Increases the show's visibility in Google",
                      "Feeds social media with a constant supply of content",
                      "Builds confidence among companies and visitors",
                      "Gives sponsors and exhibitors something to share",
                      "Improves the site's SEO",
                      "Builds an official archive of the event",
                      "Creates links that campaigns can point to",
                    ].map((b) => (
                      <span key={b} className="flex items-start gap-2 text-[12px]" style={{ color: BODY }}>
                        <FaCircleCheck size={12} color={RED} className="flex-shrink-0 mt-0.5" /> {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 06 · SPEAKERS ═══════════ */}
      <section id="speakers" className="px-5 py-24" style={{ background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SH n="06 · SPEAKERS" title="Speakers and" accent="sessions"
              sub="Where the show includes speakers or panel discussions, each one gets a profile that links straight into the schedule." />
          </Reveal>

          <div className="grid lg:grid-cols-[minmax(0,320px)_1fr] gap-6 items-start">
            <Reveal>
              <div className="p-6 rounded-[22px]" style={{ background: "#fff", border: `1px solid ${RULE}` }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="rounded-full flex items-center justify-center flex-shrink-0" style={{ width: 56, height: 56, background: `${RED}0D`, border: `1px dashed ${RED}40` }}>
                    <FaMicrophone size={20} color={RED} />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold" style={{ color: MUTED }}>SPEAKER PHOTO</p>
                    <p className="heading text-[16px]" style={{ color: INK }}>Speaker name</p>
                    <p className="text-[11.5px]" style={{ color: BODY }}>Job title · Company or entity</p>
                  </div>
                </div>
                <p className="text-[12px] leading-relaxed mb-4" style={{ color: BODY }}>
                  A short biography — enough for a visitor to decide whether this session is worth an hour of their day.
                </p>
                <div className="p-3.5 rounded-[14px] mb-4" style={{ background: WASH, border: `1px solid ${RULE}` }}>
                  <p className="text-[10px] font-bold mb-1" style={{ color: RED }}>SESSION</p>
                  <p className="text-[12.5px] font-semibold mb-1.5" style={{ color: INK }}>Session title</p>
                  <p className="flex items-center gap-1.5 text-[11.5px]" style={{ color: BODY }}><FaClock size={10} /> Day and time</p>
                  <p className="flex items-center gap-1.5 text-[11.5px]" style={{ color: BODY }}><FaLocationDot size={10} /> Session location</p>
                </div>
                <span className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-bold" style={{ background: RED, color: "#fff" }}>
                  <FaCalendarDays size={13} /> Add session to My Schedule
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.07}>
              <div className="p-7 h-full" style={card}>
                <h4 className="heading text-xl mb-1" style={{ color: INK }}>Speaker categories the show can host</h4>
                <p className="text-[12.5px] mb-5" style={{ color: BODY }}>
                  Each category maps to a track, so a visitor who follows one interest finds every relevant name in one place.
                </p>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {[
                    { t: "Government representatives", icon: FaLandmark },
                    { t: "Automotive company leaders", icon: FaCar },
                    { t: "Mobility experts", icon: FaRoute },
                    { t: "Electric vehicle experts", icon: FaBolt },
                    { t: "Technology experts", icon: FaMicrochip },
                    { t: "Fleet managers", icon: FaBriefcase },
                    { t: "Investors", icon: FaArrowTrendUp },
                    { t: "Finance and insurance specialists", icon: FaShieldHalved },
                    { t: "Media and content creators", icon: FaCamera },
                  ].map((x) => (
                    <div key={x.t} className="flex items-center gap-2.5 p-3 rounded-[12px]" style={{ background: WASH, border: `1px solid ${RULE}` }}>
                      <x.icon size={14} color={RED} className="flex-shrink-0" />
                      <span className="text-[12px]" style={{ color: BODY }}>{x.t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 07 · DISTRIBUTION ═══════════ */}
      <section id="distribution" className="px-5 py-24" style={{ background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SH n="07 · EXTERNAL LISTINGS" title="Published where people" accent="already look"
              sub="The show is not left to depend on its own site and ads alone. It is listed on the platforms Saudi audiences already use to discover and book events." />
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 mb-6">
              {[
                "Webook", "Platinumlist", "Conference & exhibition platforms", "Local event calendars",
                "Tourism & entertainment platforms", "Chamber of commerce platforms", "Automotive specialist sites",
                "Local media platforms", "Jeddah event platforms", "Google Events & Google Search",
              ].map((p) => (
                <div key={p} className="p-4 rounded-[14px] flex items-center gap-2.5" style={{ background: "#fff", border: `1px solid ${RULE}` }}>
                  <FaGlobe size={13} color={RED} className="flex-shrink-0" />
                  <span className="text-[11.5px] font-semibold leading-snug" style={{ color: INK }}>{p}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5">
            <Reveal>
              <div className="p-7 h-full" style={cardTop()}>
                <h4 className="heading text-lg mb-4" style={{ color: INK }}>Why list externally</h4>
                <div className="flex flex-col gap-2">
                  {[
                    "Reaches an audience already searching for events",
                    "Adds credibility to the show",
                    "Extends reach beyond the show's own followers",
                    "Brings visitors from other cities",
                    "Improves how the event appears in search results",
                    "Uses the listing platforms' own user bases",
                    "Lowers the cost of reaching the audience",
                  ].map((x) => (
                    <span key={x} className="flex items-start gap-2 text-[12.5px]" style={{ color: BODY }}>
                      <FaCircleCheck size={13} color={RED} className="flex-shrink-0 mt-0.5" /> {x}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.07}>
              <div className="p-7 h-full" style={card}>
                <h4 className="heading text-lg mb-4" style={{ color: INK }}>What every listing must carry</h4>
                <div className="flex flex-col gap-2">
                  {[
                    "Show information",
                    "Photos and videos",
                    "The official registration link",
                    "Location and dates",
                    "Entry types",
                    "Major updates as they happen",
                    "Traffic and registration reporting, where the platform provides it",
                  ].map((x) => (
                    <span key={x} className="flex items-start gap-2 text-[12.5px]" style={{ color: BODY }}>
                      <span className="rounded-full flex-shrink-0 mt-1.5" style={{ width: 5, height: 5, background: MUTED }} /> {x}
                    </span>
                  ))}
                </div>
                <div className="mt-5 p-4 rounded-[14px] flex items-start gap-2.5" style={{ background: WASH, border: `1px solid ${RULE}` }}>
                  <FaPaperPlane size={14} color={RED} className="flex-shrink-0 mt-0.5" />
                  <p className="text-[12px] leading-relaxed" style={{ color: BODY }}>
                    Every listing points back to the same registration link, so an external platform never becomes a second, disconnected source of visitor data.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 08 · LIVE SCHEDULE ═══════════ */}
      <section id="schedule" className="px-5 py-24" style={{ background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SH n="08 · LIVE SCHEDULE" title="JIMS" accent="Live Schedule"
              sub="All four days in one system: pick a day, filter a track, and every session shows its status, its audience rule and the one action it needs." />
          </Reveal>
          <Reveal><ScheduleDemo /></Reveal>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {[
              { s: "Upcoming", c: F_SLATE, d: "The day has not started. The visitor can browse its sessions and add them to a personal schedule." },
              { s: "Live", c: RED, d: "The day is running. Sessions happening now and next are pushed to the top." },
              { s: "Ended", c: MUTED, d: "The day is over. Finished sessions stay visible with photos and recaps." },
            ].map((x, i) => (
              <Reveal key={x.s} delay={i * 0.06}>
                <div className="p-5 h-full" style={cardTop(x.c)}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="rounded-full" style={{ width: 8, height: 8, background: x.c }} />
                    <p className="heading text-[15px]" style={{ color: INK }}>Day state: {x.s}</p>
                  </div>
                  <p className="text-[12.5px] leading-relaxed" style={{ color: BODY }}>{x.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.05}>
            <div className="mt-6 p-6 md:p-7" style={card}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-[10.5px] font-bold tracking-[2px] mb-3" style={{ color: RED }}>THE TRACKS BEHIND THE FILTERS</p>
                  <div className="flex flex-col gap-2">
                    {(Object.keys(TRACKS) as TrackKey[]).map((k) => {
                      const t = TRACKS[k];
                      return (
                        <div key={k} className="flex items-center gap-2.5">
                          <span className="rounded-[8px] flex items-center justify-center flex-shrink-0" style={{ width: 28, height: 28, background: `${t.color}12` }}>
                            <t.icon size={13} color={t.color} />
                          </span>
                          <span className="text-[12.5px] font-semibold" style={{ color: INK }}>{t.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <p className="text-[10.5px] font-bold tracking-[2px] mb-3" style={{ color: RED }}>WHAT A DAY VIEW ANSWERS</p>
                  <div className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5">
                    {[
                      "Show opening hours", "How many events run that day", "The headline event of the day",
                      "Which cars are being launched", "Which speakers are on", "Which experiences are available",
                      "Which halls and zones are in use", "Family and entertainment activities",
                      "Sessions reserved for business and government",
                    ].map((x) => (
                      <span key={x} className="flex items-start gap-2 text-[12px]" style={{ color: BODY }}>
                        <FaCircleCheck size={12} color={RED} className="flex-shrink-0 mt-0.5" /> {x}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 09 · ANATOMY ═══════════ */}
      <section id="anatomy" className="px-5 py-24" style={{ background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SH n="09 · ANATOMY" title="Anatomy of" accent="one event"
              sub="Every session on the platform is built from the same six parts — which is what makes the schedule, the screens, the reminders and the reports agree with each other." />
          </Reveal>
          <Reveal><EventAnatomy /></Reveal>

          <Reveal delay={0.06}>
            <div className="grid md:grid-cols-2 gap-5 mt-6">
              <div className="p-6 md:p-7" style={card}>
                <p className="text-[10.5px] font-bold tracking-[2px] mb-4" style={{ color: RED }}>LIVE STATUS — ONE CHANGE, EVERY SURFACE</p>
                <div className="flex flex-col gap-2.5 mb-5">
                  {(Object.keys(STATUSES) as StatusKey[]).map((k) => {
                    const s = STATUSES[k];
                    return (
                      <div key={k} className="flex items-start gap-3 p-3 rounded-[12px]" style={{ background: WASH, border: `1px solid ${RULE}` }}>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-bold flex-shrink-0" style={{ background: `${s.color}14`, color: s.color }}>
                          <span className="rounded-full" style={{ width: 5, height: 5, background: s.color }} /> {s.label}
                        </span>
                        <span className="text-[12px] leading-snug" style={{ color: BODY }}>{s.note}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold" style={{ color: MUTED }}>UPDATED IN THE DASHBOARD →</span>
                  {["The site", "Venue screens", "My Schedule", "WhatsApp", "Organiser view"].map((x) => (
                    <span key={x} className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: WASH, color: BODY, border: `1px solid ${RULE}` }}>{x}</span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="p-6 md:p-7" style={card}>
                  <p className="text-[10.5px] font-bold tracking-[2px] mb-4" style={{ color: RED }}>AUDIENCE RULES, NOT SKILL LEVELS</p>
                  <p className="text-[12.5px] mb-4" style={{ color: BODY }}>
                    A motor show does not need beginner, intermediate and advanced. It needs to tell a visitor whether the door is open to them.
                  </p>
                  <div className="flex flex-col gap-2">
                    {(Object.keys(AUDIENCES) as AudienceKey[]).map((k) => {
                      const a = AUDIENCES[k];
                      return (
                        <div key={k} className="flex items-start gap-3">
                          <Chip color={a.color}>{a.label}</Chip>
                          <span className="text-[11.5px] leading-snug" style={{ color: BODY }}>{a.d}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-6 md:p-7" style={card}>
                  <p className="text-[10.5px] font-bold tracking-[2px] mb-3" style={{ color: RED }}>LOCATION IS PART OF THE EVENT</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {["Hall", "Zone", "Stage", "Booth number", "Meeting room", "Test Drive Area", "Business Lounge", "Media Center"].map((x) => (
                      <span key={x} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-bold" style={{ background: WASH, color: BODY, border: `1px solid ${RULE}` }}>
                        <FaLocationDot size={9} color={RED} /> {x}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 p-3.5 rounded-[14px]" style={{ background: WASH, border: `1px solid ${RULE}` }}>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold flex-shrink-0" style={{ background: RED, color: "#fff" }}>
                      <FaLocationArrow size={12} /> Get Directions
                    </span>
                    <span className="text-[11.5px] leading-snug" style={{ color: BODY }}>Opens the venue map on the exact hall, stage or booth.</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 10 · MY SCHEDULE ═══════════ */}
      <section id="myschedule" className="px-5 py-24" style={{ background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SH n="10 · MY JIMS SCHEDULE" title="Your day at" accent="JIMS"
              sub="The most important feature on the platform: the visitor stops browsing a show agenda and starts holding a personal plan for their own day." />
          </Reveal>

          <div className="grid lg:grid-cols-[minmax(0,340px)_1fr] gap-6 items-start">
            <Reveal>
              <div className="p-6 rounded-[22px]" style={{ background: "#fff", border: `1px solid ${RULE}` }}>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="heading text-[17px]" style={{ color: INK }}>Your Day at JIMS</p>
                    <p className="text-[11px]" style={{ color: MUTED }}>Day 1 · Wednesday, August 26</p>
                  </div>
                  <Chip>4 saved</Chip>
                </div>
                <div className="relative pl-6">
                  <div className="absolute top-2 bottom-2" style={{ left: 5, width: 2, background: RULE }} />
                  {[
                    { t: "5:00 PM", n: "Soueast S09 Reveal", p: "Main Stage — Hall A", c: TRACKS.launch.color },
                    { t: "6:00 PM", n: "EV Technology Talk", p: "Hall B — Tech Stage", c: TRACKS.tech.color },
                    { t: "7:15 PM", n: "Test Drive", p: "Test Drive Zone", c: TRACKS.drive.color },
                    { t: "8:00 PM", n: "Drift Show", p: "Outdoor Arena", c: TRACKS.ent.color },
                  ].map((r) => (
                    <div key={r.n} className="relative pb-5 last:pb-0">
                      <span className="absolute rounded-full" style={{ left: -25, top: 4, width: 12, height: 12, background: "#fff", border: `3px solid ${r.c}` }} />
                      <p className="text-[11px] font-bold" style={{ color: r.c }}>{r.t}</p>
                      <p className="text-[13px] font-semibold" style={{ color: INK }}>{r.n}</p>
                      <p className="flex items-center gap-1.5 text-[11px]" style={{ color: MUTED }}><FaLocationDot size={9} /> {r.p}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-4 flex items-start gap-2.5" style={{ borderTop: `1px solid ${RULE}` }}>
                  <FaStopwatch size={14} color={RED} className="flex-shrink-0 mt-0.5" />
                  <p className="text-[11.5px] leading-snug" style={{ color: BODY }}>
                    Two saved sessions overlap between 6:00 and 6:30 PM — the visitor is told before the day starts, not after they miss one.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.07}>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {[
                  { icon: FaCalendarDays, t: "Add a session", d: "One tap from the schedule, a speaker profile or an event page." },
                  { icon: FaTrashCan, t: "Remove a session", d: "The plan stays the visitor's, not the organiser's." },
                  { icon: FaClock, t: "Switch to another time", d: "Where a session runs more than once, the alternative is offered." },
                  { icon: FaLocationDot, t: "See the location", d: "Hall, zone, stage or booth attached to every entry." },
                  { icon: FaLocationArrow, t: "Open the map", d: "Directions from where the visitor is standing." },
                  { icon: FaTowerBroadcast, t: "Know the live status", d: "Starting soon, live now, full or ended — on the plan itself." },
                  { icon: FaBell, t: "Receive reminders", d: "The WhatsApp reminder is driven by this list." },
                  { icon: FaTicket, t: "Book seats and experiences", d: "Test drives and limited sessions are reserved from here." },
                  { icon: FaStopwatch, t: "See time conflicts", d: "Overlapping saves are flagged in the plan." },
                  { icon: FaLightbulb, t: "Get similar suggestions", d: "Sessions close to what the visitor already saved." },
                ].map((x) => (
                  <div key={x.t} className="p-4" style={card}>
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-[11px] mb-2.5" style={{ background: `${RED}0D` }}>
                      <x.icon size={15} color={RED} />
                    </span>
                    <p className="text-[13px] font-bold mb-0.5" style={{ color: INK }}>{x.t}</p>
                    <p className="text-[11.5px] leading-snug" style={{ color: BODY }}>{x.d}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            <div className="mt-6 p-6 flex flex-wrap items-center justify-center gap-3 rounded-[20px]" style={{ background: "#fff", border: `1px solid ${RULE}` }}>
              <span className="text-[12.5px] font-semibold" style={{ color: BODY }}>Saved against a visitor account or a mobile number</span>
              <FaArrowRight size={13} color={MUTED} />
              <span className="text-[12.5px] font-semibold" style={{ color: BODY }}>Linked to the Visitor ID on the QR pass</span>
              <FaArrowRight size={13} color={MUTED} />
              <span className="text-[12.5px] font-bold px-3.5 py-1.5 rounded-full" style={{ background: `${RED}12`, color: RED }}>Attendance can be proven, not estimated</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 11 · WHATSAPP ═══════════ */}
      <section id="whatsapp" className="px-5 py-24" style={{ background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SH n="11 · WHATSAPP & WATI" title="The reminder that turns a save into" accent="an attendance"
              sub="My JIMS Schedule is connected to WATI, so the platform can send automatic confirmations, reminders and updates on the channel Saudi visitors actually read." />
          </Reveal>

          <div className="grid lg:grid-cols-[minmax(0,320px)_1fr] gap-8 items-start">
            <Reveal><PhoneMock msgs={WA_THREADS[waIdx].msgs} /></Reveal>

            <Reveal delay={0.07}>
              <div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {WA_THREADS.map((t, i) => (
                    <button key={t.t} onClick={() => setWaIdx(i)}
                      className="px-4 py-2 rounded-full text-[12px] font-bold cursor-pointer"
                      style={waIdx === i ? { background: RED, color: "#fff", border: `1px solid ${RED}` } : { background: "#fff", color: BODY, border: `1px solid ${RULE}` }}>
                      {t.t}
                    </button>
                  ))}
                </div>
                <p className="text-[13px] mb-6" style={{ color: BODY }}>{WA_THREADS[waIdx].d}</p>

                <div className="p-6" style={card}>
                  <p className="text-[10.5px] font-bold tracking-[2px] mb-4" style={{ color: RED }}>THE FULL MESSAGE SET</p>
                  <div className="flex flex-col gap-2.5">
                    {[
                      { when: "After a session is added", msg: "Soueast S09 Regional Reveal has been added to your schedule." },
                      { when: "15 minutes before", msg: "The session you saved starts in 15 minutes at Main Stage — Hall A." },
                      { when: "When the location changes", msg: "The session location has changed to Main Stage — Hall B." },
                      { when: "When capacity is reached", msg: "This session is now full. You can join the waiting list." },
                      { when: "20 minutes before a test drive", msg: "Your booked test drive starts in 20 minutes. Please head to the Test Drive Zone." },
                      { when: "When the session starts", msg: "The session you saved is live now." },
                      { when: "After the session ends", msg: "Thank you for attending. Share your rating of the experience." },
                    ].map((m) => (
                      <div key={m.when} className="grid sm:grid-cols-[190px_1fr] gap-2 sm:gap-4 items-start p-3 rounded-[12px]" style={{ background: WASH, border: `1px solid ${RULE}` }}>
                        <span className="text-[11px] font-bold" style={{ color: RED }}>{m.when}</span>
                        <span className="text-[12px]" style={{ color: BODY }}>{m.msg}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Open Map", "Remove Reminder", "Join Waiting List", "Rate Now"].map((b) => (
                      <span key={b} className="text-[11px] font-bold px-3 py-1.5 rounded-full" style={{ background: `${RED}0D`, color: RED, border: `1px solid ${RED}25` }}>{b}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 12 · ACTION MATRIX ═══════════ */}
      <section id="actions" className="px-5 py-24" style={{ background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <SH n="12 · ACTION MATRIX" title="Every event type gets" accent="its own action"
              sub="Not every session needs the same button. Matching the action to the event type is the difference between a schedule that informs and one that converts." />
          </Reveal>

          <Reveal>
            <div className="rounded-[20px] overflow-hidden" style={{ background: "#fff", border: `1px solid ${RULE}` }}>
              <div className="grid grid-cols-[1fr_1fr] gap-3 px-5 py-3 text-[10.5px] font-bold" style={{ background: WASH, color: MUTED, borderBottom: `1px solid ${RULE}` }}>
                <span>EVENT TYPE</span><span>PRIMARY ACTION</span>
              </div>
              {[
                { type: "Vehicle launch", action: "Add to Schedule", c: TRACKS.launch.color, icon: FaCar },
                { type: "General session", action: "Set Reminder", c: TRACKS.tech.color, icon: FaBell },
                { type: "Test drive", action: "Book a Slot", c: TRACKS.drive.color, icon: FaGaugeHigh },
                { type: "Government session", action: "Request Access", c: TRACKS.biz.color, icon: FaLandmark },
                { type: "B2B meeting", action: "Book a Meeting", c: TRACKS.biz.color, icon: FaHandshake },
                { type: "Entertainment show", action: "Get Directions", c: TRACKS.ent.color, icon: FaFlagCheckered },
                { type: "Limited-capacity event", action: "Reserve a Seat", c: TRACKS.ent.color, icon: FaLock },
                { type: "Media event", action: "Request Media Access", c: TRACKS.media.color, icon: FaCamera },
                { type: "Family activity", action: "Add to Family Schedule", c: TRACKS.family.color, icon: FaChildren },
              ].map((r) => (
                <div key={r.type} className="grid grid-cols-[1fr_1fr] gap-3 px-5 py-3.5 items-center" style={{ borderTop: `1px solid ${RULE}` }}>
                  <span className="flex items-center gap-2.5 text-[13px] font-semibold" style={{ color: INK }}>
                    <r.icon size={14} color={r.c} className="flex-shrink-0" /> {r.type}
                  </span>
                  <span className="text-[12px] font-bold px-3.5 py-1.5 rounded-full w-fit" style={{ background: `${RED}0D`, color: RED, border: `1px solid ${RED}25` }}>{r.action}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 13 · EVENT PAGES & SEARCH ═══════════ */}
      <section id="eventpage" className="px-5 py-24" style={{ background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SH n="13 · EVENT PAGES & SEARCH" title="Every session gets" accent="its own page"
              sub="A standalone page per event means each launch, session and experience can be shared, advertised and indexed on its own — and the schedule becomes searchable." />
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-5">
            <Reveal>
              <div className="p-7 h-full" style={cardTop()}>
                <h4 className="heading text-lg mb-4" style={{ color: INK }}>What an event page carries</h4>
                <div className="grid sm:grid-cols-2 gap-x-5 gap-y-1.5">
                  {[
                    "Event name", "Photo or video", "Full description", "Date",
                    "Start and end time", "Brand or organising entity", "Speakers", "Target audience",
                    "Live status", "Seats remaining, where booking applies", "Location", "Map to the location",
                    "Booking or reminder button", "Suggested similar events", "Share options",
                  ].map((x) => (
                    <span key={x} className="flex items-start gap-2 text-[12px]" style={{ color: BODY }}>
                      <FaCircleCheck size={12} color={RED} className="flex-shrink-0 mt-0.5" /> {x}
                    </span>
                  ))}
                </div>
                <div className="mt-5 p-4 rounded-[14px] flex items-start gap-2.5" style={{ background: WASH, border: `1px solid ${RULE}` }}>
                  <FaShareNodes size={14} color={RED} className="flex-shrink-0 mt-0.5" />
                  <p className="text-[12px] leading-relaxed" style={{ color: BODY }}>
                    This is what lets each event be promoted separately on Google and social media, instead of every campaign pointing at one generic show page.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.07}>
              <div className="p-7 h-full" style={card}>
                <h4 className="heading text-lg mb-4" style={{ color: INK }}>Search inside the schedule</h4>
                <div className="flex items-center gap-2 px-4 py-3 mb-5 rounded-full" style={{ background: WASH, border: `1px solid ${RULE}` }}>
                  <FaMagnifyingGlass size={13} color={MUTED} />
                  <span className="text-[12.5px]" style={{ color: MUTED }}>Search brands, cars, experiences or speakers…</span>
                </div>
                <p className="text-[10.5px] font-bold tracking-[1.5px] mb-3" style={{ color: MUTED }}>WHAT A VISITOR CAN SEARCH FOR</p>
                <div className="flex flex-wrap gap-1.5">
                  {["A brand name", "A car name", "A speaker name", "Test Drive", "Vehicle Launch", "EV", "Technology", "Government Session", "Family Activity", "Entertainment", "A hall or stage"].map((x) => (
                    <span key={x} className="px-3 py-1.5 rounded-full text-[11.5px] font-semibold" style={{ background: WASH, color: BODY, border: `1px solid ${RULE}` }}>{x}</span>
                  ))}
                </div>
                <div className="mt-5 p-4 rounded-[14px] flex items-start gap-2.5" style={{ background: WASH, border: `1px solid ${RULE}` }}>
                  <FaEye size={14} color={RED} className="flex-shrink-0 mt-0.5" />
                  <p className="text-[12px] leading-relaxed" style={{ color: BODY }}>
                    What visitors search for is itself a result: the most-searched brands inside the site become a data point in the sponsor report.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 14 · QR ON-SITE ═══════════ */}
      <section id="qr" className="px-5 py-24" style={{ background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SH n="14 · QR ON-SITE" title="One code," accent="the whole venue"
              sub="The entry QR is the thread that ties the digital plan to what actually happened on the floor." />
          </Reveal>

          <Reveal>
            <FlowLine steps={[
              { n: "1", t: "Scan at the gate", d: "Entry is recorded and the welcome message fires.", icon: FaQrcode },
              { n: "2", t: "Scan at a session", d: "Attendance is confirmed against the saved plan.", icon: FaCircleCheck },
              { n: "3", t: "Scan at an experience", d: "Test drive slots and waiting lists are managed on the spot.", icon: FaGaugeHigh },
              { n: "4", t: "Scan at a restricted door", d: "Business, Media and invite-only access is verified.", icon: FaShieldHalved },
              { n: "5", t: "Measured", d: "Registration, intent and real attendance become one record.", icon: FaChartColumn },
            ]} />
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 15 · SCREENS ═══════════ */}
      <section id="screens" className="px-5 py-24" style={{ background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SH n="15 · VENUE SCREENS" title="The same schedule," accent="on the walls"
              sub="The live schedule is not only a page. The same feed drives the screens inside the venue, so a visitor without a phone in hand still knows what is happening now." />
          </Reveal>

          <div className="grid lg:grid-cols-[1.25fr_1fr] gap-6 items-start">
            <Reveal><ScreenMock /></Reveal>
            <Reveal delay={0.07}>
              <div className="p-7 h-full" style={card}>
                <h4 className="heading text-lg mb-2" style={{ color: INK }}>One update, five destinations</h4>
                <p className="text-[12.5px] mb-5" style={{ color: BODY }}>
                  Any change made in the dashboard appears immediately on every surface the show speaks through.
                </p>
                <div className="flex flex-col gap-2.5">
                  {[
                    { icon: FaGlobe, t: "The website" },
                    { icon: FaDesktop, t: "The venue screens" },
                    { icon: FaWhatsapp, t: "WhatsApp" },
                    { icon: FaMobileScreen, t: "Staff apps on the floor" },
                    { icon: FaTableColumns, t: "The organiser dashboard" },
                  ].map((x) => (
                    <div key={x.t} className="flex items-center gap-3 p-3.5 rounded-[14px]" style={{ background: WASH, border: `1px solid ${RULE}` }}>
                      <span className="w-9 h-9 rounded-[11px] flex items-center justify-center flex-shrink-0" style={{ background: "#fff", border: `1px solid ${RULE}` }}>
                        <x.icon size={15} color={RED} />
                      </span>
                      <span className="text-[12.5px] font-semibold" style={{ color: INK }}>{x.t}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 p-4 rounded-[14px] flex items-start gap-2.5" style={{ background: `${RED}08`, border: `1px solid ${RED}20` }}>
                  <FaTowerBroadcast size={14} color={RED} className="flex-shrink-0 mt-0.5" />
                  <p className="text-[12px] leading-relaxed" style={{ color: BODY }}>
                    This is also the crowd-flow tool: showing the next available test drive slot and the quieter zones moves people before a queue forms.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 16 · DASHBOARD ═══════════ */}
      <section id="dashboard" className="px-5 py-24" style={{ background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SH n="16 · OPERATIONS DASHBOARD" title="The show runs from" accent="one screen"
              sub="The organising team changes the schedule, the capacity and the status themselves — without a development request for every edit during show days." />
          </Reveal>

          <Reveal><DashboardMock /></Reveal>

          <Reveal delay={0.06}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
              {[
                { t: "Programme", items: ["Days", "Events", "Times", "Locations"], icon: FaCalendarDays },
                { t: "People", items: ["Speakers", "Brands", "Exhibitors", "Delegations"], icon: FaUsers },
                { t: "Capacity", items: ["Event status", "Bookings", "Available seats", "Waiting lists"], icon: FaLayerGroup },
                { t: "Live ops", items: ["Actual attendance", "Reminders", "Urgent updates", "Venue screens"], icon: FaTowerBroadcast },
              ].map((g) => (
                <div key={g.t} className="p-5" style={cardTop()}>
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-[11px] mb-3" style={{ background: `${RED}0D` }}>
                    <g.icon size={15} color={RED} />
                  </span>
                  <p className="heading text-[15px] mb-2" style={{ color: INK }}>{g.t}</p>
                  <div className="flex flex-col gap-1">
                    {g.items.map((i) => (
                      <span key={i} className="flex items-center gap-2 text-[12px]" style={{ color: BODY }}>
                        <span className="flex-shrink-0" style={{ width: 10, height: 1, background: `${RED}70` }} /> {i}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 17 · MEASURE ═══════════ */}
      <section id="measure" className="px-5 py-24" style={{ background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SH n="17 · MEASUREMENT" title="What the show will" accent="finally know"
              sub="The platform is not only a better-looking site. It collects commercial data that the show can act on — and sell." />
          </Reveal>

          <Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {[
                "Which brand launch drew the most interest",
                "How many people viewed each event page",
                "How many added it to their schedule",
                "How many actually attended",
                "Booking-to-attendance rate",
                "Reminder-to-attendance rate",
                "The busiest times of day",
                "The busiest days",
                "The most-used halls",
                "Favourite events per audience segment",
                "Audience engagement with each sponsor",
                "Number of test drive bookings",
                "Number of meeting requests",
                "Attendance from companies and government",
                "How many joined a waiting list",
                "Most-searched brands inside the site",
              ].map((t) => (
                <div key={t} className="p-4 rounded-[14px] flex items-start gap-2.5" style={{ background: "#fff", border: `1px solid ${RULE}` }}>
                  <span className="rounded-full flex-shrink-0 mt-1.5" style={{ width: 6, height: 6, background: RED }} />
                  <span className="text-[12px] leading-snug font-medium" style={{ color: INK }}>{t}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 18 · SPONSOR REPORTS ═══════════ */}
      <section id="reports" className="px-5 py-24" style={{ background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <SH n="18 · SPONSOR REPORTING" title="Proof of value," accent="not a thank-you note"
              sub="After the show, every sponsor and exhibitor can be handed a report on their own activation — the strongest argument for renewing next edition." />
          </Reveal>

          <Reveal><SponsorFunnel /></Reveal>

          <Reveal delay={0.06}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-5">
              {[
                { t: "Proves the value of the sponsorship", icon: FaShieldHalved },
                { t: "Raises exhibitor satisfaction", icon: FaStar },
                { t: "Improves renewal odds for the next edition", icon: FaArrowTrendUp },
                { t: "Supports stronger sponsorship packages", icon: FaLayerGroup },
                { t: "Measures the return on participating", icon: FaChartColumn },
              ].map((b) => (
                <div key={b.t} className="p-5 text-center" style={card}>
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-3" style={{ background: `${RED}0D` }}>
                    <b.icon size={16} color={RED} />
                  </span>
                  <p className="text-[12px] font-semibold leading-snug" style={{ color: INK }}>{b.t}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 19 · JOURNEY ═══════════ */}
      <section id="journey" className="px-5 py-24" style={{ background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SH n="19 · VISITOR JOURNEY" title="Before, during and" accent="after the show"
              sub="The same visitor, tracked as one person across three stages — which is exactly what makes the follow-up possible." />
          </Reveal>

          <div className="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 md:gap-2 items-stretch">
            {JOURNEY.map((j, i) => (
              <Fragment key={j.phase}>
                <div className="p-6" style={cardTop()}>
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0" style={{ background: `${RED}0D` }}>
                      <j.icon size={17} color={RED} />
                    </span>
                    <h4 className="heading text-[17px]" style={{ color: INK }}>{j.phase}</h4>
                  </div>
                  <div className="relative pl-5">
                    <div className="absolute top-2 bottom-2" style={{ left: 4, width: 2, background: `${RED}22` }} />
                    {j.steps.map((s, k) => (
                      <div key={s} className="relative pb-3 last:pb-0">
                        <span className="absolute rounded-full flex items-center justify-center text-[8px] font-bold"
                          style={{ left: -21, top: 1, width: 16, height: 16, background: RED, color: "#fff" }}>{k + 1}</span>
                        <p className="text-[12px] leading-snug" style={{ color: BODY }}>{s}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {i < JOURNEY.length - 1 && (
                  <div className="hidden md:flex items-center justify-center">
                    <span className="rounded-full flex items-center justify-center" style={{ width: 34, height: 34, background: "#fff", border: `1px solid ${RULE}` }}>
                      <FaArrowRight size={13} color={RED} />
                    </span>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 20 · PHASES ═══════════ */}
      <section id="phases" className="px-5 py-24" style={{ background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SH n="20 · DELIVERY" title="Four phases," accent="each one usable"
              sub="Nothing waits for everything. Each phase ships something the show can put in front of an audience on its own." />
          </Reveal>

          <div className="relative">
            <div className="hidden lg:block absolute left-0 right-0" style={{ top: 26, height: 2, background: RULE }} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
              {PHASES.map((p, i) => (
                <Reveal key={p.n} delay={i * 0.06}>
                  <div className="h-full">
                    <div className="hidden lg:flex items-center gap-3 mb-5">
                      <span className="rounded-full flex items-center justify-center text-[12px] font-bold" style={{ width: 52, height: 52, background: "#fff", border: `2px solid ${RED}`, color: RED }}>{p.n}</span>
                    </div>
                    <div className="p-6 h-full" style={cardTop()}>
                      <div className="flex items-center gap-2.5 mb-2">
                        <p.icon size={16} color={RED} />
                        <h4 className="heading text-[17px]" style={{ color: INK }}>
                          <span className="lg:hidden" style={{ color: RED }}>{p.n} · </span>{p.title}
                        </h4>
                      </div>
                      <p className="text-[12px] leading-relaxed mb-4" style={{ color: BODY }}>{p.note}</p>
                      <div className="flex flex-col gap-1.5">
                        {p.items.map((it) => (
                          <span key={it} className="flex items-start gap-2 text-[12px]" style={{ color: BODY }}>
                            <FaCircleCheck size={12} color={RED} className="flex-shrink-0 mt-0.5" /> {it}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 21 · OUTCOME ═══════════ */}
      <section id="outcome" className="px-5 py-24" style={{ background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SH n="21 · THE OUTCOME" title="From a registration site to" accent="an event platform" />
          </Reveal>

          <Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
              {[
                "Attracts companies and government entities",
                "Increases public attendance",
                "Organises the programme",
                "Reduces crowding",
                "Improves the visitor experience",
                "Connects the site to WhatsApp",
                "Delivers live, current information",
                "Collects accurate data",
                "Gives sponsors clear value",
                "Supports sales and follow-up after the show",
              ].map((t) => (
                <div key={t} className="p-4 rounded-[14px] flex items-start gap-2.5" style={{ background: "#fff", border: `1px solid ${RULE}` }}>
                  <FaCircleCheck size={13} color={RED} className="flex-shrink-0 mt-0.5" />
                  <span className="text-[12px] leading-snug font-medium" style={{ color: INK }}>{t}</span>
                </div>
              ))}
            </div>
          </Reveal>

        </div>
      </section>

    </main>
  );
}

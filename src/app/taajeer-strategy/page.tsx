"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList,
} from "recharts";
import {
  ArrowRight, ArrowLeft, ArrowDown, X, ShieldCheck, Users, Compass, Store, Heart, Mountain,
  Target, TrendingUp, Search, Eye, MessageCircle, Film,
  Sparkles, Rocket, BookOpen, BarChart3, AlertTriangle, Repeat, Tag,
  Swords, Gauge, Hash, Send, CircleDot, Radio, Volume2,
  ChevronDown, Megaphone, Globe, Wrench, LineChart, Wallet, ClipboardCheck, Trophy,
  Telescope, Route, PenTool, GripVertical,
  type LucideIcon,
} from "lucide-react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
// import TaajeerStrategyChat from "@/components/TaajeerStrategyChat"; // hidden

gsap.registerPlugin(ScrollTrigger);

/* ═══════════ PALETTE — sampled from each brand's own logo (see taajeer/deck/tokens) ═══════════ */
const EMOTION = "#233871"; // Emotion (the presenting agency) — the deck's primary/frame color
const TAAJEER = "#003C60"; // Taajeer Group's own navy — kept only for the group node
const BESTUNE = "#1F242B"; // achromatic chrome — the only mono brand
const STEEL   = "#5C6B7A"; // Bestune's cool-steel accent, for visible UI on white
const B212    = "#00543C"; // 212 — real forest green
const SOUQ    = "#0C6CB4"; // Motor Souq — retail blue
const CYAN    = "#18B4B4"; // Souq's logo cyan, a second note

const INK   = "#0E1117";
const BODY  = "#4C5563";
const MUTED = "#8D96A3";
const RULE  = "#E6E9ED";
const WASH  = "#F6F8FA";

const POS = "#16785A", NEG = "#B23A2E", NEU = "#8D96A3";
const POS_T = "#EAF3EF", NEG_T = "#FAEFED", NEU_T = "#F1F3F5";

const BRIC = "var(--font-montserrat), system-ui, sans-serif";
const ASOF = "Follower & engagement figures are indicative (manual public sweep, mid-2026) and should be refreshed with a live pull before publishing. A licensed listening tool is recommended to attach hard volumes before activation.";

type BrandKey = "bestune" | "b212" | "souq";
type Brand = { key: BrandKey; name: string; accent: string; tint: string; logo: string; handle: string };
const BRANDS: Record<BrandKey, Brand> = {
  bestune: { key: "bestune", name: "Bestune",    accent: BESTUNE, tint: "#EEF1F4", logo: "/taajeer/logos/bestune.png",   handle: "@bestune_sa" },
  b212:    { key: "b212",    name: "212",         accent: B212,    tint: "#EAF2EE", logo: "/taajeer/logos/212.png",       handle: "@212_saudi" },
  souq:    { key: "souq",    name: "Motor Souq",  accent: SOUQ,    tint: "#E9F2FA", logo: "/taajeer/logos/motorsouq.png", handle: "@motorsouq_sa" },
};
const THREE = [BRANDS.bestune, BRANDS.b212, BRANDS.souq];

/* ═══════════ Platform icon ═══════════ */
const PLATFORM_LOGO: Record<string, string> = {
  tiktok: "/platforms/tiktok-official.png",
  instagram: "/platforms/instagram-official.png",
  snapchat: "/platforms/snapchat-official.png",
  youtube: "/platforms/youtube-official.png",
  x: "/platforms/x.webp",
};
type PKey = "tiktok" | "instagram" | "x" | "youtube" | "facebook" | "snapchat" | "linkedin";
function PIcon({ p, size = 16 }: { p: PKey; size?: number }) {
  const box = size + 10;
  if (PLATFORM_LOGO[p]) {
    return <img src={PLATFORM_LOGO[p]} alt={p} style={{ width: box, height: box, objectFit: "contain", flexShrink: 0, display: "inline-block", verticalAlign: "middle" }} />;
  }
  if (p === "linkedin") {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: box, height: box, borderRadius: 7, background: "#0A66C2", flexShrink: 0 }}>
        <FaLinkedinIn size={size - 2} color="#fff" />
      </span>
    );
  }
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: box, height: box, borderRadius: 7, background: "#1877F2", flexShrink: 0 }}>
      <FaFacebookF size={size - 2} color="#fff" />
    </span>
  );
}

/* ═══════════ Section header ═══════════ */
function SH({ title, accent, color = EMOTION, sub }: { n: string; title: string; accent: string; color?: string; sub?: string }) {
  return (
    <div className="text-center mb-12">
      <h2 className="heading text-4xl md:text-5xl mb-4" style={{ color: INK, lineHeight: 1.05, fontWeight: 800 }}>
        {title} {accent && <span style={{ color }}>{accent}</span>}
      </h2>
      {sub && <p className="text-sm md:text-[15px] max-w-2xl mx-auto" style={{ color: BODY }}>{sub}</p>}
    </div>
  );
}

/* ═══════════ Floating side nav — collapsible groups (dropdowns) ═══════════ */
type NavLink = { id: string; label: string };
type NavGroup = { group: string; color: string; items: NavLink[] };
const NAV_GROUPS: NavGroup[] = [
  { group: "Research", color: EMOTION, items: [
    { id: "overview", label: "Overview" }, { id: "portfolio", label: "Portfolio" }, { id: "research", label: "Research Overview" },
    { id: "bestune-audit", label: "Bestune · Audit" },
    { id: "bestune-arena", label: "Bestune · Competitors" },
    { id: "bestune-competitors", label: "Bestune · Comp. Social" },
    { id: "changan-examples", label: "Changan · Examples" },
    { id: "mg-examples", label: "MG · Examples" },
    { id: "byd-benchmark", label: "BYD · Benchmark" },
    { id: "byd-examples", label: "BYD · Examples" },
  ] },
  { group: "Approach & Methodology", color: TAAJEER, items: [
    { id: "objectives", label: "Objectives" },
    { id: "target-audience", label: "Target Audience" },
    { id: "target-b2c", label: "B2C Personas" },
    { id: "target-b2b", label: "B2B Personas" },
    { id: "audience-personas", label: "Audience Personas" },
  ] },
  { group: "Brand Strategy", color: BESTUNE, items: [
    { id: "brand-character", label: "Bestune · Character" },
    { id: "content-hubs", label: "Content Hubs" },
    { id: "content-pillars", label: "Content Pillars" },
    { id: "content-mix", label: "Content Style Mix" },
    { id: "tone-of-voice", label: "Language & Tone" },
  ] },
  { group: "Channels Strategy", color: SOUQ, items: [
    { id: "channels-overview", label: "Channels Overview" },
    { id: "channels-approach", label: "Channels Approach" },
    { id: "ch-instagram-facebook", label: "Instagram & Facebook" },
    { id: "ch-x", label: "X" },
    { id: "ch-tiktok", label: "TikTok" },
    { id: "ch-youtube", label: "YouTube" },
    { id: "ch-linkedin", label: "LinkedIn" },
  ] },
  { group: "Extra Services", color: SOUQ, items: [
    { id: "seo", label: "SEO" }, { id: "sem", label: "Paid Search" },
    { id: "media", label: "Media Plan" }, { id: "kpis", label: "KPIs" },
  ] },
  { group: "Executive Summary", color: BESTUNE, items: [
    { id: "exec-summary", label: "Executive Summary" },
  ] },
];
const ALL_NAV_IDS = NAV_GROUPS.flatMap((g) => g.items.map((i) => i.id));

function SectionNav() {
  const [active, setActive] = useState("overview");
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(NAV_GROUPS.map((g, i) => [g.group, i === 0] as [string, boolean]))
  );
  useEffect(() => {
    const ob = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-42% 0px -55% 0px", threshold: 0 }
    );
    ALL_NAV_IDS.forEach((id) => { const el = document.getElementById(id); if (el) ob.observe(el); });
    return () => ob.disconnect();
  }, []);
  // auto-open the group that contains the active section
  useEffect(() => {
    const g = NAV_GROUPS.find((gr) => gr.items.some((it) => it.id === active));
    if (g) setOpen((o) => (o[g.group] ? o : { ...o, [g.group]: true }));
  }, [active]);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  // draggable panel
  const asideRef = useRef<HTMLElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const drag = useRef<{ dx: number; dy: number } | null>(null);
  const onDragStart = (e: React.PointerEvent) => {
    const el = asideRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    drag.current = { dx: e.clientX - r.left, dy: e.clientY - r.top };
    if (!pos) setPos({ x: r.left, y: r.top });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    e.preventDefault();
  };
  const onDragMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const el = asideRef.current; const w = el?.offsetWidth ?? 202; const h = el?.offsetHeight ?? 400;
    const x = Math.max(8, Math.min(e.clientX - drag.current.dx, window.innerWidth - w - 8));
    const y = Math.max(8, Math.min(e.clientY - drag.current.dy, window.innerHeight - h - 8));
    setPos({ x, y });
  };
  const onDragEnd = () => { drag.current = null; };

  return (
    <aside
      ref={asideRef}
      className={`hidden xl:flex flex-col fixed z-40 p-2 rounded-[16px]${pos ? "" : " right-5 top-1/2 -translate-y-1/2"}`}
      style={{ width: 202, background: "rgba(255,255,255,0.92)", border: `1px solid ${RULE}`, boxShadow: "0 8px 32px rgba(0,0,0,0.06)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", maxHeight: "82vh", overflowY: "auto", ...(pos ? { left: pos.x, top: pos.y, right: "auto" } : {}) }}
    >
      <div
        onPointerDown={onDragStart} onPointerMove={onDragMove} onPointerUp={onDragEnd}
        className="flex items-center justify-center gap-1.5 py-2 mb-1"
        style={{ borderBottom: `1px solid ${RULE}`, cursor: "grab", touchAction: "none", userSelect: "none" }}
        title="Drag to move"
      >
        <GripVertical size={13} color={MUTED} style={{ flexShrink: 0 }} />
        <img src="/taajeer/brand/emotion.png" alt="Emotion" style={{ height: 30, objectFit: "contain", pointerEvents: "none" }} />
      </div>
      {NAV_GROUPS.map((g) => {
        const isOpen = open[g.group];
        const hasActive = g.items.some((it) => it.id === active);
        return (
          <div key={g.group} className="mb-0.5">
            <button
              onClick={() => setOpen((o) => ({ ...o, [g.group]: !o[g.group] }))}
              className="flex items-center gap-2 px-2.5 py-2 rounded-[8px] w-full text-left cursor-pointer border-0"
              style={{ background: hasActive ? `${g.color}12` : "transparent", transition: "background 200ms" }}
              aria-expanded={isOpen}
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: g.color }} />
              <span className="text-[11px] font-bold flex-1 truncate" style={{ color: INK }}>{g.group}</span>
              <ChevronDown size={13} color={MUTED} style={{ transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform 200ms" }} />
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
                      style={{ background: on ? `${g.color}18` : "transparent", transition: "background 200ms", borderLeft: `1px solid ${RULE}` }}
                      aria-current={on ? "true" : undefined}
                    >
                      <span className="rounded-full flex-shrink-0" style={{ width: on ? 6 : 4, height: on ? 6 : 4, background: g.color, boxShadow: on ? `0 0 0 3px ${g.color}30` : "none", opacity: on ? 1 : 0.45, transition: "all 200ms" }} />
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

/* ═══════════ Small building blocks ═══════════ */
function Eyebrow({ children, color }: { children: React.ReactNode; color: string }) {
  return <span className="inline-flex items-center gap-2 text-[11px] font-bold px-3 py-1 rounded-full" style={{ background: `${color}14`, color }}>{children}</span>;
}
function BrandChip({ b, size = 22 }: { b: Brand; size?: number }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: b.tint }}>
      <img src={b.logo} alt={b.name} style={{ height: size, maxWidth: 70, objectFit: "contain" }} />
    </span>
  );
}

/* ═══════════ Portfolio map — a tree: one group → three brands ═══════════ */
function PortfolioTree() {
  const roles: Record<BrandKey, string> = {
    bestune: "FAW passenger vehicles · SUVs and sedans",
    b212: "Heritage-inspired off-road 4×4",
    souq: "Multi-brand automotive retail · 7 branches",
  };
  return (
    <div className="mb-14">
      <div className="flex justify-center">
        <div className="px-6 py-2.5 rounded-full heading text-base" style={{ background: TAAJEER, color: "#fff", boxShadow: `0 6px 18px ${TAAJEER}22` }}>Taajeer Group</div>
      </div>
      <div className="flex justify-center"><div style={{ width: 2, height: 22, background: `${TAAJEER}33` }} /></div>
      <div className="hidden md:flex justify-center"><div style={{ height: 2, width: "66%", background: `${TAAJEER}33` }} /></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {THREE.map((b) => (
          <div key={b.key} className="flex flex-col items-center">
            <div className="hidden md:block" style={{ width: 2, height: 18, background: `${b.accent}55` }} />
            <div className="w-full rounded-[16px] p-4 flex items-center gap-3 mt-3 md:mt-0" style={{ background: "#fff", border: `1px solid ${RULE}`, borderTop: `3px solid ${b.accent}` }}>
              <span className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: b.tint }}>
                <img src={b.logo} alt={b.name} style={{ maxHeight: 18, maxWidth: 42, objectFit: "contain" }} />
              </span>
              <div>
                <p className="heading text-[15px]" style={{ color: INK }}>{b.name}</p>
                <p className="text-[11px]" style={{ color: BODY }}>{roles[b.key]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════ Process flow — numbered nodes on a connector line ═══════════ */
function ProcessFlow({ steps, color }: { steps: { n: string; t: string; d: string; icon: LucideIcon; tag?: string }[]; color: string }) {
  return (
    <div className="relative">
      <div className="hidden lg:block absolute left-[10%] right-[10%] z-0" style={{ top: 33, height: 2, background: `linear-gradient(90deg, ${color}30, ${color}, ${color}30)` }} />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10 tj-stagger">
        {steps.map((s) => (
          <div key={s.n} className="tj-item flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="rounded-full flex items-center justify-center" style={{ width: 66, height: 66, background: "#fff", border: `2.5px solid ${color}` }}>
                <s.icon size={24} color={color} />
              </div>
              <span className="absolute -top-1 -right-1 rounded-full flex items-center justify-center text-[11px] font-bold" style={{ width: 26, height: 26, background: color, color: "#fff" }}>{s.n}</span>
            </div>
            <h4 className="heading text-[15px] mb-1" style={{ color: INK }}>{s.t}</h4>
            <p className="text-[11.5px] leading-snug" style={{ color: BODY }}>{s.d}</p>
            {s.tag && <p className="text-[10px] font-bold mt-2" style={{ color }}>{s.tag}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════ Journey flow — connected phase cards with arrows ═══════════ */
function JourneyFlow({ phases }: { phases: { phase: string; title: string; body: string; priority: string; icon: LucideIcon; color: string }[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 md:gap-3 items-stretch tj-stagger">
      {phases.map((j, i) => (
        <Fragment key={j.title}>
          <div className="tj-item rounded-[20px] p-6" style={{ background: "#fff", border: `1px solid ${RULE}`, borderTop: `4px solid ${j.color}` }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: `${j.color}14`, color: j.color }}>{j.phase}</span>
              <span className="heading text-2xl" style={{ color: `${j.color}`, opacity: 0.25 }}>{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div className="flex items-center gap-2.5 mb-2"><j.icon size={20} color={j.color} /><h4 className="heading text-xl" style={{ color: INK }}>{j.title}</h4></div>
            <p className="text-[13px] leading-relaxed mb-3" style={{ color: BODY }}>{j.body}</p>
            <p className="text-[11px] font-bold" style={{ color: j.color }}>Priority: {j.priority}</p>
          </div>
          {i < phases.length - 1 && (
            <div className="hidden md:flex items-center justify-center">
              <span className="rounded-full flex items-center justify-center" style={{ width: 36, height: 36, background: "#fff", border: `1px solid ${RULE}` }}>
                <ArrowRight size={16} color={MUTED} />
              </span>
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
export default function TaajeerStrategy() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".tj-hero", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.25 });
      gsap.utils.toArray<HTMLElement>(".tj-slide").forEach((el) => {
        gsap.fromTo(el, { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".tj-stagger").forEach((el) => {
        gsap.fromTo(el.querySelectorAll(".tj-item"), { y: 40, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.06, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 82%", once: true } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  /* ═══ Lightbox (in-page image viewer) ═══ */
  const [lb, setLb] = useState<{ imgs: string[]; i: number } | null>(null);
  const openLB = (imgs: string[], i: number) => setLb({ imgs, i });
  useEffect(() => {
    if (!lb) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLb(null);
      else if (e.key === "ArrowRight") setLb((p) => (p ? { ...p, i: (p.i + 1) % p.imgs.length } : p));
      else if (e.key === "ArrowLeft") setLb((p) => (p ? { ...p, i: (p.i - 1 + p.imgs.length) % p.imgs.length } : p));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [lb]);

  /* ═══ DATA ═══ */

  // Overview — three games
  const games: { b: Brand; game: string; body: string; icon: LucideIcon; foot: string; img: string }[] = [
    { b: BRANDS.bestune, game: "Building family confidence", icon: ShieldCheck, foot: "Established presence · strong trust-building opportunity", img: "/taajeer/img/overview-bestune.jpg",
      body: "For buyers seeking a modern, well-equipped SUV or sedan with greater reassurance behind the ownership decision. Bestune's content role is to make trust tangible through warranty, service support, real ownership experiences and FAW's automotive heritage." },
    { b: BRANDS.b212, game: "Building an adventure identity", icon: Mountain, foot: "Growing presence · high storytelling potential", img: "/taajeer/img/overview-212.webp",
      body: "For drivers drawn to distinctive design, off-road capability and a brand with a meaningful heritage story. 212's content role is to turn its history and character into real-world proof — through adventure, community, owner stories and capability-led content." },
    { b: BRANDS.souq, game: "Simplifying the buying decision", icon: Store, foot: "Established audience · high conversion potential", img: "/taajeer/img/overview-souq.webp",
      body: "For active car shoppers comparing models, prices and purchase options across multiple brands. Motor Souq's content role is to make choosing easier, generate qualified enquiries and convert digital interest into confident showroom visits across its seven branches." },
  ];

  // Research — per-brand audit
  const audits: { b: Brand; snapshot: [string, string][]; findings: { t: string; d: string }[]; priority: string }[] = [
    {
      b: BRANDS.bestune,
      snapshot: [["Instagram", "31.6K followers"], ["Facebook", "10.6K followers"], ["X", "39.4K followers"], ["YouTube", "2.1K subscribers"], ["Snapchat", "No official account"]],
      findings: [
        { t: "Established content presence", d: "Bestune has the largest existing content footprint in the portfolio, giving the brand a strong base to build from." },
        { t: "An offer-led content mix", d: "The current feed relies heavily on static promotional graphics, finance offers and tactical giveaways, with limited use of short-form video and real-world vehicle storytelling." },
        { t: "Trust assets are underused", d: "The warranty, ownership support and FAW heritage are not yet communicated consistently enough to address the questions buyers may have around long-term ownership." },
        { t: "Video is the immediate opportunity", d: "Reels and TikTok-style content can bring the models into real Saudi family life, demonstrate features naturally and make the trust story more credible." },
      ],
      priority: "Shift from promotion-led posting to trust-led, video-first storytelling.",
    },
    {
      b: BRANDS.b212,
      snapshot: [["Instagram", "65 followers"], ["Snapchat", "552 followers"], ["Facebook", "No official account"], ["X", "No official account"], ["YouTube", "No official account"], ["TikTok", "No active official account"]],
      findings: [
        { t: "A distinctive story with limited social expression", d: "212 has a recognizable design language and a meaningful heritage story, but that identity is not yet established consistently across social media." },
        { t: "Limited platform presence", d: "The current social footprint remains small, particularly across video-led platforms that naturally suit off-road, adventure and capability content." },
        { t: "A gap between brand and social communication", d: "The product and website present a stronger character than the existing social channels currently communicate." },
        { t: "A clean opportunity to build the brand correctly", d: "The limited legacy presence allows 212 to establish a clear visual language, tone of voice and community strategy from the beginning." },
      ],
      priority: "Launch a distinctive, vertical-video-first identity built around heritage, capability and adventure culture.",
    },
    {
      b: BRANDS.souq,
      snapshot: [["X", "77.1K followers"], ["Instagram", "7,936 followers"], ["Facebook", "4.3K followers"], ["YouTube", "513 subscribers"], ["Snapchat", "No official account"]],
      findings: [
        { t: "A sizable audience that can be reactivated", d: "Motor Souq has meaningful existing reach, particularly on X, but current content interaction appears low relative to the size of the audience." },
        { t: "Limited differentiation", d: "The current content mix focuses mainly on inventory, offers and static comparisons without consistently communicating why buyers should choose Motor Souq over another multi-brand retailer." },
        { t: "An unclear brand role", d: "The account has evolved from more focused vehicle communication into a broad offer-led feed, creating a need for a clearer and more consistent customer promise." },
        { t: "Strong potential for useful buyer content", d: "Motor Souq can turn its multi-brand inventory and seven-branch presence into practical comparisons, buying guides and content that helps customers shortlist and choose with confidence." },
      ],
      priority: "Build a helpful buyer-first identity that converts digital interest into qualified enquiries and showroom visits.",
    },
  ];

  // Sentiment
  const sentiment: { b: Brand; pos: string; neg: string; neu: string }[] = [
    { b: BRANDS.bestune, pos: "Design & modern tech praised; B70 seen as elegant, well-equipped.", neg: "Recurring concern over spare-parts availability, maintenance cost, sound insulation & material quality. Priced high vs other Chinese.", neu: "Showroom-expansion news; finance-offer and giveaway chatter." },
    { b: BRANDS.b212, pos: "Press & enthusiasts frame it as “the Chinese military legend reborn” — heritage + capability at a shock price (~SAR 115K).", neg: "“Chinese newcomer” trust question; unproven durability & resale; young service network.", neu: "Launch coverage, new variants (Soft-Top, Explorer 01)." },
    { b: BRANDS.souq, pos: "Convenience & multi-brand choice; “everything in one place.”", neg: "Thin — but because engagement itself is thin, not because sentiment is dirty. Very little conversation exists at all.", neu: "Offers, comparison posts, branch updates." },
  ];

  // Battlefield — in-market players + global content references per brand.
  // Motor Souq also carries a "direct rivals" set (multi-brand online/showroom players).
  const arenas: { b: Brand; local: { name: string; logo: string; note: string }[]; global: { name: string; logo: string; note: string }[]; directRivals?: { name: string; logo: string; note: string }[]; note: string }[] = [
    {
      b: BRANDS.bestune,
      local: [
        { name: "Changan", logo: "/taajeer/logos/changan.png", note: "Scale leader · 6-yr/250,000 km warranty" },
        { name: "Geely", logo: "/taajeer/logos/geely.png", note: "Direct family-SUV rival (Wallan)" },
        { name: "Toyota", logo: "/taajeer/logos/toyota.png", note: "The trust wall (~28% share, FY2024)" },
      ],
      global: [
        { name: "Rivian", logo: "/taajeer/logos/rivian.png", note: "Sells a mission, not a spec sheet" },
        { name: "Hongqi", logo: "/taajeer/logos/hongqi.png", note: "Proof a Chinese badge can sit upmarket" },
      ],
      note: "Geely replaces MG as the direct rival — MG's KSA distributor is Jiad Modern Motors (Mohamed Yousuf Naghi Group), not Taajeer.",
    },
    {
      b: BRANDS.b212,
      local: [
        { name: "Tank 300", logo: "/taajeer/logos/tank300.png", note: "Closest rival — benchmarked vs Wrangler" },
        { name: "Petromin Jeep", logo: "/taajeer/logos/petromin.png", note: "In-market off-road competitor" },
      ],
      global: [
        { name: "Jeep", logo: "/taajeer/logos/jeep.png", note: "The #JeepLife UGC reference" },
        { name: "Ineos", logo: "/taajeer/logos/ineos.png", note: "Heritage off-roader, executed premium" },
        { name: "Defender", logo: "/taajeer/logos/defender.png", note: "A design icon in the boxy-4×4 space 212 competes in" },
      ],
      note: "Aljomaih — in Motor Souq's competitive set — is also the official Saudi dealer for the Ineos Grenadier. A cross-portfolio overlap to stay aware of.",
    },
    {
      b: BRANDS.souq,
      directRivals: [
        { name: "Syarah", logo: "/taajeer/logos/syarah.png", note: "Closest — buy-refurbish-sell, new + used" },
        { name: "Motory", logo: "/taajeer/logos/motory.png", note: "Marketplace + managed store" },
        { name: "CarSwitch", logo: "/taajeer/logos/carswitch.webp", note: "Managed used-car service" },
        { name: "Haraj", logo: "/taajeer/logos/haraj.png", note: "Dominant classifieds — used" },
        { name: "YallaMotor", logo: "/taajeer/logos/yallamotor.svg", note: "Regional marketplace · CPO" },
      ],
      local: [
        { name: "Aljomaih", logo: "/taajeer/logos/aljomaih.png", note: "Dominant multi-brand dealer — the reach benchmark" },
        { name: "ALJ", logo: "/taajeer/logos/alj.png", note: "Scale lives in brand accounts, not corporate" },
        { name: "Aljazirah Ford", logo: "/taajeer/logos/aljazirah-ford.png", note: "Proof a Saudi dealer can build a real audience" },
      ],
      global: [
        { name: "CarMax", logo: "/taajeer/logos/carmax.png", note: "Sells the buying experience — heavy short-form" },
      ],
      note: "Direct rivals are the multi-brand online + showroom players above. The franchise giants (Toyota's ALJ, Ford's Aljazirah, GM's Aljomaih) aren't head-to-head rivals — they're scale & content benchmarks.",
    },
  ];

  // Scale gap — IG followers (thousands), as of July 2026
  const scaleGap = [
    { name: "Rivian", k: 854, klabel: "854K", color: NEG, tag: "the aspiration ceiling" },
    { name: "Toyota KSA", k: 388, klabel: "388K", color: SOUQ, tag: "the trust wall Bestune chips at" },
    { name: "Bestune", k: 31.6, klabel: "31.6K", color: STEEL, tag: "our largest, dwarfed by the field" },
    { name: "Tank 300", k: 16, klabel: "16K", color: B212, tag: "212's closest rival, also small" },
  ];

  // Research takeouts
  const takeouts: { n: string; t: string; d: string; color: string; icon: LucideIcon }[] = [
    { n: "1", t: "Trust is the category's biggest opportunity", d: "Parts, service, resale, durability — the questions Saudi buyers still ask about Chinese auto. The brand that answers them openly earns a lead the rest of the category hasn't claimed.", color: NEG, icon: ShieldCheck },
    { n: "2", t: "The market watches video; brands post static", d: "TikTok leads KSA (≈34h 48m/month per user). All three brands are dormant or absent. Vertical video is the single highest-leverage move.", color: B212, icon: Film },
    { n: "3", t: "Three brands, three voices — never one", d: "Bestune = family trust. 212 = heritage & adventure. Motor Souq = the buying experience. One shared tone breaks all three.", color: SOUQ, icon: Users },
    { n: "4", t: "Scale is a content problem, not a ceiling", d: "Motor Souq's 77.1K on X sit under-activated while Aljomaih's 212K stay active. The gap is consistency and format, not audience size.", color: STEEL, icon: TrendingUp },
    { n: "5", t: "Heritage is the portfolio's unused asset", d: "FAW's decades and 212's 1960s origin are both dormant. Competitors build identity on heritage; ours hide it in fine print.", color: EMOTION, icon: BookOpen },
    { n: "6", t: "Community beats broadcast", d: "Jeep and Ineos win on owner UGC. None of our three run a structured community programme — unclaimed territory.", color: POS, icon: MessageCircle },
  ];

  const jointPageBestPractices = [
    "Prioritize short-form, vertical video with recurring series designed for each platform — not resized static posts.",
    "Build trust with proof: show service, warranty, parts availability, real ownership and transparent answers to buyer concerns.",
    "Lead with a story before the specification sheet — family confidence for Bestune, heritage and adventure for 212, and buying ease for Motor Souq.",
    "Turn owners and audiences into contributors through UGC, testimonials, community prompts and real-world driving stories.",
    "Maintain a consistent publishing rhythm while giving each brand a clearly labeled content lane, visual identity and call to action.",
  ];

  // Methodology
  const methodology: { n: string; t: string; d: string; icon: LucideIcon }[] = [
    { n: "01", t: "Discover", d: "Brief decoding · brand audit · social listening · competitive & benchmark analysis. This proposal is the output of this stage.", icon: Telescope },
    { n: "02", t: "Strategy", d: "Positioning & archetype per brand · content pillars · channel strategy · trust framework.", icon: Route },
    { n: "03", t: "Creative", d: "Conceptualizing · copywriting · art direction · vertical-video-first production.", icon: PenTool },
    { n: "04", t: "Launch & Optimize", d: "Campaign rollout · always-on content · community management · real-time monitoring.", icon: Rocket },
    { n: "05", t: "Review", d: "Performance reporting · listening · optimization vs KPIs · quarterly competitive tracking.", icon: Gauge },
  ];

  // Customer journey
  const journey: { phase: string; title: string; body: string; priority: string; icon: LucideIcon; color: string }[] = [
    { phase: "Phase 1", title: "Be discovered", body: "Creative, culturally-relevant content that stops the scroll and introduces each brand's distinct story.", priority: "Reach & recognition", icon: Eye, color: B212 },
    { phase: "Phase 2", title: "Be chosen", body: "Guide the interested buyer from content to showroom — product deep-dives, comparisons, trust-building on weak spots.", priority: "Leads & conversion", icon: Target, color: SOUQ },
    { phase: "Phase 3", title: "Be trusted", body: "Turn owners into voices — UGC, real off-road & family stories, community programmes — closing the trust gap.", priority: "Word-of-mouth & sentiment", icon: Heart, color: NEG },
  ];

  const intensity: { word: string; sub: string; pillar: string; eg: string; icon: LucideIcon; color: string }[] = [
    { word: "SHOUT", sub: "Campaign spikes", pillar: "Campaigns", eg: "a 212 heritage film, a Bestune trust campaign", icon: Volume2, color: NEG },
    { word: "SING", sub: "Sustained engagement", pillar: "Engagement & activations", eg: "Motor Souq comparison series, owner Q&As", icon: Radio, color: SOUQ },
    { word: "HUM", sub: "Always-on", pillar: "Always-on content", eg: "tips, product, community reposts", icon: CircleDot, color: B212 },
  ];

  const priorities: { b: Brand; awareness: string; priority: string }[] = [
    { b: BRANDS.bestune, awareness: "Family trust", priority: "Justify the premium, own reliability." },
    { b: BRANDS.b212, awareness: "Heritage & adventure", priority: "Own the off-road conversation and lead the retro-4×4 space." },
    { b: BRANDS.souq, awareness: "The buying experience", priority: "Activate a dormant audience, drive showroom traffic." },
  ];

  // Audience
  type Persona = { name: string; who: string; trigger: string; objection: string; wins: string };
  const audience: { b: Brand; thesis: string; personas: Persona[] }[] = [
    { b: BRANDS.bestune, thesis: "Bestune's buyer isn't shopping for a Chinese car — they're shopping for a family car and hoping the Chinese one is safe to trust. Every message must close that gap.",
      personas: [
        { name: "The Growing Family", who: "30–45 · married, 1–3 kids · upgrading from an aging Corolla or first-gen Chinese SUV.",
          trigger: "A third child, an outgrown sedan, or a warranty about to expire.", objection: "“If it breaks, will I find parts? Is service expensive?”", wins: "Lead with the warranty and FAW's scale as proof of permanence — owner UGC beats any ad." },
        { name: "The Practical Upgrader", who: "28–40 · first “proper” car after an entry model · budget-disciplined, comparison-native.",
          trigger: "A salary bump or marriage — nicer installments suddenly within reach.", objection: "“Is a Chinese SUV really worth more than the cheapest option?”", wins: "Answer with value — warranty, heritage, resale — and let the long-term math speak." },
      ] },
    { b: BRANDS.b212, thesis: "212's buyer isn't solving a transport problem — they're choosing an identity. It's not just a functional pick; it's a statement about who they are. Sell the meaning, and the sale follows.",
      personas: [
        { name: "The Off-Road Enthusiast", who: "25–45 · deep in desert/trail culture · likely a second “toy”, active in off-road groups.",
          trigger: "A new desert season, friends upgrading rigs, or a 4x4 gone too soft or too costly.", objection: "“A new Chinese brand — will it survive the sand?”", wins: "Don't claim capability — prove it in vertical video; anchor with the military heritage." },
        { name: "The Statement Seeker", who: "23–38 · design-driven · wants to stand out in a sea of white Camrys, expressive on social.",
          trigger: "Boredom with sameness — seeing the boxy retro shape and realizing it's attainable.", objection: "“It's distinctive — but will a Chinese 4×4 be taken seriously?”", wins: "Own the frame: a bold, heritage-rich original that stands out for the right reasons — on its own identity, not anyone else's." },
      ] },
    { b: BRANDS.souq, thesis: "Motor Souq's buyer has already decided to buy a car — the only question is where. They feel no loyalty to the dealer, only to convenience and confidence. Win the “where.”",
      personas: [
        { name: "The Active Shopper", who: "25–50 · in a live 30–90 day window · comparing 3–4 models across dealers right now.",
          trigger: "Already committed to buying — a growing family, a work need, a wrecked car.", objection: "“Why buy from Motor Souq and not the showroom next door?”", wins: "A concrete reason: comparison content answering their exact question, 7-branch convenience." },
        { name: "The Convenience Seeker", who: "28–45 · time-poor professional · wants 80% of the journey online before one confident visit.",
          trigger: "No time to visit five showrooms; wants to shortlist from the phone.", objection: "“Buy a car without seeing it properly? And trust the dealer?”", wins: "Show the online-to-branch journey — browse online, then one smooth, no-pressure visit." },
      ] },
  ];

  // Strategy — archetypes
  const archetypes: { b: Brand; type: string; sub: string; line: string; drive: string; icon: LucideIcon }[] = [
    { b: BRANDS.bestune, type: "The Caregiver", sub: "+ Everyman", line: "“The dependable one that looks after your family.”", drive: "Providing structure, service, protection. The answer to “can I trust it with my family?” Everyman keeps it relatable, never falsely premium.", icon: ShieldCheck },
    { b: BRANDS.b212, type: "The Explorer", sub: "+ Outlaw", line: "“For those who refuse the paved road — and the ordinary.”", drive: "Freedom, adventure, breaking boundaries. 212's own line is “recognizes no boundaries” — it is the Explorer. The Outlaw edge makes it a statement.", icon: Compass },
    { b: BRANDS.souq, type: "The Sage", sub: "+ Everyman", line: "“The honest guide that helps you choose right.”", drive: "Guidance, clarity, helping others decide. The Sage informs and simplifies (comparisons done right). Everyman keeps it on the buyer's side.", icon: BookOpen },
  ];

  const positioning: { b: Brand; text: React.ReactNode }[] = [
    { b: BRANDS.bestune, text: <>For the Saudi family that wants modern space and features they can rely on, <b>Bestune</b> is the SUV/sedan that earns trust — backed by a 6-year unlimited-mileage warranty and FAW's decades of heritage.</> },
    { b: BRANDS.b212, text: <>For the Saudi adventurer who refuses both the ordinary crossover and the overpriced icon, <b>212</b> is the heritage-born off-roader that delivers real capability and a boxy, unmistakable silhouette at a price that makes sense.</> },
    { b: BRANDS.souq, text: <>For the Saudi buyer already deciding which car to get, <b>Motor Souq</b> is the multi-brand dealer that helps you choose with confidence — clear comparisons, seven branches, no showroom pressure.</> },
  ];

  const pillars: Record<BrandKey, { hero: string; heroDesc: string; rest: { t: string; d: string }[] }> = {
    bestune: {
      hero: "Heritage & Trust", heroDesc: "FAW's 73-year heritage as the anchor — a 6-year unlimited-mileage warranty, a real service network, and “1 year later” owner testimonials: the permanence a family needs before trusting a Chinese badge.",
      rest: [
        { t: "Family Life", d: "The car inside real Saudi family moments — school runs, road trips, safety." },
        { t: "Smart Value & Offers", d: "Honest comparisons, cost-of-ownership clarity, why the premium is justified — and finance offers framed as value, not price dumps." },
        { t: "The Models, in Real Life", d: "The T77, B70 and T90 lineup shown through real people and everyday use — the cars themselves, never static spec graphics." },
        { t: "Real-Time & Culture", d: "National Day, Ramadan, cultural moments — the Caregiver shows up." },
      ],
    },
    b212: {
      hero: "Heritage & Origin", heroDesc: "The 1960s Beijing 212 military legend and the boxy DNA it still carries — 212's deepest credibility anchor, told as living history.",
      rest: [
        { t: "Capability, Proven", d: "Vertical video of sand, rock and trails — showing, not claiming." },
        { t: "Adventure & Community", d: "Owner trips, UGC, off-road culture, a branded community hashtag." },
        { t: "Design & Distinction", d: "The 212 T01 up close — the boxy silhouette, the exposed spare, the Soft-Top and Explorer 01 variants — for the statement seeker." },
        { t: "Interactive & Real-Time", d: "Off-road season, camping culture, community-driven content." },
      ],
    },
    souq: {
      hero: "Help Me Choose", heroDesc: "Comparisons done right: “Sportage or Jetour?” as engaging video, not flat graphics.",
      rest: [
        { t: "The Buying Experience", d: "360° browsing, 7 branches, the advisor-led journey — the CarMax lesson." },
        { t: "Smart Buyer Guides", d: "Financing explained, first-car tips — being useful, on the buyer's side." },
        { t: "Inventory & Offers", d: "Deals framed as “the right car for you,” not just price dumps." },
        { t: "Real-Time & Local", d: "Seasonal buying moments, branch content, Ramadan & salary-season timing." },
      ],
    },
  };

  // Pillar weighting — how each brand's monthly feed splits across ITS OWN pillars
  // (same names as the pillars section; hero slice largest; total 100).
  const pillarMix: { b: Brand; note: string; parts: { label: string; pct: number }[] }[] = [
    { b: BRANDS.bestune, note: "Heritage & trust lead; offers become a supporting minority — reversing today's offer-heavy feed.", parts: [
      { label: "Heritage & Trust", pct: 30 }, { label: "Family Life", pct: 25 }, { label: "Smart Value & Offers", pct: 20 }, { label: "The Models, in Real Life", pct: 15 }, { label: "Real-Time & Culture", pct: 10 },
    ] },
    { b: BRANDS.b212, note: "Heritage, capability and community dominate; 212 sells meaning, barely sells specs.", parts: [
      { label: "Heritage & Origin", pct: 25 }, { label: "Capability, Proven", pct: 25 }, { label: "Adventure & Community", pct: 25 }, { label: "Design & Distinction", pct: 15 }, { label: "Interactive & Real-Time", pct: 10 },
    ] },
    { b: BRANDS.souq, note: "Help-me-choose leads; even inventory & offers are framed as guidance.", parts: [
      { label: "Help Me Choose", pct: 30 }, { label: "The Buying Experience", pct: 25 }, { label: "Smart Buyer Guides", pct: 20 }, { label: "Inventory & Offers", pct: 15 }, { label: "Real-Time & Local", pct: 10 },
    ] },
  ];
  // 5-step opacity ramp — hero slice = full brand accent, then lighter.
  const RAMP = [1, 0.78, 0.58, 0.4, 0.26];
  const hexA = (hex: string, a: number) => {
    const h = hex.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  const tone: { b: Brand; type: string; line: string; desc: string; lang: string }[] = [
    { b: BRANDS.bestune, type: "The Caregiver", line: "“With you on every journey.”", desc: "Warm, reassuring, trustworthy. Speaks like a dependable family member — never salesy, never boastful.", lang: "Arabic: warm MSA (فصحى), Saudi-leaning — no heavy dialect. English on TikTok/IG for younger buyers." },
    { b: BRANDS.b212, type: "The Explorer / Outlaw", line: "“The road no one took… starts here.”", desc: "Bold, confident, a little rebellious. Speaks like an adventurer who doesn't follow the crowd.", lang: "Arabic: light Saudi white-dialect — young and bold. English where the audience skews younger." },
    { b: BRANDS.souq, type: "The Sage", line: "“We help you choose — not just sell.”", desc: "Clear, helpful, honest, on the buyer's side. Speaks like a knowledgeable friend who wants you to choose right.", lang: "Arabic: clear, plain MSA (فصحى) with Saudi touches. English secondary." },
  ];

  const cadence: { b: Brand; freq: string; note: string }[] = [
    { b: BRANDS.bestune, freq: "5 / week", note: "TikTok / Reels priority (its biggest gap). Weekly owner-story or trust content as the anchor." },
    { b: BRANDS.b212, freq: "4–5 / week", note: "Vertical-video-first. Every week must include at least one capability / adventure video." },
    { b: BRANDS.souq, freq: "5 / week", note: "Comparison content 2×/week as the signature series. Reactivation focus on the dormant base." },
  ];

  // Channels
  const platformRoles: { p: PKey; name: string; role: string; note: string }[] = [
    { p: "tiktok", name: "TikTok", role: "The Arena", note: "Where the category is decided (≈34h 48m/month) and all three are weakest. Highest-priority growth channel." },
    { p: "instagram", name: "Instagram", role: "The Showcase", note: "Visual storytelling, brand identity, Reels. The portfolio's most mature channel." },
    { p: "x", name: "X", role: "The Conversation", note: "Community, real-time, comparisons, reputation. Motor Souq's largest base (77.1K)." },
    { p: "youtube", name: "YouTube", role: "The Storyteller", note: "Long-form: heritage films, owner stories, capability proof, reviews." },
    { p: "facebook", name: "Facebook", role: "The Reach Extender", note: "Broader/older audience, mirrors Instagram, offer-friendly." },
    { p: "snapchat", name: "Snapchat", role: "The Local Pulse", note: "Strong in KSA, younger, tactical — relevant for 212 and Motor Souq." },
  ];

  const matrix: { p: PKey; channel: string; role: string; content: string; format: string; lang: string; cadence: string; priority: string }[] = [
    { p: "tiktok", channel: "TikTok", role: "The Arena", content: "Capability, lifestyle & buyer tips", format: "Vertical video", lang: "80/20", cadence: "3–4×/wk", priority: "212" },
    { p: "instagram", channel: "Instagram", role: "The Showcase", content: "All pillars", format: "Reels, carousels, stories", lang: "80/20", cadence: "5×/wk", priority: "All three" },
    { p: "x", channel: "X", role: "The Conversation", content: "Community, real-time, comparisons", format: "Text, polls, threads", lang: "80/20", cadence: "3–5×/wk", priority: "Motor Souq" },
    { p: "youtube", channel: "YouTube", role: "The Storyteller", content: "Heritage, reviews, guides", format: "Shorts + long video", lang: "80/20", cadence: "On availability", priority: "212 / Bestune" },
    { p: "facebook", channel: "Facebook", role: "Reach Extender", content: "Mirrors IG, offers", format: "Text, images, video", lang: "50/50", cadence: "5×/wk", priority: "Bestune" },
    { p: "snapchat", channel: "Snapchat", role: "Local Pulse", content: "Offers & launches", format: "Short video / ads", lang: "80/20", cadence: "Campaign", priority: "212 / Souq" },
  ];

  // Creative mockups (in-brand sample captions — MSA / فصحى)
  const mockups: { b: Brand; format: string; icon: LucideIcon; ar: string; en: string }[] = [
    { b: BRANDS.bestune, format: "REEL · Trust", icon: ShieldCheck, ar: "ست سنوات ضمان بلا حدٍّ للكيلومترات. طمأنينة تُرافق عائلتك في كل رحلة.", en: "A 6-year unlimited-mileage warranty. Peace of mind for the whole family." },
    { b: BRANDS.b212, format: "TIKTOK · Capability", icon: Mountain, ar: "الطريق الذي لم يسلكه أحد… يبدأ من هنا.", en: "The road no one took… starts here." },
    { b: BRANDS.souq, format: "REEL · Help Me Choose", icon: Swords, ar: "سبورتاج أم جيتور؟ نساعدك على الاختيار الصحيح — دون ضغط المعرض.", en: "Sportage or Jetour? We help you choose right — no showroom pressure." },
  ];
  // Reference example creatives per brand (directional — not final assets)
  const postExamples: Record<BrandKey, string[]> = {
    bestune: ["/taajeer/img/post-bestune-1.jpg", "/taajeer/img/post-bestune-2.jpg"],
    b212: ["/taajeer/img/post-212-1.webp", "/taajeer/img/post-212-2.webp", "/taajeer/img/post-212-3.jpg", "/taajeer/img/post-212-4.jpg"],
    souq: ["/taajeer/img/post-souq-1.jpg", "/taajeer/img/post-souq-2.jpg", "/taajeer/img/post-souq-3.jpg", "/taajeer/img/post-souq-5.jpg"],
  };
  const adRefImages = [...postExamples.bestune, ...postExamples.b212, ...postExamples.souq];

  /* ═══ SERVICE 1 — SEO ═══ */
  const seoBlocks: { t: string; d: string; icon: LucideIcon }[] = [
    { t: "Local SEO — 7 branches", d: "A Google Business Profile per branch (Jeddah · Riyadh · Dammam · Madinah · Makkah · Taif · Jazan) — consistent NAP, reviews, and the map pack for “car dealer near me”.", icon: Store },
    { t: "Keyword strategy — AR + EN", d: "Map every model and buying question — “بيستون سعر”, “212 مواصفات”, “أفضل SUV عائلي” — to a page built to rank for it.", icon: Search },
    { t: "Technical SEO", d: "Indexability, XML sitemaps, schema (Car · LocalBusiness · Offer), speed and mobile, and correct Arabic RTL — the foundation Google needs.", icon: Wrench },
    { t: "Content that ranks", d: "Model pages, pricing, buyer guides and comparisons that answer what Saudi buyers actually search — organic that compounds.", icon: BookOpen },
  ];

  /* ═══ SERVICE 2 — PAID SEARCH (SEM) ═══ */
  const semBlocks: { t: string; d: string; icon: LucideIcon }[] = [
    { t: "Search — intent capture", d: "Brand, non-brand and competitor-conquest campaigns — own the results the moment someone types “212 price” or “family SUV Saudi”.", icon: Target },
    { t: "Performance Max", d: "One campaign across all Google inventory (Search, Maps, YouTube, Display, Gmail) — optimized to leads, not clicks.", icon: Globe },
    { t: "YouTube", d: "Video reach for the heritage & capability films — awareness that feeds search demand.", icon: Film },
    { t: "Remarketing", d: "Re-engage site and social visitors and abandoned leads — the cheapest conversions on the plan.", icon: Repeat },
  ];
  const semBrandAngles: { b: Brand; angle: string }[] = [
    { b: BRANDS.bestune, angle: "“family SUV”, finance & warranty terms, Creta/Camry conquest." },
    { b: BRANDS.b212, angle: "“212 price”, off-road & retro-4×4, competitor-conquest terms." },
    { b: BRANDS.souq, angle: "“which car should I buy”, model comparisons, “car dealer near me”." },
  ];

  /* ═══ SERVICE 3 — WEBSITE AUDIT (real, fetched 2026-07-18) ═══ */
  const websiteAudit: { b: Brand; url: string; status: string; statusColor: string; urgency: string; snapshot: string; findings: string[]; plan: string[]; ref: string; note?: string }[] = [
    {
      b: BRANDS.souq, url: "motorsouq.com.sa", status: "DOWN · 404", statusColor: NEG, urgency: "Urgent", ref: "/taajeer/img/ref-souq.jpg",
      snapshot: "The flagship platform 404s sitewide; the only live page (motorsouq.me) is a near-empty 2021 placeholder — and the domain footprint is fragmented.",
      findings: [
        "The flagship motorsouq.com.sa returns 404 on every path — anyone clicking the Google result or a printed URL hits “Not Found”.",
        "The live .me fallback is a thin 2021 WordPress page — no inventory, no filters, no lead forms.",
        "Fragmented domains (.com.sa down, .me thin, a subdomain 403) — no single canonical home for SEO or trust.",
      ],
      plan: [
        "Restore/rebuild motorsouq.com.sa as the one canonical platform; 301-redirect every stray domain into it.",
        "Build the inventory platform on the proven Syarah / CarSwitch model — searchable listings, inspection & 360° imagery, per-vehicle pages, WhatsApp/lead CTAs and doorstep delivery.",
        "Add a 7-showroom branch locator; fix indexability and go Arabic-first (lang=ar dir=rtl).",
        "Core Web Vitals + lead-tracking post-launch.",
      ],
      note: "Modelled on Motor Souq's own direct rivals — Syarah & CarSwitch (see Battlefield) — the multi-brand, inspect-and-sell platform Saudi buyers already trust.",
    },
    {
      b: BRANDS.bestune, url: "bestune-sa.com", status: "LIVE", statusColor: POS, urgency: "Medium", ref: "/taajeer/img/ref-bestune.jpg",
      snapshot: "A WordPress marketing site — model pages for B70, B70S, T77 Pro and T99, with test-drive, WhatsApp and showroom-event pages.",
      findings: [
        "Declared lang=“en-GB” on fully Arabic content, with no dir=rtl — engines and screen readers are told the wrong language.",
        "No on-page pricing, spec tables or comparison — and offers are pushed to a separate domain, fragmenting the funnel.",
        "Viewport blocks pinch-zoom (accessibility issue); localization is ad-hoc with no clean hreflang.",
      ],
      plan: [
        "Rebuild Arabic-first (lang=ar dir=rtl) with a properly paired English version + hreflang.",
        "Add pricing + full spec sheets per model, with a side-by-side comparison.",
        "Consolidate the test-drive / finance lead form + WhatsApp on-site, wired to CRM.",
        "Add a branch locator and run a Core Web Vitals pass.",
      ],
      note: "This audit is of Taajeer's site — bestune-sa.com. A separate Eastern-Province distributor operates bestunesa.com (Empire); a different entity, not to be confused.",
    },
    {
      b: BRANDS.b212, url: "212.com.sa", status: "LIVE · strongest", statusColor: B212, urgency: "Polish", ref: "/taajeer/img/ref-212.jpg",
      snapshot: "A modern, custom Arabic-first brand site — clean vehicle pages plus test-drive, price-quote and purchase flows. The best of the three.",
      findings: [
        "Correct Arabic-first setup (lang=ar dir=rtl), clean titles/meta, real specs + pricing, full lead stack — best practice.",
        "No English version despite an existing toggle — missed expat & GCC search demand.",
        "No Vehicle/Offer structured data, and no configurator or finance calculator.",
      ],
      plan: [
        "Add Vehicle + Offer JSON-LD for rich search results.",
        "Ship the English version properly + hreflang.",
        "Add a trim configurator + monthly-payment calculator.",
        "Add an off-road / lifestyle content layer for long-tail SEO and community.",
      ],
    },
  ];

  /* ═══ WEBSITE FEATURE ROADMAP — phased build (applies across all 3 sites) ═══ */
  const webPhases: { phase: string; tag: string; color: string; items: string[] }[] = [
    { phase: "Must-have", tag: "Launch", color: "#C08A2E", items: [
      "Fix the 404 / broken links & images (Motor Souq)", "Clear, visible navigation menu", "Model & inventory pages", "Short, smart lead form", "Mobile-first, Arabic-first (RTL)", "Working social links",
    ] },
    { phase: "High value", tag: "Phase 2", color: SOUQ, items: [
      "Finance / EMI calculator", "Compare-vehicles tool", "Click-to-call & WhatsApp", "Customer reviews & ratings", "Photo galleries + 360° per model", "Google Maps branch embed · SEO schema",
    ] },
    { phase: "Growth", tag: "Phase 3", color: B212, items: [
      "Book-a-test-drive scheduling", "Blog / news for SEO", "Live chat widget", "Video testimonials", "Newsletter + retargeting", "Saved cars / buyer account",
    ] },
  ];

  /* ═══ MEDIA PLAN — SAR 50,000 / month ═══ */
  // Budget split EQUALLY across the three brands (SAR 50K / 3).
  const mediaByBrand: { b: Brand; pct: number; sar: string; objective: string; channels: string }[] = [
    { b: BRANDS.bestune, pct: 33, sar: "16,700", objective: "Leads + trust", channels: "Meta & Google Search lead · TikTok for reach · retargeting on" },
    { b: BRANDS.b212, pct: 33, sar: "16,700", objective: "Awareness + video", channels: "TikTok & YouTube heavy · Snap for KSA reach · light search" },
    { b: BRANDS.souq, pct: 34, sar: "16,600", objective: "Conversion", channels: "Google Search & Meta lead-gen · retargeting · Snap geo-offers" },
  ];
  const mediaByChannel: { name: string; pct: number; sar: string; role: string; color: string }[] = [
    { name: "Meta (IG/FB)", pct: 28, sar: "14,000", role: "Reach, lead forms & retargeting — all three brands.", color: "#1877F2" },
    { name: "TikTok", pct: 22, sar: "11,000", role: "Vertical-video awareness — 212 & Bestune.", color: "#111111" },
    { name: "Google Search", pct: 20, sar: "10,000", role: "High-intent capture — Motor Souq & price searches.", color: "#34A853" },
    { name: "PMax + YouTube", pct: 15, sar: "7,500", role: "Coverage + video across the funnel.", color: "#EA4335" },
    { name: "Snapchat", pct: 15, sar: "7,500", role: "KSA reach, younger — 212 & geo-offers.", color: "#F7C700" },
  ];

  /* ═══ KPIs ═══ */
  const kpiFunnel: { stage: string; color: string; rows: { metric: string; target: string; tool: string }[] }[] = [
    { stage: "Awareness", color: B212, rows: [
      { metric: "Reach / Impressions", target: "≈ 400–800K reach / mo", tool: "Meta · TikTok · GA4" },
      { metric: "CPM — cost / 1,000 impressions", target: "SAR ~15–40", tool: "Ads Manager" },
      { metric: "Video views (ThruPlay)", target: "Grow 15–25% MoM", tool: "Platform analytics" },
      { metric: "CPV — cost per view", target: "SAR ~0.03–0.10", tool: "Ads Manager" },
      { metric: "Frequency", target: "1.5–3× / user", tool: "Ads Manager" },
      { metric: "Follower growth", target: "+8–15% / quarter", tool: "Platform analytics" },
    ] },
    { stage: "Consideration", color: SOUQ, rows: [
      { metric: "CTR — click-through rate", target: "0.8–2.5% (auto benchmark)", tool: "Ads Manager · GA4" },
      { metric: "CPC — cost per click", target: "SAR ~1–4", tool: "Ads Manager" },
      { metric: "Engagement rate", target: "1.5–4%", tool: "Platform analytics" },
      { metric: "Website sessions", target: "Grow ~20% MoM", tool: "GA4" },
      { metric: "Cost per landing-page view", target: "SAR ~2–6", tool: "GA4 · Ads Manager" },
      { metric: "Avg. watch time / dwell", target: "Above category median", tool: "GA4 · platform" },
    ] },
    { stage: "Conversion", color: NEG, rows: [
      { metric: "Leads (form + WhatsApp)", target: "≈ 700–1,200 / mo (blended)", tool: "GTM · CRM" },
      { metric: "CPL — cost per lead", target: "SAR 30–50 (client baseline)", tool: "Ads Manager · CRM" },
      { metric: "Landing conversion rate", target: "2–6%", tool: "GA4 · GTM" },
      { metric: "Lead → showroom rate", target: "15–30%", tool: "CRM" },
      { metric: "Cost per test-drive / visit", target: "SAR ~120–330", tool: "CRM" },
      { metric: "ROAS (where sales tracked)", target: "Improve MoM vs baseline", tool: "CRM · Ads Manager" },
    ] },
  ];
  const kpiNorthStar: { b: Brand; kpi: string }[] = [
    { b: BRANDS.bestune, kpi: "Qualified leads + trust sentiment" },
    { b: BRANDS.b212, kpi: "Community size + UGC / awareness" },
    { b: BRANDS.souq, kpi: "Cost per Lead + showroom visits" },
  ];

  // KPIs per brand — each brand its own targets, tuned to its role (equal budget).
  const kpiByBrand: { b: Brand; northstar: string; rows: { m: string; t: string }[] }[] = [
    { b: BRANDS.bestune, northstar: "Qualified leads + trust sentiment", rows: [
      { m: "Leads / month", t: "≈ 230–420" },
      { m: "CPL — cost per lead", t: "SAR 35–50" },
      { m: "Reach / month", t: "150–300K" },
      { m: "CPM", t: "SAR ~15–35" },
      { m: "Engagement rate", t: "1.5–3%" },
      { m: "Trust sentiment", t: "Trend positive" },
    ] },
    { b: BRANDS.b212, northstar: "Community, UGC & awareness", rows: [
      { m: "Reach / month", t: "120–250K" },
      { m: "Video views (ThruPlay)", t: "+20–30% MoM" },
      { m: "CPV — cost per view", t: "SAR ~0.03–0.08" },
      { m: "Engagement rate", t: "3–5% (highest)" },
      { m: "UGC / community", t: "Grow every month" },
      { m: "Leads / month", t: "≈ 180–330" },
    ] },
    { b: BRANDS.souq, northstar: "Cost per Lead + showroom visits", rows: [
      { m: "Leads / month", t: "≈ 300–500 (highest)" },
      { m: "CPL — cost per lead", t: "SAR 30–45 (lowest)" },
      { m: "CTR — click-through rate", t: "1.2–2.5%" },
      { m: "CPC — cost per click", t: "SAR ~1–3" },
      { m: "Lead → showroom", t: "15–30%" },
      { m: "Cost / test-drive", t: "SAR 120–300" },
    ] },
  ];

  /* ═══ FIRST 90 DAYS — specific, measurable deliverables ═══ */
  const days90: { phase: string; window: string; color: string; deliverables: string[]; output: string }[] = [
    { phase: "Launch", window: "Days 1–30", color: NEG, deliverables: [
      "Emergency-fix Motor Souq's 404 flagship and redirect every stray domain into it.",
      "Activate TikTok for all three brands (today: dormant or absent) and rebuild each profile.",
      "Deploy the SAR 50K plan live across social + search, wired to lead capture.",
      "Stand up tracking — GA4, GTM, pixels, WhatsApp-to-CRM — so every riyal maps to a lead.",
      "Create & verify Google Business Profiles for all 7 branches.",
    ], output: "3 TikTok accounts live · SAR 50K deployed · tracking on · first ~250–400 leads" },
    { phase: "Build", window: "Days 31–60", color: SOUQ, deliverables: [
      "Content at full cadence — Bestune 5/wk, 212 4–5/wk, Motor Souq 5/wk.",
      "Launch the signature series: Motor Souq comparisons, 212 desert-capability films, Bestune owner-trust stories.",
      "SEO foundation — schema, sitemaps, and the first model/keyword pages ranking.",
      "Retargeting + lead-gen live; kill the losing creatives, scale the winners.",
    ], output: "≥60 posts/mo · CPL pulling toward SAR 30–50 · reach 400K+/mo" },
    { phase: "Prove & scale", window: "Days 61–90", color: B212, deliverables: [
      "Reallocate spend to the winning audiences & creatives by performance.",
      "Launch the 212 owner community + UGC programme.",
      "Ship website Phase-2 features — finance calculator, compare tool, reviews.",
      "Deliver the first full report against the KPIs — leads, CPL, CPM, CTR, engagement.",
    ], output: "700–1,200 leads/mo run-rate · CPL SAR 30–50 confirmed · full report delivered" },
  ];

  const bestuneDetail = {
    languages: "Mainly Arabic",
    tone: "Direct, colloquial and promotional — with a product- and service-led approach.",
    primary: [
      { p: "instagram" as PKey, label: "Instagram", v: "31.6K" },
      { p: "x" as PKey, label: "X", v: "39.4K" },
      { p: "facebook" as PKey, label: "Facebook", v: "10.6K" },
      { p: "youtube" as PKey, label: "YouTube", v: "2.1K" },
    ],
    secondary: "Website — bestune-sa.com",
    missing: ["TikTok", "Snapchat"],
    contentTypes: [
      "Model introductions & feature highlights",
      "Showroom and test-drive content",
      "Service & after-sales communication",
      "Finance offers & promotions",
      "Cultural and national occasions",
    ],
    formats: [
      "Reels and showroom-shot videos",
      "Static campaign graphics",
      "Product photography and edited videos",
      "Occasion-led branded posts",
    ],
    insights: [
      "Bestune has the most established social presence and the largest existing content library within the portfolio.",
      "Recent content includes a visible mix of Reels, real showroom footage, static campaigns and occasion-led posts.",
      "The content is primarily product- and service-led, supported by finance offers, model introductions and showroom communication.",
      "Warranty, after-sales reassurance and FAW heritage are not communicated consistently across the feed.",
      "TikTok and Snapchat are absent from the current channel mix.",
    ],
    posts: [
      { src: "/taajeer/img/bestune-social-1.png", cat: "Model Highlights" },
      { src: "/taajeer/img/bestune-social-2.png", cat: "Service & After-Sales" },
      { src: "/taajeer/img/bestune-social-3.png", cat: "Showroom & Test-Drive" },
      { src: "/taajeer/img/bestune-social-5.png", cat: "Offers & Financing" },
      { src: "/taajeer/img/bestune-social-6.png", cat: "Seasonal / Real-time" },
    ],
    missingContent: ["Brand & Lifestyle", "Owner Stories / UGC", "Buyer Education"],
    competitors: [
      { name: "Changan", logo: "/taajeer/logos/changan.png" },
      { name: "Geely", logo: "/taajeer/logos/geely.png" },
      { name: "Chery", logo: "/taajeer/logos/chery.png" },
      { name: "MG", logo: "/taajeer/logos/mg.png" },
      { name: "Jetour", logo: "/taajeer/logos/jetour.svg" },
    ],
    competitorBasis: [
      "Chinese-car segment",
      "Sedan & SUV",
      "Value for money",
      "Technology & specifications",
      "Offers & financing in the Saudi market",
    ],
    benchmark: { name: "BYD", logo: "/taajeer/logos/byd.png", line: "Technology storytelling and modern Chinese-brand positioning" },
    benchmarkStudy: [
      "Presents technology in an understandable way",
      "Builds a modern, confident Chinese-brand image",
      "Turns technical features into real stories and benefits",
      "Reduces reliance on direct sales content",
    ],
  };

  // Per-competitor social snapshot — channel numbers supplied; text sections filled as Ahmed sends them.
  type CompDetail = { name: string; logo: string; channels: { p: PKey; v: string }[]; languages?: string; tone?: string; focus?: string; contentTypes?: string[]; keyFindings?: string[] };
  const bestuneCompetitors: CompDetail[] = [
    { name: "Changan", logo: "/taajeer/logos/changan.png", channels: [
      { p: "facebook", v: "154K" }, { p: "x", v: "131.2K" }, { p: "instagram", v: "90.6K" }, { p: "tiktok", v: "38.5K" }, { p: "youtube", v: "6.22K" }, { p: "linkedin", v: "3K" },
    ],
      languages: "Mainly Arabic",
      tone: "Direct, energetic and promotional — with a confident, locally relevant and presenter-led approach.",
      focus: "Building excitement around models and launches while driving test drives and showroom visits through product education, offers and locally relevant campaigns.",
      contentTypes: [
        "Model launches and reveals",
        "Product features and walkarounds",
        "Showroom and presenter-led videos",
        "Offers and financing",
        "Events and launch coverage",
        "Brand partnerships and football content",
        "Lifestyle and real-use storytelling",
      ],
      keyFindings: [
        "Changan uses a video-first content mix across Instagram, X, YouTube and TikTok.",
        "Saudi presenters and showroom-led videos make the communication feel local, accessible and human.",
        "Model launches are developed as multi-stage campaigns, from teasers to event coverage and post-launch content.",
        "Commercial offers remain prominent, but are supported by product films, lifestyle content and brand campaigns.",
        "Instagram appears to provide the strongest visible engagement environment, while X is used more for detailed product and offer communication.",
        "Selected YouTube campaign videos show substantial visible reach, although paid and organic performance cannot be separated from public data alone.",
        "Visual quality varies between polished campaign assets and quick showroom-produced content.",
      ],
    },
    { name: "Jetour", logo: "/taajeer/logos/jetour.svg", channels: [
      { p: "tiktok", v: "96.3K" }, { p: "instagram", v: "69.5K" }, { p: "facebook", v: "48K" }, { p: "linkedin", v: "8K" }, { p: "youtube", v: "3.66K" },
    ],
      languages: "Mainly Arabic",
      tone: "Bold, premium and adventurous — with a confident, locally relevant and human-led approach.",
      focus: "Positioning Jetour as a premium adventure-led SUV brand suited to Saudi lifestyles, supported by capability demonstrations, flagship storytelling, family relevance, creator-led content and offers.",
      contentTypes: [
        "Model walkarounds and feature demonstrations",
        "Flagship and premium product storytelling",
        "Adventure and capability content",
        "Presenter, creator and influencer-led videos",
        "Family and everyday utility",
        "Offers and financing",
        "Launches and event coverage",
        "Brand milestones and global proof",
      ],
      keyFindings: [
        "Jetour has one of the clearest content territories in the competitive set: premium SUV adventure adapted to Saudi lifestyles.",
        "Human-led product demonstrations and local creators are central to how features and ownership benefits are communicated.",
        "TikTok shows the account's strongest platform-native execution and comparatively healthy visible reach.",
        "Recent communication is heavily concentrated around the G700 flagship launch and product story.",
        "Offers support the wider brand image rather than dominating the communication alone.",
        "Family relevance, interior utility and everyday use appear alongside off-road and adventure content.",
        "Visual execution varies between cinematic global assets, local creator videos, showroom footage and static offers.",
        "YouTube performance is polarised: selected flagship films show substantial visible reach, while routine promotional and corporate uploads receive limited interaction.",
      ],
    },
    { name: "Geely", logo: "/taajeer/logos/geely.png", channels: [
      { p: "instagram", v: "63.5K" }, { p: "x", v: "52.3K" }, { p: "facebook", v: "21K" }, { p: "tiktok", v: "14.2K" }, { p: "youtube", v: "5K" },
    ],
      languages: "Mainly Arabic",
      tone: "Informative, practical and reassuring — with a premium yet locally approachable tone.",
      focus: "Building ownership confidence through vehicle comfort, practical education, after-sales support and integrated digital services.",
      contentTypes: [
        "Model features and interior comfort",
        "Car-care and educational content",
        "Service, maintenance and genuine parts",
        "MyGeely app and digital services",
        "Offers and financing",
        "Customer and human stories",
        "Lifestyle and premium communication",
        "Showroom and branch content",
      ],
      keyFindings: [
        "Ownership support is Geely's clearest content territory, covering maintenance, genuine parts, service advice and digital tools.",
        "Educational content gives the account a practical role beyond promotional communication.",
        "Product storytelling focuses strongly on comfort, interior quality and accessible premium features.",
        "MyGeely is visibly integrated into the ownership experience and service communication.",
        "The feed balances product, service, offers and human content, but the overall narrative can feel fragmented.",
        "Visual execution varies across premium campaign assets, educational graphics, dealer offers and quick operational content.",
        "TikTok is active but shows modest visible reach and limited platform-specific execution.",
        "YouTube currently operates mainly as a secondary content library with limited visible performance.",
      ],
    },
    { name: "Chery", logo: "/taajeer/logos/chery.png", channels: [
      { p: "facebook", v: "142K" }, { p: "instagram", v: "63.6K" }, { p: "x", v: "30.6K" }, { p: "tiktok", v: "11.4K" }, { p: "linkedin", v: "9K" }, { p: "youtube", v: "1.66K" },
    ],
      languages: "Mainly Arabic",
      tone: "Modern, informative and promotional — with a technology-led and approachable tone.",
      focus: "Presenting Chery as a technology-rich and practical automotive choice through feature education, ownership reassurance, financing offers and everyday-use communication.",
      contentTypes: [
        "Model and feature highlights",
        "Technology and product education",
        "Offers and financing",
        "Service and after-sales communication",
        "Lifestyle and everyday-use content",
        "Brand milestones and global proof",
        "Interactive and community content",
      ],
      keyFindings: [
        "Technology and feature education form one of the account's clearest and most consistent content territories.",
        "The feed balances promotional offers with product education, ownership support, lifestyle content and global brand proof.",
        "Service, parts availability and after-sales communication are visibly integrated into the content mix.",
        "Human and lifestyle content are present, but product features and technology remain the dominant communication focus.",
        "The visual identity varies between local brand assets, distributor content, partner campaigns and repurposed global material.",
        "Visible TikTok performance is uneven, with occasional reach spikes around promotional content.",
        "YouTube appears to operate mainly as a secondary archive rather than an active always-on channel.",
      ],
    },
    { name: "MG", logo: "/taajeer/logos/mg.png", channels: [
      { p: "tiktok", v: "46.7K" }, { p: "instagram", v: "36.8K" }, { p: "facebook", v: "25K" }, { p: "linkedin", v: "9K" }, { p: "x", v: "5,608" }, { p: "youtube", v: "1.21K" },
    ],
      languages: "Mainly Arabic",
      tone: "Confident, polished and lifestyle-led — supported by promotional and family-relevant messaging.",
      focus: "Positioning MG as a stylish, modern and everyday-relevant automotive brand, while supporting that image with seasonal offers, model communication and after-sales reassurance.",
      contentTypes: [
        "Offers and financing",
        "Model highlights",
        "Lifestyle and seasonal content",
        "Service and after-sales communication",
        "Showroom and retail activation content",
        "Product videos and branded campaigns",
      ],
      keyFindings: [
        "MG balances promotional communication with stronger lifestyle-led storytelling than many competitor feeds.",
        "The brand connects its vehicles to seasonal moments, everyday life, family use and social occasions.",
        "Product communication is visually polished and supported by clean, brand-led execution.",
        "After-sales and MG Care content are clearly visible, strengthening ownership reassurance.",
        "Offers and financing remain prominent, but they are integrated into a broader brand image rather than dominating it alone.",
        "The content mix includes static campaign graphics, short-form videos, showroom posts and more polished branded films.",
        "Selected YouTube videos show strong visible reach across product, campaign and after-sales content.",
      ],
    },
  ];

  // Changan content examples — labelled posts + key takeaways.
  const changanExamples = {
    takeaways: [
      "Model launches are developed as connected content journeys, combining hero visuals, feature-led carousels and supporting campaign assets.",
      "Product features are translated into clear visual benefits, making technical information easier for audiences to understand.",
      "Commercial offers are presented with strong hierarchy and clear financial details, without replacing the wider brand communication.",
      "Vehicles are placed within relatable Saudi family and everyday-life settings, helping the product feel relevant beyond the showroom.",
      "Community and occasion-led content expands the brand's role beyond product promotion and supports a more human image.",
    ],
    launch: { label: "Model Launch & Product Storytelling", src: "/taajeer/img/changan-ex-launch.png" },
    grid: [
      { label: "Feature Education", src: "/taajeer/img/changan-ex-feature.png" },
      { label: "Offers & Financing", src: "/taajeer/img/changan-ex-offers.png" },
      { label: "Family & Lifestyle Relevance", src: "/taajeer/img/changan-ex-family.png" },
      { label: "Community & CSR Content", src: "/taajeer/img/changan-ex-csr.png" },
    ],
  };
  const changanExAll = [changanExamples.launch.src, ...changanExamples.grid.map((g) => g.src)];

  // MG content examples.
  const mgExamples = {
    takeaways: [
      "MG uses seasonal and culturally relevant moments to keep the brand connected to everyday audience interests.",
      "Vehicles are placed within relatable social and lifestyle settings, helping the brand communicate beyond product specifications.",
      "Commercial offers present the key purchase information clearly, including pricing, financing and ownership benefits.",
      "After-sales, service centres and original parts are actively communicated as part of the ownership proposition.",
      "Retail activations and test-drive opportunities connect social content with physical customer action.",
    ],
    launch: { label: "Seasonal & Contextual Content", src: "/taajeer/img/mg-ex-seasonal.png" },
    grid: [
      { label: "Lifestyle & Social Moments", src: "/taajeer/img/mg-ex-lifestyle.png" },
      { label: "Offers & Financing", src: "/taajeer/img/mg-ex-offers.png" },
      { label: "After-Sales Reassurance", src: "/taajeer/img/mg-ex-aftersales.png" },
      { label: "Retail Activation & Test Drive", src: "/taajeer/img/mg-ex-retail.png" },
    ],
  };
  const mgExAll = [mgExamples.launch.src, ...mgExamples.grid.map((g) => g.src)];

  // BYD content examples.
  const bydExamples = {
    takeaways: [
      "Localizing the product story by placing vehicles within recognizable Saudi cities, landmarks, destinations and road-trip environments.",
      "Humanizing the brand through family-led content, showing how the vehicle fits naturally into everyday Saudi life, family outings and shared moments.",
      "Turning technical features into clear customer benefits, including acceleration, interior comfort, space, practicality, hybrid efficiency and lower emissions.",
      "Using seasonal and experiential content such as summer campaigns, showroom activations and destination-based storytelling to keep the brand culturally relevant.",
      "Balancing brand-building with commercial communication through model launches, product showcases, event announcements and financing offers.",
    ],
    mainTakeaway: "BYD builds its content around how the vehicle fits into the customer's life, rather than presenting the car as an isolated product.",
    launch: { label: "Saudi Localization", src: "/taajeer/img/byd-ex-localization.png" },
    grid: [
      { label: "Seasonal Activations", src: "/taajeer/img/byd-ex-seasonal.png" },
      { label: "Interior & Comfort", src: "/taajeer/img/byd-ex-interior.png" },
      { label: "Performance", src: "/taajeer/img/byd-ex-performance.png" },
      { label: "Family Lifestyle", src: "/taajeer/img/byd-ex-family.png" },
      { label: "Sustainability", src: "/taajeer/img/byd-ex-sustainability.png" },
      { label: "Offers & Launches", src: "/taajeer/img/byd-ex-offers.png" },
    ],
  };
  const bydExAll = [bydExamples.launch.src, ...bydExamples.grid.map((g) => g.src)];

  // Objectives — communication + social media.
  const commObjectives = [
    { t: "Strengthen Brand Positioning and Recognition", d: "Establish the brand as a modern, reliable and relevant automotive choice within the Saudi market." },
    { t: "Build Product Consideration", d: "Highlight the vehicle range, features, technology and value propositions to support purchase consideration." },
    { t: "Educate and Empower Potential Buyers", d: "Simplify technical information, ownership benefits, financing options and after-sales services." },
    { t: "Build Trust Through Authentic Experiences", d: "Use customer stories, test drives, employee expertise and real ownership experiences to strengthen credibility." },
  ];
  const smObjectives = [
    "Build & Increase Brand Awareness",
    "Boost Audience Engagement",
    "Increase Audience Growth",
    "Drive Qualified Leads & Test-Drive Bookings",
    "Improve Content Shareability & Brand Advocacy",
  ];

  // Target audience — general segmentation (portfolio level), Primary vs Secondary.
  const targetAudience = {
    b2c: {
      primary: ["Young Professionals & First-Time Buyers", "Modern Families", "Value-Conscious Upgraders"],
      secondary: ["Adventure & Lifestyle Seekers", "Female Drivers", "Automotive & Technology Enthusiasts"],
    },
    b2b: {
      primary: ["SMEs & Corporate"],
      secondary: ["Government & Institutional Buyers", "Rental & Mobility Companies"],
    },
  };

  // B2C detailed personas.
  const b2cPersonas: { bar: string; photo?: string; description: string; demographics: [string, string][]; interest: string; needs: string[]; feels: string; channels: PKey[] }[] = [
    {
      bar: "Young Professionals & First-Time Buyers",
      photo: "/taajeer/img/persona-b2c-young.png",
      description: "Young professionals and newly employed customers looking for a stylish, reliable and affordable first vehicle.",
      demographics: [["Age", "23–35"], ["Gender", "Both"], ["Life Stage", "Singles and newly married couples"], ["Income Level", "Emerging to middle income"], ["Tech-Savviness", "High — comfortable with digital platforms and online research"]],
      interest: "Technology, modern design, career growth, urban mobility and social trends.",
      needs: ["Flexible financing and affordable monthly payments", "Modern design and connected technology", "Fuel efficiency and manageable running costs", "Simple booking and test-drive experience"],
      feels: "Ambitious and excited, but price-conscious and seeking reassurance before purchasing.",
      channels: ["tiktok", "instagram", "snapchat", "youtube"],
    },
    {
      bar: "Growing Families & SUV Seekers",
      photo: "/taajeer/img/persona-b2c-families.png",
      description: "Couples and families seeking a spacious, safe and comfortable vehicle for everyday mobility and family travel.",
      demographics: [["Age", "28–45"], ["Gender", "Both — purchase decisions are often shared"], ["Life Stage", "Married couples and families with children"], ["Income Level", "Middle to upper-middle income"], ["Tech-Savviness", "Moderate to high"]],
      interest: "Family lifestyle, safety, road trips, convenience, comfort and practical mobility.",
      needs: ["Spacious cabin and flexible storage", "Advanced safety and driver-assistance features", "Comfortable seating for daily and long-distance use", "Reliable warranty and after-sales support"],
      feels: "Responsible and cautious, prioritizing family comfort, safety and long-term reliability.",
      channels: ["instagram", "youtube", "facebook", "snapchat"],
    },
    {
      bar: "Value-Conscious Car Upgraders",
      photo: "/taajeer/img/persona-b2c-upgraders.png",
      description: "Existing vehicle owners looking to upgrade to better design, technology and performance without exceeding their budget.",
      demographics: [["Age", "30–50"], ["Gender", "Both"], ["Life Stage", "Professionals, families and small-business owners"], ["Income Level", "Middle to upper-middle income"], ["Tech-Savviness", "Moderate to high — actively compares models online"]],
      interest: "Vehicle comparisons, performance, offers, ownership costs, resale value and premium features.",
      needs: ["Strong value for money", "Clear model and specification comparisons", "Competitive financing or trade-in solutions", "Warranty, maintenance and dependable after-sales service"],
      feels: "Selective and rational, seeking a noticeable and justifiable upgrade from their current vehicle.",
      channels: ["youtube", "instagram", "facebook", "x"],
    },
    {
      bar: "Tech & Lifestyle-Oriented Drivers",
      photo: "/taajeer/img/persona-b2c-tech.png",
      description: "Digitally connected drivers attracted to smart features, distinctive design and lifestyle-led driving experiences.",
      demographics: [["Age", "24–40"], ["Gender", "Both"], ["Life Stage", "Urban professionals, entrepreneurs and creatives"], ["Income Level", "Middle to upper-middle income"], ["Tech-Savviness", "Very high — early adopters of technology"]],
      interest: "Smart technology, design, travel, entertainment, digital experiences and automotive innovation.",
      needs: ["Advanced connectivity and smart technology", "Premium interior and distinctive exterior design", "Driver-assistance and convenience features", "Engaging content, activations and test-drive experiences"],
      feels: "Curious, expressive and innovation-driven, looking for a vehicle that reflects their personality and lifestyle.",
      channels: ["tiktok", "instagram", "youtube", "snapchat"],
    },
  ];

  // B2B detailed personas.
  const b2bPersonas: { bar: string; sub: string; photo?: string; who: string[]; needs: string[]; channels: string[] }[] = [
    {
      bar: "SMEs & Corporate",
      sub: "Business & Fleet Buyers",
      photo: "/taajeer/img/persona-b2b-smes.png",
      who: [
        "Small and medium-sized businesses across retail, logistics, hospitality, construction and professional services.",
        "Large corporations requiring vehicles for employees, executives, sales teams or operational fleets.",
        "Car rental, leasing, delivery and transportation companies seeking scalable fleet solutions.",
      ],
      needs: [
        "Competitive fleet pricing and flexible financing or leasing solutions.",
        "Reliable vehicles with low operating and maintenance costs.",
        "Strong warranty, after-sales service and spare-parts availability.",
        "Multiple vehicle options suitable for executive, employee and operational use.",
        "Dedicated account management and efficient fleet servicing.",
      ],
      channels: ["LinkedIn", "Email", "Direct Sales", "Industry Events", "YouTube"],
    },
    {
      bar: "Government & Institutional Buyers",
      sub: "Public Sector & Large Institutions",
      photo: "/taajeer/img/persona-b2b-gov.png",
      who: [
        "Government ministries, municipalities and public-sector authorities.",
        "State-owned companies and government-supported organizations.",
        "Educational institutions, healthcare providers, NGOs and large community organizations.",
        "Institutions requiring vehicles for administrative, field or operational use.",
      ],
      needs: [
        "Reliable vehicles suitable for long-term and high-usage operations.",
        "Transparent procurement processes and competitive tender proposals.",
        "Fleet customization based on operational requirements.",
        "Comprehensive maintenance contracts, warranties and technical support.",
        "Strong dealership coverage, spare-parts availability and service continuity.",
      ],
      channels: ["LinkedIn", "X", "Email", "Government Tenders", "Direct Meetings"],
    },
  ];

  // Detailed audience personas.
  const audiencePersonas = [
    {
      n: "01", title: "The Ambitious First-Time Buyer", initials: "FH", name: "Fahad Al-Harbi", accent: EMOTION, priority: "Primary",
      meta: ["Age 27", "Jeddah", "Junior Marketing Executive", "Single"],
      profile: "A young Saudi professional looking to purchase his first new car. He wants a modern vehicle that reflects his personality without creating heavy financial pressure.",
      goals: ["Own a stylish and reliable new car.", "Upgrade from ride-hailing or a used vehicle.", "Find affordable monthly installments.", "Benefit from modern technology and connectivity."],
      needs: ["Competitive pricing and flexible financing.", "Attractive exterior design.", "Apple CarPlay, smart screens and safety features.", "Clear warranty and after-sales support."],
      pains: ["Limited initial budget.", "Concern about resale value.", "Uncertainty about Chinese car reliability.", "Complicated financing terms."],
      drivers: ["Monthly installment.", "Technology and design.", "Warranty coverage.", "Reviews and recommendations."],
      interests: ["Vehicle comparisons.", "Feature demonstrations.", "Financing offers.", "Short-form test-drive videos.", "“Best car under a specific budget” content."],
      platforms: ["TikTok", "Instagram", "Snapchat", "YouTube"],
      keyMessage: "Modern design and smart technology, with clear ownership value within an accessible price range.",
    },
    {
      n: "02", title: "The Modern Family Decision-Maker", initials: "KQ", name: "Khalid Al-Qahtani", accent: EMOTION, priority: "Primary",
      meta: ["Age 39", "Jeddah", "Operations Manager", "Married · 3 children"],
      profile: "A family-oriented professional looking for a spacious and dependable vehicle for daily commuting, school trips, shopping and weekend travel.",
      goals: ["Provide comfort and safety for the family.", "Own a practical vehicle with enough space.", "Reduce maintenance concerns.", "Select a car suitable for city and highway driving."],
      needs: ["Spacious cabin and luggage capacity.", "Advanced safety systems.", "Rear air-conditioning and passenger comfort.", "Strong warranty and accessible service centres.", "Competitive fuel consumption."],
      pains: ["High family expenses.", "Concern about maintenance availability.", "Unclear long-term ownership cost.", "Difficulty comparing similar SUV options."],
      drivers: ["Safety.", "Cabin space.", "Reliability.", "After-sales service.", "Financing convenience."],
      interests: ["Family lifestyle content.", "Safety feature demonstrations.", "Cabin and storage reviews.", "Long-distance driving experiences.", "Customer testimonials."],
      platforms: ["Instagram", "YouTube", "Facebook", "Snapchat"],
      keyMessage: "A comfortable, safe and practical vehicle designed around the needs of your family.",
    },
    {
      n: "03", title: "The Lifestyle Upgrader", initials: "RS", name: "Reem Al-Salem", accent: EMOTION, priority: "Primary",
      meta: ["Age 34", "Riyadh", "Business Owner", "Married"],
      profile: "A digitally connected professional who already owns a vehicle but wants to upgrade to a more premium, distinctive and technology-focused model.",
      goals: ["Drive a vehicle that reflects personal success.", "Enjoy premium comfort and advanced features.", "Own a car that stands out visually.", "Receive strong value compared with established premium brands."],
      needs: ["Premium interior quality.", "Distinctive exterior styling.", "Smart driving and safety technology.", "High-quality infotainment.", "Smooth and responsive performance."],
      pains: ["Premium brands may exceed her budget.", "Concern about brand perception.", "Limited awareness of newer models.", "Fear of compromising luxury for affordability."],
      drivers: ["Design and premium feel.", "Technology.", "Performance.", "Brand image.", "Ownership experience."],
      interests: ["Cinematic vehicle content.", "Interior details.", "Lifestyle integrations.", "Influencer reviews.", "Premium feature comparisons."],
      platforms: ["Instagram", "TikTok", "YouTube", "Snapchat"],
      keyMessage: "A visible step up in design, technology and comfort — without moving to a premium-brand price.",
    },
    {
      n: "04", title: "The Fleet and Corporate Decision-Maker", initials: "AZ", name: "Abdullah Al-Zahrani", accent: TAAJEER, priority: "Secondary · B2B",
      meta: ["Age 44", "Western Region", "Procurement & Fleet Manager", "Medium–large enterprise"],
      profile: "A corporate decision-maker responsible for purchasing vehicles for sales teams, operations, executives or transportation requirements.",
      goals: ["Reduce total fleet ownership cost.", "Secure reliable vehicles for business operations.", "Simplify maintenance and servicing.", "Obtain competitive corporate packages."],
      needs: ["Fleet pricing and volume discounts.", "Reliable maintenance support.", "Warranty and service packages.", "Vehicle availability and delivery timelines.", "Clear ownership and operational costs."],
      pains: ["Vehicle downtime.", "Delayed spare parts.", "Inconsistent service quality.", "Limited fleet support.", "Unclear corporate terms."],
      drivers: ["Total cost of ownership.", "Reliability.", "Service network.", "Corporate support.", "Delivery and availability."],
      interests: ["Fleet solutions.", "Corporate case studies.", "Ownership cost comparisons.", "Service and maintenance capabilities.", "Business partnership announcements."],
      platforms: ["LinkedIn", "YouTube", "Email", "Direct Sales"],
      keyMessage: "Reliable mobility solutions that support business continuity and operational efficiency.",
    },
  ];

  // Content strategy — hubs, pillars, style mix, tone.
  const contentHubs = [
    { name: "The Brand", color: EMOTION, desc: "Brand-level communication that builds recognition, trust, and relevance in the Saudi market." },
    { name: "The Vehicles", color: TAAJEER, desc: "Product-focused communication highlighting the design, technology, performance, comfort, and value offered across the Bestune range." },
    { name: "The Experience", color: SOUQ, desc: "Audience-centric communication showing how Bestune fits naturally into everyday life, family moments, journeys, and ownership experiences." },
  ];
  const contentPillars = [
    { hub: "The Brand", color: EMOTION, items: [
      { t: "Brand Story & Ambition", d: "Communicate Bestune's vision, heritage, progress, and ambition to become a recognized automotive choice in Saudi Arabia." },
      { t: "Smart Technology & Driving Convenience", d: "Show how Bestune's smart technology, connectivity and driver-assistance features make everyday driving easier and more convenient." },
      { t: "Brand Presence", d: "Cover showroom activities, launches, partnerships, exhibitions, milestones, and corporate announcements." },
      { t: "Saudi Relevance", d: "Connect Bestune with Saudi culture, national occasions, local destinations, seasonal moments, and community interests." },
    ] },
    { hub: "The Vehicles", color: TAAJEER, items: [
      { t: "Product Spotlights", d: "Introduce each model through its main strengths, positioning, design, and ideal customer profile." },
      { t: "Features & Technology", d: "Explain safety systems, connectivity, screens, driver-assistance technologies, comfort features, and smart functions clearly." },
      { t: "Design & Craftsmanship", d: "Showcase exterior styling, interior materials, details, colours, lighting, cabin design, and finishing quality." },
      { t: "Performance & Capability", d: "Communicate engine performance, driving modes, handling, efficiency, space, and everyday usability." },
      { t: "Offers & Ownership Value", d: "Present prices, financing plans, test-drive opportunities, warranties, aftersales benefits, and limited-time offers." },
      { t: "Model Comparisons", d: "Help audiences understand the differences between models, trims, features, and usage scenarios." },
    ] },
    { hub: "The Experience", color: SOUQ, items: [
      { t: "Saudi Lifestyle", d: "Show Bestune vehicles in relatable Saudi settings such as city drives, family outings, weekend trips, work commutes, and social occasions." },
      { t: "Family & Comfort", d: "Highlight passenger comfort, cabin space, storage, safety, and features that support family needs." },
      { t: "Customer Stories", d: "Feature testimonials, delivery moments, owner experiences, and real reasons customers selected Bestune." },
      { t: "People Behind the Brand", d: "Humanize the account through sales advisors, showroom teams, service staff, and behind-the-scenes content." },
      { t: "Interactive Engagement", d: "Use questions, polls, quizzes, comparisons, challenges, and audience-led conversations to encourage participation." },
      { t: "Travel & Discovery", d: "Position Bestune as a companion for exploring Saudi destinations, road trips, seasonal escapes, and everyday adventures." },
    ] },
  ];
  const contentStyleMix = [
    { pct: 40, t: "Informative / Product-Led", d: "Provide clear and useful information about Bestune models, features, technology, performance, pricing, offers, and ownership benefits.", color: EMOTION },
    { pct: 25, t: "Lifestyle & Inspirational", d: "Show how Bestune fits into modern Saudi lifestyles through family, travel, work, comfort, and everyday mobility moments.", color: TAAJEER },
    { pct: 20, t: "Engaging & Interactive", d: "Encourage participation through relatable questions, polls, quizzes, comparisons, comments, and community-driven formats.", color: SOUQ },
    { pct: 15, t: "Brand & Corporate", d: "Build credibility through brand stories, milestones, partnerships, events, team content, and official announcements.", color: STEEL },
  ];
  const toneAttributes = ["Modern & confident", "Premium but approachable", "Clear & informative", "Warm & family-oriented", "Localized & culturally relevant", "Adventurous & energetic", "Smart without sounding overly technical", "Engaging without becoming overly promotional"];

  // Channels strategy.
  const channelOverview: { p: PKey; character: string; fn: string }[] = [
    { p: "x", character: "The Conversationalist", fn: "Join conversations, share timely updates and engage directly with automotive audiences." },
    { p: "tiktok", character: "The Creator", fn: "Entertaining, fast-paced automotive content designed for discovery and participation." },
    { p: "instagram", character: "The Visualizer", fn: "Vehicles, design and ownership through visually engaging, informative content." },
    { p: "facebook", character: "The Visualizer", fn: "Vehicles, design and ownership through visually engaging, informative content." },
    { p: "youtube", character: "The Storyteller", fn: "Detailed stories and deeper product understanding through long-form video." },
    { p: "linkedin", character: "The Professional", fn: "Corporate progress, partnerships and contribution to the Saudi automotive market." },
  ];
  const channels: { id: string; nav: string; title: string; icons: PKey[]; character: string; fn: string; language: string; formats: string[]; frequency: string; objective: string; pillars: string[] }[] = [
    {
      id: "ch-instagram-facebook", nav: "Instagram & Facebook", title: "Instagram & Facebook", icons: ["instagram", "facebook"], character: "The Visualizer",
      fn: "Showcase Bestune's vehicles, design, technology and ownership experience through visually engaging and informative content.",
      language: "Arabic Primary · English Secondary", frequency: "2–3 posts / week",
      formats: ["Reels", "Images", "Carousels", "Stories", "Highlights", "Live Coverage"],
      objective: "Increase brand awareness, build product consideration and showcase Bestune's design, technology, performance and ownership benefits through premium and locally relevant visual storytelling.",
      pillars: ["Vehicle Spotlight", "Design & Technology", "Features Explained", "Lifestyle & Everyday Mobility", "Offers & Financing", "Ownership Experience", "Events & Activations", "Community Engagement", "Real-Time & Seasonal Content"],
    },
    {
      id: "ch-x", nav: "X", title: "X", icons: ["x"], character: "The Conversationalist",
      fn: "Join relevant conversations, share timely updates and engage directly with automotive audiences and customers.",
      language: "Arabic Primary · English Secondary", frequency: "2–3 posts / week",
      formats: ["Posts", "Threads", "Replies", "Reposts", "Quote Posts", "Images & Short Videos", "Polls"],
      objective: "Strengthen brand relevance, encourage conversation and establish Bestune as an informed and responsive automotive brand through timely updates, customer interaction and industry-related discussions.",
      pillars: ["Brand & Product Updates", "Automotive Conversations", "Features & Quick Facts", "Real-Time Content", "Offers & Announcements", "Customer Support", "Interactive Questions", "Events & Industry News"],
    },
    {
      id: "ch-tiktok", nav: "TikTok", title: "TikTok", icons: ["tiktok"], character: "The Creator",
      fn: "Present Bestune through entertaining, relatable and fast-paced automotive content designed for discovery and participation.",
      language: "Arabic Primary · English Secondary", frequency: "2–3 posts / week",
      formats: ["Short Videos", "Trends", "POV Content", "Feature Demonstrations", "Presenter-Led Videos", "Challenges", "Behind-the-Scenes Content"],
      objective: "Build brand excitement, reach younger audiences and generate organic engagement through authentic, entertaining and trend-aware automotive content.",
      pillars: ["Automotive Entertainment", "Feature Demonstrations", "POV & Driving Experiences", "Lifestyle Moments", "Trends & Challenges", "Behind the Scenes", "People & Showroom Content", "Interactive Questions", "Quick Comparisons"],
    },
    {
      id: "ch-youtube", nav: "YouTube", title: "YouTube", icons: ["youtube"], character: "The Storyteller",
      fn: "Tell detailed stories and provide deeper product understanding through long-form and searchable video content.",
      language: "Arabic Primary · English Secondary", frequency: "2–3 posts / week",
      formats: ["Shorts", "Vehicle Walkarounds", "Model Reviews", "Feature Tutorials", "Test-Drive Videos", "Customer Stories", "Event Coverage", "Branded Films"],
      objective: "Build trust and product consideration through detailed storytelling, expert explanations and immersive content that demonstrates Bestune's design, technology, performance and ownership experience.",
      pillars: ["Vehicle Deep Dives", "Technology Explained", "Test Drives & Performance", "Model Comparisons", "Ownership Guides", "Customer Experiences", "Event Coverage", "Brand Stories", "Shorts & Quick Features"],
    },
    {
      id: "ch-linkedin", nav: "LinkedIn", title: "LinkedIn", icons: ["linkedin"], character: "The Professional",
      fn: "Communicate Bestune's corporate progress, partnerships, achievements and contribution to the Saudi automotive market.",
      language: "English Primary · Arabic Secondary", frequency: "2–3 posts / week",
      formats: ["Corporate Posts", "Leadership Updates", "Articles", "Images", "Professional Videos", "Event Coverage", "Employee Stories", "Partnership Announcements"],
      objective: "Strengthen corporate credibility, highlight business growth and position Bestune and its local partner as progressive contributors to the automotive sector in Saudi Arabia.",
      pillars: ["Corporate News", "Partnerships & Milestones", "Leadership & Thought Leadership", "Market Expansion", "Events & Industry Participation", "Team & Culture", "Sustainability & Innovation", "Awards & Achievements", "Business Performance"],
    },
  ];
  const channelsApproach: { p: PKey; channel: string; desc: string; hubs: string[]; type: string; format: string; freq: string; lang: string }[] = [
    { p: "instagram", channel: "Instagram", desc: "The primary visual communication channel for presenting Bestune's vehicles, design, technology and lifestyle relevance through premium and engaging content.", hubs: ["The Brand", "The Vehicles", "The Experience"], type: "Product-focused content, aspirational lifestyle, informative content, edutainment, real-time content", format: "Reels, images, carousels, Stories, Highlights, Live coverage", freq: "2–3 times a week", lang: "80% Arabic · 20% English" },
    { p: "facebook", channel: "Facebook", desc: "A supporting channel that broadens reach, communicates detailed vehicle information and offers, and connects with families and potential buyers.", hubs: ["The Brand", "The Vehicles", "The Experience"], type: "Informative content, offers and financing, product communication, community content, brand updates", format: "Images, videos, carousels, text-based posts, links, polls", freq: "2–3 times a week", lang: "70% Arabic · 30% English" },
    { p: "x", channel: "X", desc: "A real-time communication channel focused on conversations, automotive updates, customer interaction and active reputation monitoring.", hubs: ["The Brand", "The Vehicles", "The Experience"], type: "Social conversations, automotive news, quick product facts, customer engagement, real-time and tactical content", format: "Text posts, threads, images, videos, polls, replies, reposts", freq: "2–3 times a week", lang: "80% Arabic · 20% English" },
    { p: "linkedin", channel: "LinkedIn", desc: "A professional communication channel highlighting Bestune's corporate progress, partnerships, milestones, leadership and market presence.", hubs: ["The Brand", "The People"], type: "Corporate news, official communication, partnerships, achievements, thought leadership, team and culture", format: "Images, professional videos, articles, documents, infographics", freq: "2–3 times a week", lang: "50% Arabic · 50% English" },
    { p: "youtube", channel: "YouTube", desc: "A long-form storytelling channel used to build product understanding and trust through detailed automotive and branded video content.", hubs: ["The Vehicles", "The Experience", "The People"], type: "Vehicle deep dives, reviews, feature explainers, test drives, brand stories, event coverage", format: "Shorts, medium-form videos, long-form videos, playlists", freq: "2–3 times a week", lang: "80% Arabic · 20% English" },
    { p: "tiktok", channel: "TikTok", desc: "A discovery and entertainment channel designed to reach younger audiences through relatable, dynamic and trend-aware automotive content.", hubs: ["The Vehicles", "The Experience", "The People"], type: "Entertainment, POV content, trends, product demonstrations, lifestyle content, behind-the-scenes content", format: "Short vertical videos, trends, challenges, presenter-led videos, reactions", freq: "2–3 times a week", lang: "90% Arabic · 10% English" },
    { p: "snapchat", channel: "Snapchat", desc: "A supporting channel for reaching younger Saudi audiences through fast, authentic and location-based content, especially during launches and events.", hubs: ["The Brand", "The Vehicles", "The Experience"], type: "Event coverage, offers, showroom experiences, test drives, behind-the-scenes content, paid campaign adaptations", format: "Short vertical videos, Stories, filters, location-based ads", freq: "2–3 times a week", lang: "90% Arabic · 10% English" },
  ];

  // Growth services — Bestune only.
  const bSeo: { t: string; d: string; icon: LucideIcon }[] = [
    { t: "Local SEO — Showroom Discovery", d: "Create and optimize a Google Business Profile for each Bestune showroom, with consistent business information, updated images, review management and local visibility for searches such as “Bestune near me” and “معرض بيستون”.", icon: Store },
    { t: "Keyword Strategy — Arabic + English", d: "Map each Bestune model and high-intent buying question to a dedicated page. This includes queries around prices, specifications, financing, warranty, comparisons and family vehicle requirements.", icon: Search },
    { t: "Technical SEO", d: "Strengthen indexability, XML sitemaps, structured data, mobile performance, page speed and Arabic RTL implementation to provide a technically reliable foundation for organic growth.", icon: Wrench },
    { t: "Content That Ranks", d: "Develop model pages, pricing content, buyer guides, comparisons and FAQs based on what Saudi customers actively search for. This creates long-term organic visibility that grows over time.", icon: BookOpen },
  ];
  const bSem: { t: string; d: string; icon: LucideIcon }[] = [
    { t: "Search — Intent Capture", d: "Run brand, non-brand, category and carefully structured competitor-search campaigns covering model names, prices, offers, financing, warranty and test-drive intent.", icon: Target },
    { t: "Performance Max", d: "Use Performance Max across relevant Google inventory once conversion tracking, creative assets and landing pages are fully prepared. Campaign structures may be separated by model, offer or conversion objective.", icon: Globe },
    { t: "YouTube", d: "Build awareness and consideration through model films, feature demonstrations, customer experiences and capability-led video content that supports future search demand.", icon: Film },
    { t: "Remarketing", d: "Re-engage website visitors, social engagers, video viewers and users who started but did not complete a lead action, improving conversion efficiency across the funnel.", icon: Repeat },
  ];
  const bSemAngle = "Family SUV and sedan searches, pricing, financing, warranty, ownership benefits and model-specific competitor-category terms.";
  const bMediaChannels: { name: string; pct: number; role: string; color: string }[] = [
    { name: "Meta — Instagram & Facebook", pct: 35, role: "Lead generation, reach and retargeting", color: "#1877F2" },
    { name: "Google Search", pct: 25, role: "Capture high-intent price, model and test-drive searches", color: "#34A853" },
    { name: "TikTok", pct: 15, role: "Vertical-video awareness and product discovery", color: "#111111" },
    { name: "PMax + YouTube", pct: 15, role: "Cross-funnel coverage, consideration and video reach", color: "#EA4335" },
    { name: "Snapchat", pct: 10, role: "Incremental Saudi reach and location-based offers", color: "#F7C700" },
  ];
  const bKpi = {
    northstar: "Qualified leads and test-drive intent",
    rows: [
      { m: "Lead volume", t: "Based on approved media investment" },
      { m: "Cost per Lead", t: "SAR 35–55" },
      { m: "Cost per Qualified Lead", t: "To be established after month one" },
      { m: "Monthly Reach", t: "Based on approved media investment" },
      { m: "CPM", t: "SAR 15–35" },
      { m: "CTR", t: "1–2.5%" },
      { m: "Engagement Rate", t: "1.5–3%" },
      { m: "Lead-to-Test-Drive Rate", t: "10–25%" },
      { m: "Lead-to-Showroom Rate", t: "10–20%" },
      { m: "Trust Sentiment", t: "Positive monthly trend" },
    ],
  };

  // Executive summary.
  const execChallenges: { t: string; pts: string[]; note: string; critical?: boolean }[] = [
    { t: "Inconsistent Social Media Presence", pts: ["Instagram is active, but posting is inconsistent.", "Engagement remains limited.", "Reels lack strong hooks, platform-native ideas and trend-aware execution.", "Facebook activity is irregular.", "X and YouTube lack sustained content momentum."], note: "Inconsistency, limited video use and weak community engagement are the central gaps — Bestune is not fully benefiting from its existing audience." },
    { t: "Content Is Not Building Enough Brand Preference", pts: ["Why Bestune is relevant to Saudi lifestyles.", "How its features benefit customers in real situations.", "The quality of the ownership experience.", "Warranty and after-sales reassurance.", "Customer experiences and social proof.", "The heritage and credibility behind the brand."], note: "Content informs about the vehicle, but doesn't always give a strong reason to remember, trust or prefer Bestune." },
    { t: "Limited Video & Platform-Specific Content", pts: ["Organic discovery.", "Audience growth.", "Feature education.", "Engagement.", "Brand memorability."], note: "Video and Reels aren't used at the level required to compete — and content must be built per platform, not reposted everywhere." },
    { t: "The Website Is Usable, but Not Campaign-Ready", pts: ["Inconsistencies between the lineup and different pages.", "Content and quality-control errors that reduce trust.", "Forms, FAQs and offers requiring updates.", "Weak city and lead-form options.", "Limited financing, WhatsApp and offer CTAs.", "Insufficient SEO and vehicle-comparison content."], note: "It can inform, but isn't yet prepared to support performance campaigns and lead generation efficiently." },
    { t: "Weak Lead Tracking & Follow-Up", pts: ["Where leads came from.", "How quickly they were contacted.", "Whether they were qualified.", "Whether they booked a test drive.", "Whether they visited a showroom.", "Which campaigns generated real sales."], note: "Without centralized tracking, clear ownership and response-time standards, none of this can be answered." },
  ];
  const execLeadFlow = ["Content", "Website", "WhatsApp / Form", "CRM", "Sales Team", "Test Drive", "Showroom Visit"];
  const execResponse: { t: string; pts?: string[]; special?: "mapping" | "brandfeel"; note?: string }[] = [
    { t: "Fix the Digital Foundation", note: "Before increasing ad investment, repair the main conversion touchpoints.", pts: ["Correct the hotline and WhatsApp details.", "Fully brand every contact channel for Bestune.", "Update vehicle pages, offers, forms and FAQs.", "Align the model lineup across the website.", "Improve city selection and test-drive forms.", "Strengthen finance and offer CTAs.", "Improve mobile, SEO and page performance."] },
    { t: "Build a Consistent Content System", note: "A reliable monthly content calendar across priority channels, balancing:", pts: ["Product and feature education.", "Saudi lifestyle relevance.", "Family and everyday mobility.", "Offers and ownership value.", "Warranty and after-sales support.", "Customer stories.", "Showroom teams and people behind the brand.", "Community and interactive content."] },
    { t: "Introduce a Reels-First Creative Direction", note: "Not just more Reels — content designed for discovery, retention and action.", pts: ["Attention-grabbing hooks.", "Feature demonstrations.", "Model comparisons.", "Saudi presenters and creators.", "Showroom walkarounds.", "Family and lifestyle scenarios.", "Test-drive experiences.", "Customer questions.", "Ownership and after-sales education."] },
    { t: "Translate Features into Customer Benefits", note: "Explain what each feature means to the customer, not isolated technical details.", special: "mapping" },
    { t: "Strengthen Brand & Visual Consistency", special: "brandfeel", note: "A clearer, more recognizable visual system across photography, Reels, graphics, launches and offers. The brand should feel:" },
    { t: "Repair Lead Capture & Response Management", note: "One connected conversion journey.", pts: ["A Bestune-branded WhatsApp channel.", "Automated FAQs and initial lead qualification.", "CRM integration.", "Assigned lead ownership.", "Clear response-time SLA.", "Backup contact options.", "Automated lead distribution.", "Lead-status tracking.", "Sales-team follow-up reporting."] },
    { t: "Track & Optimize Commercial Performance", note: "Once the foundation is fixed, connect paid media to measurable actions, not traffic.", pts: ["Qualified leads.", "Cost per lead.", "Test-drive bookings.", "Showroom visits.", "Contact response time.", "Lead-to-test-drive rate.", "Lead-to-showroom rate.", "Lead quality and sales feedback."] },
  ];
  const execFeatureBenefit: [string, string][] = [
    ["Cabin size", "family comfort"],
    ["Safety technology", "greater reassurance"],
    ["Connectivity", "an easier everyday experience"],
    ["Warranty", "reduced ownership concern"],
    ["Financing", "accessible ownership"],
    ["Performance", "confidence across city & highway driving"],
  ];
  const execBrandFeel = ["Modern", "Confident", "Reliable", "Premium but approachable", "Relevant to Saudi customers"];
  const execRoadmap: { t: string; d: string }[] = [
    { t: "Fix the Fundamentals", d: "Repair the conversion touchpoints, website and lead journey." },
    { t: "Brand-Specific Content", d: "A consistent content system and a Reels-first creative direction." },
    { t: "Tracking & Analytics", d: "Connected lead capture, CRM and performance measurement." },
    { t: "Scale", d: "Paid campaigns and lead generation, optimized to real actions." },
  ];

  // BYD content benchmark.
  const bydBenchmark: { channels: { p: PKey; v: string }[]; languages?: string; tone?: string; focus?: string; contentTypes?: string[]; contentFormats?: string[]; keyFindings?: string[] } = {
    channels: [
      { p: "tiktok", v: "58.3K" }, { p: "instagram", v: "37.1K" }, { p: "facebook", v: "20K" }, { p: "linkedin", v: "16K" }, { p: "x", v: "6,407" }, { p: "youtube", v: "2.71K" },
    ],
    languages: "Arabic",
    tone: "Modern, confident and premium — while remaining approachable, culturally relevant and family-oriented.",
    focus: "Positioning the vehicles as advanced mobility products by translating technology, comfort and performance features into clear everyday benefits, while connecting the brand with Saudi culture, locations, sports and family life.",
    contentTypes: [
      "Technology and smart-feature storytelling",
      "Interior comfort and premium design",
      "Model launches and product introductions",
      "Saudi lifestyle and family journeys",
      "Football partnerships and sports moments",
      "Showroom openings and brand events",
      "Offers, warranty and financing communication",
      "Location-based and seasonal content",
    ],
    contentFormats: [
      "Feature-led carousel posts",
      "Cinematic product Reels",
      "Interior close-ups and design details",
      "Lifestyle photography with Saudi settings",
      "Event and showroom coverage",
      "Static commercial offer posts",
      "Interactive and occasion-led content",
    ],
    keyFindings: [
      "BYD does not communicate specifications as isolated technical information; it converts them into clear customer benefits such as comfort, space, entertainment and driving convenience.",
      "The brand creates a balance between product storytelling, lifestyle content, commercial communication and local relevance, rather than relying mainly on vehicle displays and offers.",
      "Technology is presented visually through focused interior details, feature demonstrations and structured carousels, making complex features easier to understand.",
      "Saudi relevance is consistently integrated through local destinations, family scenarios, football partnerships, summer journeys and regional showroom activity.",
      "The visual identity remains modern and premium while adapting to different content themes without making the feed feel repetitive.",
    ],
  };

  /* ═══ RENDER ═══ */
  return (
    <div ref={ref} className="taajeer-strategy-page" style={{ background: "#fff", color: INK }}>
      <SectionNav />

      {/* ══════════ HERO ══════════ */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: "#fff" }}>
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center">
          <div className="tj-hero opacity-0 mb-7 flex flex-col items-center gap-3" style={{ paddingTop: 32 }}>
            <img src="/taajeer/brand/emotion.png" alt="Emotion Group" style={{ height: 66, objectFit: "contain" }} />
            <span className="text-[10px] font-bold tracking-[1.5px]" style={{ color: MUTED }}>PREPARED BY EMOTION  ·  FOR</span>
            <img src="/taajeer/logos/taajeer.png" alt="Taajeer Group" style={{ height: 38, objectFit: "contain" }} />
          </div>
          <div className="tj-hero opacity-0 flex items-center gap-6 md:gap-9 mb-8">
            {THREE.map((b) => (
              <img key={b.key} src={b.logo} alt={b.name} style={{ height: b.key === "b212" ? 30 : 34, maxWidth: 120, objectFit: "contain" }} />
            ))}
          </div>
          <div className="tj-hero opacity-0 text-center mb-3">
            <p className="text-[13px] font-bold" style={{ color: MUTED }}>BESTUNE · KINGDOM OF SAUDI ARABIA · 2026</p>
          </div>
          <div className="tj-hero opacity-0 text-center mb-4">
            <h1 className="heading" style={{ fontSize: "clamp(36px, 8.5vw, 84px)", lineHeight: 1.03, color: INK, fontWeight: 800 }}>
              Social Media<br /><span style={{ color: EMOTION }}>Strategy</span>
            </h1>
          </div>
          <div className="tj-hero opacity-0 flex flex-col items-center text-center mb-8 max-w-xl">
            <p className="text-lg" style={{ color: BODY }}>A focused social media strategy for Bestune in the Saudi market.</p>
            <img src={BRANDS.bestune.logo} alt="Bestune" style={{ height: 30, maxWidth: 180, objectFit: "contain", marginTop: 12 }} />
          </div>

          {/* stat strip */}
          {/* prepared / presented */}
          <div className="tj-hero opacity-0 grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 w-full max-w-2xl">
            <div className="rounded-[16px] p-5" style={{ background: "#fff", border: `1px solid ${RULE}` }}>
              <p className="text-[10px] font-bold mb-2" style={{ color: EMOTION }}>PREPARED BY</p>
              <p className="text-[14px] font-bold" style={{ color: INK }}>Emotion</p>
              <p className="text-[11px]" style={{ color: BODY }}>Creative, Media &amp; Growth Agency</p>
              <p className="text-[11px]" style={{ color: MUTED }}>info@emotiongrp.com</p>
            </div>
            <div className="rounded-[16px] p-5" style={{ background: "#fff", border: `2px solid ${EMOTION}` }}>
              <p className="text-[10px] font-bold mb-2" style={{ color: EMOTION }}>PRESENTED TO</p>
              <p className="text-[14px] font-bold" style={{ color: INK }}>Taajeer Group</p>
              <p className="text-[11px]" style={{ color: BODY }}>Bestune</p>
            </div>
          </div>

          <div className="tj-hero opacity-0 flex flex-col items-center">
            <div style={{ width: 24, height: 38, border: `1.5px solid ${RULE}`, borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 5 }}>
              <div style={{ width: 3, height: 6, borderRadius: 2, background: EMOTION, animation: "scrollTJ 1.6s ease-in-out infinite" }} />
            </div>
            <ArrowDown size={14} color={MUTED} className="mt-2" />
          </div>
        </div>
        <style>{`@keyframes scrollTJ{0%{transform:translateY(0);opacity:1}75%{transform:translateY(9px);opacity:0}76%{transform:translateY(0);opacity:0}100%{opacity:1}}`}</style>
      </section>

      {/* ══════════ TABLE OF CONTENTS ══════════ */}
      <section id="contents" className="tj-slide opacity-0" style={{ padding: "110px 24px", background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <SH n="00" title="Table of" accent="Contents"
            sub="The five parts of this deck — research, approach, brand strategy, channels and extra services." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 tj-stagger">
            {NAV_GROUPS.map((g, gi) => (
              <button
                key={g.group}
                onClick={() => document.getElementById(g.items[0].id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="tj-item rounded-[22px] p-7 flex flex-col text-left cursor-pointer border-0 w-full"
                style={{ background: "#fff", border: `1px solid ${RULE}`, borderTop: `4px solid ${g.color}` }}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="heading text-3xl font-bold" style={{ color: g.color }}>{String(gi + 1).padStart(2, "0")}</span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: `${g.color}12`, color: g.color }}>{g.items.length} section{g.items.length === 1 ? "" : "s"}</span>
                </div>
                <div className="flex items-center gap-2 mt-auto">
                  <span className="heading text-lg" style={{ color: INK }}>{g.group}</span>
                  <ArrowRight size={15} color={g.color} className="flex-shrink-0" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ OVERVIEW · HEADQUARTERS (ALJF) ══════════ */}
      <section id="overview" className="tj-slide opacity-0" style={{ padding: "110px 24px", background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <SH n="01" title="Overview" accent="" color={TAAJEER} />

          {/* Group card */}
          <div className="rounded-[24px] p-8 md:p-10 mb-4" style={{ background: "#fff", border: `1px solid ${RULE}`, borderTop: `4px solid ${TAAJEER}` }}>
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex items-center gap-4 flex-shrink-0">
                <span className="h-16 px-5 rounded-2xl flex items-center justify-center" style={{ background: `${TAAJEER}0A`, border: `1px solid ${RULE}` }}>
                  <img src="/taajeer/logos/taajeer.png" alt="Taajeer Group" style={{ height: 30, maxWidth: 120, objectFit: "contain" }} />
                </span>
                <div>
                  <p className="text-[10px] font-bold tracking-[1px]" style={{ color: TAAJEER }}>SHARI&apos;AH-COMPLIANT LEASING · EST. 1997</p>
                  <h3 className="heading text-2xl md:text-[28px]" style={{ color: INK }}>Taajeer Group</h3>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-[15px] leading-relaxed" style={{ color: BODY }}>
                  Taajeer was established in <strong style={{ color: INK }}>1997</strong> as a limited-liability company to offer leasing solutions in compliance with Islamic Shari&apos;ah — the <strong style={{ color: INK }}>first company</strong> to successfully bring this service to the local market, later becoming a closed joint-stock company. Although competition in the sector intensified, the Leasing Group has over time become <strong style={{ color: INK }}>one of the largest specialized leasing companies</strong> in Saudi Arabia. Among the pioneers of the Saudi leasing market, it rose to a prestigious position and built a long-standing foundation in a short time.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {["Established 1997", "Shari'ah-compliant", "Closed joint-stock", "Pioneer · KSA leasing"].map((t) => (
                    <span key={t} className="text-[11px] font-bold px-3 py-1.5 rounded-full" style={{ background: `${TAAJEER}0F`, color: TAAJEER }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 tj-stagger mt-8">
            {[
              { logo: BRANDS.bestune.logo, accent: BESTUNE, tag: "Bestune", t: "Families cross-shopping SUVs & sedans", d: "Buyers weighing the Creta and Camry who want a trusted, well-warrantied alternative." },
              { logo: BRANDS.b212.logo, accent: B212, tag: "212", t: "Adventure & identity-driven enthusiasts", d: "Off-road and heritage seekers who buy a 4×4 as a statement, not just transport." },
              { logo: BRANDS.souq.logo, accent: SOUQ, tag: "Motor Souq", t: "Active, purchase-ready car shoppers", d: "In-market retail buyers ready to convert — served across seven branches." },
            ].map((a) => (
              <div key={a.t} className="tj-item rounded-[20px] p-6 flex flex-col" style={{ background: a.accent }}>
                <span className="h-12 px-4 rounded-xl inline-flex items-center justify-center mb-4 self-start" style={{ background: "#fff" }}>
                  <img src={a.logo} alt={a.tag} style={{ height: 22, maxWidth: 88, objectFit: "contain" }} />
                </span>
                {a.tag && <p className="text-[10px] font-bold mb-1" style={{ color: "rgba(255,255,255,0.7)" }}>{a.tag}</p>}
                <h4 className="heading text-[16px] mb-2 leading-snug" style={{ color: "#fff" }}>{a.t}</h4>
                <p className="text-[13.5px] leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>{a.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PORTFOLIO — same group, three jobs ══════════ */}
      <section id="portfolio" className="tj-slide opacity-0" style={{ padding: "110px 24px", background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <SH n="02" title="Same group." accent="Three distinct roles." sub="The opportunity is to build one coherent automotive portfolio without forcing the same voice across three very different brands. Each brand serves a different audience mindset, plays a different role in the purchase journey, and requires its own content system." />
          <PortfolioTree />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 tj-stagger">
            {games.map(({ b, game, body, foot, img }) => (
              <div key={b.key} className="tj-item rounded-[22px] overflow-hidden flex flex-col" style={{ background: "#fff", border: `1px solid ${RULE}` }}>
                {/* hero image band — breaks the typography */}
                <div style={{ height: 168, position: "relative", overflow: "hidden" }}>
                  <img src={img} alt={`${b.name} — ${game}`} className="w-full h-full" style={{ objectFit: "cover", objectPosition: "center" }} />
                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${b.accent}00 55%, ${b.accent}22 100%)` }} />
                  <div style={{ position: "absolute", left: 14, top: 14, background: "rgba(255,255,255,0.92)", borderRadius: 8, padding: "5px 10px", display: "flex", alignItems: "center", gap: 7 }}>
                    <img src={b.logo} alt={b.name} style={{ height: b.key === "b212" ? 15 : 17, maxWidth: 78, objectFit: "contain" }} />
                  </div>
                </div>
                <div className="px-6 pt-5 pb-5" style={{ borderTop: `4px solid ${b.accent}` }}>
                  <div className="mb-4">
                    <span className="text-[11px] font-bold" style={{ color: b.accent }}>{b.handle}</span>
                  </div>
                  <h3 className="heading text-xl mb-3" style={{ color: INK }}>{game}</h3>
                  <p className="text-[13.5px] leading-relaxed" style={{ color: BODY }}>{body}</p>
                </div>
                <div className="mt-auto px-6 py-3.5 text-[11px] font-bold" style={{ background: b.tint, color: b.accent }}>{foot}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ RESEARCH OVERVIEW ══════════ */}
      <section id="research" className="tj-slide opacity-0" style={{ padding: "110px 24px", background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <SH n="03" title="Research" accent="Overview" color={EMOTION} sub="Our research evaluates each brand through three focused areas." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 tj-stagger">
            {[
              { icon: Telescope, t: "Brand Analysis", d: "A review of the brand's current social presence, content, tone of voice and audience engagement.", c: BESTUNE },
              { icon: Swords, t: "Competitor Analysis", d: "An assessment of direct competitors serving similar customer needs, vehicle categories or purchase journeys.", c: B212 },
              { icon: Trophy, t: "Benchmark Analysis", d: "A review of selected local and global brands to identify relevant best practices in content, storytelling and customer experience.", c: SOUQ },
            ].map(({ icon: Ic, t, d, c }, i) => (
              <div key={t} className="tj-item rounded-[22px] overflow-hidden flex flex-col" style={{ background: "#fff", border: `1px solid ${RULE}` }}>
                <div className="px-7 pt-7 pb-6 flex flex-col" style={{ borderTop: `4px solid ${c}` }}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-11 h-11 rounded-[12px] flex items-center justify-center flex-shrink-0" style={{ background: `${c}12` }}>
                      <Ic size={20} color={c} />
                    </span>
                    <span className="text-[12px] font-bold px-2.5 py-1 rounded-full" style={{ background: `${c}12`, color: c }}>0{i + 1}</span>
                  </div>
                  <h3 className="heading text-xl mb-3" style={{ color: INK }}>{t}</h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: BODY }}>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ BESTUNE — CURRENT SOCIAL AUDIT ══════════ */}
      <section id="bestune-audit" className="tj-slide opacity-0" style={{ padding: "110px 24px", background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          {/* brand header */}
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-[11px] font-bold tracking-[0.18em] mb-4" style={{ color: BESTUNE, opacity: 0.6 }}>CURRENT SOCIAL AUDIT</span>
            <img src={BRANDS.bestune.logo} alt="Bestune" style={{ height: 34, maxWidth: 200, objectFit: "contain" }} />
            <p className="text-sm md:text-[15px] max-w-2xl mx-auto mt-5" style={{ color: BODY }}>A current-state review of Bestune's accounts, content patterns and the immediate opportunity.</p>
          </div>

          {/* audit sheet: fields */}
          <div className="tj-stagger">
            {/* audit fields */}
            <div className="tj-item rounded-[22px] p-6 md:p-8" style={{ background: "#fff", border: `1px solid ${RULE}` }}>
              {/* languages + tone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 pb-6" style={{ borderBottom: `1px solid ${RULE}` }}>
                <div>
                  <p className="text-[11px] font-bold mb-1.5" style={{ color: BESTUNE }}>LANGUAGES</p>
                  <p className="text-[14px] font-semibold" style={{ color: INK }}>{bestuneDetail.languages}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold mb-1.5" style={{ color: BESTUNE }}>TONE OF VOICE</p>
                  <p className="text-[14px] font-semibold" style={{ color: INK }}>{bestuneDetail.tone}</p>
                </div>
              </div>
              {/* channels */}
              <div className="py-6" style={{ borderBottom: `1px solid ${RULE}` }}>
                <p className="text-[11px] font-bold mb-4" style={{ color: BESTUNE }}>CHANNELS</p>
                {/* primary — one card per channel */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {bestuneDetail.primary.map((c) => (
                    <div key={c.label} className="rounded-[12px] px-4 py-3 flex items-center gap-3" style={{ background: BRANDS.bestune.tint, border: `1px solid ${RULE}` }}>
                      <PIcon p={c.p} size={18} />
                      <div className="flex flex-col leading-tight">
                        <span className="text-[15px] font-bold" style={{ color: INK }}>{c.v}</span>
                        <span className="text-[10.5px] font-semibold" style={{ color: MUTED }}>{c.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {/* secondary + not active */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 pt-5" style={{ borderTop: `1px solid ${RULE}` }}>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-[10.5px] font-bold" style={{ color: MUTED }}>SECONDARY</span>
                    <span className="text-[12.5px] font-semibold flex items-center gap-1.5" style={{ color: BODY }}><Globe size={14} color={STEEL} /> {bestuneDetail.secondary}</span>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap sm:justify-end">
                    <span className="text-[10.5px] font-bold" style={{ color: MUTED }}>NOT ACTIVE</span>
                    {bestuneDetail.missing.map((m) => (
                      <span key={m} className="flex items-center gap-1.5 text-[12.5px] font-semibold" style={{ color: BODY }}>
                        <PIcon p={m.toLowerCase() as PKey} size={15} /> {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {/* type + format */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 pt-6">
                <div>
                  <p className="text-[11px] font-bold mb-3" style={{ color: BESTUNE }}>TYPE OF CONTENT</p>
                  <ul className="flex flex-col gap-2">
                    {bestuneDetail.contentTypes.map((t) => (
                      <li key={t} className="text-[13.5px] flex items-start gap-2" style={{ color: BODY }}>
                        <CircleDot size={13} color={BESTUNE} className="flex-shrink-0 mt-1" />{t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] font-bold mb-3" style={{ color: BESTUNE }}>CONTENT FORMAT</p>
                  <ul className="flex flex-col gap-2">
                    {bestuneDetail.formats.map((t) => (
                      <li key={t} className="text-[13.5px] flex items-start gap-2" style={{ color: BODY }}>
                        <CircleDot size={13} color={BESTUNE} className="flex-shrink-0 mt-1" />{t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* insights */}
          <div className="tj-item mt-6 rounded-[22px] p-6 md:p-8" style={{ background: "#fff", border: `1px solid ${RULE}` }}>
            <p className="text-[11px] font-bold mb-4" style={{ color: BESTUNE }}>INSIGHTS</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5">
              {bestuneDetail.insights.map((t, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: BESTUNE }} />
                  <p className="text-[13.5px] leading-relaxed" style={{ color: BODY }}>{t}</p>
                </div>
              ))}
            </div>
          </div>

          {/* content overview — full posts tagged by category, click to open carousel */}
          <div className="tj-item mt-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <p className="text-[11px] font-bold" style={{ color: BESTUNE }}>CONTENT OVERVIEW</p>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold" style={{ color: MUTED }}>LIMITED / NOT OBSERVED</span>
                {bestuneDetail.missingContent.map((m) => (
                  <span key={m} className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${NEG}12`, color: NEG }}>{m}</span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {bestuneDetail.posts.map((post, i) => (
                <div key={post.src} className="flex flex-col gap-2.5">
                  <button
                    onClick={() => openLB(bestuneDetail.posts.map((p) => p.src), i)}
                    className="group rounded-[14px] overflow-hidden cursor-pointer border-0 p-0"
                    style={{ background: BRANDS.bestune.tint, aspectRatio: "3 / 4", border: `1px solid ${RULE}` }}
                    aria-label={`Open Bestune post ${i + 1}`}
                  >
                    <img src={post.src} alt={`Bestune — ${post.cat}`} className="w-full h-full transition-transform duration-300 group-hover:scale-[1.04]" style={{ objectFit: "cover" }} />
                  </button>
                  <span className="text-[11px] font-bold leading-snug text-center" style={{ color: BESTUNE }}>{post.cat}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ══════════ BESTUNE — COMPETITOR & BENCHMARK ANALYSIS ══════════ */}
      <section id="bestune-arena" className="tj-slide opacity-0" style={{ padding: "110px 24px", background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          {/* brand header */}
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-[11px] font-bold tracking-[0.18em] mb-4" style={{ color: BESTUNE, opacity: 0.6 }}>COMPETITOR &amp; BENCHMARK ANALYSIS</span>
            <img src={BRANDS.bestune.logo} alt="Bestune" style={{ height: 34, maxWidth: 200, objectFit: "contain" }} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 tj-stagger">
            {/* COMPETITORS */}
            <div className="tj-item lg:col-span-3 rounded-[22px] p-6 md:p-8" style={{ background: "#fff", border: `1px solid ${RULE}` }}>
              <p className="text-[11px] font-bold mb-5" style={{ color: BESTUNE }}>COMPETITORS</p>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-7">
                {bestuneDetail.competitors.map((c) => (
                  <div key={c.name} className="rounded-[14px] flex items-center justify-center p-3" style={{ background: BRANDS.bestune.tint, border: `1px solid ${RULE}`, aspectRatio: "1" }}>
                    <img src={c.logo} alt={c.name} style={{ maxHeight: 42, maxWidth: "82%", objectFit: "contain" }} />
                  </div>
                ))}
              </div>
              <p className="text-[13.5px] leading-relaxed mb-3" style={{ color: BODY }}>The closest competition to Bestune across:</p>
              <div className="flex flex-wrap gap-2">
                {bestuneDetail.competitorBasis.map((t) => (
                  <span key={t} className="text-[12px] font-semibold px-3 py-1.5 rounded-full" style={{ background: `${BESTUNE}0D`, color: INK, border: `1px solid ${RULE}` }}>{t}</span>
                ))}
              </div>
            </div>

            {/* CONTENT BENCHMARK */}
            <div className="tj-item lg:col-span-2 rounded-[22px] p-6 md:p-8 flex flex-col" style={{ background: BRANDS.bestune.tint, border: `1px solid ${RULE}` }}>
              <p className="text-[11px] font-bold mb-5" style={{ color: BESTUNE }}>CONTENT BENCHMARK</p>
              <div className="rounded-[16px] bg-white flex items-center justify-center p-6 mb-4" style={{ border: `1px solid ${RULE}`, minHeight: 110 }}>
                <img src={bestuneDetail.benchmark.logo} alt={bestuneDetail.benchmark.name} style={{ maxHeight: 54, maxWidth: "70%", objectFit: "contain" }} />
              </div>
              <p className="text-[14px] font-semibold mb-5" style={{ color: INK }}>{bestuneDetail.benchmark.line}</p>
              <p className="text-[11px] font-bold mb-3" style={{ color: BESTUNE }}>WHAT WE STUDY</p>
              <div className="flex flex-col gap-2.5">
                {bestuneDetail.benchmarkStudy.map((t) => (
                  <div key={t} className="flex items-start gap-2.5">
                    <CircleDot size={13} color={BESTUNE} className="flex-shrink-0 mt-1" />
                    <p className="text-[13px] leading-relaxed" style={{ color: BODY }}>{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ BESTUNE — COMPETITORS · SOCIAL MEDIA OVERVIEW ══════════ */}
      <section id="bestune-competitors" className="tj-slide opacity-0" style={{ padding: "110px 24px", background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-[11px] font-bold tracking-[0.18em] mb-4" style={{ color: BESTUNE, opacity: 0.6 }}>COMPETITORS · SOCIAL MEDIA OVERVIEW</span>
            <img src={BRANDS.bestune.logo} alt="Bestune" style={{ height: 30, maxWidth: 180, objectFit: "contain" }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 tj-stagger">
            {bestuneCompetitors.map((c) => (
              <div key={c.name} className="tj-item rounded-[20px] p-6 flex flex-col" style={{ background: "#fff", border: `1px solid ${RULE}` }}>
                {/* header */}
                <div className="flex items-center gap-3 pb-4 mb-4" style={{ borderBottom: `1px solid ${RULE}` }}>
                  <span className="w-12 h-12 rounded-[12px] flex items-center justify-center flex-shrink-0" style={{ background: BRANDS.bestune.tint, border: `1px solid ${RULE}` }}>
                    <img src={c.logo} alt={c.name} style={{ maxHeight: 28, maxWidth: 34, objectFit: "contain" }} />
                  </span>
                  <h3 className="heading text-lg" style={{ color: INK }}>{c.name}</h3>
                </div>

                {/* languages */}
                <div className="mb-3.5">
                  <p className="text-[10.5px] font-bold mb-1.5" style={{ color: BESTUNE }}>LANGUAGES</p>
                  {c.languages ? <p className="text-[12.5px] leading-relaxed" style={{ color: BODY }}>{c.languages}</p> : <div style={{ borderBottom: `1px dashed ${RULE}`, height: 14 }} />}
                </div>
                {/* tone of voice */}
                <div className="mb-4">
                  <p className="text-[10.5px] font-bold mb-1.5" style={{ color: BESTUNE }}>TONE OF VOICE</p>
                  {c.tone ? <p className="text-[12.5px] leading-relaxed" style={{ color: BODY }}>{c.tone}</p> : <div style={{ borderBottom: `1px dashed ${RULE}`, height: 14 }} />}
                </div>

                {/* channels — filled */}
                <div className="mb-4 pt-4" style={{ borderTop: `1px solid ${RULE}` }}>
                  <p className="text-[10.5px] font-bold mb-2.5" style={{ color: BESTUNE }}>CHANNELS</p>
                  <div className="grid grid-cols-3 gap-x-3 gap-y-2.5">
                    {c.channels.map((ch) => (
                      <div key={ch.p} className="flex items-center gap-1.5">
                        <PIcon p={ch.p} size={14} />
                        <span className="text-[12px] font-bold" style={{ color: INK }}>{ch.v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* communication focus */}
                <div className="mb-4 pt-4" style={{ borderTop: `1px solid ${RULE}` }}>
                  <p className="text-[10.5px] font-bold mb-1.5" style={{ color: BESTUNE }}>COMMUNICATION FOCUS</p>
                  {c.focus ? <p className="text-[12.5px] leading-relaxed" style={{ color: BODY }}>{c.focus}</p> : <div style={{ borderBottom: `1px dashed ${RULE}`, height: 14 }} />}
                </div>
                {/* type of content */}
                <div className="mb-4">
                  <p className="text-[10.5px] font-bold mb-2" style={{ color: BESTUNE }}>TYPE OF CONTENT</p>
                  {c.contentTypes?.length ? (
                    <ul className="flex flex-col gap-1.5">
                      {c.contentTypes.map((t) => (
                        <li key={t} className="text-[12px] leading-snug flex items-start gap-2" style={{ color: BODY }}>
                          <span className="w-1 h-1 rounded-full flex-shrink-0 mt-[7px]" style={{ background: BESTUNE }} />{t}
                        </li>
                      ))}
                    </ul>
                  ) : <div style={{ borderBottom: `1px dashed ${RULE}`, height: 14 }} />}
                </div>
                {/* key findings */}
                <div>
                  <p className="text-[10.5px] font-bold mb-2" style={{ color: BESTUNE }}>KEY FINDINGS</p>
                  {c.keyFindings?.length ? (
                    <ul className="flex flex-col gap-2">
                      {c.keyFindings.map((t, i) => (
                        <li key={i} className="text-[12px] leading-snug flex items-start gap-2" style={{ color: BODY }}>
                          <span className="w-4 h-4 rounded-[5px] flex items-center justify-center flex-shrink-0 mt-0.5 text-[9px] font-bold" style={{ background: BRANDS.bestune.tint, color: BESTUNE }}>{i + 1}</span>{t}
                        </li>
                      ))}
                    </ul>
                  ) : <div style={{ borderBottom: `1px dashed ${RULE}`, height: 14 }} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CHANGAN — CONTENT EXAMPLES ══════════ */}
      <section id="changan-examples" className="tj-slide opacity-0" style={{ padding: "110px 24px", background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-11 h-11 rounded-[12px] flex items-center justify-center flex-shrink-0" style={{ background: BRANDS.bestune.tint, border: `1px solid ${RULE}` }}>
              <img src="/taajeer/logos/changan.png" alt="Changan" style={{ maxHeight: 24, maxWidth: 30, objectFit: "contain" }} />
            </span>
            <div>
              <p className="text-[11px] font-bold tracking-[0.16em]" style={{ color: BESTUNE, opacity: 0.6 }}>CONTENT EXAMPLES</p>
              <h2 className="heading text-2xl md:text-3xl" style={{ color: INK }}>Changan</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 tj-stagger">
            {/* takeaways */}
            <div className="tj-item lg:col-span-2">
              <p className="text-[11px] font-bold mb-5" style={{ color: BESTUNE }}>KEY TAKEAWAYS</p>
              <div className="flex flex-col gap-4">
                {changanExamples.takeaways.map((t, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 text-[11px] font-bold" style={{ background: BRANDS.bestune.tint, color: BESTUNE }}>{i + 1}</span>
                    <p className="text-[13.5px] leading-relaxed" style={{ color: BODY }}>{t}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* image collage — banner + row of four */}
            <div className="tj-item lg:col-span-3 flex flex-col gap-4 lg:-mt-14">
              {/* launch banner */}
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-bold text-center" style={{ color: BESTUNE }}>{changanExamples.launch.label}</span>
                <button onClick={() => openLB(changanExAll, 0)} className="group rounded-[14px] overflow-hidden cursor-pointer border-0 p-0" style={{ background: BRANDS.bestune.tint, aspectRatio: "16 / 9", border: `1px solid ${RULE}` }} aria-label={changanExamples.launch.label}>
                  <img src={changanExamples.launch.src} alt={changanExamples.launch.label} className="w-full h-full transition-transform duration-300 group-hover:scale-[1.03]" style={{ objectFit: "cover", objectPosition: "center 34%" }} />
                </button>
              </div>
              {/* four labelled tiles in one row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {changanExamples.grid.map((g, i) => (
                  <div key={g.src} className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold text-center leading-snug" style={{ color: BESTUNE, minHeight: 26 }}>{g.label}</span>
                    <button onClick={() => openLB(changanExAll, i + 1)} className="group rounded-[12px] overflow-hidden cursor-pointer border-0 p-0" style={{ background: BRANDS.bestune.tint, aspectRatio: "3 / 4", border: `1px solid ${RULE}` }} aria-label={g.label}>
                      <img src={g.src} alt={g.label} className="w-full h-full transition-transform duration-300 group-hover:scale-[1.04]" style={{ objectFit: "cover" }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ MG — CONTENT EXAMPLES ══════════ */}
      <section id="mg-examples" className="tj-slide opacity-0" style={{ padding: "110px 24px", background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-11 h-11 rounded-[12px] flex items-center justify-center flex-shrink-0" style={{ background: BRANDS.bestune.tint, border: `1px solid ${RULE}` }}>
              <img src="/taajeer/logos/mg.png" alt="MG" style={{ maxHeight: 26, maxWidth: 32, objectFit: "contain" }} />
            </span>
            <div>
              <p className="text-[11px] font-bold tracking-[0.16em]" style={{ color: BESTUNE, opacity: 0.6 }}>CONTENT EXAMPLES</p>
              <h2 className="heading text-2xl md:text-3xl" style={{ color: INK }}>MG</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 tj-stagger">
            {/* takeaways */}
            <div className="tj-item lg:col-span-2">
              <p className="text-[11px] font-bold mb-5" style={{ color: BESTUNE }}>KEY TAKEAWAYS</p>
              <div className="flex flex-col gap-4">
                {mgExamples.takeaways.map((t, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 text-[11px] font-bold" style={{ background: BRANDS.bestune.tint, color: BESTUNE }}>{i + 1}</span>
                    <p className="text-[13.5px] leading-relaxed" style={{ color: BODY }}>{t}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* image collage — banner + row of four */}
            <div className="tj-item lg:col-span-3 flex flex-col gap-4 lg:-mt-14">
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-bold text-center" style={{ color: BESTUNE }}>{mgExamples.launch.label}</span>
                <button onClick={() => openLB(mgExAll, 0)} className="group rounded-[14px] overflow-hidden cursor-pointer border-0 p-0" style={{ background: BRANDS.bestune.tint, aspectRatio: "16 / 9", border: `1px solid ${RULE}` }} aria-label={mgExamples.launch.label}>
                  <img src={mgExamples.launch.src} alt={mgExamples.launch.label} className="w-full h-full transition-transform duration-300 group-hover:scale-[1.03]" style={{ objectFit: "cover", objectPosition: "center 40%" }} />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {mgExamples.grid.map((g, i) => (
                  <div key={g.src} className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold text-center leading-snug" style={{ color: BESTUNE, minHeight: 26 }}>{g.label}</span>
                    <button onClick={() => openLB(mgExAll, i + 1)} className="group rounded-[12px] overflow-hidden cursor-pointer border-0 p-0" style={{ background: BRANDS.bestune.tint, aspectRatio: "3 / 4", border: `1px solid ${RULE}` }} aria-label={g.label}>
                      <img src={g.src} alt={g.label} className="w-full h-full transition-transform duration-300 group-hover:scale-[1.04]" style={{ objectFit: "cover" }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ BYD — BENCHMARK ANALYSIS ══════════ */}
      <section id="byd-benchmark" className="tj-slide opacity-0" style={{ padding: "110px 24px", background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-10">
            <span className="text-[11px] font-bold tracking-[0.18em] mb-4" style={{ color: BESTUNE, opacity: 0.6 }}>BENCHMARK ANALYSIS</span>
            <span className="h-16 px-6 rounded-2xl inline-flex items-center justify-center" style={{ background: "#fff", border: `1px solid ${RULE}` }}>
              <img src="/taajeer/logos/byd.png" alt="BYD" style={{ maxHeight: 40, maxWidth: 130, objectFit: "contain" }} />
            </span>
            <p className="text-sm md:text-[15px] font-semibold mt-4" style={{ color: INK }}>Technology, lifestyle and localized product storytelling</p>
          </div>

          <div className="tj-item rounded-[22px] p-6 md:p-9" style={{ background: "#fff", border: `1px solid ${RULE}` }}>
            {/* languages + tone + channels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-6 pb-7" style={{ borderBottom: `1px solid ${RULE}` }}>
              <div>
                <p className="text-[11px] font-bold mb-2" style={{ color: BESTUNE }}>LANGUAGES</p>
                {bydBenchmark.languages ? <p className="text-[13.5px]" style={{ color: BODY }}>{bydBenchmark.languages}</p> : <div style={{ borderBottom: `1px dashed ${RULE}`, height: 16 }} />}
              </div>
              <div>
                <p className="text-[11px] font-bold mb-2" style={{ color: BESTUNE }}>TONE OF VOICE</p>
                {bydBenchmark.tone ? <p className="text-[13.5px]" style={{ color: BODY }}>{bydBenchmark.tone}</p> : <div style={{ borderBottom: `1px dashed ${RULE}`, height: 16 }} />}
              </div>
              <div>
                <p className="text-[11px] font-bold mb-3" style={{ color: BESTUNE }}>CHANNELS</p>
                <div className="grid grid-cols-3 gap-x-3 gap-y-2.5">
                  {bydBenchmark.channels.map((ch) => (
                    <div key={ch.p} className="flex items-center gap-1.5">
                      <PIcon p={ch.p} size={15} />
                      <span className="text-[12.5px] font-bold" style={{ color: INK }}>{ch.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* communication focus */}
            <div className="py-7" style={{ borderBottom: `1px solid ${RULE}` }}>
              <p className="text-[11px] font-bold mb-2" style={{ color: BESTUNE }}>COMMUNICATION FOCUS</p>
              <p className="text-[14px] leading-relaxed" style={{ color: BODY }}>{bydBenchmark.focus}</p>
            </div>

            {/* type of content + content formats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 py-7" style={{ borderBottom: `1px solid ${RULE}` }}>
              <div>
                <p className="text-[11px] font-bold mb-3" style={{ color: BESTUNE }}>TYPE OF CONTENT</p>
                <ul className="flex flex-col gap-2">{bydBenchmark.contentTypes?.map((t) => <li key={t} className="text-[13px] leading-snug flex items-start gap-2" style={{ color: BODY }}><span className="w-1 h-1 rounded-full flex-shrink-0 mt-[7px]" style={{ background: BESTUNE }} />{t}</li>)}</ul>
              </div>
              <div>
                <p className="text-[11px] font-bold mb-3" style={{ color: BESTUNE }}>CONTENT FORMATS</p>
                <ul className="flex flex-col gap-2">{bydBenchmark.contentFormats?.map((t) => <li key={t} className="text-[13px] leading-snug flex items-start gap-2" style={{ color: BODY }}><span className="w-1 h-1 rounded-full flex-shrink-0 mt-[7px]" style={{ background: BESTUNE }} />{t}</li>)}</ul>
              </div>
            </div>

            {/* key findings */}
            <div className="pt-7">
              <p className="text-[11px] font-bold mb-4" style={{ color: BESTUNE }}>KEY FINDINGS</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3.5">
                {bydBenchmark.keyFindings?.map((t, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 text-[11px] font-bold" style={{ background: BRANDS.bestune.tint, color: BESTUNE }}>{i + 1}</span>
                    <p className="text-[13px] leading-relaxed" style={{ color: BODY }}>{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ BYD — CONTENT EXAMPLES ══════════ */}
      <section id="byd-examples" className="tj-slide opacity-0" style={{ padding: "110px 24px", background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-11 h-11 rounded-[12px] flex items-center justify-center flex-shrink-0" style={{ background: BRANDS.bestune.tint, border: `1px solid ${RULE}` }}>
              <img src="/taajeer/logos/byd.png" alt="BYD" style={{ maxHeight: 22, maxWidth: 32, objectFit: "contain" }} />
            </span>
            <div>
              <p className="text-[11px] font-bold tracking-[0.16em]" style={{ color: BESTUNE, opacity: 0.6 }}>CONTENT EXAMPLES · BENCHMARK</p>
              <h2 className="heading text-2xl md:text-3xl" style={{ color: INK }}>BYD</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 tj-stagger">
            {/* takeaways + main takeaway */}
            <div className="tj-item lg:col-span-2 flex flex-col">
              <p className="text-[11px] font-bold mb-5" style={{ color: BESTUNE }}>KEY TAKEAWAYS</p>
              <div className="flex flex-col gap-4">
                {bydExamples.takeaways.map((t, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 text-[11px] font-bold" style={{ background: BRANDS.bestune.tint, color: BESTUNE }}>{i + 1}</span>
                    <p className="text-[13.5px] leading-relaxed" style={{ color: BODY }}>{t}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-[16px] px-6 py-5" style={{ background: BESTUNE }}>
                <p className="text-[10.5px] font-bold tracking-wide mb-1.5" style={{ color: "rgba(255,255,255,0.65)" }}>MAIN TAKEAWAY</p>
                <p className="text-[14px] leading-relaxed font-semibold" style={{ color: "#fff" }}>{bydExamples.mainTakeaway}</p>
              </div>
            </div>

            {/* image collage — banner + 2 rows of three */}
            <div className="tj-item lg:col-span-3 flex flex-col gap-4 lg:-mt-14">
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-bold text-center" style={{ color: BESTUNE }}>{bydExamples.launch.label}</span>
                <button onClick={() => openLB(bydExAll, 0)} className="group rounded-[14px] overflow-hidden cursor-pointer border-0 p-0" style={{ background: BRANDS.bestune.tint, aspectRatio: "16 / 9", border: `1px solid ${RULE}` }} aria-label={bydExamples.launch.label}>
                  <img src={bydExamples.launch.src} alt={bydExamples.launch.label} className="w-full h-full transition-transform duration-300 group-hover:scale-[1.03]" style={{ objectFit: "cover", objectPosition: "center 40%" }} />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {bydExamples.grid.map((g, i) => (
                  <div key={g.src} className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold text-center leading-snug" style={{ color: BESTUNE, minHeight: 26 }}>{g.label}</span>
                    <button onClick={() => openLB(bydExAll, i + 1)} className="group rounded-[12px] overflow-hidden cursor-pointer border-0 p-0" style={{ background: BRANDS.bestune.tint, aspectRatio: "3 / 4", border: `1px solid ${RULE}` }} aria-label={g.label}>
                      <img src={g.src} alt={g.label} className="w-full h-full transition-transform duration-300 group-hover:scale-[1.04]" style={{ objectFit: "cover" }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ APPROACH & METHODOLOGY · OBJECTIVES ══════════ */}
      <section id="objectives" className="tj-slide opacity-0" style={{ padding: "110px 24px", background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-3"><p className="text-[11px] font-bold tracking-[0.16em]" style={{ color: EMOTION, opacity: 0.6 }}>APPROACH &amp; METHODOLOGY</p></div>
          <SH n="" title="Objectives" accent="" color={EMOTION} />

          {/* communication objectives */}
          <div className="mb-14 tj-item">
            <h3 className="heading text-xl mb-7" style={{ color: EMOTION }}>Communication Objectives</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {commObjectives.map((o, i) => (
                <div key={o.t} className="rounded-[16px] p-6 flex flex-col" style={{ background: WASH, border: `1px solid ${RULE}`, borderTop: `3px solid ${EMOTION}` }}>
                  <span className="text-[13px] font-bold mb-3" style={{ color: EMOTION }}>0{i + 1}</span>
                  <h4 className="heading text-[15px] mb-2.5 leading-snug" style={{ color: INK }}>{o.t}</h4>
                  <p className="text-[13px] leading-relaxed" style={{ color: BODY }}>{o.d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* social media objectives */}
          <div className="tj-item">
            <h3 className="heading text-xl mb-7" style={{ color: EMOTION }}>Social Media Objectives</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {smObjectives.map((o) => (
                <div key={o} className="rounded-[12px] px-6 py-5 flex items-center justify-center text-center" style={{ border: `1.5px dashed ${EMOTION}66`, background: `${EMOTION}06`, flex: "1 1 300px", maxWidth: 360 }}>
                  <span className="text-[14.5px] font-bold" style={{ color: INK }}>{o}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ APPROACH & METHODOLOGY · TARGET AUDIENCE ══════════ */}
      <section id="target-audience" className="tj-slide opacity-0" style={{ padding: "110px 24px", background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-3">
            <p className="text-[11px] font-bold tracking-[0.16em]" style={{ color: EMOTION, opacity: 0.6 }}>APPROACH &amp; METHODOLOGY</p>
          </div>
          <SH n="" title="Target" accent="Audience" color={EMOTION} sub="General segmentation" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto tj-stagger">
            {[
              { title: "B2C", accent: EMOTION, data: targetAudience.b2c },
              { title: "B2B", accent: TAAJEER, data: targetAudience.b2b },
            ].map(({ title, accent, data }) => (
              <div key={title} className="tj-item">
                <div className="rounded-[12px] py-4 text-center mb-4" style={{ background: accent }}>
                  <span className="heading text-lg font-bold" style={{ color: "#fff" }}>{title}</span>
                </div>
                {/* primary */}
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                  <span className="text-[11px] font-bold tracking-wide" style={{ color: accent }}>PRIMARY</span>
                </div>
                <div className="flex flex-col gap-2.5 mb-5">
                  {data.primary.map((seg) => (
                    <div key={seg} className="rounded-[10px] py-3.5 px-4 text-center" style={{ background: `${accent}0D`, border: `1px solid ${accent}33`, borderLeft: `3px solid ${accent}` }}>
                      <span className="text-[14px] font-bold" style={{ color: INK }}>{seg}</span>
                    </div>
                  ))}
                </div>
                {/* secondary */}
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: MUTED }} />
                  <span className="text-[11px] font-bold tracking-wide" style={{ color: MUTED }}>SECONDARY</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {data.secondary.map((seg) => (
                    <div key={seg} className="rounded-[10px] py-3.5 px-4 text-center" style={{ background: WASH, border: `1px solid ${RULE}` }}>
                      <span className="text-[13.5px] font-semibold" style={{ color: BODY }}>{seg}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TARGET AUDIENCE · B2C PERSONAS ══════════ */}
      <section id="target-b2c" className="tj-slide opacity-0" style={{ padding: "110px 24px", background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-3"><p className="text-[11px] font-bold tracking-[0.16em]" style={{ color: EMOTION, opacity: 0.6 }}>APPROACH &amp; METHODOLOGY</p></div>
          <SH n="" title="Target Audience" accent="· B2C" color={EMOTION} sub="Primary consumer segments across the portfolio" />

          <div className="overflow-x-auto tj-item">
            <div style={{ minWidth: 880, display: "grid", gridTemplateColumns: "118px repeat(4, minmax(0,1fr))" }}>
              {/* header bar */}
              <div />
              <div style={{ gridColumn: "2 / span 4", background: EMOTION, borderRadius: 8, padding: "9px", textAlign: "center", marginBottom: 12 }}>
                <span className="heading font-bold" style={{ color: "#fff", fontSize: 15 }}>B2C</span>
              </div>

              {/* segments: photo + name */}
              <div style={{ padding: "8px 10px 8px 0" }} />
              {b2cPersonas.map((p) => (
                <div key={p.bar} style={{ padding: "0 6px 10px", borderLeft: `1px dashed ${RULE}` }}>
                  <div style={{ aspectRatio: "3 / 2", background: BRANDS.bestune.tint, borderRadius: "10px 10px 0 0", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    {p.photo ? <img src={p.photo} alt={p.bar} className="w-full h-full" style={{ objectFit: "cover" }} /> : <Users size={26} color={STEEL} style={{ opacity: 0.5 }} />}
                  </div>
                  <div style={{ background: "#E9ECEF", padding: "9px 6px", textAlign: "center" }}>
                    <span className="font-bold" style={{ color: INK, fontSize: 11.5, lineHeight: 1.2, display: "block" }}>{p.bar}</span>
                  </div>
                </div>
              ))}

              {/* description */}
              <div style={{ padding: "12px 10px 12px 0", borderTop: `1px solid ${RULE}` }} />
              {b2cPersonas.map((p) => (
                <div key={p.bar} style={{ padding: "12px 8px", borderLeft: `1px dashed ${RULE}`, borderTop: `1px solid ${RULE}` }}>
                  <p style={{ color: BODY, fontSize: 12, lineHeight: 1.45 }}>{p.description}</p>
                </div>
              ))}

              {/* key demographics */}
              <div style={{ padding: "12px 10px 12px 0", borderTop: `1px solid ${RULE}` }}><span className="font-bold" style={{ color: EMOTION, fontSize: 11 }}>Key Demographics</span></div>
              {b2cPersonas.map((p) => (
                <div key={p.bar} style={{ padding: "12px 8px", borderLeft: `1px dashed ${RULE}`, borderTop: `1px solid ${RULE}` }}>
                  <div className="flex flex-col gap-1">
                    {p.demographics.map(([k, v]) => (
                      <p key={k} style={{ color: BODY, fontSize: 11.5, lineHeight: 1.35 }}><b style={{ color: INK }}>{k}:</b> {v}</p>
                    ))}
                  </div>
                </div>
              ))}

              {/* interest */}
              <div style={{ padding: "12px 10px 12px 0", borderTop: `1px solid ${RULE}` }}><span className="font-bold" style={{ color: EMOTION, fontSize: 11 }}>Interest</span></div>
              {b2cPersonas.map((p) => (
                <div key={p.bar} style={{ padding: "12px 8px", borderLeft: `1px dashed ${RULE}`, borderTop: `1px solid ${RULE}` }}>
                  <p style={{ color: BODY, fontSize: 12, lineHeight: 1.45 }}>{p.interest}</p>
                </div>
              ))}

              {/* needs */}
              <div style={{ padding: "12px 10px 12px 0", borderTop: `1px solid ${RULE}` }}><span className="font-bold" style={{ color: EMOTION, fontSize: 11 }}>Needs</span></div>
              {b2cPersonas.map((p) => (
                <div key={p.bar} style={{ padding: "12px 8px", borderLeft: `1px dashed ${RULE}`, borderTop: `1px solid ${RULE}` }}>
                  <ul className="flex flex-col gap-1.5">
                    {p.needs.map((n) => (
                      <li key={n} style={{ color: BODY, fontSize: 11.5, lineHeight: 1.35, display: "flex", gap: 6 }}><span style={{ width: 3, height: 3, borderRadius: 999, background: EMOTION, flexShrink: 0, marginTop: 6 }} />{n}</li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* feels */}
              <div style={{ padding: "12px 10px 12px 0", borderTop: `1px solid ${RULE}` }}><span className="font-bold" style={{ color: EMOTION, fontSize: 11 }}>Feels</span></div>
              {b2cPersonas.map((p) => (
                <div key={p.bar} style={{ padding: "12px 8px", borderLeft: `1px dashed ${RULE}`, borderTop: `1px solid ${RULE}` }}>
                  <p style={{ color: BODY, fontSize: 12, lineHeight: 1.45 }}>{p.feels}</p>
                </div>
              ))}

              {/* channels */}
              <div style={{ padding: "14px 10px 14px 0", borderTop: `1px solid ${RULE}` }}><span className="font-bold" style={{ color: EMOTION, fontSize: 11 }}>Channels</span></div>
              {b2cPersonas.map((p) => (
                <div key={p.bar} style={{ padding: "14px 8px", borderLeft: `1px dashed ${RULE}`, borderTop: `1px solid ${RULE}` }}>
                  <div className="flex items-center gap-2 flex-wrap">
                    {p.channels.map((c) => <PIcon key={c} p={c} size={16} />)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ TARGET AUDIENCE · B2B PERSONAS ══════════ */}
      <section id="target-b2b" className="tj-slide opacity-0" style={{ padding: "110px 24px", background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-3"><p className="text-[11px] font-bold tracking-[0.16em]" style={{ color: EMOTION, opacity: 0.6 }}>APPROACH &amp; METHODOLOGY</p></div>
          <SH n="" title="Target Audience" accent="· B2B" color={TAAJEER} sub="Business and institutional segments" />

          <div className="overflow-x-auto tj-item">
            <div style={{ minWidth: 640, display: "grid", gridTemplateColumns: "128px repeat(2, minmax(0,1fr))" }}>
              {/* header bar */}
              <div />
              <div style={{ gridColumn: "2 / span 2", background: TAAJEER, borderRadius: 8, padding: "9px", textAlign: "center", marginBottom: 12 }}>
                <span className="heading font-bold" style={{ color: "#fff", fontSize: 15 }}>B2B</span>
              </div>

              {/* segments: photo + name + sub */}
              <div style={{ padding: "8px 10px 8px 0" }} />
              {b2bPersonas.map((p) => (
                <div key={p.bar} style={{ padding: "0 6px 10px", borderLeft: `1px dashed ${RULE}` }}>
                  <div style={{ aspectRatio: "3 / 1.4", background: BRANDS.souq.tint, borderRadius: "10px 10px 0 0", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    {p.photo ? <img src={p.photo} alt={p.bar} className="w-full h-full" style={{ objectFit: "cover" }} /> : <ClipboardCheck size={26} color={TAAJEER} style={{ opacity: 0.5 }} />}
                  </div>
                  <div style={{ background: "#E9ECEF", padding: "9px 6px", textAlign: "center" }}>
                    <span className="font-bold" style={{ color: INK, fontSize: 12.5, lineHeight: 1.2, display: "block" }}>{p.bar}</span>
                    <span className="font-semibold" style={{ color: TAAJEER, fontSize: 10.5, display: "block", marginTop: 2 }}>{p.sub}</span>
                  </div>
                </div>
              ))}

              {/* who they are */}
              <div style={{ padding: "12px 10px 12px 0", borderTop: `1px solid ${RULE}` }}><span className="font-bold" style={{ color: TAAJEER, fontSize: 11 }}>Who they are</span></div>
              {b2bPersonas.map((p) => (
                <div key={p.bar} style={{ padding: "12px 10px", borderLeft: `1px dashed ${RULE}`, borderTop: `1px solid ${RULE}` }}>
                  <ul className="flex flex-col gap-2">
                    {p.who.map((n) => (
                      <li key={n} style={{ color: BODY, fontSize: 12.5, lineHeight: 1.4, display: "flex", gap: 7 }}><span style={{ width: 3, height: 3, borderRadius: 999, background: TAAJEER, flexShrink: 0, marginTop: 7 }} />{n}</li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* needs & interests */}
              <div style={{ padding: "12px 10px 12px 0", borderTop: `1px solid ${RULE}` }}><span className="font-bold" style={{ color: TAAJEER, fontSize: 11 }}>Needs &amp; Interests</span></div>
              {b2bPersonas.map((p) => (
                <div key={p.bar} style={{ padding: "12px 10px", borderLeft: `1px dashed ${RULE}`, borderTop: `1px solid ${RULE}` }}>
                  <ul className="flex flex-col gap-2">
                    {p.needs.map((n) => (
                      <li key={n} style={{ color: BODY, fontSize: 12.5, lineHeight: 1.4, display: "flex", gap: 7 }}><span style={{ width: 3, height: 3, borderRadius: 999, background: TAAJEER, flexShrink: 0, marginTop: 7 }} />{n}</li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* channels */}
              <div style={{ padding: "14px 10px 14px 0", borderTop: `1px solid ${RULE}` }}><span className="font-bold" style={{ color: TAAJEER, fontSize: 11 }}>Channels</span></div>
              {b2bPersonas.map((p) => (
                <div key={p.bar} style={{ padding: "14px 10px", borderLeft: `1px dashed ${RULE}`, borderTop: `1px solid ${RULE}` }}>
                  <div className="flex flex-wrap gap-1.5">
                    {p.channels.map((c) => (
                      <span key={c} className="font-semibold" style={{ fontSize: 11, color: INK, background: WASH, border: `1px solid ${RULE}`, borderRadius: 999, padding: "3px 9px" }}>{c}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ AUDIENCE PERSONAS ══════════ */}
      <section id="audience-personas" className="tj-slide opacity-0" style={{ padding: "110px 24px", background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-3"><p className="text-[11px] font-bold tracking-[0.16em]" style={{ color: EMOTION, opacity: 0.6 }}>APPROACH &amp; METHODOLOGY</p></div>
          <SH n="" title="Audience" accent="Personas" color={EMOTION} sub="Representative profiles behind the priority segments" />

          <div className="flex flex-col gap-6 tj-stagger">
            {audiencePersonas.map((p) => {
              const sections = [
                { label: "Goals", items: p.goals }, { label: "Needs", items: p.needs }, { label: "Pain Points", items: p.pains },
                { label: "Purchase Drivers", items: p.drivers }, { label: "Content Interests", items: p.interests },
              ];
              return (
                <div key={p.n} className="tj-item rounded-[22px] overflow-hidden" style={{ background: "#fff", border: `1px solid ${RULE}`, borderTop: `4px solid ${p.accent}` }}>
                  {/* header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 p-6 md:p-7" style={{ background: `${p.accent}08`, borderBottom: `1px solid ${RULE}` }}>
                    <div className="flex items-center gap-4">
                      <span className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: p.accent }}>
                        <span className="heading font-bold text-[17px]" style={{ color: "#fff" }}>{p.initials}</span>
                      </span>
                      <div>
                        <p className="text-[11px] font-bold mb-0.5" style={{ color: p.accent }}>PERSONA {p.n} · {p.title}</p>
                        <h3 className="heading text-xl mb-1.5" style={{ color: INK }}>{p.name}</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {p.meta.map((m) => <span key={m} className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "#fff", border: `1px solid ${RULE}`, color: BODY }}>{m}</span>)}
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold px-3 py-1.5 rounded-full" style={{ background: p.accent, color: "#fff" }}>{p.priority}</span>
                  </div>

                  <div className="p-6 md:p-7">
                    {/* profile */}
                    <p className="text-[14px] leading-relaxed mb-6" style={{ color: BODY }}><b style={{ color: INK }}>Profile.</b> {p.profile}</p>

                    {/* sections grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                      {sections.map((s) => (
                        <div key={s.label}>
                          <p className="text-[11px] font-bold mb-2.5" style={{ color: p.accent }}>{s.label.toUpperCase()}</p>
                          <ul className="flex flex-col gap-1.5">
                            {s.items.map((it) => (
                              <li key={it} className="text-[12.5px] leading-snug flex items-start gap-2" style={{ color: BODY }}><span className="rounded-full flex-shrink-0" style={{ width: 3, height: 3, background: p.accent, marginTop: 7 }} />{it}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      {/* platforms + key message */}
                      <div className="flex flex-col gap-4">
                        <div>
                          <p className="text-[11px] font-bold mb-2.5" style={{ color: p.accent }}>PREFERRED PLATFORMS</p>
                          <div className="flex flex-wrap items-center gap-2">
                            {p.platforms.map((pl) => {
                              const key = pl.toLowerCase();
                              const social = ["tiktok", "instagram", "snapchat", "youtube", "facebook", "x", "linkedin"].includes(key);
                              return social
                                ? <PIcon key={pl} p={key as PKey} size={16} />
                                : <span key={pl} className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: WASH, border: `1px solid ${RULE}`, color: INK }}>{pl}</span>;
                            })}
                          </div>
                        </div>
                        <div className="rounded-[12px] px-4 py-3.5 mt-auto" style={{ background: p.accent }}>
                          <p className="text-[10px] font-bold tracking-wide mb-1" style={{ color: "rgba(255,255,255,0.65)" }}>KEY MESSAGE</p>
                          <p className="text-[13px] leading-snug font-semibold" style={{ color: "#fff" }}>{p.keyMessage}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ BESTUNE — BRAND CHARACTER ══════════ */}
      <section id="brand-character" className="tj-slide opacity-0" style={{ padding: "110px 24px", background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8">
            <span className="text-[11px] font-bold tracking-[0.18em] mb-4" style={{ color: BESTUNE, opacity: 0.6 }}>BRAND CHARACTER</span>
            <img src={BRANDS.bestune.logo} alt="Bestune" style={{ height: 30, maxWidth: 180, objectFit: "contain" }} />
          </div>

          {/* character adjectives */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-8 tj-item">
            {["Modern", "Confident", "Reliable", "Approachable", "Adventurous", "Family-Oriented"].map((a) => (
              <span key={a} className="text-[14px] font-bold px-4 py-2 rounded-full" style={{ background: BRANDS.bestune.tint, color: BESTUNE, border: `1px solid ${RULE}` }}>{a}</span>
            ))}
          </div>

          {/* statement */}
          <div className="tj-item rounded-[20px] px-8 py-8 text-center mb-10" style={{ background: BESTUNE }}>
            <p className="heading text-xl md:text-[24px] leading-snug" style={{ color: "#fff" }}>
              Bestune is a modern and confident automotive brand that delivers smart, reliable and accessible mobility for everyday life and new experiences.
            </p>
          </div>

          {/* archetypes */}
          <p className="text-[11px] font-bold text-center mb-5 tracking-wide" style={{ color: BESTUNE }}>BRAND ARCHETYPE</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 tj-stagger">
            {[
              { icon: Compass, name: "The Explorer", tag: "Primary", desc: "Represents freedom, discovery, movement and new experiences." },
              { icon: Users, name: "The Everyman", tag: "Secondary", desc: "Represents accessibility, practicality, belonging and everyday relevance." },
            ].map(({ icon: Ic, name, tag, desc }) => (
              <div key={name} className="tj-item rounded-[18px] p-7 flex flex-col" style={{ background: "#fff", border: `1px solid ${RULE}`, borderTop: `4px solid ${tag === "Primary" ? BESTUNE : STEEL}` }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-12 h-12 rounded-[13px] flex items-center justify-center" style={{ background: BRANDS.bestune.tint }}><Ic size={22} color={BESTUNE} /></span>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ background: tag === "Primary" ? BESTUNE : `${STEEL}18`, color: tag === "Primary" ? "#fff" : STEEL }}>{tag}</span>
                </div>
                <h3 className="heading text-xl mb-2" style={{ color: INK }}>{name}</h3>
                <p className="text-[13.5px] leading-relaxed" style={{ color: BODY }}>{desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════ CONTENT STRATEGY · CONTENT HUBS ══════════ */}
      <section id="content-hubs" className="tj-slide opacity-0" style={{ padding: "110px 24px", background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-3"><p className="text-[11px] font-bold tracking-[0.16em]" style={{ color: EMOTION, opacity: 0.6 }}>CONTENT STRATEGY</p></div>
          <SH n="" title="Content" accent="Hubs" color={EMOTION} sub="A customer-centric approach, organised into three content hubs" />
          <div className="flex justify-center mb-8 tj-item">
            <span className="text-[12px] font-bold px-6 py-3 rounded-full" style={{ background: BESTUNE, color: "#fff" }}>Customer Centricity Approach</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 tj-stagger">
            {contentHubs.map((h) => (
              <div key={h.name} className="tj-item rounded-[18px] overflow-hidden flex flex-col" style={{ background: "#fff", border: `1px solid ${RULE}` }}>
                <div className="px-6 py-5" style={{ background: h.color }}>
                  <p className="text-[10px] font-bold mb-1" style={{ color: "rgba(255,255,255,0.7)" }}>BESTUNE</p>
                  <h3 className="heading text-xl" style={{ color: "#fff" }}>{h.name}</h3>
                </div>
                <div className="px-6 py-5">
                  <p className="text-[13.5px] leading-relaxed" style={{ color: BODY }}>{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CONTENT STRATEGY · CONTENT PILLARS ══════════ */}
      <section id="content-pillars" className="tj-slide opacity-0" style={{ padding: "110px 24px", background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-3"><p className="text-[11px] font-bold tracking-[0.16em]" style={{ color: EMOTION, opacity: 0.6 }}>CONTENT STRATEGY</p></div>
          <SH n="" title="Content" accent="Pillars" color={EMOTION} sub="The topics that live inside each hub" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 tj-stagger items-start">
            {contentPillars.map((col) => (
              <div key={col.hub} className="tj-item">
                <div className="rounded-[12px] px-5 py-4 mb-4" style={{ background: col.color }}>
                  <span className="text-[10px] font-bold" style={{ color: "rgba(255,255,255,0.7)" }}>BESTUNE · </span>
                  <span className="heading text-[17px]" style={{ color: "#fff" }}>{col.hub}</span>
                </div>
                <div className="flex flex-col gap-3.5">
                  {col.items.map((it) => (
                    <div key={it.t} className="rounded-[12px] p-4" style={{ background: WASH, border: `1px solid ${RULE}`, borderLeft: `3px solid ${col.color}` }}>
                      <h4 className="text-[13.5px] font-bold mb-1.5" style={{ color: col.color }}>{it.t}</h4>
                      <p className="text-[12.5px] leading-relaxed" style={{ color: BODY }}>{it.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CONTENT STRATEGY · CONTENT STYLE MIX ══════════ */}
      <section id="content-mix" className="tj-slide opacity-0" style={{ padding: "110px 24px", background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-3"><p className="text-[11px] font-bold tracking-[0.16em]" style={{ color: EMOTION, opacity: 0.6 }}>CONTENT STRATEGY</p></div>
          <SH n="" title="Content" accent="Style Mix" color={EMOTION} sub="A mix of communication styles keeps the feed balanced and interesting" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 tj-stagger">
            {contentStyleMix.map((s) => {
              const size = Math.round(72 + s.pct);
              return (
                <div key={s.t} className="tj-item flex items-center gap-5">
                  <span className="rounded-full flex items-center justify-center flex-shrink-0" style={{ width: size, height: size, background: s.color }}>
                    <span className="heading font-bold" style={{ fontSize: 18, color: "#fff" }}>{s.pct}%</span>
                  </span>
                  <div>
                    <h4 className="heading text-[16px] mb-1.5" style={{ color: s.color }}>{s.t}</h4>
                    <p className="text-[13px] leading-relaxed" style={{ color: BODY }}>{s.d}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ CONTENT STRATEGY · LANGUAGE & TONE OF VOICE ══════════ */}
      <section id="tone-of-voice" className="tj-slide opacity-0" style={{ padding: "110px 24px", background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-3"><p className="text-[11px] font-bold tracking-[0.16em]" style={{ color: EMOTION, opacity: 0.6 }}>CONTENT STRATEGY</p></div>
          <SH n="" title="Language &amp;" accent="Tone of Voice" color={EMOTION} sub="Practised across all content and community management" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 tj-stagger items-start">
            {/* style of writing */}
            <div className="tj-item">
              <div className="rounded-[10px] py-3 text-center mb-4" style={{ background: BESTUNE }}><span className="heading text-[15px] font-bold" style={{ color: "#fff" }}>Style of Writing</span></div>
              <div className="flex flex-col gap-3.5">
                <div className="rounded-[12px] p-4" style={{ background: WASH, border: `1px solid ${RULE}`, borderLeft: `3px solid ${EMOTION}` }}>
                  <h4 className="text-[13.5px] font-bold mb-1.5" style={{ color: EMOTION }}>Conversational <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full align-middle" style={{ background: `${EMOTION}14`, color: EMOTION }}>PRIMARY</span></h4>
                  <p className="text-[12.5px] leading-relaxed" style={{ color: BODY }}>Used as the primary style for social media, lifestyle content, engagement posts and community management. Natural, direct and relevant to Saudi audiences without sounding overly casual.</p>
                </div>
                <div className="rounded-[12px] p-4" style={{ background: WASH, border: `1px solid ${RULE}` }}>
                  <h4 className="text-[13.5px] font-bold mb-1.5" style={{ color: INK }}>Formal</h4>
                  <p className="text-[12.5px] leading-relaxed" style={{ color: BODY }}>Used for corporate announcements, partnerships, official events, product specifications, policies and important brand communications.</p>
                </div>
              </div>
            </div>
            {/* language */}
            <div className="tj-item">
              <div className="rounded-[10px] py-3 text-center mb-4" style={{ background: BESTUNE }}><span className="heading text-[15px] font-bold" style={{ color: "#fff" }}>Language</span></div>
              <div className="flex flex-col gap-3.5">
                <div className="rounded-[12px] p-4" style={{ background: WASH, border: `1px solid ${RULE}`, borderLeft: `3px solid ${EMOTION}` }}>
                  <h4 className="text-[13.5px] font-bold mb-1.5" style={{ color: EMOTION }}>Arabic <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full align-middle" style={{ background: `${EMOTION}14`, color: EMOTION }}>PRIMARY</span></h4>
                  <p className="text-[12.5px] leading-relaxed" style={{ color: BODY }}>Primary language across all consumer-facing platforms. Clear Modern Arabic with a light Saudi-localized expression when appropriate.</p>
                </div>
                <div className="rounded-[12px] p-4" style={{ background: WASH, border: `1px solid ${RULE}` }}>
                  <h4 className="text-[13.5px] font-bold mb-1.5" style={{ color: INK }}>English <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full align-middle" style={{ background: "#0000000A", color: MUTED }}>SECONDARY</span></h4>
                  <p className="text-[12.5px] leading-relaxed" style={{ color: BODY }}>Used selectively for corporate communication, technical terminology, international announcements and bilingual content.</p>
                </div>
              </div>
            </div>
            {/* tone of voice */}
            <div className="tj-item">
              <div className="rounded-[10px] py-3 text-center mb-4" style={{ background: BESTUNE }}><span className="heading text-[15px] font-bold" style={{ color: "#fff" }}>Tone of Voice</span></div>
              <div className="flex flex-col gap-2.5">
                {toneAttributes.map((a) => (
                  <div key={a} className="rounded-[10px] px-4 py-3 text-center" style={{ background: `${EMOTION}08`, border: `1px solid ${EMOTION}22` }}>
                    <span className="text-[13px] font-bold" style={{ color: EMOTION }}>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ CHANNELS STRATEGY · OVERVIEW ══════════ */}
      <section id="channels-overview" className="tj-slide opacity-0" style={{ padding: "110px 24px", background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-3"><p className="text-[11px] font-bold tracking-[0.16em]" style={{ color: EMOTION, opacity: 0.6 }}>CHANNELS STRATEGY</p></div>
          <SH n="" title="Channels" accent="Overview" color={EMOTION} sub="The style varies by channel — tone adjusted to each platform and its audience" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 tj-stagger">
            {channelOverview.map((c, i) => (
              <div key={i} className="tj-item rounded-[16px] p-5 flex flex-col items-center text-center" style={{ background: "#fff", border: `1px solid ${RULE}` }}>
                <span className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: BRANDS.bestune.tint }}><PIcon p={c.p} size={24} /></span>
                <h4 className="text-[13px] font-bold mb-2" style={{ color: INK }}>{c.character}</h4>
                <p className="text-[11.5px] leading-snug" style={{ color: BODY }}>{c.fn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CHANNELS STRATEGY · CHANNELS APPROACH ══════════ */}
      <section id="channels-approach" className="tj-slide opacity-0" style={{ padding: "110px 24px", background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-3"><p className="text-[11px] font-bold tracking-[0.16em]" style={{ color: EMOTION, opacity: 0.6 }}>CHANNELS STRATEGY</p></div>
          <SH n="" title="Channels" accent="Approach" color={EMOTION} sub="How each channel maps to hubs, content, cadence and language" />
          <div className="overflow-x-auto tj-item rounded-[16px]" style={{ border: `1px solid ${RULE}` }}>
            <table style={{ minWidth: 1080, borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr>
                  {["Channel", "Description", "Content Hub (Main Focus)", "Type of Content", "Content Format", "Frequency", "Language Use"].map((h) => (
                    <th key={h} style={{ background: EMOTION, color: "#fff", fontSize: 11.5, fontWeight: 700, textAlign: "left", padding: "12px 12px", verticalAlign: "middle" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {channelsApproach.map((r, i) => (
                  <tr key={r.channel} style={{ background: i % 2 ? WASH : "#fff" }}>
                    <td style={{ padding: "12px", borderTop: `1px solid ${RULE}`, verticalAlign: "top" }}>
                      <div className="flex items-center gap-2"><PIcon p={r.p} size={16} /><span className="font-bold" style={{ color: INK, fontSize: 12.5 }}>{r.channel}</span></div>
                    </td>
                    <td style={{ padding: "12px", borderTop: `1px solid ${RULE}`, verticalAlign: "top", color: BODY, fontSize: 11.5, lineHeight: 1.45, minWidth: 190 }}>{r.desc}</td>
                    <td style={{ padding: "12px", borderTop: `1px solid ${RULE}`, verticalAlign: "top", minWidth: 120 }}>
                      <span className="font-semibold" style={{ color: EMOTION, fontSize: 12, lineHeight: 1.5 }}>{r.hubs.join(" · ")}</span>
                    </td>
                    <td style={{ padding: "12px", borderTop: `1px solid ${RULE}`, verticalAlign: "top", color: BODY, fontSize: 11.5, lineHeight: 1.45, minWidth: 190 }}>{r.type}</td>
                    <td style={{ padding: "12px", borderTop: `1px solid ${RULE}`, verticalAlign: "top", color: BODY, fontSize: 11.5, lineHeight: 1.45, minWidth: 160 }}>{r.format}</td>
                    <td style={{ padding: "12px", borderTop: `1px solid ${RULE}`, verticalAlign: "top", color: INK, fontSize: 11.5, fontWeight: 600, minWidth: 100 }}>{r.freq}</td>
                    <td style={{ padding: "12px", borderTop: `1px solid ${RULE}`, verticalAlign: "top", color: INK, fontSize: 11.5, fontWeight: 600, minWidth: 110 }}>{r.lang}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[12px] italic mt-4" style={{ color: MUTED }}>Note: frequency can go up during events for coverage.</p>
        </div>
      </section>

      {/* ══════════ CHANNELS STRATEGY · PER-CHANNEL ══════════ */}
      {channels.map((ch) => (
        <section key={ch.id} id={ch.id} className="tj-slide opacity-0" style={{ padding: "110px 24px", background: "#fff", borderTop: `1px solid ${RULE}` }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="flex items-center gap-1.5 flex-shrink-0">
                {ch.icons.map((ic) => <PIcon key={ic} p={ic} size={22} />)}
              </span>
              <div>
                <p className="text-[11px] font-bold tracking-[0.16em]" style={{ color: EMOTION, opacity: 0.6 }}>CHANNELS STRATEGY</p>
                <h2 className="heading text-2xl md:text-3xl" style={{ color: INK }}>{ch.title}</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 tj-stagger items-start">
              {/* left — platform card */}
              <div className="tj-item rounded-[18px] p-6" style={{ background: WASH, border: `1px solid ${RULE}` }}>
                <p className="text-[10.5px] font-bold mb-1.5" style={{ color: EMOTION }}>PLATFORM CHARACTER</p>
                <p className="heading text-lg mb-5" style={{ color: INK }}>{ch.character}</p>
                <p className="text-[10.5px] font-bold mb-1.5" style={{ color: EMOTION }}>CHANNEL FUNCTION</p>
                <p className="text-[13px] leading-relaxed mb-5" style={{ color: BODY }}>{ch.fn}</p>
                <p className="text-[10.5px] font-bold mb-1.5" style={{ color: EMOTION }}>LANGUAGE</p>
                <p className="text-[13px] font-semibold mb-5" style={{ color: INK }}>{ch.language}</p>
                <p className="text-[10.5px] font-bold mb-2" style={{ color: EMOTION }}>CONTENT FORMAT</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {ch.formats.map((f) => <span key={f} className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: "#fff", border: `1px solid ${RULE}`, color: BODY }}>{f}</span>)}
                </div>
                <p className="text-[10.5px] font-bold mb-1.5" style={{ color: EMOTION }}>POSTING FREQUENCY</p>
                <p className="text-[13px] font-semibold" style={{ color: INK }}>{ch.frequency}</p>
              </div>

              {/* right — objectives + pillars */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="tj-item rounded-[18px] p-6" style={{ background: "#fff", border: `1px solid ${RULE}`, borderTop: `4px solid ${EMOTION}` }}>
                  <p className="text-[11px] font-bold mb-2.5" style={{ color: EMOTION }}>COMMUNICATION OBJECTIVES</p>
                  <p className="text-[14px] leading-relaxed" style={{ color: BODY }}>{ch.objective}</p>
                </div>
                <div className="tj-item">
                  <p className="text-[11px] font-bold mb-3" style={{ color: EMOTION }}>CONTENT PILLARS</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {ch.pillars.map((p) => (
                      <div key={p} className="rounded-[10px] px-3 py-3 text-center" style={{ background: `${EMOTION}08`, border: `1px solid ${EMOTION}1F` }}>
                        <span className="text-[12px] font-bold" style={{ color: EMOTION }}>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
      {/* ══════════ GROWTH · SEO ══════════ */}
      <section id="seo" className="tj-slide opacity-0" style={{ padding: "110px 24px", background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-3"><p className="text-[11px] font-bold tracking-[0.16em]" style={{ color: EMOTION, opacity: 0.6 }}>EXTRA SERVICES</p></div>
          <SH n="" title="SEO —" accent="Build Search Visibility" color={EMOTION} sub="Saudi buyers often research Bestune online before visiting a showroom. Organic search should build strong visibility across model names, pricing queries, specifications and buying questions in both Arabic and English." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 tj-stagger mb-6">
            {bSeo.map((s) => (
              <div key={s.t} className="tj-item rounded-[18px] p-6 flex items-start gap-4" style={{ background: "#fff", border: `1px solid ${RULE}`, borderTop: `4px solid ${EMOTION}` }}>
                <span className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `${EMOTION}12` }}><s.icon size={20} color={EMOTION} /></span>
                <div><h4 className="heading text-lg mb-1.5" style={{ color: INK }}>{s.t}</h4><p className="text-[13px] leading-relaxed" style={{ color: BODY }}>{s.d}</p></div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 flex-wrap rounded-[14px] px-5 py-4" style={{ background: `${EMOTION}0A` }}>
            <span className="text-[11px] font-bold" style={{ color: EMOTION }}>STACK</span>
            {["/ext/semrush.png", "/ext/gsc.png", "/ext/google-analytics.png", "/ext/google.svg"].map((l) => <img key={l} src={l} alt="" style={{ height: 20, maxWidth: 34, objectFit: "contain" }} />)}
          </div>
        </div>
      </section>

      {/* ══════════ GROWTH · SEM ══════════ */}
      <section id="sem" className="tj-slide opacity-0" style={{ padding: "110px 24px", background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-3"><p className="text-[11px] font-bold tracking-[0.16em]" style={{ color: EMOTION, opacity: 0.6 }}>EXTRA SERVICES</p></div>
          <SH n="" title="Paid Search —" accent="SEM" color={EMOTION} sub="Google Ads campaigns designed to capture high-intent demand at the moment buyers are actively searching, with optimization focused on qualified enquiries rather than traffic alone." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 tj-stagger mb-8">
            {bSem.map((s) => (
              <div key={s.t} className="tj-item rounded-[18px] p-5" style={{ background: "#fff", border: `1px solid ${RULE}`, borderTop: `4px solid ${EMOTION}` }}>
                <span className="w-11 h-11 rounded-2xl flex items-center justify-center mb-3" style={{ background: `${EMOTION}12` }}><s.icon size={20} color={EMOTION} /></span>
                <h4 className="heading text-[15px] mb-1.5" style={{ color: INK }}>{s.t}</h4>
                <p className="text-[12px] leading-snug" style={{ color: BODY }}>{s.d}</p>
              </div>
            ))}
          </div>
          <p className="text-[11px] font-bold mb-3 tracking-wide" style={{ color: MUTED }}>KEYWORD ANGLE</p>
          <div className="rounded-[16px] p-5 flex items-center gap-4" style={{ background: "#fff", border: `1px solid ${RULE}`, borderLeft: `4px solid ${BESTUNE}` }}>
            <img src={BRANDS.bestune.logo} alt="Bestune" style={{ height: 22, maxWidth: 100, objectFit: "contain" }} />
            <p className="text-[13px] leading-snug" style={{ color: BODY }}>{bSemAngle}</p>
          </div>
          <div className="flex items-center gap-4 flex-wrap rounded-[14px] px-5 py-4 mt-6" style={{ background: `${EMOTION}0A` }}>
            <span className="text-[11px] font-bold" style={{ color: EMOTION }}>STACK</span>
            {["/ext/google-ads-icon.png", "/ext/google.svg", "/ext/google-analytics.png"].map((l) => <img key={l} src={l} alt="" style={{ height: 20, maxWidth: 34, objectFit: "contain" }} />)}
          </div>
        </div>
      </section>

      {/* ══════════ GROWTH · MEDIA PLAN ══════════ */}
      <section id="media" className="tj-slide opacity-0" style={{ padding: "110px 24px", background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-3"><p className="text-[11px] font-bold tracking-[0.16em]" style={{ color: EMOTION, opacity: 0.6 }}>EXTRA SERVICES</p></div>
          <SH n="" title="Media" accent="plan" color={EMOTION} sub="The recommended channel mix for Bestune combines social media and search to build awareness, strengthen trust and generate qualified enquiries. The final allocation will be adjusted monthly based on approved investment, model priorities and live performance." />
          <p className="text-[11px] font-bold mb-3 tracking-wide" style={{ color: MUTED }}>RECOMMENDED CHANNEL ALLOCATION</p>
          <div className="rounded-[18px] overflow-hidden overflow-x-auto mb-4" style={{ border: `1px solid ${RULE}` }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
              <thead>
                <tr style={{ background: INK }}>
                  {["Channel", "Share", "Budget", "Role"].map((h) => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#fff", fontFamily: BRIC, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bMediaChannels.map((c) => (
                  <tr key={c.name} style={{ borderTop: `1px solid ${RULE}` }}>
                    <td style={{ padding: "11px 16px" }}>
                      <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: c.color }} /><span style={{ fontSize: 13, fontWeight: 700, color: INK, fontFamily: BRIC }}>{c.name}</span></span>
                    </td>
                    <td style={{ padding: "11px 16px", fontSize: 13, fontWeight: 700, color: EMOTION, fontFamily: BRIC }}>{c.pct}%</td>
                    <td style={{ padding: "11px 16px", fontSize: 12, fontWeight: 700, color: MUTED, fontFamily: BRIC }}>TBD</td>
                    <td style={{ padding: "11px 16px", fontSize: 12, color: BODY, fontFamily: BRIC }}>{c.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex rounded-[8px] overflow-hidden mb-8" style={{ height: 26, border: `1px solid ${RULE}` }}>
            {bMediaChannels.map((c) => (
              <div key={c.name} className="flex items-center justify-center" style={{ width: `${c.pct}%`, background: c.color }} title={`${c.name} · ${c.pct}%`}>
                <span className="text-[10px] font-bold" style={{ color: c.color === "#F7C700" ? "#111" : "#fff" }}>{c.pct}%</span>
              </div>
            ))}
          </div>
          <div className="rounded-[16px] px-6 py-5 flex items-start gap-3" style={{ background: `${EMOTION}0D` }}>
            <Wallet size={18} color={EMOTION} className="flex-shrink-0 mt-0.5" />
            <p className="text-[12.5px] leading-snug" style={{ color: BODY }}>The total monthly budget is to be confirmed. Reach, impression and lead forecasts will be calculated once the investment is approved and validated against the first 30 days of live performance.</p>
          </div>
        </div>
      </section>

      {/* ══════════ GROWTH · KPIs ══════════ */}
      <section id="kpis" className="tj-slide opacity-0" style={{ padding: "110px 24px", background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-3"><p className="text-[11px] font-bold tracking-[0.16em]" style={{ color: EMOTION, opacity: 0.6 }}>EXTRA SERVICES</p></div>
          <SH n="" title="KPIs &" accent="measurement" color={EMOTION} sub="Bestune's scorecard will focus on qualified demand, conversion efficiency and brand trust." />
          <div className="tj-item rounded-[20px] overflow-hidden max-w-lg mx-auto" style={{ border: `1px solid ${RULE}` }}>
            <div className="px-5 py-4" style={{ background: BESTUNE }}>
              <img src={BRANDS.bestune.logo} alt="Bestune" style={{ height: 22, maxWidth: 110, objectFit: "contain", filter: "brightness(0) invert(1)", marginBottom: 8 }} />
              <p className="text-[13px] font-bold" style={{ color: "#fff" }}>{bKpi.northstar}</p>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: WASH }}>
                  <th style={{ padding: "9px 18px", textAlign: "left", fontSize: 10.5, fontWeight: 700, color: MUTED, fontFamily: BRIC }}>KPI</th>
                  <th style={{ padding: "9px 18px", textAlign: "right", fontSize: 10.5, fontWeight: 700, color: MUTED, fontFamily: BRIC }}>Planning Benchmark</th>
                </tr>
              </thead>
              <tbody>
                {bKpi.rows.map((r) => (
                  <tr key={r.m} style={{ borderTop: `1px solid ${RULE}` }}>
                    <td style={{ padding: "11px 18px", fontSize: 12.5, fontWeight: 700, color: INK, fontFamily: BRIC }}>{r.m}</td>
                    <td style={{ padding: "11px 18px", fontSize: 12.5, color: BESTUNE, fontWeight: 700, fontFamily: BRIC, textAlign: "right" }}>{r.t}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] mt-5 text-center max-w-2xl mx-auto" style={{ color: MUTED }}>Benchmarks are directional planning estimates and not guaranteed results. Final targets will be re-based after the first 30 days using actual platform performance, lead quality, sales feedback and conversion tracking.</p>
        </div>
      </section>

      {/* ══════════ EXECUTIVE SUMMARY ══════════ */}
      <section id="exec-summary" className="tj-slide opacity-0" style={{ padding: "110px 24px", background: "#fff", borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8">
            <span className="text-[11px] font-bold tracking-[0.18em] mb-4" style={{ color: BESTUNE, opacity: 0.6 }}>EXECUTIVE SUMMARY</span>
            <img src={BRANDS.bestune.logo} alt="Bestune" style={{ height: 32, maxWidth: 200, objectFit: "contain" }} />
          </div>

          {/* the challenge */}
          <div className="tj-item rounded-[22px] p-7 md:p-9 mb-14" style={{ background: BESTUNE }}>
            <p className="text-[11px] font-bold tracking-wide mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>THE CHALLENGE</p>
            <p className="text-[15px] leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.92)" }}>Bestune has a strong foundation in Saudi Arabia — an established market presence, a wide vehicle lineup, an existing website and clear potential for sales growth. However, its current digital customer journey is not fully converting these strengths into consistent brand engagement, qualified leads, test-drive bookings and showroom visits.</p>
            <p className="text-[15px] leading-relaxed font-semibold" style={{ color: "#fff" }}>The challenge is not a lack of products or market potential — it is that the customer journey, from discovering Bestune to contacting the brand and booking a test drive, is currently fragmented.</p>
          </div>

          {/* key challenges */}
          <p className="text-[12px] font-bold tracking-wide mb-5" style={{ color: BESTUNE }}>KEY CHALLENGES</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 tj-stagger mb-14">
            {execChallenges.map((c, i) => {
              const ac = c.critical ? NEG : BESTUNE;
              return (
                <div key={c.t} className="tj-item rounded-[18px] p-6 flex flex-col" style={{ background: c.critical ? `${NEG}06` : "#fff", border: `1px solid ${c.critical ? `${NEG}33` : RULE}`, borderTop: `4px solid ${ac}` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0 text-[13px] font-bold" style={{ background: `${ac}14`, color: ac }}>{String(i + 1).padStart(2, "0")}</span>
                    {c.critical && <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full" style={{ background: NEG, color: "#fff" }}>MOST CRITICAL</span>}
                  </div>
                  <h4 className="heading text-[16px] mb-3 leading-snug" style={{ color: INK }}>{c.t}</h4>
                  <ul className="flex flex-col gap-1.5 mb-4">
                    {c.pts.map((p) => (
                      <li key={p} className="text-[12.5px] leading-snug flex items-start gap-2" style={{ color: BODY }}><span className="rounded-full flex-shrink-0" style={{ width: 3, height: 3, background: ac, marginTop: 7 }} />{p}</li>
                    ))}
                  </ul>
                  <p className="text-[12px] leading-relaxed mt-auto pt-3" style={{ color: c.critical ? NEG : STEEL, borderTop: `1px dashed ${RULE}` }}>{c.note}</p>
                </div>
              );
            })}
          </div>

          {/* the fragmented lead journey */}
          <div className="tj-item rounded-[18px] p-6 md:p-7 mb-16" style={{ background: WASH, border: `1px solid ${RULE}` }}>
            <p className="text-[11px] font-bold mb-1" style={{ color: NEG }}>THE LEAD JOURNEY — currently fragmented</p>
            <p className="text-[12.5px] mb-5" style={{ color: BODY }}>Every interest signal should flow cleanly through this chain. Today it breaks at contact and tracking.</p>
            <div className="flex flex-wrap items-center gap-y-3">
              {execLeadFlow.map((s, i) => (
                <Fragment key={s}>
                  <span className="text-[12px] font-bold px-3.5 py-2 rounded-[10px]" style={{ background: "#fff", border: `1px solid ${RULE}`, color: INK }}>{s}</span>
                  {i < execLeadFlow.length - 1 && <ArrowRight size={15} color={MUTED} className="mx-1.5 flex-shrink-0" />}
                </Fragment>
              ))}
            </div>
          </div>

          {/* strategic response */}
          <div className="text-center mb-8">
            <h3 className="heading text-2xl md:text-3xl" style={{ color: INK }}>Our Strategic <span style={{ color: BESTUNE }}>Response</span></h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 tj-stagger mb-14">
            {execResponse.map((r, i) => (
              <div key={r.t} className="tj-item rounded-[18px] p-6 flex flex-col" style={{ background: "#fff", border: `1px solid ${RULE}`, borderLeft: `4px solid ${BESTUNE}` }}>
                <div className="flex items-start gap-3 mb-2.5">
                  <span className="w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0 text-[13px] font-bold" style={{ background: BRANDS.bestune.tint, color: BESTUNE }}>{i + 1}</span>
                  <h4 className="heading text-[16px] leading-snug pt-1" style={{ color: INK }}>{r.t}</h4>
                </div>
                {r.note && <p className="text-[12.5px] leading-relaxed mb-3" style={{ color: BODY }}>{r.note}</p>}
                {r.pts && (
                  <ul className="flex flex-col gap-1.5">
                    {r.pts.map((p) => (
                      <li key={p} className="text-[12.5px] leading-snug flex items-start gap-2" style={{ color: BODY }}><span className="rounded-full flex-shrink-0" style={{ width: 3, height: 3, background: BESTUNE, marginTop: 7 }} />{p}</li>
                    ))}
                  </ul>
                )}
                {r.special === "mapping" && (
                  <div className="flex flex-col gap-2 mt-1">
                    {execFeatureBenefit.map(([f, b]) => (
                      <div key={f} className="flex items-center gap-2.5 rounded-[10px] px-3 py-2" style={{ background: BRANDS.bestune.tint }}>
                        <span className="text-[12.5px] font-bold flex-1" style={{ color: INK }}>{f}</span>
                        <ArrowRight size={13} color={BESTUNE} className="flex-shrink-0" />
                        <span className="text-[12.5px] font-semibold flex-1 text-right" style={{ color: BESTUNE }}>{b}</span>
                      </div>
                    ))}
                  </div>
                )}
                {r.special === "brandfeel" && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {execBrandFeel.map((w) => (
                      <span key={w} className="text-[12.5px] font-bold px-3 py-1.5 rounded-full" style={{ background: BRANDS.bestune.tint, color: BESTUNE }}>{w}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* roadmap */}
          <p className="text-[12px] font-bold tracking-wide mb-5 text-center" style={{ color: BESTUNE }}>THE ROADMAP · FOUR STAGES</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 tj-stagger">
            {execRoadmap.map((s, i) => (
              <div key={s.t} className="tj-item relative flex flex-col rounded-[16px] p-6 md:rounded-none md:first:rounded-l-[16px] md:last:rounded-r-[16px]" style={{ background: i % 2 ? BESTUNE : BRANDS.bestune.tint, borderRight: i < 3 ? `1px solid ${RULE}` : "none" }}>
                <span className="heading text-3xl font-bold mb-3" style={{ color: i % 2 ? "rgba(255,255,255,0.5)" : `${BESTUNE}55` }}>{String(i + 1).padStart(2, "0")}</span>
                <h4 className="heading text-[15px] mb-2" style={{ color: i % 2 ? "#fff" : INK }}>{s.t}</h4>
                <p className="text-[12px] leading-relaxed" style={{ color: i % 2 ? "rgba(255,255,255,0.82)" : BODY }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ LIGHTBOX ══════════ */}
      {lb && (
        <div onClick={() => setLb(null)} className="fixed inset-0 z-[100] flex items-center justify-center p-6" style={{ background: "rgba(0,0,0,0.92)" }}>
          <button onClick={(e) => { e.stopPropagation(); setLb(null); }} className="absolute top-5 right-5 rounded-full flex items-center justify-center cursor-pointer border-0" style={{ width: 44, height: 44, background: "rgba(255,255,255,0.12)" }} aria-label="Close"><X size={20} color="#fff" /></button>
          {lb.imgs.length > 1 && (
            <button onClick={(e) => { e.stopPropagation(); setLb((p) => (p ? { ...p, i: (p.i - 1 + p.imgs.length) % p.imgs.length } : p)); }} className="absolute left-4 md:left-8 rounded-full flex items-center justify-center cursor-pointer border-0" style={{ width: 44, height: 44, background: "rgba(255,255,255,0.12)" }} aria-label="Previous"><ArrowLeft size={20} color="#fff" /></button>
          )}
          <img src={lb.imgs[lb.i]} alt="" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "90vw", maxHeight: "86vh", objectFit: "contain", borderRadius: 14, boxShadow: "0 24px 80px rgba(0,0,0,0.5)" }} />
          {lb.imgs.length > 1 && (
            <button onClick={(e) => { e.stopPropagation(); setLb((p) => (p ? { ...p, i: (p.i + 1) % p.imgs.length } : p)); }} className="absolute right-4 md:right-8 rounded-full flex items-center justify-center cursor-pointer border-0" style={{ width: 44, height: 44, background: "rgba(255,255,255,0.12)" }} aria-label="Next"><ArrowRight size={20} color="#fff" /></button>
          )}
          {lb.imgs.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[12px] font-bold px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.14)", color: "#fff" }}>{lb.i + 1} / {lb.imgs.length}</div>
          )}
        </div>
      )}
      {/* <TaajeerStrategyChat /> — hidden */}
      <style>{`.taajeer-strategy-page, .taajeer-strategy-page > section { background-color: #fff !important; }`}</style>
    </div>
  );
}

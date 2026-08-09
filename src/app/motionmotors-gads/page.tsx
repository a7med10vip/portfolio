"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MapPin, Phone, Navigation, Target, TrendingUp, BarChart3,
  Search, Calendar, CheckCircle2, AlertCircle, Zap,
  Send, Eye, MousePointer,
  Tag, Star, Clock, Filter, ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const G = "#30c280";
const D = "#0A0A0A";
const B = "#3B82F6";
const A = "#F59E0B";
const P = "#8B5CF6";
const R = "#EF4444";

const AR_FONT: React.CSSProperties = {
  fontFamily: "'Ahmed Sans', 'Thmanyah Sans', sans-serif",
};

export default function MotionMotorsGAds() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ga-hero", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: "power4.out", delay: 0.3 });
      gsap.utils.toArray<HTMLElement>(".ga-slide").forEach((el) => {
        gsap.fromTo(el, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".ga-stagger").forEach((el) => {
        gsap.fromTo(el.querySelectorAll(".ga-item"), { y: 40, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 82%", once: true } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  /* ═══════════ DATA ═══════════ */

  const heroStats: { n: string; l: string }[] = [
    { n: "3K", l: "SAR / Month" },
    { n: "100", l: "SAR / Day" },
    { n: "Jeddah", l: "Only" },
    { n: "GBP", l: "Destination" },
  ];

  const campaignSetup: { label: string; value: string; note: string; color: string; icon: LucideIcon }[] = [
    { label: "Campaign Type", value: "Performance Max", note: "GBP-anchored — Google forces PMax for Store Visits, no alternative", color: B, icon: Target },
    { label: "Goal", value: "Local Store Visits", note: "Calls · Direction Requests · Showroom Walk-ins", color: G, icon: MapPin },
    { label: "Geo Targeting", value: "Jeddah Only", note: "Western Region HQ — King Abdulaziz Branch Rd", color: A, icon: Navigation },
    { label: "Destination", value: "Google Business Profile", note: "SOUEAST MOTION MOTORS · Jeddah", color: G, icon: Star },
    { label: "Daily Budget", value: "SAR 100 / day", note: "SAR 3,000 / month cap", color: P, icon: Zap },
    { label: "Match Type — Phase 1", value: "Broad Match", note: "Cast wide first — read the actual search terms before tightening", color: R, icon: Search },
  ];

  const matchPhases: { phase: string; n: string; type: string; typeAr: string; window: string; goal: string; why: string; color: string; icon: LucideIcon }[] = [
    {
      phase: "Phase One",
      n: "01",
      type: "Broad Match",
      typeAr: "مطابقة تقريبية",
      window: "Month One",
      goal: "Discovery — read what Jeddah actually searches",
      why: "The prior campaign (all-KSA, SAR 0.30 CPC) gave us clicks but no keyword granularity. Broad Match on Jeddah-only fills that gap — we'll see the real search terms people use before deciding what to tighten. Some of the best terms won't be ones we write ourselves.",
      color: A,
      icon: Search,
    },
    {
      phase: "Phase Two",
      n: "02",
      type: "Phrase Match",
      typeAr: "مطابقة العبارة",
      window: "Month Two onwards",
      goal: "Tighten — only spend on terms that proved intent",
      why: "After Month One we have real data. Top-performing search terms move to Phrase Match so the budget stops spreading across low-intent variations. CPA drops, lead quality goes up, and we can finally commit to realistic monthly targets instead of educated guesses.",
      color: G,
      icon: Filter,
    },
  ];

  const keywordGroups: { category: string; label: string; color: string; icon: LucideIcon; count: number; keywords: { kw: string; type: "positive" | "negative" }[] }[] = [
    {
      category: "Brand",
      label: "Brand",
      color: G,
      icon: Star,
      count: 6,
      keywords: [
        { kw: "موشن موتورز", type: "positive" },
        { kw: "سو ايست جدة", type: "positive" },
        { kw: "وكيل سو ايست السعودية", type: "positive" },
        { kw: "موشن موتورز جدة", type: "positive" },
        { kw: "soueast jeddah", type: "positive" },
        { kw: "motion motors jeddah", type: "positive" },
      ],
    },
    {
      category: "Models",
      label: "Models",
      color: B,
      icon: Tag,
      count: 7,
      keywords: [
        { kw: "سو ايست S07", type: "positive" },
        { kw: "سو ايست S06", type: "positive" },
        { kw: "سو ايست S08", type: "positive" },
        { kw: "سو ايست S09", type: "positive" },
        { kw: "سيارات سو ايست", type: "positive" },
        { kw: "soueast S07 سعر", type: "positive" },
        { kw: "soueast S06 price", type: "positive" },
      ],
    },
    {
      category: "Intent",
      label: "High Intent",
      color: A,
      icon: Target,
      count: 14,
      keywords: [
        { kw: "سيارة بالتقسيط جدة", type: "positive" },
        { kw: "تمويل سيارة جدة", type: "positive" },
        { kw: "سيارة بدون دفعة أولى جدة", type: "positive" },
        { kw: "وكيل سيارات جدة", type: "positive" },
        { kw: "سيارات صينية جدة", type: "positive" },
        { kw: "أفضل سيارة بالتقسيط", type: "positive" },
        { kw: "car installment jeddah", type: "positive" },
        { kw: "سيارة جديدة جدة", type: "positive" },
        { kw: "شركة سيارات في جدة", type: "positive" },
        { kw: "أفضل شركة سيارات في جدة", type: "positive" },
        { kw: "معرض سيارات جدة", type: "positive" },
        { kw: "أرخص سيارة بالتقسيط جدة", type: "positive" },
        { kw: "car dealer jeddah", type: "positive" },
        { kw: "سيارة SUV بالتقسيط جدة", type: "positive" },
      ],
    },
    {
      category: "Negative",
      label: "Negative Keywords",
      color: R,
      icon: Filter,
      count: 6,
      keywords: [
        { kw: "وظائف", type: "negative" },
        { kw: "مستعمل", type: "negative" },
        { kw: "قطع غيار", type: "negative" },
        { kw: "صيانة", type: "negative" },
        { kw: "تأجير سيارات", type: "negative" },
        { kw: "سيارات رخيصة", type: "negative" },
      ],
    },
  ];

  const projections: { label: string; color: string; actualSpend: string; impressions: string; clicks: string; cpc: string; calls: string; directions: string; totalActions: string; cpa: string }[] = [
    {
      label: "Conservative",
      color: A,
      actualSpend: "~SAR 1,800",
      impressions: "150k–200k",
      clicks: "3,500–4,000",
      cpc: "SAR 0.50",
      calls: "40–70",
      directions: "80–130",
      totalActions: "120–200",
      cpa: "SAR 9–15",
    },
    {
      label: "Target",
      color: G,
      actualSpend: "~SAR 2,400",
      impressions: "200k–300k",
      clicks: "6,000–7,000",
      cpc: "SAR 0.40",
      calls: "70–110",
      directions: "130–200",
      totalActions: "200–310",
      cpa: "SAR 8–12",
    },
    {
      label: "Optimistic",
      color: B,
      actualSpend: "SAR 3,000",
      impressions: "300k–400k",
      clicks: "8,500–10,000",
      cpc: "SAR 0.30",
      calls: "110–160",
      directions: "200–280",
      totalActions: "310–440",
      cpa: "SAR 7–10",
    },
  ];

  const primaryKPIs: { metric: string; target: string; icon: LucideIcon; color: string }[] = [
    { metric: "Calls from Ads", target: "70–110 / month", icon: Phone, color: G },
    { metric: "Direction Requests", target: "130–200 / month", icon: Navigation, color: B },
    { metric: "Cost per Action", target: "SAR 8–12", icon: Zap, color: A },
  ];

  const secondaryKPIs: { metric: string; target: string; icon: LucideIcon; color: string }[] = [
    { metric: "Impressions", target: "200k–300k", icon: Eye, color: P },
    { metric: "Clicks", target: "6,000–7,000", icon: MousePointer, color: B },
    { metric: "CTR", target: "3–4%", icon: TrendingUp, color: G },
    { metric: "Avg. CPC", target: "SAR 0.30–0.50", icon: Target, color: A },
  ];

  const reporting: { cadence: string; label: string; desc: string; color: string; icon: LucideIcon }[] = [
    {
      cadence: "Weekly",
      label: "Weekly Check-in",
      desc: "Spend pace, CPC, call count, direction requests, anything unusual. Every Sunday — one page, no fluff.",
      color: B,
      icon: Calendar,
    },
    {
      cadence: "Monthly",
      label: "Monthly Review",
      desc: "Target vs. actual, search term breakdown, Phrase Match transition decision, budget and geo adjustments for next month.",
      color: G,
      icon: BarChart3,
    },
  ];

  /* ═══════════ RENDER ═══════════ */

  return (
    <div ref={ref} style={{ background: "#fff", color: D }}>

      {/* ══════════ HERO ══════════ */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: "#fff" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] pointer-events-none" style={{ background: `radial-gradient(ellipse, ${G}18 0%, transparent 70%)` }} />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center">

          <div className="ga-hero opacity-0 mb-8" style={{ paddingTop: 40 }}>
            <img src="/logos/motion%20motors%20so.png" alt="Motion Motors × Soueast" className="h-16 md:h-20 mx-auto object-contain" />
          </div>

          <div className="ga-hero opacity-0 text-center mb-3">
            <p className="text-[13px] font-bold" style={{ color: "rgba(0,0,0,0.3)" }}>June 1, 2026</p>
          </div>

          <div className="ga-hero opacity-0 text-center mb-4">
            <h1 className="heading" style={{ fontSize: "clamp(44px, 10vw, 96px)", lineHeight: 1.05, color: D }}>
              Google Ads<br />Strategy
            </h1>
          </div>

          <div className="ga-hero opacity-0 text-center mb-8">
            <p className="text-lg" style={{ color: "rgba(0,0,0,0.5)" }}>Google Business Profile Campaign · Jeddah</p>
            <p className="text-xl font-bold mt-1 heading" style={{ color: G }}>Motion Motors × Soueast</p>
          </div>

          <div className="ga-hero opacity-0 mb-10 w-full max-w-2xl">
            <div className="flex items-stretch justify-center" style={{ background: "#fff", border: "1px solid #E8E8E8", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
              {heroStats.map((s, i) => (
                <div key={s.l} className="flex-1 flex flex-col items-center justify-center py-5 px-2 relative" style={{ borderRight: i < heroStats.length - 1 ? "1px solid #F0F0F0" : "none" }}>
                  <span className="heading" style={{ fontSize: 24, lineHeight: 1, color: D }}>{s.n}</span>
                  <span className="text-[10px] font-bold mt-1" style={{ color: "rgba(0,0,0,0.3)" }}>{s.l}</span>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-t-full" style={{ background: G }} />
                </div>
              ))}
            </div>
          </div>

          <div className="ga-hero opacity-0 grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 w-full max-w-2xl">
            <div className="rounded-[16px] p-5" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
              <img src="/logos/image001.png" alt="Emotion Group" className="h-6 object-contain mb-3" />
              <p className="text-[10px] font-bold mb-2" style={{ color: G }}>Prepared By</p>
              <p className="text-[14px] font-bold" style={{ color: D }}>Ahmed Ali</p>
              <p className="text-[11px]" style={{ color: "rgba(0,0,0,0.4)" }}>Head of Digital & Growth</p>
              <p className="text-[11px]" style={{ color: "rgba(0,0,0,0.3)" }}>ahmed.ali@emotiongrp.com</p>
            </div>
            <div className="rounded-[16px] p-5" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
              <img src="/logos/image001.png" alt="Emotion Group" className="h-6 object-contain mb-3" />
              <p className="text-[10px] font-bold mb-2" style={{ color: G }}>Prepared By</p>
              <p className="text-[14px] font-bold" style={{ color: D }}>Noman Shahid</p>
              <p className="text-[11px]" style={{ color: "rgba(0,0,0,0.4)" }}>Digital Marketing Specialist</p>
              <p className="text-[11px]" style={{ color: "rgba(0,0,0,0.3)" }}>noman.shahid@emotiongrp.com</p>
            </div>
            <div className="rounded-[16px] p-5" style={{ background: "#fff", border: `2px solid ${G}`, boxShadow: `3px 3px 0px 0px ${D}` }}>
              <p className="text-[10px] font-bold mb-2" style={{ color: G }}>For</p>
              <p className="text-[14px] font-bold" style={{ color: D }}>Motion Motors</p>
              <p className="text-[11px]" style={{ color: "rgba(0,0,0,0.5)" }}>Soueast — Western Region KSA</p>
              <p className="text-[11px]" style={{ color: "rgba(0,0,0,0.4)" }}>King Abdulaziz Branch Rd · Jeddah</p>
            </div>
          </div>

          <div className="ga-hero opacity-0 flex flex-col items-center gap-2">
            <div style={{ width: 24, height: 38, border: "1.5px solid rgba(0,0,0,0.14)", borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 5 }}>
              <div style={{ width: 3, height: 6, borderRadius: 2, background: G, animation: "scrollGA 1.6s ease-in-out infinite" }} />
            </div>
          </div>
        </div>
        <style>{`@keyframes scrollGA{0%{transform:translateY(0);opacity:1}75%{transform:translateY(9px);opacity:0}76%{transform:translateY(0);opacity:0}100%{opacity:1}}`}</style>
      </section>

      {/* ══════════ 01 — CAMPAIGN SETUP ══════════ */}
      <section id="setup" className="ga-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="heading text-lg mb-3" style={{ color: G }}>Section 01</p>
            <h2 className="heading text-4xl md:text-5xl mb-4">Campaign <span style={{ color: G }}>Setup</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ga-stagger">
            {campaignSetup.map((s) => (
              <div key={s.label} className="ga-item rounded-[16px] p-5" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${s.color}15` }}>
                    <s.icon size={16} color={s.color} />
                  </div>
                  <p className="text-[10px] font-bold" style={{ color: s.color }}>{s.label}</p>
                </div>
                <p className="text-[14px] font-bold heading mb-1" style={{ color: D }}>{s.value}</p>
                <p className="text-[11px]" style={{ color: "rgba(0,0,0,0.4)" }}>{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 02 — MATCH TYPE PHASES ══════════ */}
      <section id="match" className="ga-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="heading text-lg mb-3" style={{ color: G }}>Section 02</p>
            <h2 className="heading text-4xl md:text-5xl mb-4" style={{ color: "#fff" }}>Match Type <span style={{ color: G }}>Strategy</span></h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              The prior campaign ran all-KSA with no keyword data. We fix that in Month One before we narrow anything.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-5 ga-stagger">
            {matchPhases.map((p) => (
              <div key={p.n} className="ga-item flex-1 rounded-[24px] overflow-hidden" style={{ border: `2px solid ${p.color}30` }}>
                <div className="p-7 flex flex-col items-center text-center" style={{ background: p.color }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background: "rgba(0,0,0,0.1)" }}>
                    <p.icon size={22} color={D} />
                  </div>
                  <p className="text-[10px] font-bold mb-1" style={{ color: "rgba(0,0,0,0.4)" }}>{p.phase}</p>
                  <p className="heading text-3xl mb-1" style={{ color: D }}>{p.n}</p>
                  <p className="heading text-xl mb-1" style={{ color: D }}>{p.type}</p>
                  <p className="text-[12px] font-bold" style={{ color: "rgba(0,0,0,0.5)", ...AR_FONT }}>{p.typeAr}</p>
                </div>
                <div className="p-6 bg-[#111]">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={13} color={p.color} />
                    <p className="text-[11px] font-bold" style={{ color: p.color }}>{p.window}</p>
                  </div>
                  <p className="text-[13px] font-bold mb-3" style={{ color: "#fff" }}>{p.goal}</p>
                  <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{p.why}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center mt-6 gap-3">
            <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.08)" }} />
            <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: `${G}15`, border: `1px solid ${G}30` }}>
              <p className="text-[11px] font-bold" style={{ color: G }}>4 weeks of data</p>
              <ArrowRight size={13} color={G} />
              <p className="text-[11px] font-bold" style={{ color: G }}>Switch to Phrase Match</p>
            </div>
            <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.08)" }} />
          </div>
        </div>
      </section>

      {/* ══════════ 03 — KEYWORDS ══════════ */}
      <section id="keywords" className="ga-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="heading text-lg mb-3" style={{ color: G }}>Section 03</p>
            <h2 className="heading text-4xl md:text-5xl mb-4">Search <span style={{ color: G }}>Themes</span></h2>
            <p className="text-sm max-w-xl mx-auto" style={{ color: "rgba(0,0,0,0.5)" }}>
              21 terms across 3 groups + 6 negative exclusions. Entered as Search Themes in PMax — Google reads them as directional signals, not hard keyword matches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ga-stagger">
            {keywordGroups.map((g) => (
              <div key={g.category} className="ga-item rounded-[20px] overflow-hidden" style={{ border: `1px solid ${g.color}25` }}>
                <div className="px-5 py-4 flex items-center justify-between" style={{ background: `${g.color}10`, borderBottom: `1px solid ${g.color}20` }}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${g.color}20` }}>
                      <g.icon size={16} color={g.color} />
                    </div>
                    <div>
                      <p className="heading text-sm" style={{ color: D }}>{g.label}</p>
                      <p className="text-[10px]" style={{ color: "rgba(0,0,0,0.4)" }}>
                        {g.count} keywords · {g.category === "Negative" ? "Excluded" : "Broad → Phrase"}
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ background: `${g.color}20`, color: g.color }}>{g.count}</span>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    {g.keywords.map((k) => (
                      <span
                        key={k.kw}
                        className="px-3 py-1.5 rounded-full text-[12px] font-bold"
                        style={{
                          background: k.type === "negative" ? `${R}10` : `${g.color}10`,
                          color: k.type === "negative" ? R : g.color,
                          border: `1px solid ${k.type === "negative" ? R : g.color}25`,
                          ...AR_FONT,
                        }}
                      >
                        {k.type === "negative" ? "−" : "+"} {k.kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════ 04 — PROJECTIONS ══════════ */}
      <section id="numbers" className="ga-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="heading text-lg mb-3" style={{ color: G }}>Section 04</p>
            <h2 className="heading text-4xl md:text-5xl mb-4" style={{ color: "#fff" }}>Expected <span style={{ color: G }}>Numbers</span></h2>
            <p className="text-sm max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
              Based on Motion Motors' own account history — not benchmarks pulled from somewhere else.
            </p>
          </div>

          <div className="rounded-[16px] p-5 mb-10 flex items-start gap-3" style={{ background: `${B}12`, border: `1px solid ${B}25` }}>
            <BarChart3 size={16} color={B} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[13px] font-bold mb-1" style={{ color: "#fff" }}>Starting Point — Prior Campaign Data</p>
              <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.6)" }}>
                Last campaign: <strong style={{ color: B }}>SAR 945 → 173k impressions → 5.96k clicks</strong> · All Saudi Arabia · CPC SAR 0.30 · CPM SAR 5.46.
                New campaign targets Jeddah only — smaller search pool but all SAR 3,000 concentrated there. Budget utilization expected at 60–100% depending on Jeddah search volume. CPC stays at <strong style={{ color: G }}>SAR 0.30–0.50</strong>.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ga-stagger mb-10">
            {projections.map((p) => (
              <div key={p.label} className="ga-item rounded-[20px] overflow-hidden" style={{ border: `2px solid ${p.color}30` }}>
                <div className="p-5 text-center" style={{ background: p.color }}>
                  <p className="heading text-lg" style={{ color: D }}>{p.label}</p>
                </div>
                <div className="bg-[#111]">
                  {[
                    { l: "Actual Spend", v: p.actualSpend },
                    { l: "Impressions / month", v: p.impressions },
                    { l: "Clicks / month", v: p.clicks },
                    { l: "Avg. CPC", v: p.cpc },
                    { l: "Phone Calls", v: p.calls },
                    { l: "Direction Requests", v: p.directions },
                    { l: "Total Actions", v: p.totalActions },
                    { l: "Cost per Action", v: p.cpa },
                  ].map((row, i) => (
                    <div key={row.l} className="flex items-center justify-between px-5 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>{row.l}</span>
                      <span className="text-[12.5px] font-bold heading" style={{ color: i >= 4 ? p.color : "#fff" }}>{row.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-[16px] p-5 flex items-start gap-3" style={{ background: `${A}10`, border: `1px solid ${A}25` }}>
            <AlertCircle size={16} color={A} className="flex-shrink-0 mt-0.5" />
            <p className="text-[12.5px]" style={{ color: "rgba(255,255,255,0.7)" }}>
              <strong style={{ color: A }}>Note · </strong>
              These are working estimates, not guarantees. The Target scenario is what we review against at Month One. If the CPC comes in above SAR 0.85, the Conservative numbers apply and we adjust accordingly.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════ 05 — KPIs ══════════ */}
      <section id="kpis" className="ga-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="heading text-lg mb-3" style={{ color: G }}>Section 05</p>
            <h2 className="heading text-4xl md:text-5xl mb-4">KPI <span style={{ color: G }}>Framework</span></h2>
          </div>

          <div className="mb-10">
            <p className="heading text-center text-lg mb-6" style={{ color: D }}>Primary — what we're held to</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ga-stagger">
              {primaryKPIs.map((k) => (
                <div key={k.metric} className="ga-item rounded-[20px] p-6 text-center" style={{ background: "#fff", border: `2px solid ${k.color}25`, boxShadow: `3px 3px 0px 0px ${k.color}20` }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: `${k.color}15` }}>
                    <k.icon size={22} color={k.color} />
                  </div>
                  <p className="text-[11px] mb-2" style={{ color: "rgba(0,0,0,0.4)" }}>{k.metric}</p>
                  <p className="heading text-xl" style={{ color: D }}>{k.target}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="heading text-center text-lg mb-6" style={{ color: D }}>Secondary — health signals</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ga-stagger">
              {secondaryKPIs.map((k) => (
                <div key={k.metric} className="ga-item rounded-[16px] p-4" style={{ background: "#FAFAFA", border: `1px solid ${k.color}20` }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: `${k.color}15` }}>
                    <k.icon size={14} color={k.color} />
                  </div>
                  <p className="text-[10px] mb-1" style={{ color: "rgba(0,0,0,0.4)" }}>{k.metric}</p>
                  <p className="heading text-sm" style={{ color: D }}>{k.target}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 06 — REPORTING ══════════ */}
      <section id="reporting" className="ga-slide opacity-0" style={{ padding: "100px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="heading text-lg mb-3" style={{ color: G }}>Section 06</p>
            <h2 className="heading text-4xl md:text-5xl mb-4">Reporting <span style={{ color: G }}>Cadence</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ga-stagger">
            {reporting.map((r) => (
              <div key={r.cadence} className="ga-item rounded-[20px] p-6" style={{ background: "#fff", border: `1px solid ${r.color}25` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${r.color}15` }}>
                    <r.icon size={18} color={r.color} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold" style={{ color: r.color }}>{r.cadence}</p>
                    <h4 className="heading text-base" style={{ color: D }}>{r.label}</h4>
                  </div>
                </div>
                <p className="text-[12.5px] leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>{r.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 p-5 rounded-[16px] flex items-start gap-3" style={{ background: `${G}08`, border: `1px solid ${G}25` }}>
            <CheckCircle2 size={16} color={G} className="flex-shrink-0 mt-0.5" />
            <p className="text-[12.5px] leading-relaxed" style={{ color: D }}>
              <strong style={{ color: G }}>Phrase Match trigger · </strong>
              At the Month One review — if the search term report is clean and CPA is tracking toward target, we move the strongest performers to Phrase Match. If the data is noisy, we stay on Broad for a second month and revisit.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════ CLOSING ══════════ */}
      <section className="ga-slide opacity-0" style={{ padding: "80px 24px 60px", background: "#fff" }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="rounded-[24px] p-10 md:p-12" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
            <img src="/logos/motion%20motors%20so.png" alt="Motion Motors × Soueast" className="h-14 mx-auto mb-5 object-contain" />
            <h3 className="heading text-2xl mb-3" style={{ color: D }}>Ready to run.</h3>
            <p className="text-[13px] mb-7 max-w-md mx-auto leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>
              Setup is locked. Keywords are in. Numbers are based on what the account actually did — not pulled from a benchmark sheet. Month One tells us whether the Target scenario holds or we adjust.
            </p>
            <div className="w-full h-px mb-6" style={{ background: "#F0F0F0" }} />
            <p className="text-[14px] font-bold" style={{ color: D }}>Ahmed Ali</p>
            <p className="text-[12px]" style={{ color: G }}>Head of Digital & Growth · Emotion Group</p>
            <p className="text-[11px] mt-0.5" style={{ color: "rgba(0,0,0,0.35)" }}>ahmed.ali@emotiongrp.com</p>
            <div className="flex flex-wrap justify-center gap-3 mt-7">
              <a href="https://wa.me/201011648156" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold" style={{ background: G, color: D, border: `2px solid ${D}`, boxShadow: `3px 3px 0px 0px ${D}`, textDecoration: "none" }}>
                <FaWhatsapp size={14} /> WhatsApp
              </a>
              <a href="mailto:hello@ahmedali.online" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold" style={{ background: "#fff", color: D, border: `2px solid ${D}`, boxShadow: `3px 3px 0px 0px ${D}`, textDecoration: "none" }}>
                <Send size={14} /> Email
              </a>
            </div>
          </div>
          <p className="text-[11px] mt-6" style={{ color: "rgba(0,0,0,0.15)" }}>
            &copy; 2026 Motion Motors × Soueast · Google Ads Strategy · Internal
          </p>
        </div>
      </section>

    </div>
  );
}

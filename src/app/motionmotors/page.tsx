"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MotionMotorsChat from "@/components/MotionMotorsChat";
import {
  Car, Banknote, Target, TrendingUp,
  ArrowRight, ArrowDown, Calendar, Clock, Users, MapPin, BarChart3,
  Filter, Heart, Send,
  CheckCircle2, AlertCircle, Eye, FileText, Palette,
  Database, ShieldCheck, Megaphone, Phone,
  type LucideIcon,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
gsap.registerPlugin(ScrollTrigger);

/* ═══════════ COLORS ═══════════ */
const G = "#4FFFB0";
const D = "#0A0A0A";
const R = "#EF4444";
const A = "#F59E0B";
const P = "#8B5CF6";
const B = "#3B82F6";

/* ═══════════ MAIN ═══════════ */
export default function MotionMotorsCampaign() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".mm-hero", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: "power4.out", delay: 0.3 });

      gsap.utils.toArray<HTMLElement>(".mm-slide").forEach((el) => {
        gsap.fromTo(el, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      });

      gsap.utils.toArray<HTMLElement>(".mm-stagger").forEach((el) => {
        gsap.fromTo(el.querySelectorAll(".mm-item"), { y: 40, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 82%", once: true } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  /* ═══════════ DATA ═══════════ */

  const audience: { label: string; icon: LucideIcon; color: string }[] = [
    { label: "Aged 25–45", icon: Users, color: B },
    { label: "Mid-income professionals", icon: Target, color: P },
    { label: "Young families", icon: Heart, color: R },
    { label: "Jeddah-based", icon: MapPin, color: G },
  ];

  const principles: { n: string; title: string; tagline: string; body: string; color: string; dark: boolean; icon: LucideIcon }[] = [
    {
      n: "01", title: "Lead-Driven, Not Reach-Driven", tagline: "Every dollar buys an action, not a glance.",
      body: "The campaign objective is qualified leads and showroom visits. Reach metrics (impressions, CPM, frequency) will be monitored as health indicators — not optimized for. Every channel choice, audience build, and creative direction is selected for its ability to generate cost-efficient leads, not for its visibility.",
      color: G, dark: false, icon: Target,
    },
    {
      n: "02", title: "Finance-First Creative Hierarchy", tagline: "The number is the hero. The car is the supporting cast.",
      body: "The most powerful element in the brief is the SAR 1,051/month entry point combined with zero down payment. This is the hook — and it leads every creative across every format. Lifestyle, model showcase, and after-sales reassurance all sit underneath it. In a crowded KSA auto market, the clearest price wins.",
      color: B, dark: true, icon: Banknote,
    },
    {
      n: "03", title: "Trust as the Closer", tagline: "Price gets attention. Warranty gets the lead.",
      body: "The after-sales package (warranties + roadside assistance) is what turns a price-curious viewer into a qualified lead. It shows up on every bottom-of-funnel ad as the thing that closes the lead — not as a separate awareness message. No creative ships with the price unless the warranty proof sits alongside it.",
      color: A, dark: false, icon: ShieldCheck,
    },
  ];

  const funnelStages: { stage: string; goal: string; angle: string; color: string; icon: LucideIcon }[] = [
    { stage: "Awareness", goal: "Reach Jeddah-based car shoppers who haven't seen the offer yet.", angle: "Lifestyle + model showcase with price tag overlay.", color: B, icon: Eye },
    { stage: "Consideration", goal: "Build a retargetable pool of engaged viewers; make the offer click for them.", angle: "Per-model spotlights with installment, down payment, and warranty.", color: P, icon: Filter },
    { stage: "Conversion", goal: "Capture leads via lead forms and click-to-WhatsApp.", angle: "Direct offer creative with strong CTA and trust-layer reassurance.", color: G, icon: Target },
  ];

  const channels: { name: string; logo: string; sub: string; role: string; color: string; body: string; tags: string[] }[] = [
    { name: "Meta", logo: "/platforms/meta.jpg", sub: "Instagram + Facebook", role: "Lead-Gen Backbone", color: B, tags: ["Lead Forms", "Carousel", "Reels", "Retargeting"], body: "Carries the largest share of lead generation — built-in lead forms, strong retargeting, and deep car-buyer audience data. Reels and Stories carry the price-hook short-form. Carousels carry the per-model spotlight." },
    { name: "Snapchat", logo: "/platforms/snapchat.svg", sub: "Vertical Short-form", role: "Localized Reach in Jeddah", color: A, tags: ["City-level", "9:16 Video", "Click-to-WhatsApp"], body: "Snap is huge in KSA and lets us target Jeddah specifically — the cheapest way to reach the city without wasting spend elsewhere. Vertical video on the price hook + model spotlight, with click-to-WhatsApp as the primary path." },
    { name: "TikTok", logo: "/platforms/tiktok.jpg", sub: "Discovery + Creator-Style", role: "Consideration & Discovery", color: R, tags: ["Discovery Feed", "Creator Edits", "Family Context"], body: "Sits in the middle of the funnel — short-form video introducing models in family and city-driving scenarios. Creator-style edits of the offer usually outperform polished brand creative here." },
    { name: "Google Ads", logo: "/platforms/google.png", sub: "Search + YouTube", role: "High-Intent Capture", color: P, tags: ["Search Ads", "YouTube", "In-market Audiences"], body: "Search picks up the people already searching to buy — keywords like Soueast price, monthly installment, financing offers, dealer in Jeddah. YouTube runs awareness video against in-market and demographic audiences." },
  ];

  const pillars: { n: string; title: string; tagline: string; desc: string; format: string; color: string; dark: boolean; icon: LucideIcon }[] = [
    { n: "01", title: "Price Hook", tagline: "1,051 SAR/month leads every frame.",
      desc: "Every asset opens on the SAR 1,051/month figure. The number is the hero, the model the supporting cast. The down-payment claim (0%) sits adjacent to the price — never below it.",
      format: "Short-form video (6–15s) with motion on the number itself. Static visuals where each placement requires.",
      color: G, dark: false, icon: Banknote,
    },
    { n: "02", title: "Model Showcase", tagline: "S06 · S07 · S08 · S09 — each gets the spotlight.",
      desc: "Each of the four featured models gets a dedicated spotlight asset showing exterior, interior, and the model's specific monthly installment. Built once, sliced per platform.",
      format: "Carousel on Meta, vertical short-form on Snapchat and TikTok, single-image where required.",
      color: B, dark: true, icon: Car,
    },
    { n: "03", title: "Trust Layer", tagline: "Warranty + roadside ride alongside every price.",
      desc: "Warranty and roadside-assistance benefits show up as icons and short badges on every bottom-of-funnel ad. All three present together — never selectively.",
      format: "Icons + badges layered onto bottom-of-funnel creative.",
      color: A, dark: false, icon: ShieldCheck,
    },
    { n: "04", title: "Lifestyle", tagline: "Family, commute, Jeddah streets — context for the price.",
      desc: "Family, daily commuting, and Jeddah-specific urban driving contexts. The lifestyle layer reinforces affordability and ownership-confidence — it doesn't replace the offer.",
      format: "Awareness-stage primarily. Lifestyle as the bed for the price-hook overlay.",
      color: P, dark: true, icon: Heart,
    },
  ];

  const trustItems: { n: string; sub: string }[] = [
    { n: "6", sub: "Vehicle Warranty (Years)" },
    { n: "10", sub: "Engine Warranty (Years)" },
    { n: "6", sub: "Roadside Assistance (Years)" },
  ];

  const formFields: { name: string; type: string; req: "Required" | "Optional" }[] = [
    { name: "Full Name", type: "Text", req: "Required" },
    { name: "Mobile Number", type: "+966 default", req: "Required" },
    { name: "City", type: "Jeddah / Other", req: "Required" },
    { name: "Preferred Model", type: "Dropdown", req: "Required" },
    { name: "Best Time to Contact", type: "Time slot", req: "Optional" },
    { name: "Consent Checkbox", type: "Regulatory", req: "Required" },
  ];

  const kpiTiers: { tier: string; level: string; color: string; metrics: string[]; icon: LucideIcon }[] = [
    { tier: "Tier 1", level: "Primary KPIs", color: G, icon: Target,
      metrics: ["Cost per Qualified Lead", "Test Drive Bookings", "Showroom Visits from Jeddah"] },
    { tier: "Tier 2", level: "Secondary KPIs", color: B, icon: BarChart3,
      metrics: ["Cost per Lead (raw)", "Click-Through Rate", "Engagement Rate"] },
    { tier: "Tier 3", level: "Health Metrics", color: A, icon: TrendingUp,
      metrics: ["CPM", "Frequency", "Video Completion Rate", "Quality Score"] },
  ];

  const reporting: { cadence: string; label: string; desc: string; color: string }[] = [
    { cadence: "Daily", label: "Internal Monitoring", color: B,
      desc: "Spend pacing, CPL trend, anomaly alerts. Used to adjust within agreed budget thresholds." },
    { cadence: "Weekly", label: "Sunday Snapshot", color: G,
      desc: "One page: spend, leads, CPL, CTR, top + bottom creative, channel pacing, three action items for the coming week." },
    { cadence: "Monthly", label: "Performance Review", color: A,
      desc: "Within 3 working days of close. Full breakdown by channel, audience, creative — with lead-quality from sales and recommendations." },
  ];

  // June projection — provisional targets (prior-campaign performance + optimized June setup); lock after pre-launch data review.
  const projection: { name: string; tier: string; color: string; budget: string; leads: string }[] = [
    { name: "Meta", tier: "PRIMARY", color: B, budget: "11,250", leads: "~290" },
    { name: "Snapchat", tier: "CORE", color: A, budget: "6,250", leads: "~120" },
    { name: "TikTok", tier: "SUPPORT", color: R, budget: "4,500", leads: "~100" },
    { name: "Google Ads", tier: "SUPPORT", color: P, budget: "3,000", leads: "~50" },
  ];


  const openQuestions: { category: string; icon: LucideIcon; color: string; items: string[] }[] = [
    { category: "Performance Targets", icon: TrendingUp, color: G, items: [
      "CPL target — is there a benchmark from prior campaigns, or one set by leadership?",
      "What's the minimum number of leads for the campaign to be considered a success?",
      "Is the SAR 25,000 budget a typical monthly spend, or does it change by month and offer?",
    ]},
    { category: "Approval Chain", icon: ShieldCheck, color: B, items: [
      "Who at Motion Motors signs off on the media plan, the creative, and any budget shifts during the campaign?",
      "While the campaign is running, what budget % can I shift between channels without re-approval? (e.g., up to 15%)",
    ]},
    { category: "Creative Production", icon: Palette, color: P, items: [
      "Who's producing the creative — in-house team, an agency, or freelancers?",
      "When can creative be delivered? Will it land before the June 4 go-live deadline?",
      "Is there a brand guideline doc, logo pack, and a list of any must-have brand elements?",
    ]},
    { category: "Landing & Lead Routing", icon: Target, color: A, items: [
      "Conversion destination — confirming lead forms + WhatsApp without a landing page?",
      "Lead routing — CRM, shared inbox, or sales distribution? What SLA?",
      "WhatsApp number — dedicated business line or showroom number?",
    ]},
    { category: "Compliance & Finance", icon: FileText, color: R, items: [
      "ANB-approved language — pre-approved disclaimer copy required on creative?",
      "Eligibility criteria — pre-qualification step, or all leads handed to sales?",
    ]},
  ];

  const timeline: { date: string; action: string; owner: string; highlight?: boolean }[] = [
    { date: "June 2", action: "Approach document delivered.", owner: "Strategist" },
    { date: "June 2–3", action: "Platform access granted; May performance data shared.", owner: "Marketing leadership" },
    { date: "June 3–4", action: "May reviewed; final media plan with budget allocation + CPL targets.", owner: "Strategist" },
    { date: "June 4", action: "Final media plan approved; final creative approved (AR + EN).", owner: "Marketing leadership", highlight: true },
    { date: "June 5–6", action: "Campaign build, QA, pre-launch checklist across all platforms.", owner: "Strategist" },
    { date: "June 7", action: "Campaign goes LIVE (Sunday).", owner: "Strategist", highlight: true },
    { date: "Weekly", action: "Snapshot delivered every Sunday during live window.", owner: "Strategist" },
    { date: "July 3", action: "Monthly performance review (within 3 working days of close).", owner: "Strategist" },
  ];

  /* ═══════════ RENDER ═══════════ */

  return (
    <div ref={ref} style={{ background: "#fff", color: D }}>
      <SectionNav />
      <MotionMotorsChat />

      {/* ═══ HERO ═══ */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: "#fff" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] pointer-events-none" style={{ background: `radial-gradient(ellipse, ${G}18 0%, transparent 70%)` }} />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center">

          <div className="mm-hero opacity-0 mb-6" style={{ paddingTop: 40 }}>
            <img src="/logos/motion%20motors%20so.png" alt="Motion Motors × Soueast" className="h-20 md:h-24 mx-auto object-contain" />
          </div>
          <div className="mm-hero opacity-0 text-center mb-4">
            <p className="text-[13px] font-bold " style={{ color: "rgba(0,0,0,0.3)" }}>June 2, 2026</p>
          </div>

          <div className="mm-hero opacity-0 text-center mb-4">
            <h1 className="heading" style={{ fontSize: "clamp(44px, 10vw, 100px)", lineHeight: 1.1, color: D }}>
              Campaign Approach
            </h1>
          </div>

          <div className="mm-hero opacity-0 text-center mb-6">
            <p className=" text-lg md:text-xl" style={{ color: "rgba(0,0,0,0.5)" }}>
              June 2026 finance-led acquisition push across Soueast lineup
            </p>
            <p className="text-xl font-bold mt-2 heading" style={{ color: G }}>Motion Motors × Soueast</p>
          </div>

          {/* Prepared By */}
          <div className="mm-hero opacity-0 flex justify-center mb-10 w-full">
            <div className="rounded-[16px] p-5" style={{ background: "#fff", border: `2px solid ${G}`, boxShadow: `3px 3px 0px 0px ${D}` }}>
              <p className="text-[10px] font-bold uppercase mb-3 text-center" style={{ color: G }}>Prepared By</p>
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="text-center">
                  <p className="text-[14px] font-bold " style={{ color: D }}>Ahmed Ali</p>
                  <p className="text-[11px] " style={{ color: "rgba(0,0,0,0.4)" }}>Head of Digital Product and Growth</p>
                  <p className="text-[11px] " style={{ color: "rgba(0,0,0,0.3)" }}>ahmed.ali@emotiongrp.com</p>
                </div>
                <div className="hidden sm:block self-stretch w-px" style={{ background: "#EBEBEB" }} />
                <div className="text-center">
                  <p className="text-[14px] font-bold " style={{ color: D }}>Noman Shahid</p>
                  <p className="text-[11px] " style={{ color: "rgba(0,0,0,0.4)" }}>Digital Marketing Specialist</p>
                  <p className="text-[11px] " style={{ color: "rgba(0,0,0,0.3)" }}>noman.shahid@emotiongrp.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mm-hero opacity-0 mb-10 w-full max-w-2xl">
            <div className="flex items-stretch justify-center" style={{ background: "#fff", border: "1px solid #E8E8E8", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
              {[
                { n: "25K", l: "SAR Budget" },
                { n: "4", l: "Channels" },
                { n: "24", l: "Days Live" },
                { n: "4", l: "Models" },
              ].map((s, i) => (
                <div key={s.l} className="flex-1 flex flex-col items-center justify-center py-5 px-2 relative" style={{ borderRight: i > 0 ? "1px solid #F0F0F0" : "none" }}>
                  <span className="heading" style={{ fontSize: 28, lineHeight: 1, color: D }}>{s.n}</span>
                  <span className="text-[10px] font-bold mt-1 " style={{ color: "rgba(0,0,0,0.3)" }}>{s.l}</span>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-t-full" style={{ background: G }} />
                </div>
              ))}
            </div>
          </div>

          {/* Objective */}
          <div className="mm-hero opacity-0 rounded-[16px] p-6 text-center mb-10 max-w-2xl" style={{ background: `${G}08`, border: `1px solid ${G}20` }}>
            <p className="text-[13px]  font-medium leading-relaxed" style={{ color: D }}>
              <strong style={{ background: `${G}35`, color: D, padding: "1px 7px", borderRadius: 4 }}>Objective</strong>{" "}— Qualified leads and showroom visits in Jeddah for mid-income professionals and young families aged 25–45.
            </p>
            <p className="text-[12px]  mt-2" style={{ color: "rgba(0,0,0,0.5)" }}>
              <strong>Go-live deadline:</strong> approved AR/EN visuals + finalized media plan by June 4
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="mm-hero opacity-0 flex flex-col items-center gap-2">
            <div style={{ width: 24, height: 38, border: "1.5px solid rgba(0,0,0,0.14)", borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 5 }}>
              <div style={{ width: 3, height: 6, borderRadius: 2, background: G, animation: "mouseScrollMM 1.6s ease-in-out infinite" }} />
            </div>
          </div>
        </div>

        <style>{`@keyframes mouseScrollMM{0%{transform:translateY(0);opacity:1}75%{transform:translateY(9px);opacity:0}76%{transform:translateY(0);opacity:0}100%{opacity:1}}`}</style>
      </section>

      {/* ═══ 01 BRIEF ACKNOWLEDGMENT ═══ */}
      <section id="section-01" className="mm-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="heading text-lg mb-3" style={{ color: G }}>Section 01</p>
            <h2 className="heading text-4xl md:text-5xl mb-5">Brief Acknowledgment</h2>
            <p className="text-sm max-w-lg mx-auto " style={{ color: "rgba(0,0,0,0.5)" }}>Confirming the campaign as I read it, and the go-live deadline.</p>
          </div>

          <div className="rounded-[20px] p-8 md:p-10 mb-8" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
            <p className="text-[14px]  leading-[2] mb-4" style={{ color: D }}>
              The June 2026 campaign is a <strong style={{ background: `${P}25`, color: D, padding: "1px 7px", borderRadius: 4 }}>finance-led acquisition push</strong> across the Soueast lineup, anchored by an ANB monthly-installment offer starting from <strong style={{ background: `${A}30`, color: D, padding: "1px 7px", borderRadius: 4 }}>SAR 1,051/month with 0% down</strong>, and reinforced by a long-tail after-sales proposition.
            </p>
            <p className="text-[14px]  leading-[2]" style={{ color: "rgba(0,0,0,0.6)" }}>
              The objective is qualified leads and showroom visits in Jeddah. Budget: SAR 25,000 across Meta, Snapchat, TikTok, and Google. Live window: <strong>June 7 → June 30, 2026</strong>. Go-live deadline: approved AR/EN visuals and a finalized media plan by June 4.
            </p>
          </div>

          {/* Audience */}
          <p className="heading text-lg mb-4 text-center">Target Audience</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 mm-stagger">
            {audience.map((a) => (
              <div key={a.label} className="mm-item rounded-[16px] p-5 flex items-center gap-3" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${a.color}15` }}>
                  <a.icon size={16} color={a.color} />
                </div>
                <p className="text-[12px] font-bold" style={{ color: D }}>{a.label}</p>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="rounded-[16px] p-5 flex items-start gap-3" style={{ background: `${A}08`, border: `1px solid ${A}25` }}>
            <AlertCircle size={18} color={A} className="flex-shrink-0 mt-0.5" />
            <p className="text-[13px]  leading-relaxed" style={{ color: D }}>
              <strong style={{ color: A }}>Note: </strong>
              This is a planning approach — not a finalized media plan. Final budget allocation per channel and per ad set will be set after I review May 2026 campaign performance.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ 02 STRATEGIC APPROACH ═══ */}
      <section id="section-02" className="mm-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="heading text-lg mb-3" style={{ color: G }}>Section 02</p>
            <h2 className="heading text-4xl md:text-5xl mb-5">Strategic <span style={{ color: G }}>Approach</span></h2>
            <p className="text-sm max-w-lg mx-auto " style={{ color: "rgba(0,0,0,0.5)" }}>Three principles shape every decision in this campaign.</p>
          </div>

          <div className="flex flex-col gap-8 mm-stagger">
            {principles.map((p) => (
              <div key={p.n} className="mm-item rounded-[24px] overflow-hidden" style={{ border: `2px solid ${p.color}25`, boxShadow: "0 2px 20px rgba(0,0,0,0.04)" }}>
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-[240px] flex-shrink-0 p-8 flex flex-col items-center justify-center text-center" style={{ background: p.color }}>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background: p.dark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.08)" }}>
                      <p.icon size={22} color={p.dark ? "#fff" : D} />
                    </div>
                    <div className="text-[9px] font-bold uppercase mb-1" style={{ color: p.dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.4)" }}>Principle</div>
                    <div className="heading text-5xl mb-2" style={{ color: p.dark ? "#fff" : D }}>{p.n}</div>
                  </div>
                  <div className="flex-1 p-7 md:p-9 bg-white">
                    <h3 className="heading text-2xl mb-2" style={{ color: D }}>{p.title}</h3>
                    <p className="text-[13px] font-bold mb-4" style={{ color: p.color }}>{p.tagline}</p>
                    <p className="text-[14px] leading-[1.95] " style={{ color: "rgba(0,0,0,0.65)" }}>{p.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 03 FUNNEL & CHANNELS ═══ */}
      <section id="section-03" className="mm-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="heading text-lg mb-3" style={{ color: G }}>Section 03</p>
            <h2 className="heading text-4xl md:text-5xl mb-5" style={{ color: "#fff" }}>Funnel Logic & <span style={{ color: G }}>Channel Approach</span></h2>
            <p className="text-sm max-w-lg mx-auto " style={{ color: "rgba(255,255,255,0.6)" }}>Three funnel stages run in parallel — four channels, each with a distinct role and a clear priority.</p>
          </div>

          {/* Funnel stages */}
          <div className="mb-12">
            <h3 className="heading text-xl text-center mb-8" style={{ color: "#fff" }}>The Funnel</h3>
            <div className="flex flex-col gap-3 mm-stagger">
              {funnelStages.map((s, i) => (
                <div key={s.stage} className="mm-item rounded-[16px] p-5 flex items-start gap-4 transition-all duration-200 hover:-translate-y-0.5" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1" style={{ background: `${s.color}12` }}>
                    <s.icon size={18} color={s.color} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h4 className="text-[14px] font-bold heading" style={{ color: D }}>{s.stage}</h4>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold " style={{ background: `${s.color}15`, color: s.color }}>Stage 0{i + 1}</span>
                    </div>
                    <p className="text-[12px] leading-relaxed  mb-1" style={{ color: "rgba(0,0,0,0.6)" }}>
                      <strong style={{ color: D }}>Goal · </strong>{s.goal}
                    </p>
                    <p className="text-[12px] leading-relaxed " style={{ color: "rgba(0,0,0,0.5)" }}>
                      <strong style={{ color: D }}>Creative angle · </strong>{s.angle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Channels */}
          <div>
            <h3 className="heading text-xl text-center mb-8" style={{ color: "#fff" }}>The Channels</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mm-stagger">
              {channels.map((c) => (
                <div key={c.name} className="mm-item rounded-[20px] p-6" style={{ background: "#fff", border: `1px solid ${c.color}25` }}>
                  <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0" style={{ background: "#fff", border: `1px solid ${c.color}25` }}>
                        <img src={c.logo} alt={c.name} className="w-full h-full object-contain" style={{ padding: c.name === "Meta" || c.name === "TikTok" ? 0 : 6 }} />
                      </div>
                      <div>
                        <h4 className="heading text-lg" style={{ color: D }}>{c.name}</h4>
                        <p className="text-[10px] " style={{ color: "rgba(0,0,0,0.4)" }}>{c.sub}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold " style={{ background: `${c.color}12`, color: c.color }}>{c.role}</span>
                  </div>
                  <p className="text-[12px] leading-relaxed  mb-3" style={{ color: "rgba(0,0,0,0.55)" }}>{c.body}</p>
                  <div className="flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full text-[10px] font-bold " style={{ background: "#FAFAFA", color: "rgba(0,0,0,0.5)", border: "1px solid #EEE" }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Media Plan — platform focus (qualitative priority; exact % split locked after the May 2026 data review) */}
          <div className="mt-16">
            <h3 className="heading text-xl text-center mb-2" style={{ color: "#fff" }}>Media Plan — <span style={{ color: G }}>Platform Focus</span></h3>
            <p className="text-[12px] text-center max-w-xl mx-auto mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>Where the weight goes across the four channels. The exact budget split per channel is locked after the May 2026 data review.</p>
            <div className="flex flex-col gap-3 mm-stagger">
              {[
                { tier: "Primary", emphasis: 4, name: "Meta", color: B, role: "Lead-gen backbone — carries the largest share of lead generation." },
                { tier: "Core", emphasis: 3, name: "Snapchat", color: A, role: "Localized reach in Jeddah — the cheapest way to own the city." },
                { tier: "Support", emphasis: 2, name: "TikTok", color: R, role: "Discovery & consideration — creator-style edits." },
                { tier: "Support", emphasis: 2, name: "Google Ads", color: P, role: "High-intent capture — Search + YouTube." },
              ].map((m) => (
                <div key={m.name} className="mm-item rounded-[16px] p-5 flex items-center gap-4" style={{ background: "#fff", border: `1px solid ${m.color}25` }}>
                  <span className="px-3 py-1.5 rounded-full text-[10px] font-bold flex-shrink-0" style={{ background: `${m.color}15`, color: m.color, minWidth: 78, textAlign: "center" }}>{m.tier}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="heading text-base" style={{ color: D }}>{m.name}</h4>
                    <p className="text-[12px] leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>{m.role}</p>
                  </div>
                  <div className="flex gap-1 flex-shrink-0" title="Relative emphasis">
                    {[0, 1, 2, 3].map((i) => (
                      <span key={i} className="block rounded-full" style={{ width: 8, height: 8, background: i < m.emphasis ? m.color : "rgba(0,0,0,0.12)" }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 04 CREATIVE PILLARS ═══ */}
      <section id="section-04" className="mm-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="heading text-lg mb-3" style={{ color: G }}>Section 04</p>
            <h2 className="heading text-4xl md:text-5xl mb-5">Creative <span style={{ color: G }}>Briefing</span></h2>
            <p className="text-sm max-w-lg mx-auto " style={{ color: "rgba(0,0,0,0.5)" }}>Four content pillars. Same priority order on every asset.</p>
          </div>

          {/* NOTE (Ahmed): Creative is NOT final — visuals, content, and captions are still being reviewed with Bashar & Joseph. Remove this banner once approved. */}
          <div className="rounded-[16px] p-5 flex items-start gap-3 mb-10" style={{ background: `${A}0F`, border: `1.5px dashed ${A}` }}>
            <AlertCircle size={18} color={A} className="flex-shrink-0 mt-0.5" />
            <p className="text-[13px] leading-relaxed" style={{ color: D }}>
              <strong style={{ color: A }}>Under review: </strong>
              The visuals, content, and captions in this section are still being reviewed with <strong>Bashar</strong> and <strong>Joseph</strong> — not final yet.
            </p>
          </div>

          <div className="flex flex-col gap-6 mb-10 mm-stagger">
            {pillars.map((p) => (
              <div key={p.n} className="mm-item rounded-[24px] overflow-hidden" style={{ border: `2px solid ${p.color}25`, boxShadow: "0 2px 20px rgba(0,0,0,0.04)" }}>
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-[220px] flex-shrink-0 p-7 flex flex-col items-center justify-center text-center" style={{ background: p.color }}>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background: p.dark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.08)" }}>
                      <p.icon size={22} color={p.dark ? "#fff" : D} />
                    </div>
                    <div className="text-[9px] font-bold uppercase mb-1" style={{ color: p.dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.4)" }}>Pillar</div>
                    <div className="heading text-4xl mb-1" style={{ color: p.dark ? "#fff" : D }}>{p.n}</div>
                    <div className="heading text-base" style={{ color: p.dark ? "#fff" : D }}>{p.title}</div>
                  </div>
                  <div className="flex-1 p-7 md:p-8 bg-white">
                    <p className="text-[12px] font-bold mb-3" style={{ color: p.color }}>{p.tagline}</p>
                    <p className="text-[13px] leading-[1.9]  mb-4" style={{ color: "rgba(0,0,0,0.65)" }}>{p.desc}</p>
                    <div className="rounded-[12px] p-3" style={{ background: "#FAFAFA", border: "1px solid #EEE" }}>
                      <p className="text-[10px] font-bold  uppercase mb-1 " style={{ color: p.color }}>Format</p>
                      <p className="text-[12px] " style={{ color: "rgba(0,0,0,0.6)" }}>{p.format}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Layer items */}
          <div className="rounded-[20px] p-7 mb-8" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
            <p className="heading text-lg text-center mb-5" style={{ color: D }}>After-Sales Trust Layer</p>
            <div className="grid grid-cols-3 gap-4">
              {trustItems.map((t) => (
                <div key={t.sub} className="text-center rounded-[14px] p-5" style={{ background: `${G}08`, border: `1px solid ${G}25` }}>
                  <div className="heading mb-1" style={{ fontSize: 38, color: D, lineHeight: 1 }}>{t.n}</div>
                  <p className="text-[11px] font-bold " style={{ color: "rgba(0,0,0,0.55)" }}>{t.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bilingual mandate */}
          <div className="rounded-[20px] p-7" style={{ background: G, border: `2px solid ${D}`, boxShadow: `4px 4px 0px 0px ${D}` }}>
            <h4 className="heading text-xl mb-2" style={{ color: D }}>Arabic-Native Creative</h4>
            <p className="text-[13px] leading-relaxed" style={{ color: "rgba(0,0,0,0.7)" }}>
              Every asset is composed natively in Arabic for the Saudi market — not translated. Compliance disclaimers are present and vetted with the finance partner before launch.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ 05 LEAD HANDLING ═══ */}
      <section id="section-05" className="mm-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="heading text-lg mb-3" style={{ color: G }}>Section 05</p>
            <h2 className="heading text-4xl md:text-5xl mb-5">Lead Handling & <span style={{ color: G }}>Conversion Path</span></h2>
            <p className="text-sm max-w-lg mx-auto " style={{ color: "rgba(0,0,0,0.5)" }}>From ad click to qualified lead in the CRM — no friction lost in between.</p>
          </div>

          {/* Flow */}
          <div className="rounded-[20px] p-7 mb-10" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
            <p className="heading text-base text-center mb-6" style={{ color: D }}>The Conversion Path</p>
            <div className="flex flex-col md:flex-row items-stretch gap-3">
              <FlowStep n="01" title="Ad Click" sub="Conversion creative" icon={Megaphone} color={B} />
              <ArrowRight size={20} color="rgba(0,0,0,0.2)" className="hidden md:block self-center flex-shrink-0" />
              <ArrowDown size={20} color="rgba(0,0,0,0.2)" className="md:hidden self-center" />
              <div className="flex-1 flex flex-col gap-2 justify-center">
                <div className="rounded-[14px] p-3 flex items-center gap-2 justify-center" style={{ background: `${G}08`, border: `1px solid ${G}30` }}>
                  <FileText size={14} color={G} />
                  <p className="text-[12px] font-bold " style={{ color: D }}>Lead Form</p>
                </div>
                <div className="rounded-[14px] p-3 flex items-center gap-2 justify-center" style={{ background: `${A}08`, border: `1px solid ${A}30` }}>
                  <FaWhatsapp size={14} color={A} />
                  <p className="text-[12px] font-bold " style={{ color: D }}>WhatsApp</p>
                </div>
              </div>
              <ArrowRight size={20} color="rgba(0,0,0,0.2)" className="hidden md:block self-center flex-shrink-0" />
              <ArrowDown size={20} color="rgba(0,0,0,0.2)" className="md:hidden self-center" />
              <FlowStep n="03" title="CRM Record" sub="Attribution preserved" icon={Database} color={P} />
              <ArrowRight size={20} color="rgba(0,0,0,0.2)" className="hidden md:block self-center flex-shrink-0" />
              <ArrowDown size={20} color="rgba(0,0,0,0.2)" className="md:hidden self-center" />
              <FlowStep n="04" title="Sales Contact" sub="Within 30 min" icon={Phone} color={G} highlight />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Form Fields */}
            <div className="rounded-[20px] p-7" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
              <p className="text-[10px] font-bold  uppercase  mb-1" style={{ color: G }}>Lead Form</p>
              <h4 className="heading text-xl mb-2" style={{ color: D }}>Six fields. No friction.</h4>
              <p className="text-[12px]  mb-5" style={{ color: "rgba(0,0,0,0.5)" }}>Balanced between qualification and conversion rate.</p>
              <div className="flex flex-col gap-2 mm-stagger">
                {formFields.map((f, i) => (
                  <div key={f.name} className="mm-item rounded-[12px] p-3 flex items-center justify-between gap-3" style={{ background: "#FAFAFA", border: "1px solid #F0F0F0" }}>
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold flex-shrink-0 heading" style={{ background: `${G}15`, color: D }}>{i + 1}</span>
                      <div>
                        <p className="font-bold text-[12.5px] " style={{ color: D }}>{f.name}</p>
                        <p className="text-[10px] " style={{ color: "rgba(0,0,0,0.4)" }}>{f.type}</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold  px-2 py-1 rounded" style={{ background: f.req === "Required" ? `${R}12` : `${B}12`, color: f.req === "Required" ? R : B }}>{f.req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SLA + WhatsApp */}
            <div className="rounded-[20px] p-7" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
              <p className="text-[10px] font-bold  uppercase  mb-1" style={{ color: A }}>Click-to-WhatsApp</p>
              <h4 className="heading text-xl mb-2" style={{ color: D }}>Pre-filled & Attributed</h4>
              <p className="text-[12px]  mb-5" style={{ color: "rgba(0,0,0,0.5)" }}>Pre-filled message keeps campaign + ad set attribution alive even after the conversation moves into WhatsApp.</p>

              {/* Sample message */}
              <div className="rounded-[14px] p-4 mb-4" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
                <div className="rounded-[10px] p-3" style={{ background: "#fff", border: `1px solid ${G}30` }}>
                  <p className="text-[12px]  leading-relaxed" style={{ color: D }}>
                    "Hi, I'm interested in the Soueast offer (1,051 SAR/month, 0% down)."
                  </p>
                  <p className="text-[10px] font-mono mt-2" style={{ color: "rgba(0,0,0,0.4)" }}>
                    Source: meta_jun2026_conversion_s07
                  </p>
                </div>
              </div>

              {/* SLA */}
              <div className="rounded-[14px] p-4 flex items-start gap-3" style={{ background: `${G}08`, border: `1px solid ${G}25` }}>
                <Clock size={16} color={G} className="flex-shrink-0 mt-0.5" />
                <p className="text-[12px]  leading-relaxed" style={{ color: D }}>
                  <strong style={{ background: `${R}25`, color: D, padding: "1px 7px", borderRadius: 4 }}>30-min SLA</strong>{" "}— Lead-to-first-contact within 30 minutes is the conversion threshold for KSA auto. Beyond that, conversion drops sharply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 06 MEASUREMENT ═══ */}
      <section id="section-06" className="mm-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="heading text-lg mb-3" style={{ color: G }}>Section 06</p>
            <h2 className="heading text-4xl md:text-5xl mb-5" style={{ color: "#fff" }}>Projections, Targets & <span style={{ color: G }}>Reporting</span></h2>
            <p className="text-sm max-w-2xl mx-auto " style={{ color: "rgba(255,255,255,0.6)" }}>What SAR 25,000 is projected to deliver in Jeddah — and how I&apos;ll measure it.</p>
          </div>

          {/* June Projection */}
          <div className="mb-12">
            <h3 className="heading text-xl text-center mb-2" style={{ color: "#fff" }}>Projected <span style={{ color: G }}>Results</span></h3>
            <p className="text-[12px] text-center mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>SAR 25,000 · June 7–30 · Jeddah · priority-weighted across the four channels</p>
            <div className="rounded-[20px] p-5 md:p-6 overflow-x-auto mb-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 460 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
                    {["Channel", "Budget", "Proj. Leads"].map((h, i) => (
                      <th key={h} style={{ textAlign: i === 0 ? "left" : "right", padding: "8px 12px", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-bricolage), sans-serif" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {projection.map((r) => (
                    <tr key={r.name} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                      <td style={{ padding: "11px 12px", fontSize: 13, fontWeight: 700, color: "#fff", fontFamily: "var(--font-bricolage), sans-serif" }}>
                        {r.name} <span style={{ fontSize: 9, fontWeight: 700, color: r.color }}>{r.tier}</span>
                      </td>
                      <td style={{ padding: "11px 12px", textAlign: "right", fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{r.budget}</td>
                      <td style={{ padding: "11px 12px", textAlign: "right", fontSize: 14, fontWeight: 700, color: G }}>{r.leads}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-[16px] p-5 text-center" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <p className="text-[10px] font-bold uppercase mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>Expected</p>
                <p className="heading" style={{ fontSize: 30, color: "#fff", lineHeight: 1 }}>~510</p>
                <p className="text-[11px] mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>qualified leads</p>
              </div>
              <div className="rounded-[16px] p-5 text-center" style={{ background: G, border: `2px solid ${D}` }}>
                <p className="text-[10px] font-bold uppercase mb-1" style={{ color: "rgba(0,0,0,0.5)" }}>Target</p>
                <p className="heading" style={{ fontSize: 30, color: D, lineHeight: 1 }}>~560</p>
                <p className="text-[11px] mt-1" style={{ color: "rgba(0,0,0,0.6)" }}>leads · CPL ≤ 45 SR</p>
              </div>
              <div className="rounded-[16px] p-5 text-center" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <p className="text-[10px] font-bold uppercase mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>Stretch</p>
                <p className="heading" style={{ fontSize: 30, color: "#fff", lineHeight: 1 }}>~620</p>
                <p className="text-[11px] mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>with full optimization</p>
              </div>
            </div>
            <p className="text-[10px] mt-4 text-center" style={{ color: "rgba(255,255,255,0.35)" }}>* Projected from prior-campaign performance and the optimized June setup — lead forms + click-to-WhatsApp and a Meta-led split. Targets lock after the pre-launch data review.</p>
          </div>

          {/* KPI Tiers */}
          <div className="mb-12">
            <h3 className="heading text-xl text-center mb-8" style={{ color: "#fff" }}>KPI Hierarchy</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mm-stagger">
              {kpiTiers.map((t) => (
                <div key={t.tier} className="mm-item rounded-[20px] p-6" style={{ background: "#fff", border: `1px solid ${t.color}30` }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${t.color}15` }}>
                      <t.icon size={20} color={t.color} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold  uppercase " style={{ color: t.color }}>{t.tier}</p>
                      <h4 className="heading text-base" style={{ color: D }}>{t.level}</h4>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {t.metrics.map((m) => (
                      <div key={m} className="flex items-start gap-2">
                        <CheckCircle2 size={14} color={t.color} className="flex-shrink-0 mt-0.5" />
                        <span className="text-[12px] " style={{ color: "rgba(0,0,0,0.65)" }}>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reporting Cadence */}
          <div>
            <h3 className="heading text-xl text-center mb-8" style={{ color: "#fff" }}>Reporting Cadence</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mm-stagger">
              {reporting.map((r) => (
                <div key={r.cadence} className="mm-item rounded-[20px] p-6" style={{ background: "#fff", border: `1px solid ${r.color}25` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${r.color}15` }}>
                      <Calendar size={18} color={r.color} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold  uppercase " style={{ color: r.color }}>{r.cadence}</p>
                      <h4 className="heading text-base" style={{ color: D }}>{r.label}</h4>
                    </div>
                  </div>
                  <p className="text-[12px]  leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 07 OPEN QUESTIONS ═══ */}
      <section id="section-07" className="mm-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="heading text-lg mb-3" style={{ color: G }}>Section 07</p>
            <h2 className="heading text-4xl md:text-5xl mb-5">Open <span style={{ color: G }}>Questions</span> for Alignment</h2>
            <p className="text-sm max-w-lg mx-auto " style={{ color: "rgba(0,0,0,0.5)" }}>Five things to lock down before June 7.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mm-stagger">
            {openQuestions.map((q, i) => (
              <div key={q.category} className={`mm-item rounded-[20px] p-6 ${i === openQuestions.length - 1 && openQuestions.length % 2 === 1 ? "md:col-span-2" : ""}`} style={{ background: "#fff", border: `1px solid ${q.color}25` }}>
                <div className="flex items-center gap-3 mb-4 pb-4" style={{ borderBottom: "1px dashed #EEE" }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${q.color}15` }}>
                    <q.icon size={18} color={q.color} />
                  </div>
                  <div className="flex-1">
                    <h4 className="heading text-lg" style={{ color: D }}>{q.category}</h4>
                    <p className="text-[10px] font-bold " style={{ color: q.color }}>{q.items.length} questions</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  {q.items.map((item, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5 heading" style={{ background: `${q.color}15`, color: q.color }}>?</span>
                      <p className="text-[12px]  leading-relaxed" style={{ color: "rgba(0,0,0,0.65)" }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 08 TIMELINE ═══ */}
      <section id="section-08" className="mm-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="heading text-lg mb-3" style={{ color: G }}>Section 08</p>
            <h2 className="heading text-4xl md:text-5xl mb-5">Next Steps & <span style={{ color: G }}>Timeline</span></h2>
            <p className="text-sm max-w-lg mx-auto " style={{ color: "rgba(0,0,0,0.5)" }}>From today to live — five days of preparation, twenty-four days of optimization.</p>
          </div>

          <div className="overflow-x-auto rounded-[20px] border" style={{ borderColor: "#EBEBEB" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
              <thead>
                <tr style={{ background: D }}>
                  <th style={{ padding: "14px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, color: G, fontFamily: "var(--font-bricolage), system-ui, sans-serif" }}>Date</th>
                  <th style={{ padding: "14px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#fff", fontFamily: "var(--font-bricolage), system-ui, sans-serif" }}>Action</th>
                  <th style={{ padding: "14px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-bricolage), system-ui, sans-serif" }}>Owner</th>
                </tr>
              </thead>
              <tbody>
                {timeline.map((row, i) => (
                  <tr key={i} style={{ background: row.highlight ? `${G}10` : i % 2 === 0 ? "#fff" : "#FAFAFA", borderBottom: "1px solid #F3F4F6" }}>
                    <td style={{ padding: "14px 20px", fontSize: 12, fontWeight: 700, color: row.highlight ? D : "rgba(0,0,0,0.7)", fontFamily: "var(--font-bricolage), system-ui, sans-serif" }}>
                      {row.highlight && <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ background: G }} />}
                      {row.date}
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: 13, fontWeight: row.highlight ? 700 : 500, color: D, fontFamily: "var(--font-bricolage), system-ui, sans-serif" }}>{row.action}</td>
                    <td style={{ padding: "14px 20px", fontSize: 11, color: "rgba(0,0,0,0.5)", fontFamily: "var(--font-bricolage), system-ui, sans-serif" }}>{row.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══ CLOSING ═══ */}
      <section className="mm-slide opacity-0" style={{ padding: "80px 24px 60px", background: "#fff" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-[24px] p-10 md:p-14 mb-8" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
            <img src="/logos/motion%20motors%20so.png" alt="Motion Motors × Soueast" className="h-16 md:h-20 object-contain mx-auto mb-6" />
            <p className="text-[14px] font-bold " style={{ color: D }}>Ahmed Ali</p>
            <p className="text-[12px] " style={{ color: G }}>Head of Digital Product and Growth</p>
            <p className="text-[12px]  mt-1" style={{ color: "rgba(0,0,0,0.4)" }}>ahmed.ali@emotiongrp.com | ahmedali.online</p>

            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <a href="https://wa.me/201011648156" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold" style={{ background: G, color: D, border: `2px solid ${D}`, boxShadow: `3px 3px 0px 0px ${D}`, textDecoration: "none" }}>
                <FaWhatsapp size={16} /> WhatsApp
              </a>
              <a href="mailto:ahmed.ali@emotiongrp.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold" style={{ background: "#fff", color: D, border: `2px solid ${D}`, boxShadow: `3px 3px 0px 0px ${D}`, textDecoration: "none" }}>
                <Send size={14} /> Email
              </a>
            </div>
          </div>

          <p className="text-[11px] " style={{ color: "rgba(0,0,0,0.15)" }}>
            &copy; {new Date().getFullYear()} Ahmed Ali. Motion Motors × Soueast · June 2026 Campaign Approach · Confidential.
          </p>
        </div>
      </section>
    </div>
  );
}

/* ═══════════ HELPERS ═══════════ */

function FlowStep({ n, title, sub, icon: Icon, color, highlight }: { n: string; title: string; sub: string; icon: LucideIcon; color: string; highlight?: boolean }) {
  return (
    <div className="flex-1 rounded-[14px] p-4 text-center" style={{
      background: highlight ? G : "#FAFAFA",
      border: highlight ? `2px solid ${D}` : "1px solid #F0F0F0",
      boxShadow: highlight ? `2px 2px 0px 0px ${D}` : "none",
    }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ background: highlight ? D : `${color}15` }}>
        <Icon size={18} color={highlight ? G : color} />
      </div>
      <p className="text-[9px] font-bold  uppercase " style={{ color: highlight ? "rgba(0,0,0,0.5)" : color }}>Step {n}</p>
      <p className="heading text-sm mt-1" style={{ color: D }}>{title}</p>
      <p className="text-[10px]  mt-0.5" style={{ color: highlight ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.5)" }}>{sub}</p>
    </div>
  );
}

const NAV_ITEMS: { id: string; label: string; color: string; tourDesc: string }[] = [
  { id: "section-01", label: "Brief", color: "#4FFFB0",
    tourDesc: "Quick recap of the campaign as I read it — budget, audience, live window, and the readiness deadline." },
  { id: "section-02", label: "Strategic Approach", color: "#3B82F6",
    tourDesc: "The three principles that shape every channel choice and creative decision in this campaign." },
  { id: "section-03", label: "Funnel & Channels", color: "#8B5CF6",
    tourDesc: "How the funnel splits across the four platforms and what each channel is buying us." },
  { id: "section-04", label: "Creative Briefing", color: "#F59E0B",
    tourDesc: "Four content pillars and the consistent hierarchy applied across every asset." },
  { id: "section-05", label: "Lead Handling", color: "#10B981",
    tourDesc: "From ad click to qualified lead in the CRM — the conversion path and the 30-minute SLA that protects it." },
  { id: "section-06", label: "Projections & KPIs", color: "#0EA5E9",
    tourDesc: "Projected results for the SAR 25,000 budget, the KPI tiers I track, and the reporting cadence." },
  { id: "section-07", label: "Open Questions", color: "#A855F7",
    tourDesc: "The handful of items I need answered to lock the plan and protect the launch date." },
  { id: "section-08", label: "Timeline", color: "#0A0A0A",
    tourDesc: "Day-by-day from today through June 7 launch and out to the monthly review on July 3." },
];

const DRAG_NOTE = {
  title: "Move this widget anywhere",
  desc: "Drag the header (logo + photo area) and place this navigator wherever fits your reading — left, right, top, bottom. It remembers where you put it.",
};

function SectionNav() {
  const [active, setActive] = useState<string>("section-01");
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [tourIdx, setTourIdx] = useState<number | null>(null);
  const [tipPos, setTipPos] = useState<{ x: number; y: number; placement: "left" | "right" } | null>(null);
  const dragOffset = useRef<{ x: number; y: number } | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const NAV_W = 240;
  const TIP_W = 320;
  const TOUR_LEN = NAV_ITEMS.length + 1; // sections + drag note

  // Init position from localStorage or default to right-center
  useEffect(() => {
    let initial: { x: number; y: number } | null = null;
    try {
      const saved = localStorage.getItem("mm-nav-pos");
      if (saved) initial = JSON.parse(saved);
    } catch {}
    if (!initial) {
      const h = navRef.current?.offsetHeight ?? 480;
      initial = {
        x: window.innerWidth - NAV_W - 16,
        y: Math.max(16, window.innerHeight / 2 - h / 2),
      };
    }
    // clamp inside viewport
    const h = navRef.current?.offsetHeight ?? 480;
    initial.x = Math.max(8, Math.min(window.innerWidth - NAV_W - 8, initial.x));
    initial.y = Math.max(8, Math.min(window.innerHeight - h - 8, initial.y));
    setPos(initial);
  }, []);

  // Section observer
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[id^='section-']");
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

  // Onboarding tour — start on first visit
  useEffect(() => {
    let done = false;
    try { done = localStorage.getItem("mm-tour-done") === "1"; } catch {}
    if (done) return;
    const t = setTimeout(() => setTourIdx(0), 1200);
    return () => clearTimeout(t);
  }, []);

  const finishTour = () => {
    setTourIdx(null);
    try { localStorage.setItem("mm-tour-done", "1"); } catch {}
  };
  const nextTour = () => {
    if (tourIdx === null) return;
    if (tourIdx >= TOUR_LEN - 1) finishTour();
    else setTourIdx(tourIdx + 1);
  };

  // ESC closes tour, Enter/→ advances
  useEffect(() => {
    if (tourIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finishTour();
      else if (e.key === "ArrowRight" || e.key === "Enter") nextTour();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tourIdx]);

  // Compute tooltip position anchored to current widget item / drag handle
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
    ? "#4FFFB0"
    : tourIdx !== null
      ? NAV_ITEMS[tourIdx].color
      : "#4FFFB0";

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Drag handlers (pointer events for mouse + touch)
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

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragOffset.current) return;
    dragOffset.current = null;
    setDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
    document.body.style.userSelect = "";
    if (pos) {
      try { localStorage.setItem("mm-nav-pos", JSON.stringify(pos)); } catch {}
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
      }}
    >
      {/* Drag handle / Header — logo + Ahmed */}
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
        {/* Top row: logo */}
        <div className="flex items-center justify-center">
          <img
            src="/logos/motion%20motors%20so.png"
            alt="Motion Motors × Soueast"
            className="object-contain pointer-events-none"
            style={{ height: 36, maxWidth: 140, width: "auto" }}
            draggable={false}
          />
        </div>
        {/* Drag indicator */}
        <div className="flex items-center justify-center gap-1 pt-1.5" style={{ opacity: 0.35 }}>
          <span className="block rounded-full" style={{ width: 3, height: 3, background: "#0A0A0A" }} />
          <span className="block rounded-full" style={{ width: 3, height: 3, background: "#0A0A0A" }} />
          <span className="block rounded-full" style={{ width: 3, height: 3, background: "#0A0A0A" }} />
          <span className="block rounded-full" style={{ width: 3, height: 3, background: "#0A0A0A" }} />
          <span className="block rounded-full" style={{ width: 3, height: 3, background: "#0A0A0A" }} />
        </div>
      </div>

      {/* Sections */}
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
                className="heading text-[11.5px] flex-shrink-0"
                style={{
                  color: showAccent ? "#0A0A0A" : "rgba(0,0,0,0.35)",
                  fontWeight: showAccent ? 500 : 400,
                  letterSpacing: 0,
                  width: 18,
                  fontVariantNumeric: "tabular-nums",
                  transition: "color 350ms",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="heading text-[11.5px] truncate flex-1"
                style={{
                  color: showAccent ? "#0A0A0A" : "rgba(0,0,0,0.5)",
                  fontWeight: showAccent ? 500 : 400,
                  letterSpacing: 0,
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

      {/* Backdrop blur during tour */}
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

      {/* Tour tooltip — positioned next to highlighted widget item */}
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
          }}
          role="dialog"
          aria-label="Onboarding"
        >
          {/* Pointer arrow */}
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

          {/* Progress bar */}
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
              <span className="heading text-[10px] uppercase" style={{ color: "rgba(0,0,0,0.45)" }}>
                {isDragStep ? "Pro tip" : `Step ${String(tourIdx + 1).padStart(2, "0")} of ${String(TOUR_LEN).padStart(2, "0")}`}
              </span>
            </div>

            <h3 className="heading text-lg mb-1.5" style={{ color: "#0A0A0A", lineHeight: 1.2 }}>
              {tourTitle}
            </h3>
            <p className="text-[12.5px] leading-relaxed mb-4" style={{ color: "rgba(0,0,0,0.65)" }}>
              {tourDesc}
            </p>

            <button
              onClick={nextTour}
              className="w-full py-2.5 rounded-full heading text-[12px] cursor-pointer border-0"
              style={{
                background: tourColor,
                color: tourColor === "#0A0A0A" ? "#fff" : "#0A0A0A",
                boxShadow: `0 4px 16px ${tourColor}55`,
                transition: "background 350ms, box-shadow 350ms, transform 200ms",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {tourIdx >= TOUR_LEN - 1 ? "Got it" : "Next →"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

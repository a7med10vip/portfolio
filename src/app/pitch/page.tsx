"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Globe, BrainCircuit, LayoutDashboard, ShieldCheck,
  AlertTriangle, Puzzle, BarChart3, Users, FileCheck,
  LineChart, Shield, Rocket, Clock, CheckCircle2,
  ArrowRight, Target,
  Search, BookOpen,
  UserCheck, Activity, Workflow,
  Eye, Mail, Gauge, Smartphone, Cloud,
  FolderOpen, Bell, CalendarCheck, ThumbsUp, Timer,
  GitBranch, MessagesSquare, HeartPulse,
  type LucideIcon
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid
} from "recharts";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════ COLORS ═══════════ */
const G = "#4FFFB0";
const D = "#0A0A0A";
const P = "#5227FF";
const B = "#3B82F6";
const A = "#F59E0B";
const R = "#EF4444";
const PIK = "#EC4899";

/* ═══════════ CHART DATA ═══════════ */
const roiData = [
  { m: "M1", organic: 400, paid: 800, ai: 0 },
  { m: "M2", organic: 900, paid: 1200, ai: 200 },
  { m: "M3", organic: 1800, paid: 1600, ai: 800 },
  { m: "M4", organic: 3200, paid: 2000, ai: 1800 },
  { m: "M5", organic: 5000, paid: 2200, ai: 3500 },
  { m: "M6", organic: 7500, paid: 2400, ai: 6000 },
];
const channelPie = [
  { name: "Organic SEO", value: 35, color: G },
  { name: "Paid Ads", value: 25, color: P },
  { name: "AI Tool", value: 20, color: B },
  { name: "Referral", value: 12, color: A },
  { name: "Direct", value: 8, color: "#D1D5DB" },
];
const compData = [
  { f: "AI Strategy Tool", us: 95, them: 10 },
  { f: "Client Portal", us: 90, them: 30 },
  { f: "Real-time ROI", us: 85, them: 15 },
  { f: "Auto Workflows", us: 80, them: 20 },
  { f: "Team Transparency", us: 90, them: 25 },
];

/* ═══════════ SVG DIAGRAM COMPONENTS ═══════════ */

function ProcessFlow({ steps, color = G }: { steps: { icon: LucideIcon; title: string; desc: string }[]; color?: string }) {
  return (
    <div className="relative">
      {/* Connector line */}
      <div className="hidden md:block absolute top-[40px] left-[60px] right-[60px] h-[3px] z-0" style={{ background: `linear-gradient(90deg, ${color}40, ${color}, ${color}40)` }} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10 ph-stagger">
        {steps.map((s, i) => (
          <div key={s.title} className="ph-item flex flex-col items-center text-center">
            {/* Number circle */}
            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "#fff", border: `3px solid ${color}`, boxShadow: `0 4px 20px ${color}25` }}>
                <s.icon size={28} color={color} />
              </div>
              <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: color, color: "#fff" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h4 className="heading text-lg mb-1" style={{ color: D }}>{s.title}</h4>
            <p className="text-[11px] leading-relaxed" style={{ color: "rgba(0,0,0,0.7)" }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TreeDiagram({ root, branches }: {
  root: string;
  branches: { label: string; icon: LucideIcon; color: string; children: string[] }[];
}) {
  return (
    <div className="ph-stagger">
      {/* Root */}
      <div className="flex justify-center mb-6">
        <div className="ph-item px-8 py-4 rounded-full heading text-xl" style={{ background: G, color: D, border: `2px solid ${D}`, boxShadow: `4px 4px 0px 0px ${D}` }}>
          {root}
        </div>
      </div>

      {/* Vertical connector from root */}
      <div className="flex justify-center mb-2">
        <div className="w-[3px] h-8" style={{ background: G }} />
      </div>

      {/* Horizontal connector */}
      <div className="hidden md:flex justify-center mb-2">
        <div className="h-[3px] rounded-full" style={{ width: "75%", background: `linear-gradient(90deg, ${G}30, ${G}, ${G}30)` }} />
      </div>

      {/* Branches */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {branches.map((b) => (
          <div key={b.label} className="ph-item flex flex-col items-center">
            {/* Vertical line down */}
            <div className="hidden md:block w-[3px] h-6 mb-2" style={{ background: b.color }} />

            {/* Branch node */}
            <div className="w-full rounded-[20px] p-5 mb-3" style={{ background: "#fff", border: `1.5px solid ${b.color}`, boxShadow: `3px 3px 0px 0px ${b.color}40` }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${b.color}15` }}>
                  <b.icon size={20} color={b.color} />
                </div>
                <span className="heading text-sm">{b.label}</span>
              </div>

              {/* Leaf nodes */}
              <div className="flex flex-col gap-1.5">
                {b.children.map((c) => (
                  <div key={c} className="flex items-center gap-2 pl-2" style={{ borderLeft: `2px solid ${b.color}30` }}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: b.color }} />
                    <span className="text-[11px]" style={{ color: "rgba(0,0,0,0.75)" }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


function InfoCard({ icon: Icon, title, desc, metric, metricLabel, color = G }: { icon: LucideIcon; title: string; desc: string; metric?: string; metricLabel?: string; color?: string }) {
  return (
    <div className="ph-item rounded-[20px] p-6 bg-white transition-all duration-300 hover:-translate-y-1" style={{ border: `1.5px solid #D4D4D4`, boxShadow: `3px 3px 0px 0px ${color}` }}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: `${color}12` }}>
          <Icon size={20} color={color} />
        </div>
        {metric && (
          <div className="text-right">
            <div className="heading text-xl" style={{ color }}>{metric}</div>
            <div className="text-[9px] font-medium" style={{ color: "rgba(0,0,0,0.8)" }}>{metricLabel}</div>
          </div>
        )}
      </div>
      <h4 className="text-[15px] font-bold mb-1.5" style={{ color: D }}>{title}</h4>
      <p className="text-[12px] leading-relaxed" style={{ color: "rgba(0,0,0,0.7)" }}>{desc}</p>
    </div>
  );
}

function DataTable({ rows, color = G }: { headers: string[]; rows: string[][]; color?: string }) {
  return (
    <div className="flex flex-col gap-3 ph-stagger">
      {rows.map((row, i) => (
        <div key={i} className="ph-item rounded-[16px] p-5 flex flex-col md:flex-row md:items-center gap-3 md:gap-6 transition-all duration-200 hover:-translate-y-0.5" style={{ background: "#fff", border: `1.5px solid #D4D4D4`, boxShadow: `3px 3px 0px 0px ${color}` }}>
          <div className="md:w-[200px] flex-shrink-0 flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0" style={{ background: D, color: "#fff" }}>{String(i + 1).padStart(2, "0")}</span>
            <span className="heading text-sm whitespace-nowrap">{row[0]}</span>
          </div>
          <div className="flex-1">
            <p className="text-[11px] leading-relaxed" style={{ color: "rgba(0,0,0,0.7)" }}>{row[1]}</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="inline-block px-3 py-1.5 rounded-full text-[10px] font-bold" style={{ background: D, color: "#fff" }}>{row[2]}</span>
            <span className="px-2 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase" style={{ background: row[3] === "Critical" ? `${R}15` : row[3] === "High" ? `${A}15` : "#F3F4F6", color: row[3] === "Critical" ? R : row[3] === "High" ? A : D }}>{row[3]}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════ MAIN ═══════════ */
export default function OmenaPitch() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ph-hero", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: "power4.out", delay: 0.3 });

      gsap.utils.toArray<HTMLElement>(".ph-slide").forEach((el) => {
        gsap.fromTo(el, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      });

      gsap.utils.toArray<HTMLElement>(".ph-stagger").forEach((el) => {
        gsap.fromTo(el.querySelectorAll(".ph-item"), { y: 40, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 82%", once: true } });
      });

      gsap.utils.toArray<HTMLElement>(".ph-num").forEach((el) => {
        const val = parseInt(el.dataset.val || "0");
        ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => gsap.to({ v: 0 }, { v: val, duration: 2.5, ease: "power2.out", onUpdate() { el.textContent = Math.round(this.targets()[0].v).toLocaleString(); } }) });
      });

      gsap.fromTo(".ph-tl-line", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".ph-tl", start: "top 70%", end: "bottom 50%", scrub: 0.5 } });
    }, ref);
    return () => ctx.revert();
  }, []);

  const sitemapTabs = [
    {
      label: "Public Website", icon: Globe, color: G,
      pages: [
        ["Homepage", "Hero, social proof, services overview, featured case studies, conversion CTA", "Bounce < 35%", "Critical"],
        ["About Us", "Brand story, team profiles, vision statement, company milestones timeline", "Time > 2min", "High"],
        ["Services Hub", "6 service pages: SEO, Paid Ads, Social Media, Branding, Web Dev, AI — each with process, deliverables, pricing", "CTA > 8%", "Critical"],
        ["Case Studies", "Detailed breakdowns with before/after metrics, ROI data, client testimonials", "Lead fills", "High"],
        ["Blog & Resources", "SEO content hub — articles, guides, whitepapers, downloadable templates", "Organic growth", "High"],
        ["Landing Pages", "Campaign-specific with A/B testing, conversion tracking, dynamic content", "Conv > 5%", "Medium"],
        ["Branches", "Office locations with maps, directions, local SEO schema, operating hours", "Local rank", "Medium"],
        ["Contact", "Multi-step form: service selection → budget → timeline → file upload → intelligent routing", "Completion rate", "Critical"],
      ]
    },
    {
      label: "AI SaaS Engine", icon: BrainCircuit, color: P,
      pages: [
        ["AI Landing Page", "Value proposition, demo video, social proof, free trial CTA", "Sign-up > 12%", "Critical"],
        ["Smart Questionnaire", "8-12 questions: industry, goals, budget, competition, target audience, challenges", "Complete > 70%", "Critical"],
        ["AI Analysis Engine", "Real-time processing with progress indicator, industry benchmark comparison", "Gen < 30s", "Critical"],
        ["Strategy Report", "Full PDF: SWOT Analysis, Target Persona, Channel Strategy, Budget Allocation, Content Calendar", "Share > 15%", "Critical"],
        ["Competitor Analysis", "AI-powered competitor scan: their channels, spend estimates, content strategy, weak spots", "Accuracy", "High"],
        ["Persona Builder", "Generates detailed buyer personas: demographics, pain points, media habits, objections", "Usefulness", "High"],
        ["Pricing Plans", "Free (1 report) / Pro $49/mo (unlimited) / Enterprise (custom, white-label, API)", "Upgrade > 8%", "High"],
        ["User Dashboard", "Saved strategies, generation history, account settings, referral program", "Retention", "Medium"],
      ]
    },
    {
      label: "Client Portal", icon: LayoutDashboard, color: B,
      pages: [
        ["KPI Dashboard", "Live metrics: ad spend, leads, conversions, cost-per-lead, ROI — auto-refreshing charts", "Daily active", "Critical"],
        ["Client Drive", "Private file space per client — deliverables, brand assets, contracts, shared documents", "Usage rate", "Critical"],
        ["Project Phases", "Visual phase tracker: Discovery → Strategy → Execution → Optimization → Reporting", "Visibility", "Critical"],
        ["Content Approvals", "Review designs, ad copy, blog posts — approve/reject/request changes with 1-click", "< 24h approve", "High"],
        ["Team Visibility", "See dedicated team: name, photo, role, online status. Who's working on what right now", "Satisfaction", "High"],
        ["Reports Hub", "All reports in one place — weekly/monthly, custom date ranges, exportable PDF", "Views/week", "High"],
        ["Email Notifications", "Auto alerts: file uploaded, phase completed, report ready, invoice due, approval needed", "Open rate", "High"],
        ["Meeting Scheduler", "Book meetings directly from portal — syncs with team calendar, auto-reminders", "Booking rate", "Medium"],
        ["Feedback System", "Client rates each phase/deliverable — builds quality score per team member", "Response rate", "Medium"],
        ["Team Chat", "In-portal messaging per project — client ↔ team communication, file sharing, history", "Adoption", "Medium"],
        ["Billing Center", "Invoice history, current plan, payment methods, auto-receipts, upgrade self-serve", "Self-serve 90%", "Medium"],
      ]
    },
    {
      label: "Agency Hub", icon: ShieldCheck, color: A,
      pages: [
        ["Admin Dashboard", "Bird's-eye view: total clients, active projects, revenue, team utilization, alerts", "Decision speed", "Critical"],
        ["Task Board", "Internal Kanban synced with client portal — when team moves task, client sees update", "Completion rate", "Critical"],
        ["Staff Roles", "4 levels: Owner, Manager, Specialist, Intern — granular permissions, audit log", "Security", "High"],
        ["Client Accounts", "Onboard in minutes: create account, assign team, set budget, upload contract", "< 10min onboard", "High"],
        ["Internal Chat", "Team-only messaging per project — separate from client chat, @mentions, threads", "Adoption", "High"],
        ["Automations", "Trigger chains: new client → assign team → welcome email → create project → schedule kickoff", "Manual -70%", "High"],
        ["Team Analytics", "Per-member metrics: tasks completed, response time, client satisfaction score", "Efficiency", "Medium"],
        ["Workload Balancer", "AI-suggested task distribution based on capacity, skills, and current load", "Balance score", "Medium"],
        ["Client Health Score", "Auto-calculated: activity, satisfaction ratings, response times → Active/At Risk/Critical", "Churn predict", "Medium"],
        ["Time Tracking", "Per-task time logs — team sees time spent, managers see utilization reports", "Accuracy", "Medium"],
        ["SLA Alerts", "Automated warnings when task approaches deadline — escalation to manager if overdue", "On-time rate", "Medium"],
      ]
    },
  ];

  return (
    <div ref={ref} style={{ background: "#fff", color: D }}>

      {/* ═══ HERO ═══ */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: "#fff" }}>
        {/* Subtle dot grid */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        {/* Green glow top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] pointer-events-none" style={{ background: `radial-gradient(ellipse, ${G}20 0%, transparent 70%)` }} />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center">

          {/* Main OMENA title */}
          <div className="ph-hero opacity-0 text-center mb-8">
            <h1 className="heading" style={{ fontSize: "clamp(72px, 15vw, 190px)", lineHeight: 0.88, letterSpacing: "-5px", color: D }}>
              OMENA<span style={{ color: G }}>.</span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="ph-hero opacity-0 text-center mb-10">
            <p className="font-semibold tracking-wide" style={{ fontSize: 15, color: "rgba(0,0,0,0.8)", letterSpacing: "0.05em" }}>
              Digital Platform Architecture & Growth Strategy
            </p>
          </div>

          {/* Stats — horizontal divider style */}
          <div className="ph-hero opacity-0 mb-10 w-full max-w-2xl">
            <div className="flex items-stretch justify-center" style={{ background: "#fff", border: `1.5px solid #D4D4D4`, borderRadius: 16, overflow: "hidden", boxShadow: `4px 4px 0px 0px ${G}` }}>
              {[
                { n: "4", l: "Core Pillars" },
                { n: "38+", l: "Pages Mapped" },
                { n: "3", l: "Dev Phases" },
              ].map((s, i) => (
                <div key={s.l} className="flex-1 flex flex-col items-center justify-center py-6 px-2 relative" style={{ borderLeft: i > 0 ? "1px solid #F0F0F0" : "none" }}>
                  <span className="heading" style={{ fontSize: "clamp(22px,4vw,38px)", lineHeight: 1, color: D }}>{s.n}</span>
                  <span className="text-[9px] font-bold tracking-[1.5px] uppercase mt-1.5" style={{ color: "rgba(0,0,0,0.8)" }}>{s.l}</span>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-t-full" style={{ background: G }} />
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="ph-hero opacity-0 text-center mb-8 max-w-xl">
            <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(0,0,0,0.7)" }}>
              A roadmap to transform OMENA into an AI-powered digital ecosystem, unifying client acquisition, service delivery, and operations under one intelligent platform.
            </p>
          </div>

          {/* Prepared by */}
          <div className="ph-hero opacity-0 mb-14">
            <p style={{ fontSize: 13, color: "rgba(0,0,0,0.8)", letterSpacing: "0.02em", fontWeight: 500 }}>
              Prepared by{" "}
              <a href="https://ahmedali.online" target="_blank" rel="noopener" style={{ color: G, fontWeight: 700, textDecoration: "none" }}>Ahmed Ali</a>
              {" "}· Full-Stack Digital Strategist
            </p>
          </div>

          {/* Mouse scroll indicator */}
          <div className="ph-hero opacity-0 flex flex-col items-center gap-2">
            <div style={{ width: 24, height: 38, border: "1.5px solid rgba(0,0,0,0.14)", borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 5 }}>
              <div style={{ width: 3, height: 6, borderRadius: 2, background: G, animation: "mouseScroll 1.6s ease-in-out infinite" }} />
            </div>
            <span style={{ fontSize: 9, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(0,0,0,0.75)" }}>scroll</span>
          </div>
        </div>

        <style>{`
          @keyframes mouseScroll{0%{transform:translateY(0);opacity:1}75%{transform:translateY(9px);opacity:0}76%{transform:translateY(0);opacity:0}100%{opacity:1}}
        `}</style>
      </section>

      {/* ═══ THE PROBLEM — INFOGRAPHIC ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "120px 24px", background: D }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="script text-xl md:text-2xl mb-3" style={{ color: R }}>The Challenge</p>
            <h2 className="heading text-4xl md:text-5xl mb-5" style={{ color: "#fff" }}>Why Most Agencies <span style={{ color: R }}>Fail</span></h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: "#fff" }}>80% of agencies use 5+ disconnected tools. This creates chaos, churn, and zero differentiation.</p>
          </div>

          {/* Problem process flow */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12 ph-stagger">
            {[
              { icon: AlertTriangle, label: "Scattered Tools", stat: "5+", color: R },
              null,
              { icon: Puzzle, label: "No AI Moat", stat: "0%", color: A },
              null,
              { icon: Eye, label: "Blind Clients", stat: "67%", color: P },
            ].map((item, i) => (
              item ? (
                <div key={i} className="ph-item rounded-[20px] p-6 text-center" style={{ background: "#fff", border: `1px solid ${item.color}20` }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: `${item.color}12`, border: `2px solid ${item.color}25` }}>
                    <item.icon size={24} color={item.color} />
                  </div>
                  <div className="heading text-3xl mb-1" style={{ color: item.color }}>{item.stat}</div>
                  <div className="text-[12px] font-semibold" style={{ color: D }}>{item.label}</div>
                </div>
              ) : (
                <div key={i} className="hidden md:flex items-center justify-center ph-item">
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#fff", border: `2px solid ${D}`, boxShadow: `3px 3px 0px 0px ${G}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ArrowRight size={16} color={D} />
                  </div>
                </div>
              )
            ))}
          </div>

          {/* 3 pain points detailed */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ph-stagger mb-8">
            {[
              { icon: AlertTriangle, title: "Fragmented Operations", desc: "WhatsApp for communication, Trello for tasks, Google Sheets for reports, Canva for assets, email for approvals. Every tool is a silo — data lives in 5+ disconnected places. Teams waste 30% of time context-switching.", points: ["No unified client view", "Data duplication & loss", "30% time wasted switching tools"], color: R, bg: "#fff", dark: false },
              { icon: Puzzle, title: "Zero Differentiation", desc: "Every agency pitches the same services with the same decks. Without a proprietary AI product, there's nothing stopping clients from switching to a cheaper alternative. Service commoditization is killing margins.", points: ["Same pitch as competitors", "No proprietary technology", "Price-based competition"], color: A, bg: G, dark: false },
              { icon: Eye, title: "Client Trust Gap", desc: "Clients pay thousands monthly but can't see real-time ROI. They wait for monthly reports and wonder what the team is doing. 67% of agency churn comes from perceived lack of transparency and communication.", points: ["No real-time visibility", "Monthly reports feel outdated", "67% churn from opacity"], color: P, bg: "#fff", dark: false },
            ].map((item) => (
              <div key={item.title} className="ph-item rounded-[20px] p-7" style={{ background: item.bg, border: `1.5px solid #D4D4D4`, boxShadow: item.bg === G ? `4px 4px 0px 0px ${D}` : `3px 3px 0px 0px ${item.color}` }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: item.bg === G ? "rgba(0,0,0,0.08)" : `${item.color}10` }}>
                  <item.icon size={22} color={item.bg === G ? D : item.color} />
                </div>
                <h3 className="heading text-lg mb-3" style={{ color: D }}>{item.title}</h3>
                <p className="text-[12px] leading-relaxed mb-4" style={{ color: item.bg === G ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.45)" }}>{item.desc}</p>
                <div className="flex flex-col gap-2">
                  {item.points.map((p) => (
                    <div key={p} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.bg === G ? D : item.color }} />
                      <span className="text-[11px] font-medium" style={{ color: item.bg === G ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.5)" }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-[20px] py-5 px-8 text-center" style={{ background: `linear-gradient(135deg, ${G}10, ${P}10)`, border: `1px solid ${G}20` }}>
            <p className="heading text-xl md:text-2xl" style={{ color: "#fff" }}>The solution isn&apos;t more tools — it&apos;s <span style={{ color: G }}>one platform</span> that does everything.</p>
          </div>
        </div>
      </section>

      {/* ═══ THE VISION — TREE DIAGRAM ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="script text-xl md:text-2xl mb-3" style={{ color: G }}>The Solution</p>
            <h2 className="heading text-4xl md:text-5xl mb-5">One Platform. <span style={{ color: G }}>Infinite Growth.</span></h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(0,0,0,0.7)" }}>Four interconnected pillars forming a self-reinforcing growth loop.</p>
          </div>

          <TreeDiagram
            root="OMENA Platform"
            branches={[
              { label: "Public Website", icon: Globe, color: G, children: ["Homepage", "Services (6 pages)", "Case Studies", "Blog & Resources", "Contact & Branches"] },
              { label: "AI SaaS Engine", icon: BrainCircuit, color: P, children: ["Smart Questionnaire", "SWOT Analysis", "Persona Builder", "Competitor Scan", "Strategy Report", "Pricing Plans"] },
              { label: "Client Portal", icon: LayoutDashboard, color: B, children: ["KPI Dashboard", "Client Drive", "Project Phases", "Content Approvals", "Team Chat", "Reports Hub"] },
              { label: "Agency Hub", icon: ShieldCheck, color: A, children: ["Admin Dashboard", "Task Board", "Staff Roles", "Automations", "Team Analytics", "Health Scores"] },
            ]}
          />

          {/* Growth Flywheel */}
          <div className="mt-16 ph-stagger">
            <h3 className="heading text-xl text-center mb-10">Growth Flywheel</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { step: "Attract", desc: "SEO, ads, AI tool drive traffic", icon: Target, color: G },
                { step: "Engage", desc: "Content & tools build trust", icon: Eye, color: P },
                { step: "Convert", desc: "Forms, calls, AI reports", icon: UserCheck, color: B },
                { step: "Serve", desc: "Portal, dashboard, delivery", icon: LayoutDashboard, color: A },
                { step: "Retain", desc: "Transparency builds loyalty", icon: HeartPulse, color: PIK },
                { step: "Scale", desc: "Referrals, upsells, growth", icon: Rocket, color: G },
              ].map((s, i) => (
                <div key={s.step} className="ph-item relative rounded-[20px] p-6 text-center overflow-hidden transition-all duration-300 hover:-translate-y-1" style={{ background: i === 5 ? G : "#fff", border: `1.5px solid #D4D4D4`, boxShadow: `3px 3px 0px 0px ${i === 5 ? D : s.color}` }}>
                  {/* Large watermark number */}
                  <div className="absolute -right-1 -top-3 heading select-none pointer-events-none" style={{ fontSize: 80, lineHeight: 1, color: i === 5 ? "rgba(0,0,0,0.06)" : `${s.color}12` }}>{String(i + 1).padStart(2, "0")}</div>
                  <div className="relative z-10">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: i === 5 ? "rgba(0,0,0,0.08)" : `${s.color}12` }}>
                      <s.icon size={20} color={i === 5 ? D : s.color} />
                    </div>
                    <div className="heading text-base mb-1.5">{s.step}</div>
                    <p className="text-[11px] leading-relaxed" style={{ color: i === 5 ? D : "rgba(0,0,0,0.7)" }}>{s.desc}</p>
                  </div>
                  {i < 5 && <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-20"><ArrowRight size={14} color={D} /></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ INTERACTIVE SITEMAP ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#fff" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="script text-xl md:text-2xl mb-3" style={{ color: G }}>Deep Dive</p>
            <h2 className="heading text-4xl md:text-5xl mb-5">Complete <span style={{ color: G }}>Sitemap</span></h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(0,0,0,0.7)" }}>Every page mapped with purpose, target KPI, and priority.</p>
          </div>

          {/* Tab selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {sitemapTabs.map((tab, i) => (
              <button key={tab.label} onClick={() => setActiveTab(i)} className="flex items-center gap-2 px-5 py-3 rounded-full text-[12px] font-bold cursor-pointer transition-all duration-200" style={{
                background: activeTab === i ? tab.color : "#fff",
                color: activeTab === i ? D : "rgba(0,0,0,0.6)",
                border: `1.5px solid #D4D4D4`,
                boxShadow: activeTab === i ? `3px 3px 0px 0px ${D}` : "none",
              }}>
                <tab.icon size={16} />
                {tab.label}
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px]" style={{ background: activeTab === i ? "rgba(0,0,0,0.1)" : "#F3F4F6" }}>
                  {sitemapTabs[i].pages.length}
                </span>
              </button>
            ))}
          </div>

          {/* Table */}
          <DataTable
            headers={["Page", "Purpose & Features", "Target KPI", "Priority"]}
            rows={sitemapTabs[activeTab].pages}
            color={sitemapTabs[activeTab].color}
          />
        </div>
      </section>

      {/* ═══ AI ENGINE — PROCESS DIAGRAM ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="script text-xl md:text-2xl mb-3" style={{ color: P }}>Pillar 02</p>
            <h2 className="heading text-4xl md:text-5xl mb-5">AI SaaS <span style={{ color: P }}>Engine</span></h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(0,0,0,0.7)" }}>OMENA&apos;s biggest competitive advantage — a proprietary AI tool that generates complete marketing strategies in under 30 seconds.</p>
          </div>

          {/* User Journey Process Diagram */}
          <div className="mb-16">
            <h3 className="heading text-xl text-center mb-10">User Journey</h3>
            <ProcessFlow color={P} steps={[
              { icon: Globe, title: "Discover", desc: "User finds AI tool via ad, blog, or referral. Sees value proposition." },
              { icon: Search, title: "Engage", desc: "Answers 8-12 smart questions about business, budget, and goals." },
              { icon: BrainCircuit, title: "Generate", desc: "AI analyzes inputs vs benchmarks. Generates full strategy report." },
              { icon: Rocket, title: "Convert", desc: "Downloads report. CTA to book call or upgrade to Pro plan." },
            ]} />
          </div>

          {/* What AI generates - detailed */}
          <h3 className="heading text-xl text-center mb-8">What the AI Report Includes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ph-stagger mb-16">
            <InfoCard icon={Target} title="SWOT Analysis" desc="Strengths, weaknesses, opportunities, threats — auto-generated from questionnaire data and industry benchmarks." color={P} />
            <InfoCard icon={Users} title="Target Persona" desc="Detailed buyer personas: demographics, pain points, media habits, purchase triggers, objections and how to overcome them." color={PIK} />
            <InfoCard icon={Eye} title="Competitor Scan" desc="AI scans top competitors: their channels, estimated spend, content strategy, weak spots you can exploit." color={R} />
            <InfoCard icon={BarChart3} title="Channel Strategy" desc="Recommended marketing channels with budget allocation percentages based on industry, goals, and audience." color={G} />
            <InfoCard icon={BookOpen} title="Content Calendar" desc="30-day content plan with topics, formats, platforms, posting times — ready to execute immediately." color={B} />
            <InfoCard icon={LineChart} title="KPI Targets" desc="Specific measurable targets for each channel: CPL, ROAS, CTR, engagement rate — with monthly milestones." color={A} />
          </div>

          {/* Pricing */}
          <h3 className="heading text-xl text-center mb-8">Pricing Model</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ph-stagger">
            {[
              { plan: "Free Trial", price: "$0", desc: "Try it once", features: ["1 AI-generated strategy", "Basic channel recommendations", "Email delivery", "General benchmarks"], hl: false, color: G },
              { plan: "Pro", price: "$49/mo", desc: "For growing businesses", features: ["Unlimited strategies", "Full SWOT + Persona + Competitors", "Custom KPI targets", "Priority AI model", "Monthly trend reports", "WhatsApp + email support"], hl: true, color: G },
              { plan: "Enterprise", price: "Custom", desc: "For agencies & teams", features: ["White-label reports (your brand)", "API access for integration", "Custom AI training on your data", "Dedicated account manager", "SLA guarantee", "Bulk pricing available"], hl: false, color: P },
            ].map((t) => (
              <div key={t.plan} className="ph-item rounded-[24px] p-7" style={{ background: t.hl ? G : "#fff", border: `2px solid ${t.hl ? D : "#E5E7EB"}`, boxShadow: t.hl ? `6px 6px 0px 0px ${D}` : "none" }}>
                <div className="text-[10px] font-bold tracking-[2px] uppercase mb-1" style={{ color: t.hl ? D : t.color }}>{t.plan}</div>
                <div className="heading text-3xl mb-1">{t.price}</div>
                <p className="text-[11px] mb-5" style={{ color: t.hl ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0.3)" }}>{t.desc}</p>
                {t.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 mb-2">
                    <CheckCircle2 size={13} color={t.hl ? D : G} />
                    <span className="text-[12px]" style={{ color: t.hl ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.5)" }}>{f}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CLIENT PORTAL ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "120px 24px", background: D }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="script text-xl md:text-2xl mb-3" style={{ color: B }}>Pillar 03</p>
            <h2 className="heading text-4xl md:text-5xl mb-5" style={{ color: "#fff" }}>Client <span style={{ color: B }}>Dashboard</span></h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>The premium retention tool. Full transparency into every dollar spent, every task completed, and every result — in real-time.</p>
          </div>

          {/* Client Journey Process */}
          <div className="mb-16">
            <h3 className="heading text-lg text-center mb-10" style={{ color: "#fff" }}>Client Experience Flow</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 ph-stagger">
              {[
                { icon: UserCheck, title: "Onboard", desc: "Get access to personal portal" },
                { icon: FolderOpen, title: "Drive", desc: "All files in one place" },
                { icon: Activity, title: "Track", desc: "Watch project progress live" },
                { icon: ThumbsUp, title: "Approve", desc: "1-click content approvals" },
                { icon: LineChart, title: "Report", desc: "Real-time ROI dashboards" },
              ].map((s, i) => (
                <div key={s.title} className="ph-item text-center p-5 rounded-[20px]" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="heading text-xs mb-2" style={{ color: B }}>Step {i + 1}</div>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: `${B}15`, border: `2px solid ${B}30` }}>
                    <s.icon size={20} color={B} />
                  </div>
                  <h4 className="text-[13px] font-bold mb-1" style={{ color: "#fff" }}>{s.title}</h4>
                  <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.7)" }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ph-stagger">
            {[
              { icon: BarChart3, title: "Live KPI Dashboard", desc: "Real-time: spend, leads, conversions, cost-per-lead, ROI. Auto-refreshing charts. Compare current vs previous period.", metric: "Real-time", color: B },
              { icon: FolderOpen, title: "Client Drive", desc: "Private file space: deliverables, brand assets, contracts, documents. Organized by project with version control.", metric: "Unlimited", color: G },
              { icon: GitBranch, title: "Project Phases", desc: "Visual tracker: Discovery → Strategy → Execution → Optimization. Each phase with status, dates, and deliverables.", metric: "5 phases", color: P },
              { icon: FileCheck, title: "Content Approvals", desc: "Review creative assets in one place. Approve, reject, or request changes. Version history. No more WhatsApp chaos.", metric: "1-click", color: A },
              { icon: Users, title: "Team Visibility", desc: "See your dedicated team: name, photo, role, online status. Know who's working on what right now.", metric: "Live", color: B },
              { icon: Bell, title: "Smart Notifications", desc: "Auto emails: file uploaded, phase completed, report ready, invoice due, approval needed. Never miss an update.", metric: "Auto", color: R },
              { icon: LineChart, title: "Reports Hub", desc: "All reports in one place. Weekly/monthly, custom date ranges. Export PDF for stakeholders and board meetings.", metric: "Weekly", color: G },
              { icon: CalendarCheck, title: "Meeting Scheduler", desc: "Book meetings from portal. Syncs with team calendar. Auto-reminders. No back-and-forth email.", metric: "Direct", color: P },
              { icon: MessagesSquare, title: "In-Portal Chat", desc: "Messaging per project. Client ↔ team communication with file sharing, history, and notifications.", metric: "Per project", color: B },
            ].map((f) => (
              <div key={f.title} className="ph-item rounded-[20px] p-6 transition-all duration-300 hover:-translate-y-1" style={{ background: "#fff", border: `1.5px solid #D4D4D4`, boxShadow: `3px 3px 0px 0px ${f.color}` }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${f.color}12` }}>
                    <f.icon size={18} color={f.color} />
                  </div>
                  <span className="heading text-sm" style={{ color: f.color }}>{f.metric}</span>
                </div>
                <h4 className="text-[14px] font-bold mb-1" style={{ color: D }}>{f.title}</h4>
                <p className="text-[11px] leading-relaxed" style={{ color: "rgba(0,0,0,0.7)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ AGENCY HUB ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="script text-xl md:text-2xl mb-3" style={{ color: A }}>Pillar 04</p>
            <h2 className="heading text-4xl md:text-5xl mb-5">Internal <span style={{ color: A }}>Agency Hub</span></h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(0,0,0,0.7)" }}>The operational backbone. Replaces Trello, Asana, and spreadsheets with one system synced to the client portal.</p>
          </div>

          {/* Workflow diagram */}
          <div className="mb-16">
            <h3 className="heading text-xl text-center mb-10">Automated Client Onboarding Flow</h3>
            <ProcessFlow color={A} steps={[
              { icon: UserCheck, title: "New Client", desc: "Create account, assign plan, set budget cap" },
              { icon: Users, title: "Assign Team", desc: "Auto-suggest team based on skills & capacity" },
              { icon: Mail, title: "Welcome Email", desc: "Branded onboarding email with portal access" },
              { icon: CalendarCheck, title: "Kickoff", desc: "Auto-schedule first meeting with team" },
            ]} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ph-stagger">
            <InfoCard icon={ShieldCheck} title="Super Admin Dashboard" desc="Bird's-eye view: total clients, active projects, revenue, team utilization rate. Filter by status, priority, client, or team member. Real-time alerts for overdue tasks and SLA breaches." metric="360°" metricLabel="visibility" color={A} />
            <InfoCard icon={Activity} title="Synced Task Board" desc="Internal Kanban auto-synced with client portal. When the team moves a task, the client sees the update immediately. Two-way status sync eliminates double data entry." metric="Auto-sync" metricLabel="with clients" color={B} />
            <InfoCard icon={HeartPulse} title="Client Health Score" desc="AI-calculated health: activity frequency, satisfaction ratings, response times, payment history → Active / At Risk / Critical. Proactive churn prevention." metric="AI-scored" metricLabel="auto-calculated" color={G} />
            <InfoCard icon={Workflow} title="Automation Engine" desc="Trigger chains: new client → assign team → welcome email → create project → schedule kickoff → send contract. Reduces manual work by 70%." metric="-70%" metricLabel="manual tasks" color={P} />
            <InfoCard icon={Timer} title="Time & SLA Tracking" desc="Per-task time logs, team utilization reports, SLA alerts when tasks approach deadlines. Automatic escalation to manager if overdue." metric="Per task" metricLabel="time tracking" color={R} />
            <InfoCard icon={BarChart3} title="Team Analytics" desc="Per-member metrics: tasks completed, avg response time, client satisfaction score. Identify top performers and bottlenecks." metric="Per member" metricLabel="performance" color={A} />
          </div>
        </div>
      </section>

      {/* ═══ DATA & PROJECTIONS ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="script text-xl md:text-2xl mb-3" style={{ color: G }}>Projections</p>
            <h2 className="heading text-4xl md:text-5xl mb-5">Growth <span style={{ color: G }}>Data</span></h2>
            <p className="text-sm max-w-xl mx-auto" style={{ color: "rgba(0,0,0,0.7)" }}>Based on industry benchmarks for marketing agencies launching integrated digital platforms. These projections assume consistent content output, ad spend of $2-5K/month, and active AI tool promotion.</p>
          </div>

          {/* Key metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 ph-stagger">
            {[
              { n: "15K", l: "Monthly Visitors", sub: "by month 6" },
              { n: "350+", l: "Qualified Leads", sub: "per month" },
              { n: "8.5%", l: "Conversion Rate", sub: "industry avg: 2.3%" },
              { n: "3.2x", l: "ROI", sub: "on ad spend" },
            ].map((m) => (
              <div key={m.l} className="ph-item rounded-[16px] p-5 text-center bg-white" style={{ border: `1.5px solid #D4D4D4`, boxShadow: `3px 3px 0px 0px ${G}` }}>
                <div className="heading text-2xl mb-1" style={{ color: G }}>{m.n}</div>
                <div className="text-[11px] font-bold" style={{ color: D }}>{m.l}</div>
                <div className="text-[10px] mt-0.5" style={{ color: "rgba(0,0,0,0.8)" }}>{m.sub}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="rounded-[20px] p-8 bg-white" style={{ border: `1.5px solid #D4D4D4`, boxShadow: `3px 3px 0px 0px ${G}` }}>
              <h3 className="heading text-lg mb-1">Lead Growth Projection</h3>
              <p className="text-[11px] mb-6" style={{ color: "rgba(0,0,0,0.8)" }}>By channel, first 6 months post-launch</p>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={roiData}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={G} stopOpacity={0.2} /><stop offset="100%" stopColor={G} stopOpacity={0} /></linearGradient>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={P} stopOpacity={0.2} /><stop offset="100%" stopColor={P} stopOpacity={0} /></linearGradient>
                    <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={B} stopOpacity={0.2} /><stop offset="100%" stopColor={B} stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="m" tick={{ fill: "#9CA3AF", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#9CA3AF", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "12px" }} />
                  <Area type="monotone" dataKey="organic" name="Organic" stroke={G} strokeWidth={2} fill="url(#g1)" />
                  <Area type="monotone" dataKey="paid" name="Paid" stroke={P} strokeWidth={2} fill="url(#g2)" />
                  <Area type="monotone" dataKey="ai" name="AI Tool" stroke={B} strokeWidth={2} fill="url(#g3)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="rounded-[20px] p-8 bg-white" style={{ border: `1.5px solid #D4D4D4`, boxShadow: `3px 3px 0px 0px ${G}` }}>
              <h3 className="heading text-lg mb-1">Traffic Channel Mix</h3>
              <p className="text-[11px] mb-6" style={{ color: "rgba(0,0,0,0.8)" }}>Projected at month 6</p>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={channelPie} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3} dataKey="value">
                    {channelPie.map((e, i) => <Cell key={i} fill={e.color} stroke="none" />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {channelPie.map((c) => (
                  <div key={c.name} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                    <span className="text-[10px] font-medium" style={{ color: "rgba(0,0,0,0.75)" }}>{c.name} ({c.value}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Competitor chart */}
          <div className="rounded-[20px] p-8 bg-white" style={{ border: `1.5px solid #D4D4D4`, boxShadow: `3px 3px 0px 0px ${G}` }}>
            <h3 className="heading text-lg mb-1 text-center">OMENA vs. Traditional Agency</h3>
            <p className="text-[11px] text-center mb-6" style={{ color: "rgba(0,0,0,0.8)" }}>Competitive advantage score (0-100)</p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={compData} layout="vertical" barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fill: "#9CA3AF", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="f" type="category" width={140} tick={{ fill: "#374151", fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "12px" }} />
                <Bar dataKey="us" name="OMENA" fill={G} radius={[0, 6, 6, 0]} barSize={14} />
                <Bar dataKey="them" name="Avg. Agency" fill="#E5E7EB" radius={[0, 6, 6, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Key insight */}
          <div className="mt-8 rounded-[16px] p-6 text-center" style={{ background: `${G}08`, border: `1px solid ${G}20` }}>
            <p className="text-[13px] font-medium" style={{ color: D }}>
              <strong style={{ color: G }}>Key Insight:</strong> The AI Strategy Tool alone is projected to generate 20% of total leads by month 6, while reducing cost-per-lead by 40% compared to traditional outbound. Combined with SEO and paid channels, OMENA builds a self-sustaining acquisition engine that competitors cannot replicate.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ TECH STACK ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="script text-xl mb-3" style={{ color: G }}>Technology</p>
            <h2 className="heading text-4xl md:text-5xl mb-5" style={{ color: "#fff" }}>Tech <span style={{ color: G }}>Stack</span></h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>Battle-tested technologies chosen for performance, scalability, and developer velocity.</p>
          </div>

          {/* Tech grid with logos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12 ph-stagger">
            {[
              { name: "Next.js", icon: "nextdotjs/white", desc: "Full-stack framework" },
              { name: "React", icon: "react", desc: "UI components" },
              { name: "TypeScript", icon: "typescript", desc: "Type safety" },
              { name: "Tailwind CSS", icon: "tailwindcss", desc: "Utility-first CSS" },
              { name: "Supabase", icon: "supabase", desc: "Database & auth" },
              { name: "Firebase", icon: "firebase", desc: "Real-time services" },
              { name: "OpenAI", icon: "openai/white", desc: "AI engine" },
              { name: "Google Gemini", icon: "googlegemini", desc: "AI models" },
              { name: "Vercel", icon: "vercel/white", desc: "Deployment & CDN" },
              { name: "Stripe", icon: "stripe", desc: "Payments" },
              { name: "Resend", icon: "resend/white", desc: "Transactional email" },
              { name: "Flutter", icon: "flutter", desc: "Mobile apps" },
            ].map((t) => (
              <div key={t.name} className="ph-item flex items-center gap-4 p-4 rounded-[16px] transition-all duration-300 hover:-translate-y-0.5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <img src={`https://cdn.simpleicons.org/${t.icon}`} alt={t.name} width={28} height={28} style={{ width: 28, height: 28 }} />
                <div>
                  <div className="text-[13px] font-bold" style={{ color: "#fff" }}>{t.name}</div>
                  <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Capabilities */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 ph-stagger">
            {[
              { icon: Gauge, label: "90+ Lighthouse", sub: "Performance", color: G },
              { icon: Shield, label: "RLS + Encryption", sub: "Security", color: B },
              { icon: Cloud, label: "Auto-scaling CDN", sub: "Scalability", color: P },
              { icon: Smartphone, label: "PWA + Native Ready", sub: "Mobile", color: A },
            ].map((f) => (
              <div key={f.label} className="ph-item rounded-[16px] p-5 text-center" style={{ background: "#fff" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: `${f.color}12` }}>
                  <f.icon size={18} color={f.color} />
                </div>
                <div className="text-[13px] font-bold mb-0.5" style={{ color: D }}>{f.label}</div>
                <div className="text-[10px]" style={{ color: "rgba(0,0,0,0.65)" }}>{f.sub}</div>
              </div>
            ))}
          </div>

          <div className="rounded-[16px] p-6" style={{ background: G, border: `2px solid ${D}` }}>
            <p className="text-[13px] text-center font-medium" style={{ color: D }}>
              <strong>Phase 4 — Mobile:</strong> Flutter app for clients and team — iOS & Android — for on-the-go access to dashboards, approvals, and notifications.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ ROADMAP ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="script text-xl md:text-2xl mb-3" style={{ color: G }}>Execution</p>
            <h2 className="heading text-4xl md:text-5xl mb-5">Development <span style={{ color: G }}>Roadmap</span></h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(0,0,0,0.7)" }}>Three focused phases, each building on the last. Every phase ships a working product.</p>
          </div>

          <div className="flex flex-col gap-6 ph-stagger">
            {[
              { label: "Foundation", color: G, duration: "4–6 Weeks", items: ["Brand design system & component library", "8+ page public website with SEO", "Blog CMS with rich text editor", "Contact forms with intelligent routing", "GA4, GTM, TikTok Pixel integration", "Core Web Vitals optimization (90+)"] },
              { label: "Intelligence", color: P, duration: "6–8 Weeks", items: ["AI questionnaire (8-12 smart questions)", "Strategy engine (SWOT, Persona, Competitors)", "PDF report generator with branding", "Pricing & subscription system (Stripe)", "Client dashboard with live KPI charts", "Content approval workflow & client drive"] },
              { label: "Operations", color: A, duration: "4–6 Weeks", items: ["Admin dashboard with full controls", "Role-based access (4 permission levels)", "Internal task board synced with client view", "Automated workflow engine (6+ triggers)", "Team analytics & health scoring", "In-portal team & client messaging"] },
            ].map((p, i) => (
              <div key={p.label} className="ph-item rounded-[24px] overflow-hidden" style={{ border: `1.5px solid #D4D4D4`, boxShadow: `4px 4px 0px 0px ${p.color}` }}>
                <div className="flex flex-col md:flex-row">
                  {/* Phase sidebar */}
                  <div className="md:w-[200px] flex-shrink-0 p-8 flex flex-col items-center justify-center text-center" style={{ background: p.color }}>
                    <div className="text-[9px] font-bold tracking-[3px] uppercase mb-1" style={{ color: "rgba(0,0,0,0.7)" }}>Phase</div>
                    <div className="heading text-5xl mb-2" style={{ color: D }}>{i + 1}</div>
                    <div className="heading text-lg mb-2" style={{ color: D }}>{p.label}</div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.08)" }}>
                      <Clock size={11} color={D} />
                      <span className="text-[11px] font-bold" style={{ color: D }}>{p.duration}</span>
                    </div>
                  </div>
                  {/* Deliverables */}
                  <div className="flex-1 p-8 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {p.items.map((item) => (
                        <div key={item} className="flex items-start gap-3 p-3 rounded-xl transition-colors duration-200 hover:bg-gray-50">
                          <CheckCircle2 size={16} color={p.color} className="flex-shrink-0 mt-0.5" />
                          <span className="text-[12px] leading-relaxed" style={{ color: "rgba(0,0,0,0.8)" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <span className="inline-flex items-center gap-2 px-8 py-4 rounded-full heading text-sm" style={{ background: G, color: D, border: `2px solid ${D}`, boxShadow: `4px 4px 0px 0px ${D}` }}>
              <Clock size={16} /> Total: 14–20 weeks from kickoff to full launch
            </span>
          </div>
        </div>
      </section>

      {/* ═══ CLOSING ═══ */}
      <section className="ph-slide opacity-0" style={{ background: D, padding: "140px 24px 100px" }}>
        <div className="max-w-6xl mx-auto text-center relative">
          <span
            className="inline-block mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, animation: "sparkSpin 6s linear infinite" }}
          >
            ✨
          </span>
          <h2
            className="heading"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 9rem)",
              letterSpacing: "-3px",
              lineHeight: 0.95,
              backgroundImage: "linear-gradient(90deg, #444 0%, #999 40%, #fff 50%, #999 60%, #444 100%)",
              backgroundSize: "400% 100%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shineMove 12s ease-in-out infinite",
            }}
          >
            Let&apos;s Build Something Extraordinary.
          </h2>
          <p className="mt-8 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            Prepared by{" "}
            <a href="https://ahmedali.online" target="_blank" rel="noopener" style={{ color: G, fontWeight: 700, textDecoration: "none" }}>Ahmed Ali</a>
            {" "}· Full-Stack Digital Strategist
          </p>
          <p className="mt-3 text-[11px]" style={{ color: "rgba(255,255,255,0.2)" }}>&copy; {new Date().getFullYear()} Ahmed Ali. Prepared exclusively for OMENA.</p>
        </div>
        <style>{`
          @keyframes shineMove{0%{background-position:100% 0}50%{background-position:-100% 0}100%{background-position:100% 0}}
          @keyframes sparkSpin{0%{transform:rotate(0deg) scale(1)}25%{transform:rotate(90deg) scale(1.2)}50%{transform:rotate(180deg) scale(1)}75%{transform:rotate(270deg) scale(1.2)}100%{transform:rotate(360deg) scale(1)}}
        `}</style>
      </section>
    </div>
  );
}

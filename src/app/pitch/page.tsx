"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Globe, BrainCircuit, LayoutDashboard, ShieldCheck,
  AlertTriangle, Puzzle, BarChart3, Users, FileCheck,
  LineChart, Shield, Rocket, Clock, CheckCircle2,
  ArrowRight, ArrowDown, Target,
  Search, BookOpen,
  UserCheck, Activity, Workflow, ExternalLink,
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
              <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: color, color: D }}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h4 className="heading text-lg mb-1" style={{ color: D }}>{s.title}</h4>
            <p className="text-[11px] leading-relaxed" style={{ color: "rgba(0,0,0,0.4)" }}>{s.desc}</p>
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
            <div className="w-full rounded-[20px] p-5 mb-3" style={{ background: "#fff", border: `2px solid ${b.color}`, boxShadow: `3px 3px 0px 0px ${D}` }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${b.color}15` }}>
                  <b.icon size={20} color={b.color} />
                </div>
                <span className="heading text-sm">{b.label}</span>
              </div>

              {/* Leaf nodes */}
              <div className="flex flex-col gap-1.5">
                {b.children.map((c, i) => (
                  <div key={c} className="flex items-center gap-2 pl-2" style={{ borderLeft: `2px solid ${b.color}30` }}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: b.color }} />
                    <span className="text-[11px]" style={{ color: "rgba(0,0,0,0.5)" }}>{c}</span>
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

function VisualTimeline({ phases }: { phases: { label: string; color: string; duration: string; items: string[] }[] }) {
  return (
    <div className="relative ph-tl">
      {/* Horizontal timeline bar */}
      <div className="hidden md:block absolute top-[42px] left-0 right-0 h-[4px] rounded-full" style={{ background: "#E5E7EB" }} />
      <div className="hidden md:block ph-tl-line absolute top-[42px] left-0 right-0 h-[4px] rounded-full origin-left" style={{ background: `linear-gradient(90deg, ${G}, ${P}, ${A})` }} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {phases.map((p, i) => (
          <div key={p.label} className="ph-item flex flex-col items-center">
            {/* Circle on timeline */}
            <div className="w-[84px] h-[84px] rounded-full flex items-center justify-center mb-6 relative z-10" style={{ background: "#fff", border: `4px solid ${p.color}`, boxShadow: `0 4px 20px ${p.color}30` }}>
              <div className="text-center">
                <div className="heading text-sm" style={{ color: p.color }}>Phase</div>
                <div className="heading text-2xl" style={{ color: D }}>{i + 1}</div>
              </div>
            </div>

            {/* Phase card */}
            <div className="w-full rounded-[20px] p-6" style={{ background: "#fff", border: `1px solid #E5E7EB` }}>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase" style={{ background: `${p.color}12`, color: p.color }}>{p.label}</span>
                <span className="flex items-center gap-1 text-[11px]" style={{ color: "rgba(0,0,0,0.35)" }}>
                  <Clock size={11} />{p.duration}
                </span>
              </div>
              <div className="flex flex-col gap-2.5">
                {p.items.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle2 size={13} color={p.color} className="flex-shrink-0 mt-0.5" />
                    <span className="text-[12px]" style={{ color: "rgba(0,0,0,0.5)" }}>{item}</span>
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
    <div className="ph-item rounded-[20px] p-6 bg-white border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ borderColor: "#E5E7EB" }}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: `${color}12` }}>
          <Icon size={20} color={color} />
        </div>
        {metric && (
          <div className="text-right">
            <div className="heading text-xl" style={{ color }}>{metric}</div>
            <div className="text-[9px] font-medium" style={{ color: "rgba(0,0,0,0.25)" }}>{metricLabel}</div>
          </div>
        )}
      </div>
      <h4 className="text-[15px] font-bold mb-1.5" style={{ color: D }}>{title}</h4>
      <p className="text-[12px] leading-relaxed" style={{ color: "rgba(0,0,0,0.4)" }}>{desc}</p>
    </div>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-[16px] border" style={{ borderColor: "#E5E7EB" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: D }}>
            {headers.map((h) => <th key={h} style={{ padding: "12px 18px", textAlign: "left", fontSize: "10px", fontWeight: 700, color: G, letterSpacing: "1.5px", textTransform: "uppercase" }}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#FAFAFA", borderBottom: "1px solid #F3F4F6" }}>
              {row.map((cell, j) => <td key={j} style={{ padding: "11px 18px", fontSize: "12px", color: j === 0 ? D : "rgba(0,0,0,0.5)", fontWeight: j === 0 ? 600 : 400 }}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
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
    <div ref={ref} style={{ background: "#FAFAFA", color: D }}>

      {/* ═══ HERO ═══ */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: "#fff" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 20%, rgba(79,255,176,0.08) 0%, transparent 60%)" }} />

        <div className="max-w-5xl mx-auto text-center relative z-10 px-6">
          <div className="ph-hero opacity-0 mb-6">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold" style={{ background: "#fff", color: D, border: "1px solid #E5E7EB" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: G, boxShadow: `0 0 8px ${G}` }} />
              Strategic Digital Vision & Platform Architecture
            </span>
          </div>

          <h1 className="ph-hero opacity-0 heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-4" style={{ letterSpacing: "-3px" }}>
            OMENA<span style={{ color: G }}>.</span>
          </h1>

          <p className="ph-hero opacity-0 script text-2xl md:text-3xl mb-8" style={{ color: "rgba(0,0,0,0.3)" }}>Digital Platform Architecture & Growth Strategy</p>

          <p className="ph-hero opacity-0 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-6" style={{ color: "rgba(0,0,0,0.4)" }}>
            A comprehensive roadmap to transform OMENA from a marketing agency into an AI-powered digital ecosystem — unifying client acquisition, service delivery, and operations under one intelligent platform.
          </p>

          <p className="ph-hero opacity-0 text-sm mb-14" style={{ color: "rgba(0,0,0,0.25)" }}>
            Prepared by <a href="https://ahmedali.online" target="_blank" rel="noopener" style={{ color: G, fontWeight: 700, textDecoration: "none" }}>Ahmed Ali</a> — Full-Stack Digital Strategist
          </p>

          <div className="ph-hero opacity-0 flex flex-wrap justify-center gap-4 mb-20">
            {[{ n: "4", l: "Core Pillars" }, { n: "38+", l: "Pages Mapped" }, { n: "3", l: "Dev Phases" }, { n: "14-20", l: "Weeks" }].map((s) => (
              <div key={s.l} className="px-6 py-3 rounded-full" style={{ background: G, border: `2px solid ${D}`, boxShadow: `3px 3px 0px 0px ${D}` }}>
                <span className="heading text-lg mr-1">{s.n}</span>
                <span className="text-[11px] font-semibold" style={{ color: "rgba(0,0,0,0.5)" }}>{s.l}</span>
              </div>
            ))}
          </div>

          <div className="ph-hero opacity-0" style={{ animation: "float 3s ease-in-out infinite" }}>
            <ArrowDown size={28} color="rgba(0,0,0,0.15)" />
          </div>
          <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(10px)}}`}</style>
        </div>
      </section>

      {/* ═══ THE PROBLEM — INFOGRAPHIC ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "120px 24px", background: D }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="script text-xl md:text-2xl mb-3" style={{ color: R }}>The Challenge</p>
            <h2 className="heading text-4xl md:text-5xl mb-5" style={{ color: "#fff" }}>Why Most Agencies <span style={{ color: R }}>Fail</span></h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.35)" }}>80% of agencies use 5+ disconnected tools. This creates chaos, churn, and zero differentiation.</p>
          </div>

          {/* Problem process flow */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12 ph-stagger">
            {[
              { icon: AlertTriangle, label: "Scattered Tools", stat: "5+", color: R },
              { icon: ArrowRight, label: "", stat: "", color: "transparent" },
              { icon: Puzzle, label: "No AI Moat", stat: "0%", color: A },
              { icon: ArrowRight, label: "", stat: "", color: "transparent" },
              { icon: Eye, label: "Blind Clients", stat: "67%", color: P },
            ].map((item, i) => (
              item.label ? (
                <div key={i} className="ph-item rounded-[20px] p-6 text-center" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: `${item.color}15`, border: `2px solid ${item.color}30` }}>
                    <item.icon size={24} color={item.color} />
                  </div>
                  <div className="heading text-3xl mb-1" style={{ color: item.color }}>{item.stat}</div>
                  <div className="text-[12px] font-semibold" style={{ color: "#fff" }}>{item.label}</div>
                </div>
              ) : (
                <div key={i} className="hidden md:flex items-center justify-center ph-item">
                  <ArrowRight size={24} color="rgba(255,255,255,0.15)" />
                </div>
              )
            ))}
          </div>

          {/* 3 pain points detailed */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ph-stagger mb-12">
            {[
              { icon: AlertTriangle, title: "Fragmented Operations", desc: "WhatsApp for communication, Trello for tasks, Google Sheets for reports, Canva for assets, email for approvals. Every tool is a silo — data lives in 5+ disconnected places. Teams waste 30% of time context-switching.", points: ["No unified client view", "Data duplication & loss", "30% time wasted switching tools"], color: R },
              { icon: Puzzle, title: "Zero Differentiation", desc: "Every agency pitches the same services with the same decks. Without a proprietary AI product, there's nothing stopping clients from switching to a cheaper alternative. Service commoditization is killing margins.", points: ["Same pitch as competitors", "No proprietary technology", "Price-based competition"], color: A },
              { icon: Eye, title: "Client Trust Gap", desc: "Clients pay thousands monthly but can't see real-time ROI. They wait for monthly reports and wonder what the team is doing. 67% of agency churn comes from perceived lack of transparency and communication.", points: ["No real-time visibility", "Monthly reports feel outdated", "67% churn from opacity"], color: P },
            ].map((item) => (
              <div key={item.title} className="ph-item rounded-[20px] p-7" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${item.color}12` }}>
                  <item.icon size={22} color={item.color} />
                </div>
                <h3 className="heading text-lg mb-3" style={{ color: "#fff" }}>{item.title}</h3>
                <p className="text-[12px] leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>{item.desc}</p>
                <div className="flex flex-col gap-2">
                  {item.points.map((p) => (
                    <div key={p} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                      <span className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-[20px] p-8 text-center" style={{ background: `linear-gradient(135deg, ${G}08, ${P}08)`, border: `1px solid ${G}15` }}>
            <p className="heading text-xl md:text-2xl mb-2" style={{ color: "#fff" }}>The solution isn&apos;t more tools — it&apos;s <span style={{ color: G }}>one platform</span> that does everything.</p>
          </div>
        </div>
      </section>

      {/* ═══ THE VISION — TREE DIAGRAM ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="script text-xl md:text-2xl mb-3" style={{ color: G }}>The Solution</p>
            <h2 className="heading text-4xl md:text-5xl mb-5">One Platform. <span style={{ color: G }}>Infinite Growth.</span></h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(0,0,0,0.4)" }}>Four interconnected pillars forming a self-reinforcing growth loop.</p>
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

          {/* Growth loop */}
          <div className="mt-12 flex items-center justify-center gap-2 flex-wrap">
            {["Attract", "Engage", "Convert", "Serve", "Retain", "Scale"].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <span className="px-5 py-2.5 rounded-full text-[12px] font-bold" style={{ background: i === 5 ? G : "#fff", color: D, border: `2px solid ${i === 5 ? D : "#E5E7EB"}`, boxShadow: i === 5 ? `3px 3px 0px 0px ${D}` : "none" }}>{s}</span>
                {i < 5 && <ArrowRight size={14} color="#D1D5DB" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INTERACTIVE SITEMAP ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#FAFAFA" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="script text-xl md:text-2xl mb-3" style={{ color: G }}>Deep Dive</p>
            <h2 className="heading text-4xl md:text-5xl mb-5">Complete <span style={{ color: G }}>Sitemap</span></h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(0,0,0,0.4)" }}>Every page mapped with purpose, target KPI, and priority.</p>
          </div>

          {/* Tab selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {sitemapTabs.map((tab, i) => (
              <button key={tab.label} onClick={() => setActiveTab(i)} className="flex items-center gap-2 px-5 py-3 rounded-full text-[12px] font-bold cursor-pointer transition-all duration-200" style={{
                background: activeTab === i ? tab.color : "#fff",
                color: activeTab === i ? D : "rgba(0,0,0,0.4)",
                border: `2px solid ${activeTab === i ? D : "#E5E7EB"}`,
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
          />
        </div>
      </section>

      {/* ═══ AI ENGINE — PROCESS DIAGRAM ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="script text-xl md:text-2xl mb-3" style={{ color: P }}>Pillar 02</p>
            <h2 className="heading text-4xl md:text-5xl mb-5">AI SaaS <span style={{ color: P }}>Engine</span></h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(0,0,0,0.4)" }}>OMENA&apos;s biggest competitive advantage — a proprietary AI tool that generates complete marketing strategies in under 30 seconds.</p>
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
            <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.35)" }}>The premium retention tool. Full transparency into every dollar spent, every task completed, and every result — in real-time.</p>
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
                  <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>{s.desc}</p>
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
              <div key={f.title} className="ph-item rounded-[20px] p-6" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${f.color}12` }}>
                    <f.icon size={18} color={f.color} />
                  </div>
                  <span className="heading text-sm" style={{ color: f.color }}>{f.metric}</span>
                </div>
                <h4 className="text-[14px] font-bold mb-1" style={{ color: "#fff" }}>{f.title}</h4>
                <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{f.desc}</p>
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
            <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(0,0,0,0.4)" }}>The operational backbone. Replaces Trello, Asana, and spreadsheets with one system synced to the client portal.</p>
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
      <section className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#FAFAFA" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="script text-xl md:text-2xl mb-3" style={{ color: G }}>Projections</p>
            <h2 className="heading text-4xl md:text-5xl mb-5">Growth <span style={{ color: G }}>Data</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="rounded-[20px] p-8 bg-white border" style={{ borderColor: "#E5E7EB" }}>
              <h3 className="heading text-lg mb-1">Lead Growth Projection</h3>
              <p className="text-[11px] mb-6" style={{ color: "rgba(0,0,0,0.3)" }}>By channel, first 6 months post-launch</p>
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
            <div className="rounded-[20px] p-8 bg-white border" style={{ borderColor: "#E5E7EB" }}>
              <h3 className="heading text-lg mb-1">Traffic Channel Mix</h3>
              <p className="text-[11px] mb-6" style={{ color: "rgba(0,0,0,0.3)" }}>Projected at month 6</p>
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
                    <span className="text-[10px] font-medium" style={{ color: "rgba(0,0,0,0.5)" }}>{c.name} ({c.value}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Competitor chart */}
          <div className="rounded-[20px] p-8 bg-white border" style={{ borderColor: "#E5E7EB" }}>
            <h3 className="heading text-lg mb-1 text-center">OMENA vs. Traditional Agency</h3>
            <p className="text-[11px] text-center mb-6" style={{ color: "rgba(0,0,0,0.3)" }}>Competitive advantage score (0-100)</p>
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
        </div>
      </section>

      {/* ═══ TECH STACK ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="script text-xl mb-3" style={{ color: G }}>Technology</p>
            <h2 className="heading text-4xl md:text-5xl mb-5" style={{ color: "#fff" }}>Tech <span style={{ color: G }}>Stack</span></h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-12 ph-stagger">
            {["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Firebase", "OpenAI / Gemini", "Vercel", "Stripe", "Resend", "GSAP"].map((t) => (
              <span key={t} className="ph-item px-5 py-3 rounded-full text-[12px] font-semibold" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)", color: "#fff" }}>{t}</span>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ph-stagger">
            {[
              { icon: Gauge, label: "90+ Lighthouse", sub: "Performance" },
              { icon: Shield, label: "RLS + Encryption", sub: "Security" },
              { icon: Cloud, label: "Auto-scaling CDN", sub: "Scalability" },
              { icon: Smartphone, label: "PWA + Native Ready", sub: "Mobile" },
            ].map((f) => (
              <div key={f.label} className="ph-item text-center p-5 rounded-[16px]" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)" }}>
                <f.icon size={20} color={G} className="mx-auto mb-2" />
                <div className="text-[13px] font-bold mb-0.5" style={{ color: "#fff" }}>{f.label}</div>
                <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>{f.sub}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-[16px] p-5 text-center" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.4)" }}>
              <strong style={{ color: G }}>Future Development:</strong> Flutter mobile app for clients and team — iOS & Android — for on-the-go access to dashboards, approvals, and notifications.
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
          </div>

          <VisualTimeline phases={[
            { label: "Foundation", color: G, duration: "4–6 Weeks", items: ["Brand design system & component library", "8+ page public website with SEO", "Blog CMS with rich text editor", "Contact forms with intelligent routing", "GA4, GTM, TikTok Pixel integration", "Core Web Vitals optimization (90+)"] },
            { label: "Intelligence", color: P, duration: "6–8 Weeks", items: ["AI questionnaire (8-12 smart questions)", "Strategy engine (SWOT, Persona, Competitors)", "PDF report generator with branding", "Pricing & subscription system (Stripe)", "Client dashboard with live KPI charts", "Content approval workflow & client drive"] },
            { label: "Operations", color: A, duration: "4–6 Weeks", items: ["Admin dashboard with full controls", "Role-based access (4 permission levels)", "Internal task board synced with client view", "Automated workflow engine (6+ triggers)", "Team analytics & health scoring", "In-portal team & client messaging"] },
          ]} />

          <div className="mt-12 text-center">
            <span className="inline-flex items-center gap-2 px-8 py-4 rounded-full heading text-sm" style={{ background: G, color: D, border: `2px solid ${D}`, boxShadow: `4px 4px 0px 0px ${D}` }}>
              <Clock size={16} /> Total: 14–20 weeks from kickoff to full launch
            </span>
          </div>
        </div>
      </section>

      {/* ═══ WHY AHMED ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "120px 24px 80px", background: "#FAFAFA" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="script text-xl md:text-2xl mb-3" style={{ color: G }}>About Me</p>
            <h2 className="heading text-4xl md:text-5xl">Why <span style={{ color: G }}>Ahmed Ali</span>?</h2>
          </div>

          <div className="rounded-[24px] p-8 md:p-12 bg-white border" style={{ borderColor: "#E5E7EB" }}>
            <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
              <img src="/ahmed.jpeg" alt="Ahmed Ali" className="w-28 h-28 rounded-full object-cover" style={{ border: `3px solid ${G}` }} />
              <div>
                <h3 className="heading text-3xl mb-1">Ahmed Ali<span style={{ color: G }}>.</span></h3>
                <p className="text-sm font-semibold mb-3" style={{ color: G }}>Full-Stack Digital Strategist</p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(0,0,0,0.45)" }}>
                  5+ years building digital products across Egypt, Qatar, Saudi Arabia & UAE. I don&apos;t just plan — I design, build, and ship complete platforms. From Ooredoo and QNB to Amazon Egypt and Saudi Airlines, I&apos;ve delivered results for enterprise clients across the MENA region.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 ph-stagger">
              {[{ n: 5, l: "Years", s: "+" }, { n: 50, l: "Projects", s: "+" }, { n: 4, l: "Countries" }, { n: 10, l: "Enterprise", s: "+" }].map((s) => (
                <div key={s.l} className="ph-item text-center p-5 rounded-[16px] border" style={{ borderColor: "#E5E7EB" }}>
                  <div className="heading text-3xl" style={{ color: G }}><span className="ph-num" data-val={s.n}>0</span>{s.s || ""}</div>
                  <div className="text-[11px] font-medium mt-1" style={{ color: "rgba(0,0,0,0.35)" }}>{s.l}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {["Performance Marketing", "SEO & Growth", "Web & App Dev", "AI Integration", "Data Analytics", "Full-Stack Development"].map((s) => (
                <span key={s} className="px-4 py-2 rounded-full text-[11px] font-bold" style={{ background: `${G}12`, color: G, border: `1px solid ${G}25` }}>{s}</span>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://ahmedali.online" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold" style={{ background: G, color: D, border: `2px solid ${D}`, boxShadow: `4px 4px 0px 0px ${D}`, textDecoration: "none" }}>
                View Portfolio <ExternalLink size={16} />
              </a>
              <a href="https://wa.me/201011648156" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold" style={{ background: "#fff", color: D, border: `2px solid ${D}`, boxShadow: `4px 4px 0px 0px ${D}`, textDecoration: "none" }}>
                WhatsApp <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="script text-2xl mb-4" style={{ color: "rgba(0,0,0,0.1)" }}>Let&apos;s build something extraordinary.</p>
            <p className="text-[11px]" style={{ color: "rgba(0,0,0,0.15)" }}>&copy; {new Date().getFullYear()} Ahmed Ali. Prepared exclusively for OMENA.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

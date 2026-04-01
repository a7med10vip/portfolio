"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Globe, BrainCircuit, LayoutDashboard, ShieldCheck,
  AlertTriangle, Puzzle, BarChart3, Zap, Users, FileCheck,
  Bot, LineChart, MessageSquare, CreditCard, Code2,
  Database, Shield, Rocket, Clock, CheckCircle2,
  ArrowRight, ArrowDown, Layers, Target, Lightbulb,
  Search, Megaphone, BookOpen, MapPin, Settings,
  UserCheck, Activity, Workflow, Star, ExternalLink,
  ChevronDown, ChevronRight, Presentation, MonitorSmartphone,
  TrendingUp, Eye, MousePointer, Mail, Lock, Gauge,
  GitBranch, Smartphone, Server, Cloud, Cpu, Palette,
  type LucideIcon
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid
} from "recharts";

gsap.registerPlugin(ScrollTrigger);

/* ─────────── DESIGN TOKENS ─────────── */
const GREEN = "#4FFFB0";
const DARK = "#0A0A0A";
const PURPLE = "#5227FF";
const BLUE = "#3B82F6";
const AMBER = "#F59E0B";
const RED = "#EF4444";

/* ─────────── CHART DATA ─────────── */
const funnelData = [
  { stage: "Visitors", value: 10000 },
  { stage: "Engaged", value: 6500 },
  { stage: "AI Tool Users", value: 3200 },
  { stage: "Leads", value: 1800 },
  { stage: "Clients", value: 720 },
];

const roiProjection = [
  { month: "M1", organic: 400, paid: 800, ai: 0 },
  { month: "M2", organic: 900, paid: 1200, ai: 200 },
  { month: "M3", organic: 1800, paid: 1600, ai: 800 },
  { month: "M4", organic: 3200, paid: 2000, ai: 1800 },
  { month: "M5", organic: 5000, paid: 2200, ai: 3500 },
  { month: "M6", organic: 7500, paid: 2400, ai: 6000 },
];

const channelSplit = [
  { name: "Organic SEO", value: 35, color: GREEN },
  { name: "Paid Ads", value: 25, color: PURPLE },
  { name: "AI Tool", value: 20, color: BLUE },
  { name: "Referral", value: 12, color: AMBER },
  { name: "Direct", value: 8, color: "#E5E7EB" },
];

const competitorData = [
  { feature: "AI Strategy Tool", omena: 95, competitor: 10 },
  { feature: "Client Portal", omena: 90, competitor: 30 },
  { feature: "Real-time ROI", omena: 85, competitor: 15 },
  { feature: "Auto Workflows", omena: 80, competitor: 20 },
  { feature: "Team Transparency", omena: 90, competitor: 25 },
];

/* ─────────── HELPER COMPONENTS ─────────── */
function Badge({ children, color = GREEN }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold" style={{ background: "#fff", color: DARK, border: "1px solid #E5E7EB", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
      <span className="w-2 h-2 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
      {children}
    </span>
  );
}

function RetroBtn({ children, href, bg = GREEN, ...props }: { children: React.ReactNode; href?: string; bg?: string; [k: string]: unknown }) {
  const style = { background: bg, color: DARK, border: `2px solid ${DARK}`, boxShadow: `4px 4px 0px 0px ${DARK}`, borderRadius: "100px", padding: "14px 32px", fontSize: "14px", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none", transition: "all 0.2s" };
  if (href) return <a href={href} target="_blank" rel="noopener" style={style} {...props}>{children}</a>;
  return <span style={style} {...props}>{children}</span>;
}

function SectionHeader({ badge, badgeColor, title, subtitle, titleAccent }: { badge: string; badgeColor?: string; title: string; subtitle: string; titleAccent?: string }) {
  return (
    <div className="text-center mb-20">
      <div className="mb-5"><Badge color={badgeColor}>{badge}</Badge></div>
      <h2 className="heading text-4xl md:text-5xl lg:text-6xl mb-5" style={{ color: DARK }}>
        {title} {titleAccent && <span style={{ color: GREEN }}>{titleAccent}</span>}
      </h2>
      <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(0,0,0,0.45)" }}>{subtitle}</p>
    </div>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-[20px] border" style={{ borderColor: "#E5E7EB" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: DARK }}>
            {headers.map((h) => <th key={h} style={{ padding: "14px 20px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: GREEN, letterSpacing: "1px", textTransform: "uppercase" }}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#FAFAFA", borderBottom: "1px solid #F3F4F6" }}>
              {row.map((cell, j) => <td key={j} style={{ padding: "13px 20px", fontSize: "13px", color: j === 0 ? DARK : "rgba(0,0,0,0.55)", fontWeight: j === 0 ? 600 : 400 }}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc, metric, metricLabel, color = GREEN }: { icon: LucideIcon; title: string; desc: string; metric?: string; metricLabel?: string; color?: string }) {
  return (
    <div className="ph-item rounded-[24px] p-7 bg-white border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ borderColor: "#E5E7EB" }}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${color}15` }}>
          <Icon size={22} color={color} />
        </div>
        {metric && (
          <div className="text-right">
            <div className="heading text-2xl" style={{ color }}>{metric}</div>
            <div className="text-[10px] font-medium" style={{ color: "rgba(0,0,0,0.35)" }}>{metricLabel}</div>
          </div>
        )}
      </div>
      <h4 className="text-[16px] font-bold mb-2" style={{ color: DARK }}>{title}</h4>
      <p className="text-[13px] leading-relaxed" style={{ color: "rgba(0,0,0,0.45)" }}>{desc}</p>
    </div>
  );
}

function FlowNode({ icon: Icon, label, color = GREEN, active = false, onClick }: { icon: LucideIcon; label: string; color?: string; active?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="ph-tree-node flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 hover:-translate-y-1" style={{ background: "none", border: "none" }}>
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300" style={{
        background: active ? color : "#fff",
        border: `2px solid ${active ? DARK : "#E5E7EB"}`,
        boxShadow: active ? `4px 4px 0px 0px ${DARK}` : "0 2px 8px rgba(0,0,0,0.04)",
      }}>
        <Icon size={26} color={active ? DARK : color} />
      </div>
      <span className="text-[12px] font-bold" style={{ color: active ? DARK : "rgba(0,0,0,0.5)" }}>{label}</span>
    </button>
  );
}

/* ─────────── MAIN COMPONENT ─────────── */
export default function OmenaPitch() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<string>("public");
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.fromTo(".ph-hero", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: "power4.out", delay: 0.3 });

      // Slides
      gsap.utils.toArray<HTMLElement>(".ph-slide").forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el, start: "top 60%", end: "bottom 40%",
          onEnter: () => setCurrentSlide(i),
          onEnterBack: () => setCurrentSlide(i),
        });
        gsap.fromTo(el, { y: 80, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      // Stagger groups
      gsap.utils.toArray<HTMLElement>(".ph-stagger").forEach((el) => {
        gsap.fromTo(el.querySelectorAll(".ph-item"), { y: 40, opacity: 0, scale: 0.96 }, {
          y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        });
      });

      // Counters
      gsap.utils.toArray<HTMLElement>(".ph-num").forEach((el) => {
        const val = parseInt(el.dataset.val || "0");
        ScrollTrigger.create({
          trigger: el, start: "top 90%", once: true,
          onEnter: () => gsap.to({ v: 0 }, { v: val, duration: 2.5, ease: "power2.out", onUpdate() { el.textContent = Math.round(this.targets()[0].v).toLocaleString(); } }),
        });
      });

      // Timeline line
      gsap.fromTo(".ph-tl-line", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".ph-tl", start: "top 65%", end: "bottom 40%", scrub: 0.5 } });

      // Flow connector lines
      gsap.fromTo(".ph-connector", { scaleX: 0 }, { scaleX: 1, duration: 1, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: ".ph-flow", start: "top 75%", once: true } });

    }, ref);
    return () => ctx.revert();
  }, []);

  const slideLabels = ["Start", "Problem", "Vision", "Sitemap", "Website", "AI Engine", "Client Portal", "Agency Hub", "Data", "Tech", "Roadmap", "About"];

  const sitemapData: Record<string, { icon: LucideIcon; color: string; pages: { page: string; purpose: string; kpi: string; priority: string }[] }> = {
    public: {
      icon: Globe, color: GREEN,
      pages: [
        { page: "Homepage", purpose: "First impression — hero, social proof, services preview, CTA", kpi: "Bounce rate < 35%", priority: "Critical" },
        { page: "About Us", purpose: "Brand story, team profiles, vision, milestones", kpi: "Avg. time > 2min", priority: "High" },
        { page: "Services Hub", purpose: "SEO, Ads, Branding, Web Dev, AI — each with deep-dive", kpi: "CTA click rate > 8%", priority: "Critical" },
        { page: "Case Studies", purpose: "Detailed project breakdowns with metrics & ROI", kpi: "Lead form fills", priority: "High" },
        { page: "Blog & Resources", purpose: "SEO content hub — articles, guides, whitepapers", kpi: "Organic traffic growth", priority: "High" },
        { page: "Landing Pages", purpose: "Campaign-specific pages with A/B testing", kpi: "Conversion rate > 5%", priority: "Medium" },
        { page: "Branches", purpose: "Office locations, maps, local SEO", kpi: "Local search rankings", priority: "Medium" },
        { page: "Contact", purpose: "Multi-step form with service selection & routing", kpi: "Form completion rate", priority: "Critical" },
      ],
    },
    ai: {
      icon: BrainCircuit, color: PURPLE,
      pages: [
        { page: "AI Landing Page", purpose: "The pitch — why use the AI strategist tool", kpi: "Sign-up rate > 12%", priority: "Critical" },
        { page: "Questionnaire", purpose: "Smart multi-step form — business, goals, challenges", kpi: "Completion rate > 70%", priority: "Critical" },
        { page: "AI Strategy Generator", purpose: "Real-time AI analysis with progress indicator", kpi: "Generation time < 30s", priority: "Critical" },
        { page: "Strategy Report", purpose: "Beautiful PDF with actionable recommendations", kpi: "Share rate > 15%", priority: "High" },
        { page: "Pricing Plans", purpose: "Free, Pro ($49/mo), Enterprise (custom)", kpi: "Upgrade rate > 8%", priority: "High" },
        { page: "User Dashboard", purpose: "Saved strategies, history, account settings", kpi: "Retention rate", priority: "Medium" },
      ],
    },
    client: {
      icon: LayoutDashboard, color: BLUE,
      pages: [
        { page: "KPI Dashboard", purpose: "Live spend, leads, conversions, ROI — beautiful charts", kpi: "Daily active users", priority: "Critical" },
        { page: "My Team", purpose: "See who's working on your project — name, role, status", kpi: "Client satisfaction", priority: "High" },
        { page: "Project Tracker", purpose: "Kanban board — every task, deadline, deliverable", kpi: "Task visibility rate", priority: "Critical" },
        { page: "Content Approvals", purpose: "Review & approve designs/copy with 1-click", kpi: "Approval speed < 24h", priority: "High" },
        { page: "ROI Reports", purpose: "Custom dashboards, exportable for stakeholders", kpi: "Report views/week", priority: "High" },
        { page: "Billing & Invoices", purpose: "Payment history, subscriptions, upcoming charges", kpi: "Self-serve rate > 90%", priority: "Medium" },
        { page: "Presentation Mode", purpose: "Full-screen ROI display for board meetings", kpi: "Usage in meetings", priority: "Medium" },
      ],
    },
    internal: {
      icon: ShieldCheck, color: AMBER,
      pages: [
        { page: "Admin Dashboard", purpose: "Bird's-eye view of all clients, projects, team", kpi: "Decision speed", priority: "Critical" },
        { page: "Staff Roles", purpose: "Granular permissions — manager, designer, intern", kpi: "Security compliance", priority: "High" },
        { page: "Task Board", purpose: "Internal Kanban synced with client dashboard", kpi: "Task completion rate", priority: "Critical" },
        { page: "Client Accounts", purpose: "Add clients, assign teams, set budgets, contracts", kpi: "Onboarding time", priority: "High" },
        { page: "Team Analytics", purpose: "Productivity, completion rates, response times", kpi: "Team efficiency", priority: "Medium" },
        { page: "Automations", purpose: "Trigger workflows: signup → assign → email → meeting", kpi: "Manual tasks reduced", priority: "High" },
      ],
    },
  };

  const activeMap = sitemapData[activeNode];

  return (
    <div ref={ref} style={{ background: "#FAFAFA", color: DARK, fontFamily: "Inter, -apple-system, sans-serif" }}>

      {/* ── FLOATING NAV ── */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden lg:flex items-center gap-0.5 px-1.5 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)", border: "1px solid #E5E7EB", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
        {slideLabels.map((label, i) => (
          <a key={label} href={`#s${i}`} className="px-3 py-1.5 rounded-full text-[10px] font-bold transition-all duration-200 uppercase tracking-wider" style={{
            color: currentSlide === i ? DARK : "rgba(0,0,0,0.3)",
            background: currentSlide === i ? GREEN : "transparent",
          }}>
            {label}
          </a>
        ))}
      </nav>

      {/* ══════════════════════════════
         SLIDE 0: HERO
      ══════════════════════════════ */}
      <section id="s0" className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: "#fff" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 20%, rgba(79,255,176,0.08) 0%, transparent 60%)" }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none opacity-[0.04]" style={{ background: `radial-gradient(circle, ${PURPLE}, transparent 70%)` }} />

        <div className="max-w-5xl mx-auto text-center relative z-10 px-6">
          <div className="ph-hero opacity-0 mb-6"><Badge>Strategic Digital Vision</Badge></div>
          <h1 className="ph-hero opacity-0 heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-4" style={{ color: DARK, letterSpacing: "-3px" }}>
            OMENA<span style={{ color: GREEN }}>.</span>
          </h1>
          <p className="ph-hero opacity-0 script text-2xl md:text-3xl mb-8" style={{ color: "rgba(0,0,0,0.3)" }}>Digital Platform Architecture</p>
          <p className="ph-hero opacity-0 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-6" style={{ color: "rgba(0,0,0,0.45)" }}>
            The complete roadmap to transform OMENA from a marketing agency into an AI-powered, fully synchronized digital ecosystem — attracting leads, converting clients, and scaling operations under one roof.
          </p>
          <p className="ph-hero opacity-0 text-sm mb-16" style={{ color: "rgba(0,0,0,0.25)" }}>
            Prepared by <a href="https://ahmedali.online" target="_blank" rel="noopener" style={{ color: GREEN, fontWeight: 700, textDecoration: "none" }}>Ahmed Ali</a> — Full-Stack Digital Strategist
          </p>

          {/* Stat pills */}
          <div className="ph-hero opacity-0 flex flex-wrap justify-center gap-4 mb-20">
            {[
              { n: "4", l: "Core Pillars" },
              { n: "27", l: "Pages Mapped" },
              { n: "3", l: "Dev Phases" },
              { n: "14-20", l: "Weeks to Launch" },
            ].map((s) => (
              <div key={s.l} className="px-6 py-3 rounded-full" style={{ background: GREEN, border: `2px solid ${DARK}`, boxShadow: `3px 3px 0px 0px ${DARK}` }}>
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

      {/* ══════════════════════════════
         SLIDE 1: THE PROBLEM
      ══════════════════════════════ */}
      <section id="s1" className="ph-slide opacity-0" style={{ padding: "120px 24px", background: DARK }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="mb-5"><span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}><span className="w-2 h-2 rounded-full" style={{ background: RED }} />The Challenge</span></div>
            <h2 className="heading text-4xl md:text-5xl mb-5" style={{ color: "#fff" }}>Where Most Agencies <span style={{ color: RED }}>Fail</span></h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>80% of marketing agencies use 5+ disconnected tools. This creates chaos for teams and distrust from clients.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ph-stagger mb-12">
            {[
              { icon: AlertTriangle, title: "Fragmented Tools", desc: "WhatsApp for communication, Trello for tasks, Google Sheets for reports, Canva for assets. Every tool is a silo. Data lives in 5 different places.", stat: "5+", statLabel: "avg. tools per agency", color: RED },
              { icon: Puzzle, title: "No AI Moat", desc: "Every agency offers the same services with the same pitch. Without a proprietary AI product, there's nothing stopping clients from switching to the next cheaper option.", stat: "0%", statLabel: "differentiation", color: AMBER },
              { icon: Eye, title: "Blind Clients", desc: "Clients pay thousands monthly but can't see real-time ROI. They wait for monthly reports and wonder what the team is doing. This breeds distrust and churn.", stat: "67%", statLabel: "churn from lack of visibility", color: PURPLE },
            ].map((item) => (
              <div key={item.title} className="ph-item rounded-[24px] p-7 relative overflow-hidden" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${item.color}15` }}>
                    <item.icon size={22} color={item.color} />
                  </div>
                  <div className="text-right">
                    <div className="heading text-3xl" style={{ color: item.color }}>{item.stat}</div>
                    <div className="text-[9px] font-medium" style={{ color: "rgba(255,255,255,0.25)" }}>{item.statLabel}</div>
                  </div>
                </div>
                <h3 className="heading text-xl mb-3" style={{ color: "#fff" }}>{item.title}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[24px] p-8 text-center" style={{ background: "linear-gradient(135deg, rgba(79,255,176,0.08), rgba(82,39,255,0.08))", border: "1px solid rgba(79,255,176,0.1)" }}>
            <p className="heading text-xl md:text-2xl mb-2" style={{ color: "#fff" }}>The agencies winning in 2026 aren&apos;t just running ads.</p>
            <p className="text-base" style={{ color: "rgba(255,255,255,0.5)" }}>They&apos;re building <strong style={{ color: GREEN }}>platforms</strong> — and that&apos;s exactly what we&apos;re going to build for OMENA.</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
         SLIDE 2: THE VISION + VENN
      ══════════════════════════════ */}
      <section id="s2" className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader badge="The Vision" title="One Platform." titleAccent="Infinite Growth." subtitle="Four interconnected pillars forming a self-reinforcing ecosystem. Each pillar feeds the next — creating a growth loop that compounds over time." />

          {/* 4 Pillars with connection flow */}
          <div className="ph-flow relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8 ph-stagger">
              {[
                { icon: Globe, title: "Public Website", desc: "Attract & convert visitors", color: GREEN, metric: "10K+", metricLabel: "monthly visitors" },
                { icon: BrainCircuit, title: "AI Engine", desc: "Generate strategies instantly", color: PURPLE, metric: "3.2K", metricLabel: "AI tool users" },
                { icon: LayoutDashboard, title: "Client Portal", desc: "Real-time ROI transparency", color: BLUE, metric: "95%", metricLabel: "client retention" },
                { icon: ShieldCheck, title: "Agency Hub", desc: "Unified operations", color: AMBER, metric: "3x", metricLabel: "team efficiency" },
              ].map((p) => (
                <div key={p.title} className="ph-item text-center p-6 rounded-[24px] border" style={{ borderColor: "#E5E7EB", background: "#fff" }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: `${p.color}12` }}>
                    <p.icon size={26} color={p.color} />
                  </div>
                  <h4 className="heading text-lg mb-1">{p.title}</h4>
                  <p className="text-[11px] mb-3" style={{ color: "rgba(0,0,0,0.4)" }}>{p.desc}</p>
                  <div className="heading text-2xl" style={{ color: p.color }}>{p.metric}</div>
                  <div className="text-[9px] font-medium" style={{ color: "rgba(0,0,0,0.25)" }}>{p.metricLabel}</div>
                </div>
              ))}
            </div>

            {/* Flow arrows */}
            <div className="hidden md:flex items-center justify-center gap-2 mb-12">
              {["Attract", "Convert", "Retain", "Optimize", "Scale"].map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <span className="px-4 py-2 rounded-full text-[11px] font-bold" style={{ background: i === 4 ? GREEN : "#fff", color: DARK, border: `1.5px solid ${i === 4 ? DARK : "#E5E7EB"}`, boxShadow: i === 4 ? `3px 3px 0px 0px ${DARK}` : "none" }}>{s}</span>
                  {i < 4 && <ArrowRight size={16} color="#D1D5DB" />}
                </div>
              ))}
            </div>
          </div>

          {/* Competitor comparison chart */}
          <div className="rounded-[24px] p-8 border" style={{ borderColor: "#E5E7EB", background: "#fff" }}>
            <h3 className="heading text-2xl mb-2 text-center">OMENA vs. Traditional Agency</h3>
            <p className="text-[12px] text-center mb-8" style={{ color: "rgba(0,0,0,0.35)" }}>Competitive advantage score by feature</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={competitorData} layout="vertical" barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fill: "#9CA3AF", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="feature" type="category" width={130} tick={{ fill: "#374151", fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} />
                <Bar dataKey="omena" name="OMENA" fill={GREEN} radius={[0, 6, 6, 0]} barSize={14} />
                <Bar dataKey="competitor" name="Avg. Agency" fill="#E5E7EB" radius={[0, 6, 6, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
         SLIDE 3: INTERACTIVE SITEMAP
      ══════════════════════════════ */}
      <section id="s3" className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#FAFAFA" }}>
        <div className="max-w-6xl mx-auto">
          <SectionHeader badge="Architecture" title="Interactive" titleAccent="Sitemap" subtitle="Click on any pillar to explore every page, its purpose, KPIs, and priority level." />

          {/* Node selector */}
          <div className="flex justify-center gap-6 md:gap-10 mb-12">
            {(Object.entries(sitemapData) as [string, typeof sitemapData[string]][]).map(([key, data]) => (
              <FlowNode key={key} icon={data.icon} label={key === "public" ? "Website" : key === "ai" ? "AI Engine" : key === "client" ? "Client Portal" : "Agency Hub"} color={data.color} active={activeNode === key} onClick={() => setActiveNode(key)} />
            ))}
          </div>

          {/* Connection lines */}
          <div className="hidden md:flex justify-center mb-10">
            <div className="flex items-center gap-0" style={{ width: "60%" }}>
              {[GREEN, PURPLE, BLUE].map((c, i) => (
                <div key={i} className="ph-connector origin-left flex-1 h-[2px]" style={{ background: `linear-gradient(90deg, ${c}, ${[PURPLE, BLUE, AMBER][i]})` }} />
              ))}
            </div>
          </div>

          {/* Page table */}
          <div className="transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${activeMap.color}15` }}>
                <activeMap.icon size={20} color={activeMap.color} />
              </div>
              <div>
                <h3 className="heading text-2xl">{activeNode === "public" ? "Public Website" : activeNode === "ai" ? "AI SaaS Engine" : activeNode === "client" ? "Client Dashboard" : "Internal Agency Hub"}</h3>
                <span className="text-[12px]" style={{ color: "rgba(0,0,0,0.35)" }}>{activeMap.pages.length} pages</span>
              </div>
            </div>

            <DataTable
              headers={["Page", "Purpose", "Target KPI", "Priority"]}
              rows={activeMap.pages.map((p) => [p.page, p.purpose, p.kpi, p.priority])}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
         SLIDE 4-7: PILLAR DEEP DIVES
      ══════════════════════════════ */}
      {/* PUBLIC WEBSITE */}
      <section id="s4" className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader badge="Pillar 01" badgeColor={GREEN} title="Public" titleAccent="Website" subtitle="The high-converting marketing engine. Every page designed with a specific goal and measurable KPI." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ph-stagger mb-12">
            <FeatureCard icon={Layers} title="Homepage — The First Impression" desc="Hero with value proposition, animated statistics, client logos (social proof), services grid, featured case studies, conversion CTA, and live chat. Optimized for < 3s load time." metric="< 35%" metricLabel="bounce rate target" />
            <FeatureCard icon={Search} title="SEO Infrastructure" desc="Technical SEO from day one: schema markup (JSON-LD), dynamic sitemaps, robots.txt, Open Graph, canonical URLs, Core Web Vitals optimization, and structured data for rich snippets." metric="Top 10" metricLabel="within 8 months" />
            <FeatureCard icon={Megaphone} title="Services Deep-Dives" desc="Each service (SEO, Ads, Branding, Web Dev, AI) gets its own page with: process breakdown, deliverables table, pricing hints, case study links, and a service-specific CTA." metric="8%" metricLabel="CTA click rate" />
            <FeatureCard icon={Target} title="Conversion System" desc="Multi-step inquiry form with: service selection, budget range, timeline picker, file upload, and intelligent routing. Integrated with CRM and WhatsApp notification." metric="> 5%" metricLabel="conversion rate" />
          </div>

          {/* Conversion Funnel Chart */}
          <div className="rounded-[24px] p-8 border" style={{ borderColor: "#E5E7EB" }}>
            <h3 className="heading text-xl mb-2 text-center">Projected Conversion Funnel</h3>
            <p className="text-[11px] text-center mb-6" style={{ color: "rgba(0,0,0,0.3)" }}>Monthly visitor to client conversion path</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={funnelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                <XAxis dataKey="stage" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#9CA3AF", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "12px" }} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={50}>
                  {funnelData.map((_, i) => <Cell key={i} fill={[GREEN, "#66FFD1", PURPLE, BLUE, DARK][i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* AI ENGINE */}
      <section id="s5" className="ph-slide opacity-0" style={{ padding: "120px 24px", background: DARK }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="mb-5"><span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}><span className="w-2 h-2 rounded-full" style={{ background: PURPLE }} />Pillar 02</span></div>
            <h2 className="heading text-4xl md:text-5xl mb-5" style={{ color: "#fff" }}>AI SaaS <span style={{ color: PURPLE }}>Engine</span></h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>OMENA&apos;s biggest competitive advantage. A proprietary AI tool that generates custom marketing strategies in under 30 seconds.</p>
          </div>

          {/* User journey flow */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-12 ph-stagger">
            {[
              { icon: Search, step: "01", title: "Discover", desc: "User lands on AI tool page via ad, blog, or referral. Sees the value proposition and starts free." },
              { icon: Bot, step: "02", title: "Engage", desc: "Answers 8-12 smart questions about their business, budget, industry, goals, and competition." },
              { icon: BrainCircuit, step: "03", title: "Generate", desc: "AI analyzes inputs against industry benchmarks and generates a personalized strategy report." },
              { icon: Rocket, step: "04", title: "Convert", desc: "User downloads report, shares with team. CTA to book a strategy call or upgrade to Pro." },
            ].map((s) => (
              <div key={s.step} className="ph-item text-center p-6 rounded-[24px]" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="heading text-sm mb-3" style={{ color: PURPLE }}>Step {s.step}</div>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: `${PURPLE}15` }}>
                  <s.icon size={24} color={PURPLE} />
                </div>
                <h4 className="heading text-lg mb-2" style={{ color: "#fff" }}>{s.title}</h4>
                <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ph-stagger">
            {[
              { plan: "Free", price: "$0", desc: "Perfect for trying the tool", features: ["1 AI-generated strategy", "Basic channel recommendations", "Email delivery of report", "General benchmarks"], hl: false },
              { plan: "Pro", price: "$49/mo", desc: "For growing businesses", features: ["Unlimited strategies", "Competitor deep analysis", "Custom KPI targets", "Priority AI model", "Monthly trend reports", "WhatsApp support"], hl: true },
              { plan: "Enterprise", price: "Custom", desc: "For agencies & teams", features: ["White-label reports", "API access", "Custom AI training", "Dedicated account manager", "SLA guarantee", "Bulk pricing"], hl: false },
            ].map((t) => (
              <div key={t.plan} className="ph-item rounded-[24px] p-7" style={{ background: t.hl ? GREEN : "#111", border: t.hl ? `2px solid ${DARK}` : "1px solid rgba(255,255,255,0.06)", boxShadow: t.hl ? `6px 6px 0px 0px ${DARK}` : "none" }}>
                <div className="text-[10px] font-bold tracking-[2px] uppercase mb-1" style={{ color: t.hl ? DARK : PURPLE }}>{t.plan}</div>
                <div className="heading text-3xl mb-1" style={{ color: t.hl ? DARK : "#fff" }}>{t.price}</div>
                <p className="text-[11px] mb-5" style={{ color: t.hl ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.3)" }}>{t.desc}</p>
                {t.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5 mb-2">
                    <CheckCircle2 size={14} color={t.hl ? DARK : GREEN} />
                    <span className="text-[12px]" style={{ color: t.hl ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.5)" }}>{f}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT PORTAL */}
      <section id="s6" className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader badge="Pillar 03" badgeColor={BLUE} title="Client" titleAccent="Dashboard" subtitle="The premium retention tool. Full transparency into every dollar spent, every task completed, and every result achieved — in real-time." />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ph-stagger mb-12">
            <FeatureCard icon={BarChart3} title="Live KPI Dashboard" desc="Real-time metrics: ad spend, leads, conversions, cost-per-lead, and ROI. Auto-refreshing charts. Compare current vs. previous period." metric="Real-time" metricLabel="data updates" color={BLUE} />
            <FeatureCard icon={Users} title="Team Workspace" desc="Client sees their dedicated team: name, photo, role, online status. Direct messaging to their account manager. Full transparency." metric="95%" metricLabel="satisfaction target" color={GREEN} />
            <FeatureCard icon={Activity} title="Project Tracker" desc="Kanban board with every deliverable. Status badges: In Progress, Under Review, Approved, Live. Due dates and assignees visible." metric="100%" metricLabel="task visibility" color={PURPLE} />
            <FeatureCard icon={FileCheck} title="1-Click Approvals" desc="Creative assets, ad copy, blog posts — all reviewed in one place. Approve, request changes, or reject with one click. Version history." metric="< 24h" metricLabel="avg approval time" color={AMBER} />
            <FeatureCard icon={LineChart} title="ROI Reports" desc="Custom report builder: select metrics, date range, channels. Export as PDF, share link, or present in full-screen mode for board meetings." metric="Weekly" metricLabel="auto-generated" color={BLUE} />
            <FeatureCard icon={CreditCard} title="Billing Center" desc="Invoice history, current plan, upcoming charges, payment methods. Auto-receipts via email. Upgrade/downgrade self-serve." metric="> 90%" metricLabel="self-serve rate" color={GREEN} />
          </div>
        </div>
      </section>

      {/* AGENCY HUB */}
      <section id="s7" className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#FAFAFA" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader badge="Pillar 04" badgeColor={AMBER} title="Internal" titleAccent="Agency Hub" subtitle="The operational backbone. Replaces Trello, Asana, and spreadsheets with one unified system that syncs with the client dashboard." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ph-stagger">
            <FeatureCard icon={ShieldCheck} title="Super Admin Dashboard" desc="Bird's-eye view: total clients, active projects, revenue, team utilization. Filter by status, priority, client, or team member. Real-time alerts for overdue tasks." metric="360°" metricLabel="visibility" color={AMBER} />
            <FeatureCard icon={UserCheck} title="Role-Based Access" desc="Granular permissions: Owner, Manager, Specialist, Intern. Each role sees only what they need. Audit log for compliance." metric="4" metricLabel="permission levels" color={GREEN} />
            <FeatureCard icon={Activity} title="Synced Task Board" desc="Internal Kanban that auto-syncs with client portal. When team moves a task, client sees the update. Two-way status sync." metric="Auto" metricLabel="sync with clients" color={BLUE} />
            <FeatureCard icon={Workflow} title="Automated Workflows" desc="Trigger chains: new client → assign team → send welcome email → create project → schedule kickoff. Reduces manual work by 70%." metric="-70%" metricLabel="manual tasks" color={PURPLE} />
            <FeatureCard icon={BarChart3} title="Team Analytics" desc="Per-member metrics: tasks completed, avg. response time, client satisfaction score. Identify top performers and bottlenecks." metric="Per team" metricLabel="performance tracking" color={AMBER} />
            <FeatureCard icon={Settings} title="Client Account Manager" desc="Onboard new clients in minutes: create account, assign plan, set budget cap, upload contract, invite to portal. Full lifecycle management." metric="< 10min" metricLabel="client onboarding" color={GREEN} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
         SLIDE 8: DATA & PROJECTIONS
      ══════════════════════════════ */}
      <section id="s8" className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader badge="Projections" title="Growth" titleAccent="Data" subtitle="Estimated traffic and revenue projections for the first 6 months after platform launch." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Lead Growth Chart */}
            <div className="rounded-[24px] p-8 border" style={{ borderColor: "#E5E7EB" }}>
              <h3 className="heading text-lg mb-1">Lead Growth Projection</h3>
              <p className="text-[11px] mb-6" style={{ color: "rgba(0,0,0,0.3)" }}>By channel, first 6 months</p>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={roiProjection}>
                  <defs>
                    <linearGradient id="gOrg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={GREEN} stopOpacity={0.2} /><stop offset="100%" stopColor={GREEN} stopOpacity={0} /></linearGradient>
                    <linearGradient id="gPaid" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={PURPLE} stopOpacity={0.2} /><stop offset="100%" stopColor={PURPLE} stopOpacity={0} /></linearGradient>
                    <linearGradient id="gAI" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={BLUE} stopOpacity={0.2} /><stop offset="100%" stopColor={BLUE} stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="month" tick={{ fill: "#9CA3AF", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#9CA3AF", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "12px" }} />
                  <Area type="monotone" dataKey="organic" name="Organic" stroke={GREEN} strokeWidth={2} fill="url(#gOrg)" />
                  <Area type="monotone" dataKey="paid" name="Paid" stroke={PURPLE} strokeWidth={2} fill="url(#gPaid)" />
                  <Area type="monotone" dataKey="ai" name="AI Tool" stroke={BLUE} strokeWidth={2} fill="url(#gAI)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Channel Split Pie */}
            <div className="rounded-[24px] p-8 border" style={{ borderColor: "#E5E7EB" }}>
              <h3 className="heading text-lg mb-1">Traffic Channel Mix</h3>
              <p className="text-[11px] mb-6" style={{ color: "rgba(0,0,0,0.3)" }}>Projected at month 6</p>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={channelSplit} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                    {channelSplit.map((entry, i) => <Cell key={i} fill={entry.color} stroke="none" />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {channelSplit.map((c) => (
                  <div key={c.name} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                    <span className="text-[11px] font-medium" style={{ color: "rgba(0,0,0,0.5)" }}>{c.name} ({c.value}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
         SLIDE 9: TECH STACK
      ══════════════════════════════ */}
      <section id="s9" className="ph-slide opacity-0" style={{ padding: "120px 24px", background: DARK }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="mb-5"><span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}><span className="w-2 h-2 rounded-full" style={{ background: GREEN }} />Technology</span></div>
            <h2 className="heading text-4xl md:text-5xl mb-5" style={{ color: "#fff" }}>Tech Stack & <span style={{ color: GREEN }}>Architecture</span></h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-16 ph-stagger">
            {[
              "Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Firebase",
              "OpenAI / Gemini", "Vercel", "Stripe", "Flutter", "GSAP", "Resend",
            ].map((t) => (
              <div key={t} className="ph-item flex items-center gap-2 px-5 py-3 rounded-full" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}>
                <Code2 size={14} color={GREEN} />
                <span className="text-[12px] font-semibold" style={{ color: "#fff" }}>{t}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ph-stagger">
            {[
              { icon: Gauge, title: "Performance", desc: "90+ Lighthouse, edge caching, code splitting", color: GREEN },
              { icon: Shield, title: "Security", desc: "RLS, encryption, OWASP, audit logs", color: BLUE },
              { icon: Cloud, title: "Scalability", desc: "Serverless, auto-scaling, global CDN", color: PURPLE },
              { icon: Smartphone, title: "Mobile-First", desc: "Responsive design, PWA, native app ready", color: AMBER },
            ].map((f) => (
              <div key={f.title} className="ph-item text-center p-6 rounded-[20px]" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: `${f.color}15` }}>
                  <f.icon size={20} color={f.color} />
                </div>
                <h4 className="text-[14px] font-bold mb-1" style={{ color: "#fff" }}>{f.title}</h4>
                <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
         SLIDE 10: ROADMAP TIMELINE
      ══════════════════════════════ */}
      <section id="s10" className="ph-slide opacity-0 ph-tl" style={{ padding: "120px 24px", background: "#fff" }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeader badge="Execution" title="Development" titleAccent="Roadmap" subtitle="A phased approach that delivers value early and builds momentum. Each phase is independently deployable." />

          <div className="relative">
            <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2" style={{ background: "#E5E7EB" }} />
            <div className="ph-tl-line absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] origin-top md:-translate-x-1/2" style={{ background: `linear-gradient(to bottom, ${GREEN}, ${PURPLE}, ${AMBER})` }} />

            {[
              { phase: "Phase 1", title: "Foundation & Public Site", duration: "4–6 Weeks", color: GREEN, items: ["Brand design system & component library", "8+ page public website with SEO", "Blog CMS with rich editor", "Contact forms with intelligent routing", "Google Analytics 4, GTM, TikTok Pixel", "Performance optimization (90+ Lighthouse)"] },
              { phase: "Phase 2", title: "AI Engine & Client Portal", duration: "6–8 Weeks", color: PURPLE, items: ["AI questionnaire (8-12 smart questions)", "Strategy generation engine (OpenAI/Gemini)", "Beautiful PDF report generator", "Pricing & subscription system (Stripe)", "Client dashboard with live KPIs", "Content approval workflow"] },
              { phase: "Phase 3", title: "Agency Hub & Automation", duration: "4–6 Weeks", color: AMBER, items: ["Admin dashboard with full controls", "Role-based access (4 permission levels)", "Internal task board synced with client view", "Automated workflow engine", "Team performance analytics", "Flutter mobile app (optional add-on)"] },
            ].map((p, i) => (
              <div key={p.phase} className={`relative flex flex-col md:flex-row items-start mb-16 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                <div className="absolute left-[16px] md:left-1/2 w-4 h-4 rounded-full md:-translate-x-1/2 z-10" style={{ background: p.color, boxShadow: `0 0 12px ${p.color}50`, top: "10px" }} />
                <div className={`ml-12 md:ml-0 ${i % 2 === 0 ? "md:w-1/2 md:pr-14" : "md:w-1/2 md:pl-14"} ${i % 2 === 0 ? "md:text-right" : ""}`}>
                  <div className="rounded-[24px] p-7 border bg-white" style={{ borderColor: "#E5E7EB" }}>
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                      <span className="px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[1.5px] uppercase" style={{ background: `${p.color}12`, color: p.color }}>{p.phase}</span>
                      <span className="text-[11px] font-medium flex items-center gap-1" style={{ color: "rgba(0,0,0,0.3)" }}><Clock size={12} />{p.duration}</span>
                    </div>
                    <h3 className="heading text-xl mb-4">{p.title}</h3>
                    <div className="flex flex-col gap-2.5">
                      {p.items.map((item) => (
                        <div key={item} className={`flex items-center gap-2.5 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                          <CheckCircle2 size={14} color={p.color} className="flex-shrink-0" />
                          <span className="text-[12px] font-medium" style={{ color: "rgba(0,0,0,0.5)" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full" style={{ background: GREEN, border: `2px solid ${DARK}`, boxShadow: `4px 4px 0px 0px ${DARK}` }}>
              <Clock size={16} color={DARK} />
              <span className="heading text-sm">Total: 14–20 weeks from kickoff to full launch</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
         SLIDE 11: WHY AHMED ALI
      ══════════════════════════════ */}
      <section id="s11" className="ph-slide opacity-0" style={{ padding: "120px 24px 80px", background: "#FAFAFA" }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeader badge="About Me" title="Why" titleAccent="Ahmed Ali?" subtitle="" />

          <div className="rounded-[24px] p-8 md:p-12 bg-white border" style={{ borderColor: "#E5E7EB" }}>
            <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
              <img src="/ahmed.jpeg" alt="Ahmed Ali" className="w-28 h-28 rounded-full object-cover" style={{ border: `3px solid ${GREEN}` }} />
              <div>
                <h3 className="heading text-3xl mb-1">Ahmed Ali<span style={{ color: GREEN }}>.</span></h3>
                <p className="text-sm font-semibold mb-3" style={{ color: GREEN }}>Full-Stack Digital Strategist</p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(0,0,0,0.45)" }}>
                  5+ years building digital products across Egypt, Qatar, Saudi Arabia & UAE. I don&apos;t just create strategies — I build and ship the platforms behind them. Clients include Ooredoo, QNB, Amazon Egypt, Saudi Airlines, and Mohammed BinGhatti.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 ph-stagger">
              {[
                { num: 5, label: "Years Experience", suffix: "+" },
                { num: 50, label: "Projects Shipped", suffix: "+" },
                { num: 4, label: "Countries Served" },
                { num: 10, label: "Enterprise Clients", suffix: "+" },
              ].map((s) => (
                <div key={s.label} className="ph-item text-center p-5 rounded-[16px] border" style={{ borderColor: "#E5E7EB" }}>
                  <div className="heading text-3xl" style={{ color: GREEN }}><span className="ph-num" data-val={s.num}>0</span>{s.suffix || ""}</div>
                  <div className="text-[11px] font-medium mt-1" style={{ color: "rgba(0,0,0,0.35)" }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {["Performance Marketing", "SEO & Growth", "Web & App Dev", "AI Integration", "Data Analytics", "Full-Stack Development"].map((s) => (
                <span key={s} className="px-4 py-2 rounded-full text-[11px] font-bold" style={{ background: `${GREEN}12`, color: GREEN, border: `1px solid ${GREEN}25` }}>{s}</span>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <RetroBtn href="https://ahmedali.online">View Portfolio <ExternalLink size={16} /></RetroBtn>
              <RetroBtn href="https://wa.me/201011648156" bg="#fff">WhatsApp <ArrowRight size={16} /></RetroBtn>
              <RetroBtn href="mailto:hello@ahmedali.online" bg="#fff">Email <Mail size={16} /></RetroBtn>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="script text-2xl mb-4" style={{ color: "rgba(0,0,0,0.15)" }}>Let&apos;s build something extraordinary.</p>
            <p className="text-[11px]" style={{ color: "rgba(0,0,0,0.15)" }}>&copy; {new Date().getFullYear()} Ahmed Ali. Prepared exclusively for OMENA.</p>
          </div>
        </div>
      </section>

    </div>
  );
}

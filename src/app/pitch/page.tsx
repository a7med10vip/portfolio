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
  ChevronDown, Presentation, MonitorSmartphone
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function OmenaPitch() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedNode, setExpandedNode] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(".ph-hero", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power4.out", delay: 0.3 });

      // Each full-screen section
      gsap.utils.toArray<HTMLElement>(".ph-slide").forEach((el) => {
        gsap.fromTo(el, { y: 80, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        });
      });

      // Stagger children
      gsap.utils.toArray<HTMLElement>(".ph-stagger").forEach((el) => {
        const items = el.querySelectorAll(".ph-item");
        gsap.fromTo(items, { y: 50, opacity: 0, scale: 0.95 }, {
          y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        });
      });

      // Counters
      gsap.utils.toArray<HTMLElement>(".ph-counter").forEach((el) => {
        const target = parseInt(el.dataset.val || "0");
        ScrollTrigger.create({
          trigger: el, start: "top 88%", once: true,
          onEnter: () => {
            gsap.to({ v: 0 }, {
              v: target, duration: 2.5, ease: "power2.out",
              onUpdate() { el.textContent = Math.round(this.targets()[0].v).toString(); },
            });
          },
        });
      });

      // Timeline line grow
      gsap.fromTo(".ph-timeline-line", { scaleY: 0 }, {
        scaleY: 1, ease: "none",
        scrollTrigger: { trigger: ".ph-timeline", start: "top 70%", end: "bottom 50%", scrub: 0.5 },
      });

      // Sitemap tree lines
      gsap.fromTo(".ph-tree-line", { scaleX: 0 }, {
        scaleX: 1, duration: 0.8, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: ".ph-tree", start: "top 75%", once: true },
      });

      // Sitemap nodes
      gsap.fromTo(".ph-tree-node", { scale: 0, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 0.5, stagger: 0.06, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".ph-tree", start: "top 75%", once: true, },
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ background: "#0A0A0A", color: "#fff" }}>

      {/* ===========================
          SLIDE 1: HERO
      =========================== */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ padding: "80px 24px" }}>
        {/* BG glow */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-[0.08] pointer-events-none" style={{ background: "radial-gradient(circle, #4FFFB0, transparent 70%)" }} />
        <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.05] pointer-events-none" style={{ background: "radial-gradient(circle, #5227FF, transparent 70%)" }} />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="ph-hero opacity-0 mb-6">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: "#4FFFB0", boxShadow: "0 0 8px #4FFFB0" }} />
              Strategic Digital Vision
            </span>
          </div>

          <h1 className="ph-hero opacity-0 heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6" style={{ color: "#fff" }}>
            OMENA<span style={{ color: "#4FFFB0" }}>.</span>
          </h1>

          <p className="ph-hero opacity-0 heading text-2xl md:text-3xl mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
            Digital Platform Vision
          </p>

          <p className="ph-hero opacity-0 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
            The complete architectural roadmap to transform OMENA into an AI-powered, fully synchronized digital ecosystem.
          </p>

          <p className="ph-hero opacity-0 text-sm mb-14" style={{ color: "rgba(255,255,255,0.3)" }}>
            Prepared by{" "}
            <a href="https://ahmedali.online" target="_blank" rel="noopener" style={{ color: "#4FFFB0", fontWeight: 600, textDecoration: "none" }}>Ahmed Ali</a>
            {" "}— Full-Stack Digital Strategist
          </p>

          {/* Stats row */}
          <div className="ph-hero opacity-0 flex flex-wrap justify-center gap-8 mb-16">
            {[
              { num: 4, label: "Core Pillars" },
              { num: 30, label: "Pages & Features", suffix: "+" },
              { num: 3, label: "Dev Phases" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="heading text-4xl md:text-5xl" style={{ color: "#4FFFB0" }}>
                  <span className="ph-counter" data-val={s.num}>0</span>{s.suffix || ""}
                </div>
                <div className="text-xs font-medium mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div className="ph-hero opacity-0" style={{ animation: "float 3s ease-in-out infinite" }}>
            <ArrowDown size={28} color="rgba(255,255,255,0.25)" />
          </div>
          <style>{`@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(10px); } }`}</style>
        </div>
      </section>

      {/* ===========================
          SLIDE 2: THE PROBLEM
      =========================== */}
      <section className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#0A0A0A" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="script text-xl md:text-2xl mb-3" style={{ color: "#4FFFB0" }}>The Challenge</p>
            <h2 className="heading text-3xl md:text-5xl mb-5" style={{ color: "#fff" }}>Where OMENA Stands Today</h2>
            <p className="text-sm md:text-base max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
              Scattered tools, no unified platform, and zero client visibility. The opportunity? Building a system that puts you years ahead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ph-stagger">
            {[
              { icon: AlertTriangle, title: "Scattered Systems", desc: "WhatsApp for comms, Trello for tasks, spreadsheets for reports. No single source of truth.", color: "#ff6b6b" },
              { icon: Puzzle, title: "No AI Differentiation", desc: "Every agency offers the same services. Without an AI product, there's no moat — no reason clients stay.", color: "#F59E0B" },
              { icon: BarChart3, title: "Zero Client Visibility", desc: "Clients can't see ROI in real-time. They wait for monthly reports and wonder what's happening.", color: "#5227FF" },
            ].map((item) => (
              <div key={item.title} className="ph-item rounded-[24px] p-7 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: `${item.color}15` }}>
                  <item.icon size={22} color={item.color} />
                </div>
                <h3 className="heading text-xl mb-3" style={{ color: "#fff" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-[24px] p-8 text-center" style={{ background: "linear-gradient(135deg, rgba(79,255,176,0.06), rgba(82,39,255,0.06))", border: "1px solid rgba(79,255,176,0.1)" }}>
            <p className="heading text-xl md:text-2xl mb-2" style={{ color: "#fff" }}>
              The agencies winning in 2026 aren&apos;t just running ads.
            </p>
            <p className="text-base" style={{ color: "rgba(255,255,255,0.5)" }}>
              They&apos;re building <strong style={{ color: "#4FFFB0" }}>platforms</strong> — and that&apos;s exactly what we&apos;re going to do.
            </p>
          </div>
        </div>
      </section>

      {/* ===========================
          SLIDE 3: THE VISION - 4 PILLARS
      =========================== */}
      <section className="ph-slide opacity-0" style={{ padding: "120px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="script text-xl md:text-2xl mb-3" style={{ color: "#4FFFB0" }}>The Vision</p>
            <h2 className="heading text-3xl md:text-5xl mb-5" style={{ color: "#fff" }}>
              One Platform. <span style={{ color: "#4FFFB0" }}>Infinite Growth.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ph-stagger">
            {[
              { num: "01", icon: Globe, title: "Public Website", desc: "The marketing engine — attract, educate, convert.", bg: "#fff", color: "#0A0A0A" },
              { num: "02", icon: BrainCircuit, title: "AI SaaS Engine", desc: "The differentiator — AI strategies in seconds.", bg: "#4FFFB0", color: "#0A0A0A" },
              { num: "03", icon: LayoutDashboard, title: "Client Dashboard", desc: "The retention tool — real-time ROI, full transparency.", bg: "#fff", color: "#0A0A0A" },
              { num: "04", icon: ShieldCheck, title: "Internal Agency Hub", desc: "The backbone — unified team operations.", bg: "#4FFFB0", color: "#0A0A0A" },
            ].map((p) => (
              <div key={p.num} className="ph-item rounded-[24px] p-8 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1" style={{ background: p.bg, border: p.bg === "#fff" ? "none" : "none" }}>
                <span className="heading absolute -top-2 -right-1 text-[100px] leading-none pointer-events-none select-none" style={{ color: p.bg === "#fff" ? "rgba(79,255,176,0.1)" : "rgba(0,0,0,0.08)" }}>{p.num}</span>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: p.bg === "#fff" ? "rgba(79,255,176,0.12)" : "rgba(0,0,0,0.08)" }}>
                  <p.icon size={22} color={p.color} />
                </div>
                <h3 className="heading text-2xl mb-2" style={{ color: p.color }}>{p.title}</h3>
                <p className="text-sm" style={{ color: p.bg === "#fff" ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.5)" }}>{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Flow */}
          <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
            {["Attract", "Convert", "Serve", "Optimize"].map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold" style={{ background: "#4FFFB0", color: "#0A0A0A", border: "2px solid #0A0A0A", boxShadow: "3px 3px 0px 0px #0A0A0A" }}>
                  {s}
                </span>
                {i < 3 && <ArrowRight size={18} color="rgba(255,255,255,0.2)" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
          SLIDE 4: INTERACTIVE SITEMAP TREE
      =========================== */}
      <section className="ph-slide opacity-0" style={{ padding: "120px 24px" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="script text-xl md:text-2xl mb-3" style={{ color: "#4FFFB0" }}>Architecture</p>
            <h2 className="heading text-3xl md:text-5xl mb-5" style={{ color: "#fff" }}>Platform Sitemap</h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Click on any section to explore its pages</p>
          </div>

          {/* INTERACTIVE TREE */}
          <div className="ph-tree relative">
            {/* Root node */}
            <div className="flex justify-center mb-8">
              <div className="ph-tree-node px-8 py-4 rounded-full heading text-xl" style={{ background: "#4FFFB0", color: "#0A0A0A", border: "2px solid #0A0A0A", boxShadow: "4px 4px 0px 0px #0A0A0A" }}>
                OMENA Platform
              </div>
            </div>

            {/* Connection lines from root */}
            <div className="flex justify-center mb-6">
              <div className="w-[2px] h-10 ph-tree-line origin-top" style={{ background: "#4FFFB0" }} />
            </div>

            {/* Horizontal connector */}
            <div className="hidden md:flex justify-center mb-6">
              <div className="ph-tree-line origin-left" style={{ width: "70%", height: "2px", background: "linear-gradient(90deg, rgba(79,255,176,0.2), #4FFFB0, rgba(79,255,176,0.2))" }} />
            </div>

            {/* 4 Branch nodes */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 ph-stagger">
              {[
                {
                  id: "public", icon: Globe, title: "Public Website", color: "#fff",
                  pages: [
                    { icon: Layers, label: "Homepage", desc: "Hero, social proof, services, CTA" },
                    { icon: Users, label: "About Us", desc: "Vision, team, culture, milestones" },
                    { icon: Megaphone, label: "Services Hub", desc: "SEO, Ads, Branding, Web Dev, AI" },
                    { icon: Star, label: "Case Studies", desc: "Metrics, before/after, testimonials" },
                    { icon: BookOpen, label: "Blog & Resources", desc: "SEO content, guides, insights" },
                    { icon: Target, label: "Landing Pages", desc: "Campaign-specific, A/B tested" },
                    { icon: MapPin, label: "Branches", desc: "Locations, maps, local SEO" },
                    { icon: MessageSquare, label: "Contact", desc: "Multi-step form, routing" },
                  ]
                },
                {
                  id: "ai", icon: BrainCircuit, title: "AI Engine", color: "#4FFFB0",
                  pages: [
                    { icon: Lightbulb, label: "AI Landing Page", desc: "The pitch for the AI tool" },
                    { icon: Search, label: "Questionnaire", desc: "Smart multi-step form" },
                    { icon: BrainCircuit, label: "Strategy Generator", desc: "AI analysis & report" },
                    { icon: CreditCard, label: "Pricing Plans", desc: "Free, Pro, Enterprise" },
                    { icon: FileCheck, label: "Strategy Report", desc: "Shareable PDF output" },
                    { icon: Rocket, label: "Upsell Flow", desc: "CTA to book call / upgrade" },
                  ]
                },
                {
                  id: "client", icon: LayoutDashboard, title: "Client Portal", color: "#fff",
                  pages: [
                    { icon: BarChart3, label: "KPI Dashboard", desc: "Live spend, leads, ROI" },
                    { icon: Users, label: "My Team", desc: "See who's working now" },
                    { icon: Activity, label: "Project Tracker", desc: "Kanban with deadlines" },
                    { icon: FileCheck, label: "Content Approvals", desc: "1-click approve/reject" },
                    { icon: LineChart, label: "ROI Reports", desc: "Custom, exportable" },
                    { icon: CreditCard, label: "Billing", desc: "Invoices & subscriptions" },
                    { icon: Presentation, label: "Presentation Mode", desc: "Full-screen for meetings" },
                  ]
                },
                {
                  id: "internal", icon: ShieldCheck, title: "Agency Hub", color: "#4FFFB0",
                  pages: [
                    { icon: ShieldCheck, label: "Admin Dashboard", desc: "Bird's-eye view of all" },
                    { icon: UserCheck, label: "Staff Roles", desc: "Granular permissions" },
                    { icon: Activity, label: "Task Board", desc: "Kanban synced with clients" },
                    { icon: Settings, label: "Client Accounts", desc: "Assign teams, budgets" },
                    { icon: BarChart3, label: "Team Analytics", desc: "Productivity tracking" },
                    { icon: Workflow, label: "Automations", desc: "Trigger-based workflows" },
                  ]
                },
              ].map((branch) => (
                <div key={branch.id} className="flex flex-col items-center">
                  {/* Vertical line */}
                  <div className="w-[2px] h-6 ph-tree-line origin-top hidden md:block" style={{ background: "#4FFFB0" }} />

                  {/* Branch node */}
                  <button
                    onClick={() => setExpandedNode(expandedNode === branch.id ? null : branch.id)}
                    className="ph-tree-node w-full rounded-[20px] p-5 text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 mb-4"
                    style={{
                      background: branch.color,
                      color: "#0A0A0A",
                      border: "2px solid #0A0A0A",
                      boxShadow: expandedNode === branch.id ? "6px 6px 0px 0px #0A0A0A" : "4px 4px 0px 0px #0A0A0A",
                    }}
                  >
                    <branch.icon size={28} className="mx-auto mb-2" color="#0A0A0A" />
                    <div className="heading text-lg">{branch.title}</div>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <span className="text-[11px] font-semibold" style={{ color: "rgba(0,0,0,0.5)" }}>{branch.pages.length} pages</span>
                      <ChevronDown size={14} style={{ color: "rgba(0,0,0,0.4)", transform: expandedNode === branch.id ? "rotate(180deg)" : "none", transition: "0.3s" }} />
                    </div>
                  </button>

                  {/* Expanded pages */}
                  <div className="w-full flex flex-col gap-2 overflow-hidden transition-all duration-500" style={{ maxHeight: expandedNode === branch.id ? "1000px" : "0", opacity: expandedNode === branch.id ? 1 : 0 }}>
                    {branch.pages.map((page) => (
                      <div key={page.label} className="flex items-start gap-3 p-3 rounded-[14px] transition-all duration-200" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(79,255,176,0.1)" }}>
                          <page.icon size={13} color="#4FFFB0" />
                        </div>
                        <div>
                          <span className="text-[12px] font-semibold block" style={{ color: "#fff" }}>{page.label}</span>
                          <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>{page.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===========================
          SLIDE 5: AI ENGINE DEEP DIVE
      =========================== */}
      <section className="ph-slide opacity-0" style={{ padding: "120px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="script text-xl md:text-2xl mb-3" style={{ color: "#4FFFB0" }}>Pillar 02</p>
            <h2 className="heading text-3xl md:text-5xl mb-5" style={{ color: "#fff" }}>AI SaaS Engine</h2>
            <p className="text-sm md:text-base max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
              The biggest lead magnet. Users get custom marketing strategies instantly — before speaking to a human.
            </p>
          </div>

          {/* Flow steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-16 ph-stagger">
            {[
              { icon: Search, title: "Questionnaire", desc: "Smart questions about business, goals, challenges" },
              { icon: BrainCircuit, title: "AI Analysis", desc: "Processes inputs and generates strategy in seconds" },
              { icon: FileCheck, title: "Strategy Report", desc: "Beautiful PDF with actionable recommendations" },
              { icon: Rocket, title: "Convert", desc: "CTA to book call or upgrade to premium plan" },
            ].map((step, i) => (
              <div key={step.title} className="ph-item text-center">
                <div className="text-[10px] font-bold tracking-[2px] uppercase mb-3" style={{ color: "#4FFFB0" }}>Step {i + 1}</div>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "#111", border: "1px solid rgba(79,255,176,0.15)" }}>
                  <step.icon size={26} color="#4FFFB0" />
                </div>
                <h4 className="heading text-lg mb-2" style={{ color: "#fff" }}>{step.title}</h4>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{step.desc}</p>
                {i < 3 && <ArrowDown size={16} color="rgba(255,255,255,0.15)" className="mx-auto mt-4 hidden md:hidden" />}
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ph-stagger">
            {[
              { plan: "Free", price: "0", features: ["1 AI strategy", "Basic recommendations", "Email delivery"], highlight: false },
              { plan: "Pro", price: "49", features: ["Unlimited strategies", "Advanced AI insights", "Priority support", "Competitor analysis", "Monthly reports"], highlight: true },
              { plan: "Enterprise", price: "Custom", features: ["White-label access", "API integration", "Dedicated AI training", "Custom workflows", "SLA guarantee"], highlight: false },
            ].map((tier) => (
              <div key={tier.plan} className="ph-item rounded-[24px] p-7 relative overflow-hidden" style={{ background: tier.highlight ? "#4FFFB0" : "#111", border: tier.highlight ? "2px solid #0A0A0A" : "1px solid rgba(255,255,255,0.06)", boxShadow: tier.highlight ? "6px 6px 0px 0px #0A0A0A" : "none" }}>
                <span className="text-[10px] font-bold uppercase tracking-[2px] mb-3 block" style={{ color: tier.highlight ? "#0A0A0A" : "#4FFFB0" }}>{tier.plan}</span>
                <div className="heading text-4xl mb-5" style={{ color: tier.highlight ? "#0A0A0A" : "#fff" }}>
                  {tier.price !== "Custom" && "$"}{tier.price}
                  {tier.price !== "Custom" && <span className="text-sm" style={{ color: tier.highlight ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.3)" }}>/mo</span>}
                </div>
                {tier.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5 mb-2.5">
                    <CheckCircle2 size={14} color={tier.highlight ? "#0A0A0A" : "#4FFFB0"} />
                    <span className="text-[12px] font-medium" style={{ color: tier.highlight ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.5)" }}>{f}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
          SLIDE 6: CLIENT DASHBOARD
      =========================== */}
      <section className="ph-slide opacity-0" style={{ padding: "120px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="script text-xl md:text-2xl mb-3" style={{ color: "#4FFFB0" }}>Pillar 03</p>
            <h2 className="heading text-3xl md:text-5xl mb-5" style={{ color: "#fff" }}>Client Dashboard</h2>
            <p className="text-sm md:text-base max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
              Full transparency. Clients see their ROI, approve work, and track progress — all in one premium portal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ph-stagger">
            {[
              { icon: BarChart3, title: "Live KPI Dashboard", desc: "Real-time spend, leads, conversions, ROI with beautiful charts.", span: "md:col-span-2" },
              { icon: Users, title: "My Team", desc: "See who's working on your project right now. Name, role, status." },
              { icon: Activity, title: "Project Tracker", desc: "Kanban board with every task, deadline, and deliverable." },
              { icon: FileCheck, title: "Content Approvals", desc: "Review and approve designs with 1-click. No more WhatsApp chaos." },
              { icon: LineChart, title: "ROI Reports", desc: "Custom dashboards exportable for board meetings and stakeholders.", span: "md:col-span-2" },
              { icon: CreditCard, title: "Billing & Invoices", desc: "Transparent billing, downloadable invoices, subscription management.", span: "md:col-span-2" },
              { icon: Presentation, title: "Presentation Mode", desc: "Full-screen interface optimized for board meetings." },
            ].map((f: any) => (
              <div key={f.title} className={`ph-item rounded-[24px] p-7 ${f.span || ""}`} style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(79,255,176,0.08)" }}>
                  <f.icon size={20} color="#4FFFB0" />
                </div>
                <h4 className="heading text-lg mb-2" style={{ color: "#fff" }}>{f.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
          SLIDE 7: TECH STACK
      =========================== */}
      <section className="ph-slide opacity-0" style={{ padding: "120px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="script text-xl md:text-2xl mb-3" style={{ color: "#4FFFB0" }}>Architecture</p>
            <h2 className="heading text-3xl md:text-5xl mb-5" style={{ color: "#fff" }}>Tech Stack</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-16 ph-stagger">
            {[
              { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
              { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
              { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
              { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
              { name: "Supabase", icon: "https://cdn.simpleicons.org/supabase/3FCF8E" },
              { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase/FFCA28" },
              { name: "OpenAI", icon: "https://cdn.simpleicons.org/openai/ffffff" },
              { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/ffffff" },
              { name: "Stripe", icon: "https://cdn.simpleicons.org/stripe/635BFF" },
              { name: "Flutter", icon: "https://cdn.simpleicons.org/flutter/02569B" },
            ].map((t) => (
              <div key={t.name} className="ph-item flex items-center gap-2.5 px-5 py-3 rounded-full" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}>
                <img src={t.icon} alt="" width={16} height={16} />
                <span className="text-[12px] font-semibold" style={{ color: "#fff" }}>{t.name}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ph-stagger">
            {[
              { icon: Zap, title: "Performance", desc: "Sub-second loads with edge caching, image optimization, code splitting. 90+ Lighthouse." },
              { icon: Shield, title: "Security", desc: "Row-level security, encryption, OWASP compliance, regular audits." },
              { icon: MonitorSmartphone, title: "Responsive", desc: "Pixel-perfect on desktop, tablet, and mobile. One codebase." },
            ].map((f) => (
              <div key={f.title} className="ph-item rounded-[24px] p-7" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(79,255,176,0.08)" }}>
                  <f.icon size={20} color="#4FFFB0" />
                </div>
                <h4 className="heading text-lg mb-2" style={{ color: "#fff" }}>{f.title}</h4>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
          SLIDE 8: ROADMAP TIMELINE
      =========================== */}
      <section className="ph-slide opacity-0 ph-timeline" style={{ padding: "120px 24px" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <p className="script text-xl md:text-2xl mb-3" style={{ color: "#4FFFB0" }}>Execution</p>
            <h2 className="heading text-3xl md:text-5xl mb-5" style={{ color: "#fff" }}>Roadmap & Timeline</h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2" style={{ background: "rgba(79,255,176,0.08)" }} />
            <div className="ph-timeline-line absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] origin-top md:-translate-x-1/2" style={{ background: "linear-gradient(to bottom, #4FFFB0, rgba(79,255,176,0.2))" }} />

            {[
              { phase: "Phase 1", title: "Foundation & Public Site", duration: "4–6 Weeks", color: "#4FFFB0", items: ["Brand system & design tokens", "Full public website (8+ pages)", "SEO infrastructure & schema", "Analytics & tracking", "Lead capture forms", "Blog CMS"] },
              { phase: "Phase 2", title: "AI Engine & Client Portal", duration: "6–8 Weeks", color: "#5227FF", items: ["AI questionnaire & strategy generator", "User auth & onboarding", "Client dashboard with live KPIs", "Content approval workflow", "Billing & subscriptions", "API integrations"] },
              { phase: "Phase 3", title: "Internal Hub & Scale", duration: "4–6 Weeks", color: "#F59E0B", items: ["Admin dashboard & controls", "Staff task management", "Automated workflows", "Team performance analytics", "Presentation mode", "Mobile app (optional)"] },
            ].map((phase, i) => (
              <div key={phase.phase} className={`relative flex flex-col md:flex-row items-start mb-20 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                {/* Dot */}
                <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full md:-translate-x-1/2 z-10" style={{ background: phase.color, boxShadow: `0 0 16px ${phase.color}50`, top: "8px" }} />

                {/* Content */}
                <div className={`ml-14 md:ml-0 ${i % 2 === 0 ? "md:w-1/2 md:pr-16" : "md:w-1/2 md:pl-16"} ${i % 2 === 0 ? "md:text-right" : ""}`}>
                  <div className="rounded-[24px] p-7" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                      <span className="text-[10px] font-bold tracking-[2px] uppercase px-3 py-1 rounded-full" style={{ background: `${phase.color}15`, color: phase.color }}>{phase.phase}</span>
                      <span className="text-[11px] font-medium flex items-center gap-1" style={{ color: "rgba(255,255,255,0.35)" }}><Clock size={12} />{phase.duration}</span>
                    </div>
                    <h3 className="heading text-xl mb-4" style={{ color: "#fff" }}>{phase.title}</h3>
                    <div className="flex flex-col gap-2.5">
                      {phase.items.map((item) => (
                        <div key={item} className="flex items-center gap-2.5">
                          <CheckCircle2 size={14} color={phase.color} />
                          <span className="text-[12px] font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
              Total: <strong style={{ color: "#fff" }}>14–20 weeks</strong> from kickoff to full launch
            </p>
          </div>
        </div>
      </section>

      {/* ===========================
          SLIDE 9: WHY AHMED ALI
      =========================== */}
      <section className="ph-slide opacity-0" style={{ padding: "120px 24px 80px" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="script text-xl md:text-2xl mb-3" style={{ color: "#4FFFB0" }}>About Me</p>
            <h2 className="heading text-3xl md:text-5xl" style={{ color: "#fff" }}>
              Why <span style={{ color: "#4FFFB0" }}>Ahmed Ali</span>?
            </h2>
          </div>

          <div className="rounded-[24px] p-8 md:p-12" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
              <img src="/ahmed.jpeg" alt="Ahmed Ali" className="w-28 h-28 rounded-full object-cover" style={{ border: "3px solid #4FFFB0" }} />
              <div>
                <h3 className="heading text-3xl mb-1" style={{ color: "#fff" }}>Ahmed Ali<span style={{ color: "#4FFFB0" }}>.</span></h3>
                <p className="text-sm font-semibold mb-3" style={{ color: "#4FFFB0" }}>Full-Stack Digital Strategist</p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                  5+ years across Egypt, Qatar, Saudi Arabia & UAE. I don&apos;t just plan — I build and ship. From Ooredoo and QNB to Amazon Egypt and Saudi Airlines.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 ph-stagger">
              {[
                { num: 5, label: "Years", suffix: "+" },
                { num: 50, label: "Projects", suffix: "+" },
                { num: 4, label: "Countries" },
                { num: 10, label: "Enterprise", suffix: "+" },
              ].map((s) => (
                <div key={s.label} className="ph-item text-center p-5 rounded-[16px]" style={{ background: "rgba(79,255,176,0.04)", border: "1px solid rgba(79,255,176,0.08)" }}>
                  <div className="heading text-3xl" style={{ color: "#4FFFB0" }}>
                    <span className="ph-counter" data-val={s.num}>0</span>{s.suffix || ""}
                  </div>
                  <div className="text-[11px] font-medium mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {["Performance Marketing", "SEO", "Web & App Dev", "AI Integration", "Data Analytics", "Full-Stack Development"].map((s) => (
                <span key={s} className="px-4 py-2 rounded-full text-[11px] font-bold" style={{ background: "rgba(79,255,176,0.08)", color: "#4FFFB0", border: "1px solid rgba(79,255,176,0.15)" }}>{s}</span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://ahmedali.online" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold transition-all duration-200 hover:-translate-y-0.5" style={{ background: "#4FFFB0", color: "#0A0A0A", border: "2px solid #0A0A0A", boxShadow: "4px 4px 0px 0px #0A0A0A" }}>
                View Portfolio <ExternalLink size={16} />
              </a>
              <a href="https://wa.me/201011648156" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold transition-all duration-200 hover:-translate-y-0.5" style={{ background: "#fff", color: "#0A0A0A", border: "2px solid #0A0A0A", boxShadow: "4px 4px 0px 0px #0A0A0A" }}>
                WhatsApp <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>
              &copy; {new Date().getFullYear()} Ahmed Ali. Prepared exclusively for OMENA.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

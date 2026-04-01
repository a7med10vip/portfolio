"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Globe, BrainCircuit, LayoutDashboard, ShieldCheck,
  AlertTriangle, Puzzle, BarChart3, Zap, Users, FileCheck,
  Presentation, Bot, LineChart, MessageSquare, CreditCard,
  Code2, Database, Shield, Rocket, Clock, CheckCircle2,
  ArrowRight, ArrowDown, Layers, Target, Lightbulb,
  MonitorSmartphone, Search, Megaphone, BookOpen, MapPin,
  Settings, UserCheck, Kanban, Activity, Workflow,
  ChevronRight, Star, ExternalLink
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ============================================
   DESIGN TOKENS
============================================ */
const C = {
  bg: "#FAFAFA",
  card: "#FFFFFF",
  dark: "#0F1729",
  muted: "#6B7280",
  light: "#9CA3AF",
  border: "#E5E7EB",
  green: "#4FFFB0",
  greenBg: "#F0FDF4",
  greenDark: "#16A34A",
  purple: "#5227FF",
  purpleBg: "#F5F3FF",
  blue: "#3B82F6",
  blueBg: "#EFF6FF",
  amber: "#F59E0B",
  amberBg: "#FFFBEB",
  red: "#EF4444",
};

/* ============================================
   REUSABLE COMPONENTS
============================================ */
function SectionBadge({ children, color = C.green }: { children: React.ReactNode; color?: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6" style={{ background: C.card, borderColor: C.border, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
      <span className="w-2 h-2 rounded-full" style={{ background: color }} />
      <span className="text-[10px] font-bold tracking-[1.5px] uppercase" style={{ color: C.muted }}>{children}</span>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FeatureCard({ icon: Icon, title, desc, color, colorBg }: { icon: any; title: string; desc: string; color: string; colorBg: string }) {
  return (
    <div className="pitch-card p-6 rounded-[20px] border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ background: C.card, borderColor: C.border, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
      <div className="w-11 h-11 rounded-[12px] flex items-center justify-center mb-4" style={{ background: colorBg }}>
        <Icon size={20} color={color} />
      </div>
      <h4 className="text-[15px] font-bold mb-2" style={{ color: C.dark }}>{title}</h4>
      <p className="text-[13px] leading-relaxed" style={{ color: C.muted }}>{desc}</p>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PageItem({ label, desc, icon: Icon = ChevronRight as any }: { label: string; desc?: string; icon?: any }) {
  return (
    <div className="pitch-card flex items-start gap-3 p-4 rounded-[14px] border transition-all duration-200 hover:shadow-md" style={{ background: C.card, borderColor: C.border }}>
      <div className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: C.greenBg }}>
        <Icon size={14} color={C.greenDark} />
      </div>
      <div>
        <span className="text-[13px] font-semibold block" style={{ color: C.dark }}>{label}</span>
        {desc && <span className="text-[11px] mt-0.5 block" style={{ color: C.light }}>{desc}</span>}
      </div>
    </div>
  );
}

function NumberStat({ num, label, suffix = "" }: { num: string; label: string; suffix?: string }) {
  return (
    <div className="pitch-card text-center p-6 rounded-[20px] border" style={{ background: C.card, borderColor: C.border }}>
      <div className="text-3xl font-bold mb-1" style={{ color: C.green }}>{num}{suffix}</div>
      <div className="text-[12px] font-medium" style={{ color: C.muted }}>{label}</div>
    </div>
  );
}

function TechBadge({ name, icon }: { name: string; icon?: string }) {
  return (
    <div className="pitch-card flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5" style={{ background: C.card, borderColor: C.border }}>
      {icon && <img src={icon} alt="" width={16} height={16} className="object-contain" />}
      <span className="text-[12px] font-semibold" style={{ color: C.dark }}>{name}</span>
    </div>
  );
}

function PhaseCard({ phase, title, duration, items, color }: { phase: string; title: string; duration: string; items: string[]; color: string }) {
  return (
    <div className="pitch-card rounded-[20px] border overflow-hidden" style={{ background: C.card, borderColor: C.border, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
      <div className="h-1" style={{ background: color }} />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold tracking-[1.5px] uppercase px-3 py-1 rounded-full" style={{ background: `${color}15`, color }}>{phase}</span>
          <span className="text-[11px] font-medium flex items-center gap-1" style={{ color: C.light }}><Clock size={12} />{duration}</span>
        </div>
        <h4 className="text-[17px] font-bold mb-4" style={{ color: C.dark }}>{title}</h4>
        <div className="flex flex-col gap-2.5">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <CheckCircle2 size={14} color={color} />
              <span className="text-[12px] font-medium" style={{ color: C.muted }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================
   MAIN COMPONENT
============================================ */
export default function OmenaPitch() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNav, setActiveNav] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section reveals
      gsap.utils.toArray<HTMLElement>(".pitch-section").forEach((el, i) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }
        );

        // Track active section for nav
        ScrollTrigger.create({
          trigger: el,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => setActiveNav(i),
          onEnterBack: () => setActiveNav(i),
        });
      });

      // Stagger cards within sections
      gsap.utils.toArray<HTMLElement>(".pitch-stagger").forEach((el) => {
        const cards = el.querySelectorAll(".pitch-card");
        gsap.fromTo(cards,
          { y: 40, opacity: 0, scale: 0.96 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
          }
        );
      });

      // Hero special animation
      gsap.fromTo(".pitch-hero-text",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out", delay: 0.3 }
      );

      // Counter animation
      gsap.utils.toArray<HTMLElement>(".pitch-counter").forEach((el) => {
        const target = parseInt(el.dataset.target || "0");
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to({ val: 0 }, {
              val: target,
              duration: 2,
              ease: "power2.out",
              onUpdate: function () {
                el.textContent = Math.round(this.targets()[0].val).toString();
              },
            });
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const navItems = ["Start", "Problem", "Vision", "Website", "AI Engine", "Client Portal", "Agency Hub", "Tech", "Roadmap", "About Me"];

  return (
    <div ref={containerRef} style={{ background: C.bg, color: C.dark, fontFamily: "Inter, -apple-system, sans-serif" }}>

      {/* ====== FLOATING NAV ====== */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden lg:flex items-center gap-1 px-2 py-2 rounded-full" style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(20px)", border: `1px solid ${C.border}`, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
        {navItems.map((item, i) => (
          <a
            key={item}
            href={`#pitch-${i}`}
            className="px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-200"
            style={{
              color: activeNav === i ? C.dark : C.light,
              background: activeNav === i ? C.greenBg : "transparent",
            }}
          >
            {item}
          </a>
        ))}
      </nav>

      {/* ====== SLIDE 1: HERO ====== */}
      <section id="pitch-0" className="pitch-section min-h-screen flex items-center justify-center relative overflow-hidden" style={{ padding: "120px 24px 80px" }}>
        {/* Background effects */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-30 pointer-events-none" style={{ background: `radial-gradient(circle, ${C.green}20, transparent 70%)` }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none" style={{ background: `radial-gradient(circle, ${C.purple}15, transparent 70%)` }} />

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="pitch-hero-text opacity-0">
            <SectionBadge>Strategic Digital Vision</SectionBadge>
          </div>

          <h1 className="pitch-hero-text opacity-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6" style={{ letterSpacing: "-2px" }}>
            <span style={{ color: C.dark }}>OMENA</span>
            <br />
            <span style={{ color: C.green }}>Digital Platform</span>
          </h1>

          <p className="pitch-hero-text opacity-0 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-4" style={{ color: C.muted }}>
            The complete architectural roadmap to transform OMENA from a marketing agency into an AI-powered, fully synchronized digital ecosystem.
          </p>

          <p className="pitch-hero-text opacity-0 text-sm mb-12" style={{ color: C.light }}>
            Prepared by <a href="https://ahmedali.online" target="_blank" rel="noopener" style={{ color: C.green, fontWeight: 600, textDecoration: "none" }}>Ahmed Ali</a> — Full-Stack Digital Strategist
          </p>

          <div className="pitch-hero-text opacity-0 flex flex-wrap justify-center gap-3 mb-16">
            <NumberStat num="4" label="Core Pillars" />
            <NumberStat num="30" label="Pages & Features" suffix="+" />
            <NumberStat num="3" label="Development Phases" />
          </div>

          <div className="pitch-hero-text opacity-0 animate-bounce">
            <ArrowDown size={28} color={C.light} />
          </div>
        </div>
      </section>

      {/* ====== SLIDE 2: THE PROBLEM ====== */}
      <section id="pitch-1" className="pitch-section" style={{ padding: "100px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionBadge color={C.red}>The Challenge</SectionBadge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: C.dark, letterSpacing: "-1px" }}>
              Where OMENA Stands Today
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: C.muted }}>
              Like most marketing agencies, OMENA relies on scattered tools and manual processes. The opportunity? Building a unified platform that puts you years ahead of competitors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pitch-stagger">
            <FeatureCard
              icon={AlertTriangle}
              title="Scattered Systems"
              desc="Client communication through WhatsApp, projects on Trello, reports in spreadsheets. No single source of truth for the team or clients."
              color={C.red} colorBg="#FEF2F2"
            />
            <FeatureCard
              icon={Puzzle}
              title="No AI Differentiation"
              desc="Every agency offers the same services. Without an AI-powered product, there's no moat — no reason clients choose OMENA over the competition."
              color={C.amber} colorBg={C.amberBg}
            />
            <FeatureCard
              icon={BarChart3}
              title="Zero Client Visibility"
              desc="Clients can't see their ROI in real-time. They wait for monthly reports and wonder what the team is actually doing. That breeds distrust and churn."
              color={C.purple} colorBg={C.purpleBg}
            />
          </div>

          <div className="mt-12 p-8 rounded-[24px] border text-center" style={{ background: "linear-gradient(135deg, #F0FDF4, #F5F3FF)", borderColor: C.border }}>
            <p className="text-lg font-bold mb-2" style={{ color: C.dark }}>
              The agencies winning in 2026 aren&apos;t just running ads.
            </p>
            <p className="text-base" style={{ color: C.muted }}>
              They&apos;re building <strong style={{ color: C.green }}>platforms</strong> — and that&apos;s exactly what we&apos;re going to do.
            </p>
          </div>
        </div>
      </section>

      {/* ====== SLIDE 3: THE VISION ====== */}
      <section id="pitch-2" className="pitch-section" style={{ padding: "100px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionBadge color={C.purple}>The Vision</SectionBadge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: C.dark, letterSpacing: "-1px" }}>
              One Platform. <span style={{ color: C.green }}>Infinite Growth.</span>
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: C.muted }}>
              Four interconnected pillars that work as one ecosystem — from attracting leads to managing operations.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pitch-stagger">
            {[
              { icon: Globe, title: "Public Website", desc: "The marketing engine. High-converting pages that attract, educate, and convert visitors into qualified leads.", color: C.green, colorBg: C.greenBg, num: "01" },
              { icon: BrainCircuit, title: "AI SaaS Engine", desc: "The differentiator. AI-powered strategy tool that generates custom plans instantly — your biggest lead magnet.", color: C.purple, colorBg: C.purpleBg, num: "02" },
              { icon: LayoutDashboard, title: "Client Dashboard", desc: "The retention tool. Real-time ROI tracking, 1-click approvals, and full transparency into every project.", color: C.blue, colorBg: C.blueBg, num: "03" },
              { icon: ShieldCheck, title: "Internal Agency Hub", desc: "The operations backbone. Task management, staff workflows, and client account management in one place.", color: C.amber, colorBg: C.amberBg, num: "04" },
            ].map((pillar) => (
              <div key={pillar.num} className="pitch-card p-8 rounded-[24px] border relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ background: C.card, borderColor: C.border, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <span className="absolute top-6 right-6 text-[64px] font-bold leading-none pointer-events-none" style={{ color: `${pillar.color}08` }}>{pillar.num}</span>
                <div className="w-14 h-14 rounded-[16px] flex items-center justify-center mb-5" style={{ background: pillar.colorBg }}>
                  <pillar.icon size={26} color={pillar.color} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: C.dark }}>{pillar.title}</h3>
                <p className="text-[14px] leading-relaxed" style={{ color: C.muted }}>{pillar.desc}</p>
              </div>
            ))}
          </div>

          {/* Connection diagram */}
          <div className="mt-12 p-8 rounded-[24px] border text-center" style={{ background: C.card, borderColor: C.border }}>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {["Attract", "Convert", "Serve", "Optimize"].map((step, i) => (
                <div key={step} className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold" style={{ background: C.greenBg, color: C.greenDark }}>{i + 1}</span>
                    <span className="text-[13px] font-semibold" style={{ color: C.dark }}>{step}</span>
                  </div>
                  {i < 3 && <ArrowRight size={16} color={C.light} />}
                </div>
              ))}
            </div>
            <p className="text-[12px] mt-4" style={{ color: C.light }}>Each pillar feeds the next — creating a self-reinforcing growth loop</p>
          </div>
        </div>
      </section>

      {/* ====== SLIDE 4: PUBLIC WEBSITE ====== */}
      <section id="pitch-3" className="pitch-section" style={{ padding: "100px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionBadge color={C.green}>Pillar 01</SectionBadge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: C.dark, letterSpacing: "-1px" }}>
              Public Website
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: C.muted }}>
              The high-converting marketing engine designed to attract, educate, and convert visitors into qualified leads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pitch-stagger">
            <PageItem icon={Layers} label="Homepage — The First Impression" desc="Above-the-fold hero with value proposition, social proof logos, services overview, featured case studies, and CTA" />
            <PageItem icon={Users} label="About Us — The Story" desc="Company vision, team profiles, culture, milestones timeline, and the 'why' behind OMENA" />
            <PageItem icon={Megaphone} label="Services Hub" desc="SEO, Paid Ads, Social Media, Branding, Web Dev, AI Solutions — each with its own deep-dive page" />
            <PageItem icon={Star} label="Case Studies & Portfolio" desc="Detailed project breakdowns with metrics, before/after, client testimonials, and ROI data" />
            <PageItem icon={BookOpen} label="Blog & Resources" desc="SEO-optimized content marketing hub with articles, guides, and industry insights" />
            <PageItem icon={Target} label="Landing Pages" desc="Campaign-specific pages optimized for conversion with A/B testing and tracking" />
            <PageItem icon={MapPin} label="Branches & Locations" desc="Office locations with maps, contact info, and local SEO optimization" />
            <PageItem icon={MessageSquare} label="Contact & Inquiry" desc="Multi-step form with service selection, budget range, and intelligent routing to the right team" />
          </div>

          {/* Funnel visualization */}
          <div className="mt-12 p-8 rounded-[24px] border" style={{ background: C.card, borderColor: C.border }}>
            <h4 className="text-[15px] font-bold mb-6 text-center" style={{ color: C.dark }}>Conversion Funnel</h4>
            <div className="flex flex-col items-center gap-3">
              {[
                { label: "Organic / Paid Traffic", width: "100%", color: C.green },
                { label: "Blog & Resources (Awareness)", width: "85%", color: C.green },
                { label: "Services & Case Studies (Interest)", width: "65%", color: C.purple },
                { label: "AI Strategist Tool (Engagement)", width: "45%", color: C.purple },
                { label: "Contact / Sign Up (Conversion)", width: "30%", color: C.blue },
              ].map((step) => (
                <div key={step.label} className="rounded-full py-2.5 px-6 text-center transition-all duration-300" style={{ width: step.width, background: `${step.color}12`, border: `1px solid ${step.color}25` }}>
                  <span className="text-[12px] font-semibold" style={{ color: C.dark }}>{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== SLIDE 5: AI SAAS ENGINE ====== */}
      <section id="pitch-4" className="pitch-section" style={{ padding: "100px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionBadge color={C.purple}>Pillar 02</SectionBadge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: C.dark, letterSpacing: "-1px" }}>
              AI SaaS Engine
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: C.muted }}>
              The intelligent core. Users build custom marketing strategies instantly before ever speaking to a human — your most powerful lead magnet.
            </p>
          </div>

          {/* How it works */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 pitch-stagger">
            {[
              { icon: Search, title: "Questionnaire", desc: "User answers targeted questions about their business, goals, and challenges" },
              { icon: BrainCircuit, title: "AI Analysis", desc: "AI processes inputs and generates a tailored marketing strategy in seconds" },
              { icon: FileCheck, title: "Strategy Report", desc: "Beautiful, shareable PDF with actionable recommendations and KPIs" },
              { icon: Rocket, title: "Upsell & Convert", desc: "CTA to book a call or upgrade to a premium plan for human-led execution" },
            ].map((step, i) => (
              <div key={step.title} className="pitch-card text-center p-6 rounded-[20px] border relative" style={{ background: C.card, borderColor: C.border }}>
                <span className="text-[10px] font-bold tracking-wider uppercase mb-3 block" style={{ color: C.purple }}>Step {i + 1}</span>
                <div className="w-12 h-12 rounded-[14px] flex items-center justify-center mx-auto mb-4" style={{ background: C.purpleBg }}>
                  <step.icon size={22} color={C.purple} />
                </div>
                <h4 className="text-[14px] font-bold mb-2" style={{ color: C.dark }}>{step.title}</h4>
                <p className="text-[12px] leading-relaxed" style={{ color: C.muted }}>{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Pricing model */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pitch-stagger">
            {[
              { plan: "Free", price: "0", features: ["1 AI-generated strategy", "Basic recommendations", "Email delivery"], highlight: false },
              { plan: "Pro", price: "49", features: ["Unlimited strategies", "Advanced AI insights", "Priority support", "Competitor analysis", "Monthly reports"], highlight: true },
              { plan: "Enterprise", price: "Custom", features: ["White-label access", "API integration", "Dedicated AI training", "Custom workflows", "SLA guarantee"], highlight: false },
            ].map((tier) => (
              <div key={tier.plan} className="pitch-card rounded-[20px] border overflow-hidden relative" style={{ background: tier.highlight ? C.dark : C.card, borderColor: tier.highlight ? C.dark : C.border, boxShadow: tier.highlight ? "0 20px 40px rgba(15,23,41,0.15)" : "0 1px 3px rgba(0,0,0,0.04)" }}>
                {tier.highlight && <div className="h-1" style={{ background: C.green }} />}
                <div className="p-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: tier.highlight ? C.green : C.light }}>{tier.plan}</span>
                  <div className="mt-3 mb-5">
                    <span className="text-3xl font-bold" style={{ color: tier.highlight ? "#fff" : C.dark }}>{tier.price === "Custom" ? "" : "$"}{tier.price}</span>
                    {tier.price !== "Custom" && <span className="text-[13px]" style={{ color: tier.highlight ? "rgba(255,255,255,0.5)" : C.light }}>/mo</span>}
                  </div>
                  <div className="flex flex-col gap-3">
                    {tier.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5">
                        <CheckCircle2 size={14} color={tier.highlight ? C.green : C.greenDark} />
                        <span className="text-[12px] font-medium" style={{ color: tier.highlight ? "rgba(255,255,255,0.7)" : C.muted }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SLIDE 6: CLIENT DASHBOARD ====== */}
      <section id="pitch-5" className="pitch-section" style={{ padding: "100px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionBadge color={C.blue}>Pillar 03</SectionBadge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: C.dark, letterSpacing: "-1px" }}>
              Client Dashboard
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: C.muted }}>
              The magic retention tool. Clients track progress, approve work, and see their ROI in real-time. No more WhatsApp updates — everything in one premium portal.
            </p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pitch-stagger">
            <div className="md:col-span-2">
              <FeatureCard icon={BarChart3} title="Dashboard Overview" desc="Real-time KPIs: spend, leads, conversions, ROI. Beautiful charts that update live. Clients see the value of their investment every time they log in." color={C.blue} colorBg={C.blueBg} />
            </div>
            <FeatureCard icon={Users} title="My Team" desc="See exactly who's working on your project right now. Name, role, status — full transparency." color={C.green} colorBg={C.greenBg} />
            <FeatureCard icon={Kanban} title="Project Tracker" desc="Kanban-style board showing every task, deadline, and deliverable. Clients always know what's in progress." color={C.purple} colorBg={C.purpleBg} />
            <FeatureCard icon={FileCheck} title="Content Approvals" desc="Review and approve designs, copy, and creative assets with 1-click. No more WhatsApp voice notes and scattered feedback." color={C.amber} colorBg={C.amberBg} />
            <FeatureCard icon={LineChart} title="Live ROI Reports" desc="Custom dashboards showing exactly how their money is performing. Exportable for board meetings and stakeholders." color={C.green} colorBg={C.greenBg} />
            <div className="md:col-span-2">
              <FeatureCard icon={CreditCard} title="Billing & Invoices" desc="Transparent billing history, downloadable invoices, subscription management, and upcoming payment schedules — all self-serve." color={C.blue} colorBg={C.blueBg} />
            </div>
            <FeatureCard icon={Presentation} title="Presentation Mode" desc="Full-screen interface optimized for board meetings. One click to turn the dashboard into a presentation." color={C.purple} colorBg={C.purpleBg} />
          </div>
        </div>
      </section>

      {/* ====== SLIDE 7: INTERNAL HUB ====== */}
      <section id="pitch-6" className="pitch-section" style={{ padding: "100px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionBadge color={C.amber}>Pillar 04</SectionBadge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: C.dark, letterSpacing: "-1px" }}>
              Internal Agency Hub
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: C.muted }}>
              The hidden powerhouse. This replaces 3rd-party task managers by unifying staff workflows with client deliverables — one system for everything.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pitch-stagger">
            <FeatureCard icon={ShieldCheck} title="Super Admin Dashboard" desc="Bird's-eye view of every client, every project, every team member. Filter by status, priority, or deadline." color={C.amber} colorBg={C.amberBg} />
            <FeatureCard icon={UserCheck} title="Staff Roles & Permissions" desc="Granular access control. Managers see everything. Designers see only their tasks. Interns see only what they need." color={C.green} colorBg={C.greenBg} />
            <FeatureCard icon={Kanban} title="Internal Task Board" desc="Kanban board synced with client dashboard. When the team moves a task, the client sees the update automatically." color={C.blue} colorBg={C.blueBg} />
            <FeatureCard icon={Settings} title="Client Account Management" desc="Add new clients, assign teams, set budgets, manage contracts — all from one control panel." color={C.purple} colorBg={C.purpleBg} />
            <FeatureCard icon={Activity} title="Team Performance Analytics" desc="Track productivity, task completion rates, and response times per team member. Data-driven team management." color={C.red} colorBg="#FEF2F2" />
            <FeatureCard icon={Workflow} title="Automated Workflows" desc="Trigger actions automatically: client signs up → team assigned → welcome email → first meeting scheduled." color={C.amber} colorBg={C.amberBg} />
          </div>
        </div>
      </section>

      {/* ====== SLIDE 8: TECH STACK ====== */}
      <section id="pitch-7" className="pitch-section" style={{ padding: "100px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionBadge color={C.blue}>Architecture</SectionBadge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: C.dark, letterSpacing: "-1px" }}>
              Tech Stack & Security
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: C.muted }}>
              Built on battle-tested, scalable technologies. Every choice optimized for performance, developer experience, and long-term maintainability.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12 pitch-stagger">
            <TechBadge name="Next.js" icon="https://cdn.simpleicons.org/nextdotjs/000000" />
            <TechBadge name="React" icon="https://cdn.simpleicons.org/react/61DAFB" />
            <TechBadge name="TypeScript" icon="https://cdn.simpleicons.org/typescript/3178C6" />
            <TechBadge name="Tailwind CSS" icon="https://cdn.simpleicons.org/tailwindcss/06B6D4" />
            <TechBadge name="Supabase" icon="https://cdn.simpleicons.org/supabase/3FCF8E" />
            <TechBadge name="Firebase" icon="https://cdn.simpleicons.org/firebase/FFCA28" />
            <TechBadge name="OpenAI / Gemini" icon="https://cdn.simpleicons.org/openai/000000" />
            <TechBadge name="Vercel" icon="https://cdn.simpleicons.org/vercel/000000" />
            <TechBadge name="Stripe" icon="https://cdn.simpleicons.org/stripe/635BFF" />
            <TechBadge name="Resend" icon="https://cdn.simpleicons.org/resend/000000" />
            <TechBadge name="Google Analytics" icon="https://cdn.simpleicons.org/googleanalytics/E37400" />
            <TechBadge name="GSAP" icon="https://cdn.simpleicons.org/greensock/88CE02" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pitch-stagger">
            <FeatureCard icon={Zap} title="Performance" desc="Sub-second page loads with edge caching, image optimization, and code splitting. 90+ Lighthouse score guaranteed." color={C.green} colorBg={C.greenBg} />
            <FeatureCard icon={Shield} title="Security" desc="Row-level security, encrypted data at rest and in transit, OWASP compliance, and regular security audits." color={C.blue} colorBg={C.blueBg} />
            <FeatureCard icon={MonitorSmartphone} title="Responsive" desc="Every pixel designed for desktop, tablet, and mobile. One codebase, flawless experience across all devices." color={C.purple} colorBg={C.purpleBg} />
          </div>
        </div>
      </section>

      {/* ====== SLIDE 9: ROADMAP ====== */}
      <section id="pitch-8" className="pitch-section" style={{ padding: "100px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionBadge color={C.green}>Execution Plan</SectionBadge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: C.dark, letterSpacing: "-1px" }}>
              Roadmap & Timeline
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: C.muted }}>
              A phased approach that delivers value early and builds momentum. Each phase is independent and deployable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pitch-stagger">
            <PhaseCard
              phase="Phase 1" title="Foundation & Public Site" duration="4–6 Weeks"
              color={C.green}
              items={[
                "Brand system & design tokens",
                "Full public website (8+ pages)",
                "SEO infrastructure & schema",
                "Analytics & tracking setup",
                "Contact & lead capture forms",
                "Blog/resources CMS",
              ]}
            />
            <PhaseCard
              phase="Phase 2" title="AI Engine & Client Portal" duration="6–8 Weeks"
              color={C.purple}
              items={[
                "AI questionnaire & strategy generator",
                "User authentication & onboarding",
                "Client dashboard with KPIs",
                "Content approval workflow",
                "Billing & subscription system",
                "API integrations",
              ]}
            />
            <PhaseCard
              phase="Phase 3" title="Internal Hub & Optimization" duration="4–6 Weeks"
              color={C.blue}
              items={[
                "Admin dashboard & controls",
                "Staff task management (Kanban)",
                "Automated workflows & triggers",
                "Performance analytics per team",
                "Presentation mode for clients",
                "Mobile app (Flutter) — optional",
              ]}
            />
          </div>

          <div className="mt-10 text-center">
            <p className="text-[13px] font-medium" style={{ color: C.light }}>
              Total estimated timeline: <strong style={{ color: C.dark }}>14–20 weeks</strong> from kickoff to full platform launch
            </p>
          </div>
        </div>
      </section>

      {/* ====== SLIDE 10: WHY AHMED ====== */}
      <section id="pitch-9" className="pitch-section" style={{ padding: "100px 24px 80px" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <SectionBadge>About Me</SectionBadge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: C.dark, letterSpacing: "-1px" }}>
              Why <span style={{ color: C.green }}>Ahmed Ali</span>?
            </h2>
          </div>

          <div className="p-8 md:p-12 rounded-[24px] border" style={{ background: C.card, borderColor: C.border, boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
            <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
              <img src="/ahmed.jpeg" alt="Ahmed Ali" className="w-24 h-24 rounded-full object-cover" style={{ border: `3px solid ${C.green}` }} />
              <div>
                <h3 className="text-2xl font-bold mb-1" style={{ color: C.dark }}>Ahmed Ali</h3>
                <p className="text-[14px] font-medium mb-3" style={{ color: C.green }}>Full-Stack Digital Strategist</p>
                <p className="text-[14px] leading-relaxed" style={{ color: C.muted }}>
                  5+ years across Egypt, Qatar, Saudi Arabia & UAE. I don&apos;t just plan strategies — I build and ship the platforms behind them. From Ooredoo and QNB to Amazon Egypt and Saudi Airlines.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pitch-stagger">
              <NumberStat num="5" label="Years Experience" suffix="+" />
              <NumberStat num="50" label="Projects Delivered" suffix="+" />
              <NumberStat num="4" label="Countries Served" />
              <NumberStat num="10" label="Enterprise Clients" suffix="+" />
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {["Performance Marketing", "SEO", "Web & App Dev", "AI Integration", "Data Analytics", "Full-Stack Development"].map((s) => (
                <span key={s} className="px-4 py-2 rounded-full text-[11px] font-semibold" style={{ background: C.greenBg, color: C.greenDark, border: `1px solid ${C.green}30` }}>{s}</span>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://ahmedali.online" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[14px] font-bold transition-all duration-200 hover:-translate-y-0.5" style={{ background: C.green, color: C.dark }}>
                View My Portfolio <ExternalLink size={16} />
              </a>
              <a href="https://wa.me/201011648156" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[14px] font-bold transition-all duration-200 hover:-translate-y-0.5" style={{ background: C.dark, color: "#fff" }}>
                Let&apos;s Talk on WhatsApp <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-16 text-center">
            <p className="text-[13px]" style={{ color: C.light }}>
              &copy; {new Date().getFullYear()} Ahmed Ali. This presentation was prepared exclusively for OMENA.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

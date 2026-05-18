"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mountain, ArrowRight, ArrowDown,
  Hammer, Factory, Armchair, Sparkles, Construction,
  Search, PenTool, Cog, Wrench, CheckCircle2,
  Building2, Users, Briefcase, Crown, Home,
  Globe, Code2, Database, Server, Layers,
  Boxes, Palette, Type as TypeIcon,
  Mail, MapPin,
  Calendar, Bookmark, Rocket,
  Cpu, Eye, FileText,
  GitBranch, Network,
  type LucideIcon,
} from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

/* ═══════════ PALETTE ═══════════ */
const G = "#4FFFB0";
const D = "#0A0A0A";
const R = "#EF4444";
const A = "#F59E0B";
const B = "#3B82F6";
const P = "#8B5CF6";

/* ═══════════ HELPER COMPONENTS (outside main — react-hooks/static-components) ═══════════ */

function SectionHead({
  eyebrow, children, color = G, subtitle, light,
}: { eyebrow: string; children: React.ReactNode; color?: string; subtitle?: string; light?: boolean }) {
  return (
    <div className="text-center mb-12">
      <p className="heading text-lg mb-3" style={{ color }}>{eyebrow}</p>
      <h2 className="heading text-4xl md:text-5xl mb-4" style={{ color: light ? "#fff" : D }}>
        {children}
      </h2>
      {subtitle && (
        <p className="text-sm max-w-2xl mx-auto " style={{ color: light ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

type StackKey = "frontend" | "i18n" | "three" | "backend" | "ops";

/* ═══════════ SECTION NAV (floating side pill) ═══════════ */

const NAV_SECTIONS: { id: string; label: string; color: string }[] = [
  { id: "story", label: "Story", color: G },
  { id: "pillars", label: "Pillars", color: B },
  { id: "factory", label: "Factory", color: A },
  { id: "process", label: "Process", color: P },
  { id: "projects", label: "Projects", color: G },
  { id: "industries", label: "Industries", color: B },
  { id: "leadership", label: "Leadership", color: A },
  { id: "brand", label: "Brand", color: P },
  { id: "sitemap", label: "Sitemap", color: G },
  { id: "stack", label: "Stack", color: B },
  { id: "phases", label: "Phases", color: A },
];

function SectionNav() {
  const [active, setActive] = useState<string>("story");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside
      className="hidden xl:flex flex-col fixed z-40 right-5 top-1/2 -translate-y-1/2 px-2 py-3 rounded-[16px]"
      style={{
        background: "rgba(255,255,255,0.85)",
        border: "1px solid #EBEBEB",
        boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {NAV_SECTIONS.map((s, i) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => handleClick(s.id)}
            className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-[8px] text-left cursor-pointer border-0 my-0.5"
            style={{
              background: isActive ? `${s.color}15` : "transparent",
              transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            aria-label={s.label}
            aria-current={isActive ? "true" : undefined}
          >
            <span
              className="block rounded-full flex-shrink-0"
              style={{
                width: isActive ? 7 : 4,
                height: isActive ? 7 : 4,
                background: s.color,
                boxShadow: isActive ? `0 0 0 3px ${s.color}30` : "none",
                opacity: isActive ? 1 : 0.45,
                transition: "all 250ms",
              }}
            />
            <span
              className="heading text-[10.5px] flex-shrink-0 tabular-nums"
              style={{ color: isActive ? D : "rgba(0,0,0,0.35)", width: 16 }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className="heading text-[10.5px] truncate"
              style={{ color: isActive ? D : "rgba(0,0,0,0.5)", width: 70 }}
            >
              {s.label}
            </span>
          </button>
        );
      })}
    </aside>
  );
}

/* ═══════════ MAIN ═══════════ */

export default function VertexPlan() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeStack, setActiveStack] = useState<StackKey>("frontend");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ph-hero",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: "power4.out", delay: 0.3 }
      );
      gsap.utils.toArray<HTMLElement>(".ph-slide").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } }
        );
      });
      gsap.utils.toArray<HTMLElement>(".ph-stagger").forEach((el) => {
        gsap.fromTo(
          el.querySelectorAll(".ph-item"),
          { y: 40, opacity: 0, scale: 0.96 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.06, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  /* ═══ DATA ═══ */

  const pillars: { num: string; title: string; desc: string; icon: LucideIcon; color: string }[] = [
    { num: "01", title: "ID Fit-Out", desc: "Complete interior design and implementation for commercial, residential, and hospitality spaces — ceilings, walls, flooring, furniture, and glazing.", icon: Hammer, color: G },
    { num: "02", title: "Factory Manufacturing", desc: "State-of-the-art woodwork and steelwork fabrication in our in-house factory, combining cutting-edge CNC technology with skilled craftsmanship.", icon: Factory, color: B },
    { num: "03", title: "Custom Furniture", desc: "Bespoke furniture design and production tailored to exact specifications — from classic elegance to bold contemporary, using premium materials.", icon: Armchair, color: P },
    { num: "04", title: "Events & Activation", desc: "Full-service event design, production, and equipment solutions — exhibition booths, stage sets, AV systems, and equipment rental.", icon: Sparkles, color: A },
    { num: "05", title: "Civil & Concrete Works", desc: "Structural and finishing works providing complete end-to-end project delivery for residential and commercial developments.", icon: Construction, color: R },
  ];

  const machinery: string[] = [
    "CNC Machining Centres",
    "CNC Drilling Centres",
    "Automatic Edge Banders",
    "Horizontal Beam Saws",
    "Laser Cutting (6KW Raycus)",
    "Industrial Compressors (22KW)",
  ];

  const process: { step: string; title: string; desc: string; icon: LucideIcon }[] = [
    { step: "01", title: "Listen & Discover", desc: "Understanding your vision, goals, and requirements in depth.", icon: Search },
    { step: "02", title: "Design & Innovate", desc: "Transforming ideas into inspiring, detailed design concepts.", icon: PenTool },
    { step: "03", title: "Manufacture & Fabricate", desc: "Precision production in our state-of-the-art factory.", icon: Cog },
    { step: "04", title: "Execute & Install", desc: "Meticulous on-site implementation with expert supervision.", icon: Wrench },
    { step: "05", title: "Handover & Support", desc: "Complete project delivery with ongoing after-service support.", icon: CheckCircle2 },
  ];

  const projects: {
    name: string;
    industry: string;
    industryColor: string;
    tagline: string;
    desc: string;
  }[] = [
    {
      name: "Honda Thank You Day",
      industry: "Automotive",
      industryColor: B,
      tagline: "1,000-person event scaled to 5,000 — flawlessly.",
      desc: "Time-sensitive, large-scale, and technically demanding. From fabrication to installation, the team delivered a refined and reliable end-to-end fit-out. Designed initially as a 1000-person event, Honda Thank You Day welcomed 5000 visitors, flawlessly managed by our logistics team.",
    },
    {
      name: "Red Sea Festival",
      industry: "Festival",
      industryColor: R,
      tagline: "Outdoor / indoor integration with ProductionGlue.",
      desc: "A high-profile project delivered in collaboration with ProductionGlue, highlighting Vertex Integra's collaborative expertise with external teams. Vertex executed a comprehensive fit-out, coordinating multiple components into a unified outdoor/indoor environment — demonstrating reliability, speed, and attention to detail from concept to completion.",
    },
    {
      name: "Midea JV Launch",
      industry: "Automotive",
      industryColor: B,
      tagline: "Last-minute venue change — zero impact on delivery.",
      desc: "Delivered under a tight timeline. The team handled everything from concept detailing to final fit-out seamlessly, despite a last-minute venue change, technical complexity, and systems integration required by the event. A fully coordinated, turnkey delivery aligned with brand and stakeholder expectations.",
    },
    {
      name: "Soueast Signing Ceremony",
      industry: "Automotive",
      industryColor: B,
      tagline: "Last-minute guest & agenda change handled with versatility.",
      desc: "Executed within a compressed timeframe. Strong control over technical detailing and on-ground coordination. The team dealt with a last-minute guest and agenda change with versatility and creativeness, ensuring a smooth, end-to-end on-time delivery.",
    },
    {
      name: "Soueast Roadtrip",
      industry: "Automotive",
      industryColor: B,
      tagline: "Multi-location Taif activation with 3 influencers.",
      desc: "Delivered under tight deadlines, requiring consistent quality across diverse environments and communication with 3 influencers shuttled across several venues. Our fit-out team ensured efficient logistics and rapid deployment — maintaining brand consistency while executing seamlessly across all stops (filmed by VI's team for social media post-activation content).",
    },
    {
      name: "Paris Dakar",
      industry: "Automotive",
      industryColor: B,
      tagline: "Multi-location, agile coordination across regions.",
      desc: "A multi-location project delivered under tight timelines, requiring agile coordination and adaptable fit-out solutions. Vertex Integra managed logistics, fabrication, and installation across locations, ensuring consistent execution and brand presence throughout.",
    },
    {
      name: "Toyota Warehousing Booth",
      industry: "Automotive",
      industryColor: B,
      tagline: "Private meetings + warehouse-styled displays for ALJ.",
      desc: "Emphasized systems integration within a fit-out environment, where technical coordination was key. A fully integrated booth solution with private meeting spaces and warehouse-styled displays — aligning structural, functional, and branding elements of the ALJ brand into a cohesive final output.",
    },
    {
      name: "Intersystems Tahaluf Booth",
      industry: "Tech",
      industryColor: P,
      tagline: "8×6m space packed with meeting room, screens, coffee, storage.",
      desc: "Delivered under tight timelines with strong emphasis on technical precision. Required navigating a tight space with multiple elements (meeting space, screens, coffee corner, storage and branded areas) within an 8×6m footprint. End-to-end execution from design and fabrication to on-site installation and final integration.",
    },
    {
      name: "Black Arabia",
      industry: "Government",
      industryColor: A,
      tagline: "Spotless VIP experience at Salone del Mobili.",
      desc: "Held at the Salone del Mobili (Black Arabia Financial District). Defined by tight timelines, technical complexity, and systems integration — particularly the VIP section. Vertex managed intricate requirements through precise fit-out planning and delivery.",
    },
    {
      name: "Lebanese National Basketball — Saudi Arrival",
      industry: "Government",
      industryColor: A,
      tagline: "High-impact welcome at the Lebanese consulate, KSA.",
      desc: "Required large-scale execution. Vertex translated spatial and branding requirements into a cohesive environment at the Lebanese consulate in Saudi Arabia. Disciplined fit-out planning supported both audience engagement and operational flow — a fitting welcome to the Lebanese National Basketball team into the Kingdom.",
    },
    {
      name: "PPMDC Event",
      industry: "Government",
      industryColor: A,
      tagline: "Brief changes & last-minute requests handled gracefully.",
      desc: "Focused on efficient delivery — a clean and well-executed setup through structured fit-out processes. Multiple brief changes and last-minute deliverable requests were obstacles that the team's contingency planning effortlessly bypassed. The project reflects the ability to maintain quality and consistency in streamlined execution scenarios.",
    },
  ];

  const publicRoutes: { code: string; route: string; note: string; icon: LucideIcon }[] = [
    { code: "P01", route: "/", note: "Home — services overview, featured projects, factory teaser", icon: Home },
    { code: "P02", route: "/about", note: "Chairman's statement, leadership, 25-year journey, values", icon: FileText },
    { code: "P03", route: "/services", note: "Services parent + 5 child pages", icon: Boxes },
    { code: "P04", route: "/services/fit-out", note: "ID fit-out service detail", icon: Hammer },
    { code: "P05", route: "/services/factory", note: "Factory manufacturing service detail", icon: Factory },
    { code: "P06", route: "/services/furniture", note: "Custom furniture service detail", icon: Armchair },
    { code: "P07", route: "/services/events", note: "Events & activation service detail", icon: Sparkles },
    { code: "P08", route: "/services/civil", note: "Civil & concrete works service detail", icon: Construction },
    { code: "P09", route: "/factory", note: "Factory tour, machinery, capabilities", icon: Cog },
    { code: "P10", route: "/projects", note: "Filterable case study index by industry / service", icon: Layers },
    { code: "P11", route: "/projects/[slug]", note: "Project detail dynamic route — full case study", icon: ArrowRight },
    { code: "P12", route: "/industries", note: "6 industry verticals overview", icon: Building2 },
    { code: "P13", route: "/process", note: "5-step methodology page with visual flow", icon: GitBranch },
    { code: "P14", route: "/insights", note: "Peak Insights — quarterly thought-leadership content", icon: Bookmark },
    { code: "P15", route: "/careers", note: "Culture and open roles", icon: Users },
    { code: "P16", route: "/contact", note: "Form, factory address, leadership contacts", icon: Mail },
  ];

  /* ═══ TECH STACK ═══ */

  const stack: Record<StackKey, {
    label: string;
    sub: string;
    icon: LucideIcon;
    color: string;
    items: { tech: string; use: string; logo?: string }[];
  }> = {
    frontend: {
      label: "Frontend",
      sub: "The visible layer",
      icon: Code2,
      color: G,
      items: [
        { tech: "Next.js 15", use: "App Router with React Server Components and Server Actions", logo: "nextjs" },
        { tech: "TypeScript", use: "End-to-end type safety from API to UI", logo: "typescript" },
        { tech: "Tailwind CSS v4", use: "Brand tokens (Navy / Silver / Royal Purple) wired as CSS vars", logo: "tailwindcss" },
        { tech: "GSAP + ScrollTrigger", use: "Cinematic entrance animations and scroll choreography", logo: "gsap" },
        { tech: "Lenis", use: "Buttery smooth scroll across desktop and mobile" },
        { tech: "next/font", use: "Bebas Neue + Poppins + Tajawal — zero CLS, edge-cached", logo: "nextjs" },
      ],
    },
    i18n: {
      label: "Internationalization",
      sub: "Bilingual EN ↔ AR with RTL flip",
      icon: Globe,
      color: B,
      items: [
        { tech: "next-intl", use: "Locale-aware routing, message catalogs, dates, currencies", logo: "nextintl" },
        { tech: "RTL flip", use: "Automatic mirror of layouts on Arabic locale via dir='rtl'" },
        { tech: "hreflang", use: "Per-locale hreflang tags for correct international SEO" },
        { tech: "Per-locale sitemap", use: "Distinct /sitemap.xml entries for /en and /ar" },
      ],
    },
    three: {
      label: "3D & Immersive",
      sub: "Walk the factory from anywhere",
      icon: Layers,
      color: P,
      items: [
        { tech: "Three.js", use: "Underlying renderer for the immersive layer", logo: "threejs" },
        { tech: "@react-three/fiber", use: "React-friendly Three.js scene composition", logo: "react" },
        { tech: "@react-three/drei", use: "Helpers for HDRI, environments, GLTF model loaders", logo: "react" },
        { tech: "Factory walkthrough", use: "Interactive scrub through CNC + woodwork divisions" },
        { tech: "Project 3D viewer", use: "Spin around finished spaces from any angle" },
      ],
    },
    backend: {
      label: "Backend / CMS",
      sub: "Where the team controls content",
      icon: Database,
      color: A,
      items: [
        { tech: "Payload 3", use: "Self-hosted, Next.js-native CMS with type-safe collections", logo: "payload" },
        { tech: "PostgreSQL (Neon)", use: "Serverless Postgres for projects, news, leads, and team", logo: "postgresql" },
        { tech: "Drizzle ORM", use: "Type-safe SQL with zero runtime overhead", logo: "drizzle" },
        { tech: "Resend", use: "Transactional email — contact forms, demo requests", logo: "resend" },
        { tech: "Cloudinary", use: "Media transformations and optimized image delivery", logo: "cloudinary" },
      ],
    },
    ops: {
      label: "Ops & Observability",
      sub: "Always on. Always measured.",
      icon: Server,
      color: R,
      items: [
        { tech: "Vercel", use: "Hosting with Frankfurt edge for low Saudi latency", logo: "vercel" },
        { tech: "Vercel Analytics", use: "Real-user performance metrics and Core Web Vitals", logo: "vercel" },
        { tech: "Plausible", use: "PDPL-friendly analytics — no cookies, EU-hosted", logo: "plausible" },
        { tech: "Sentry", use: "Error tracking and performance monitoring", logo: "sentry" },
        { tech: "GitHub Actions", use: "CI for type-check, lint, build, and Lighthouse budgets", logo: "githubactions" },
        { tech: "lighthouse-ci", use: "Automated performance budgets on every PR", logo: "lighthouse" },
      ],
    },
  };

  const stackEntries = Object.entries(stack) as [StackKey, (typeof stack)[StackKey]][];
  const activeStackData = stack[activeStack];

  /* ═══ GANTT ═══ */

  const ganttRows: { label: string; color: string; from: number; to: number; note: string }[] = [
    { label: "Discovery & content", color: G, from: 1, to: 1, note: "Brand audit, content writing, asset gathering" },
    { label: "Design system", color: B, from: 1, to: 2, note: "Tokens, components, page templates in Figma" },
    { label: "Frontend build", color: P, from: 2, to: 3, note: "All public routes — bilingual, responsive" },
    { label: "CMS + content", color: A, from: 3, to: 4, note: "Payload collections, project migration, team copy" },
    { label: "i18n + QA + launch", color: R, from: 4, to: 4, note: "Arabic mirror, accessibility, performance, launch" },
  ];

  /* ═══ RENDER ═══ */

  return (
    <>
      <SectionNav />
      <div ref={ref} style={{ background: "#fff", color: D }}>

        {/* ═══ 1. HERO ═══ */}
        <section
          className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
          style={{ background: "#fff" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
          />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[820px] h-[340px] pointer-events-none"
            style={{ background: `radial-gradient(ellipse, ${G}18 0%, transparent 70%)` }}
          />

          <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center">
            <div className="ph-hero opacity-0 text-center mb-6" style={{ paddingTop: 0 }}>
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold"
                style={{ background: D, color: G, border: `1px solid ${D}` }}
              >
                <Mountain size={12} /> Where Excellence Reaches Its Peak
              </span>
            </div>

            <div className="ph-hero opacity-0 text-center mb-3">
              <h1 className="heading" style={{ fontSize: "clamp(40px, 9vw, 96px)", lineHeight: 1.05, color: D, letterSpacing: "-0.02em" }}>
                VERTEX <span style={{ color: G }}>INTEGRA</span>
              </h1>
            </div>

            <div className="ph-hero opacity-0 text-center mb-4 max-w-2xl">
              <p className="text-base md:text-lg" style={{ color: "rgba(0,0,0,0.55)" }}>
                Building Excellence. Integrating Vision.
              </p>
            </div>

            <div className="ph-hero opacity-0 text-center mb-9 max-w-xl">
              <p className="text-[12px] " style={{ color: "rgba(0,0,0,0.4)" }}>
                <span style={{ color: G, fontWeight: 700 }}>Vertex</span> <span style={{ fontFamily: "system-ui" }}>(Latin: summit)</span>
                {"  ·  "}
                <span style={{ color: G, fontWeight: 700 }}>Integra</span> <span style={{ fontFamily: "system-ui" }}>(Latin: whole)</span>
              </p>
            </div>

            {/* CTA buttons */}
            <div className="ph-hero opacity-0 flex flex-wrap justify-center gap-3 mb-10">
              <a
                href="#plan"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold"
                style={{
                  background: G, color: D, border: `2px solid ${D}`,
                  boxShadow: `4px 4px 0px 0px ${D}`, textDecoration: "none",
                }}
              >
                Explore the Plan <ArrowDown size={14} />
              </a>
              <a
                href="https://vertexintegra.com"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold"
                style={{
                  background: "#fff", color: D, border: `2px solid ${D}`,
                  boxShadow: `4px 4px 0px 0px ${D}`, textDecoration: "none",
                }}
              >
                vertexintegra.com <ArrowRight size={14} />
              </a>
            </div>

            {/* Stats row */}
            <div className="ph-hero opacity-0 mb-10 w-full max-w-3xl">
              <div
                className="flex items-stretch justify-center"
                style={{
                  background: "#fff", border: "1px solid #E8E8E8",
                  borderRadius: 16, overflow: "hidden",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                }}
              >
                {[
                  { n: "25+", l: "Years" },
                  { n: "150+", l: "Projects" },
                  { n: "800K+", l: "Square metres" },
                  { n: "6+", l: "Industries" },
                  { n: "10+", l: "Partnerships" },
                ].map((s, i) => (
                  <div
                    key={s.l}
                    className="flex-1 flex flex-col items-center justify-center py-5 px-2 relative"
                    style={{ borderRight: i > 0 ? "1px solid #F0F0F0" : "none" }}
                  >
                    <span className="heading" style={{ fontSize: 24, lineHeight: 1, color: D }}>{s.n}</span>
                    <span className="text-[9px] font-bold mt-1 text-center tracking-wide" style={{ color: "rgba(0,0,0,0.4)" }}>{s.l}</span>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-t-full" style={{ background: G }} />
                  </div>
                ))}
              </div>
            </div>

            <div className="ph-hero opacity-0 flex flex-col items-center gap-2 mt-2">
              <div
                style={{
                  width: 24, height: 38, border: "1.5px solid rgba(0,0,0,0.14)",
                  borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 5,
                }}
              >
                <div
                  style={{
                    width: 3, height: 6, borderRadius: 2, background: G,
                    animation: "mouseScroll 1.6s ease-in-out infinite",
                  }}
                />
              </div>
            </div>
          </div>
          <style>{`@keyframes mouseScroll{0%{transform:translateY(0);opacity:1}75%{transform:translateY(9px);opacity:0}76%{transform:translateY(0);opacity:0}100%{opacity:1}}`}</style>
        </section>

        {/* ═══ 2. BRAND STORY — EDITORIAL ═══ */}
        <section
          id="story"
          className="ph-slide opacity-0"
          style={{ padding: "120px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Editorial framing — no centered head, asymmetric layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
              <div className="lg:col-span-5">
                <p className="text-[11px] font-bold tracking-[1.5px] mb-4" style={{ color: G }}>
                  Chapter 01 · The Brand Story
                </p>
                <h2 className="heading" style={{ fontSize: "clamp(44px, 5.5vw, 84px)", lineHeight: 1.3, color: D, letterSpacing: "-0.02em" }}>
                  From{" "}
                  <span style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic", color: G, fontWeight: 400 }}>
                    factory
                  </span>
                  <br />
                  to finish.
                </h2>
              </div>
              <div className="lg:col-span-7 lg:pt-12">
                <p className="text-[18px] leading-[1.7]" style={{ color: D, fontWeight: 300 }}>
                  In a region defined by ambition, only the most{" "}
                  <span style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic", color: G }}>integrated and precise</span>{" "}
                  partners reach the peak. With our own factory as the foundation, we transform raw materials into finished spaces, events, and experiences that stand above the rest.
                </p>
                <p className="text-[15px] leading-[1.8] mt-5" style={{ color: "rgba(0,0,0,0.55)" }}>
                  We are the apex where design, fabrication, installation, and support converge — one partner who brings everything together at the summit.
                </p>
              </div>
            </div>

            {/* Etymology — letter blocks */}
            <div className="rounded-[24px] p-8 md:p-12" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div>
                  <p className="text-[10px] font-bold tracking-[1.5px] mb-5" style={{ color: G }}>
                    Vertex
                  </p>
                  <div className="flex gap-1.5 mb-5">
                    {["V", "E", "R", "T", "E", "X"].map((c, i) => (
                      <div
                        key={`v-${i}`}
                        className="heading flex items-center justify-center"
                        style={{
                          width: 38,
                          height: 46,
                          fontSize: 22,
                          background: i === 0 ? D : "#fff",
                          color: i === 0 ? G : D,
                          border: `1px solid ${i === 0 ? D : "#EBEBEB"}`,
                          borderRadius: 6,
                        }}
                      >
                        {c}
                      </div>
                    ))}
                  </div>
                  <p className="text-[12px] mb-1" style={{ color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-instrument)", fontStyle: "italic" }}>
                    Latin
                  </p>
                  <p className="heading text-xl mb-2" style={{ color: D }}>
                    summit · peak · highest point
                  </p>
                  <p className="text-[13px] leading-[1.7]" style={{ color: "rgba(0,0,0,0.55)" }}>
                    Leadership · Culmination · Precision · Aspiration
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-bold tracking-[1.5px] mb-5" style={{ color: G }}>
                    Integra
                  </p>
                  <div className="flex gap-1.5 mb-5">
                    {["I", "N", "T", "E", "G", "R", "A"].map((c, i) => (
                      <div
                        key={`i-${i}`}
                        className="heading flex items-center justify-center"
                        style={{
                          width: 34,
                          height: 46,
                          fontSize: 20,
                          background: i === 0 ? D : "#fff",
                          color: i === 0 ? G : D,
                          border: `1px solid ${i === 0 ? D : "#EBEBEB"}`,
                          borderRadius: 6,
                        }}
                      >
                        {c}
                      </div>
                    ))}
                  </div>
                  <p className="text-[12px] mb-1" style={{ color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-instrument)", fontStyle: "italic" }}>
                    Latin
                  </p>
                  <p className="heading text-xl mb-2" style={{ color: D }}>
                    whole · complete · integrated
                  </p>
                  <p className="text-[13px] leading-[1.7]" style={{ color: "rgba(0,0,0,0.55)" }}>
                    Integration · Wholeness · Seamlessness
                  </p>
                </div>
              </div>

              {/* The combination */}
              <div className="mt-10 pt-10" style={{ borderTop: "1px solid #EBEBEB" }}>
                <p className="text-[18px] leading-[1.6]" style={{ color: D, fontWeight: 400 }}>
                  Together —{" "}
                  <span style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic", color: G }}>
                    the summit of integrated excellence
                  </span>
                  . Every detail meets at the highest point.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 3. THE FIVE PILLARS ═══ */}
        <section id="pillars" className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead eyebrow="One Partner. Peak Results." subtitle="Five integrated service lines under a single roof — design, fabricate, install, deliver.">
              The <span style={{ color: G }}>Five Pillars</span>
            </SectionHead>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 ph-stagger">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="ph-item rounded-[20px] p-6 flex flex-col transition-all hover:-translate-y-1"
                  style={{ background: "#fff", border: "1px solid #EBEBEB", boxShadow: `3px 3px 0px 0px ${p.color}25` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ background: `${p.color}15` }}
                    >
                      <p.icon size={20} color={p.color} />
                    </div>
                    <span className="heading text-2xl" style={{ color: `${p.color}40` }}>
                      {p.num}
                    </span>
                  </div>
                  <h3 className="heading text-lg mb-2" style={{ color: D }}>
                    {p.title}
                  </h3>
                  <p className="text-[12px] leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 4. FACTORY POWER (DARK 1/2) — CONTROL PANEL ═══ */}
        <section
          id="factory"
          className="ph-slide opacity-0"
          style={{ padding: "120px 24px", background: D, position: "relative", overflow: "hidden" }}
        >
          {/* Background grain */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
          />
          <div
            className="absolute top-0 left-0 w-[600px] h-[400px] pointer-events-none"
            style={{ background: `radial-gradient(ellipse, ${G}10 0%, transparent 60%)` }}
          />

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Editorial heading — asymmetric */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
              <div className="lg:col-span-7">
                <p className="text-[11px] font-bold tracking-[1.5px] mb-4" style={{ color: G }}>
                  Chapter 03 · The Factory Floor
                </p>
                <h2 className="heading" style={{ fontSize: "clamp(40px, 5.5vw, 76px)", lineHeight: 0.95, color: "#fff", letterSpacing: "-0.02em" }}>
                  The{" "}
                  <span style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic", color: G, fontWeight: 400 }}>
                    heart
                  </span>{" "}
                  of Vertex.
                </h2>
              </div>
              <div className="lg:col-span-5 lg:pt-8">
                <p className="text-[14px] leading-[1.8]" style={{ color: "rgba(255,255,255,0.7)" }}>
                  Our factory is the cornerstone of our operations — a state-of-the-art facility where cutting-edge technology meets skilled craftsmanship. Under the leadership of Managing Director Chadi Assi, the floor operates with precision, efficiency, and an unwavering commitment to quality.
                </p>
              </div>
            </div>

            {/* Two divisions — split with big background numbers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                { title: "Woodwork Division", color: G, icon: Hammer, desc: "Bespoke wooden elements — custom cabinetry, furniture, intricate architectural details — using premium materials and advanced CNC technology.", count: "01" },
                { title: "Steelwork Division", color: B, icon: Cog, desc: "Custom steel components with precision engineering — structural elements to decorative metalwork — seamlessly integrated with every project.", count: "02" },
              ].map((d) => (
                <div
                  key={d.title}
                  className="rounded-[20px] p-7 relative overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <span
                    className="heading absolute -top-2 -right-2 select-none"
                    style={{ fontSize: 140, color: `${d.color}10`, lineHeight: 1, fontWeight: 700 }}
                  >
                    {d.count}
                  </span>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${d.color}18` }}>
                        <d.icon size={18} color={d.color} />
                      </div>
                      <p className="text-[10px] font-bold tracking-[1px]" style={{ color: d.color }}>
                        Division
                      </p>
                    </div>
                    <h3 className="heading text-2xl mb-3" style={{ color: "#fff" }}>{d.title}</h3>
                    <p className="text-[13px] leading-[1.7]" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {d.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Machinery — control panel grid */}
            <div className="rounded-[20px] overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div
                className="px-7 py-5 flex flex-col md:flex-row md:items-center justify-between gap-3"
                style={{ background: "rgba(0,0,0,0.3)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${G}18` }}>
                    <Cpu size={18} color={G} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[1px]" style={{ color: G }}>Key Machinery</p>
                    <p className="heading text-lg" style={{ color: "#fff" }}>Equipment that defines the floor</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: G, boxShadow: `0 0 12px ${G}` }} />
                  <span className="text-[10px] tracking-[1px] font-bold" style={{ color: G }}>Operational</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3">
                {machinery.map((m, i) => (
                  <div
                    key={m}
                    className="p-5 flex flex-col gap-3"
                    style={{
                      borderRight: i % 3 !== 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                      borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="heading text-[11px] tabular-nums"
                        style={{ color: "rgba(255,255,255,0.35)", letterSpacing: 1 }}
                      >
                        UNIT/{String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: G }} />
                    </div>
                    <p className="heading text-base leading-tight" style={{ color: "#fff" }}>
                      {m}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                {[
                  { n: "Saudi", l: "Local content", icon: MapPin, accent: G },
                  { n: "In-house", l: "Full control", icon: Boxes, accent: B },
                  { n: "CNC", l: "Precision-driven", icon: Cpu, accent: P },
                ].map((s, i) => (
                  <div
                    key={s.l}
                    className="px-5 py-4 flex items-center gap-3"
                    style={{
                      background: `${s.accent}12`,
                      borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${s.accent}25` }}
                    >
                      <s.icon size={14} color={s.accent} />
                    </div>
                    <div>
                      <p className="heading text-base" style={{ color: "#fff", lineHeight: 1 }}>{s.n}</p>
                      <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.6)" }}>{s.l}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Italic pull quote */}
            <p
              className="mt-12 text-center"
              style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic", color: G, fontWeight: 400, lineHeight: 1.4, fontSize: "clamp(24px, 3vw, 36px)" }}
            >
              &ldquo;Inspiration in every design. Durability in every piece.&rdquo;
            </p>
          </div>
        </section>

        {/* ═══ 5. PROCESS — FLYWHEEL CARDS WITH WATERMARK NUMBERS ═══ */}
        <section id="process" className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#fff" }}>
          <div className="max-w-6xl mx-auto">
            {/* Editorial heading */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-14">
              <div className="lg:col-span-5">
                <p className="text-[11px] font-bold mb-3" style={{ color: G, letterSpacing: "0.06em" }}>
                  04 · The Method
                </p>
                <h2 className="heading" style={{ fontSize: "clamp(40px, 5.5vw, 76px)", lineHeight: 1.1, color: D, letterSpacing: "-0.02em" }}>
                  Five beats.{" "}
                  <span style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic", color: G, fontWeight: 400 }}>
                    one rhythm.
                  </span>
                </h2>
              </div>
              <div className="lg:col-span-7 lg:pt-4">
                <p className="text-[15px] leading-[1.7]" style={{ color: "rgba(0,0,0,0.65)" }}>
                  No project starts on a workshop floor — it starts in a conversation. The same five beats run every project, from a residential villa to a 5,000-person Honda activation.
                </p>
              </div>
            </div>

            {/* Flywheel cards — watermark numbers + arrows between */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ph-stagger">
              {process.map((s, i) => {
                const colors = [G, B, P, A, R];
                const owners = ["Account", "Design", "Factory", "Site", "Care"];
                const taglines = [
                  "before any drawing exists",
                  "where craft meets concept",
                  "the floor takes over",
                  "ownership goes physical",
                  "the relationship begins",
                ];
                const isLast = i === process.length - 1;
                const c = colors[i];
                return (
                  <div
                    key={s.title}
                    className="ph-item relative rounded-[20px] p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: isLast ? G : "#fff",
                      border: `1.5px solid ${isLast ? D : "#D4D4D4"}`,
                      boxShadow: `4px 4px 0px 0px ${isLast ? D : c}`,
                    }}
                  >
                    {/* Large watermark number */}
                    <div
                      className="absolute -right-2 -top-3 heading select-none pointer-events-none"
                      style={{
                        fontSize: 96,
                        lineHeight: 1,
                        color: isLast ? "rgba(0,0,0,0.08)" : `${c}10`,
                        fontFamily: "var(--font-bebas), Impact, sans-serif",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {s.step}
                    </div>

                    <div className="relative z-10">
                      {/* Icon square */}
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                        style={{ background: isLast ? "rgba(0,0,0,0.08)" : `${c}12` }}
                      >
                        <s.icon size={20} color={isLast ? D : c} />
                      </div>

                      {/* Title */}
                      <h3 className="heading text-lg mb-2" style={{ color: D, lineHeight: 1.15 }}>
                        {s.title}
                      </h3>

                      {/* Italic tagline */}
                      <p
                        className="mb-3 text-[12px]"
                        style={{
                          fontFamily: "var(--font-instrument)",
                          fontStyle: "italic",
                          color: isLast ? "rgba(0,0,0,0.7)" : c,
                        }}
                      >
                        {taglines[i]}
                      </p>

                      {/* Description */}
                      <p className="text-[11px] leading-[1.65] mb-5" style={{ color: isLast ? "rgba(0,0,0,0.65)" : "rgba(0,0,0,0.55)" }}>
                        {s.desc}
                      </p>

                      {/* Owner badge — bottom */}
                      <div className="pt-4" style={{ borderTop: `1px solid ${isLast ? "rgba(0,0,0,0.12)" : "#F0F0F0"}` }}>
                        <span
                          className="text-[10px] font-bold"
                          style={{
                            color: isLast ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.4)",
                            letterSpacing: "0.04em",
                          }}
                        >
                          owned by{" "}
                          <span style={{ color: isLast ? D : c, fontWeight: 700 }}>
                            {owners[i]}
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Arrow to next card — desktop only */}
                    {i < process.length - 1 && (
                      <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ background: "#fff", border: `1.5px solid ${D}` }}
                        >
                          <ArrowRight size={11} color={D} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Italic pull quote — closing line */}
            <p
              className="mt-14 text-center"
              style={{
                fontFamily: "var(--font-instrument)",
                fontStyle: "italic",
                fontSize: "clamp(20px, 2.5vw, 32px)",
                lineHeight: 1.4,
                color: D,
              }}
            >
              Five discrete handoffs.{" "}
              <span style={{ color: G }}>One owner per stage.</span>{" "}
              Zero context lost between teams.
            </p>
          </div>
        </section>

        {/* ═══ 6. FEATURED PROJECTS ═══ */}
        <section id="projects" className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead
              eyebrow="A Portfolio Built on Excellence"
              subtitle="Eleven case studies across automotive, government, festival, and tech — each delivered under tight timelines and complex requirements."
            >
              Featured <span style={{ color: G }}>Projects</span>
            </SectionHead>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ph-stagger">
              {projects.map((proj) => (
                <div
                  key={proj.name}
                  className="ph-item rounded-[18px] p-6 flex flex-col transition-all hover:-translate-y-1"
                  style={{ background: "#fff", border: `1px solid ${proj.industryColor}25` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider"
                      style={{ background: `${proj.industryColor}12`, color: proj.industryColor }}
                    >
                      {proj.industry}
                    </span>
                    <Eye size={14} color={`${proj.industryColor}80`} />
                  </div>

                  <h4 className="heading text-lg mb-2" style={{ color: D }}>
                    {proj.name}
                  </h4>
                  <p className="text-[12px] font-bold mb-3" style={{ color: proj.industryColor }}>
                    {proj.tagline}
                  </p>
                  <p className="text-[11px] leading-relaxed flex-1" style={{ color: "rgba(0,0,0,0.55)" }}>
                    {proj.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 7. INDUSTRIES — SECTOR LEDGER ═══ */}
        <section
          id="industries"
          className="ph-slide opacity-0"
          style={{ padding: "120px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Editorial header */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
              <div className="lg:col-span-5">
                <p className="text-[11px] font-bold tracking-[1.5px] mb-4" style={{ color: G }}>
                  Chapter 06 · The Sectors
                </p>
                <h2 className="heading" style={{ fontSize: "clamp(40px, 5.5vw, 76px)", lineHeight: 0.95, color: D, letterSpacing: "-0.02em" }}>
                  Industries{" "}
                  <span style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic", color: G, fontWeight: 400 }}>
                    we elevate.
                  </span>
                </h2>
              </div>
              <div className="lg:col-span-7 lg:pt-6">
                <p className="text-[15px] leading-[1.8]" style={{ color: "rgba(0,0,0,0.6)" }}>
                  Six sectors. One delivery standard. From flagship boutiques in luxury malls to government-led activations and residential palaces — each industry asks a different question, and we answer with the same factory and the same team.
                </p>
              </div>
            </div>

            {/* Sector ledger — table-style rows */}
            <div className="rounded-[20px] overflow-hidden" style={{ border: "1px solid #EBEBEB" }}>
              {/* Header row */}
              <div
                className="hidden md:grid grid-cols-12 px-6 py-3 text-[10px] font-bold tracking-[1px]"
                style={{ background: "#FAFAFA", color: "rgba(0,0,0,0.45)", borderBottom: "1px solid #EBEBEB" }}
              >
                <div className="col-span-1">№</div>
                <div className="col-span-3">Sector</div>
                <div className="col-span-1 text-center">Projects</div>
                <div className="col-span-7">Featured clients & contexts</div>
              </div>

              {[
                {
                  sector: "Automotive",
                  icon: Cpu,
                  color: B,
                  count: 6,
                  clients: ["Honda", "Toyota / ALJ", "Soueast", "Midea", "Paris Dakar"],
                  note: "Brand activations, signing ceremonies, multi-city roadtrips, exhibition booths.",
                },
                {
                  sector: "Government",
                  icon: Building2,
                  color: A,
                  count: 3,
                  clients: ["Black Arabia (Salone del Mobili)", "Lebanese Consulate KSA", "PPMDC"],
                  note: "Cultural, diplomatic, and public-sector activations with VIP-grade detailing.",
                },
                {
                  sector: "Hospitality & F&B",
                  icon: Sparkles,
                  color: A,
                  count: null,
                  clients: ["Restaurants", "Hotels", "Guest experiences"],
                  note: "Atmosphere is everything — spaces that enhance the guest experience from the first moment.",
                },
                {
                  sector: "Festival & Entertainment",
                  icon: Sparkles,
                  color: R,
                  count: 1,
                  clients: ["Red Sea Festival (with ProductionGlue)"],
                  note: "Outdoor / indoor environment integration on high-profile festival production.",
                },
                {
                  sector: "Tech",
                  icon: Cpu,
                  color: P,
                  count: 1,
                  clients: ["Intersystems Tahaluf"],
                  note: "Tight-footprint exhibition booths with integrated meeting rooms, screens, and storage.",
                },
                {
                  sector: "Luxury Retail",
                  icon: Crown,
                  color: G,
                  count: null,
                  clients: ["Boutiques", "Showrooms", "Flagship spaces"],
                  note: "High-end boutiques, luxury showrooms, and flagship retail spaces with immersive brand environments.",
                },
                {
                  sector: "Corporate",
                  icon: Briefcase,
                  color: P,
                  count: null,
                  clients: ["Modern offices", "Productive workspaces"],
                  note: "Modern, functional, and inspiring workspaces designed to boost productivity and reflect brand identity.",
                },
                {
                  sector: "Residential",
                  icon: Home,
                  color: D,
                  count: null,
                  clients: ["Private villas", "Palaces"],
                  note: "Bespoke interiors crafted to the highest standards of elegance and comfort.",
                },
              ].map((row, i, arr) => (
                <div
                  key={row.sector}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 px-6 py-5 items-center"
                  style={{
                    background: i % 2 === 0 ? "#fff" : "#FAFAFA",
                    borderBottom: i < arr.length - 1 ? "1px solid #EBEBEB" : "none",
                  }}
                >
                  <div className="md:col-span-1 flex items-center gap-3 md:block">
                    <span
                      className="heading text-[11px] tabular-nums"
                      style={{ color: "rgba(0,0,0,0.35)", letterSpacing: 1 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="md:col-span-3 flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${row.color}12` }}
                    >
                      <row.icon size={16} color={row.color} />
                    </div>
                    <p className="heading text-base" style={{ color: D }}>
                      {row.sector}
                    </p>
                  </div>
                  <div className="md:col-span-1 md:text-center">
                    {row.count !== null ? (
                      <span
                        className="heading text-2xl tabular-nums"
                        style={{ color: row.color, lineHeight: 1 }}
                      >
                        {row.count}
                      </span>
                    ) : (
                      <span className="text-[11px]" style={{ color: "rgba(0,0,0,0.3)", fontFamily: "var(--font-instrument)", fontStyle: "italic" }}>
                        ongoing
                      </span>
                    )}
                  </div>
                  <div className="md:col-span-7">
                    <div className="flex flex-wrap gap-1.5 mb-1.5">
                      {row.clients.map((c) => (
                        <span
                          key={c}
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold"
                          style={{
                            background: `${row.color}10`,
                            color: row.color,
                            border: `1px solid ${row.color}25`,
                          }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                    <p className="text-[12px] leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>
                      {row.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary strip */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { n: "6+", l: "Sectors served" },
                { n: "150+", l: "Projects delivered" },
                { n: "11", l: "Recent case studies" },
                { n: "5", l: "Service lines applied" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-[12px] px-5 py-4 flex items-center gap-3"
                  style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}
                >
                  <span className="heading text-2xl tabular-nums" style={{ color: D, lineHeight: 1 }}>{s.n}</span>
                  <span className="text-[10px] font-bold tracking-wider" style={{ color: "rgba(0,0,0,0.45)" }}>
                    {s.l}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 8. LEADERSHIP — ORG HIERARCHY ═══ */}
        <section
          id="leadership"
          className="ph-slide opacity-0"
          style={{ padding: "120px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Editorial heading */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
              <div className="lg:col-span-5">
                <p className="text-[11px] font-bold tracking-[1.5px] mb-4" style={{ color: G }}>
                  Chapter 07 · The Minds Behind Vertex
                </p>
                <h2 className="heading" style={{ fontSize: "clamp(40px, 5.5vw, 76px)", lineHeight: 0.95, color: D, letterSpacing: "-0.02em" }}>
                  The{" "}
                  <span style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic", color: G, fontWeight: 400 }}>
                    chain of command.
                  </span>
                </h2>
              </div>
              <div className="lg:col-span-7 lg:pt-6">
                <p className="text-[15px] leading-[1.8]" style={{ color: "rgba(0,0,0,0.6)" }}>
                  Three roles. One reporting line. Strategy flows down from the Chairman through the Group MD into operations — and quality flows back up the same path. Every project benefits from all three layers of accountability.
                </p>
              </div>
            </div>

            {/* Hierarchy visualization */}
            <div className="relative">
              {/* CHAIRMAN — top node, full-width */}
              <div className="flex justify-center mb-3">
                <div
                  className="rounded-[20px] px-8 py-6 max-w-md w-full text-center relative"
                  style={{
                    background: D,
                    color: "#fff",
                    border: `2px solid ${D}`,
                    boxShadow: `6px 6px 0px 0px ${G}`,
                  }}
                >
                  <p className="text-[10px] font-bold tracking-[1.5px] mb-2" style={{ color: G }}>
                    Tier 01 · Chairman
                  </p>
                  <p className="heading text-3xl mb-1" style={{ color: "#fff", lineHeight: 1 }}>
                    Mahmoud Arabi
                  </p>
                  <p className="text-[12px] mt-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                    Strategic vision · Governance · Company direction
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold" style={{ background: `${G}15`, color: G }}>
                    <Crown size={11} /> Owns growth strategy & top-tier client relationships
                  </div>
                </div>
              </div>

              {/* Vertical connector */}
              <div className="flex justify-center">
                <div className="w-[3px] h-10" style={{ background: `linear-gradient(180deg, ${G}, ${B})` }} />
              </div>

              {/* GROUP MD — middle, mid-width */}
              <div className="flex justify-center mb-3">
                <div
                  className="rounded-[20px] px-7 py-5 max-w-sm w-full text-center"
                  style={{
                    background: "#fff",
                    border: `2px solid ${B}`,
                    boxShadow: `5px 5px 0px 0px ${B}`,
                  }}
                >
                  <p className="text-[10px] font-bold tracking-[1.5px] mb-2" style={{ color: B }}>
                    Tier 02 · Group Managing Director
                  </p>
                  <p className="heading text-2xl mb-1" style={{ color: D, lineHeight: 1 }}>
                    Edgard Tabet
                  </p>
                  <p className="text-[12px] mt-2" style={{ color: "rgba(0,0,0,0.55)" }}>
                    Group operations · Business development · Strategic partnerships
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold" style={{ background: `${B}12`, color: B }}>
                    <Network size={11} /> Drives cross-functional excellence
                  </div>
                </div>
              </div>

              {/* Vertical connector */}
              <div className="flex justify-center">
                <div className="w-[3px] h-10" style={{ background: `linear-gradient(180deg, ${B}, ${P})` }} />
              </div>

              {/* MD — bottom node */}
              <div className="flex justify-center mb-3">
                <div
                  className="rounded-[20px] px-7 py-5 max-w-sm w-full text-center"
                  style={{
                    background: "#fff",
                    border: `2px solid ${P}`,
                    boxShadow: `5px 5px 0px 0px ${P}`,
                  }}
                >
                  <p className="text-[10px] font-bold tracking-[1.5px] mb-2" style={{ color: P }}>
                    Tier 03 · Managing Director
                  </p>
                  <p className="heading text-2xl mb-1" style={{ color: D, lineHeight: 1 }}>
                    Chadi Assi
                  </p>
                  <p className="text-[12px] mt-2" style={{ color: "rgba(0,0,0,0.55)" }}>
                    Day-to-day operations · Manufacturing excellence · Project delivery
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold" style={{ background: `${P}12`, color: P }}>
                    <Cog size={11} /> Owns the factory floor & on-time delivery
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ═══ 9. THE VERTEX BRAND SYSTEM ═══ */}
        <section
          id="brand"
          className="ph-slide opacity-0"
          style={{ padding: "120px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Editorial heading — tighter */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
              <div className="lg:col-span-5">
                <p className="text-[11px] font-bold mb-3" style={{ color: G, letterSpacing: "0.08em" }}>
                  08 · The Brand System
                </p>
                <h2 className="heading" style={{ fontSize: "clamp(40px, 5.5vw, 76px)", lineHeight: 1.05, color: D, letterSpacing: "-0.02em" }}>
                  What we&apos;re{" "}
                  <span style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic", color: G, fontWeight: 400 }}>
                    building for.
                  </span>
                </h2>
              </div>
              <div className="lg:col-span-7 lg:pt-4">
                <p className="text-[15px] leading-[1.7]" style={{ color: "rgba(0,0,0,0.65)" }}>
                  The production site at{" "}
                  <span style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic" }}>vertexintegra.com</span>{" "}
                  ships in the brand identity below — navy, silver, royal purple, Bebas Neue typography, and the geometric peak language pulled from the logo.
                </p>
              </div>
            </div>

            {/* Wordmark applied — three modes (light / dark / accent) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              {[
                { bg: "#FAFAFA", textColor: "#002561", separatorColor: "#989498", label: "Light surface", labelColor: "rgba(0,0,0,0.4)" },
                { bg: "#002561", textColor: "#fff", separatorColor: "#4FFFB0", label: "Navy primary", labelColor: "rgba(255,255,255,0.5)" },
                { bg: "#231f20", textColor: "#989498", separatorColor: "#fff", label: "Black background", labelColor: "rgba(255,255,255,0.4)" },
              ].map((mode) => (
                <div
                  key={mode.label}
                  className="rounded-[20px] px-6 py-10 flex flex-col items-center justify-center"
                  style={{ background: mode.bg, border: "1px solid #EBEBEB", minHeight: 180 }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-bebas), Impact, sans-serif",
                      fontSize: "clamp(28px, 3.4vw, 48px)",
                      color: mode.textColor,
                      letterSpacing: "0.02em",
                      lineHeight: 1,
                    }}
                  >
                    VERTEX <span style={{ color: mode.separatorColor }}>|</span> INTEGRA
                  </span>
                  <p
                    className="mt-3 text-[10px] font-bold"
                    style={{ color: mode.labelColor, letterSpacing: "0.1em" }}
                  >
                    {mode.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Tagline lockup */}
            <div
              className="rounded-[20px] px-8 py-7 mb-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              style={{ background: "#002561" }}
            >
              <p
                style={{
                  fontFamily: "var(--font-bebas), Impact, sans-serif",
                  fontSize: "clamp(28px, 3.5vw, 46px)",
                  color: "#fff",
                  letterSpacing: "0.02em",
                  lineHeight: 1.1,
                }}
              >
                BUILDING <span style={{ color: "#989498" }}>EXCELLENCE.</span> INTEGRATING <span style={{ color: "#4FFFB0" }}>VISION.</span>
              </p>
              <p
                style={{
                  fontFamily: "var(--font-instrument)",
                  fontStyle: "italic",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.55)",
                  whiteSpace: "nowrap",
                }}
              >
                — the brand promise
              </p>
            </div>

            {/* Two columns: Colors + Type specimens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Color stripe */}
              <div
                className="rounded-[20px] p-6"
                style={{ background: "#fff", border: "1px solid #EBEBEB" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Palette size={14} color={G} />
                    <p className="text-[11px] font-bold" style={{ color: G, letterSpacing: "0.06em" }}>Palette</p>
                  </div>
                  <p className="text-[10px]" style={{ color: "rgba(0,0,0,0.4)" }}>4 anchors</p>
                </div>
                {/* Pantone-style stripe */}
                <div className="rounded-[12px] overflow-hidden flex" style={{ height: 120, border: "1px solid #EBEBEB" }}>
                  {[
                    { hex: "#002561", name: "Navy", role: "Primary", text: "#fff" },
                    { hex: "#989498", name: "Silver", role: "Primary", text: D },
                    { hex: "#3d0054", name: "Purple", role: "Secondary", text: "#fff" },
                    { hex: "#231f20", name: "Black", role: "Secondary", text: "#fff" },
                  ].map((c) => (
                    <div
                      key={c.hex}
                      className="flex-1 flex flex-col justify-end p-3"
                      style={{ background: c.hex }}
                    >
                      <p
                        className="heading text-[13px]"
                        style={{ color: c.text, lineHeight: 1 }}
                      >
                        {c.name}
                      </p>
                      <p
                        className="text-[9px] mt-0.5"
                        style={{ color: c.text, opacity: 0.65, fontFamily: "ui-monospace, Menlo, monospace" }}
                      >
                        {c.hex}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="text-[10px]" style={{ color: "rgba(0,0,0,0.5)" }}>
                    <strong style={{ color: D }}>Primary</strong> · Navy + Silver
                  </div>
                  <div className="text-[10px] text-right" style={{ color: "rgba(0,0,0,0.5)" }}>
                    <strong style={{ color: D }}>Secondary</strong> · Purple + Black
                  </div>
                </div>
              </div>

              {/* Type specimens with real phrases */}
              <div
                className="rounded-[20px] p-6"
                style={{ background: "#fff", border: "1px solid #EBEBEB" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <TypeIcon size={14} color={G} />
                    <p className="text-[11px] font-bold" style={{ color: G, letterSpacing: "0.06em" }}>Type</p>
                  </div>
                  <p className="text-[10px]" style={{ color: "rgba(0,0,0,0.4)" }}>3 voices</p>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-bebas), Impact, sans-serif",
                        fontSize: 28,
                        color: D,
                        letterSpacing: "0.02em",
                        lineHeight: 1,
                      }}
                    >
                      PEAK INTEGRATION.
                    </p>
                    <p className="text-[10px] mt-1" style={{ color: "rgba(0,0,0,0.4)" }}>
                      Bebas Neue · headlines
                    </p>
                  </div>
                  <div style={{ borderTop: "1px solid #F0F0F0" }} />
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-poppins), sans-serif",
                        fontSize: 16,
                        color: D,
                        fontWeight: 500,
                        lineHeight: 1.4,
                      }}
                    >
                      Designed, fabricated, installed — under one roof.
                    </p>
                    <p className="text-[10px] mt-1" style={{ color: "rgba(0,0,0,0.4)" }}>
                      Poppins · body
                    </p>
                  </div>
                  <div style={{ borderTop: "1px solid #F0F0F0" }} />
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-tajawal), sans-serif",
                        fontSize: 22,
                        color: D,
                        fontWeight: 500,
                        direction: "rtl",
                        lineHeight: 1.3,
                      }}
                    >
                      فيرتكس إنتيجرا — قمة التكامل
                    </p>
                    <p className="text-[10px] mt-1" style={{ color: "rgba(0,0,0,0.4)" }}>
                      Tajawal · Arabic
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Personality strip */}
            <div className="mt-3 rounded-[20px] p-6 flex flex-col md:flex-row md:items-center gap-4" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
              <p className="text-[11px] font-bold flex-shrink-0" style={{ color: G, letterSpacing: "0.06em" }}>
                Personality
              </p>
              <div className="flex flex-wrap gap-2 flex-1">
                {["Bold", "Precise", "Reliable", "Innovative", "Partnership-driven"].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-bold"
                    style={{ background: "#002561", color: "#fff", fontFamily: "var(--font-poppins), sans-serif" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 10. SITEMAP ═══ */}
        <section id="sitemap" className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead
              eyebrow="The Site Plan"
              subtitle="Sixteen public routes, mirrored bilingually — every page mapped before a single line is written."
            >
              Site <span style={{ color: G }}>Map</span>
            </SectionHead>

            <div className="ph-stagger">
              {/* Root */}
              <div className="flex justify-center mb-6">
                <div
                  className="ph-item inline-flex items-center gap-3 px-8 py-4 rounded-full heading text-xl"
                  style={{ background: G, color: D, border: `2px solid ${D}`, boxShadow: `4px 4px 0px 0px ${D}` }}
                >
                  <Globe size={20} />
                  vertexintegra.com
                </div>
              </div>

              <div className="flex justify-center mb-2">
                <div className="w-[3px] h-8" style={{ background: G }} />
              </div>

              <div className="hidden md:flex justify-center mb-2">
                <div className="h-[3px] rounded-full" style={{ width: "65%", background: `linear-gradient(90deg, ${G}30, ${G}, ${G}30)` }} />
              </div>

              {/* Two pillars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {[
                  {
                    label: "English Site",
                    sub: "/en — primary locale",
                    code: "16 routes",
                    icon: Globe,
                    color: G,
                  },
                  {
                    label: "Arabic Mirror",
                    sub: "/ar — full RTL flip",
                    code: "16 mirrored routes",
                    icon: Layers,
                    color: B,
                  },
                ].map((b) => (
                  <div key={b.label} className="ph-item flex flex-col items-center">
                    <div className="hidden md:block w-[3px] h-6 mb-2" style={{ background: b.color }} />
                    <div
                      className="w-full rounded-[20px] p-6 text-center"
                      style={{ background: "#fff", border: `1.5px solid ${b.color}`, boxShadow: `3px 3px 0px 0px ${b.color}40` }}
                    >
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: `${b.color}15` }}>
                        <b.icon size={22} color={b.color} />
                      </div>
                      <p className="heading text-lg mb-1" style={{ color: D }}>{b.label}</p>
                      <p className="text-[11px] font-bold mb-2" style={{ color: b.color, fontFamily: "system-ui" }}>{b.sub}</p>
                      <span
                        className="inline-block px-3 py-1 rounded-full text-[10px] font-bold"
                        style={{ background: `${b.color}12`, color: b.color }}
                      >
                        {b.code}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Routes grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 ph-stagger">
                {publicRoutes.map((r) => (
                  <div
                    key={r.code}
                    className="ph-item rounded-[14px] p-4 flex items-start gap-3"
                    style={{ background: "#fff", border: "1px solid #EBEBEB" }}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${G}10` }}>
                      <r.icon size={14} color={G} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                          style={{ background: D, color: G, fontFamily: "system-ui" }}
                        >
                          {r.code}
                        </span>
                        <span className="text-[12px] font-bold" style={{ color: D, fontFamily: "ui-monospace, Menlo, monospace" }}>
                          {r.route}
                        </span>
                      </div>
                      <p className="text-[10px] leading-relaxed" style={{ color: "rgba(0,0,0,0.5)" }}>
                        {r.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bilingual summary */}
              <div className="mt-8 rounded-[16px] p-5 flex items-center justify-between flex-wrap gap-3" style={{ background: `${G}06`, border: `1px solid ${G}25` }}>
                <div className="flex items-center gap-3">
                  <Network size={16} color={G} />
                  <p className="text-[12px] " style={{ color: "rgba(0,0,0,0.7)" }}>
                    16 routes × 2 locales = <strong style={{ color: G }}>32 indexed paths</strong> with hreflang and per-locale sitemaps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 11. TECH STACK — TABBED ═══ */}
        <section id="stack" className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead eyebrow="The Engineering" subtitle="A modern, type-safe, edge-deployed stack — chosen for performance, maintainability, and the team's autonomy.">
              Tech <span style={{ color: G }}>Stack</span>
            </SectionHead>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {stackEntries.map(([key, group]) => {
                const Icon = group.icon;
                const isActive = activeStack === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveStack(key)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[12px] font-bold transition-all"
                    style={{
                      background: isActive ? group.color : "#fff",
                      color: isActive ? D : "rgba(0,0,0,0.65)",
                      border: isActive ? `2px solid ${D}` : "1px solid #EBEBEB",
                      cursor: "pointer",
                      boxShadow: isActive ? `4px 4px 0px 0px ${D}` : "none",
                    }}
                  >
                    <Icon size={14} />
                    <span className="">{group.label}</span>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full"
                      style={{
                        background: isActive ? "rgba(0,0,0,0.15)" : "#F3F4F6",
                        color: isActive ? D : "rgba(0,0,0,0.5)",
                      }}
                    >
                      {group.items.length}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active panel */}
            <div
              className="rounded-[24px] p-8 md:p-10"
              style={{ background: "#fff", border: `1.5px solid ${activeStackData.color}30`, boxShadow: `4px 4px 0px 0px ${activeStackData.color}15` }}
            >
              <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: `${activeStackData.color}18` }}
                  >
                    <activeStackData.icon size={26} color={activeStackData.color} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[1.5px] mb-1" style={{ color: activeStackData.color }}>
                      {activeStackData.sub}
                    </p>
                    <h3 className="heading text-2xl" style={{ color: D }}>
                      {activeStackData.label}
                    </h3>
                  </div>
                </div>
                <div className="text-[11px] " style={{ color: "rgba(0,0,0,0.4)" }}>
                  {activeStackData.items.length} technologies
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeStackData.items.map((it) => (
                  <div
                    key={it.tech}
                    className="rounded-[14px] p-4 flex items-start gap-3"
                    style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}
                  >
                    {it.logo ? (
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "#fff", border: "1px solid #EBEBEB" }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`/logos/vertex/${it.logo}.svg`}
                          alt={it.tech}
                          width={20}
                          height={20}
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    ) : (
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0 mt-3"
                        style={{ background: activeStackData.color }}
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold mb-1" style={{ color: D, fontFamily: "ui-monospace, Menlo, monospace" }}>
                        {it.tech}
                      </p>
                      <p className="text-[11px] leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>
                        {it.use}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 12. BUILD PHASES (DARK 2/2) ═══ */}
        <section id="phases" className="ph-slide opacity-0" style={{ padding: "120px 24px", background: D }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead
              eyebrow="From Wireframe to Launch"
              color={G}
              light
              subtitle="Five phases. One month. Sequenced so design, build, and launch overlap intelligently."
            >
              Build <span style={{ color: G }}>Phases</span>
            </SectionHead>

            <div
              className="rounded-[24px] p-6 md:p-10"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {/* Week header */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-[180px] flex-shrink-0" />
                <div className="flex-1 grid gap-1" style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
                  {Array.from({ length: 4 }, (_, i) => i + 1).map((w) => (
                    <div
                      key={w}
                      className="text-center text-[11px] font-bold py-1"
                      style={{ color: "rgba(255,255,255,0.55)", fontFamily: "system-ui" }}
                    >
                      Week {w}
                    </div>
                  ))}
                </div>
              </div>

              {/* Rows */}
              <div className="flex flex-col gap-3">
                {ganttRows.map((r) => (
                  <div key={r.label} className="flex items-center gap-2">
                    <div className="w-[180px] flex-shrink-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <div className="w-2 h-2 rounded-full" style={{ background: r.color }} />
                        <span className="text-[12px] font-bold " style={{ color: "#fff" }}>
                          {r.label}
                        </span>
                      </div>
                      <p className="text-[9px] pl-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {r.note}
                      </p>
                    </div>
                    <div className="flex-1 grid gap-1 relative" style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
                      {Array.from({ length: 4 }, (_, i) => i + 1).map((w) => {
                        const active = w >= r.from && w <= r.to;
                        return (
                          <div
                            key={w}
                            className="h-9 rounded-md transition-all"
                            style={{
                              background: active ? r.color : "rgba(255,255,255,0.04)",
                              border: active ? `1px solid ${r.color}` : "1px solid rgba(255,255,255,0.04)",
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-8 pt-6 flex flex-wrap items-center justify-center gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                {ganttRows.map((r) => (
                  <div key={r.label} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ background: r.color }} />
                    <span className="text-[11px] " style={{ color: "rgba(255,255,255,0.5)" }}>
                      {r.label} · {r.from === r.to ? `Week ${r.from}` : `W${r.from}–${r.to}`}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stats summary */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { n: "1", l: "month to launch", icon: Calendar },
                  { n: "5", l: "phases", icon: Layers },
                  { n: "4", l: "working weeks", icon: Rocket },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="rounded-[14px] p-4 flex items-center gap-3"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${G}15` }}>
                      <s.icon size={16} color={G} />
                    </div>
                    <div>
                      <p className="heading text-lg" style={{ color: "#fff", lineHeight: 1 }}>{s.n}</p>
                      <p className="text-[10px] " style={{ color: "rgba(255,255,255,0.5)" }}>{s.l}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

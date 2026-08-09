"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid,
} from "recharts";
import {
  ArrowDown, ArrowRight,
  CalendarCheck, Palette, Printer, Megaphone, Share2, Truck,
  Film, MapPin, Trophy, Rocket, Building2,
  Globe, Home, FileText, Layers, Lightbulb, Mail,
  Type as TypeIcon, Code2, Database, Server,
  AlertTriangle, Instagram, Linkedin, Hash, Search, CheckCircle2,
  Gauge, Briefcase, Users, MessageCircle, TrendingUp,
  type LucideIcon,
} from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

/* ═══════════ PALETTE (Emotion brand DNA) ═══════════ */
const NAVY = "#1c1b28"; // primary dark — hero + cinematic feature sections
const LIME = "#eeeb66"; // accent
const RED = "#d32e28"; // accent
const SKY = "#86d1e8"; // accent
const ROYAL = "#233871"; // accent
const INK = "#0F0F0F"; // body text on light
const TAN = "'Loubag', var(--font-bricolage), system-ui, sans-serif"; // big display headings (Loubag)
const BRIC = "var(--font-bricolage), system-ui, sans-serif"; // sub-headings + body
const POP = "var(--font-poppins), system-ui, sans-serif"; // brand type specimen (client's own font)
const SPECTRUM = `linear-gradient(90deg, ${RED}, ${LIME}, ${SKY}, ${ROYAL}, ${RED})`;

/* ═══════════ CTA — mobadi PillCTA (pill body + disc that slides on hover) ═══════════ */
function CTA({
  href, children, variant = "primary", external, icon: Icon = ArrowRight, leading,
}: {
  href: string; children: React.ReactNode; variant?: "primary" | "ghost"; external?: boolean;
  icon?: LucideIcon; leading?: React.ReactNode;
}) {
  // All current placements sit on the dark NAVY surface (hero + sign-off).
  const bodyStyle: React.CSSProperties = variant === "primary"
    ? { background: "#fff", color: NAVY }
    : { background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.4)" };
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      className="group inline-flex items-center gap-3 rounded-full ps-6 pe-1.5 py-1.5 text-sm font-bold"
      style={{ ...bodyStyle, textDecoration: "none" }}
    >
      {leading}
      <span>{children}</span>
      <span
        className="flex items-center justify-center rounded-full transition-transform duration-200 group-hover:translate-x-0.5"
        style={{ width: 38, height: 38, background: LIME, color: NAVY }}
      >
        <Icon size={17} strokeWidth={2.5} />
      </span>
    </a>
  );
}

/* ═══════════ SIGNATURE — animated spectrum ribbon (used sparingly) ═══════════ */
function SpectrumRibbon({
  height = 4,
  className = "",
  style = {},
}: { height?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`spectrum-flow ${className}`}
      style={{
        height,
        borderRadius: 999,
        background: SPECTRUM,
        backgroundSize: "300% 100%",
        ...style,
      }}
    />
  );
}

/* ═══════════ SECTION HEAD ═══════════ */
function SectionHead({
  eyebrow, children, color = ROYAL, subtitle, light,
}: { eyebrow: string; children: React.ReactNode; color?: string; subtitle?: string; light?: boolean }) {
  return (
    <div className="text-center mb-12">
      <p style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic", fontSize: 19, color, marginBottom: 16 }}>{eyebrow}</p>
      <h2 style={{ fontFamily: TAN, fontWeight: 700, fontSize: "clamp(32px, 4.2vw, 58px)", lineHeight: 1.05, letterSpacing: 0, color: light ? "#fff" : INK, marginBottom: 16 }}>
        {children}
      </h2>
      {subtitle && (
        <p className="text-sm max-w-2xl mx-auto" style={{ color: light ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ═══════════ SECTION NAV (floating side pill, two acts) ═══════════ */
type NavItem = { id: string; label: string; color: string; act: 1 | 2 };
const NAV_SECTIONS: NavItem[] = [
  { id: "intro", label: "Intro", color: LIME, act: 1 },
  { id: "dna", label: "Brand DNA", color: SKY, act: 1 },
  { id: "services", label: "Services", color: RED, act: 1 },
  { id: "work", label: "Work", color: ROYAL, act: 1 },
  { id: "architecture", label: "Group", color: LIME, act: 1 },
  { id: "sitemap", label: "Sitemap", color: SKY, act: 1 },
  { id: "brand", label: "Identity", color: RED, act: 1 },
  { id: "stack", label: "Build", color: ROYAL, act: 1 },
  { id: "webphases", label: "Web Plan", color: LIME, act: 1 },
  { id: "audit", label: "Audit", color: RED, act: 2 },
  { id: "handles", label: "Handles", color: SKY, act: 2 },
  { id: "seo", label: "SEO Fix", color: RED, act: 2 },
  { id: "content", label: "Content", color: ROYAL, act: 2 },
  { id: "tone", label: "Tone", color: LIME, act: 2 },
  { id: "rollout", label: "90 Days", color: SKY, act: 2 },
  { id: "metrics", label: "Metrics", color: LIME, act: 2 },
];

function SectionNav() {
  const [active, setActive] = useState<string>("intro");

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
        const prevAct = i > 0 ? NAV_SECTIONS[i - 1].act : s.act;
        const showDivider = s.act !== prevAct;
        return (
          <div key={s.id}>
            {showDivider && (
              <div className="flex items-center gap-2 px-2.5 my-1.5">
                <SpectrumRibbon height={2} style={{ flex: 1 }} />
                <span className="text-[8px] font-bold tracking-[1px]" style={{ color: "rgba(0,0,0,0.35)" }}>ACT II</span>
              </div>
            )}
            <button
              onClick={() => handleClick(s.id)}
              className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-[8px] text-left cursor-pointer border-0 my-0.5 w-full"
              style={{
                background: isActive ? `${s.color}22` : "transparent",
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
                  boxShadow: isActive ? `0 0 0 3px ${s.color}40` : "none",
                  opacity: isActive ? 1 : 0.5,
                  transition: "all 250ms",
                }}
              />
              <span className="text-[10.5px] font-bold flex-shrink-0 tabular-nums" style={{ color: isActive ? INK : "rgba(0,0,0,0.35)", width: 16 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[10.5px] font-semibold truncate" style={{ color: isActive ? INK : "rgba(0,0,0,0.5)", width: 70 }}>
                {s.label}
              </span>
            </button>
          </div>
        );
      })}
    </aside>
  );
}

type StackKey = "frontend" | "i18n" | "backend" | "ops";

/* ═══════════ MAIN ═══════════ */
export default function EmotionPlan() {
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
          { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.06, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 82%", once: true } }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  /* ═══ DATA ═══ */

  const services: { num: string; title: string; desc: string; icon: LucideIcon; color: string; caps: string[] }[] = [
    { num: "01", title: "Event Management", desc: "End-to-end event design, planning, and on-ground execution.", icon: CalendarCheck, color: RED, caps: ["Planning", "Execution", "Management"] },
    { num: "02", title: "Branding", desc: "Identity systems that make brands felt, not just seen.", icon: Palette, color: LIME, caps: ["Brand identity", "Creative direction"] },
    { num: "03", title: "Production & Printing", desc: "From concept models to large-format builds and signage.", icon: Printer, color: SKY, caps: ["3D modeling", "Signage", "POS", "Printing tech"] },
    { num: "04", title: "Advertising & Marketing", desc: "Campaigns that move people — strategy through delivery.", icon: Megaphone, color: ROYAL, caps: ["Campaigns", "Branding & design", "Social media"] },
    { num: "05", title: "Social Media", desc: "Always-on content and community across every platform.", icon: Share2, color: RED, caps: ["Content", "Community", "Reels-first"] },
    { num: "06", title: "Logistics & Rentals", desc: "The full operational backbone behind every activation.", icon: Truck, color: SKY, caps: ["Catering", "Grandstands", "Lifts & generators", "Security & ushers", "Ticketing", "Sound engineering"] },
  ];

  const work: { name: string; client: string; year: string; cat: string; note: string; icon: LucideIcon; color: string }[] = [
    { name: "Midea 2026 Products", client: "HH Shaker | Midea", year: "2026", cat: "Event · Production", note: "Launch of Midea's R32 smart technology and 2026 product lineup.", icon: Film, color: SKY },
    { name: "Launching FAW J7", client: "FAW Trucks", year: "2025", cat: "Event · Production", note: "High-profile J7 flagship truck launch on the Saudi market.", icon: Truck, color: ROYAL },
    { name: "Soueast Roadtrip", client: "Soueast", year: "2025", cat: "PR & Influencers", note: "3-influencer activation testing the S06, S07 and S09 SUVs.", icon: MapPin, color: RED },
    { name: "Lebanese National Basketball Team", client: "Lebanese Consulate, KSA", year: "2025", cat: "Event · Production", note: "Designed, executed and managed a massive welcome event in the Kingdom.", icon: Trophy, color: LIME },
    { name: "F1 Honda · Yuki Tsunoda", client: "Formula 1 | Honda", year: "2025", cat: "Event · Production", note: "High-profile welcome for the F1 driver ahead of the Saudi Grand Prix.", icon: Rocket, color: SKY },
    { name: "PPMDC Saudi Founding Day", client: "PPMDC", year: "2024–25", cat: "Event · Production", note: "Creative installations for Ramadan and Saudi Founding Day.", icon: Building2, color: ROYAL },
  ];

  const globalBrands: { name: string; src: string; ext: "svg" | "png" }[] = [
    { name: "BMW", src: "/logos/emotion/brands/bmw.svg", ext: "svg" },
    { name: "Honda", src: "/logos/emotion/brands/honda.png", ext: "png" },
    { name: "Toyota", src: "/logos/emotion/brands/toyota.png", ext: "png" },
    { name: "Midea", src: "/logos/emotion/brands/midea.png", ext: "png" },
    { name: "Nespresso", src: "/logos/emotion/brands/nespresso.png", ext: "png" },
  ];

  // The one brand under the group is the Agency; the rest are CLIENTS Emotion serves.
  const keyClients: { name: string; role: string; logo: string; logoDark: boolean }[] = [
    { name: "Motion Motors", role: "Automotive retail & dealership (Soueast)", logo: "/logos/emotion/motionmotors.png", logoDark: false },
    { name: "Vertex Integra", role: "Fit-out & manufacturing", logo: "/logos/emotion/vertex.png", logoDark: false },
    { name: "All Star Basketball", role: "Sports academy", logo: "/logos/emotion/allstar.png", logoDark: false },
  ];

  type SiteNode = { route: string; label: string; children: string[]; icon: LucideIcon };

  // Emotion Group — the corporate parent site
  const groupSitemap: SiteNode[] = [
    { route: "/", label: "Home", children: [], icon: Home },
    { route: "/about", label: "About the Group", children: ["Our Story", "Vision & Values", "Leadership"], icon: FileText },
    { route: "/agency", label: "Emotion Agency", children: ["Our services brand", "Visit the agency site"], icon: Building2 },
    { route: "/clients", label: "Our Clients", children: ["Motion Motors", "Vertex Integra", "All Star Basketball", "& more"], icon: Briefcase },
    { route: "/news", label: "Group News", children: ["Announcements", "Press"], icon: Lightbulb },
    { route: "/contact", label: "Contact & Partnerships", children: ["Get in Touch", "Careers"], icon: Mail },
  ];

  // Emotion Agency — the 360° services brand (its own domain)
  const agencySitemap: SiteNode[] = [
    { route: "/", label: "Home", children: [], icon: Home },
    { route: "/about", label: "About Us", children: ["Who We Are", "The Team", "Why Emotion"], icon: FileText },
    { route: "/services", label: "Services", children: ["Event Management", "Branding", "Production & Printing", "Advertising & Marketing", "Social Media", "Logistics & Rentals"], icon: Megaphone },
    { route: "/work", label: "Work / Case Studies", children: ["Client Spotlights", "By Industry"], icon: Layers },
    { route: "/markets", label: "Markets", children: ["KSA (Jeddah · Riyadh)", "Dubai", "Beirut"], icon: MapPin },
    { route: "/insights", label: "Insights / Blog", children: ["Campaign Highlights", "Market Trends"], icon: Lightbulb },
    { route: "/contact", label: "Contact & Careers", children: ["Get a Quote", "Join the Team"], icon: Mail },
  ];

  /* ═══ TECH STACK ═══ */
  const stack: Record<StackKey, { label: string; sub: string; icon: LucideIcon; color: string; items: { tech: string; use: string; logo?: string }[] }> = {
    frontend: {
      label: "Frontend", sub: "The visible layer", icon: Code2, color: ROYAL,
      items: [
        { tech: "Next.js + React 19", use: "App Router, Server Components, full control over robots & metadata", logo: "nextjs" },
        { tech: "TypeScript", use: "End-to-end type safety from data to UI", logo: "typescript" },
        { tech: "Tailwind CSS v4", use: "Brand tokens (Navy + spectrum accents) wired as CSS vars", logo: "tailwindcss" },
        { tech: "GSAP + ScrollTrigger", use: "Cinematic, brand-true motion and scroll choreography", logo: "gsap" },
        { tech: "Lenis", use: "Buttery smooth scroll — desktop and mobile" },
        { tech: "next/font", use: "Poppins + Tajawal — zero layout shift, edge-cached" },
      ],
    },
    i18n: {
      label: "Internationalization", sub: "Bilingual EN ↔ AR · English primary", icon: Globe, color: SKY,
      items: [
        { tech: "next-intl", use: "Locale-aware routing, message catalogs, dates", logo: "nextintl" },
        { tech: "RTL flip", use: "Automatic layout mirror on the Arabic locale" },
        { tech: "hreflang", use: "Per-locale tags for correct international SEO" },
        { tech: "Per-locale sitemap", use: "Distinct entries for /en and /ar" },
      ],
    },
    backend: {
      label: "Backend / CMS", sub: "Where the team controls content", icon: Database, color: LIME,
      items: [
        { tech: "Payload 3", use: "Next.js-native CMS — services, portfolio, blog, careers", logo: "payload" },
        { tech: "PostgreSQL (Neon)", use: "Serverless Postgres for content and leads", logo: "postgresql" },
        { tech: "Drizzle ORM", use: "Type-safe SQL with zero runtime overhead", logo: "drizzle" },
        { tech: "Resend", use: "Transactional email — quote requests, careers", logo: "resend" },
        { tech: "Cloudinary", use: "Image/video optimization for the cinematic gallery", logo: "cloudinary" },
      ],
    },
    ops: {
      label: "Ops & Observability", sub: "Fast, measured, never invisible", icon: Server, color: RED,
      items: [
        { tech: "Vercel", use: "Edge hosting with Frankfurt region for low Saudi latency", logo: "vercel" },
        { tech: "Google Analytics 4", use: "Event tracking, user journeys, conversion funnels", logo: "/ext/google-analytics.png" },
        { tech: "Google Search Console", use: "Indexing status, crawl errors, keyword positions — the SEO cockpit", logo: "/ext/gsc.png" },
        { tech: "Microsoft Clarity", use: "Session recordings + heatmaps — see exactly where users drop off", logo: "/logos/vertex/clarity.svg" },
        { tech: "Sentry", use: "Real-time error and performance tracking", logo: "sentry" },
        { tech: "GitHub Actions", use: "CI: type-check, lint, build, Lighthouse performance budgets", logo: "githubactions" },
      ],
    },
  };
  const stackEntries = Object.entries(stack) as [StackKey, (typeof stack)[StackKey]][];
  const activeStackData = stack[activeStack];

  /* ═══ WEBSITE BUILD GANTT (relative phases — confirm window) ═══ */
  const webGantt: { label: string; color: string; from: number; to: number; note: string }[] = [
    { label: "Discovery & content", color: RED, from: 1, to: 2, note: "Brand audit + content for both sites (group + agency)" },
    { label: "Shared design system", color: LIME, from: 2, to: 3, note: "One token set & component library, themed per brand" },
    { label: "Frontend build · both sites", color: SKY, from: 3, to: 5, note: "emotiongrp.com + the agency site — bilingual EN/AR" },
    { label: "CMS + content", color: ROYAL, from: 4, to: 5, note: "Payload collections + content for the two domains" },
    { label: "QA + SEO + launch", color: RED, from: 5, to: 6, note: "Indexability, performance, launch — both sites" },
  ];

  /* ═══ 90-DAY ROLLOUT GANTT (3 phases × 12 weeks) ═══ */
  const rolloutGantt: { phase: number; label: string; color: string; from: number; to: number }[] = [
    { phase: 1, label: "Verify Search Console · both domains", color: RED, from: 1, to: 2 },
    { phase: 1, label: "Launch new agency social accounts", color: RED, from: 1, to: 2 },
    { phase: 1, label: "Optimize group accounts (bios/profiles)", color: RED, from: 1, to: 2 },
    { phase: 1, label: "Link-in-bio hub per brand", color: RED, from: 2, to: 2 },
    { phase: 2, label: "Service & work landing pages", color: LIME, from: 3, to: 6 },
    { phase: 2, label: "Unique meta across both sites", color: LIME, from: 3, to: 5 },
    { phase: 2, label: "Reels-first content calendar", color: LIME, from: 3, to: 6 },
    { phase: 2, label: "Google Business Profiles ×3", color: LIME, from: 4, to: 5 },
    { phase: 3, label: "Blog / insights + sitemap growth", color: SKY, from: 7, to: 12 },
    { phase: 3, label: "Core Web Vitals + mobile pass", color: SKY, from: 7, to: 9 },
    { phase: 3, label: "Client Spotlight series", color: SKY, from: 8, to: 12 },
    { phase: 3, label: "Monthly SEO + social reviews", color: SKY, from: 7, to: 12 },
  ];

  /* ═══ SEO FIXES ═══ */
  const seoFixes: { p: string; title: string; desc: string; icon: LucideIcon; color: string; stat?: string }[] = [
    { p: "P1", title: "Indexable from day one", desc: "Both new sites ship fully crawlable — correct robots & metadata API, no accidental noindex like the current site. Submitted to Google at launch.", icon: Search, color: RED, stat: "100% indexable at launch" },
    { p: "P1", title: "Search Console + sitemap per domain", desc: "Verify each property and auto-generate a complete sitemap.xml for emotiongrp.com and the agency domain — every page discoverable.", icon: CheckCircle2, color: LIME },
    { p: "P2", title: "Unique meta on every page", desc: "Distinct, keyword-rich titles and descriptions generated per route from the CMS — no duplicates, strong click-through.", icon: FileText, color: SKY },
    { p: "P3", title: "Core Web Vitals green from launch", desc: "SSR + edge delivery, optimized media and lazy-loading bake fast loads and mobile-first into both builds.", icon: Gauge, color: ROYAL },
    { p: "P3", title: "Local SEO · 3 Google Business Profiles", desc: "Create and verify listings for Jeddah, Dubai and Beirut with consistent NAP details.", icon: MapPin, color: LIME },
  ];

  /* ═══ CHART DATA ═══ */
  const followerData = [
    { name: "Instagram", value: 9688, color: RED },
    { name: "LinkedIn", value: 1000, color: ROYAL },
    { name: "X (Twitter)", value: 1181, color: SKY },
  ];
  const indexData = [
    { m: "Now", indexable: 0, organic: 0 },
    { m: "Wk 2", indexable: 100, organic: 5 },
    { m: "Wk 6", indexable: 100, organic: 18 },
    { m: "Wk 12", indexable: 100, organic: 30 },
  ];
  const contentMix = [
    { name: "Work", value: 45, color: ROYAL },
    { name: "Insights & Culture", value: 35, color: SKY },
    { name: "Team", value: 20, color: LIME },
  ];
  const kpiBars = [
    { k: "Organic traffic", base: 0, target: 30 },
    { k: "Follower growth", base: 0, target: 25 },
  ];

  const auditRows: { issue: string; severity: string; sevColor: string; impact: string }[] = [
    { issue: "Site-wide “noindex” on emotiongrp.com", severity: "Critical", sevColor: RED, impact: "Invisible on Google, Bing — zero organic discovery." },
    { issue: "No dedicated agency social presence", severity: "High", sevColor: ROYAL, impact: "Group & agency share one handle set — diluted, unfocused reach." },
    { issue: "Incomplete XML sitemap", severity: "High", sevColor: ROYAL, impact: "Service & portfolio pages never crawled." },
    { issue: "Missing / duplicate meta data", severity: "High", sevColor: ROYAL, impact: "Weak click-through from search results." },
    { issue: "Core Web Vitals & mobile gaps", severity: "Medium", sevColor: SKY, impact: "Slower loads hurt ranking and UX." },
    { issue: "No local SEO signals", severity: "Medium", sevColor: SKY, impact: "Absent from Jeddah / Dubai / Beirut local search." },
  ];

  type SocialAccount = { platform: string; handle: string; icon: LucideIcon; logo: string; note: string };
  const socialPresences: { brand: string; domain: string; accent: string; track: string; tag: string; accounts: SocialAccount[] }[] = [
    {
      brand: "Emotion Group", domain: "emotiongrp.com", accent: ROYAL, track: "Keep the existing accounts as they are", tag: "EXISTING · 9,688 followers",
      accounts: [
        { platform: "Instagram", handle: "@emotion_mena", icon: Instagram, logo: "/logos/instagram.svg", note: "Verified · 9,688 followers — kept as-is as the group voice." },
        { platform: "LinkedIn", handle: "Emotion MENA", icon: Linkedin, logo: "/logos/emotion/linkedin.svg", note: "Kept as the group page — corporate updates & news." },
        { platform: "X (Twitter)", handle: "@EmotionMena", icon: Hash, logo: "/logos/emotion/x.svg", note: "Kept for group-level news & announcements." },
      ],
    },
    {
      brand: "Emotion Agency", domain: "emotionagency.com", accent: RED, track: "Launch new, dedicated accounts", tag: "NEW · from scratch",
      accounts: [
        { platform: "Instagram", handle: "@emotionagency", icon: Instagram, logo: "/logos/instagram.svg", note: "New — services & client work, reels-first." },
        { platform: "LinkedIn", handle: "Emotion Agency", icon: Linkedin, logo: "/logos/emotion/linkedin.svg", note: "New company page — B2B reach & lead gen." },
        { platform: "X (Twitter)", handle: "@EmotionAgency", icon: Hash, logo: "/logos/emotion/x.svg", note: "New — campaigns & industry voice." },
      ],
    },
  ];

  const contentPillars: { title: string; color: string; icon: LucideIcon; items: string[] }[] = [
    { title: "Insights & Culture", color: SKY, icon: Lightbulb, items: ["AI + creativity", "Thought leadership", "Industry hot takes", "Workflow reels", "Consumer behavior", "Saudi culture angles"] },
    { title: "Work", color: ROYAL, icon: Briefcase, items: ["Campaigns", "Events", "Production hyperlapses", "Client success stories", "Case studies", "Idea-to-execution storytelling", "Event recaps"] },
    { title: "Team", color: LIME, icon: Users, items: ["Team culture", "Hiring announcements", "Agency lifestyle", "Milestones", "Achievements"] },
  ];

  const voiceAnchors: { anchor: string; sounds: string; sample: string; color: string }[] = [
    { anchor: "Confident", sounds: "Owns the result, never boastful.", sample: "“We don't pitch ideas — we deliver moments people remember.”", color: RED },
    { anchor: "Human", sounds: "Warm, first-person, people-first.", sample: "“Behind every launch is a team that cared about the details.”", color: LIME },
    { anchor: "Inspiring", sounds: "Forward-looking, energizing.", sample: "“Your brand has a story. Let's make the region feel it.”", color: SKY },
    { anchor: "Strategic", sounds: "Outcome-led, specific.", sample: "“From concept to crowd — engineered for impact, measured by reach.”", color: ROYAL },
    { anchor: "Contemporary", sounds: "Current, culturally fluent.", sample: "“Built for the feed, made for the moment. #DoItWithEmotion.”", color: RED },
  ];

  const finalKPIs: { n: string; l: string; icon: LucideIcon; color: string }[] = [
    { n: "2", l: "New sites live & indexable (group + agency)", icon: Search, color: RED },
    { n: "+30%", l: "Organic search traffic (90-day)", icon: TrendingUp, color: LIME },
    { n: "Own", l: "Dedicated agency social accounts launched", icon: Hash, color: SKY },
    { n: "+25%", l: "Follower growth · IG / LinkedIn / X", icon: Users, color: ROYAL },
    { n: "3", l: "Verified Google Business Profiles", icon: MapPin, color: RED },
    { n: "Weekly", l: "Reels published per platform", icon: Film, color: LIME },
  ];

  const tooltipStyle = { background: "#fff", border: "1px solid #E5E7EB", borderRadius: "12px", fontSize: 12 } as const;

  /* ═══ RENDER ═══ */
  return (
    <>
      <SectionNav />
      <div ref={ref} style={{ background: "#fff", color: INK }}>

        {/* ═══ 1. HERO ═══ */}
        <section id="intro" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: NAVY }}>
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[860px] h-[360px] pointer-events-none" style={{ background: `radial-gradient(ellipse, ${SKY}14 0%, transparent 70%)` }} />

          <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center">
            <div className="ph-hero opacity-0 text-center mb-1">
              <h1 style={{ fontFamily: TAN, fontWeight: 700, fontSize: "clamp(36px, 7.5vw, 82px)", lineHeight: 1.0, color: "#fff", letterSpacing: 0, whiteSpace: "nowrap" }}>
                EMOTION{" "}
                <span
                  className="spectrum-flow"
                  style={{
                    background: SPECTRUM,
                    backgroundSize: "300% 100%",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  GROUP
                </span>
              </h1>
            </div>

            <div className="ph-hero opacity-0 w-[min(440px,80%)] my-5">
              <SpectrumRibbon height={5} />
            </div>

            <div className="ph-hero opacity-0 text-center mb-4">
              <p style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic", fontSize: "clamp(20px,3vw,30px)", color: "#fff" }}>
                Let Your Brand Talk
              </p>
            </div>

            <div className="ph-hero opacity-0 text-center mb-9 max-w-2xl">
              <p className="text-[14px] md:text-[15px] leading-[1.7]" style={{ color: "rgba(255,255,255,0.6)" }}>
                Not simply an agency — a creative partner that transforms brands into experiences people remember, share, and connect with emotionally.
              </p>
            </div>

            <div className="ph-hero opacity-0 flex flex-wrap justify-center gap-4 mb-10">
              <CTA href="#dna" variant="primary" icon={ArrowDown}>
                Explore the Plan
              </CTA>
              <CTA href="https://emotiongrp.com" external variant="ghost">
                emotiongrp.com
              </CTA>
            </div>

            <div className="ph-hero opacity-0 mb-8 w-full max-w-3xl">
              <div className="flex items-stretch justify-center flex-wrap" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, overflow: "hidden" }}>
                {[
                  { n: "19+", l: "Years" },
                  { n: "4", l: "Offices" },
                  { n: "6", l: "Service lines" },
                  { n: "360°", l: "Creative" },
                  { n: "5", l: "Global brands" },
                ].map((s, i) => (
                  <div key={s.l} className="flex-1 min-w-[110px] flex flex-col items-center justify-center py-5 px-2 relative" style={{ borderRight: i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                    <span style={{ fontFamily: BRIC, fontWeight: 700, fontSize: 24, lineHeight: 1, color: "#fff" }}>{s.n}</span>
                    <span className="text-[9px] font-bold mt-1 text-center tracking-wide" style={{ color: "rgba(255,255,255,0.45)" }}>{s.l}</span>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-t-full" style={{ background: LIME }} />
                  </div>
                ))}
              </div>
              <p className="text-center text-[11px] font-bold tracking-[2px] mt-4" style={{ color: "rgba(255,255,255,0.45)" }}>
                JEDDAH · RIYADH · BEIRUT · DUBAI
              </p>
            </div>

            <div className="ph-hero opacity-0 flex flex-col items-center gap-2">
              <div style={{ width: 24, height: 38, border: "1.5px solid rgba(255,255,255,0.2)", borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 5 }}>
                <div style={{ width: 3, height: 6, borderRadius: 2, background: LIME, animation: "mouseScroll 1.6s ease-in-out infinite" }} />
              </div>
            </div>
          </div>

          <style>{`
            @keyframes mouseScroll{0%{transform:translateY(0);opacity:1}75%{transform:translateY(9px);opacity:0}76%{transform:translateY(0);opacity:0}100%{opacity:1}}
            @keyframes spectrumFlow{0%{background-position:0% 50%}100%{background-position:300% 50%}}
            .spectrum-flow{animation:spectrumFlow 9s linear infinite}
            @keyframes pulseDot{0%,100%{box-shadow:0 0 0 0 ${RED}55}50%{box-shadow:0 0 0 6px ${RED}00}}
            .pulse-dot{animation:pulseDot 1.8s ease-out infinite}
            @media (prefers-reduced-motion: reduce){.spectrum-flow,.pulse-dot{animation:none}}
          `}</style>
        </section>

        {/* ═══ 2. BRAND DNA ═══ */}
        <section id="dna" className="ph-slide opacity-0" style={{ padding: "96px clamp(24px, 5vw, 64px)", background: "#fff" }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
              <div className="lg:col-span-5">
                <p style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic", fontSize: 19, color: ROYAL, marginBottom: 18 }}>Chapter 01 — Who Emotion Is</p>
                <h2 style={{ fontFamily: TAN, fontWeight: 700, fontSize: "clamp(32px, 4.2vw, 58px)", lineHeight: 1.05, color: INK, letterSpacing: 0 }}>
                  Brands that are{" "}
                  <span style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic", color: RED, fontWeight: 400 }}>felt.</span>
                </h2>
              </div>
              <div className="lg:col-span-7 lg:pt-10">
                <p className="text-[18px] leading-[1.7]" style={{ color: INK, fontWeight: 300 }}>
                  We believe powerful brands are not only seen —{" "}
                  <span style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic", color: RED }}>they are felt.</span>{" "}
                  Emotion is a full-service creative and marketing group across the MENA region, building brand experiences that inspire people, elevate businesses, and shape culture.
                </p>
                <p className="text-[15px] leading-[1.8] mt-5" style={{ color: "rgba(0,0,0,0.55)" }}>
                  This plan keeps that DNA at its core — every recommendation below traces back to the official Emotion Group brand guideline.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Personality */}
              <div className="rounded-[20px] p-7" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
                <p className="text-[11px] font-bold tracking-[1px] mb-4" style={{ color: ROYAL }}>Brand Personality</p>
                <div className="flex flex-wrap gap-2">
                  {["Bold", "Modern", "Intelligent", "Dynamic", "Human", "Creative", "Energetic", "Sophisticated"].map((t) => (
                    <span key={t} className="inline-flex items-center px-3 py-1.5 rounded-full text-[12px] font-bold" style={{ background: NAVY, color: "#fff" }}>{t}</span>
                  ))}
                </div>
                <p className="text-[11px] font-bold tracking-[1px] mt-7 mb-4" style={{ color: ROYAL }}>Tone of Voice</p>
                <div className="flex flex-wrap gap-2">
                  {["Confident", "Human", "Inspiring", "Strategic", "Contemporary"].map((t) => (
                    <span key={t} className="inline-flex items-center px-3 py-1.5 rounded-full text-[12px] font-bold" style={{ background: `${SKY}25`, color: ROYAL }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Visual language */}
              <div className="rounded-[20px] p-7" style={{ background: NAVY }}>
                <p className="text-[11px] font-bold tracking-[1px] mb-4" style={{ color: LIME }}>Visual Language</p>
                <div className="flex flex-col gap-3">
                  {["Bold compositions", "Clean layouts", "Cinematic imagery", "Dynamic movement", "Emotion-driven storytelling"].map((v, i) => (
                    <div key={v} className="flex items-center gap-3">
                      <span className="text-[11px] font-bold tabular-nums" style={{ color: "rgba(255,255,255,0.35)", width: 18 }}>{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-[15px] font-medium" style={{ color: "#fff" }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>
                  <FileText size={11} /> Source: official Emotion Group Brand Guideline
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 3. SERVICES ═══ */}
        <section id="services" className="ph-slide opacity-0" style={{ padding: "96px clamp(24px, 5vw, 64px)", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead eyebrow="One partner · 360°" color={RED} subtitle="Six integrated service lines under a single roof — concept to crowd.">
              The <span style={{ color: RED }}>Service Lines</span>
            </SectionHead>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ph-stagger">
              {services.map((s) => (
                <div key={s.title} className="ph-item rounded-[20px] p-6 flex flex-col transition-all hover:-translate-y-1" style={{ background: "#fff", border: `1.5px solid ${s.color}50`, boxShadow: `5px 5px 0px 0px ${s.color}` }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${s.color}1f` }}>
                      <s.icon size={20} color={s.color === LIME ? "#9c9a2e" : s.color} />
                    </div>
                    <span style={{ fontFamily: BRIC, fontWeight: 700, fontSize: 24, color: `${s.color}55` }}>{s.num}</span>
                  </div>
                  <h3 style={{ fontFamily: BRIC, fontWeight: 600, fontSize: 18, color: INK, marginBottom: 8 }}>{s.title}</h3>
                  <p className="text-[12px] leading-relaxed mb-4" style={{ color: "rgba(0,0,0,0.55)" }}>{s.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {s.caps.map((c) => (
                      <span key={c} className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: `${s.color}12`, color: s.color === LIME ? "#9c9a2e" : s.color }}>{c}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 4. WORK (DARK) ═══ */}
        <section id="work" className="ph-slide opacity-0" style={{ padding: "96px clamp(24px, 5vw, 64px)", background: NAVY, position: "relative", overflow: "hidden" }}>
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="max-w-6xl mx-auto relative z-10">
            <SectionHead eyebrow="Proof, not promises" color={LIME} light subtitle="A track record of high-profile launches and activations across the Kingdom and beyond.">
              Selected <span style={{ color: LIME }}>Work</span>
            </SectionHead>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ph-stagger">
              {work.map((p) => (
                <div key={p.name} className="ph-item rounded-[18px] p-6 flex flex-col" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${p.color}22` }}>
                      <p.icon size={18} color={p.color} />
                    </div>
                    <span className="text-[11px] font-bold tabular-nums" style={{ color: "rgba(255,255,255,0.4)" }}>{p.year}</span>
                  </div>
                  <h4 style={{ fontFamily: BRIC, fontWeight: 600, fontSize: 17, color: "#fff", lineHeight: 1.2, marginBottom: 6 }}>{p.name}</h4>
                  <p className="text-[11px] font-bold mb-1" style={{ color: p.color }}>{p.client}</p>
                  <span className="inline-flex w-fit items-center px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide mb-3" style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.55)" }}>{p.cat}</span>
                  <p className="text-[12px] leading-[1.65]" style={{ color: "rgba(255,255,255,0.6)" }}>{p.note}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[18px] px-7 py-6 flex flex-col md:flex-row md:items-center gap-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-[11px] font-bold tracking-[1px] flex-shrink-0" style={{ color: LIME }}>Global brands moved</p>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
                {globalBrands.map((b) => (
                  <div key={b.name} className="flex items-center justify-center rounded-[10px] px-4 py-2" style={{ background: "#fff", minWidth: 90, minHeight: 48 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.src} alt={b.name} style={{ maxHeight: 32, maxWidth: 80, objectFit: "contain", display: "block" }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 5. BRAND ARCHITECTURE ═══ */}
        <section id="architecture" className="ph-slide opacity-0" style={{ padding: "96px clamp(24px, 5vw, 64px)", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
              <div className="lg:col-span-5">
                <p style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic", fontSize: 19, color: ROYAL, marginBottom: 18 }}>Chapter 02 — The Group</p>
                <h2 style={{ fontFamily: TAN, fontWeight: 700, fontSize: "clamp(32px, 4.2vw, 58px)", lineHeight: 1.05, color: INK, letterSpacing: 0 }}>
                  Group, agency,<br />
                  <span style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic", color: RED, fontWeight: 400 }}>clients.</span>
                </h2>
              </div>
              <div className="lg:col-span-7 lg:pt-6">
                <p className="text-[15px] leading-[1.8]" style={{ color: "rgba(0,0,0,0.6)" }}>
                  Two brands, one company. <strong style={{ color: INK }}>Emotion Group</strong> is the corporate parent — its own site at emotiongrp.com, and it keeps the existing social accounts as the group voice. <strong style={{ color: INK }}>Emotion Agency</strong> is the 360° services brand clients hire — it stands up its <strong style={{ color: INK }}>own domain and its own new social accounts</strong>, fully separate. Everyone else — Motion Motors, Vertex Integra, All Star Basketball and more — are <strong style={{ color: INK }}>clients the agency serves</strong>, not companies it owns.
                </p>
              </div>
            </div>

            <div className="ph-stagger space-y-0">

              {/* ── TIER 1: THE HOLDING ── */}
              <div className="ph-item">
                <div className="rounded-[24px] overflow-hidden relative" style={{ background: NAVY }}>
                  <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                  <div className="relative z-10 flex flex-col md:flex-row items-center md:items-stretch gap-0">
                    {/* Left: logo block */}
                    <div className="flex flex-col items-center justify-center px-10 py-8 md:border-r md:border-white/10 flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/logos/emotion/emotion.png" alt="Emotion Group" style={{ height: 56, width: "auto", objectFit: "contain" }} />
                    </div>
                    {/* Center: label */}
                    <div className="flex flex-col justify-center px-8 py-6 flex-1">
                      <p className="text-[10px] font-bold tracking-[2px] mb-2" style={{ color: LIME }}>TIER 01 — THE HOLDING</p>
                      <p style={{ fontFamily: BRIC, fontWeight: 700, fontSize: 20, color: "#fff", lineHeight: 1.3 }}>Emotion Group</p>
                      <p className="text-[13px] mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>The corporate umbrella over every company — its own site at <span style={{ color: "#fff" }}>emotiongrp.com</span>, and the existing social accounts stay here as the group voice.</p>
                    </div>
                    {/* Right: role chips */}
                    <div className="flex flex-col justify-center gap-2 px-8 py-6 border-t md:border-t-0 md:border-l border-white/10 flex-shrink-0">
                      {["emotiongrp.com", "Keeps existing social", "Parent of Emotion Agency"].map((t) => (
                        <span key={t} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold" style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.7)" }}>
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: LIME }} /> {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Spectrum bottom bar */}
                  <div className="spectrum-flow h-[3px] w-full" style={{ background: SPECTRUM, backgroundSize: "300% 100%" }} />
                </div>
              </div>

              {/* ── CONNECTOR A: Group → Agency ── */}
              <div className="flex flex-col items-center py-1">
                <div className="w-[2px] h-7" style={{ background: `linear-gradient(180deg, ${LIME}88, ${ROYAL})` }} />
                <div className="px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[1.5px]" style={{ background: `${ROYAL}15`, color: ROYAL, border: `1px solid ${ROYAL}40` }}>
                  THE OPERATING BRAND
                </div>
                <div className="w-[2px] h-7" style={{ background: `linear-gradient(180deg, ${ROYAL}, ${SKY}88)` }} />
              </div>

              {/* ── TIER 2: THE AGENCY ── */}
              <div className="ph-item">
                <div className="spectrum-flow ph-item rounded-[24px] p-[2px]" style={{ background: SPECTRUM, backgroundSize: "300% 100%" }}>
                  <div className="rounded-[22px] overflow-hidden" style={{ background: "#fff" }}>
                    <div className="flex flex-col md:flex-row items-stretch gap-0">
                      {/* Left: logo */}
                      <div className="flex flex-col items-center justify-center px-10 py-8 md:border-r flex-shrink-0" style={{ borderColor: "#EBEBEB" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/logos/emotion/emotion.png" alt="Emotion Agency" style={{ height: 56, width: "auto", objectFit: "contain" }} />
                        <span className="mt-3 text-[10px] font-bold tracking-wide px-2 py-0.5 rounded-full" style={{ background: `${RED}18`, color: RED }}>new domain + social</span>
                      </div>
                      {/* Center */}
                      <div className="flex flex-col justify-center px-8 py-7 flex-1">
                        <p className="text-[10px] font-bold tracking-[2px] mb-2" style={{ color: RED }}>TIER 02 — THE FACE</p>
                        <p style={{ fontFamily: BRIC, fontWeight: 700, fontSize: 22, color: INK, lineHeight: 1.3 }}>Emotion Agency</p>
                        <p className="text-[13px] mt-1.5 max-w-sm" style={{ color: "rgba(0,0,0,0.55)" }}>The 360° services brand clients actually hire — creative, production, social, and digital. It gets its <strong style={{ color: INK }}>own domain</strong> and its <strong style={{ color: INK }}>own new social accounts</strong>, separate from the group.</p>
                      </div>
                      {/* Right */}
                      <div className="flex flex-col justify-center gap-2 px-8 py-6 border-t md:border-t-0 md:border-l flex-shrink-0" style={{ borderColor: "#EBEBEB" }}>
                        {["Own domain (emotionagency.com)", "New dedicated social", "360° services execution"].map((t) => (
                          <span key={t} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold" style={{ background: "#F5F5F5", color: "rgba(0,0,0,0.65)" }}>
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: RED }} /> {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── CONNECTOR B: Agency → Clients ── */}
              <div className="flex flex-col items-center py-1">
                <div className="w-[2px] h-7" style={{ background: `linear-gradient(180deg, ${SKY}88, ${ROYAL}88)` }} />
                <div className="px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[1.5px]" style={{ background: `${SKY}15`, color: ROYAL, border: `1px solid ${SKY}50` }}>
                  CLIENTS THE AGENCY SERVES
                </div>
                <div className="w-[2px] h-7" style={{ background: `linear-gradient(180deg, ${ROYAL}88, transparent)` }} />
              </div>

              {/* ── TIER 3: CLIENTS ── */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ph-item">
                {keyClients.map((v) => (
                  <div key={v.name} className="ph-item rounded-[20px] p-6 flex flex-col" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                    <div className="flex items-center mb-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0" style={{ background: v.logoDark ? NAVY : "#F8F8F8", border: "1px solid #EBEBEB" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={v.logo} alt={v.name} style={{ objectFit: "contain", maxWidth: 44, maxHeight: 44 }} />
                      </div>
                    </div>
                    <p className="text-[10px] font-bold tracking-[1.5px] mb-1" style={{ color: "rgba(0,0,0,0.35)" }}>CLIENT</p>
                    <h3 style={{ fontFamily: BRIC, fontWeight: 700, fontSize: 16, color: INK, marginBottom: 5 }}>{v.name}</h3>
                    <p className="text-[12px] leading-relaxed flex-1" style={{ color: "rgba(0,0,0,0.5)" }}>{v.role}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-[14px] p-4 flex items-start gap-3" style={{ background: `${LIME}12`, border: `1px solid ${LIME}50` }}>
                <AlertTriangle size={15} color="#9c9a2e" className="flex-shrink-0 mt-0.5" />
                <p className="text-[12px]" style={{ color: "rgba(0,0,0,0.7)" }}>
                  <strong>To confirm:</strong> the legal holding name for Emotion Group — we won&apos;t state it without confirmation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 6. SITEMAP — TWO SITES ═══ */}
        <section id="sitemap" className="ph-slide opacity-0" style={{ padding: "96px clamp(24px, 5vw, 64px)", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead eyebrow="Two brands, two sites" color={SKY} subtitle="A branded-house model: the Group is the corporate umbrella, the Agency is the services brand — each on its own domain, each mapped before a line is written.">
              The site <span style={{ color: ROYAL }}>structures</span>
            </SectionHead>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {[
                { domain: "emotiongrp.com", brand: "Emotion Group", tagline: "The corporate holding — who we are & the companies under us", nodes: groupSitemap, accent: ROYAL },
                { domain: "emotionagency.com", brand: "Emotion Agency", tagline: "The 360° services brand clients hire — its own home", nodes: agencySitemap, accent: RED },
              ].map((site) => (
                <div key={site.domain} className="ph-stagger rounded-[24px] p-6 md:p-7" style={{ background: "#FAFAFA", border: `1.5px solid ${site.accent}30` }}>
                  <div className="flex flex-col items-center mb-5">
                    <div className="ph-item inline-flex items-center gap-2.5 px-6 py-3 rounded-full" style={{ background: NAVY, color: "#fff", boxShadow: `4px 4px 0px 0px ${site.accent}` }}>
                      <Globe size={17} color={site.accent} />
                      <span style={{ fontFamily: BRIC, fontWeight: 700, fontSize: 15 }}>{site.domain}</span>
                    </div>
                    <p className="text-[12px] mt-2.5 text-center" style={{ color: "rgba(0,0,0,0.5)" }}>{site.tagline}</p>
                    <div className="w-[3px] h-6 mt-2" style={{ background: site.accent }} />
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {site.nodes.map((n) => (
                      <div key={n.route} className="ph-item rounded-[14px] p-4" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${site.accent}12` }}>
                            <n.icon size={14} color={site.accent} />
                          </div>
                          <div>
                            <p style={{ fontFamily: BRIC, fontWeight: 600, fontSize: 13.5, color: INK }}>{n.label}</p>
                            <p className="text-[10.5px]" style={{ color: "rgba(0,0,0,0.4)", fontFamily: "ui-monospace, Menlo, monospace" }}>{n.route}</p>
                          </div>
                        </div>
                        {n.children.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pl-1">
                            {n.children.map((c) => (
                              <span key={c} className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: "#F5F5F5", color: "rgba(0,0,0,0.6)" }}>{c}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-[16px] p-5 flex items-start gap-3" style={{ background: `${RED}10`, border: `1px solid ${RED}40` }}>
                <AlertTriangle size={15} color={RED} className="flex-shrink-0 mt-0.5" />
                <p className="text-[12px]" style={{ color: "rgba(0,0,0,0.7)" }}>
                  <strong>To confirm:</strong> the Agency&apos;s domain — <em>emotionagency.com</em> is a placeholder until you lock the name.
                </p>
              </div>
              <div className="rounded-[16px] p-5 flex items-start gap-3" style={{ background: `${LIME}14`, border: `1px solid ${LIME}66` }}>
                <CheckCircle2 size={15} color="#9c9a2e" className="flex-shrink-0 mt-0.5" />
                <p className="text-[12px]" style={{ color: "rgba(0,0,0,0.7)" }}>
                  <strong>Confirmed:</strong> both sites are <strong>bilingual EN / AR</strong> with English as the primary locale — every route mirrored with RTL layout and hreflang tags.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 7. IDENTITY APPLIED ═══ */}
        <section id="brand" className="ph-slide opacity-0" style={{ padding: "96px clamp(24px, 5vw, 64px)", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
              <div className="lg:col-span-5">
                <p style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic", fontSize: 19, color: ROYAL, marginBottom: 18 }}>Chapter 03 — The Identity</p>
                <h2 style={{ fontFamily: TAN, fontWeight: 700, fontSize: "clamp(32px, 4.2vw, 58px)", lineHeight: 1.05, color: INK, letterSpacing: 0 }}>
                  <span style={{ whiteSpace: "nowrap" }}>The brand,</span><br />
                  <span style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic", color: RED, fontWeight: 400 }}>on the web.</span>
                </h2>
              </div>
              <div className="lg:col-span-7 lg:pt-4">
                <p className="text-[15px] leading-[1.7]" style={{ color: "rgba(0,0,0,0.65)" }}>
                  The site ships in Emotion&apos;s own system — navy primary, Poppins + Tajawal type, the energy-and-dynamism accents, and the spectrum used as a <em>signature motion</em>, never as cheap fills.
                </p>
              </div>
            </div>

            {/* Wordmark modes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              {[
                { bg: "#FAFAFA", textColor: NAVY, accent: RED, label: "Light surface", labelColor: "rgba(0,0,0,0.4)" },
                { bg: NAVY, textColor: "#fff", accent: LIME, label: "Navy primary", labelColor: "rgba(255,255,255,0.5)" },
                { bg: "#0d0d12", textColor: "#fff", accent: SKY, label: "Black background", labelColor: "rgba(255,255,255,0.4)" },
              ].map((mode) => (
                <div key={mode.label} className="rounded-[20px] px-6 py-10 flex flex-col items-center justify-center" style={{ background: mode.bg, border: "1px solid #EBEBEB", minHeight: 170 }}>
                  <span style={{ fontFamily: TAN, fontWeight: 700, fontSize: "clamp(22px, 2.8vw, 36px)", color: mode.textColor, letterSpacing: 0, lineHeight: 1, whiteSpace: "nowrap" }}>
                    EMOTION <span style={{ color: mode.accent }}>GROUP</span>
                  </span>
                  <p className="mt-3 text-[10px] font-bold" style={{ color: mode.labelColor, letterSpacing: "0.1em" }}>{mode.label}</p>
                </div>
              ))}
            </div>

            {/* Colors + Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="rounded-[20px] p-6" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2"><Palette size={14} color={ROYAL} /><p className="text-[11px] font-bold" style={{ color: ROYAL, letterSpacing: "0.06em" }}>Palette</p></div>
                  <p className="text-[10px]" style={{ color: "rgba(0,0,0,0.4)" }}>5 anchors + signature</p>
                </div>
                <div className="rounded-[12px] overflow-hidden flex" style={{ height: 110, border: "1px solid #EBEBEB" }}>
                  {[
                    { hex: NAVY, name: "Navy", text: "#fff" },
                    { hex: LIME, name: "Lime", text: NAVY },
                    { hex: RED, name: "Red", text: "#fff" },
                    { hex: SKY, name: "Sky", text: NAVY },
                    { hex: ROYAL, name: "Royal", text: "#fff" },
                  ].map((c) => (
                    <div key={c.hex} className="flex-1 flex flex-col justify-end p-2.5" style={{ background: c.hex }}>
                      <p style={{ fontFamily: BRIC, fontWeight: 600, fontSize: 12, color: c.text, lineHeight: 1 }}>{c.name}</p>
                      <p className="text-[8px] mt-0.5" style={{ color: c.text, opacity: 0.7, fontFamily: "ui-monospace, Menlo, monospace" }}>{c.hex}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <SpectrumRibbon height={14} style={{ borderRadius: 8 }} />
                  <p className="text-[10px] mt-2" style={{ color: "rgba(0,0,0,0.5)" }}>Spectrum — <strong style={{ color: INK }}>signature motion</strong>, used sparingly (dividers, hero, active states).</p>
                </div>
              </div>

              <div className="rounded-[20px] p-6" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2"><TypeIcon size={14} color={ROYAL} /><p className="text-[11px] font-bold" style={{ color: ROYAL, letterSpacing: "0.06em" }}>Type</p></div>
                  <p className="text-[10px]" style={{ color: "rgba(0,0,0,0.4)" }}>Poppins + Tajawal</p>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <p style={{ fontFamily: POP, fontWeight: 700, fontSize: 26, color: INK, letterSpacing: "-0.01em", lineHeight: 1 }}>Let Your Brand Talk</p>
                    <p className="text-[10px] mt-1" style={{ color: "rgba(0,0,0,0.4)" }}>Poppins · headlines</p>
                  </div>
                  <div style={{ borderTop: "1px solid #F0F0F0" }} />
                  <div>
                    <p style={{ fontFamily: POP, fontSize: 15, color: INK, fontWeight: 400, lineHeight: 1.5 }}>Strategically grounded, creatively fearless, emotionally engaging.</p>
                    <p className="text-[10px] mt-1" style={{ color: "rgba(0,0,0,0.4)" }}>Poppins · body</p>
                  </div>
                  <div style={{ borderTop: "1px solid #F0F0F0" }} />
                  <div>
                    <p style={{ fontFamily: "var(--font-tajawal), sans-serif", fontSize: 22, color: INK, fontWeight: 500, direction: "rtl", lineHeight: 1.3 }}>إيموشن — دع علامتك تتحدث</p>
                    <p className="text-[10px] mt-1" style={{ color: "rgba(0,0,0,0.4)" }}>Tajawal · Arabic</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 8. TECH STACK ═══ */}
        <section id="stack" className="ph-slide opacity-0" style={{ padding: "96px clamp(24px, 5vw, 64px)", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead eyebrow="The engineering" color={ROYAL} subtitle="One modern, type-safe, edge-deployed stack — powering both new sites and avoiding everything that holds the current one back.">
              How We&apos;ll <span style={{ color: ROYAL }}>Build It</span>
            </SectionHead>

            <div className="rounded-[16px] p-5 mb-8 flex items-start gap-3" style={{ background: `${RED}0d`, border: `1px solid ${RED}30` }}>
              <Gauge size={16} color={RED} className="flex-shrink-0 mt-0.5" />
              <p className="text-[12px]" style={{ color: "rgba(0,0,0,0.7)" }}>
                Server-rendered + edge = strong Core Web Vitals. A controllable robots/metadata API = <strong style={{ color: INK }}>no accidental noindex like today</strong>. A generated sitemap = nothing left uncrawled. The same stack powers <em>both</em> new sites.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {stackEntries.map(([key, group]) => {
                const Icon = group.icon;
                const isActive = activeStack === key;
                return (
                  <button key={key} onClick={() => setActiveStack(key)} className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[12px] font-bold transition-all" style={{ background: isActive ? group.color : "#fff", color: isActive ? (group.color === LIME ? NAVY : "#fff") : "rgba(0,0,0,0.65)", border: isActive ? "none" : "1px solid #EBEBEB", cursor: "pointer", boxShadow: isActive ? `4px 4px 0px 0px ${group.color}40` : "none" }}>
                    <Icon size={14} />
                    <span>{group.label}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: isActive ? "rgba(0,0,0,0.15)" : "#F3F4F6", color: isActive ? (group.color === LIME ? NAVY : "#fff") : "rgba(0,0,0,0.5)" }}>{group.items.length}</span>
                  </button>
                );
              })}
            </div>

            <div className="rounded-[24px] p-8 md:p-10" style={{ background: "#fff", border: `1.5px solid ${activeStackData.color}55`, boxShadow: `5px 5px 0px 0px ${activeStackData.color}` }}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${activeStackData.color}1f` }}>
                  <activeStackData.icon size={26} color={activeStackData.color === LIME ? "#9c9a2e" : activeStackData.color} />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[1.5px] mb-1" style={{ color: activeStackData.color === LIME ? "#9c9a2e" : activeStackData.color }}>{activeStackData.sub}</p>
                  <h3 style={{ fontFamily: BRIC, fontWeight: 600, fontSize: 22, color: INK }}>{activeStackData.label}</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeStackData.items.map((it) => (
                  <div key={it.tech} className="rounded-[14px] p-4 flex items-start gap-3" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
                    {it.logo ? (
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={it.logo.startsWith("/") ? it.logo : `/logos/vertex/${it.logo}.svg`} alt={it.tech} width={20} height={20} style={{ objectFit: "contain" }} />
                      </div>
                    ) : (
                      <div className="w-2 h-2 rounded-full flex-shrink-0 mt-3" style={{ background: activeStackData.color }} />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold mb-1" style={{ color: INK, fontFamily: "ui-monospace, Menlo, monospace" }}>{it.tech}</p>
                      <p className="text-[11px] leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>{it.use}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 9. WEBSITE BUILD TIMELINE (DARK) ═══ */}
        <section id="webphases" className="ph-slide opacity-0" style={{ padding: "96px clamp(24px, 5vw, 64px)", background: NAVY }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead eyebrow="From wireframe to launch" color={LIME} light subtitle="One timeline covers both sites — emotiongrp.com and the agency site — built together on a shared system so design, build, and launch overlap intelligently.">
              Building <span style={{ color: LIME }}>both sites</span>
            </SectionHead>

            <div className="rounded-[24px] p-6 md:p-10" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="overflow-x-auto">
                <div style={{ minWidth: 560 }}>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-[170px] flex-shrink-0" />
                    <div className="flex-1 grid gap-1" style={{ gridTemplateColumns: "repeat(6, minmax(0, 1fr))" }}>
                      {Array.from({ length: 6 }, (_, i) => i + 1).map((w) => (
                        <div key={w} className="text-center text-[11px] font-bold py-1" style={{ color: "rgba(255,255,255,0.55)" }}>Wk {w}</div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    {webGantt.map((r) => (
                      <div key={r.label} className="flex items-center gap-2">
                        <div className="w-[170px] flex-shrink-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <div className="w-2 h-2 rounded-full" style={{ background: r.color }} />
                            <span className="text-[12px] font-bold" style={{ color: "#fff" }}>{r.label}</span>
                          </div>
                          <p className="text-[9px] pl-4" style={{ color: "rgba(255,255,255,0.4)" }}>{r.note}</p>
                        </div>
                        <div className="flex-1 grid gap-1" style={{ gridTemplateColumns: "repeat(6, minmax(0, 1fr))" }}>
                          {Array.from({ length: 6 }, (_, i) => i + 1).map((w) => {
                            const on = w >= r.from && w <= r.to;
                            return <div key={w} className="h-9 rounded-md" style={{ background: on ? r.color : "rgba(255,255,255,0.04)", border: on ? `1px solid ${r.color}` : "1px solid rgba(255,255,255,0.04)" }} />;
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-7 rounded-[12px] p-4 flex items-start gap-3" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <AlertTriangle size={15} color={LIME} className="flex-shrink-0 mt-0.5" />
                <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.65)" }}>Weeks are <strong style={{ color: "#fff" }}>relative phases</strong>, not fixed dates — confirm the desired launch window and we&apos;ll lock the calendar.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ ACT II DIVIDER ═══ */}
        <section className="ph-slide opacity-0" style={{ padding: "72px clamp(24px, 5vw, 64px)", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-4xl mx-auto text-center">
            <SpectrumRibbon height={4} style={{ width: 140, margin: "0 auto 24px" }} />
            <p style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic", fontSize: 19, color: RED, marginBottom: 16 }}>Act II</p>
            <h2 style={{ fontFamily: TAN, fontWeight: 700, fontSize: "clamp(32px, 4.2vw, 58px)", lineHeight: 1.1, color: INK, letterSpacing: 0 }}>
              The Growth Plan<br />
              <span style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic", color: RED, fontWeight: 400 }}>social, tone &amp; SEO.</span>
            </h2>
            <p className="text-sm max-w-xl mx-auto mt-4" style={{ color: "rgba(0,0,0,0.5)" }}>
              A new website only works if people can find it and the brand sounds like itself everywhere. Here&apos;s how we fix discovery and unify the voice.
            </p>
          </div>
        </section>

        {/* ═══ 10. AUDIT ═══ */}
        <section id="audit" className="ph-slide opacity-0" style={{ padding: "96px clamp(24px, 5vw, 64px)", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead eyebrow="Honest diagnosis" color={RED} subtitle="Where Emotion stands today — the gaps that make a fresh build the right call, not a patch.">
              Why start <span style={{ color: RED }}>fresh</span>
            </SectionHead>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {/* Ledger */}
              <div className="lg:col-span-3 rounded-[20px] overflow-hidden" style={{ border: "1px solid #EBEBEB" }}>
                <div className="hidden md:grid grid-cols-12 px-6 py-3 text-[10px] font-bold tracking-[1px]" style={{ background: "#FAFAFA", color: "rgba(0,0,0,0.45)", borderBottom: "1px solid #EBEBEB" }}>
                  <div className="col-span-6">Issue</div>
                  <div className="col-span-2">Severity</div>
                  <div className="col-span-4">Impact</div>
                </div>
                {auditRows.map((r, i) => (
                  <div key={r.issue} className="grid grid-cols-1 md:grid-cols-12 gap-2 px-6 py-4 items-center" style={{ background: i % 2 === 0 ? "#fff" : "#FAFAFA", borderBottom: i < auditRows.length - 1 ? "1px solid #EBEBEB" : "none" }}>
                    <div className="md:col-span-6 flex items-center gap-2">
                      {r.severity === "Critical" && <span className="pulse-dot w-2 h-2 rounded-full flex-shrink-0" style={{ background: RED }} />}
                      <p className="text-[13px] font-semibold" style={{ color: INK }}>{r.issue}</p>
                    </div>
                    <div className="md:col-span-2">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ background: `${r.sevColor}18`, color: r.sevColor === LIME ? "#9c9a2e" : r.sevColor }}>{r.severity}</span>
                    </div>
                    <div className="md:col-span-4"><p className="text-[11px] leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>{r.impact}</p></div>
                  </div>
                ))}
              </div>

              {/* Follower chart */}
              <div className="lg:col-span-2 rounded-[20px] p-6" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                <h3 style={{ fontFamily: BRIC, fontWeight: 600, fontSize: 15, color: INK }}>Followers, today</h3>
                <p className="text-[11px] mb-4" style={{ color: "rgba(0,0,0,0.5)" }}>Fragmented across three handles</p>
                <ResponsiveContainer width="100%" height={210}>
                  <BarChart data={followerData} layout="vertical" barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
                    <XAxis type="number" tick={{ fill: "#9CA3AF", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis dataKey="name" type="category" width={84} tick={{ fill: "#374151", fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="value" name="Followers" radius={[0, 6, 6, 0]} barSize={18}>
                      {followerData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-[10px] mt-2" style={{ color: "rgba(0,0,0,0.4)" }}>IG verified · 9,688 · LinkedIn 1,000+ · X 1,181</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 11. HANDLES ═══ */}
        <section id="handles" className="ph-slide opacity-0" style={{ padding: "96px clamp(24px, 5vw, 64px)", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead eyebrow="Two brands, two voices" color={SKY} subtitle="The group keeps and optimizes the accounts it already has; the agency launches its own, from scratch. Two presences — never one renamed into the other.">
              Two social <span style={{ color: ROYAL }}>presences</span>
            </SectionHead>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 ph-stagger">
              {socialPresences.map((p) => (
                <div key={p.brand} className="ph-item rounded-[24px] p-6 md:p-7" style={{ background: "#FAFAFA", border: `1.5px solid ${p.accent}30` }}>
                  <div className="flex items-center justify-between mb-1">
                    <p style={{ fontFamily: BRIC, fontWeight: 700, fontSize: 18, color: INK }}>{p.brand}</p>
                    <span className="text-[9.5px] font-bold px-2.5 py-1 rounded-full" style={{ background: `${p.accent}18`, color: p.accent }}>{p.tag}</span>
                  </div>
                  <p className="text-[12px] mb-1" style={{ color: p.accent, fontFamily: "ui-monospace, Menlo, monospace" }}>{p.domain}</p>
                  <p className="text-[12.5px] font-semibold mb-4" style={{ color: "rgba(0,0,0,0.6)" }}>{p.track}</p>

                  <div className="flex flex-col gap-2.5">
                    {p.accounts.map((a) => (
                      <div key={a.platform} className="rounded-[14px] p-4 flex items-start gap-3" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={a.logo} alt={a.platform} width={17} height={17} style={{ objectFit: "contain" }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p style={{ fontFamily: BRIC, fontWeight: 600, fontSize: 13, color: INK }}>{a.platform}</p>
                            <span className="text-[12px] font-bold" style={{ color: p.accent, fontFamily: "ui-monospace, Menlo, monospace" }}>{a.handle}</span>
                          </div>
                          <p className="text-[11px] leading-relaxed mt-0.5" style={{ color: "rgba(0,0,0,0.5)" }}>{a.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="rounded-[16px] p-5 flex items-center gap-4" style={{ background: NAVY }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${LIME}22` }}>
                  <Share2 size={18} color={LIME} />
                </div>
                <div>
                  <p style={{ fontFamily: BRIC, fontWeight: 600, fontSize: 14, color: "#fff" }}>A link-in-bio hub per brand</p>
                  <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>Each presence points to its own domain — group → emotiongrp.com, agency → its services & contact.</p>
                </div>
              </div>
              <div className="rounded-[16px] p-5 flex items-start gap-3" style={{ background: `${RED}10`, border: `1px solid ${RED}40` }}>
                <AlertTriangle size={15} color={RED} className="flex-shrink-0 mt-0.5" />
                <p className="text-[12px]" style={{ color: "rgba(0,0,0,0.7)" }}>
                  <strong>To confirm:</strong> the agency&apos;s final handle names (the group accounts stay exactly as they are).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 12. SEO FIX (DARK) ═══ */}
        <section id="seo" className="ph-slide opacity-0" style={{ padding: "96px clamp(24px, 5vw, 64px)", background: NAVY, position: "relative", overflow: "hidden" }}>
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="max-w-6xl mx-auto relative z-10">
            <SectionHead eyebrow="Built in, not bolted on" color={LIME} light subtitle="The current site is invisible on Google. Both new sites are engineered to win search from launch — discovery designed in, not patched later.">
              SEO from <span style={{ color: LIME }}>day one</span>
            </SectionHead>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-3 flex flex-col gap-3 ph-stagger">
                {seoFixes.map((f) => (
                  <div key={f.title} className="ph-item rounded-[16px] p-5 flex items-start gap-4" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${f.color === RED ? `${RED}55` : "rgba(255,255,255,0.08)"}` }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${f.color}22` }}>
                      <f.icon size={18} color={f.color} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: f.color, color: f.color === LIME ? NAVY : "#fff" }}>{f.p}</span>
                        <p style={{ fontFamily: BRIC, fontWeight: 600, fontSize: 15, color: "#fff" }}>{f.title}</p>
                      </div>
                      <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{f.desc}</p>
                      {f.stat && (
                        <div className="mt-3"><SpectrumRibbon height={3} style={{ width: 90, marginBottom: 6 }} /><span style={{ fontFamily: BRIC, fontWeight: 700, fontSize: 18, color: LIME }}>{f.stat}</span></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-2 rounded-[20px] p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 style={{ fontFamily: BRIC, fontWeight: 600, fontSize: 15, color: "#fff" }}>From launch onward</h3>
                <p className="text-[11px] mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>Indexability & organic growth (target)</p>
                <ResponsiveContainer width="100%" height={230}>
                  <AreaChart data={indexData}>
                    <defs>
                      <linearGradient id="eGreen" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={LIME} stopOpacity={0.4} /><stop offset="100%" stopColor={LIME} stopOpacity={0} /></linearGradient>
                      <linearGradient id="eSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={SKY} stopOpacity={0.4} /><stop offset="100%" stopColor={SKY} stopOpacity={0} /></linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                    <XAxis dataKey="m" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ ...tooltipStyle, background: NAVY, border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
                    <Area type="monotone" dataKey="indexable" name="% Indexable" stroke={LIME} strokeWidth={2} fill="url(#eGreen)" />
                    <Area type="monotone" dataKey="organic" name="% Organic uplift" stroke={SKY} strokeWidth={2} fill="url(#eSky)" />
                  </AreaChart>
                </ResponsiveContainer>
                <p className="text-[10px] mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>Projected target — not a guarantee.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 13. CONTENT ENGINE ═══ */}
        <section id="content" className="ph-slide opacity-0" style={{ padding: "96px clamp(24px, 5vw, 64px)", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead eyebrow="What to post" color={ROYAL} subtitle="Three communication pillars from the brand guideline — a repeatable, reels-first engine.">
              The <span style={{ color: ROYAL }}>Content Engine</span>
            </SectionHead>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ph-stagger mb-6">
              {contentPillars.map((p) => (
                <div key={p.title} className="ph-item rounded-[20px] p-7" style={{ background: "#fff", border: `1.5px solid ${p.color}55`, boxShadow: `5px 5px 0px 0px ${p.color}` }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${p.color}15` }}>
                    <p.icon size={20} color={p.color === LIME ? "#9c9a2e" : p.color} />
                  </div>
                  <h3 style={{ fontFamily: BRIC, fontWeight: 600, fontSize: 18, color: INK, marginBottom: 12 }}>{p.title}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {p.items.map((it) => (
                      <span key={it} className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium" style={{ background: `${p.color}12`, color: p.color === LIME ? "#9c9a2e" : p.color }}>{it}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="rounded-[20px] p-6 flex items-center gap-5" style={{ background: NAVY }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `${LIME}22` }}><Film size={20} color={LIME} /></div>
                <div>
                  <p style={{ fontFamily: BRIC, fontWeight: 600, fontSize: 16, color: "#fff" }}>Reels-first, weekly</p>
                  <p className="text-[12px] mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>Short-form video drives the highest reach — behind-the-scenes, activations, client spotlights, production hyperlapses.</p>
                </div>
              </div>
              <div className="rounded-[20px] p-6" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 style={{ fontFamily: BRIC, fontWeight: 600, fontSize: 15, color: INK }}>Recommended content mix</h3>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${LIME}33`, color: "#9c9a2e" }}>PROPOSAL</span>
                </div>
                <div className="flex items-center gap-2">
                  <ResponsiveContainer width="55%" height={150}>
                    <PieChart>
                      <Pie data={contentMix} cx="50%" cy="50%" innerRadius={38} outerRadius={64} paddingAngle={3} dataKey="value">
                        {contentMix.map((e, i) => <Cell key={i} fill={e.color} stroke="none" />)}
                      </Pie>
                      <Tooltip contentStyle={tooltipStyle} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-col gap-2">
                    {contentMix.map((c) => (
                      <div key={c.name} className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                        <span className="text-[11px] font-medium" style={{ color: "rgba(0,0,0,0.7)" }}>{c.name} ({c.value}%)</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-[10px] mt-1" style={{ color: "rgba(0,0,0,0.4)" }}>A starting split to tune from performance — not a client-stated figure.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 14. TONE OF VOICE ═══ */}
        <section id="tone" className="ph-slide opacity-0" style={{ padding: "96px clamp(24px, 5vw, 64px)", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead eyebrow="How the brand sounds" color={LIME} subtitle="Five voice anchors from the guideline, made tangible — plus a sharper way to present the work.">
              Tone &amp; <span style={{ color: RED }}>Presentation</span>
            </SectionHead>

            <div className="rounded-[20px] overflow-hidden mb-6" style={{ border: "1px solid #EBEBEB" }}>
              <div className="hidden md:grid grid-cols-12 px-6 py-3 text-[10px] font-bold tracking-[1px]" style={{ background: "#FAFAFA", color: "rgba(0,0,0,0.45)", borderBottom: "1px solid #EBEBEB" }}>
                <div className="col-span-2">Anchor</div>
                <div className="col-span-4">What it sounds like</div>
                <div className="col-span-6">Suggested sample</div>
              </div>
              {voiceAnchors.map((v, i) => (
                <div key={v.anchor} className="grid grid-cols-1 md:grid-cols-12 gap-2 px-6 py-4 items-center" style={{ background: i % 2 === 0 ? "#fff" : "#FAFAFA", borderBottom: i < voiceAnchors.length - 1 ? "1px solid #EBEBEB" : "none" }}>
                  <div className="md:col-span-2"><span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-bold" style={{ background: `${v.color}18`, color: v.color === LIME ? "#9c9a2e" : v.color }}>{v.anchor}</span></div>
                  <div className="md:col-span-4"><p className="text-[12px]" style={{ color: "rgba(0,0,0,0.6)" }}>{v.sounds}</p></div>
                  <div className="md:col-span-6"><p className="text-[13px]" style={{ color: INK, fontFamily: "var(--font-instrument)", fontStyle: "italic" }}>{v.sample}</p></div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="rounded-[16px] p-5 flex items-start gap-3" style={{ background: `${LIME}14`, border: `1px solid ${LIME}55` }}>
                <MessageCircle size={15} color="#9c9a2e" className="flex-shrink-0 mt-0.5" />
                <p className="text-[12px]" style={{ color: "rgba(0,0,0,0.7)" }}>The sample lines are <strong>our suggested craft</strong> to illustrate the anchors — to refine together, not pulled from existing copy.</p>
              </div>
              <div className="rounded-[16px] p-5" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                <p className="text-[11px] font-bold tracking-[1px] mb-3" style={{ color: ROYAL }}>Presentation upgrades</p>
                <div className="flex flex-col gap-2">
                  {["Cinematic imagery over staged corporate shots", "Hyperlapse production recaps", "Idea → execution case-study storytelling", "Consistent bios across every profile", "Single link-in-bio hub"].map((t) => (
                    <div key={t} className="flex items-center gap-2.5">
                      <CheckCircle2 size={14} color={ROYAL} className="flex-shrink-0" />
                      <span className="text-[12px]" style={{ color: "rgba(0,0,0,0.7)" }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 15. 90-DAY ROLLOUT (DARK) ═══ */}
        <section id="rollout" className="ph-slide opacity-0" style={{ padding: "96px clamp(24px, 5vw, 64px)", background: NAVY }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead eyebrow="Sequenced execution" color={LIME} light subtitle="Foundation, then optimization, then scale — twelve weeks, one momentum.">
              The 90-Day <span style={{ color: LIME }}>Rollout</span>
            </SectionHead>

            {/* Phase legend */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                { n: "Phase 1", w: "Weeks 1–2 · Foundation", color: RED },
                { n: "Phase 2", w: "Weeks 3–6 · Optimization", color: LIME },
                { n: "Phase 3", w: "Weeks 7–12 · Scale", color: SKY },
              ].map((p) => (
                <div key={p.n} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
                  <span className="text-[12px] font-bold" style={{ color: "#fff" }}>{p.n}</span>
                  <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>{p.w}</span>
                </div>
              ))}
            </div>

            <div className="rounded-[24px] p-6 md:p-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="overflow-x-auto">
                <div style={{ minWidth: 720 }}>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-[230px] flex-shrink-0" />
                    <div className="flex-1 grid gap-1" style={{ gridTemplateColumns: "repeat(12, minmax(0, 1fr))" }}>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((w) => (
                        <div key={w} className="text-center text-[10px] font-bold py-1" style={{ color: "rgba(255,255,255,0.5)" }}>{w}</div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {rolloutGantt.map((r) => (
                      <div key={r.label} className="flex items-center gap-2">
                        <div className="w-[230px] flex-shrink-0 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: r.color }} />
                          <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.85)" }}>{r.label}</span>
                        </div>
                        <div className="flex-1 grid gap-1" style={{ gridTemplateColumns: "repeat(12, minmax(0, 1fr))" }}>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map((w) => {
                            const on = w >= r.from && w <= r.to;
                            return <div key={w} className="h-7 rounded" style={{ background: on ? r.color : "rgba(255,255,255,0.04)" }} />;
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 16. METRICS (CLOSING) ═══ */}
        <section id="metrics" className="ph-slide opacity-0" style={{ padding: "96px clamp(24px, 5vw, 64px)", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead eyebrow="What success looks like" color={ROYAL} subtitle="Clear, measurable targets across SEO and social — reviewed monthly.">
              Success <span style={{ color: ROYAL }}>Metrics</span>
            </SectionHead>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 ph-stagger mb-8">
              {finalKPIs.map((k) => (
                <div key={k.l} className="ph-item rounded-[20px] p-6" style={{ background: "#fff", border: `1.5px solid ${k.color}40`, boxShadow: `5px 5px 0px 0px ${k.color}` }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${k.color}18` }}>
                    <k.icon size={18} color={k.color === LIME ? "#9c9a2e" : k.color} />
                  </div>
                  <p style={{ fontFamily: TAN, fontWeight: 700, fontSize: "clamp(24px,3.5vw,34px)", color: INK, lineHeight: 1 }}>{k.n}</p>
                  <p className="text-[12px] mt-2" style={{ color: "rgba(0,0,0,0.55)" }}>{k.l}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[20px] p-6 md:p-8 mb-10" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
              <h3 style={{ fontFamily: BRIC, fontWeight: 600, fontSize: 16, color: INK }} className="text-center mb-1">90-day targets vs. baseline</h3>
              <p className="text-[11px] text-center mb-6" style={{ color: "rgba(0,0,0,0.5)" }}>Percentage uplift over today</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={kpiBars} layout="vertical" barGap={6}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
                  <XAxis type="number" domain={[0, 40]} tick={{ fill: "#9CA3AF", fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
                  <YAxis dataKey="k" type="category" width={130} tick={{ fill: "#374151", fontSize: 12, fontWeight: 500 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="base" name="Today" fill="#E5E7EB" radius={[0, 6, 6, 0]} barSize={14} />
                  <Bar dataKey="target" name="90-day target" fill={ROYAL} radius={[0, 6, 6, 0]} barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Sign-off */}
            <div className="rounded-[24px] p-10 text-center relative overflow-hidden" style={{ background: NAVY }}>
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
              <div className="relative z-10 flex flex-col items-center">
                <SpectrumRibbon height={4} style={{ width: 120, marginBottom: 24 }} />
                <h3 style={{ fontFamily: TAN, fontWeight: 700, fontSize: "clamp(28px,4vw,46px)", color: "#fff", letterSpacing: 0, lineHeight: 1.05 }}>
                  Let Your Brand <span style={{ color: LIME }}>Talk.</span>
                </h3>
                <p className="text-[13px] font-bold tracking-[2px] mt-3 mb-7" style={{ color: "rgba(255,255,255,0.5)" }}>#DoItWithEmotion</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <CTA href="https://wa.me/0000000000" external variant="primary" leading={
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src="/logos/whatsapp.svg" alt="" width={16} height={16} />
                  }>
                    Let&apos;s talk
                  </CTA>
                  <CTA href="mailto:info@emotiongrp.com" variant="ghost" leading={<Mail size={15} />}>
                    info@emotiongrp.com
                  </CTA>
                </div>

                {/* Prepared by */}
                <div className="mt-10 pt-7 w-full max-w-xl" style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
                  <p className="text-[10px] font-bold tracking-[2px] mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>PREPARED BY</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
                    {[
                      { name: "Ahmed Ali", role: "Head of Digital Product & Leads Growth" },
                      { name: "Noman Shahid", role: "Digital Marketing Specialist" },
                    ].map((person) => (
                      <div key={person.name} className="text-center">
                        <p style={{ fontFamily: BRIC, fontWeight: 700, fontSize: 15, color: "#fff" }}>{person.name}</p>
                        <p className="text-[11.5px] mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>{person.role}</p>
                        <p className="text-[10px] font-bold tracking-[1.5px] mt-1.5" style={{ color: LIME }}>EMOTION GROUP</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Layers, Globe, ShoppingBag, Smartphone, Database, Shield,
  CheckCircle2, XCircle, Clock, Lock, Search, Code2,
  BarChart3, Users, Star, Zap, MessageCircle, ArrowRight,
  ExternalLink, Eye, FileText, Target, TrendingUp, Palette,
  Bot, CreditCard, MapPin, Bell, PenTool, Calendar,
  Server, Play, Upload, Award, BookOpen, GraduationCap,
  MonitorSmartphone, Workflow, KeyRound, Video, FileDown,
  Settings, LayoutDashboard, Table2, FolderTree,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const G = "#4FFFB0";
const D = "#0A0A0A";
const O = "#FF5E00"; // MO BADI's accent (orange)
const R = "#EF4444";
const A = "#F59E0B";
const P = "#5227FF";
const B = "#3B82F6";

export default function MoBadiArchitecture() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ph-hero", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: "power4.out", delay: 0.3 });
      gsap.utils.toArray<HTMLElement>(".ph-slide").forEach((el) => {
        gsap.fromTo(el, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".ph-stagger").forEach((el) => {
        gsap.fromTo(el.querySelectorAll(".ph-item"), { y: 40, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 82%", once: true } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  function PhaseCard({ num, label, color, duration, items }: { num: number; label: string; color: string; duration: string; items: string[] }) {
    return (
      <div className="ph-item rounded-[24px] overflow-hidden" style={{ border: `2px solid ${color}25`, boxShadow: "0 2px 20px rgba(0,0,0,0.04)" }}>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-[200px] flex-shrink-0 p-8 flex flex-col items-center justify-center text-center" style={{ background: color }}>
            <div className="text-[9px] font-bold tracking-[3px] uppercase mb-1" style={{ color: "rgba(0,0,0,0.4)" }}>Phase</div>
            <div className="heading text-5xl mb-2" style={{ color: D }}>{num}</div>
            <div className="heading text-base mb-2" style={{ color: D }}>{label}</div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.08)" }}>
              <Clock size={11} color={D} />
              <span className="text-[11px] font-bold" style={{ color: D }}>{duration}</span>
            </div>
          </div>
          <div className="flex-1 p-6 bg-white">
            <div className="flex flex-col gap-2">
              {items.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <CheckCircle2 size={16} color={color} className="flex-shrink-0 mt-0.5" />
                  <span className="text-[12px] leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} style={{ background: "#fff", color: D }}>

      {/* ═══ HERO ═══ */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: "#fff" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] pointer-events-none" style={{ background: `radial-gradient(ellipse, ${G}18 0%, transparent 70%)` }} />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center">
          <div className="ph-hero opacity-0 text-center mb-4" style={{ paddingTop: 40 }}>
            <p className="text-[13px] font-bold tracking-wider" style={{ color: "rgba(0,0,0,0.3)" }}>April 2025 · v1.0</p>
          </div>

          <div className="ph-hero opacity-0 text-center mb-4">
            <h1 className="heading" style={{ fontSize: "clamp(48px, 12vw, 120px)", lineHeight: 0.95, letterSpacing: "-3px", color: D }}>
              MO BADI<span style={{ color: G }}>.</span>
            </h1>
          </div>

          <div className="ph-hero opacity-0 text-center mb-8">
            <p className="text-lg md:text-xl font-medium" style={{ color: "rgba(0,0,0,0.4)" }}>Portfolio & Course Platform</p>
            <p className="text-sm mt-2" style={{ color: "rgba(0,0,0,0.25)" }}>Full-Stack Web Application — Architecture Document</p>
          </div>

          {/* From / To */}
          <div className="ph-hero opacity-0 grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 w-full max-w-xl">
            <div className="rounded-[16px] p-5" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
              <p className="text-[10px] font-bold tracking-[2px] uppercase mb-2" style={{ color: G }}>Built by</p>
              <p className="text-[14px] font-bold">Ahmed Ali</p>
              <p className="text-[11px]" style={{ color: "rgba(0,0,0,0.4)" }}>Full-Stack Digital Strategist</p>
              <p className="text-[11px]" style={{ color: "rgba(0,0,0,0.3)" }}>hello@ahmedali.online</p>
            </div>
            <div className="rounded-[16px] p-5" style={{ background: "#fff", border: `2px solid ${G}`, boxShadow: `3px 3px 0px 0px ${D}` }}>
              <p className="text-[10px] font-bold tracking-[2px] uppercase mb-2" style={{ color: G }}>Built for</p>
              <p className="text-[14px] font-bold">MO BADI</p>
              <p className="text-[11px]" style={{ color: "rgba(0,0,0,0.4)" }}>Graphic Designer & UI/UX Specialist</p>
              <p className="text-[11px]" style={{ color: "rgba(0,0,0,0.3)" }}>Bilingual AR + EN Platform</p>
            </div>
          </div>

          {/* Project specs */}
          <div className="ph-hero opacity-0 mb-10 w-full max-w-2xl">
            <div className="flex items-stretch justify-center" style={{ background: "#fff", border: "1px solid #E8E8E8", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
              {[{ n: "17", l: "Portfolio Sections" }, { n: "6", l: "Dev Phases" }, { n: "9", l: "Weeks" }, { n: "7+", l: "DB Tables" }].map((s, i) => (
                <div key={s.l} className="flex-1 flex flex-col items-center justify-center py-5 px-2 relative" style={{ borderLeft: i > 0 ? "1px solid #F0F0F0" : "none" }}>
                  <span className="heading" style={{ fontSize: 28, lineHeight: 1, color: D }}>{s.n}</span>
                  <span className="text-[9px] font-bold tracking-[1px] uppercase mt-1" style={{ color: "rgba(0,0,0,0.3)" }}>{s.l}</span>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-t-full" style={{ background: G }} />
                </div>
              ))}
            </div>
          </div>

          {/* What this platform does */}
          <div className="ph-hero opacity-0 rounded-[16px] p-6 text-center mb-10 max-w-2xl" style={{ background: `${G}08`, border: `1px solid ${G}20` }}>
            <p className="text-[13px] font-medium leading-relaxed" style={{ color: D }}>
              <strong style={{ color: G }}>What is this?</strong> MO BADI needs two things on one domain: a portfolio that wins clients and a course platform that teaches students. This document maps every page, every database table, every user flow, and every line of the tech stack — so there are zero surprises during the build.
            </p>
          </div>

          <div className="ph-hero opacity-0 flex flex-col items-center gap-2">
            <div style={{ width: 24, height: 38, border: "1.5px solid rgba(0,0,0,0.14)", borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 5 }}>
              <div style={{ width: 3, height: 6, borderRadius: 2, background: G, animation: "mouseScroll 1.6s ease-in-out infinite" }} />
            </div>
          </div>
        </div>
        <style>{`@keyframes mouseScroll{0%{transform:translateY(0);opacity:1}75%{transform:translateY(9px);opacity:0}76%{transform:translateY(0);opacity:0}100%{opacity:1}}`}</style>
      </section>

      {/* ═══ DESIGN SYSTEM ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="script text-xl mb-3" style={{ color: O }}>Design System</p>
            <h2 className="heading text-3xl md:text-4xl mb-4">Extracted from <span style={{ color: O }}>Figma</span></h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(0,0,0,0.4)" }}>Pulled directly from the Figma file. Every color, font weight, and border radius is documented here so the build matches the design pixel by pixel.</p>
          </div>

          {/* Color tokens */}
          <div className="mb-10">
            <h3 className="heading text-xl mb-6">Color Tokens</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 ph-stagger">
              {[
                { name: "Dark", hex: "#0D0D0D", text: "#fff" },
                { name: "Light", hex: "#F2F2F2", text: D },
                { name: "White", hex: "#FFFFFF", text: D },
                { name: "Accent", hex: "#FF5E00", text: "#fff" },
                { name: "Muted", hex: "#757575", text: "#fff" },
                { name: "Border", hex: "#E5E7EB", text: D },
                { name: "Black", hex: "#000000", text: "#fff" },
              ].map((c) => (
                <div key={c.name} className="ph-item rounded-[16px] overflow-hidden" style={{ border: "1px solid #EBEBEB" }}>
                  <div style={{ background: c.hex, height: 56 }} />
                  <div className="p-3">
                    <p className="text-[12px] font-bold">{c.name}</p>
                    <p className="text-[10px]" style={{ color: "rgba(0,0,0,0.35)", fontFamily: "monospace" }}>{c.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="mb-10">
            <h3 className="heading text-xl mb-6">Typography — Inter</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ph-stagger">
              {[
                { el: "Hero H1", weight: "ExtraBold 800", size: "58px", note: "tracking -1.2px, line-height 60px" },
                { el: "Section H3", weight: "ExtraBold 800", size: "40-48px", note: "Large section headlines" },
                { el: "Body Primary", weight: "Regular 400", size: "14-15px", note: "Line-height 27px" },
                { el: "Button Text", weight: "Bold 700", size: "13-14px", note: "White on dark pill buttons" },
                { el: "Pricing", weight: "Bold 700", size: "56px", note: "Card price display" },
                { el: "Tag/Label", weight: "Bold 700", size: "16px", note: "Section label, orange color" },
              ].map((t) => (
                <div key={t.el} className="ph-item flex items-center gap-4 p-4 rounded-[14px]" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
                  <div className="flex-1">
                    <p className="text-[13px] font-bold">{t.el}</p>
                    <p className="text-[11px]" style={{ color: "rgba(0,0,0,0.4)" }}>{t.weight} · {t.size}</p>
                  </div>
                  <span className="text-[10px] px-3 py-1 rounded-full" style={{ background: `${O}12`, color: D }}>{t.note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Component patterns */}
          <div>
            <h3 className="heading text-xl mb-6">Component Patterns</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ph-stagger">
              {[
                { text: "Buttons: black pill (#0D0D0D), text left, orange circular arrow icon right", icon: Zap },
                { text: "Cards: 30px outer radius / #F2F2F2 bg / inner white card 20px radius", icon: Layers },
                { text: "Image overlays: CSS gradient from transparent to solid black", icon: Eye },
                { text: "Section labels: small orange Bold text above large ExtraBold dark headline", icon: PenTool },
                { text: "Hero container: bottom border-radius 60px, dark #0D0D0D background", icon: MonitorSmartphone },
                { text: "Logo marquee: infinite horizontal scroll, masked edges", icon: TrendingUp },
              ].map((p) => (
                <div key={p.text} className="ph-item flex items-start gap-3 p-4 rounded-[14px]" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                  <p.icon size={16} color={O} className="flex-shrink-0 mt-0.5" />
                  <span className="text-[12px]" style={{ color: "rgba(0,0,0,0.55)" }}>{p.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TECH STACK ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="script text-xl mb-3" style={{ color: G }}>Technology</p>
            <h2 className="heading text-3xl md:text-4xl mb-4" style={{ color: "#fff" }}>Tech <span style={{ color: G }}>Stack</span></h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10 ph-stagger">
            {[
              { name: "Next.js 15", icon: "nextdotjs/white", desc: "SSR + App Router" },
              { name: "TypeScript", icon: "typescript", desc: "Type safety" },
              { name: "Tailwind CSS", icon: "tailwindcss", desc: "Utility-first CSS" },
              { name: "Supabase", icon: "supabase", desc: "DB + Auth + Storage" },
              { name: "Stripe", icon: "stripe", desc: "Payments" },
              { name: "Twilio", icon: "twilio", desc: "Phone OTP" },
              { name: "Framer Motion", icon: "framer", desc: "Animations" },
              { name: "Vercel", icon: "vercel/white", desc: "Deployment" },
              { name: "Cloudinary", icon: "cloudinary", desc: "Image CDN" },
              { name: "Mux", icon: "mux/white", desc: "Video streaming" },
              { name: "shadcn/ui", icon: "shadcnui/white", desc: "Base components" },
              { name: "Zustand", icon: "zustand", desc: "Client state" },
            ].map((t) => (
              <div key={t.name} className="ph-item flex items-center gap-4 p-4 rounded-[16px]" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <img src={`https://cdn.simpleicons.org/${t.icon}`} alt={t.name} width={24} height={24} style={{ width: 24, height: 24 }} />
                <div>
                  <div className="text-[13px] font-bold" style={{ color: "#fff" }}>{t.name}</div>
                  <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Why Supabase */}
          <div className="rounded-[20px] p-7" style={{ background: `${G}08`, border: `1px solid ${G}20` }}>
            <h3 className="heading text-lg mb-4" style={{ color: "#fff" }}>Why Supabase over Firebase?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Course data is relational: courses → modules → lessons → tasks → submissions → certificates",
                "Row Level Security (RLS) enforces enrollment-gated content at the DB layer",
                "Phone OTP natively via Twilio — no extra service needed",
                "PostgreSQL gives full JOIN queries for admin dashboards and analytics",
                "Storage handles video/PDF/image uploads with signed URLs",
                "Firebase Firestore would require complex denormalization for this data model",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "rgba(0,0,0,0.2)" }}>
                  <CheckCircle2 size={14} color={G} className="flex-shrink-0 mt-0.5" />
                  <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.6)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SITE STRUCTURE ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="script text-xl mb-3" style={{ color: G }}>Architecture</p>
            <h2 className="heading text-3xl md:text-4xl mb-4">Site Structure & <span style={{ color: G }}>Routes</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ph-stagger">
            {/* Public */}
            <div className="ph-item rounded-[24px] overflow-hidden" style={{ border: `2px solid ${G}25` }}>
              <div className="p-5 text-center" style={{ background: G }}>
                <Globe size={24} color={D} className="mx-auto mb-2" />
                <h3 className="heading text-base" style={{ color: D }}>Public Portfolio</h3>
              </div>
              <div className="p-5 flex flex-col gap-2">
                {[
                  { route: "/", page: "Home — Full portfolio (17 sections)" },
                  { route: "/projects", page: "All projects — filterable gallery" },
                  { route: "/projects/[slug]", page: "Case study with images & tools" },
                  { route: "/courses", page: "Course catalog with pricing" },
                  { route: "/courses/[slug]", page: "Course landing page" },
                  { route: "/about", page: "Extended story & timeline" },
                  { route: "/contact", page: "Contact form + socials" },
                ].map((r) => (
                  <div key={r.route} className="p-3 rounded-xl" style={{ background: "#FAFAFA" }}>
                    <p className="text-[11px] font-bold" style={{ color: G, fontFamily: "monospace" }}>{r.route}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: "rgba(0,0,0,0.45)" }}>{r.page}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Authenticated */}
            <div className="ph-item rounded-[24px] overflow-hidden" style={{ border: `2px solid ${B}25` }}>
              <div className="p-5 text-center" style={{ background: B }}>
                <GraduationCap size={24} color="#fff" className="mx-auto mb-2" />
                <h3 className="heading text-base" style={{ color: "#fff" }}>Learning Platform</h3>
              </div>
              <div className="p-5 flex flex-col gap-2">
                {[
                  { route: "/learn", page: "My courses, progress, certificates" },
                  { route: "/learn/[slug]", page: "Course dashboard — modules list" },
                  { route: "/learn/.../[lessonId]", page: "Video player + PDF + notes" },
                  { route: "/learn/.../task", page: "Final task submission" },
                  { route: "/account", page: "Profile, language, billing" },
                  { route: "/certificates/[id]", page: "Public certificate view" },
                ].map((r) => (
                  <div key={r.route} className="p-3 rounded-xl" style={{ background: "#FAFAFA" }}>
                    <p className="text-[11px] font-bold" style={{ color: B, fontFamily: "monospace" }}>{r.route}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: "rgba(0,0,0,0.45)" }}>{r.page}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Admin */}
            <div className="ph-item rounded-[24px] overflow-hidden" style={{ border: `2px solid ${P}25` }}>
              <div className="p-5 text-center" style={{ background: P }}>
                <Settings size={24} color="#fff" className="mx-auto mb-2" />
                <h3 className="heading text-base" style={{ color: "#fff" }}>Admin Dashboard</h3>
              </div>
              <div className="p-5 flex flex-col gap-2">
                {[
                  { route: "/admin", page: "Stats: students, revenue, pending" },
                  { route: "/admin/courses", page: "Create / edit / publish courses" },
                  { route: "/admin/.../lessons", page: "Add/reorder lessons, upload" },
                  { route: "/admin/submissions", page: "Review, approve/reject + feedback" },
                  { route: "/admin/students", page: "List, search, enrollment details" },
                  { route: "/admin/certificates", page: "Issued log, revoke, re-issue" },
                ].map((r) => (
                  <div key={r.route} className="p-3 rounded-xl" style={{ background: "#FAFAFA" }}>
                    <p className="text-[11px] font-bold" style={{ color: P, fontFamily: "monospace" }}>{r.route}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: "rgba(0,0,0,0.45)" }}>{r.page}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ USER FLOWS ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="script text-xl mb-3" style={{ color: G }}>User Journeys</p>
            <h2 className="heading text-3xl md:text-4xl mb-4" style={{ color: "#fff" }}>Key User <span style={{ color: G }}>Flows</span></h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.35)" }}>What happens when a student signs up? Pays? Watches a lesson? Submits work? Gets a certificate? Every step is here.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Auth Flow */}
            <div className="rounded-[24px] p-7" style={{ background: "#fff" }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${G}12` }}>
                  <KeyRound size={18} color={G} />
                </div>
                <h3 className="heading text-base">Phone OTP Auth</h3>
              </div>
              <div className="flex flex-col gap-2">
                {[
                  "User enters phone number on /auth",
                  "Next.js API triggers Supabase signInWithOtp",
                  "Supabase sends OTP via Twilio SMS",
                  "User enters 6-digit code",
                  "Supabase verifies and returns session",
                  "New user? Profile auto-created via DB trigger",
                  "Redirect to /learn or /courses",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg" style={{ background: "#FAFAFA" }}>
                    <span className="text-[10px] font-bold w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: `${G}15`, color: D }}>{i + 1}</span>
                    <span className="text-[12px]" style={{ color: "rgba(0,0,0,0.55)" }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Flow */}
            <div className="rounded-[24px] p-7" style={{ background: "#fff" }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${P}12` }}>
                  <CreditCard size={18} color={P} />
                </div>
                <h3 className="heading text-base">Enrollment & Payment</h3>
              </div>
              <div className="flex flex-col gap-2">
                {[
                  "Student visits /courses/[slug] — public page",
                  'Clicks "Enroll Now" — auth check',
                  "Stripe Checkout session created via API",
                  "Student pays on Stripe hosted page",
                  "Webhook fires payment_intent.succeeded",
                  "Enrollment record created in Supabase",
                  "Student accesses course content",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg" style={{ background: "#FAFAFA" }}>
                    <span className="text-[10px] font-bold w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: `${P}15`, color: P }}>{i + 1}</span>
                    <span className="text-[12px]" style={{ color: "rgba(0,0,0,0.55)" }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Flow */}
            <div className="rounded-[24px] p-7" style={{ background: "#fff" }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${B}12` }}>
                  <Play size={18} color={B} />
                </div>
                <h3 className="heading text-base">Learning Flow</h3>
              </div>
              <div className="flex flex-col gap-2">
                {[
                  "Student opens course dashboard — sees modules",
                  "Locked lessons shown with lock icon",
                  "Opens lesson — video loads via Mux signed URL",
                  "PDF resources downloadable below video",
                  "90%+ watched → lesson marked complete",
                  "Progress bar updates across module & course",
                  "All lessons done → Final Task unlocks",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg" style={{ background: "#FAFAFA" }}>
                    <span className="text-[10px] font-bold w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: `${B}15`, color: B }}>{i + 1}</span>
                    <span className="text-[12px]" style={{ color: "rgba(0,0,0,0.55)" }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificate Flow */}
            <div className="rounded-[24px] p-7" style={{ background: "#fff" }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${A}12` }}>
                  <Award size={18} color={A} />
                </div>
                <h3 className="heading text-base">Task & Certificate</h3>
              </div>
              <div className="flex flex-col gap-2">
                {[
                  "Student reads task brief, uploads files",
                  "Submission status → pending",
                  "Instructor reviews in /admin/submissions",
                  "Approves or rejects with written feedback",
                  "On approval → Edge Function generates PDF",
                  "Certificate with unique verification code",
                  "SMS notification via Twilio sent to student",
                  "Public verification at /verify/[code]",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg" style={{ background: "#FAFAFA" }}>
                    <span className="text-[10px] font-bold w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: `${A}15`, color: A }}>{i + 1}</span>
                    <span className="text-[12px]" style={{ color: "rgba(0,0,0,0.55)" }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DATABASE SCHEMA ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="script text-xl mb-3" style={{ color: G }}>Database</p>
            <h2 className="heading text-3xl md:text-4xl mb-4">Supabase <span style={{ color: G }}>Schema</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ph-stagger">
            {[
              { name: "profiles", color: G, cols: ["id (uuid PK)", "phone (unique)", "full_name", "avatar_url", "locale (ar/en)", "role (student/instructor/admin)"] },
              { name: "courses", color: P, cols: ["id, slug (unique)", "title_ar / title_en", "description_ar / description_en", "thumbnail_url, price, currency", "is_published (draft vs live)"] },
              { name: "modules + lessons", color: B, cols: ["module: course_id, title_ar/en, order", "lesson: module_id, title_ar/en", "video_url (Mux signed)", "pdf_url (Storage signed)", "duration_seconds, is_preview"] },
              { name: "enrollments", color: A, cols: ["user_id, course_id, payment_id", "enrolled_at, completed_at", "lesson_progress: user_id, lesson_id", "completed_at per lesson"] },
              { name: "tasks + submissions", color: O, cols: ["task: course_id, title, description, allowed_file_types", "submission: user_id, task_id, file_url", "status (pending/approved/rejected)", "feedback, submitted_at, reviewed_at"] },
              { name: "certificates + payments", color: G, cols: ["cert: user_id, course_id, unique_code, pdf_url", "payment: stripe_payment_id, amount, currency", "status (pending/succeeded/failed)"] },
            ].map((table) => (
              <div key={table.name} className="ph-item rounded-[20px] overflow-hidden" style={{ border: "1px solid #EBEBEB" }}>
                <div className="px-6 py-4 flex items-center gap-3" style={{ background: `${table.color}08`, borderBottom: `2px solid ${table.color}` }}>
                  <Database size={16} color={table.color} />
                  <span className="text-[14px] font-bold" style={{ fontFamily: "monospace" }}>{table.name}</span>
                </div>
                <div className="p-5 flex flex-col gap-2">
                  {table.cols.map((col) => (
                    <div key={col} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: table.color }} />
                      <span className="text-[12px]" style={{ color: "rgba(0,0,0,0.55)", fontFamily: "monospace" }}>{col}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PORTFOLIO SECTIONS ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#FAFAFA" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="script text-xl mb-3" style={{ color: G }}>Portfolio</p>
            <h2 className="heading text-3xl md:text-4xl mb-4">17 Sections <span style={{ color: G }}>Mapped</span></h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(0,0,0,0.4)" }}>The homepage IS the portfolio. Visitors scroll through 17 purpose-built sections — from hero to footer, each one designed to convert a viewer into a client or a student.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ph-stagger">
            {[
              { n: "01", name: "Navbar", desc: "Fixed, logo, hamburger mobile, language switcher, CTA", dynamic: false },
              { n: "02", name: "Hero", desc: "Dark bg, brand name, title, 4 skill tags (#01-#04)", dynamic: true },
              { n: "03", name: "Trusted Brands", desc: "Client logo marquee — infinite scroll, masked edges", dynamic: true },
              { n: "04", name: "About Preview", desc: "Dark section, bio excerpt, 3 project thumbnails", dynamic: true },
              { n: "05", name: "Featured Projects", desc: "3 project cards — image, title, description, View", dynamic: true },
              { n: "06", name: "Process Approach", desc: "4 full-bleed image boxes: Strategy, Design, Systems, Consistency", dynamic: false },
              { n: "07", name: "Services", desc: "3 tall cards: Brand Identity, Brand Strategy, Creative Consulting", dynamic: true },
              { n: "08", name: "CTA Banner", desc: "Let's Bring Your Brand to Life + Get In Touch", dynamic: false },
              { n: "09", name: "Process Steps", desc: "5 numbered steps: Discovery → Strategy → Design → Delivery → Ongoing", dynamic: false },
              { n: "10", name: "Extended Portfolio", desc: "Circular image slider — more project work preview", dynamic: true },
              { n: "11", name: "More Projects", desc: "Horizontal slider with prev/next arrows", dynamic: true },
              { n: "12", name: "Specializations", desc: "3 image cards with gradient overlay + text", dynamic: true },
              { n: "13", name: "Pricing", desc: "3 cards: Starter / Pro / Enterprise — features + CTA", dynamic: false },
              { n: "14", name: "FAQ", desc: "Accordion — 5 questions, animated open/close", dynamic: false },
              { n: "15", name: "Values", desc: "Mission / Vision / Values / Design Philosophy — accordion", dynamic: false },
              { n: "16", name: "About Me", desc: "Bio section + embedded video (MP4 autoplay muted)", dynamic: true },
              { n: "17", name: "Footer", desc: "Logo, tagline, menu, social icons, giant brand text", dynamic: false },
            ].map((s) => (
              <div key={s.n} className="ph-item rounded-[16px] p-5 flex gap-4" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                <span className="heading text-2xl" style={{ color: `${G}20` }}>{s.n}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-[13px] font-bold">{s.name}</h4>
                    {s.dynamic && <span className="text-[8px] px-2 py-0.5 rounded-full font-bold" style={{ background: `${G}15`, color: D }}>CMS</span>}
                  </div>
                  <p className="text-[11px]" style={{ color: "rgba(0,0,0,0.45)" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ i18n ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "80px 24px", background: "#fff" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="script text-xl mb-3" style={{ color: G }}>Bilingual</p>
            <h2 className="heading text-3xl md:text-4xl">Arabic + English <span style={{ color: G }}>Support</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ph-stagger">
            {[
              { icon: Globe, text: "next-intl for /en/ and /ar/ routing with locale detection" },
              { icon: Target, text: "Default locale: Arabic (ar) — target audience is MENA" },
              { icon: Layers, text: 'RTL auto-applied when locale = ar via dir="rtl" on <html>' },
              { icon: Database, text: "All text stored as title_ar / title_en pairs in Supabase" },
              { icon: Video, text: "Course videos can have separate AR/EN tracks" },
              { icon: Award, text: "Certificates generated in the user's preferred language" },
            ].map((item) => (
              <div key={item.text} className="ph-item flex items-start gap-3 p-4 rounded-[14px]" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
                <item.icon size={16} color={G} className="flex-shrink-0 mt-0.5" />
                <span className="text-[12px]" style={{ color: "rgba(0,0,0,0.55)" }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DEVELOPMENT PHASES ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="script text-xl mb-3" style={{ color: G }}>Execution</p>
            <h2 className="heading text-3xl md:text-4xl mb-4">Development <span style={{ color: G }}>Roadmap</span></h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(0,0,0,0.4)" }}>9 weeks from blank screen to live platform. Each phase ends with something you can see and test — not a status update.</p>
          </div>

          <div className="flex flex-col gap-6 ph-stagger">
            <PhaseCard num={1} label="Foundation" color={G} duration="Week 1-2" items={["Next.js 15 project setup with TypeScript + Tailwind", "Supabase project: Auth, Database schema, Storage buckets", "next-intl setup: AR/EN routing, RTL support", "Design system implementation: tokens, typography, base components", "Navbar + Footer components"]} />
            <PhaseCard num={2} label="Portfolio" color={O} duration="Week 3-4" items={["Hero section with animations (Framer Motion)", "All 17 portfolio sections as per Figma", "Supabase CMS integration: projects, services, clients", "Image optimization via Cloudinary", "Mobile responsiveness — all sections"]} />
            <PhaseCard num={3} label="Auth & Payments" color={P} duration="Week 5" items={["Phone OTP auth flow (Twilio + Supabase)", "User profile page", "Stripe integration: checkout, webhooks, enrollment", "Course landing pages (public)"]} />
            <PhaseCard num={4} label="Learning" color={B} duration="Week 6-7" items={["Course dashboard (/learn/[slug])", "Lesson player: video (Mux/Bunny) + PDF viewer", "Lesson progress tracking", "Sequential lesson unlocking", "Final task submission flow"]} />
            <PhaseCard num={5} label="Admin & Certs" color={A} duration="Week 8" items={["Instructor dashboard: submissions review", "Approve / reject with feedback", "Dynamic certificate PDF generation (Edge Function)", "SMS notification on certificate issuance", "Public certificate verification page"]} />
            <PhaseCard num={6} label="Launch" color={G} duration="Week 9" items={["Performance audit (Lighthouse 90+)", "SEO: meta tags, og:image, sitemap, schema.org", "Cross-browser + RTL QA testing", "Analytics (Vercel Analytics + Supabase insights)", "Vercel production deployment + domain + SSL"]} />
          </div>
        </div>
      </section>

      {/* ═══ CLOSING ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "80px 24px 60px", background: "#fff" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-[24px] p-10 md:p-14 mb-8" style={{ border: "1px solid #EBEBEB" }}>
            <img src="/ahmed.jpeg" alt="Ahmed Ali" className="w-24 h-24 rounded-full object-cover mx-auto mb-6" style={{ border: `3px solid ${G}` }} />
            <h3 className="heading text-3xl mb-6">Let&apos;s Build This<span style={{ color: G }}>.</span></h3>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <a href="https://wa.me/201011648156" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold" style={{ background: G, color: D, border: `2px solid ${D}`, boxShadow: `4px 4px 0px 0px ${D}`, textDecoration: "none" }}>
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a href="mailto:hello@ahmedali.online" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold" style={{ background: "#fff", color: D, border: `2px solid ${D}`, boxShadow: `4px 4px 0px 0px ${D}`, textDecoration: "none" }}>
                Email <ArrowRight size={14} />
              </a>
            </div>
            <div className="w-full h-px mb-6" style={{ background: "#F0F0F0" }} />
            <p className="text-[14px] font-bold">Ahmed Ali</p>
            <p className="text-[12px]" style={{ color: G }}>Full-Stack Digital Strategist</p>
            <p className="text-[12px] mt-1" style={{ color: "rgba(0,0,0,0.4)" }}>hello@ahmedali.online · ahmedali.online</p>
          </div>
          <p className="text-[11px]" style={{ color: "rgba(0,0,0,0.15)" }}>&copy; {new Date().getFullYear()} Ahmed Ali. Prepared exclusively for MO BADI.</p>
        </div>
      </section>
    </div>
  );
}

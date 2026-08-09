"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import MotionMotorsWebsiteNav from "@/components/MotionMotorsWebsiteNav";
import {
  ArrowDown, ArrowRight,
  Car, Calendar, MapPin, Phone, Mail, MessageCircle,
  Globe, Languages, Smartphone, Cpu, ShieldCheck, Wrench,
  Banknote, Calculator, Target, Filter, Database, Server, Code2,
  FileText, Layers, Boxes, GitBranch, Network, Search,
  Sparkles, Heart, Briefcase, Eye, Compass,
  CheckCircle2, BadgeCheck, Settings, BookOpen, AlertCircle,
  PenTool, Palette, Type as TypeIcon,
  Lightbulb, Rocket, ArrowLeftRight, Play, Send,
  Image as ImageIcon, Clock,
  type LucideIcon,
} from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

/* ═══════════ PALETTE — muted, not neon ═══════════ */
const G = "#30c280"; // khattaba green
const D = "#0A0A0A"; // dark
const R = "#B85454"; // brick (was electric red)
const A = "#C4823B"; // bronze (was neon amber)
const B = "#4271B8"; // muted blue (was electric blue)
const P = "#735AAB"; // grape (was neon purple)

/* ═══════════ SECTION HEAD ═══════════ */

function SectionHead({
  eyebrow, children, color = G, subtitle, light,
}: { eyebrow: string; children: React.ReactNode; color?: string; subtitle?: string; light?: boolean }) {
  return (
    <div className="text-center mb-12">
      <p className="mb-3" style={{
        color,
        fontFamily: "var(--font-accent), 'Times New Roman', serif",
        fontStyle: "italic",
        fontWeight: 400,
        fontSize: "clamp(22px, 2.4vw, 30px)",
        letterSpacing: 0.2,
        lineHeight: 1.2,
      }}>
        {eyebrow}
      </p>
      <h2 className="heading text-4xl md:text-5xl mb-4" style={{ color: light ? "#fff" : D, lineHeight: 1.3 }}>
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

/* ═══════════ MAIN ═══════════ */

export default function MotionMotorsWebsitePlan() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".mmw-hero", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: "power4.out", delay: 0.3 });
      gsap.utils.toArray<HTMLElement>(".mmw-slide").forEach((el) => {
        gsap.fromTo(el, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".mmw-stagger").forEach((el) => {
        gsap.fromTo(el.querySelectorAll(".mmw-item"), { y: 40, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.06, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 82%", once: true } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  /* ═══ DATA ═══ */

  const headlineStats: { n: string; sub: string; color: string }[] = [
    { n: "11", sub: "Sitemap sections in the brief", color: G },
    { n: "5", sub: "Models · S06/S06DM/S07/S08DM/S09", color: B },
    { n: "AR · EN", sub: "Bilingual at the root", color: A },
    { n: "1 month", sub: "Kickoff to launch", color: P },
  ];

  const briefReceived: { title: string; meta: string; body: string; icon: LucideIcon; color: string }[] = [
    { title: "Sitemap (Bilingual)", meta: "11 sections", color: G, icon: Layers,
      body: "About Us, Models, Offers, Safety & Technology, Aftersales, Careers, Store Locator, Book a Test Drive, Contact Us, WhatsApp Widget, Social Media Links — confirmed as the spine of the site." },
    { title: "Copy in AR + EN", meta: "Section-by-section", color: B, icon: Languages,
      body: "Native Arabic copy and English copy per section, ready to map directly into the new IA. No translation step required." },
    { title: "Sample Model Template", meta: "Universal across the lineup", color: A, icon: Car,
      body: "Design language, smart cabin, intelligent tech, safety, comfort, engine, dimensions, colors, trims — applied across the launch lineup: S06 · S06DM · S07 · S08DM · S09 and any future models added later." },
    { title: "Brand Context", meta: "Western region · Jeddah", color: P, icon: MapPin,
      body: "Motion Motors is the Soueast dealer for the Western region of Saudi Arabia. Jeddah is the primary showroom; expansion-ready IA assumed." },
  ];

  const landscape: { name: string; url: string; role: string; keeps: string; drops: string; improves: string; color: string }[] = [
    {
      name: "Honda Middle East", url: "honda-mideast.com", role: "Structural reference", color: B,
      keeps: "Enterprise navigation pattern: Products / Discover / Safety & Technology / Country selector. Newsletter capture. Multi-language toggle.",
      drops: "Regional-conglomerate scale (Motion Motors is a focused dealer, not a manufacturer). Power Products / Motorcycles categories are not in scope.",
      improves: "Replace the corporate Honda Worldwide deck with a lead-engine layer (test drive, finance, WhatsApp) the Honda site does not surface on the homepage.",
    },
    {
      name: "Soueast Motor (global)", url: "soueast-motor.com", role: "Brand tone reference", color: A,
      keeps: "EASE lifestyle voice. Model-first carousel (S05 → S09). Hero is the model, not the marketing.",
      drops: "Information density is low — no offers, no dealer locator, no after-sales surface area. Acceptable for a manufacturer; insufficient for a dealer.",
      improves: "Inherit the visual restraint, but add the commerce layer Soueast does not need: pricing, financing, booking, service, parts.",
    },
    {
      name: "Al Nabooda Auto", url: "nabooda-auto.com", role: "Corporate-tone reference", color: P,
      keeps: "Editorial homepage statement (\"We don't sell cars — we create experiences\"). At-a-glance metrics. Leadership and Locations as first-class pages.",
      drops: "No transactional surface (no finance, no booking, no parts). Three-brand structure (VW / Porsche / Audi) does not apply.",
      improves: "Take the editorial tone and the locations rigor, but layer the transactional flows Nabooda omits.",
    },
    {
      name: "Chery KSA", url: "cheryksa.com", role: "Local-market reference", color: G,
      keeps: "Local-market presentation patterns for KSA auto buyers (pending walkthrough — site was unavailable to crawl in the prep window).",
      drops: "To be confirmed once the site is accessible.",
      improves: "Will be revisited in Week 1 discovery with the team.",
    },
  ];

  const principles: { n: string; title: string; tagline: string; body: string; icon: LucideIcon; color: string; dark?: boolean }[] = [
    { n: "01", title: "Brochure with a Lead Engine", color: G, icon: Target,
      tagline: "Every page has a path to a lead.",
      body: "A dealer website is not a brand brochure. Every page surfaces at least one of four routes into the CRM: Book a Test Drive, Get a Quote, WhatsApp, or Finance Pre-qualification. Pages that cannot answer the question \"where does the lead come from\" do not ship.",
    },
    { n: "02", title: "Bilingual by Construction", color: B, icon: Languages, dark: true,
      tagline: "Arabic is composed natively, not translated.",
      body: "AR and EN are parallel content models — same structure, independent records. RTL is handled at the route group level, not patched in CSS. Pricing keeps Western numerals for finance clarity; editorial Arabic uses Arabic-Indic where appropriate.",
    },
    { n: "03", title: "Trust Lives Everywhere", color: A, icon: ShieldCheck,
      tagline: "The warranty proof rides alongside every price.",
      body: "Six-year vehicle warranty, ten-year engine warranty, six-year roadside assistance — these are the three lines that convert a price-curious visitor into a qualified lead. They appear on model pages, offer pages, and conversion modules — never in isolation, never withheld.",
    },
  ];

  /* ═══ INFORMATION ARCHITECTURE — 11 sitemap items expanded ═══ */

  const iaTree: {
    n: string;
    parent: string;
    parentRoute: string;
    color: string;
    icon: LucideIcon;
    purpose: string;
    children: { route: string; note: string }[];
  }[] = [
    {
      n: "01", parent: "About Us", parentRoute: "/about", color: G, icon: BookOpen,
      purpose: "Build trust in the dealer, not just the manufacturer. Editorial-tone story of who Motion Motors is and what ownership with us looks like.",
      children: [
        { route: "/about", note: "Brand story · why we exist · the Motion Motors promise" },
        { route: "/about/leadership", note: "Founder / executive bios with photos and quotes" },
        { route: "/about/journey", note: "Timeline of milestones — opening, first deliveries, brand expansion" },
        { route: "/about/community", note: "Local Jeddah presence — events, sponsorships, customer stories" },
      ],
    },
    {
      n: "02", parent: "Models", parentRoute: "/models", color: B, icon: Car,
      purpose: "The catalog. The most-trafficked branch of the site. Built once as a template, scaled across the launch lineup and any future models.",
      children: [
        { route: "/models", note: "Lineup grid — all available models with starting price + finance hook" },
        { route: "/models/s06", note: "Model detail (template applies to all)" },
        { route: "/models/s06dm", note: "Model detail (S06 DM variant)" },
        { route: "/models/s07", note: "Model detail" },
        { route: "/models/s08dm", note: "Model detail (S08 DM variant)" },
        { route: "/models/s09", note: "Model detail" },
        { route: "/models/compare", note: "Side-by-side spec compare — pick any two models" },
        { route: "/models/[slug]/brochure", note: "Brochure PDF download with email capture" },
      ],
    },
    {
      n: "03", parent: "Offers", parentRoute: "/offers", color: A, icon: Banknote,
      purpose: "The commercial layer. Where the price-hook lives. Each offer is its own page so it can be linked in ads and indexed in search.",
      children: [
        { route: "/offers", note: "All active offers index with filters (model, financing type, validity)" },
        { route: "/offers/[slug]", note: "Offer detail — installment, down payment, tenure, apply CTA" },
        { route: "/offers/finance-calculator", note: "Generic, bank-agnostic installment estimator (see Section 09)" },
        { route: "/offers/reserve", note: "Online Reservation flow — pick model + trim + color + pay deposit" },
      ],
    },
    {
      n: "04", parent: "Safety & Technology", parentRoute: "/technology", color: P, icon: Cpu,
      purpose: "Trust through transparency. Concrete tech features explained, not buzzwords. Sourced from the model briefs.",
      children: [
        { route: "/technology", note: "Overview hub — what Soueast tech means for the driver" },
        { route: "/technology/safety", note: "Bosch ESP, 360° body structure, blind spot, lane assist — explained" },
        { route: "/technology/connectivity", note: "Apple CarPlay, Android Auto, voice control, infotainment" },
        { route: "/technology/driver-assistance", note: "Cameras, collision avoidance, stability systems" },
      ],
    },
    {
      n: "05", parent: "Aftersales", parentRoute: "/aftersales", color: G, icon: Wrench,
      purpose: "Where the relationship continues. A logged-in owner area connected to the website's database — every owner has a profile, every car has a record, and post-purchase communications fire automatically.",
      children: [
        { route: "/aftersales", note: "Overview — warranty, parts, service, roadside, plans" },
        { route: "/account", note: "Owner login + dashboard — My Garage, service history, documents" },
        { route: "/account/garage", note: "Owner's vehicle(s) — VIN, warranty status, plate, mileage log" },
        { route: "/account/service-history", note: "Full service + maintenance history pulled from the dealer DB" },
        { route: "/account/documents", note: "Document vault — invoice, registration, insurance, warranty card" },
        { route: "/account/messages", note: "Two-way messages with the showroom team" },
        { route: "/aftersales/service-booking", note: "Service appointment booking — auto-fills VIN + model for logged-in owners" },
        { route: "/aftersales/parts", note: "Genuine parts catalog — pre-filtered to the owner's model when logged in" },
        { route: "/aftersales/warranty", note: "Warranty registration — activates on delivery, visible in the owner account" },
        { route: "/aftersales/roadside", note: "Roadside assistance — call + WhatsApp shortcut + how it works" },
        { route: "/aftersales/service-plans", note: "Service packages — what's included, what each plan costs" },
      ],
    },
    {
      n: "06", parent: "Careers", parentRoute: "/careers", color: B, icon: Briefcase,
      purpose: "Recruitment surface. Beyond just a careers@motionmotors email — open roles, culture, application form.",
      children: [
        { route: "/careers", note: "Culture, benefits, why work at Motion Motors" },
        { route: "/careers/roles", note: "Open roles index — filter by department, location" },
        { route: "/careers/[role]", note: "Role detail with apply form (forwards to careers@motionmotors.com)" },
      ],
    },
    {
      n: "07", parent: "Store Locator", parentRoute: "/showrooms", color: A, icon: MapPin,
      purpose: "Jeddah is the primary showroom; the IA is built so additional locations slot in without restructuring.",
      children: [
        { route: "/showrooms", note: "All showrooms map + list view" },
        { route: "/showrooms/jeddah", note: "Jeddah primary — address, hours, team, photos, Google Maps embed, call + WhatsApp" },
        { route: "/showrooms/[city]", note: "Future-ready dynamic route for expansion" },
      ],
    },
    {
      n: "08", parent: "Book a Test Drive", parentRoute: "/test-drive", color: P, icon: Calendar,
      purpose: "Existing Next.js + Supabase test-drive system (originally built for the SAIC event) becomes the engine for the permanent showroom flow.",
      children: [
        { route: "/test-drive", note: "Pick a model + date + showroom → leads into the existing booking pipeline" },
        { route: "/test-drive/confirm/[id]", note: "Confirmation + add-to-calendar + WhatsApp reminder" },
        { route: "/test-drive/manage/[id]", note: "Customer can reschedule or cancel without re-entering details" },
      ],
    },
    {
      n: "09", parent: "Contact Us", parentRoute: "/contact", color: G, icon: Mail,
      purpose: "The classic catch-all, but instrumented so every contact path attributes back to the source.",
      children: [
        { route: "/contact", note: "Form (general inquiry, sales, after-sales) + phone + email + hours + map" },
      ],
    },
    {
      n: "10", parent: "WhatsApp Widget", parentRoute: "site-wide", color: B, icon: MessageCircle,
      purpose: "Floating widget on every page. Pre-fills context (model / page) into the message so sales can route faster.",
      children: [
        { route: "site-wide floating", note: "Deep link → 9200 (verified business line) with page-context pre-fill" },
      ],
    },
    {
      n: "11", parent: "News & Press", parentRoute: "/news", color: G, icon: BookOpen,
      purpose: "The newsroom — confirmed in-scope. Filterable index + per-article pages, AR + EN, editorial workflow in the CMS, scheduled publishing for time-bound announcements.",
      children: [
        { route: "/news", note: "News index — filter by category (press release / events / new arrivals)" },
        { route: "/news/[slug]", note: "Article detail with author, date, hero image, related articles, social share" },
        { route: "/news/category/[slug]", note: "Category landing — all articles filtered by topic" },
      ],
    },
    {
      n: "12", parent: "Social Media", parentRoute: "site-wide footer", color: A, icon: Sparkles,
      purpose: "Surfaced where it converts — footer + a dedicated /follow landing for paid social to point to.",
      children: [
        { route: "site-wide footer", note: "Facebook · Instagram · X · TikTok · Snapchat · YouTube · LinkedIn" },
        { route: "/follow", note: "Single shareable landing — \"all our channels in one place\" (replaces the linktr.ee dependency)" },
      ],
    },
  ];

  /* ═══ PAGE TEMPLATES ═══ */

  const templates: { code: string; name: string; tagline: string; color: string; icon: LucideIcon; sections: string[] }[] = [
    { code: "T1", name: "Homepage", color: G, icon: Sparkles,
      tagline: "The site's storefront. Sell the brand and the offer in one scroll.",
      sections: [
        "Hero — rotating featured model + price/finance hook + primary CTAs (Test Drive · Quote)",
        "Models lineup strip — visual rail across the full lineup",
        "Active offers strip — most current offer + CTA",
        "Safety & Technology rail — three tech proof points",
        "After-sales reassurance — 6yr / 10yr / 6yr trust badges",
        "Showroom locator teaser — Jeddah card + map",
        "Editorial CTA strip — Test Drive · Get a Quote · Contact",
      ],
    },
    { code: "T2", name: "Model Detail", color: B, icon: Car,
      tagline: "The conversion page. Covered in full in Section 07.",
      sections: [
        "Hero · gallery · design · smart cabin · tech · safety · comfort · engine · dimensions · colors · trims · CTA strip",
      ],
    },
    { code: "T3", name: "Offer Detail", color: A, icon: Banknote,
      tagline: "One page per active offer — linkable from ads, indexable in search.",
      sections: [
        "Offer hero — headline figure + applicable models",
        "Inline finance calculator pre-filled with the offer's terms",
        "Eligibility checklist — who can apply",
        "Apply CTA → lead form (bank-agnostic copy)",
        "After-sales reassurance footer — never the price without the warranty",
      ],
    },
    { code: "T4", name: "Editorial / Story", color: P, icon: BookOpen,
      tagline: "For About, Brand, Technology narrative pages.",
      sections: [
        "Editorial hero — single image + a sentence",
        "Long-form sections with images, pull-quotes, and stats",
        "Related links rail — adjacent stories or product entry points",
      ],
    },
    { code: "T5", name: "Listing", color: G, icon: Filter,
      tagline: "Reusable index page — Models, Offers, Showrooms, Careers, Aftersales hub.",
      sections: [
        "Filter bar (per content type)",
        "Card grid with consistent metadata pattern",
        "Empty state and load-more behavior",
      ],
    },
    { code: "T6", name: "Booking", color: B, icon: Calendar,
      tagline: "Reusable booking shell — Test Drive, Service, Warranty Registration.",
      sections: [
        "Step indicator (3 steps max)",
        "Form steps with inline validation and Saudi phone format",
        "Confirmation with add-to-calendar + WhatsApp reminder",
      ],
    },
  ];

  /* ═══ MAGNETIC LAYER — immersive features that lift the site above a brochure ═══ */

  const magnetic: { n: string; category: string; name: string; tagline: string; body: string; tech: string; icon: LucideIcon; color: string }[] = [
    // INSIDE THE CABIN
    { n: "01", category: "Inside the Cabin", color: G, icon: Eye,
      name: "360° Interior Walkthrough",
      tagline: "Drag to look around. Tap hotspots to learn.",
      body: "The visitor rotates the cabin, zooms into the dual-screen cluster, the leather stitching, the steering controls. Hotspots reveal what each element does — without forcing them into a video.",
      tech: "Spherical pano · click-through hotspots · works on mobile without VR" },
    { n: "02", category: "Inside the Cabin", color: B, icon: Smartphone,
      name: "Interactive Cockpit",
      tagline: "Tap the dashboard. See what each control does.",
      body: "A simulated cockpit where tapping the infotainment, voice button, or 360° camera plays a short demo — CarPlay loading, voice command responding, the parking camera switching to overhead view.",
      tech: "Layered SVG + micro-videos · accessible without proprietary gear" },
    { n: "03", category: "Inside the Cabin", color: A, icon: Palette,
      name: "Live Material Swap",
      tagline: "Switch leather, stitching, trim — instantly.",
      body: "Toggle between interior packages and watch the cabin re-skin in real time. Lights, shadows, camera angle stay constant so the comparison reads at a glance.",
      tech: "Texture-swap on Three.js scene · or pre-rendered layer composite" },
    { n: "04", category: "Inside the Cabin", color: P, icon: Sparkles,
      name: "Engine Note on Hover",
      tagline: "A subtle audio cue when hovering performance specs.",
      body: "Hover over the engine spec on a model page and a clean, short engine note plays once. No autoplay, no ambient music — a single tasteful audio moment that ties the spec to the feeling.",
      tech: "Howler.js · opt-in audio gated behind first interaction" },

    // OUTSIDE THE CAR
    { n: "05", category: "Outside the Car", color: G, icon: Compass,
      name: "360° Exterior Turntable",
      tagline: "Drag to rotate around the car in any color.",
      body: "Pre-rendered frames stream smoothly even on mid-range mobile. Becomes the default product image on every model page — no static hero photo can compete.",
      tech: "72-frame turntable per color · streamed on scroll" },
    { n: "06", category: "Outside the Car", color: B, icon: ImageIcon,
      name: "Color Configurator",
      tagline: "Swap the exterior color with a smooth transition.",
      body: "Tap a swatch — the car shifts from Snow White to Racing Red with a soft cross-fade. Each color shows in the same environment so the choice is about the color, not the lighting.",
      tech: "Layer-swap on the turntable frames · zero load delay" },
    { n: "07", category: "Outside the Car", color: A, icon: Lightbulb,
      name: "Time-of-Day Scene",
      tagline: "See the car at sunrise, noon, dusk, night.",
      body: "A slider that shifts the scene lighting. The car stays put — the world around it changes. Sells the design language in four lighting moods without four different photo shoots.",
      tech: "Pre-composited environments per model · slider blends" },
    { n: "08", category: "Outside the Car", color: P, icon: Smartphone,
      name: "AR Preview (Mobile)",
      tagline: "Park the car in your driveway through your phone.",
      body: "On a supported phone, tap \"View in your space\" and the car appears at scale on the floor through the camera. Walk around it. Open the door. Then book a real test drive.",
      tech: "USDZ for iOS Quick Look · GLB for Android Scene Viewer" },

    // BEYOND THE METAL
    { n: "09", category: "Beyond the Metal", color: G, icon: Target,
      name: "Magnetic Cursor",
      tagline: "The cursor is pulled toward CTAs.",
      body: "A subtle gravity effect that nudges the cursor toward primary actions — Book Test Drive, Get a Quote, See This Offer. The visitor feels guided without being shoved.",
      tech: "Custom cursor primitive · respects reduced-motion preference" },
    { n: "10", category: "Beyond the Metal", color: B, icon: ArrowDown,
      name: "Scroll-Triggered Reveal",
      tagline: "The car drives through scenes as you scroll.",
      body: "On the homepage, the featured model moves through three settings — corniche, city night, desert sunrise — driven by scroll position. It feels like a film, not a slideshow.",
      tech: "GSAP ScrollTrigger + pinned canvas · video-frame stitching" },
    { n: "11", category: "Beyond the Metal", color: A, icon: Play,
      name: "Cinematic Test-Drive Reel",
      tagline: "A 30-second film replaces the static gallery.",
      body: "A short cinematic reel — POV through the cabin, exterior dynamic shots, Jeddah-context driving — sits where most sites put a static carousel. Plays on first scroll into view, autoplays muted, with one-tap fullscreen.",
      tech: "Self-hosted H.265 + AV1 fallback · poster-frame loaded eagerly" },
    { n: "12", category: "Beyond the Metal", color: P, icon: Sparkles,
      name: "Smart Match Quiz",
      tagline: "Five questions. Your Soueast.",
      body: "An interactive quiz — family size, daily commute, what you'd never compromise on — recommends a model with a written rationale at the end. Built to be the top-performing lead source on social.",
      tech: "Client-side scoring engine · result page captures a lead" },
  ];

  /* ═══ MODEL DETAIL — S05 sample as universal blocks ═══ */

  const modelBlocks: { n: string; block: string; sample: string; color: string; icon: LucideIcon }[] = [
    { n: "01", block: "Hero", color: G, icon: Eye,
      sample: "Model name · tagline (e.g., \"EASE Compact SUV\") · starting monthly installment · primary CTAs (Test Drive · Quote · Brochure)." },
    { n: "02", block: "Gallery", color: B, icon: ImageIcon,
      sample: "Exterior + interior + 360° turntable (where available). Lightbox view. Lazy-loaded for performance." },
    { n: "03", block: "Design Language", color: A, icon: PenTool,
      sample: "Urban Aesthetics — sharp body lines, eagle-eye styling, flowing grille. Editorial paragraph + lifestyle imagery." },
    { n: "04", block: "Smart Cabin", color: P, icon: Smartphone,
      sample: "Dual 10.25\" screens, leather seats with modern stitching. Imagery + short feature list." },
    { n: "05", block: "Intelligent Technology", color: G, icon: Cpu,
      sample: "Apple CarPlay · Android Auto · 360° camera · voice control. Iconography + one-sentence each." },
    { n: "06", block: "Safety First", color: R, icon: ShieldCheck,
      sample: "360° body structure · Bosch ESP · blind spot · lane change assist. Iconography + diagram." },
    { n: "07", block: "Comfort & Driving", color: B, icon: Heart,
      sample: "MacPherson front + multi-link rear suspension · multi-function steering. Spec sentences." },
    { n: "08", block: "Engine & Performance", color: A, icon: Settings,
      sample: "1.5L / 1.5T · up to 115 kW · 230 N·m · 6DCT / 5MT · 45L tank · 7.3–7.5 L/100km · Euro VI B. Spec table." },
    { n: "09", block: "Dimensions", color: P, icon: Boxes,
      sample: "Length 4397 mm · Width 1841 mm · Height 1654 mm · Wheelbase 2601 mm. Comparison-ready table." },
    { n: "10", block: "Exterior Colors", color: G, icon: Palette,
      sample: "8 color swatches with names (Luxury Black, Snow White, Cosmic Silver, Phantom Gray, Racing Red, Sky Blue, Vanilla Blue, Obsidian Black)." },
    { n: "11", block: "Trims", color: B, icon: Layers,
      sample: "Basic · Comfort · Luxury · Premium — comparison table with feature ticks and per-trim monthly installment." },
    { n: "12", block: "Conversion Strip", color: A, icon: Target,
      sample: "Persistent footer band: Book Test Drive · Get a Quote · Download Brochure · Talk on WhatsApp." },
  ];

  /* ═══ LEAD ENGINE ═══ */

  const leadPaths: { n: string; name: string; icon: LucideIcon; color: string; sla: string; body: string; fields: string[] }[] = [
    { n: "01", name: "Book a Test Drive", color: G, icon: Calendar,
      sla: "First contact within 30 minutes (business hours)",
      body: "Reuses the existing Motion Motors event system (Next.js 16 + Supabase). Extends the event-only flow into a permanent showroom flow: pick model → pick date → pick showroom → submit. Confirmation, reminders, and status state machine carry over.",
      fields: ["Full name", "Mobile (+966)", "Preferred model", "Preferred date / time", "Showroom location"],
    },
    { n: "02", name: "Get a Quote", color: B, icon: FileText,
      sla: "First contact within 2 business hours",
      body: "Lightweight inquiry attached to a specific model + trim. Pre-populated when launched from a model detail page. Routes to the sales team with the model context preserved.",
      fields: ["Full name", "Mobile (+966)", "Preferred model + trim", "Best time to contact"],
    },
    { n: "03", name: "WhatsApp · 9200", color: A, icon: MessageCircle,
      sla: "Real-time during business hours",
      body: "Site-wide floating widget. Routes to the verified 9200 business line with a pre-filled message including the page context (e.g., \"I'm on the S07 page and want to know about the current offer\"). Source attribution preserved for analytics.",
      fields: ["No form — direct conversation", "Page + UTM context auto-attached"],
    },
    { n: "04", name: "Finance Pre-qualification", color: P, icon: Banknote,
      sla: "First contact within 1 business day",
      body: "Entry-level qualification — captures the basics so the sales team can route the lead to the right financing partner. Bank-agnostic; nothing is locked to any single provider at this stage.",
      fields: ["Full name", "Mobile (+966)", "Monthly income range", "Employment status", "Preferred model", "Consent to share with finance partner"],
    },
    { n: "05", name: "Online Reservation", color: R, icon: ShieldCheck,
      sla: "Confirmation instantly · sales call within 1 business hour",
      body: "Phase 1 e-Commerce. The customer picks model + trim + color, pays a refundable deposit (e.g., SAR 5,000) online to reserve the specific unit, and finalizes paperwork at the showroom. Inventory marked as held; refund policy explicit before checkout.",
      fields: ["Full name", "ID / Iqama", "Mobile (+966)", "Model + trim + color", "Showroom for pickup", "Deposit payment (refundable)"],
    },
  ];

  /* ═══ FINANCE CALCULATOR — generic, bank-agnostic ═══ */

  const financeInputs: { label: string; type: string; default: string; color: string }[] = [
    { label: "Model + Trim", type: "Dropdown", default: "S07 · Comfort", color: G },
    { label: "Down Payment", type: "Slider 0% – 30%", default: "0%", color: B },
    { label: "Tenure", type: "Slider 12 – 60 months", default: "60 months", color: A },
  ];

  const financeOutputs: { label: string; sample: string; color: string }[] = [
    { label: "Estimated Monthly", sample: "SAR ~ / month", color: G },
    { label: "Disclaimer", sample: "T&Cs apply — guidance only", color: A },
    { label: "Next Step", sample: "→ Share details with sales", color: B },
  ];

  /* ═══ AFTER-SALES ═══ */

  const aftersales: { name: string; tagline: string; body: string; icon: LucideIcon; color: string }[] = [
    { name: "Owner Account · My Garage", color: G, icon: BadgeCheck,
      tagline: "Every owner has a login. Every car has a record.",
      body: "After purchase, the customer gets a login tied to their VIN. From their dashboard they see service history, warranty status, document vault (invoice, insurance, registration), and a direct line to the showroom team. The website's database becomes the single source of truth for the relationship after delivery." },
    { name: "Post-Purchase Automation", color: B, icon: Send,
      tagline: "The handover is the start of the conversation, not the end.",
      body: "The moment a sale is recorded, the system fires: an instant SMS + WhatsApp confirmation, a delivery-day welcome, a 7-day check-in, a 30-day satisfaction nudge, and the first service reminder. Each message is templated, bilingual, and links straight back into the owner account for action." },
    { name: "Service Booking", color: A, icon: Calendar,
      tagline: "Calendar + service type + VIN.",
      body: "Online appointment booking with selectable service type (oil change, periodic, diagnostic) and date. Confirmation by SMS and WhatsApp. Reminders 24 h before. Pulls vehicle details automatically from the owner account when logged in." },
    { name: "Warranty Registration", color: P, icon: ShieldCheck,
      tagline: "VIN + customer + start date.",
      body: "Warranty activates on delivery and shows up in the owner account from day one. Owners can view their warranty card, check coverage, and lodge claims directly from the dashboard." },
    { name: "Genuine Parts", color: G, icon: Boxes,
      tagline: "Browse and request-to-order.",
      body: "Searchable parts catalog scoped to the Soueast lineup. Logged-in owners see parts pre-filtered to their model. Visitors request a part; the showroom confirms availability and price." },
    { name: "Roadside Assistance", color: B, icon: Phone,
      tagline: "One-tap call + WhatsApp.",
      body: "Short page with the roadside number, what's covered, and a one-tap call / WhatsApp button. The trust message — 6 years of roadside cover — is the lead, not the small print." },
    { name: "Service Plans", color: A, icon: BookOpen,
      tagline: "Packages with transparent pricing.",
      body: "Pre-paid service packages with what's included and what each plan costs. Each plan has its own page so it can be linked from offers and ads. Active plans show in the owner account." },
  ];

  const trustItems: { n: string; sub: string; color: string }[] = [
    { n: "6", sub: "Years Vehicle Warranty", color: G },
    { n: "10", sub: "Years Engine Warranty", color: B },
    { n: "6", sub: "Years Roadside Assistance", color: A },
  ];

  /* ═══ BILINGUAL ═══ */

  const i18nApproach: { topic: string; decision: string; rationale: string; icon: LucideIcon; color: string }[] = [
    { topic: "Locale routing", color: G, icon: Globe,
      decision: "/en/* and /ar/* — locale baked into the URL",
      rationale: "Cleanest for hreflang, sharing, and per-locale sitemaps. Matches the existing portfolio's (ar) / (en) route-group convention." },
    { topic: "Content model", color: B, icon: Database,
      decision: "Parallel records, not translation layer",
      rationale: "AR copy is composed natively (as established in the brief). Decoupled records prevent EN edits from invalidating the AR copy." },
    { topic: "RTL handling", color: A, icon: ArrowLeftRight,
      decision: "dir=\"rtl\" at the route-group level + automatic mirror via logical CSS properties",
      rationale: "Avoids per-component RTL patches. Tested on real Arabic text from the brief, not lorem ipsum." },
    { topic: "Typography", color: P, icon: TypeIcon,
      decision: "Ahmed Sans / Ahmed Serif (AR) · Bricolage Grotesque (EN). Both already in the design system.",
      rationale: "Fonts are tuned per script. Latin fallback is loaded only when EN is requested." },
    { topic: "Numerals", color: G, icon: Calculator,
      decision: "Western numerals for prices and finance figures across both locales. Arabic-Indic where editorial.",
      rationale: "Finance clarity beats orthographic consistency. SAR 1,051 reads the same in both locales." },
    { topic: "Forms + validation", color: B, icon: CheckCircle2,
      decision: "Saudi phone format validation in both locales; error messages localized.",
      rationale: "Validates +966 5XXXXXXXX regardless of input numerals. Reuses the event-system validation already in production." },
  ];

  /* ═══ TECH STACK ═══ */

  const stack: { cat: string; sub: string; icon: LucideIcon; color: string; items: { tech: string; logo?: string; fallbackIcon?: LucideIcon; use: string }[] }[] = [
    { cat: "Frontend", sub: "What the user sees", color: G, icon: Code2,
      items: [
        { tech: "Next.js 16", logo: "/logos/vertex/nextjs.svg", use: "App Router with React Server Components and Server Actions. Same major as the existing event system." },
        { tech: "TypeScript", logo: "/logos/vertex/typescript.svg", use: "End-to-end type safety from forms to CMS to CRM payloads." },
        { tech: "Tailwind CSS v4", logo: "/logos/vertex/tailwindcss.svg", use: "Brand tokens (black, Motion Blue, mint accent) wired as CSS variables." },
        { tech: "GSAP + ScrollTrigger", logo: "/logos/vertex/gsap.svg", use: "Hero motion and scroll choreography. Tasteful, not overworked." },
      ],
    },
    { cat: "Content", sub: "Where the editorial team works", color: B, icon: Database,
      items: [
        { tech: "Sanity (recommended)", fallbackIcon: Database, use: "Headless CMS for models, offers, news, careers, showrooms. Real-time preview, document-level localization for AR + EN." },
        { tech: "Cloudinary", logo: "/logos/vertex/cloudinary.svg", use: "Image CDN + transformation pipeline. Brochure PDFs on object storage." },
        { tech: "Editorial workflow", fallbackIcon: BookOpen, use: "Draft → review → publish, with scheduled publishing for time-bound offers." },
      ],
    },
    { cat: "Lead & Data", sub: "Where forms and bookings live", color: A, icon: Server,
      items: [
        { tech: "Supabase + Postgres", logo: "/logos/vertex/postgresql.svg", use: "Reuse the existing Motion Motors event-system instance — auth, RLS, and the leads schema are already in production." },
        { tech: "Row-Level Security", fallbackIcon: ShieldCheck, use: "Customer records only readable by authenticated staff. Public form posts are write-only." },
        { tech: "Lead unification", fallbackIcon: Network, use: "All four lead paths write into the same lead record. Source + UTM preserved." },
      ],
    },
    { cat: "Integrations", sub: "Where the site talks to the world", color: P, icon: Network,
      items: [
        { tech: "WhatsApp Business API", fallbackIcon: MessageCircle, use: "Two-way conversation channel. Triggers post-purchase confirmations, delivery messages, service reminders, and routes inbound chats into the same lead record." },
        { tech: "SMS Gateway (Twilio / Unifonic)", fallbackIcon: Smartphone, use: "Instant transactional SMS for delivery confirmations, service reminders, and password / OTP for the owner account login. KSA-routed for delivery reliability." },
        { tech: "Finance partners (bank-agnostic)", fallbackIcon: Banknote, use: "Finance pre-qualification handed off via consented payload to whichever bank the sales team selects. No single bank hardcoded — flexible by season and offer." },
        { tech: "Resend", logo: "/logos/vertex/resend.svg", use: "Transactional email — booking confirmations, quote receipts, warranty cards, post-purchase journey." },
      ],
    },
    { cat: "SEO & Schema", sub: "How search engines understand the site", color: G, icon: Search,
      items: [
        { tech: "JSON-LD schemas", fallbackIcon: FileText, use: "AutoDealer · Vehicle · Offer · FAQPage schemas on every page type." },
        { tech: "hreflang", fallbackIcon: Languages, use: "Per-locale alternates so AR and EN versions surface in the correct search results." },
        { tech: "Lighthouse", logo: "/logos/vertex/lighthouse.svg", use: "Target LCP < 2.0 s on 4G, CLS < 0.05, INP < 200 ms. Continuous CI checks." },
        { tech: "Plausible", logo: "/logos/vertex/plausible.svg", use: "Privacy-first analytics alongside GA4 / GTM. Same dashboard for both locales." },
      ],
    },
    { cat: "Operations", sub: "How the site stays up", color: B, icon: GitBranch,
      items: [
        { tech: "Vercel", logo: "/logos/vertex/vercel.svg", use: "Edge runtime, automatic preview deploys per PR, AR + EN deployed from a single repo." },
        { tech: "Sentry", logo: "/logos/vertex/sentry.svg", use: "Error tracking and performance baselines, split by AR / EN." },
        { tech: "GitHub Actions", logo: "/logos/vertex/githubactions.svg", use: "CI: type check, lint, build, Lighthouse budget check, preview deploy." },
      ],
    },
  ];

  /* ═══ BRAND ═══ */

  const brandPillars: { n: string; pillar: string; spec: string; body: string; icon: LucideIcon; color: string }[] = [
    { n: "01", pillar: "Type", spec: "Montserrat (EN) · Al Mar3ai / المراعي (AR)", color: G, icon: TypeIcon,
      body: "The Motion Motors brand fonts. Montserrat carries the English voice with geometric clarity; Al Mar3ai (المراعي) carries the Arabic voice with native authority. Each is composed for its own script, not forced to mimic the other." },
    { n: "02", pillar: "Color", spec: "Black #0A0A0A · Motion Blue #3B82F6 · Mint #4FFFB0 (accent)", color: B, icon: Palette,
      body: "Brand black and Motion Blue lifted from the logo. Mint reserved for interactive accents (links, focus states, primary CTAs) — sparingly, not as a background wash." },
    { n: "03", pillar: "Motif", spec: "Stair / motion stripe from the logo", color: A, icon: Compass,
      body: "The stair pattern in the logo becomes a recurring graphic accent — section dividers, CTA card corners, hover transitions. Subtle, never decorative." },
    { n: "04", pillar: "Photography", spec: "Soueast official + Jeddah-context lifestyle", color: P, icon: ImageIcon,
      body: "Hero and model imagery from Soueast's official library; editorial photography commissioned in Jeddah for the lifestyle layer (city driving, family context, showroom)." },
  ];

  /* ═══ TIMELINE — 4 editorial weeks, no day-by-day ═══ */

  const weekPlan: {
    n: string; title: string; theme: string; milestone: string;
    color: string; icon: LucideIcon;
    outcomes: string[];
  }[] = [
    {
      n: "01", title: "Foundation", theme: "Set the table.", color: G, icon: Layers,
      milestone: "Scaffolding live · IA signed off · bilingual routing working",
      outcomes: [
        "Next.js 16 + Sanity + Supabase wired together · CI/CD on Vercel",
        "/en and /ar locale routing with RTL primitives in place",
        "Sanity schemas live for models, offers, showrooms, careers",
        "Design system v1 — brand tokens, components, type ramp",
      ],
    },
    {
      n: "02", title: "Storefront & Models", theme: "Build the spine.", color: B, icon: Car,
      milestone: "Homepage and every model detail page live in AR and EN",
      outcomes: [
        "Homepage, About, Leadership, Journey, Community pages built",
        "Models index + first model detail page shipped as the universal template",
        "S06 · S06DM · S07 · S08DM · S09 detail pages rolled from the template",
        "Showroom Jeddah page with map, hours, team, photography",
      ],
    },
    {
      n: "03", title: "Lead Engine & After-Sales", theme: "Turn visits into leads.", color: A, icon: Target,
      milestone: "All four lead paths live · CRM wired · after-sales hub shipped",
      outcomes: [
        "Test Drive flow extending the existing event system",
        "Finance calculator + Get-a-Quote + WhatsApp widget shipped",
        "CRM webhook wired — every lead path lands in a single record",
        "Service booking · Warranty · Parts · Roadside · Offers · Editorial",
      ],
    },
    {
      n: "04", title: "Polish & Launch", theme: "Take it live.", color: P, icon: Rocket,
      milestone: "Live · monitored · indexed · ready for the campaign",
      outcomes: [
        "SEO · JSON-LD schemas · per-locale sitemap · hreflang",
        "Performance pass — LCP < 2s, INP < 200ms, CLS < 0.05",
        "Full AR + EN QA · accessibility audit (WCAG AA)",
        "Launch · monitoring live · handover docs delivered",
      ],
    },
  ];


  /* ═══ OPEN ITEMS ═══ */

  /* Items confirmed by leadership in the May 19 review round */
  const confirmedItems: { n: string; topic: string; decision: string; color: string; icon: LucideIcon }[] = [
    { n: "01", topic: "Model lineup", color: G, icon: Car,
      decision: "Confirmed — S06 · S06DM · S07 · S08DM · S09 (S05 removed from the launch scope)." },
    { n: "02", topic: "Finance approach", color: B, icon: Banknote,
      decision: "Generic, bank-agnostic calculator. No fixed bank tariff, no insurance bundling, no commitment. T&Cs note shown under every result." },
    { n: "03", topic: "WhatsApp number", color: A, icon: MessageCircle,
      decision: "Confirmed — verified 9200 business line, in use across every WhatsApp touchpoint." },
    { n: "04", topic: "News / Press", color: P, icon: BookOpen,
      decision: "Opt-IN. /news index + per-article pages + editorial workflow in the CMS, AR + EN per article." },
    { n: "05", topic: "Social footer", color: G, icon: Sparkles,
      decision: "Pinterest removed, LinkedIn added. Final list: Facebook · Instagram · X · TikTok · Snapchat · YouTube · LinkedIn." },
    { n: "06", topic: "Mobile-first UX", color: B, icon: Smartphone,
      decision: "Audience-Aware Adaptive — mobile prioritizes conversion path for end customers, desktop prioritizes brand narrative for B2B / partners / press." },
    { n: "07", topic: "Web architecture", color: A, icon: Code2,
      decision: "Hybrid Rendering via Next.js 16 — SSG for marketing, SSR + ISR for models / offers, Client Components for interactivity, Server Actions for forms." },
    { n: "08", topic: "Eligibility section", color: P, icon: FileText,
      decision: "Removed. Sales team handles bank-specific eligibility during follow-up." },
    { n: "09", topic: "e-Commerce", color: G, icon: ShieldCheck,
      decision: "Phase 1: Option A — Online Reservation (deposit-to-hold). Options B (accessories shop) and C (full vehicle purchase) parked for Phase 2." },
    { n: "10", topic: "Magnetic Layer", color: R, icon: Sparkles,
      decision: "Outside the 4-week launch scope. Marked as Phase 2 / Optional. Working demo of one or two features can be arranged separately on request." },
  ];

  /* What is still pending — the only true open item after the May 19 review */
  const stillPending: { n: string; topic: string; question: string; needed: string; color: string; icon: LucideIcon }[] = [
    { n: "01", topic: "FSD sign-off (DMS layer)", color: B, icon: FileText,
      question: "Functional Specification Document for the Owner Account + After-Sales DMS.",
      needed: "Draft v0.1 is live at /motionmotors-website/fsd — 20 sections across 3 parts covering actors, data model, RLS, integrations, notifications, and per-feature flows. Under leadership review." },
  ];

  /* ═══ RENDER ═══ */

  return (
    <div ref={ref} style={{ background: "#fff", color: D, minHeight: "100vh", fontFamily: "var(--font-bricolage), system-ui, sans-serif" }}>
      <MotionMotorsWebsiteNav />

      {/* ══════════ HERO ══════════ */}
      <section style={{ padding: "70px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at top, ${G}18 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        <div className="container relative" style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Logos row */}
          <div className="mmw-hero flex items-center justify-center gap-6 mb-10">
            <Image
              src="/motionmotors/logo-en.png"
              alt="Motion Motors"
              width={220}
              height={32}
              priority
              style={{ height: 32, width: "auto", objectFit: "contain" }}
            />
            <span style={{ width: 1, height: 24, background: "#E4E4E7" }} />
            <Image
              src="/motionmotors/soueast.png"
              alt="Soueast"
              width={300}
              height={64}
              priority
              style={{ height: 64, width: "auto", objectFit: "contain", opacity: 0.9 }}
            />
          </div>
          <div className="mmw-hero flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: `${G}15`, border: `1px solid ${G}40` }}>
              <span className="block w-1.5 h-1.5 rounded-full" style={{ background: G }} />
              <span className="heading text-[11px]" style={{ color: D, letterSpacing: 0.5 }}>MOTION MOTORS × SOUEAST</span>
            </span>
          </div>
          <h1 className="mmw-hero heading mb-6 text-center" style={{ fontSize: "clamp(40px, 8.5vw, 84px)", lineHeight: 1.3, color: D, letterSpacing: -0.02 }}>
            The Public<br />
            <span style={{ color: B }}>Website Plan.</span>
          </h1>
          <p className="mmw-hero text-lg md:text-xl mb-10 max-w-3xl mx-auto text-center" style={{ color: "rgba(0,0,0,0.55)", lineHeight: 1.55 }}>
            Information architecture, page templates, lead engine, finance calculator, after-sales hub, bilingual setup, tech stack, and a phased build plan — for the Motion Motors public site. Jeddah-anchored. Soueast-led. AR + EN at the root.
          </p>

          {/* Stats row */}
          <div className="mmw-hero grid grid-cols-2 md:grid-cols-4 gap-0 mt-12" style={{ borderTop: "1px solid #EBEBEB", borderBottom: "1px solid #EBEBEB" }}>
            {headlineStats.map((s, i) => (
              <div key={s.sub} style={{
                padding: "28px 20px",
                borderRight: i < headlineStats.length - 1 ? "1px solid #EBEBEB" : "none",
              }}>
                <div className="heading text-3xl md:text-4xl mb-1" style={{ color: s.color }}>{s.n}</div>
                <div className="text-[12px]" style={{ color: "rgba(0,0,0,0.45)" }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Prepared by — three colored chips */}
          <div className="mmw-hero flex flex-wrap items-center justify-center gap-3 mt-12">
            {[
              { label: "Prepared by", value: "Ahmed Ali · Head of Digital & Growth Lead", color: G },
              { label: "Issued", value: "May 17, 2026", color: B },
              { label: "In response to", value: "the Motion Motors website brief", color: A },
            ].map((m) => (
              <div key={m.label} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-[12px]" style={{
                background: `${m.color}12`,
                border: `1px solid ${m.color}30`,
              }}>
                <span className="heading text-[10px]" style={{ color: m.color, letterSpacing: 0.5 }}>{m.label.toUpperCase()}</span>
                <span style={{ width: 3, height: 3, borderRadius: 2, background: m.color, opacity: 0.5 }} />
                <span style={{ color: D }}>{m.value}</span>
              </div>
            ))}
          </div>

          {/* Scroll arrow */}
          <div className="mmw-hero mt-16 flex items-center justify-center gap-3" style={{ color: "rgba(0,0,0,0.4)" }}>
            <ArrowDown size={16} />
            <span className="heading text-[11px]" style={{ letterSpacing: 1 }}>SCROLL TO BEGIN</span>
          </div>
        </div>
      </section>

      {/* ══════════ 01 — BRIEF ══════════ */}
      <section id="brief" className="mmw-slide opacity-0" style={{ padding: "120px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
        <div className="container" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            eyebrow="01 — The Brief"
            subtitle="Confirming what we received and what this plan is built against. Nothing here is invented — every reference traces back to the source brief or the assets shared."
          >
            What we have on the table.
          </SectionHead>

          <div className="mmw-stagger grid md:grid-cols-2 gap-6">
            {briefReceived.map((b) => (
              <div key={b.title} className="mmw-item" style={{
                background: "#fff",
                border: "1px solid #EBEBEB",
                borderRadius: 20,
                padding: 32,
                position: "relative",
              }}>
                <div className="flex items-start gap-4 mb-4">
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: `${b.color}15`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <b.icon size={22} style={{ color: b.color }} />
                  </div>
                  <div>
                    <h3 className="heading text-xl mb-1" style={{ color: D }}>{b.title}</h3>
                    <p className="text-[11px]" style={{ color: b.color, letterSpacing: 0.5, textTransform: "uppercase" }}>{b.meta}</p>
                  </div>
                </div>
                <p className="text-sm" style={{ color: "rgba(0,0,0,0.6)", lineHeight: 1.65 }}>{b.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 rounded-2xl" style={{ background: "#FAFAFA", border: "1px solid #F0F0F0" }}>
            <p className="text-[13px]" style={{ color: "rgba(0,0,0,0.55)", lineHeight: 1.65 }}>
              <span className="heading" style={{ color: D }}>Note · </span>
              This plan expands on the brief without inventing scope. Where a decision is recommended rather than received, it is flagged in Section 16 — Confirmed &amp; Open — for confirmation, not assumed.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════ 02 — LANDSCAPE ══════════ */}
      <section id="landscape" className="mmw-slide opacity-0" style={{ padding: "120px 24px", background: "#FAFAFA", borderTop: "1px solid #F0F0F0" }}>
        <div className="container" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            eyebrow="02 — The Landscape"
            subtitle="What the four reference sites give us, what we leave behind, and where we improve on each."
            color={B}
          >
            Reading the references.
          </SectionHead>

          <div className="mmw-stagger grid md:grid-cols-2 gap-6">
            {landscape.map((l) => (
              <div key={l.name} className="mmw-item" style={{
                background: "#fff",
                border: "1px solid #EBEBEB",
                borderRadius: 20,
                padding: 32,
                borderLeft: `4px solid ${l.color}`,
              }}>
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h3 className="heading text-xl mb-1" style={{ color: D }}>{l.name}</h3>
                    <p className="text-[12px]" style={{ color: "rgba(0,0,0,0.4)" }}>{l.url}</p>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 rounded-full" style={{
                    background: `${l.color}15`, color: l.color,
                    letterSpacing: 0.5, textTransform: "uppercase",
                  }}>{l.role}</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="heading text-[11px] mb-1" style={{ color: G, letterSpacing: 0.5 }}>KEEP</p>
                    <p className="text-[13px]" style={{ color: "rgba(0,0,0,0.65)", lineHeight: 1.6 }}>{l.keeps}</p>
                  </div>
                  <div>
                    <p className="heading text-[11px] mb-1" style={{ color: R, letterSpacing: 0.5 }}>DROP</p>
                    <p className="text-[13px]" style={{ color: "rgba(0,0,0,0.65)", lineHeight: 1.6 }}>{l.drops}</p>
                  </div>
                  <div>
                    <p className="heading text-[11px] mb-1" style={{ color: A, letterSpacing: 0.5 }}>IMPROVE</p>
                    <p className="text-[13px]" style={{ color: "rgba(0,0,0,0.65)", lineHeight: 1.6 }}>{l.improves}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 03 — APPROACH ══════════ */}
      <section id="approach" className="mmw-slide opacity-0" style={{ padding: "120px 24px", background: D }}>
        <div className="container" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            eyebrow="03 — The Approach"
            subtitle="Three principles that govern every page on the site. Every IA decision below traces back to one of these."
            color={A}
            light
          >
            How we decide what ships.
          </SectionHead>

          <div className="mmw-stagger grid md:grid-cols-3 gap-6">
            {principles.map((p) => (
              <div key={p.n} className="mmw-item" style={{
                background: p.dark ? "#111" : "#fff",
                border: p.dark ? "1px solid #222" : "1px solid #EBEBEB",
                borderRadius: 20,
                padding: 32,
                position: "relative",
              }}>
                <div className="flex items-start justify-between mb-5">
                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    background: `${p.color}15`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <p.icon size={20} style={{ color: p.color }} />
                  </div>
                  <span className="heading text-xl" style={{ color: p.color }}>{p.n}</span>
                </div>
                <h3 className="heading text-xl mb-2" style={{ color: p.dark ? "#fff" : D }}>{p.title}</h3>
                <p className="text-[13px] mb-4" style={{ color: p.color }}>{p.tagline}</p>
                <p className="text-sm" style={{ color: p.dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)", lineHeight: 1.65 }}>{p.body}</p>
              </div>
            ))}
          </div>

          {/* Mobile-First Conversion Path — audience-aware adaptive */}
          <div className="mt-12">
            <div className="text-center mb-8">
              <p className="mb-2" style={{
                color: G,
                fontFamily: "var(--font-accent), 'Times New Roman', serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(18px, 1.8vw, 22px)",
                letterSpacing: 0.2,
              }}>An additional principle</p>
              <h3 className="heading text-3xl md:text-4xl mb-3" style={{ color: "#fff", lineHeight: 1.3 }}>
                Audience-Aware <span style={{ color: G }}>Adaptive</span> Design.
              </h3>
              <p className="text-sm max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
                Same content, three viewports — but the visual hierarchy and interaction priority adapt to the audience using that screen. Not mobile-first by accident; mobile-first by design where it matters most.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 rounded-2xl overflow-hidden" style={{
              border: "1px solid #222",
              background: "#111",
            }}>
              {[
                { icon: Smartphone, view: "Mobile", audience: "End customers", focus: "B2C discovery", priority: "Lead capture surfaced first — Test Drive · Quote · WhatsApp 9200 above the fold. Conversion is the design goal.", color: G },
                { icon: Layers, view: "Tablet", audience: "Mixed traffic", focus: "Browsing", priority: "Balanced hierarchy — both the brand story and the conversion path are visible without scroll.", color: B },
                { icon: Code2, view: "Desktop", audience: "Corporate, partners, press", focus: "B2B presentation", priority: "Brand narrative and rich media first — full-bleed visuals, editorial flow, showroom and dealer presentation tone.", color: A },
              ].map((b, i) => (
                <div key={b.view} style={{
                  padding: "28px 24px",
                  borderRight: i < 2 ? "1px solid #222" : "none",
                  borderBottom: i < 2 ? "1px solid #222" : "none",
                }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div style={{
                      width: 36, height: 36, borderRadius: 8,
                      background: `${b.color}18`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <b.icon size={16} style={{ color: b.color }} />
                    </div>
                    <div>
                      <p className="heading text-[11px]" style={{ color: b.color, letterSpacing: 1 }}>{b.view.toUpperCase()}</p>
                      <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.5)" }}>{b.audience}</p>
                    </div>
                  </div>
                  <p className="heading text-[11px] mb-2" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: 0.5 }}>{b.focus.toUpperCase()}</p>
                  <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.78)", lineHeight: 1.6 }}>{b.priority}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 04 — INFORMATION ARCHITECTURE ══════════ */}
      <section id="ia" className="mmw-slide opacity-0" style={{ padding: "120px 24px", background: "#fff" }}>
        <div className="container" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            eyebrow="04 — Information Architecture"
            subtitle="The 11 sitemap items from the brief, expanded into a real site map. Each top-level section grows from a single page into a small sub-site so the brand has room to breathe."
            color={P}
          >
            From sitemap to architecture.
          </SectionHead>

          <div className="mmw-stagger space-y-4">
            {iaTree.map((s) => (
              <div key={s.n} className="mmw-item" style={{
                background: "#fff",
                border: "1px solid #EBEBEB",
                borderRadius: 20,
                overflow: "hidden",
                display: "grid",
                gridTemplateColumns: "200px 1fr",
              }}>
                {/* Left rail */}
                <div style={{
                  background: s.color,
                  padding: "32px 24px",
                  color: s.color === A || s.color === G ? D : "#fff",
                }}>
                  <div className="flex items-center gap-2 mb-3">
                    <s.icon size={18} />
                    <span className="heading text-[11px]" style={{ letterSpacing: 0.5 }}>{s.n} · SECTION</span>
                  </div>
                  <h3 className="heading text-xl mb-2" style={{ lineHeight: 1.3 }}>{s.parent}</h3>
                  <p className="text-[11px] font-mono" style={{ opacity: 0.7 }}>{s.parentRoute}</p>
                </div>
                {/* Right content */}
                <div style={{ padding: "32px" }}>
                  <p className="text-sm mb-5" style={{ color: "rgba(0,0,0,0.6)", lineHeight: 1.6 }}>{s.purpose}</p>
                  <div className="space-y-2">
                    {s.children.map((c, i) => (
                      <div key={i} className="flex items-start gap-3 py-2" style={{ borderTop: i === 0 ? "none" : "1px solid #F4F4F4" }}>
                        <span className="text-[12px] font-mono" style={{ color: s.color, minWidth: 180, paddingTop: 2 }}>
                          {c.route}
                        </span>
                        <span className="text-[13px]" style={{ color: "rgba(0,0,0,0.7)", lineHeight: 1.55 }}>{c.note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 rounded-2xl" style={{ background: "#FAFAFA", border: "1px solid #F0F0F0" }}>
            <p className="text-[13px]" style={{ color: "rgba(0,0,0,0.55)", lineHeight: 1.65 }}>
              <span className="heading" style={{ color: D }}>Bilingual prefix · </span>
              Every route above lives under both <code style={{ background: "#fff", padding: "2px 6px", borderRadius: 4, fontFamily: "monospace", fontSize: 11 }}>/en/*</code> and <code style={{ background: "#fff", padding: "2px 6px", borderRadius: 4, fontFamily: "monospace", fontSize: 11 }}>/ar/*</code>. Locale is part of the URL — not a cookie, not a header — so links shared in either language land in the right place.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════ 05 — TEMPLATES ══════════ */}
      <section id="templates" className="mmw-slide opacity-0" style={{ padding: "120px 24px", background: "#FAFAFA", borderTop: "1px solid #F0F0F0" }}>
        <div className="container" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            eyebrow="05 — Page Templates"
            subtitle="Six reusable templates so the site can scale to dozens of pages without re-engaging design. Every new model, offer, or showroom slots into one of these."
            color={G}
          >
            Six templates, one design system.
          </SectionHead>

          <div className="mmw-stagger grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((t) => (
              <div key={t.code} className="mmw-item" style={{
                background: "#fff",
                border: "1px solid #EBEBEB",
                borderRadius: 20,
                padding: 28,
              }}>
                <div className="flex items-center justify-between mb-4">
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: `${t.color}15`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <t.icon size={18} style={{ color: t.color }} />
                  </div>
                  <span className="heading text-[10px] px-2 py-1 rounded" style={{
                    background: "#F4F4F4", color: "rgba(0,0,0,0.6)", letterSpacing: 0.5,
                  }}>{t.code}</span>
                </div>
                <h3 className="heading text-lg mb-2" style={{ color: D }}>{t.name}</h3>
                <p className="text-[12px] mb-4" style={{ color: t.color, lineHeight: 1.5 }}>{t.tagline}</p>
                <ul className="space-y-2">
                  {t.sections.map((sec, i) => (
                    <li key={i} className="flex items-start gap-2 text-[12.5px]" style={{ color: "rgba(0,0,0,0.65)", lineHeight: 1.55 }}>
                      <span style={{ color: t.color, marginTop: 6, fontSize: 8 }}>●</span>
                      <span>{sec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 06 — MAGNETIC LAYER ══════════ */}
      <section id="magnetic" className="mmw-slide opacity-0" style={{ padding: "110px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
        <div className="container" style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Phase 2 banner */}
          <div className="mb-8 mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{
              background: `${R}10`,
              border: `1px dashed ${R}50`,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 3, background: R }} />
              <span className="text-[11px]" style={{ color: R, fontWeight: 600, letterSpacing: 0.5 }}>PHASE 2 · OPTIONAL — OUTSIDE THE 4-WEEK LAUNCH SCOPE</span>
            </div>
          </div>
          <SectionHead
            eyebrow="06 — The Magnetic Layer"
            subtitle="Twelve interactive moments that let a visitor live the car before they touch it. Grouped into three worlds — inside the cabin, around the metal, and beyond it. Presented here as a future enhancement; a working demo of one or two features can be arranged separately on request."
            color={R}
          >
            Step inside another <span style={{ color: R }}>world</span>.
          </SectionHead>

          {/* Three phase-split-cards, one per category */}
          <div className="mmw-stagger flex flex-col gap-7">
            {[
              { key: "Inside the Cabin", num: "01", label: "Inside the cabin", desc: "What happens once they're seated.", color: G, icon: Eye },
              { key: "Outside the Car", num: "02", label: "Outside the car", desc: "What they see before they get in.", color: B, icon: Compass },
              { key: "Beyond the Metal", num: "03", label: "Beyond the metal", desc: "Experience and intelligence layered on top.", color: P, icon: Sparkles },
            ].map((cat) => {
              const features = magnetic.filter((m) => m.category === cat.key);
              return (
                <div key={cat.key} className="mmw-item rounded-[24px] overflow-hidden" style={{
                  border: `2px solid ${cat.color}25`,
                  boxShadow: `4px 4px 0px 0px ${cat.color}25`,
                  background: "#fff",
                }}>
                  <div className="flex flex-col md:flex-row">
                    {/* LEFT — colored sidebar */}
                    <div className="md:w-[240px] flex-shrink-0 p-7 flex flex-col justify-between" style={{
                      background: cat.color,
                      color: cat.color === A || cat.color === G ? D : "#fff",
                    }}>
                      <div>
                        <div className="flex items-center gap-2 mb-3" style={{ opacity: 0.85 }}>
                          <cat.icon size={16} />
                          <span className="heading text-[11px]" style={{ letterSpacing: 1 }}>World {cat.num}</span>
                        </div>
                        <h3 className="heading text-2xl mb-2" style={{ lineHeight: 1.3 }}>{cat.label}</h3>
                        <p className="text-[12.5px]" style={{ opacity: 0.85, lineHeight: 1.55 }}>{cat.desc}</p>
                      </div>
                      <div className="mt-6 pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.12)" }}>
                        <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold" style={{
                          background: "rgba(255,255,255,0.18)",
                          color: cat.color === A || cat.color === G ? D : "#fff",
                          letterSpacing: 0.5,
                        }}>
                          {features.length} features
                        </span>
                      </div>
                    </div>

                    {/* RIGHT — features grid */}
                    <div className="flex-1 p-7 grid grid-cols-1 md:grid-cols-2 gap-5">
                      {features.map((m) => (
                        <div key={m.n} className="flex items-start gap-3 p-4 rounded-[14px]" style={{
                          border: `1px solid ${cat.color}20`,
                          background: "#fff",
                        }}>
                          <div style={{
                            width: 38, height: 38, borderRadius: 10,
                            background: `${cat.color}12`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0,
                          }}>
                            <m.icon size={16} style={{ color: cat.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-2 mb-1">
                              <h4 className="heading text-[14px]" style={{ color: D, lineHeight: 1.3 }}>{m.name}</h4>
                              <span className="text-[10px] font-mono" style={{ color: "rgba(0,0,0,0.3)" }}>{m.n}</span>
                            </div>
                            <p className="text-[12px] mb-2" style={{ color: cat.color, lineHeight: 1.45 }}>{m.tagline}</p>
                            <p className="text-[12px]" style={{ color: "rgba(0,0,0,0.6)", lineHeight: 1.55 }}>{m.body}</p>
                            <p className="text-[10.5px] mt-2 pt-2" style={{ color: "rgba(0,0,0,0.45)", borderTop: "1px solid #F4F4F4" }}>
                              <span style={{ color: D, fontWeight: 600 }}>How · </span>{m.tech}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Closing pill */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full" style={{
              background: G,
              color: D,
              border: `2px solid ${D}`,
              boxShadow: `4px 4px 0px 0px ${D}`,
              fontWeight: 700,
              fontSize: 13,
            }}>
              <Sparkles size={14} />
              <span>Pick three, pick all twelve, or pick none — every feature is independently buildable.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 07 — MODEL DETAIL ══════════ */}
      <section id="model" className="mmw-slide opacity-0" style={{ padding: "120px 24px", background: "#fff" }}>
        <div className="container" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            eyebrow="07 — The Model Page"
            subtitle="The sample model in the brief is the universal template. Every block below applies, in order, to S06 · S06DM · S07 · S08DM · S09 and to any future model added to the lineup."
            color={B}
          >
            One template, every model.
          </SectionHead>

          <div className="mmw-stagger space-y-3">
            {modelBlocks.map((m) => (
              <div key={m.n} className="mmw-item flex items-start gap-5 p-5 rounded-2xl" style={{
                background: "#fff",
                border: "1px solid #EBEBEB",
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: `${m.color}15`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <m.icon size={22} style={{ color: m.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="heading text-[11px]" style={{ color: m.color, letterSpacing: 0.5 }}>{m.n}</span>
                    <h3 className="heading text-base" style={{ color: D }}>{m.block}</h3>
                  </div>
                  <p className="text-[13px]" style={{ color: "rgba(0,0,0,0.6)", lineHeight: 1.6 }}>{m.sample}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 rounded-2xl" style={{ background: "#FAFAFA", border: "1px solid #F0F0F0" }}>
            <p className="text-[13px]" style={{ color: "rgba(0,0,0,0.55)", lineHeight: 1.65 }}>
              <span className="heading" style={{ color: D }}>Sourced from the brief · </span>
              All sample copy in the blocks above is drawn from the sample model included in the website content document. The launch lineup — S06 · S06DM · S07 · S08DM · S09 — follows the same structure with its own copy and assets per model.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════ 08 — LEAD ENGINE ══════════ */}
      <section id="leads" className="mmw-slide opacity-0" style={{ padding: "120px 24px", background: D }}>
        <div className="container" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            eyebrow="08 — The Lead Engine"
            subtitle="Five paths in, one CRM record out. The site does not let a visit end without offering a route to a conversation — including the Phase 1 e-Commerce layer (Online Reservation)."
            color={G}
            light
          >
            How the site captures a lead.
          </SectionHead>

          <div className="mmw-stagger grid md:grid-cols-2 gap-6">
            {leadPaths.map((l) => (
              <div key={l.n} className="mmw-item" style={{
                background: "#111",
                border: "1px solid #222",
                borderRadius: 20,
                padding: 32,
              }}>
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div style={{
                      width: 44, height: 44, borderRadius: 10,
                      background: `${l.color}22`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <l.icon size={20} style={{ color: l.color }} />
                    </div>
                    <div>
                      <p className="heading text-[10px]" style={{ color: l.color, letterSpacing: 0.5 }}>{l.n}</p>
                      <h3 className="heading text-lg" style={{ color: "#fff" }}>{l.name}</h3>
                    </div>
                  </div>
                </div>
                <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>{l.body}</p>
                <div className="mb-4">
                  <p className="heading text-[10px] mb-2" style={{ color: l.color, letterSpacing: 0.5 }}>FIELDS CAPTURED</p>
                  <ul className="space-y-1">
                    {l.fields.map((f, i) => (
                      <li key={i} className="text-[12px]" style={{ color: "rgba(255,255,255,0.7)" }}>
                        · {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4 mt-4" style={{ borderTop: "1px solid #222" }}>
                  <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                    <Clock size={11} style={{ display: "inline", marginRight: 4, marginTop: -2 }} />
                    SLA · {l.sla}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 rounded-2xl" style={{ background: "#111", border: "1px solid #222" }}>
            <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>
              <span className="heading" style={{ color: G }}>Existing infrastructure · </span>
              The Test Drive booking flow extends the Motion Motors event-system that&apos;s already live (Next.js 16 + Supabase, AR/EN, queue + admin dashboard, status state machine). The website inherits that schema rather than building a parallel one.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════ 09 — FINANCE CALCULATOR ══════════ */}
      <section id="finance" className="mmw-slide opacity-0" style={{ padding: "120px 24px", background: "#fff" }}>
        <div className="container" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            eyebrow="09 — Finance Calculator"
            subtitle="A generic, bank-agnostic estimator. No fixed bank tariff, no insurance bundling, no commitment. The result is an indicative monthly figure for guidance only; the sales team handles the actual financing pathway with the customer."
            color={P}
          >
            A generic, bank-agnostic <span style={{ color: P }}>estimator</span>.
          </SectionHead>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="heading text-xl mb-5" style={{ color: D }}>Inputs</h3>
              <div className="space-y-3">
                {financeInputs.map((f) => (
                  <div key={f.label} className="flex items-center justify-between p-4 rounded-xl" style={{
                    background: "#fff", border: "1px solid #EBEBEB",
                  }}>
                    <div className="flex items-center gap-3">
                      <div style={{ width: 8, height: 8, borderRadius: 4, background: f.color }} />
                      <div>
                        <p className="text-sm" style={{ color: D }}>{f.label}</p>
                        <p className="text-[11px]" style={{ color: "rgba(0,0,0,0.45)" }}>{f.type}</p>
                      </div>
                    </div>
                    <span className="text-[12px] font-mono px-2 py-1 rounded" style={{ background: "#F4F4F4", color: D }}>
                      {f.default}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="heading text-xl mb-5" style={{ color: D }}>Outputs</h3>
              <div className="space-y-3">
                {financeOutputs.map((f) => (
                  <div key={f.label} className="p-5 rounded-xl" style={{
                    background: f.color === G ? `${G}10` : "#fff",
                    border: `1px solid ${f.color === G ? G : "#EBEBEB"}`,
                  }}>
                    <p className="heading text-[10px] mb-1" style={{ color: f.color, letterSpacing: 0.5 }}>{f.label.toUpperCase()}</p>
                    <p className="heading text-2xl" style={{ color: D }}>{f.sample}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* T&Cs disclaimer — always visible under the result */}
          <div className="mt-8 p-5 rounded-2xl flex items-start gap-3" style={{
            background: `${A}10`,
            border: `1px solid ${A}40`,
          }}>
            <AlertCircle size={18} style={{ color: A, marginTop: 2, flexShrink: 0 }} />
            <div>
              <p className="heading text-[11px] mb-1.5" style={{ color: A, letterSpacing: 0.5 }}>Always shown under the result</p>
              <p className="text-[13px]" style={{ color: D, lineHeight: 1.6 }}>
                Estimated values for guidance only. Actual rates, insurance, and terms depend on the financing partner and your eligibility. T&amp;Cs apply.
              </p>
            </div>
          </div>

          <div className="mt-6 p-6 rounded-2xl" style={{ background: "#FAFAFA", border: "1px solid #F0F0F0" }}>
            <p className="text-[13px]" style={{ color: "rgba(0,0,0,0.6)", lineHeight: 1.65 }}>
              <span className="heading" style={{ color: D }}>How it behaves · </span>
              The calculator is intentionally bank-agnostic. It accepts price (or model + trim), down payment percentage, and tenure in months — and returns an indicative monthly figure. There is no insurance bundle, no fixed-interest claim, and no commitment. After calculating, the user is invited to share their details so the sales team can present the real options from the available financing partners.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════ 10 — AFTER-SALES ══════════ */}
      <section id="aftersales" className="mmw-slide opacity-0" style={{ padding: "120px 24px", background: "#FAFAFA", borderTop: "1px solid #F0F0F0" }}>
        <div className="container" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            eyebrow="10 — After-Sales"
            subtitle="The relationship after the keys change hands. Five modules that turn a customer into a returning customer."
            color={G}
          >
            From delivery to year ten.
          </SectionHead>

          {/* Trust stats row */}
          <div className="grid grid-cols-3 gap-0 mb-12" style={{ borderTop: "1px solid #EBEBEB", borderBottom: "1px solid #EBEBEB" }}>
            {trustItems.map((t, i) => (
              <div key={t.sub} style={{
                padding: "32px 20px",
                borderRight: i < trustItems.length - 1 ? "1px solid #EBEBEB" : "none",
                textAlign: "center",
              }}>
                <div className="heading text-5xl md:text-6xl mb-1" style={{ color: t.color }}>{t.n}</div>
                <div className="text-[12px]" style={{ color: "rgba(0,0,0,0.55)" }}>{t.sub}</div>
              </div>
            ))}
          </div>

          <div className="mmw-stagger grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aftersales.map((a) => (
              <div key={a.name} className="mmw-item" style={{
                background: "#fff",
                border: "1px solid #EBEBEB",
                borderRadius: 20,
                padding: 28,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: `${a.color}15`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 16,
                }}>
                  <a.icon size={20} style={{ color: a.color }} />
                </div>
                <h3 className="heading text-lg mb-1" style={{ color: D }}>{a.name}</h3>
                <p className="text-[12px] mb-3" style={{ color: a.color }}>{a.tagline}</p>
                <p className="text-[13px]" style={{ color: "rgba(0,0,0,0.6)", lineHeight: 1.6 }}>{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 11 — BILINGUAL ══════════ */}
      <section id="bilingual" className="mmw-slide opacity-0" style={{ padding: "120px 24px", background: "#fff" }}>
        <div className="container" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            eyebrow="11 — Bilingual & Localization"
            subtitle="AR and EN are first-class. Both are built into the foundation, not patched on top."
            color={B}
          >
            Built bilingual at the root.
          </SectionHead>

          <div className="mmw-stagger grid md:grid-cols-2 gap-6">
            {i18nApproach.map((i) => (
              <div key={i.topic} className="mmw-item" style={{
                background: "#fff",
                border: "1px solid #EBEBEB",
                borderRadius: 20,
                padding: 28,
              }}>
                <div className="flex items-center gap-3 mb-4">
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: `${i.color}15`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <i.icon size={18} style={{ color: i.color }} />
                  </div>
                  <h3 className="heading text-lg" style={{ color: D }}>{i.topic}</h3>
                </div>
                <p className="text-[14px] mb-3" style={{ color: D, lineHeight: 1.55 }}>
                  <span className="heading text-[11px]" style={{ color: i.color, letterSpacing: 0.5 }}>DECISION · </span>
                  {i.decision}
                </p>
                <p className="text-[12.5px]" style={{ color: "rgba(0,0,0,0.55)", lineHeight: 1.6 }}>
                  <span className="heading text-[11px]" style={{ color: "rgba(0,0,0,0.4)", letterSpacing: 0.5 }}>RATIONALE · </span>
                  {i.rationale}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 12 — STACK ══════════ */}
      <section id="stack" className="mmw-slide opacity-0" style={{ padding: "120px 24px", background: "#FAFAFA", borderTop: "1px solid #F0F0F0" }}>
        <div className="container" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            eyebrow="12 — Tech Stack"
            subtitle="What we build with and why. Choices favor what's already in production at Motion Motors over greenfield reinvention."
            color={A}
          >
            Stack & integrations.
          </SectionHead>

          {/* Hybrid Rendering breakdown — answers the "SSR or SPA?" question */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <p className="mb-2" style={{
                color: A,
                fontFamily: "var(--font-accent), 'Times New Roman', serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(18px, 1.8vw, 22px)",
              }}>Web architecture</p>
              <h3 className="heading text-2xl md:text-3xl mb-2" style={{ color: D, lineHeight: 1.3 }}>
                Hybrid Rendering <span style={{ color: A }}>via Next.js 16</span>.
              </h3>
              <p className="text-sm max-w-2xl mx-auto" style={{ color: "rgba(0,0,0,0.55)" }}>
                Not SPA (SEO suffers). Not pure SSR (interactivity lags). Not pure SSG (no logged-in data). Each page type uses the rendering mode that fits it best — all in one codebase.
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #EBEBEB", background: "#fff" }}>
              {[
                { type: "Marketing pages", examples: "Brand, About, Tech narrative", mode: "SSG", note: "Static at build time. Instant load, infinite cache.", color: G },
                { type: "Model + Offer pages", examples: "/models/[slug], /offers/[slug]", mode: "SSR + ISR", note: "Server-rendered for SEO, revalidates every X minutes when content changes.", color: B },
                { type: "Owner Dashboard", examples: "/account/*, /account/garage", mode: "Client (post-auth)", note: "Dynamic per user, behind login. No SEO needed.", color: P },
                { type: "Calculator + Configurators", examples: "Finance, color picker, reservation flow", mode: "Client Components", note: "Real-time interactivity, runs in the browser.", color: A },
                { type: "Forms + APIs", examples: "Quote, Test Drive, Reservation submit", mode: "Server Actions", note: "Server-side, secure, type-safe end-to-end.", color: R },
              ].map((r, i) => (
                <div key={r.type} className="grid grid-cols-12 gap-4 items-center" style={{
                  padding: "18px 24px",
                  borderTop: i > 0 ? "1px solid #F4F4F4" : "none",
                }}>
                  <div className="col-span-12 md:col-span-4">
                    <p className="heading text-[14px] mb-0.5" style={{ color: D }}>{r.type}</p>
                    <p className="text-[11px] font-mono" style={{ color: "rgba(0,0,0,0.45)" }}>{r.examples}</p>
                  </div>
                  <div className="col-span-12 md:col-span-3">
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold" style={{
                      background: `${r.color}15`,
                      color: r.color,
                      border: `1px solid ${r.color}30`,
                    }}>{r.mode}</span>
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <p className="text-[12.5px]" style={{ color: "rgba(0,0,0,0.65)", lineHeight: 1.5 }}>{r.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mmw-stagger grid md:grid-cols-2 gap-6">
            {stack.map((s) => (
              <div key={s.cat} className="mmw-item" style={{
                background: "#fff",
                border: "1px solid #EBEBEB",
                borderRadius: 20,
                padding: 32,
              }}>
                <div className="flex items-start gap-4 mb-5">
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: `${s.color}15`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <s.icon size={22} style={{ color: s.color }} />
                  </div>
                  <div>
                    <h3 className="heading text-xl" style={{ color: D }}>{s.cat}</h3>
                    <p className="text-[12px]" style={{ color: s.color }}>{s.sub}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {s.items.map((it, i) => {
                    const Fallback = it.fallbackIcon;
                    return (
                      <div key={i} className="flex items-start gap-3 pb-3" style={{
                        borderBottom: i < s.items.length - 1 ? "1px solid #F4F4F4" : "none",
                      }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: 9,
                          background: "#FAFAFA",
                          border: "1px solid #EBEBEB",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0,
                          padding: 6,
                        }}>
                          {it.logo ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={it.logo} alt={it.tech} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                          ) : Fallback ? (
                            <Fallback size={16} style={{ color: s.color }} />
                          ) : null}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="heading text-[13px] mb-0.5" style={{ color: D }}>{it.tech}</p>
                          <p className="text-[12px]" style={{ color: "rgba(0,0,0,0.55)", lineHeight: 1.55 }}>{it.use}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 13 — BRAND ══════════ */}
      <section id="brand" className="mmw-slide opacity-0" style={{ padding: "120px 24px", background: "#fff" }}>
        <div className="container" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            eyebrow="13 — Brand System"
            subtitle="Four pillars that translate the Motion Motors logo into a web design language. Restrained, not decorative."
            color={P}
          >
            The brand on the web.
          </SectionHead>

          <div className="mmw-stagger grid md:grid-cols-2 gap-6">
            {brandPillars.map((p) => (
              <div key={p.n} className="mmw-item" style={{
                background: "#fff",
                border: "1px solid #EBEBEB",
                borderRadius: 20,
                padding: 32,
              }}>
                <div className="flex items-start justify-between mb-4">
                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    background: `${p.color}15`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <p.icon size={20} style={{ color: p.color }} />
                  </div>
                  <span className="heading text-2xl" style={{ color: p.color }}>{p.n}</span>
                </div>
                <h3 className="heading text-xl mb-2" style={{ color: D }}>{p.pillar}</h3>
                <p className="text-[12px] mb-3 font-mono" style={{ color: "rgba(0,0,0,0.55)" }}>{p.spec}</p>
                <p className="text-sm" style={{ color: "rgba(0,0,0,0.6)", lineHeight: 1.6 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 14 — ONE-MONTH CALENDAR ══════════ */}
      <section id="phases" className="mmw-slide opacity-0" style={{ padding: "110px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
        <div className="container" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            eyebrow="14 — The Launch Calendar"
            subtitle="One month. Four weekly sprints. Each ends with a milestone you can verify — not a status update you have to interpret."
            color={G}
          >
            Four weeks from kickoff to <span style={{ color: G }}>live</span>.
          </SectionHead>

          {/* Top stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mb-12 rounded-[20px] overflow-hidden" style={{ border: "1px solid #EBEBEB" }}>
            {[
              { n: "4", sub: "Weekly sprints", color: G },
              { n: "20", sub: "Working days", color: B },
              { n: "AR · EN", sub: "Shipped bilingual", color: A },
              { n: "Week 4", sub: "Launch milestone", color: P },
            ].map((s, i) => (
              <div key={s.sub} style={{
                padding: "26px 20px",
                borderRight: i < 3 ? "1px solid #EBEBEB" : "none",
                textAlign: "center",
                background: "#fff",
              }}>
                <div className="heading text-3xl md:text-4xl mb-1" style={{ color: s.color }}>{s.n}</div>
                <div className="text-[12px]" style={{ color: "rgba(0,0,0,0.5)" }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Four phase split-cards, stacked vertically */}
          <div className="mmw-stagger flex flex-col gap-6">
            {weekPlan.map((w) => (
              <div key={w.n} className="mmw-item rounded-[24px] overflow-hidden" style={{
                border: `2px solid ${w.color}25`,
                boxShadow: `4px 4px 0px 0px ${w.color}25`,
                background: "#fff",
              }}>
                <div className="flex flex-col md:flex-row">
                  {/* LEFT — colored sidebar */}
                  <div className="md:w-[220px] flex-shrink-0 p-7 flex flex-col justify-between" style={{
                    background: w.color,
                    color: w.color === A || w.color === G ? D : "#fff",
                  }}>
                    <div>
                      <div className="flex items-center gap-2 mb-3" style={{ opacity: 0.85 }}>
                        <w.icon size={16} />
                        <span className="heading text-[11px]" style={{ letterSpacing: 1 }}>Week {w.n}</span>
                      </div>
                      <h3 className="heading text-2xl mb-2" style={{ lineHeight: 1.3 }}>{w.title}</h3>
                      <p className="text-[12.5px]" style={{ opacity: 0.85, lineHeight: 1.55 }}>{w.theme}</p>
                    </div>
                    <div className="mt-6 pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.12)" }}>
                      <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold" style={{
                        background: "rgba(255,255,255,0.18)",
                        color: w.color === A || w.color === G ? D : "#fff",
                        letterSpacing: 0.5,
                      }}>
                        1 week sprint
                      </span>
                    </div>
                  </div>

                  {/* RIGHT — outcomes + milestone */}
                  <div className="flex-1 p-7 bg-white flex flex-col">
                    <p className="heading text-[11px] mb-4" style={{ color: w.color, letterSpacing: 1 }}>What ships</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 mb-6">
                      {w.outcomes.map((o, j) => (
                        <div key={j} className="flex items-start gap-2.5">
                          <CheckCircle2 size={15} style={{ color: w.color, marginTop: 2, flexShrink: 0 }} />
                          <span className="text-[13px]" style={{ color: D, lineHeight: 1.5 }}>{o}</span>
                        </div>
                      ))}
                    </div>

                    {/* Milestone bar — color-tinted highlight */}
                    <div className="mt-auto p-4 rounded-[12px] flex items-start gap-3" style={{
                      background: `${w.color}10`,
                      border: `1px solid ${w.color}25`,
                    }}>
                      <BadgeCheck size={16} style={{ color: w.color, marginTop: 2, flexShrink: 0 }} />
                      <div>
                        <p className="heading text-[11px] mb-1" style={{ color: w.color, letterSpacing: 0.5 }}>End-of-week milestone</p>
                        <p className="text-[12.5px]" style={{ color: D, lineHeight: 1.5 }}>{w.milestone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Client-side deliverables table */}
          <div className="mt-14">
            <div className="text-center mb-6">
              <p className="mb-2" style={{
                color: A,
                fontFamily: "var(--font-accent), 'Times New Roman', serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(18px, 1.8vw, 22px)",
              }}>What the timeline depends on</p>
              <h3 className="heading text-2xl md:text-3xl mb-2" style={{ color: D, lineHeight: 1.3 }}>
                Client-side <span style={{ color: A }}>deliverables</span>.
              </h3>
              <p className="text-sm max-w-2xl mx-auto" style={{ color: "rgba(0,0,0,0.55)" }}>
                The four-week launch only holds if approved content, translations, media assets, and feedback land on time. Each row below has an owner (Motion Motors) and a deadline relative to the week it unblocks.
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #EBEBEB", background: "#fff" }}>
              {[
                { week: "Pre-W1", color: "#666", deliverable: "FSD sign-off (DMS layer)", owner: "Motion Motors PM + Tech lead", blocks: "All of Week 1 — Foundation" },
                { week: "W1", color: G, deliverable: "Brand assets · final logo files, colors, fonts, photography guidelines", owner: "Motion Motors brand team", blocks: "Design system v1" },
                { week: "W1", color: G, deliverable: "Domain access · motionmotors DNS + mailbox provisioning", owner: "Motion Motors IT", blocks: "CI/CD + email integrations" },
                { week: "W2", color: B, deliverable: "Model copy (AR + EN) for S06 · S06DM · S07 · S08DM · S09", owner: "Motion Motors marketing", blocks: "Model detail pages" },
                { week: "W2", color: B, deliverable: "Model photography pack · exterior + interior + 360° (Soueast Hub)", owner: "Motion Motors marketing", blocks: "Model galleries" },
                { week: "W2", color: B, deliverable: "Showroom Jeddah content · address, hours, team photos, map embed", owner: "Showroom manager", blocks: "Showroom page" },
                { week: "W3", color: A, deliverable: "Active offers copy + visual mock per offer", owner: "Motion Motors marketing", blocks: "Offers index + offer details" },
                { week: "W3", color: A, deliverable: "CRM endpoint or webhook URL for lead forwarding", owner: "Motion Motors IT", blocks: "Lead Engine integration" },
                { week: "W3", color: A, deliverable: "Reservation deposit policy + refund T&Cs", owner: "Motion Motors legal + sales", blocks: "Online Reservation flow" },
                { week: "W4", color: P, deliverable: "Privacy Policy + Terms of Service final text (AR + EN)", owner: "Motion Motors legal", blocks: "SDAIA compliance pass" },
                { week: "W4", color: P, deliverable: "QA sign-off on every page (AR + EN)", owner: "Motion Motors PM", blocks: "Launch" },
              ].map((d, i) => (
                <div key={i} className="grid grid-cols-12 gap-4 items-center" style={{
                  padding: "16px 24px",
                  borderTop: i > 0 ? "1px solid #F4F4F4" : "none",
                }}>
                  <div className="col-span-3 md:col-span-2">
                    <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold" style={{
                      background: `${d.color}15`,
                      color: d.color,
                      border: `1px solid ${d.color}30`,
                    }}>{d.week}</span>
                  </div>
                  <div className="col-span-9 md:col-span-5">
                    <p className="text-[13px]" style={{ color: D, lineHeight: 1.5 }}>{d.deliverable}</p>
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <p className="text-[12px]" style={{ color: "rgba(0,0,0,0.55)" }}>
                      <span style={{ color: d.color, fontWeight: 600 }}>Owner · </span>{d.owner}
                    </p>
                  </div>
                  <div className="col-span-6 md:col-span-2 md:text-right">
                    <p className="text-[11px]" style={{ color: "rgba(0,0,0,0.5)" }}>
                      <span style={{ color: "rgba(0,0,0,0.35)" }}>Blocks · </span>{d.blocks}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Closing pill */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full" style={{
              background: G,
              color: D,
              border: `2px solid ${D}`,
              boxShadow: `4px 4px 0px 0px ${D}`,
              fontWeight: 700,
              fontSize: 13,
            }}>
              <Clock size={14} />
              <span>Total · 4 weeks from kickoff to live, AR + EN at launch.</span>
            </div>
          </div>

          {/* Pace note */}
          <div className="mt-8 p-6 rounded-2xl" style={{ background: "#FAFAFA", border: "1px solid #F0F0F0" }}>
            <p className="text-[13px]" style={{ color: "rgba(0,0,0,0.6)", lineHeight: 1.65 }}>
              <span className="heading" style={{ color: D }}>Pace · </span>
              A four-week build assumes the deliverables above land per the table. Where information is missing in Week 1, the related deliverable shifts to the next available slot. The single open item remaining — the FSD sign-off in Section 16 — must close before Week 1 starts.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════ 15 — SDAIA COMPLIANCE & PDPL ══════════ */}
      <section id="compliance" className="mmw-slide opacity-0" style={{ padding: "120px 24px", background: "#FAFAFA", borderTop: "1px solid #F0F0F0" }}>
        <div className="container" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            eyebrow="15 — SDAIA Compliance & PDPL"
            subtitle="The site complies with the Saudi Personal Data Protection Law (PDPL) under SDAIA. Eight controls — built into the foundation, not bolted on at the end."
            color={P}
          >
            Built to comply with <span style={{ color: P }}>PDPL</span>.
          </SectionHead>

          <div className="mmw-stagger grid md:grid-cols-2 gap-5">
            {[
              { n: "01", title: "Cookie Consent Banner", icon: ShieldCheck, body: "Granular consent on first visit (Necessary · Analytics · Marketing). User can revisit and change their choices any time from a persistent footer link.", color: G },
              { n: "02", title: "Privacy Policy (AR + EN)", icon: BookOpen, body: "Full bilingual policy in plain language. Accessible from every page footer. Last-updated timestamp visible to users.", color: B },
              { n: "03", title: "Granular Form Consent", icon: CheckCircle2, body: "Every form has separate consents — one required for processing the request, one optional per marketing channel (SMS, WhatsApp, Email). Never bundled.", color: A },
              { n: "04", title: "Data Subject Rights", icon: BadgeCheck, body: "In the owner account: Access (download my data), Rectification (edit my profile), Erasure (delete my account), Withdraw consent (opt out of marketing).", color: P },
              { n: "05", title: "Data Residency · KSA / GCC", icon: MapPin, body: "All customer data stored on infrastructure in KSA or nearest GCC region. No transfer outside the region without explicit consent and a legal basis.", color: G },
              { n: "06", title: "Consent Audit Log", icon: FileText, body: "Every consent action stamped with timestamp + IP + user agent. Retrievable on regulator request. Immutable record on the back-end.", color: B },
              { n: "07", title: "Data Breach Notification", icon: AlertCircle, body: "Internal process to notify SDAIA within 72 hours of a confirmed breach, plus affected users via SMS + Email. Pre-drafted templates ready.", color: R },
              { n: "08", title: "Marketing Lists · Opt-In Only", icon: Send, body: "No pre-checked boxes. No opt-out by default. Every SMS / WhatsApp / Email includes a one-tap unsubscribe link tied to the consent log.", color: A },
            ].map((c) => (
              <div key={c.n} className="mmw-item" style={{
                background: "#fff",
                border: "1px solid #EBEBEB",
                borderRadius: 16,
                padding: 22,
              }}>
                <div className="flex items-start gap-4">
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: `${c.color}15`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <c.icon size={18} style={{ color: c.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 mb-1.5">
                      <span className="heading text-[10px]" style={{ color: c.color, letterSpacing: 0.5 }}>{c.n}</span>
                      <h4 className="heading text-[14px]" style={{ color: D }}>{c.title}</h4>
                    </div>
                    <p className="text-[12.5px]" style={{ color: "rgba(0,0,0,0.6)", lineHeight: 1.6 }}>{c.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 rounded-2xl" style={{ background: `${P}08`, border: `1px solid ${P}25` }}>
            <p className="text-[13px]" style={{ color: "rgba(0,0,0,0.65)", lineHeight: 1.65 }}>
              <span className="heading" style={{ color: P }}>Out of scope here · </span>
              SDAIA Data Protection Officer (DPO) appointment, formal ROPA documentation, and any third-party data processor agreements (DPAs) sit with our legal team. The website provides the technical foundation that supports those obligations; the formal artefacts remain owned by legal.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════ 16 — CONFIRMED + OPEN ══════════ */}
      <section id="open" className="mmw-slide opacity-0" style={{ padding: "120px 24px", background: "#fff" }}>
        <div className="container" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead
            eyebrow="16 — Confirmed & Open"
            subtitle="A status snapshot after the leadership review round on May 19. Most of what was open in the first draft is now locked. One item remains — the FSD for the DMS layer."
            color={B}
          >
            What is locked, what is still <span style={{ color: G }}>open</span>.
          </SectionHead>

          {/* CONFIRMED ITEMS */}
          <div className="mb-12">
            <div className="flex items-baseline justify-between pb-3 mb-6" style={{ borderBottom: "1px solid #EBEBEB" }}>
              <div className="flex items-baseline gap-3">
                <span style={{ display: "inline-block", width: 24, height: 3, background: G, transform: "translateY(-3px)" }} />
                <h3 className="heading text-lg" style={{ color: D }}>Confirmed by leadership</h3>
              </div>
              <span className="text-[11px] font-mono" style={{ color: "rgba(0,0,0,0.4)" }}>{confirmedItems.length} items · locked</span>
            </div>

            <div className="mmw-stagger grid md:grid-cols-2 gap-4">
              {confirmedItems.map((o) => (
                <div key={o.n} className="mmw-item" style={{
                  background: "#fff",
                  border: "1px solid #EBEBEB",
                  borderRadius: 16,
                  padding: 22,
                }}>
                  <div className="flex items-start gap-4">
                    <div style={{
                      width: 36, height: 36, borderRadius: 8,
                      background: `${o.color}15`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <o.icon size={16} style={{ color: o.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="heading text-[10px]" style={{ color: o.color, letterSpacing: 0.5 }}>{o.n}</span>
                        <h4 className="heading text-[14px]" style={{ color: D }}>{o.topic}</h4>
                        <CheckCircle2 size={13} style={{ color: G, marginLeft: "auto" }} />
                      </div>
                      <p className="text-[12.5px]" style={{ color: "rgba(0,0,0,0.65)", lineHeight: 1.55 }}>{o.decision}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STILL PENDING */}
          <div>
            <div className="flex items-baseline justify-between pb-3 mb-6" style={{ borderBottom: "1px solid #EBEBEB" }}>
              <div className="flex items-baseline gap-3">
                <span style={{ display: "inline-block", width: 24, height: 3, background: B, transform: "translateY(-3px)" }} />
                <h3 className="heading text-lg" style={{ color: D }}>Still open</h3>
              </div>
              <span className="text-[11px] font-mono" style={{ color: "rgba(0,0,0,0.4)" }}>{stillPending.length} item · pending</span>
            </div>

            <div className="mmw-stagger grid md:grid-cols-1 gap-4">
              {stillPending.map((o) => (
                <div key={o.n} className="mmw-item" style={{
                  background: "#fff",
                  border: `2px solid ${o.color}25`,
                  borderRadius: 16,
                  padding: 24,
                  boxShadow: `4px 4px 0px 0px ${o.color}15`,
                }}>
                  <div className="flex items-start gap-4">
                    <div style={{
                      width: 44, height: 44, borderRadius: 10,
                      background: `${o.color}15`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <o.icon size={18} style={{ color: o.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-3 mb-1.5">
                        <span className="heading text-[11px]" style={{ color: o.color, letterSpacing: 0.5 }}>OPEN · {o.n}</span>
                        <h4 className="heading text-base" style={{ color: D }}>{o.topic}</h4>
                      </div>
                      <p className="text-[14px] mb-2" style={{ color: D, lineHeight: 1.55 }}>{o.question}</p>
                      <p className="text-[12.5px] mb-4" style={{ color: "rgba(0,0,0,0.55)", lineHeight: 1.6 }}>
                        <span style={{ color: o.color, fontWeight: 600 }}>What it covers · </span>
                        {o.needed}
                      </p>
                      <a href="/motionmotors-website/fsd" className="inline-flex items-center gap-2 px-4 py-2 rounded-full no-underline" style={{
                        background: o.color,
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: 700,
                        boxShadow: `3px 3px 0px 0px ${D}`,
                        border: `2px solid ${D}`,
                        transition: "transform 200ms",
                      }}>
                        <FileText size={13} />
                        <span>Open the FSD · v0.1 Draft</span>
                        <ArrowRight size={13} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 p-10 rounded-2xl text-center" style={{ background: D, color: "#fff" }}>
            {/* Logos row — white */}
            <div className="flex items-center justify-center gap-8 mb-8 pb-8" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <Image
                src="/motionmotors/logo-dark-bg.png"
                alt="Motion Motors"
                width={200}
                height={34}
                style={{ height: 34, width: "auto", objectFit: "contain" }}
              />
              <span style={{ width: 1, height: 28, background: "rgba(255,255,255,0.15)" }} />
              <Image
                src="/motionmotors/soueast.png"
                alt="Soueast"
                width={350}
                height={70}
                style={{ height: 64, width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }}
              />
            </div>

            <h3 className="heading text-2xl md:text-3xl mb-3" style={{ color: "#fff", lineHeight: 1.3 }}>Ready to kick off.</h3>
            <p className="text-sm mb-8 max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
              The IA in Section 04 and the open items in Section 16 are the gates before Week 1 starts. Comments and questions land directly to me — happy to walk through any section internally before we move.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[12px]" style={{ color: "rgba(255,255,255,0.5)" }}>
              <span>
                <Mail size={11} style={{ display: "inline", marginRight: 6, marginTop: -2 }} />
                Ahmed.ali@emotiongrp.com
              </span>
              <span>
                <Calendar size={11} style={{ display: "inline", marginRight: 6, marginTop: -2 }} />
                Issued May 17, 2026
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer style={{ padding: "40px 24px", background: D, borderTop: "1px solid #222", color: "rgba(255,255,255,0.4)" }}>
        <div className="container flex flex-wrap items-center justify-between gap-4 text-[11px]" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span>Motion Motors × Soueast · Website Plan</span>
          <span>Ahmed Ali · Head of Digital &amp; Growth Lead</span>
          <span>End of document</span>
        </div>
      </footer>
    </div>
  );
}


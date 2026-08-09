"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MotionMotorsFSDNav from "@/components/MotionMotorsFSDNav";
import {
  ArrowDown, ArrowRight, FileText, BookOpen, Network, ShieldCheck, Send,
  Users, Car, Wrench, Calendar, BadgeCheck, Boxes, Phone, MessageCircle, Banknote,
  Globe, Server, Layers, Settings, CheckCircle2, AlertCircle, Eye,
  Smartphone, Mail, Lock, Key, Sparkles,
  type LucideIcon,
} from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

/* ═══════════ PALETTE ═══════════ */
const G = "#30c280"; // mint
const D = "#0A0A0A";
const R = "#B85454";
const A = "#C4823B";
const B = "#4271B8";
const P = "#735AAB";

/* ═══════════ HELPER COMPONENTS ═══════════ */

function PartHeader({ part, eyebrow, title, accent, count }: {
  part: string; eyebrow: string; title: string; accent: string; count: string;
}) {
  return (
    <div className="text-center mb-20 pb-12" style={{ borderBottom: `2px solid ${accent}25` }}>
      <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full mb-6" style={{
        background: `${accent}10`, border: `1px solid ${accent}40`,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: 3, background: accent }} />
        <span className="heading text-[11px]" style={{ color: accent, letterSpacing: 2 }}>{part.toUpperCase()}</span>
      </div>
      <p className="mb-4" style={{
        color: accent,
        fontFamily: "var(--font-accent), 'Times New Roman', serif",
        fontStyle: "italic",
        fontSize: "clamp(24px, 3vw, 36px)",
        lineHeight: 1.2,
      }}>{eyebrow}</p>
      <h2 className="heading mb-4" style={{
        color: D, fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.2, letterSpacing: -0.02,
      }}>{title}</h2>
      <p className="text-sm" style={{ color: "rgba(0,0,0,0.5)" }}>{count}</p>
    </div>
  );
}

function SectionHead({ n, eyebrow, title, subtitle, color = G }: {
  n: string; eyebrow: string; title: string; subtitle?: string; color?: string;
}) {
  return (
    <div className="mb-10 pb-6" style={{ borderBottom: `1px solid ${color}25` }}>
      <div className="flex items-baseline gap-4 mb-3">
        <span className="heading" style={{
          fontFamily: "var(--font-accent), serif",
          fontStyle: "italic",
          color: color,
          fontSize: "clamp(40px, 5vw, 56px)",
          lineHeight: 1,
          minWidth: 60,
        }}>{n}</span>
        <div>
          <p className="heading text-[11px] mb-1" style={{ color: color, letterSpacing: 1.5 }}>{eyebrow.toUpperCase()}</p>
          <h3 className="heading" style={{
            color: D, fontSize: "clamp(24px, 3vw, 32px)", lineHeight: 1.25, letterSpacing: -0.01,
          }}>{title}</h3>
        </div>
      </div>
      {subtitle && (
        <p className="text-sm mt-3 max-w-3xl" style={{ color: "rgba(0,0,0,0.55)", lineHeight: 1.65 }}>{subtitle}</p>
      )}
    </div>
  );
}

/* Architecture diagram — custom SVG */
function ArchitectureDiagram() {
  return (
    <div className="rounded-2xl p-6 md:p-10 overflow-x-auto" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
      <svg viewBox="0 0 900 520" style={{ width: "100%", height: "auto", minWidth: 600 }} xmlns="http://www.w3.org/2000/svg">
        {/* Grid background */}
        <defs>
          <pattern id="archGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
          </pattern>
          <marker id="archArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={D} />
          </marker>
        </defs>
        <rect width="900" height="520" fill="url(#archGrid)" />

        {/* CLIENT layer */}
        <g>
          <rect x="40" y="40" width="820" height="100" rx="14" fill="#fff" stroke={G} strokeWidth="2" />
          <text x="60" y="68" fontSize="11" fontWeight="700" fill={G} letterSpacing="2">CLIENT LAYER · BROWSERS</text>
          <g>
            <rect x="60" y="80" width="240" height="50" rx="10" fill={`${G}10`} stroke={G} strokeWidth="1" />
            <text x="180" y="100" fontSize="13" fontWeight="700" fill={D} textAnchor="middle">Mobile</text>
            <text x="180" y="116" fontSize="10" fill="rgba(0,0,0,0.6)" textAnchor="middle">B2C · Lead capture priority</text>

            <rect x="330" y="80" width="240" height="50" rx="10" fill={`${G}10`} stroke={G} strokeWidth="1" />
            <text x="450" y="100" fontSize="13" fontWeight="700" fill={D} textAnchor="middle">Tablet</text>
            <text x="450" y="116" fontSize="10" fill="rgba(0,0,0,0.6)" textAnchor="middle">Balanced hierarchy</text>

            <rect x="600" y="80" width="240" height="50" rx="10" fill={`${G}10`} stroke={G} strokeWidth="1" />
            <text x="720" y="100" fontSize="13" fontWeight="700" fill={D} textAnchor="middle">Desktop</text>
            <text x="720" y="116" fontSize="10" fill="rgba(0,0,0,0.6)" textAnchor="middle">B2B · Brand narrative</text>
          </g>
        </g>

        {/* Arrows down to Next.js */}
        <line x1="180" y1="140" x2="180" y2="170" stroke={D} strokeWidth="1.5" markerEnd="url(#archArrow)" />
        <line x1="450" y1="140" x2="450" y2="170" stroke={D} strokeWidth="1.5" markerEnd="url(#archArrow)" />
        <line x1="720" y1="140" x2="720" y2="170" stroke={D} strokeWidth="1.5" markerEnd="url(#archArrow)" />

        {/* APPLICATION layer — Next.js 16 */}
        <g>
          <rect x="40" y="180" width="820" height="120" rx="14" fill="#fff" stroke={B} strokeWidth="2" />
          <text x="60" y="208" fontSize="11" fontWeight="700" fill={B} letterSpacing="2">APPLICATION LAYER · NEXT.JS 16 ON VERCEL</text>

          <rect x="60" y="220" width="180" height="70" rx="10" fill={`${B}10`} stroke={B} strokeWidth="1" />
          <text x="150" y="245" fontSize="12" fontWeight="700" fill={D} textAnchor="middle">Server Components</text>
          <text x="150" y="262" fontSize="9" fill="rgba(0,0,0,0.6)" textAnchor="middle">SSG · SSR · ISR</text>
          <text x="150" y="276" fontSize="9" fill="rgba(0,0,0,0.6)" textAnchor="middle">Marketing · Models · Offers</text>

          <rect x="260" y="220" width="180" height="70" rx="10" fill={`${B}10`} stroke={B} strokeWidth="1" />
          <text x="350" y="245" fontSize="12" fontWeight="700" fill={D} textAnchor="middle">Client Components</text>
          <text x="350" y="262" fontSize="9" fill="rgba(0,0,0,0.6)" textAnchor="middle">Hydrated in browser</text>
          <text x="350" y="276" fontSize="9" fill="rgba(0,0,0,0.6)" textAnchor="middle">Calculator · Forms · Dashboard</text>

          <rect x="460" y="220" width="180" height="70" rx="10" fill={`${B}10`} stroke={B} strokeWidth="1" />
          <text x="550" y="245" fontSize="12" fontWeight="700" fill={D} textAnchor="middle">Server Actions</text>
          <text x="550" y="262" fontSize="9" fill="rgba(0,0,0,0.6)" textAnchor="middle">Form mutations</text>
          <text x="550" y="276" fontSize="9" fill="rgba(0,0,0,0.6)" textAnchor="middle">Lead · Booking · Reservation</text>

          <rect x="660" y="220" width="180" height="70" rx="10" fill={`${B}10`} stroke={B} strokeWidth="1" />
          <text x="750" y="245" fontSize="12" fontWeight="700" fill={D} textAnchor="middle">Route Handlers</text>
          <text x="750" y="262" fontSize="9" fill="rgba(0,0,0,0.6)" textAnchor="middle">Webhooks · APIs</text>
          <text x="750" y="276" fontSize="9" fill="rgba(0,0,0,0.6)" textAnchor="middle">Payment · CRM · Stripe</text>
        </g>

        {/* Arrows down to Data layer */}
        <line x1="150" y1="300" x2="150" y2="330" stroke={D} strokeWidth="1.5" markerEnd="url(#archArrow)" />
        <line x1="450" y1="300" x2="450" y2="330" stroke={D} strokeWidth="1.5" markerEnd="url(#archArrow)" />
        <line x1="750" y1="300" x2="750" y2="330" stroke={D} strokeWidth="1.5" markerEnd="url(#archArrow)" />

        {/* DATA layer */}
        <g>
          <rect x="40" y="340" width="500" height="120" rx="14" fill="#fff" stroke={A} strokeWidth="2" />
          <text x="60" y="368" fontSize="11" fontWeight="700" fill={A} letterSpacing="2">DATA LAYER · SUPABASE</text>

          <rect x="60" y="380" width="220" height="60" rx="10" fill={`${A}10`} stroke={A} strokeWidth="1" />
          <text x="170" y="402" fontSize="13" fontWeight="700" fill={D} textAnchor="middle">PostgreSQL</text>
          <text x="170" y="418" fontSize="9" fill="rgba(0,0,0,0.6)" textAnchor="middle">Owner · Vehicle · Service · Lead · Reservation</text>
          <text x="170" y="430" fontSize="9" fill="rgba(0,0,0,0.6)" textAnchor="middle">Row-Level Security per table</text>

          <rect x="300" y="380" width="220" height="60" rx="10" fill={`${A}10`} stroke={A} strokeWidth="1" />
          <text x="410" y="402" fontSize="13" fontWeight="700" fill={D} textAnchor="middle">Auth + Storage</text>
          <text x="410" y="418" fontSize="9" fill="rgba(0,0,0,0.6)" textAnchor="middle">Supabase Auth (Email + OTP)</text>
          <text x="410" y="430" fontSize="9" fill="rgba(0,0,0,0.6)" textAnchor="middle">Object Storage (PDFs · brochures)</text>
        </g>

        {/* CMS box */}
        <g>
          <rect x="560" y="340" width="300" height="120" rx="14" fill="#fff" stroke={P} strokeWidth="2" />
          <text x="580" y="368" fontSize="11" fontWeight="700" fill={P} letterSpacing="2">CMS LAYER · EDITORIAL</text>

          <rect x="580" y="380" width="260" height="60" rx="10" fill={`${P}10`} stroke={P} strokeWidth="1" />
          <text x="710" y="402" fontSize="13" fontWeight="700" fill={D} textAnchor="middle">Sanity</text>
          <text x="710" y="418" fontSize="9" fill="rgba(0,0,0,0.6)" textAnchor="middle">News · Marketing copy · Model descriptions</text>
          <text x="710" y="430" fontSize="9" fill="rgba(0,0,0,0.6)" textAnchor="middle">Bilingual documents (AR + EN)</text>
        </g>

        {/* INTEGRATIONS layer */}
        <g>
          <rect x="40" y="480" width="820" height="30" rx="8" fill={D} />
          <text x="450" y="500" fontSize="11" fontWeight="700" fill="#fff" textAnchor="middle" letterSpacing="2">
            EXTERNAL · WhatsApp Business API · SMS Gateway · Resend (Email) · Payment Gateway · CRM Webhook
          </text>
        </g>
      </svg>
    </div>
  );
}

/* Notification matrix — table with channel chips */
function NotificationCell({ enabled, color }: { enabled: boolean; color: string }) {
  if (!enabled) return <span style={{ color: "rgba(0,0,0,0.2)" }}>—</span>;
  return <span style={{
    display: "inline-block",
    width: 16, height: 16, borderRadius: 4,
    background: `${color}25`,
    border: `1px solid ${color}`,
    position: "relative",
  }}>
    <CheckCircle2 size={10} style={{ color, position: "absolute", top: 2, left: 2 }} />
  </span>;
}

/* ═══════════ MAIN ═══════════ */

export default function MotionMotorsFSD() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".fsd-hero", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.2 });
      gsap.utils.toArray<HTMLElement>(".fsd-slide").forEach((el) => {
        gsap.fromTo(el, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  /* ═══ DATA — GLOSSARY ═══ */
  const glossary: { term: string; full: string; def: string }[] = [
    { term: "DMS", full: "Dealer Management System", def: "Custom backend running on Next.js + Supabase + Postgres. Handles owners, vehicles, services, warranties, parts, leads, and reservations." },
    { term: "VIN", full: "Vehicle Identification Number", def: "17-character globally-unique vehicle ID. The primary key linking an owner to their car in the DMS." },
    { term: "FSD", full: "Functional Specification Document", def: "This document. Defines exactly what each feature does, how it behaves, what data it touches, and where it ends." },
    { term: "RLS", full: "Row-Level Security", def: "Postgres feature enforced by Supabase. Every read/write is filtered by user identity at the database level — not application code." },
    { term: "ISR", full: "Incremental Static Regeneration", def: "Next.js rendering mode. Pages are static but rebuild on a schedule or on-demand, balancing speed and freshness." },
    { term: "PDPL", full: "Personal Data Protection Law", def: "Saudi Arabia's data protection law, regulated by SDAIA. Equivalent in spirit to GDPR." },
    { term: "SDAIA", full: "Saudi Data & AI Authority", def: "Government body enforcing PDPL and AI ethics in Saudi Arabia." },
    { term: "WBA", full: "WhatsApp Business API", def: "Official channel for two-way messaging with verified business numbers (the 9200 line)." },
    { term: "OTP", full: "One-Time Password", def: "Short-lived numeric code sent via SMS for login or sensitive actions." },
    { term: "Lead", full: "Sales lead record", def: "Any captured intent — test drive booking, quote request, reservation, finance pre-qualification, or WhatsApp chat that opened on the site." },
  ];

  /* ═══ DATA — ACTORS & ROLES ═══ */
  const actors: { role: string; desc: string; color: string; icon: LucideIcon }[] = [
    { role: "Anonymous Visitor", desc: "Anyone on the site without an account. Can browse, calculate, request callbacks.", color: A, icon: Eye },
    { role: "Owner", desc: "Authenticated customer with at least one VIN linked. Sees their garage, history, and documents.", color: G, icon: Car },
    { role: "Sales Staff", desc: "Showroom team. Handles lead follow-up, quote conversion, and reservation finalization.", color: B, icon: Users },
    { role: "Service Staff", desc: "Workshop team. Manages bookings, updates service status, and adds parts to invoices.", color: P, icon: Wrench },
    { role: "Admin", desc: "Marketing / IT lead. Manages content, users, roles, integrations, and audit log.", color: R, icon: Key },
    { role: "System", desc: "Automated processes — scheduled notifications, payment webhooks, cron jobs, audit logging.", color: D, icon: Server },
  ];

  const permissionMatrix: { capability: string; anon: boolean; owner: boolean; sales: boolean; service: boolean; admin: boolean }[] = [
    { capability: "Browse public pages (models, offers, news)", anon: true, owner: true, sales: true, service: true, admin: true },
    { capability: "Submit lead form (test drive, quote)", anon: true, owner: true, sales: true, service: true, admin: true },
    { capability: "Calculate finance estimate", anon: true, owner: true, sales: true, service: true, admin: true },
    { capability: "Reserve a vehicle (pay deposit)", anon: true, owner: true, sales: false, service: false, admin: false },
    { capability: "View own account dashboard", anon: false, owner: true, sales: false, service: false, admin: false },
    { capability: "View own service history + documents", anon: false, owner: true, sales: false, service: false, admin: false },
    { capability: "Book a service appointment", anon: false, owner: true, sales: false, service: false, admin: false },
    { capability: "Register warranty", anon: false, owner: true, sales: true, service: true, admin: true },
    { capability: "View any lead", anon: false, owner: false, sales: true, service: false, admin: true },
    { capability: "Update lead status / convert", anon: false, owner: false, sales: true, service: false, admin: true },
    { capability: "View any service appointment", anon: false, owner: false, sales: false, service: true, admin: true },
    { capability: "Update service appointment status", anon: false, owner: false, sales: false, service: true, admin: true },
    { capability: "Manage CMS content (news, copy)", anon: false, owner: false, sales: false, service: false, admin: true },
    { capability: "Manage users + roles", anon: false, owner: false, sales: false, service: false, admin: true },
    { capability: "Read consent / audit log", anon: false, owner: false, sales: false, service: false, admin: true },
  ];

  /* ═══ DATA — INTEGRATIONS ═══ */
  const integrations: { name: string; purpose: string; direction: string; color: string; icon: LucideIcon; fallback: string }[] = [
    { name: "WhatsApp Business API", purpose: "Two-way conversation with verified 9200 line. Inbound chats logged into the lead record; outbound automated messages on confirmed events.", direction: "Bi-directional", color: G, icon: MessageCircle, fallback: "Falls back to wa.me deep link if WBA quota is exhausted." },
    { name: "SMS Gateway (Twilio / Unifonic)", purpose: "Transactional SMS for OTP login, booking confirmations, service reminders, post-purchase cadence.", direction: "Outbound", color: B, icon: Smartphone, fallback: "Dual-provider failover — primary + secondary." },
    { name: "Resend", purpose: "Transactional email. Reservation receipts, warranty card PDFs, news subscriptions, monthly owner reports.", direction: "Outbound", color: A, icon: Mail, fallback: "Backup via SMTP relay." },
    { name: "Payment Gateway", purpose: "Online Reservation deposit (refundable). Phase 1 supports Hyperpay / Moyasar / Tabby — selection TBC with finance.", direction: "Bi-directional (webhooks)", color: P, icon: Banknote, fallback: "Manual deposit logged by sales team if gateway down." },
    { name: "CRM Webhook (Salesforce / HubSpot / Zoho — TBC)", purpose: "Every lead push includes source, UTM, model, and consent metadata. Bi-directional sync for lead status updates.", direction: "Bi-directional", color: R, icon: Network, fallback: "Internal Supabase lead store remains source of truth; CRM is a sink." },
    { name: "Sanity CMS", purpose: "Editorial content (news, marketing copy, model descriptions). Bilingual document model.", direction: "Outbound (content fetch)", color: D, icon: BookOpen, fallback: "Build-time content cached at the CDN — no runtime dependency." },
    { name: "Analytics (GA4 + Meta Pixel + Plausible)", purpose: "Behavior, conversion, attribution. Plausible is privacy-first default; GA4 / Pixel gated behind cookie consent.", direction: "Outbound", color: G, icon: Sparkles, fallback: "Self-hosted Plausible always-on; third-party pixels conditional on consent." },
    { name: "Soueast Hub (asset source)", purpose: "Brand asset library for model imagery, brochures, color swatches. Pulled at content publication time.", direction: "Inbound (manual sync)", color: B, icon: Layers, fallback: "Cached locally on Supabase Storage after first sync." },
  ];

  /* ═══ DATA — NOTIFICATIONS MATRIX ═══ */
  const notifications: { event: string; trigger: string; whatsapp: boolean; sms: boolean; email: boolean; inapp: boolean; locale: string }[] = [
    { event: "OTP login code", trigger: "Owner requests login", whatsapp: false, sms: true, email: false, inapp: false, locale: "Auto" },
    { event: "Test drive confirmation", trigger: "Form submitted", whatsapp: true, sms: true, email: false, inapp: false, locale: "AR + EN" },
    { event: "Test drive reminder (24 h before)", trigger: "Scheduled cron", whatsapp: true, sms: true, email: false, inapp: false, locale: "AR + EN" },
    { event: "Quote received", trigger: "Form submitted", whatsapp: true, sms: true, email: true, inapp: false, locale: "AR + EN" },
    { event: "Reservation paid", trigger: "Payment webhook success", whatsapp: true, sms: true, email: true, inapp: true, locale: "AR + EN" },
    { event: "Reservation refund issued", trigger: "Admin refund action", whatsapp: true, sms: true, email: true, inapp: true, locale: "AR + EN" },
    { event: "Service appointment confirmed", trigger: "Booking submitted", whatsapp: true, sms: true, email: true, inapp: true, locale: "AR + EN" },
    { event: "Service appointment reminder", trigger: "24 h before slot", whatsapp: true, sms: true, email: false, inapp: true, locale: "AR + EN" },
    { event: "Service status changed (e.g. ready for pickup)", trigger: "Service staff update", whatsapp: true, sms: true, email: false, inapp: true, locale: "AR + EN" },
    { event: "Warranty card issued", trigger: "Registration complete", whatsapp: false, sms: true, email: true, inapp: true, locale: "AR + EN" },
    { event: "Welcome — Day 0 (delivery)", trigger: "Sale recorded by sales staff", whatsapp: true, sms: true, email: true, inapp: true, locale: "AR + EN" },
    { event: "7-day check-in", trigger: "Cron + 7d after delivery", whatsapp: true, sms: false, email: true, inapp: false, locale: "AR + EN" },
    { event: "30-day satisfaction nudge", trigger: "Cron + 30d after delivery", whatsapp: true, sms: false, email: true, inapp: false, locale: "AR + EN" },
    { event: "First service reminder", trigger: "Cron + 6 months after delivery", whatsapp: true, sms: true, email: true, inapp: true, locale: "AR + EN" },
    { event: "Roadside request acknowledged", trigger: "Owner clicks roadside button", whatsapp: true, sms: false, email: false, inapp: true, locale: "AR + EN" },
    { event: "Marketing campaign (opt-in only)", trigger: "Admin-launched broadcast", whatsapp: true, sms: true, email: true, inapp: true, locale: "AR + EN" },
  ];

  /* ═══ DATA — FEATURES (Part II chapters) ═══ */

  type FeatureChapter = {
    id: string; n: string; name: string; icon: LucideIcon; color: string;
    purpose: string;
    actors: string[];
    triggers: string[];
    inputs: { field: string; type: string; required: boolean }[];
    outputs: string[];
    flow: { actor: string; action: string }[];
    data: string[];
    rules: string[];
    edges: string[];
    integrations: string[];
    outOfScope: string[];
  };

  const features: FeatureChapter[] = [
    /* ───── 09. Owner Account · My Garage ───── */
    {
      id: "f-owner", n: "09", name: "Owner Account · My Garage", icon: Users, color: B,
      purpose: "An authenticated dashboard where every owner sees the vehicle(s) tied to their account, their full service history, their documents, and a direct line to the showroom team. The single source of truth for the relationship after delivery.",
      actors: ["Owner (primary)", "Sales (read for support)", "Admin (read all)", "System (notifications)"],
      triggers: [
        "Owner visits /account and signs in",
        "First-time owner completes VIN linkage after sign-in",
        "Sales staff links a new VIN to an existing owner during delivery",
      ],
      inputs: [
        { field: "Mobile number (+966)", type: "E.164 string", required: true },
        { field: "OTP code", type: "6-digit numeric", required: true },
        { field: "VIN", type: "17-char alphanumeric", required: true },
        { field: "Full name (Arabic + English)", type: "string", required: true },
        { field: "Preferred locale", type: "ar | en", required: true },
        { field: "Profile photo", type: "image upload", required: false },
      ],
      outputs: [
        "Dashboard with vehicle cards, status badges (warranty / service due / documents)",
        "Service history timeline per vehicle",
        "Document vault — registration, insurance, invoices, warranty card",
        "Two-way message thread with the showroom",
        "Consent settings panel — marketing channels toggleable",
        "Profile + account deletion (PDPL data-subject right)",
      ],
      flow: [
        { actor: "Owner", action: "Visits /account on any device, taps 'Sign in'." },
        { actor: "Owner", action: "Enters their +966 mobile number." },
        { actor: "System", action: "Sends a 6-digit OTP via SMS Gateway (5 min TTL)." },
        { actor: "Owner", action: "Enters OTP, verifies, session begins." },
        { actor: "System", action: "Creates owners record on first login, or loads existing." },
        { actor: "Owner", action: "If no VIN linked yet, enters VIN + plate for verification." },
        { actor: "Sales", action: "Verifies the linkage from the staff dashboard (cannot be auto-linked)." },
        { actor: "Owner", action: "Sees full dashboard — vehicles, history, documents, messages." },
      ],
      data: ["owners", "vehicles", "documents", "messages", "consent_log", "audit_log"],
      rules: [
        "One owner record per verified mobile number — phone is the identity key.",
        "Multiple vehicles per owner; each vehicle ties to one owner at any time (transfers via sales).",
        "Owner can edit profile fields but cannot change a VIN directly — staff-verified.",
        "Account deletion soft-deletes for 30 days, then hard-deletes (PDPL right to erasure).",
        "RLS enforced at DB level — owner queries auto-filtered by auth.uid().",
      ],
      edges: [
        "Owner changes phone number — initiates a transfer flow verified by current phone OTP + new phone OTP.",
        "VIN already linked to a different owner — request goes to admin queue for resolution.",
        "Owner requests deletion but has an active reservation or service in progress — blocks until resolved.",
        "Stale session after 30 days — silent refresh fails, redirected to OTP re-auth.",
      ],
      integrations: ["Supabase Auth", "SMS Gateway", "WhatsApp BA", "Resend"],
      outOfScope: [
        "Multi-owner vehicles (joint ownership) — single-owner model only in Phase 1.",
        "Social sign-in (Google / Apple) — Phase 2 if requested.",
        "Cross-dealer ownership history — Motion Motors data only.",
        "Linked family accounts / sub-profiles.",
      ],
    },

    /* ───── 10. Service Booking ───── */
    {
      id: "f-service", n: "10", name: "Service Booking", icon: Calendar, color: A,
      purpose: "Online booking for service appointments — owner picks vehicle, service type, and a time slot from the showroom's available calendar. Confirmation by SMS + WhatsApp + Email, with a 24-hour reminder.",
      actors: ["Owner (book)", "Service staff (manage)", "Admin (configure slots)", "System (reminders)"],
      triggers: [
        "Logged-in owner clicks 'Book a service' from dashboard or /aftersales",
        "Anonymous visitor reaches /aftersales/service-booking and starts a guest booking (creates a lead, not an appointment)",
      ],
      inputs: [
        { field: "Vehicle (VIN auto-fill if logged in)", type: "vehicle FK", required: true },
        { field: "Service type", type: "enum (oil change / periodic / diagnostic / other)", required: true },
        { field: "Preferred date", type: "ISO date", required: true },
        { field: "Preferred time slot", type: "enum (morning / afternoon / specific time)", required: true },
        { field: "Notes for the technician", type: "text 500ch", required: false },
        { field: "Pickup / drop-off preference", type: "enum (drive-in / valet)", required: false },
      ],
      outputs: [
        "Service appointment record with confirmation number",
        "Calendar slot held in the staff dashboard",
        "Confirmation notifications (WA + SMS + Email)",
        "24-hour reminder scheduled in cron",
        "Status timeline visible in the owner account",
      ],
      flow: [
        { actor: "Owner", action: "From dashboard taps 'Book a service' on a specific vehicle." },
        { actor: "Owner", action: "Selects service type from the available list." },
        { actor: "System", action: "Fetches available slots for the next 14 days from staff capacity calendar." },
        { actor: "Owner", action: "Picks date + slot + optional notes, taps 'Confirm'." },
        { actor: "System", action: "Validates slot still available, creates appointment, holds the slot." },
        { actor: "System", action: "Fires confirmation (WA + SMS + Email) in the owner's locale." },
        { actor: "System", action: "Schedules 24h-before reminder via cron." },
        { actor: "Service", action: "Marks appointment 'in_progress' on arrival, 'completed' on handover." },
      ],
      data: ["service_appointments", "vehicles", "owners", "notifications_log"],
      rules: [
        "Slot capacity is configurable per day per service type (admin).",
        "Service center operating hours block out-of-hours slots automatically.",
        "Owner can reschedule up to 24h before; later cancellation marks 'cancelled_late' (no penalty in v1).",
        "Status state machine: scheduled → confirmed → in_progress → completed / cancelled / no_show.",
        "Anonymous guests can request a slot (becomes a lead, not a confirmed appointment) — staff confirms within 1 business hour.",
      ],
      edges: [
        "Two owners try to book the same slot simultaneously — first-write wins, second sees 'slot just taken' error.",
        "Owner books on a vehicle they don't own — RLS rejects.",
        "Service partner system unavailable — booking still saved; sync deferred and audit-logged.",
        "Owner doesn't show up — staff marks no_show; counts toward an internal flag after 3 no_shows.",
      ],
      integrations: ["WhatsApp BA", "SMS Gateway", "Resend", "Internal calendar service"],
      outOfScope: [
        "Online payment for service (Phase 2).",
        "Live mechanic tracking / status webcam (Phase 2+).",
        "Integration with third-party scheduling tools (Google Calendar sync).",
        "Dynamic pricing for services.",
      ],
    },

    /* ───── 11. Warranty Registration & Tracking ───── */
    {
      id: "f-warranty", n: "11", name: "Warranty Registration & Tracking", icon: ShieldCheck, color: P,
      purpose: "Activate the manufacturer warranty on delivery, expose the active warranty status to the owner, and provide a path to file claims. Eliminates the paper card — the warranty lives in the owner's account from day one.",
      actors: ["Sales staff (register on delivery)", "Owner (view + file claims)", "Service staff (process claims)", "Admin (configure warranty types)"],
      triggers: [
        "Vehicle marked 'Delivered' in the staff dashboard — auto-fires warranty creation",
        "Owner clicks 'File a claim' from a warranty card",
        "Service staff initiates claim from a service appointment",
      ],
      inputs: [
        { field: "Vehicle (VIN)", type: "vehicle FK", required: true },
        { field: "Warranty type", type: "enum (standard / extended / engine / battery EV)", required: true },
        { field: "Start date", type: "ISO date", required: true },
        { field: "Coverage terms reference", type: "doc ID", required: true },
        { field: "Claim description (if applicable)", type: "text 1000ch", required: false },
      ],
      outputs: [
        "Active warranty record linked to the vehicle",
        "Digital warranty card (PDF) emailed to the owner",
        "Warranty status badge on the vehicle card in the dashboard",
        "Claim history with status (submitted / in_review / approved / denied / closed)",
        "Service appointments auto-tagged when covered by warranty",
      ],
      flow: [
        { actor: "Sales", action: "Marks the vehicle as 'Delivered' from the staff dashboard." },
        { actor: "System", action: "Creates warranty records based on the model's default warranty configuration." },
        { actor: "System", action: "Generates the warranty card PDF and emails it to the owner via Resend." },
        { actor: "Owner", action: "Sees active warranty in their dashboard (status + expiry countdown)." },
        { actor: "Owner", action: "When an issue arises, taps 'File a claim' on the vehicle card." },
        { actor: "Service", action: "Reviews the claim, attaches inspection notes, updates status." },
        { actor: "System", action: "Notifies the owner of every status change (WA + Email)." },
      ],
      data: ["warranties", "vehicles", "documents", "notifications_log", "audit_log"],
      rules: [
        "Standard warranty auto-activates on delivery; extended warranty requires a sale flag.",
        "Multiple active warranties per vehicle allowed (e.g., standard + battery for EV).",
        "Claims have an audit trail — every status change logged with actor + timestamp.",
        "Expired warranties remain visible (read-only) for historical reference.",
        "Warranty transfers to a new owner on resale (manual via admin action).",
      ],
      edges: [
        "Claim filed after warranty expiry — system allows filing but flags the date; service decides.",
        "Vehicle ownership changes mid-claim — claim stays attached to the vehicle; both old + new owners see it.",
        "Bulk warranty import from manufacturer feed — admin-only CSV upload tool.",
        "Warranty card lost — owner can re-download from documents vault at any time.",
      ],
      integrations: ["Resend (PDF email)", "Supabase Storage (warranty card PDFs)", "WhatsApp BA", "Internal claim workflow"],
      outOfScope: [
        "Insurance integration (separate product, separate provider).",
        "Third-party extended warranty programs (Phase 2).",
        "Automated parts ordering on approved claims — manual handoff in v1.",
      ],
    },

    /* ───── 12. Genuine Parts (Browse & Request) ───── */
    {
      id: "f-parts", n: "12", name: "Genuine Parts · Browse & Request", icon: Boxes, color: R,
      purpose: "Owners browse a catalog of OEM parts compatible with their vehicle and submit a request-to-quote. Staff confirm availability and price; the owner approves and pays at the showroom. Not an online store yet — that's Phase 2.",
      actors: ["Owner (browse + request)", "Service staff (fulfill)", "Admin (manage catalog)", "Anonymous visitor (browse only)"],
      triggers: [
        "Owner clicks 'Parts' from their dashboard or /aftersales",
        "Anonymous visitor reaches /aftersales/parts and browses",
        "Owner submits a request form for a specific part",
      ],
      inputs: [
        { field: "Vehicle (VIN, for filtering)", type: "vehicle FK", required: false },
        { field: "Search query", type: "string", required: false },
        { field: "Part category filter", type: "enum (engine / electrical / body / interior / other)", required: false },
        { field: "Requested quantity", type: "integer ≥ 1", required: true },
        { field: "Urgency", type: "enum (standard / urgent)", required: true },
        { field: "Notes", type: "text 500ch", required: false },
      ],
      outputs: [
        "Filtered parts catalog (compatibility-aware when VIN provided)",
        "Parts request ticket with status (new / quoted / approved / fulfilled / cancelled)",
        "Service staff queue with new requests",
        "Quote notification to the owner once price + availability confirmed",
      ],
      flow: [
        { actor: "Owner", action: "Opens the Parts catalog from their dashboard." },
        { actor: "System", action: "Auto-filters catalog by the owner's VIN compatibility list." },
        { actor: "Owner", action: "Searches or browses, selects a part, opens detail." },
        { actor: "Owner", action: "Taps 'Request Quote', enters qty + urgency + notes." },
        { actor: "System", action: "Creates parts_requests record, notifies service staff." },
        { actor: "Service", action: "Checks availability + price, updates the request status to 'quoted'." },
        { actor: "System", action: "Notifies owner that a quote is ready." },
        { actor: "Owner", action: "Approves or declines; pickup arranged at the showroom." },
      ],
      data: ["parts_requests", "vehicles", "owners", "notifications_log"],
      rules: [
        "Compatibility is determined by the model + production-year mapping (admin-maintained).",
        "Anonymous browsers can view the catalog but cannot submit a request without sign-in.",
        "Each request stays open for 14 days; auto-cancelled if neither side acts.",
        "Pricing is never displayed publicly in v1 — always quoted on request.",
        "Bulk requests (qty > 5) flagged for manual review.",
      ],
      edges: [
        "Part is out of stock — staff offers a substitute (logged) or marks request 'unavailable'.",
        "Deprecated part number — system shows the replacement reference automatically.",
        "Owner requests a part for a vehicle they no longer own — system blocks at submission.",
        "Inventory feed unavailable — staff sets availability manually; sync resumes when feed back online.",
      ],
      integrations: ["Inventory feed (TBC — internal or third-party)", "WhatsApp BA", "Resend"],
      outOfScope: [
        "Online purchase + delivery (Phase 2 e-Commerce Option B).",
        "Public price display.",
        "Real-time stock display.",
        "DIY install instructions / videos (Phase 2 content layer).",
      ],
    },

    /* ───── 13. Post-Purchase Automation Cadence ───── */
    {
      id: "f-automation", n: "13", name: "Post-Purchase Automation Cadence", icon: Send, color: G,
      purpose: "The handover is the start of the conversation, not the end. From the moment a sale is recorded, an automated sequence of touchpoints fires across WhatsApp, SMS, and Email — building owner loyalty without sales-team manual effort.",
      actors: ["Sales (records the sale)", "System (executes the cadence)", "Owner (recipient)", "Admin (configures cadence + templates)"],
      triggers: [
        "Sale recorded — sales staff marks the vehicle as 'Delivered' in the DMS",
        "Cron evaluates queued messages every 5 minutes",
        "Owner unsubscribes (halts marketing portion of cadence)",
      ],
      inputs: [
        { field: "Delivery date + time", type: "ISO datetime", required: true },
        { field: "Owner contact info", type: "phone + email", required: true },
        { field: "Marketing consent flags", type: "jsonb (WA / SMS / Email per locale)", required: true },
        { field: "Preferred locale", type: "ar | en", required: true },
      ],
      outputs: [
        "Welcome message Day 0 — multi-channel (WA + SMS + Email + In-app)",
        "7-day check-in (WA + Email)",
        "30-day satisfaction nudge (WA + Email)",
        "6-month first-service reminder (WA + SMS + Email)",
        "Notifications_log entries for audit / debugging",
      ],
      flow: [
        { actor: "Sales", action: "Marks the sale 'Delivered' in the staff dashboard." },
        { actor: "System", action: "Reads owner contact + consent + locale, creates cadence records." },
        { actor: "System", action: "Sends Welcome (Day 0) immediately on transactional + marketing channels." },
        { actor: "Cron", action: "Day 7: sends check-in message (only if marketing consent active)." },
        { actor: "Cron", action: "Day 30: sends satisfaction nudge with feedback link." },
        { actor: "Cron", action: "Month 6: sends first-service reminder, links to /aftersales/service-booking." },
        { actor: "Owner", action: "Can unsubscribe from marketing at any time from their account or in-message." },
      ],
      data: ["notifications_log", "consent_log", "vehicles", "owners"],
      rules: [
        "Transactional messages (welcome, reminders) always fire (legal basis: contract performance).",
        "Marketing-flavoured messages (check-in, nudge) obey per-channel consent and stop on unsubscribe.",
        "All messages are bilingual — locale resolved from the owner's preferred_locale at send time.",
        "Templates are versioned in admin; updates take effect for new queued messages, never re-sent.",
        "Failed sends retry 3 times with exponential backoff; persistent failure logs an alert.",
      ],
      edges: [
        "Phone number changes mid-cadence — re-routes future messages, no resend of past ones.",
        "Owner unsubscribes after Day 7 — Day 30 + 6-month marketing portions cancelled; transactional unchanged.",
        "Delivery date changes (sales correction) — cadence re-anchored from new date if within 24 hours, else preserved.",
        "Bulk delivery (multiple vehicles same owner) — single welcome message, separate vehicle-specific reminders.",
      ],
      integrations: ["WhatsApp BA", "SMS Gateway", "Resend", "Vercel Cron"],
      outOfScope: [
        "Personalized recommendation engine (suggest accessories, services) — Phase 2.",
        "A/B testing of message templates — Phase 2.",
        "Cross-vehicle bundled messaging.",
        "Voice / IVR calls.",
      ],
    },

    /* ───── 14. Online Reservation ───── */
    {
      id: "f-reservation", n: "14", name: "Online Reservation · Phase 1 e-Commerce", icon: BadgeCheck, color: B,
      purpose: "The Phase 1 e-Commerce layer. A customer chooses a model + trim + color, pays a refundable deposit to reserve the specific unit, and finalizes the purchase at the showroom. Common pattern in KSA — low complexity, high conversion.",
      actors: ["Anonymous visitor (reserves)", "Owner (reserves while logged in)", "Sales staff (finalize at showroom)", "Admin (refund / cancel)", "System (payment + hold)"],
      triggers: [
        "Visitor clicks 'Reserve this vehicle' from a model detail or offer page",
        "Payment webhook succeeds — hold is confirmed and inventory marked",
        "14-day hold expires without finalization — auto-release + auto-refund",
      ],
      inputs: [
        { field: "Model + trim + color", type: "enums (model FK + variant)", required: true },
        { field: "Showroom for pickup", type: "showroom FK", required: true },
        { field: "Full name", type: "string", required: true },
        { field: "National ID / Iqama", type: "10-12 digit", required: true },
        { field: "Mobile (+966)", type: "E.164", required: true },
        { field: "Email", type: "valid email", required: true },
        { field: "Deposit amount", type: "SAR (e.g., 5000)", required: true },
        { field: "T&Cs acceptance", type: "boolean", required: true },
        { field: "Marketing consent (optional)", type: "boolean", required: false },
      ],
      outputs: [
        "Reservation record with reservation number",
        "Payment success / failure response",
        "Hold flag on the specific inventory unit (or model+trim+color queue)",
        "Receipt PDF emailed to the customer",
        "Sales follow-up task created in the DMS",
        "WA + SMS + Email confirmations",
      ],
      flow: [
        { actor: "Visitor", action: "Browses a model page, picks trim + color, taps 'Reserve'." },
        { actor: "System", action: "Shows a reservation summary — model, trim, color, showroom, deposit amount, T&Cs preview." },
        { actor: "Visitor", action: "Enters identity + contact details, accepts T&Cs." },
        { actor: "System", action: "Redirects to the payment gateway (Hyperpay / Moyasar / Tabby — TBC) for SAR 5,000 deposit." },
        { actor: "Visitor", action: "Completes payment on the gateway." },
        { actor: "Gateway", action: "Webhook posts success to the API; reservation marked 'paid', inventory unit held." },
        { actor: "System", action: "Sends receipt + confirmations on all consented channels." },
        { actor: "Sales", action: "Contacts the customer within 1 business hour to schedule showroom finalization." },
      ],
      data: ["reservations", "leads", "vehicles (inventory unit)", "consent_log", "notifications_log"],
      rules: [
        "Hold duration: 14 days by default (admin-configurable per model).",
        "Refund policy: full refund within hold period; partial refund schedule after that (admin-configurable).",
        "One active reservation per customer at a time (per mobile + national ID).",
        "If the exact unit isn't available, the reservation queues against the model + trim + color (FIFO).",
        "On finalization at showroom, deposit is applied to the final invoice.",
        "T&Cs version stamped on the reservation record — locks the refund schedule.",
      ],
      edges: [
        "Payment fails — no reservation created, customer redirected back with a clear retry option.",
        "Inventory becomes unavailable after payment (rare race) — full refund + apology + offer of alternative.",
        "Customer doesn't show up by Day 14 — auto-release + auto-refund per T&Cs.",
        "Customer requests cancellation before Day 14 — admin processes refund within 3 business days.",
        "Duplicate reservation attempts on the same unit — second attempt blocked at form submit.",
      ],
      integrations: ["Payment gateway (TBC)", "WhatsApp BA", "SMS Gateway", "Resend", "CRM webhook"],
      outOfScope: [
        "Full vehicle purchase + delivery handoff (Phase 2 e-Commerce Option C).",
        "Finance pre-approval inside the reservation flow (handled separately).",
        "Insurance bundle at checkout.",
        "Trade-in (current car evaluation) inside reservation flow.",
      ],
    },

    /* ───── 15. Roadside Assistance ───── */
    {
      id: "f-roadside", n: "15", name: "Roadside Assistance", icon: Phone, color: A,
      purpose: "One-tap access to the roadside assistance number — available 24/7 during the active warranty period. The website provides the doorway; the partner network handles the actual rescue.",
      actors: ["Owner (requests help)", "Roadside partner (external)", "System (logs the request)"],
      triggers: [
        "Owner taps the floating 'Roadside' button in the mobile app or dashboard",
        "Owner reaches /aftersales/roadside directly",
      ],
      inputs: [
        { field: "VIN (auto from session)", type: "vehicle FK", required: true },
        { field: "Geolocation (optional)", type: "lat/lng", required: false },
        { field: "Issue description", type: "text 500ch or voice note", required: false },
      ],
      outputs: [
        "Pre-filled WhatsApp message or phone call to the roadside partner",
        "Log entry in notifications_log with VIN + timestamp + geolocation",
        "In-app acknowledgement to the owner",
      ],
      flow: [
        { actor: "Owner", action: "Taps the Roadside button from anywhere on the site / in the app." },
        { actor: "System", action: "Logs the request with VIN, geolocation (if granted), and timestamp." },
        { actor: "System", action: "Opens the WhatsApp Business chat (9200) with a pre-filled message including VIN + location, OR initiates a tel: call to the roadside number." },
        { actor: "Owner", action: "Conversation continues outside the website with the partner team." },
        { actor: "System", action: "Sends an in-app acknowledgement: 'We have logged your request. The roadside team will be in touch shortly.'" },
      ],
      data: ["notifications_log"],
      rules: [
        "Available 24/7 — no website-side gating (always reachable).",
        "Free during the active warranty period (per warranty terms).",
        "Out-of-warranty owners see the contact info but with a fee notice.",
      ],
      edges: [
        "Geolocation denied by the browser — falls back to manual location input.",
        "Outside KSA coverage area — partner advises directly.",
        "WhatsApp unavailable — fallback to tel: call.",
      ],
      integrations: ["WhatsApp deep-link (wa.me)", "Tel: link", "Geolocation API"],
      outOfScope: [
        "Live tracking of the roadside vehicle.",
        "In-app dispatch of the partner.",
        "Partner CRM integration.",
        "Roadside service history view (logged in notifications_log only).",
      ],
    },

    /* ───── 16. Service Plans ───── */
    {
      id: "f-plans", n: "16", name: "Service Plans · Pre-paid Packages", icon: BookOpen, color: P,
      purpose: "Pre-paid service packages tied to a specific vehicle. Owners see what's included and what each plan costs, purchase online, and the plan is automatically applied when they book service appointments.",
      actors: ["Owner (purchase + use)", "Sales staff (offer at sale)", "Service staff (apply at appointment)", "Admin (manage plans)"],
      triggers: [
        "Owner views the /aftersales/service-plans page",
        "Owner attaches a plan to a vehicle on purchase or later",
        "Service appointment booked on a vehicle with an active plan",
      ],
      inputs: [
        { field: "Plan selection", type: "plan FK (e.g., basic / standard / premium)", required: true },
        { field: "Vehicle (VIN)", type: "vehicle FK", required: true },
        { field: "Payment", type: "card via gateway", required: true },
      ],
      outputs: [
        "Active service plan attached to the VIN",
        "Plan PDF emailed to the owner",
        "Auto-applied discount / coverage on future service appointments",
        "Plan usage history visible in the owner account",
      ],
      flow: [
        { actor: "Owner", action: "Visits /aftersales/service-plans, sees the catalog of plans." },
        { actor: "Owner", action: "Picks a plan, picks the vehicle to attach it to, taps 'Buy'." },
        { actor: "System", action: "Redirects to the payment gateway for the plan price." },
        { actor: "Gateway", action: "Webhook posts success; plan activated against the VIN." },
        { actor: "System", action: "Emails the plan PDF and updates the owner's account." },
        { actor: "Owner", action: "Books a service later; plan benefit auto-applied at checkout." },
        { actor: "Service", action: "Sees the plan attached on the appointment, applies covered items." },
      ],
      data: ["service_appointments", "vehicles", "documents (plan PDF)", "owners"],
      rules: [
        "Plans are vehicle-specific (tied to a VIN).",
        "Plans transfer to a new owner on resale (manual via admin).",
        "Plan benefits expire at the plan term end (e.g., 2 years).",
        "Multiple active plans per vehicle allowed (e.g., basic + bodywork).",
        "Cancellation refund schedule defined per plan (admin-configurable).",
      ],
      edges: [
        "Plan used up before expiry — owner notified; plan marked 'consumed', stays visible as read-only.",
        "Vehicle sold mid-plan — admin re-attaches to the new owner (or refunds the original).",
        "Plan price changes mid-term — existing active plans grandfathered.",
      ],
      integrations: ["Payment gateway", "Resend (PDF email)", "Supabase Storage"],
      outOfScope: [
        "Custom plans tailored per owner (Phase 2).",
        "Plan-to-plan upgrade flow (Phase 2).",
        "Subscription auto-renewal.",
        "Family / corporate fleet plans.",
      ],
    },
  ];

  /* ═══════════ RENDER ═══════════ */

  return (
    <div ref={ref} style={{ background: "#fff", color: D, minHeight: "100vh", fontFamily: "var(--font-bricolage), system-ui, sans-serif" }}>
      <MotionMotorsFSDNav />

      {/* ══════════ HERO ══════════ */}
      <section style={{ padding: "80px 24px 60px", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at top, ${G}18 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        <div className="relative" style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Logos */}
          <div className="fsd-hero flex items-center justify-center gap-6 mb-10">
            <Image src="/motionmotors/logo-en.png" alt="Motion Motors" width={220} height={32} priority style={{ height: 32, width: "auto" }} />
            <span style={{ width: 1, height: 24, background: "#E4E4E7" }} />
            <Image src="/motionmotors/soueast.png" alt="Soueast" width={300} height={60} priority style={{ height: 60, width: "auto", opacity: 0.9 }} />
          </div>

          {/* Document badge */}
          <div className="fsd-hero flex items-center justify-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: `${G}15`, border: `1px solid ${G}40` }}>
              <span style={{ width: 6, height: 6, borderRadius: 3, background: G }} />
              <span className="heading text-[11px]" style={{ color: D, letterSpacing: 0.5 }}>FUNCTIONAL SPECIFICATION DOCUMENT</span>
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: `${R}10`, border: `1px solid ${R}40` }}>
              <span style={{ width: 6, height: 6, borderRadius: 3, background: R }} />
              <span className="heading text-[11px]" style={{ color: R, letterSpacing: 0.5 }}>V0.1 · DRAFT</span>
            </span>
          </div>

          {/* Title */}
          <h1 className="fsd-hero heading mb-6 text-center" style={{
            fontSize: "clamp(36px, 6.5vw, 68px)",
            lineHeight: 1.15,
            color: D,
            letterSpacing: -0.02,
          }}>
            The DMS, Owner Account &amp;<br />
            <span style={{
              color: G,
              fontFamily: "var(--font-accent), serif",
              fontStyle: "italic",
              fontWeight: 400,
            }}>After-Sales</span> Specification.
          </h1>

          <p className="fsd-hero text-base md:text-lg mb-10 max-w-3xl mx-auto text-center" style={{
            color: "rgba(0,0,0,0.55)", lineHeight: 1.65,
          }}>
            The functional contract for the custom dealer management system behind motionmotors.me. Twenty sections covering every actor, screen, data table, business rule, and edge case — so leadership knows exactly what we&apos;re building before Week 1 starts.
          </p>

          {/* Stats row */}
          <div className="fsd-hero grid grid-cols-2 md:grid-cols-4 gap-0 mt-12" style={{
            borderTop: "1px solid #EBEBEB", borderBottom: "1px solid #EBEBEB",
          }}>
            {[
              { n: "20", sub: "Sections · 3 parts", color: G },
              { n: "8", sub: "Features specified", color: B },
              { n: "16", sub: "Notifications mapped", color: A },
              { n: "v1.0", sub: "Locks scope after leadership review", color: P },
            ].map((s, i) => (
              <div key={s.sub} style={{
                padding: "24px 16px", textAlign: "center",
                borderRight: i < 3 ? "1px solid #EBEBEB" : "none",
              }}>
                <div className="heading text-3xl md:text-4xl mb-1" style={{ color: s.color }}>{s.n}</div>
                <div className="text-[11.5px]" style={{ color: "rgba(0,0,0,0.5)" }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Meta chips */}
          <div className="fsd-hero flex flex-wrap items-center justify-center gap-3 mt-10">
            {[
              { label: "OWNED BY", value: "Ahmed Ali · Head of Digital & Growth Lead", color: G },
              { label: "ISSUED", value: "May 19, 2026", color: B },
              { label: "PARENT", value: "/motionmotors-website · Sections 02 & 07", color: A },
              { label: "STATUS", value: "Under leadership review", color: P },
            ].map((m) => (
              <div key={m.label} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-[12px]" style={{
                background: `${m.color}12`, border: `1px solid ${m.color}30`,
              }}>
                <span className="heading text-[10px]" style={{ color: m.color, letterSpacing: 0.5 }}>{m.label}</span>
                <span style={{ width: 3, height: 3, borderRadius: 2, background: m.color, opacity: 0.5 }} />
                <span style={{ color: D }}>{m.value}</span>
              </div>
            ))}
          </div>

          {/* Scroll arrow */}
          <div className="fsd-hero mt-14 flex items-center justify-center gap-3" style={{ color: "rgba(0,0,0,0.4)" }}>
            <ArrowDown size={16} />
            <span className="heading text-[11px]" style={{ letterSpacing: 1 }}>BEGIN WITH PART I — FOUNDATION</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PART I — FOUNDATION
          ══════════════════════════════════════════════════════════ */}
      <section style={{ padding: "100px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <PartHeader
            part="Part I"
            eyebrow="Foundation"
            title="The frame everything sits inside."
            accent={G}
            count="Sections 01 – 08 · Document control, glossary, architecture, actors, data model, auth, integrations, notifications"
          />

          {/* ═══ 01 — DOCUMENT CONTROL ═══ */}
          <div id="doc-control" className="fsd-slide opacity-0 mb-24">
            <SectionHead n="01" eyebrow="Document Control" title="Version, ownership, scope." color={G}
              subtitle="The administrative spine of this document. What it is, who wrote it, what changes between versions." />

            <div className="rounded-2xl p-6 mb-6" style={{ border: "1px solid #EBEBEB", background: "#fff" }}>
              <p className="heading text-[11px] mb-4" style={{ color: G, letterSpacing: 1 }}>METADATA</p>
              <table className="w-full text-[13px]">
                <tbody>
                  {[
                    ["Document title", "Motion Motors — DMS & After-Sales FSD"],
                    ["Document ID", "MM-FSD-001"],
                    ["Version", "0.1 (Draft)"],
                    ["Issued", "May 19, 2026"],
                    ["Owner", "Ahmed Ali · Head of Digital & Growth Lead"],
                    ["Parent proposal", "/motionmotors-website (Sections 02 + 07)"],
                    ["Confidentiality", "Internal · Motion Motors team"],
                    ["Status", "Under internal review"],
                  ].map(([k, v]) => (
                    <tr key={k} style={{ borderBottom: "1px solid #F4F4F4" }}>
                      <td className="py-2.5 pr-4" style={{ color: "rgba(0,0,0,0.55)", verticalAlign: "top", width: "30%" }}>{k}</td>
                      <td className="py-2.5" style={{ color: D, fontWeight: 600 }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Change log */}
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #EBEBEB" }}>
              <div className="p-4" style={{ background: "#FAFAFA", borderBottom: "1px solid #EBEBEB" }}>
                <p className="heading text-[11px]" style={{ color: G, letterSpacing: 1 }}>CHANGE LOG</p>
              </div>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr style={{ background: "#fff" }}>
                    {["Version", "Date", "Author", "Summary"].map((h) => (
                      <th key={h} className="text-left py-2.5 px-4" style={{
                        color: "rgba(0,0,0,0.5)", fontWeight: 600, fontSize: 11, letterSpacing: 0.5,
                        borderBottom: "1px solid #F0F0F0",
                      }}>{h.toUpperCase()}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["0.1", "May 19, 2026", "Ahmed Ali", "Initial draft of the DMS and After-Sales functional specification across 20 sections."],
                  ].map((row, i) => (
                    <tr key={i}>
                      {row.map((c, j) => (
                        <td key={j} className="py-3 px-4" style={{ color: D, borderBottom: i < 0 ? "1px solid #F4F4F4" : "none" }}>{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ═══ 02 — GLOSSARY ═══ */}
          <div id="glossary" className="fsd-slide opacity-0 mb-24">
            <SectionHead n="02" eyebrow="Glossary" title="The terms used in this document." color={G}
              subtitle="Every acronym and term defined once, here. Reread if anything later feels ambiguous." />

            <div className="grid md:grid-cols-2 gap-3">
              {glossary.map((g) => (
                <div key={g.term} className="p-5 rounded-xl" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="heading text-base" style={{ color: G }}>{g.term}</span>
                    <span className="text-[12px]" style={{ color: "rgba(0,0,0,0.45)" }}>{g.full}</span>
                  </div>
                  <p className="text-[12.5px]" style={{ color: "rgba(0,0,0,0.65)", lineHeight: 1.6 }}>{g.def}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ═══ 03 — SYSTEM OVERVIEW ═══ */}
          <div id="system-overview" className="fsd-slide opacity-0 mb-24">
            <SectionHead n="03" eyebrow="System Overview" title="The four layers and how they talk." color={G}
              subtitle="A one-glance map of the architecture — Client, Application, Data, and CMS layers, plus the external integrations they reach out to." />

            <ArchitectureDiagram />

            <div className="grid md:grid-cols-2 gap-5 mt-6">
              <div className="p-5 rounded-2xl" style={{ background: `${G}08`, border: `1px solid ${G}25` }}>
                <p className="heading text-[11px] mb-2" style={{ color: G, letterSpacing: 0.5 }}>READS</p>
                <p className="text-[13px]" style={{ color: D, lineHeight: 1.6 }}>
                  Pages load from the CDN edge (static where possible). Dynamic content comes from Postgres via Next.js Server Components. Editorial content lives in Sanity, fetched at build or revalidation.
                </p>
              </div>
              <div className="p-5 rounded-2xl" style={{ background: `${B}08`, border: `1px solid ${B}25` }}>
                <p className="heading text-[11px] mb-2" style={{ color: B, letterSpacing: 0.5 }}>WRITES</p>
                <p className="text-[13px]" style={{ color: D, lineHeight: 1.6 }}>
                  Form submissions hit Server Actions, which authenticate, validate, and write to Postgres with RLS enforced. Outbound notifications fire from the same action via WhatsApp / SMS / Email integrations.
                </p>
              </div>
            </div>
          </div>

          {/* ═══ 04 — ACTORS & ROLES ═══ */}
          <div id="actors" className="fsd-slide opacity-0 mb-24">
            <SectionHead n="04" eyebrow="Actors & Roles" title="Who can do what." color={G}
              subtitle="Six actors interact with the system. The matrix below shows exactly what each is permitted to do at the application layer (and enforced by RLS at the database layer)." />

            {/* Actor cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {actors.map((a) => (
                <div key={a.role} className="p-5 rounded-2xl" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: `${a.color}15`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <a.icon size={18} style={{ color: a.color }} />
                    </div>
                    <h4 className="heading text-[14px]" style={{ color: D }}>{a.role}</h4>
                  </div>
                  <p className="text-[12px]" style={{ color: "rgba(0,0,0,0.6)", lineHeight: 1.55 }}>{a.desc}</p>
                </div>
              ))}
            </div>

            {/* Permission matrix */}
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #EBEBEB" }}>
              <div className="p-4" style={{ background: "#FAFAFA", borderBottom: "1px solid #EBEBEB" }}>
                <p className="heading text-[11px]" style={{ color: G, letterSpacing: 1 }}>PERMISSION MATRIX</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[12px]" style={{ minWidth: 700 }}>
                  <thead>
                    <tr style={{ background: "#fff" }}>
                      <th className="text-left py-3 px-4" style={{ color: "rgba(0,0,0,0.5)", fontWeight: 600, fontSize: 10, letterSpacing: 0.5, borderBottom: "1px solid #F0F0F0" }}>CAPABILITY</th>
                      {[
                        { label: "Anon", color: A },
                        { label: "Owner", color: G },
                        { label: "Sales", color: B },
                        { label: "Service", color: P },
                        { label: "Admin", color: R },
                      ].map((h) => (
                        <th key={h.label} className="text-center py-3 px-3" style={{
                          color: h.color, fontWeight: 700, fontSize: 11, letterSpacing: 0.5,
                          borderBottom: "1px solid #F0F0F0",
                        }}>{h.label.toUpperCase()}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {permissionMatrix.map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#FAFAFA" }}>
                        <td className="py-2.5 px-4 text-[12px]" style={{ color: D, borderBottom: "1px solid #F4F4F4" }}>{row.capability}</td>
                        <td className="text-center py-2.5" style={{ borderBottom: "1px solid #F4F4F4" }}><NotificationCell enabled={row.anon} color={A} /></td>
                        <td className="text-center py-2.5" style={{ borderBottom: "1px solid #F4F4F4" }}><NotificationCell enabled={row.owner} color={G} /></td>
                        <td className="text-center py-2.5" style={{ borderBottom: "1px solid #F4F4F4" }}><NotificationCell enabled={row.sales} color={B} /></td>
                        <td className="text-center py-2.5" style={{ borderBottom: "1px solid #F4F4F4" }}><NotificationCell enabled={row.service} color={P} /></td>
                        <td className="text-center py-2.5" style={{ borderBottom: "1px solid #F4F4F4" }}><NotificationCell enabled={row.admin} color={R} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ═══ 05 — DATA MODEL ═══ */}
          <div id="data-model" className="fsd-slide opacity-0 mb-24">
            <SectionHead n="05" eyebrow="Data Model" title="Tables, fields, relationships." color={G}
              subtitle="The full database schema for the DMS layer. Every table listed here is enforced by RLS — see Section 06 for the policies." />

            {/* ERD-like layout */}
            <div className="rounded-2xl p-6 mb-6" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
              <p className="heading text-[11px] mb-5 text-center" style={{ color: G, letterSpacing: 1.5 }}>ENTITY RELATIONSHIP OVERVIEW</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { name: "owners", icon: Users, color: G, fields: ["id (uuid · pk)", "auth_user_id (fk)", "full_name", "phone", "national_id (hashed)", "preferred_locale", "created_at"], links: "1 owner → many vehicles" },
                  { name: "vehicles", icon: Car, color: B, fields: ["id (uuid · pk)", "vin (unique)", "owner_id (fk)", "model", "trim", "color", "plate", "delivery_date", "mileage_log (jsonb)"], links: "owner_id → owners" },
                  { name: "service_appointments", icon: Calendar, color: A, fields: ["id (uuid · pk)", "vehicle_id (fk)", "owner_id (fk)", "service_type", "scheduled_at", "status", "notes", "completed_at"], links: "vehicle_id → vehicles" },
                  { name: "warranties", icon: ShieldCheck, color: P, fields: ["id (uuid · pk)", "vehicle_id (fk)", "type", "start_date", "end_date", "status", "claims (jsonb)"], links: "vehicle_id → vehicles" },
                  { name: "parts_requests", icon: Boxes, color: R, fields: ["id (uuid · pk)", "owner_id (fk)", "vehicle_id (fk)", "part_sku", "qty", "status", "requested_at"], links: "owner_id + vehicle_id" },
                  { name: "leads", icon: Send, color: G, fields: ["id (uuid · pk)", "source", "name", "phone", "model", "trim", "status", "utm (jsonb)", "consent (jsonb)"], links: "many → 1 owner (on conversion)" },
                  { name: "reservations", icon: BadgeCheck, color: B, fields: ["id (uuid · pk)", "lead_id (fk)", "model", "trim", "color", "deposit_amount", "payment_status", "expiry_at"], links: "lead_id → leads · owner_id on conversion" },
                  { name: "documents", icon: FileText, color: A, fields: ["id (uuid · pk)", "owner_id (fk)", "vehicle_id (fk · nullable)", "doc_type", "storage_path", "uploaded_at"], links: "owner_id → owners" },
                  { name: "messages", icon: MessageCircle, color: P, fields: ["id (uuid · pk)", "owner_id (fk)", "sender_role", "channel", "body", "sent_at", "read_at"], links: "owner_id → owners" },
                  { name: "notifications_log", icon: Mail, color: R, fields: ["id (uuid · pk)", "owner_id (fk · nullable)", "event_type", "channel", "status", "sent_at", "error"], links: "owner_id → owners" },
                  { name: "consent_log", icon: Lock, color: G, fields: ["id (uuid · pk)", "owner_id (fk · nullable)", "consent_type", "granted", "ip", "user_agent", "timestamp"], links: "owner_id → owners" },
                  { name: "audit_log", icon: Eye, color: D, fields: ["id (uuid · pk)", "actor_id (fk)", "action", "entity_table", "entity_id", "diff (jsonb)", "timestamp"], links: "actor_id → auth.users" },
                ].map((t) => (
                  <div key={t.name} className="p-4 rounded-xl" style={{
                    background: "#fff",
                    border: `1.5px solid ${t.color}30`,
                    boxShadow: `3px 3px 0px 0px ${t.color}15`,
                  }}>
                    <div className="flex items-center gap-2 mb-3 pb-2" style={{ borderBottom: `1px solid ${t.color}20` }}>
                      <t.icon size={14} style={{ color: t.color }} />
                      <span className="heading text-[12px] font-mono" style={{ color: t.color }}>{t.name}</span>
                    </div>
                    <div className="space-y-1 mb-3">
                      {t.fields.map((f, i) => (
                        <p key={i} className="text-[10.5px] font-mono" style={{ color: "rgba(0,0,0,0.6)", lineHeight: 1.4 }}>{f}</p>
                      ))}
                    </div>
                    <p className="text-[10px] pt-2" style={{ color: t.color, borderTop: `1px solid ${t.color}15`, opacity: 0.85 }}>
                      ↗ {t.links}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl" style={{ background: `${G}08`, border: `1px solid ${G}25` }}>
              <p className="text-[12.5px]" style={{ color: "rgba(0,0,0,0.65)", lineHeight: 1.6 }}>
                <span className="heading" style={{ color: G }}>Conventions · </span>
                All tables use <code className="px-1.5 py-0.5 rounded" style={{ background: "#fff", border: "1px solid #EBEBEB", fontSize: 10.5 }}>uuid</code> primary keys. Timestamps in UTC. Soft-delete via <code className="px-1.5 py-0.5 rounded" style={{ background: "#fff", border: "1px solid #EBEBEB", fontSize: 10.5 }}>deleted_at</code> on owner-facing tables (data subject erasure requests). JSON columns are versioned via a <code className="px-1.5 py-0.5 rounded" style={{ background: "#fff", border: "1px solid #EBEBEB", fontSize: 10.5 }}>schema_v</code> key inside the JSON.
              </p>
            </div>
          </div>

          {/* ═══ 06 — AUTH & PERMISSIONS ═══ */}
          <div id="auth" className="fsd-slide opacity-0 mb-24">
            <SectionHead n="06" eyebrow="Auth & Permissions" title="How identity is checked, every time." color={G}
              subtitle="Authentication for owners, sales, service, and admin. RLS policies enforced at the database, not in application code." />

            <div className="grid md:grid-cols-2 gap-5 mb-6">
              <div className="p-6 rounded-2xl" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${G}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Smartphone size={18} style={{ color: G }} />
                  </div>
                  <h4 className="heading text-base" style={{ color: D }}>Owner authentication</h4>
                </div>
                <ul className="space-y-2 text-[12.5px]" style={{ color: "rgba(0,0,0,0.65)", lineHeight: 1.6 }}>
                  <li>· Phone-first login: enter mobile → receive OTP via SMS → verify → session</li>
                  <li>· OTP TTL: 5 minutes · max 3 attempts · 60 s cooldown before resend</li>
                  <li>· Session: HTTP-only secure cookie · 30-day rolling refresh · revocable from owner dashboard</li>
                  <li>· Account created on first verified login (phone is the identity)</li>
                  <li>· VIN linkage: separate step after first login; verified by sales staff on registration</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${B}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Lock size={18} style={{ color: B }} />
                  </div>
                  <h4 className="heading text-base" style={{ color: D }}>Staff authentication</h4>
                </div>
                <ul className="space-y-2 text-[12.5px]" style={{ color: "rgba(0,0,0,0.65)", lineHeight: 1.6 }}>
                  <li>· Email + password + mandatory 2FA (TOTP)</li>
                  <li>· Roles: <code className="px-1 rounded" style={{ background: "#FAFAFA", fontSize: 10.5 }}>sales</code> · <code className="px-1 rounded" style={{ background: "#FAFAFA", fontSize: 10.5 }}>service</code> · <code className="px-1 rounded" style={{ background: "#FAFAFA", fontSize: 10.5 }}>admin</code></li>
                  <li>· Account creation: admin-only (no self-sign-up)</li>
                  <li>· Session: 8-hour idle timeout · forced re-auth for destructive actions</li>
                  <li>· IP allow-list optional per role (configurable by admin)</li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #EBEBEB" }}>
              <div className="p-4" style={{ background: "#FAFAFA", borderBottom: "1px solid #EBEBEB" }}>
                <p className="heading text-[11px]" style={{ color: G, letterSpacing: 1 }}>RLS POLICIES (SAMPLE)</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[12px]" style={{ minWidth: 700 }}>
                  <thead>
                    <tr>
                      {["TABLE", "ROLE", "POLICY"].map((h) => (
                        <th key={h} className="text-left py-3 px-4" style={{ color: "rgba(0,0,0,0.5)", fontWeight: 600, fontSize: 10, letterSpacing: 0.5, borderBottom: "1px solid #F0F0F0" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["vehicles", "owner", "owner_id = auth.uid()"],
                      ["vehicles", "sales · service · admin", "true (read-only) · update via staff actions"],
                      ["service_appointments", "owner", "owner_id = auth.uid()"],
                      ["service_appointments", "service · admin", "true (full)"],
                      ["leads", "owner", "false (none)"],
                      ["leads", "sales · admin", "true (full)"],
                      ["documents", "owner", "owner_id = auth.uid()"],
                      ["consent_log", "owner", "owner_id = auth.uid() (read-only)"],
                      ["consent_log", "admin", "true (read-only)"],
                      ["audit_log", "admin", "true (read-only)"],
                    ].map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#FAFAFA" }}>
                        <td className="py-2.5 px-4 font-mono text-[11px]" style={{ color: G, borderBottom: "1px solid #F4F4F4" }}>{row[0]}</td>
                        <td className="py-2.5 px-4 text-[12px]" style={{ color: D, borderBottom: "1px solid #F4F4F4" }}>{row[1]}</td>
                        <td className="py-2.5 px-4 font-mono text-[11px]" style={{ color: "rgba(0,0,0,0.6)", borderBottom: "1px solid #F4F4F4" }}>{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ═══ 07 — INTEGRATIONS ═══ */}
          <div id="integrations" className="fsd-slide opacity-0 mb-24">
            <SectionHead n="07" eyebrow="Integration Map" title="Every external system this depends on." color={G}
              subtitle="Eight integrations with the systems we don't own. Each has a purpose, a direction, and a fallback if it goes down." />

            <div className="grid md:grid-cols-2 gap-4">
              {integrations.map((it) => (
                <div key={it.name} className="p-5 rounded-2xl" style={{
                  background: "#fff", border: `1.5px solid ${it.color}25`,
                  boxShadow: `3px 3px 0px 0px ${it.color}15`,
                }}>
                  <div className="flex items-start gap-3 mb-3">
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: `${it.color}15`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <it.icon size={18} style={{ color: it.color }} />
                    </div>
                    <div className="flex-1">
                      <h4 className="heading text-[14px] mb-1" style={{ color: D, lineHeight: 1.3 }}>{it.name}</h4>
                      <span className="text-[10.5px] px-2 py-0.5 rounded inline-block" style={{
                        background: `${it.color}10`, color: it.color, fontWeight: 600,
                      }}>{it.direction}</span>
                    </div>
                  </div>
                  <p className="text-[12.5px] mb-3" style={{ color: "rgba(0,0,0,0.65)", lineHeight: 1.55 }}>{it.purpose}</p>
                  <p className="text-[11.5px] pt-3" style={{
                    color: "rgba(0,0,0,0.5)", borderTop: `1px solid ${it.color}15`, lineHeight: 1.5,
                  }}>
                    <span style={{ color: it.color, fontWeight: 700 }}>Fallback · </span>{it.fallback}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ═══ 08 — NOTIFICATIONS MATRIX ═══ */}
          <div id="notifications" className="fsd-slide opacity-0 mb-12">
            <SectionHead n="08" eyebrow="Notifications Matrix" title="Every message the system sends." color={G}
              subtitle="The full inventory of automated communications — trigger, channels, locale. Marketing rows obey opt-in consent; transactional rows obey legal basis (contract performance)." />

            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #EBEBEB" }}>
              <div className="overflow-x-auto">
                <table className="w-full text-[12px]" style={{ minWidth: 900 }}>
                  <thead>
                    <tr style={{ background: D }}>
                      {["EVENT", "TRIGGER", "WA", "SMS", "EMAIL", "IN-APP", "LOCALE"].map((h) => (
                        <th key={h} className="text-left py-3 px-3" style={{
                          color: "#fff", fontWeight: 600, fontSize: 10, letterSpacing: 0.5,
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {notifications.map((n, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#FAFAFA" }}>
                        <td className="py-2.5 px-3 text-[12px]" style={{ color: D, fontWeight: 600, borderBottom: "1px solid #F4F4F4" }}>{n.event}</td>
                        <td className="py-2.5 px-3 text-[11.5px]" style={{ color: "rgba(0,0,0,0.6)", borderBottom: "1px solid #F4F4F4" }}>{n.trigger}</td>
                        <td className="py-2.5 px-3 text-center" style={{ borderBottom: "1px solid #F4F4F4" }}><NotificationCell enabled={n.whatsapp} color={G} /></td>
                        <td className="py-2.5 px-3 text-center" style={{ borderBottom: "1px solid #F4F4F4" }}><NotificationCell enabled={n.sms} color={B} /></td>
                        <td className="py-2.5 px-3 text-center" style={{ borderBottom: "1px solid #F4F4F4" }}><NotificationCell enabled={n.email} color={A} /></td>
                        <td className="py-2.5 px-3 text-center" style={{ borderBottom: "1px solid #F4F4F4" }}><NotificationCell enabled={n.inapp} color={P} /></td>
                        <td className="py-2.5 px-3 text-[11px] font-mono" style={{ color: "rgba(0,0,0,0.5)", borderBottom: "1px solid #F4F4F4" }}>{n.locale}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-5 p-5 rounded-2xl flex items-start gap-3" style={{ background: `${R}08`, border: `1px solid ${R}25` }}>
              <AlertCircle size={18} style={{ color: R, marginTop: 1, flexShrink: 0 }} />
              <p className="text-[12.5px]" style={{ color: "rgba(0,0,0,0.65)", lineHeight: 1.6 }}>
                <span style={{ color: R, fontWeight: 700 }}>Consent gate · </span>
                Every marketing row above is OFF by default. Owners opt in per channel from their account or via consent boxes on lead forms. Transactional rows (OTP, payment confirmations, service status) require no opt-in — legal basis is contract performance under PDPL.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PART II — FEATURES (8 chapters)
          ══════════════════════════════════════════════════════════ */}
      <section style={{ padding: "100px 24px", background: "#FAFAFA", borderTop: "1px solid #F0F0F0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <PartHeader
            part="Part II"
            eyebrow="Features"
            title="Eight features, fully specified."
            accent={B}
            count="Sections 09 – 16 · Each feature has purpose, actors, inputs, outputs, flows, data, business rules, edge cases, integrations, and out-of-scope"
          />

          <div className="space-y-12">
            {features.map((f) => (
              <div key={f.id} id={f.id} className="fsd-slide opacity-0 rounded-[24px] overflow-hidden" style={{
                background: "#fff",
                border: `2px solid ${f.color}25`,
                boxShadow: `4px 4px 0px 0px ${f.color}20`,
              }}>
                {/* Chapter header — colored band */}
                <div style={{
                  padding: "28px 32px",
                  background: f.color,
                  color: f.color === A || f.color === G ? D : "#fff",
                }}>
                  <div className="flex items-start gap-4">
                    <span style={{
                      fontFamily: "var(--font-accent), serif",
                      fontStyle: "italic",
                      fontSize: 48,
                      lineHeight: 1,
                      opacity: 0.9,
                    }}>{f.n}</span>
                    <div className="flex-1">
                      <p className="heading text-[10px] mb-2" style={{ opacity: 0.75, letterSpacing: 2 }}>FEATURE CHAPTER · PART II</p>
                      <h3 className="heading text-2xl md:text-3xl" style={{ lineHeight: 1.2 }}>{f.name}</h3>
                    </div>
                    <div style={{
                      width: 44, height: 44, borderRadius: 11,
                      background: "rgba(255,255,255,0.18)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <f.icon size={20} />
                    </div>
                  </div>
                </div>

                <div className="p-8 md:p-10">
                  {/* Purpose */}
                  <div className="mb-8 pb-6" style={{ borderBottom: "1px solid #F0F0F0" }}>
                    <p className="heading text-[11px] mb-2" style={{ color: f.color, letterSpacing: 1 }}>PURPOSE</p>
                    <p className="text-[14px]" style={{ color: D, lineHeight: 1.65 }}>{f.purpose}</p>
                  </div>

                  {/* Actors + Triggers */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8 pb-6" style={{ borderBottom: "1px solid #F0F0F0" }}>
                    <div>
                      <p className="heading text-[11px] mb-3" style={{ color: f.color, letterSpacing: 1 }}>ACTORS</p>
                      <div className="flex flex-wrap gap-2">
                        {f.actors.map((a, i) => (
                          <span key={i} className="text-[11.5px] px-2.5 py-1 rounded-full" style={{
                            background: `${f.color}10`, color: f.color, border: `1px solid ${f.color}30`, fontWeight: 600,
                          }}>{a}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="heading text-[11px] mb-3" style={{ color: f.color, letterSpacing: 1 }}>TRIGGERS</p>
                      <ul className="space-y-1.5">
                        {f.triggers.map((t, i) => (
                          <li key={i} className="text-[12.5px] flex items-start gap-2" style={{ color: "rgba(0,0,0,0.7)", lineHeight: 1.55 }}>
                            <span style={{ color: f.color, marginTop: 7, fontSize: 6 }}>●</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Inputs & Outputs */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8 pb-6" style={{ borderBottom: "1px solid #F0F0F0" }}>
                    <div>
                      <p className="heading text-[11px] mb-3" style={{ color: f.color, letterSpacing: 1 }}>INPUTS</p>
                      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #EBEBEB" }}>
                        <table className="w-full text-[11.5px]">
                          <thead>
                            <tr style={{ background: "#FAFAFA" }}>
                              {["Field", "Type", "Req."].map((h) => (
                                <th key={h} className="text-left py-2 px-3" style={{ color: "rgba(0,0,0,0.5)", fontWeight: 600, fontSize: 10, letterSpacing: 0.5, borderBottom: "1px solid #EBEBEB" }}>{h.toUpperCase()}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {f.inputs.map((inp, i) => (
                              <tr key={i}>
                                <td className="py-2 px-3" style={{ color: D, fontWeight: 500, borderBottom: i < f.inputs.length - 1 ? "1px solid #F4F4F4" : "none" }}>{inp.field}</td>
                                <td className="py-2 px-3 font-mono text-[10.5px]" style={{ color: "rgba(0,0,0,0.55)", borderBottom: i < f.inputs.length - 1 ? "1px solid #F4F4F4" : "none" }}>{inp.type}</td>
                                <td className="py-2 px-3" style={{ borderBottom: i < f.inputs.length - 1 ? "1px solid #F4F4F4" : "none" }}>
                                  {inp.required ? (
                                    <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: `${R}15`, color: R, fontWeight: 700 }}>REQ</span>
                                  ) : (
                                    <span className="text-[10px]" style={{ color: "rgba(0,0,0,0.35)" }}>opt</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div>
                      <p className="heading text-[11px] mb-3" style={{ color: f.color, letterSpacing: 1 }}>OUTPUTS</p>
                      <ul className="space-y-2.5">
                        {f.outputs.map((o, i) => (
                          <li key={i} className="text-[12.5px] flex items-start gap-3" style={{ color: "rgba(0,0,0,0.7)", lineHeight: 1.55 }}>
                            <ArrowRight size={13} style={{ color: f.color, marginTop: 4, flexShrink: 0 }} />
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* User Flow */}
                  <div className="mb-8 pb-6" style={{ borderBottom: "1px solid #F0F0F0" }}>
                    <p className="heading text-[11px] mb-4" style={{ color: f.color, letterSpacing: 1 }}>USER FLOW</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {f.flow.map((s, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{
                          background: `${f.color}06`, border: `1px solid ${f.color}20`,
                        }}>
                          <span style={{
                            width: 26, height: 26, borderRadius: 7,
                            background: f.color,
                            color: f.color === A || f.color === G ? D : "#fff",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 11, fontWeight: 700,
                            flexShrink: 0,
                          }}>{String(i + 1).padStart(2, "0")}</span>
                          <div className="flex-1">
                            <p className="text-[10px] mb-0.5" style={{ color: f.color, fontWeight: 700, letterSpacing: 0.5 }}>{s.actor.toUpperCase()}</p>
                            <p className="text-[12.5px]" style={{ color: D, lineHeight: 1.5 }}>{s.action}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Data Model + Integrations */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8 pb-6" style={{ borderBottom: "1px solid #F0F0F0" }}>
                    <div>
                      <p className="heading text-[11px] mb-3" style={{ color: f.color, letterSpacing: 1 }}>DATA TABLES</p>
                      <div className="flex flex-wrap gap-2">
                        {f.data.map((d, i) => (
                          <span key={i} className="text-[11px] font-mono px-2.5 py-1 rounded-md" style={{
                            background: "#FAFAFA", border: "1px solid #EBEBEB", color: D,
                          }}>{d}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="heading text-[11px] mb-3" style={{ color: f.color, letterSpacing: 1 }}>INTEGRATIONS</p>
                      <div className="flex flex-wrap gap-2">
                        {f.integrations.map((it, i) => (
                          <span key={i} className="text-[11px] px-2.5 py-1 rounded-md" style={{
                            background: `${f.color}10`, color: f.color, border: `1px solid ${f.color}30`, fontWeight: 500,
                          }}>{it}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Business Rules */}
                  <div className="mb-8 pb-6" style={{ borderBottom: "1px solid #F0F0F0" }}>
                    <p className="heading text-[11px] mb-3" style={{ color: f.color, letterSpacing: 1 }}>BUSINESS RULES</p>
                    <ul className="space-y-2">
                      {f.rules.map((r, i) => (
                        <li key={i} className="text-[12.5px] flex items-start gap-2.5" style={{ color: "rgba(0,0,0,0.7)", lineHeight: 1.6 }}>
                          <CheckCircle2 size={13} style={{ color: f.color, marginTop: 3, flexShrink: 0 }} />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Edge Cases */}
                  <div className="mb-8 pb-6" style={{ borderBottom: "1px solid #F0F0F0" }}>
                    <p className="heading text-[11px] mb-3" style={{ color: f.color, letterSpacing: 1 }}>EDGE CASES</p>
                    <ul className="space-y-2">
                      {f.edges.map((e, i) => (
                        <li key={i} className="text-[12.5px] flex items-start gap-2.5" style={{ color: "rgba(0,0,0,0.7)", lineHeight: 1.6 }}>
                          <AlertCircle size={13} style={{ color: R, marginTop: 3, flexShrink: 0 }} />
                          <span>{e}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Out of Scope */}
                  <div>
                    <p className="heading text-[11px] mb-3" style={{ color: R, letterSpacing: 1 }}>OUT OF SCOPE (PHASE 1)</p>
                    <ul className="space-y-1.5">
                      {f.outOfScope.map((o, i) => (
                        <li key={i} className="text-[12.5px] flex items-start gap-2.5" style={{ color: "rgba(0,0,0,0.55)", lineHeight: 1.55 }}>
                          <span style={{ color: R, marginTop: 7, fontSize: 7, opacity: 0.6 }}>✕</span>
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PART III — CROSS-CUTTING (5 sections)
          ══════════════════════════════════════════════════════════ */}
      <section style={{ padding: "100px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <PartHeader
            part="Part III"
            eyebrow="Cross-cutting"
            title="Non-functional, compliance, acceptance, open items."
            accent={P}
            count="Sections 17 – 20 · The umbrellas that span every feature"
          />

          {/* ═══ 17 — NON-FUNCTIONAL REQUIREMENTS ═══ */}
          <div id="nfr" className="fsd-slide opacity-0 mb-24">
            <SectionHead n="17" eyebrow="Non-Functional Requirements" title="What 'done' means at the system level." color={P}
              subtitle="The umbrellas that hang over every feature — performance, security, availability, accessibility, localization, browser support. Quantified where measurable, declared where boolean." />

            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  title: "Performance", icon: Settings, color: G,
                  items: [
                    ["LCP (Largest Contentful Paint)", "< 2.0 s on 4G mid-range device"],
                    ["INP (Interaction to Next Paint)", "< 200 ms"],
                    ["CLS (Cumulative Layout Shift)", "< 0.05"],
                    ["TTFB (Time to First Byte)", "< 600 ms on edge"],
                    ["Owner dashboard load (server-rendered)", "< 1.5 s p95"],
                    ["Form submission (Server Action)", "< 800 ms p95"],
                  ],
                },
                {
                  title: "Security", icon: Lock, color: R,
                  items: [
                    ["Auth", "Phone + OTP (owner) / Email + 2FA (staff)"],
                    ["Sessions", "HTTP-only secure cookies, SameSite=Strict, 30 d owner / 8 h staff"],
                    ["Row-Level Security", "Enforced at Postgres for every table"],
                    ["Data in transit", "TLS 1.3 only; HSTS preload"],
                    ["Data at rest", "AES-256 encryption via Supabase"],
                    ["PII fields", "National ID hashed at rest; only last 4 visible to staff"],
                    ["Rate limiting", "Per-IP + per-account on forms, OTP requests, payment attempts"],
                    ["Dependency scanning", "GitHub Dependabot + npm audit in CI"],
                  ],
                },
                {
                  title: "Availability", icon: Server, color: B,
                  items: [
                    ["Uptime target", "99.9% (Vercel + Supabase SLA)"],
                    ["Backups", "Daily Postgres snapshot + point-in-time recovery (7 d)"],
                    ["Failover", "Vercel edge automatic; Supabase read replicas configurable"],
                    ["Synthetic monitoring", "Uptime checks every 60 s on /, /models, /account, /api/health"],
                    ["Incident response", "On-call rotation set with the team; alerting via PagerDuty / Slack"],
                  ],
                },
                {
                  title: "Accessibility", icon: Eye, color: A,
                  items: [
                    ["Target", "WCAG 2.2 AA across the entire owner-facing site"],
                    ["Keyboard navigation", "Full — including all forms, dashboard, calculator"],
                    ["Screen reader", "Semantic HTML, ARIA where dynamic, tested with VoiceOver + NVDA"],
                    ["Contrast", "Minimum 4.5:1 for body text, 3:1 for large text"],
                    ["Motion", "Respects prefers-reduced-motion; opt-out for GSAP animations"],
                    ["Forms", "Visible labels, error messages, required-field indicators"],
                  ],
                },
                {
                  title: "Localization", icon: Globe, color: P,
                  items: [
                    ["Locales", "Arabic (primary) + English (secondary)"],
                    ["Routing", "/ar/* and /en/* — locale baked into URL"],
                    ["RTL", "Handled at route-group level (not per-component patches)"],
                    ["Content model", "Parallel records — AR composed natively, not translated"],
                    ["Numerals", "Western numerals for finance + dates; Arabic-Indic where editorial"],
                    ["Currency", "SAR symbol on left of figure (KSA convention)"],
                  ],
                },
                {
                  title: "Browser & Device Support", icon: Smartphone, color: G,
                  items: [
                    ["Mobile", "iOS Safari 15+ · Android Chrome 100+"],
                    ["Desktop", "Chrome / Edge / Safari / Firefox latest two majors"],
                    ["Mobile-first breakpoints", "<= 640 px (S) · 641–1024 (M) · > 1024 (L)"],
                    ["Touch targets", "≥ 44×44 px"],
                    ["Offline", "Service worker for static assets only (Phase 1)"],
                    ["Low-bandwidth", "Image lazy loading + AVIF/WebP fallbacks; brochure PDFs streamed"],
                  ],
                },
              ].map((cat) => (
                <div key={cat.title} className="rounded-2xl overflow-hidden" style={{ border: "1px solid #EBEBEB", background: "#fff" }}>
                  <div className="p-5 flex items-center gap-3" style={{ background: "#FAFAFA", borderBottom: "1px solid #EBEBEB" }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: 10,
                      background: `${cat.color}15`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <cat.icon size={16} style={{ color: cat.color }} />
                    </div>
                    <h4 className="heading text-base" style={{ color: D }}>{cat.title}</h4>
                  </div>
                  <table className="w-full text-[12.5px]">
                    <tbody>
                      {cat.items.map((row, i) => (
                        <tr key={i} style={{ borderBottom: i < cat.items.length - 1 ? "1px solid #F4F4F4" : "none" }}>
                          <td className="py-2.5 px-5" style={{ color: "rgba(0,0,0,0.6)", width: "40%", verticalAlign: "top" }}>{row[0]}</td>
                          <td className="py-2.5 px-5" style={{ color: D, fontWeight: 500 }}>{row[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>

          {/* ═══ 18 — PDPL / SDAIA HOOKS ═══ */}
          <div id="pdpl" className="fsd-slide opacity-0 mb-24">
            <SectionHead n="18" eyebrow="PDPL / SDAIA Hooks" title="Compliance — where it lives in the code." color={P}
              subtitle="The Saudi Personal Data Protection Law sets the rules; this section maps each rule to where it is enforced in the system. The proposal's Section 15 lists the surface area; this section is the technical contract." />

            <div className="rounded-2xl overflow-hidden mb-6" style={{ border: "1px solid #EBEBEB" }}>
              <div className="overflow-x-auto">
                <table className="w-full text-[12px]" style={{ minWidth: 900 }}>
                  <thead>
                    <tr style={{ background: D }}>
                      {["PDPL CONTROL", "WHERE ENFORCED", "EVIDENCE", "OWNER"].map((h) => (
                        <th key={h} className="text-left py-3 px-4" style={{ color: "#fff", fontWeight: 600, fontSize: 10, letterSpacing: 0.5 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Lawful basis · Consent", "Form-level consent checkboxes; consent_log records", "consent_log entries (timestamp + IP + version)", "System"],
                      ["Lawful basis · Contract", "Transactional flows (booking, reservation, warranty)", "Order / reservation / appointment records", "System"],
                      ["Right to access", "Owner dashboard → 'Download my data' button", "Generates JSON export; logged in audit_log", "Owner self-serve"],
                      ["Right to rectification", "Owner profile edit page", "audit_log diff of changed fields", "Owner self-serve"],
                      ["Right to erasure", "Owner dashboard → 'Delete my account'", "Soft delete 30 days → hard delete; audit_log preserved (anonymized)", "Owner self-serve"],
                      ["Withdraw consent", "Per-channel toggles in account → consent settings", "consent_log records with granted=false", "Owner self-serve"],
                      ["Data minimization", "Schema review — only fields with documented purpose", "FSD Section 05 + code review checklist", "Team"],
                      ["Data residency (KSA / GCC)", "Supabase region selection + asset CDN config", "Infrastructure config screenshots; provider SLA", "Infra / Admin"],
                      ["Cookie consent (granular)", "Cookie banner on first visit", "consent_log records per category", "Frontend"],
                      ["Cross-border transfer", "Blocked at infra level; if needed, separate consent required", "Network policy + consent flow", "Infra / Legal"],
                      ["Breach notification (72 h)", "Internal incident process + SDAIA notification template", "Documented runbook; pre-drafted SDAIA letter", "DPO / Admin"],
                      ["Marketing opt-in only", "All marketing channels default-off in consent_log", "consent_log audit", "System"],
                      ["Children data (< 18)", "Not collected — site is for buyers / adult owners", "Form copy excludes minors; admin manual review for edge", "Legal"],
                      ["Sensitive data (health, biometric)", "Not collected — no biometric login, no health fields", "Schema review", "Team"],
                    ].map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#FAFAFA" }}>
                        {row.map((c, j) => (
                          <td key={j} className="py-2.5 px-4 text-[12px]" style={{
                            color: j === 0 ? D : "rgba(0,0,0,0.65)",
                            fontWeight: j === 0 ? 600 : 400,
                            borderBottom: "1px solid #F4F4F4",
                          }}>{c}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-5 rounded-2xl flex items-start gap-3" style={{ background: `${P}08`, border: `1px solid ${P}25` }}>
              <ShieldCheck size={18} style={{ color: P, marginTop: 2, flexShrink: 0 }} />
              <p className="text-[12.5px]" style={{ color: "rgba(0,0,0,0.65)", lineHeight: 1.65 }}>
                <span style={{ color: P, fontWeight: 700 }}>Out of scope (legal team owns) · </span>
                Designation of the Data Protection Officer (DPO), formal Records of Processing Activities (ROPA), Data Processing Agreements (DPAs) with third-party processors, and any cross-border transfer impact assessments. The website provides the technical foundation; the formal artefacts above remain with Motion Motors&apos; legal team.
              </p>
            </div>
          </div>

          {/* ═══ 19 — ACCEPTANCE CRITERIA ═══ */}
          <div id="acceptance" className="fsd-slide opacity-0 mb-24">
            <SectionHead n="19" eyebrow="Acceptance Criteria" title="What 'this feature is done' means." color={P}
              subtitle="The Definition of Done per feature. If a row below cannot be ticked, the feature does not ship — for any reason." />

            <div className="space-y-4">
              {[
                { feat: "Owner Account · My Garage", crit: [
                  "Phone + OTP login works on iOS Safari, Android Chrome, desktop Chrome / Edge / Safari",
                  "Owner sees only their own vehicles, history, documents (RLS verified by penetration test)",
                  "Account deletion soft-deletes for 30 days, then hard-deletes — verified end-to-end",
                  "Cross-locale (AR + EN) — every dashboard string is localized; RTL renders correctly",
                ]},
                { feat: "Service Booking", crit: [
                  "Booking creates a service_appointments record + confirmations across WA + SMS + Email",
                  "24-hour reminder fires reliably (cron logged + verified in notifications_log)",
                  "Slot capacity respected — concurrent booking attempts on same slot do not double-book",
                  "Status updates from staff propagate to the owner dashboard within 30 seconds",
                ]},
                { feat: "Warranty Registration & Tracking", crit: [
                  "Delivery action auto-creates warranty records and emails the PDF",
                  "Owner sees warranty status badge (active / expiring / expired) per vehicle",
                  "Claim filing creates a claim record visible to service staff in their queue",
                ]},
                { feat: "Genuine Parts · Browse & Request", crit: [
                  "Catalog filterable by category + VIN compatibility (when VIN provided)",
                  "Request creates a parts_requests record + notifies service staff queue",
                  "Owner notified within minutes when staff quotes a price",
                ]},
                { feat: "Post-Purchase Automation Cadence", crit: [
                  "Sale-delivery action triggers the full cadence (Day 0 → Month 6)",
                  "Marketing channels obey per-owner consent — unsubscribe halts marketing portion within 60 seconds",
                  "Locale resolution at send-time matches owner.preferred_locale",
                  "Failed sends retry 3× with exponential backoff; persistent failure alerts admin",
                ]},
                { feat: "Online Reservation", crit: [
                  "Successful payment marks the unit held; failed payment leaves inventory unchanged",
                  "14-day hold expiry auto-releases and auto-refunds — verified end-to-end",
                  "Duplicate reservation prevention works at submit (one active per mobile + national ID)",
                  "Receipt PDF emailed, WA + SMS + Email confirmations fire on success",
                ]},
                { feat: "Roadside Assistance", crit: [
                  "One-tap button visible on every owner-facing page",
                  "Request logged in notifications_log even if WA / phone is dismissed",
                  "Geolocation request is permission-gated and gracefully falls back to manual entry",
                ]},
                { feat: "Service Plans", crit: [
                  "Plan purchase activates against the chosen VIN; PDF emailed",
                  "Service booking on a vehicle with an active plan auto-applies the plan benefits",
                  "Plan usage history visible in owner account",
                ]},
                { feat: "Cross-cutting (foundation)", crit: [
                  "All NFR targets in Section 17 met or exceeded in pre-launch testing",
                  "PDPL controls in Section 18 ticked off in compliance review",
                  "Bilingual QA across every owner-facing page (AR + EN) signed off",
                  "Accessibility audit (WCAG 2.2 AA) passed for every public template",
                ]},
              ].map((row, i) => (
                <div key={i} className="rounded-2xl overflow-hidden" style={{ border: "1px solid #EBEBEB" }}>
                  <div className="px-5 py-3 flex items-center gap-3" style={{ background: `${P}10`, borderBottom: "1px solid #EBEBEB" }}>
                    <span className="heading text-sm" style={{ color: P }}>{row.feat}</span>
                    <span className="text-[11px] font-mono" style={{ color: "rgba(0,0,0,0.4)", marginLeft: "auto" }}>{row.crit.length} criteria</span>
                  </div>
                  <ul className="p-5 space-y-2">
                    {row.crit.map((c, j) => (
                      <li key={j} className="text-[12.5px] flex items-start gap-3" style={{ color: D, lineHeight: 1.55 }}>
                        <span style={{
                          width: 16, height: 16, borderRadius: 4,
                          background: "#fff", border: `1.5px solid ${P}50`,
                          flexShrink: 0, marginTop: 2,
                        }} />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* ═══ 20 — OPEN ITEMS ═══ */}
          <div id="open" className="fsd-slide opacity-0 mb-24">
            <SectionHead n="20" eyebrow="Open Items" title="What we still need to lock down." color={P}
              subtitle="Items required to finalize this FSD before we kick off Week 1. Each must close before development begins on the affected feature." />

            <div className="space-y-3">
              {[
                { n: "OI-01", topic: "Payment gateway selection", feature: "Online Reservation", needed: "Choose between Hyperpay / Moyasar / Tabby. Affects integration spec + checkout flow.", owner: "Motion Motors finance + tech", urgency: "Pre-Week 1" },
                { n: "OI-02", topic: "Deposit hold duration + refund schedule", feature: "Online Reservation", needed: "Confirm 14-day hold + refund policy with legal. Stamped on T&Cs version.", owner: "Motion Motors legal + sales", urgency: "Pre-Week 1" },
                { n: "OI-03", topic: "Service center capacity calendar", feature: "Service Booking", needed: "Provide slot capacity per day per service type, plus operating hours per showroom.", owner: "Motion Motors service ops", urgency: "Week 1" },
                { n: "OI-04", topic: "Warranty term defaults per model", feature: "Warranty Tracking", needed: "Standard + engine + battery (EV) warranty terms per S06 / S06DM / S07 / S08DM / S09.", owner: "Motion Motors after-sales", urgency: "Week 1" },
                { n: "OI-05", topic: "Service plan catalog + pricing", feature: "Service Plans", needed: "Plan names, inclusions, pricing, term, refund schedule.", owner: "Motion Motors after-sales", urgency: "Week 2" },
                { n: "OI-06", topic: "Parts inventory feed", feature: "Parts Catalog", needed: "Confirm feed source (internal ERP / Soueast Hub / manual). Format + frequency.", owner: "Motion Motors IT + after-sales", urgency: "Week 2" },
                { n: "OI-07", topic: "Notification message templates (AR + EN)", feature: "Cadence + all flows", needed: "Approved final copy for every event in the Notifications Matrix (Section 08).", owner: "Motion Motors marketing", urgency: "Week 2" },
                { n: "OI-08", topic: "DPO designation + ROPA template", feature: "PDPL compliance", needed: "Identify the DPO and provide the ROPA template the website registers should match.", owner: "Motion Motors legal", urgency: "Pre-launch" },
                { n: "OI-09", topic: "Roadside partner number + coverage map", feature: "Roadside Assistance", needed: "Official number + coverage areas + claim process.", owner: "Motion Motors after-sales", urgency: "Week 3" },
                { n: "OI-10", topic: "CRM endpoint or webhook URL", feature: "Lead Engine + Reservation + Bookings", needed: "Where leads land. Final platform + auth + payload schema.", owner: "Motion Motors IT", urgency: "Week 1" },
              ].map((o, i) => (
                <div key={i} className="rounded-2xl p-5 flex items-start gap-4" style={{
                  background: "#fff", border: `1.5px solid ${P}25`,
                  boxShadow: `3px 3px 0px 0px ${P}15`,
                }}>
                  <span className="heading text-[11px] font-mono px-2 py-1 rounded" style={{
                    background: `${P}10`, color: P, letterSpacing: 0.5,
                  }}>{o.n}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                      <h4 className="heading text-[14px]" style={{ color: D }}>{o.topic}</h4>
                      <span className="text-[10.5px] px-2 py-0.5 rounded" style={{
                        background: `${B}10`, color: B, fontWeight: 600,
                      }}>{o.feature}</span>
                    </div>
                    <p className="text-[12.5px] mb-2" style={{ color: "rgba(0,0,0,0.65)", lineHeight: 1.55 }}>
                      <span style={{ color: P, fontWeight: 600 }}>Needed · </span>{o.needed}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px]" style={{ color: "rgba(0,0,0,0.5)" }}>
                      <span><strong style={{ color: D }}>Owner:</strong> {o.owner}</span>
                      <span><strong style={{ color: D }}>By:</strong> {o.urgency}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer style={{ padding: "40px 24px", background: D, color: "rgba(255,255,255,0.4)" }}>
        <div className="flex flex-wrap items-center justify-between gap-4 text-[11px]" style={{ maxWidth: 1100, margin: "0 auto" }}>
          <span>Motion Motors · DMS & After-Sales FSD · v0.1 Draft</span>
          <span>Ahmed Ali · Head of Digital &amp; Growth Lead</span>
          <span>End of document · May 19, 2026</span>
        </div>
      </footer>
    </div>
  );
}

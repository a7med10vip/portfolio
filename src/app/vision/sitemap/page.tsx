"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  Position,
  Handle,
  useReactFlow,
  type Node,
  type Edge,
  type NodeProps,
} from "reactflow";
import "reactflow/dist/style.css";
import dagre from "dagre";
import { toPng } from "html-to-image";
import {
  Globe, BrainCircuit, LayoutDashboard, ShieldCheck,
  ArrowLeft, Download, Eye, EyeOff, Maximize2,
  Store, Sparkles, CheckCircle2, Layers, UserCheck, Users, Briefcase,
  type LucideIcon,
} from "lucide-react";

/* ═══════════ COLORS ═══════════ */
const G = "#4FFFB0";
const D = "#0A0A0A";
const P = "#5227FF";
const B = "#3B82F6";
const A = "#F59E0B";
const R = "#EF4444";

/* Returns legible text color for a solid-color background */
const onColor = (bg: string) => (bg === P || bg === B || bg === D ? "#fff" : D);

/* Persona colors — for user journey flows */
const PERSONA = {
  visitor: { color: G, label: "Visitor", icon: UserCheck, desc: "Discovers, signs up, converts" },
  client: { color: B, label: "Paying Client", icon: Users, desc: "Uses portal & marketplace" },
  team: { color: A, label: "Internal Team", icon: Briefcase, desc: "Delivers work through hub" },
} as const;
type PersonaKey = keyof typeof PERSONA;

/* Build phases — match /vision Roadmap */
const PHASES = {
  1: { label: "P1", full: "Foundation", color: G, desc: "4–6 weeks" },
  2: { label: "P2", full: "Intelligence", color: P, desc: "6–8 weeks" },
  3: { label: "P3", full: "Operations", color: A, desc: "4–6 weeks" },
} as const;
type Phase = 1 | 2 | 3;

type Priority = "Critical" | "High" | "Medium";
type PageTuple = [name: string, desc: string, kpi: string, priority: Priority, phase: Phase];

const pillars: { id: string; label: string; icon: LucideIcon; color: string; pages: PageTuple[] }[] = [
  {
    id: "public", label: "Public Website", icon: Globe, color: G,
    pages: [
      ["Homepage", "Hero, social proof, services overview, featured case studies, conversion CTA", "Bounce < 35%", "Critical", 1],
      ["About Us", "Brand story, team profiles, vision statement, company milestones timeline", "Time > 2min", "High", 1],
      ["Services Hub", "6 service pages: SEO, Paid Ads, Social Media, Branding, Web Dev, AI", "CTA > 8%", "Critical", 1],
      ["Case Studies", "Detailed breakdowns with before/after metrics, ROI data, testimonials", "Lead fills", "High", 1],
      ["Blog & Resources", "SEO content hub — articles, guides, whitepapers, templates", "Organic growth", "High", 1],
      ["Landing Pages", "Campaign-specific with A/B testing, conversion tracking", "Conv > 5%", "Medium", 1],
      ["Branches", "Office locations with maps, directions, local SEO schema", "Local rank", "Medium", 1],
      ["Contact", "Multi-step form: service → budget → timeline → upload → routing", "Completion rate", "Critical", 1],
    ],
  },
  {
    id: "ai", label: "AI SaaS Engine", icon: BrainCircuit, color: P,
    pages: [
      ["AI Landing Page", "Value proposition, demo video, social proof, free trial CTA", "Sign-up > 12%", "Critical", 2],
      ["Smart Questionnaire", "8-12 questions: industry, goals, budget, competition, audience", "Complete > 70%", "Critical", 2],
      ["AI Analysis Engine", "Real-time processing with progress indicator, benchmark comparison", "Gen < 30s", "Critical", 2],
      ["Strategy Report", "Full PDF: SWOT, Persona, Channels, Budget, Content Calendar", "Share > 15%", "Critical", 2],
      ["Competitor Analysis", "AI-powered competitor scan: channels, spend, strategy, weak spots", "Accuracy", "High", 2],
      ["Persona Builder", "Generates detailed buyer personas with pain points and objections", "Usefulness", "High", 2],
      ["Bundle Pricing", "Per-agent & bundle pricing with auto-discount as client adds agents", "Upgrade > 8%", "High", 2],
      ["User Dashboard", "Saved strategies, generation history, account, referral program", "Retention", "Medium", 2],
    ],
  },
  {
    id: "portal", label: "Client Portal", icon: LayoutDashboard, color: B,
    pages: [
      ["KPI Dashboard", "Live metrics: ad spend, leads, conversions, CPL, ROI — auto-refresh", "Daily active", "Critical", 1],
      ["Client Drive", "Private file space per client — deliverables, assets, contracts", "Usage rate", "Critical", 1],
      ["Project Phases", "Visual phase tracker: Discovery → Strategy → Execution → Optimize", "Visibility", "Critical", 1],
      ["Content Approvals", "Review designs, copy, posts — approve/reject/request changes", "< 24h approve", "High", 1],
      ["AI Marketplace", "Browse 20+ AI agents, bundle deals, auto-discount — add to subscription", "Attach rate > 40%", "Critical", 2],
      ["My AI Agents", "Active subscriptions, usage stats, 1-click launch for each subscribed agent", "Daily use", "Critical", 2],
      ["Reports Hub", "All reports in one place — weekly/monthly, custom ranges, PDF export", "Views/week", "High", 1],
      ["Team Visibility", "See dedicated team: name, photo, role, online status", "Satisfaction", "High", 3],
      ["Email Notifications", "Auto alerts: upload, phase, report, invoice, approval needed", "Open rate", "High", 1],
      ["Meeting Scheduler", "Book meetings from portal — syncs calendar, auto-reminders", "Booking rate", "Medium", 1],
      ["Feedback System", "Client rates each phase — builds quality score per team member", "Response rate", "Medium", 3],
      ["Team Chat", "In-portal messaging per project — client ↔ team with file sharing", "Adoption", "Medium", 1],
      ["Billing Center", "Invoice history, current plan, payments, auto-receipts, upgrade", "Self-serve 90%", "Medium", 1],
    ],
  },
  {
    id: "hub", label: "Agency Hub", icon: ShieldCheck, color: A,
    pages: [
      ["Admin Dashboard", "Bird's-eye view: clients, projects, revenue, utilization, alerts", "Decision speed", "Critical", 3],
      ["Task Board", "Internal Kanban synced with client portal — moves reflect live", "Completion rate", "Critical", 3],
      ["Staff Roles", "4 levels: Owner, Manager, Specialist, Intern — granular perms, audit log", "Security", "High", 3],
      ["Client Accounts", "Onboard in minutes: account, team, budget, contract", "< 10min onboard", "High", 3],
      ["Internal Chat", "Team-only messaging per project — @mentions, threads", "Adoption", "High", 3],
      ["Automations", "Trigger chains: new client → assign → welcome → project → kickoff", "Manual -70%", "High", 3],
      ["Team Analytics", "Per-member: tasks done, response time, satisfaction score", "Efficiency", "Medium", 3],
      ["Workload Balancer", "AI-suggested task distribution based on capacity and skills", "Balance score", "Medium", 3],
      ["Client Health Score", "Auto-calculated: activity, satisfaction, response → Active/At Risk", "Churn predict", "Medium", 3],
      ["Time Tracking", "Per-task time logs — team sees time, managers see utilization", "Accuracy", "Medium", 3],
      ["SLA Alerts", "Automated warnings when task approaches deadline — escalation", "On-time rate", "Medium", 3],
    ],
  },
];

/* User-journey flows — color-coded by persona */
const journeys: { from: string; to: string; label?: string; persona: PersonaKey }[] = [
  /* Visitor: discovers → converts */
  { from: "page-Homepage", to: "page-AI Landing Page", label: "Discover AI", persona: "visitor" },
  { from: "page-AI Landing Page", to: "page-Smart Questionnaire", persona: "visitor" },
  { from: "page-Smart Questionnaire", to: "page-AI Analysis Engine", persona: "visitor" },
  { from: "page-AI Analysis Engine", to: "page-Strategy Report", persona: "visitor" },
  { from: "page-Strategy Report", to: "page-Bundle Pricing", label: "Upgrade", persona: "visitor" },
  { from: "page-Bundle Pricing", to: "page-User Dashboard", persona: "visitor" },

  /* Client: onboard → use → expand */
  { from: "page-Contact", to: "page-Client Accounts", label: "Onboard", persona: "client" },
  { from: "page-Client Accounts", to: "page-KPI Dashboard", label: "Portal access", persona: "client" },
  { from: "page-User Dashboard", to: "page-KPI Dashboard", label: "Becomes client", persona: "client" },
  { from: "page-KPI Dashboard", to: "page-AI Marketplace", label: "Browse AI", persona: "client" },
  { from: "page-AI Marketplace", to: "page-My AI Agents", label: "Subscribe", persona: "client" },
  { from: "page-My AI Agents", to: "page-AI Analysis Engine", label: "Use Agent", persona: "client" },

  /* Internal team: delivers through hub */
  { from: "page-Task Board", to: "page-Project Phases", label: "Auto-sync", persona: "team" },
  { from: "page-Client Accounts", to: "page-Task Board", label: "Assign team", persona: "team" },
];

/* ═══════════ CUSTOM NODES ═══════════ */
const priorityStyle = (p: Priority) => {
  if (p === "Critical") return { bg: `${R}12`, fg: R };
  if (p === "High") return { bg: `${A}15`, fg: A };
  return { bg: "#F3F4F6", fg: "#6B7280" };
};

function RootNode({ data }: NodeProps<{ label: string }>) {
  return (
    <div style={{
      background: D, color: "#fff", padding: "18px 36px", borderRadius: 20,
      border: `2px solid ${D}`, boxShadow: `6px 6px 0px 0px ${G}`, minWidth: 220, textAlign: "center",
    }}>
      <div style={{ fontSize: 10, letterSpacing: 2, opacity: 0.6, marginBottom: 4 }}>PLATFORM ROOT</div>
      <div style={{ fontFamily: "var(--font-bricolage)", fontSize: 28, fontWeight: 700, lineHeight: 1 }}>{data.label}</div>
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
}

function PillarNode({ data }: NodeProps<{ label: string; color: string; icon: LucideIcon; count: number }>) {
  const Icon = data.icon;
  return (
    <div style={{
      background: "#fff", padding: "14px 22px", borderRadius: 18,
      border: `2px solid ${D}`, boxShadow: `4px 4px 0px 0px ${data.color}`, minWidth: 240,
    }}>
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: `${data.color}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={20} color={data.color} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "var(--font-bricolage)", fontSize: 16, fontWeight: 700, color: D, lineHeight: 1.1 }}>{data.label}</div>
          <div style={{ fontSize: 11, color: "rgba(0,0,0,0.55)", marginTop: 2 }}>{data.count} pages</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
}

function PageNode({ data }: NodeProps<{ label: string; desc: string; kpi: string; priority: Priority; phase: Phase; color: string }>) {
  const pStyle = priorityStyle(data.priority);
  const phase = PHASES[data.phase] ?? PHASES[1];
  return (
    <div style={{
      background: "#fff", padding: "12px 14px", borderRadius: 14,
      border: `1.5px solid #D4D4D4`, boxShadow: `3px 3px 0px 0px ${data.color}`,
      width: 230,
    }}>
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: D, lineHeight: 1.15, flex: 1 }}>{data.label}</div>
        <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
          <span title={`${phase.full} — ${phase.desc}`} style={{ fontSize: 9, fontWeight: 800, letterSpacing: 0.5, padding: "3px 5px", borderRadius: 4, background: phase.color, color: onColor(phase.color), border: `1px solid ${D}` }}>{phase.label}</span>
          <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "3px 6px", borderRadius: 4, background: pStyle.bg, color: pStyle.fg, whiteSpace: "nowrap" }}>{data.priority}</span>
        </div>
      </div>
      <p style={{ fontSize: 10, color: "rgba(0,0,0,0.6)", lineHeight: 1.4, margin: 0, marginBottom: 6 }}>{data.desc}</p>
      <div style={{ fontSize: 9, fontWeight: 600, color: data.color, letterSpacing: 0.5 }}>↗ {data.kpi}</div>
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
}

const NODE_TYPES = Object.freeze({ root: RootNode, pillar: PillarNode, page: PageNode });

/* ═══════════ LAYOUT (dagre) ═══════════ */
function layoutNodes(nodes: Node[], edges: Edge[]) {
  const g = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: "TB", nodesep: 28, ranksep: 90, marginx: 40, marginy: 40 });

  nodes.forEach((n) => {
    const w = n.type === "root" ? 260 : n.type === "pillar" ? 260 : 230;
    const h = n.type === "root" ? 80 : n.type === "pillar" ? 80 : 110;
    g.setNode(n.id, { width: w, height: h });
  });
  edges.forEach((e) => {
    if (!e.data?.journey) g.setEdge(e.source, e.target);
  });

  dagre.layout(g);

  return nodes.map((n) => {
    const p = g.node(n.id);
    return { ...n, position: { x: p.x - p.width / 2, y: p.y - p.height / 2 } };
  });
}

/* ═══════════ DATA BUILDERS ═══════════ */
function buildInitial(): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [{ id: "root", type: "root", position: { x: 0, y: 0 }, data: { label: "OMENA" } }];
  const edges: Edge[] = [];

  pillars.forEach((pil) => {
    nodes.push({
      id: `pillar-${pil.id}`, type: "pillar", position: { x: 0, y: 0 },
      data: { label: pil.label, color: pil.color, icon: pil.icon, count: pil.pages.length },
    });
    edges.push({ id: `e-root-${pil.id}`, source: "root", target: `pillar-${pil.id}`, type: "smoothstep", style: { stroke: pil.color, strokeWidth: 2 } });

    pil.pages.forEach((pg) => {
      const id = `page-${pg[0]}`;
      nodes.push({
        id, type: "page", position: { x: 0, y: 0 },
        data: { label: pg[0], desc: pg[1], kpi: pg[2], priority: pg[3], phase: pg[4], color: pil.color, pillarId: pil.id },
      });
      edges.push({ id: `e-${pil.id}-${id}`, source: `pillar-${pil.id}`, target: id, type: "smoothstep", style: { stroke: `${pil.color}70`, strokeWidth: 1.5 } });
    });
  });

  journeys.forEach((j, i) => {
    const persona = PERSONA[j.persona];
    edges.push({
      id: `j-${i}`, source: j.from, target: j.to, type: "smoothstep",
      animated: true, label: j.label,
      style: { stroke: persona.color, strokeWidth: 2, strokeDasharray: "6 4" },
      labelStyle: { fontSize: 9, fontWeight: 700, fill: D },
      labelBgStyle: { fill: "#fff", stroke: persona.color, strokeWidth: 1.5 },
      labelBgPadding: [4, 6] as [number, number],
      data: { journey: true, persona: j.persona },
    });
  });

  return { nodes: layoutNodes(nodes, edges), edges };
}

/* ═══════════ SUMMARY BAR ═══════════ */
function SummaryBar({ counts }: { counts: { pillars: number; pages: number; flows: number; phases: number } }) {
  return (
    <div style={{
      position: "absolute", top: 76, left: "50%", transform: "translateX(-50%)", zIndex: 9,
      display: "flex", alignItems: "center", gap: 0, pointerEvents: "auto",
      background: D, borderRadius: 12, boxShadow: `3px 3px 0px 0px ${G}`,
      overflow: "hidden", border: `1.5px solid ${D}`,
    }}>
      {[
        { label: "Pillars", value: counts.pillars, color: G },
        { label: "Pages", value: counts.pages, color: B },
        { label: "User Flows", value: counts.flows, color: P },
        { label: "Build Phases", value: counts.phases, color: A },
      ].map((s, i, arr) => (
        <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: s.color, fontFamily: "var(--font-bricolage)", lineHeight: 1 }}>{s.value}</div>
          <div style={{ fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════ TOP BAR ═══════════ */
function TopBar({
  visible, onToggle, onExport, onShowJourneys, showJourneys,
}: {
  visible: Record<string, boolean>;
  onToggle: (id: string) => void;
  onExport: () => void;
  onShowJourneys: () => void;
  showJourneys: boolean;
}) {
  return (
    <div style={{
      position: "absolute", top: 16, left: 16, right: 16, zIndex: 10,
      display: "flex", alignItems: "flex-start", gap: 12, flexWrap: "wrap",
      pointerEvents: "none",
    }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", pointerEvents: "auto" }}>
        <Link href="/vision" style={{
          display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px",
          background: "#fff", border: `1.5px solid ${D}`, borderRadius: 10,
          boxShadow: `3px 3px 0px 0px ${D}`, color: D, textDecoration: "none",
          fontSize: 12, fontWeight: 700,
        }}>
          <ArrowLeft size={14} /> Back to Vision
        </Link>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ display: "flex", gap: 6, alignItems: "center", pointerEvents: "auto", background: "rgba(255,255,255,0.95)", padding: 6, borderRadius: 12, border: `1.5px solid #D4D4D4`, boxShadow: `3px 3px 0px 0px ${D}`, backdropFilter: "blur(10px)" }}>
        {pillars.map((pil) => {
          const active = visible[pil.id];
          return (
            <button key={pil.id} onClick={() => onToggle(pil.id)} style={{
              display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 10px",
              background: active ? pil.color : "#fff",
              color: active ? onColor(pil.color) : "rgba(0,0,0,0.5)",
              border: `1px solid ${active ? D : "#E5E7EB"}`,
              borderRadius: 8, fontSize: 10, fontWeight: 700, cursor: "pointer",
              transition: "all 0.15s",
            }}>
              <pil.icon size={11} />
              {pil.label}
              {active ? <Eye size={11} /> : <EyeOff size={11} />}
            </button>
          );
        })}
        <div style={{ width: 1, height: 20, background: "#E5E7EB", margin: "0 4px" }} />
        <button onClick={onShowJourneys} style={{
          display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 10px",
          background: showJourneys ? D : "#fff",
          color: showJourneys ? "#fff" : "rgba(0,0,0,0.5)",
          border: `1px solid ${showJourneys ? D : "#E5E7EB"}`,
          borderRadius: 8, fontSize: 10, fontWeight: 700, cursor: "pointer",
        }}>
          User Flows
        </button>
      </div>

      <button onClick={onExport} style={{
        pointerEvents: "auto",
        display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px",
        background: G, border: `1.5px solid ${D}`, borderRadius: 10,
        boxShadow: `3px 3px 0px 0px ${D}`, color: D, cursor: "pointer",
        fontSize: 12, fontWeight: 700,
      }}>
        <Download size={14} /> Export PNG
      </button>
    </div>
  );
}

/* ═══════════ LEGEND ═══════════ */
function Legend() {
  return (
    <div style={{
      position: "absolute", bottom: 16, left: 16, zIndex: 10,
      background: "rgba(255,255,255,0.95)", padding: 14, borderRadius: 12,
      border: `1.5px solid #D4D4D4`, boxShadow: `3px 3px 0px 0px ${D}`,
      fontSize: 10, fontWeight: 600, backdropFilter: "blur(10px)",
      maxWidth: 280,
    }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(0,0,0,0.5)", marginBottom: 10 }}>How to read this map</div>

      {/* Personas */}
      <div style={{ fontSize: 9, fontWeight: 700, color: D, marginBottom: 6 }}>User Flows (dashed)</div>
      <div style={{ display: "grid", gap: 5, marginBottom: 10 }}>
        {(Object.entries(PERSONA) as [PersonaKey, typeof PERSONA[PersonaKey]][]).map(([key, p]) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{
              display: "inline-block", width: 20, height: 0,
              borderTop: `2px dashed ${p.color}`, flexShrink: 0,
            }} />
            <p.icon size={11} color={p.color} />
            <span style={{ color: "rgba(0,0,0,0.75)" }}>{p.label}</span>
            <span style={{ color: "rgba(0,0,0,0.4)", fontWeight: 500 }}>· {p.desc}</span>
          </div>
        ))}
      </div>

      {/* Phases */}
      <div style={{ fontSize: 9, fontWeight: 700, color: D, marginBottom: 6 }}>Build Phases</div>
      <div style={{ display: "grid", gap: 5, marginBottom: 10 }}>
        {(Object.entries(PHASES) as unknown as [string, typeof PHASES[Phase]][]).map(([key, ph]) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 9, fontWeight: 800, padding: "2px 5px", borderRadius: 4, background: ph.color, color: onColor(ph.color), border: `1px solid ${D}`, minWidth: 22, textAlign: "center" }}>{ph.label}</span>
            <span style={{ color: "rgba(0,0,0,0.75)" }}>{ph.full}</span>
            <span style={{ color: "rgba(0,0,0,0.4)", fontWeight: 500 }}>· {ph.desc}</span>
          </div>
        ))}
      </div>

      {/* Priorities */}
      <div style={{ fontSize: 9, fontWeight: 700, color: D, marginBottom: 6 }}>Priority</div>
      <div style={{ display: "grid", gap: 5 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: `${R}15`, border: `1px solid ${R}` }} />
          <span style={{ color: "rgba(0,0,0,0.75)" }}>Critical — ship first</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: `${A}15`, border: `1px solid ${A}` }} />
          <span style={{ color: "rgba(0,0,0,0.75)" }}>High — ship second</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: "#F3F4F6", border: `1px solid #9CA3AF` }} />
          <span style={{ color: "rgba(0,0,0,0.75)" }}>Medium — polish phase</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════ INTRO CARD ═══════════ */
function IntroCard({ onClose, counts }: { onClose: () => void; counts: { pillars: number; pages: number; flows: number } }) {
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 20, pointerEvents: "auto",
      background: "rgba(10,10,10,0.5)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }}>
      <div style={{
        background: "#fff", padding: 32, borderRadius: 20, maxWidth: 560,
        border: `2px solid ${D}`, boxShadow: `8px 8px 0px 0px ${G}`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: D, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Layers size={22} color={G} />
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "rgba(0,0,0,0.5)", textTransform: "uppercase" }}>OMENA</div>
            <div style={{ fontFamily: "var(--font-bricolage)", fontSize: 22, fontWeight: 700, color: D, lineHeight: 1 }}>Site Architecture</div>
          </div>
        </div>
        <p style={{ fontSize: 13, color: "rgba(0,0,0,0.7)", lineHeight: 1.6, margin: 0, marginBottom: 16 }}>
          This is the complete blueprint for your digital platform — <b>{counts.pillars} pillars</b>, <b>{counts.pages} pages</b>, and <b>{counts.flows} user journeys</b>. Every box is a page that will be built. Dashed lines show how users move between them.
        </p>
        <div style={{ display: "grid", gap: 8, marginBottom: 20 }}>
          {[
            { icon: Maximize2, text: "Drag the canvas to pan · scroll to zoom · click any box to focus." },
            { icon: Sparkles, text: "Color of each box = the pillar it belongs to (4 colors, 4 pillars)." },
            { icon: Store, text: "P1 / P2 / P3 badges = the build phase for each page (Foundation → Intelligence → Operations)." },
            { icon: CheckCircle2, text: "When ready, click 'Approve Architecture' at the bottom to sign off or send feedback." },
          ].map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 12, color: "rgba(0,0,0,0.7)", lineHeight: 1.5 }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: `${G}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <t.icon size={12} color={D} />
              </div>
              {t.text}
            </div>
          ))}
        </div>
        <button onClick={onClose} style={{
          width: "100%", padding: "12px 20px", background: G, border: `1.5px solid ${D}`, borderRadius: 10,
          boxShadow: `3px 3px 0px 0px ${D}`, color: D, cursor: "pointer",
          fontSize: 13, fontWeight: 700,
        }}>
          Explore the Architecture →
        </button>
      </div>
    </div>
  );
}

/* ═══════════ MAIN ═══════════ */
function SitemapInner() {
  const initial = useMemo(() => buildInitial(), []);
  const [nodes, setNodes] = useState(initial.nodes);
  const [edges, setEdges] = useState(initial.edges);
  const [visible, setVisible] = useState<Record<string, boolean>>({ public: true, ai: true, portal: true, hub: true });
  const [showJourneys, setShowJourneys] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const { fitView } = useReactFlow();
  const canvasRef = useRef<HTMLDivElement>(null);

  const totalPages = useMemo(() => pillars.reduce((sum, p) => sum + p.pages.length, 0), []);
  const counts = { pillars: pillars.length, pages: totalPages, flows: journeys.length, phases: 3 };

  const toggleVisible = useCallback((id: string) => {
    setVisible((v) => ({ ...v, [id]: !v[id] }));
  }, []);

  useEffect(() => {
    const hidden = Object.entries(visible).filter(([, v]) => !v).map(([k]) => k);
    setNodes((ns) =>
      ns.map((n) => {
        const pid = (n.data as { pillarId?: string })?.pillarId;
        const pillarId = n.id.startsWith("pillar-") ? n.id.replace("pillar-", "") : pid;
        const hide = pillarId ? hidden.includes(pillarId) : false;
        return { ...n, hidden: hide };
      })
    );
    setEdges((es) =>
      es.map((e) => {
        const isJ = e.data?.journey;
        if (isJ) return { ...e, hidden: !showJourneys };
        const srcPillar = e.source.startsWith("pillar-") ? e.source.replace("pillar-", "") : null;
        const hide = srcPillar ? hidden.includes(srcPillar) : false;
        return { ...e, hidden: hide };
      })
    );
    setTimeout(() => fitView({ padding: 0.15, duration: 400 }), 50);
  }, [visible, showJourneys, fitView]);

  const handleExport = useCallback(async () => {
    if (!canvasRef.current) return;
    try {
      const dataUrl = await toPng(canvasRef.current, {
        backgroundColor: "#ffffff",
        width: canvasRef.current.offsetWidth,
        height: canvasRef.current.offsetHeight,
        pixelRatio: 2,
        filter: (node) => {
          const cls = (node as HTMLElement).className || "";
          if (typeof cls !== "string") return true;
          return !cls.includes("react-flow__minimap") && !cls.includes("react-flow__controls");
        },
      });
      const link = document.createElement("a");
      link.download = `omena-sitemap-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export failed:", err);
    }
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, overflow: "hidden",
      background: "radial-gradient(ellipse 1400px 1000px at 50% 35%, #FFFFFF 0%, #F6F7F9 55%, #EDEFF2 100%)",
    }}>
      {showIntro && <IntroCard onClose={() => setShowIntro(false)} counts={counts} />}

      <TopBar
        visible={visible}
        onToggle={toggleVisible}
        onExport={handleExport}
        onShowJourneys={() => setShowJourneys((s) => !s)}
        showJourneys={showJourneys}
      />

      <SummaryBar counts={counts} />

      <div ref={canvasRef} style={{ width: "100%", height: "100%" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={NODE_TYPES}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          minZoom={0.2}
          maxZoom={1.8}
          proOptions={{ hideAttribution: true }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={true}
        >
          <Background id="dots-fine" color="#DDE1E6" gap={16} size={1} />
          <Background id="dots-anchor" color="#B8BEC7" gap={80} size={1.6} />
          <Controls position="bottom-right" showInteractive={false} />
          <MiniMap
            position="top-right"
            style={{ top: 80, background: "#fff", border: `1.5px solid #D4D4D4`, borderRadius: 12, boxShadow: `3px 3px 0px 0px ${D}` }}
            nodeColor={(n) => {
              if (n.type === "root") return D;
              const color = (n.data as { color?: string })?.color;
              return color || "#D1D5DB";
            }}
            maskColor="rgba(0,0,0,0.05)"
          />
        </ReactFlow>
      </div>

      <Legend />

      <button
        onClick={() => fitView({ padding: 0.15, duration: 500 })}
        title="Fit the whole architecture back into view"
        style={{
          position: "absolute", bottom: 16, right: 80, zIndex: 10,
          pointerEvents: "auto", cursor: "pointer",
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "10px 16px", background: "#fff",
          border: `1.5px solid ${D}`, borderRadius: 10,
          boxShadow: `3px 3px 0px 0px ${D}`, color: D,
          fontSize: 12, fontWeight: 700,
        }}
      >
        <Maximize2 size={14} /> Fit View
      </button>
    </div>
  );
}

export default function SitemapPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div style={{
        position: "fixed", inset: 0, overflow: "hidden",
        background: "radial-gradient(ellipse 1400px 1000px at 50% 35%, #FFFFFF 0%, #F6F7F9 55%, #EDEFF2 100%)",
      }} />
    );
  }

  return (
    <ReactFlowProvider>
      <SitemapInner />
    </ReactFlowProvider>
  );
}

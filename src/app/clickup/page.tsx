"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Layers, Zap, Brain, Bot, MessageCircle, FileText, Calendar, BarChart3,
  Users, Target, Award, CheckCircle2, XCircle, Star, TrendingUp, Shield,
  Lock, Globe, ArrowRight, Search, Smartphone, Quote, Sparkles, Mic,
  Workflow, Network, Infinity as InfinityIcon, Wand2, Settings, GitBranch,
  PieChart, Mail, Clock, Headphones, Code2, ListChecks, Megaphone,
  Briefcase, Rocket, ChevronRight, Boxes,
  type LucideIcon,
} from "lucide-react";
import ArabicTailProcessor from "@/components/ArabicTailProcessor";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════ PALETTE ═══════════ */
const G = "#4FFFB0";
const D = "#0A0A0A";
const R = "#EF4444";
const A = "#F59E0B";
const B = "#3B82F6";
const P = "#8B5CF6";

/* ═══════════ HELPER COMPONENTS ═══════════ */

function SectionHead({
  eyebrow, children, color = G, subtitle, light,
}: { eyebrow: string; children: React.ReactNode; color?: string; subtitle?: string; light?: boolean }) {
  return (
    <div className="text-center mb-12">
      <p className="ar-heading text-lg mb-3" style={{ color }}>{eyebrow}</p>
      <h2 className="ar-heading text-4xl md:text-5xl mb-4" style={{ color: light ? "#fff" : D }}>
        {children}
      </h2>
      {subtitle && (
        <p className="text-sm max-w-2xl mx-auto ar-body" style={{ color: light ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ═══════════ MAIN ═══════════ */

export default function ClickUpShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeCompetitor, setActiveCompetitor] = useState<"asana" | "monday" | "slack" | "notion">("asana");

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
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
          }
        );
      });
      gsap.utils.toArray<HTMLElement>(".ph-num").forEach((el) => {
        const v = parseFloat(el.dataset.val || "0");
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () =>
            gsap.to({ n: 0 }, {
              n: v,
              duration: 2,
              ease: "power2.out",
              onUpdate() {
                const cur = (this.targets()[0] as { n: number }).n;
                el.textContent = (el.dataset.format === "money"
                  ? `$${(cur / 1_000_000).toFixed(1)}M`
                  : el.dataset.format === "percent"
                  ? `${Math.round(cur)}%`
                  : el.dataset.format === "comma"
                  ? Math.round(cur).toLocaleString()
                  : Math.round(cur).toString());
              },
            }),
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  /* ═══ DATA ═══ */

  const capabilities: { icon: LucideIcon; title: string; sub: string; color: string }[] = [
    { icon: ListChecks, title: "Projects & Tasks", sub: "Lists, Kanban, Calendar, Gantt, Timeline, Mind Maps", color: G },
    { icon: FileText, title: "Docs & Wikis", sub: "Real-time collaborative documents and knowledge bases", color: B },
    { icon: MessageCircle, title: "Chat", sub: "Channels, DMs, voice + video calls — all linked to work", color: P },
    { icon: Brain, title: "ClickUp Brain", sub: "Every model: ChatGPT, Claude, Gemini — unlimited", color: G },
    { icon: Bot, title: "Super Agents", sub: "24/7 autonomous agents with 500+ tool superpowers", color: A },
    { icon: Calendar, title: "Calendar", sub: "Sync events, blocks, and deadlines across your stack", color: R },
    { icon: BarChart3, title: "Dashboards", sub: "Real-time reports, ROI, workload, and analytics", color: B },
    { icon: Workflow, title: "Automations", sub: "If-this-then-that acوفيross tasks, docs, chat, and apps", color: P },
    { icon: Clock, title: "Time Tracking", sub: "Native timers, timesheets, estimates, approvals", color: A },
    { icon: Wand2, title: "Whiteboards & Mind Maps", sub: "Brainstorm, plan, and turn ideas into tasks instantly", color: G },
    { icon: Mic, title: "Brain MAX (Talk to Text)", sub: "Type 4× faster — sound like you, ship in seconds", color: B },
    { icon: Boxes, title: "100+ More Modules", sub: "Sprints, Forms, Goals, Portfolios, Inbox, Roadmaps", color: D },
  ];

  const aiPillars: {
    name: string;
    tagline: string;
    icon: LucideIcon;
    color: string;
    points: { title: string; desc: string; icon: LucideIcon }[];
    badge?: string;
  }[] = [
    {
      name: "ClickUp Brain",
      tagline: "The only AI that works where you work",
      icon: Brain,
      color: G,
      points: [
        { title: "@Brain Agent", desc: "Use @Brain inline for a 24/7 intelligent assistant on any task or doc.", icon: Sparkles },
        { title: "Ambient Answers", desc: "Stop interrupting humans — Brain answers from your team's context.", icon: Search },
        { title: "Project Manager", desc: "Auto-creates tasks, assigns owners, sets priorities — never manually again.", icon: ListChecks },
      ],
    },
    {
      name: "Super Agents",
      tagline: "Autonomous workers that take real action",
      icon: Bot,
      color: A,
      points: [
        { title: "Delegate Any Task", desc: "Update tasks, send emails, schedule events, complete work — hands off.", icon: Wand2 },
        { title: "Works 24/7", desc: "Agents never sleep. They keep your projects moving while your team is off.", icon: Clock },
        { title: "500+ Tool Superpowers", desc: "Connected to your stack — Slack, Drive, GitHub, Figma, and more.", icon: Network },
        { title: "Infinite Memory", desc: "Remembers every conversation, project, and decision — forever.", icon: InfinityIcon },
      ],
    },
    {
      name: "Brain MAX",
      tagline: "Type 4× faster with AI Talk to Text",
      icon: Mic,
      color: B,
      badge: "#1 Product of the Week — Product Hunt",
      points: [
        { title: "Sound Like You", desc: "AI rewrites your speech into your exact tone — no robotic edits.", icon: Quote },
        { title: "Save 2 Hours a Day", desc: "Guaranteed. Replace email composers, doc editors, meeting notes.", icon: Zap },
        { title: "Cross-Platform", desc: "Available on Windows, Chrome, and Mac — works wherever you write.", icon: Smartphone },
      ],
    },
  ];

  const teamSolutions: { team: string; icon: LucideIcon; color: string; bullets: string[] }[] = [
    {
      team: "Projects",
      icon: Briefcase,
      color: G,
      bullets: [
        "Manage complex projects at scale",
        "Bring strategic initiatives to life",
        "Detect and mitigate project risks",
        "Intake → Assign → PM → Live Answers Agents",
      ],
    },
    {
      team: "Marketing",
      icon: Megaphone,
      color: P,
      bullets: [
        "Campaign planning and creative briefs",
        "Content calendar with automated review cycles",
        "Real-time performance dashboards",
        "AI-generated copy, briefs, and reports",
      ],
    },
    {
      team: "Product & Engineering",
      icon: Code2,
      color: B,
      bullets: [
        "Sprints, dependencies, and release roadmaps",
        "Bug intake with auto-triage agents",
        "GitHub / Figma / Sentry deep integrations",
        "Standups summarized by AI every morning",
      ],
    },
    {
      team: "IT",
      icon: Settings,
      color: A,
      bullets: [
        "Ticketing and SLA tracking in one place",
        "Asset and access management",
        "Automation workflows for onboarding",
        "Audit trails and compliance reporting",
      ],
    },
    {
      team: "HR",
      icon: Users,
      color: R,
      bullets: [
        "Recruiting pipelines and offer flows",
        "Onboarding playbooks with auto-tasks",
        "Performance reviews and OKRs",
        "Employee directory and policy wikis",
      ],
    },
    {
      team: "Leadership",
      icon: Target,
      color: D,
      bullets: [
        "Company-wide goals and OKR tracking",
        "Portfolio and resource dashboards",
        "Workload visibility across departments",
        "AI executive briefings on demand",
      ],
    },
  ];

  const roiStats: { value: number; format: "percent" | "money" | "comma" | "plain"; suffix?: string; label: string; desc: string; color: string }[] = [
    { value: 384, format: "percent", label: "ROI over 3 years", desc: "Industry-leading return on investment, validated by Forrester.", color: G },
    { value: 3_900_000, format: "money", label: "Revenue increase", desc: "Per organization — driven by faster execution and tool consolidation.", color: B },
    { value: 92_400, format: "comma", suffix: "hrs", label: "Hours saved annually", desc: "Equivalent to adding 15 full-time employees, every year.", color: P },
    { value: 6, format: "plain", suffix: "<6 mo", label: "Payback period", desc: "Customers reach payback in under six months on average.", color: A },
  ];

  const competitors: Record<typeof activeCompetitor, {
    name: string;
    logo: string;
    color: string;
    headline: string;
    sub: string;
    pains: { title: string; desc: string }[];
    wins: { title: string; desc: string; icon: LucideIcon }[];
    features: { name: string; clickup: boolean; them: boolean | string }[];
  }> = {
    asana: {
      name: "Asana",
      logo: "asana",
      color: R,
      headline: "Team projects are more than task lists",
      sub: "ClickUp blends tasks, chat, and performance reports — Asana keeps them apart.",
      pains: [
        { title: "Talking is forbidden", desc: "You can't chat with teammates inside Asana." },
        { title: "Too much clicking", desc: "You paste links between Asana and chat tools all day." },
        { title: "Reports are 'meh'", desc: "Hard to keep a real pulse on your team's workload." },
      ],
      wins: [
        { title: "Go from chat-to-task", desc: "Turn any message, note, or video into a task in one click.", icon: MessageCircle },
        { title: "Linked conversations", desc: "Project conversations live inside the relevant ClickUp tasks.", icon: GitBranch },
        { title: "Everything is searchable", desc: "Tag tasks, docs, and whiteboards directly within chat.", icon: Search },
        { title: "Team prioritization", desc: "Stack-ranked Teams Hub of what everyone is focused on right now.", icon: Target },
      ],
      features: [
        { name: "Goals & OKRs", clickup: true, them: false },
        { name: "Scalable Hierarchy", clickup: true, them: false },
        { name: "Embedded Email", clickup: true, them: false },
        { name: "Custom Task Statuses", clickup: true, them: false },
        { name: "Automations", clickup: true, them: true },
        { name: "Sprints (native)", clickup: true, them: false },
        { name: "Formula Calculations", clickup: true, them: false },
        { name: "Assigned Comments", clickup: true, them: false },
        { name: "24/7 FREE Support", clickup: true, them: false },
        { name: "Mind Maps", clickup: true, them: false },
        { name: "Native Docs & Notepad", clickup: true, them: false },
        { name: "Custom Roles", clickup: true, them: false },
        { name: "Embedded Spreadsheets", clickup: true, them: false },
        { name: "Multiple Assignees", clickup: true, them: false },
        { name: "/Slash Commands", clickup: true, them: false },
      ],
    },
    monday: {
      name: "Monday.com",
      logo: "monday",
      color: A,
      headline: "Work shouldn't feel like Monday",
      sub: "Don't settle for rigid silos. ClickUp blends every team and tool into one flexible workspace.",
      pains: [
        { title: "It's rigid", desc: "Pre-built solutions that don't talk to each other." },
        { title: "It's just tasks", desc: "Chat, video clips, and wikis live separately from your projects." },
        { title: "It's annoying", desc: "Work is scattered, your team is frustrated, and the week drags." },
      ],
      wins: [
        { title: "Customize your workspace", desc: "Fields, tags, views, hierarchy — bend ClickUp to fit your team.", icon: Wand2 },
        { title: "Conversations connect to projects", desc: "Chat, audio, and video calls — none of which Monday has natively.", icon: MessageCircle },
        { title: "Use one app instead of ten", desc: "Stop stitching plugins. Native docs, whiteboards, time tracking.", icon: Layers },
        { title: "One-click migration", desc: "Import people, projects, custom fields, and workflows automatically.", icon: ArrowRight },
      ],
      features: [
        { name: "Everything View", clickup: true, them: false },
        { name: "Multiple View Types", clickup: true, them: true },
        { name: "Custom Relationships", clickup: true, them: false },
        { name: "Assigned Comments", clickup: true, them: false },
        { name: "Dashboard Reports", clickup: true, them: "Limited to 50 (Enterprise)" },
        { name: "Automations", clickup: true, them: true },
        { name: "Custom Task Types", clickup: true, them: false },
        { name: "Multiple Assignees", clickup: true, them: false },
        { name: "Sprints (native)", clickup: true, them: "Separate product line" },
        { name: "Sprint Reporting", clickup: true, them: "Separate product line" },
        { name: "Native Timesheets & Approvals", clickup: true, them: false },
        { name: "Nested Subtasks", clickup: true, them: false },
        { name: "Subtasks in Multiple Locations", clickup: true, them: false },
        { name: "Dependencies", clickup: true, them: false },
        { name: "Private Tasks", clickup: true, them: false },
        { name: "Unified Inbox", clickup: true, them: false },
      ],
    },
    slack: {
      name: "Slack",
      logo: "slack",
      color: B,
      headline: "Cut the Slack. Get work done in Chat.",
      sub: "ClickUp Chat does everything Slack does — then turns conversation into action.",
      pains: [
        { title: "It's just chat", desc: "You use Slack plus 10 other apps to actually do your work." },
        { title: "Things get lost", desc: "Important messages, tasks, and decisions buried in endless threads." },
        { title: "Deadlines slip", desc: "You dig through conversations to recover next steps." },
      ],
      wins: [
        { title: "Work from where you chat", desc: "Manage work mid-conversation. One click turns a message into a task.", icon: Zap },
        { title: "Context always connected", desc: "Conversations auto-link to tasks, docs, and whiteboards.", icon: GitBranch },
        { title: "AI keeps chat manageable", desc: "Summarized threads, suggested replies, auto-created action items.", icon: Brain },
        { title: "One-click Slack import", desc: "Migrate channels, settings, messages — even your custom emojis.", icon: ArrowRight },
      ],
      features: [
        { name: "DMs and threads", clickup: true, them: true },
        { name: "Channels", clickup: true, them: true },
        { name: "Video and audio calls", clickup: true, them: true },
        { name: "Posts and Announcements", clickup: true, them: true },
        { name: "AI Search & Summaries", clickup: true, them: false },
        { name: "Connected Search across work", clickup: true, them: false },
        { name: "Agents", clickup: true, them: false },
        { name: "AI Standup", clickup: true, them: false },
        { name: "Meeting Notetaker", clickup: true, them: false },
        { name: "Tasks linked to chat", clickup: true, them: false },
        { name: "Custom task management", clickup: true, them: false },
        { name: "Projects & portfolios", clickup: true, them: false },
        { name: "Dashboard reports", clickup: true, them: false },
        { name: "Time tracking & timesheets", clickup: true, them: false },
        { name: "Docs, Wikis, Whiteboards", clickup: true, them: false },
      ],
    },
    notion: {
      name: "Notion",
      logo: "notion",
      color: P,
      headline: "Notion writes down work. ClickUp gets it done.",
      sub: "Both have docs. Only one closes the loop on tasks, chat, time, and outcomes.",
      pains: [
        { title: "Talking is forbidden", desc: "No native chat with teammates inside Notion." },
        { title: "Too much clicking", desc: "Constantly pasting links to bridge gaps between tools." },
        { title: "Reports are 'meh'", desc: "Hard to track team workload or project progress." },
      ],
      wins: [
        { title: "Turn chats into tasks", desc: "One click from any note, message, or video — straight to action.", icon: Zap },
        { title: "Connected conversations", desc: "Project history lives inside related ClickUp tasks, not buried.", icon: GitBranch },
        { title: "Connected Search", desc: "Find answers across all your apps without hunting through pages.", icon: Search },
        { title: "Team's Hub built-in", desc: "Auto workload views — see what's done and who needs help.", icon: Users },
      ],
      features: [
        { name: "Live Doc Collaboration", clickup: true, them: true },
        { name: "Doc & Task Relationships", clickup: true, them: false },
        { name: "Doc Hierarchy", clickup: true, them: true },
        { name: "Archivable Docs", clickup: true, them: false },
        { name: "Personal Notepad", clickup: true, them: false },
        { name: "Assigned Comments", clickup: true, them: false },
        { name: "Dashboards", clickup: true, them: false },
        { name: "Tasks in Multiple Lists", clickup: true, them: false },
        { name: "Goals & OKRs", clickup: true, them: false },
        { name: "Dynamic Recurring Tasks", clickup: true, them: false },
        { name: "Email in ClickUp", clickup: true, them: false },
        { name: "Conditional Automations", clickup: true, them: false },
        { name: "Time Tracking & Estimates", clickup: true, them: false },
        { name: "Gantt Charts", clickup: true, them: false },
        { name: "Real-time Chat", clickup: true, them: false },
        { name: "Workload Views", clickup: true, them: false },
        { name: "Mind Maps & Proofing", clickup: true, them: false },
        { name: "In-App Video Recording", clickup: true, them: false },
      ],
    },
  };

  const testimonials: { quote: string; name: string; role: string; company: string; color: string }[] = [
    {
      quote: "ClickUp is serving us so we can serve our pet guardians.",
      name: "Samantha Dengate",
      role: "Sr. Project Manager",
      company: "Diggs",
      color: G,
    },
    {
      quote: "It's a low-code platform that helps us automate processes.",
      name: "Joerg Klueckmann",
      role: "VP of Marketing",
      company: "Finastra",
      color: B,
    },
    {
      quote: "ClickUp is the best thing I've rolled out in the past two years.",
      name: "Lauren Makielski",
      role: "Chief of Staff",
      company: "Hawke",
      color: P,
    },
  ];

  const compliance = [
    { label: "SOC 2 TYPE II", icon: Shield },
    { label: "ISO 27001", icon: Lock },
    { label: "GDPR", icon: Globe },
    { label: "HIPAA", icon: Headphones },
  ];

  const integrations: { name: string; file: string }[] = [
    { name: "Slack", file: "slack" },
    { name: "GitHub", file: "github" },
    { name: "Microsoft Teams", file: "microsoft-teams" },
    { name: "HubSpot", file: "hubspot" },
    { name: "OneDrive", file: "onedrive" },
    { name: "Outlook", file: "outlook" },
    { name: "Trello", file: "trello" },
    { name: "Asana", file: "asana" },
    { name: "Figma", file: "figma" },
    { name: "Salesforce", file: "salesforce" },
    { name: "Zoom", file: "zoom" },
    { name: "Loom", file: "loom" },
    { name: "Google Calendar", file: "google-calendar" },
    { name: "Gmail", file: "gmail" },
    { name: "GitLab", file: "gitlab" },
    { name: "Jira", file: "jira" },
    { name: "Zendesk", file: "zendesk" },
    { name: "Intercom", file: "intercom" },
    { name: "Make", file: "make" },
    { name: "n8n", file: "n8n" },
    { name: "Zapier", file: "zapier" },
    { name: "Airtable", file: "airtable" },
    { name: "Notion", file: "notion" },
    { name: "Confluence", file: "confluence" },
  ];

  const active = competitors[activeCompetitor];

  /* ═══ RENDER ═══ */

  return (
    <ArabicTailProcessor>
      <div ref={ref} style={{ background: "#fff", color: D, fontFamily: "'Ahmed Sans', sans-serif" }}>

        {/* ═══ HERO ═══ */}
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
            <div className="ph-hero opacity-0 text-center mb-4" style={{ paddingTop: 40 }}>
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold"
                style={{ background: `${G}12`, color: G, border: `1px solid ${G}30` }}
              >
                <Sparkles size={12} /> The Everything App for Work
              </span>
            </div>

            <div className="ph-hero opacity-0 text-center mb-4">
              <h1 className="ar-heading" style={{ fontSize: "clamp(38px, 8vw, 86px)", lineHeight: 1.1, color: D }}>
                Software to <span style={{ color: G }}>replace all software</span>
              </h1>
            </div>

            <div className="ph-hero opacity-0 text-center mb-8 max-w-2xl">
              <p className="ar-body text-base md:text-lg" style={{ color: "rgba(0,0,0,0.55)" }}>
                Save money. Save time. Create infinite productivity. All apps, AI agents, and humans — finally working together with perfect context.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="ph-hero opacity-0 flex flex-wrap justify-center gap-3 mb-10">
              <a
                href="https://clickup.com/"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold"
                style={{
                  background: G,
                  color: D,
                  border: `2px solid ${D}`,
                  boxShadow: `4px 4px 0px 0px ${D}`,
                  textDecoration: "none",
                }}
              >
                Get started — it&apos;s FREE <ArrowRight size={14} />
              </a>
              <a
                href="https://clickup.com/"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold"
                style={{
                  background: "#fff",
                  color: D,
                  border: `2px solid ${D}`,
                  boxShadow: `4px 4px 0px 0px ${D}`,
                  textDecoration: "none",
                }}
              >
                Get a Demo
              </a>
            </div>

            {/* Stats row */}
            <div className="ph-hero opacity-0 mb-10 w-full max-w-3xl">
              <div
                className="flex items-stretch justify-center"
                style={{
                  background: "#fff",
                  border: "1px solid #E8E8E8",
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                }}
              >
                {[
                  { n: "5M+", l: "Teams" },
                  { n: "4.7", l: "G2 score" },
                  { n: "100+", l: "Awards" },
                  { n: "85%", l: "of Fortune 500" },
                  { n: "+400%", l: "More done" },
                ].map((s, i) => (
                  <div
                    key={s.l}
                    className="flex-1 flex flex-col items-center justify-center py-5 px-2 relative"
                    style={{ borderRight: i > 0 ? "1px solid #F0F0F0" : "none" }}
                  >
                    <span className="ar-heading" style={{ fontSize: 24, lineHeight: 1, color: D }}>{s.n}</span>
                    <span className="text-[9px] font-bold mt-1 ar-body text-center uppercase tracking-wide" style={{ color: "rgba(0,0,0,0.4)" }}>{s.l}</span>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-t-full" style={{ background: G }} />
                  </div>
                ))}
              </div>
            </div>

            {/* No credit card / Free forever */}
            <div className="ph-hero opacity-0 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-6">
              {["Free forever", "No credit card", "Customize your workspace", "Replaces 50+ apps"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 text-[11px] font-bold" style={{ color: "rgba(0,0,0,0.5)" }}>
                  <CheckCircle2 size={12} color={G} /> {t}
                </span>
              ))}
            </div>

            <div className="ph-hero opacity-0 flex flex-col items-center gap-2 mt-4">
              <div
                style={{
                  width: 24,
                  height: 38,
                  border: "1.5px solid rgba(0,0,0,0.14)",
                  borderRadius: 12,
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: 5,
                }}
              >
                <div
                  style={{
                    width: 3,
                    height: 6,
                    borderRadius: 2,
                    background: G,
                    animation: "mouseScroll 1.6s ease-in-out infinite",
                  }}
                />
              </div>
            </div>
          </div>
          <style>{`@keyframes mouseScroll{0%{transform:translateY(0);opacity:1}75%{transform:translateY(9px);opacity:0}76%{transform:translateY(0);opacity:0}100%{opacity:1}}`}</style>
        </section>

        {/* ═══ THE PROBLEM ═══ */}
        <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
          <div className="max-w-5xl mx-auto">
            <SectionHead eyebrow="The Problem" subtitle="Every app you add fragments your context further. The result is a quiet productivity killer.">
              60% of work is <span style={{ color: R }}>lost in context</span>
            </SectionHead>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ph-stagger">
              {[
                {
                  title: "Work Sprawl",
                  desc: "Tasks live in 10 tools. Decisions live in chat. Files live in drive. Nothing is connected — your team rebuilds context every morning.",
                  color: R,
                  icon: Layers,
                },
                {
                  title: "AI Without Context",
                  desc: "ChatGPT and Claude are powerful — but blind to your actual work. They give generic answers because they can't see your stack.",
                  color: A,
                  icon: Brain,
                },
                {
                  title: "Tool Tax",
                  desc: "Slack + Asana + Notion + Drive + 6 more — each charging per seat. Your software bill grows while your team gets slower.",
                  color: P,
                  icon: PieChart,
                },
              ].map((p) => (
                <div
                  key={p.title}
                  className="ph-item rounded-[18px] p-6"
                  style={{ background: "#fff", border: "1px solid #EBEBEB" }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${p.color}12` }}
                  >
                    <p.icon size={20} color={p.color} />
                  </div>
                  <h3 className="ar-heading text-lg mb-2" style={{ color: D }}>
                    {p.title}
                  </h3>
                  <p className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ THE SOLUTION — CAPABILITIES GRID ═══ */}
        <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead
              eyebrow="The Everything App"
              subtitle="100+ products to replace fragmented software and maximize human productivity. Twelve highlights:"
            >
              All your work — in <span style={{ color: G }}>one platform</span>
            </SectionHead>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 ph-stagger">
              {capabilities.map((c) => (
                <div
                  key={c.title}
                  className="ph-item rounded-[16px] p-5 transition-all hover:-translate-y-0.5"
                  style={{ background: "#fff", border: "1px solid #EBEBEB", boxShadow: "0 1px 8px rgba(0,0,0,0.02)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${c.color}12` }}
                  >
                    <c.icon size={18} color={c.color} />
                  </div>
                  <h4 className="text-[13px] font-bold ar-body mb-1" style={{ color: D }}>
                    {c.title}
                  </h4>
                  <p className="text-[11px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.5)" }}>
                    {c.sub}
                  </p>
                </div>
              ))}
            </div>

            {/* Tag-cloud of more features */}
            <div className="mt-10 rounded-[20px] p-6" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
              <p className="text-[10px] font-bold tracking-[2px] uppercase mb-4" style={{ color: G }}>
                Plus 90+ more modules included
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Sprints", "Custom Statuses", "API Calls", "Milestones", "Forms", "Custom Fields",
                  "Timesheets", "AI Q&A", "Priorities", "Time Estimates", "Clips", "Everything view",
                  "Single Sign-on", "Emails", "Kanban Boards", "Guests", "Tags", "24/7 Support",
                  "Checklists", "Scheduling", "Spreadsheets", "Whiteboards", "Roadmaps", "Inbox",
                  "Goals", "Mind Maps", "Wikis", "Reminders", "Reporting", "Dependencies",
                  "Connected Search", "AI Notetaker", "AI Writer", "Proofing", "Portfolios", "Templates",
                ].map((f) => (
                  <span
                    key={f}
                    className="text-[11px] px-3 py-1.5 rounded-full ar-body"
                    style={{ background: "#fff", color: "rgba(0,0,0,0.65)", border: "1px solid #EBEBEB" }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ AI TRINITY ═══ */}
        <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead
              eyebrow="AI That Works Where You Work"
              color={G}
              light
              subtitle="Three AI products built for your actual stack — not generic chatbots wrapped in branding."
            >
              The <span style={{ color: G }}>AI Trinity</span>
            </SectionHead>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 ph-stagger">
              {aiPillars.map((pillar) => (
                <div
                  key={pillar.name}
                  className="ph-item rounded-[24px] p-7 flex flex-col"
                  style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${pillar.color}40` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ background: `${pillar.color}18` }}
                    >
                      <pillar.icon size={22} color={pillar.color} />
                    </div>
                    <div>
                      <h3 className="ar-heading text-xl" style={{ color: "#fff" }}>
                        {pillar.name}
                      </h3>
                      <p className="text-[11px] ar-body" style={{ color: pillar.color }}>
                        {pillar.tagline}
                      </p>
                    </div>
                  </div>

                  {pillar.badge && (
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold mb-4 self-start"
                      style={{ background: `${pillar.color}18`, color: pillar.color }}
                    >
                      <Award size={11} /> {pillar.badge}
                    </div>
                  )}

                  <div className="flex flex-col gap-3 flex-1">
                    {pillar.points.map((pt) => (
                      <div
                        key={pt.title}
                        className="rounded-[14px] p-4 flex items-start gap-3"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: `${pillar.color}20` }}
                        >
                          <pt.icon size={14} color={pillar.color} />
                        </div>
                        <div>
                          <p className="text-[12px] font-bold mb-1" style={{ color: "#fff" }}>
                            {pt.title}
                          </p>
                          <p className="text-[11px] ar-body leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                            {pt.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* AI models row */}
            <div className="mt-10 rounded-[20px] p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex flex-col md:flex-row items-center justify-between gap-5">
                <div className="flex items-center gap-3">
                  <Brain size={18} color={G} />
                  <p className="text-[12px] font-bold ar-body" style={{ color: "#fff" }}>
                    Every AI model — unlimited
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {[
                    { name: "ClickUp Brain", logo: "clickup" },
                    { name: "ChatGPT", logo: "openai" },
                    { name: "Claude", logo: "claude" },
                    { name: "Gemini", logo: "gemini" },
                  ].map((m) => (
                    <span
                      key={m.name}
                      className="inline-flex items-center gap-2 text-[12px] font-bold px-4 py-2 rounded-full"
                      style={{ background: "rgba(255,255,255,0.06)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/logos/clickup/${m.logo}.svg`}
                        alt={m.name}
                        width={14}
                        height={14}
                        style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }}
                      />
                      {m.name}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] ar-body" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Zero data training. Zero retention.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ INTEGRATIONS ═══ */}
        <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
          <div className="max-w-5xl mx-auto">
            <SectionHead
              eyebrow="Connected to your stack"
              subtitle="Native integrations with 50+ tools and 1,000+ via Zapier. Your work flows where it lives."
            >
              50+ apps. <span style={{ color: G }}>One workspace.</span>
            </SectionHead>

            <div className="rounded-[24px] p-8 ph-stagger" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {integrations.map((i) => (
                  <div
                    key={i.name}
                    className="ph-item rounded-[12px] py-4 px-3 flex items-center gap-2.5 transition-all hover:-translate-y-0.5"
                    style={{ background: "#fff", border: "1px solid #EBEBEB" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/logos/clickup/${i.file}.svg`}
                      alt={i.name}
                      width={20}
                      height={20}
                      style={{ flexShrink: 0, objectFit: "contain" }}
                    />
                    <span className="text-[11px] font-bold ar-body truncate" style={{ color: D }}>{i.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ TEAM SOLUTIONS ═══ */}
        <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead
              eyebrow="Solutions for every team"
              subtitle="Pre-tuned workflows, dashboards, and AI agents — built for the way each team actually works."
            >
              Built for <span style={{ color: G }}>every team</span>
            </SectionHead>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ph-stagger">
              {teamSolutions.map((t) => (
                <div
                  key={t.team}
                  className="ph-item rounded-[20px] overflow-hidden"
                  style={{ background: "#fff", border: `1.5px solid ${t.color}25` }}
                >
                  <div
                    className="px-6 py-4 flex items-center gap-3"
                    style={{ background: `${t.color}08`, borderBottom: `1px solid ${t.color}15` }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${t.color}15` }}
                    >
                      <t.icon size={18} color={t.color} />
                    </div>
                    <h4 className="ar-heading text-base" style={{ color: D }}>
                      {t.team}
                    </h4>
                  </div>
                  <div className="p-5 flex flex-col gap-2">
                    {t.bullets.map((b) => (
                      <div key={b} className="flex items-start gap-2">
                        <ChevronRight size={14} color={t.color} className="flex-shrink-0 mt-0.5" />
                        <span className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>
                          {b}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ ROI NUMBERS ═══ */}
        <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead
              eyebrow="The Forrester Report"
              color={G}
              light
              subtitle="From the 2025 Total Economic Impact™ of ClickUp report — independently validated by Forrester."
            >
              Real numbers, real <span style={{ color: G }}>ROI</span>
            </SectionHead>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ph-stagger">
              {roiStats.map((s) => (
                <div
                  key={s.label}
                  className="ph-item rounded-[24px] p-7 text-center"
                  style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${s.color}30` }}
                >
                  {s.format === "plain" ? (
                    <div className="ar-heading mb-2" style={{ fontSize: 56, color: s.color, lineHeight: 1 }}>
                      {s.suffix}
                    </div>
                  ) : (
                    <>
                      <div className="ar-heading mb-2" style={{ fontSize: 56, color: s.color, lineHeight: 1 }}>
                        <span className="ph-num" data-val={s.value} data-format={s.format}>0</span>
                        {s.suffix && s.format === "comma" && (
                          <span className="text-2xl ml-1" style={{ color: s.color }}>{s.suffix}</span>
                        )}
                      </div>
                    </>
                  )}
                  <p className="ar-heading text-base mb-2" style={{ color: "#fff" }}>
                    {s.label}
                  </p>
                  <p className="text-[11px] ar-body leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="mt-10 rounded-[20px] p-6 flex flex-col md:flex-row items-center justify-between gap-4"
              style={{ background: `${G}10`, border: `1px solid ${G}30` }}
            >
              <div className="flex items-center gap-3">
                <Sparkles size={18} color={G} />
                <p className="text-[13px] ar-body font-bold" style={{ color: "#fff" }}>
                  It&apos;s like adding 15 full-time employees — without hiring anyone.
                </p>
              </div>
              <a
                href="https://clickup.com/"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-bold"
                style={{ background: G, color: D, textDecoration: "none" }}
              >
                Get the report <ArrowRight size={12} />
              </a>
            </div>
          </div>
        </section>

        {/* ═══ COMPARISON — TABBED ═══ */}
        <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead
              eyebrow="Why ClickUp wins"
              subtitle="See exactly where ClickUp out-features your current tool — feature by feature."
            >
              ClickUp vs <span style={{ color: G }}>Everyone</span>
            </SectionHead>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {(Object.keys(competitors) as (typeof activeCompetitor)[]).map((key) => {
                const c = competitors[key];
                const isActive = activeCompetitor === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveCompetitor(key)}
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-[12px] font-bold transition-all"
                    style={{
                      background: isActive ? D : "#fff",
                      color: isActive ? G : D,
                      border: isActive ? `2px solid ${D}` : "1px solid #EBEBEB",
                      cursor: "pointer",
                      boxShadow: isActive ? `4px 4px 0px 0px ${G}` : "none",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/logos/clickup/${c.logo}.svg`}
                      alt={c.name}
                      width={16}
                      height={16}
                      style={{
                        objectFit: "contain",
                        filter: isActive ? "brightness(0) invert(1)" : "none",
                        opacity: isActive ? 0.85 : 1,
                      }}
                    />
                    vs {c.name}
                  </button>
                );
              })}
            </div>

            {/* Active comparison panel */}
            <div
              className="rounded-[24px] overflow-hidden transition-all"
              style={{ border: "1px solid #EBEBEB", boxShadow: "0 2px 20px rgba(0,0,0,0.03)" }}
            >
              {/* Headline strip */}
              <div className="p-7 md:p-8 flex items-start gap-5" style={{ background: `${active.color}06`, borderBottom: `1px solid ${active.color}20` }}>
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 hidden sm:flex"
                  style={{ background: "#fff", border: "1px solid #EBEBEB" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/logos/clickup/${active.logo}.svg`}
                    alt={active.name}
                    width={32}
                    height={32}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold tracking-[3px] uppercase mb-2" style={{ color: active.color }}>
                    ClickUp vs {active.name}
                  </p>
                  <h3 className="ar-heading text-2xl md:text-3xl mb-2" style={{ color: D }}>
                    {active.headline}
                  </h3>
                  <p className="text-[13px] ar-body" style={{ color: "rgba(0,0,0,0.55)" }}>
                    {active.sub}
                  </p>
                </div>
              </div>

              {/* Pains + Wins */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Pains */}
                <div className="p-7 md:p-8" style={{ borderBottom: "1px solid #F0F0F0", borderRight: "1px solid #F0F0F0" }}>
                  <div className="flex items-center gap-2 mb-5">
                    <XCircle size={16} color={R} />
                    <p className="text-[11px] font-bold tracking-wider uppercase" style={{ color: R }}>
                      Where {active.name} falls short
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    {active.pains.map((pain) => (
                      <div key={pain.title} className="rounded-[12px] p-4" style={{ background: `${R}06`, border: `1px solid ${R}15` }}>
                        <p className="text-[13px] font-bold mb-1" style={{ color: D }}>
                          {pain.title}
                        </p>
                        <p className="text-[11px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>
                          {pain.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Wins */}
                <div className="p-7 md:p-8" style={{ borderBottom: "1px solid #F0F0F0" }}>
                  <div className="flex items-center gap-2 mb-5">
                    <CheckCircle2 size={16} color={G} />
                    <p className="text-[11px] font-bold tracking-wider uppercase" style={{ color: G }}>
                      Where ClickUp wins
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    {active.wins.map((win) => (
                      <div key={win.title} className="flex items-start gap-3 rounded-[12px] p-4" style={{ background: `${G}06`, border: `1px solid ${G}25` }}>
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${G}15` }}>
                          <win.icon size={14} color={G} />
                        </div>
                        <div>
                          <p className="text-[13px] font-bold mb-1" style={{ color: D }}>
                            {win.title}
                          </p>
                          <p className="text-[11px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>
                            {win.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Feature comparison table */}
              <div className="p-7 md:p-8">
                <div className="flex items-center gap-2 mb-5">
                  <Layers size={16} color={D} />
                  <p className="text-[11px] font-bold tracking-wider uppercase" style={{ color: D }}>
                    Feature-by-feature
                  </p>
                </div>
                <div className="overflow-x-auto rounded-[16px] border" style={{ borderColor: "#EBEBEB" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
                    <thead>
                      <tr style={{ background: D }}>
                        <th style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: G, fontFamily: "'Ahmed Sans'" }}>Feature</th>
                        <th style={{ padding: "12px 16px", textAlign: "center", fontSize: 11, fontWeight: 700, color: G, fontFamily: "'Ahmed Sans'", width: 110 }}>ClickUp</th>
                        <th style={{ padding: "12px 16px", textAlign: "center", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.7)", fontFamily: "'Ahmed Sans'", width: 140 }}>{active.name}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {active.features.map((f, i) => (
                        <tr key={f.name} style={{ background: i % 2 === 0 ? "#fff" : "#FAFAFA", borderBottom: "1px solid #F3F4F6" }}>
                          <td style={{ padding: "12px 16px", fontSize: 12, fontWeight: 600, color: D, fontFamily: "'Ahmed Sans'" }}>{f.name}</td>
                          <td style={{ padding: "12px 16px", textAlign: "center" }}>
                            <CheckCircle2 size={16} color={G} style={{ display: "inline-block" }} />
                          </td>
                          <td style={{ padding: "12px 16px", textAlign: "center" }}>
                            {typeof f.them === "boolean" ? (
                              f.them ? (
                                <CheckCircle2 size={16} color="rgba(0,0,0,0.3)" style={{ display: "inline-block" }} />
                              ) : (
                                <XCircle size={16} color={R} style={{ display: "inline-block" }} />
                              )
                            ) : (
                              <span className="text-[10px] font-bold" style={{ color: A }}>{f.them}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ TESTIMONIALS ═══ */}
        <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead
              eyebrow="Loved by 5M+ teams"
              subtitle="The most-referenced company on G2 reports — backed by 100+ awards and a 4.7/5 rating."
            >
              Trusted by the <span style={{ color: G }}>best</span>
            </SectionHead>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ph-stagger">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="ph-item rounded-[20px] p-7 flex flex-col"
                  style={{ background: "#fff", border: `1px solid ${t.color}25`, boxShadow: `3px 3px 0px 0px ${t.color}15` }}
                >
                  <Quote size={28} color={t.color} className="mb-4" />
                  <p className="text-[15px] ar-body leading-relaxed mb-6 flex-1" style={{ color: D }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="pt-4" style={{ borderTop: "1px solid #F0F0F0" }}>
                    <p className="text-[13px] font-bold ar-body" style={{ color: D }}>
                      {t.name}
                    </p>
                    <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 ph-stagger">
              {[
                { stat: "4.7/5", label: "G2 score", desc: "10,000+ verified reviews" },
                { stat: "100+", label: "Industry awards", desc: "Including G2 Best Software 2026" },
                { stat: "#1", label: "Most-referenced", desc: "Company on G2 reports" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="ph-item rounded-[16px] p-6 text-center"
                  style={{ background: "#fff", border: "1px solid #EBEBEB" }}
                >
                  <Star size={18} color={G} className="mx-auto mb-3" />
                  <div className="ar-heading text-3xl mb-1" style={{ color: D }}>{s.stat}</div>
                  <p className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: G }}>
                    {s.label}
                  </p>
                  <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ COMPLIANCE & SCALE ═══ */}
        <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead
              eyebrow="Enterprise-grade"
              subtitle="Built for scale and regulated industries — with privacy stronger than ChatGPT's default."
            >
              Convergence <span style={{ color: G }}>powerhouse</span>
            </SectionHead>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 ph-stagger">
              <div
                className="ph-item rounded-[20px] p-7 text-center"
                style={{ background: "#fff", border: "1px solid #EBEBEB" }}
              >
                <TrendingUp size={22} color={G} className="mx-auto mb-3" />
                <div className="ar-heading text-5xl mb-2" style={{ color: D }}>85%</div>
                <p className="ar-heading text-base mb-1" style={{ color: D }}>of Fortune 500 companies</p>
                <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>
                  Use ClickUp to power their day-to-day operations.
                </p>
              </div>

              <div
                className="ph-item rounded-[20px] p-7 text-center"
                style={{ background: "#fff", border: "1px solid #EBEBEB" }}
              >
                <Bot size={22} color={A} className="mx-auto mb-3" />
                <div className="ar-heading text-5xl mb-2" style={{ color: D }}>3M+</div>
                <p className="ar-heading text-base mb-1" style={{ color: D }}>tasks automated by Agents</p>
                <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>
                  And growing — Super Agents work 24/7 across customer accounts.
                </p>
              </div>
            </div>

            {/* Compliance badges */}
            <div
              className="rounded-[20px] p-7"
              style={{ background: D, border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-5">
                <div>
                  <p className="text-[10px] font-bold tracking-[2px] uppercase mb-1" style={{ color: G }}>
                    Compliance
                  </p>
                  <p className="ar-heading text-xl" style={{ color: "#fff" }}>
                    Enterprise-grade everything
                  </p>
                  <p className="text-[11px] ar-body mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Zero data training, zero retention on third-party model providers.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                  {compliance.map((c) => (
                    <div
                      key={c.label}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
                    >
                      <c.icon size={14} color={G} />
                      <span className="text-[11px] font-bold" style={{ color: "#fff" }}>{c.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Final closing pitch */}
            <div className="mt-12 text-center">
              <p className="ar-heading text-2xl md:text-3xl mb-4" style={{ color: D }}>
                All your work, all your people, <span style={{ color: G }}>all powered by AI</span>
              </p>
              <p className="text-[13px] ar-body max-w-xl mx-auto mb-8" style={{ color: "rgba(0,0,0,0.55)" }}>
                Available on iOS, Android, Mac, Windows, and the Web. Free forever. No credit card required.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://clickup.com/"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold"
                  style={{
                    background: G,
                    color: D,
                    border: `2px solid ${D}`,
                    boxShadow: `4px 4px 0px 0px ${D}`,
                    textDecoration: "none",
                  }}
                >
                  Get started — it&apos;s FREE <ArrowRight size={14} />
                </a>
                <a
                  href="https://clickup.com/"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold"
                  style={{
                    background: "#fff",
                    color: D,
                    border: `2px solid ${D}`,
                    boxShadow: `4px 4px 0px 0px ${D}`,
                    textDecoration: "none",
                  }}
                >
                  Get a Demo <Rocket size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FOOTER NOTE ═══ */}
        <section className="ph-slide opacity-0" style={{ padding: "60px 24px", background: "#FAFAFA", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>
              <Mail size={11} style={{ display: "inline-block", marginRight: 4, verticalAlign: -1 }} />
              Showcase curated by Ahmed Ali · hello@ahmedali.online · ahmedali.online
            </p>
            <p className="text-[10px] ar-body mt-2" style={{ color: "rgba(0,0,0,0.25)" }}>
              All product names, logos, and brands are property of their respective owners. ClickUp © 2026.
            </p>
          </div>
        </section>
      </div>
    </ArabicTailProcessor>
  );
}

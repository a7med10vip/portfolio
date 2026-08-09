"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Video, Radio, Users, MessageCircle, TrendingUp, BarChart3,
  Calendar, CheckCircle2, AlertCircle, Zap, Send, Eye,
  Target, Star, Clock, ArrowRight, UserCheck, ShieldCheck,
  Megaphone, Phone, Database, FileText,
  Car, Wrench, Heart, Tag, Camera,
  type LucideIcon,
} from "lucide-react";
import { FaWhatsapp, FaTiktok, FaInstagram, FaSnapchat, FaYoutube } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

/* ── Color System ── */
const G  = "#f58021"; // Soueast orange — primary
const D  = "#0A0A0A"; // near-black — text + dark elements
const LG = "#fff";

/* ── Platform brand colors ── */
const TIKTOK_C = "#000000";
const INSTA_C  = "#E1306C";
const SNAP_C   = "#fff900";
const YT_C     = "#FF0000";
const WA_C     = "#25D366";

const AR: React.CSSProperties = {
  fontFamily: "'Ahmed Sans', 'Thmanyah Sans', sans-serif",
  direction: "rtl",
};

/* ── Platform badge — real logos for IG / Snap / TikTok, FA icons for YT / WA ── */
const PLATFORM_LOGO: Record<string, string> = {
  tiktok:    "/platforms/tiktok-official.png",
  instagram: "/platforms/instagram-official.png",
  snapchat:  "/platforms/snapchat-official.png",
};
function PIcon({ p, size = 14 }: { p: "tiktok"|"instagram"|"snapchat"|"youtube"|"whatsapp"; size?: number }) {
  const box = size + 10;
  if (PLATFORM_LOGO[p]) {
    return (
      <img src={PLATFORM_LOGO[p]} alt={p}
        style={{ width: box, height: box, objectFit: "contain", flexShrink: 0, display: "inline-block", verticalAlign: "middle" }} />
    );
  }
  const fa = {
    youtube:  { icon: <FaYoutube  size={size} color="#fff" />, bg: YT_C },
    whatsapp: { icon: <FaWhatsapp size={size} color="#fff" />, bg: WA_C },
  }[p as "youtube"|"whatsapp"];
  return (
    <span style={{ display:"inline-flex", alignItems:"center", justifyContent:"center",
      width: box, height: box, borderRadius: 6, background: fa.bg, flexShrink: 0 }}>
      {fa.icon}
    </span>
  );
}

export default function SoueastMediaPlan() {
  const ref = useRef<HTMLDivElement>(null);
  const [calFilter, setCalFilter] = useState<string>("All");
  const [calHovered, setCalHovered] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".sm-hero", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: "power4.out", delay: 0.3 });
      gsap.utils.toArray<HTMLElement>(".sm-slide").forEach((el) => {
        gsap.fromTo(el, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".sm-stagger").forEach((el) => {
        gsap.fromTo(el.querySelectorAll(".sm-item"), { y: 40, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 82%", once: true } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  /* ═══ DATA ═══ */

  const platforms = [
    { name: "TikTok",    icon: <FaTiktok    size={32} color="#fff" />, role: "PRIMARY",     freq: "5–6 Videos/Week",  goal: "Reach & Awareness",       brand: TIKTOK_C, textDark: false },
    { name: "Instagram", icon: <FaInstagram size={32} color="#fff" />, role: "CREDIBILITY", freq: "3–4 Posts/Week",   goal: "Credibility & Conversion", brand: INSTA_C,  textDark: false },
    { name: "Snapchat",  icon: <FaSnapchat  size={32} color="#000" />, role: "LOCAL",       freq: "Daily Stories",    goal: "Local Jeddah Engagement",  brand: SNAP_C,   textDark: true  },
    { name: "YouTube",   icon: <FaYoutube   size={32} color="#fff" />, role: "SEO",         freq: "2–4 Videos/Month", goal: "Education & SEO",          brand: YT_C,     textDark: false },
  ];

  /* Motion Motors communication pillars — every post maps to one */
  const pillars: { n: string; name: string; desc: string; example: string; icon: LucideIcon }[] = [
    { n: "01", name: "Services / Scope of Work", desc: "What Motion Motors delivers — sales, financing, after-sales, trade-in.", example: "Walkthrough of everything we offer at the Jeddah showroom", icon: ShieldCheck },
    { n: "02", name: "Team",                     desc: "The people behind the brand — sales advisors, technicians, staff.",      example: "Meet the team · A day with a Motion Motors sales advisor", icon: Users },
    { n: "03", name: "Celebrations (Local / Global)", desc: "National Day, Founding Day, Eid, and global Soueast milestones.",   example: "Saudi National Day greeting · Soueast global moments", icon: Star },
    { n: "04", name: "Our Car Brands",           desc: "The Soueast lineup — S06, S07, S08, S09: design, specs, identity.",      example: "S08 DM full walkthrough · Soueast design language", icon: Car },
    { n: "05", name: "Lifestyle",                desc: "The car in real Jeddah life — family, commute, weekend road trips.",     example: "Weekend drive · Family life with a Soueast", icon: Heart },
    { n: "06", name: "Client Testimonials / Collabs", desc: "Real owners, delivery moments, and brand partnerships.",            example: "Customer delivery reaction · Partner collaboration", icon: MessageCircle },
    { n: "07", name: "Driving-related Trends",   desc: "Jeddah road culture, seasonal driving, and trending topics.",            example: "Jeddah traffic survival tips · Summer driving advice", icon: TrendingUp },
    { n: "08", name: "Inventory Spotlight",      desc: "Units, colors, and trims available in the showroom right now.",          example: "New arrivals this week · Available colors of the S07", icon: Tag },
    { n: "09", name: "Maintenance & Car Parts",  desc: "Service tips, genuine parts, and care guides.",                          example: "Genuine vs copy parts · Service interval guide", icon: Wrench },
    { n: "10", name: "Offers / Test Drives / Activations / Announcements", desc: "Promotions, zero down payment, events, official news.", example: "Zero down payment offer · Book a test drive", icon: Megaphone },
    { n: "11", name: "Behind the Scenes",        desc: "Quality inspection, detailing, attention-to-detail content.",            example: "Pre-delivery inspection · The detailing process", icon: Camera },
  ];

  const liveRequirements: { label: string; value: string; color: string; icon: LucideIcon }[] = [
    { label: "Sessions / Month",  value: "8 Live Streams",   color: G,  icon: Radio     },
    { label: "Minimum Duration",  value: "1 Hour Each",      color: D,  icon: Clock     },
    { label: "Viewer Target",     value: "100+ Viewers",     color: G, icon: Eye       },
    { label: "Sales Team",        value: "Must Participate", color: G, icon: UserCheck },
  ];

  const liveFormat: { n: string; step: string; desc: string }[] = [
    { n: "01", step: "Car Walkaround",      desc: "Host walks around vehicle live — exterior, interior, boot space" },
    { n: "02", step: "Feature Explanation", desc: "Deep-dive into specs: screen, ADAS, charging, comfort features" },
    { n: "03", step: "Talk About the Offer",desc: "Present pricing, monthly installment, and zero down payment options" },
    { n: "04", step: "Answer Comments Live",desc: "Respond to viewer questions in real-time — builds trust instantly" },
  ];

  const kolPlan: { type: string; followers: string; content: string; color: string }[] = [
    { type: "Car Reviewers",         followers: "5k–100k",           content: "Test drive video · Honest review · Feature breakdown",       color: G  },
    { type: "Lifestyle Influencers", followers: "Local Jeddah",       content: "Family content · Aspirational integration · Daily life",      color: D  },
    { type: "Snapchat Influencers",  followers: "⭐ Very Important",  content: "Daily story placement · Highest engagement in Saudi Arabia",   color: D },
  ];

  const leadFunnel: { step: string; detail: string; sla: string; color: string; icon: LucideIcon }[] = [
    { step: "Social Media",     detail: "TikTok, Instagram, Snapchat, YouTube — CTA in bio + every post",          sla: "",                      color: G,   icon: Megaphone  },
    { step: "WhatsApp Business",detail: '"اضغط الرابط للتواصل" — dedicated business number, not personal',          sla: "",                      color: WA_C, icon: Phone     },
    { step: "CRM Record",       detail: "Log lead immediately — Name, platform source, model interest, date",       sla: "Within 10 min",         color: G,  icon: Database   },
    { step: "Sales Assignment", detail: "Assign to sales rep + update status: زار / اشترى / رفض",                  sla: "Within 24 hrs follow-up",color: G,  icon: UserCheck  },
    { step: "Sale Closed",      detail: "Arabic voice notes in follow-up — most effective locally",                  sla: "Track: visited/converted/lost", color: D, icon: CheckCircle2 },
  ];

  const teamRoles: { role: string; owner: string; type: string; responsibilities: string[]; color: string }[] = [
    {
      role: "Content Creator", owner: "Layla", type: "Dedicated to Soueast · assisted by Josef & Ahmed", color: G,
      responsibilities: [
        "Film all videos (product, lifestyle, customer delivery)",
        "Edit and publish content daily",
        "Manage Snapchat stories + TikTok posting",
        "Script and shoot live streams",
      ],
    },
    {
      role: "Social Media Manager", owner: "Noman", type: "Full-Time — Dedicated", color: D,
      responsibilities: [
        "Manage all platform accounts and scheduling",
        "Monitor comments, DMs, and WhatsApp leads",
        "Compile daily KPI tracking report",
        "Submit weekly + monthly reports",
      ],
    },
    {
      role: "Community Management & WhatsApp", owner: "Mashaael & Yahya", type: "Response & engagement", color: G,
      responsibilities: [
        "Respond to comments & DMs across platforms",
        "Handle WhatsApp inquiries and leads",
        "Answer from a shared FAQ list",
        "Escalate non-FAQ questions for input",
      ],
    },
  ];

  const accountSetup: { task: string; note: string }[] = [
    { task: "TikTok — Official dealership account",      note: "Naming: Soueast Jeddah / Western Region" },
    { task: "Instagram — Official dealership account",   note: "Bio + WhatsApp link + location" },
    { task: "Snapchat — Official dealership account",    note: "Daily story capability enabled" },
    { task: "YouTube — Official dealership channel",     note: "Full profile: about, contact, location" },
    { task: "Apply Soueast branding on all accounts",    note: "Logo, colors, identity — NO personal accounts" },
    { task: "Set up WhatsApp Business with CTA link",    note: "Add to bio of all platforms + all posts" },
  ];

  const approvalProcess: { step: string; desc: string; icon: LucideIcon }[] = [
    { step: "Prepare Plan",        desc: "Before any campaign, ad, or influencer collab — prepare a detailed brief with objectives, budget, and expected outcomes", icon: FileText    },
    { step: "Send to Soueast",     desc: "Email the plan to Soueast for official review — include all details, creative direction, and targeting",                  icon: Send        },
    { step: "Get Written Approval",desc: "Wait for official email approval before spending a single riyal — no verbal approval accepted",                           icon: CheckCircle2},
    { step: "Execute & Document",  desc: "Execute only after approval. Keep approval email on file — required for expense reimbursement",                           icon: ShieldCheck },
  ];

  const kpiTargets: { metric: string; target: string; icon: LucideIcon; color: string }[] = [
    { metric: "Videos / Month",        target: "12–20",  icon: Video,        color: G  },
    { metric: "Live Streams / Month",  target: "8",      icon: Radio,        color: D  },
    { metric: "Leads / Month",         target: "50–150", icon: MessageCircle,color: G },
    { metric: "Car Sales from Social", target: "2–5",    icon: Target,       color: G },
  ];

  const kpiTable: { metric: string; platform: string; month1: string; month3: string; month6: string; freq: string }[] = [
    { metric: "Videos Published",    platform: "All",    month1: "12–15",  month3: "18–20",  month6: "20+",    freq: "Weekly"  },
    { metric: "Reels / TikToks",     platform: "IG + TT",month1: "8–10",   month3: "14–16",  month6: "18+",    freq: "Weekly"  },
    { metric: "Livestreams",         platform: "TT + IG",month1: "4→8",    month3: "8",      month6: "8",      freq: "Weekly"  },
    { metric: "Followers (TikTok)",  platform: "TikTok", month1: "+500",   month3: "+2,000", month6: "+5,000", freq: "Weekly"  },
    { metric: "Followers (Instagram)",platform:"Instagram",month1: "+200",  month3: "+800",   month6: "+2,000", freq: "Weekly"  },
    { metric: "WhatsApp Leads",      platform: "All",    month1: "20–50",  month3: "80–120", month6: "120–150",freq: "Daily"   },
    { metric: "Cars Sold (social)",  platform: "All",    month1: "1–2",    month3: "3–5",    month6: "5–8",    freq: "Monthly" },
    { metric: "Cost / Lead (SAR)",   platform: "Paid",   month1: "< 80",   month3: "< 60",   month6: "< 45",   freq: "Weekly"  },
  ];

  const incentives: { item: string; condition: string }[] = [
    { item: "Equipment Subsidy",               condition: "Meet content KPIs (12+ videos/month)"            },
    { item: "Salary Support",                  condition: "Dedicated Content Creator + SM Manager hired"     },
    { item: "Content Rewards",                 condition: "Monthly content targets hit"                      },
    { item: "Lead Incentives",                 condition: "50+ leads/month tracked and reported"             },
    { item: "Sales Bonuses",                   condition: "Cars sold from social media leads"                },
    { item: "Ads & Influencer Reimbursement",  condition: "Pre-approved campaigns only — Soueast approval req'd" },
  ];

  const reporting: { cadence: string; what: string; deadline: string; to: string; icon: LucideIcon }[] = [
    { cadence: "Daily",   what: "Views · Likes · Comments · WhatsApp Leads count",                               deadline: "End of day",               to: "Social Media Manager logs internally", icon: Eye      },
    { cadence: "Weekly",  what: "Full platform snapshot — spend, leads, top/bottom content, actions for next week", deadline: "Every Sunday",             to: "Management + Soueast",               icon: Calendar },
    { cadence: "Monthly", what: "Full performance report — all KPIs vs targets, lead quality, recommendations",   deadline: "Before 10th of each month", to: "Soueast (mandatory for incentives)",  icon: BarChart3},
  ];

  const weekSchedule: { day: string; focus: string; tasks: string[]; color: string }[] = [
    { day: "Sun – Mon", focus: "FILMING",    tasks: ["Product videos", "Entertainment/trend content", "Customer delivery content"], color: G   },
    { day: "Tue – Thu", focus: "POSTING",    tasks: ["Publish scheduled posts", "Run paid ads on best videos", "Monitor comments + DMs"], color: D },
    { day: "Friday",    focus: "LIVESTREAM", tasks: ["Live car walkaround", "Feature explanation + Q&A", "Present offers live"], color: G   },
    { day: "Saturday",  focus: "SHOWROOM",   tasks: ["Behind-the-scenes content", "Showroom lifestyle shoots", "Story updates + polls"], color: G },
  ];

  /* 30-day calendar — every day mapped to a communication pillar. ⭐ days are live. */
  const calendarWeeks: { week: string; days: { day: number; type: string; live?: boolean; title: string; ar: string }[] }[] = [
    {
      week: "Week 1",
      days: [
        { day: 1,  type: "Brands",       title: "S08 DM — the 3 things everyone asks about", ar: "S08 DM: ٣ أشياء الكل يسأل عنها 👀"        },
        { day: 2,  type: "Lifestyle",    title: "Weekend-ready: family, luggage, space",     ar: "نهاية الأسبوع: العيلة والعفش والمساحة تكفي وتزيد" },
        { day: 3,  type: "Services",     title: "Everything under one roof",                 ar: "كل اللي تبيه لسيارتك في مكان واحد"        },
        { day: 4,  type: "Inventory",    title: "Just landed in the showroom",               ar: "وصل المعرض هالأسبوع 🚗 تعال شوفه"          },
        { day: 5,  type: "Offers",       title: "Own it with zero down payment",             ar: "تملّكها بدون دفعة أولى 🔥 والقسط يبدأ من…"  },
        { day: 6,  type: "Testimonials", title: "Delivery day — why he chose Soueast",       ar: "يوم الاستلام: ليش اختار Soueast؟"          },
        { day: 7,  type: "Brands", live: true, title: "LIVE: full walkaround from the showroom", ar: "مباشر: جولة كاملة من داخل المعرض"      },
      ],
    },
    {
      week: "Week 2",
      days: [
        { day: 8,  type: "Trends",       title: "Surviving Jeddah traffic",                  ar: "كيف تنجّي نفسك من زحمة جدة 😅"             },
        { day: 9,  type: "Brands",       title: "S07 — built for Jeddah heat",               ar: "S07: مكيّف يقطع الحر وشاشة تفرق"           },
        { day: 10, type: "Team",         title: "Meet your advisor at Motion Motors",        ar: "تعرّف على مستشارك في موشن موتورز"          },
        { day: 11, type: "Offers",       title: "The easiest installment plan right now",    ar: "أسهل تقسيط تلقاه الحين — بالتفصيل"         },
        { day: 12, type: "BTS",          title: "What we check before you drive off",        ar: "نفحص كل شي قبل ما تستلم سيارتك ✅"          },
        { day: 13, type: "Testimonials", title: "One month in — owner's honest take",        ar: "بعد شهر: رأي صاحب السيارة بصراحة"          },
        { day: 14, type: "Offers", live: true, title: "LIVE Q&A: prices & financing",        ar: "مباشر: أسئلتكم عن الأسعار والتمويل"        },
      ],
    },
    {
      week: "Week 3",
      days: [
        { day: 15, type: "Maintenance",  title: "When to service your Soueast",              ar: "متى تسوّي صيانة لسيارتك؟ دليل سريع"        },
        { day: 16, type: "Lifestyle",    title: "Weekend escape, fully loaded",              ar: "طلعة نهاية الأسبوع وكل شي معك"             },
        { day: 17, type: "Inventory",    title: "Pick your color — S07 in stock",            ar: "اختر لونك: S07 متوفر بالمعرض"             },
        { day: 18, type: "Celebrations", title: "Soueast around the world",                  ar: "Soueast حول العالم 🌍 وإحنا في جدة"        },
        { day: 19, type: "Offers",       title: "Offer ends soon — don't miss it",           ar: "العرض ينتهي قريب 🔥 لا يفوتك"             },
        { day: 20, type: "Testimonials", title: "A family picks up their Soueast",           ar: "عائلة تستلم سيارتها اليوم 🚗"              },
        { day: 21, type: "Brands", live: true, title: "LIVE: every model, one session",     ar: "مباشر: جولة على كل الموديلات"             },
      ],
    },
    {
      week: "Week 4 + Closing",
      days: [
        { day: 22, type: "Brands",       title: "Your first car? Start here",                ar: "أول سيارة لك؟ ابدأ من هنا"                },
        { day: 23, type: "Trends",       title: "Street reactions to the design",            ar: "وش رأي الناس بالتصميم؟ نسألهم بالشارع"     },
        { day: 24, type: "Maintenance",  title: "Genuine parts — why they matter",           ar: "ليش القطع الأصلية تفرق؟"                   },
        { day: 25, type: "Offers",       title: "Book your test drive today",                ar: "احجز تجربة القيادة اليوم 🚗"               },
        { day: 26, type: "Team",         title: "The team behind Motion Motors",             ar: "الفريق اللي وراء موشن موتورز"             },
        { day: 27, type: "Testimonials", title: "First drive — real reaction",               ar: "أول تجربة قيادة: ردة الفعل الحقيقية"       },
        { day: 28, type: "Offers", live: true, title: "LIVE: this month's offers + financing", ar: "مباشر: عروض الشهر والتمويل"             },
        { day: 29, type: "BTS",          title: "Detailing + best moments this month",       ar: "التجهيز والتفاصيل وأبرز لحظات الشهر"       },
        { day: 30, type: "Offers",       title: "Last chance before the offer ends",         ar: "آخر فرصة قبل ما ينتهي العرض 🔥"           },
      ],
    },
  ];

  /* Pillar palette — orange for lead-driving pillars, black for the rest */
  const typeColors: Record<string, string> = {
    Brands:       G,
    Offers:       G,
    Inventory:    G,
    Testimonials: G,
    Lifestyle:    D,
    Trends:       D,
    Team:         D,
    BTS:          D,
    Maintenance:  D,
    Celebrations: D,
    Services:     D,
  };

  /* Platforms each pillar is distributed to */
  const typePlatforms: Record<string, ("tiktok"|"instagram"|"snapchat"|"youtube")[]> = {
    Brands:       ["tiktok", "instagram", "youtube"],
    Offers:       ["tiktok", "instagram", "snapchat"],
    Inventory:    ["instagram", "snapchat"],
    Testimonials: ["tiktok", "instagram"],
    Lifestyle:    ["instagram", "snapchat"],
    Trends:       ["tiktok", "snapchat"],
    Team:         ["instagram", "snapchat"],
    BTS:          ["instagram", "tiktok"],
    Maintenance:  ["youtube", "instagram"],
    Celebrations: ["tiktok", "instagram", "snapchat"],
    Services:     ["youtube", "instagram"],
  };

  /* ═══ RENDER ═══ */
  return (
    <div ref={ref} style={{ background: "#fff", color: D }}>
      <SectionNav />

      {/* ══════════ HERO ══════════ */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: "#fff" }}>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center">
          <div className="sm-hero opacity-0 mb-8" style={{ paddingTop: 40 }}>
            <img src="/motionmotors/soueast.png" alt="Soueast" className="h-16 md:h-20 mx-auto object-contain" />
          </div>
          <div className="sm-hero opacity-0 text-center mb-3">
            <p className="text-[13px] font-bold" style={{ color: D, opacity: 0.3 }}>June 2026</p>
          </div>
          <div className="sm-hero opacity-0 text-center mb-4">
            <h1 className="heading" style={{ fontSize: "clamp(38px, 9vw, 88px)", lineHeight: 1.05, color: D }}>
              New Media<br /><span style={{ color: G }}>Execution Plan</span>
            </h1>
          </div>
          <div className="sm-hero opacity-0 text-center mb-8">
            <p className="text-lg" style={{ color: D, opacity: 0.45 }}>Jeddah & Western Region · Saudi Audience</p>
            <p className="text-xl font-bold mt-1 heading" style={{ color: G }}>Motion Motors × Soueast</p>
          </div>

          {/* Stats bar */}
          <div className="sm-hero opacity-0 mb-8 w-full max-w-2xl">
            <div className="flex items-stretch justify-center" style={{ background: "#fff", border: "1px solid #E8E8E8", borderRadius: 16, overflow: "hidden" }}>
              {[
                { n: "12–20", l: "Videos / Month" },
                { n: "8",     l: "Live Streams / Mo" },
                { n: "50+",   l: "Leads / Month" },
                { n: "Soon",  l: "Budget" },
              ].map((s, i) => (
                <div key={s.l} className="flex-1 flex flex-col items-center justify-center py-5 px-2 relative" style={{ borderRight: i < 3 ? "1px solid #F0F0F0" : "none" }}>
                  <span className="heading" style={{ fontSize: 22, lineHeight: 1, color: D }}>{s.n}</span>
                  <span className="text-[10px] font-bold mt-1" style={{ color: D, opacity: 0.3 }}>{s.l}</span>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-t-full" style={{ background: G }} />
                </div>
              ))}
            </div>
          </div>

          {/* Prepared by */}
          <div className="sm-hero opacity-0 grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 w-full max-w-xl">
            <div className="rounded-[16px] p-5" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
              <p className="text-[10px] font-bold mb-2" style={{ color: G }}>Prepared By</p>
              <p className="text-[14px] font-bold" style={{ color: D }}>Ahmed Ali</p>
              <p className="text-[11px]" style={{ color: D, opacity: 0.4 }}>Head of Digital Product & Growth</p>
              <p className="text-[11px]" style={{ color: D, opacity: 0.3 }}>ahmed.ali@emotiongrp.com</p>
            </div>
            <div className="rounded-[16px] p-5" style={{ background: "#fff", border: `2px solid ${G}` }}>
              <p className="text-[10px] font-bold mb-2" style={{ color: G }}>Presented To</p>
              <p className="text-[14px] font-bold" style={{ color: D }}>Mr. Edgard Tabet</p>
              <p className="text-[11px]" style={{ color: D, opacity: 0.5 }}>Group Managing Director</p>
              <p className="text-[11px]" style={{ color: D, opacity: 0.4 }}>Emotion Group</p>
            </div>
          </div>

          <div className="sm-hero opacity-0 flex flex-col items-center">
            <div style={{ width: 24, height: 38, border: "1.5px solid #E8E8E8", borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 5 }}>
              <div style={{ width: 3, height: 6, borderRadius: 2, background: G, animation: "scrollSM 1.6s ease-in-out infinite" }} />
            </div>
          </div>
        </div>
        <style>{`@keyframes scrollSM{0%{transform:translateY(0);opacity:1}75%{transform:translateY(9px);opacity:0}76%{transform:translateY(0);opacity:0}100%{opacity:1}}`}</style>
      </section>

      {/* ══════════ 01 — PLATFORM STRATEGY ══════════ */}
      <section id="s01" className="sm-slide opacity-0" style={{ padding: "100px 24px", background: LG }}>
        <div className="max-w-5xl mx-auto">
          <SH n="01" title="Platform" accent="Strategy" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm-stagger">
            {platforms.map((p) => (
              <div key={p.name} className="sm-item rounded-[20px] overflow-hidden" style={{ border: `1.5px solid ${p.brand}30` }}>
                <div className="p-6 flex flex-col items-center text-center" style={{ background: p.brand }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3" style={{ background: "rgba(255,255,255,0.12)" }}>
                    {p.icon}
                  </div>
                  <span className="text-[9px] font-bold mb-1" style={{ color: p.textDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.6)" }}>{p.role}</span>
                  <p className="heading text-xl" style={{ color: p.textDark ? "#000" : "#fff" }}>{p.name}</p>
                </div>
                <div className="p-5" style={{ background: "#fff" }}>
                  <p className="text-[13px] font-bold mb-1" style={{ color: G }}>{p.freq}</p>
                  <p className="text-[13px]" style={{ color: D, opacity: 0.5 }}>Goal: {p.goal}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 02 — TEAM STRUCTURE ══════════ */}
      <section id="s02" className="sm-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <SH n="02" title="Team &" accent="Setup" />

          {/* Role owner cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm-stagger mb-6" style={{ alignItems: "stretch" }}>
            {teamRoles.map((r) => (
              <div key={r.role} className="sm-item rounded-[24px] overflow-hidden flex flex-col h-full" style={{ background: "#fff", border: "1px solid #E8E8E8", borderLeft: `4px solid ${r.color === D ? D : G}` }}>
                <div className="px-6 pt-6 pb-5">
                  <h3 className="heading text-xl mb-1" style={{ color: r.color === D ? D : G }}>{r.role}</h3>
                  <p className="text-[12px]" style={{ color: D, opacity: 0.45 }}>{r.type}</p>
                  <div className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full" style={{ background: r.color === D ? D : G }}>
                    <UserCheck size={13} color="#fff" />
                    <span className="text-[13px] font-bold" style={{ color: "#fff" }}>{r.owner}</span>
                  </div>
                </div>
                <div className="px-6 pb-6 flex-1" style={{ borderTop: "1px solid #F0F0F0", paddingTop: 16 }}>
                  <div className="flex flex-col gap-2.5">
                    {r.responsibilities.map((resp, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 size={13} color={r.color === D ? D : G} className="flex-shrink-0 mt-0.5" />
                        <span className="text-[13px]" style={{ color: D, opacity: 0.7 }}>{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Accounts & Channels + Content production */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6 sm-stagger">
            <div className="sm-item rounded-[20px] p-6" style={{ background: "#fff", border: `1.5px solid ${G}30` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: G }}><Megaphone size={18} color="#fff" /></div>
                <h4 className="heading text-lg" style={{ color: D }}>Accounts & Channels</h4>
              </div>
              <div className="flex flex-col gap-2.5">
                {[
                  "Publish on both the Motion Motors and Soueast Jeddah accounts",
                  "Create a dedicated Motion Motors YouTube channel",
                  "Soueast Jeddah accounts carry no Motion Motors branding",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-2.5">
                    <CheckCircle2 size={13} color={G} className="flex-shrink-0 mt-0.5" />
                    <span className="text-[13px]" style={{ color: D, opacity: 0.7 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="sm-item rounded-[20px] p-6" style={{ background: "#fff", border: `1.5px solid ${G}30` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: G }}><Video size={18} color="#fff" /></div>
                <h4 className="heading text-lg" style={{ color: D }}>Influencers & Content</h4>
              </div>
              <div className="flex flex-col gap-2.5">
                {[
                  "Onboard automotive / lifestyle influencers based in Jeddah",
                  "Video nature: mostly AI-generated for now (TBD)",
                  "Agency workflow shared as an email attachment",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-2.5">
                    <CheckCircle2 size={13} color={G} className="flex-shrink-0 mt-0.5" />
                    <span className="text-[13px]" style={{ color: D, opacity: 0.7 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tools & operations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm-stagger">
            {[
              { icon: Phone, title: "Dedicated Phone", desc: "A dedicated phone for social media posting." },
              { icon: Zap,   title: "Corporate Card", desc: "A dedicated corporate bank card for paid campaigns." },
            ].map((t) => (
              <div key={t.title} className="sm-item rounded-[16px] p-5 flex items-center gap-4" style={{ background: "#fff", border: "1px solid #E8E8E8" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: G }}><t.icon size={19} color="#fff" /></div>
                <div>
                  <p className="heading text-base" style={{ color: D }}>{t.title}</p>
                  <p className="text-[13px]" style={{ color: D, opacity: 0.55 }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 03 — LIVE STREAM STRATEGY ══════════ */}
      <section id="s03" className="sm-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <SH n="03" title="Live Stream" accent="Strategy" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 sm-stagger">
            {liveRequirements.map((r) => (
              <div key={r.label} className="sm-item rounded-[20px] p-5 text-center" style={{ background: "#fff", border: `1.5px solid ${r.color}30` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: `${r.color}12` }}>
                  <r.icon size={18} color={r.color} />
                </div>
                <p className="heading text-base" style={{ color: D }}>{r.value}</p>
                <p className="text-[11px] mt-1" style={{ color: D, opacity: 0.4 }}>{r.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-[20px] p-6" style={{ background: LG, border: "1px solid #E8E8E8" }}>
              <p className="text-[10px] font-bold mb-4" style={{ color: G }}>LIVE FORMAT — EACH SESSION</p>
              <div className="flex flex-col gap-4">
                {liveFormat.map((f) => (
                  <div key={f.n} className="flex items-start gap-3">
                    <span className="heading text-2xl flex-shrink-0" style={{ color: G, width: 32 }}>{f.n}</span>
                    <div>
                      <p className="text-[14px] font-bold" style={{ color: D }}>{f.step}</p>
                      <p className="text-[13px]" style={{ color: D, opacity: 0.5 }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[20px] p-6" style={{ background: LG, border: "1px solid #E8E8E8" }}>
              <p className="text-[10px] font-bold mb-4" style={{ color: G }}>ARABIC LIVE TITLES</p>
              {[
                "جولة مباشرة في صالة عرض Soueast جدة",
                "عروض اليوم فقط 🔥 لا تفوت",
                "أسئلة وأجوبة عن الأسعار والتمويل",
                "استلام سيارة مباشر من المعرض",
              ].map((title, i) => (
                <div key={i} className="rounded-[10px] p-3 mb-2" style={{ background: "#fff", border: "1px solid #E8E8E8", ...AR }}>
                  <p className="text-[14px]" style={{ color: D }}>{title}</p>
                </div>
              ))}
              <div className="mt-4 rounded-[12px] p-3 flex items-start gap-2" style={{ background: `${G}10`, border: `1px solid ${G}25` }}>
                <CheckCircle2 size={13} color={G} className="flex-shrink-0 mt-0.5" />
                <p className="text-[13px]" style={{ color: D }}>Salesperson must appear on camera — Arabic-speaking host required every session</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 04 — KOL / INFLUENCER ══════════ */}
      <section id="s04" className="sm-slide opacity-0" style={{ padding: "100px 24px", background: LG }}>
        <div className="max-w-5xl mx-auto">
          <SH n="04" title="KOL / Influencer" accent="Strategy" />
          <p className="text-center text-sm mb-10 max-w-md mx-auto" style={{ color: D, opacity: 0.5 }}>2–4 collaborations/month · Local Jeddah focus · Trust over follower count</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm-stagger mb-8">
            {kolPlan.map((k) => (
              <div key={k.type} className="sm-item rounded-[20px] overflow-hidden" style={{ border: `1.5px solid ${k.color}30`, background: "#fff" }}>
                <div className="p-5" style={{ background: `${k.color}12`, borderBottom: `1px solid ${k.color}20` }}>
                  {k.type === "Snapchat Influencers" && (
                    <div className="flex items-center gap-2 mb-2"><PIcon p="snapchat" size={13} /><p className="heading text-sm" style={{ color: D }}>Snapchat Influencers</p></div>
                  )}
                  {k.type !== "Snapchat Influencers" && <p className="heading text-base" style={{ color: D }}>{k.type}</p>}
                  <p className="text-[12px] font-bold mt-1" style={{ color: k.color === D ? D : k.color }}>{k.followers}</p>
                </div>
                <div className="p-5">
                  <p className="text-[14px]" style={{ color: D, opacity: 0.6 }}>{k.content}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-[16px] p-5 flex items-start gap-3" style={{ background: `${G}08`, border: `1px solid ${G}25` }}>
            <AlertCircle size={16} color={G} className="flex-shrink-0 mt-0.5" />
            <p className="text-[13px]" style={{ color: D }}>
              <strong style={{ color: G }}>Approval Required: </strong>
              All influencer collaborations must be pre-approved by Soueast in writing before execution. Non-approved collabs will NOT be reimbursed.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════ 05 — LEAD GENERATION ══════════ */}
      <section id="s05" className="sm-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <SH n="05" title="Lead Generation" accent="System" />
          <div className="flex flex-col gap-3 sm-stagger mb-8">
            {leadFunnel.map((step, i) => (
              <div key={step.step} className="sm-item">
                <div className="flex items-start gap-4 rounded-[16px] p-5" style={{ background: "#fff", border: `1.5px solid ${step.color}25` }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${step.color}12` }}>
                    {step.step === "WhatsApp Business"
                      ? <PIcon p="whatsapp" size={16} />
                      : <step.icon size={18} color={step.color} />
                    }
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${step.color}12`, color: step.color }}>Step {String(i+1).padStart(2,"0")}</span>
                      <p className="heading text-base" style={{ color: D }}>{step.step}</p>
                    </div>
                    <p className="text-[13px]" style={{ color: D, opacity: 0.6 }}>{step.detail}</p>
                  </div>
                  {step.sla && (
                    <div className="flex-shrink-0 rounded-[10px] px-3 py-2 text-center" style={{ background: `${step.color}08`, border: `1px solid ${step.color}20` }}>
                      <p className="text-[10px] font-bold" style={{ color: step.color }}>{step.sla}</p>
                    </div>
                  )}
                </div>
                {i < leadFunnel.length - 1 && (
                  <div className="flex justify-center my-1">
                    <ArrowRight size={14} color="#E8E8E8" style={{ transform: "rotate(90deg)" }} />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Zap,   label: "Response Time", value: "5–10 minutes",   sub: "Max time from lead to first contact", color: G  },
              { icon: Phone, label: "Follow-up SLA",  value: "Within 24 hrs", sub: "Assign, contact, update status",      color: G   },
              { icon: Users, label: "Lead Tracking",  value: "زار / اشترى / رفض", sub: "All leads must have a status",  color: D   },
            ].map((s) => {
              const isAr = /[؀-ۿ]/.test(s.value);
              return (
                <div key={s.label} className="rounded-[16px] p-5 text-center" style={{ background: LG, border: "1px solid #E8E8E8" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: `${s.color}12` }}>
                    <s.icon size={18} color={s.color} />
                  </div>
                  <p className="text-[10px] font-bold mb-1" style={{ color: s.color }}>{s.label}</p>
                  <p className={isAr ? "text-base font-bold" : "heading text-sm"} style={{ color: D, ...(isAr ? AR : {}) }}>{s.value}</p>
                  <p className="text-[12px] mt-1" style={{ color: D, opacity: 0.4 }}>{s.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ 06 — ACCOUNT SETUP ══════════ */}
      <section id="s06" className="sm-slide opacity-0" style={{ padding: "100px 24px", background: LG }}>
        <div className="max-w-5xl mx-auto">
          <SH n="06" title="Account Setup" accent="Checklist" />
          <div className="rounded-[14px] p-4 mb-10 flex items-center gap-3" style={{ background: `${G}10`, border: `1px solid ${G}30` }}>
            <Clock size={15} color={G} />
            <p className="text-[14px] font-bold" style={{ color: G }}>Deadline: Within 5 days — Immediate action required</p>
          </div>

          {/* Platform setup cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm-stagger mb-8">
            {([
              { key: "tiktok"    as const, label: "TikTok",             task: accountSetup[0].task, note: accountSetup[0].note },
              { key: "instagram" as const, label: "Instagram",          task: accountSetup[1].task, note: accountSetup[1].note },
              { key: "snapchat"  as const, label: "Snapchat",           task: accountSetup[2].task, note: accountSetup[2].note },
              { key: "youtube"   as const, label: "YouTube",            task: accountSetup[3].task, note: accountSetup[3].note },
              { key: "tiktok"    as const, label: "Branding (All)",     task: accountSetup[4].task, note: accountSetup[4].note },
              { key: "whatsapp"  as const, label: "WhatsApp Business",  task: accountSetup[5].task, note: accountSetup[5].note },
            ] as { key: "tiktok"|"instagram"|"snapchat"|"youtube"|"whatsapp"; label: string; task: string; note: string }[]).map((item, i) => (
              <div key={i} className="sm-item rounded-[20px] overflow-hidden" style={{ background: "#fff", border: "1px solid #E8E8E8" }}>
                {/* Card top strip */}
                <div className="px-5 pt-5 pb-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${G}15` }}>
                  <div className="flex items-center gap-3">
                    <PIcon p={item.key} size={18} />
                    <p className="heading text-base" style={{ color: D }}>{item.label}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: G, color: "#fff" }}>5 days</span>
                </div>
                {/* Card body */}
                <div className="p-5">
                  <p className="text-[13px] font-semibold mb-1" style={{ color: D }}>{item.task}</p>
                  <p className="text-[12px]" style={{ color: D, opacity: 0.45 }}>{item.note}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-[14px] p-4 flex items-start gap-3" style={{ background: `${G}10`, border: `1px solid ${G}30` }}>
            <AlertCircle size={15} color={G} className="flex-shrink-0 mt-0.5" />
            <p className="text-[13px]" style={{ color: D }}>
              <strong style={{ color: G }}>No personal accounts: </strong>
              All must be official dealership accounts — verified, branded, consistent naming (Soueast + Jeddah / Western Region).
            </p>
          </div>
        </div>
      </section>

      {/* ══════════ 07 — APPROVAL PROCESS ══════════ */}
      <section id="s07" className="sm-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <SH n="07" title="Soueast Approval" accent="Process" />
          <div className="rounded-[16px] p-5 mb-8 flex items-start gap-3" style={{ background: `${G}08`, border: `1px solid ${G}25` }}>
            <AlertCircle size={16} color={G} className="flex-shrink-0 mt-0.5" />
            <p className="text-[14px]" style={{ color: D }}>
              <strong style={{ color: G }}>MANDATORY: </strong>
              Any campaign, ad, or influencer collaboration launched without prior Soueast <strong>written approval</strong> will NOT be reimbursed. No exceptions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm-stagger">
            {approvalProcess.map((a, i) => (
              <div key={a.step} className="sm-item rounded-[20px] overflow-hidden" style={{ border: `1.5px solid ${G}20` }}>
                <div className="p-5 text-center" style={{ background: G }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ background: "rgba(255,255,255,0.25)" }}>
                    <a.icon size={18} color="#fff" />
                  </div>
                  <span className="heading text-3xl" style={{ color: "#fff" }}>0{i + 1}</span>
                </div>
                <div className="p-4" style={{ background: LG }}>
                  <p className="heading text-sm mb-2" style={{ color: D }}>{a.step}</p>
                  <p className="text-[13px]" style={{ color: D, opacity: 0.55 }}>{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 08 — KPI TARGETS ══════════ */}
      <section id="s08" className="sm-slide opacity-0" style={{ padding: "100px 24px", background: LG }}>
        <div className="max-w-5xl mx-auto">
          <SH n="08" title="KPI Targets &" accent="Tracking" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12 sm-stagger">
            {kpiTargets.map((k) => (
              <div key={k.metric} className="sm-item rounded-[20px] p-7 text-center" style={{ background: "#fff", border: `1.5px solid ${k.color}25` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: `${k.color}12` }}>
                  <k.icon size={20} color={k.color} />
                </div>
                <p className="heading text-3xl mb-1" style={{ color: D }}>{k.target}</p>
                <p className="text-[13px]" style={{ color: D, opacity: 0.45 }}>{k.metric}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[20px] overflow-hidden" style={{ border: "1px solid #E8E8E8" }}>
            <div className="overflow-x-auto">
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
                <thead>
                  <tr style={{ background: G }}>
                    {["KPI Metric", "Platform", "Month 1", "Month 3", "Month 6", "Track"].map((h, i) => (
                      <th key={h} style={{ padding: "14px 16px", textAlign: i===0?"left":"center", fontSize: 11, fontWeight: 700, color: "#fff", fontFamily:"var(--font-bricolage),sans-serif" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {kpiTable.map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #F0F0F0", background: "#fff" }}>
                      <td style={{ padding:"13px 16px", fontSize:14, fontWeight:600, color:D, fontFamily:"var(--font-bricolage),sans-serif" }}>{row.metric}</td>
                      <td style={{ padding:"13px 16px", textAlign:"center", fontSize:12, color:D, opacity: 0.4 }}>{row.platform}</td>
                      <td style={{ padding:"13px 16px", textAlign:"center", fontSize:13, fontWeight:700, color:G }}>{row.month1}</td>
                      <td style={{ padding:"13px 16px", textAlign:"center", fontSize:13, fontWeight:700, color:G }}>{row.month3}</td>
                      <td style={{ padding:"13px 16px", textAlign:"center", fontSize:13, fontWeight:700, color:D }}>{row.month6}</td>
                      <td style={{ padding:"13px 16px", textAlign:"center", fontSize:11, color:D, opacity: 0.35 }}>{row.freq}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 09 — BUDGET & INCENTIVES ══════════ */}
      <section id="s09" className="sm-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <SH n="09" title="Budget &" accent="Incentives" />

          {/* Budget & ad spend — to be confirmed */}
          <div className="rounded-[24px] p-10 md:p-14 mb-10 flex flex-col items-center text-center" style={{ background: "#fff", border: `1.5px dashed ${G}50` }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: G }}>
              <Clock size={24} color="#fff" />
            </div>
            <p className="text-[11px] font-bold mb-2 tracking-widest" style={{ color: G }}>BUDGET &amp; AD SPEND</p>
            <p className="heading" style={{ fontSize: 48, color: D, lineHeight: 1 }}>Soon</p>
            <p className="text-[13px] mt-3 max-w-sm" style={{ color: D, opacity: 0.45 }}>
              Monthly budget and paid-ads allocation will be confirmed and shared shortly.
            </p>
          </div>

          <p className="heading text-xl text-center mb-6" style={{ color: D }}>What Soueast Offers — If We Execute Correctly</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm-stagger">
            {incentives.map((inc) => (
              <div key={inc.item} className="sm-item rounded-[16px] p-5 flex items-start gap-3" style={{ background: LG, border: `1px solid ${G}20` }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${G}15` }}>
                  <Star size={14} color={G} />
                </div>
                <div>
                  <p className="text-[14px] font-bold" style={{ color: D }}>{inc.item}</p>
                  <p className="text-[12px] mt-0.5" style={{ color: D, opacity: 0.45 }}>{inc.condition}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 10 — REPORTING SYSTEM ══════════ */}
      <section id="s10" className="sm-slide opacity-0" style={{ padding: "100px 24px", background: LG }}>
        <div className="max-w-5xl mx-auto">
          <SH n="10" title="Reporting" accent="System" />
          <div className="rounded-[16px] p-5 mb-8 flex items-start gap-3" style={{ background: `${G}10`, border: `1px solid ${G}30` }}>
            <AlertCircle size={16} color={G} className="flex-shrink-0 mt-0.5" />
            <p className="text-[14px]" style={{ color: D }}>
              <strong style={{ color: G }}>Critical: </strong>
              No reporting = No incentives. Missing the monthly deadline (before 10th) means forfeiting all Soueast financial support for that month.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm-stagger">
            {reporting.map((r, i) => {
              const color = [G, G, D][i];
              return (
                <div key={r.cadence} className="sm-item rounded-[20px] overflow-hidden" style={{ border: `1.5px solid ${color}25` }}>
                  <div className="p-5" style={{ background: color }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background:"rgba(255,255,255,0.25)" }}>
                        <r.icon size={18} color="#fff" />
                      </div>
                      <p className="heading text-xl" style={{ color: "#fff" }}>{r.cadence}</p>
                    </div>
                  </div>
                  <div className="p-5" style={{ background:"#fff" }}>
                    <div className="flex items-center gap-2 mb-3">
                      <Clock size={12} color={color} />
                      <p className="text-[12px] font-bold" style={{ color }}>{r.deadline}</p>
                    </div>
                    <p className="text-[13px] mb-3" style={{ color: D, opacity: 0.65 }}>{r.what}</p>
                    <p className="text-[11px]" style={{ color: D, opacity: 0.35 }}>To: {r.to}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ 11 — LAUNCH ROADMAP ══════════ */}
      <section id="s11" className="sm-slide opacity-0" style={{ padding: "100px 24px", background: LG }}>
        <div className="max-w-4xl mx-auto">
          <SH n="11" title="Launch" accent="Roadmap" />
          <p className="text-center mb-12" style={{ color: D, fontSize: 15 }}>
            Kickoff: <strong style={{ color: G }}>Wednesday, July 1, 2026</strong> — from zero to full cadence in 30 days.
          </p>

          <div className="relative">
            <div className="absolute top-2 bottom-2 hidden md:block" style={{ left: 119, width: 2, background: `${G}25` }} />

            <div className="flex flex-col gap-4">
              {[
                {
                  phase: "Phase 1", title: "Setup Sprint", date: "Jul 1 – 5", days: "Wed – Sun · 5 days", accent: G,
                  milestones: [
                    "Create + brand all 4 official accounts (TikTok, Instagram, Snapchat, YouTube)",
                    "Set up WhatsApp Business + CTA link in every bio",
                    "Assign Content Creator + Social Media Manager (already on team — no hiring delay)",
                    "Pick the on-camera Presenter (face of the brand)",
                  ],
                },
                {
                  phase: "Phase 2", title: "Soft Launch", date: "Jul 6 – 12", days: "Week 1", accent: D,
                  milestones: [
                    "First content shoot — film 5 videos (Mon Jul 6)",
                    "⭐ First post goes LIVE — Wed Jul 8",
                    "Daily Snapchat stories begin",
                    "WhatsApp lead funnel switched on",
                  ],
                },
                {
                  phase: "Phase 3", title: "First Live + Influencers", date: "Jul 13 – 19", days: "Week 2", accent: G,
                  milestones: [
                    "⭐ First live stream from the showroom",
                    "First KOL / influencer outreach (target 2)",
                    "First leads logged + assigned in CRM",
                    "Ramp posting toward daily",
                  ],
                },
                {
                  phase: "Phase 4", title: "Full Cadence", date: "Jul 20 – 31", days: "Weeks 3 – 4", accent: D,
                  milestones: [
                    "Hit full target: 6–7 posts/week + 2 lives/week",
                    "Paid ads live on top-performing organic videos",
                    "Weekly snapshot every Sunday",
                    "Compile first monthly performance report",
                  ],
                },
                {
                  phase: "Milestone", title: "First Soueast Review", date: "Before Aug 10", days: "Month 1 close", accent: G,
                  milestones: [
                    "Submit first full monthly report to Soueast",
                    "All KPIs vs targets · lead quality · recommendations",
                    "Unlocks Month 1 incentive eligibility",
                  ],
                },
              ].map((p) => (
                <div key={p.phase} className="sm-item flex items-start gap-5">
                  <div className="flex-shrink-0 hidden md:flex flex-col items-center" style={{ width: 100 }}>
                    <div className="rounded-[12px] w-full px-2 py-3 text-center" style={{ background: G }}>
                      <p className="heading text-[15px] leading-tight" style={{ color: "#fff" }}>{p.date}</p>
                    </div>
                    <p className="text-[10px] font-bold mt-1.5" style={{ color: D }}>{p.days}</p>
                  </div>
                  <div className="flex-shrink-0 hidden md:flex items-center justify-center mt-2" style={{ width: 18 }}>
                    <span className="rounded-full" style={{ width: 14, height: 14, background: G, border: "3px solid #fff", boxShadow: `0 0 0 2px ${G}` }} />
                  </div>
                  <div className="flex-1 rounded-[18px] p-5" style={{ background: "#fff", border: `1.5px solid ${G}40` }}>
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: G, color: "#fff" }}>{p.phase}</span>
                      <h4 className="heading text-lg" style={{ color: D }}>{p.title}</h4>
                      <span className="text-[11px] font-bold md:hidden" style={{ color: G }}>· {p.date}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      {p.milestones.map((m, j) => {
                        const star = m.startsWith("⭐");
                        return (
                          <div key={j} className="flex items-start gap-2.5">
                            {star
                              ? <span className="flex-shrink-0 mt-0.5" style={{ fontSize: 12 }}>⭐</span>
                              : <CheckCircle2 size={14} color={G} className="flex-shrink-0 mt-0.5" />}
                            <span className="text-[13px]" style={{ color: D, fontWeight: star ? 700 : 400 }}>{star ? m.slice(2) : m}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 12 — WEEKLY SCHEDULE ══════════ */}
      <section id="s12" className="sm-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <SH n="12" title="Weekly Execution" accent="Schedule" />
          <p className="text-center mb-10" style={{ color: D, opacity: 0.55, fontSize: 14 }}>
            Once the launch ramp is done — this is the repeating weekly rhythm.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm-stagger">
            {weekSchedule.map((w) => (
              <div key={w.day} className="sm-item rounded-[20px] overflow-hidden" style={{ border: `1.5px solid ${w.color}25` }}>
                <div className="p-5 text-center" style={{ background: w.color }}>
                  <p className="text-[10px] font-bold mb-1" style={{ color: w.color===D?"rgba(255,255,255,0.45)":"rgba(0,0,0,0.4)" }}>{w.day}</p>
                  <p className="heading text-xl" style={{ color: w.color===D?"#fff":D }}>{w.focus}</p>
                </div>
                <div className="p-5" style={{ background: LG }}>
                  {w.tasks.map((t, i) => (
                    <div key={i} className="flex items-start gap-2 mb-2">
                      <CheckCircle2 size={13} color={w.color===D?D:G} className="flex-shrink-0 mt-0.5" />
                      <p className="text-[13px]" style={{ color: D, opacity: 0.65 }}>{t}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 13 — PAID ADS ══════════ */}
      <section id="s13" className="sm-slide opacity-0" style={{ padding: "100px 24px", background: LG }}>
        <div className="max-w-5xl mx-auto">
          <SH n="13" title="Paid Ads" accent="Strategy" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm-stagger mb-8">
            {[
              { p: "instagram" as const, brand: INSTA_C,  tags: ["Carousel + Reels", "Retarget viewers", "WhatsApp click", "A/B test offer"],    desc: "Boost top-performing Reels. Target Jeddah & KSA males 22–45. Objective: Traffic to WhatsApp." },
              { p: "tiktok"    as const, brand: TIKTOK_C, tags: ["In-Feed from organic", "Spark Ads", "Saudi geo-targeting", "Lookalike audiences"], desc: "Promote viral videos and offers. Arabic creative, local targeting. TopView + In-Feed." },
            ].map((ad) => (
              <div key={ad.p} className="sm-item rounded-[20px] overflow-hidden" style={{ background:"#fff", border:`1.5px solid ${ad.brand}25` }}>
                <div className="px-5 py-4 flex items-center gap-3" style={{ background:`${ad.brand}10`, borderBottom:`1px solid ${ad.brand}20` }}>
                  <PIcon p={ad.p} size={16} />
                  <p className="heading text-base" style={{ color: D }}>{ad.p === "instagram" ? "Instagram Ads" : "TikTok Ads"}</p>
                </div>
                <div className="p-5">
                  <p className="text-[14px] mb-4" style={{ color:D, opacity: 0.6 }}>{ad.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {ad.tags.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ background:LG, color:D, opacity: 0.5, border:"1px solid #E8E8E8" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-[16px] p-5" style={{ background:"#fff", border:`1.5px solid ${G}30` }}>
            <p className="heading text-sm mb-2" style={{ color: G }}>Budget Principle</p>
            <p className="text-[14px]" style={{ color:D, opacity: 0.6 }}>
              Start small and consistent. Promote ONLY proven top-performing organic videos. Scale max 20% at a time — never change during the learning phase. All campaigns require Soueast pre-approval.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════ 14 — COMMUNICATION PILLARS ══════════ */}
      <section id="s14" className="sm-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <SH n="14" title="Communication" accent="Pillars" />
          <p className="text-center mb-8 max-w-2xl mx-auto" style={{ color: D, fontSize: 15 }}>
            Every post maps to one of Motion Motors&apos; <strong style={{ color: G }}>11 communication pillars</strong> — nothing generic. This is the content framework the whole calendar is built on.
          </p>

          {/* Cadence strip */}
          <div className="flex items-center justify-center gap-3 flex-wrap mb-12">
            <span className="px-4 py-2 rounded-full text-[12px] font-bold" style={{ background: G, color: "#fff" }}>6–7 posts / week</span>
            <span className="text-[13px]" style={{ color: D }}>distributed across</span>
            {(["tiktok","instagram","snapchat","youtube"] as const).map((p) => <PIcon key={p} p={p} size={13} />)}
          </div>

          {/* ── 11 Pillar Cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm-stagger mb-12">
            {pillars.map((p) => (
              <div key={p.n} className="sm-item rounded-[18px] p-5 flex flex-col" style={{ background: "#fff", border: `1.5px solid ${G}30` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: G }}>
                    <p.icon size={18} color="#fff" />
                  </div>
                  <span className="heading text-2xl" style={{ color: G }}>{p.n}</span>
                </div>
                <h4 className="heading text-[15px] mb-1.5 leading-tight" style={{ color: D }}>{p.name}</h4>
                <p className="text-[12.5px] mb-3 leading-snug flex-1" style={{ color: D, opacity: 0.6 }}>{p.desc}</p>
                <div className="rounded-[10px] px-3 py-2" style={{ border: `1px solid ${G}30` }}>
                  <p className="text-[11px]" style={{ color: D }}><span className="font-bold" style={{ color: G }}>e.g. </span>{p.example}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Script Template ── */}
          <div className="rounded-[20px] overflow-hidden" style={{ border: `1.5px solid ${G}30` }}>
            <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${G}20`, background: `${G}06` }}>
              <p className="heading text-sm" style={{ color: D }}>Script Template — Use Every Video</p>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: `${G}15`, color: G }}>4 steps</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4">
              {[
                { n: "01", step: "Hook", timing: "0–3 sec", ex: "إذا تفكر تشتري سيارة…", border: true },
                { n: "02", step: "Value", timing: "3–10 sec", ex: "Show features or offer", border: true },
                { n: "03", step: "Proof", timing: "10–20 sec", ex: "Real car / real customer", border: true },
                { n: "04", step: "CTA", timing: "Last 3 sec", ex: "تواصل معنا الآن", border: false },
              ].map((s) => (
                <div key={s.n} className="p-5 flex flex-col gap-2"
                  style={{ borderRight: s.border ? "1px solid #F0F0F0" : "none" }}>
                  <span className="heading" style={{ fontSize: 32, lineHeight: 1, color: G }}>{s.n}</span>
                  <div>
                    <p className="heading text-sm" style={{ color: D }}>{s.step}</p>
                    <p className="text-[10px] font-bold" style={{ color: D, opacity: 0.3 }}>{s.timing}</p>
                  </div>
                  <p className="text-[12px] mt-1" style={{ color: D, opacity: 0.5, ...AR }}>{s.ex}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ══════════ 15 — 30-DAY CALENDAR ══════════ */}
      {(() => {
        const allDays = calendarWeeks.flatMap((w) => w.days);
        const types = ["All", ...Array.from(new Set(allDays.map((d) => d.type)))];
        const typeCounts = types.slice(1).reduce<Record<string,number>>((acc,t) => { acc[t]=allDays.filter(d=>d.type===t).length; return acc; }, {});
        const visibleCount = calFilter==="All" ? 30 : allDays.filter(d=>d.type===calFilter).length;
        return (
          <section id="s15" style={{ padding:"100px 24px", background:"#fff" }}>
            <div className="max-w-5xl mx-auto">
              <SH n="15" title="30-Day Content" accent="Calendar" />

              {/* Filter tabs — clean pill style */}
              <div className="flex flex-wrap gap-2 mb-8">
                {types.map((type) => {
                  const active = calFilter===type;
                  const color = type==="All" ? D : typeColors[type];
                  const count = type==="All" ? 30 : typeCounts[type];
                  return (
                    <button key={type} onClick={()=>setCalFilter(type)}
                      className="cursor-pointer border-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-[12px] font-bold"
                      style={{
                        background: active ? color : "#fff",
                        color: active ? "#fff" : D,
                        border: `1.5px solid ${active ? color : "#E0E0E0"}`,
                        transition: "all 180ms",
                      }}>
                      {type}
                      <span className="rounded-full px-1.5 py-0.5 text-[10px] font-bold"
                        style={{ background: active ? "rgba(255,255,255,0.2)" : `${color}15`, color: active ? "#fff" : color }}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Info tags */}
              <div className="flex flex-wrap items-center gap-3 mb-10">
                {(["tiktok","instagram","snapchat"] as const).map(p=><PIcon key={p} p={p} size={13}/>)}
                <span className="text-[12px]" style={{ color:D }}>TikTok · Instagram · Snapchat</span>
                <span className="w-1 h-1 rounded-full inline-block" style={{ background:D, opacity:0.2 }}/>
                <span className="text-[12px]" style={{ color:D }}>Arabic · Saudi tone</span>
                <span className="w-1 h-1 rounded-full inline-block" style={{ background:D, opacity:0.2 }}/>
                <span className="text-[12px] font-bold" style={{ color:G }}>
                  {calFilter==="All" ? "30 posts total" : `${visibleCount} posts filtered`}
                </span>
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-10">
                {allDays.map((day) => {
                  const isVis = calFilter==="All" || day.type===calFilter;
                  const color = typeColors[day.type];
                  const plats = typePlatforms[day.type] ?? [];
                  const isHov = calHovered===day.day;
                  return (
                    <div key={day.day}
                      onMouseEnter={()=>setCalHovered(day.day)}
                      onMouseLeave={()=>setCalHovered(null)}
                      className="rounded-[16px] overflow-hidden"
                      style={{
                        border: `1.5px solid ${isVis ? color : "#EBEBEB"}`,
                        opacity: isVis ? 1 : 0.15,
                        transform: isHov && isVis ? "translateY(-4px)" : "none",
                        transition: "all 200ms",
                        cursor: "default",
                      }}>
                      {/* Header */}
                      <div className="px-3 py-2.5 flex items-center justify-between gap-1"
                        style={{ background: "#fff", borderBottom: `1px solid ${isVis?color:"#EBEBEB"}20` }}>
                        <span className="heading flex-shrink-0" style={{ fontSize: 15, color: D }}>{String(day.day).padStart(2,"0")}</span>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full truncate"
                          style={{ background: color, color: "#fff" }}>
                          {day.type}
                        </span>
                      </div>
                      {/* Body */}
                      <div className="p-3 bg-white">
                        {day.live && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full mb-2" style={{ background: G, color: "#fff" }}>
                            <span className="rounded-full" style={{ width: 5, height: 5, background: "#fff" }} /> LIVE
                          </span>
                        )}
                        <p className="text-[12px] font-bold mb-2 leading-snug" style={{ color: D }}>{day.title}</p>
                        <p className="text-[11px] leading-snug mb-3" style={{ color: D, ...AR }}>{day.ar}</p>
                        {/* Platform icons */}
                        <div className="flex items-center gap-1">
                          {plats.map(p => <PIcon key={p} p={p} size={10}/>)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Caption formula */}
              <div className="rounded-[20px] p-6" style={{ background: LG, border:"1px solid #E8E8E8" }}>
                <p className="heading text-base mb-4" style={{ color: G }}>Caption Formula — Use Every Post</p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { step:"Hook",     ex:"لا تفوت العرض 🔥",                         color:G },
                    { step:"Value",    ex:"سيارة اقتصادية + تصميم عصري",              color:G  },
                    { step:"CTA",      ex:"📲 تواصل معنا الآن · 📍 زورونا في جدة",   color:D  },
                    { step:"Hashtags", ex:"#Soueast #جدة #سيارات #عروض_السيارات",     color:G },
                  ].map((s)=>(
                    <div key={s.step} className="rounded-[12px] p-4" style={{ background:"#fff", border:`1px solid ${s.color}20` }}>
                      <p className="text-[10px] font-bold mb-2" style={{ color:s.color }}>{s.step}</p>
                      <p className="text-[13px] leading-relaxed" style={{ color:D, ...AR }}>{s.ex}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* ══════════ CLOSING ══════════ */}
      <section className="sm-slide opacity-0" style={{ padding:"80px 24px 60px", background:LG }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="rounded-[24px] p-10 md:p-12" style={{ background:"#fff", border:"1px solid #E8E8E8" }}>
            <img src="/motionmotors/soueast.png" alt="Soueast" className="h-14 mx-auto mb-5 object-contain" />
            <h3 className="heading text-2xl mb-3" style={{ color:D }}>Ready to execute.</h3>
            <p className="text-[14px] mb-7 max-w-md mx-auto leading-relaxed" style={{ color:D, opacity: 0.55 }}>
              15 sections. All 8 SOUEAST mandatory steps covered — team structure, approval process, reporting deadlines, a 30-day launch roadmap, and the full content calendar.
            </p>
            <div className="w-full h-px mb-6" style={{ background:"#F0F0F0" }} />
            <p className="text-[11px] font-bold mb-3" style={{ color:G }}>Presented to Mr. Edgard Tabet · Group Managing Director</p>
            <div className="text-center">
              <p className="text-[14px] font-bold" style={{ color:D }}>Ahmed Ali</p>
              <p className="text-[12px]" style={{ color:G }}>Head of Digital Product & Growth</p>
              <p className="text-[11px] mt-0.5" style={{ color:D, opacity: 0.3 }}>ahmed.ali@emotiongrp.com</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-7">
              <a href="https://wa.me/201011648156" target="_blank" rel="noopener"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold"
                style={{ background:G, color:"#fff", border:`1.5px solid ${G}`, textDecoration:"none" }}>
                <FaWhatsapp size={14} /> WhatsApp
              </a>
              <a href="mailto:ahmed.ali@emotiongrp.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold"
                style={{ background:"#fff", color:D, border:`1.5px solid #E8E8E8`, textDecoration:"none" }}>
                <Send size={14} /> Email
              </a>
            </div>
          </div>
          <p className="text-[11px] mt-6" style={{ color:D, opacity: 0.15 }}>
            &copy; 2026 Motion Motors × Soueast · New Media Execution Plan · Jeddah & Western Region · Internal
          </p>
        </div>
      </section>
    </div>
  );
}

/* ── Section Header ── */
function SH({ n, title, accent }: { n: string; title: string; accent: string }) {
  return (
    <div className="text-center mb-14">
      <p className="heading text-lg mb-3" style={{ color: "#f58021" }}>Section {n}</p>
      <h2 className="heading text-4xl md:text-5xl mb-4" style={{ color: "#0A0A0A" }}>
        {title} <span style={{ color: "#f58021" }}>{accent}</span>
      </h2>
    </div>
  );
}

/* ═══════════ SIDE NAV + ONBOARDING ═══════════ */

const NAV_ITEMS: { id: string; label: string; tourDesc: string }[] = [
  { id: "s01", label: "Platform Strategy",   tourDesc: "Where we show up — TikTok, Instagram, Snapchat, YouTube — and the role each plays." },
  { id: "s02", label: "Team & Setup",        tourDesc: "Role owners (Layla, Noman, Mashaael & Yahya), accounts, influencers, and the tools needed." },
  { id: "s03", label: "Live Streams",        tourDesc: "8 lives/month — duration, viewer target, format, and the sales-team requirement." },
  { id: "s04", label: "Influencers",         tourDesc: "Local Jeddah KOL strategy — trust over follower count, 2–4 collabs a month." },
  { id: "s05", label: "Lead Generation",     tourDesc: "The funnel: Social → WhatsApp → CRM → Sales, with response-time SLAs." },
  { id: "s06", label: "Account Setup",       tourDesc: "The 5-day checklist to get every official account live and branded." },
  { id: "s07", label: "Approval Process",    tourDesc: "How every campaign gets Soueast sign-off before spend — the reimbursement rule." },
  { id: "s08", label: "KPI Targets",         tourDesc: "Monthly targets and the full tracking table across Months 1, 3 and 6." },
  { id: "s09", label: "Budget & Incentives", tourDesc: "The SAR 9,000 monthly breakdown and what Soueast funds if we execute." },
  { id: "s10", label: "Reporting",           tourDesc: "Daily, weekly and monthly reporting — and why the 10th-of-month deadline matters." },
  { id: "s11", label: "Launch Roadmap",      tourDesc: "The 30-day rollout from July 1 — first shoot, first post, first live, first review." },
  { id: "s12", label: "Weekly Schedule",     tourDesc: "The repeating weekly rhythm once the launch ramp is complete." },
  { id: "s13", label: "Paid Ads",            tourDesc: "How we amplify the best organic videos on Instagram and TikTok." },
  { id: "s14", label: "Communication Pillars", tourDesc: "Motion Motors' 11 content pillars — the framework every post and the whole calendar is built on." },
  { id: "s15", label: "Content Calendar",    tourDesc: "The full 30-day calendar built from the pillars — filter by pillar, see platforms per day." },
];

const DRAG_NOTE = {
  title: "Move this menu anywhere",
  desc: "Drag the header to place this navigator wherever fits your reading — it remembers where you put it.",
};

function SectionNav() {
  const ORANGE = "#f58021";
  const [active, setActive] = useState<string>("s01");
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [tourIdx, setTourIdx] = useState<number | null>(null);
  const [tipPos, setTipPos] = useState<{ x: number; y: number; placement: "left" | "right" } | null>(null);
  const dragOffset = useRef<{ x: number; y: number } | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const NAV_W = 230;
  const TIP_W = 310;
  const TOUR_LEN = NAV_ITEMS.length + 1;

  useEffect(() => {
    let initial: { x: number; y: number } | null = null;
    try { const saved = localStorage.getItem("sm-nav-pos"); if (saved) initial = JSON.parse(saved); } catch {}
    if (!initial) {
      const h = navRef.current?.offsetHeight ?? 520;
      initial = { x: window.innerWidth - NAV_W - 16, y: Math.max(16, window.innerHeight / 2 - h / 2) };
    }
    const h = navRef.current?.offsetHeight ?? 520;
    initial.x = Math.max(8, Math.min(window.innerWidth - NAV_W - 8, initial.x));
    initial.y = Math.max(8, Math.min(window.innerHeight - h - 8, initial.y));
    setPos(initial);
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[id^='s']");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting && /^s\d\d$/.test(e.target.id)) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    items.forEach((el) => { if (/^s\d\d$/.test(el.id)) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let done = false;
    try { done = localStorage.getItem("sm-tour-done") === "1"; } catch {}
    if (done) return;
    const t = setTimeout(() => setTourIdx(0), 1000);
    return () => clearTimeout(t);
  }, []);

  const finishTour = () => { setTourIdx(null); try { localStorage.setItem("sm-tour-done", "1"); } catch {} };
  const nextTour = () => { if (tourIdx === null) return; if (tourIdx >= TOUR_LEN - 1) finishTour(); else setTourIdx(tourIdx + 1); };

  useEffect(() => {
    if (tourIdx === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") finishTour(); else if (e.key === "ArrowRight" || e.key === "Enter") nextTour(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tourIdx]);

  useEffect(() => {
    if (tourIdx === null || !navRef.current) { setTipPos(null); return; }
    const compute = () => {
      const isDrag = tourIdx === NAV_ITEMS.length;
      const target = isDrag
        ? navRef.current?.querySelector<HTMLElement>("[data-drag-handle]")
        : navRef.current?.querySelector<HTMLElement>(`[data-nav-item="${NAV_ITEMS[tourIdx].id}"]`);
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const placeRight = rect.left < TIP_W + 32;
      const x = placeRight ? rect.right + 16 : rect.left - TIP_W - 16;
      const y = rect.top + rect.height / 2;
      setTipPos({ x, y, placement: placeRight ? "right" : "left" });
    };
    const raf = requestAnimationFrame(compute);
    window.addEventListener("resize", compute);
    window.addEventListener("scroll", compute, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", compute); window.removeEventListener("scroll", compute); };
  }, [tourIdx, pos]);

  const tourHighlightId = tourIdx !== null && tourIdx < NAV_ITEMS.length ? NAV_ITEMS[tourIdx].id : null;
  const isDragStep = tourIdx !== null && tourIdx === NAV_ITEMS.length;
  const tourTitle = isDragStep ? DRAG_NOTE.title : tourIdx !== null ? NAV_ITEMS[tourIdx].label : "";
  const tourDesc  = isDragStep ? DRAG_NOTE.desc  : tourIdx !== null ? NAV_ITEMS[tourIdx].tourDesc : "";

  const handleClick = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pos) return;
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    document.body.style.userSelect = "none";
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragOffset.current || !navRef.current) return;
    const h = navRef.current.offsetHeight;
    setPos({
      x: Math.max(8, Math.min(window.innerWidth - NAV_W - 8, e.clientX - dragOffset.current.x)),
      y: Math.max(8, Math.min(window.innerHeight - h - 8, e.clientY - dragOffset.current.y)),
    });
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragOffset.current) return;
    dragOffset.current = null;
    setDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
    document.body.style.userSelect = "";
    if (pos) { try { localStorage.setItem("sm-nav-pos", JSON.stringify(pos)); } catch {} }
  };

  return (
    <>
      <aside
        ref={navRef}
        aria-label="Section navigation"
        className="fixed z-[65] hidden xl:flex flex-col rounded-[18px] overflow-hidden"
        style={{
          width: NAV_W, left: pos?.x, top: pos?.y, visibility: pos ? "visible" : "hidden",
          background: "rgba(255,255,255,0.97)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          border: `1px solid ${ORANGE}30`,
          boxShadow: dragging ? "0 18px 50px rgba(245,128,33,0.22)" : "0 12px 40px rgba(0,0,0,0.08)",
          transition: dragging ? "none" : "box-shadow 250ms ease",
        }}
      >
        <div
          data-drag-handle
          onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}
          className="px-4 pt-4 pb-3 flex flex-col gap-2 select-none"
          style={{ borderBottom: `1px solid ${ORANGE}20`, cursor: dragging ? "grabbing" : "grab", touchAction: "none", background: ORANGE }}
        >
          <div className="flex items-center justify-center">
            <img src="/motionmotors/soueast.png" alt="Soueast" className="object-contain pointer-events-none" style={{ height: 30, maxWidth: 150, width: "auto", filter: "brightness(0) invert(1)" }} draggable={false} />
          </div>
          <div className="flex items-center justify-center gap-1 pt-1" style={{ opacity: 0.6 }}>
            {[0,1,2,3,4].map((i) => <span key={i} className="block rounded-full" style={{ width: 3, height: 3, background: "#fff" }} />)}
          </div>
        </div>

        <div className="p-1.5 flex flex-col gap-0.5 overflow-y-auto" style={{ maxHeight: "60vh" }}>
          {NAV_ITEMS.map((item, i) => {
            const isActive = active === item.id;
            const isTour = tourHighlightId === item.id;
            const show = isActive || isTour;
            return (
              <button
                key={item.id} data-nav-item={item.id} onClick={() => handleClick(item.id)}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-[10px] text-left cursor-pointer border-0 relative"
                style={{
                  background: isTour ? `${ORANGE}25` : isActive ? `${ORANGE}15` : "transparent",
                  transition: "background 300ms",
                  boxShadow: isTour ? `0 0 0 2px ${ORANGE}` : "none",
                }}
                onMouseEnter={(e) => { if (!show) e.currentTarget.style.background = `${ORANGE}0A`; }}
                onMouseLeave={(e) => { if (!show) e.currentTarget.style.background = "transparent"; }}
              >
                <span className="block rounded-full flex-shrink-0" style={{ width: show ? 8 : 5, height: show ? 8 : 5, background: ORANGE, opacity: show ? 1 : 0.5, transition: "all 300ms" }} />
                <span className="heading text-[11.5px] flex-shrink-0" style={{ color: "#0A0A0A", opacity: show ? 1 : 0.4, width: 16, fontVariantNumeric: "tabular-nums" }}>{String(i + 1).padStart(2, "0")}</span>
                <span className="heading text-[11.5px] truncate flex-1" style={{ color: "#0A0A0A", opacity: show ? 1 : 0.6 }}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {tourIdx !== null && (
        <div className="hidden xl:block fixed inset-0 z-[55]" style={{ background: "rgba(10,10,10,0.45)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }} aria-hidden />
      )}

      {tourIdx !== null && tipPos && (
        <div
          className="hidden xl:flex fixed z-[70] flex-col rounded-[18px] overflow-hidden"
          style={{
            width: TIP_W, left: tipPos.x, top: tipPos.y, transform: "translateY(-50%)",
            background: "#fff", border: `1px solid ${ORANGE}30`, boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
            transition: "left 380ms cubic-bezier(0.4,0,0.2,1), top 380ms cubic-bezier(0.4,0,0.2,1)",
          }}
          role="dialog" aria-label="Onboarding"
        >
          <div className="h-1 w-full" style={{ background: `${ORANGE}1A` }}>
            <div className="h-full" style={{ width: `${((tourIdx + 1) / TOUR_LEN) * 100}%`, background: ORANGE, transition: "width 380ms" }} />
          </div>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="block w-2.5 h-2.5 rounded-full" style={{ background: ORANGE }} />
              <span className="heading text-[10px]" style={{ color: "#0A0A0A", opacity: 0.5 }}>
                {isDragStep ? "Pro tip" : `Step ${String(tourIdx + 1).padStart(2, "0")} of ${String(TOUR_LEN).padStart(2, "0")}`}
              </span>
            </div>
            <h3 className="heading text-lg mb-1.5" style={{ color: "#0A0A0A", lineHeight: 1.2 }}>{tourTitle}</h3>
            <p className="text-[12.5px] leading-relaxed mb-4" style={{ color: "#0A0A0A", opacity: 0.7 }}>{tourDesc}</p>
            <div className="flex items-center gap-2">
              <button onClick={finishTour} className="px-4 py-2.5 rounded-full heading text-[12px] cursor-pointer border-0" style={{ background: "transparent", color: "#0A0A0A", opacity: 0.5 }}>Skip</button>
              <button onClick={nextTour} className="flex-1 py-2.5 rounded-full heading text-[12px] cursor-pointer border-0" style={{ background: ORANGE, color: "#fff" }}>
                {tourIdx >= TOUR_LEN - 1 ? "Got it" : "Next →"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

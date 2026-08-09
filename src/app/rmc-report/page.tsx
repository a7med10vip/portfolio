"use client";

/* eslint-disable @next/next/no-img-element, @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ScatterChart, Scatter, ZAxis, LabelList, Legend,
} from "recharts";
import {
  TrendingUp, MessageCircle, Users, Eye,
  Wallet, Target, Search, Award, Download, Mail,
  AlertTriangle, CheckCircle2, ArrowUpRight, Globe, Stethoscope,
  BarChart3, Flame, Sparkles, Linkedin, ArrowUp, ArrowLeft,
} from "lucide-react";
import ArabicTailProcessor from "@/components/ArabicTailProcessor";

/* ═══════════ PALETTE ═══════════ */
const G = "#30c280";   // brand green
const D = "#0A0A0A";   // deep dark
const META = "#0866FF";
const TT = "#111827";
const TT_A = "#FE2C55";
const SNAP = "#E5A800"; // snap yellow, darkened for legibility on white
const A = "#F59E0B";    // amber
const P = "#8B5CF6";    // purple
const R = "#EF4444";    // red
const INK = "rgba(0,0,0,0.62)";
const FAINT = "rgba(0,0,0,0.4)";

const SAR = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });

/* ═══════════ COUNT-UP ═══════════ */
function useCountUp(target: number, dur = 1.6) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (dur * 1000), 1);
      const e = 1 - Math.pow(1 - p, 3);
      setV(target * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, dur]);
  return { ref, v };
}

function Counter({ value, decimals = 0, prefix = "", suffix = "" }: { value: number; decimals?: number; prefix?: string; suffix?: string }) {
  const { ref, v } = useCountUp(value);
  return (
    <span ref={ref}>
      {prefix}
      {v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

/* ═══════════ REVEAL WRAPPER ═══════════ */
function Reveal({ children, delay = 0, className = "", id }: { children: React.ReactNode; delay?: number; className?: string; id?: string }) {
  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHead({ eyebrow, children, color = G, subtitle }: { eyebrow: string; children: React.ReactNode; color?: string; subtitle?: string }) {
  return (
    <div className="text-center mb-12">
      <p className="ar-body text-sm font-bold tracking-[3px] mb-3" style={{ color }}>{eyebrow}</p>
      <h2 className="ar-heading text-4xl md:text-5xl mb-4" style={{ color: D }}>{children}</h2>
      {subtitle && <p className="text-sm max-w-2xl mx-auto ar-body leading-relaxed" style={{ color: FAINT }}>{subtitle}</p>}
    </div>
  );
}

const card: React.CSSProperties = { background: "#fff", border: "1px solid #ECECEC", borderRadius: 22 };
const cardPop = (c: string): React.CSSProperties => ({ background: "#fff", border: `2px solid ${c}`, borderRadius: 22, boxShadow: `4px 4px 0px 0px ${D}` });

/* ═══════════ DATA ═══════════ */
const TOTAL_SPEND = 7709;
const TOTAL_IMPR = 928982;
const TOTAL_REACH = 276503;
const TOTAL_CONV = 394;     // Meta messaging conversations
const TOTAL_LEADS = 130;    // form leads (TikTok + Snap)
const UNIQUE_LEADS = 127;

const spendSplit = [
  { name: "Meta", value: 4081.85, color: META },
  { name: "Snap", value: 2621.93, color: SNAP },
  { name: "TikTok", value: 1005.28, color: TT },
];

const costPerResult = [
  { name: "Meta — محادثة", value: 10.36, color: META, type: "محادثة واتساب" },
  { name: "TikTok — ليد", value: 14.78, color: TT_A, type: "ليد فورم" },
  { name: "Snap — ليد (عيد)", value: 37.09, color: SNAP, type: "ليد فورم" },
  { name: "Snap — ليد (أسنان)", value: 69.99, color: A, type: "ليد فورم" },
];

const leadQuality = [
  { name: "أرقام فريدة صحيحة", value: 127, color: G },
  { name: "مكرّرة", value: 2, color: A },
  { name: "غير صالحة", value: 1, color: R },
];

const timeline = [
  { plat: "Snap", logo: "/logos/snapchat.svg", color: SNAP, start: 0, dur: 16, label: "٢٠ مايو – ٤ يونيو", spend: 2621.93, out: "62 ليد" },
  { plat: "TikTok", logo: "/logos/tiktok.svg", color: TT, start: 16, dur: 7, label: "٥ – ١١ يونيو", spend: 1005.28, out: "68 ليد" },
  { plat: "Meta", logo: "/logos/meta.svg", color: META, start: 14, dur: 18, label: "٣ – ٢٠ يونيو", spend: 4081.85, out: "394 محادثة" },
];
const TL_DAYS = 32; // 20 May -> 20 Jun

/* SEO */
const SEO_CLICKS = 3530, SEO_IMPR = 252000, SEO_CTR = 1.4, SEO_POS = 7.1;
const topPages = [
  { p: "العيادات", c: 542, g: 62 },
  { p: "علاج طبيعي مكة", c: 286, g: 60 },
  { p: "الأطباء", c: 275, g: 22 },
  { p: "NAD+ نيكوتيناميد", c: 240, g: 2 },
  { p: "قسم الأشعة", c: 223, g: 23 },
];
const topQueries = [
  { q: "مجمع الرقي العام الطبي", c: 142 },
  { q: "المجمع الطبي الراقي العام", c: 57 },
  { q: "مجمع الراقي الطبي", c: 41 },
  { q: "nad", c: 29 },
  { q: "مجمع الطب الراقي", c: 28 },
  { q: "دكتور علاء عرفة", c: 28 },
  { q: "علاج طبيعي مكة", c: 26 },
  { q: "افضل دكتور باطنية في مكة", c: 23 },
  { q: "دكتورة احلام الصومعي", c: 20 },
];
const seoScatter = [
  { q: "مجمع الرقي العام الطبي", imp: 1185, clk: 142, kind: "براند" },
  { q: "المجمع الطبي الراقي العام", imp: 1079, clk: 57, kind: "براند" },
  { q: "مجمع الطب الراقي", imp: 1508, clk: 28, kind: "براند" },
  { q: "مجمع الراقي الطبي", imp: 623, clk: 41, kind: "براند" },
  { q: "افضل دكتور باطنية في مكة", imp: 671, clk: 23, kind: "خدمة" },
  { q: "علاج طبيعي مكة", imp: 725, clk: 26, kind: "خدمة" },
  { q: "افضل دكتورة نساء وولادة في مكة", imp: 686, clk: 8, kind: "خدمة" },
  { q: "حجامة مكة", imp: 526, clk: 3, kind: "خدمة" },
  { q: "nad", imp: 9620, clk: 29, kind: "جلوتاثيون" },
  { q: "فوائد الجلوتاثيون", imp: 721, clk: 1, kind: "جلوتاثيون" },
  { q: "ما هو الجلوتاثيون", imp: 697, clk: 1, kind: "جلوتاثيون" },
  { q: "فوائد nad للبشرة", imp: 634, clk: 2, kind: "جلوتاثيون" },
  { q: "ابر الجلوتاثيون", imp: 620, clk: 1, kind: "جلوتاثيون" },
  { q: "الجلوتاثيون الطبيعي", imp: 609, clk: 0, kind: "جلوتاثيون" },
  { q: "nad حبوب", imp: 601, clk: 0, kind: "جلوتاثيون" },
  { q: "ناد", imp: 573, clk: 0, kind: "جلوتاثيون" },
  { q: "ابرة الجلوتاثيون", imp: 530, clk: 1, kind: "جلوتاثيون" },
  { q: "فيتامين nad", imp: 524, clk: 0, kind: "جلوتاثيون" },
];
const seoKindColor: Record<string, string> = { "براند": G, "خدمة": META, "جلوتاثيون": R };

const trending = [
  { q: "دكتورة أحلام الصومعي", g: 1650 },
  { q: "مجمع الطبي الراقي — الخالدية", g: 290 },
  { q: "أفضل دكتور باطنية في مكة", g: 214 },
  { q: "علاج طبيعي مكة", g: 43 },
  { q: "مجمع الرقي العام الطبي", g: 15 },
];
const countries = [
  { name: "السعودية", value: 90, color: G },
  { name: "سوريا", value: 3, color: META },
  { name: "مصر", value: 2, color: A },
  { name: "أخرى", value: 5, color: "#CBD5E1" },
];

const allQueries: { q: string; c: number; i: number }[] = [
  { q: "مجمع الرقي العام الطبي", c: 142, i: 1185 },
  { q: "المجمع الطبي الراقي العام", c: 57, i: 1079 },
  { q: "مجمع الراقي الطبي", c: 41, i: 623 },
  { q: "nad", c: 29, i: 9620 },
  { q: "مجمع الطب الراقي", c: 28, i: 1508 },
  { q: "دكتور علاء عرفة", c: 28, i: 125 },
  { q: "علاج طبيعي مكة", c: 26, i: 725 },
  { q: "الدكتور علاء عرفة", c: 26, i: 138 },
  { q: "افضل دكتور باطنية في مكة", c: 23, i: 671 },
  { q: "دكتورة احلام الصومعي", c: 20, i: 74 },
  { q: "افضل دكتورة نساء وولادة في مكة", c: 8, i: 686 },
  { q: "ابر الجلوتاثيون من الصيدلية", c: 4, i: 438 },
  { q: "مركز علاج طبيعي", c: 4, i: 404 },
  { q: "الطب الراقي", c: 4, i: 391 },
  { q: "حجامة مكة", c: 3, i: 526 },
  { q: "ابر جلوتاثيون", c: 3, i: 446 },
  { q: "فوائد nad للبشرة", c: 2, i: 634 },
  { q: "أين يوجد فيتامين nad", c: 2, i: 507 },
  { q: "فوائد nad", c: 2, i: 459 },
  { q: "مركز تحسن للعلاج الطبيعي", c: 2, i: 377 },
  { q: "فوائد الجلوتاثيون", c: 1, i: 721 },
  { q: "ما هو الجلوتاثيون", c: 1, i: 697 },
  { q: "ابر الجلوتاثيون", c: 1, i: 620 },
  { q: "ابرة الجلوتاثيون", c: 1, i: 530 },
  { q: "nad+ ما هو", c: 1, i: 508 },
  { q: "الطب المنزلي", c: 1, i: 438 },
  { q: "ابرة جلوتاثيون", c: 1, i: 405 },
  { q: "الرقي", c: 0, i: 641 },
  { q: "الجلوتاثيون الطبيعي", c: 0, i: 609 },
  { q: "nad حبوب", c: 0, i: 601 },
  { q: "ناد", c: 0, i: 573 },
  { q: "فيتامين nad", c: 0, i: 524 },
  { q: "رأفت", c: 0, i: 522 },
  { q: "nad plus ما هو", c: 0, i: 470 },
  { q: "جلوتاثيون للبشره", c: 0, i: 426 },
  { q: "غلوتاثيون", c: 0, i: 422 },
  { q: "الجلوتاثيون للبشرة", c: 0, i: 382 },
];

const invoices = [
  { plat: "Meta", logo: "/logos/meta.svg", color: META, count: 26, href: "/rmc/invoices/meta-invoices.zip", size: "9.2MB", type: "ZIP" },
  { plat: "Snap", logo: "/logos/snapchat.svg", color: SNAP, count: 1, href: "/rmc/invoices/snap-invoices.pdf", size: "545KB", type: "PDF" },
  { plat: "TikTok", logo: "/logos/tiktok.svg", color: TT, count: 23, href: "/rmc/invoices/tiktok-invoices.zip", size: "2.0MB", type: "ZIP" },
];

const NAV = [
  { id: "summary", label: "الملخص", sum: "أبرز نتائج الحملة المدفوعة والظهور العضوي في لمحة سريعة." },
  { id: "ads", label: "الإعلانات", sum: "توزيع الإنفاق على المنصات الثلاث وكفاءة كل قناة والجدول الزمني." },
  { id: "platforms", label: "المنصات", sum: "تفصيل أداء Snap و TikTok و Meta بأرقامها الفعلية من لوحات الإعلانات." },
  { id: "leads", label: "العملاء المحتملون", sum: "عدد العملاء المحتملين وجودتهم ومصدرهم، مع ملفات السجلات للتحميل." },
  { id: "seo", label: "الظهور العضوي", sum: "نمو الموقع في نتائج Google خلال آخر ٣٠ يوماً والخطوة القادمة في الذكاء الاصطناعي." },
  { id: "insights", label: "الخلاصة", sum: "الاستنتاجات والتوصيات القابلة للتطبيق في الجولة القادمة." },
  { id: "invoices", label: "الفواتير", sum: "فواتير الإنفاق الإعلاني الرسمية من كل منصة للتحميل المباشر." },
];

/* ═══════════ TOOLTIP ═══════════ */
function ChartTip({ active, payload, label, fmt }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-3 py-2 ar-body" style={{ background: D, color: "#fff", fontSize: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}>
      {label && <p className="font-bold mb-1">{label}</p>}
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color || "#fff" }}>{p.name}: {fmt ? fmt(p.value) : SAR(p.value)}</p>
      ))}
    </div>
  );
}

export default function RMCReport() {
  const [active, setActive] = useState("summary");
  const [prog, setProg] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setProg((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100);
      let cur = NAV[0].id;
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top < 180) cur = n.id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      setActive(id);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <ArabicTailProcessor>
    <main className="ar-rtl" style={{ background: "#fff", color: D, fontFamily: "'Ahmed Sans', sans-serif" }}>
      <style>{`
        .recharts-wrapper, .recharts-wrapper svg { direction: ltr; }
        .recharts-cartesian-axis-tick text, .recharts-label-list text { unicode-bidi: plaintext; }
        section[id], footer[id] { scroll-margin-top: 90px; }
        @media (min-width: 1024px) { section[id], footer[id] { scroll-margin-top: 24px; } }
      `}</style>
      {/* progress bar */}
      <div style={{ position: "fixed", top: 0, right: 0, left: 0, height: 3, zIndex: 60, background: "transparent" }}>
        <div style={{ height: "100%", width: `${prog}%`, background: G, transition: "width 0.1s" }} />
      </div>

      {/* side menu — desktop */}
      <nav className="hidden lg:block" style={{ position: "fixed", top: "50%", right: 20, transform: "translateY(-50%)", zIndex: 50, width: 218 }}>
        <div style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(14px)", border: "1px solid #ECECEC", borderRadius: 20, padding: 14, boxShadow: "0 16px 50px -18px rgba(0,0,0,0.18)" }}>
          <div className="flex items-center gap-2 mb-3 pb-3" style={{ borderBottom: "1px solid #F2F2F2" }}>
            <img src="/logos/rmc.png" alt="RMC" style={{ height: 30, width: "auto" }} onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
            <div>
              <p className="ar-heading text-[12px] leading-tight" style={{ color: D }}>مجمع الرقي العام</p>
              <p className="ar-body text-[9px]" style={{ color: FAINT }}>تقرير الأداء</p>
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            {NAV.map((n, i) => (
              <a key={n.id} href={`#${n.id}`} onClick={(e) => go(e, n.id)} className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-colors" style={{ background: active === n.id ? `${G}12` : "transparent" }}>
                <span className="ar-body text-[10px] tabular-nums" style={{ color: active === n.id ? G : "#C4C4C4", width: 14 }}>{`٠${i + 1}`}</span>
                <span style={{ width: 6, height: 6, borderRadius: 100, background: active === n.id ? G : "#D4D4D4", flexShrink: 0, transition: "background .3s" }} />
                <span className="ar-body text-[12px]" style={{ color: active === n.id ? D : INK, fontWeight: active === n.id ? 700 : 500 }}>{n.label}</span>
              </a>
            ))}
          </div>
          <div className="mt-3 pt-3" style={{ borderTop: "1px solid #F2F2F2" }}>
            <p className="ar-body text-[10.5px] leading-relaxed" style={{ color: FAINT }}>{NAV.find((n) => n.id === active)?.sum}</p>
          </div>
        </div>
      </nav>

      {/* top bar — mobile */}
      <nav className="lg:hidden" style={{ position: "fixed", top: 0, right: 0, left: 0, zIndex: 50, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(14px)", borderBottom: "1px solid #F0F0F0" }}>
        <div className="px-4 h-14 flex items-center gap-2">
          <img src="/logos/rmc.png" alt="RMC" style={{ height: 24, width: "auto" }} onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
          <span className="ar-heading text-[13px]" style={{ color: D }}>تقرير أداء مجمع الرقي</span>
        </div>
        <div className="flex gap-1 overflow-x-auto px-4 pb-2" style={{ scrollbarWidth: "none" }}>
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={(e) => go(e, n.id)} className="ar-body text-[11px] px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0" style={{ color: active === n.id ? "#fff" : INK, background: active === n.id ? D : "#F2F2F2", fontWeight: active === n.id ? 700 : 500 }}>
              {n.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="relative px-5 pt-32 pb-20 md:pt-40 md:pb-28" style={{ background: "linear-gradient(180deg,#FAFBFA 0%,#fff 100%)" }}>
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <img src="/logos/rmc.png" alt="مجمع الرقي العام" className="mx-auto mb-7" style={{ height: 72, width: "auto" }} onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full ar-body text-[12px] font-bold mb-6" style={{ background: `${G}12`, color: G }}>
              <BarChart3 size={14} /> تقرير أداء الحملات والظهور الرقمي
            </span>
            <h1 className="ar-heading mb-5" style={{ fontSize: "clamp(34px,7vw,68px)", lineHeight: 1.1, color: D }}>
              تقرير الحملات الإعلانية<br />والظهور في محركات البحث
            </h1>
            <p className="ar-body max-w-2xl mx-auto mb-8 leading-relaxed" style={{ color: INK, fontSize: 15 }}>
              قراءة كاملة لأداء حملات مجمع الرقي العام الطبي بمكة المكرمة عبر <strong style={{ color: SNAP }}>Snap</strong> و <strong style={{ color: TT_A }}>TikTok</strong> و <strong style={{ color: META }}>Meta</strong>، إضافةً إلى نمو الظهور العضوي للموقع — من ٢٠ مايو حتى ٢٠ يونيو ٢٠٢٦.
            </p>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full ar-body text-[13px]" style={{ border: "1px solid #ECECEC", color: INK }}>
              <span style={{ color: FAINT }}>الفترة</span>
              <span className="ar-heading" style={{ color: D }}>٢٠ مايو</span>
              <span style={{ width: 28, height: 1, background: "#DDD" }} />
              <span className="ar-heading" style={{ color: D }}>٢٠ يونيو ٢٠٢٦</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold" style={{ background: `${A}15`, color: A }}>~٣٠ يوم</span>
            </div>
          </motion.div>

          {/* hero KPI grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12">
            {[
              { icon: Wallet, label: "إجمالي الإنفاق الإعلاني", val: <><Counter value={TOTAL_SPEND} /> <span style={{ fontSize: "0.5em", color: FAINT }}>ر.س</span></>, c: G },
              { icon: MessageCircle, label: "محادثة + عميل محتمل", val: <Counter value={TOTAL_CONV + TOTAL_LEADS} />, c: META },
              { icon: Eye, label: "إجمالي مرات الظهور", val: <Counter value={TOTAL_IMPR} />, c: P },
              { icon: Users, label: "إجمالي الوصول (Meta)", val: <Counter value={TOTAL_REACH} />, c: A },
            ].map((k, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }} style={card} className="p-5 text-right">
                <k.icon size={18} color={k.c} />
                <p className="ar-heading mt-3" style={{ fontSize: 30, color: D, lineHeight: 1 }}>{k.val}</p>
                <p className="ar-body text-[11px] mt-2" style={{ color: FAINT }}>{k.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 1. EXECUTIVE SUMMARY ═══ */}
      <section id="summary" className="px-5 py-24" style={{ background: "#FAFAFA" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal><SectionHead eyebrow="٠١ · الملخص التنفيذي" subtitle="نظرة سريعة على أبرز نتائج الحملة المدفوعة والظهور العضوي خلال الفترة.">أبرز <span style={{ color: G }}>النتائج</span></SectionHead></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Target, t: "524 فرصة تواصل", d: "إجمالي 394 محادثة واتساب عبر Meta و130 عميلاً محتملاً عبر نماذج Snap و TikTok خلال الحملة.", c: G },
              { icon: Wallet, t: "10.4 ر.س لكل محادثة", d: "متوسط تكلفة المحادثة عبر Meta — القناة الأعلى كفاءة في التواصل المباشر مع العملاء.", c: META },
              { icon: Award, t: "العروض الأقوى أداءً", d: "تصدّرت زراعة الأسنان العملاء المحتملين، تلتها عيادة الذكورة والكشف العام والجلدية (التي خُصّصت لفترة العيد فقط)، ثم تقويم الأسنان. وجاء أرخص عميل محتمل من TikTok بـ 14.78 ر.س.", c: TT_A },
              { icon: Search, t: "+26% نمو النقرات العضوية", d: "ارتفعت زيارات البحث المجاني من Google إلى 3,530 نقرة شهرياً مع نمو 26% والظهور 252 ألفاً.", c: A },
              { icon: Globe, t: "100% جمهور جديد", d: "كل الزيارات العضوية كانت من بحث غير مرتبط بالاسم التجاري — اكتساب مرضى جدد لا يعرفون المجمع مسبقاً.", c: P },
              { icon: AlertTriangle, t: "فرصة متجر المحاليل", d: "كلمات الجلوتاثيون و NAD تجلب آلاف الظهور بنقرات شبه معدومة — تفعيل متجر المحاليل يحوّل هذا الظهور إلى مبيعات وحجوزات.", c: R },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div style={card} className="p-6 h-full">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${s.c}14` }}><s.icon size={20} color={s.c} /></div>
                  <p className="ar-heading text-lg mb-2" style={{ color: D }}>{s.t}</p>
                  <p className="ar-body text-[13px] leading-relaxed" style={{ color: INK }}>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 2. PAID ADS OVERVIEW ═══ */}
      <section id="ads" className="px-5 py-24" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal><SectionHead eyebrow="٠٢ · الإعلانات المدفوعة" color={META} subtitle="توزيع الإنفاق على المنصات الثلاث وكفاءة كل قناة، مع الجدول الزمني المتتابع للحملات.">الإنفاق <span style={{ color: META }}>والكفاءة</span></SectionHead></Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* spend donut */}
            <Reveal>
              <div style={card} className="p-6 h-full">
                <p className="ar-heading text-lg mb-1" style={{ color: D }}>توزيع الإنفاق الإعلاني</p>
                <p className="ar-body text-[12px] mb-3" style={{ color: FAINT }}>إجمالي {SAR(TOTAL_SPEND)} ر.س عبر ثلاث منصات</p>
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie data={spendSplit} dataKey="value" nameKey="name" innerRadius={62} outerRadius={96} paddingAngle={3} stroke="none">
                      {spendSplit.map((s) => <Cell key={s.name} fill={s.color} />)}
                    </Pie>
                    <Tooltip content={<ChartTip fmt={(v: number) => `${SAR(v)} ر.س`} />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-4 mt-2">
                  {spendSplit.map((s) => (
                    <div key={s.name} className="flex items-center gap-2">
                      <span style={{ width: 10, height: 10, borderRadius: 3, background: s.color }} />
                      <span className="ar-body text-[12px]" style={{ color: INK }}>{s.name} · <strong style={{ color: D }}>{SAR(s.value)}</strong></span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* cost per result bar */}
            <Reveal delay={0.08}>
              <div style={card} className="p-6 h-full">
                <p className="ar-heading text-lg mb-1" style={{ color: D }}>التكلفة لكل نتيجة</p>
                <p className="ar-body text-[12px] mb-3" style={{ color: FAINT }}>كلما قلّ العمود كان أفضل (ر.س)</p>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={costPerResult} layout="vertical" margin={{ left: 8, right: 28 }}>
                    <CartesianGrid horizontal={false} stroke="#F2F2F2" />
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 11, fill: INK }} />
                    <Tooltip cursor={{ fill: "#FAFAFA" }} content={<ChartTip fmt={(v: number) => `${v} ر.س`} />} />
                    <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={22}>
                      {costPerResult.map((c) => <Cell key={c.name} fill={c.color} />)}
                      <LabelList dataKey="value" position="right" style={{ fontSize: 11, fontWeight: 700, fill: D }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <p className="ar-body text-[11px] mt-2 leading-relaxed" style={{ color: FAINT }}>* محادثات Meta هدفها بدء محادثة واتساب، بينما Snap و TikTok نماذج عملاء محتملين — اختلاف طبيعي في طبيعة النتيجة.</p>
              </div>
            </Reveal>
          </div>

          {/* timeline gantt */}
          <Reveal delay={0.05}>
            <div style={card} className="p-6">
              <p className="ar-heading text-lg mb-1" style={{ color: D }}>الجدول الزمني للحملات</p>
              <p className="ar-body text-[12px] mb-5" style={{ color: FAINT }}>حملات متتابعة على مدى ~٣٠ يوماً</p>
              <div className="space-y-3">
                {timeline.map((t) => (
                  <div key={t.plat} className="flex items-center gap-3">
                    <div className="w-24 flex items-center gap-2 flex-shrink-0">
                      <span className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#F7F7F7" }}><img src={t.logo} alt={t.plat} style={{ width: 16, height: 16, objectFit: "contain" }} /></span>
                      <span className="ar-body text-[12px] font-bold" style={{ color: D }}>{t.plat}</span>
                    </div>
                    <div className="relative flex-1 h-9 rounded-lg" style={{ background: "#F6F6F6" }}>
                      <motion.div
                        initial={{ width: 0 }} whileInView={{ width: `${(t.dur / TL_DAYS) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.9, ease: "easeOut" }}
                        className="absolute top-0 h-full rounded-lg flex items-center px-3"
                        style={{ right: `${(t.start / TL_DAYS) * 100}%`, background: t.color }}
                      >
                        <span className="ar-body text-[11px] font-bold whitespace-nowrap" style={{ color: t.plat === "Snap" ? D : "#fff" }}>{t.label}</span>
                      </motion.div>
                    </div>
                    <div className="w-28 text-left flex-shrink-0">
                      <span className="ar-body text-[12px] font-bold" style={{ color: D }}>{t.out}</span>
                      <span className="ar-body text-[11px] block" style={{ color: FAINT }}>{SAR(t.spend)} ر.س</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 3. PLATFORM DEEP DIVE ═══ */}
      <section id="platforms" className="px-5 py-24" style={{ background: "#FAFAFA" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal><SectionHead eyebrow="٠٣ · أداء المنصات" color={SNAP} subtitle="تفصيل كل منصة على حدة بأرقامها الفعلية من لوحات الإعلانات.">المنصات <span style={{ color: SNAP }}>بالتفصيل</span></SectionHead></Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Snap */}
            <Reveal>
              <div style={cardPop(SNAP)} className="p-6 h-full">
                <div className="flex items-center gap-2 mb-4"><img src="/logos/snapchat.svg" alt="Snap" style={{ width: 26, height: 26 }} /><span className="ar-heading text-xl" style={{ color: D }}>Snapchat</span></div>
                <p className="ar-body text-[11px] mb-4" style={{ color: FAINT }}>٢٠ مايو – ٤ يونيو · مرحلة الإطلاق</p>
                {[["الإنفاق", "2,621.93 ر.س"], ["مرات الظهور", "139,272"], ["النقرات", "796"], ["العملاء المحتملون", "62 ليد"], ["تكلفة الليد (عيد)", "37.09 ر.س"]].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-2" style={{ borderTop: "1px solid #F2F2F2" }}><span className="ar-body text-[12px]" style={{ color: INK }}>{k}</span><span className="ar-body text-[12px] font-bold" style={{ color: D }}>{v}</span></div>
                ))}
              </div>
            </Reveal>
            {/* TikTok */}
            <Reveal delay={0.07}>
              <div style={cardPop(TT_A)} className="p-6 h-full">
                <div className="flex items-center gap-2 mb-4"><img src="/logos/tiktok.svg" alt="TikTok" style={{ width: 24, height: 24 }} /><span className="ar-heading text-xl" style={{ color: D }}>TikTok</span></div>
                <p className="ar-body text-[11px] mb-4" style={{ color: FAINT }}>٥ – ١١ يونيو · ذروة ما قبل العيد</p>
                {[["الإنفاق", "1,005.28 ر.س"], ["مرات الظهور", "223,188"], ["النقرات", "767"], ["معدل النقر (CTR)", "0.34%"], ["العملاء المحتملون", "68 ليد"], ["تكلفة الليد", "14.78 ر.س"]].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-2" style={{ borderTop: "1px solid #F2F2F2" }}><span className="ar-body text-[12px]" style={{ color: INK }}>{k}</span><span className="ar-body text-[12px] font-bold" style={{ color: D }}>{v}</span></div>
                ))}
                <p className="ar-body text-[11px] mt-3 px-3 py-2 rounded-lg leading-relaxed" style={{ background: `${G}10`, color: G }}>أرخص عميل محتمل في الحملة كلها — كل الليدز من إعلان "زراعة الأسنان".</p>
              </div>
            </Reveal>
            {/* Meta */}
            <Reveal delay={0.14}>
              <div style={cardPop(META)} className="p-6 h-full">
                <div className="flex items-center gap-2 mb-4"><img src="/logos/meta.svg" alt="Meta" style={{ width: 26, height: 26 }} /><span className="ar-heading text-xl" style={{ color: D }}>Meta</span></div>
                <p className="ar-body text-[11px] mb-4" style={{ color: FAINT }}>٣ – ٢٠ يونيو · واتساب + إنستغرام</p>
                {[["الإنفاق", "4,081.85 ر.س"], ["الوصول", "276,503"], ["مرات الظهور", "566,522"], ["المحادثات", "394 محادثة"], ["تكلفة المحادثة", "10.36 ر.س"]].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-2" style={{ borderTop: "1px solid #F2F2F2" }}><span className="ar-body text-[12px]" style={{ color: INK }}>{k}</span><span className="ar-body text-[12px] font-bold" style={{ color: D }}>{v}</span></div>
                ))}
                <p className="ar-body text-[11px] mt-3 px-3 py-2 rounded-lg leading-relaxed" style={{ background: `${META}10`, color: META }}>أوسع وصول وأعلى كفاءة تواصل — كل الحملات عبر واتساب وإنستغرام.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 4. LEADS ═══ */}
      <section id="leads" className="px-5 py-24" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal><SectionHead eyebrow="٠٤ · العملاء المحتملون" color={TT_A} subtitle="تحليل سجلات نماذج العملاء المحتملين من Snap و TikTok — العدد والجودة والمصدر.">سجلّ <span style={{ color: TT_A }}>العملاء المحتملين</span></SectionHead></Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {[
              { label: "إجمالي السجلات", val: 130, c: D },
              { label: "أرقام فريدة صحيحة", val: 127, c: G },
              { label: "سجلات مكرّرة", val: 2, c: A },
              { label: "أرقام غير صالحة", val: 1, c: R },
            ].map((k, i) => (
              <Reveal key={i} delay={i * 0.05}><div style={card} className="p-5 text-center"><p className="ar-heading" style={{ fontSize: 34, color: k.c, lineHeight: 1 }}><Counter value={k.val} /></p><p className="ar-body text-[11px] mt-2" style={{ color: FAINT }}>{k.label}</p></div></Reveal>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* quality donut */}
            <Reveal>
              <div style={card} className="p-6 h-full flex flex-col">
                <p className="ar-heading text-lg mb-1" style={{ color: D }}>جودة السجلات</p>
                <p className="ar-body text-[12px] mb-3" style={{ color: FAINT }}>97.7% من السجلات أرقام سعودية فريدة قابلة للتواصل</p>
                <div className="flex-1 flex items-center">
                  <ResponsiveContainer width="100%" height={210}>
                    <PieChart>
                      <Pie data={leadQuality} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={3} stroke="none">
                        {leadQuality.map((s) => <Cell key={s.name} fill={s.color} />)}
                      </Pie>
                      <Tooltip content={<ChartTip fmt={(v: number) => `${v} سجل`} />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-3 mt-1">
                  {leadQuality.map((s) => <div key={s.name} className="flex items-center gap-1.5"><span style={{ width: 9, height: 9, borderRadius: 3, background: s.color }} /><span className="ar-body text-[11px]" style={{ color: INK }}>{s.name} ({s.value})</span></div>)}
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.05}>
            <div className="mt-4 rounded-2xl p-5" style={{ background: `${G}08`, border: `1px solid ${G}25` }}>
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle2 size={18} color={G} className="flex-shrink-0 mt-0.5" />
                <p className="ar-body text-[13px] leading-relaxed" style={{ color: INK }}>
                  <strong style={{ color: G }}>السجلات الكاملة متاحة للتحميل</strong> — كل ملف يشمل الاسم ورقم الجوال وتاريخ التسجيل لكل عميل محتمل، جاهزة لفريق خدمة العملاء لمتابعة الحجوزات.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { plat: "Snapchat", logo: "/logos/snapchat.svg", href: "/rmc/leads/snap-leads.xlsx", count: 62 },
                  { plat: "TikTok", logo: "/logos/tiktok.svg", href: "/rmc/leads/tiktok-leads.xlsx", count: 68 },
                ].map((f) => (
                  <a key={f.plat} href={f.href} download className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl group" style={{ background: "#fff", border: "1px solid #ECECEC" }}>
                    <span className="flex items-center gap-2.5">
                      <img src={f.logo} alt={f.plat} style={{ width: 22, height: 22, objectFit: "contain" }} />
                      <span className="ar-body text-[13px] font-bold" style={{ color: D }}>عملاء {f.plat}</span>
                      <span className="ar-body text-[11px] px-2 py-0.5 rounded-full" style={{ background: "#F5F5F5", color: FAINT }}>{f.count} سجل · XLSX</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 ar-body text-[12px] font-bold transition-transform group-hover:scale-105" style={{ color: G }}><Download size={14} /> تحميل</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 5. SEO ═══ */}
      <section id="seo" className="px-5 py-24" style={{ background: "#FAFAFA" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal><SectionHead eyebrow="٠٥ · الظهور العضوي (SEO)" color={A} subtitle="أداء الموقع في نتائج بحث Google خلال آخر ٣٠ يوماً — بدون إعلانات مدفوعة.">الظهور في <span style={{ color: A }}>محركات البحث</span></SectionHead></Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {[
              { label: "النقرات العضوية", val: SEO_CLICKS, growth: "+26%", up: true, c: G },
              { label: "مرات الظهور", val: SEO_IMPR, growth: "+16%", up: true, c: META },
              { label: "متوسط نسبة النقر", suffix: "%", val: SEO_CTR, dec: 1, c: A },
              { label: "متوسط الترتيب", val: SEO_POS, dec: 1, c: P },
            ].map((k, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div style={card} className="p-5 text-center">
                  <p className="ar-heading" style={{ fontSize: 30, color: k.c, lineHeight: 1 }}><Counter value={k.val} decimals={k.dec || 0} suffix={k.suffix || ""} /></p>
                  <p className="ar-body text-[11px] mt-2" style={{ color: FAINT }}>{k.label}</p>
                  {k.growth && <span className="inline-flex items-center gap-1 mt-2 text-[11px] font-bold" style={{ color: G }}><TrendingUp size={12} /> {k.growth}</span>}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* top pages */}
            <Reveal>
              <div style={card} className="p-6 h-full">
                <p className="ar-heading text-lg mb-1" style={{ color: D }}>أعلى الصفحات أداءً</p>
                <p className="ar-body text-[12px] mb-4" style={{ color: FAINT }}>عدد النقرات العضوية لكل صفحة</p>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={topPages} layout="vertical" margin={{ left: 8, right: 36 }}>
                    <CartesianGrid horizontal={false} stroke="#F2F2F2" />
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="p" width={120} tick={{ fontSize: 11, fill: INK }} />
                    <Tooltip cursor={{ fill: "#FAFAFA" }} content={<ChartTip fmt={(v: number) => `${v} نقرة`} />} />
                    <Bar dataKey="c" radius={[0, 8, 8, 0]} barSize={22} fill={A}>
                      <LabelList dataKey="c" position="right" style={{ fontSize: 11, fontWeight: 700, fill: D }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Reveal>
            {/* top queries */}
            <Reveal delay={0.08}>
              <div style={card} className="p-6 h-full">
                <p className="ar-heading text-lg mb-1" style={{ color: D }}>أهم كلمات البحث</p>
                <p className="ar-body text-[12px] mb-4" style={{ color: FAINT }}>الكلمات التي جلبت أكبر عدد من النقرات</p>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={topQueries} layout="vertical" margin={{ left: 8, right: 30 }}>
                    <CartesianGrid horizontal={false} stroke="#F2F2F2" />
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="q" width={150} tick={{ fontSize: 10, fill: INK }} />
                    <Tooltip cursor={{ fill: "#FAFAFA" }} content={<ChartTip fmt={(v: number) => `${v} نقرة`} />} />
                    <Bar dataKey="c" radius={[0, 8, 8, 0]} barSize={16} fill={G}>
                      <LabelList dataKey="c" position="right" style={{ fontSize: 10, fontWeight: 700, fill: D }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Reveal>
          </div>

          {/* scatter: impressions vs clicks */}
          <Reveal delay={0.05}>
            <div style={card} className="p-6 mb-4">
              <p className="ar-heading text-lg mb-1" style={{ color: D }}>فجوة النقر — الظهور مقابل النقرات</p>
              <p className="ar-body text-[12px] mb-4" style={{ color: FAINT }}>كل نقطة كلمة بحث · المحور الأفقي = مرات الظهور · الرأسي = النقرات. الكلمات الحمراء (الجلوتاثيون / NAD) ظهور عالٍ ونقر شبه معدوم.</p>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                  <CartesianGrid stroke="#F2F2F2" />
                  <XAxis type="number" dataKey="imp" name="ظهور" tick={{ fontSize: 11, fill: FAINT }} tickFormatter={(v) => SAR(v)} />
                  <YAxis type="number" dataKey="clk" name="نقرات" tick={{ fontSize: 11, fill: FAINT }} />
                  <ZAxis type="number" range={[60, 60]} />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} content={({ active, payload }: any) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0].payload;
                    return <div className="rounded-xl px-3 py-2 ar-body" style={{ background: D, color: "#fff", fontSize: 12 }}><p className="font-bold">{d.q}</p><p>ظهور: {SAR(d.imp)}</p><p>نقرات: {d.clk}</p></div>;
                  }} />
                  {["براند", "خدمة", "جلوتاثيون"].map((k) => (
                    <Scatter key={k} name={k} data={seoScatter.filter((s) => s.kind === k)} fill={seoKindColor[k]} />
                  ))}
                  <Legend wrapperStyle={{ fontSize: 12, fontFamily: "'Ahmed Sans'" }} />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* trending */}
            <Reveal>
              <div style={card} className="p-6 h-full md:col-span-2">
                <p className="ar-heading text-lg mb-4 flex items-center gap-2" style={{ color: D }}><Flame size={18} color={R} /> كلمات بحث صاعدة</p>
                <div className="space-y-2.5">
                  {trending.map((t) => (
                    <div key={t.q} className="flex items-center justify-between gap-3">
                      <span className="ar-body text-[13px]" style={{ color: INK }}>{t.q}</span>
                      <span className="ar-body text-[12px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1" style={{ background: `${G}12`, color: G }}><ArrowUpRight size={12} /> +{t.g}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            {/* countries */}
            <Reveal delay={0.08}>
              <div style={card} className="p-6 h-full">
                <p className="ar-heading text-lg mb-1 flex items-center gap-2" style={{ color: D }}><Globe size={18} color={META} /> أهم الدول</p>
                <ResponsiveContainer width="100%" height={170}>
                  <PieChart>
                    <Pie data={countries} dataKey="value" nameKey="name" innerRadius={46} outerRadius={74} paddingAngle={2} stroke="none">
                      {countries.map((s) => <Cell key={s.name} fill={s.color} />)}
                    </Pie>
                    <Tooltip content={<ChartTip fmt={(v: number) => `${v}%`} />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-2 mt-1">
                  {countries.map((s) => <span key={s.name} className="ar-body text-[11px] flex items-center gap-1" style={{ color: INK }}><span style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} /> {s.name} {s.value}%</span>)}
                </div>
              </div>
            </Reveal>
          </div>

          {/* full keywords table */}
          <Reveal delay={0.05}>
            <div style={card} className="p-6 mt-4">
              <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                <p className="ar-heading text-lg" style={{ color: D }}>كل كلمات البحث ({allQueries.length})</p>
                <span className="ar-body text-[11px] px-2.5 py-1 rounded-full" style={{ background: "#F5F5F5", color: FAINT }}>مرتبة حسب الظهور</span>
              </div>
              <p className="ar-body text-[12px] mb-4" style={{ color: FAINT }}>القائمة الكاملة للكلمات التي ظهر فيها الموقع في نتائج البحث — حسب عدد مرات الظهور</p>
              <div style={{ maxHeight: 360, overflowY: "auto" }} className="pe-1">
                <table className="w-full" style={{ borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ position: "sticky", top: 0, background: "#fff" }}>
                      <th className="ar-body text-[11px] text-right pb-2" style={{ color: FAINT, fontWeight: 700 }}>الكلمة</th>
                      <th className="ar-body text-[11px] text-center pb-2" style={{ color: FAINT, fontWeight: 700, width: 110 }}>مرات الظهور</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...allQueries].sort((a, b) => b.i - a.i).map((row) => (
                      <tr key={row.q} style={{ borderTop: "1px solid #F4F4F4" }}>
                        <td className="ar-body text-[12.5px] py-2" style={{ color: D }} dir="rtl">{row.q}</td>
                        <td className="ar-body text-[12px] py-2 text-center tabular-nums" style={{ color: INK, fontWeight: 700 }}>{SAR(row.i)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>

          {/* Google growth + AI visibility */}
          <Reveal delay={0.05}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="rounded-2xl p-6 flex items-start gap-4" style={{ background: `${G}08`, border: `1px solid ${G}25` }}>
                <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: `${G}15` }}><TrendingUp size={20} color={G} /></div>
                <div>
                  <p className="ar-heading text-lg mb-1.5" style={{ color: D }}>ظهور Google في تطوّر مستمر</p>
                  <p className="ar-body text-[13px] leading-relaxed" style={{ color: INK }}>النقرات العضوية ترتفع شهرياً (+26%) والظهور (+16%) ومتوسط الترتيب يتحسّن نحو الصفحة الأولى (7.1). هذا نمو تراكمي ثابت لا يتوقف بتوقف الإعلانات — كل شهر يبني على ما قبله.</p>
                </div>
              </div>
              <div className="rounded-2xl p-6 flex items-start gap-4" style={{ background: `${P}08`, border: `1px solid ${P}25` }}>
                <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: `${P}15` }}><Sparkles size={20} color={P} /></div>
                <div>
                  <p className="ar-heading text-lg mb-1.5" style={{ color: D }}>نعمل على الظهور في الذكاء الاصطناعي</p>
                  <p className="ar-body text-[13px] leading-relaxed" style={{ color: INK }}>بدأنا فعلاً تهيئة الموقع للظهور في مساعدات الذكاء الاصطناعي (ChatGPT و Google AI) التي صار المرضى يسألونها عن أطباء وخدمات مكة، ونواصل تحسين ذلك باستمرار ليكون المجمع هو الإجابة التي يرشّحها الذكاء الاصطناعي — قبل المنافسين.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 6. INSIGHTS ═══ */}
      <section id="insights" className="px-5 py-24" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal><SectionHead eyebrow="٠٦ · الخلاصة والتوصيات" subtitle="استنتاجات مبنية على أرقام هذه الحملة، مع توصيات قابلة للتطبيق في الجولة القادمة.">ماذا <span style={{ color: G }}>نتعلّم؟</span></SectionHead></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: Award, c: TT_A, t: "التوسّع في عروض زراعة الأسنان", d: "قادت زراعة الأسنان 75 من أصل 130 عميلاً محتملاً، وحقّقت أرخص ليد على TikTok (14.78 ر.س). نوصي بتخصيص ميزانية أكبر لها في الجولة القادمة." },
              { icon: MessageCircle, c: META, t: "تركيز التواصل عبر Meta", d: "بمتوسط 10.36 ر.س لكل محادثة وأوسع وصول (276 ألفاً)، نوصي باعتماد Meta قناةً رئيسية لزيادة محادثات واتساب المباشرة." },
              { icon: Target, c: META, t: "إضافة حملات Google Ads", d: "كلمات مثل (دكتور جلدية مكة، علاج طبيعي مكة، زراعة أسنان مكة) عليها طلب بحث مرتفع ونية شراء مباشرة. نقترح إطلاق حملات بحث على Google لالتقاط هذا الطلب عالي النية الذي لم نستهدفه إعلانياً بعد." },
              { icon: Search, c: A, t: "تفعيل متجر المحاليل", d: "كلمات الجلوتاثيون و NAD تجلب آلاف الظهور بنقرات شبه معدومة. نوصي بتفعيل متجر المحاليل (الجلوتاثيون و NAD) لتحويل هذا الظهور إلى مبيعات وحجوزات، مع تحسين عناوين الصفحات لرفع نسبة النقر." },
              { icon: Stethoscope, c: P, t: "تطوير صفحات الأطباء", d: "كلمات مثل (دكتور علاء عرفة، د. أحلام الصومعي) صاعدة بقوة (+1650%). نقترح إثراء صفحات الأطباء بمحتوى أوفى لتعزيز الثقة والترتيب." },
              { icon: TrendingUp, c: G, t: "مواصلة الزخم العضوي", d: "نمو +26% في النقرات و+16% في الظهور خلال 30 يوماً يؤكد أن خطة المحتوى والسيو تؤتي ثمارها. نوصي بالاستمرار لمضاعفة النتائج." },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div style={card} className="p-6 h-full flex gap-4">
                  <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: `${s.c}14` }}><s.icon size={20} color={s.c} /></div>
                  <div><p className="ar-heading text-lg mb-1.5" style={{ color: D }}>{s.t}</p><p className="ar-body text-[13px] leading-relaxed" style={{ color: INK }}>{s.d}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7. INVOICES ═══ */}
      <section id="invoices" className="px-5 py-24" style={{ background: "#FAFAFA" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal><SectionHead eyebrow="٠٧ · الفواتير" subtitle="فواتير الإنفاق الإعلاني الرسمية من كل منصة — متاحة للتحميل المباشر.">فواتير <span style={{ color: G }}>المنصات</span></SectionHead></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {invoices.map((inv, i) => (
              <Reveal key={inv.plat} delay={i * 0.07}>
                <a href={inv.href} download className="block group" style={{ ...cardPop(inv.color), padding: 24 }}>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2"><img src={inv.logo} alt={inv.plat} style={{ width: 26, height: 26, objectFit: "contain" }} /><span className="ar-heading text-xl" style={{ color: D }}>{inv.plat}</span></div>
                    <span className="text-[10px] font-bold px-2 py-1 rounded" style={{ background: "#F5F5F5", color: FAINT }}>{inv.type} · {inv.size}</span>
                  </div>
                  <p className="ar-body text-[13px] mb-5" style={{ color: INK }}>{inv.count === 1 ? "فاتورة واحدة" : `${inv.count} فاتورة`} للحملة كاملة</p>
                  <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl ar-body text-[13px] font-bold w-full justify-center transition-transform group-hover:scale-[1.02]" style={{ background: D, color: "#fff" }}>
                    <Download size={15} /> تحميل الفواتير
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.05}>
            <p className="text-center ar-body text-[12px] mt-6" style={{ color: FAINT }}>إجمالي الإنفاق المُوثّق عبر الفواتير: <strong style={{ color: D }}>{SAR(TOTAL_SPEND)} ر.س</strong></p>
          </Reveal>
        </div>
      </section>

      {/* ═══ CONTACT / FOOTER ═══ */}
      <footer id="contact" className="relative overflow-hidden" style={{ background: "#4FFFB0" }}>
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-16">
          <div className="text-center mb-14">
            <p className="ar-script text-xl md:text-2xl mb-4" style={{ color: "#0A0A0A" }}>شكراً لثقتكم</p>
            <h2 className="ar-heading text-4xl md:text-6xl mb-6" style={{ color: "#0A0A0A" }}>لنُكمل نمو مجمع الرقي</h2>
            <p className="ar-body text-base md:text-lg max-w-lg mx-auto mb-10" style={{ color: "rgba(0,0,0,0.5)" }}>
              جاهزون لمناقشة خطة المرحلة القادمة — حملات أعلى كفاءة وظهور أوسع في البحث والذكاء الاصطناعي.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://wa.me/201011648156" target="_blank" rel="noopener noreferrer" className="ar-body inline-flex items-center gap-3 h-14 px-9 rounded-full text-base font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0" style={{ background: "#fff", color: "#0A0A0A", border: "2px solid #0A0A0A", boxShadow: "5px 5px 0px 0px #0A0A0A" }}>
                <MessageCircle size={18} /> تواصل عبر واتساب
              </a>
              <a href="mailto:hello@ahmedali.online" className="ar-body inline-flex items-center gap-3 h-14 px-9 rounded-full text-base font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0" style={{ background: "#fff", color: "#0A0A0A", border: "2px solid #0A0A0A", boxShadow: "5px 5px 0px 0px #0A0A0A" }}>
                <ArrowLeft size={16} /> قُل مرحباً
              </a>
            </div>
          </div>

          <div className="w-full h-[1px] mb-12" style={{ background: "rgba(0,0,0,0.1)" }} />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
            {/* brand */}
            <div className="md:col-span-2">
              <p className="ar-heading text-3xl font-bold inline-block mb-3" style={{ color: "#0A0A0A" }}>أحمد علي<span style={{ color: "#fff" }}>.</span></p>
              <p className="ar-body text-sm leading-relaxed mb-5" style={{ color: "rgba(0,0,0,0.5)", maxWidth: 360 }}>
                إدارة المنتج الرقمي والنمو — حملات الأداء وتحسين الظهور في محركات البحث والذكاء الاصطناعي عبر الشرق الأوسط.
              </p>
              <div className="flex items-center gap-3">
                {[
                  { label: "LinkedIn", href: "https://linkedin.com/in/ahmedalii/", Icon: Linkedin },
                  { label: "WhatsApp", href: "https://wa.me/201011648156", Icon: MessageCircle },
                  { label: "Email", href: "mailto:hello@ahmedali.online", Icon: Mail },
                ].map((s) => (
                  <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined} aria-label={s.label} className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1" style={{ background: "#fff", border: "2px solid #0A0A0A", boxShadow: "2px 2px 0px 0px #0A0A0A" }}>
                    <s.Icon size={16} color="#0A0A0A" />
                  </a>
                ))}
              </div>
            </div>

            {/* report sections */}
            <div>
              <h4 className="ar-body text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "#0A0A0A" }}>أقسام التقرير</h4>
              <div className="flex flex-col gap-2.5">
                {NAV.map((link) => (
                  <a key={link.id} href={`#${link.id}`} onClick={(e) => go(e, link.id)} className="ar-body text-sm font-medium transition-all duration-200 hover:-translate-x-1" style={{ color: "rgba(0,0,0,0.6)" }}>{link.label}</a>
                ))}
              </div>
            </div>

            {/* contact */}
            <div>
              <h4 className="ar-body text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "#0A0A0A" }}>تواصل معي</h4>
              <div className="flex flex-col gap-2.5 mb-6">
                <a href="mailto:hello@ahmedali.online" className="ar-body text-sm font-medium transition-all duration-200 hover:-translate-x-1" style={{ color: "rgba(0,0,0,0.6)" }}>hello@ahmedali.online</a>
                <a href="tel:+201011648156" className="text-sm font-medium transition-all duration-200 hover:-translate-x-1" style={{ color: "rgba(0,0,0,0.6)", direction: "ltr", textAlign: "right" }}>+20 101 164 8156</a>
                <p className="ar-body text-sm font-medium" style={{ color: "rgba(0,0,0,0.6)" }}>جدة، السعودية</p>
              </div>
              <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="ar-body inline-flex items-center gap-2 h-10 px-5 rounded-full text-xs font-bold transition-all duration-200 hover:-translate-y-1 cursor-pointer" style={{ background: "#0A0A0A", color: "#4FFFB0", border: "2px solid #0A0A0A", boxShadow: "3px 3px 0px 0px rgba(0,0,0,0.2)" }}>
                <ArrowUp size={14} /> الأعلى
              </button>
            </div>
          </div>
        </div>

        {/* copyright bar */}
        <div style={{ background: "#0A0A0A" }}>
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="ar-body text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>© ٢٠٢٦ مجمع الرقي العام · مكة المكرمة</p>
            <p className="ar-body text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>إعداد وتصميم: أحمد علي</p>
          </div>
        </div>
      </footer>
    </main>
    </ArabicTailProcessor>
  );
}

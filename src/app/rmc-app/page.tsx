"use client";

/* eslint-disable @next/next/no-img-element, @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  CalendarCheck, FlaskConical, ShoppingBag, LayoutDashboard,
  Smartphone, ShieldCheck, Bell, CreditCard, Languages, Zap, CheckCircle2,
  ArrowLeft, ArrowUp, Linkedin, MessageCircle, Mail,
  Rocket, Lock, Star, Server, Clock, Bot,
} from "lucide-react";
import ArabicTailProcessor from "@/components/ArabicTailProcessor";

/* ═══════════ PALETTE ═══════════ */
const G = "#30c280";
const D = "#0A0A0A";
const META = "#0866FF";
const A = "#F59E0B";
const P = "#8B5CF6";
const TEAL = "#0EA5A4";
const INK = "rgba(0,0,0,0.62)";
const FAINT = "rgba(0,0,0,0.4)";

const SAR = (n: number) => n.toLocaleString("en-US");

/* ═══════════ COUNT-UP ═══════════ */
function useCountUp(target: number, dur = 1.4) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (dur * 1000), 1);
      setV(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, dur]);
  return { ref, v };
}
function Counter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const { ref, v } = useCountUp(value);
  return <span ref={ref}>{prefix}{Math.round(v).toLocaleString("en-US")}{suffix}</span>;
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
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
const TOTAL = 8000;
const modules = [
  {
    icon: CalendarCheck, color: G, name: "الحجز وملفات الأطباء",
    desc: "حجز المواعيد أونلاين خطوة بخطوة: القسم ← الطبيب ← الوقت المتاح، مع منع الحجز المزدوج وتأكيد فوري.",
    points: ["حجز حسب القسم والطبيب والوقت", "صفحات أطباء كاملة (نبذة، تخصص، جدول)", "تأكيد وتذكير عبر الإشعارات والواتساب", "إعادة جدولة وإلغاء بسهولة"],
  },
  {
    icon: FlaskConical, color: META, name: "بوابة المريض والتحاليل",
    desc: "حساب لكل مريض يجمع كل سجله الطبي في مكان واحد، مع إشعار فوري عند جاهزية النتائج.",
    points: ["تسجيل دخول آمن برقم الجوال (OTP)", "نتائج التحاليل (عرض + تنزيل PDF)", "سجل المواعيد والوصفات الطبية", "الفواتير ومتابعة الحالة"],
  },
  {
    icon: ShoppingBag, color: A, name: "متجر المحاليل",
    desc: "متجر إلكتروني داخل التطبيق للمحاليل الوريدية والفيتامينات (جلوتاثيون، NAD+) — يحوّل الطلب الرقمي العالي إلى مبيعات.",
    points: ["كتالوج منتجات وسلة شراء", "دفع إلكتروني آمن (مدى/فيزا/Apple Pay)", "متابعة الطلبات وحالتها", "حجز جلسة وريدية داخل المجمع"],
  },
  {
    icon: Bot, color: P, name: "مساعد الذكاء الاصطناعي",
    desc: "مساعد عربي/إنجليزي يرد على استفسارات المرضى على مدار الساعة، يوجّههم للحجز، ويصعّد للواتساب عند الحاجة.",
    points: ["إجابات مبنية على بيانات المجمع الحقيقية", "يوجّه المريض لحجز الموعد المناسب", "تصعيد للواتساب للحالات المعقّدة", "متوافق مع استراتيجية الظهور في الـ AI"],
  },
  {
    icon: MessageCircle, color: "#25D366", name: "أتمتة الواتساب والتذكيرات",
    desc: "رسائل واتساب تلقائية تبني علاقة مستمرة مع المريض — من تأكيد الحجز حتى متابعة ما بعد الكشف، بدون أي جهد يدوي.",
    points: ["تأكيد الحجز فور إتمامه", "تذكير قبل الموعد بيوم وبساعة", "رسالة ترحيب بعد الكشف (نورتنا) ومتابعة", "إشعار جاهزية التحاليل عبر الواتساب"],
  },
  {
    icon: LayoutDashboard, color: TEAL, name: "لوحة الإدارة",
    desc: "لوحة تحكم كاملة للإدارة والأطباء والاستقبال — كل عملية في مكان واحد بصلاحيات حسب الدور.",
    points: ["إدارة المواعيد والمرضى والأطباء والجداول", "رفع نتائج التحاليل وإدارة المتجر", "فواتير متوافقة مع هيئة الزكاة (ZATCA)", "أدوار وصلاحيات + سجل تدقيق كامل"],
  },
];

const techStack = [
  { icon: Smartphone, t: "Flutter", d: "تطبيق أصلي واحد لـ iOS و Android — أداء عالٍ وتكلفة أقل من بناء تطبيقين منفصلين." },
  { icon: Server, t: "Firebase", d: "بنية سحابية موثوقة من Google: قاعدة بيانات لحظية، تخزين، ودوال خادمية آمنة." },
  { icon: Bell, t: "إشعارات فورية", d: "تذكير بالمواعيد، تنبيه جاهزية التحاليل، وحالة الطلبات — مباشرة على جوال المريض." },
  { icon: CreditCard, t: "دفع إلكتروني", d: "بوابة PayMob (مدى/فيزا/ماستركارد/Apple Pay) آمنة ومتوافقة مع معايير حماية البطاقات." },
  { icon: ShieldCheck, t: "خصوصية وأمان", d: "حماية البيانات الطبية حسب نظام حماية البيانات السعودي (PDPL) وصلاحيات صارمة." },
  { icon: Languages, t: "عربي + إنجليزي", d: "واجهة كاملة بالعربية (RTL) والإنجليزية بنبرة احترافية تناسب جمهور مكة." },
];

const phases = [
  {
    n: "١", color: G, title: "الأساس والحجز", weeks: "اليوم 1 – 16", price: 3000,
    items: ["تأسيس المشروع والهوية البصرية داخل التطبيق", "تسجيل الدخول وملف المريض", "نظام الحجز الكامل + منع الحجز المزدوج", "صفحات الأطباء والأقسام", "أتمتة واتساب: تأكيد وتذكير الموعد", "بوابة المريض الأساسية + الإشعارات"],
  },
  {
    n: "٢", color: A, title: "المتجر والإدارة", weeks: "اليوم 17 – 30", price: 2500,
    items: ["متجر المحاليل (كتالوج + سلة + طلبات)", "الدفع عبر PayMob + الفواتير (ZATCA)", "لوحة الإدارة الكاملة بالأدوار", "رفع نتائج التحاليل والوصفات", "رسائل المتابعة بعد الكشف + حجز الجلسات الوريدية"],
  },
  {
    n: "٣", color: P, title: "الذكاء الاصطناعي والإطلاق", weeks: "اليوم 31 – 40", price: 2500,
    items: ["مساعد الذكاء الاصطناعي + التصعيد للواتساب", "الصقل النهائي وتحسين الأداء", "اختبارات شاملة ومراجعة الجودة", "النشر على App Store و Google Play", "تسليم وتدريب الفريق"],
  },
];

const NAV = [
  { id: "vision", label: "الفرصة", sum: "لماذا التطبيق الآن، وما الذي يحلّه لمجمع الرقي." },
  { id: "modules", label: "الموديولات", sum: "الأنظمة الخمسة التي يضمّها التطبيق." },
  { id: "tech", label: "الأساس التقني", sum: "التقنيات التي يُبنى عليها التطبيق وأمانه." },
  { id: "roadmap", label: "خطة التنفيذ", sum: "ثلاث مراحل تسليم متتابعة على ~12 أسبوعاً." },
  { id: "pricing", label: "عرض السعر", sum: "إجمالي الاستثمار ودفعات المراحل والمشمولات." },
];

export default function RMCAppProposal() {
  const [active, setActive] = useState("vision");
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
    if (el) { setActive(id); el.scrollIntoView({ behavior: "smooth", block: "start" }); }
  };

  return (
    <ArabicTailProcessor>
    <main className="ar-rtl" style={{ background: "#fff", color: D, fontFamily: "'Ahmed Sans', sans-serif" }}>
      <style>{`
        section[id], footer[id] { scroll-margin-top: 90px; }
        @media (min-width: 1024px) { section[id], footer[id] { scroll-margin-top: 24px; } }
        @keyframes rmcFloat { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-16px) rotate(-0.4deg); } }
        @keyframes rmcMouse { 0% { transform: translateY(0); opacity: 1; } 75% { transform: translateY(9px); opacity: 0; } 76% { transform: translateY(0); opacity: 0; } 100% { opacity: 1; } }
        .rmc-dotgrid { background-image: radial-gradient(circle, rgba(0,0,0,0.045) 1px, transparent 1px); background-size: 26px 26px; }
      `}</style>

      {/* progress */}
      <div style={{ position: "fixed", top: 0, right: 0, left: 0, height: 3, zIndex: 60 }}>
        <div style={{ height: "100%", width: `${prog}%`, background: G, transition: "width 0.1s" }} />
      </div>

      {/* side menu — desktop */}
      <nav className="hidden lg:block" style={{ position: "fixed", top: "50%", right: 20, transform: "translateY(-50%)", zIndex: 50, width: 218 }}>
        <div style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(14px)", border: "1px solid #ECECEC", borderRadius: 20, padding: 14, boxShadow: "0 16px 50px -18px rgba(0,0,0,0.18)" }}>
          <div className="flex items-center gap-2 mb-3 pb-3" style={{ borderBottom: "1px solid #F2F2F2" }}>
            <img src="/logos/rmc.png" alt="RMC" style={{ height: 30, width: "auto" }} onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
            <div>
              <p className="ar-heading text-[12px] leading-tight" style={{ color: D }}>مجمع الرقي العام</p>
              <p className="ar-body text-[9px]" style={{ color: FAINT }}>عرض تطوير التطبيق</p>
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            {NAV.map((n, i) => (
              <a key={n.id} href={`#${n.id}`} onClick={(e) => go(e, n.id)} className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-colors" style={{ background: active === n.id ? `${G}12` : "transparent" }}>
                <span className="ar-body text-[10px] tabular-nums" style={{ color: active === n.id ? G : "#C4C4C4", width: 14 }}>{`٠${i + 1}`}</span>
                <span style={{ width: 6, height: 6, borderRadius: 100, background: active === n.id ? G : "#D4D4D4", flexShrink: 0 }} />
                <span className="ar-body text-[12px]" style={{ color: active === n.id ? D : INK, fontWeight: active === n.id ? 700 : 500 }}>{n.label}</span>
              </a>
            ))}
          </div>
          <div className="mt-3 pt-3" style={{ borderTop: "1px solid #F2F2F2" }}>
            <p className="ar-body text-[10.5px] leading-relaxed" style={{ color: FAINT }}>{NAV.find((n) => n.id === active)?.sum}</p>
          </div>
        </div>
      </nav>

      {/* mobile top bar */}
      <nav className="lg:hidden" style={{ position: "fixed", top: 0, right: 0, left: 0, zIndex: 50, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(14px)", borderBottom: "1px solid #F0F0F0" }}>
        <div className="px-4 h-14 flex items-center gap-2">
          <img src="/logos/rmc.png" alt="RMC" style={{ height: 24, width: "auto" }} onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
          <span className="ar-heading text-[13px]" style={{ color: D }}>عرض تطبيق مجمع الرقي</span>
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
      <section className="relative px-5 pt-28 pb-20 md:pt-24 overflow-hidden flex flex-col items-center justify-center" style={{ background: "#fff", minHeight: "100vh" }}>
        {/* dot grid + single subtle glow */}
        <div className="rmc-dotgrid absolute inset-0 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{ width: 720, height: 290, background: `radial-gradient(ellipse, ${G}16 0%, transparent 70%)` }} />

        <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center text-center">
          <motion.img initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} src="/logos/rmc.png" alt="مجمع الرقي العام" className="mb-6" style={{ height: 58, width: "auto" }} onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }} className="ar-body text-[12px] font-bold tracking-[2px] mb-4" style={{ color: FAINT }}>عرض تطوير تطبيق موبايل · يونيو ٢٠٢٦</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="ar-heading mb-4" style={{ fontSize: "clamp(34px,6vw,64px)", lineHeight: 1.18, color: D }}>
            تطبيق مجمع الرقي <span style={{ color: G }}>العام الطبي</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }} className="ar-body text-base md:text-lg mb-2 leading-relaxed" style={{ color: "rgba(0,0,0,0.5)", maxWidth: 540 }}>
            منصة المجمع الكاملة على iOS و Android — الحجز، التحاليل، المتجر، والذكاء الاصطناعي في تطبيق واحد.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="ar-heading text-lg mb-9" style={{ color: G }}>rmclinic.sa</motion.p>

          {/* From / To */}
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 w-full max-w-xl text-right">
            <div className="rounded-[16px] p-5" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
              <p className="ar-body text-[10px] font-bold tracking-[2px] mb-2" style={{ color: G }}>مقدّم من</p>
              <p className="ar-body text-[14px] font-bold" style={{ color: D }}>أحمد علي</p>
              <p className="ar-body text-[11px]" style={{ color: "rgba(0,0,0,0.4)" }}>إدارة المنتج الرقمي والنمو</p>
              <p className="text-[11px]" style={{ color: "rgba(0,0,0,0.3)", direction: "ltr", textAlign: "right" }}>hello@ahmedali.online</p>
            </div>
            <div className="rounded-[16px] p-5" style={{ background: "#fff", border: `2px solid ${G}`, boxShadow: `3px 3px 0px 0px ${D}` }}>
              <p className="ar-body text-[10px] font-bold tracking-[2px] mb-2" style={{ color: G }}>مقدّم إلى</p>
              <p className="ar-body text-[14px] font-bold" style={{ color: D }}>مجمع الرقي العام الطبي</p>
              <p className="ar-body text-[11px]" style={{ color: "rgba(0,0,0,0.4)" }}>مكة المكرمة — حي الخالدية</p>
              <p className="text-[11px]" style={{ color: "rgba(0,0,0,0.3)", direction: "ltr", textAlign: "right" }}>rmclinic.sa</p>
            </div>
          </motion.div>

          {/* stats bar */}
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="w-full max-w-2xl mb-8">
            <div className="flex items-stretch" style={{ background: "#fff", border: "1px solid #E8E8E8", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
              {[
                { n: <Counter value={6} />, l: "أنظمة" },
                { n: <Counter value={2} />, l: "منصّتان" },
                { n: <Counter value={3} />, l: "مراحل" },
                { n: <Counter value={40} />, l: "يوم" },
                { n: <Counter value={TOTAL} />, l: "ر.س" },
              ].map((s, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-center py-5 px-1.5 relative" style={{ borderRight: i > 0 ? "1px solid #F0F0F0" : "none" }}>
                  <span className="ar-heading" style={{ fontSize: "clamp(16px,3.5vw,26px)", lineHeight: 1, color: D }}>{s.n}</span>
                  <span className="ar-body text-[9.5px] font-bold mt-1" style={{ color: "rgba(0,0,0,0.32)" }}>{s.l}</span>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-7 rounded-t-full" style={{ background: G }} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* objective */}
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }} className="rounded-[16px] p-6 text-center mb-10 w-full max-w-2xl" style={{ background: `${G}08`, border: `1px solid ${G}20` }}>
            <p className="ar-body text-[13px] font-medium leading-relaxed" style={{ color: D }}>
              <strong style={{ color: G }}>الهدف:</strong> تحويل الطلب الرقمي المتزايد على المجمع إلى حجوزات ومبيعات عبر تطبيق أصلي متكامل يخدم المريض والإدارة والأطباء.
            </p>
            <p className="ar-body text-[12px] mt-2" style={{ color: "rgba(0,0,0,0.5)" }}>
              <strong>النطاق:</strong> الحجز · بوابة المريض والتحاليل · متجر المحاليل · أتمتة الواتساب · الذكاء الاصطناعي · لوحة الإدارة
            </p>
          </motion.div>

          {/* scroll indicator */}
          <div className="flex flex-col items-center gap-2">
            <div style={{ width: 24, height: 38, border: "1.5px solid rgba(0,0,0,0.14)", borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 5 }}>
              <div style={{ width: 3, height: 6, borderRadius: 2, background: G, animation: "rmcMouse 1.6s ease-in-out infinite" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ APP MOCKUP BAND ═══ */}
      <section className="px-5 pt-6 pb-20 md:pb-24 relative overflow-hidden" style={{ background: "#fff" }}>
        <div className="rmc-dotgrid absolute inset-0 pointer-events-none" style={{ opacity: 0.55 }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ width: 640, height: 360, background: `radial-gradient(ellipse, ${G}12 0%, transparent 70%)` }} />
        <Reveal className="relative flex flex-col items-center">
          <div style={{ animation: "rmcFloat 6s ease-in-out infinite" }}>
            <img src="/rmc/app-mockup-3d.png" alt="تصوّر تخيلي لواجهة تطبيق مجمع الرقي" style={{ width: 380, maxWidth: "88%", height: "auto", filter: "drop-shadow(0 42px 84px rgba(0,0,0,0.22))" }} />
          </div>
          <p className="ar-body text-[11px] mt-6 px-3 py-1 rounded-full" style={{ color: "rgba(0,0,0,0.35)", background: "#F4F4F4" }}>تصوّر تخيلي لواجهة التطبيق — التصميم النهائي قد يختلف</p>
        </Reveal>
      </section>

      {/* ═══ 1. VISION ═══ */}
      <section id="vision" className="px-5 py-24" style={{ background: "#FAFAFA" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal><SectionHead eyebrow="٠١ · الفرصة" subtitle="التطبيق ليس رفاهية — هو الخطوة التي تترجم الطلب الرقمي القائم إلى مرضى ومبيعات فعلية.">لماذا <span style={{ color: G }}>التطبيق الآن؟</span></SectionHead></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: CalendarCheck, t: "الحجز أصبح متوقّعاً", d: "المريض اليوم يبحث ويحجز من جواله. تطبيق حجز سلس يلتقط الطلب القائم بدل ضياعه في مكالمات لا تُردّ.", c: G },
              { icon: ShoppingBag, t: "طلب عالٍ على المحاليل", d: "كلمات الجلوتاثيون و NAD+ تجلب آلاف عمليات البحث شهرياً. متجر داخل التطبيق يحوّل هذا الطلب إلى مبيعات مباشرة.", c: A },
              { icon: Star, t: "ولاء وتكرار", d: "حساب المريض (مواعيد، تحاليل، وصفات) يجعل المجمع في جيب المريض دائماً — ويزيد تكرار الزيارة والثقة.", c: META },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.06}>
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

      {/* ═══ 2. MODULES ═══ */}
      <section id="modules" className="px-5 py-24" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal><SectionHead eyebrow="٠٢ · الموديولات" color={META} subtitle="خمسة أنظمة متكاملة في تطبيق واحد، تخدم المريض والإدارة والأطباء.">ماذا يضمّ <span style={{ color: META }}>التطبيق؟</span></SectionHead></Reveal>
          <div className="space-y-4">
            {modules.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.04}>
                <div style={cardPop(m.color)} className="p-6 md:p-7 relative overflow-hidden">
                  <span className="ar-heading select-none pointer-events-none absolute" style={{ top: -18, left: 6, fontSize: 120, lineHeight: 1, color: `${m.color}0E` }}>{`٠${i + 1}`}</span>
                  <div className="grid md:grid-cols-[auto_1fr_1fr] gap-5 items-start relative">
                    <div className="flex items-center gap-3 md:block">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `${m.color}15` }}><m.icon size={26} color={m.color} /></div>
                      <span className="md:hidden ar-heading text-xl" style={{ color: D }}>{m.name}</span>
                    </div>
                    <div>
                      <span className="hidden md:inline-block ar-heading text-xl mb-2" style={{ color: D }}>{m.name}</span>
                      <p className="ar-body text-[13px] leading-relaxed" style={{ color: INK }}>{m.desc}</p>
                    </div>
                    <ul className="space-y-2">
                      {m.points.map((p) => (
                        <li key={p} className="flex items-start gap-2">
                          <CheckCircle2 size={15} color={m.color} className="flex-shrink-0 mt-0.5" />
                          <span className="ar-body text-[12.5px]" style={{ color: INK }}>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. TECH ═══ */}
      <section id="tech" className="px-5 py-24" style={{ background: "#FAFAFA" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal><SectionHead eyebrow="٠٣ · الأساس التقني" color={TEAL} subtitle="تقنيات حديثة ومُجرّبة تضمن أداءً عالياً، أماناً للبيانات الطبية، وقابلية للتوسّع.">يُبنى على <span style={{ color: TEAL }}>أساس متين</span></SectionHead></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {techStack.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.05}>
                <div style={card} className="p-6 h-full">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${TEAL}12` }}><s.icon size={20} color={TEAL} /></div>
                  <p className="ar-heading text-lg mb-2" style={{ color: D }}>{s.t}</p>
                  <p className="ar-body text-[13px] leading-relaxed" style={{ color: INK }}>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.05}>
            <div className="mt-4 rounded-2xl p-5 flex items-start gap-3" style={{ background: `${G}08`, border: `1px solid ${G}25` }}>
              <Lock size={18} color={G} className="flex-shrink-0 mt-0.5" />
              <p className="ar-body text-[13px] leading-relaxed" style={{ color: INK }}>
                <strong style={{ color: G }}>أمان وخصوصية أولاً:</strong> كل البيانات الطبية والمالية تُكتب عبر خوادم آمنة فقط، والمريض يرى بياناته وحده، مع سجل تدقيق كامل لكل عملية — وفق نظام حماية البيانات الشخصية السعودي (PDPL).
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 4. ROADMAP ═══ */}
      <section id="roadmap" className="px-5 py-24" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal><SectionHead eyebrow="٠٤ · خطة التنفيذ" color={A} subtitle="ثلاث مراحل تسليم متتابعة خلال 40 يوماً — كل مرحلة تُسلَّم وتُجرَّب قبل التالية.">رحلة <span style={{ color: A }}>التطوير</span></SectionHead></Reveal>
          <div className="space-y-4">
            {phases.map((ph, i) => (
              <Reveal key={ph.n} delay={i * 0.06}>
                <div style={card} className="p-6 md:p-7 relative overflow-hidden">
                  <span className="ar-heading select-none pointer-events-none absolute" style={{ top: -24, left: 14, fontSize: 130, lineHeight: 1, color: `${ph.color}0D` }}>{ph.n}</span>
                  <div className="grid md:grid-cols-[auto_1fr_auto] gap-5 items-start relative">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center ar-heading text-xl flex-shrink-0" style={{ background: `${ph.color}15`, color: ph.color }}>{ph.n}</div>
                      <div className="md:hidden">
                        <p className="ar-heading text-lg" style={{ color: D }}>{ph.title}</p>
                        <p className="ar-body text-[11px]" style={{ color: FAINT }}>{ph.weeks}</p>
                      </div>
                    </div>
                    <div>
                      <div className="hidden md:block mb-3">
                        <p className="ar-heading text-xl" style={{ color: D }}>المرحلة {ph.n} — {ph.title}</p>
                        <p className="ar-body text-[12px] flex items-center gap-1.5 mt-1" style={{ color: FAINT }}><Clock size={12} /> {ph.weeks}</p>
                      </div>
                      <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-2">
                        {ph.items.map((it) => (
                          <li key={it} className="flex items-start gap-2">
                            <CheckCircle2 size={14} color={ph.color} className="flex-shrink-0 mt-0.5" />
                            <span className="ar-body text-[12.5px]" style={{ color: INK }}>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-center md:border-r md:pr-5" style={{ borderColor: "#F0F0F0" }}>
                      <p className="ar-body text-[10px] font-bold tracking-wide mb-1" style={{ color: FAINT }}>دفعة المرحلة</p>
                      <p className="ar-heading" style={{ fontSize: 26, color: ph.color, lineHeight: 1 }}>{SAR(ph.price)}</p>
                      <p className="ar-body text-[11px]" style={{ color: FAINT }}>ريال سعودي</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. PRICING ═══ */}
      <section id="pricing" className="px-5 py-24" style={{ background: "#FAFAFA" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal><SectionHead eyebrow="٠٥ · عرض السعر" subtitle="استثمار واضح ومقسّم على المراحل — تدفع مع كل تسليم، بلا مفاجآت.">عرض <span style={{ color: G }}>السعر</span></SectionHead></Reveal>

          {/* big total */}
          <Reveal>
            <div className="rounded-[24px] p-8 md:p-10 mb-6 text-center relative overflow-hidden" style={{ background: D }}>
              <div className="absolute top-0 left-0 w-48 h-48 pointer-events-none" style={{ background: `radial-gradient(circle, ${G}22 0%, transparent 70%)` }} />
              <p className="ar-body text-[11px] font-bold tracking-[3px] mb-2" style={{ color: G }}>إجمالي الاستثمار</p>
              <p className="ar-heading mb-2" style={{ fontSize: "clamp(52px,11vw,104px)", color: "#fff", lineHeight: 1 }}>
                <Counter value={TOTAL} /> <span style={{ color: G, fontSize: "0.34em" }}>ريال</span>
              </p>
              <p className="ar-body text-[13px]" style={{ color: "rgba(255,255,255,0.55)" }}>تطبيق متكامل (iOS + Android) + لوحة إدارة · مقسّم على 3 مراحل</p>
            </div>
          </Reveal>

          {/* milestone payments */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {phases.map((ph, i) => (
              <Reveal key={ph.n} delay={i * 0.07}>
                <div style={cardPop(ph.color)} className="p-6 h-full text-center">
                  <p className="ar-body text-[11px] font-bold tracking-wide mb-1" style={{ color: ph.color }}>الدفعة {ph.n}</p>
                  <p className="ar-heading text-base mb-3" style={{ color: D }}>{ph.title}</p>
                  <p className="ar-heading" style={{ fontSize: 40, color: D, lineHeight: 1 }}>{SAR(ph.price)}</p>
                  <p className="ar-body text-[11px] mt-1 mb-3" style={{ color: FAINT }}>ريال سعودي</p>
                  <p className="ar-body text-[11px] px-3 py-1.5 rounded-full inline-block" style={{ background: `${ph.color}12`, color: ph.color }}>عند تسليم المرحلة</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* includes / excludes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Reveal>
              <div style={card} className="p-6 h-full">
                <p className="ar-heading text-lg mb-4 flex items-center gap-2" style={{ color: D }}><CheckCircle2 size={18} color={G} /> العرض يشمل</p>
                <ul className="space-y-2.5">
                  {["تطبيق أصلي كامل لـ iOS و Android", "الموديولات الستة كاملة + لوحة الإدارة", "أتمتة رسائل الواتساب (تأكيد + تذكير + متابعة)", "الدفع عبر PayMob + الفواتير (ZATCA)", "النشر على App Store و Google Play", "تسليم الكود وتدريب الفريق"].map((x) => (
                    <li key={x} className="flex items-start gap-2"><CheckCircle2 size={15} color={G} className="flex-shrink-0 mt-0.5" /><span className="ar-body text-[13px]" style={{ color: INK }}>{x}</span></li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div style={card} className="p-6 h-full">
                <p className="ar-heading text-lg mb-4 flex items-center gap-2" style={{ color: D }}><Zap size={18} color={A} /> ملاحظات</p>
                <ul className="space-y-2.5">
                  {["حسابات Firebase والدفع وZATCA تُجهَّز باسم المجمع", "محتوى الأطباء والمنتجات يُورَّد من المجمع", "الإضافات الكبيرة خارج النطاق (التي تتطلب وقتاً ومجهوداً إضافياً) تُسعَّر منفصلاً"].map((x) => (
                    <li key={x} className="flex items-start gap-2"><span className="flex-shrink-0 mt-1.5" style={{ width: 6, height: 6, borderRadius: 100, background: A }} /><span className="ar-body text-[13px]" style={{ color: INK }}>{x}</span></li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            <div className="text-center mt-10">
              <p className="ar-heading text-2xl mb-4" style={{ color: D }}>جاهزون للبدء؟</p>
              <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl ar-body text-[15px] font-bold" style={{ background: G, color: D, border: `2px solid ${D}`, boxShadow: `4px 4px 0 0 ${D}` }}>
                <Rocket size={17} /> لنبدأ المرحلة الأولى
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer id="contact" className="relative overflow-hidden" style={{ background: "#4FFFB0" }}>
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-16">
          <div className="text-center mb-14">
            <p className="ar-script text-xl md:text-2xl mb-4" style={{ color: "#0A0A0A" }}>لنبنِ تطبيقاً يليق بالمجمع</p>
            <h2 className="ar-heading text-4xl md:text-6xl mb-6" style={{ color: "#0A0A0A" }}>جاهزون للانطلاق</h2>
            <p className="ar-body text-base md:text-lg max-w-lg mx-auto mb-10" style={{ color: "rgba(0,0,0,0.5)" }}>
              عرض السعر ساري وقابل للنقاش حسب أولويات المجمع. تواصل معي للبدء أو لأي استفسار.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://wa.me/201011648156" target="_blank" rel="noopener noreferrer" className="ar-body inline-flex items-center gap-3 h-14 px-9 rounded-full text-base font-bold transition-all duration-200 hover:-translate-y-0.5" style={{ background: "#fff", color: "#0A0A0A", border: "2px solid #0A0A0A", boxShadow: "5px 5px 0px 0px #0A0A0A" }}>
                <MessageCircle size={18} /> تواصل عبر واتساب
              </a>
              <a href="mailto:hello@ahmedali.online" className="ar-body inline-flex items-center gap-3 h-14 px-9 rounded-full text-base font-bold transition-all duration-200 hover:-translate-y-0.5" style={{ background: "#fff", color: "#0A0A0A", border: "2px solid #0A0A0A", boxShadow: "5px 5px 0px 0px #0A0A0A" }}>
                <ArrowLeft size={16} /> قُل مرحباً
              </a>
            </div>
          </div>

          <div className="w-full h-[1px] mb-12" style={{ background: "rgba(0,0,0,0.1)" }} />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
            <div className="md:col-span-2">
              <p className="ar-heading text-3xl font-bold inline-block mb-3" style={{ color: "#0A0A0A" }}>أحمد علي<span style={{ color: "#fff" }}>.</span></p>
              <p className="ar-body text-sm leading-relaxed mb-5" style={{ color: "rgba(0,0,0,0.5)", maxWidth: 360 }}>
                إدارة المنتج الرقمي والنمو — بناء منتجات رقمية عالية الأثر وحملات وأنظمة نمو عبر الشرق الأوسط.
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
            <div>
              <h4 className="ar-body text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "#0A0A0A" }}>أقسام العرض</h4>
              <div className="flex flex-col gap-2.5">
                {NAV.map((link) => (
                  <a key={link.id} href={`#${link.id}`} onClick={(e) => go(e, link.id)} className="ar-body text-sm font-medium transition-all duration-200 hover:-translate-x-1" style={{ color: "rgba(0,0,0,0.6)" }}>{link.label}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="ar-body text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "#0A0A0A" }}>تواصل معي</h4>
              <div className="flex flex-col gap-2.5 mb-6">
                <a href="mailto:hello@ahmedali.online" className="ar-body text-sm font-medium transition-all duration-200 hover:-translate-x-1" style={{ color: "rgba(0,0,0,0.6)" }}>hello@ahmedali.online</a>
                <a href="tel:+201011648156" className="text-sm font-medium" style={{ color: "rgba(0,0,0,0.6)", direction: "ltr", textAlign: "right" }}>+20 101 164 8156</a>
                <p className="ar-body text-sm font-medium" style={{ color: "rgba(0,0,0,0.6)" }}>جدة، السعودية</p>
              </div>
              <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="ar-body inline-flex items-center gap-2 h-10 px-5 rounded-full text-xs font-bold transition-all duration-200 hover:-translate-y-1 cursor-pointer" style={{ background: "#0A0A0A", color: "#4FFFB0", border: "2px solid #0A0A0A", boxShadow: "3px 3px 0px 0px rgba(0,0,0,0.2)" }}>
                <ArrowUp size={14} /> الأعلى
              </button>
            </div>
          </div>
        </div>

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

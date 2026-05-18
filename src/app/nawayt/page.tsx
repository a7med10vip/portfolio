"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Heart, BookOpen, Video, MessageCircle, Star, Sparkles,
  Map, Crown, Trophy, Calendar, Clock, Users, User, Home,
  Layers, Sprout, Compass, BarChart3, CreditCard,
  Shield, CheckCircle2, HelpCircle, PenTool, Code2,
  Settings, Globe, Database, Server, Zap,
  Target, ListChecks,
  ChevronLeft, ArrowDown,
  Activity, Quote, Mountain, BookMarked, ScrollText, GraduationCap,
  BadgeCheck, FileText,
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

/* ═══════════ HELPERS (outside main) ═══════════ */

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
        <p className="text-sm max-w-2xl mx-auto ar-body leading-relaxed" style={{ color: light ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

type StackKey = "frontend" | "backend" | "media" | "live" | "ops";

/* ═══════════ MAIN ═══════════ */

export default function NawaytPlan() {
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
          { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.06, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%", once: true } }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  /* ═══ DATA ═══ */

  const transformations: { before: string; after: string; icon: LucideIcon; color: string }[] = [
    { before: "ابني كان متعلّق بمحتوى يوتيوب عشوائي", after: "ابني بقى مستنّي جلسة الأسبوع وبيقلّد البطل", icon: Heart, color: G },
    { before: "ابني ما يعرفش يفرق بين الصحابة", after: "ابني بقى يعرف أبو بكر وعمر وعلي ويحب يعرف أكثر", icon: GraduationCap, color: B },
    { before: "ابني ما يحبش يقرأ بالعربية الفصحى", after: "ابني بقى يفهم الفصحى البسيطة ومفرداته الدينية كبرت", icon: BookOpen, color: P },
    { before: "ابني الصلاة والقرآن بالنسبة له واجب ممل", after: "ابني بقى يحب الصلاة وبيسأل عن الآيات", icon: Star, color: A },
  ];

  const levels: { num: string; title: string; theme: string; sample: string[]; color: string; icon: LucideIcon }[] = [
    {
      num: "L1", title: "المسلم الصغير", theme: "الأخلاق والأذكار",
      sample: ["الصدق", "الأمانة", "بر الوالدين", "أذكار الصباح والمساء"],
      color: G, icon: Sprout,
    },
    {
      num: "L2", title: "أصدقاء النبي", theme: "الصحابة",
      sample: ["أبو بكر الصديق", "عمر بن الخطاب", "عثمان بن عفان", "علي بن أبي طالب"],
      color: B, icon: Users,
    },
    {
      num: "L3", title: "أبطال الإسلام", theme: "شخصيات تاريخية",
      sample: ["خالد بن الوليد", "صلاح الدين", "بلال بن رباح", "أم المؤمنين خديجة"],
      color: P, icon: Crown,
    },
    {
      num: "L4", title: "رحلة الحج", theme: "العبادات والمناسك",
      sample: ["مكة المكرمة", "الكعبة", "الصفا والمروة", "عرفة ومنى"],
      color: A, icon: Mountain,
    },
    {
      num: "L5", title: "قرآني الصغير", theme: "السور القصيرة",
      sample: ["جزء عمّ", "تفسير مبسّط", "حفظ تفاعلي", "تطبيق في الحياة"],
      color: R, icon: BookMarked,
    },
  ];

  const liveFeatures: { title: string; desc: string; icon: LucideIcon }[] = [
    { title: "4 أطفال فقط في الحلقة", desc: "حلقة صغيرة تخلق Bond بين الأطفال — نفس الأصدقاء كل أسبوع، مش غُرَب.", icon: Users },
    { title: "20 دقيقة مركّزة", desc: "مدّة مدروسة لعمر 6–10 — طويلة كفاية للتعمّق، قصيرة كفاية للتركيز.", icon: Clock },
    { title: "أسبوعياً · نفس اليوم والوقت", desc: "كل سبت الساعة 5 — توقّع ثابت يخلق طقس عائلي.", icon: Calendar },
    { title: "مهمة تفاعلية مش درس", desc: "Quiz · مين يفتكر · تحدي الأسبوع · تمثيل موقف. الطفل يحس إنه داخل مغامرة.", icon: Target },
    { title: "ملاحظة معلّمة بعد كل جلسة", desc: "رسالة قصيرة للأم: ابنك شارك / جاوب / أخذ Badge — بناء ثقة وعلاقة.", icon: MessageCircle },
    { title: "Cohort تبدأ كل أسبوعين", desc: "الأم تختار الـ slot عند الاشتراك. الانتظار من 5–14 يوم بس.", icon: Compass },
  ];

  const ageTracks: {
    track: string; range: string; vocab: string; videoLen: string; depth: string; color: string; icon: LucideIcon;
  }[] = [
    {
      track: "Track A", range: "من 6 إلى 7 سنوات",
      vocab: "مفردات بسيطة وجمل قصيرة",
      videoLen: "5–8 دقائق",
      depth: "تركيز على الأخلاق · أسماء الأنبياء · سور قصيرة",
      color: G, icon: Sprout,
    },
    {
      track: "Track B", range: "من 8 إلى 10 سنوات",
      vocab: "فصحى بسيطة بعمق أكبر",
      videoLen: "10–15 دقيقة",
      depth: "حياة الصحابة · تأمّلات في القرآن · نقاش حقيقي",
      color: B, icon: GraduationCap,
    },
  ];

  const characters: { name: string; trait: string; color: string; emoji: string }[] = [
    { name: "ياسين", trait: "الشجاع", color: G, emoji: "🦁" },
    { name: "هدى", trait: "الذكية", color: B, emoji: "💡" },
    { name: "زيد", trait: "المضحك", color: A, emoji: "😄" },
    { name: "ميمونة", trait: "الخجولة", color: P, emoji: "🌙" },
  ];

  const gamification: { feature: string; desc: string; icon: LucideIcon; color: string }[] = [
    {
      feature: "Avatar إسلامي يتطوّر",
      desc: "L1 سجادة صلاة → L2 كوفية أو حجاب → L3 مصحف → L4 كرسي حلقة → L5 لقب 'حافظ صغير'.",
      icon: User, color: G,
    },
    {
      feature: "شهادات قابلة للطباعة",
      desc: "كل Level فيه شهادة بـ QR code يفتح صفحة تحقّق رسمية — الأم تشاركها على إنستجرام = تسويق مجاني.",
      icon: BadgeCheck, color: B,
    },
    {
      feature: "Badges ونقاط",
      desc: "Badge لكل قصة · Badge للحضور · Badge للمشاركة في الـ Live · نقاط تترجم لمكافآت داخل التطبيق.",
      icon: Trophy, color: A,
    },
    {
      feature: "خريطة التقدّم",
      desc: "خريطة مرسومة للـ 5 Levels — الطفل يشوف فين هو ومحدد فين هيوصل. visual progression بيحفّز.",
      icon: Map, color: P,
    },
    {
      feature: "صندوق الكنوز",
      desc: "كل أسبوع يفتح كنز فيه: ورقة تلوين، فيديو هدية، قصة قصيرة، أو تحدي مع الأم.",
      icon: Sparkles, color: R,
    },
    {
      feature: "حلقات موسمية",
      desc: "رحلة رمضان · أبطال الحج · قصص الأنبياء في عاشوراء — تيجي تلقائي وتجدّد التعلّق.",
      icon: Calendar, color: G,
    },
  ];

  const dashboardCards: { title: string; desc: string; icon: LucideIcon }[] = [
    { title: "آخر جلسة حضرها", desc: "تاريخ ووقت الجلسة + اللي اتعلّمه فيها", icon: Activity },
    { title: "Level الحالي", desc: "مكان الطفل في الـ Journey + شريط التقدّم", icon: Layers },
    { title: "Badges المكتسبة", desc: "كل البادجات اللي خدها مع تاريخ الإنجاز", icon: Trophy },
    { title: "ملاحظة المعلّمة", desc: "رسالة قصيرة بعد كل جلسة Live", icon: MessageCircle },
    { title: "تقرير شهري PDF", desc: "يتبعت على واتساب — الأم تشاركه مع الأب والجدّة", icon: FileText },
    { title: "جدول الجلسات القادمة", desc: "الـ 4 جلسات الجاية مع مواعيدها وروابطها", icon: Calendar },
  ];

  const tiers: {
    name: string; price: string; period: string; tagline: string;
    color: string; featured?: boolean;
    includes: string[]; missing?: string[];
  }[] = [
    {
      name: "Light", price: "79", period: "ريال / شهر",
      tagline: "للأم اللي عاوزة تجرّب المحتوى",
      color: P,
      includes: [
        "كل المكتبة المسجّلة",
        "أنشطة وملفات PDF للطباعة",
        "خريطة التقدّم وشهادات",
        "لطفل واحد",
      ],
      missing: ["جلسات Live", "Avatar تطوّري", "ملاحظة معلّمة"],
    },
    {
      name: "Core", price: "199", period: "ريال / شهر",
      tagline: "الباقة الأساسية — اللي بتبيع",
      color: G, featured: true,
      includes: [
        "كل اللي في Light",
        "4 جلسات Live شهرياً (4 أطفال)",
        "Avatar إسلامي يتطوّر مع كل Level",
        "ملاحظة معلّمة بعد كل جلسة",
        "تقرير شهري PDF على واتساب",
        "لطفل واحد",
      ],
    },
    {
      name: "Family", price: "349", period: "ريال / شهر",
      tagline: "العائلات اللي عندها أكتر من طفل",
      color: B,
      includes: [
        "كل اللي في Core",
        "حتى 3 أطفال على الحساب نفسه",
        "كل طفل له Avatar وLevel وShahada مستقلين",
        "كل طفل في Cohort مناسبة لعمره",
        "تقارير منفصلة لكل طفل",
      ],
    },
  ];

  /* ═══ SITEMAP ROUTES ═══ */

  const publicRoutes: { code: string; route: string; note: string; icon: LucideIcon }[] = [
    { code: "P01", route: "/", note: "الصفحة الرئيسية — العرض، التحوّل المتوقّع، CTA", icon: Home },
    { code: "P02", route: "/about", note: "عن نَوِيت — الفكرة، الفريق، الشيخ المراجع", icon: Users },
    { code: "P03", route: "/how-it-works", note: "آلية العمل — Levels + Live + المكافآت", icon: ListChecks },
    { code: "P04", route: "/pricing", note: "الباقات الثلاث + الباقات الموسمية", icon: CreditCard },
    { code: "P05", route: "/sample", note: "قصة مجانية كاملة — تجربة قبل الاشتراك", icon: Video },
    { code: "P06", route: "/contact", note: "تواصل مع الفريق + واتساب", icon: MessageCircle },
    { code: "P07", route: "/faq", note: "أسئلة شائعة بـ accordion", icon: HelpCircle },
  ];

  const parentRoutes: { code: string; route: string; note: string; icon: LucideIcon }[] = [
    { code: "M01", route: "/dashboard", note: "نظرة عامة على كل الأطفال + التقارير", icon: BarChart3 },
    { code: "M02", route: "/kids", note: "إدارة بروفايلات الأطفال (إضافة/تعديل/حذف)", icon: Users },
    { code: "M03", route: "/schedule", note: "جدول الجلسات القادمة + روابط Zoom", icon: Calendar },
    { code: "M04", route: "/library", note: "تصفّح المكتبة الكاملة", icon: BookOpen },
    { code: "M05", route: "/activities", note: "أنشطة قابلة للطباعة + تلوين", icon: PenTool },
    { code: "M06", route: "/reports", note: "التقارير الشهرية + التقدّم", icon: FileText },
    { code: "M07", route: "/billing", note: "الاشتراك، الفواتير، الترقية", icon: CreditCard },
  ];

  const kidRoutes: { code: string; route: string; note: string; icon: LucideIcon }[] = [
    { code: "K01", route: "/me", note: "Avatar الطفل + اسمه + Level الحالي", icon: User },
    { code: "K02", route: "/journey", note: "خريطة الـ 5 Levels — أين أنا؟ أين هدفي؟", icon: Map },
    { code: "K03", route: "/watch/[id]", note: "مشغّل الفيديو + أنشطة بعد المشاهدة", icon: Video },
    { code: "K04", route: "/badges", note: "كل البادجات والشهادات", icon: Trophy },
    { code: "K05", route: "/live", note: "صفحة الجلسة المباشرة (لما يكون فيه live)", icon: Zap },
    { code: "K06", route: "/treasure", note: "صندوق الكنوز الأسبوعي", icon: Sparkles },
  ];

  const adminRoutes: { code: string; route: string; note: string; icon: LucideIcon }[] = [
    { code: "A01", route: "/admin/content", note: "إدارة الفيديوهات + الـ Levels", icon: Video },
    { code: "A02", route: "/admin/cohorts", note: "إدارة الـ Cohorts + الجداول", icon: Users },
    { code: "A03", route: "/admin/kids", note: "كل الأطفال + بروفايلاتهم", icon: GraduationCap },
    { code: "A04", route: "/admin/reports", note: "تقارير شاملة وتحليلات", icon: BarChart3 },
    { code: "A05", route: "/admin/sheikh-review", note: "قائمة المحتوى تحت المراجعة الشرعية", icon: Shield },
    { code: "A06", route: "/admin/billing", note: "إدارة الاشتراكات والمدفوعات", icon: CreditCard },
  ];

  /* ═══ TECH STACK ═══ */

  const stack: Record<StackKey, {
    label: string; sub: string; icon: LucideIcon; color: string;
    items: { tech: string; use: string }[];
  }> = {
    frontend: {
      label: "الواجهة الأمامية", sub: "Frontend",
      icon: Code2, color: G,
      items: [
        { tech: "Next.js 15", use: "App Router مع Server Components — أداء عالي وSEO" },
        { tech: "TypeScript", use: "Type Safety من قاعدة البيانات لحد الواجهة" },
        { tech: "Tailwind CSS v4", use: "تصميم سريع وReponsive كامل" },
        { tech: "GSAP + ScrollTrigger", use: "أنميشن سينمائي للـ landing page" },
        { tech: "Lenis", use: "Smooth scroll يحس بطعم Premium" },
        { tech: "next/font", use: "خطوط Tajawal/Cairo للعربي · Zero CLS" },
      ],
    },
    backend: {
      label: "الخدمات الخلفية", sub: "Backend / CMS",
      icon: Database, color: B,
      items: [
        { tech: "Payload 3", use: "CMS مدمج مع Next.js — الفريق يدير المحتوى بنفسه" },
        { tech: "PostgreSQL (Neon)", use: "قاعدة بيانات سحابية — Frankfurt للسعودية" },
        { tech: "Drizzle ORM", use: "Type-safe SQL · أداء عالي" },
        { tech: "Better Auth", use: "تسجيل دخول بـ OTP عبر Unifonic" },
        { tech: "Inngest", use: "وظائف خلفية: تذكيرات، تقارير، فلترة" },
      ],
    },
    media: {
      label: "الفيديوهات والملفات", sub: "Media",
      icon: Video, color: P,
      items: [
        { tech: "Bunny.net", use: "Streaming الفيديوهات — سعر مناسب للسوق" },
        { tech: "Cloudinary", use: "صور Avatars وأنشطة وملفات الطباعة" },
        { tech: "AI Video Generation", use: "إنتاج الفيديوهات الكرتونية بالذكاء الاصطناعي" },
        { tech: "PDF Generation", use: "شهادات قابلة للطباعة بـ QR verify" },
      ],
    },
    live: {
      label: "الجلسات والتواصل", sub: "Live & Comms",
      icon: MessageCircle, color: A,
      items: [
        { tech: "Zoom (V1)", use: "الجلسات المباشرة — موثوق ومألوف للأهالي" },
        { tech: "WhatsApp Business API", use: "تذكيرات الجلسات، روابط Zoom، تقارير شهرية" },
        { tech: "Unifonic", use: "OTP وSMS — مزود سعودي معتمد" },
        { tech: "Resend", use: "الإيميلات — تأكيدات الاشتراك والفواتير" },
        { tech: "LiveKit / Daily.co (V2)", use: "نقل الـ Live جوّا المنصة بعد ما تتثبت" },
      ],
    },
    ops: {
      label: "التشغيل والمراقبة", sub: "Ops",
      icon: Server, color: R,
      items: [
        { tech: "Vercel", use: "استضافة Frankfurt — أقل latency للسعودية" },
        { tech: "Tap Payments", use: "بوابة دفع سعودية + احتساب VAT تلقائي" },
        { tech: "Plausible Analytics", use: "تحليلات بدون كوكيز · متوافقة PDPL" },
        { tech: "Sentry", use: "تتبع الأخطاء · مراقبة الأداء" },
        { tech: "GitHub Actions", use: "CI/CD: لينت + بناء + lighthouse على كل PR" },
      ],
    },
  };

  const stackEntries = Object.entries(stack) as [StackKey, (typeof stack)[StackKey]][];
  const activeStackData = stack[activeStack];

  /* ═══ BUILD PHASES ═══ */

  const phases: { num: number; label: string; weeks: string; color: string; deliverables: string[] }[] = [
    {
      num: 1, label: "الاكتشاف والمحتوى", weeks: "أسبوع 1–2", color: G,
      deliverables: [
        "ورشة عمل مع الملاك لتحديد النبرة والشخصيات",
        "كتابة سكربتات أول 10 قصص (Level 1)",
        "تجهيز هوية البراند (لوجو، ألوان، خطوط)",
        "اختيار أول 4 أصوات (Voice Over) وعمل تجارب",
      ],
    },
    {
      num: 2, label: "نظام التصميم والـ Templates", weeks: "أسبوع 3–4", color: B,
      deliverables: [
        "Design System كامل في Figma",
        "تصميم كل صفحات الموقع العام (7 صفحات)",
        "تصميم Parent Dashboard (7 صفحات)",
        "تصميم Kid App (6 صفحات)",
        "تصميم Admin (6 صفحات)",
        "اعتماد التصاميم النهائية",
      ],
    },
    {
      num: 3, label: "بناء الواجهة", weeks: "أسبوع 5–6", color: P,
      deliverables: [
        "بناء الموقع العام Next.js",
        "بناء Parent Dashboard",
        "بناء Kid App مع Avatar System",
        "بناء Admin",
        "ربط RTL ودعم العربي كامل",
      ],
    },
    {
      num: 4, label: "النظام الخلفي والدفع", weeks: "أسبوع 6–7", color: A,
      deliverables: [
        "Payload CMS + قاعدة البيانات",
        "ربط Tap Payments + احتساب VAT",
        "نظام الـ Cohorts والـ Live scheduling",
        "ربط WhatsApp Business API للتذكيرات",
        "نظام مراجعة الشيخ (queue + موافقة)",
      ],
    },
    {
      num: 5, label: "الإنتاج والإطلاق", weeks: "أسبوع 8", color: R,
      deliverables: [
        "إنتاج أول 10 فيديوهات بالذكاء الاصطناعي",
        "مراجعة شرعية لكل المحتوى",
        "اختبار شامل على المتصفحات والأجهزة",
        "إعداد Production على Vercel",
        "تدريب الفريق على لوحة التحكم",
        "إطلاق Beta لـ 10–15 عائلة + جمع feedback",
      ],
    },
  ];

  /* ═══ RENDER ═══ */

  return (
    <ArabicTailProcessor>
      <div ref={ref} style={{ background: "#fff", color: D, fontFamily: "'Ahmed Sans', sans-serif" }}>

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
            <div className="ph-hero opacity-0 text-center mb-6">
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold"
                style={{ background: D, color: G, border: `1px solid ${D}` }}
              >
                <Sparkles size={12} /> استراتيجية وعرض تقني · للملاك
              </span>
            </div>

            <div className="ph-hero opacity-0 text-center mb-3">
              <h1 className="ar-heading" style={{ fontSize: "clamp(56px, 12vw, 140px)", lineHeight: 1.1, color: D, letterSpacing: "-0.02em" }}>
                نَوِيت
              </h1>
            </div>

            <div className="ph-hero opacity-0 text-center mb-3">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold"
                style={{ background: `${A}12`, color: A, border: `1px solid ${A}30`, fontFamily: "var(--font-instrument), serif", fontStyle: "italic" }}
              >
                * اسم مبدئي للنقاش — قابل للتغيير
              </span>
            </div>

            <div className="ph-hero opacity-0 text-center mb-3 max-w-2xl">
              <p className="ar-body text-base md:text-lg leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>
                قصص إسلامية تربّي. عربية تنمو. أطفال يحبّون التعلّم.
              </p>
            </div>

            <div className="ph-hero opacity-0 text-center mb-9 max-w-xl">
              <p className="text-[12px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>
                منصة قصص إسلامية تفاعلية للأطفال (6–10 سنوات) · السوق السعودي
              </p>
            </div>

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
                  { n: "4", l: "أطفال / جلسة" },
                  { n: "4", l: "جلسات شهرياً" },
                  { n: "5", l: "Levels مفتوحة" },
                  { n: "2", l: "مساران للعمر" },
                  { n: "20د", l: "مدّة الجلسة" },
                ].map((s, i) => (
                  <div
                    key={s.l}
                    className="flex-1 flex flex-col items-center justify-center py-5 px-2 relative"
                    style={{ borderLeft: i > 0 ? "1px solid #F0F0F0" : "none" }}
                  >
                    <span className="ar-heading" style={{ fontSize: 26, lineHeight: 1, color: D }}>{s.n}</span>
                    <span className="text-[9px] font-bold mt-1 ar-body text-center" style={{ color: "rgba(0,0,0,0.4)" }}>{s.l}</span>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-t-full" style={{ background: G }} />
                  </div>
                ))}
              </div>
            </div>

            <div className="ph-hero opacity-0 flex flex-wrap justify-center gap-3 mb-10">
              <a
                href="#why"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold"
                style={{
                  background: G, color: D, border: `2px solid ${D}`,
                  boxShadow: `4px 4px 0px 0px ${D}`, textDecoration: "none",
                }}
              >
                ابدأ من هنا <ArrowDown size={14} />
              </a>
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

        {/* ═══ 2. THE WHY — MOM TRANSFORMATION ═══ */}
        <section id="why" className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-[11px] font-bold mb-3" style={{ color: G, letterSpacing: "0.06em" }}>
                01 · لماذا ندفع؟
              </p>
              <h2 className="ar-heading mb-5" style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.4, color: D }}>
                الأم لا تشتري قصصاً. هي تشتري <span style={{ color: G }}>تحوّلاً</span>.
              </h2>
              <p className="text-[15px] leading-[1.9] ar-body" style={{ color: "rgba(0,0,0,0.6)" }}>
                الأم في السعودية اليوم خايفة من محتوى يوتيوب العشوائي، عاوزة ابنها يتعلّم العربية، ونفسها يتعلّق بالدين بدون تلقين ممل. بعد 60 يوم على نَوِيت، الأم لازم تقدر تقول الجملة دي بنفسها — وده اللي بنبيعه.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ph-stagger">
              {transformations.map((t) => (
                <div
                  key={t.before}
                  className="ph-item rounded-[20px] p-7"
                  style={{ background: "#fff", border: `1px solid ${t.color}25`, boxShadow: `3px 3px 0px 0px ${t.color}15` }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${t.color}15` }}>
                      <t.icon size={20} color={t.color} />
                    </div>
                    <p className="text-[10px] font-bold ar-body" style={{ color: t.color }}>قبل ↓ بعد ↑</p>
                  </div>

                  <div className="rounded-[12px] p-4 mb-3" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
                    <p className="text-[10px] font-bold ar-body mb-1" style={{ color: "rgba(0,0,0,0.4)" }}>
                      قبل
                    </p>
                    <p className="text-[13px] ar-body" style={{ color: "rgba(0,0,0,0.7)" }}>
                      {t.before}
                    </p>
                  </div>

                  <div className="rounded-[12px] p-4" style={{ background: `${t.color}08`, border: `1px solid ${t.color}30` }}>
                    <p className="text-[10px] font-bold ar-body mb-1" style={{ color: t.color }}>
                      بعد 60 يوم
                    </p>
                    <p className="text-[13px] ar-body font-bold" style={{ color: D }}>
                      {t.after}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-[18px] p-6 flex items-center gap-4" style={{ background: `${G}08`, border: `1px solid ${G}25` }}>
              <Quote size={20} color={G} className="flex-shrink-0" />
              <p className="text-[13px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.7)" }}>
                ده الـ Spine التسويقي. كل صفحة Hero · كل إعلان · كل تقرير شهري للأم بيرجع للجملة دي:{" "}
                <strong style={{ color: D }}>&ldquo;ابني بقى …&rdquo;</strong>
              </p>
            </div>
          </div>
        </section>

        {/* ═══ 3. PRODUCT MODEL — HYBRID ═══ */}
        <section className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-[11px] font-bold mb-3" style={{ color: G, letterSpacing: "0.06em" }}>
                02 · النموذج
              </p>
              <h2 className="ar-heading mb-5" style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.4, color: D }}>
                رحلة تتدرّج. مكتبة تتصفّح. <span style={{ color: G }}>الاثنان معاً</span>.
              </h2>
              <p className="text-[15px] leading-[1.9] ar-body" style={{ color: "rgba(0,0,0,0.6)" }}>
                الـ Journey (المستويات المتدرّجة) هي العمود الفقري — الطفل يبدأ من Level 1 ويتدرّج زي مدرسة. الـ Library (المكتبة) هي الباب الجانبي — للمحتوى الموسمي والقصص اللي بيختارها بنفسه.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ph-stagger">
              <div
                className="ph-item rounded-[24px] p-8 relative overflow-hidden"
                style={{ background: "#fff", border: `2px solid ${G}`, boxShadow: `4px 4px 0px 0px ${D}` }}
              >
                <span
                  className="absolute -top-2 left-4 ar-heading select-none"
                  style={{ fontSize: 110, color: `${G}12`, lineHeight: 1 }}
                >
                  01
                </span>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${G}18` }}>
                      <Compass size={22} color={G} />
                    </div>
                    <p className="text-[10px] font-bold ar-body" style={{ color: G }}>العمود الفقري</p>
                  </div>
                  <h3 className="ar-heading text-2xl mb-3" style={{ color: D }}>الرحلة (Journey)</h3>
                  <p className="text-[13px] ar-body leading-[1.9] mb-5" style={{ color: "rgba(0,0,0,0.65)" }}>
                    الطفل يبدأ من Level 1 ويتدرّج. كل Level فيه فيديوهات + جلسات Live + أنشطة + شهادة. الطفل يحس بالتطوّر، الأم تشوف نتيجة، الـ Gamification طبيعي.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Levels مرتّبة", "تقدّم واضح", "شهادات", "تعلّق قوي"].map((tag) => (
                      <span key={tag} className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ background: `${G}15`, color: G }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="ph-item rounded-[24px] p-8 relative overflow-hidden"
                style={{ background: "#fff", border: "1px solid #EBEBEB", boxShadow: `4px 4px 0px 0px ${B}25` }}
              >
                <span
                  className="absolute -top-2 left-4 ar-heading select-none"
                  style={{ fontSize: 110, color: `${B}12`, lineHeight: 1 }}
                >
                  02
                </span>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${B}15` }}>
                      <BookOpen size={22} color={B} />
                    </div>
                    <p className="text-[10px] font-bold ar-body" style={{ color: B }}>الباب الجانبي</p>
                  </div>
                  <h3 className="ar-heading text-2xl mb-3" style={{ color: D }}>المكتبة (Library)</h3>
                  <p className="text-[13px] ar-body leading-[1.9] mb-5" style={{ color: "rgba(0,0,0,0.65)" }}>
                    قصص حرّة الاختيار + المحتوى الموسمي (رمضان، الحج، عاشوراء). الأم بتفتح للطفل قصة بعينها لما يحب، وفي رمضان يدخل رحلة موسمية كاملة. مرونة بدون فقدان البوصلة.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["محتوى موسمي", "اختيار حرّ", "قصص قصيرة", "تكميلية"].map((tag) => (
                      <span key={tag} className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ background: `${B}12`, color: B }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 4. THE FIVE LEVELS ═══ */}
        <section className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead eyebrow="03 · المسار الكامل" subtitle="خمسة مستويات متدرّجة. الطفل يبدأ من L1 ويتخرّج بشهادات بعد كل واحد. ده الإطار المبدئي للمحتوى.">
              المستويات <span style={{ color: G }}>الخمسة</span>
            </SectionHead>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 ph-stagger">
              {levels.map((l) => (
                <div
                  key={l.num}
                  className="ph-item rounded-[20px] p-6 relative overflow-hidden transition-all hover:-translate-y-1"
                  style={{ background: "#fff", border: "1px solid #EBEBEB", boxShadow: `3px 3px 0px 0px ${l.color}25` }}
                >
                  <span
                    className="absolute -top-3 -left-2 ar-heading select-none pointer-events-none"
                    style={{ fontSize: 86, color: `${l.color}10`, lineHeight: 1 }}
                  >
                    {l.num}
                  </span>
                  <div className="relative z-10">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${l.color}15` }}>
                      <l.icon size={20} color={l.color} />
                    </div>
                    <p className="text-[10px] font-bold ar-body mb-1" style={{ color: l.color }}>{l.theme}</p>
                    <h3 className="ar-heading text-lg mb-3" style={{ color: D }}>
                      {l.title}
                    </h3>
                    <div className="flex flex-col gap-1.5">
                      {l.sample.map((s) => (
                        <div key={s} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: l.color }} />
                          <span className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.6)" }}>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[16px] p-5 flex items-start gap-3" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
              <ListChecks size={16} color={G} className="flex-shrink-0 mt-0.5" />
              <p className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.65)" }}>
                <strong style={{ color: D }}>ملاحظة:</strong> ده الإطار المبدئي. الترتيب الدقيق + عدد القصص في كل Level + التفاصيل الشرعية — قرار للملاك والشيخ المراجع. التصميم التقني يستوعب أي Level structure.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ 5. LIVE PREMIUM (DARK 1/2) ═══ */}
        <section className="ph-slide opacity-0" style={{ padding: "120px 24px", background: D, position: "relative", overflow: "hidden" }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
          />
          <div
            className="absolute top-0 left-0 w-[600px] h-[400px] pointer-events-none"
            style={{ background: `radial-gradient(ellipse, ${G}10 0%, transparent 60%)` }}
          />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-[11px] font-bold mb-3" style={{ color: G, letterSpacing: "0.06em" }}>
                04 · الـ Premium
              </p>
              <h2 className="ar-heading mb-5" style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.4, color: "#fff" }}>
                4 أطفال فقط. <span style={{ color: G }}>الميزة اللي محدّش بيعملها.</span>
              </h2>
              <p className="text-[14px] ar-body leading-[1.9]" style={{ color: "rgba(255,255,255,0.65)" }}>
                اليوتيوب فيه كل القصص ببلاش. الـ Live بـ 4 أطفال هو اللي بيبرّر إن الأم تدفع أصلاً. حلقة حصرية، تفاعل عالي، طفل بيحس إنه مميّز، وأم بتحس إنها بتشتري حاجة شخصية.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 ph-stagger">
              {liveFeatures.map((f) => (
                <div
                  key={f.title}
                  className="ph-item rounded-[18px] p-6"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${G}15` }}>
                    <f.icon size={18} color={G} />
                  </div>
                  <h4 className="ar-heading text-lg mb-2" style={{ color: "#fff" }}>
                    {f.title}
                  </h4>
                  <p className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>

            <p
              className="text-center"
              style={{ color: G, fontSize: "clamp(18px, 2vw, 26px)", lineHeight: 1.5 }}
            >
              &ldquo;الجلسة مش درس. هي مهمة تفاعلية يدخلها الطفل كأنّه داخل مغامرة.&rdquo;
            </p>
          </div>
        </section>

        {/* ═══ 6. AGE TRACKS ═══ */}
        <section className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#fff" }}>
          <div className="max-w-5xl mx-auto">
            <SectionHead eyebrow="05 · المساران" subtitle="فرق كبير بين طفل عمره 6 وطفل عمره 10. مسارين مختلفين بنفس البنية لكن بمفردات وعمق مختلفين.">
              مسار <span style={{ color: G }}>لكل عمر</span>
            </SectionHead>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ph-stagger">
              {ageTracks.map((t) => (
                <div
                  key={t.track}
                  className="ph-item rounded-[24px] p-8"
                  style={{ background: "#fff", border: `2px solid ${t.color}30`, boxShadow: `4px 4px 0px 0px ${t.color}15` }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${t.color}15` }}>
                        <t.icon size={22} color={t.color} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold ar-body" style={{ color: t.color }}>{t.track}</p>
                        <h3 className="ar-heading text-xl" style={{ color: D }}>{t.range}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="rounded-[12px] p-4" style={{ background: "#FAFAFA" }}>
                      <p className="text-[10px] font-bold ar-body mb-1" style={{ color: t.color }}>المفردات</p>
                      <p className="text-[13px] ar-body" style={{ color: "rgba(0,0,0,0.7)" }}>{t.vocab}</p>
                    </div>
                    <div className="rounded-[12px] p-4" style={{ background: "#FAFAFA" }}>
                      <p className="text-[10px] font-bold ar-body mb-1" style={{ color: t.color }}>مدّة الفيديو</p>
                      <p className="text-[13px] ar-body" style={{ color: "rgba(0,0,0,0.7)" }}>{t.videoLen}</p>
                    </div>
                    <div className="rounded-[12px] p-4" style={{ background: "#FAFAFA" }}>
                      <p className="text-[10px] font-bold ar-body mb-1" style={{ color: t.color }}>عمق المحتوى</p>
                      <p className="text-[13px] ar-body" style={{ color: "rgba(0,0,0,0.7)" }}>{t.depth}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[16px] p-5 flex items-start gap-3" style={{ background: `${A}08`, border: `1px solid ${A}25` }}>
              <HelpCircle size={16} color={A} className="flex-shrink-0 mt-0.5" />
              <p className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.7)" }}>
                <strong style={{ color: A }}>قرار للملاك:</strong> هل في الـ Live، نخلط البنين والبنات في نفس الـ Cohort؟ الافتراضي = خلط (مناسب للعمر 6–10). فصل البنات في Cohort مستقلة ميزة ممكن تتفعّل لاحقاً لو الأمهات طلبت.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ 7. WORLD & CHARACTERS ═══ */}
        <section className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-[11px] font-bold mb-3" style={{ color: G, letterSpacing: "0.06em" }}>
                06 · العالم القصصي
              </p>
              <h2 className="ar-heading mb-5" style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.4, color: D }}>
                الأطفال يتعلّقون بـ<span style={{ color: G }}>شخصيات</span>، مش بفيديوهات.
              </h2>
              <p className="text-[15px] leading-[1.9] ar-body" style={{ color: "rgba(0,0,0,0.6)" }}>
                لما الطفل يحب البطل ويبقى مستنّيه كل أسبوع، الـ Retention بيقفز. اقتراح: 4 شخصيات أطفال يدخلون مغامرات دينية مع بعض، كل شخصية لها ميزة تعكس أحد قيم الإسلام.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ph-stagger">
              {characters.map((c) => (
                <div
                  key={c.name}
                  className="ph-item rounded-[20px] p-6 text-center"
                  style={{ background: "#fff", border: `1px solid ${c.color}30`, boxShadow: `3px 3px 0px 0px ${c.color}15` }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: `${c.color}15`, fontSize: 32 }}
                  >
                    {c.emoji}
                  </div>
                  <h4 className="ar-heading text-xl mb-1" style={{ color: D }}>{c.name}</h4>
                  <p className="text-[11px] font-bold ar-body" style={{ color: c.color }}>{c.trait}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[16px] p-5 flex items-start gap-3" style={{ background: `${G}08`, border: `1px solid ${G}25` }}>
              <Sparkles size={16} color={G} className="flex-shrink-0 mt-0.5" />
              <p className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.7)" }}>
                الأسماء والشخصيات دي مقترحات للنقاش. التصميم النهائي يستوعب أي توجّه — 4 شخصيات أساسية + شخصيات ضيف لكل مغامرة هو الإطار التقني.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ 8. GAMIFICATION ═══ */}
        <section className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead eyebrow="07 · الإدمان الإيجابي" subtitle="الطفل يدخل المنصة لأنه عاوز يكسب البادج، يطوّر Avatar، يفتح الكنز. ده اللي بيخلّيه يطلب الجلسة قبل ما الأم تفكّر تعمله reminder.">
              نظام <span style={{ color: G }}>المكافآت</span>
            </SectionHead>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ph-stagger">
              {gamification.map((g) => (
                <div
                  key={g.feature}
                  className="ph-item rounded-[20px] p-6"
                  style={{ background: "#fff", border: "1px solid #EBEBEB", boxShadow: `3px 3px 0px 0px ${g.color}15` }}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${g.color}12` }}>
                    <g.icon size={20} color={g.color} />
                  </div>
                  <h4 className="ar-heading text-base mb-2" style={{ color: D }}>{g.feature}</h4>
                  <p className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>
                    {g.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 9. MOM DASHBOARD ═══ */}
        <section className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-[11px] font-bold mb-3" style={{ color: G, letterSpacing: "0.06em" }}>
                08 · لوحة الأم
              </p>
              <h2 className="ar-heading mb-5" style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.4, color: D }}>
                من غير لوحة، الأم <span style={{ color: G }}>تشترك شهر وتمشي</span>.
              </h2>
              <p className="text-[15px] leading-[1.9] ar-body" style={{ color: "rgba(0,0,0,0.6)" }}>
                الأم لازم تشوف النتيجة بعينها — مش تخمّن. لوحة بسيطة تديها الدليل: ابنك في Level 2، أخد 5 بادجات، حضر 7 جلسات. التقرير الشهري PDF يتبعت على واتساب فتشاركه مع الأب والجدّة = تسويق مجاني.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ph-stagger">
              {dashboardCards.map((c) => (
                <div
                  key={c.title}
                  className="ph-item rounded-[16px] p-5 flex items-start gap-4"
                  style={{ background: "#fff", border: "1px solid #EBEBEB" }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${G}10` }}>
                    <c.icon size={16} color={G} />
                  </div>
                  <div>
                    <h4 className="ar-heading text-sm mb-1" style={{ color: D }}>{c.title}</h4>
                    <p className="text-[11px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>
                      {c.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 10. PRICING TIERS ═══ */}
        <section className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead eyebrow="09 · الباقات" subtitle="ثلاث طبقات تدخل من بوابات مختلفة. الـ Family هي الـ Moat — العائلة السعودية فيها أكتر من طفل.">
              التسعير <span style={{ color: G }}>المقترح</span>
            </SectionHead>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ph-stagger mb-8">
              {tiers.map((t) => (
                <div
                  key={t.name}
                  className="ph-item rounded-[24px] p-7 relative"
                  style={{
                    background: t.featured ? D : "#fff",
                    border: t.featured ? `2px solid ${D}` : "1px solid #EBEBEB",
                    boxShadow: t.featured ? `5px 5px 0px 0px ${G}` : `3px 3px 0px 0px ${t.color}15`,
                  }}
                >
                  {t.featured && (
                    <div
                      className="absolute -top-3 right-1/2 translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold"
                      style={{ background: G, color: D, border: `1.5px solid ${D}` }}
                    >
                      <Star size={10} /> الأكثر اختياراً
                    </div>
                  )}

                  <p className="text-[10px] font-bold mb-2" style={{ color: t.featured ? G : t.color }}>
                    {t.name}
                  </p>
                  <p className="text-[11px] ar-body mb-5" style={{ color: t.featured ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)" }}>
                    {t.tagline}
                  </p>

                  <div className="mb-6">
                    <span className="ar-heading" style={{ fontSize: 56, color: t.featured ? "#fff" : D, lineHeight: 1 }}>
                      {t.price}
                    </span>
                    <span className="text-[13px] ar-body mr-2" style={{ color: t.featured ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)" }}>
                      {t.period}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 mb-4">
                    {t.includes.map((i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={14} color={t.featured ? G : t.color} className="flex-shrink-0 mt-0.5" />
                        <span className="text-[12px] ar-body leading-relaxed" style={{ color: t.featured ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.7)" }}>
                          {i}
                        </span>
                      </div>
                    ))}
                  </div>

                  {t.missing && t.missing.length > 0 && (
                    <div className="pt-4" style={{ borderTop: t.featured ? "1px solid rgba(255,255,255,0.1)" : "1px solid #F0F0F0" }}>
                      {t.missing.map((m) => (
                        <div key={m} className="flex items-start gap-2 mb-1">
                          <span style={{ color: t.featured ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)", fontSize: 11 }}>—</span>
                          <span className="text-[11px] ar-body" style={{ color: t.featured ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}>
                            {m}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              <div className="rounded-[16px] p-5 flex items-start gap-3" style={{ background: `${G}08`, border: `1px solid ${G}25` }}>
                <Calendar size={16} color={G} className="flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[12px] ar-body font-bold mb-1" style={{ color: D }}>خصم سنوي · شهرين هدية</p>
                  <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.6)" }}>
                    Core سنوياً = 1,990 ريال (بدل 2,388) · Family سنوياً = 3,490 ريال (بدل 4,188).
                  </p>
                </div>
              </div>
              <div className="rounded-[16px] p-5 flex items-start gap-3" style={{ background: `${A}08`, border: `1px solid ${A}25` }}>
                <Sparkles size={16} color={A} className="flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[12px] ar-body font-bold mb-1" style={{ color: D }}>باقات موسمية · دفعة واحدة</p>
                  <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.6)" }}>
                    رحلة رمضان · أبطال الحج · كل واحدة 99 ريال للمحتوى الموسمي. funnel للتحويل لاشتراك Core.
                  </p>
                </div>
              </div>
            </div>

            {/* Multi-kid family scenario */}
            <div className="rounded-[24px] overflow-hidden" style={{ border: `2px solid ${B}25`, boxShadow: `4px 4px 0px 0px ${B}15` }}>
              <div className="px-7 py-5 flex items-center gap-3" style={{ background: `${B}08`, borderBottom: `1px solid ${B}20` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${B}15` }}>
                  <Users size={20} color={B} />
                </div>
                <div>
                  <p className="text-[10px] font-bold ar-body" style={{ color: B }}>السيناريو العائلي</p>
                  <h3 className="ar-heading text-xl" style={{ color: D }}>عندك أكتر من طفل؟ Family هي الأذكى</h3>
                </div>
              </div>

              <div className="p-7">
                <p className="text-[13px] ar-body leading-[1.9] mb-7" style={{ color: "rgba(0,0,0,0.65)" }}>
                  العائلة السعودية فيها معظم الأحيان أكتر من طفل في عمر 6–10. باقة Family واحدة تغطّي الكل بسعر أقل من اشتراكين منفصلين. كل طفل في Cohort مناسبة لعمره، له Avatar مستقل، ويتدرّج في Level خاص به. الأم بتدير الكل من Dashboard واحد بتقارير منفصلة.
                </p>

                {/* 3 scenario cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                  {[
                    {
                      kids: "طفل واحد",
                      tier: "Core",
                      total: "199",
                      perKid: "199",
                      saving: null,
                      color: G,
                      icon: User,
                      example: "ولد 8 سنوات في Track B",
                    },
                    {
                      kids: "طفلين",
                      tier: "Family",
                      total: "349",
                      perKid: "175",
                      saving: "12% أقل من اشتراكين Core",
                      color: B,
                      icon: Users,
                      example: "ولد 7 (Track A) + بنت 9 (Track B)",
                    },
                    {
                      kids: "ثلاثة أطفال",
                      tier: "Family",
                      total: "349",
                      perKid: "116",
                      saving: "41% أقل من 3 اشتراكات Core",
                      color: P,
                      icon: Users,
                      example: "أعمار 6 و 8 و 10 — كل واحد في مساره",
                    },
                  ].map((s, i) => (
                    <div
                      key={s.kids}
                      className="rounded-[16px] p-5 relative"
                      style={{
                        background: i === 2 ? `${P}06` : "#fff",
                        border: `1.5px solid ${s.color}30`,
                        boxShadow: `3px 3px 0px 0px ${s.color}15`,
                      }}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${s.color}15` }}>
                          <s.icon size={16} color={s.color} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold ar-body" style={{ color: s.color }}>{s.kids}</p>
                          <p className="text-[10px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>باقة {s.tier}</p>
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-[10px] ar-body mb-1" style={{ color: "rgba(0,0,0,0.5)" }}>إجمالي الشهر</p>
                        <p>
                          <span className="ar-heading" style={{ fontSize: 36, color: D, lineHeight: 1 }}>{s.total}</span>
                          <span className="text-[12px] ar-body mr-1" style={{ color: "rgba(0,0,0,0.5)" }}>ريال</span>
                        </p>
                      </div>

                      <div className="rounded-[10px] p-3 mb-3" style={{ background: `${s.color}10` }}>
                        <p className="text-[10px] ar-body mb-0.5" style={{ color: "rgba(0,0,0,0.5)" }}>للطفل الواحد</p>
                        <p>
                          <span className="ar-heading" style={{ fontSize: 22, color: s.color, lineHeight: 1 }}>{s.perKid}</span>
                          <span className="text-[11px] ar-body mr-1" style={{ color: s.color }}>ريال</span>
                        </p>
                      </div>

                      {s.saving && (
                        <div className="flex items-start gap-2 mb-3">
                          <Sparkles size={12} color={s.color} className="flex-shrink-0 mt-0.5" />
                          <span className="text-[10px] ar-body font-bold" style={{ color: s.color }}>{s.saving}</span>
                        </div>
                      )}

                      <p className="text-[10px] ar-body italic" style={{ color: "rgba(0,0,0,0.5)", fontFamily: "var(--font-instrument), serif" }}>
                        مثال: {s.example}
                      </p>
                    </div>
                  ))}
                </div>

                {/* What each kid gets */}
                <div className="rounded-[14px] p-5" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
                  <p className="text-[11px] font-bold ar-body mb-3" style={{ color: D }}>كل طفل يحصل على — حتى لو تحت نفس الحساب:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                    {[
                      "بروفايل وAvatar مستقل",
                      "Level وتقدّم خاص به",
                      "Cohort مناسبة لعمره (Track A أو B)",
                      "شهادات وBadges على اسمه",
                      "ملاحظة معلّمة بعد كل جلسة",
                      "تقرير شهري منفصل في Dashboard الأم",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <CheckCircle2 size={13} color={B} className="flex-shrink-0 mt-0.5" />
                        <span className="text-[12px] ar-body" style={{ color: "rgba(0,0,0,0.65)" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 11. SITEMAP ═══ */}
        <section className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead eyebrow="10 · هيكل المنصّة" subtitle="أربع تطبيقات في منصّة واحدة: موقع عام · لوحة الأم · تطبيق الطفل · لوحة الإدارة.">
              خريطة <span style={{ color: G }}>الموقع</span>
            </SectionHead>

            <div className="ph-stagger">
              <div className="flex justify-center mb-6">
                <div
                  className="ph-item inline-flex items-center gap-3 px-8 py-4 rounded-full ar-heading text-xl"
                  style={{ background: G, color: D, border: `2px solid ${D}`, boxShadow: `4px 4px 0px 0px ${D}` }}
                >
                  <Globe size={20} />
                  nawayt.com
                </div>
              </div>

              <div className="flex justify-center mb-2">
                <div className="w-[3px] h-8" style={{ background: G }} />
              </div>

              <div className="hidden md:flex justify-center mb-2">
                <div className="h-[3px] rounded-full" style={{ width: "70%", background: `linear-gradient(90deg, ${G}30, ${G}, ${G}30)` }} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {[
                  { label: "الموقع العام", code: `${publicRoutes.length} صفحات`, sub: "Public · مفتوحة للزوّار", icon: Globe, color: G },
                  { label: "لوحة الأم", code: `${parentRoutes.length} صفحات`, sub: "Parent · محمية", icon: BarChart3, color: B },
                  { label: "تطبيق الطفل", code: `${kidRoutes.length} شاشات`, sub: "Kid · واجهة مرحة", icon: Heart, color: P },
                  { label: "لوحة الإدارة", code: `${adminRoutes.length} شاشات`, sub: "Admin · للفريق", icon: Settings, color: A },
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
                      <p className="ar-heading text-base mb-1" style={{ color: D }}>{b.label}</p>
                      <p className="text-[10px] ar-body mb-2" style={{ color: "rgba(0,0,0,0.5)" }}>{b.sub}</p>
                      <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold" style={{ background: `${b.color}12`, color: b.color }}>
                        {b.code}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {[
                { title: "11.1 · الموقع العام", routes: publicRoutes, color: G },
                { title: "11.2 · لوحة الأم", routes: parentRoutes, color: B },
                { title: "11.3 · تطبيق الطفل", routes: kidRoutes, color: P },
                { title: "11.4 · لوحة الإدارة", routes: adminRoutes, color: A },
              ].map((group) => (
                <div key={group.title} className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-6 rounded-full" style={{ background: group.color }} />
                    <h3 className="ar-heading text-xl">{group.title}</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {group.routes.map((r) => (
                      <div
                        key={r.code}
                        className="rounded-[14px] p-4 flex items-start gap-3"
                        style={{ background: "#fff", border: `1px solid ${group.color}25` }}
                      >
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${group.color}10` }}>
                          <r.icon size={14} color={group.color} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: D, color: G, fontFamily: "system-ui" }}>
                              {r.code}
                            </span>
                            <span className="text-[12px] font-bold" style={{ color: D, fontFamily: "ui-monospace, Menlo, monospace" }}>
                              {r.route}
                            </span>
                          </div>
                          <p className="text-[10px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>
                            {r.note}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 12. TECH STACK ═══ */}
        <section className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead eyebrow="11 · الـ Stack التقني" subtitle="حزمة حديثة وموثوقة. كل اختيار له سبب — مش fashion.">
              الأدوات <span style={{ color: G }}>والتقنيات</span>
            </SectionHead>

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
                    <span className="ar-body">{group.label}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: isActive ? "rgba(0,0,0,0.15)" : "#F3F4F6", color: isActive ? D : "rgba(0,0,0,0.5)" }}>
                      {group.items.length}
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              className="rounded-[24px] p-8 md:p-10"
              style={{ background: "#fff", border: `1.5px solid ${activeStackData.color}30`, boxShadow: `4px 4px 0px 0px ${activeStackData.color}15` }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${activeStackData.color}18` }}>
                  <activeStackData.icon size={26} color={activeStackData.color} />
                </div>
                <div>
                  <p className="text-[10px] font-bold mb-1" style={{ color: activeStackData.color }}>{activeStackData.sub}</p>
                  <h3 className="ar-heading text-2xl" style={{ color: D }}>{activeStackData.label}</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeStackData.items.map((it) => (
                  <div
                    key={it.tech}
                    className="rounded-[14px] p-4 flex items-start gap-3"
                    style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}
                  >
                    <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2" style={{ background: activeStackData.color }} />
                    <div>
                      <p className="text-[13px] font-bold mb-1" style={{ color: D, fontFamily: "ui-monospace, Menlo, monospace" }}>
                        {it.tech}
                      </p>
                      <p className="text-[11px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>
                        {it.use}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 12B. TRACKING, ANALYTICS & EVENTS ═══ */}
        <section className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-[11px] font-bold mb-3" style={{ color: G, letterSpacing: "0.06em" }}>
                12 · القياس والتتبّع
              </p>
              <h2 className="ar-heading mb-5" style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.4, color: D }}>
                كل خطوة <span style={{ color: G }}>محسوبة</span>. كل قرار <span style={{ color: G }}>بدليل</span>.
              </h2>
              <p className="text-[15px] leading-[1.9] ar-body" style={{ color: "rgba(0,0,0,0.6)" }}>
                مفيش &ldquo;نشتغل ع البركة&rdquo;. كل event على المنصة يتسجّل ويغذّي 3 طبقات: تحليلات الزائر، رحلة العميل، وأداء الطفل داخل الـ Journey. كل ده مع احترام كامل لخصوصية الأطفال (PDPL + COPPA).
              </p>
            </div>

            {/* Three layers of tracking */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 ph-stagger">
              {[
                {
                  layer: "الطبقة 01",
                  title: "الزائر العام",
                  desc: "اللي بيدخل الموقع بدون تسجيل",
                  events: [
                    "Page views + المصدر (UTM)",
                    "Scroll depth في الـ landing",
                    "زرار الـ CTA المضغوط",
                    "Pricing tier viewed",
                    "Sample story watched %",
                    "Drop-off في نموذج الاشتراك",
                  ],
                  color: G, icon: Globe,
                },
                {
                  layer: "الطبقة 02",
                  title: "الأم المشتركة",
                  desc: "رحلة من تسجيل الدخول للتجديد",
                  events: [
                    "Signup → tier select → payment",
                    "Time-to-first-session",
                    "تكرار دخول الـ Dashboard",
                    "PDF download + share",
                    "WhatsApp message delivered/read",
                    "Churn signals + reasons",
                  ],
                  color: B, icon: BarChart3,
                },
                {
                  layer: "الطبقة 03",
                  title: "تقدّم الطفل",
                  desc: "كل تفاعل داخل المنصة",
                  events: [
                    "Video watched % + replays",
                    "Quiz answers + accuracy",
                    "Badge earned + milestone",
                    "Live session attendance",
                    "Live participation score (المعلّمة)",
                    "Activity download + completion",
                  ],
                  color: P, icon: Activity,
                },
              ].map((l) => (
                <div
                  key={l.title}
                  className="ph-item rounded-[20px] p-6"
                  style={{ background: "#fff", border: `1px solid ${l.color}25`, boxShadow: `3px 3px 0px 0px ${l.color}15` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${l.color}15` }}>
                      <l.icon size={20} color={l.color} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold ar-body" style={{ color: l.color }}>{l.layer}</p>
                      <h4 className="ar-heading text-base" style={{ color: D }}>{l.title}</h4>
                    </div>
                  </div>
                  <p className="text-[12px] ar-body mb-4" style={{ color: "rgba(0,0,0,0.55)" }}>
                    {l.desc}
                  </p>
                  <div className="flex flex-col gap-2">
                    {l.events.map((e) => (
                      <div key={e} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: l.color }} />
                        <span className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.65)" }}>{e}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Conversion funnel */}
            <div className="rounded-[20px] p-7 mb-6" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${G}15` }}>
                  <Target size={18} color={G} />
                </div>
                <div>
                  <p className="text-[10px] font-bold ar-body" style={{ color: G }}>قُمع التحويل</p>
                  <h4 className="ar-heading text-lg" style={{ color: D }}>5 خطوات نقيس عليها كل شيء</h4>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {[
                  { num: "01", label: "زائر", metric: "Sessions / مصادر" },
                  { num: "02", label: "اهتمام", metric: "Sample watch + Pricing view" },
                  { num: "03", label: "تجربة", metric: "Trial signup + Email confirmed" },
                  { num: "04", label: "اشتراك مدفوع", metric: "Tier + first payment" },
                  { num: "05", label: "تجديد", metric: "Month 2 retention + LTV" },
                ].map((s, i, arr) => (
                  <div key={s.num} className="relative">
                    <div className="rounded-[14px] p-4 text-center" style={{ background: "#fff", border: `1px solid ${G}25` }}>
                      <p className="ar-heading text-3xl mb-1" style={{ color: G, lineHeight: 1 }}>{s.num}</p>
                      <p className="text-[12px] ar-body font-bold mb-1" style={{ color: D }}>{s.label}</p>
                      <p className="text-[10px] ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>{s.metric}</p>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="hidden md:block absolute -left-2 top-1/2 -translate-y-1/2 z-10">
                        <ChevronLeft size={14} color={G} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tools we use */}
            <div className="rounded-[20px] p-7 mb-6" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${B}15` }}>
                  <Settings size={18} color={B} />
                </div>
                <div>
                  <p className="text-[10px] font-bold ar-body" style={{ color: B }}>الأدوات</p>
                  <h4 className="ar-heading text-lg" style={{ color: D }}>منصّات القياس والتسويق</h4>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { name: "Plausible Analytics", role: "تحليلات أساسية بدون كوكيز · متوافق PDPL", color: G },
                  { name: "Google Analytics 4", role: "Funnel + Cohort + Retention analysis", color: A },
                  { name: "Vercel Analytics + Speed Insights", role: "Core Web Vitals + RUM", color: D },
                  { name: "Microsoft Clarity", role: "Heatmaps + Session recordings (للأم فقط)", color: B },
                  { name: "Meta Pixel", role: "حملات إعلانات Instagram + Facebook", color: B },
                  { name: "Snapchat Pixel", role: "حملات في السوق السعودي · Snap كبيرة هناك", color: A },
                  { name: "TikTok Pixel", role: "حملات Discovery للأمهات الشابات", color: R },
                  { name: "Google Tag Manager", role: "إدارة كل الـ pixels من مكان واحد", color: P },
                ].map((t) => (
                  <div key={t.name} className="rounded-[12px] p-4 flex items-center gap-3" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
                    <div className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: `${t.color}15` }}>
                      <Activity size={14} color={t.color} />
                    </div>
                    <div>
                      <p className="text-[12px] ar-body font-bold" style={{ color: D, fontFamily: "ui-monospace, Menlo, monospace" }}>
                        {t.name}
                      </p>
                      <p className="text-[10px] ar-body" style={{ color: "rgba(0,0,0,0.55)" }}>
                        {t.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy note */}
            <div className="rounded-[16px] p-5 flex items-start gap-3" style={{ background: `${G}06`, border: `1px solid ${G}25` }}>
              <Shield size={16} color={G} className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[12px] ar-body font-bold mb-1" style={{ color: D }}>الخصوصية أولاً · COPPA + PDPL</p>
                <p className="text-[11px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.65)" }}>
                  بيانات الأطفال محمية بقواعد صارمة: مفيش tracking على شاشات الأطفال، الإحصائيات بيانات مجمّعة فقط، session recording بس على شاشات الأم بعد موافقتها صريحة. اللي ندفع رخصة Plausible عشانه = مفيش كوكيز + استضافة EU + موافق PDPL.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 13. BUILD PHASES (DARK 2/2) ═══ */}
        <section className="ph-slide opacity-0" style={{ padding: "120px 24px", background: D, position: "relative", overflow: "hidden" }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
          />

          <div className="max-w-6xl mx-auto relative z-10">
            <SectionHead eyebrow="12 · المراحل" color={G} light subtitle="ثمانية أسابيع لـ MVP حقيقي شغّال — مش mockup. خمس مراحل بتداخل ذكي.">
              <span style={{ color: "#fff" }}>خطة الـ </span><span style={{ color: G }}>تنفيذ</span>
            </SectionHead>

            <div className="flex flex-col gap-4 ph-stagger">
              {phases.map((p) => (
                <div
                  key={p.num}
                  className="ph-item rounded-[20px] overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${p.color}30` }}
                >
                  <div className="flex flex-col md:flex-row">
                    <div
                      className="md:w-[200px] flex-shrink-0 p-7 flex flex-col items-center justify-center text-center"
                      style={{ background: p.color }}
                    >
                      <div className="text-[9px] font-bold mb-1" style={{ color: "rgba(0,0,0,0.4)", letterSpacing: "0.15em" }}>المرحلة</div>
                      <div className="ar-heading text-5xl mb-2" style={{ color: D }}>0{p.num}</div>
                      <div className="ar-heading text-base mb-3" style={{ color: D }}>{p.label}</div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.08)" }}>
                        <Clock size={11} color={D} />
                        <span className="text-[11px] font-bold" style={{ color: D }}>{p.weeks}</span>
                      </div>
                    </div>
                    <div className="flex-1 p-6">
                      <div className="text-[10px] font-bold mb-3" style={{ color: p.color, letterSpacing: "0.15em" }}>المخرجات</div>
                      <div className="flex flex-col gap-2">
                        {p.deliverables.map((d, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <CheckCircle2 size={15} color={p.color} className="flex-shrink-0 mt-0.5" />
                            <span className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                              {d}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { n: "8", l: "أسابيع للإطلاق", icon: Calendar },
                { n: "5", l: "مراحل متداخلة", icon: Layers },
                { n: "10", l: "قصص في الإطلاق", icon: ScrollText },
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
                    <p className="ar-heading text-lg" style={{ color: "#fff", lineHeight: 1 }}>{s.n}</p>
                    <p className="text-[10px] ar-body" style={{ color: "rgba(255,255,255,0.5)" }}>{s.l}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 14. OPEN QUESTIONS + CLOSING ═══ */}
        <section className="ph-slide opacity-0" style={{ padding: "120px 24px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-[11px] font-bold mb-3" style={{ color: A, letterSpacing: "0.06em" }}>
                13 · قبل ما نبدأ
              </p>
              <h2 className="ar-heading mb-5" style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.4, color: D }}>
                <span style={{ color: A }}>3 قرارات</span> محتاجين رأيكم فيها
              </h2>
              <p className="text-[15px] leading-[1.9] ar-body" style={{ color: "rgba(0,0,0,0.6)" }}>
                النقاط دي محتاجة قراركم قبل ما الـ Design يبدأ. كل قرار يأثّر على الـ tiers والـ workflow والميزانية.
              </p>
            </div>

            <div className="flex flex-col gap-4">
                {[
                  {
                    num: "Q1",
                    title: "حجم الجلسة Live — ثابت 4 ولا متغيّر حسب الباقة؟",
                    body: "الافتراضي = 4 أطفال. هل تحبّوا نضيف Tier أعلى بـ 1-on-1 (سعر ضعف Core)؟ أو Tier أرخص بـ 6–8 أطفال (Group session)؟ القرار يأثّر على عدد المعلّمات اللازمة وعلى تركيبة الـ Pricing.",
                    color: G,
                  },
                  {
                    num: "Q2",
                    title: "نموذج المحتوى — Journey مرتّب أم مكتبة حرّة؟",
                    body: "الترشيح: Hybrid (Journey العمود الفقري + Library باب جانبي). البديل: مكتبة حرّة بالكامل (الطفل يختار اللي يحبّه). Hybrid أعلى Retention لكن يحتاج تنظيم أكثر. القرار يأثّر على هيكل الـ Levels والـ UI.",
                    color: B,
                  },
                  {
                    num: "Q3",
                    title: "مراجعة المحتوى الديني — شيخ معتمد ولا فريق داخلي؟",
                    body: "شيخ معتمد = trust badge على الموقع + مراجعة كل قصة قبل النشر (SLA 48 ساعة). فريق داخلي = أسرع وأرخص لكن أقل ثقة. القرار يأثّر على الـ branding والميزانية وعلى ميعاد الإطلاق.",
                    color: P,
                  },
                ].map((q) => (
                  <div
                    key={q.num}
                    className="rounded-[16px] p-5"
                    style={{ background: "#fff", border: `1px solid ${q.color}30` }}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className="ar-heading text-2xl flex-shrink-0"
                        style={{ color: `${q.color}80` }}
                      >
                        {q.num}
                      </span>
                      <div className="flex-1">
                        <p className="text-[14px] ar-body font-bold mb-2" style={{ color: D }}>
                          {q.title}
                        </p>
                        <p className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>
                          {q.body}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Closing */}
            <div className="mt-12 text-center">
              <p className="ar-heading text-3xl md:text-4xl mb-4" style={{ color: D, lineHeight: 1.3 }}>
                الخطوة الجاية؟ <span style={{ color: G }}>اجتماع 30 دقيقة</span>
              </p>
              <p className="text-[14px] ar-body max-w-xl mx-auto mb-8" style={{ color: "rgba(0,0,0,0.6)" }}>
                نتفق على الـ 3 قرارات أعلاه، نوقّع على نطاق الـ MVP، ونبدأ المرحلة 1 خلال أسبوع.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-10">
                <a
                  href="https://wa.me/201011648156"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold"
                  style={{
                    background: G, color: D, border: `2px solid ${D}`,
                    boxShadow: `4px 4px 0px 0px ${D}`, textDecoration: "none",
                  }}
                >
                  <MessageCircle size={16} /> تواصل عبر واتساب
                </a>
                <a
                  href="mailto:hello@ahmedali.online"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold"
                  style={{
                    background: "#fff", color: D, border: `2px solid ${D}`,
                    boxShadow: `4px 4px 0px 0px ${D}`, textDecoration: "none",
                  }}
                >
                  أرسل إيميل <ChevronLeft size={14} />
                </a>
              </div>

              <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.3)" }}>
                هذه الوثيقة سرية وخاصة بالملاك · أحمد علي · hello@ahmedali.online · ahmedali.online
              </p>
            </div>
          </div>
        </section>

      </div>
    </ArabicTailProcessor>
  );
}

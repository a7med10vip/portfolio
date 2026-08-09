"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Megaphone, Target, Users, MousePointer, Video, Search,
  BarChart3, MessageCircle, Phone, Calendar, Zap, ArrowRight, Mail,
  CheckCircle2, Sparkles, Eye, Activity, Layers, Code2,
  TrendingUp, Wallet, Filter, Hash, Sun, ImageIcon,
  PlayCircle, Send, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";
import ArabicTailProcessor from "@/components/ArabicTailProcessor";
import RMCAdsSectionNav from "@/components/RMCAdsSectionNav";

gsap.registerPlugin(ScrollTrigger);

/* ═══════ PALETTE — matches RMC SEO page ═══════ */
const G = "#30c280";     // brand green — matches khattaba
const D = "#0A0A0A";     // deep dark
const R = "#EF4444";     // red — critical / TikTok
const A = "#F59E0B";     // amber — derma laser highlight
const B = "#3B82F6";     // blue — Meta
const P = "#8B5CF6";     // purple
const O = "#D97706";     // gold — Eid season

function SectionHead({ eyebrow, children, color = G, subtitle, light }: { eyebrow: string; children: React.ReactNode; color?: string; subtitle?: string; light?: boolean }) {
  return (
    <div className="text-center mb-12">
      <p className="ar-heading text-lg mb-3" style={{ color }}>{eyebrow}</p>
      <h2 className="ar-heading text-4xl md:text-5xl mb-4" style={{ color: light ? "#fff" : D }}>{children}</h2>
      {subtitle && <p className="text-sm max-w-xl mx-auto ar-body" style={{ color: light ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}>{subtitle}</p>}
    </div>
  );
}

export default function RMCAdsStrategy() {
  const ref = useRef<HTMLDivElement>(null);
  const [platformTab, setPlatformTab] = useState<"meta" | "tiktok" | "google">("meta");
  const [dayIdx, setDayIdx] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ph-hero", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: "power4.out", delay: 0.3 });
      gsap.utils.toArray<HTMLElement>(".ph-slide").forEach((el) => {
        gsap.fromTo(el, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".ph-stagger").forEach((el) => {
        gsap.fromTo(el.querySelectorAll(".ph-item"), { y: 40, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.07, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 82%", once: true } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  /* ═══════ DATA ═══════ */

  const specialties: { name: string; tier: "primary" | "secondary"; share: string; note: string; color: string; icon: typeof Activity }[] = [
    { name: "الجلدية", tier: "primary", share: "30%", note: "علاج حب الشباب، التصبغات، الأكزيما، الفطريات، فحص جلدي عام.", color: A, icon: Sparkles },
    { name: "الليزر والتجميل", tier: "primary", share: "30%", note: "إزالة الشعر بالليزر، نضارة، تفتيح، علاج الندبات، بوتكس وفيلر.", color: A, icon: Zap },
    { name: "الأسنان", tier: "secondary", share: "40%", note: "تنظيف، تبييض، حشوات، تركيبات، زراعة، تقويم، ابتسامة هوليود — مع عرض ما قبل العيد.", color: P, icon: Layers },
  ];

  const budget = [
    { plat: "Meta (Facebook + Instagram)", daily: 250, total: 1750, color: B, logo: "/logos/meta.svg" },
    { plat: "TikTok Ads", daily: 250, total: 1750, color: R, logo: "/logos/tiktok.svg" },
    { plat: "Google Ads (Search + Call)", daily: 250, total: 1750, color: G, logo: "/logos/googleads.svg" },
  ];

  const platformDetails = {
    meta: {
      label: "Meta (Facebook + Instagram)",
      color: B,
      logo: "/logos/meta.svg",
      objective: "Messages (واتساب) + Leads Form",
      placements: ["Instagram Reels", "Instagram Stories", "Instagram Feed", "Facebook Feed", "Facebook Reels"],
      audience: "نساء بشكل أساسي · 22-50 سنة · مكة المكرمة · اهتمامات: العناية بالبشرة، إزالة الشعر، الليزر التجميلي، العيادات الجلدية، التغذية الصحية.",
      formats: [
        { t: "Reels Video", d: "فيديوهات قصيرة (15-30 ثانية) للعروض الجاهزة — قبل وبعد الليزر، شرح خدمة الجلدية." },
        { t: "Carousel Ads", d: "عرض متعدد الصور للعروض المختلفة في إعلان واحد، مع زر CTA لكل خدمة." },
        { t: "Single Image", d: "بوستر العرض الواحد (سعر + خدمة + CTA واضح)، يُستخدم على الفيد والستوريز." },
        { t: "Click-to-WhatsApp", d: "زر مباشر على الإعلان يفتح محادثة واتساب برسالة مُعدّة مسبقاً." },
      ],
      kpis: ["CPM", "CPC", "Click-to-Message Rate", "Cost per Message Started", "Cost per Lead"],
    },
    tiktok: {
      label: "TikTok Ads",
      color: R,
      logo: "/logos/tiktok.svg",
      objective: "Reach + Web Conversions / Lead Generation",
      placements: ["TikTok For You Feed", "TikTok Spark Ads (Boost organic videos)"],
      audience: "نساء وشباب · 18-40 سنة · مكة المكرمة · اهتمامات: الجمال، البشرة، الموضة، التجميل، اللايف ستايل.",
      formats: [
        { t: "In-Feed Video", d: "فيديوهات عمودية (9:16) باسلوب TikTok الطبيعي — تجارب حقيقية، قبل/بعد، شرح من الطبيب." },
        { t: "Spark Ads", d: "ترويج فيديوهات المجمع الموجودة فعلاً على حساب TikTok الرسمي لنفس الجمهور المستهدف." },
        { t: "Top View / Hashtag", d: "اختياري في يوم 6-7 لو فيه ميزانية إضافية وعرض قوي قبل العيد." },
        { t: "Click-to-WhatsApp", d: "زر CTA يفتح المحادثة أو ينقل للاندنج بيدج فيها زر واتساب." },
      ],
      kpis: ["CPM", "CTR", "Video View 6s Rate", "Cost per Click", "Cost per Lead"],
    },
    google: {
      label: "Google Ads",
      color: G,
      logo: "/logos/googleads.svg",
      objective: "Search Conversions (مكالمات + حجوزات)",
      placements: ["Search Network", "Google Maps", "Call-Only Ads"],
      audience: "أشخاص يبحثون فعلياً عن خدمة جلدية / ليزر / أسنان داخل مكة المكرمة. نية شراء عالية جداً.",
      formats: [
        { t: "Search Ads", d: "إعلانات نصية على كيوردز عالية النية مع Sitelinks لكل خدمة." },
        { t: "Call-Only Ads", d: "إعلان موبايل بزر اتصال مباشر فقط — مثالي للجلدية والليزر." },
        { t: "Maps Ads", d: "ظهور المجمع في أعلى نتائج Google Maps لكلمات مثل (دكتور جلدية قريب)." },
        { t: "Smart Bidding", d: "Maximize Conversions أول 3 أيام، ثم Target CPA بعد جمع بيانات كافية." },
      ],
      kpis: ["Impression Share", "CTR", "Cost per Click", "Cost per Conversion", "Phone Calls", "Direction Requests"],
    },
  } as const;

  const keywords: { kw: string; spec: string; intent: string; color: string }[] = [
    { kw: "دكتور جلدية مكة", spec: "جلدية", intent: "نية عالية", color: A },
    { kw: "عيادة جلدية في مكة المكرمة", spec: "جلدية", intent: "نية عالية", color: A },
    { kw: "ليزر إزالة شعر مكة", spec: "ليزر", intent: "نية شراء", color: A },
    { kw: "نضارة البشرة مكة", spec: "ليزر", intent: "نية شراء", color: A },
    { kw: "بوتكس وفيلر مكة", spec: "ليزر", intent: "نية شراء", color: A },
    { kw: "علاج حب الشباب مكة", spec: "جلدية", intent: "نية عالية", color: A },
    { kw: "طبيب أسنان مكة", spec: "أسنان", intent: "نية عالية", color: P },
    { kw: "تنظيف اسنان مكة", spec: "أسنان", intent: "نية شراء", color: P },
    { kw: "تبييض اسنان مكة", spec: "أسنان", intent: "نية شراء", color: P },
    { kw: "زراعة اسنان مكة", spec: "أسنان", intent: "نية عالية", color: P },
    { kw: "تقويم اسنان مكة", spec: "أسنان", intent: "نية عالية", color: P },
    { kw: "مجمع طبي مكة", spec: "عام", intent: "محلي", color: G },
  ];

  const days = [
    {
      day: "اليوم 1", date: "أربعاء · 20 مايو", phase: "إطلاق", color: G,
      title: "Launch Day — إطلاق الحملات على المنصات الثلاثة",
      tasks: [
        "تفعيل البكسلات على الموقع والتأكد من قراءة الأحداث (Meta Pixel · TikTok Pixel · Google Tag)",
        "بدء حملة Meta — مجموعة إعلانية للجلدية والليزر + مجموعة للأسنان",
        "بدء حملة TikTok — In-Feed + Spark Ads للفيديوهات الجاهزة",
        "بدء حملة Google Search — Ad Group منفصلة لكل تخصص بكيوردز محلية",
        "مراقبة أول 4 ساعات للتأكد من بدء التوصيل وعدم رفض أي إعلان",
      ],
    },
    {
      day: "اليوم 2", date: "خميس · 21 مايو", phase: "متابعة", color: B,
      title: "First Read — قراءة الإشارات المبكرة",
      tasks: [
        "مراجعة CTR وCPM لكل منصة بعد 24 ساعة من البث",
        "إيقاف الإعلانات اللي CTR فيها أقل من المتوقع، وتركيز الميزانية على الأفضل أداءً",
        "مراجعة جودة المحادثات الواردة على الواتساب — تعديل رسالة الـ Welcome لو محتاجة",
        "التأكد من Frequency معقول (مفيش spam على نفس الشخص أكثر من 3 مرات)",
      ],
    },
    {
      day: "اليوم 3", date: "جمعة · 22 مايو", phase: "تحسين", color: B,
      title: "Optimization Day — أول جولة تحسين",
      tasks: [
        "مراجعة Cost per Message على Meta وCost per Conversion على Google",
        "اختبار نسخ كرييتف ثانية لو فيه فيديو/صورة أداؤها أضعف من غيرها",
        "تعديل الجمهور لو ظهر اهتمام أعلى من فئة عمرية أو منطقة معينة داخل مكة",
        "نقل ميزانية من إعلان ضعيف إلى أقوى إعلان داخل نفس الحملة",
      ],
    },
    {
      day: "اليوم 4", date: "سبت · 23 مايو", phase: "تحسين", color: P,
      title: "Mid-Campaign — منتصف الحملة",
      tasks: [
        "تقرير منتصف الحملة: مقارنة CPL بين المنصات الثلاث",
        "تحديد الفائز حتى الآن (المنصة الأقل CPL) وزيادة ميزانيتها 10-15%",
        "تفعيل Retargeting على Meta لمن شاهد أكثر من 50% من الفيديو ولم يتواصل",
        "مراجعة كيوردز Google: إضافة Negative Keywords للبحوث غير المناسبة",
      ],
    },
    {
      day: "اليوم 5", date: "أحد · 24 مايو", phase: "تكثيف", color: A,
      title: "Scale Winners — تكثيف الفائزين",
      tasks: [
        "مضاعفة ميزانية أفضل إعلان على كل منصة (Scale by Duplication)",
        "إيقاف الإعلانات الأقل أداءً نهائياً وتحرير ميزانيتها للفائزين",
        "بدء حملة Retargeting على Meta لزوار الموقع آخر 7 أيام",
        "مراجعة جداول مواعيد المجمع — التأكد من قدرة الاستيعاب لزيادة الحجوزات",
      ],
    },
    {
      day: "اليوم 6", date: "اثنين · 25 مايو", phase: "ضغط ما قبل العيد", color: O,
      title: "Pre-Eid Push — الضغط النهائي",
      tasks: [
        "تفعيل رسالة \"آخر فرصة قبل العيد\" على كل المنصات + إضافة عنصر الاستعجال",
        "زيادة Bid على Google Ads على الكيوردز عالية النية بنسبة 20%",
        "نشر Story على Instagram من حساب المجمع للتذكير + Boost ميزانية إضافية",
        "متابعة لحظية للمحادثات والمكالمات — استجابة سريعة من فريق خدمة العملاء",
      ],
    },
    {
      day: "اليوم 7", date: "ثلاثاء · 26 مايو", phase: "إغلاق", color: R,
      title: "Closing Day — اليوم الختامي",
      tasks: [
        "تشغيل آخر 24 ساعة بأقصى ميزانية على الفائزين فقط",
        "تجهيز التقرير النهائي: Reach, Clicks, Messages, Calls, CPL لكل منصة",
        "تصدير قائمة الـ Leads ومراجعتها مع فريق الاستقبال",
        "إيقاف كل الحملات في نهاية اليوم استعداداً للعيد",
      ],
    },
  ];

  const tracking = [
    { t: "Meta Pixel + Conversions API", d: "تفعيل البكسل على كل صفحات الموقع، وربط Conversions API للحصول على بيانات أدق رغم iOS 14+.", icon: Code2, color: B },
    { t: "TikTok Pixel + Events API", d: "تفعيل البكسل وتسجيل أحداث View, Click, Message Started, Booking Form Submit.", icon: Code2, color: R },
    { t: "Google Tag Manager", d: "إدارة كل الـ Tags من مكان واحد، وتسجيل Conversions على Click-to-Call و WhatsApp وإرسال الفورم.", icon: Code2, color: G },
    { t: "WhatsApp Click Tracking", d: "Event يُسجَّل عند كل ضغطة على زر واتساب، مع UTM للتفريق بين مصادر الزيارة.", icon: MessageCircle, color: G },
    { t: "Call Tracking", d: "تتبع المكالمات من Google Ads (Call Reporting) عبر رقم وسيط لقياس عدد المكالمات الفعلية وطولها.", icon: Phone, color: B },
    { t: "UTM Parameters", d: "كل لينك يحتوي UTM واضح (source, medium, campaign) لتمييز أداء كل منصة في GA4.", icon: Hash, color: P },
  ];

  const kpis = [
    { metric: "إجمالي الـ Leads", desc: "مجموع المحادثات على الواتساب + المكالمات + فورمات الحجز من المنصات الثلاثة.", color: G, icon: TrendingUp },
    { metric: "Cost per Lead (CPL)", desc: "تكلفة الـ Lead الواحد على كل منصة منفصلة — لمقارنة كفاءة Meta vs TikTok vs Google.", color: B, icon: Wallet },
    { metric: "Reach", desc: "عدد الأشخاص الفريدين الذين رأوا الإعلان داخل مكة المكرمة خلال 7 أيام.", color: A, icon: Eye },
    { metric: "Click-Through Rate (CTR)", desc: "نسبة من ضغط على الإعلان من مجموع من رآه — مؤشر جودة الكرييتف.", color: P, icon: MousePointer },
    { metric: "Cost per Message", desc: "تكلفة بدء المحادثة على واتساب — KPI أساسي لحملات Meta وTikTok.", color: R, icon: MessageCircle },
    { metric: "Phone Calls (Google Ads)", desc: "عدد المكالمات الفعلية من Call-Only Ads وSearch Ads مع رقم الاتصال.", color: B, icon: Phone },
    { metric: "Show-up Rate", desc: "نسبة من حجز فعلياً وحضر للمجمع من مجموع الـ Leads — يُقاس بالتعاون مع فريق الاستقبال.", color: O, icon: CheckCircle2 },
    { metric: "Spec Distribution", desc: "توزيع الـ Leads على التخصصات: جلدية / ليزر / أسنان — لمعرفة أين الطلب الأعلى.", color: G, icon: Filter },
  ];

  const current = platformDetails[platformTab];
  const today = days[dayIdx];

  return (
    <ArabicTailProcessor>
    <RMCAdsSectionNav />
    <div ref={ref} style={{ background: "#fff", color: D, fontFamily: "'Ahmed Sans', sans-serif" }}>

      {/* ═══ HERO ═══ */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: "#fff" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[320px] pointer-events-none" style={{ background: `radial-gradient(ellipse, ${G}18 0%, transparent 70%)` }} />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center">
          <div className="ph-hero opacity-0 text-center mb-4" style={{ paddingTop: 40 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold" style={{ background: `${G}12`, color: G, border: `1px solid ${G}30` }}>
              <Megaphone size={12} /> حملة مكثفة · 7 أيام · ما قبل عيد الأضحى
            </span>
          </div>

          <div className="ph-hero opacity-0 text-center mb-4">
            <h1 className="ar-heading" style={{ fontSize: "clamp(36px, 8vw, 82px)", lineHeight: 1.25, color: D }}>
              خطة الإعلانات <span style={{ color: G }}>المدفوعة</span>
            </h1>
          </div>

          <div className="ph-hero opacity-0 text-center mb-6">
            <div className="flex items-center justify-center gap-5 mb-3 flex-wrap">
              {[
                { src: "/logos/meta.svg", label: "Meta" },
                { src: "/logos/facebook.svg", label: "Facebook" },
                { src: "/logos/instagram.svg", label: "Instagram" },
                { src: "/logos/tiktok.svg", label: "TikTok" },
                { src: "/logos/googleads.svg", label: "Google Ads" },
              ].map((p) => (
                <div key={p.label} className="flex items-center gap-1.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.src} alt={p.label} className="w-5 h-5" />
                  <span className="text-[11px] font-bold" style={{ color: "rgba(0,0,0,0.55)" }}>{p.label}</span>
                </div>
              ))}
            </div>
            <p className="text-xl font-bold mt-2 ar-heading" style={{ color: D }}>مجمع الرقي العام الطبي <span style={{ color: G }}>—</span> مكة المكرمة</p>
          </div>

          {/* From / To */}
          <div className="ph-hero opacity-0 grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 w-full max-w-xl">
            <div className="rounded-[16px] p-5" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
              <p className="text-[10px] font-bold tracking-[2px] uppercase mb-2" style={{ color: G }}>مقدم من</p>
              <div className="flex items-center gap-3 mb-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/LOGO-OFF.png" alt="Ahmed Ali" className="w-9 h-9 object-contain" style={{ borderRadius: "10px" }} />
                <p className="text-[14px] font-bold ar-body">Ahmed Ali</p>
              </div>
              <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>Full-Stack Digital Strategist</p>
              <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.3)" }}>hello@ahmedali.online</p>
            </div>
            <div className="rounded-[16px] p-5" style={{ background: "#fff", border: `2px solid ${G}`, boxShadow: `3px 3px 0px 0px ${D}` }}>
              <p className="text-[10px] font-bold tracking-[2px] uppercase mb-2" style={{ color: G }}>مقدم إلى</p>
              <div className="flex items-center gap-3 mb-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/rmc.png" alt="مجمع الرقي العام الطبي" className="h-9 w-auto object-contain" />
                <p className="text-[14px] font-bold ar-body">مجمع الرقي العام الطبي</p>
              </div>
              <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>rmclinic.sa · مكة المكرمة</p>
              <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.3)" }}>تركيز: الجلدية والليزر · بجانب الأسنان</p>
            </div>
          </div>

          {/* Stats row */}
          <div className="ph-hero opacity-0 mb-10 w-full max-w-3xl">
            <div className="flex items-stretch justify-center" style={{ background: "#fff", border: "1px solid #E8E8E8", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
              {[
                { n: "7", l: "أيام تنفيذ" },
                { n: "3", l: "منصات إعلانية" },
                { n: "750", l: "ريال / يوم" },
                { n: "5,250", l: "إجمالي الإنفاق" },
                { n: "3", l: "تخصصات مستهدفة" },
              ].map((s, i) => (
                <div key={s.l} className="flex-1 flex flex-col items-center justify-center py-5 px-2 relative" style={{ borderRight: i > 0 ? "1px solid #F0F0F0" : "none" }}>
                  <span className="ar-heading" style={{ fontSize: 22, lineHeight: 1, color: D }}>{s.n}</span>
                  <span className="text-[9px] font-bold mt-1 ar-body" style={{ color: "rgba(0,0,0,0.35)" }}>{s.l}</span>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-t-full" style={{ background: G }} />
                </div>
              ))}
            </div>
          </div>

          {/* Date range */}
          <div className="ph-hero opacity-0 rounded-[16px] p-5 mb-6 max-w-3xl w-full" style={{ background: `${G}06`, border: `1px solid ${G}25` }}>
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div className="text-center">
                <p className="text-[10px] font-bold tracking-[2px] uppercase mb-1" style={{ color: "rgba(0,0,0,0.4)" }}>بداية الحملة</p>
                <p className="ar-heading text-2xl" style={{ color: D }}>20 مايو 2026</p>
                <p className="text-[10px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>الأربعاء</p>
              </div>
              <ArrowRight size={18} color={G} style={{ transform: "rotate(180deg)" }} />
              <div className="text-center">
                <p className="text-[10px] font-bold tracking-[2px] uppercase mb-1" style={{ color: "rgba(0,0,0,0.4)" }}>نهاية الحملة</p>
                <p className="ar-heading text-2xl" style={{ color: D }}>26 مايو 2026</p>
                <p className="text-[10px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>الثلاثاء · قبل العيد بيوم</p>
              </div>
              <div className="w-px h-12" style={{ background: "rgba(0,0,0,0.08)" }} />
              <div className="text-center">
                <p className="text-[10px] font-bold tracking-[2px] uppercase mb-1" style={{ color: O }}>عيد الأضحى</p>
                <p className="ar-heading text-2xl" style={{ color: O }}>27 مايو</p>
                <p className="text-[10px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>إيقاف الإعلانات</p>
              </div>
            </div>
          </div>

          {/* Opening framing */}
          <div className="ph-hero opacity-0 rounded-[16px] p-6 mb-6 max-w-3xl w-full relative overflow-hidden" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: `${G}10` }}>
                <FileText size={18} color={G} />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[2px] uppercase mb-2" style={{ color: G }}>نطاق الوثيقة</p>
                <p className="text-[13px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.65)" }}>
                  خطة إعلانية مكثفة لمدة 7 أيام قبل عيد الأضحى، تستهدف الترويج لقسمَي الجلدية والليزر بشكل أساسي، مع تغطية ثانوية لقسم الأسنان. الميزانية المخصصة 250 ريال يومياً لكل منصة، عبر Meta و TikTok و Google Ads، بإجمالي 5,250 ريال للحملة. الكرييتف (صور وفيديوهات العروض) جاهز من فريق المجمع، والجمهور المستهدف داخل مكة المكرمة فقط.
                </p>
              </div>
            </div>
          </div>

          <div className="ph-hero opacity-0 flex flex-col items-center gap-2 mt-4">
            <div style={{ width: 24, height: 38, border: "1.5px solid rgba(0,0,0,0.14)", borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 5 }}>
              <div style={{ width: 3, height: 6, borderRadius: 2, background: G, animation: "mouseScroll 1.6s ease-in-out infinite" }} />
            </div>
          </div>
        </div>
        <style>{`@keyframes mouseScroll{0%{transform:translateY(0);opacity:1}75%{transform:translateY(9px);opacity:0}76%{transform:translateY(0);opacity:0}100%{opacity:1}}`}</style>
      </section>

      {/* ═══ 1. SPECIALTIES PRIORITY ═══ */}
      <section id="priorities" className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#FAFAFA" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHead eyebrow="١ · الأولويات" subtitle="توزيع التركيز بين التخصصات الأربعة المستهدفة في الحملة، بحسب طبيعة المنتج والمناسبة (ما قبل العيد).">
            التخصصات <span style={{ color: G }}>والأولويات</span>
          </SectionHead>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ph-stagger">
            {specialties.map((s) => (
              <div key={s.name} className="ph-item rounded-[20px] p-6 relative" style={{ background: "#fff", border: s.tier === "primary" ? `2px solid ${s.color}` : "1px solid #EBEBEB", boxShadow: s.tier === "primary" ? `3px 3px 0px 0px ${D}` : "none" }}>
                {s.tier === "primary" && <span className="absolute -top-3 right-5 text-[10px] font-bold px-3 py-1 rounded-full" style={{ background: D, color: s.color }}>أساسي</span>}
                {s.tier === "secondary" && <span className="absolute -top-3 right-5 text-[10px] font-bold px-3 py-1 rounded-full" style={{ background: "#fff", color: "rgba(0,0,0,0.5)", border: "1px solid #E8E8E8" }}>ثانوي</span>}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: `${s.color}15` }}>
                    <s.icon size={20} color={s.color} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="ar-heading text-xl" style={{ color: D }}>{s.name}</p>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded" style={{ background: `${s.color}15`, color: s.color }}>{s.share} من الميزانية</span>
                    </div>
                    <p className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>{s.note}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[16px] p-5" style={{ background: `${A}08`, border: `1px solid ${A}25` }}>
            <div className="flex items-start gap-3">
              <Sun size={16} color={A} className="flex-shrink-0 mt-0.5" />
              <p className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.7)" }}>
                <strong style={{ color: A }}>لماذا الجلدية والليزر أولاً؟</strong> الفترة قبل العيد ترفع الطلب على خدمات النضارة وإزالة الشعر بالليزر والعناية بالبشرة استعداداً للمناسبة. هذا التركيز يُترجم إلى نسبة 60% من إجمالي ميزانية الحملة لهذين القسمين، بينما تأخذ الأسنان النسبة المتبقية (40%) كحملة تكميلية موازية تستفيد من نفس فترة الذروة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 2. BUDGET BREAKDOWN ═══ */}
      <section id="budget" className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHead eyebrow="٢ · الميزانية" subtitle="توزيع متساوٍ بين المنصات الثلاثة في البداية، مع مرونة لإعادة توزيع الميزانية في منتصف الحملة لصالح المنصة الأعلى أداءً.">
            توزيع <span style={{ color: G }}>الإنفاق الإعلاني</span>
          </SectionHead>

          {/* Big number card */}
          <div className="rounded-[24px] p-8 md:p-10 mb-8 text-center relative overflow-hidden" style={{ background: D, border: `2px solid ${D}` }}>
            <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none" style={{ background: `radial-gradient(circle, ${G}25 0%, transparent 70%)` }} />
            <p className="text-[11px] font-bold tracking-[3px] uppercase mb-2" style={{ color: G }}>إجمالي الميزانية الإعلانية</p>
            <p className="ar-heading mb-2" style={{ fontSize: "clamp(48px, 10vw, 96px)", color: "#fff", lineHeight: 1 }}>
              5,250 <span style={{ color: G, fontSize: "0.4em" }}>ريال</span>
            </p>
            <p className="text-[12px] ar-body" style={{ color: "rgba(255,255,255,0.5)" }}>750 ريال يومياً × 7 أيام</p>
          </div>

          {/* Per-platform cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 ph-stagger">
            {budget.map((b) => (
              <div key={b.plat} className="ph-item rounded-[20px] p-6" style={{ background: "#FAFAFA", border: `1px solid ${b.color}20` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white" style={{ border: `1px solid ${b.color}20` }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.logo} alt="" className="w-5 h-5" />
                  </div>
                  <p className="text-[12px] font-bold ar-body" style={{ color: D }}>{b.plat}</p>
                </div>
                <div className="space-y-2 pt-3" style={{ borderTop: "1px solid #EBEBEB" }}>
                  <div className="flex justify-between text-[12px]">
                    <span className="ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>يومياً</span>
                    <span className="font-bold" style={{ color: D }}>{b.daily} ريال</span>
                  </div>
                  <div className="flex justify-between text-[12px]">
                    <span className="ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>المدة</span>
                    <span className="font-bold" style={{ color: D }}>7 أيام</span>
                  </div>
                  <div className="flex justify-between text-[13px] pt-2" style={{ borderTop: "1px dashed #E8E8E8" }}>
                    <span className="font-bold ar-body" style={{ color: b.color }}>إجمالي</span>
                    <span className="font-bold" style={{ color: b.color }}>{b.total.toLocaleString()} ريال</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="rounded-[16px] p-5" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
            <div className="flex items-start gap-3">
              <TrendingUp size={16} color={G} className="flex-shrink-0 mt-0.5" />
              <p className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.65)" }}>
                <strong style={{ color: D }}>إعادة التوزيع في اليوم الرابع:</strong> بعد جمع بيانات كافية من الأيام الثلاثة الأولى، يُعاد توزيع الميزانية بنسبة 10-15% من المنصة الأقل أداءً إلى المنصة الأعلى كفاءة، دون الإيقاف الكامل لأي منصة حتى نهاية الحملة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3. PER-PLATFORM STRATEGY ═══ */}
      <section id="platforms" className="ph-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
        <div className="max-w-5xl mx-auto">
          <SectionHead eyebrow="٣ · المنصات" color={G} light subtitle="كل منصة لها طبيعة جمهور وسلوك مختلف. الاستراتيجية مفصّلة لكل منصة حسب نقاط قوتها — Meta للوصول الاجتماعي، TikTok للوصول الفيرال، وGoogle لنية الشراء المباشرة.">
            <span style={{ color: "#fff" }}>استراتيجية </span><span style={{ color: G }}>كل منصة</span>
          </SectionHead>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {(Object.keys(platformDetails) as Array<keyof typeof platformDetails>).map((k) => {
              const p = platformDetails[k];
              return (
                <button
                  key={k}
                  onClick={() => setPlatformTab(k)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[12px] font-bold transition-all"
                  style={{
                    background: platformTab === k ? p.color : "rgba(255,255,255,0.05)",
                    color: platformTab === k ? D : "rgba(255,255,255,0.7)",
                    border: platformTab === k ? `1px solid ${p.color}` : "1px solid rgba(255,255,255,0.1)",
                    cursor: "pointer",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.logo} alt="" className="w-4 h-4" style={{ filter: platformTab === k ? "brightness(0)" : "brightness(0) invert(1) opacity(0.7)" }} />
                  {p.label}
                </button>
              );
            })}
          </div>

          {/* Active panel */}
          <div className="rounded-[24px] overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="px-6 py-5 flex items-center justify-between flex-wrap gap-3" style={{ background: `${current.color}10`, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={current.logo} alt="" className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[13px] font-bold" style={{ color: "#fff" }}>{current.label}</p>
                  <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>250 ريال × 7 أيام = 1,750 ريال</p>
                </div>
              </div>
              <div className="text-left">
                <p className="text-[9px] font-bold tracking-[2px] uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>الهدف</p>
                <p className="text-[12px] font-bold" style={{ color: current.color }}>{current.objective}</p>
              </div>
            </div>

            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Audience */}
              <div className="rounded-[14px] p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-[10px] font-bold mb-2 flex items-center gap-2" style={{ color: current.color }}><Users size={11} /> الجمهور المستهدف</p>
                <p className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{current.audience}</p>
              </div>

              {/* Placements */}
              <div className="rounded-[14px] p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-[10px] font-bold mb-3 flex items-center gap-2" style={{ color: current.color }}><Target size={11} /> أماكن الظهور</p>
                <div className="flex flex-wrap gap-1.5">
                  {current.placements.map((p) => (
                    <span key={p} className="text-[10px] px-2.5 py-1 rounded-full ar-body" style={{ background: `${current.color}10`, color: "#fff", border: `1px solid ${current.color}30` }}>{p}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 md:px-8 pb-6">
              <p className="text-[10px] font-bold mb-3 flex items-center gap-2" style={{ color: current.color }}><ImageIcon size={11} /> أنواع الإعلانات المستخدمة</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {current.formats.map((f) => (
                  <div key={f.t} className="p-4 rounded-[12px]" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <p className="text-[11px] font-bold mb-1" style={{ color: "#fff" }}>{f.t}</p>
                    <p className="text-[11px] ar-body" style={{ color: "rgba(255,255,255,0.55)" }}>{f.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 md:px-8 pb-7">
              <p className="text-[10px] font-bold mb-3 flex items-center gap-2" style={{ color: current.color }}><BarChart3 size={11} /> KPIs على هذه المنصة</p>
              <div className="flex flex-wrap gap-2">
                {current.kpis.map((k) => (
                  <span key={k} className="text-[10px] px-3 py-1.5 rounded-full ar-body font-bold" style={{ background: D, color: current.color, border: `1px solid ${current.color}30` }}>{k}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Keywords table for Google (always visible) */}
          {platformTab === "google" && (
            <div className="mt-8 rounded-[20px] overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-[11px] font-bold flex items-center gap-2" style={{ color: G }}><Hash size={12} /> الكيوردز المستهدفة على Google Ads</p>
                <p className="text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>12 كيوورد رئيسي موزعين على 3 Ad Groups (جلدية · ليزر · أسنان)</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4">
                {keywords.map((k) => (
                  <div key={k.kw} className="rounded-[10px] p-3" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${k.color}25` }}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded" style={{ background: `${k.color}20`, color: k.color }}>{k.spec}</span>
                      <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.4)" }}>{k.intent}</span>
                    </div>
                    <p className="text-[12px] ar-body font-bold" style={{ color: "#fff" }}>{k.kw}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══ 4. CREATIVE ═══ */}
      <section id="creative" className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHead eyebrow="٤ · الكرييتف" subtitle="الكرييتف (صور وفيديوهات العروض) جاهز من فريق المجمع. التوزيع التالي يبين كيف يُستخدم كل نوع محتوى على كل منصة.">
            استخدام <span style={{ color: G }}>الكرييتف الجاهز</span>
          </SectionHead>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 ph-stagger">
            {[
              { t: "فيديو رأسي قصير", d: "Reels على Instagram، In-Feed على TikTok، YouTube Shorts. أنسب صيغة للجلدية والليزر.", icon: Video, color: R, where: "TikTok · Instagram Reels" },
              { t: "فيديو أفقي", d: "Facebook Feed، YouTube In-Stream. مناسب لشرح خدمة بالتفصيل أو رسالة من طبيب.", icon: PlayCircle, color: B, where: "Facebook · YouTube" },
              { t: "بوستر العرض (Static)", d: "بوستر الخدمة + السعر + CTA. يُستخدم على Stories والـ Feed والـ Search Display.", icon: ImageIcon, color: A, where: "Instagram · Facebook" },
              { t: "Carousel (متعدد)", d: "عرض أكثر من خدمة في إعلان واحد، كل كارد له CTA منفصل.", icon: Layers, color: P, where: "Facebook · Instagram" },
              { t: "نص فقط (Search)", d: "إعلانات Google Search النصية بعناوين قوية وSitelinks وExtensions.", icon: Search, color: G, where: "Google Search" },
              { t: "Spark / UGC", d: "محتوى من حساب المجمع الرسمي يُروَّج له بصيغة إعلان طبيعي.", icon: Sparkles, color: O, where: "TikTok · Instagram" },
            ].map((c) => (
              <div key={c.t} className="ph-item rounded-[20px] p-5" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${c.color}15` }}>
                  <c.icon size={16} color={c.color} />
                </div>
                <p className="text-[13px] font-bold ar-body mb-2" style={{ color: D }}>{c.t}</p>
                <p className="text-[11px] ar-body leading-relaxed mb-3" style={{ color: "rgba(0,0,0,0.55)" }}>{c.d}</p>
                <span className="text-[9px] font-bold px-2 py-1 rounded" style={{ background: `${c.color}10`, color: c.color }}>{c.where}</span>
              </div>
            ))}
          </div>

          {/* Message angles */}
          <h3 className="ar-heading text-xl mb-5 flex items-center gap-2"><MessageCircle size={18} color={G} /> ٤.٢ · زوايا الرسالة الإعلانية</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ph-stagger">
            {[
              { angle: "الاستعداد للعيد", t: "نضارة بشرتك قبل العيد · جلسة ليزر + نضارة فقط هذا الأسبوع في الرقي." },
              { angle: "العرض المحدود", t: "عرض ما قبل العيد ينتهي يوم 26 مايو — احجزي الآن قبل نفاد المواعيد." },
              { angle: "الثقة والخبرة", t: "د. أسماء سمير — أخصائية جلدية وليزر · فريق متخصص في مجمع الرقي بمكة." },
              { angle: "السهولة", t: "احجزي عبر واتساب في ثوانٍ — رد سريع وموعد مناسب لجدولك." },
              { angle: "القرب الجغرافي", t: "أقرب مجمع طبي متخصص في الجلدية والليزر داخل مكة المكرمة." },
              { angle: "الخدمة المتكاملة", t: "فحص جلدي شامل + خطة علاج كاملة في زيارة واحدة — لا حاجة لعدة مواعيد." },
            ].map((a) => (
              <div key={a.angle} className="ph-item rounded-[14px] p-5" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
                <span className="text-[10px] font-bold mb-2 inline-block px-2 py-0.5 rounded" style={{ background: `${G}12`, color: G }}>{a.angle}</span>
                <p className="text-[13px] ar-body leading-relaxed mt-2" style={{ color: "rgba(0,0,0,0.7)" }}>{a.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. FUNNEL ═══ */}
      <section id="funnel" className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#FAFAFA" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHead eyebrow="٥ · مسار التحويل" subtitle="من الإعلان إلى الموعد المحجوز — أربع مراحل قصيرة، كل مرحلة تنتقل لما بعدها بضغطة واحدة.">
            مسار <span style={{ color: G }}>التحويل</span>
          </SectionHead>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 ph-stagger">
            {[
              { n: "1", t: "Ad Impression", d: "المستخدم يرى الإعلان على Reels / TikTok / Google.", icon: Eye, color: G },
              { n: "2", t: "Click / Tap", d: "يضغط على الإعلان أو يبدأ الإجراء (Call / Message).", icon: MousePointer, color: B },
              { n: "3", t: "Conversation", d: "واتساب أو مكالمة أو فورم — مع رد سريع من فريق الاستقبال.", icon: MessageCircle, color: A },
              { n: "4", t: "Booking", d: "حجز موعد فعلي في المجمع — والحضور هو الـ Conversion النهائي.", icon: CheckCircle2, color: G },
            ].map((s) => (
              <div key={s.n} className="ph-item rounded-[20px] p-5 relative" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                <div className="absolute top-3 left-3 text-[10px] font-bold" style={{ color: "rgba(0,0,0,0.15)", fontFamily: "monospace" }}>{s.n.padStart(2, "0")}</div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${s.color}15` }}>
                  <s.icon size={16} color={s.color} />
                </div>
                <p className="text-[13px] font-bold ar-body mb-2" style={{ color: D }}>{s.t}</p>
                <p className="text-[11px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>{s.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[16px] p-5" style={{ background: `${G}06`, border: `1px solid ${G}25` }}>
            <div className="flex items-start gap-3">
              <Send size={16} color={G} className="flex-shrink-0 mt-0.5" />
              <p className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.7)" }}>
                <strong style={{ color: G }}>سرعة الرد:</strong> أكبر عامل في تحويل المحادثة إلى موعد فعلي هو سرعة الرد على الواتساب. التوصية بضمان رد خلال 5-10 دقائق كحد أقصى طوال ساعات العمل، وإعداد رسالة تلقائية بعد ساعات العمل تذكر موعد الرد.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 6. TRACKING ═══ */}
      <section id="tracking" className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHead eyebrow="٦ · القياس" subtitle="قبل إطلاق أي إعلان — لازم البكسلات والتاجز تكون مفعّلة وتسجّل الأحداث الصحيحة. هذا أول يوم من العمل قبل بدء البث.">
            التتبع <span style={{ color: G }}>والقياس</span>
          </SectionHead>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ph-stagger">
            {tracking.map((t) => (
              <div key={t.t} className="ph-item rounded-[16px] p-5 flex gap-4" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${t.color}15` }}>
                    <t.icon size={16} color={t.color} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold ar-body mb-1.5" style={{ color: D }}>{t.t}</p>
                  <p className="text-[11px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>{t.d}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Events table */}
          <div className="mt-10 rounded-[20px] overflow-hidden" style={{ border: "1px solid #EBEBEB" }}>
            <div className="px-6 py-4" style={{ background: "#FAFAFA", borderBottom: "1px solid #EBEBEB" }}>
              <p className="text-[12px] font-bold ar-body flex items-center gap-2" style={{ color: D }}><Activity size={14} color={G} /> الأحداث (Events) المُسجَّلة</p>
            </div>
            <div>
              {[
                { event: "PageView", desc: "زيارة أي صفحة على الموقع", platforms: "Meta · TikTok · GA4" },
                { event: "ViewContent", desc: "زيارة صفحة الجلدية / الليزر / الأسنان", platforms: "Meta · TikTok · GA4" },
                { event: "Contact / Message Started", desc: "ضغط زر واتساب أو بداية محادثة", platforms: "Meta · TikTok · GA4" },
                { event: "Click-to-Call", desc: "ضغط زر الاتصال على الموبايل", platforms: "Google Ads · GA4" },
                { event: "Lead / Form Submit", desc: "إرسال فورم حجز موعد على الموقع", platforms: "Meta · TikTok · Google · GA4" },
              ].map((r, i) => (
                <div key={r.event} className="grid grid-cols-12 px-6 py-4 items-center" style={{ background: i % 2 === 0 ? "#fff" : "#FAFAFA", borderBottom: i === 4 ? "none" : "1px solid #F3F4F6" }}>
                  <div className="col-span-3 text-[11px] font-bold" style={{ color: D, fontFamily: "monospace", direction: "ltr", textAlign: "left" }}>{r.event}</div>
                  <div className="col-span-6 text-[12px] ar-body" style={{ color: "rgba(0,0,0,0.65)" }}>{r.desc}</div>
                  <div className="col-span-3 text-[10px] font-bold" style={{ color: G, textAlign: "left", direction: "ltr" }}>{r.platforms}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 7. 7-DAY SCHEDULE ═══ */}
      <section id="schedule" className="ph-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
        <div className="max-w-5xl mx-auto">
          <SectionHead eyebrow="٧ · الجدول" color={G} light subtitle="جدول يومي مفصّل لكل أيام الحملة السبعة. كل يوم له تركيز مختلف — من الإطلاق إلى التحسين إلى التكثيف إلى الإغلاق.">
            <span style={{ color: "#fff" }}>جدول الـ </span><span style={{ color: G }}>7 أيام</span>
          </SectionHead>

          {/* Day picker */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
            {days.map((d, i) => (
              <button
                key={i}
                onClick={() => setDayIdx(i)}
                className="flex-shrink-0 inline-flex flex-col items-center justify-center px-4 py-3 rounded-[14px] transition-all"
                style={{
                  background: dayIdx === i ? d.color : "rgba(255,255,255,0.04)",
                  border: dayIdx === i ? `1px solid ${d.color}` : "1px solid rgba(255,255,255,0.08)",
                  color: dayIdx === i ? D : "rgba(255,255,255,0.7)",
                  cursor: "pointer",
                  minWidth: 110,
                }}
              >
                <span className="text-[10px] font-bold opacity-70">{d.day}</span>
                <span className="text-[12px] font-bold mt-0.5">{d.date.split(" · ")[1]}</span>
                <span className="text-[9px] opacity-60 mt-0.5">{d.phase}</span>
              </button>
            ))}
          </div>

          {/* Active day card */}
          <div className="rounded-[24px] overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${today.color}30` }}>
            <div className="px-6 py-5 flex items-center justify-between flex-wrap gap-3" style={{ background: `${today.color}10`, borderBottom: `1px solid ${today.color}20` }}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: today.color, color: D }}>{today.phase}</span>
                  <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>{today.day} · {today.date}</span>
                </div>
                <p className="ar-heading text-lg" style={{ color: "#fff" }}>{today.title}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setDayIdx(Math.max(0, dayIdx - 1))} disabled={dayIdx === 0} className="w-9 h-9 rounded-full flex items-center justify-center disabled:opacity-30" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", cursor: dayIdx === 0 ? "not-allowed" : "pointer" }}>
                  <ChevronRight size={14} color="#fff" />
                </button>
                <button onClick={() => setDayIdx(Math.min(6, dayIdx + 1))} disabled={dayIdx === 6} className="w-9 h-9 rounded-full flex items-center justify-center disabled:opacity-30" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", cursor: dayIdx === 6 ? "not-allowed" : "pointer" }}>
                  <ChevronLeft size={14} color="#fff" />
                </button>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {today.tasks.map((t) => (
                  <div key={t} className="flex items-start gap-3 p-4 rounded-[12px]" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <CheckCircle2 size={14} color={today.color} className="flex-shrink-0 mt-0.5" />
                    <span className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Overview timeline */}
          <div className="mt-10">
            <p className="text-[11px] font-bold mb-4 flex items-center gap-2" style={{ color: G }}><Calendar size={12} /> نظرة شاملة على كل الأيام</p>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
              {days.map((d, i) => (
                <button key={i} onClick={() => setDayIdx(i)} className="text-right p-3 rounded-[10px] transition-all" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${d.color}20`, cursor: "pointer" }}>
                  <p className="text-[9px] font-bold" style={{ color: d.color }}>{d.day}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{d.date}</p>
                  <p className="text-[10px] font-bold mt-2" style={{ color: "#fff" }}>{d.phase}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 8. KPIs ═══ */}
      <section id="kpis" className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#FAFAFA" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHead eyebrow="٨ · مؤشرات الأداء" subtitle="هذه المؤشرات نقيسها ونتابعها يومياً خلال الحملة، ونقدّم بناءً عليها تقرير ختامي بنهاية اليوم السابع.">
            مؤشرات <span style={{ color: G }}>النجاح</span>
          </SectionHead>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ph-stagger">
            {kpis.map((k) => (
              <div key={k.metric} className="ph-item rounded-[20px] p-6" style={{ background: "#fff", border: `1px solid ${k.color}25` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${k.color}15` }}>
                    <k.icon size={16} color={k.color} />
                  </div>
                  <p className="text-[13px] font-bold ar-body" style={{ color: D }}>{k.metric}</p>
                </div>
                <p className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>{k.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[16px] p-5" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
            <div className="flex items-start gap-3">
              <BarChart3 size={16} color={G} className="flex-shrink-0 mt-0.5" />
              <p className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.65)" }}>
                <strong style={{ color: D }}>تقارير يومية + تقرير ختامي:</strong> يُرسَل تقرير مختصر كل يوم بأرقام الحملة على واتساب، ويُقدَّم تقرير شامل بنهاية اليوم السابع يتضمن مقارنة بين المنصات الثلاث، توزيع الـ Leads على التخصصات، أبرز ما نجح، والتوصيات لأي حملة قادمة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 9. MONTHLY RETAINER ═══ */}
      <section id="retainer" className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHead eyebrow="٩ · الباقة الشهرية" subtitle="إجمالي ميزانية الإعلانات للعلاقة الكاملة 12,000 ريال — 5,250 منها للحملة المكثفة قبل العيد، والمتبقي 6,750 ريال لحملات ما بعد الحج. الراتب الشهري 2,500 ريال يغطّي الإدارة والسيو ويبدأ مع انطلاق العمل في 20 مايو.">
            باقة <span style={{ color: G }}>الاستمرار</span>
          </SectionHead>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-8">
            {/* Pricing card */}
            <div className="md:col-span-2 rounded-[24px] p-8 text-center relative overflow-hidden" style={{ background: D, color: "#fff", border: `2px solid ${D}` }}>
              <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none" style={{ background: `radial-gradient(circle, ${G}25 0%, transparent 70%)` }} />
              <p className="text-[10px] font-bold tracking-[3px] uppercase mb-3 relative" style={{ color: G }}>الراتب الشهري</p>
              <p className="ar-heading mb-2 relative" style={{ fontSize: "clamp(40px, 8vw, 64px)", color: "#fff", lineHeight: 1 }}>
                2,500 <span style={{ color: G, fontSize: "0.4em" }}>ريال</span>
              </p>
              <p className="text-[11px] ar-body relative" style={{ color: "rgba(255,255,255,0.5)" }}>شهرياً · شامل إدارة الإعلانات والسيو</p>
              <div className="mt-6 pt-6 relative" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <p className="text-[10px] font-bold mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>تبدأ مع انطلاق العمل</p>
                <p className="text-[12px] font-bold" style={{ color: "#fff" }}>من 20 مايو 2026 فصاعداً</p>
              </div>
            </div>

            {/* What's included */}
            <div className="md:col-span-3 rounded-[24px] p-6 md:p-8" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
              <p className="text-[11px] font-bold mb-5 flex items-center gap-2" style={{ color: G }}><CheckCircle2 size={12} /> تشمل الباقة:</p>
              <div className="space-y-3">
                {[
                  { icon: Megaphone, t: "إدارة حملات ما بعد الحج", d: "تشغيل وإدارة حملات Meta و TikTok و Google Ads بميزانية الـ 6,750 ريال المتبقية من إجمالي الـ 12,000، بنفس المنهج والمتابعة." },
                  { icon: Search, t: "تحسين محركات البحث (SEO)", d: "تنفيذ بنود خطة السيو الكاملة المعتمدة سابقاً لمجمع الرقي — السيو التقني، المحتوى الطبي، السيو المحلي، والذكاء الاصطناعي." },
                  { icon: BarChart3, t: "تقرير شهري شامل", d: "تقرير أداء كامل بنهاية كل شهر يجمع نتائج الإعلانات والسيو وملف Google Business في وثيقة واحدة." },
                  { icon: MessageCircle, t: "متابعة مستمرة", d: "تواصل مباشر على واتساب لأي طارئ أو سؤال أو تعديل بسرعة، طوال أيام العمل." },
                ].map((item) => (
                  <div key={item.t} className="flex items-start gap-3 p-4 rounded-[12px]" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${G}15` }}>
                      <item.icon size={14} color={G} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[12px] font-bold ar-body mb-0.5" style={{ color: D }}>{item.t}</p>
                      <p className="text-[11px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Note + CTA to SEO plan */}
          <div className="rounded-[20px] p-6 md:p-7 flex flex-col md:flex-row items-center gap-5 justify-between" style={{ background: `${G}08`, border: `1px solid ${G}25` }}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: `${G}15` }}>
                <Search size={16} color={G} />
              </div>
              <div>
                <p className="text-[13px] font-bold ar-body mb-1" style={{ color: D }}>خطة السيو الكاملة لمجمع الرقي</p>
                <p className="text-[11px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>الخطة المعتمدة سابقاً (90 يوم · SEO · AEO · Chatbot Architecture) — تُنفَّذ على مراحل ضمن الباقة الشهرية بعد العيد.</p>
              </div>
            </div>
            <a href="/rmc" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[12px] font-bold flex-shrink-0" style={{ background: G, color: D, border: `2px solid ${D}`, boxShadow: `3px 3px 0px 0px ${D}`, textDecoration: "none", whiteSpace: "nowrap" }}>
              <FileText size={14} /> عرض خطة السيو الكاملة
            </a>
          </div>

          {/* Cost summary */}
          <div className="mt-8 rounded-[20px] overflow-hidden" style={{ border: "1px solid #EBEBEB" }}>
            <div className="px-6 py-4" style={{ background: "#FAFAFA", borderBottom: "1px solid #EBEBEB" }}>
              <p className="text-[12px] font-bold ar-body flex items-center gap-2" style={{ color: D }}><Wallet size={14} color={G} /> الملخص المالي الكامل</p>
              <p className="text-[10px] ar-body mt-1" style={{ color: "rgba(0,0,0,0.5)" }}>ميزانية إعلانات إجمالية 12,000 ريال موزعة على مرحلتين، بالإضافة إلى الراتب الشهري</p>
            </div>
            <div>
              {[
                { label: "ميزانية الإعلانات — الحملة المكثفة (7 أيام)", val: "5,250 ريال", note: "20 — 26 مايو · قبل العيد · ميزانية المنصات فقط", strong: false },
                { label: "ميزانية الإعلانات — الاستمرار بعد الحج", val: "6,750 ريال", note: "حملات لاحقة بعد انتهاء موسم الحج · يكمل المتبقي من الـ 12,000", strong: false },
                { label: "إجمالي ميزانية الإعلانات", val: "12,000 ريال", note: "للحملات الإعلانية فقط على Meta و TikTok و Google Ads", strong: true },
                { label: "الراتب الشهري — إدارة + سيو", val: "2,500 ريال / شهر", note: "يبدأ من 20 مايو 2026 مع انطلاق العمل · مستقل عن ميزانية الإعلانات", strong: true },
              ].map((row, i, arr) => (
                <div key={row.label} className="flex items-center justify-between px-6 py-4" style={{ background: row.strong ? `${G}08` : (i % 2 === 0 ? "#fff" : "#FAFAFA"), borderBottom: i === arr.length - 1 ? "none" : "1px solid #F3F4F6", borderTop: row.strong && i > 0 ? `1px solid ${G}30` : "none" }}>
                  <div className="flex-1">
                    <p className={"ar-body " + (row.strong ? "text-[13px] font-bold" : "text-[12px] font-bold")} style={{ color: D }}>{row.label}</p>
                    <p className="text-[10px] ar-body mt-0.5" style={{ color: "rgba(0,0,0,0.4)" }}>{row.note}</p>
                  </div>
                  <p className={"font-bold " + (row.strong ? "text-[16px]" : "text-[14px]")} style={{ color: row.strong ? D : G }}>{row.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CLOSING ═══ */}
      <section id="contact" className="ph-slide opacity-0" style={{ padding: "100px 24px 60px", background: "#fff" }}>
        <div className="max-w-3xl mx-auto">

          <div className="flex justify-center mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/LOGO-OFF.png" alt="Ahmed Ali" className="w-20 h-20 object-contain" style={{ borderRadius: "16px" }} />
          </div>

          <div className="rounded-[24px] p-8 md:p-12 mb-8 relative overflow-hidden text-center" style={{ background: `${G}06`, border: `1px solid ${G}25` }}>
            <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none" style={{ background: `radial-gradient(circle, ${G}15 0%, transparent 70%)` }} />
            <p className="text-[14px] ar-body leading-relaxed mb-4 text-center" style={{ color: "rgba(0,0,0,0.75)" }}>
              الخطة مكثفة وقصيرة (7 أيام)، ومُصمَّمة للاستفادة من ذروة الطلب ما قبل عيد الأضحى على خدمات الجلدية والليزر تحديداً. التركيز على ثلاث منصات بميزانية متساوية في البداية، مع مرونة لإعادة توزيع الميزانية بعد جمع بيانات أولية من الأيام الثلاثة الأولى.
            </p>
            <p className="text-[14px] ar-body leading-relaxed text-center" style={{ color: "rgba(0,0,0,0.75)" }}>
              كل المنصات يتم إيقافها مساء يوم 26 مايو استعداداً للعيد، ويُقدَّم التقرير الختامي خلال أيام العيد الأولى. الوثيقة مفتوحة للنقاش وتعديل أي بند قبل الانطلاق، ولا تتضمن وعوداً رقمية — فقط مؤشرات قياس واضحة نتابعها معاً.
            </p>
          </div>

          <div className="rounded-[24px] p-10 md:p-14 text-center" style={{ border: "1px solid #EBEBEB" }}>
            <img src="/myphoto-profile.png" alt="Ahmed Ali" className="w-24 h-24 rounded-full object-cover mx-auto mb-6" style={{ border: `3px solid ${G}` }} />
            <h3 className="ar-heading text-3xl mb-2">جاهز للانطلاق؟</h3>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <a href="https://wa.me/201011648156" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold" style={{ background: G, color: D, border: `2px solid ${D}`, boxShadow: `4px 4px 0px 0px ${D}`, textDecoration: "none" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/whatsapp.svg" alt="" className="w-4 h-4" style={{ filter: "brightness(0)" }} /> واتساب
              </a>
              <a href="mailto:hello@ahmedali.online" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold" style={{ background: "#fff", color: D, border: `2px solid ${D}`, boxShadow: `4px 4px 0px 0px ${D}`, textDecoration: "none" }}>
                <Mail size={14} /> إيميل <ArrowRight size={14} />
              </a>
            </div>
            <div className="w-full h-px mb-6" style={{ background: "#F0F0F0" }} />
            <p className="text-[14px] font-bold">Ahmed Ali</p>
            <p className="text-[12px] ar-body" style={{ color: G }}>Full-Stack Digital Strategist</p>
            <p className="text-[12px] ar-body mt-1" style={{ color: "rgba(0,0,0,0.4)" }}>hello@ahmedali.online · ahmedali.online</p>
          </div>

          <p className="text-[11px] ar-body text-center mt-8" style={{ color: "rgba(0,0,0,0.2)" }}>
            &copy; {new Date().getFullYear()} Ahmed Ali. حملة إعلانية مُعدّة خصيصاً لمجمع الرقي العام الطبي — مكة المكرمة.
          </p>
        </div>
      </section>

    </div>
    </ArabicTailProcessor>
  );
}

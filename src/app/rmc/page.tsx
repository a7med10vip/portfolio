"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Activity, Stethoscope, Search, Bot, MapPin, Link2, FileText,
  CheckCircle2, Clock, Shield, Sparkles,
  MessageCircle, ArrowRight, ExternalLink,
  Zap, Calendar, BarChart3, Globe, Database,
  Code2, Tag, BookOpen, Hash, Building2, Phone, Mail,
  Moon, Award, Layers, Wand2,
} from "lucide-react";
import ArabicTailProcessor from "@/components/ArabicTailProcessor";

gsap.registerPlugin(ScrollTrigger);

/* ═══════ PALETTE — medical, trustworthy, warm ═══════ */
const G = "#4FFFB0";     // brand green — matches portfolio
const D = "#0A0A0A";     // deep dark
const R = "#EF4444";     // red — critical
const A = "#F59E0B";     // amber — warning / medium
const B = "#3B82F6";     // blue — info
const P = "#8B5CF6";     // purple — AI / AEO
const O = "#D97706";     // gold — Hajj / Mecca opportunity

export default function RMCSeoStrategy() {
  const ref = useRef<HTMLDivElement>(null);
  const [schemaTab, setSchemaTab] = useState<"org" | "physician" | "faq">("org");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ph-hero", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: "power4.out", delay: 0.3 });
      gsap.utils.toArray<HTMLElement>(".ph-slide").forEach((el) => {
        gsap.fromTo(el, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".ph-stagger").forEach((el) => {
        gsap.fromTo(el.querySelectorAll(".ph-item"), { y: 40, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.07, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 82%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".ph-bar").forEach((el) => {
        const target = parseFloat(el.getAttribute("data-val") || "0");
        gsap.fromTo(el, { width: "0%" }, { width: `${target * 10}%`, duration: 1.4, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  /* ═══════ DATA ═══════ */

  const auditRows: { axis: string; note: string; icon: typeof Activity }[] = [
    { axis: "Schema Markup", note: "إضافة MedicalOrganization و Physician و FAQ Schema لتمكين محركات البحث وأدوات الذكاء الاصطناعي من قراءة هوية المجمع الطبية بشكل مباشر.", icon: Code2 },
    { axis: "المحتوى الطبي", note: "توسيع المدونة الطبية بمقالات متخصصة دورية بالتعاون مع الفريق الطبي للمجمع، بما يرفع قيمة الموقع للزوار ومحركات البحث.", icon: BookOpen },
    { axis: "ملف llms.txt", note: "إضافة ملف يوجّه أدوات الذكاء الاصطناعي (ChatGPT و Perplexity و Claude) إلى معلومات المجمع الرسمية بصيغة منظمة.", icon: Bot },
    { axis: "Meta Descriptions", note: "صياغة أوصاف مخصصة ومميّزة لكل صفحة بما يعكس طبيعة الخدمة ويشجّع على النقر من نتائج البحث.", icon: FileText },
    { axis: "هيكلة روابط URL", note: "اعتماد نسخة إنجليزية مختصرة للروابط إلى جانب الحالية، مع إعادة توجيه 301 لضمان انتقال سلس دون فقد أي authority.", icon: Link2 },
    { axis: "FAQ Schema", note: "تفعيل Structured Data على قسم الأسئلة الشائعة القائم ليظهر مباشرة في نتائج Google و AI Overviews.", icon: MessageCircle },
    { axis: "توحيد مواعيد العمل", note: "مواءمة المواعيد المعروضة بين الهيدر والفوتر و Google Business Profile في نسخة موحدة واحدة.", icon: Clock },
    { axis: "Google Business Profile", note: "إثراء الملف بصور احترافية جديدة، ومنشورات دورية، وتفعيل كامل للـ Attributes والأسئلة الشائعة.", icon: MapPin },
    { axis: "صفحات الأطباء", note: "إثراء البيو والتخصصات لتتوافق مع معايير E-E-A-T للمحتوى الطبي، مع ربط كل طبيب بـ Physician Schema.", icon: Stethoscope },
    { axis: "Title Tags", note: "صياغة عناوين محسّنة للكيوردز المحلية على الصفحة الرئيسية وصفحات الخدمات، مع إبراز موقع المجمع في مكة المكرمة.", icon: Tag },
    { axis: "Core Web Vitals", note: "تحسين سرعة التحميل عبر تحويل الصور إلى WebP وتفعيل lazy loading، خصوصاً على تجربة الموبايل.", icon: Zap },
  ];

  const urlMap: { page: string; url: string }[] = [
    { page: "الرئيسية", url: "/" },
    { page: "من نحن", url: "/ar/about/" },
    { page: "العيادات", url: "/ar/clinics/" },
    { page: "طب الأسنان", url: "/ar/dental-clinic/" },
    { page: "الجلدية والتجميل", url: "/ar/dermatology/" },
    { page: "الباطنية والمناظير", url: "/ar/internal-medicine/" },
    { page: "النساء والولادة", url: "/ar/obstetrics/" },
    { page: "العلاج الطبيعي", url: "/ar/physiotherapy/" },
    { page: "أمراض القلب", url: "/ar/cardiology/" },
    { page: "الطب النفسي", url: "/ar/psychiatry/" },
    { page: "المسالك البولية", url: "/ar/urology/" },
    { page: "الطوارئ 24/7", url: "/ar/emergency/" },
    { page: "الطب المنزلي", url: "/ar/home-healthcare/" },
    { page: "الأطباء", url: "/ar/doctors/" },
    { page: "حجز موعد", url: "/ar/book-appointment/" },
    { page: "المقالات", url: "/ar/blog/" },
  ];

  const titleFixes: { page: string; old: string; fresh: string }[] = [
    { page: "الرئيسية", old: "مجمع الرقي العام الطبي بمكة المكرمة - RMC", fresh: "أفضل مجمع طبي في مكة المكرمة | مجمع الرقي العام الطبي" },
    { page: "طب الأسنان", old: "الخدمة (عنوان افتراضي)", fresh: "طبيب أسنان مكة المكرمة | تقويم وزراعة | مجمع الرقي" },
    { page: "الجلدية", old: "الخدمة (عنوان افتراضي)", fresh: "أخصائي جلدية مكة المكرمة | علاج وتجميل | الرقي" },
    { page: "الطب المنزلي", old: "الخدمة (عنوان افتراضي)", fresh: "طب منزلي مكة المكرمة | زيارة طبية في بيتك | الرقي" },
    { page: "الطب النفسي", old: "الخدمة (عنوان افتراضي)", fresh: "طبيب نفسي مكة المكرمة | علاج إدمان | الرقي الطبي" },
    { page: "الطوارئ", old: "الخدمة (عنوان افتراضي)", fresh: "طوارئ 24 ساعة مكة المكرمة | مجمع الرقي العام الطبي" },
    { page: "الأطباء", old: "الأطباء (افتراضي)", fresh: "أطباء متخصصون في مكة المكرمة | فريق مجمع الرقي" },
    { page: "من نحن", old: "من نحن (افتراضي)", fresh: "عن مجمع الرقي العام الطبي | مكة المكرمة | RMC" },
  ];

  const keywords: { type: string; kw: string; volume: string; diff: string; color: string }[] = [
    { type: "محلي", kw: "مجمع طبي مكة المكرمة", volume: "عالي", diff: "متوسطة", color: G },
    { type: "محلي", kw: "طبيب في مكة", volume: "عالي", diff: "منخفضة", color: G },
    { type: "محلي", kw: "عيادة مكة المكرمة", volume: "عالي", diff: "منخفضة", color: G },
    { type: "خدمة", kw: "طب أسنان مكة", volume: "متوسط", diff: "منخفضة", color: B },
    { type: "خدمة", kw: "دكتور جلدية مكة", volume: "متوسط", diff: "منخفضة", color: B },
    { type: "خدمة", kw: "طب نفسي مكة", volume: "متوسط", diff: "منخفضة", color: B },
    { type: "خدمة", kw: "علاج طبيعي مكة المكرمة", volume: "متوسط", diff: "منخفضة", color: B },
    { type: "نية", kw: "حجز موعد طبيب مكة", volume: "عالي", diff: "منخفضة", color: A },
    { type: "نية", kw: "طوارئ مستشفى مكة 24 ساعة", volume: "عالي", diff: "منخفضة", color: A },
    { type: "حج", kw: "طبيب للحجاج مكة", volume: "موسمي عالي", diff: "منخفضة", color: O },
    { type: "حج", kw: "عيادة للمعتمرين مكة", volume: "موسمي عالي", diff: "منخفضة", color: O },
    { type: "طويل", kw: "أفضل دكتور أسنان في مكة المكرمة", volume: "متوسط", diff: "منخفضة", color: P },
  ];

  const citations: { name: string; note: string }[] = [
    { name: "صحتي / أبشر بلص", note: "منصة وزارة الصحة السعودية" },
    { name: "Cleo", note: "منصة صحية سعودية" },
    { name: "Doctori.sa", note: "دليل أطباء" },
    { name: "Vezeeta السعودية", note: "حجوزات طبية" },
    { name: "وقت الصحة", note: "wakthalsaha.com" },
    { name: "Marefa.org", note: "دليل طبي" },
    { name: "Yelp ME", note: "تقييمات محلية" },
    { name: "Foursquare", note: "خرائط ومواقع" },
  ];

  const articles: { month: number; title: string; kw: string; spec: string; color: string }[] = [
    { month: 1, title: "أعراض أمراض القلب عند الرجال — متى تزور طبيبك؟", kw: "أمراض القلب مكة", spec: "قلب", color: R },
    { month: 1, title: "تقويم الأسنان للبالغين: كل ما تحتاج معرفته", kw: "تقويم أسنان مكة المكرمة", spec: "أسنان", color: B },
    { month: 1, title: "الوقاية من أمراض الجهاز الهضمي في موسم الحج", kw: "صحة الحجاج مكة", spec: "باطنية", color: O },
    { month: 1, title: "متى يحتاج الطفل لطبيب نفسي؟", kw: "طب نفسي أطفال مكة", spec: "نفسي", color: P },
    { month: 2, title: "الفرق بين الليزر وتقشير البشرة — أيهما أنسب لك؟", kw: "دكتور جلدية مكة", spec: "جلدية", color: G },
    { month: 2, title: "علاج آلام الظهر بالعلاج الطبيعي بدون جراحة", kw: "علاج طبيعي مكة", spec: "طبيعي", color: A },
    { month: 2, title: "الطب المنزلي: ما الخدمات التي يمكن تقديمها في بيتك؟", kw: "طب منزلي مكة", spec: "منزلي", color: B },
    { month: 2, title: "أسئلة يجب طرحها على طبيب المسالك البولية", kw: "دكتور مسالك بولية مكة", spec: "مسالك", color: P },
    { month: 3, title: "دليلك للرعاية الصحية أثناء أداء العمرة", kw: "رعاية طبية معتمرين", spec: "حج/عمرة", color: O },
    { month: 3, title: "أفضل 10 نصائح للحفاظ على صحة الأسنان", kw: "نصائح أسنان", spec: "أسنان", color: B },
    { month: 3, title: "كيف تختار الطبيب المناسب لحالتك؟", kw: "طبيب متخصص مكة", spec: "عام", color: G },
    { month: 3, title: "الحجامة: هل هي علاج فعّال؟", kw: "حجامة مكة المكرمة", spec: "حجامة", color: R },
  ];

  /* ═══════ SUB COMPONENTS ═══════ */

  function SectionHead({ eyebrow, children, color = G, subtitle, light }: { eyebrow: string; children: React.ReactNode; color?: string; subtitle?: string; light?: boolean }) {
    return (
      <div className="text-center mb-12">
        <p className="ar-heading text-lg mb-3" style={{ color }}>{eyebrow}</p>
        <h2 className="ar-heading text-4xl md:text-5xl mb-4" style={{ color: light ? "#fff" : D }}>{children}</h2>
        {subtitle && <p className="text-sm max-w-xl mx-auto ar-body" style={{ color: light ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}>{subtitle}</p>}
      </div>
    );
  }

  /* ═══════ SCHEMA CODE BY TAB ═══════ */

  const schemaCode: Record<typeof schemaTab, string> = {
    org: `{
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "مجمع الرقي العام الطبي",
  "alternateName": "RMC Clinic",
  "url": "https://rmclinic.sa",
  "logo": "https://rmclinic.sa/wp-content/.../logo.png",
  "telephone": "+966508065568",
  "email": "Info@rmclinic.sa",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "7090 الشيخ حسن مشاط",
    "addressLocality": "مكة المكرمة",
    "addressRegion": "منطقة مكة المكرمة",
    "addressCountry": "SA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 21.38,
    "longitude": 39.85
  },
  "medicalSpecialty": [
    "Dentistry", "Cardiology", "Dermatology",
    "Psychiatry", "Urology", "Emergency"
  ]
}`,
    physician: `{
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "د. أسماء سمير",
  "medicalSpecialty": "Dermatology",
  "worksFor": {
    "@type": "MedicalOrganization",
    "name": "مجمع الرقي العام الطبي"
  },
  "image": "https://rmclinic.sa/.../dr-asmaa.jpg",
  "telephone": "+966508065568",
  "availableService": [
    "ليزر تجميلي",
    "علاج حب الشباب",
    "بوتكس وفيلر"
  ]
}`,
    faq: `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "كيف يمكنني حجز موعد في المجمع؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "يمكنك حجز موعد عبر الموقع أو الاتصال بـ +966508065568"
      }
    },
    {
      "@type": "Question",
      "name": "هل المجمع يقبل التأمين الطبي؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "نعم، المجمع يقبل أغلب شركات التأمين المعتمدة في المملكة."
      }
    }
  ]
}`,
  };

  return (
    <ArabicTailProcessor>
    <div ref={ref} style={{ background: "#fff", color: D, fontFamily: "'Ahmed Sans', sans-serif" }}>

      {/* ═══ HERO ═══ */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: "#fff" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[320px] pointer-events-none" style={{ background: `radial-gradient(ellipse, ${G}18 0%, transparent 70%)` }} />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center">
          <div className="ph-hero opacity-0 text-center mb-4" style={{ paddingTop: 40 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold" style={{ background: `${G}12`, color: G, border: `1px solid ${G}30` }}>
              <Activity size={12} /> خطة شاملة · 90 يوم · أبريل 2026
            </span>
          </div>

          <div className="ph-hero opacity-0 text-center mb-4">
            <h1 className="ar-heading" style={{ fontSize: "clamp(36px, 8vw, 82px)", lineHeight: 1.25, color: D }}>
              خطة السيو <span style={{ color: G }}>والذكاء الاصطناعي</span>
            </h1>
          </div>

          <div className="ph-hero opacity-0 text-center mb-6">
            <p className="ar-body text-lg md:text-xl" style={{ color: "rgba(0,0,0,0.5)" }}>SEO · AEO · Chatbot Architecture</p>
            <p className="text-xl font-bold mt-2 ar-heading" style={{ color: D }}>مجمع الرقي العام الطبي <span style={{ color: G }}>—</span> مكة المكرمة</p>
          </div>

          {/* From / To */}
          <div className="ph-hero opacity-0 grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 w-full max-w-xl">
            <div className="rounded-[16px] p-5" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
              <p className="text-[10px] font-bold tracking-[2px] uppercase mb-2" style={{ color: G }}>مقدم من</p>
              <p className="text-[14px] font-bold ar-body">Ahmed Ali</p>
              <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>Full-Stack Digital Strategist</p>
              <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.3)" }}>hello@ahmedali.online</p>
            </div>
            <div className="rounded-[16px] p-5" style={{ background: "#fff", border: `2px solid ${G}`, boxShadow: `3px 3px 0px 0px ${D}` }}>
              <p className="text-[10px] font-bold tracking-[2px] uppercase mb-2" style={{ color: G }}>مقدم إلى</p>
              <p className="text-[14px] font-bold ar-body">مجمع الرقي العام الطبي</p>
              <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>rmclinic.sa · مكة المكرمة</p>
              <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.3)" }}>مجمع طبي شامل · 15+ تخصص</p>
            </div>
          </div>

          {/* Stats row */}
          <div className="ph-hero opacity-0 mb-10 w-full max-w-3xl">
            <div className="flex items-stretch justify-center" style={{ background: "#fff", border: "1px solid #E8E8E8", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
              {[
                { n: "90", l: "يوم تنفيذ" },
                { n: "8", l: "محاور استراتيجية" },
                { n: "12", l: "مقالة طبية" },
                { n: "15+", l: "تخصص طبي" },
                { n: "3", l: "Schema types" },
              ].map((s, i) => (
                <div key={s.l} className="flex-1 flex flex-col items-center justify-center py-5 px-2 relative" style={{ borderRight: i > 0 ? "1px solid #F0F0F0" : "none" }}>
                  <span className="ar-heading" style={{ fontSize: 26, lineHeight: 1, color: D }}>{s.n}</span>
                  <span className="text-[9px] font-bold mt-1 ar-body" style={{ color: "rgba(0,0,0,0.35)" }}>{s.l}</span>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-t-full" style={{ background: G }} />
                </div>
              ))}
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
                  تقرير فني يتناول تحسين الحضور الرقمي لمجمع الرقي العام الطبي عبر ثلاثة محاور متكاملة: تحسين محركات البحث التقليدية (SEO)، والظهور في أدوات الذكاء الاصطناعي (AEO)، وبناء شات بوت مخصص. الوثيقة مُعدّة للمراجعة والنقاش، وتُبنى على الحضور القائم للمجمع في مكة المكرمة.
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

      {/* ═══ 1. AUDIT ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#FAFAFA" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHead eyebrow="١ · مجالات التطوير" subtitle="قائمة ببنود العمل المقترحة لتعزيز الحضور الرقمي للمجمع، مصنّفة حسب الموضوع التقني. كل بند يبني على ما هو قائم ويوسّعه.">
            مجالات <span style={{ color: G }}>التطوير</span>
          </SectionHead>

          <div className="rounded-[16px] p-5 mb-8" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
            <p className="text-[13px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.65)" }}>
              المحاور التالية نتجت عن مراجعة فنية تعاونية للموقع مع الفريق، وترصد المساحات التي يمكن البناء عليها لرفع كفاءة الظهور في محركات البحث وأدوات الذكاء الاصطناعي. الترتيب موضوعي لا تقييمي، والتنفيذ موزّع لاحقاً في خريطة الطريق.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ph-stagger">
            {auditRows.map((r, i) => (
              <div key={r.axis} className="ph-item rounded-[16px] p-5 flex gap-4" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${G}12` }}>
                    <r.icon size={16} color={G} />
                  </div>
                  <span className="text-[10px] font-bold mt-2" style={{ color: "rgba(0,0,0,0.25)", fontFamily: "monospace" }}>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold ar-body mb-1.5">{r.axis}</p>
                  <p className="text-[11px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>{r.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 2. TECHNICAL SEO ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHead eyebrow="٢ · السيو التقني" subtitle="الطبقة التقنية التي تُمكّن محركات البحث وأدوات الذكاء الاصطناعي من قراءة الموقع بدقة أعلى.">
            Technical <span style={{ color: G }}>SEO</span>
          </SectionHead>

          {/* URL restructure */}
          <div className="rounded-[20px] p-6 md:p-8 mb-10" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: `${G}12` }}>
                <Link2 size={18} color={G} />
              </div>
              <div className="flex-1">
                <h3 className="ar-heading text-xl mb-2">٢.١ · هيكلة روابط URL</h3>
                <p className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.5)" }}>إضافة نسخة إنجليزية مختصرة للروابط إلى جانب النسخة العربية الحالية، مع إعادة توجيه 301 لكل صفحة لضمان انتقال سلس يحافظ على الـ authority المُكتسَب.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 ph-stagger">
              {urlMap.map((u) => (
                <div key={u.url} className="ph-item p-3 rounded-[10px]" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                  <p className="text-[10px] ar-body font-bold" style={{ color: D }}>{u.page}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: G, fontFamily: "monospace", direction: "ltr", textAlign: "left" }}>{u.url}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Schema markup — interactive tabs */}
          <div className="rounded-[20px] overflow-hidden mb-10" style={{ border: "1px solid #EBEBEB" }}>
            <div className="p-6 md:p-8" style={{ background: "#FAFAFA", borderBottom: "1px solid #EBEBEB" }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: `${G}12` }}>
                  <Code2 size={18} color={G} />
                </div>
                <div className="flex-1">
                  <h3 className="ar-heading text-xl mb-2">٢.٢ · Schema Markup</h3>
                  <p className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.5)" }}>البيانات المنظّمة تُتيح لمحركات البحث والذكاء الاصطناعي قراءة هوية الموقع الطبية ومحتواه بشكل مُهيكَل. فيما يلي الأنواع الثلاثة المقترحة للمجمع.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-5">
                {[
                  { k: "org" as const, label: "MedicalOrganization", icon: Building2 },
                  { k: "physician" as const, label: "Physician", icon: Stethoscope },
                  { k: "faq" as const, label: "FAQPage", icon: MessageCircle },
                ].map((t) => (
                  <button
                    key={t.k}
                    onClick={() => setSchemaTab(t.k)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold transition-all"
                    style={{
                      background: schemaTab === t.k ? D : "#fff",
                      color: schemaTab === t.k ? G : "rgba(0,0,0,0.55)",
                      border: schemaTab === t.k ? `1px solid ${D}` : "1px solid #EBEBEB",
                      cursor: "pointer",
                    }}
                  >
                    <t.icon size={12} />
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ background: D, padding: "24px" }}>
              <pre style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, lineHeight: 1.7, fontFamily: "monospace", margin: 0, whiteSpace: "pre-wrap", direction: "ltr", textAlign: "left" }}>{schemaCode[schemaTab]}</pre>
            </div>
          </div>

          {/* Other technical fixes */}
          <div>
            <h3 className="ar-heading text-xl mb-6 flex items-center gap-2"><Shield size={18} color={G} /> ٢.٣ · تحسينات تقنية تكميلية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ph-stagger">
              {[
                { text: "تسمية ملفات الصور بصيغة إنجليزية وصفية مثل dental-clinic-mecca.jpg لتسهيل فهرسة الصور.", icon: Tag },
                { text: "تفعيل lazy loading وتحويل الصور إلى صيغة WebP لتحسين سرعة التحميل.", icon: Zap },
                { text: "تحديث sitemap.xml وإرساله إلى Google Search Console بشكل دوري.", icon: FileText },
                { text: "مراجعة robots.txt للتأكد من إتاحة الصفحات المهمة للفهرسة.", icon: Search },
                { text: "إضافة Canonical Tag على كل صفحة لتوضيح النسخة الرئيسية للمحتوى.", icon: Link2 },
                { text: "إضافة hreflang=ar-SA لتوضيح اللغة والمنطقة الجغرافية لمحركات البحث.", icon: Globe },
                { text: "التأكد من اكتمال 301 Redirect من HTTP إلى HTTPS على جميع الروابط.", icon: Shield },
                { text: "قياس دوري لـ Core Web Vitals عبر Google PageSpeed، خصوصاً لتجربة الموبايل.", icon: BarChart3 },
              ].map((f) => (
                <div key={f.text} className="ph-item flex items-start gap-3 p-4 rounded-[14px]" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
                  <f.icon size={14} color={G} className="flex-shrink-0 mt-0.5" />
                  <span className="text-[12px] ar-body flex-1 leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3. ON-PAGE SEO ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
        <div className="max-w-5xl mx-auto">
          <SectionHead eyebrow="٣ · السيو الداخلي" color={G} light subtitle="صياغة موحّدة لعناوين الصفحات وأوصافها وكلماتها المفتاحية، وفق صيغة مدروسة تناسب طبيعة كل خدمة.">
            <span style={{ color: "#fff" }}>On-Page </span><span style={{ color: G }}>SEO</span>
          </SectionHead>

          {/* Title formula */}
          <div className="rounded-[20px] p-6 mb-8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-[11px] font-bold mb-2" style={{ color: G }}>٣.١ · صيغة العنوان</p>
            <p className="text-[16px] ar-heading" style={{ color: "#fff", lineHeight: 1.8 }}>
              <span style={{ color: G }}>[الخدمة]</span> في مكة المكرمة <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span> <span style={{ color: G }}>مجمع الرقي الطبي</span>
            </p>
          </div>

          {/* Proposed titles */}
          <div className="rounded-[20px] overflow-hidden mb-10" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="grid grid-cols-12 px-6 py-3 text-[10px] font-bold tracking-[1px] uppercase" style={{ color: "rgba(255,255,255,0.4)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="col-span-3">الصفحة</div>
              <div className="col-span-9">العنوان المقترح</div>
            </div>
            {titleFixes.map((t, i) => (
              <div key={t.page} className="grid grid-cols-12 px-6 py-4 items-center" style={{ borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.05)" }}>
                <div className="col-span-3 text-[11px] font-bold" style={{ color: "#fff" }}>{t.page}</div>
                <div className="col-span-9 text-[12px] ar-body" style={{ color: G }}>{t.fresh}</div>
              </div>
            ))}
          </div>

          {/* Meta formula */}
          <div className="rounded-[20px] p-7 mb-10" style={{ background: `${G}08`, border: `1px solid ${G}25` }}>
            <p className="text-[11px] font-bold mb-3" style={{ color: G }}>٣.٢ · صيغة Meta Description · 155 حرف</p>
            <p className="text-[14px] ar-body leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.8)" }}>
              <span style={{ color: G }}>[الفائدة الرئيسية]</span> + <span style={{ color: G }}>[الكيوورد المحلي]</span> + <span style={{ color: G }}>[CTA واضح]</span>
            </p>
            <div className="rounded-[14px] p-4" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-[10px] font-bold mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>مثال — طب الأسنان:</p>
              <p className="text-[12px] ar-body leading-relaxed" style={{ color: "#fff" }}>
                &quot;خدمات طب أسنان متكاملة في مكة المكرمة: حشوات، تقويم، زراعة، وابتسامة هوليود. فريق متخصص وأجهزة حديثة. احجز موعدك الآن!&quot;
              </p>
            </div>
          </div>

          {/* Keywords grid */}
          <div>
            <p className="text-[11px] font-bold mb-5 flex items-center gap-2" style={{ color: G }}><Hash size={12} /> ٣.٣ · الكلمات المفتاحية المستهدفة</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ph-stagger">
              {keywords.map((k) => (
                <div key={k.kw} className="ph-item rounded-[14px] p-4" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${k.color}30` }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded" style={{ background: `${k.color}20`, color: k.color }}>{k.type}</span>
                    <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.4)" }}>{k.volume} · {k.diff}</span>
                  </div>
                  <p className="text-[13px] ar-body font-bold" style={{ color: "#fff" }}>{k.kw}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[16px] p-5" style={{ background: `${O}12`, border: `1px solid ${O}30` }}>
              <div className="flex items-start gap-3">
                <Moon size={16} color={O} className="flex-shrink-0 mt-0.5" />
                <p className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
                  <strong style={{ color: O }}>البُعد الموسمي:</strong> الاستفسارات المرتبطة بالحج والعمرة ذات طابع موسمي. من المناسب التحضير للمحتوى والصفحات المخصصة لها قبل الموسم بوقت كافٍ، بما يسمح بفهرستها وظهورها عند بدء البحث الفعلي من الحجاج والمعتمرين.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4. LOCAL SEO ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHead eyebrow="٤ · السيو المحلي" subtitle="موقع المجمع في مكة المكرمة يجعل الـ Local SEO محوراً أساسياً، مع Google Business Profile كنقطة التقاء رئيسية مع المستخدمين المحليين.">
            Local <span style={{ color: G }}>SEO</span>
          </SectionHead>

          {/* GBP plan */}
          <div className="rounded-[24px] overflow-hidden mb-10" style={{ border: `2px solid ${G}25` }}>
            <div className="px-6 py-4 flex items-center gap-3" style={{ background: `${G}08`, borderBottom: `2px solid ${G}20` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: G }}>
                <MapPin size={18} color={D} />
              </div>
              <div>
                <h3 className="ar-heading text-base">٤.١ · Google Business Profile</h3>
                <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.45)" }}>بنود التحسين على الملف</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: "#F0F0F0" }}>
              {[
                { task: "اتساق ساعات العمل", note: "مواءمة المواعيد بين الملف والموقع على نسخة موحدة" },
                { task: "مراجعة قائمة التخصصات", note: "كل تخصص يُعرض كخدمة منفصلة على الملف بوصف كامل" },
                { task: "تحديث مكتبة الصور", note: "صور دورية للعيادات والأجهزة والاستقبال بجودة احترافية" },
                { task: "Google Posts دورية", note: "عروض، توعية موسمية، تعريف بالأطباء" },
                { task: "متابعة التقييمات", note: "الرد على المراجعات الجديدة في وقت قريب من نشرها" },
                { task: "إثراء قسم Q&A", note: "أسئلة استباقية حول الأسعار والتأمين والحجز" },
                { task: "Virtual Tour 360°", note: "جولة افتراضية للمجمع داخل الملف" },
                { task: "مراجعة Attributes", note: "التأمين، أماكن الانتظار، الوصول لذوي الاحتياجات" },
              ].map((r, i) => (
                <div key={r.task} className="p-5 flex gap-3" style={{ background: i % 2 === 0 ? "#fff" : "#FAFAFA" }}>
                  <CheckCircle2 size={14} color={G} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[13px] font-bold ar-body">{r.task}</p>
                    <p className="text-[11px] ar-body mt-0.5" style={{ color: "rgba(0,0,0,0.45)" }}>{r.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NAP table */}
          <div className="rounded-[20px] overflow-hidden mb-10" style={{ border: "1px solid #EBEBEB" }}>
            <div className="p-5" style={{ background: "#FAFAFA", borderBottom: "1px solid #EBEBEB" }}>
              <h3 className="ar-heading text-lg flex items-center gap-2"><Phone size={16} color={G} /> ٤.٢ · NAP Consistency</h3>
              <p className="text-[11px] ar-body mt-1" style={{ color: "rgba(0,0,0,0.5)" }}>الاسم + العنوان + التليفون — متطابق بالظبط في كل مكان على الإنترنت.</p>
            </div>
            <div>
              {[
                { label: "الاسم الموحد", val: "مجمع الرقي العام الطبي" },
                { label: "العنوان الكامل", val: "7090 شارع الشيخ حسن مشاط، حي الخالدية، مكة المكرمة" },
                { label: "الهاتف", val: "+966508065568" },
                { label: "البريد", val: "Info@rmclinic.sa" },
                { label: "إنستجرام", val: "@alraki_medical" },
                { label: "تويتر / X", val: "@ALRAKI_SA" },
              ].map((n, i) => (
                <div key={n.label} className="flex" style={{ background: i % 2 === 0 ? "#fff" : "#FAFAFA", borderBottom: "1px solid #F3F4F6" }}>
                  <span className="w-[140px] md:w-[180px] flex-shrink-0 text-[11px] font-bold p-3 px-5 ar-body" style={{ color: D }}>{n.label}</span>
                  <span className="flex-1 text-[11px] p-3 px-5 ar-body" style={{ color: "rgba(0,0,0,0.6)" }}>{n.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Citations */}
          <div>
            <h3 className="ar-heading text-lg mb-2 flex items-center gap-2"><ExternalLink size={16} color={G} /> ٤.٣ · مراجعة الملفات على الدلائل الصحية</h3>
            <p className="text-[12px] ar-body mb-5 leading-relaxed" style={{ color: "rgba(0,0,0,0.5)" }}>المجمع مُدرَج بالفعل على الدلائل الصحية التالية. البند هنا هو مراجعة البيانات على كل ملف للتأكد من تطابقها التام مع النسخة الموحدة للـ NAP.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 ph-stagger">
              {citations.map((c) => (
                <div key={c.name} className="ph-item rounded-[14px] p-4 text-center" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
                  <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ background: `${G}12` }}>
                    <ExternalLink size={14} color={G} />
                  </div>
                  <p className="text-[12px] font-bold ar-body">{c.name}</p>
                  <p className="text-[10px] mt-1 ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>{c.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 5. CONTENT STRATEGY ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#FAFAFA" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHead eyebrow="٥ · المحتوى" subtitle="المحتوى الطبي المتخصص هو ما يُغذّي ظهور الموقع في نتائج البحث وأدوات الذكاء الاصطناعي. الخطة تبني مكتبة محتوى منتظمة بالتعاون مع الفريق الطبي للمجمع.">
            خطة <span style={{ color: G }}>المحتوى</span>
          </SectionHead>

          {/* Content types */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-10 ph-stagger">
            {[
              { type: "مقالات طبية متخصصة", goal: "ترتيب + E-E-A-T", freq: "4 / شهر", color: G, icon: BookOpen },
              { type: "صفحات الأطباء (Bio)", goal: "Physician Schema", freq: "مرة + تحديث", color: B, icon: Stethoscope },
              { type: "الأسئلة الشائعة", goal: "AI snippets", freq: "مستمر", color: P, icon: MessageCircle },
              { type: "مقالات الحج والعمرة", goal: "كيوورد موسمي مستهدَف", freq: "قبل الموسم بشهرين", color: O, icon: Moon },
              { type: "مقالات الوقاية", goal: "شير اجتماعي", freq: "2-3 / شهر", color: A, icon: Shield },
              { type: "مقارنات (X مقابل Y)", goal: "Long-tail keywords", freq: "مرة / شهر", color: R, icon: Layers },
            ].map((c) => (
              <div key={c.type} className="ph-item rounded-[16px] p-5" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${c.color}12` }}>
                  <c.icon size={16} color={c.color} />
                </div>
                <p className="text-[13px] font-bold ar-body mb-2">{c.type}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] ar-body" style={{ color: "rgba(0,0,0,0.45)" }}>{c.goal}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: `${c.color}12`, color: c.color }}>{c.freq}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 3-month article plan */}
          <h3 className="ar-heading text-xl mb-6 flex items-center gap-2"><Calendar size={18} color={G} /> خطة المقالات — أول ٣ أشهر</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ph-stagger">
            {[1, 2, 3].map((m) => (
              <div key={m} className="ph-item rounded-[20px] overflow-hidden" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                <div className="px-5 py-4 flex items-center justify-between" style={{ background: D }}>
                  <span className="text-[11px] font-bold" style={{ color: "#fff" }}>الشهر {m}</span>
                  <span className="text-[10px] font-bold" style={{ color: G }}>4 مقالات</span>
                </div>
                <div className="divide-y" style={{ borderColor: "#F3F4F6" }}>
                  {articles.filter((a) => a.month === m).map((a) => (
                    <div key={a.title} className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded" style={{ background: `${a.color}12`, color: a.color }}>{a.spec}</span>
                      </div>
                      <p className="text-[12px] ar-body font-bold leading-relaxed mb-2" style={{ color: D }}>{a.title}</p>
                      <p className="text-[10px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}># {a.kw}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[16px] p-5" style={{ background: `${G}08`, border: `1px solid ${G}25` }}>
            <div className="flex items-start gap-3">
              <Award size={16} color={G} className="flex-shrink-0 mt-0.5" />
              <p className="text-[12px] ar-body leading-relaxed" style={{ color: D }}>
                <strong style={{ color: G }}>E-E-A-T & YMYL:</strong> كل مقالة تُكتب بمشاركة طبيب من المجمع أو تُراجع منه، مع توقيع الاسم والتخصص وتاريخ آخر تحديث — وفق معايير Google للمحتوى الطبي المتخصص.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 6. AEO ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
        <div className="max-w-5xl mx-auto">
          <SectionHead eyebrow="٦ · الذكاء الاصطناعي" color={P} light subtitle="AEO = Answer Engine Optimization. ChatGPT و Perplexity و Google AI Overviews تسحب إجاباتها من المواقع التي تتوافق مع معايير قراءة المحتوى الموثوق.">
            <span style={{ color: "#fff" }}>الظهور في </span><span style={{ color: P }}>الذكاء الاصطناعي</span>
          </SectionHead>

          {/* llms.txt file */}
          <div className="rounded-[20px] overflow-hidden mb-10" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="px-6 py-4 flex items-center justify-between" style={{ background: "rgba(139,92,246,0.08)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-3">
                <FileText size={16} color={P} />
                <div>
                  <p className="text-[13px] font-bold" style={{ color: "#fff" }}>/llms.txt</p>
                  <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>ملف يرشد AI Crawlers بمعلومات الموقع المنظمة</p>
                </div>
              </div>
              <span className="text-[9px] font-bold px-2 py-1 rounded" style={{ background: `${P}25`, color: P }}>https://rmclinic.sa/llms.txt</span>
            </div>
            <div style={{ padding: 24 }}>
              <pre style={{ color: "rgba(255,255,255,0.72)", fontSize: 12, lineHeight: 1.75, fontFamily: "monospace", margin: 0, whiteSpace: "pre-wrap", direction: "ltr", textAlign: "left" }}>{`# مجمع الرقي العام الطبي — RMC Clinic
> مجمع طبي شامل في مكة المكرمة يقدم خدمات طبية متكاملة
> بأعلى معايير الجودة.

## معلومات أساسية
- الاسم: مجمع الرقي العام الطبي
- الموقع: مكة المكرمة، حي الخالدية، 7090 شارع الشيخ حسن مشاط
- الهاتف: +966508065568
- البريد: Info@rmclinic.sa

## ساعات العمل
- العيادات: السبت-الأربعاء 9:30ص-1م و5م-10م
- الطوارئ: 24/7 — السبت-الخميس 8ص-12م، الجمعة 5م-10م
- الأسنان: السبت-الخميس 8ص-10م

## التخصصات
طب الأسنان، الجلدية والتجميل، الباطنية والمناظير،
النساء والولادة، العلاج الطبيعي، أمراض القلب،
الطب النفسي وعلاج الإدمان، المسالك البولية،
قسم الأشعة، طوارئ 24/7، المختبر، الجراحة،
الحجامة، الطب المنزلي، الأنف والأذن، العيون.

## أبرز الأطباء
- د. عصام الرجا: المدير الطبي والمالك
- د. أسماء سمير: أخصائية أمراض جلدية وليزر وتجميل
- د. علاء عرفه: استشاري مسالك بولية وأمراض الذكورة
- د. حامد الشربيني: استشاري الأنف والأذن والحنجرة

## روابط مهمة
- حجز موعد: https://rmclinic.sa/ar/book-appointment/
- قائمة العيادات: https://rmclinic.sa/ar/clinics/
- فريق الأطباء: https://rmclinic.sa/ar/doctors/`}</pre>
            </div>
          </div>

          {/* AI principles */}
          <h3 className="ar-heading text-xl mb-5 flex items-center gap-2" style={{ color: "#fff" }}><Wand2 size={18} color={P} /> ٦.٢ · تحسين المحتوى لـ AI Snippets</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10 ph-stagger">
            {[
              { p: "Answer First", t: "ابدأ كل صفحة بجواب مباشر في أول 100 كلمة على السؤال الرئيسي" },
              { p: "Structured Headings", t: "H2/H3 كأسئلة مباشرة: \"ما أعراض مرض كذا؟\" \"كيف يتم علاج كذا؟\"" },
              { p: "Tables & Lists", t: "المقارنات والأسعار والخطوات في جداول وقوائم مرقمة" },
              { p: "Authorship", t: "كل مقالة منسوبة لطبيب بالاسم + بيو + لينك لصفحته" },
              { p: "Cite Sources", t: "مراجع طبية (وزارة الصحة السعودية، WHO) في نهاية المقالات" },
              { p: "Update Dates", t: "كل مقالة فيها \"آخر تحديث: شهر/سنة\" ظاهر" },
              { p: "Conversational Q&A", t: "صفحة FAQ بها 20+ سؤال بإجابات مفصلة + FAQPage Schema" },
            ].map((r) => (
              <div key={r.p} className="ph-item rounded-[14px] p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="text-[10px] font-bold mb-1.5" style={{ color: P }}>{r.p}</p>
                <p className="text-[12px] ar-body" style={{ color: "rgba(255,255,255,0.7)" }}>{r.t}</p>
              </div>
            ))}
          </div>

          {/* Google AI Overviews */}
          <div className="rounded-[20px] p-7" style={{ background: `${P}10`, border: `1px solid ${P}30` }}>
            <p className="text-[11px] font-bold mb-3 flex items-center gap-2" style={{ color: P }}><Search size={12} /> ٦.٣ · Google AI Overviews</p>
            <p className="text-[13px] ar-body mb-5" style={{ color: "rgba(255,255,255,0.85)" }}>Google AI Overviews تسحب المحتوى من المواقع التي تحقق هذه الشروط:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "المحتوى موثوق وموقّع من متخصص (E-E-A-T عالي)",
                "الإجابة مباشرة وواضحة في أول الصفحة",
                "Schema Markup للـ FAQ والـ MedicalOrganization",
                "الموقع سريع ومتجاوب (Core Web Vitals جيدة)",
                "المحتوى يُحدَّث بانتظام",
                "قسم أسئلة وأجوبة في كل صفحة خدمة",
              ].map((r) => (
                <div key={r} className="flex items-start gap-2 p-3 rounded-lg" style={{ background: "rgba(0,0,0,0.25)" }}>
                  <CheckCircle2 size={12} color={P} className="flex-shrink-0 mt-0.5" />
                  <span className="text-[11px] ar-body" style={{ color: "rgba(255,255,255,0.75)" }}>{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 7. CHATBOT ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHead eyebrow="٧ · الشات بوت" subtitle="طبقة تواصل رقمية مباشرة على الموقع، تُسرّع الرد على استفسارات الزوار وتوجّههم إلى فريق خدمة العملاء.">
            Chatbot <span style={{ color: G }}>Architecture</span>
          </SectionHead>

          {/* Options comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 ph-stagger">
            {[
              { title: "Widget على الموقع", desc: "يُبقي الزائر داخل الموقع أثناء الاستفسار، ويُقدّم إجابات فورية على الأسئلة الشائعة حول الخدمات والأطباء والمواعيد." },
              { title: "ربط مباشر بخدمة العملاء", desc: "عند الحاجة لاستفسار خاص أو حجز، يُحوّل الشات بوت المحادثة مباشرة إلى فريق خدمة العملاء للمتابعة." },
              { title: "قاعدة معرفة ديناميكية", desc: "الشات بوت يقرأ من قاعدة بيانات المجمع: الأطباء، التخصصات، مواعيد العمل، الأسعار، التأمينات — ويُحدّث الإجابات تلقائياً." },
              { title: "المقترح — نموذج مخصص بالكامل", desc: "بناء الشات بوت كطبقة خاصة بالمجمع عبر API داخلي، بسلوك ونبرة وقواعد معرفة يضعها الفريق، دون اعتماد على منصة جاهزة من طرف ثالث.", best: true },
            ].map((o) => (
              <div key={o.title} className="ph-item rounded-[20px] p-6 relative" style={{ background: "#fff", border: o.best ? `2px solid ${G}` : "1px solid #EBEBEB", boxShadow: o.best ? `4px 4px 0px 0px ${D}` : "none" }}>
                {o.best && <span className="absolute -top-3 right-5 text-[10px] font-bold px-3 py-1 rounded-full" style={{ background: D, color: G }}>المقترح</span>}
                <p className="text-[13px] font-bold ar-body mb-3" style={{ color: D }}>{o.title}</p>
                <p className="text-[11px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>{o.desc}</p>
              </div>
            ))}
          </div>

          {/* Conversation flow — chat mockup */}
          <div className="rounded-[24px] overflow-hidden mb-10" style={{ background: "#F5F7FA", border: "1px solid #EBEBEB" }}>
            <div className="flex items-center gap-3 px-6 py-4" style={{ background: D }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: G }}>
                <Bot size={16} color={D} />
              </div>
              <div className="flex-1">
                <p className="text-[12px] font-bold" style={{ color: "#fff" }}>مساعد مجمع الرقي</p>
                <p className="text-[10px]" style={{ color: G }}>متصل · يرد خلال ثانية</p>
              </div>
            </div>
            <div className="p-6 md:p-8 flex flex-col gap-3" style={{ maxWidth: 680, margin: "0 auto" }}>
              <div className="rounded-[16px] p-4 max-w-[85%] self-start" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                <p className="text-[12px] ar-body">مرحباً بك في مجمع الرقي الطبي! كيف يمكنني مساعدتك؟ 👋</p>
              </div>
              <div className="flex flex-wrap gap-2 self-start max-w-[85%]">
                {[
                  { icon: "📅", text: "حجز موعد" },
                  { icon: "📋", text: "الاستفسار عن خدمة" },
                  { icon: "👨‍⚕️", text: "معرفة الأطباء" },
                  { icon: "🕐", text: "مواعيد العمل" },
                  { icon: "💰", text: "الأسعار والتأمين" },
                  { icon: "🚨", text: "طوارئ" },
                  { icon: "📍", text: "الموقع" },
                ].map((b) => (
                  <span key={b.text} className="text-[11px] px-3 py-1.5 rounded-full ar-body" style={{ background: "#fff", border: `1px solid ${G}40`, color: D }}>
                    {b.icon} {b.text}
                  </span>
                ))}
              </div>
              <div className="rounded-[16px] p-4 max-w-[85%] self-end" style={{ background: G }}>
                <p className="text-[12px] ar-body" style={{ color: D }}>📅 حجز موعد</p>
              </div>
              <div className="rounded-[16px] p-4 max-w-[85%] self-start" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                <p className="text-[12px] ar-body mb-2">اختر التخصص المطلوب:</p>
                <div className="flex flex-wrap gap-1.5">
                  {["أسنان", "جلدية", "قلب", "نفسي", "مسالك"].map((s) => (
                    <span key={s} className="text-[10px] px-2.5 py-1 rounded-full ar-body" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB", color: "rgba(0,0,0,0.65)" }}>{s}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-[16px] p-4 max-w-[85%] self-start" style={{ background: "#fff", border: `1px solid ${G}30` }}>
                <p className="text-[12px] ar-body" style={{ color: "rgba(0,0,0,0.65)" }}>تم استلام طلبك. سيتواصل معك فريق خدمة العملاء خلال وقت قصير لتأكيد الموعد المناسب.</p>
              </div>
            </div>
          </div>

          {/* Custom API approach */}
          <h3 className="ar-heading text-xl mb-5 flex items-center gap-2"><Code2 size={18} color={G} /> ٧.٣ · منهج التنفيذ — Custom API</h3>

          <div className="rounded-[20px] p-6 md:p-8 mb-8" style={{ background: `${G}06`, border: `1px solid ${G}25` }}>
            <p className="text-[13px] ar-body leading-relaxed" style={{ color: D }}>
              المقترح بناء الشات بوت بشكل مخصص عبر <strong style={{ color: G }}>API خاص بالمجمع</strong>، دون الاعتماد على منصة جاهزة من طرف ثالث. هذا يمنح المجمع تحكماً كاملاً في البيانات، ومنطق المحادثة، ونبرة الخطاب، ومسار الـ Escalation — بما يتوافق مع سير العمل الداخلي الفعلي.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ph-stagger">
            {[
              { t: "منطق محادثة مُصمَّم وفق إجراءات المجمع الفعلية، لا قوالب عامة.", icon: Layers },
              { t: "تكامل مباشر مع نظام الحجز وقاعدة بيانات الأطباء والتخصصات.", icon: Database },
              { t: "نموذج لغوي يتعامل مع اللهجة الخليجية والعربية الفصحى معاً.", icon: MessageCircle },
              { t: "تحويل المحادثة إلى فريق خدمة العملاء عند الحاجة لاستفسار خاص أو حجز.", icon: Phone },
              { t: "ملكية كاملة للبيانات والمحادثات، دون مشاركة مع طرف خارجي.", icon: Shield },
              { t: "لوحة تحكم داخلية لمراجعة المحادثات وتحديث قاعدة المعرفة.", icon: BarChart3 },
              { t: "استجابة فورية على مدار الساعة، مع تحديد واضح لحدود البوت الطبية.", icon: Clock },
              { t: "مرونة في التوسعة لاحقاً: إشعارات، متابعة، استبيانات رضا.", icon: Sparkles },
            ].map((r) => (
              <div key={r.t} className="ph-item flex items-start gap-3 p-4 rounded-[14px]" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
                <r.icon size={14} color={G} className="flex-shrink-0 mt-0.5" />
                <span className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>{r.t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 8. ROADMAP ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#FAFAFA" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHead eyebrow="٨ · خريطة الطريق" subtitle="٩٠ يوم — ثلاث مراحل متكاملة. كل مرحلة تبني على التي قبلها وتنتهي بنتيجة قابلة للقياس.">
            خطة <span style={{ color: G }}>التنفيذ</span>
          </SectionHead>

          <div className="flex flex-col gap-5">
            {[
              {
                phase: "1",
                name: "الأساس التقني",
                weeks: "أسبوع 1-4",
                color: G,
                tasks: [
                  "مراجعة إعدادات Rank Math / Yoast الحالية وضبط sitemap.xml للتأكد من إرساله المنتظم إلى Search Console",
                  "إضافة MedicalOrganization Schema على الرئيسية",
                  "إعادة تسمية روابط URL + إعداد 301 Redirects",
                  "تحسين Core Web Vitals: WebP للصور + lazy loading",
                  "إضافة FAQPage Schema + تحديث صفحة الأسئلة الشائعة",
                  "إنشاء ملف llms.txt ورفعه على الموقع",
                  "توحيد مواعيد العمل في كل مكان + تحديث GBP",
                  "بناء الشات بوت المخصص عبر API داخلي + تصميم الـ flow الأساسي",
                ],
              },
              {
                phase: "2",
                name: "المحتوى و On-Page",
                weeks: "أسبوع 5-8",
                color: B,
                tasks: [
                  "إعادة كتابة Title Tags و Meta Descriptions لكل الصفحات",
                  "تحديث صفحات الأطباء: Bio + تخصص + Physician Schema",
                  "نشر أول 4 مقالات طبية (خطة الشهر الأول)",
                  "تحسين Google Business Profile: صور + خدمات + attributes",
                  "توسيع صفحة الأسئلة الشائعة القائمة وإضافة FAQ Schema عليها",
                  "Physician Schema لكل الأطباء",
                  "مراجعة ملفات المجمع على الدلائل الصحية (Doctori, Vezeeta, Wakthalsaha, صحتي) وتوحيد بياناتها",
                  "تفعيل Google Posts أسبوعياً على GBP",
                ],
              },
              {
                phase: "3",
                name: "النمو والقياس",
                weeks: "أسبوع 9-12",
                color: P,
                tasks: [
                  "نشر مقالات الشهر الثاني (4 مقالات)",
                  "تحليل أداء: GSC + GA4 + Chatbot analytics",
                  "تطوير الشات بوت: ربط مباشر بمسار الحجز عبر فريق خدمة العملاء",
                  "Link Building: تواصل مع مواقع صحية سعودية",
                  "نشر مقالات الحج والعمرة (تحضير موسمي)",
                  "مراجعة Rankings وتحديث الصفحات الأضعف أداءً",
                  "تقرير شهري شامل: Traffic، Conversions، Rankings",
                  "تخطيط الربع الثاني بناءً على النتائج",
                ],
              },
            ].map((p) => (
              <div key={p.phase} className="rounded-[24px] overflow-hidden" style={{ border: `2px solid ${p.color}25`, background: "#fff", boxShadow: "0 2px 20px rgba(0,0,0,0.04)" }}>
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-[220px] flex-shrink-0 p-8 flex flex-col items-center justify-center text-center" style={{ background: p.color }}>
                    <div className="text-[9px] font-bold tracking-[3px] uppercase mb-1" style={{ color: "rgba(0,0,0,0.4)" }}>المرحلة</div>
                    <div className="ar-heading text-5xl mb-2" style={{ color: D }}>{p.phase}</div>
                    <div className="ar-heading text-base mb-2" style={{ color: D }}>{p.name}</div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.08)" }}>
                      <Clock size={11} color={D} />
                      <span className="text-[11px] font-bold" style={{ color: D }}>{p.weeks}</span>
                    </div>
                  </div>
                  <div className="flex-1 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {p.tasks.map((t) => (
                        <div key={t} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "#FAFAFA" }}>
                          <CheckCircle2 size={14} color={p.color} className="flex-shrink-0 mt-0.5" />
                          <span className="text-[11px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 9. OBJECTIVES ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
        <div className="max-w-5xl mx-auto">
          <SectionHead eyebrow="٩ · مخرجات الخطة" color={G} light subtitle="ما تسعى الخطة إلى تحقيقه بنهاية المرحلة الأولى — مخرجات قابلة للمراجعة والمتابعة، لا وعود رقمية.">
            <span style={{ color: "#fff" }}>المخرجات </span><span style={{ color: G }}>المستهدفة</span>
          </SectionHead>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ph-stagger">
            {[
              { metric: "الظهور في نتائج البحث المحلية", desc: "تعزيز ترتيب الموقع على الكيوردز المحلية المرتبطة بالتخصصات الطبية في مكة المكرمة.", color: G, icon: Search },
              { metric: "اكتمال فهرسة الموقع", desc: "ضمان فهرسة كل صفحات الخدمات والأطباء في Google Search Console بشكل نظيف.", color: B, icon: FileText },
              { metric: "توسيع الحضور على Google Business", desc: "ملف أعمال مُحدَّث بالكامل مع منشورات وصور وتفاعل مستمر مع المراجعين.", color: A, icon: MapPin },
              { metric: "الحضور في نتائج الذكاء الاصطناعي", desc: "تعزيز ظهور المجمع في إجابات ChatGPT و Perplexity و Google AI Overviews، بالبناء على الحضور الرقمي القائم وتوسيعه ليشمل قنوات الذكاء الاصطناعي الحديثة.", color: P, icon: Bot },
              { metric: "مسار رقمي موحّد للحجز", desc: "ربط الشات بوت بمسار خدمة العملاء لتقليل الفاقد في المراحل بين الاستفسار وتأكيد الموعد.", color: O, icon: MessageCircle },
              { metric: "أداء تقني محسَّن", desc: "تحسين سرعة التحميل ومؤشرات Core Web Vitals على الموبايل والحاسوب.", color: R, icon: Zap },
              { metric: "حضور في Featured Snippets", desc: "استهداف إجابات البحث السريعة على الاستفسارات الطبية الشائعة بين سكان مكة وزوارها.", color: G, icon: Sparkles },
              { metric: "مكتبة محتوى طبي متخصص", desc: "توسيع المحتوى الطبي في المدونة بمقالات موقّعة من أطباء المجمع، وفق معايير E-E-A-T للمحتوى الصحي.", color: B, icon: BookOpen },
            ].map((k) => (
              <div key={k.metric} className="ph-item rounded-[20px] p-6" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${k.color}25` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${k.color}18` }}>
                    <k.icon size={16} color={k.color} />
                  </div>
                  <p className="text-[13px] font-bold ar-body" style={{ color: "#fff" }}>{k.metric}</p>
                </div>
                <p className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{k.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[16px] p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-start gap-3">
              <BarChart3 size={16} color={G} className="flex-shrink-0 mt-0.5" />
              <p className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                تُراجَع المؤشرات شهرياً عبر Google Search Console و Google Analytics و Google Business Insights، ويُقدَّم تقرير أداء دوري يوضح التقدم ومجالات التحسين المطلوبة في المرحلة التالية.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CLOSING ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px 60px", background: "#fff" }}>
        <div className="max-w-3xl mx-auto">

          <div className="rounded-[24px] p-8 md:p-12 mb-8 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${G}06 0%, ${O}06 100%)`, border: `1px solid ${G}25` }}>
            <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none" style={{ background: `radial-gradient(circle, ${G}15 0%, transparent 70%)` }} />
            <p className="text-[14px] ar-body leading-relaxed mb-4" style={{ color: "rgba(0,0,0,0.75)" }}>
              الخطة مبنية على الحضور الرقمي القائم لمجمع الرقي، وتتعامل معه كأساس يُبنى عليه لا كنقطة انطلاق من الصفر. المحاور الثمانية مترابطة، وتغطي الجانب التقني والمحتوى والـ AEO والشات بوت ضمن مراحل تنفيذ متتابعة.
            </p>
            <p className="text-[14px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.75)" }}>
              الهدف هو مواكبة تطورات محركات البحث وأدوات الذكاء الاصطناعي، وتوسيع وصول المجمع لشريحة أوسع من الباحثين عن رعاية طبية في مكة المكرمة — من السكان والزوار في مواسم الحج والعمرة. الوثيقة مفتوحة للنقاش والتعديل بما يتناسب مع أولويات الفريق وسير العمل الداخلي.
            </p>
          </div>

          <div className="rounded-[24px] p-10 md:p-14 text-center" style={{ border: "1px solid #EBEBEB" }}>
            <img src="/ahmed.jpeg" alt="Ahmed Ali" className="w-24 h-24 rounded-full object-cover mx-auto mb-6" style={{ border: `3px solid ${G}` }} />
            <h3 className="ar-heading text-3xl mb-2">جاهز للبدء؟</h3>
            <p className="text-[13px] ar-body mb-8" style={{ color: "rgba(0,0,0,0.5)" }}>خلّنا نحوّل الخطة إلى نتائج قابلة للقياس.</p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <a href="https://wa.me/201011648156" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold" style={{ background: G, color: D, border: `2px solid ${D}`, boxShadow: `4px 4px 0px 0px ${D}`, textDecoration: "none" }}>
                <MessageCircle size={16} /> واتساب
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
            &copy; {new Date().getFullYear()} Ahmed Ali. مُعد خصيصاً لمجمع الرقي العام الطبي — مكة المكرمة.
          </p>
        </div>
      </section>

    </div>
    </ArabicTailProcessor>
  );
}

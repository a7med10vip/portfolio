"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Building2, Globe, ShoppingBag, Smartphone, Wrench, Brain,
  AlertTriangle, CheckCircle2, XCircle, Clock, Shield, Search,
  BarChart3, Users, Star, Zap, MessageCircle, ArrowRight,
  ExternalLink, Eye, FileText, Layers, Target, TrendingUp,
  Bot, Calculator, MapPin, Bell, PenTool, Calendar,
  Server, Code2, Palette, Megaphone, Hammer, ThermometerSun,
  type LucideIcon,
} from "lucide-react";
import ArabicTailProcessor from "@/components/ArabicTailProcessor";

gsap.registerPlugin(ScrollTrigger);

const G = "#4FFFB0";
const D = "#0A0A0A";
const R = "#EF4444";
const A = "#F59E0B";
const P = "#5227FF";
const B = "#3B82F6";
const T = "#14B8A6"; // teal for zain brand

function RatingBadge({ score, label }: { score: string; label: string }) {
  const num = parseFloat(score);
  const color = num >= 7 ? G : num >= 4 ? A : R;
  return (
    <div className="flex items-center gap-2">
      <span className="px-3 py-1 rounded-full text-[11px] font-bold" style={{ background: `${color}15`, color }}>{score}/10</span>
      <span className="text-[10px] font-bold" style={{ color }}>{label}</span>
    </div>
  );
}

export default function ZainDevProposal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ph-hero", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: "power4.out", delay: 0.3 });
      gsap.utils.toArray<HTMLElement>(".ph-slide").forEach((el) => {
        gsap.fromTo(el, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".ph-stagger").forEach((el) => {
        gsap.fromTo(el.querySelectorAll(".ph-item"), { y: 40, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 82%", once: true } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  /* ═══ DATA ═══ */

  const zynqorePages = [
    { page: "الرئيسية", score: "3", label: "ضعيف", note: "المحتوى يعتمد على JS بالكامل (CSR) — محركات البحث لا تراه. الهيرو والأقسام تحتاج وقت تحميل طويل" },
    { page: "من نحن", score: "2", label: "ضعيف", note: "الصفحة شبه فارغة. لا قصة، لا فريق، لا إنجازات. صفحة حرجة لبناء الثقة" },
    { page: "الخدمات", score: "2", label: "ضعيف", note: "عنوان + حقل تتبع فقط. لا توجد قائمة خدمات أو تفاصيل أو أسعار" },
    { page: "الحلول", score: "4", label: "متوسط", note: "محتوى عام (4 عناصر) بدون تفاصيل أو أمثلة حقيقية" },
    { page: "خطط الأسعار", score: "1", label: "ضعيف", note: "عنوان وCTA فقط. لا باقات، لا أسعار، لا مقارنة ميزات" },
    { page: "المشاريع", score: "1", label: "ضعيف", note: "البورتفوليو فارغ 100% — فلتر تصفية بدون أي مشروع" },
    { page: "الوظائف", score: "1", label: "ضعيف", note: 'يعرض "تم العثور على 0 وظيفة". فلتر بدون محتوى' },
    { page: "التذاكر", score: "4", label: "متوسط", note: "نموذج إنشاء تذكرة + تتبع موجود. يحتاج ربط Backend فعلي" },
    { page: "تواصل معنا", score: "5", label: "متوسط", note: "نموذج جيد بحقول متعددة. لكن بيانات التواصل وهمية" },
    { page: "إضافة مشروع", score: "6", label: "متوسط", note: "أفضل صفحة — نموذج شامل بحقول معلومات شخصية + مشروع" },
    { page: "السياسات", score: "1", label: "ضعيف", note: 'تعرض "جاري التحميل" فقط + سياسات شحن/استرجاع لشركة خدمات!' },
  ];

  const zaindevPages = [
    { page: "الرئيسية", score: "4", label: "متوسط", note: "قسم المتجر مكرر 5 مرات بنفس النص! الصفحة طويلة جداً ومشتتة" },
    { page: "من نحن", score: "5", label: "متوسط", note: "محتوى جيد (قصة، قيم، إنجازات). لكن كل الصور Freepik والتقييمات بأفاتار موحد" },
    { page: "الخدمات", score: "6", label: "متوسط", note: "هيكل ممتاز (7 تصنيفات، 40+ خدمة، منهجية 6 خطوات). يحتاج تفاصيل وأسعار" },
    { page: "الاستشارات", score: "6", label: "متوسط", note: "صفحة جيدة بنموذج + FAQ + فوائد. الصور Freepik" },
    { page: "المتجر", score: "2", label: "ضعيف", note: 'منتجات بصور فكتور وأسعار غير حقيقية. زر "أضف للسلة" لا يعمل' },
    { page: "التطبيق", score: "2", label: "ضعيف", note: "قسم جذاب ب 6 ميزات. لكن روابط التطبيق تشير ل # (لا تطبيق فعلي)" },
    { page: "خريطة التغطية", score: "2", label: "ضعيف", note: "صورة Freepik وليست خريطة حقيقية. قوائم المدن فارغة" },
    { page: "الشركاء", score: "1", label: "ضعيف", note: 'قسم "شركاؤنا في النجاح" بدون أي لوجوهات أو أسماء فعلية' },
  ];

  const storeHomepage = [
    { item: "الهيرو بانر", score: "4", note: "إلستريشن كرتوني غير احترافي. يحتاج صورة مكيف حقيقي مع CTA أقوى" },
    { item: "تصنيف النوع", score: "6", note: "7 أنواع موجودة (سبليت، شباك، كاسيت...) لكن الأيقونات صغيرة وغير واضحة" },
    { item: "قسم البراندز", score: "7", note: "6 براندز بلوجوهات (GREE, Midea, BASIC, Carrier, Cooline, Koolen). جيد" },
    { item: "شبكة المنتجات", score: "5", note: "منتجات معروضة بأسعار وصور. لكن بدون بادج خصم أو تقييم أو Quick Add" },
    { item: "التقييمات", score: "3", note: "3 تقييمات بأفاتارات Freepik وهمية. تفقد المصداقية" },
  ];

  const storeProduct = [
    { item: "الصور", score: "5", note: "صور منتج موجودة. يحتاج صور أكثر + زوم + 360°" },
    { item: "السعر", score: "7", note: "سعر واضح مع خصم 5%. يحتاج إبراز التوفير بشكل أقوى" },
    { item: "خيارات التركيب", score: "8", note: "ميزة ممتازة! 4 خيارات تركيب إضافية بأسعار. Upsell ذكي" },
    { item: "المواصفات", score: "7", note: "جدول مواصفات منظم (النوع، البراند، القدرة، التبريد، الضمان)" },
    { item: "بادجات المميزات", score: "7", note: "بادجات جيدة (واي فاي، تبريد جوي، بلازما، تقسيط)" },
  ];

  const storeCheckout = [
    { item: "طرق الدفع", score: "1", note: "كارثي: tabby, tamara, stc pay كلها وهمية 100%. لا يوجد ربط فعلي بأي بوابة دفع", color: R },
    { item: "تأكيد الطلب", score: "1", note: "لا يوجد إيصال أو تأكيد عبر إيميل أو SMS أو WhatsApp", color: R },
    { item: "كود خصم", score: "1", note: "غير موجود نهائياً. لا حقل لإدخال كوبون", color: R },
    { item: "تسجيل دخول", score: "1", note: "لا يوجد نظام حسابات عملاء أو سجل طلبات", color: R },
    { item: "الأمان", score: "2", note: 'بادج "الدفع آمن ومشفر" موجود لكنه وهمي لأن الدفع لا يعمل أصلاً', color: R },
    { item: "ملخص الطلب", score: "6", note: "موجود (مجموع + شحن + ضريبة 15% + إجمالي). بدون تفاصيل المنتجات", color: A },
  ];

  const aiSolutions = [
    { icon: Bot, title: "AI Chatbot", desc: "شات بوت مدرب على خدمات زين يرد 24/7 على الأسعار والمواعيد ويحجز الزيارات", benefit: "تقليل الضغط على الدعم 70% وزيادة التحويلات", color: G },
    { icon: Calculator, title: "تقدير التكلفة", desc: "العميل يدخل نوع المشروع + المساحة + الموقع ويحصل على تقدير فوري", benefit: "تحويل الزائر إلى Lead مؤهل فوراً", color: P },
    { icon: Target, title: "تخصيص المحتوى", desc: "عرض خدمات مختلفة حسب موقع الزائر (أحساء/خبر/رياض) وسلوكه", benefit: "زيادة Relevance وتحسين Conversion Rate", color: B },
    { icon: BarChart3, title: "لوحة تحكم ذكية", desc: "Dashboard بتحليلات AI تتنبأ بالطلب الموسمي (صيف = تكييف)", benefit: "اتخاذ قرارات استراتيجية مبنية على بيانات", color: A },
    { icon: Calendar, title: "جدولة ذكية", desc: "نظام يوزع الفنيين حسب الموقع والتخصص والحمل الحالي", benefit: "تقليل وقت الاستجابة وزيادة رضا العملاء", color: T },
    { icon: PenTool, title: "محتوى AI", desc: "توليد وصف خدمات ومقالات مدونة بالذكاء الاصطناعي", benefit: "محتوى SEO مستمر بدون تكلفة كاتب", color: G },
  ];

  const seoComparison = [
    { item: "Meta Title", zynqore: { status: "warn", text: "عام" }, zaindev: { status: "ok", text: "موجود لكن طويل" } },
    { item: "Meta Description", zynqore: { status: "bad", text: "غير موجود" }, zaindev: { status: "warn", text: "عام" } },
    { item: "Open Graph", zynqore: { status: "bad", text: "غير موجود" }, zaindev: { status: "bad", text: "غير موجود" } },
    { item: "Sitemap.xml", zynqore: { status: "bad", text: "غير موجود" }, zaindev: { status: "warn", text: "غير مؤكد" } },
    { item: "Schema Markup", zynqore: { status: "bad", text: "غير موجود" }, zaindev: { status: "bad", text: "غير موجود" } },
    { item: "Rendering", zynqore: { status: "bad", text: "CSR فقط" }, zaindev: { status: "warn", text: "CSR" } },
    { item: "Analytics", zynqore: { status: "bad", text: "غير موجود" }, zaindev: { status: "bad", text: "غير موجود" } },
    { item: "SSL", zynqore: { status: "ok", text: "Vercel HTTPS" }, zaindev: { status: "ok", text: "HTTPS" } },
  ];

  function StatusIcon({ status }: { status: string }) {
    if (status === "ok") return <CheckCircle2 size={14} color={G} />;
    if (status === "warn") return <AlertTriangle size={14} color={A} />;
    return <XCircle size={14} color={R} />;
  }

  return (
    <ArabicTailProcessor>
    <div ref={ref} style={{ background: "#fff", color: D, fontFamily: "'Ahmed Sans', sans-serif" }}>

      {/* ═══ HERO ═══ */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: "#fff" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] pointer-events-none" style={{ background: `radial-gradient(ellipse, ${T}18 0%, transparent 70%)` }} />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center">
          <div className="ph-hero opacity-0 text-center mb-4" style={{ paddingTop: 40 }}>
            <p className="text-[13px] font-bold tracking-wider" style={{ color: "rgba(0,0,0,0.3)" }}>أبريل 2026</p>
          </div>

          <div className="ph-hero opacity-0 text-center mb-4">
            <h1 className="ar-heading" style={{ fontSize: "clamp(36px, 8vw, 80px)", lineHeight: 1.3, color: D }}>عرض فني ومالي متكامل</h1>
          </div>

          <div className="ph-hero opacity-0 text-center mb-4">
            <p className="ar-heading text-2xl md:text-3xl" style={{ color: T }}>التحول الرقمي الشامل</p>
          </div>

          <div className="ph-hero opacity-0 text-center mb-8">
            <p className="ar-body text-lg" style={{ color: "rgba(0,0,0,0.4)" }}>لشركة زين التنموية | Zain Development</p>
          </div>

          <div className="ph-hero opacity-0 text-center mb-10">
            <p className="text-[12px] ar-body" style={{ color: "rgba(0,0,0,0.3)" }}>تحليل شامل • استراتيجية UX/UI • خطة SEO • دمج AI • رؤية نمو</p>
          </div>

          {/* From / To */}
          <div className="ph-hero opacity-0 grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 w-full max-w-xl">
            <div className="rounded-[16px] p-5" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
              <p className="text-[10px] font-bold tracking-[2px] uppercase mb-2" style={{ color: G }}>مقدم من</p>
              <p className="text-[14px] font-bold ar-body">Ahmed Ali</p>
              <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>Full-Stack Digital Strategist</p>
              <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.3)" }}>+5 سنوات خبرة في الخليج</p>
            </div>
            <div className="rounded-[16px] p-5" style={{ background: "#fff", border: `2px solid ${T}`, boxShadow: `3px 3px 0px 0px ${D}` }}>
              <p className="text-[10px] font-bold tracking-[2px] uppercase mb-2" style={{ color: T }}>مقدم إلى</p>
              <p className="text-[14px] font-bold ar-body">شركة زين التنموية</p>
              <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>الأحساء • المنطقة الشرقية</p>
              <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.3)" }}>0547302222</p>
            </div>
          </div>

          {/* Stats */}
          <div className="ph-hero opacity-0 mb-10 w-full max-w-xl">
            <div className="flex items-stretch justify-center" style={{ background: "#fff", border: "1px solid #E8E8E8", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
              {[
                { n: "4", l: "مراحل" },
                { n: "10", l: "أسابيع" },
                { n: "2", l: "موقعين" },
              ].map((s, i) => (
                <div key={s.l} className="flex-1 flex flex-col items-center justify-center py-5 px-2 relative" style={{ borderRight: i > 0 ? "1px solid #F0F0F0" : "none" }}>
                  <span className="ar-heading" style={{ fontSize: 32, lineHeight: 1, color: D }}>{s.n}</span>
                  <span className="text-[10px] font-bold mt-1 ar-body" style={{ color: "rgba(0,0,0,0.3)" }}>{s.l}</span>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-t-full" style={{ background: T }} />
                </div>
              ))}
            </div>
          </div>

          {/* Vision */}
          <div className="ph-hero opacity-0 rounded-[16px] p-6 text-center mb-10 max-w-2xl" style={{ background: `${T}08`, border: `1px solid ${T}20` }}>
            <p className="text-[13px] ar-body font-medium leading-relaxed" style={{ color: D }}>
              <strong style={{ color: T }}>الرؤية:</strong> تحويل الحضور الرقمي لزين التنموية من موقعين بحاجة للتطوير إلى منصتين رقميتين احترافيتين بهوية موحدة تعكسان قوة الشركة وتاريخها
            </p>
          </div>

          {/* Scroll */}
          <div className="ph-hero opacity-0 flex flex-col items-center gap-2">
            <div style={{ width: 24, height: 38, border: "1.5px solid rgba(0,0,0,0.14)", borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 5 }}>
              <div style={{ width: 3, height: 6, borderRadius: 2, background: T, animation: "mouseScroll 1.6s ease-in-out infinite" }} />
            </div>
          </div>
        </div>
        <style>{`@keyframes mouseScroll{0%{transform:translateY(0);opacity:1}75%{transform:translateY(9px);opacity:0}76%{transform:translateY(0);opacity:0}100%{opacity:1}}`}</style>
      </section>

      {/* ═══ EXECUTIVE SUMMARY ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="ar-heading text-lg mb-3" style={{ color: T }}>القسم الأول</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5">الملخص التنفيذي</h2>
          </div>
          <div className="rounded-[20px] p-8 md:p-10" style={{ border: "1px solid #EBEBEB" }}>
            <p className="text-[14px] ar-body leading-[2] mb-6" style={{ color: D }}>
              يسعدني تقديم هذا العرض الفني والمالي الشامل للتحول الرقمي لشركة زين التنموية (Zain Development)، المؤسسة السعودية المتخصصة في المقاولات والتكييف والصيانة والتسويق الإلكتروني منذ أكثر من 15 عاماً، بمقرها في الأحساء بالمنطقة الشرقية.
            </p>
            <p className="text-[14px] ar-body leading-[2]" style={{ color: "rgba(0,0,0,0.6)" }}>
              يغطي هذا العرض تحليلاً شاملاً لموقعين تابعين للشركة: موقع Zynqore للحلول التقنية وموقع ZainDev الرئيسي للمقاولات، ويقدم رؤية متكاملة للتطوير تشمل تحليل UX/UI، تحسين SEO، دمج الذكاء الاصطناعي، واستراتيجية نمو شاملة.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ COMPANY CONTEXT ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="ar-heading text-lg mb-3" style={{ color: T }}>القسم الثاني</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5">فهم <span style={{ color: T }}>الشركة</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ph-stagger">
            {[
              { icon: Hammer, title: "المقاولات العامة", desc: "التطوير العقاري سكني وتجاري" },
              { icon: ThermometerSun, title: "خدمات التكييف", desc: "توريد، تركيب، صيانة، تمديد مواسير نحاس" },
              { icon: Wrench, title: "الصيانة الشاملة", desc: "كهرباء، سباكة، تنظيف" },
              { icon: Palette, title: "التصميم والديكور", desc: "التصميم والديكور الداخلي" },
              { icon: Megaphone, title: "التسويق الإلكتروني", desc: "الحلول التقنية عبر Zynqore" },
              { icon: ShoppingBag, title: "التجارة الإلكترونية", desc: "متجر زين للمكيفات" },
            ].map((s) => (
              <div key={s.title} className="ph-item rounded-[16px] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{ background: `${T}10` }}>
                  <s.icon size={20} color={T} />
                </div>
                <h3 className="text-[14px] font-bold ar-body mb-1">{s.title}</h3>
                <p className="text-[12px] ar-body" style={{ color: "rgba(0,0,0,0.45)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-[16px] p-6 text-center" style={{ background: `${T}08`, border: `1px solid ${T}20` }}>
            <p className="text-[13px] ar-body" style={{ color: D }}>
              <strong style={{ color: T }}>التحدي الرئيسي:</strong> الموقعان الحاليان لا يعكسان حجم الشركة وخبرتها الفعلية — 15+ عام و500+ مشروع
            </p>
          </div>
        </div>
      </section>

      {/* ═══ ZYNQORE ANALYSIS ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="ar-heading text-lg mb-3" style={{ color: T }}>القسم الثالث</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-3" style={{ color: "#fff" }}>تحليل موقع <span style={{ color: T }}>Zynqore Tech</span></h2>
            <p className="text-sm ar-body" style={{ color: "rgba(255,255,255,0.4)" }}>tech-pearl-rho.vercel.app • الذراع التقني لزين التنموية</p>
          </div>

          {/* Brand issues */}
          <div className="rounded-[20px] p-7 mb-10" style={{ background: `${R}10`, border: `1px solid ${R}25` }}>
            <h3 className="ar-heading text-lg mb-4" style={{ color: "#fff" }}>مشاكل الهوية والبراند</h3>
            <div className="flex flex-col gap-3">
              {[
                'ثلاثة أسماء مختلفة في موقع واحد: Tab يعرض "Zain Tech"، البراند يعرض "Zynqore"، الشركة اسمها "زين التنموية"',
                "اللوجو مجرد حرف Z بدون هوية بصرية مهنية أو ارتباط بالشركة الأم",
                "الموقع مستضاف على vercel.app (دومين مجاني) بدلاً من نطاق فرعي من zaindev.com.sa",
                '3 لغات معروضة (عربي/إنجليزي/روسي) لكن الترجمة غير مفعلة فعلياً',
                "بيانات التواصل وهمية (هاتف +966 11 123 4567)",
              ].map((issue) => (
                <div key={issue} className="flex items-start gap-3">
                  <AlertTriangle size={16} color={R} className="flex-shrink-0 mt-1" />
                  <span className="text-[12px] ar-body" style={{ color: "rgba(255,255,255,0.6)" }}>{issue}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Page ratings */}
          <div className="flex flex-col gap-3 ph-stagger">
            {zynqorePages.map((p) => {
              const num = parseFloat(p.score);
              const color = num >= 7 ? G : num >= 4 ? A : R;
              return (
                <div key={p.page} className="ph-item rounded-[16px] p-5 flex items-center gap-4" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                  <span className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ar-heading text-lg" style={{ background: `${color}15`, color }}>{p.score}</span>
                  <div className="flex-1">
                    <h4 className="text-[14px] font-bold ar-body mb-0.5">{p.page}</h4>
                    <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>{p.note}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold flex-shrink-0 hidden md:block" style={{ background: `${color}12`, color }}>{p.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ ZAINDEV ANALYSIS ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="ar-heading text-lg mb-3" style={{ color: T }}>القسم الرابع</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-3">تحليل موقع <span style={{ color: T }}>ZainDev</span></h2>
            <p className="text-sm ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>zaindev.com.sa • الموقع الرئيسي للمقاولات والخدمات</p>
          </div>

          {/* Content issues */}
          <div className="rounded-[20px] p-7 mb-10" style={{ background: `${A}08`, border: `1px solid ${A}20` }}>
            <h3 className="ar-heading text-lg mb-4">مشاكل المحتوى والمصداقية</h3>
            <div className="flex flex-col gap-3">
              {[
                "كل الصور من Freepik المجانية — لا توجد صورة حقيقية واحدة للشركة أو مشاريعها أو فريقها",
                "تقييمات العملاء تستخدم نفس الأفاتار (businessman avatar) لكل الأشخاص",
                "قسم المتجر مكرر 5 مرات بنفس النص حرفياً في الصفحة الرئيسية",
                'رابط "تطوير وتصميم بواسطة" في الفوتر يشير إلى example.com',
                "الإحصائيات (500+ مشروع، 200+ موظف) تحتاج توثيق لبناء المصداقية",
              ].map((issue) => (
                <div key={issue} className="flex items-start gap-3">
                  <AlertTriangle size={16} color={A} className="flex-shrink-0 mt-1" />
                  <span className="text-[12px] ar-body" style={{ color: "rgba(0,0,0,0.55)" }}>{issue}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 ph-stagger">
            {zaindevPages.map((p) => {
              const num = parseFloat(p.score);
              const color = num >= 7 ? G : num >= 4 ? A : R;
              return (
                <div key={p.page} className="ph-item rounded-[16px] p-5 flex items-center gap-4" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                  <span className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ar-heading text-lg" style={{ background: `${color}15`, color }}>{p.score}</span>
                  <div className="flex-1">
                    <h4 className="text-[14px] font-bold ar-body mb-0.5">{p.page}</h4>
                    <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>{p.note}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold flex-shrink-0 hidden md:block" style={{ background: `${color}12`, color }}>{p.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ STORE ANALYSIS ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="ar-heading text-lg mb-3" style={{ color: T }}>القسم الخامس</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-3" style={{ color: "#fff" }}>تحليل <span style={{ color: R }}>المتجر</span> الإلكتروني</h2>
            <p className="text-sm ar-body" style={{ color: "rgba(255,255,255,0.4)" }}>متجر المكيفات — store/air-conditioners</p>
          </div>

          {/* Critical alert */}
          <div className="rounded-[20px] p-7 mb-10" style={{ background: R, border: `2px solid ${D}` }}>
            <p className="text-[14px] ar-body font-bold text-center" style={{ color: "#fff" }}>
              ⚠️ تنبيه حرج: صفحة الدفع هي أضعف حلقة في المتجر. طرق الدفع الثلاث (tabby, tamara, stc pay) كلها وهمية وغير مربوطة ببوابات دفع فعلية. لا يوجد إيصال أو تأكيد.
            </p>
          </div>

          {/* 3 analysis sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { title: "الصفحة الرئيسية", items: storeHomepage, icon: Globe },
              { title: "صفحة المنتج", items: storeProduct, icon: ShoppingBag },
              { title: "صفحة الدفع", items: storeCheckout, icon: Shield },
            ].map((section) => (
              <div key={section.title} className="rounded-[20px] p-6" style={{ background: "#fff" }}>
                <div className="flex items-center gap-3 mb-5">
                  <section.icon size={20} color={T} />
                  <h3 className="ar-heading text-base">{section.title}</h3>
                </div>
                <div className="flex flex-col gap-3">
                  {section.items.map((item) => {
                    const num = parseFloat(item.score);
                    const c = num >= 7 ? G : num >= 4 ? A : R;
                    return (
                      <div key={item.item}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[12px] font-bold ar-body">{item.item}</span>
                          <span className="text-[11px] font-bold" style={{ color: c }}>{item.score}/10</span>
                        </div>
                        <p className="text-[10px] ar-body" style={{ color: "rgba(0,0,0,0.45)" }}>{item.note}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Missing elements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ph-stagger">
            {[
              { title: "عناصر حرجة", color: R, items: ["ربط بوابات دفع فعلية", "نظام تأكيد الطلبات", "نظام إدارة المخزون", "نظام حسابات العملاء", "نظام تتبع الشحنات"] },
              { title: "عناصر مهمة", color: A, items: ["حقل كود خصم / كوبون", "اختيار طريقة الشحن", "شريط تقدم Checkout", "نظام مراجعات موثقة", "مقارنة منتجات + Wishlist"] },
              { title: "عناصر متقدمة", color: G, items: ["شات بوت AI لاختيار المكيف", "حاسبة اختيار المكيف", "برنامج ولاء ونقاط", "إشعارات انخفاض السعر", "ربط Google Merchant Center"] },
            ].map((group) => (
              <div key={group.title} className="ph-item rounded-[20px] p-6" style={{ background: "#fff" }}>
                <h4 className="text-[12px] font-bold tracking-wider uppercase mb-4 ar-body" style={{ color: group.color }}>{group.title}</h4>
                {group.items.map((item) => (
                  <div key={item} className="flex items-start gap-2 mb-3">
                    <CheckCircle2 size={14} color={group.color} className="flex-shrink-0 mt-0.5" />
                    <span className="text-[12px] ar-body" style={{ color: "rgba(0,0,0,0.6)" }}>{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SEO COMPARISON ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="ar-heading text-lg mb-3" style={{ color: T }}>القسم السادس</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5">تحليل <span style={{ color: T }}>SEO</span></h2>
          </div>
          <div className="overflow-x-auto rounded-[20px] border" style={{ borderColor: "#EBEBEB" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
              <thead>
                <tr style={{ background: D }}>
                  <th style={{ padding: "14px 20px", textAlign: "right", fontSize: 11, fontWeight: 700, color: "#fff", fontFamily: "'Ahmed Sans'" }}>العنصر</th>
                  <th style={{ padding: "14px 20px", textAlign: "center", fontSize: 11, fontWeight: 700, color: T, fontFamily: "'Ahmed Sans'" }}>Zynqore</th>
                  <th style={{ padding: "14px 20px", textAlign: "center", fontSize: 11, fontWeight: 700, color: T, fontFamily: "'Ahmed Sans'" }}>ZainDev</th>
                </tr>
              </thead>
              <tbody>
                {seoComparison.map((row, i) => (
                  <tr key={row.item} style={{ background: i % 2 === 0 ? "#fff" : "#FAFAFA", borderBottom: "1px solid #F3F4F6" }}>
                    <td style={{ padding: "12px 20px", fontSize: 13, fontWeight: 700, color: D, fontFamily: "'Ahmed Sans'" }}>{row.item}</td>
                    <td style={{ padding: "12px 20px", textAlign: "center" }}>
                      <div className="flex items-center justify-center gap-2">
                        <StatusIcon status={row.zynqore.status} />
                        <span className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>{row.zynqore.text}</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 20px", textAlign: "center" }}>
                      <div className="flex items-center justify-center gap-2">
                        <StatusIcon status={row.zaindev.status} />
                        <span className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>{row.zaindev.text}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══ AI STRATEGY ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="ar-heading text-lg mb-3" style={{ color: T }}>القسم السابع</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5" style={{ color: "#fff" }}>استراتيجية <span style={{ color: T }}>الذكاء الاصطناعي</span></h2>
            <p className="text-sm ar-body" style={{ color: "rgba(255,255,255,0.4)" }}>رؤية شاملة لكيف يمكن للذكاء الاصطناعي أن يحول تجربة العميل ويرفع كفاءة العمليات</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ph-stagger">
            {aiSolutions.map((s, i) => (
              <div key={s.title} className="ph-item rounded-[20px] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ background: i === 0 ? T : "#fff", border: i === 0 ? `2px solid ${D}` : "1px solid #EBEBEB" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: i === 0 ? "rgba(0,0,0,0.1)" : `${s.color}10` }}>
                  <s.icon size={22} color={i === 0 ? D : s.color} />
                </div>
                <h3 className="ar-heading text-lg mb-2" style={{ color: D }}>{s.title}</h3>
                <p className="text-[12px] ar-body leading-relaxed mb-3" style={{ color: i === 0 ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.5)" }}>{s.desc}</p>
                <span className="inline-block px-3 py-1.5 rounded-full text-[10px] font-bold ar-body" style={{ background: i === 0 ? "rgba(0,0,0,0.08)" : `${s.color}10`, color: i === 0 ? D : s.color }}>{s.benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GROWTH STRATEGY ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="ar-heading text-lg mb-3" style={{ color: T }}>القسم الثامن</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5">استراتيجية <span style={{ color: T }}>النمو</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ph-stagger">
            {[
              { title: "الهوية الموحدة", icon: Layers, color: T, items: ["zaindev.com.sa للمقاولات والخدمات", "tech.zaindev.com.sa للحلول التقنية", "لوجو موحد + ألوان موحدة + خطوط موحدة", "ربط متبادل بين الموقعين في الفوتر والناف"] },
              { title: "استراتيجية المحتوى", icon: FileText, color: P, items: ["محتوى احترافي حقيقي لكل صفحة (عربي + إنجليزي)", "تصوير احترافي للمشاريع والفريق", "تقييمات عملاء حقيقية بصورهم", "مدونة بمقالات متخصصة"] },
              { title: "التحويل والنمو", icon: TrendingUp, color: G, items: ["نظام حجز مواعيد أونلاين", "نظام عروض أسعار فوري", "WhatsApp Business API", "Google My Business لكل منطقة", "حملات Google Ads مستهدفة جغرافياً"] },
            ].map((s) => (
              <div key={s.title} className="ph-item rounded-[20px] p-7" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${s.color}10` }}>
                  <s.icon size={22} color={s.color} />
                </div>
                <h3 className="ar-heading text-lg mb-4">{s.title}</h3>
                {s.items.map((item) => (
                  <div key={item} className="flex items-start gap-2 mb-2.5">
                    <CheckCircle2 size={14} color={s.color} className="flex-shrink-0 mt-0.5" />
                    <span className="text-[12px] ar-body" style={{ color: "rgba(0,0,0,0.55)" }}>{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DEVELOPMENT PLAN ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="ar-heading text-lg mb-3" style={{ color: T }}>القسم التاسع</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5">خطة <span style={{ color: T }}>التطوير</span></h2>
          </div>
          <div className="flex flex-col gap-6 ph-stagger">
            {[
              { label: "الاستراتيجية والهوية", color: T, duration: "أسبوعين", items: ["توحيد الاسم وتصميم لوجو احترافي موحد", "تحديد Color Palette + Typography + Design System", "ربط الموقع التقني بدومين فرعي tech.zaindev.com.sa", "كتابة محتوى احترافي لكل صفحة", "جمع صور حقيقية + تقييمات عملاء فعلية"] },
              { label: "تطوير ZainDev", color: B, duration: "3 أسابيع", items: ["إعادة تصميم الرئيسية بهيرو احترافي وإزالة التكرارات", "تطوير صفحة الخدمات بتفاصيل وأسعار لكل خدمة", "بناء بورتفوليو مشاريع حقيقي بصور ودراسات حالة", "خريطة تغطية تفاعلية حقيقية (Google Maps API)", "إصلاح المتجر بمنتجات وأسعار حقيقية + بوابات دفع", "تحسين SEO كامل (Meta + Schema + Sitemap + SSR)", "ربط Google Analytics + Search Console"] },
              { label: "تطوير Zynqore Tech", color: P, duration: "3 أسابيع", items: ["إعادة بناء كامل بتصميم احترافي متكامل مع SSR", "بناء كل الصفحات بمحتوى فعلي (خدمات، حلول، أسعار، مشاريع)", "تفعيل نظام التذاكر والدعم الفني بـ Backend", "تفعيل نظام الوظائف والتقديم", "إزالة السياسات غير المناسبة + إضافة سياسات مناسبة", "تفعيل ثنائي اللغة (عربي/إنجليزي) فعلياً"] },
              { label: "دمج AI + تحسينات", color: A, duration: "أسبوعين", items: ["تفعيل AI Chatbot على الموقعين", "بناء نظام تقدير التكلفة الآلي", "تفعيل تخصيص المحتوى الذكي", "ربط جميع الأنظمة + اختبار شامل + تدريب الفريق"] },
            ].map((p, i) => (
              <div key={p.label} className="ph-item rounded-[24px] overflow-hidden" style={{ border: `2px solid ${p.color}25`, boxShadow: "0 2px 20px rgba(0,0,0,0.04)" }}>
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-[200px] flex-shrink-0 p-8 flex flex-col items-center justify-center text-center" style={{ background: p.color }}>
                    <div className="text-[9px] font-bold tracking-[3px] uppercase mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>المرحلة</div>
                    <div className="ar-heading text-5xl mb-2" style={{ color: "#fff" }}>{i + 1}</div>
                    <div className="ar-heading text-base mb-2" style={{ color: "#fff" }}>{p.label}</div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }}>
                      <Clock size={11} color="#fff" />
                      <span className="text-[11px] font-bold" style={{ color: "#fff" }}>{p.duration}</span>
                    </div>
                  </div>
                  <div className="flex-1 p-8 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {p.items.map((item) => (
                        <div key={item} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                          <CheckCircle2 size={16} color={p.color} className="flex-shrink-0 mt-0.5" />
                          <span className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>{item}</span>
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

      {/* ═══ FINANCIAL OFFER ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="ar-heading text-lg mb-3" style={{ color: T }}>القسم العاشر</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5" style={{ color: "#fff" }}>العرض <span style={{ color: T }}>المالي</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 ph-stagger">
            {[
              { phase: "المرحلة الأولى", sub: "الاستراتيجية والهوية والمحتوى", duration: "أسبوعين", price: "3,000", color: T },
              { phase: "المرحلة الثانية", sub: "تطوير ZainDev الرئيسي", duration: "3 أسابيع", price: "6,000", color: B },
              { phase: "المرحلة الثالثة", sub: "تطوير Zynqore Tech", duration: "3 أسابيع", price: "5,000", color: P },
              { phase: "المرحلة الرابعة", sub: "دمج AI + تحسينات متقدمة", duration: "أسبوعين", price: "4,000", color: A },
            ].map((t) => (
              <div key={t.phase} className="ph-item rounded-[20px] p-6" style={{ background: "#fff" }}>
                <div className="text-[10px] font-bold tracking-[1px] uppercase mb-1 ar-body" style={{ color: t.color }}>{t.phase}</div>
                <p className="text-[11px] ar-body mb-3" style={{ color: "rgba(0,0,0,0.45)" }}>{t.sub}</p>
                <div className="ar-heading text-3xl mb-1">{t.price}<span className="text-lg mr-1">ر.س</span></div>
                <div className="flex items-center gap-1.5 mt-2">
                  <Clock size={11} color="rgba(0,0,0,0.3)" />
                  <span className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.35)" }}>{t.duration}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="rounded-[20px] p-8 text-center mb-6" style={{ background: T, border: `2px solid ${D}` }}>
            <p className="text-[11px] font-bold tracking-[2px] uppercase mb-2 ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>الإجمالي (4 مراحل)</p>
            <p className="ar-heading text-4xl md:text-5xl mb-1" style={{ color: D }}>18,000 <span className="text-xl">ر.س</span></p>
            <p className="text-[12px] ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>10 أسابيع</p>
          </div>

          {/* Discount */}
          <div className="rounded-[16px] p-6 text-center mb-10" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-[14px] ar-body font-bold" style={{ color: "#fff" }}>
              <span style={{ color: T }}>سعر خاص للتعاقد الشامل:</span>
            </p>
            <p className="ar-heading text-3xl mt-2" style={{ color: T }}>15,000 <span className="text-lg">ر.س</span></p>
            <p className="text-[12px] ar-body mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>بدلاً من 18,000 ر.س (خصم 17%)</p>
            <div className="w-full h-px my-4" style={{ background: "rgba(255,255,255,0.08)" }} />
            <p className="text-[12px] ar-body" style={{ color: "rgba(255,255,255,0.5)" }}>الدفع: 40% مقدماً (6,000 ر.س) + 30% منتصف المشروع (4,500 ر.س) + 30% عند التسليم (4,500 ر.س)</p>
          </div>

          {/* What's included */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ph-stagger">
            {[
              "تحليل UX/UI + SEO + محتوى شامل (تم إنجازه)",
              "استراتيجية هوية رقمية موحدة + Design System",
              "تطوير وتصميم موقعين كاملين مع SSR",
              "كتابة محتوى احترافي عربي/إنجليزي",
              "دمج حلول AI (شات بوت + تقدير تكلفة + تخصيص محتوى)",
              "تحسين SEO كامل + Google Analytics + Search Console",
              "دعم فني مجاني لمدة شهرين بعد التسليم",
              "تدريب الفريق على إدارة المحتوى والأدوات",
            ].map((item) => (
              <div key={item} className="ph-item flex items-center gap-3 p-4 rounded-[14px]" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <CheckCircle2 size={16} color={T} className="flex-shrink-0" />
                <span className="text-[12px] ar-body" style={{ color: "#fff" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY ME ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="ar-heading text-lg mb-3" style={{ color: T }}>لماذا تختارني</p>
            <h2 className="ar-heading text-4xl md:text-5xl">أحمد <span style={{ color: T }}>علي</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ph-stagger">
            {[
              "+5 سنوات خبرة في أسواق الخليج (السعودية، قطر، الإمارات)",
              "خبرة في التسويق الرقمي + التطوير + الـ SEO + الـ AI (مزيج نادر)",
              "عملت مع علامات كبرى: Ooredoo، QNB، Amazon Egypt، الخطوط السعودية",
              "فهم عميق للسوق السعودي وسلوك المستهلك المحلي",
              "التزام بالمواعيد والشفافية الكاملة",
            ].map((item) => (
              <div key={item} className="ph-item flex items-center gap-4 p-5 rounded-[16px]" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                <Star size={18} color={T} fill={T} className="flex-shrink-0" />
                <span className="text-[13px] ar-body font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CLOSING ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "80px 24px 60px", background: "#fff" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-[24px] p-10 md:p-14 mb-8" style={{ border: "1px solid #EBEBEB" }}>
            <img src="/ahmed.jpeg" alt="Ahmed Ali" className="w-24 h-24 rounded-full object-cover mx-auto mb-6" style={{ border: `3px solid ${T}` }} />
            <h3 className="ar-heading text-3xl mb-2">شكراً لثقتكم</h3>
            <p className="ar-heading text-lg mb-6" style={{ color: T }}>أتطلع للعمل مع زين التنموية وبناء حضور رقمي يليق بخبرة 15+ عام و500+ مشروع</p>

            <div className="w-full h-px mb-6" style={{ background: "#F0F0F0" }} />

            <p className="text-[14px] font-bold">Ahmed Ali</p>
            <p className="text-[12px] ar-body" style={{ color: T }}>Full-Stack Digital Strategist</p>
            <p className="text-[12px] ar-body mt-1" style={{ color: "rgba(0,0,0,0.4)" }}>hello@ahmedali.online | ahmedali.online</p>

            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <a href="https://ahmedali.online" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold" style={{ background: T, color: D, border: `2px solid ${D}`, boxShadow: `3px 3px 0px 0px ${D}`, textDecoration: "none" }}>
                الموقع الشخصي <ExternalLink size={14} />
              </a>
              <a href="https://wa.me/201011648156" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold" style={{ background: "#fff", color: D, border: `2px solid ${D}`, boxShadow: `3px 3px 0px 0px ${D}`, textDecoration: "none" }}>
                واتساب <ArrowRight size={14} />
              </a>
            </div>
          </div>
          <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.15)" }}>&copy; {new Date().getFullYear()} Ahmed Ali. هذا العرض سري وخاص لشركة زين التنموية.</p>
        </div>
      </section>
    </div>
    </ArabicTailProcessor>
  );
}

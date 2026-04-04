"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShoppingBag, AlertTriangle, Navigation, Package, Smartphone, Heart,
  Image, FileText, MessageSquare, Star, Users, Shield, Tag,
  Zap, Wrench, Rocket, Clock, CheckCircle2, XCircle,
  ArrowRight, ExternalLink, Calendar, Award, Gift,
  TrendingUp, MousePointer, BarChart3, Search, Mail, Share2,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════ COLORS ═══════════ */
const G = "#4FFFB0";
const D = "#0A0A0A";
const R = "#EF4444";
const A = "#F59E0B";
const P = "#5227FF";
const B = "#3B82F6";

/* ═══════════ MAIN ═══════════ */
export default function ShopweloProposal() {
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

      gsap.utils.toArray<HTMLElement>(".ph-num").forEach((el) => {
        const val = parseInt(el.dataset.val || "0");
        ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => gsap.to({ v: 0 }, { v: val, duration: 2.5, ease: "power2.out", onUpdate() { el.textContent = Math.round(this.targets()[0].v).toLocaleString(); } }) });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  /* ═══════════ DATA ═══════════ */

  const homepageAnalysis: { item: string; note: string; icon: LucideIcon; color: string }[] = [
    { item: "البنر الرئيسي", note: "يوجد بنر واحد فقط يوجه لمنتج واحد. المنافسون يستخدمون سلايدر متعدد البنرات مع عروض متنوعة. يحتاج لسلايدر ب 3-5 بنرات بعروض مختلفة وCTA واضح.", icon: Image, color: R },
    { item: "الأقسام المكررة", note: "القائمة الجانبية تعرض كل تصنيف مرتين (بسكويت بدون سكر مضاف مكرر، ويفر بدون سكر مضاف مكرر). هذا يعطي انطباع بعدم الاحترافية.", icon: AlertTriangle, color: R },
    { item: "عناصر الثقة", note: "أيقونات الشحن والدفع والدعم موجودة لكن بدون صور فعلية (الصور لا تظهر / Lazy load فاشل). يحتاج إصلاح وتصميم أيقونات مخصصة.", icon: Shield, color: A },
    { item: "قسم المقالات", note: "موجود 4 مقالات وهذا جيد للSEO، لكن تاريخ النشر كله 28 مارس 2026 مما يعطي انطباع أن المحتوى تم إضافته دفعة واحدة.", icon: FileText, color: A },
    { item: "قصة المتجر", note: 'النص يحتوي على خطأ: "قصة متجر ويلوWel" بدل من Welo، والفقرة قصيرة جداً ولا تبني ثقة. الزر يوجه لمنتج وليس لصفحة "عنا".', icon: MessageSquare, color: R },
    { item: "الفوتر", note: "فوتر أساسي بدون رقم ضريبي، بدون شهادة توثيق منصة الأعمال، وبدون روابط سوشيال ميديا ظاهرة. المنافسون يعرضون كل هذا بوضوح.", icon: Shield, color: R },
    { item: "آراء العملاء", note: "غير موجود نهائياً في الصفحة الرئيسية. سناف عنده قسم تقييمات عملاء ضخم يبني ثقة كبيرة. مطلوب إضافة قسم تقييمات فوراً.", icon: Star, color: R },
    { item: "شريط العروض", note: "لا يوجد شريط علوي (Announcement Bar) بأكواد خصم أو عروض. سناف وقرين فود وبنانا كلهم عندهم شريط عروض علوي فعال.", icon: Tag, color: A },
  ];

  const competitors: { name: string; platform: string; color: string; features: Record<string, boolean | string> }[] = [
    {
      name: "Snaf.co", platform: "سلة", color: G,
      features: { "شريط عروض علوي": true, "صفحة البراندز": true, "آراء العملاء": true, "برنامج الولاء": true, "بطاقات الإهداء": false, "المدونة": true, "الرقم الضريبي": true, "فرع فعلي": false, "ثنائي اللغة": false, "برنامج شركاء": false },
    },
    {
      name: "GreenFood9", platform: "سلة", color: B,
      features: { "شريط عروض علوي": true, "صفحة البراندز": true, "آراء العملاء": true, "برنامج الولاء": false, "بطاقات الإهداء": true, "المدونة": true, "الرقم الضريبي": true, "فرع فعلي": true, "ثنائي اللغة": false, "برنامج شركاء": false },
    },
    {
      name: "Banana.sa", platform: "OpenCart مخصص", color: P,
      features: { "شريط عروض علوي": true, "صفحة البراندز": true, "آراء العملاء": false, "برنامج الولاء": true, "بطاقات الإهداء": true, "المدونة": false, "الرقم الضريبي": true, "فرع فعلي": false, "ثنائي اللغة": true, "برنامج شركاء": true },
    },
  ];
  const compFeatures = Object.keys(competitors[0].features);

  const phase1 = [
    { task: "إصلاح تكرار التصنيفات في القائمة", impact: "احترافية المظهر", tool: "إعدادات سلة" },
    { task: "إصلاح خطأ قصة المتجر (ويلوWel → Welo)", impact: "المصداقية", tool: "إعدادات سلة" },
    { task: "إضافة شريط عروض علوي (Announcement Bar)", impact: "زيادة التحويل", tool: "CSS + إعدادات" },
    { task: "إصلاح الصور المكسورة / Lazy Loading", impact: "تجربة المستخدم", tool: "CSS + JS" },
    { task: "إضافة الرقم الضريبي وشهادة التوثيق", impact: "بناء الثقة", tool: "إعدادات سلة" },
    { task: "إضافة روابط سوشيال ميديا في الفوتر", impact: "التواصل والثقة", tool: "إعدادات سلة" },
    { task: "ترتيب سكاشن الصفحة الرئيسية", impact: "الانطباع الأول", tool: "إعدادات سلة" },
  ];

  const phase2 = [
    { task: "تحسين البنر الرئيسي: سلايدر 3-5 بنرات", impact: "زيادة التفاعل", tool: "CSS + JS" },
    { task: "إضافة قسم آراء العملاء (Testimonials)", impact: "بناء الثقة", tool: "CSS + JS" },
    { task: "إضافة بادجات المنتجات (جديد/كيتو/خصم)", impact: "تمييز المنتجات", tool: "CSS + JS" },
    { task: "تحسين عرض المنتجات: إضافة سريعة للسلة", impact: "زيادة التحويل", tool: "CSS + JS" },
    { task: "تحسين صفحة العروض وإبراز نسب الخصم", impact: "تحفيز الشراء", tool: "CSS + JS" },
    { task: "تحسين صفحة المنتج الفردية: ترتيب المعلومات", impact: "تجربة المستخدم", tool: "CSS" },
    { task: "تحسين تجربة الجوال وأحجام الأزرار", impact: "راحة الاستخدام", tool: "CSS" },
  ];

  const phase3 = [
    { task: "إضافة قسم التصنيفات البصرية (مثل سناف)", impact: "سهولة التصفح", tool: "CSS + JS" },
    { task: "إضافة عداد تنازلي للعروض (Countdown Timer)", impact: "خلق الإلحاح", tool: "JS" },
    { task: "تحسين SEO: Meta Tags وOpen Graph", impact: "تحسين الظهور", tool: "إعدادات + HTML" },
    { task: "إضافة Popup ترحيبي بكود خصم", impact: "جمع الإيميلات", tool: "CSS + JS" },
    { task: "تحسين سرعة التحميل والأداء", impact: "تجربة المستخدم", tool: "CSS + JS" },
    { task: 'إضافة قسم "منتجات شاهدتها مؤخراً"', impact: "زيادة المبيعات", tool: "JS" },
    { task: "تحسين صفحة السلة وعملية الدفع", impact: "تقليل التخلي", tool: "CSS + JS" },
  ];

  const timeline = [
    { day: "يوم 1-2", p1: "إصلاح القوائم + الأخطاء", p2: "", p3: "" },
    { day: "يوم 3-4", p1: "الشريط العلوي + الصور", p2: "", p3: "" },
    { day: "يوم 5-7", p1: "الفوتر + السكاشن", p2: "البنر + التقييمات", p3: "" },
    { day: "يوم 8-10", p1: "", p2: "البادجات + العروض", p3: "" },
    { day: "يوم 11-14", p1: "", p2: "الموبايل + المنتجات", p3: "التصنيفات البصرية" },
    { day: "يوم 15-18", p1: "", p2: "", p3: "العداد + SEO + Popup" },
    { day: "يوم 19-21", p1: "", p2: "", p3: "الأداء + السلة + التسليم" },
  ];

  const recommendations = [
    { icon: Heart, title: 'برنامج ولاء "أصدقاء ويلو"', desc: "لتحفيز الشراء المتكرر (متاح في سلة)" },
    { icon: Gift, title: "بطاقات إهداء إلكترونية", desc: "لزيادة المبيعات في المناسبات" },
    { icon: Tag, title: "صفحة البراندز", desc: "لإبراز العلامات التجارية المتوفرة" },
    { icon: FileText, title: "التسويق بالمحتوى", desc: "مقالات أسبوعية متخصصة في التغذية الصحية" },
    { icon: Share2, title: "حضور قوي على TikTok وInstagram", desc: "بمحتوى تعليمي وترفيهي" },
    { icon: Smartphone, title: "تطبيق جوال", desc: "دراسة إمكانية تطبيق لاحقاً لتعزيز تجربة العميل" },
    { icon: Mail, title: "التسويق عبر البريد الإلكتروني", desc: "للعروض والمنتجات الجديدة" },
    { icon: Users, title: "برنامج شراكات (Affiliate)", desc: "لزيادة الوصول العضوي" },
  ];

  const methodology = [
    { title: "اجتماع انطلاق (Kickoff)", desc: "لمراجعة التحليل وتحديد الأولويات مع العميل" },
    { title: "العمل على كل مرحلة بشكل مستقل", desc: "مع تسليم ومراجعة في نهاية كل مرحلة" },
    { title: "تحديثات يومية", desc: "عبر واتساب أو القناة المفضلة للعميل" },
    { title: "توثيق كل تعديل", desc: "بشكل مفصل لضمان الشفافية" },
    { title: "جولة مراجعة واحدة", desc: "للتعديلات البسيطة بعد كل مرحلة" },
  ];

  /* ═══════════ HELPERS ═══════════ */

  function PhaseTaskList({ tasks, color, phaseNum }: { tasks: typeof phase1; color: string; phaseNum: number }) {
    return (
      <div className="flex flex-col gap-2 ph-stagger">
        {tasks.map((t, i) => (
          <div key={i} className="ph-item rounded-[14px] p-4 flex items-center gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold flex-shrink-0" style={{ background: `${color}15`, color }}>{phaseNum}.{i + 1}</span>
            <div className="flex-1">
              <p className="text-[13px] font-bold ar-body" style={{ color: D }}>{t.task}</p>
            </div>
            <span className="px-3 py-1 rounded-full text-[10px] font-bold flex-shrink-0" style={{ background: `${color}12`, color }}>{t.impact}</span>
            <span className="text-[10px] font-bold flex-shrink-0 hidden md:block" style={{ color: "rgba(0,0,0,0.3)" }}>{t.tool}</span>
          </div>
        ))}
      </div>
    );
  }

  /* ═══════════ RENDER ═══════════ */

  return (
    <div ref={ref} style={{ background: "#fff", color: D, fontFamily: "'Ahmed Sans', sans-serif" }}>

      {/* ═══ HERO ═══ */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: "#fff" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] pointer-events-none" style={{ background: `radial-gradient(ellipse, ${G}18 0%, transparent 70%)` }} />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center">

          <div className="ph-hero opacity-0 text-center mb-4">
            <p className="text-[13px] font-bold tracking-wider" style={{ color: "rgba(0,0,0,0.3)" }}>سري وخاص • أبريل 2026</p>
          </div>

          <div className="ph-hero opacity-0 text-center mb-4">
            <h1 className="ar-heading" style={{ fontSize: "clamp(44px, 10vw, 100px)", lineHeight: 1.1, color: D }}>
              عرض فني ومالي
            </h1>
          </div>

          <div className="ph-hero opacity-0 text-center mb-6">
            <p className="ar-body text-lg md:text-xl" style={{ color: "rgba(0,0,0,0.5)" }}>
              تحسين وتطوير متجر ويلو الإلكتروني
            </p>
            <p className="text-xl font-bold mt-2 ar-heading" style={{ color: G }}>Shopwelo.com</p>
          </div>

          {/* From / To */}
          <div className="ph-hero opacity-0 grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 w-full max-w-xl">
            <div className="rounded-[16px] p-5" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
              <p className="text-[10px] font-bold tracking-[2px] uppercase mb-2" style={{ color: G }}>مقدم من</p>
              <p className="text-[14px] font-bold ar-body" style={{ color: D }}>Ahmed Ali</p>
              <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>Full-Stack Digital Strategist</p>
              <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.3)" }}>hello@ahmedali.online</p>
            </div>
            <div className="rounded-[16px] p-5" style={{ background: "#fff", border: `2px solid ${G}`, boxShadow: `3px 3px 0px 0px ${D}` }}>
              <p className="text-[10px] font-bold tracking-[2px] uppercase mb-2" style={{ color: G }}>مقدم إلى</p>
              <p className="text-[14px] font-bold ar-body" style={{ color: D }}>متجر ويلو | Welo</p>
              <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>منتجات صحية بدون سكر</p>
              <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.3)" }}>shopwelo.com</p>
            </div>
          </div>

          {/* Stats */}
          <div className="ph-hero opacity-0 mb-10 w-full max-w-xl">
            <div className="flex items-stretch justify-center" style={{ background: "#fff", border: "1px solid #E8E8E8", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
              {[
                { n: "3", l: "مراحل" },
                { n: "21", l: "مهمة" },
                { n: "21", l: "يوم عمل" },
              ].map((s, i) => (
                <div key={s.l} className="flex-1 flex flex-col items-center justify-center py-5 px-2 relative" style={{ borderRight: i > 0 ? "1px solid #F0F0F0" : "none" }}>
                  <span className="ar-heading" style={{ fontSize: 32, lineHeight: 1, color: D }}>{s.n}</span>
                  <span className="text-[10px] font-bold mt-1 ar-body" style={{ color: "rgba(0,0,0,0.3)" }}>{s.l}</span>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-t-full" style={{ background: G }} />
                </div>
              ))}
            </div>
          </div>

          {/* Objective */}
          <div className="ph-hero opacity-0 rounded-[16px] p-6 text-center mb-10 max-w-2xl" style={{ background: `${G}08`, border: `1px solid ${G}20` }}>
            <p className="text-[13px] ar-body font-medium leading-relaxed" style={{ color: D }}>
              <strong style={{ color: G }}>الهدف الرئيسي:</strong> تحويل متجر ويلو من متجر جديد إلى متجر احترافي جاهز للنمو والمنافسة في سوق المنتجات الصحية السعودي
            </p>
            <p className="text-[12px] ar-body mt-2" style={{ color: "rgba(0,0,0,0.5)" }}>
              <strong>النتيجة المتوقعة:</strong> زيادة معدل التحويل وتحسين تجربة المستخدم وبناء ثقة العميل منذ الزيارة الأولى
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="ph-hero opacity-0 flex flex-col items-center gap-2">
            <div style={{ width: 24, height: 38, border: "1.5px solid rgba(0,0,0,0.14)", borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 5 }}>
              <div style={{ width: 3, height: 6, borderRadius: 2, background: G, animation: "mouseScroll 1.6s ease-in-out infinite" }} />
            </div>
          </div>
        </div>

        <style>{`@keyframes mouseScroll{0%{transform:translateY(0);opacity:1}75%{transform:translateY(9px);opacity:0}76%{transform:translateY(0);opacity:0}100%{opacity:1}}`}</style>
      </section>

      {/* ═══ EXECUTIVE SUMMARY ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>القسم الأول</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5">الملخص التنفيذي</h2>
          </div>

          <div className="rounded-[20px] p-8 md:p-10" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
            <p className="text-[14px] ar-body leading-[2] mb-6" style={{ color: D }}>
              يسعدني تقديم هذا العرض الفني والمالي المتكامل لتحسين وتطوير متجر ويلو (Shopwelo.com) المتخصص في المنتجات الصحية بدون سكر في السوق السعودي. بعد تحليل شامل للمتجر ودراسة معمقة للمنافسين الرئيسيين (سناف، قرين فود، بنانا)، حددت مجموعة من نقاط التحسين الجوهرية التي سترفع معدل التحويل وتعزز تجربة المستخدم بشكل ملموس.
            </p>
            <p className="text-[14px] ar-body leading-[2]" style={{ color: "rgba(0,0,0,0.6)" }}>
              يعتمد العرض على خبرة تتجاوز 5 سنوات في التسويق الرقمي والتطوير الرقمي في أسواق الخليج والشرق الأوسط، بما يشمل العمل مع علامات تجارية كبرى مثل أوريدو وQNB وأمازون مصر والخطوط السعودية.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ CURRENT ANALYSIS ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>القسم الثاني</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5" style={{ color: "#fff" }}>تحليل الوضع <span style={{ color: R }}>الحالي</span></h2>
            <p className="text-sm max-w-lg mx-auto ar-body" style={{ color: "#fff" }}>تحليل شامل لمتجر ويلو (Shopwelo.com) من جميع الجوانب</p>
          </div>

          {/* 6 Analysis areas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16 ph-stagger">
            {[
              { icon: ShoppingBag, title: "الصفحة الرئيسية", color: R, bg: "#fff", desc: "بنر واحد فقط يوجه لمنتج واحد. الصور في البنرات الفرعية لا تظهر (Lazy loading غير مضبوط). المنافسون يعرضون المنتجات بأسعار واضحة وأزرار إضافة للسلة مباشرة." },
              { icon: Navigation, title: "التنقل والقوائم", color: A, bg: G, desc: 'القائمة الرئيسية تحتوي على تصنيفات معقولة لكن المشكلة الأساسية هي تكرار كل تصنيف فرعي مرتين في القائمة المنسدلة. كذلك لا توجد صفحة "الماركات التجارية" (Brands).' },
              { icon: Package, title: "صفحات المنتجات", color: P, bg: "#fff", desc: 'قسم "الأكثر مبيعاً" بدون منتجات ظاهرة. بنانا تعرض بادجات مثل "جديد"، "كيتو"، "خالي من الجلوتين"، "تصفية" على كل منتج. هذا غير موجود عند ويلو.' },
              { icon: Tag, title: "التصنيفات والعروض", color: B, bg: "#fff", desc: "صفحة العروض والبكجات موجودة لكن تحتاج تحسين في العرض وإبراز نسبة الخصم. سناف يعرض العروض ببنرات مخصصة لكل فئة. قرين فود يعرض بكجات مكملات وبوكسات سناكات." },
              { icon: Smartphone, title: "تجربة الجوال", color: A, bg: G, desc: "المتجر مبني على منصة سلة والثيم يدعم الريسبونسف بشكل أساسي، لكن هناك فرص لتحسين تجربة الجوال من ناحية حجم الأزرار (Touch Targets)، وسرعة التحميل، وتحسين عرض المنتجات." },
              { icon: Heart, title: "عناصر الولاء والتحويل", color: R, bg: "#fff", desc: 'لا يوجد برنامج ولاء أو نقاط مكافآت. سناف عنده برنامج "أصدقاء سناف". بنانا عندها نقاط مكافآت. قرين فود عنده بطاقات إهداء وكود خصم 5%. كل هذه العناصر غائبة عن ويلو.' },
            ].map((item) => (
              <div key={item.title} className="ph-item rounded-[20px] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ background: item.bg, border: item.bg === G ? `2px solid ${D}` : "1px solid #EBEBEB" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: item.bg === G ? "rgba(0,0,0,0.08)" : `${item.color}10` }}>
                  <item.icon size={22} color={item.bg === G ? D : item.color} />
                </div>
                <h3 className="ar-heading text-lg mb-3" style={{ color: D }}>{item.title}</h3>
                <p className="text-[12px] leading-relaxed ar-body" style={{ color: item.bg === G ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.5)" }}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Homepage detailed analysis */}
          <div className="mb-8">
            <h3 className="ar-heading text-xl text-center mb-8" style={{ color: "#fff" }}>تحليل الصفحة الرئيسية بالتفصيل</h3>
            <div className="flex flex-col gap-3 ph-stagger">
              {homepageAnalysis.map((item, i) => (
                <div key={i} className="ph-item rounded-[16px] p-5 flex items-start gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1" style={{ background: `${item.color}12` }}>
                    <item.icon size={18} color={item.color} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[14px] font-bold ar-body mb-1" style={{ color: D }}>{item.item}</h4>
                    <p className="text-[12px] leading-relaxed ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>{item.note}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold flex-shrink-0" style={{ background: `${item.color}12`, color: item.color }}>{item.color === R ? "حرج" : "تحسين"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ COMPETITOR ANALYSIS ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>القسم الثالث</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5">تحليل <span style={{ color: G }}>المنافسين</span></h2>
            <p className="text-sm max-w-lg mx-auto ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>تم تحليل 3 منافسين رئيسيين في سوق المنتجات الصحية السعودي</p>
          </div>

          {/* Competitor cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10 ph-stagger">
            {competitors.map((comp) => (
              <div key={comp.name} className="ph-item rounded-[24px] p-7" style={{ background: "#fff", border: `2px solid ${comp.color}25` }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${comp.color}12` }}>
                    <ShoppingBag size={18} color={comp.color} />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold" style={{ color: D, fontFamily: "system-ui" }}>{comp.name}</h3>
                    <p className="text-[10px] ar-body" style={{ color: "rgba(0,0,0,0.3)" }}>{comp.platform}</p>
                  </div>
                </div>
                <div className="w-full h-px my-4" style={{ background: "#F0F0F0" }} />
                <div className="flex flex-col gap-3">
                  {compFeatures.map((feat) => {
                    const val = comp.features[feat];
                    return (
                      <div key={feat} className="flex items-center justify-between">
                        <span className="text-[12px] ar-body" style={{ color: "rgba(0,0,0,0.6)" }}>{feat}</span>
                        {val === true ? (
                          <CheckCircle2 size={16} color={G} />
                        ) : val === false ? (
                          <XCircle size={16} color="rgba(0,0,0,0.15)" />
                        ) : (
                          <span className="text-[10px] font-bold" style={{ color: comp.color }}>{val}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Conclusion */}
          <div className="rounded-[16px] p-6" style={{ background: `${R}08`, border: `1px solid ${R}20` }}>
            <p className="text-[13px] ar-body font-medium leading-relaxed" style={{ color: D }}>
              <strong style={{ color: R }}>الخلاصة:</strong> ويلو يتأخر عن المنافسين في عدة نقاط جوهرية: عناصر بناء الثقة، آراء العملاء، برنامج الولاء، شريط العروض، وصفحة البراندز. الفجوة الأكبر هي مع سناف الذي يتفوق في تجربة المستخدم وعناصر الثقة والمحتوى التسويقي.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ IMPROVEMENT PLAN ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>القسم الرابع</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5">خطة <span style={{ color: G }}>التحسينات</span></h2>
            <p className="text-sm max-w-lg mx-auto ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>بناءً على التحليل، أقترح تنفيذ التحسينات على 3 مراحل حسب الأولوية</p>
          </div>

          {/* Phase 1 */}
          <div className="mb-12">
            <div className="rounded-[24px] overflow-hidden" style={{ border: `2px solid ${G}25`, boxShadow: "0 2px 20px rgba(0,0,0,0.04)" }}>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-[200px] flex-shrink-0 p-8 flex flex-col items-center justify-center text-center" style={{ background: G }}>
                  <div className="text-[9px] font-bold tracking-[3px] uppercase mb-1" style={{ color: "rgba(0,0,0,0.4)" }}>المرحلة</div>
                  <div className="ar-heading text-5xl mb-2" style={{ color: D }}>1</div>
                  <div className="ar-heading text-base mb-2" style={{ color: D }}>إصلاحات حرجة</div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.08)" }}>
                    <Clock size={11} color={D} />
                    <span className="text-[11px] font-bold" style={{ color: D }}>الأسبوع الأول</span>
                  </div>
                </div>
                <div className="flex-1 p-6 bg-white">
                  <PhaseTaskList tasks={phase1} color={G} phaseNum={1} />
                </div>
              </div>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="mb-12">
            <div className="rounded-[24px] overflow-hidden" style={{ border: `2px solid ${B}25`, boxShadow: "0 2px 20px rgba(0,0,0,0.04)" }}>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-[200px] flex-shrink-0 p-8 flex flex-col items-center justify-center text-center" style={{ background: B }}>
                  <div className="text-[9px] font-bold tracking-[3px] uppercase mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>المرحلة</div>
                  <div className="ar-heading text-5xl mb-2" style={{ color: "#fff" }}>2</div>
                  <div className="ar-heading text-base mb-2" style={{ color: "#fff" }}>تحسينات التحويل</div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }}>
                    <Clock size={11} color="#fff" />
                    <span className="text-[11px] font-bold" style={{ color: "#fff" }}>الأسبوع الثاني</span>
                  </div>
                </div>
                <div className="flex-1 p-6 bg-white">
                  <PhaseTaskList tasks={phase2} color={B} phaseNum={2} />
                </div>
              </div>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="mb-12">
            <div className="rounded-[24px] overflow-hidden" style={{ border: `2px solid ${A}25`, boxShadow: "0 2px 20px rgba(0,0,0,0.04)" }}>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-[200px] flex-shrink-0 p-8 flex flex-col items-center justify-center text-center" style={{ background: A }}>
                  <div className="text-[9px] font-bold tracking-[3px] uppercase mb-1" style={{ color: "rgba(0,0,0,0.4)" }}>المرحلة</div>
                  <div className="ar-heading text-5xl mb-2" style={{ color: D }}>3</div>
                  <div className="ar-heading text-base mb-2" style={{ color: D }}>تحسينات النمو</div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.08)" }}>
                    <Clock size={11} color={D} />
                    <span className="text-[11px] font-bold" style={{ color: D }}>الأسبوع الثالث</span>
                  </div>
                </div>
                <div className="flex-1 p-6 bg-white">
                  <PhaseTaskList tasks={phase3} color={A} phaseNum={3} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINANCIAL OFFER ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>القسم الخامس</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5" style={{ color: "#fff" }}>العرض <span style={{ color: G }}>المالي</span></h2>
            <p className="text-sm max-w-lg mx-auto ar-body" style={{ color: "#fff" }}>يشمل العرض جميع التحسينات المذكورة أعلاه عبر المراحل الثلاث</p>
          </div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10 ph-stagger">
            {[
              { phase: "المرحلة الأولى", sub: "إصلاحات حرجة + أساسيات الثقة", duration: "5-7 أيام عمل", price: "1,200", color: G, hl: false },
              { phase: "المرحلة الثانية", sub: "تحسينات التحويل + تجربة المستخدم", duration: "5-7 أيام عمل", price: "1,500", color: B, hl: false },
              { phase: "المرحلة الثالثة", sub: "تحسينات متقدمة للنمو", duration: "5-7 أيام عمل", price: "1,800", color: A, hl: false },
            ].map((t) => (
              <div key={t.phase} className="ph-item rounded-[24px] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                <div className="text-[10px] font-bold tracking-[1px] uppercase mb-1 ar-body" style={{ color: t.color }}>{t.phase}</div>
                <p className="text-[12px] ar-body mb-4" style={{ color: "rgba(0,0,0,0.5)" }}>{t.sub}</p>
                <div className="ar-heading text-4xl mb-1" style={{ color: D }}>{t.price}<span className="text-lg mr-1">ر.س</span></div>
                <div className="flex items-center gap-1.5 mt-3">
                  <Clock size={12} color="rgba(0,0,0,0.3)" />
                  <span className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>{t.duration}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Total + Discount */}
          <div className="rounded-[20px] p-8 text-center mb-6" style={{ background: G, border: `2px solid ${D}` }}>
            <p className="text-[11px] font-bold tracking-[2px] uppercase mb-2 ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>الإجمالي (3 مراحل)</p>
            <p className="ar-heading text-4xl md:text-5xl mb-1" style={{ color: D }}>4,500 <span className="text-xl">ر.س</span></p>
            <p className="text-[12px] ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>15-21 يوم عمل</p>
          </div>

          <div className="rounded-[16px] p-6 text-center" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-[14px] ar-body font-bold" style={{ color: "#fff" }}>
              <span style={{ color: G }}>خصم خاص:</span> في حال الاتفاق على تنفيذ المراحل الثلاث معاً
            </p>
            <p className="ar-heading text-3xl mt-2" style={{ color: G }}>3,800 <span className="text-lg">ر.س</span></p>
            <p className="text-[12px] ar-body mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>بدلاً من 4,500 ر.س (خصم 15%)</p>
            <div className="w-full h-px my-4" style={{ background: "rgba(255,255,255,0.08)" }} />
            <p className="text-[12px] ar-body" style={{ color: "rgba(255,255,255,0.5)" }}>شروط الدفع: 50% مقدماً و 50% عند التسليم</p>
          </div>

          {/* What's included */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-3 ph-stagger">
            {[
              "تحليل شامل للمتجر والمنافسين (تم إنجازه)",
              "تنفيذ جميع التحسينات عبر CSS وJavaScript وإعدادات سلة",
              "تحسين التجربة على الجوال والديسكتوب",
              "تقرير مفصل بكل التعديلات التي تمت",
              "دعم فني لمدة أسبوع بعد التسليم",
              "توصيات مستقبلية للنمو المستمر",
            ].map((item) => (
              <div key={item} className="ph-item flex items-center gap-3 p-4 rounded-[14px]" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <CheckCircle2 size={16} color={G} className="flex-shrink-0" />
                <span className="text-[12px] ar-body" style={{ color: "#fff" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>القسم السادس</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5">الجدول الزمني <span style={{ color: G }}>للتنفيذ</span></h2>
          </div>

          {/* Timeline visual */}
          <div className="overflow-x-auto rounded-[20px] border" style={{ borderColor: "#EBEBEB" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
              <thead>
                <tr style={{ background: D }}>
                  <th style={{ padding: "14px 20px", textAlign: "right", fontSize: 11, fontWeight: 700, color: "#fff", fontFamily: "'Ahmed Sans', sans-serif" }}>الفترة</th>
                  <th style={{ padding: "14px 20px", textAlign: "center", fontSize: 11, fontWeight: 700, color: G, fontFamily: "'Ahmed Sans', sans-serif" }}>المرحلة الأولى</th>
                  <th style={{ padding: "14px 20px", textAlign: "center", fontSize: 11, fontWeight: 700, color: B, fontFamily: "'Ahmed Sans', sans-serif" }}>المرحلة الثانية</th>
                  <th style={{ padding: "14px 20px", textAlign: "center", fontSize: 11, fontWeight: 700, color: A, fontFamily: "'Ahmed Sans', sans-serif" }}>المرحلة الثالثة</th>
                </tr>
              </thead>
              <tbody>
                {timeline.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#FAFAFA", borderBottom: "1px solid #F3F4F6" }}>
                    <td style={{ padding: "12px 20px", fontSize: 12, fontWeight: 700, color: D, fontFamily: "'Ahmed Sans', sans-serif" }}>{row.day}</td>
                    <td style={{ padding: "12px 20px", textAlign: "center" }}>
                      {row.p1 && <span className="inline-block px-3 py-1.5 rounded-full text-[10px] font-bold ar-body" style={{ background: `${G}12`, color: G }}>{row.p1}</span>}
                    </td>
                    <td style={{ padding: "12px 20px", textAlign: "center" }}>
                      {row.p2 && <span className="inline-block px-3 py-1.5 rounded-full text-[10px] font-bold ar-body" style={{ background: `${B}12`, color: B }}>{row.p2}</span>}
                    </td>
                    <td style={{ padding: "12px 20px", textAlign: "center" }}>
                      {row.p3 && <span className="inline-block px-3 py-1.5 rounded-full text-[10px] font-bold ar-body" style={{ background: `${A}12`, color: A }}>{row.p3}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-[14px] p-4 text-center" style={{ background: `${A}08`, border: `1px solid ${A}20` }}>
            <p className="text-[12px] ar-body" style={{ color: D }}>
              <strong style={{ color: A }}>ملاحظة:</strong> الجدول الزمني قابل للتعديل حسب سرعة الاستجابة وتوفير المحتوى والصور المطلوبة من العميل.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ METHODOLOGY ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>القسم السابع</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5">منهجية <span style={{ color: G }}>العمل</span></h2>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-4 mb-12 ph-stagger">
            {methodology.map((step, i) => (
              <div key={i} className="ph-item rounded-[20px] overflow-hidden" style={{ border: "1px solid #EBEBEB" }}>
                <div className="flex items-center">
                  <div className="w-20 h-20 flex items-center justify-center flex-shrink-0" style={{ background: i === 0 ? G : "#fff", borderLeft: i !== 0 ? `4px solid ${G}` : "none" }}>
                    <span className="ar-heading text-2xl" style={{ color: D }}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="flex-1 p-5">
                    <h4 className="text-[14px] font-bold ar-body mb-1" style={{ color: D }}>{step.title}</h4>
                    <p className="text-[12px] ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Priority recommendation */}
          <div className="rounded-[20px] p-8 mb-8" style={{ background: "#fff", border: `2px solid ${G}`, boxShadow: `4px 4px 0px 0px ${D}` }}>
            <h3 className="ar-heading text-lg mb-4" style={{ color: D }}>الأولويات المقترحة للبداية</h3>
            <p className="text-[13px] ar-body leading-[2]" style={{ color: "rgba(0,0,0,0.6)" }}>
              أوصي بالبدء بالمرحلة الأولى فوراً لأنها تعالج مشاكل حرجة تؤثر على مصداقية المتجر والانطباع الأول للزائر. التكرارات في القوائم والأخطاء النصية وغياب عناصر الثقة (الرقم الضريبي، التوثيق) هي أول ما يلاحظه العميل ويؤثر على قرار الشراء.
            </p>
          </div>

          {/* Why phases */}
          <div className="rounded-[20px] p-8" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
            <h3 className="ar-heading text-lg mb-4" style={{ color: D }}>هل التنفيذ مرحلة واحدة أم مراحل؟</h3>
            <p className="text-[13px] ar-body mb-4" style={{ color: "rgba(0,0,0,0.5)" }}>أوصي بالتنفيذ على مراحل للأسباب التالية:</p>
            <div className="flex flex-col gap-3">
              {[
                "يسمح للعميل بمراجعة كل مرحلة وتقديم ملاحظاته قبل الانتقال للتالية",
                "يقلل المخاطر المالية على العميل (يمكن البدء بالمرحلة الأولى فقط)",
                "يسمح بقياس الأثر الفعلي لكل مرحلة على الأداء والمبيعات",
                "يضمن جودة التنفيذ بدلاً من الاستعجال",
              ].map((reason) => (
                <div key={reason} className="flex items-start gap-3">
                  <CheckCircle2 size={16} color={G} className="flex-shrink-0 mt-1" />
                  <span className="text-[13px] ar-body" style={{ color: "rgba(0,0,0,0.6)" }}>{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ RECOMMENDATIONS ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>القسم الثامن</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5">توصيات <span style={{ color: G }}>النمو المستقبلي</span></h2>
            <p className="text-sm max-w-lg mx-auto ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>بعد إنهاء المراحل الثلاث، أوصي بالنظر في العناصر التالية لتعزيز نمو المتجر</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ph-stagger">
            {recommendations.map((rec, i) => (
              <div key={i} className="ph-item rounded-[20px] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ background: i === 0 ? G : "#fff", border: i === 0 ? `2px solid ${D}` : "1px solid #EBEBEB", boxShadow: i === 0 ? `3px 3px 0px 0px ${D}` : "none" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: i === 0 ? "rgba(0,0,0,0.08)" : `${G}12` }}>
                  <rec.icon size={22} color={i === 0 ? D : G} />
                </div>
                <h4 className="text-[13px] font-bold ar-body mb-2" style={{ color: D }}>{rec.title}</h4>
                <p className="text-[11px] ar-body leading-relaxed" style={{ color: i === 0 ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.4)" }}>{rec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CLOSING ═══ */}
      <section className="ph-slide opacity-0" style={{ padding: "80px 24px 60px", background: "#fff" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-[24px] p-10 md:p-14 mb-8" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
            <img src="/ahmed.jpeg" alt="Ahmed Ali" className="w-24 h-24 rounded-full object-cover mx-auto mb-6" style={{ border: `3px solid ${G}` }} />
            <h3 className="ar-heading text-3xl mb-2" style={{ color: D }}>شكراً لثقتكم</h3>
            <p className="ar-heading text-lg mb-6" style={{ color: G }}>أتطلع للعمل معكم والمساهمة في نمو متجر ويلو</p>

            <div className="w-full h-px mb-6" style={{ background: "#F0F0F0" }} />

            <p className="text-[14px] font-bold" style={{ color: D }}>Ahmed Ali</p>
            <p className="text-[12px] ar-body" style={{ color: G }}>Full-Stack Digital Strategist</p>
            <p className="text-[12px] ar-body mt-1" style={{ color: "rgba(0,0,0,0.4)" }}>hello@ahmedali.online | ahmedali.online</p>

            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <a href="https://ahmedali.online" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold" style={{ background: G, color: D, border: `2px solid ${D}`, boxShadow: `3px 3px 0px 0px ${D}`, textDecoration: "none" }}>
                الموقع الشخصي <ExternalLink size={14} />
              </a>
              <a href="https://wa.me/201011648156" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold" style={{ background: "#fff", color: D, border: `2px solid ${D}`, boxShadow: `3px 3px 0px 0px ${D}`, textDecoration: "none" }}>
                واتساب <ArrowRight size={14} />
              </a>
            </div>
          </div>

          <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.15)" }}>&copy; {new Date().getFullYear()} Ahmed Ali. هذا العرض سري وخاص لمتجر ويلو.</p>
        </div>
      </section>
    </div>
  );
}

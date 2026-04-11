"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CheckCircle2, Clock, Lock, ArrowLeft, ExternalLink,
  Sparkles, Shield, Zap, TrendingUp,
} from "lucide-react";
import ArabicTailProcessor from "@/components/ArabicTailProcessor";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════ COLORS ═══════════ */
const G = "#4FFFB0";
const D = "#0A0A0A";
const B = "#3B82F6";
const A = "#F59E0B";

/* ═══════════ DATA ═══════════ */
const screens = [
  { src: "/shopwelo/s1.png", label: "الصفحة الرئيسية", tag: "Homepage" },
  { src: "/shopwelo/s2.png", label: "سناكس صحية + عالي البروتين", tag: "Category" },
  { src: "/shopwelo/s3.png", label: "خالي من الجلوتين + مشروبات بدون سكر", tag: "Category" },
  { src: "/shopwelo/s4.png", label: "كيتو دايت + منتجات عضوية", tag: "Category" },
  { src: "/shopwelo/s5.png", label: "شوفان + الأكثر مبيعًا", tag: "Category" },
  { src: "/shopwelo/s6.png", label: "العلامات التجارية + الأسئلة الشائعة", tag: "Trust" },
  { src: "/shopwelo/s7.png", label: "الأسئلة الشائعة + الفوتر", tag: "Trust" },
  { src: "/shopwelo/s8.png", label: "الفوتر المحسَّن", tag: "Footer" },
];

const phase1Tasks = [
  { task: "إصلاح تكرار التصنيفات في القائمة", impact: "احترافية المظهر" },
  { task: "إصلاح خطأ قصة المتجر (ويلوWel → Welo)", impact: "المصداقية" },
  { task: "إضافة شريط عروض علوي (Announcement Bar)", impact: "زيادة التحويل" },
  { task: "إصلاح الصور المكسورة / Lazy Loading", impact: "تجربة المستخدم" },
  { task: "إضافة الرقم الضريبي وشهادة التوثيق", impact: "بناء الثقة" },
  { task: "إضافة روابط سوشيال ميديا في الفوتر", impact: "التواصل والثقة" },
  { task: "ترتيب سكاشن الصفحة الرئيسية", impact: "الانطباع الأول" },
  { task: "تثبيت Schema Markup للمنتجات (JSON-LD Structured Data)", impact: "تحسين الأرشفة" },
  { task: "تحسين HTML الدلالي (Semantic HTML) للصفحات الرئيسية", impact: "SEO والفهرسة" },
  { task: "ضغط وتنظيف ملفات CSS وإزالة الكود الزائد", impact: "سرعة التحميل" },
  { task: "تحسين ملفات JavaScript وإصلاح الأخطاء التقنية", impact: "أداء المتجر" },
  { task: "إعداد Sitemap وتحسين ملف Robots.txt للزواحف", impact: "سرعة الأرشفة" },
];

const phase2Tasks = [
  { task: "تحسين البنر الرئيسي: سلايدر 3-5 بنرات", impact: "زيادة التفاعل" },
  { task: "إضافة قسم آراء العملاء (Testimonials)", impact: "بناء الثقة" },
  { task: "إضافة بادجات المنتجات (جديد/كيتو/خصم)", impact: "تمييز المنتجات" },
  { task: "تحسين عرض المنتجات: إضافة سريعة للسلة", impact: "زيادة التحويل" },
  { task: "تحسين صفحة العروض وإبراز نسب الخصم", impact: "تحفيز الشراء" },
  { task: "تحسين صفحة المنتج الفردية: ترتيب المعلومات", impact: "تجربة المستخدم" },
  { task: "تحسين تجربة الجوال وأحجام الأزرار", impact: "راحة الاستخدام" },
];

const phase3Tasks = [
  { task: "إضافة قسم التصنيفات البصرية (مثل سناف)", impact: "سهولة التصفح" },
  { task: "إضافة عداد تنازلي للعروض (Countdown Timer)", impact: "خلق الإلحاح" },
  { task: "تحسين SEO: Meta Tags وOpen Graph", impact: "تحسين الظهور" },
  { task: "إضافة Popup ترحيبي بكود خصم", impact: "جمع الإيميلات" },
  { task: "تحسين سرعة التحميل والأداء", impact: "تجربة المستخدم" },
  { task: 'إضافة قسم "منتجات شاهدتها مؤخراً"', impact: "زيادة المبيعات" },
  { task: "تحسين صفحة السلة وعملية الدفع", impact: "تقليل التخلي" },
];

/* ═══════════ MAIN ═══════════ */
export default function ShopweloProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const CIRC = 2 * Math.PI * 90;

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* hero stagger */
      gsap.fromTo(".prg-hero",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power4.out", delay: 0.3 },
      );

      /* progress ring stroke */
      const ring = document.querySelector(".prg-ring-fill") as SVGCircleElement | null;
      if (ring) {
        const target = CIRC * (1 - 0.46);
        gsap.fromTo(ring,
          { strokeDashoffset: CIRC },
          { strokeDashoffset: target, duration: 2.8, ease: "power3.out", delay: 0.8 },
        );
      }

      /* percentage counter in ring */
      const pctEl = document.querySelector(".prg-pct");
      if (pctEl) {
        gsap.to({ v: 0 }, {
          v: 46, duration: 2.8, ease: "power3.out", delay: 0.8,
          onUpdate() { pctEl.textContent = Math.round(this.targets()[0].v) + "%"; },
        });
      }

      /* stat counters */
      gsap.utils.toArray<HTMLElement>(".prg-num").forEach((el) => {
        const val = parseInt(el.dataset.val || "0");
        ScrollTrigger.create({
          trigger: el, start: "top 90%", once: true,
          onEnter: () => gsap.to({ v: 0 }, {
            v: val, duration: 2, ease: "power2.out",
            onUpdate() { el.textContent = Math.round(this.targets()[0].v).toString(); },
          }),
        });
      });

      /* scroll reveals */
      gsap.utils.toArray<HTMLElement>(".prg-slide").forEach((el) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } },
        );
      });

      /* stagger children */
      gsap.utils.toArray<HTMLElement>(".prg-stagger").forEach((el) => {
        gsap.fromTo(el.querySelectorAll(".prg-item"),
          { y: 30, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.07, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 82%", once: true } },
        );
      });

      /* timeline line draw */
      gsap.fromTo(".prg-tl-fill",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.6, ease: "power3.out", scrollTrigger: { trigger: ".prg-tl", start: "top 80%", once: true } },
      );

      /* checkmark pop-in */
      gsap.utils.toArray<HTMLElement>(".prg-chk").forEach((el, i) => {
        gsap.fromTo(el,
          { scale: 0, rotation: -180 },
          { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(2)", delay: i * 0.04, scrollTrigger: { trigger: el, start: "top 92%", once: true } },
        );
      });

      /* top progress bar */
      gsap.fromTo(".prg-bar-fill",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: "power3.out", delay: 0.5 },
      );

      /* before/after cards */
      gsap.utils.toArray<HTMLElement>(".prg-ba").forEach((el) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0, rotateX: 8 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } },
        );
      });

      /* phone cards stagger */
      gsap.utils.toArray<HTMLElement>(".prg-phone-card").forEach((el, i) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power3.out", delay: i * 0.08, scrollTrigger: { trigger: ".prg-phones", start: "top 85%", once: true } },
        );
      });

      /* completion stamp */
      gsap.fromTo(".prg-stamp",
        { scale: 0, rotation: -25, opacity: 0 },
        { scale: 1, rotation: 8, opacity: 1, duration: 0.7, ease: "back.out(1.8)", scrollTrigger: { trigger: ".prg-stamp", start: "top 85%", once: true } },
      );

    }, ref);
    return () => ctx.revert();
  }, [CIRC]);

  return (
    <ArabicTailProcessor>
    <div ref={ref} style={{ background: "#fff", color: D, fontFamily: "'Ahmed Sans', sans-serif" }}>

      {/* ══════════════════════════════════════════
          FIXED TOP PROGRESS BAR
      ══════════════════════════════════════════ */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 4, background: "#F0F0F0", zIndex: 100 }}>
        <div className="prg-bar-fill" style={{ height: "100%", width: "46%", background: `linear-gradient(90deg, ${G}, #2DD88A)`, borderRadius: "0 4px 4px 0", transformOrigin: "right" }} />
      </div>

      {/* ══════════════════════════════════════════
          HERO — ANIMATED PROGRESS RING
      ══════════════════════════════════════════ */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: "#fff" }}>
        {/* dot pattern */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        {/* glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none" style={{ background: `radial-gradient(ellipse, ${G}22 0%, transparent 70%)` }} />

        {/* floating particles */}
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none" style={{
            width: 4 + (i % 4) * 2,
            height: 4 + (i % 4) * 2,
            background: i % 3 === 0 ? G : i % 3 === 1 ? `${G}60` : `${B}40`,
            top: `${15 + (i * 7) % 50}%`,
            left: `${25 + (i * 9) % 50}%`,
            animation: `prg-float ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.35}s`,
            opacity: 0.5,
          }} />
        ))}

        <div className="relative z-10 flex flex-col items-center px-6">

          {/* date */}
          <div className="prg-hero opacity-0 mb-8" style={{ marginTop: 60 }}>
            <span className="px-5 py-2 rounded-full text-[11px] font-bold tracking-wide" style={{ background: `${G}10`, color: D, border: `1px solid ${G}25` }}>
              آخر تحديث: أبريل 2026
            </span>
          </div>

          {/* progress ring */}
          <div className="prg-hero opacity-0 relative mb-8">
            <svg width="240" height="240" viewBox="0 0 240 240" className="block" style={{ transform: "rotate(-90deg)" }}>
              <defs>
                <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={G} />
                  <stop offset="100%" stopColor="#2DD88A" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              {/* bg ring */}
              <circle cx="120" cy="120" r="90" fill="none" stroke="#F0F0F0" strokeWidth="8" />
              {/* progress */}
              <circle
                className="prg-ring-fill"
                cx="120" cy="120" r="90"
                fill="none"
                stroke="url(#rg)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={CIRC}
                strokeDashoffset={CIRC}
                filter="url(#glow)"
              />
              {/* endpoint dot */}
              <circle cx="120" cy="30" r="6" fill={G} opacity="0.5">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
            {/* center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="prg-pct ar-heading" style={{ fontSize: 52, color: D, lineHeight: 1 }}>0%</span>
              <span className="text-[11px] font-bold mt-1.5 ar-body" style={{ color: "rgba(0,0,0,0.3)" }}>نسبة الإنجاز</span>
            </div>
            {/* glow behind */}
            <div className="absolute inset-[-20px] rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${G}12 30%, transparent 70%)`, animation: "prg-pulse-glow 3s ease-in-out infinite" }} />
          </div>

          {/* title */}
          <div className="prg-hero opacity-0 text-center mb-2">
            <h1 className="ar-heading" style={{ fontSize: "clamp(34px, 8vw, 64px)", lineHeight: 1.25, color: D }}>
              تقدم مشروع <span style={{ color: G }}>ويلو</span>
            </h1>
          </div>
          <div className="prg-hero opacity-0 text-center mb-8">
            <p className="text-[14px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>متابعة مراحل تطوير وتحسين المتجر</p>
            <p className="text-sm font-bold mt-1" style={{ color: G, fontFamily: "system-ui" }}>Shopwelo.com</p>
          </div>

          {/* live badge */}
          <div className="prg-hero opacity-0 mb-10">
            <div className="flex items-center gap-3 px-6 py-3 rounded-full" style={{ background: `${G}08`, border: `1.5px solid ${G}25` }}>
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: G }} />
                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full" style={{ background: G, animation: "prg-ping 1.5s cubic-bezier(0,0,0.2,1) infinite" }} />
              </div>
              <span className="text-[13px] font-bold ar-body" style={{ color: D }}>المرحلة الأولى مكتملة</span>
              <Sparkles size={14} color={G} />
            </div>
          </div>

          {/* stats */}
          <div className="prg-hero opacity-0 w-full max-w-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "مهام مكتملة", value: 12, suffix: "/26", icon: CheckCircle2, accent: G },
                { label: "مراحل مكتملة", value: 1, suffix: "/3", icon: Shield, accent: G },
                { label: "أيام عمل", value: 7, suffix: "", icon: Zap, accent: B },
                { label: "نسبة الإنجاز", value: 46, suffix: "%", icon: TrendingUp, accent: G },
              ].map((s, i) => (
                <div key={i} className="text-center p-5 rounded-[18px] relative overflow-hidden group transition-all duration-300 hover:-translate-y-0.5" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                  <div className="absolute top-3 left-3 opacity-[0.06] group-hover:opacity-[0.1] transition-opacity">
                    <s.icon size={32} color={s.accent} />
                  </div>
                  <div className="flex items-baseline justify-center gap-0.5 relative">
                    <span className="prg-num ar-heading text-3xl" data-val={s.value} style={{ color: D }}>0</span>
                    {s.suffix && <span className="text-[13px] ar-body font-bold" style={{ color: "rgba(0,0,0,0.2)" }}>{s.suffix}</span>}
                  </div>
                  <span className="text-[10px] font-bold ar-body mt-1 block" style={{ color: "rgba(0,0,0,0.3)" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* scroll cue */}
          <div className="prg-hero opacity-0 flex flex-col items-center gap-2 mt-14">
            <div style={{ width: 24, height: 38, border: "1.5px solid rgba(0,0,0,0.12)", borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 5 }}>
              <div style={{ width: 3, height: 6, borderRadius: 2, background: G, animation: "prg-scroll 1.6s ease-in-out infinite" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PHASE TIMELINE OVERVIEW
      ══════════════════════════════════════════ */}
      <section className="prg-slide opacity-0 prg-tl" style={{ padding: "100px 24px", background: "#FAFAFA" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="ar-heading text-lg mb-2" style={{ color: G }}>خريطة الطريق</p>
            <h2 className="ar-heading text-3xl md:text-4xl">مراحل <span style={{ color: G }}>المشروع</span></h2>
          </div>

          {/* horizontal timeline */}
          <div className="relative flex items-center justify-between px-4 md:px-10 py-16">
            {/* bg line */}
            <div className="absolute top-1/2 right-4 md:right-10 left-4 md:left-10 h-[3px] -translate-y-1/2 rounded-full" style={{ background: "#E5E5E5" }} />
            {/* filled line */}
            <div className="prg-tl-fill absolute top-1/2 right-4 md:right-10 h-[3px] -translate-y-1/2 rounded-full" style={{ width: "33.3%", background: `linear-gradient(to left, ${G}, ${G}70)`, transformOrigin: "right" }} />

            {/* node 1 — completed */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center relative" style={{ background: G, border: `3px solid ${D}`, boxShadow: `0 0 30px ${G}50` }}>
                <CheckCircle2 size={30} color={D} strokeWidth={2.5} />
                <div className="absolute inset-[-4px] rounded-full pointer-events-none" style={{ border: `2px solid ${G}`, animation: "prg-ripple 2.5s ease-out infinite" }} />
                <div className="absolute inset-[-4px] rounded-full pointer-events-none" style={{ border: `2px solid ${G}`, animation: "prg-ripple 2.5s ease-out 0.8s infinite" }} />
              </div>
              <div className="text-center mt-1">
                <span className="text-[12px] font-bold block ar-body" style={{ color: D }}>إصلاحات حرجة</span>
                <span className="text-[10px] font-bold px-3 py-1 rounded-full mt-1.5 inline-block" style={{ background: G, color: D }}>مكتملة</span>
              </div>
            </div>

            {/* node 2 — next */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center" style={{ background: "#fff", border: `3px dashed ${B}40`, boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
                <Clock size={26} color={B} />
              </div>
              <div className="text-center mt-1">
                <span className="text-[12px] font-bold block ar-body" style={{ color: D }}>تحسينات التحويل</span>
                <span className="text-[10px] font-bold px-3 py-1 rounded-full mt-1.5 inline-block" style={{ background: `${B}10`, color: B }}>التالية</span>
              </div>
            </div>

            {/* node 3 — upcoming */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center" style={{ background: "#fff", border: `3px dashed ${A}25`, boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
                <Lock size={22} color={`${A}90`} />
              </div>
              <div className="text-center mt-1">
                <span className="text-[12px] font-bold block ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>تحسينات النمو</span>
                <span className="text-[10px] font-bold px-3 py-1 rounded-full mt-1.5 inline-block" style={{ background: `${A}08`, color: `${A}` }}>قادمة</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PHASE 1 — COMPLETED (CELEBRATION)
      ══════════════════════════════════════════ */}
      <section className="prg-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
        <div className="max-w-4xl mx-auto">

          {/* header + celebration */}
          <div className="text-center mb-14 relative">
            {/* confetti */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 18 }, (_, i) => (
                <div key={i} className="absolute" style={{
                  width: 5 + (i % 4) * 2,
                  height: 5 + (i % 4) * 2,
                  background: [G, "#2DD88A", "#FFD700", B, "#FF6B9D", "#A78BFA"][i % 6],
                  borderRadius: i % 3 === 0 ? "50%" : "2px",
                  top: "-10px",
                  left: `${10 + (i * 4.5)}%`,
                  animation: `prg-confetti ${2 + i * 0.15}s ease-out forwards`,
                  animationDelay: `${0.5 + i * 0.08}s`,
                  opacity: 0,
                  transform: `rotate(${i * 30}deg)`,
                }} />
              ))}
            </div>

            {/* stamp */}
            <div className="prg-stamp inline-block mb-6">
              <div className="relative">
                <div className="w-28 h-28 rounded-full flex items-center justify-center mx-auto" style={{ border: `3px solid ${G}`, boxShadow: `0 0 40px ${G}25, inset 0 0 20px ${G}08` }}>
                  <div className="text-center">
                    <CheckCircle2 size={32} color={G} className="mx-auto mb-1" />
                    <span className="text-[11px] font-bold block ar-body" style={{ color: G }}>تم الإنجاز</span>
                  </div>
                </div>
                <div className="absolute inset-[-6px] rounded-full" style={{ border: `1.5px dashed ${G}40` }} />
              </div>
            </div>

            <h2 className="ar-heading text-4xl md:text-5xl mb-3" style={{ color: "#fff" }}>
              المرحلة <span style={{ color: G }}>الأولى</span>
            </h2>
            <p className="text-[14px] ar-body mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>إصلاحات حرجة + تحسينات البنية التحتية والسيو</p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="h-[2px] w-16 rounded-full" style={{ background: `${G}40` }} />
              <span className="text-[12px] font-bold ar-body" style={{ color: G }}>12 من 12 مهام مكتملة</span>
              <div className="h-[2px] w-16 rounded-full" style={{ background: `${G}40` }} />
            </div>

            {/* progress bar for this phase */}
            <div className="mt-6 mx-auto max-w-xs">
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="h-full rounded-full" style={{ width: "100%", background: `linear-gradient(90deg, ${G}, #2DD88A)`, animation: "prg-shimmer 2s ease-in-out infinite" }} />
              </div>
            </div>
          </div>

          {/* before / after highlight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <div className="prg-ba rounded-[20px] p-6" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.12)" }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)" }}>
                  <span className="text-[14px]" style={{ color: "#EF4444" }}>✕</span>
                </div>
                <span className="text-[13px] font-bold ar-body" style={{ color: "#EF4444" }}>قبل التحسينات</span>
              </div>
              <div className="flex flex-col gap-2.5">
                {[
                  "تصنيفات مكررة في القائمة",
                  "أخطاء إملائية في قصة المتجر",
                  "بدون شريط عروض علوي",
                  "صور لا تعمل (Lazy Load فاشل)",
                  "بدون رقم ضريبي أو توثيق",
                  "بدون روابط سوشيال ميديا",
                  "ترتيب سكاشن غير مدروس",
                  "بدون Schema Markup للمنتجات",
                  "HTML غير دلالي يضعف الفهرسة",
                  "CSS وJS زائد يبطئ التحميل",
                  "Sitemap وRobots.txt غير محسّنَين",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#EF4444" }} />
                    <span className="text-[12px] ar-body" style={{ color: "rgba(255,255,255,0.5)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="prg-ba rounded-[20px] p-6" style={{ background: `${G}06`, border: `1px solid ${G}15` }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${G}12` }}>
                  <CheckCircle2 size={16} color={G} />
                </div>
                <span className="text-[13px] font-bold ar-body" style={{ color: G }}>بعد التحسينات</span>
              </div>
              <div className="flex flex-col gap-2.5">
                {[
                  "قوائم نظيفة ومرتبة بدون تكرار",
                  "نصوص دقيقة ومراجعة بالكامل",
                  "شريط عروض فعّال بأكواد خصم",
                  "جميع الصور تعمل بشكل مثالي",
                  "الرقم الضريبي وشهادة التوثيق ظاهرين",
                  "روابط سوشيال ميديا في الفوتر",
                  "سكاشن مرتبة لانطباع أول احترافي",
                  "Schema Markup JSON-LD على جميع المنتجات",
                  "HTML دلالي يساعد جوجل على الفهم والفهرسة",
                  "CSS وJS محسّن وخفيف للتحميل السريع",
                  "Sitemap وRobots.txt محسّنَين للأرشفة",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <CheckCircle2 size={13} color={G} className="flex-shrink-0" />
                    <span className="text-[12px] ar-body" style={{ color: "rgba(255,255,255,0.7)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* task grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 prg-stagger">
            {phase1Tasks.map((t, i) => (
              <div key={i} className="prg-item rounded-[14px] p-4 flex items-center gap-3 transition-all duration-300 hover:-translate-y-0.5 group" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRight: `3px solid ${G}40` }}>
                <div className="prg-chk w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${G}15` }}>
                  <CheckCircle2 size={15} color="#0D9255" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-bold ar-body leading-snug" style={{ color: "rgba(255,255,255,0.85)" }}>{t.task}</p>
                  <span className="text-[10px] font-bold mt-0.5 block" style={{ color: G, opacity: 0.7 }}>{t.impact}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ══ PHONE SHOWCASE ══ */}
          <div className="mt-14 prg-slide opacity-0">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: G }} />
                <span className="text-[11px] font-bold tracking-[2px] uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>توثيق بصري للتنفيذ</span>
              </div>
              <h3 className="ar-heading text-2xl md:text-3xl mb-2" style={{ color: "#fff" }}>
                التقسيمات البصرية <span style={{ color: G }}>المنفَّذة</span>
              </h3>
              <p className="text-[12px] ar-body max-w-md mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
                تم اختيار أسلوب التقسيمات البصرية لكثرة التصنيفات وتوضيح المنتجات للزائر بشكل سهل وجذاب — بدل ما الزائر يضيع يدور، يشوف فين يروح في ثانية
              </p>
            </div>

            {/* phones row */}
            <div className="relative">
              {/* fade edges */}
              <div className="absolute top-0 right-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: `linear-gradient(to right, transparent, ${D})` }} />
              <div className="absolute top-0 left-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: `linear-gradient(to left, transparent, ${D})` }} />

              <div className="prg-phones flex gap-6 overflow-x-auto pb-8 px-10" style={{ scrollbarWidth: "none", scrollBehavior: "smooth" }}>
                {screens.map((s, i) => (
                  <div key={i} className="prg-phone-card flex-shrink-0 flex flex-col items-center gap-3 group" style={{ opacity: 0 }}>
                    {/* phone frame */}
                    <div className="relative transition-transform duration-500 ease-out group-hover:-translate-y-3" style={{ width: 240, height: 480 }}>
                      {/* outer glow on hover */}
                      <div className="absolute inset-[-4px] rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(ellipse, ${G}20, transparent 70%)` }} />
                      {/* phone shell */}
                      <div className="absolute inset-0 rounded-[28px] overflow-hidden" style={{ border: "2px solid rgba(255,255,255,0.12)", background: "#0A0A0A", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
                        {/* status bar */}
                        <div className="absolute top-0 left-0 right-0 h-7 z-10 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.3)" }}>
                          <div className="w-12 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
                        </div>
                        {/* screenshot */}
                        <img
                          src={s.src}
                          alt={s.label}
                          className="w-full h-full object-cover object-top"
                          style={{ paddingTop: 7 }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='320'%3E%3Crect width='160' height='320' fill='%23111'/%3E%3Ctext x='50%25' y='50%25' fill='%23333' font-size='12' text-anchor='middle' dominant-baseline='middle'%3Eقريباً%3C/text%3E%3C/svg%3E";
                          }}
                        />
                        {/* screen reflection */}
                        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)" }} />
                      </div>
                      {/* number badge */}
                      <div className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center z-20" style={{ background: G }}>
                        <span className="text-[10px] font-bold" style={{ color: D }}>{i + 1}</span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* scroll hint */}
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="h-px w-8" style={{ background: "rgba(255,255,255,0.1)" }} />
              <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>مرّر للجانب لرؤية المزيد</span>
              <div className="h-px w-8" style={{ background: "rgba(255,255,255,0.1)" }} />
            </div>
          </div>

          {/* summary */}
          <div className="mt-10 rounded-[20px] p-7 text-center relative overflow-hidden" style={{ background: `${G}08`, border: `1px solid ${G}18` }}>
            <div className="absolute top-0 left-0 right-0 h-1 rounded-b-full" style={{ background: `linear-gradient(90deg, transparent, ${G}, transparent)` }} />
            <p className="text-[14px] ar-body font-medium leading-relaxed" style={{ color: "#fff" }}>
              <span className="font-bold" style={{ color: G }}>تم إنجاز جميع مهام المرحلة الأولى بنجاح</span>
              <br />
              <span style={{ color: "rgba(255,255,255,0.5)" }}>المتجر محسَّن من الظاهر والبنية التحتية — جاهز للفهرسة والأرشفة، لكنه لا يستقبل زوار بعد حتى اكتمال مراحل التحويل</span>
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PHASE 2 — NEXT
      ══════════════════════════════════════════ */}
      <section className="prg-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold tracking-[3px] uppercase mb-4 block" style={{ color: B }}>المرحلة التالية</span>
            <h2 className="ar-heading text-4xl md:text-5xl mb-3">المرحلة <span style={{ color: B }}>الثانية</span></h2>
            <p className="text-[14px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>تحسينات التحويل وتجربة المستخدم</p>
            <div className="flex items-center justify-center gap-3 mt-5">
              <Clock size={14} color={B} />
              <span className="text-[12px] font-bold ar-body" style={{ color: B }}>7 مهام • الأسبوع الثاني</span>
            </div>
            {/* progress bar */}
            <div className="mt-5 mx-auto max-w-xs">
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "#F0F0F0" }}>
                <div className="h-full rounded-full" style={{ width: "0%", background: B }} />
              </div>
              <span className="text-[10px] font-bold mt-1.5 block" style={{ color: "rgba(0,0,0,0.2)" }}>0 من 7</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 prg-stagger">
            {phase2Tasks.map((t, i) => (
              <div key={i} className="prg-item rounded-[16px] p-5 flex items-center gap-4 transition-all duration-200" style={{ background: "#fff", border: "1px solid #EBEBEB", borderRight: `4px solid ${B}20` }}>
                <span className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-[11px] font-bold" style={{ background: `${B}06`, color: B }}>2.{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold ar-body" style={{ color: D, opacity: 0.6 }}>{t.task}</p>
                </div>
                <span className="px-3 py-1.5 rounded-full text-[10px] font-bold flex-shrink-0" style={{ background: `${B}06`, color: `${B}90` }}>{t.impact}</span>
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#F5F5F5" }}>
                  <Clock size={13} color="rgba(0,0,0,0.2)" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PHASE 3 — UPCOMING
      ══════════════════════════════════════════ */}
      <section className="prg-slide opacity-0" style={{ padding: "100px 24px", background: "#FAFAFA" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold tracking-[3px] uppercase mb-4 block" style={{ color: A }}>قادمة</span>
            <h2 className="ar-heading text-4xl md:text-5xl mb-3">المرحلة <span style={{ color: A }}>الثالثة</span></h2>
            <p className="text-[14px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>تحسينات متقدمة للنمو</p>
            <div className="flex items-center justify-center gap-3 mt-5">
              <Lock size={14} color={`${A}90`} />
              <span className="text-[12px] font-bold ar-body" style={{ color: `${A}` }}>7 مهام • الأسبوع الثالث</span>
            </div>
            <div className="mt-5 mx-auto max-w-xs">
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "#EBEBEB" }}>
                <div className="h-full rounded-full" style={{ width: "0%", background: A }} />
              </div>
              <span className="text-[10px] font-bold mt-1.5 block" style={{ color: "rgba(0,0,0,0.15)" }}>0 من 7</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 prg-stagger">
            {phase3Tasks.map((t, i) => (
              <div key={i} className="prg-item rounded-[16px] p-5 flex items-center gap-4 transition-all duration-200" style={{ background: "#fff", border: "1px solid #EBEBEB", borderRight: `4px solid ${A}15`, opacity: 0.55 }}>
                <span className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-[11px] font-bold" style={{ background: `${A}05`, color: `${A}` }}>3.{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold ar-body" style={{ color: D }}>{t.task}</p>
                </div>
                <span className="px-3 py-1.5 rounded-full text-[10px] font-bold flex-shrink-0" style={{ background: `${A}06`, color: `${A}` }}>{t.impact}</span>
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#F0F0F0" }}>
                  <Lock size={12} color="rgba(0,0,0,0.15)" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER / CTA
      ══════════════════════════════════════════ */}
      <section className="prg-slide opacity-0" style={{ padding: "100px 24px 50px", background: "#fff" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-[28px] p-10 md:p-14 relative overflow-hidden" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
            {/* decorative corner accents */}
            <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none" style={{ background: `linear-gradient(135deg, ${G}10 0%, transparent 60%)`, borderRadius: "0 28px 0 0" }} />
            <div className="absolute bottom-0 left-0 w-24 h-24 pointer-events-none" style={{ background: `linear-gradient(315deg, ${G}08 0%, transparent 60%)`, borderRadius: "0 0 0 28px" }} />

            <div className="relative z-10">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 relative" style={{ background: `${G}08`, border: `2px solid ${G}20` }}>
                <Sparkles size={32} color={G} />
                <div className="absolute inset-[-3px] rounded-full" style={{ border: `1px dashed ${G}25`, animation: "prg-spin 20s linear infinite" }} />
              </div>

              <h3 className="ar-heading text-2xl md:text-3xl mb-3" style={{ color: D }}>المشروع يتقدم بثبات</h3>
              <p className="text-[13px] ar-body mb-2 leading-relaxed" style={{ color: "rgba(0,0,0,0.5)" }}>
                تم إنجاز المرحلة الأولى بنجاح وجاري التجهيز للمرحلة الثانية
              </p>
              <p className="text-[12px] ar-body" style={{ color: "rgba(0,0,0,0.3)" }}>
                سيتم تحديث هذه الصفحة مع كل تقدم جديد في المشروع
              </p>

              <div className="w-full h-px my-8" style={{ background: "#F0F0F0" }} />

              <img src="/ahmed.jpeg" alt="Ahmed Ali" className="w-16 h-16 rounded-full object-cover mx-auto mb-4" style={{ border: `3px solid ${G}` }} />
              <p className="text-[15px] font-bold" style={{ color: D }}>Ahmed Ali</p>
              <p className="text-[12px] ar-body" style={{ color: G }}>Full-Stack Digital Strategist</p>
              <p className="text-[11px] ar-body mt-1" style={{ color: "rgba(0,0,0,0.3)" }}>hello@ahmedali.online</p>

              <div className="flex flex-wrap justify-center gap-3 mt-8">
                <a href="https://wa.me/201011648156" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg" style={{ background: G, color: D, border: `2px solid ${D}`, boxShadow: `3px 3px 0px 0px ${D}`, textDecoration: "none" }}>
                  تواصل عبر واتساب <ExternalLink size={14} />
                </a>
                <a href="/shopwelo" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-bold transition-all duration-200 hover:-translate-y-0.5" style={{ background: "#fff", color: D, border: "1.5px solid #EBEBEB", textDecoration: "none" }}>
                  العرض الفني الكامل <ArrowLeft size={14} />
                </a>
              </div>
            </div>
          </div>

          <p className="text-[11px] ar-body mt-8" style={{ color: "rgba(0,0,0,0.1)" }}>&copy; {new Date().getFullYear()} Ahmed Ali. تقرير تقدم خاص لمتجر ويلو.</p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CSS KEYFRAME ANIMATIONS
      ══════════════════════════════════════════ */}
      <style>{`
        @keyframes prg-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-18px) rotate(6deg); }
          66% { transform: translateY(-8px) rotate(-4deg); }
        }
        @keyframes prg-pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.06); }
        }
        @keyframes prg-ping {
          0% { transform: scale(1); opacity: 0.8; }
          75%, 100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes prg-scroll {
          0% { transform: translateY(0); opacity: 1; }
          75% { transform: translateY(9px); opacity: 0; }
          76% { transform: translateY(0); opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes prg-ripple {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes prg-confetti {
          0% { transform: translateY(0) rotate(0deg) scale(0); opacity: 0; }
          10% { opacity: 0.9; transform: translateY(0) rotate(0deg) scale(1); }
          100% { transform: translateY(180px) rotate(720deg) scale(0.3); opacity: 0; }
        }
        @keyframes prg-shimmer {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes prg-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

    </div>
    </ArabicTailProcessor>
  );
}

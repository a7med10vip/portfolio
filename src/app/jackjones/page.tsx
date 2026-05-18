"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShoppingBag, AlertTriangle, Search, Code, Globe, Image as ImageIcon,
  FileText, Tag, Zap, Shield, CheckCircle2, XCircle, Clock, Award,
  TrendingUp, BarChart3, Star,
  Navigation, Sparkles, Calendar, ArrowRight, ExternalLink,
  Share2, Wrench, Link2, MapPin, Palette,
  LineChart, Layers, Database, ShoppingCart, Gauge,
  type LucideIcon,
} from "lucide-react";
import ArabicTailProcessor from "@/components/ArabicTailProcessor";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════ COLORS ═══════════ */
const G = "#4FFFB0";
const D = "#0A0A0A";
const R = "#EF4444";
const A = "#F59E0B";
const P = "#8B5CF6";
const B = "#3B82F6";

/* ═══════════ MAIN ═══════════ */
export default function JackJonesProposal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".jj-hero", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: "power4.out", delay: 0.3 });

      gsap.utils.toArray<HTMLElement>(".jj-slide").forEach((el) => {
        gsap.fromTo(el, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      });

      gsap.utils.toArray<HTMLElement>(".jj-stagger").forEach((el) => {
        gsap.fromTo(el.querySelectorAll(".jj-item"), { y: 40, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.07, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 82%", once: true } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  /* ═══════════ DATA ═══════════ */

  const strengths: { item: string; note: string; icon: LucideIcon }[] = [
    { item: "رقم ضريبي ظاهر", note: "314369156700003", icon: Shield },
    { item: "سجل تجاري ظاهر", note: "7002321888", icon: FileText },
    { item: "7 فروع فعلية", note: "في الرياض وجدة — حضور قوي في المولات الكبرى", icon: MapPin },
    { item: "وسائل دفع متكاملة", note: "Visa / MC / Apple Pay / PayPal / Google Pay", icon: ShoppingCart },
    { item: "بنية ثنائية اللغة", note: "/ar و /en موجودة (لكن بدون Hreflang)", icon: Globe },
  ];

  const issueGroups: {
    id: string;
    title: string;
    tagline: string;
    icon: LucideIcon;
    color: string;
    issues: { item: string; note: string; level: "حرج" | "تحسين"; icon: LucideIcon }[];
  }[] = [
    {
      id: "seo",
      title: "SEO والفهرسة",
      tagline: "جوجل يرى صفحاتك بدون سياق",
      icon: Search,
      color: B,
      issues: [
        { item: "Meta Tags و Descriptions غائبة", note: "كل الصفحات بدون title/description مخصصة — الـ CTR في نتائج البحث ينخفض مباشرة.", level: "حرج", icon: Tag },
        { item: "Schema Markup (JSON-LD) مفقود", note: "لا Product ولا Organization ولا LocalBusiness ولا BreadcrumbList — خسارة كاملة للـ Rich Snippets.", level: "حرج", icon: Code },
        { item: "Hreflang غير معلن", note: "/ar و /en موجودين بدون hreflang — جوجل قد يعرض النسخة الخطأ حسب بلد المستخدم.", level: "حرج", icon: Globe },
        { item: "Alt Text مفقود", note: "كل الصور بدون alt — خسارة في Google Images ومشكلة في الـ Accessibility.", level: "تحسين", icon: ImageIcon },
      ],
    },
    {
      id: "analytics",
      title: "أدوات القياس والتحليل",
      tagline: "أنت أعمى تمامًا عن أداء متجرك",
      icon: BarChart3,
      color: P,
      issues: [
        { item: "Google Search Console", note: "غير مربوط — لا بيانات عن أداء SEO والفهرسة والكلمات اللي تجيب traffic.", level: "حرج", icon: Search },
        { item: "Google Analytics 4", note: "غير مربوط — لا قياس للزيارات، السلوك، أو مسار التحويل.", level: "حرج", icon: LineChart },
        { item: "Google Merchant Center", note: "غير مربوط — خسارة Free Product Listings في Shopping Tab.", level: "حرج", icon: ShoppingBag },
        { item: "Google Business Profile", note: "7 فروع بدون صفحات أعمال = خسارة Local SEO كاملة.", level: "حرج", icon: MapPin },
        { item: "Microsoft Clarity", note: "غير مربوط — لا heatmaps ولا session recordings لفهم سلوك العملاء.", level: "حرج", icon: Gauge },
      ],
    },
    {
      id: "trust",
      title: "الثقة والمصداقية",
      tagline: "العميل لا يجد ما يطمئنه",
      icon: Shield,
      color: A,
      issues: [
        { item: "الخصومات الوهمية", note: "خطر قانوني حقيقي — مشروح بالتفصيل في القسم السابق. أولوية قصوى للإصلاح.", level: "حرج", icon: AlertTriangle },
        { item: "شارة معروف غير ظاهرة", note: "عنصر ثقة أساسي لأي متجر إلكتروني سعودي — غير موجود في الفوتر.", level: "تحسين", icon: Award },
        { item: "قسم تقييمات عملاء غائب", note: "لا يوجد Reviews ولا UGC — التقييمات ترفع التحويل بنسبة 30%+.", level: "تحسين", icon: Star },
      ],
    },
    {
      id: "design",
      title: "التصميم والحضور",
      tagline: "الانطباع الأول والاكتشاف",
      icon: Palette,
      color: R,
      issues: [
        { item: "البنرات غير محسنة", note: "Hero Banner بعرض 3840px (كارثة سرعة)، وصور الكاتيجوريز فاضية أو بصور واتساب.", level: "حرج", icon: ImageIcon },
        { item: "Instagram مفقود تمامًا", note: "موجود FB / TikTok / Snapchat / YouTube / X — بس Instagram (أهم قناة أزياء في السعودية) غائب.", level: "تحسين", icon: Share2 },
      ],
    },
  ];
  const criticalCount = issueGroups.reduce((n, g) => n + g.issues.filter(i => i.level === "حرج").length, 0);
  const improvementCount = issueGroups.reduce((n, g) => n + g.issues.filter(i => i.level === "تحسين").length, 0);

  const competitors: { name: string; strength: string; weakness: string; color: string }[] = [
    { name: "Namshi", strength: "SEO قوي جدًا، catalog ضخم، Brand recognition إقليمي", weakness: "تجربة غير محلية، شحن أبطأ، غير متخصص في Jack & Jones", color: P },
    { name: "Centrepoint", strength: "حضور فعلي قوي في المولات السعودية", weakness: "موقع ضعيف تقنيًا، تركيز retail أكثر من online", color: B },
    { name: "SIVVI", strength: "تركيز واضح على Fashion، UX جيدة", weakness: "SEO متوسط، حضور اجتماعي أضعف من Namshi", color: A },
  ];

  const ourEdge = [
    "7 فروع فعلية = Local SEO dominance غير مستغلة (Google Business Profile لكل فرع)",
    "متجر متخصص في Jack & Jones = Brand authority أوضح من Namshi الـ multi-brand",
    "Setup أخف وأسرع في التعديل من منصات المنافسين الـ custom",
    "حضور في المولات الكبرى (نخيل / بانوراما / Red Sea / Riyadh Park) = traffic فعلي قابل للتحويل لأونلاين",
  ];

  const technicalSEO: { title: string; icon: LucideIcon; color: string; desc: string; code: string; location: string }[] = [
    {
      title: "Meta Tags لكل صفحة",
      icon: Tag, color: G,
      desc: "كل صفحة (Home / Collection / Product / Blog / Static) تاخد Title و Description فريد حسب صيغة محسوبة. هذا أول ما يظهر في نتائج جوجل ويحدد الـ CTR.",
      code: `Title: {اسم المنتج} | {الكاتيجوري} | Jack & Jones الرياض
Description: اشتري {اسم المنتج} بـ {السعر} ر.س. شحن سريع لكل السعودية — 7 فروع. عروض حصرية.`,
      location: "theme.liquid → <head>"
    },
    {
      title: "Schema Markup (JSON-LD)",
      icon: Code, color: B,
      desc: "إضافة Product + Organization + LocalBusiness (×7 فروع) + BreadcrumbList + FAQPage. هذا الذي يعمل Rich Snippets — النجوم، الأسعار، الـ breadcrumbs في نتائج البحث.",
      code: `{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "{{ product.title }}",
  "image": "{{ product.featured_image | img_url: '1200x' }}",
  "brand": { "@type": "Brand", "name": "Jack & Jones" },
  "offers": {
    "@type": "Offer",
    "price": "{{ product.price | money_without_currency }}",
    "priceCurrency": "SAR",
    "availability": "{% if product.available %}InStock{% else %}OutOfStock{% endif %}"
  }
}`,
      location: "snippets/product-schema.liquid"
    },
    {
      title: "Hreflang صريح",
      icon: Globe, color: P,
      desc: "تضاف tags في الـ head لتأكيد العلاقة بين /ar و /en لجوجل. بدونها جوجل قد يعرض النسخة الخطأ في نتائج البحث حسب بلد المستخدم.",
      code: `<link rel="alternate" hreflang="ar-SA"
  href="https://jackjonesriyadh.com/ar{{ canonical_url }}" />
<link rel="alternate" hreflang="en-SA"
  href="https://jackjonesriyadh.com/en{{ canonical_url }}" />
<link rel="alternate" hreflang="x-default"
  href="https://jackjonesriyadh.com/ar{{ canonical_url }}" />`,
      location: "theme.liquid → <head>"
    },
    {
      title: "Sitemap + Robots.txt",
      icon: FileText, color: A,
      desc: "Shopify يولد sitemap.xml تلقائيًا. المهم تسجيله في Search Console ومنع صفحات /cart و /checkout و /account من الـ indexing.",
      code: `# robots.txt.liquid
User-agent: *
Disallow: /cart
Disallow: /checkout
Disallow: /account
Disallow: /*?variant=

Sitemap: https://jackjonesriyadh.com/sitemap.xml`,
      location: "templates/robots.txt.liquid"
    },
    {
      title: "Alt Text للصور",
      icon: ImageIcon, color: R,
      desc: "كل صورة منتج وكاتيجوري تاخد alt بالعربي والإنجليزي حسب صيغة محسوبة. هذا يفتح traffic من Google Images ويحسن الـ Accessibility.",
      code: `عربي: "بولو رجالي أسود قصة سليم — جاك آند جونز الرياض"
English: "Jack Jones men's black slim-fit polo — Riyadh, Saudi Arabia"`,
      location: "Products → Media → Edit Alt"
    },
    {
      title: "Speed + Core Web Vitals",
      icon: Gauge, color: G,
      desc: "تحويل كل الصور لـ WebP، تطبيق image_url helper، Preload للـ hero image، إزالة JS/CSS غير المستخدم. هدف LCP < 2.5s و INP < 200ms.",
      code: `{{ product.featured_image
    | image_url: width: 1200
    | image_tag:
        loading: 'lazy',
        fetchpriority: 'auto',
        sizes: '(max-width: 768px) 100vw, 50vw' }}`,
      location: "Product / Collection templates"
    },
  ];

  const keywords: { kw: string; vol: string; diff: string; target: string }[] = [
    { kw: "جاك اند جونز الرياض", vol: "12,000", diff: "سهل", target: "Homepage" },
    { kw: "ملابس رجالية الرياض", vol: "18,000", diff: "صعب", target: "Collections" },
    { kw: "جينز رجالي الرياض", vol: "9,500", diff: "متوسط", target: "Jeans Collection" },
    { kw: "بولو رجالي السعودية", vol: "5,000", diff: "سهل", target: "Polo Collection" },
    { kw: "شورت رجالي صيف 2026", vol: "4,200", diff: "سهل", target: "Shorts Collection" },
    { kw: "Jack Jones Riyadh", vol: "3,800", diff: "سهل", target: "Homepage EN" },
    { kw: "تيشرت رجالي اوفر سايز", vol: "3,500", diff: "سهل", target: "T-shirts" },
    { kw: "ملابس كاجوال رجالي جدة", vol: "2,800", diff: "متوسط", target: "Blog / Jeddah" },
    { kw: "افضل ماركات ملابس رجالية KSA", vol: "2,200", diff: "متوسط", target: "Blog Article" },
    { kw: "jack jones sale saudi", vol: "1,500", diff: "سهل", target: "Sale Collection" },
  ];

  const onPage = [
    { title: "Collection Pages قوية", icon: Layers, desc: 'كل كاتيجوري تبقى صفحة SEO مستقلة: H1 واضح + وصف 150-200 كلمة تحت المنتجات (مش فوقها عشان ما تأثرش على UX) + Internal Links لكاتيجوريز مكملة.' },
    { title: "Internal Linking", icon: Link2, desc: 'ربط الصفحات ببعض منطقيًا: الجينز → "يعجبك أيضًا: قمصان، بناطيل كاجوال". يزيد Time on Site و يقوي الـ Authority بين الصفحات.' },
    { title: "Breadcrumb Schema", icon: Navigation, desc: 'إضافة Breadcrumb Schema لكل صفحة منتج: الرئيسية ← الملابس ← تيشرتات ← اسم المنتج. يعمل Rich Snippet ويزيد CTR بنسبة 15-20%.' },
  ];

  const uxUrgent = [
    { task: "استبدال البنرات (1440×600 Hero + 750×900 Mobile، WebP مضغوط)", impact: "السرعة + الانطباع" },
    { task: "صور الكاتيجوريز الدائرية (600×600 احترافية)", impact: "احترافية المظهر" },
    { task: "تصحيح الخصومات الوهمية (Bulk CSV Edit)", impact: "قانوني حرج" },
    { task: "إضافة شارة معروف + عناصر ثقة إضافية", impact: "الثقة" },
    { task: "إنشاء حساب Instagram وربطه بالمتجر + Shopping Tag", impact: "اكتشاف البراند" },
  ];

  const uxGrowth = [
    { task: "Announcement Bar متناوب (شحن + إرجاع + أقساط)", impact: "Conversion" },
    { task: "إعادة ترتيب Homepage Sections (8 sections محسوبة)", impact: "UX" },
    { task: "Product Page: Size Guide + Fabric icons + Sticky Cart", impact: "Conversion" },
    { task: "Shopify Predictive Search + Synonyms (بنطلون → جينز)", impact: "اكتشاف المنتجات" },
    { task: "Judge.me Reviews بالعربي + Rich Snippets", impact: "الثقة + SEO" },
    { task: "Countdown Timer + Low Stock Alert على العروض", impact: "Urgency" },
  ];

  const uxPremium = [
    { task: "Cart Drawer (Slide-out) بدل Cart Page", impact: "AOV" },
    { task: "Free Shipping Progress Bar في السلة", impact: "AOV +20-30%" },
    { task: "Checkout Trust Badges + تحسين التنسيق", impact: "Conversion" },
    { task: "Recently Viewed + You May Also Like", impact: "AOV" },
  ];

  const shopifyDev = [
    { title: "Theme Optimization", icon: Palette, desc: "تحسين الثيم الحالي بـ custom CSS + إزالة bloat غير مستخدم. في Phase 2 لو الميزانية سمحت، نظر في Impulse أو Prestige." },
    { title: "Liquid Customizations", icon: Code, desc: 'إضافة badges ديناميكية ("الأكثر مبيعًا"، "جديد"، "قطن عضوي") عبر metafields + liquid.' },
    { title: "Product Metafields", icon: Database, desc: "Metafields مخصصة: نوع القماش، بلد المنشأ، تعليمات الغسيل، Fit Type (Slim/Regular/Relaxed). تحسن SEO والـ Conversion." },
    { title: "URL Redirects", icon: Link2, desc: "تنظيف الـ URLs الطويلة الحالية مع 301 redirects. /products/t-shirts-tops_t-shirt_relaxed_black_12300609 → /products/tshirt-black-relaxed." },
  ];

  const googleTools: { name: string; short: string; icon: LucideIcon; color: string; purpose: string; importance: string; level: "حرج" | "مهم" | "موصى به" }[] = [
    { name: "Google Search Console", short: "GSC", icon: Search, color: R,
      purpose: "مراقبة الفهرسة والأداء في البحث، تقديم الـ Sitemap، اكتشاف مشاكل الـ Mobile Usability، وتتبع الكلمات اللي تجيب traffic.",
      importance: "بدونه إنت أعمى تمامًا عن أداء الـ SEO. أول أداة لازم تنصب.", level: "حرج" },
    { name: "Google Analytics 4", short: "GA4", icon: BarChart3, color: R,
      purpose: "تتبع سلوك المستخدمين، مصادر الترافيك، مسارات التحويل، الأحداث (Add-to-cart، Begin Checkout، Purchase).",
      importance: "Universal Analytics انتهى. GA4 هو المعيار الحالي. بدونه مفيش قياس conversion حقيقي.", level: "حرج" },
    { name: "Google Merchant Center", short: "GMC", icon: ShoppingBag, color: A,
      purpose: "Free Product Listings — منتجاتك تظهر في Shopping Tab مجانًا بدون إعلانات. Feed يتولد تلقائيًا من Shopify.",
      importance: "Traffic مجاني قيّم خصوصًا على الـ brand keywords. حتى بدون إعلانات مدفوعة، الـ organic listings قيمتها كبيرة.", level: "حرج" },
    { name: "Google Business Profile (×7)", short: "GBP", icon: MapPin, color: G,
      purpose: "صفحة منفصلة لكل فرع من الـ 7 فروع — تظهر في Google Maps و Local Pack مع صور، ساعات، تقييمات، خدمات.",
      importance: "أضخم فرصة Local SEO مش مستغلة. 7 فروع ظاهرين في خرائط جوجل = traffic يومي مجاني.", level: "حرج" },
    { name: "Microsoft Clarity", short: "Clarity", icon: Gauge, color: B,
      purpose: "Heatmaps + Session Recordings + Rage Click detection + Dead Click detection. مجاني تمامًا بدون حد أقصى.",
      importance: "أرخص طريقة لفهم UX issues الحقيقية. تشوف فعليًا فين الناس بيتلكعوا أو بيطبقوا بعصبية.", level: "موصى به" },
    { name: "Google Tag Manager", short: "GTM", icon: Code, color: P,
      purpose: "Container مركزي لكل الـ tags (GA4، Clarity، Pixel، Conversions). بدل تعديل كود الثيم في كل مرة.",
      importance: "يفصل الـ tracking عن المطور — أي تغيير tracking مستقبلي يتم من داخل GTM بدون code.", level: "مهم" },
    { name: "PageSpeed Insights + CrUX", short: "PSI", icon: Zap, color: A,
      purpose: "قياس Core Web Vitals (LCP / INP / CLS) على بيانات ميدانية حقيقية من متصفحات المستخدمين (Chrome UX Report).",
      importance: "Core Web Vitals عامل ranking رسمي في جوجل. بدون قياس مفيش تحسين.", level: "مهم" },
    { name: "Google Trends + Keyword Planner", short: "Trends", icon: TrendingUp, color: P,
      purpose: "بحث الترندات والكلمات الموسمية. \"ملابس العيد\" في رمضان، \"جاكيتات شتوي\" في نوفمبر، إلخ.",
      importance: "التخطيط الاستباقي للمحتوى — المقال الموسمي لازم يتكتب قبل الموسم بـ 3-4 أسابيع.", level: "موصى به" },
  ];

  const apps: { name: string; pricing: string; purpose: string; priority: string; color: string }[] = [
    { name: "Shopify Search & Discovery", pricing: "مجاني", purpose: "بحث داخلي + Synonyms + Filters متقدمة بالمقاس واللون والسعر", priority: "أساسي", color: G },
    { name: "Judge.me Reviews", pricing: "مجاني / $15", purpose: "تقييمات بالعربي + Rich Snippets في جوجل (نجوم)", priority: "أساسي", color: G },
    { name: "Loox (Photo UGC)", pricing: "من $9.99", purpose: "صور من العملاء (UGC) — قوية جدًا للسوق السعودي", priority: "موصى به", color: B },
    { name: "Smile.io Loyalty", pricing: "من $49", purpose: "برنامج نقاط — تحويل الـ Cashback اليدوي لنظام تلقائي", priority: "موصى به", color: B },
    { name: "Tidio Live Chat + AI", pricing: "مجاني / $19", purpose: "Chat بالعربي مع AI للرد على المقاسات والإرجاع 24/7", priority: "موصى به", color: B },
    { name: "Back In Stock", pricing: "مجاني / $19", purpose: "إشعار العملاء تلقائيًا عند توفر المنتج (لسه مش مفعّل)", priority: "مهم", color: A },
    { name: "ReConvert Post-Purchase", pricing: "من $4.99", purpose: "Upsell بعد الشراء مباشرة لزيادة AOV", priority: "اختياري", color: A },
    { name: "Shopify Email", pricing: "مجاني حتى 10k", purpose: "Welcome series + Cart Abandonment flow", priority: "مهم", color: A },
  ];

  const contentTypes: { title: string; icon: LucideIcon; desc: string; examples: string[] }[] = [
    { title: "Style Guides", icon: Sparkles, desc: "مقالات تستهدف intent \"كيف ألبس\"", examples: ['تنسيق الجينز في الرياض 2026', 'الأوفر سايز كيف تلبسه صح', 'كاجوال للشغل في السعودية'] },
    { title: "Brand Stories", icon: FileText, desc: "مقالات تبني Authority", examples: ['قصة Jack & Jones في السعودية', 'Slim vs Regular vs Relaxed', 'دليل المقاسات الشامل'] },
    { title: "Local SEO", icon: MapPin, desc: "مقالات موجهة جغرافيًا", examples: ['أفضل محلات ملابس رجال الرياض 2026', 'دليل فروع نخيل مول', 'ملابس رجالية جدة'] },
    { title: "Seasonal", icon: Calendar, desc: "محتوى موسمي مخطط مسبقًا", examples: ['ملابس العيد 2026', 'كاجوال رمضان', 'تشكيلة الصيف', 'بلاك فرايدي'] },
  ];

  const kpis: { metric: string; current: string; target: string; icon: LucideIcon; color: string }[] = [
    { metric: "Conversion Rate", current: "~2-3%", target: "3.5%+", icon: TrendingUp, color: G },
    { metric: "AOV", current: "~250 ر.س", target: "350 ر.س+", icon: ShoppingBag, color: B },
    { metric: "Bounce Rate", current: "~65%", target: "< 50%", icon: Gauge, color: A },
    { metric: "Pages/Session", current: "~1.8", target: "3+", icon: LineChart, color: P },
    { metric: "LCP (Page Speed)", current: "غير مقاس", target: "< 2.5s", icon: Zap, color: R },
    { metric: "Organic Traffic", current: "baseline", target: "3× خلال 3 شهور", icon: BarChart3, color: G },
  ];

  const phases: { num: number; title: string; sub: string; price: string; color: string; dark: boolean; tasks: string[] }[] = [
    { num: 1, title: "الأساس + SEO التقني", sub: "إصلاحات حرجة + بنية SEO كاملة + ربط أدوات جوجل", price: "1,000", color: G, dark: false,
      tasks: [
        "تصحيح الخصومات الوهمية (حرج قانوني)",
        "Meta Tags + Description لكل الصفحات",
        "Schema Markup (Product + Org + LocalBusiness ×7)",
        "Hreflang صريح /ar و /en",
        "Sitemap + Robots.txt + ربط Search Console",
        "ربط GA4 + GTM + Clarity + Merchant Center",
        "إنشاء Google Business Profile للـ 7 فروع",
        "Alt Text لكل الصور + تحويل WebP",
      ] },
    { num: 2, title: "UX + Shopify Dev", sub: "تطوير التجربة والبنية التقنية للمتجر", price: "1,300", color: B, dark: true,
      tasks: [
        "استبدال البنرات + صور الكاتيجوريز",
        "Announcement Bar + إعادة ترتيب Homepage",
        "Product Page: Size Guide + Sticky Cart",
        "Shopify Predictive Search + Synonyms",
        "Product Metafields (قماش / fit / غسيل)",
        "URL Redirects + تنظيف الروابط",
        "Cart Drawer + Free Shipping Bar",
        "شارة معروف + تحسين الفوتر",
      ] },
    { num: 3, title: "المحتوى + Polish", sub: "SEO المحتوى + اللمسات النهائية", price: "1,200", color: A, dark: false,
      tasks: [
        "Collection Pages SEO (Descriptions 150-200 كلمة)",
        "Internal Linking Strategy منظم",
        "Breadcrumb Schema",
        "تركيب Judge.me Reviews + UGC",
        "4 مقالات أولى في البلوج",
        "KPIs Dashboard يعرض من GA4",
        "Instagram setup + Shopify Shop tag",
        "Countdown Timer + Back in Stock",
      ] },
  ];

  const timeline: { day: string; p1: string; p2: string; p3: string }[] = [
    { day: "يوم 1-2", p1: "تصحيح الخصومات + Meta Tags", p2: "", p3: "" },
    { day: "يوم 3-4", p1: "Schema + Hreflang", p2: "", p3: "" },
    { day: "يوم 5-7", p1: "ربط GSC/GA4/Clarity/GMC/GBP + Alt + WebP", p2: "البنرات + الكاتيجوريز", p3: "" },
    { day: "يوم 8-10", p1: "", p2: "Homepage + Product Page", p3: "" },
    { day: "يوم 11-14", p1: "", p2: "Search + Metafields + URLs", p3: "Collection SEO" },
    { day: "يوم 15-18", p1: "", p2: "", p3: "Reviews + Internal Linking + Breadcrumbs" },
    { day: "يوم 19-21", p1: "", p2: "", p3: "البلوج + Instagram + Dashboard + تسليم" },
  ];

  const methodology = [
    { title: "اجتماع انطلاق (Kickoff)", desc: "مراجعة التحليل + تحديد الأولويات + تأكيد المواعيد والوصولات المطلوبة (Shopify Admin، Domain، Analytics)" },
    { title: "تنفيذ على مراحل مستقلة", desc: "كل مرحلة تنتهي بتسليم ومراجعة قبل الانتقال للتي تليها" },
    { title: "تحديثات يومية", desc: "عبر واتساب أو القناة المفضلة — توثيق كل تعديل في تقرير" },
    { title: "جولة مراجعة واحدة مجانية", desc: "للتعديلات البسيطة بعد كل مرحلة" },
    { title: "دعم بعد التسليم", desc: "شهرين دعم فني مجاني لأي تعديلات / صيانة كخدمة ما بعد البيع" },
  ];

  /* ═══════════ HELPERS ═══════════ */

  function PhaseTaskList({ tasks, color, phaseNum }: { tasks: string[]; color: string; phaseNum: number }) {
    return (
      <div className="flex flex-col gap-2 jj-stagger">
        {tasks.map((t, i) => (
          <div key={i} className="jj-item rounded-[14px] p-4 flex items-center gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold flex-shrink-0" style={{ background: `${color}15`, color }}>{phaseNum}.{i + 1}</span>
            <p className="flex-1 text-[13px] font-bold ar-body" style={{ color: D }}>{t}</p>
          </div>
        ))}
      </div>
    );
  }

  /* ═══════════ RENDER ═══════════ */

  return (
    <ArabicTailProcessor>
    <div ref={ref} style={{ background: "#fff", color: D, fontFamily: "'Ahmed Sans', sans-serif" }}>

      {/* ═══ HERO ═══ */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: "#fff" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] pointer-events-none" style={{ background: `radial-gradient(ellipse, ${G}18 0%, transparent 70%)` }} />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center">

          <div className="jj-hero opacity-0 text-center mb-4" style={{ paddingTop: 40 }}>
            <p className="text-[13px] font-bold tracking-wider" style={{ color: "rgba(0,0,0,0.3)" }}>أبريل 2026</p>
          </div>

          <div className="jj-hero opacity-0 text-center mb-4">
            <h1 className="ar-heading" style={{ fontSize: "clamp(44px, 10vw, 100px)", lineHeight: 1.3, color: D }}>
              عرض فني
            </h1>
          </div>

          <div className="jj-hero opacity-0 text-center mb-6">
            <p className="ar-body text-lg md:text-xl" style={{ color: "rgba(0,0,0,0.5)" }}>
              تحسين البنية، السيو، والسرعة لمتجر جاك آند جونز الرياض
            </p>
            <p className="text-xl font-bold mt-2 ar-heading" style={{ color: G }}>jackjonesriyadh.com</p>
          </div>

          {/* From / To */}
          <div className="jj-hero opacity-0 grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 w-full max-w-xl">
            <div className="rounded-[16px] p-5" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
              <p className="text-[10px] font-bold tracking-[2px] uppercase mb-2" style={{ color: G }}>مقدم من</p>
              <p className="text-[14px] font-bold ar-body" style={{ color: D }}>Ahmed Ali</p>
              <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>Full-Stack Digital Strategist</p>
              <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.3)" }}>hello@ahmedali.online</p>
            </div>
            <div className="rounded-[16px] p-5" style={{ background: "#fff", border: `2px solid ${G}`, boxShadow: `3px 3px 0px 0px ${D}` }}>
              <p className="text-[10px] font-bold tracking-[2px] uppercase mb-2" style={{ color: G }}>مقدم إلى</p>
              <p className="text-[14px] font-bold ar-body" style={{ color: D }}>Jack & Jones الرياض</p>
              <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>ملابس رجالية — 7 فروع</p>
              <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.3)" }}>jackjonesriyadh.com</p>
            </div>
          </div>

          {/* Stats */}
          <div className="jj-hero opacity-0 mb-10 w-full max-w-2xl">
            <div className="flex items-stretch justify-center" style={{ background: "#fff", border: "1px solid #E8E8E8", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
              {[
                { n: "3", l: "مراحل" },
                { n: "23", l: "مهمة" },
                { n: "21", l: "يوم عمل" },
                { n: "3,500", l: "ر.س" },
              ].map((s, i) => (
                <div key={s.l} className="flex-1 flex flex-col items-center justify-center py-5 px-2 relative" style={{ borderRight: i > 0 ? "1px solid #F0F0F0" : "none" }}>
                  <span className="ar-heading" style={{ fontSize: 28, lineHeight: 1, color: D }}>{s.n}</span>
                  <span className="text-[10px] font-bold mt-1 ar-body" style={{ color: "rgba(0,0,0,0.3)" }}>{s.l}</span>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-t-full" style={{ background: G }} />
                </div>
              ))}
            </div>
          </div>

          {/* Objective */}
          <div className="jj-hero opacity-0 rounded-[16px] p-6 text-center mb-10 max-w-2xl" style={{ background: `${G}08`, border: `1px solid ${G}20` }}>
            <p className="text-[13px] ar-body font-medium leading-relaxed" style={{ color: D }}>
              <strong style={{ color: G }}>الهدف:</strong> تحويل jackjonesriyadh.com من متجر Shopify تقليدي إلى متجر محترف تقنيًا يتفوق على Namshi وCentrepoint في البحث العضوي المحلي
            </p>
            <p className="text-[12px] ar-body mt-2" style={{ color: "rgba(0,0,0,0.5)" }}>
              <strong>النطاق:</strong> Technical SEO + UX + Speed + Shopify Dev + تصميم البنرات + ربط أدوات جوجل + المحتوى
              <span className="mx-2" style={{ color: R }}>•</span>
              <strong>غير متضمن:</strong> إعلانات مدفوعة
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="jj-hero opacity-0 flex flex-col items-center gap-2">
            <div style={{ width: 24, height: 38, border: "1.5px solid rgba(0,0,0,0.14)", borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 5 }}>
              <div style={{ width: 3, height: 6, borderRadius: 2, background: G, animation: "mouseScrollJJ 1.6s ease-in-out infinite" }} />
            </div>
          </div>
        </div>

        <style>{`@keyframes mouseScrollJJ{0%{transform:translateY(0);opacity:1}75%{transform:translateY(9px);opacity:0}76%{transform:translateY(0);opacity:0}100%{opacity:1}}`}</style>
      </section>

      {/* ═══ EXECUTIVE SUMMARY ═══ */}
      <section className="jj-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>القسم الأول</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5">الملخص التنفيذي</h2>
          </div>

          <div className="rounded-[20px] p-8 md:p-10" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
            <p className="text-[14px] ar-body leading-[2] mb-6" style={{ color: D }}>
              متجر Jack & Jones الرياض (jackjonesriyadh.com) براند قوي بحضور فعلي في 7 فروع وتأسيس رسمي (رقم ضريبي + سجل تجاري ظاهرين). لكن البنية التقنية الرقمية للمتجر متأخرة بشكل واضح عن المنافسين الأساسيين (Namshi، Centrepoint، SIVVI) خصوصًا في Technical SEO، Schema Markup، السرعة، وربط أدوات القياس.
            </p>
            <p className="text-[14px] ar-body leading-[2] mb-6" style={{ color: "rgba(0,0,0,0.6)" }}>
              هذا العرض لا يشمل إعلانات مدفوعة — يركز فقط على تحسين المتجر نفسه: إصلاح الخصومات الوهمية (خطر قانوني)، بناء SEO كامل من الصفر، ربط أدوات جوجل (Search Console، GA4، Merchant Center، Business Profile للـ 7 فروع، Clarity)، تحسين السرعة والبنرات، وإضافة عناصر الثقة والتقييمات. النتيجة: متجر جاهز يتفوق عضويًا على المنافسين.
            </p>
            <p className="text-[14px] ar-body leading-[2]" style={{ color: "rgba(0,0,0,0.5)" }}>
              بخبرة تتجاوز 5 سنوات في التسويق الرقمي والتطوير الرقمي في أسواق الخليج، مع براندز مثل أوريدو، QNB، أمازون مصر، والخطوط السعودية.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ CURRENT STATE ANALYSIS ═══ */}
      <section className="jj-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>القسم الثاني</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5" style={{ color: "#fff" }}>تحليل <span style={{ color: R }}>الوضع الحالي</span></h2>
            <p className="text-sm max-w-lg mx-auto ar-body" style={{ color: "rgba(255,255,255,0.6)" }}>فحص مباشر للموقع — موجود وغير موجود</p>
          </div>

          {/* Strengths */}
          <div className="mb-12">
            <h3 className="ar-heading text-xl mb-6 text-center" style={{ color: G }}>✓ ما هو موجود وقوي</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 jj-stagger">
              {strengths.map((s, i) => (
                <div key={i} className="jj-item rounded-[16px] p-5" style={{ background: `${G}12`, border: `1px solid ${G}30` }}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: G }}>
                      <s.icon size={16} color={D} />
                    </div>
                    <h4 className="text-[13px] font-bold ar-body" style={{ color: "#fff" }}>{s.item}</h4>
                  </div>
                  <p className="text-[11px] ar-body" style={{ color: "rgba(255,255,255,0.6)" }}>{s.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Issues — Grouped by Category */}
          <div>
            <div className="text-center mb-8">
              <h3 className="ar-heading text-2xl mb-3" style={{ color: "#fff" }}>المشاكل المرصودة <span style={{ color: R }}>موزعة على 4 محاور</span></h3>
              <div className="inline-flex items-center gap-3 rounded-full px-5 py-2" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: R }} />
                  <span className="text-[11px] font-bold" style={{ color: "#fff" }}>{criticalCount} حرج</span>
                </div>
                <div className="w-px h-4" style={{ background: "rgba(255,255,255,0.15)" }} />
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: A }} />
                  <span className="text-[11px] font-bold" style={{ color: "#fff" }}>{improvementCount} تحسين</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 jj-stagger">
              {issueGroups.map((grp) => (
                <div key={grp.id} className="jj-item rounded-[22px] p-6 flex flex-col" style={{ background: "#fff", border: `2px solid ${grp.color}25` }}>
                  {/* Category header */}
                  <div className="flex items-start gap-4 mb-5 pb-5" style={{ borderBottom: "1px dashed #EEE" }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${grp.color}15` }}>
                      <grp.icon size={22} color={grp.color} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h4 className="ar-heading text-lg" style={{ color: D }}>{grp.title}</h4>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: `${grp.color}15`, color: grp.color }}>{grp.issues.length} {grp.issues.length === 1 ? "مشكلة" : "مشاكل"}</span>
                      </div>
                      <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>{grp.tagline}</p>
                    </div>
                  </div>

                  {/* Issues list */}
                  <div className="flex flex-col gap-3 flex-1">
                    {grp.issues.map((iss, i) => {
                      const sev = iss.level === "حرج" ? R : A;
                      return (
                        <div key={i} className="flex items-start gap-3 rounded-[12px] p-3" style={{ background: "#FAFAFA", border: "1px solid #F0F0F0" }}>
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "#fff", border: `1px solid ${sev}25` }}>
                            <iss.icon size={14} color={sev} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h5 className="text-[12.5px] font-bold ar-body" style={{ color: D }}>{iss.item}</h5>
                              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: sev }} />
                              <span className="text-[9px] font-bold ar-body" style={{ color: sev }}>{iss.level}</span>
                            </div>
                            <p className="text-[11px] leading-relaxed ar-body" style={{ color: "rgba(0,0,0,0.55)" }}>{iss.note}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DEEP DIVE: FAKE DISCOUNTS ═══ */}
      <section className="jj-slide opacity-0" style={{ padding: "100px 24px", background: "#FFF5F5" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5" style={{ background: R, color: "#fff" }}>
              <AlertTriangle size={16} />
              <span className="text-[11px] font-bold tracking-wider">تحذير عاجل</span>
            </div>
            <h2 className="ar-heading text-4xl md:text-5xl mb-4">الخصومات <span style={{ color: R }}>الوهمية</span></h2>
            <p className="text-sm max-w-2xl mx-auto ar-body" style={{ color: "rgba(0,0,0,0.6)" }}>
              أخطر مشكلة على الموقع دلوقتي. مش مجرد مشكلة SEO أو UX — دي مخالفة قانونية ممكن تجيبلك غرامات وإيقاف من 3 جهات رسمية في السعودية
            </p>
          </div>

          {/* Visual comparison: current vs correct */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12 jj-stagger">
            {/* CURRENT - WRONG */}
            <div className="jj-item rounded-[20px] p-6" style={{ background: "#fff", border: `2px solid ${R}` }}>
              <div className="flex items-center gap-2 mb-5">
                <XCircle size={18} color={R} />
                <span className="text-[11px] font-bold tracking-wider" style={{ color: R }}>الوضع الحالي على موقعك — خطأ</span>
              </div>
              <div className="rounded-[14px] p-5 mb-4" style={{ background: "#FAFAFA", border: "1px solid #EEE" }}>
                <p className="text-[11px] font-bold ar-body mb-2" style={{ color: "rgba(0,0,0,0.4)" }}>مثال: تيشرت JORJOSHUA</p>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[22px] font-bold" style={{ color: D, fontFamily: "system-ui" }}>99 ر.س</span>
                  <span className="text-[14px] line-through" style={{ color: "rgba(0,0,0,0.35)", fontFamily: "system-ui" }}>99 ر.س</span>
                  <span className="px-2 py-1 rounded-md text-[10px] font-bold" style={{ background: R, color: "#fff", fontFamily: "system-ui" }}>-23%</span>
                </div>
                <p className="text-[11px] ar-body" style={{ color: R }}>⚠️ السعر "قبل" = السعر "بعد" = 99 ر.س — لكن فيه label خصم 23%!</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <span className="text-[12px] font-bold" style={{ color: R }}>•</span>
                  <p className="text-[12px] ar-body" style={{ color: "rgba(0,0,0,0.7)" }}>العميل يشك في المتجر لما يحسبها</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[12px] font-bold" style={{ color: R }}>•</span>
                  <p className="text-[12px] ar-body" style={{ color: "rgba(0,0,0,0.7)" }}>جوجل يعرض الخصم الوهمي في نتائج البحث (Rich Snippet كاذب)</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[12px] font-bold" style={{ color: R }}>•</span>
                  <p className="text-[12px] ar-body" style={{ color: "rgba(0,0,0,0.7)" }}>أي عميل يقدر يبلغ هيئة حماية المستهلك</p>
                </div>
              </div>
            </div>

            {/* CORRECT */}
            <div className="jj-item rounded-[20px] p-6" style={{ background: "#fff", border: `2px solid ${G}`, boxShadow: `3px 3px 0px 0px ${D}` }}>
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle2 size={18} color={G} />
                <span className="text-[11px] font-bold tracking-wider" style={{ color: "#10B981" }}>الوضع الصحيح المطلوب</span>
              </div>
              <div className="rounded-[14px] p-5 mb-4" style={{ background: "#FAFAFA", border: "1px solid #EEE" }}>
                <p className="text-[11px] font-bold ar-body mb-2" style={{ color: "rgba(0,0,0,0.4)" }}>مثال: تيشرت JORJOSHUA</p>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[22px] font-bold" style={{ color: D, fontFamily: "system-ui" }}>99 ر.س</span>
                  <span className="text-[14px] line-through" style={{ color: "rgba(0,0,0,0.35)", fontFamily: "system-ui" }}>129 ر.س</span>
                  <span className="px-2 py-1 rounded-md text-[10px] font-bold" style={{ background: "#10B981", color: "#fff", fontFamily: "system-ui" }}>-23%</span>
                </div>
                <p className="text-[11px] ar-body" style={{ color: "#10B981" }}>✓ فرق حقيقي 30 ر.س بين السعرين — الخصم 23% مطابق تمامًا</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <span className="text-[12px] font-bold" style={{ color: "#10B981" }}>•</span>
                  <p className="text-[12px] ar-body" style={{ color: "rgba(0,0,0,0.7)" }}>العميل يثق — الحساب واضح ومنطقي</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[12px] font-bold" style={{ color: "#10B981" }}>•</span>
                  <p className="text-[12px] ar-body" style={{ color: "rgba(0,0,0,0.7)" }}>جوجل يعرض الخصم الحقيقي في Rich Snippets (ميزة تنافسية)</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[12px] font-bold" style={{ color: "#10B981" }}>•</span>
                  <p className="text-[12px] ar-body" style={{ color: "rgba(0,0,0,0.7)" }}>متوافق مع نظام حماية المستهلك السعودي</p>
                </div>
              </div>
            </div>
          </div>

          {/* The 3 regulators */}
          <div className="mb-12">
            <h3 className="ar-heading text-2xl text-center mb-2">3 جهات رقابية في السعودية <span style={{ color: R }}>ممكن تتدخل</span></h3>
            <p className="text-center text-[13px] ar-body mb-8" style={{ color: "rgba(0,0,0,0.5)" }}>أي عميل يقدر يقدم شكوى — التدخل بيحصل فعلًا وتلقائي على المتاجر الإلكترونية</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 jj-stagger">
              {/* Regulator 1 */}
              <div className="jj-item rounded-[20px] p-6" style={{ background: "#fff", border: `1px solid ${R}30` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${R}15` }}>
                  <Shield size={20} color={R} />
                </div>
                <h4 className="ar-heading text-lg mb-2" style={{ color: D }}>هيئة حماية المستهلك</h4>
                <p className="text-[11px] font-bold ar-body mb-3" style={{ color: R }}>نظام حماية المستهلك — المادة 7 و 8</p>
                <p className="text-[12px] ar-body leading-relaxed mb-4" style={{ color: "rgba(0,0,0,0.6)" }}>
                  تمنع صراحةً الإعلان الكاذب عن التخفيضات والادعاء بخصم وهمي (عرض سعر "قبل" أعلى من السعر الحقيقي).
                </p>
                <div className="rounded-[10px] p-3" style={{ background: `${R}08`, border: `1px solid ${R}20` }}>
                  <p className="text-[11px] font-bold ar-body mb-1" style={{ color: R }}>العقوبات المحتملة</p>
                  <ul className="text-[11px] ar-body list-none" style={{ color: "rgba(0,0,0,0.65)" }}>
                    <li>• غرامة مالية</li>
                    <li>• إيقاف المتجر مؤقت</li>
                    <li>• نشر اسم المخالف علنًا</li>
                  </ul>
                </div>
              </div>

              {/* Regulator 2 */}
              <div className="jj-item rounded-[20px] p-6" style={{ background: "#fff", border: `1px solid ${R}30` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${R}15` }}>
                  <FileText size={20} color={R} />
                </div>
                <h4 className="ar-heading text-lg mb-2" style={{ color: D }}>وزارة التجارة</h4>
                <p className="text-[11px] font-bold ar-body mb-3" style={{ color: R }}>قرار وزاري رقم 21617</p>
                <p className="text-[12px] ar-body leading-relaxed mb-4" style={{ color: "rgba(0,0,0,0.6)" }}>
                  ينظم التخفيضات في السعودية ويشترط أن يكون المنتج معروضًا بالسعر الأصلي لمدة 30 يومًا قبل التخفيض، وأن تكون النسبة حقيقية.
                </p>
                <div className="rounded-[10px] p-3" style={{ background: `${R}08`, border: `1px solid ${R}20` }}>
                  <p className="text-[11px] font-bold ar-body mb-1" style={{ color: R }}>الشروط الواجبة</p>
                  <ul className="text-[11px] ar-body list-none" style={{ color: "rgba(0,0,0,0.65)" }}>
                    <li>• سعر أصلي حقيقي لـ 30 يوم</li>
                    <li>• نسبة خصم مطابقة للحساب</li>
                    <li>• توثيق بداية ونهاية العرض</li>
                  </ul>
                </div>
              </div>

              {/* Regulator 3 */}
              <div className="jj-item rounded-[20px] p-6" style={{ background: "#fff", border: `1px solid ${R}30` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${R}15` }}>
                  <Award size={20} color={R} />
                </div>
                <h4 className="ar-heading text-lg mb-2" style={{ color: D }}>منصة معروف</h4>
                <p className="text-[11px] font-bold ar-body mb-3" style={{ color: R }}>منصة التوثيق السعودية</p>
                <p className="text-[12px] ar-body leading-relaxed mb-4" style={{ color: "rgba(0,0,0,0.6)" }}>
                  الشكاوى المتراكمة ضد المتجر تؤدي لسحب شارة التوثيق ونشر الاسم في قائمة المخالفين العلنية — خسارة فادحة لمصداقية البراند.
                </p>
                <div className="rounded-[10px] p-3" style={{ background: `${R}08`, border: `1px solid ${R}20` }}>
                  <p className="text-[11px] font-bold ar-body mb-1" style={{ color: R }}>الأثر المباشر</p>
                  <ul className="text-[11px] ar-body list-none" style={{ color: "rgba(0,0,0,0.65)" }}>
                    <li>• سحب شارة معروف</li>
                    <li>• تقييم سلبي على المنصة</li>
                    <li>• خسارة ثقة العملاء</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Why this happens (technical explanation) */}
          <div className="rounded-[20px] p-7 mb-10" style={{ background: D, border: `1px solid rgba(255,255,255,0.08)` }}>
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${G}15` }}>
                <Code size={20} color={G} />
              </div>
              <div className="flex-1">
                <h4 className="ar-heading text-lg mb-2" style={{ color: "#fff" }}>ليه ده حاصل أصلًا؟ (الشرح التقني)</h4>
                <p className="text-[12px] ar-body leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.7)" }}>
                  في Shopify، كل منتج عنده حقلين للسعر:
                </p>
                <div className="rounded-[10px] p-4 no-tail" style={{ background: "#1A1A1A", border: `1px solid ${G}20`, direction: "ltr" }}>
                  <pre className="text-[11px] leading-[1.7] overflow-x-auto" style={{ color: "#E5E7EB", fontFamily: "ui-monospace, Menlo, monospace", margin: 0, whiteSpace: "pre-wrap" }}>{`Compare at price: 129 ر.س   ← السعر "قبل الخصم"
Price:            99 ر.س   ← السعر الحالي
─────────────────────────────────────────────
النتيجة: -23% خصم حقيقي ✓

اللي بيحصل على موقعك دلوقتي:
Compare at price: 99 ر.س   ← غلط! نفس السعر
Price:            99 ر.س
─────────────────────────────────────────────
Badge -23% بيطلع بس فعليًا مفيش خصم ✗`}</pre>
                </div>
                <p className="text-[11px] ar-body mt-3" style={{ color: "rgba(255,255,255,0.5)" }}>
                  السبب: غلط في الـ Import من CSV، أو نسيان تحديث الـ Compare at price بعد انتهاء عرض سابق، أو تطبيق خصم قديم لسه شغال في إعدادات Discount Codes.
                </p>
              </div>
            </div>
          </div>

          {/* Solution */}
          <div className="rounded-[20px] p-7" style={{ background: G, border: `2px solid ${D}`, boxShadow: `4px 4px 0px 0px ${D}` }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,0,0,0.1)" }}>
                <Wrench size={20} color={D} />
              </div>
              <div>
                <h4 className="ar-heading text-lg" style={{ color: D }}>الحل — جزء من المرحلة الأولى</h4>
                <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.55)" }}>يوم عمل واحد (~8 ساعات) — أول مهمة قبل أي حاجة تانية</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {[
                { n: "1", t: "Export CSV", d: "تصدير كل المنتجات من Shopify Admin" },
                { n: "2", t: "مراجعة السعر", d: "فحص عمود Variant Compare At Price لكل منتج" },
                { n: "3", t: "القرار", d: "إصلاح السعر الأصلي لقيمة حقيقية، أو حذف الـ Compare at price" },
                { n: "4", t: "Re-import", d: "رفع الـ CSV المصحح وتأكيد التطبيق" },
                { n: "5", t: "مراجعة الأكواد", d: "إلغاء Discount Codes القديمة غير المطلوبة" },
              ].map((step) => (
                <div key={step.n} className="rounded-[12px] p-4 text-center" style={{ background: "rgba(0,0,0,0.06)" }}>
                  <div className="ar-heading text-2xl mb-2" style={{ color: D }}>{step.n}</div>
                  <p className="text-[11px] font-bold ar-body mb-1" style={{ color: D }}>{step.t}</p>
                  <p className="text-[10px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ COMPETITOR POSITIONING ═══ */}
      <section className="jj-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>القسم الثالث</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5">تحليل <span style={{ color: G }}>المنافسين</span> + ميزتك</h2>
            <p className="text-sm max-w-lg mx-auto ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>3 منافسين رئيسيين في سوق الأزياء الرجالية السعودي</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10 jj-stagger">
            {competitors.map((comp) => (
              <div key={comp.name} className="jj-item rounded-[24px] p-6" style={{ background: "#fff", border: `2px solid ${comp.color}25` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${comp.color}12` }}>
                    <ShoppingBag size={18} color={comp.color} />
                  </div>
                  <h3 className="text-[16px] font-bold" style={{ color: D, fontFamily: "system-ui" }}>{comp.name}</h3>
                </div>
                <div className="mb-3">
                  <p className="text-[10px] font-bold mb-1 ar-body" style={{ color: G }}>قوته</p>
                  <p className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.65)" }}>{comp.strength}</p>
                </div>
                <div className="w-full h-px mb-3" style={{ background: "#F0F0F0" }} />
                <div>
                  <p className="text-[10px] font-bold mb-1 ar-body" style={{ color: R }}>نقطة ضعفه</p>
                  <p className="text-[12px] ar-body leading-relaxed" style={{ color: "rgba(0,0,0,0.65)" }}>{comp.weakness}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Our edge */}
          <div className="rounded-[20px] p-8" style={{ background: G, border: `2px solid ${D}`, boxShadow: `4px 4px 0px 0px ${D}` }}>
            <h3 className="ar-heading text-xl mb-4" style={{ color: D }}>ميزتك الحقيقية — نقاط التفوق</h3>
            <div className="flex flex-col gap-3">
              {ourEdge.map((e, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={18} color={D} className="flex-shrink-0 mt-0.5" />
                  <span className="text-[13px] ar-body font-medium" style={{ color: D }}>{e}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TECHNICAL SEO ═══ */}
      <section className="jj-slide opacity-0" style={{ padding: "100px 24px", background: "#FAFAFA" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>القسم الرابع</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5">Technical <span style={{ color: G }}>SEO</span></h2>
            <p className="text-sm max-w-lg mx-auto ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>إصلاح الأساس التقني — بدونه كل ما بعده ضائع</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 jj-stagger">
            {technicalSEO.map((t, i) => (
              <div key={i} className="jj-item rounded-[20px] p-6 flex flex-col" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${t.color}15` }}>
                    <t.icon size={18} color={t.color} />
                  </div>
                  <h3 className="text-[15px] font-bold ar-body flex-1" style={{ color: D }}>{t.title}</h3>
                </div>
                <p className="text-[12px] leading-relaxed ar-body mb-4" style={{ color: "rgba(0,0,0,0.55)" }}>{t.desc}</p>
                <div className="rounded-[10px] p-3 mt-auto no-tail" style={{ background: D, border: `1px solid ${t.color}30`, direction: "ltr" }}>
                  <pre className="text-[10px] leading-[1.6] overflow-x-auto" style={{ color: "#E5E7EB", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", margin: 0, whiteSpace: "pre-wrap" }}>{t.code}</pre>
                </div>
                <p className="text-[10px] font-bold mt-2 ar-body" style={{ color: t.color }}>📍 {t.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ KEYWORDS ═══ */}
      <section className="jj-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>القسم الخامس</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5">الكلمات <span style={{ color: G }}>المفتاحية</span></h2>
            <p className="text-sm max-w-lg mx-auto ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>الكلمات الذهبية المستهدفة في السوق السعودي — المنافسة على أغلبها ضعيفة</p>
          </div>

          <div className="overflow-x-auto rounded-[20px] border" style={{ borderColor: "#EBEBEB" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
              <thead>
                <tr style={{ background: D }}>
                  <th style={{ padding: "14px 20px", textAlign: "right", fontSize: 11, fontWeight: 700, color: "#fff", fontFamily: "'Ahmed Sans', sans-serif" }}>الكلمة المفتاحية</th>
                  <th style={{ padding: "14px 20px", textAlign: "center", fontSize: 11, fontWeight: 700, color: G, fontFamily: "'Ahmed Sans', sans-serif" }}>Volume/شهر</th>
                  <th style={{ padding: "14px 20px", textAlign: "center", fontSize: 11, fontWeight: 700, color: A, fontFamily: "'Ahmed Sans', sans-serif" }}>الصعوبة</th>
                  <th style={{ padding: "14px 20px", textAlign: "right", fontSize: 11, fontWeight: 700, color: B, fontFamily: "'Ahmed Sans', sans-serif" }}>الهدف (الصفحة)</th>
                </tr>
              </thead>
              <tbody>
                {keywords.map((k, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#FAFAFA", borderBottom: "1px solid #F3F4F6" }}>
                    <td style={{ padding: "12px 20px", fontSize: 13, fontWeight: 700, color: D, fontFamily: "'Ahmed Sans', sans-serif" }}>{k.kw}</td>
                    <td style={{ padding: "12px 20px", textAlign: "center", fontSize: 12, color: D, fontFamily: "'Ahmed Sans', sans-serif" }}>{k.vol}</td>
                    <td style={{ padding: "12px 20px", textAlign: "center" }}>
                      <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold ar-body" style={{
                        background: k.diff === "سهل" ? `${G}20` : k.diff === "متوسط" ? `${A}20` : `${R}20`,
                        color: k.diff === "سهل" ? "#10B981" : k.diff === "متوسط" ? A : R,
                      }}>{k.diff}</span>
                    </td>
                    <td style={{ padding: "12px 20px", fontSize: 12, color: "rgba(0,0,0,0.6)", fontFamily: "'Ahmed Sans', sans-serif" }}>{k.target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-[14px] p-4 text-center" style={{ background: `${G}10`, border: `1px solid ${G}30` }}>
            <p className="text-[12px] ar-body" style={{ color: D }}>
              <strong style={{ color: G }}>ملاحظة:</strong> الكلمات الخاصة بالبراند (جاك اند جونز الرياض / Jack Jones Riyadh) تنافسها ضعيف جدًا — يمكن الظهور في الصفحة الأولى خلال 3 أشهر مع التنفيذ الصحيح.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ ON-PAGE SEO ═══ */}
      <section className="jj-slide opacity-0" style={{ padding: "100px 24px", background: "#FAFAFA" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>القسم السادس</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5">On-Page <span style={{ color: G }}>SEO</span></h2>
            <p className="text-sm max-w-lg mx-auto ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>تحسين الصفحات نفسها — Content + Structure + Linking</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 jj-stagger">
            {onPage.map((o, i) => (
              <div key={i} className="jj-item rounded-[20px] p-7" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${G}12` }}>
                  <o.icon size={22} color={G} />
                </div>
                <h3 className="ar-heading text-lg mb-3" style={{ color: D }}>{o.title}</h3>
                <p className="text-[12px] leading-relaxed ar-body" style={{ color: "rgba(0,0,0,0.55)" }}>{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ UX UPGRADES ═══ */}
      <section className="jj-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>القسم السابع</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5">تطوير <span style={{ color: G }}>UX والتصميم</span></h2>
            <p className="text-sm max-w-lg mx-auto ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>من متجر عادي لتجربة تسوق premium تضاهي Zara وH&M</p>
          </div>

          {/* Urgent */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="px-4 py-1.5 rounded-full text-[11px] font-bold" style={{ background: R, color: "#fff" }}>عاجل • أسبوع 1</span>
              <h3 className="ar-heading text-lg" style={{ color: D }}>إصلاحات فورية قبل أي إعلان</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 jj-stagger">
              {uxUrgent.map((u, i) => (
                <div key={i} className="jj-item rounded-[14px] p-4 flex items-center gap-4" style={{ background: "#fff", border: `1px solid ${R}25` }}>
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold flex-shrink-0" style={{ background: `${R}15`, color: R }}>{i + 1}</span>
                  <p className="flex-1 text-[12px] font-bold ar-body" style={{ color: D }}>{u.task}</p>
                  <span className="px-2 py-1 rounded-full text-[9px] font-bold flex-shrink-0" style={{ background: `${R}12`, color: R }}>{u.impact}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Growth */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="px-4 py-1.5 rounded-full text-[11px] font-bold" style={{ background: B, color: "#fff" }}>تطوير • أسبوع 2-3</span>
              <h3 className="ar-heading text-lg" style={{ color: D }}>تحسين تجربة المستخدم</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 jj-stagger">
              {uxGrowth.map((u, i) => (
                <div key={i} className="jj-item rounded-[14px] p-4 flex items-center gap-4" style={{ background: "#fff", border: `1px solid ${B}25` }}>
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold flex-shrink-0" style={{ background: `${B}15`, color: B }}>{i + 1}</span>
                  <p className="flex-1 text-[12px] font-bold ar-body" style={{ color: D }}>{u.task}</p>
                  <span className="px-2 py-1 rounded-full text-[9px] font-bold flex-shrink-0" style={{ background: `${B}12`, color: B }}>{u.impact}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Premium */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="px-4 py-1.5 rounded-full text-[11px] font-bold" style={{ background: A, color: "#fff" }}>Premium • أسبوع 4</span>
              <h3 className="ar-heading text-lg" style={{ color: D }}>Checkout تجربة احترافية</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 jj-stagger">
              {uxPremium.map((u, i) => (
                <div key={i} className="jj-item rounded-[14px] p-4 flex items-center gap-4" style={{ background: "#fff", border: `1px solid ${A}25` }}>
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold flex-shrink-0" style={{ background: `${A}15`, color: A }}>{i + 1}</span>
                  <p className="flex-1 text-[12px] font-bold ar-body" style={{ color: D }}>{u.task}</p>
                  <span className="px-2 py-1 rounded-full text-[9px] font-bold flex-shrink-0" style={{ background: `${A}12`, color: A }}>{u.impact}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SHOPIFY DEV ═══ */}
      <section className="jj-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>القسم الثامن</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5" style={{ color: "#fff" }}>Shopify <span style={{ color: G }}>Technical Dev</span></h2>
            <p className="text-sm max-w-lg mx-auto ar-body" style={{ color: "rgba(255,255,255,0.6)" }}>كل التعديلات التقنية على الـ Theme والـ Metafields والـ URLs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 jj-stagger">
            {shopifyDev.map((s, i) => (
              <div key={i} className="jj-item rounded-[20px] p-7" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${G}12` }}>
                  <s.icon size={22} color={G} />
                </div>
                <h3 className="ar-heading text-lg mb-3" style={{ color: D }}>{s.title}</h3>
                <p className="text-[12px] leading-relaxed ar-body" style={{ color: "rgba(0,0,0,0.55)" }}>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Liquid snippet example */}
          <div className="rounded-[20px] p-6" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-[11px] font-bold mb-3 ar-body" style={{ color: G }}>مثال: إضافة Badge "الأكثر مبيعًا" (Liquid + Metafields)</p>
            <pre className="text-[11px] leading-[1.7] overflow-x-auto no-tail" style={{ color: "#E5E7EB", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", margin: 0, direction: "ltr" }}>{`{% if product.metafields.custom.best_seller %}
  <span class="badge-hot" style="background: #4FFFB0; color: #0A0A0A;">
    الأكثر مبيعًا
  </span>
{% endif %}

{% if product.metafields.custom.fit_type %}
  <span class="badge-fit">
    Fit: {{ product.metafields.custom.fit_type }}
  </span>
{% endif %}`}</pre>
          </div>
        </div>
      </section>

      {/* ═══ GOOGLE TOOLS ═══ */}
      <section className="jj-slide opacity-0" style={{ padding: "100px 24px", background: "#FAFAFA" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>القسم التاسع</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5">أدوات جوجل <span style={{ color: G }}>والتحليل</span></h2>
            <p className="text-sm max-w-lg mx-auto ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>كلها غير مربوطة حاليًا — بدونها إنت أعمى عن أداء متجرك</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 jj-stagger">
            {googleTools.map((t, i) => (
              <div key={i} className="jj-item rounded-[20px] p-6" style={{ background: "#fff", border: `1px solid ${t.color}25` }}>
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${t.color}15` }}>
                    <t.icon size={20} color={t.color} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-[14px] font-bold ar-body" style={{ color: D }}>{t.name}</h3>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{
                        background: t.level === "حرج" ? `${R}15` : t.level === "مهم" ? `${A}15` : `${B}15`,
                        color: t.level === "حرج" ? R : t.level === "مهم" ? A : B,
                      }}>{t.level}</span>
                    </div>
                    <p className="text-[10px] font-bold" style={{ color: t.color, fontFamily: "system-ui" }}>{t.short}</p>
                  </div>
                </div>
                <p className="text-[12px] leading-relaxed ar-body mb-3" style={{ color: "rgba(0,0,0,0.6)" }}>{t.purpose}</p>
                <div className="rounded-[10px] p-3" style={{ background: `${t.color}08`, border: `1px dashed ${t.color}40` }}>
                  <p className="text-[11px] leading-relaxed ar-body" style={{ color: D }}>
                    <strong style={{ color: t.color }}>أهميتها: </strong>{t.importance}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Special highlight: GBP x6 */}
          <div className="mt-8 rounded-[20px] p-6" style={{ background: G, border: `2px solid ${D}`, boxShadow: `4px 4px 0px 0px ${D}` }}>
            <div className="flex items-start gap-4">
              <MapPin size={32} color={D} className="flex-shrink-0" />
              <div>
                <h3 className="ar-heading text-lg mb-2" style={{ color: D }}>فرصة مفقودة ضخمة: 7 Google Business Profiles</h3>
                <p className="text-[13px] ar-body leading-relaxed" style={{ color: D }}>
                  إنت عندك 7 فروع فعلية موزعة على المولات الكبرى في الرياض وجدة. كل فرع مفروض يكون عنده Google Business Profile منفصل — ده يعني 7 entries في Google Maps، كل واحد بياخد traffic يومي من ناس بتبحث "ملابس رجالية قريب مني" أو "Jack Jones نخيل مول". ده Local SEO خالص مجاني ومستحيل تستخدمه المنافسين بنفس القوة.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ APPS STACK ═══ */}
      <section className="jj-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>القسم العاشر</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5">Shopify <span style={{ color: G }}>Apps Stack</span></h2>
            <p className="text-sm max-w-lg mx-auto ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>التطبيقات المطلوبة مرتبة بالأولوية</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 jj-stagger">
            {apps.map((app, i) => (
              <div key={i} className="jj-item rounded-[18px] p-5 flex items-start gap-4" style={{ background: "#fff", border: `1px solid ${app.color}25` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${app.color}15` }}>
                  <Wrench size={18} color={app.color} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="text-[13px] font-bold" style={{ color: D, fontFamily: "system-ui" }}>{app.name}</h4>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold ar-body" style={{ background: `${app.color}15`, color: app.color }}>{app.priority}</span>
                  </div>
                  <p className="text-[11px] ar-body mb-1" style={{ color: "rgba(0,0,0,0.55)" }}>{app.purpose}</p>
                  <p className="text-[10px] font-bold" style={{ color: app.color, fontFamily: "system-ui" }}>{app.pricing}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTENT STRATEGY ═══ */}
      <section className="jj-slide opacity-0" style={{ padding: "100px 24px", background: "#FAFAFA" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>القسم الحادي عشر</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5">استراتيجية <span style={{ color: G }}>المحتوى</span></h2>
            <p className="text-sm max-w-lg mx-auto ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>البلوج = SEO Content Machine — 4 مقالات شهريًا = traffic عضوي مستدام</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 jj-stagger">
            {contentTypes.map((c, i) => (
              <div key={i} className="jj-item rounded-[20px] p-6" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${G}15` }}>
                    <c.icon size={18} color={G} />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold ar-body" style={{ color: D }}>{c.title}</h3>
                    <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>{c.desc}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  {c.examples.map((ex, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <ArrowRight size={12} color={G} className="flex-shrink-0" />
                      <span className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.6)" }}>{ex}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[16px] p-5" style={{ background: `${A}08`, border: `1px solid ${A}30` }}>
            <p className="text-[12px] ar-body leading-relaxed" style={{ color: D }}>
              <strong style={{ color: A }}>ملاحظة:</strong> المحتوى الموسمي يكتب قبل الموسم بـ 3-4 أسابيع ليعطي جوجل وقت للـ indexing والـ ranking قبل ذروة البحث.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ KPIs ═══ */}
      <section className="jj-slide opacity-0" style={{ padding: "100px 24px", background: D }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>القسم الثاني عشر</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5" style={{ color: "#fff" }}>المؤشرات <span style={{ color: G }}>(KPIs)</span></h2>
            <p className="text-sm max-w-lg mx-auto ar-body" style={{ color: "rgba(255,255,255,0.6)" }}>ما نقيسه قبل وبعد — كل هذا من GA4 + Search Console + PSI</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 jj-stagger">
            {kpis.map((k, i) => (
              <div key={i} className="jj-item rounded-[20px] p-6" style={{ background: "#fff", border: `1px solid ${k.color}25` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${k.color}15` }}>
                  <k.icon size={18} color={k.color} />
                </div>
                <h4 className="text-[13px] font-bold ar-body mb-3" style={{ color: D }}>{k.metric}</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-bold tracking-wider mb-1 ar-body" style={{ color: "rgba(0,0,0,0.3)" }}>حاليًا</p>
                    <p className="text-[14px] font-bold" style={{ color: R, fontFamily: "system-ui" }}>{k.current}</p>
                  </div>
                  <ArrowRight size={16} color="rgba(0,0,0,0.2)" />
                  <div className="text-left">
                    <p className="text-[9px] font-bold tracking-wider mb-1 ar-body" style={{ color: "rgba(0,0,0,0.3)" }}>الهدف</p>
                    <p className="text-[14px] font-bold" style={{ color: k.color, fontFamily: "system-ui" }}>{k.target}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PHASES + PRICING ═══ */}
      <section className="jj-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>القسم الثالث عشر</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5">خطة <span style={{ color: G }}>التنفيذ</span> + العرض المالي</h2>
            <p className="text-sm max-w-lg mx-auto ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>3 مراحل مستقلة — كل مرحلة تسلم وتراجع قبل التالية</p>
          </div>

          {/* Phases */}
          {phases.map((ph) => (
            <div key={ph.num} className="mb-8">
              <div className="rounded-[24px] overflow-hidden" style={{ border: `2px solid ${ph.color}25`, boxShadow: "0 2px 20px rgba(0,0,0,0.04)" }}>
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-[240px] flex-shrink-0 p-8 flex flex-col items-center justify-center text-center" style={{ background: ph.color }}>
                    <div className="text-[9px] font-bold tracking-[3px] uppercase mb-1" style={{ color: ph.dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.4)" }}>المرحلة</div>
                    <div className="ar-heading text-5xl mb-2" style={{ color: ph.dark ? "#fff" : D }}>{ph.num}</div>
                    <div className="ar-heading text-base mb-2 text-center" style={{ color: ph.dark ? "#fff" : D }}>{ph.title}</div>
                    <p className="text-[11px] ar-body mb-3" style={{ color: ph.dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.55)" }}>{ph.sub}</p>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-2" style={{ background: ph.dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)" }}>
                      <Clock size={11} color={ph.dark ? "#fff" : D} />
                      <span className="text-[11px] font-bold" style={{ color: ph.dark ? "#fff" : D }}>5-7 أيام عمل</span>
                    </div>
                    <div className="ar-heading text-3xl" style={{ color: ph.dark ? "#fff" : D }}>{ph.price}<span className="text-base mr-1">ر.س</span></div>
                  </div>
                  <div className="flex-1 p-6 bg-white">
                    <PhaseTaskList tasks={ph.tasks} color={ph.color} phaseNum={ph.num} />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="rounded-[20px] p-8 text-center mb-6 mt-12" style={{ background: G, border: `2px solid ${D}`, boxShadow: `4px 4px 0px 0px ${D}` }}>
            <p className="text-[11px] font-bold tracking-[2px] uppercase mb-2 ar-body" style={{ color: "rgba(0,0,0,0.4)" }}>الإجمالي — 3 مراحل</p>
            <p className="ar-heading text-5xl md:text-6xl mb-1" style={{ color: D }}>3,500 <span className="text-xl">ر.س</span></p>
            <p className="text-[12px] ar-body" style={{ color: "rgba(0,0,0,0.5)" }}>21 يوم عمل — شروط الدفع: 50% مقدماً و 50% عند التسليم</p>
          </div>

          {/* Included */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 jj-stagger">
            {[
              "تحليل شامل للمتجر والمنافسين (تم)",
              "تنفيذ كل التحسينات عبر Theme / Liquid / Apps / Settings",
              "تصميم البنرات الرئيسية وصور الكاتيجوريز بأسلوب احترافي",
              "ربط كل أدوات جوجل (GSC / GA4 / GMC / GBP ×7)",
              "Microsoft Clarity + GTM مع Events كاملة",
              "تقرير مفصل بكل تعديل تم",
              "دعم فني مجاني شهرين بعد التسليم",
              "جولة مراجعة واحدة مجانية بعد كل مرحلة",
              "توصيات مستقبلية للنمو المستمر",
            ].map((item) => (
              <div key={item} className="jj-item flex items-center gap-3 p-4 rounded-[14px]" style={{ background: `${G}08`, border: `1px solid ${G}25` }}>
                <CheckCircle2 size={16} color={G} className="flex-shrink-0" />
                <span className="text-[12px] ar-body" style={{ color: D }}>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[16px] p-5" style={{ background: `${R}08`, border: `1px solid ${R}25` }}>
            <p className="text-[12px] ar-body leading-relaxed" style={{ color: D }}>
              <strong style={{ color: R }}>غير متضمن:</strong> إعلانات مدفوعة (Google Ads / Meta Ads / Snapchat) — الاشتراكات الشهرية لـ Shopify Apps المدفوعة — تكاليف Themes مدفوعة — جلسات فوتوشوت احترافي لموديل (الصور الأصلية تُقدَّم من العميل أو من مصادر البراند العالمي).
            </p>
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="jj-slide opacity-0" style={{ padding: "100px 24px", background: "#FAFAFA" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>القسم الرابع عشر</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5">الجدول الزمني <span style={{ color: G }}>للتنفيذ</span></h2>
          </div>

          <div className="overflow-x-auto rounded-[20px] border" style={{ borderColor: "#EBEBEB" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
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
                      {row.p1 && <span className="inline-block px-3 py-1.5 rounded-full text-[10px] font-bold ar-body" style={{ background: `${G}15`, color: D }}>{row.p1}</span>}
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
        </div>
      </section>

      {/* ═══ METHODOLOGY ═══ */}
      <section className="jj-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="ar-heading text-lg mb-3" style={{ color: G }}>القسم الخامس عشر</p>
            <h2 className="ar-heading text-4xl md:text-5xl mb-5">منهجية <span style={{ color: G }}>العمل</span></h2>
          </div>

          <div className="flex flex-col gap-4 jj-stagger">
            {methodology.map((step, i) => (
              <div key={i} className="jj-item rounded-[20px] overflow-hidden" style={{ border: "1px solid #EBEBEB" }}>
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
        </div>
      </section>

      {/* ═══ CLOSING ═══ */}
      <section className="jj-slide opacity-0" style={{ padding: "80px 24px 60px", background: "#fff" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-[24px] p-10 md:p-14 mb-8" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
            <img src="/myphoto-profile.png" alt="Ahmed Ali" className="w-24 h-24 rounded-full object-cover mx-auto mb-6" style={{ border: `3px solid ${G}` }} />
            <h3 className="ar-heading text-3xl mb-2" style={{ color: D }}>شكراً لثقتكم</h3>
            <p className="ar-heading text-lg mb-6" style={{ color: G }}>أتطلع للعمل معكم ونقل متجر Jack & Jones الرياض للمستوى اللي يستحقه</p>

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

          <p className="text-[11px] ar-body" style={{ color: "rgba(0,0,0,0.15)" }}>&copy; {new Date().getFullYear()} Ahmed Ali. هذا العرض سري وخاص لمتجر Jack & Jones الرياض.</p>
        </div>
      </section>
    </div>
    </ArabicTailProcessor>
  );
}

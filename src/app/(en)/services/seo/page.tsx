"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Search, TrendingUp, Globe, FileText, MapPin, BarChart3,
  CheckCircle2, ArrowRight, ExternalLink, Zap, Shield, Eye,
  Target, Users, Clock, Award, Layers, Link2, Code2,
  MessageCircle, ChevronDown, ChevronUp,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════ COLORS ═══════════ */
const G = "#4FFFB0";
const D = "#0A0A0A";
const P = "#5227FF";
const B = "#3B82F6";
const A = "#F59E0B";
const R = "#EF4444";

/* ═══════════ FAQ COMPONENT ═══════════ */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-[16px] overflow-hidden transition-all duration-300" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-6 cursor-pointer text-left" style={{ background: "transparent", border: "none" }}>
        <span className="heading text-[15px] flex-1 pr-4">{q}</span>
        {open ? <ChevronUp size={18} color="rgba(0,0,0,0.3)" /> : <ChevronDown size={18} color="rgba(0,0,0,0.3)" />}
      </button>
      {open && (
        <div className="px-6 pb-6 -mt-2">
          <p className="text-[13px] leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>{a}</p>
        </div>
      )}
    </div>
  );
}

/* ═══════════ MAIN ═══════════ */
export default function SEOServicePage() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".sv-hero", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: "power4.out", delay: 0.3 });

      gsap.utils.toArray<HTMLElement>(".sv-slide").forEach((el) => {
        gsap.fromTo(el, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      });

      gsap.utils.toArray<HTMLElement>(".sv-stagger").forEach((el) => {
        gsap.fromTo(el.querySelectorAll(".sv-item"), { y: 40, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 82%", once: true } });
      });

      gsap.utils.toArray<HTMLElement>(".sv-num").forEach((el) => {
        const val = parseInt(el.dataset.val || "0");
        ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => gsap.to({ v: 0 }, { v: val, duration: 2.5, ease: "power2.out", onUpdate() { el.textContent = Math.round(this.targets()[0].v).toLocaleString(); } }) });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const process = [
    { icon: Search, title: "Technical Audit", desc: "Deep crawl of your entire site — indexing issues, broken links, speed bottlenecks, Core Web Vitals, mobile usability, and schema errors." },
    { icon: Target, title: "Keyword Strategy", desc: "Research high-intent keywords your audience actually searches for. Map each keyword to a page with clear search intent alignment." },
    { icon: Code2, title: "On-Page Optimization", desc: "Title tags, meta descriptions, heading structure, internal linking, image optimization, and content gap analysis for every page." },
    { icon: Link2, title: "Off-Page & Authority", desc: "Strategic link building, digital PR, local citations, and brand mentions that build domain authority in your industry." },
  ];

  const results = [
    { metric: "Top 10", label: "Google rankings achieved within 8 months for competitive keywords" },
    { metric: "3.2x", label: "Average increase in organic traffic for clients across Gulf markets" },
    { metric: "40%", label: "Reduction in cost-per-lead by shifting budget from paid to organic" },
    { metric: "15+", label: "SEO projects delivered across Saudi Arabia, UAE, Qatar, and Egypt" },
  ];

  const services = [
    { icon: Code2, title: "Technical SEO", desc: "Site architecture, crawlability, Core Web Vitals, schema markup, XML sitemaps, robots.txt, and indexation management.", color: G },
    { icon: FileText, title: "Content SEO", desc: "Keyword-driven content strategy, topic clusters, content calendars, and copywriting that ranks and converts.", color: P },
    { icon: MapPin, title: "Local SEO", desc: "Google Business Profile optimization, local citations, review management, and geo-targeted content for Saudi, UAE, and Qatar.", color: B },
    { icon: Globe, title: "International SEO", desc: "Multilingual SEO (Arabic & English), hreflang implementation, regional keyword research, and country-specific ranking strategies.", color: A },
    { icon: TrendingUp, title: "E-commerce SEO", desc: "Product page optimization, category structure, faceted navigation, rich snippets, and conversion-focused content for online stores.", color: R },
    { icon: BarChart3, title: "SEO Analytics & Reporting", desc: "Custom dashboards in Looker Studio, rank tracking, traffic analysis, and monthly performance reports with actionable insights.", color: G },
  ];

  const tools = [
    { name: "Google Search Console", icon: "googlesearchconsole" },
    { name: "Google Analytics", icon: "googleanalytics" },
    { name: "Ahrefs", icon: "ahrefs" },
    { name: "Semrush", icon: "semrush" },
    { name: "Screaming Frog", icon: "screamingfrog" },
    { name: "Looker Studio", icon: "looker" },
    { name: "Google Tag Manager", icon: "googletagmanager" },
    { name: "PageSpeed Insights", icon: "pagespeedinsights" },
  ];

  const faqs = [
    { q: "How long does it take to see SEO results in the Gulf market?", a: "Typically 3-6 months for meaningful rankings improvement. Competitive keywords in Saudi Arabia and UAE markets may take 6-8 months. I provide monthly reports so you can track progress from day one." },
    { q: "Do you handle both Arabic and English SEO?", a: "Yes. I build bilingual SEO strategies with proper hreflang implementation, Arabic keyword research, and culturally relevant content for both audiences. This is critical for Gulf markets where users search in both languages." },
    { q: "What's the difference between SEO and paid ads?", a: "Paid ads give instant traffic but stop when you stop paying. SEO builds a permanent organic traffic engine — your site keeps ranking and generating leads 24/7 without ongoing ad spend. Most of my clients see 3-5x ROI from SEO within the first year." },
    { q: "Can you work with my existing website on Shopify/WordPress/Salla?", a: "Absolutely. I work with all major platforms including Shopify, WordPress, Salla, Zid, custom Next.js sites, and more. The SEO principles are the same — the implementation adapts to your platform." },
    { q: "How do you measure SEO success?", a: "I track keyword rankings, organic traffic growth, click-through rates, conversion rates from organic visitors, and revenue attributed to SEO. You get a live dashboard and monthly detailed reports." },
    { q: "Do you offer SEO for businesses outside the Gulf?", a: "While my primary focus is the Gulf and MENA region (Saudi Arabia, UAE, Qatar, Egypt), I've worked with international clients across Europe and North America. The fundamentals are universal — the local knowledge is what sets me apart in this region." },
  ];

  return (
    <div ref={ref} style={{ background: "#fff", color: D }}>

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden" style={{ background: "#fff", paddingTop: 140, paddingBottom: 100 }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none" style={{ background: `radial-gradient(ellipse, ${G}12 0%, transparent 70%)` }} />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left content */}
            <div className="flex-1">
              <div className="sv-hero opacity-0 mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold tracking-[2px] uppercase" style={{ background: `${G}12`, color: D, border: `1px solid ${G}30` }}>
                  <Search size={14} color={G} />
                  SEO & Organic Growth
                </span>
              </div>

              <h1 className="sv-hero opacity-0 heading text-4xl sm:text-5xl md:text-6xl mb-6" style={{ lineHeight: 1.1 }}>
                Dominate Google in<br />
                <span style={{ color: G }}>Saudi Arabia</span>, <span style={{ color: G }}>UAE</span><br />
                & the Gulf Market
              </h1>

              <p className="sv-hero opacity-0 text-base md:text-lg leading-relaxed mb-8 max-w-xl" style={{ color: "rgba(0,0,0,0.55)" }}>
                I help businesses across the Gulf rank higher, get found by the right audience, and turn organic traffic into paying customers — in both Arabic and English.
              </p>

              <div className="sv-hero opacity-0 flex flex-wrap gap-3">
                <a href="https://wa.me/201011648156?text=Hi%20Ahmed%2C%20I%20need%20SEO%20help" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-bold" style={{ background: G, color: D, border: `2px solid ${D}`, boxShadow: `4px 4px 0px 0px ${D}`, textDecoration: "none" }}>
                  Get a Free SEO Audit <ArrowRight size={16} />
                </a>
                <a href="#process" className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-bold" style={{ background: "#fff", color: D, border: `2px solid ${D}`, boxShadow: `4px 4px 0px 0px ${D}`, textDecoration: "none" }}>
                  See My Process
                </a>
              </div>
            </div>

            {/* Right — stats */}
            <div className="sv-hero opacity-0 w-full lg:w-[340px] flex-shrink-0">
              <div className="rounded-[24px] p-8" style={{ background: D }}>
                <p className="text-[10px] font-bold tracking-[3px] uppercase mb-6" style={{ color: G }}>Proven Results</p>
                <div className="flex flex-col gap-6">
                  {results.map((r) => (
                    <div key={r.metric}>
                      <span className="heading text-3xl" style={{ color: "#fff" }}>{r.metric}</span>
                      <p className="text-[11px] mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{r.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PAIN POINTS ═══ */}
      <section className="sv-slide opacity-0" style={{ padding: "80px 24px", background: "#FAFAFA" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="script text-xl mb-3" style={{ color: R }}>The Problem</p>
            <h2 className="heading text-3xl md:text-4xl mb-4">Why Most Businesses in the Gulf<br />Struggle with SEO</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sv-stagger">
            {[
              { icon: Globe, title: "No Arabic SEO Strategy", desc: "Most agencies optimize only in English, ignoring the 60%+ of Gulf users who search in Arabic. You're invisible to your biggest audience.", color: R },
              { icon: Eye, title: "Invisible to Local Search", desc: "Without proper local SEO, your business doesn't show up when people in Riyadh, Dubai, or Doha search for your services on Google Maps.", color: A },
              { icon: TrendingUp, title: "Burning Cash on Ads Only", desc: "Spending $5-15K/month on ads without an organic strategy means the moment you stop paying, your leads disappear. Zero long-term asset.", color: P },
            ].map((item) => (
              <div key={item.title} className="sv-item rounded-[20px] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${item.color}10` }}>
                  <item.icon size={22} color={item.color} />
                </div>
                <h3 className="heading text-lg mb-3">{item.title}</h3>
                <p className="text-[12px] leading-relaxed" style={{ color: "rgba(0,0,0,0.5)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES OFFERED ═══ */}
      <section className="sv-slide opacity-0" style={{ padding: "80px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="script text-xl mb-3" style={{ color: G }}>What I Deliver</p>
            <h2 className="heading text-3xl md:text-4xl mb-4">Full-Spectrum SEO Services<br />for the Gulf & MENA</h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(0,0,0,0.5)" }}>Every SEO engagement is tailored to your market, language, and business goals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sv-stagger">
            {services.map((s, i) => (
              <div key={s.title} className="sv-item rounded-[20px] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ background: i === 0 ? G : "#fff", border: i === 0 ? `2px solid ${D}` : "1px solid #EBEBEB", boxShadow: i === 0 ? `4px 4px 0px 0px ${D}` : "none" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: i === 0 ? "rgba(0,0,0,0.08)" : `${s.color}10` }}>
                  <s.icon size={20} color={i === 0 ? D : s.color} />
                </div>
                <h3 className="heading text-[16px] mb-2">{s.title}</h3>
                <p className="text-[12px] leading-relaxed" style={{ color: i === 0 ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.45)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section id="process" className="sv-slide opacity-0" style={{ padding: "80px 24px", background: D }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="script text-xl mb-3" style={{ color: G }}>How I Work</p>
            <h2 className="heading text-3xl md:text-4xl mb-4" style={{ color: "#fff" }}>A Proven 4-Step SEO Process</h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>No guesswork. Every action is data-driven and tied to measurable business outcomes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sv-stagger">
            {process.map((step, i) => (
              <div key={step.title} className="sv-item rounded-[20px] p-7 relative" style={{ background: "#fff" }}>
                <div className="absolute top-4 right-5">
                  <span className="heading text-[48px]" style={{ color: `${G}15` }}>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-16" style={{ background: `${G}10` }}>
                  <step.icon size={22} color={G} />
                </div>
                <h3 className="heading text-lg mb-2">{step.title}</h3>
                <p className="text-[12px] leading-relaxed" style={{ color: "rgba(0,0,0,0.5)" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RESULTS / NUMBERS ═══ */}
      <section className="sv-slide opacity-0" style={{ padding: "80px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="script text-xl mb-3" style={{ color: G }}>Track Record</p>
            <h2 className="heading text-3xl md:text-4xl mb-4">Real Results for Gulf Businesses</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 sv-stagger">
            {[
              { n: 15, s: "+", l: "SEO Projects", sub: "across MENA" },
              { n: 8, s: "mo", l: "Avg. Time to Top 10", sub: "for competitive keywords" },
              { n: 320, s: "%", l: "Avg. Traffic Growth", sub: "within first year" },
              { n: 4, s: "", l: "Gulf Countries", sub: "SA, UAE, QA, EG" },
            ].map((s) => (
              <div key={s.l} className="sv-item text-center p-6 rounded-[20px]" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
                <div className="heading text-4xl" style={{ color: G }}>
                  <span className="sv-num" data-val={s.n}>0</span>{s.s}
                </div>
                <div className="text-[13px] font-bold mt-1">{s.l}</div>
                <div className="text-[10px] mt-0.5" style={{ color: "rgba(0,0,0,0.35)" }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Industries */}
          <div className="rounded-[20px] p-8" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
            <h3 className="heading text-lg text-center mb-6">Industries I&apos;ve Ranked in Gulf Markets</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {["E-commerce", "Real Estate", "Healthcare", "FinTech", "F&B", "Education", "SaaS", "Professional Services", "Automotive", "Tourism & Travel"].map((ind) => (
                <span key={ind} className="px-4 py-2 rounded-full text-[11px] font-bold" style={{ background: "#fff", color: D, border: "1px solid #EBEBEB" }}>{ind}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TOOLS ═══ */}
      <section className="sv-slide opacity-0" style={{ padding: "60px 24px", background: "#FAFAFA" }}>
        <div className="max-w-4xl mx-auto">
          <h3 className="heading text-xl text-center mb-8">Tools & Platforms I Use</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sv-stagger">
            {tools.map((t) => (
              <div key={t.name} className="sv-item flex items-center gap-3 p-4 rounded-[14px] transition-all duration-200 hover:-translate-y-0.5" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                <img src={`https://cdn.simpleicons.org/${t.icon}`} alt={t.name} width={24} height={24} style={{ width: 24, height: 24 }} />
                <span className="text-[12px] font-bold">{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MARKETS ═══ */}
      <section className="sv-slide opacity-0" style={{ padding: "80px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="script text-xl mb-3" style={{ color: G }}>Markets I Serve</p>
            <h2 className="heading text-3xl md:text-4xl mb-4">SEO Expertise Across the Gulf</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sv-stagger">
            {[
              { country: "Saudi Arabia", flag: "🇸🇦", cities: "Riyadh, Jeddah, Dammam", keywords: "تحسين محركات البحث السعودية", desc: "The largest Gulf e-commerce market. Arabic-first SEO with local search optimization for Saudi audiences." },
              { country: "UAE", flag: "🇦🇪", cities: "Dubai, Abu Dhabi, Sharjah", keywords: "SEO Dubai, SEO Abu Dhabi", desc: "Bilingual market requiring English & Arabic SEO. High competition in real estate, tourism, and fintech." },
              { country: "Qatar", flag: "🇶🇦", cities: "Doha", keywords: "SEO Qatar, SEO Doha", desc: "Fast-growing digital market. Strong demand for local SEO and professional services optimization." },
              { country: "Egypt", flag: "🇪🇬", cities: "Cairo, Alexandria", keywords: "خبير سيو مصر", desc: "Home base with deep market knowledge. Largest Arabic-speaking digital audience in the MENA region." },
            ].map((m) => (
              <div key={m.country} className="sv-item rounded-[20px] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
                <div className="text-3xl mb-3">{m.flag}</div>
                <h3 className="heading text-lg mb-1">{m.country}</h3>
                <p className="text-[10px] font-bold mb-3" style={{ color: G }}>{m.cities}</p>
                <p className="text-[12px] leading-relaxed mb-3" style={{ color: "rgba(0,0,0,0.5)" }}>{m.desc}</p>
                <span className="text-[10px] px-3 py-1 rounded-full" style={{ background: `${G}10`, color: D }}>{m.keywords}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="sv-slide opacity-0" style={{ padding: "80px 24px", background: "#FAFAFA" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="script text-xl mb-3" style={{ color: G }}>FAQ</p>
            <h2 className="heading text-3xl md:text-4xl mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="sv-slide opacity-0" style={{ padding: "80px 24px", background: D }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="script text-xl mb-4" style={{ color: G }}>Ready to rank?</p>
          <h2 className="heading text-4xl md:text-5xl mb-6" style={{ color: "#fff" }}>
            Let&apos;s Get Your Business<br />to Page One<span style={{ color: G }}>.</span>
          </h2>
          <p className="text-sm mb-10 max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
            Book a free 30-minute SEO audit call. I&apos;ll analyze your current rankings, identify quick wins, and show you exactly what&apos;s holding you back.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/201011648156?text=Hi%20Ahmed%2C%20I%20want%20a%20free%20SEO%20audit" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold" style={{ background: G, color: D, border: `2px solid ${G}`, textDecoration: "none" }}>
              <MessageCircle size={16} /> WhatsApp Me
            </a>
            <a href="mailto:hello@ahmedali.online?subject=SEO%20Audit%20Request" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold" style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.2)", textDecoration: "none" }}>
              Send Email <ArrowRight size={16} />
            </a>
          </div>

          <p className="text-[11px] mt-10" style={{ color: "rgba(255,255,255,0.2)" }}>Ahmed Ali · Full-Stack Digital Strategist · ahmedali.online</p>
        </div>
      </section>
    </div>
  );
}

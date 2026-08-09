"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Eye, Target, Heart, Crown, Users, Star, Car, MessageCircle,
  TrendingUp, Tag, Wrench, Megaphone, Camera, Send,
  Smile, Sparkles, Flame, BookOpen,
  Repeat, Film, Layers, Clapperboard, Image as ImageIcon,
  AlertTriangle, MessageSquare,
  Search, BarChart3, FileText, CheckCircle2, Calendar, Clock, Hash, Trash2,
  type LucideIcon,
} from "lucide-react";
import { FaWhatsapp, FaTiktok, FaInstagram, FaSnapchat, FaYoutube, FaLinkedin } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

/* ── Color System ── */
const G  = "#f58021"; // Soueast orange — primary
const D  = "#0A0A0A"; // near-black
const LG = "#fff";

/* ── Platform brand colors ── */
const TIKTOK_C   = "#000000";
const INSTA_C    = "#E1306C";
const SNAP_C     = "#fff900";
const YT_C       = "#FF0000";
const LINKEDIN_C = "#0A66C2";

const AR: React.CSSProperties = {
  fontFamily: "'Ahmed Sans', 'Thmanyah Sans', sans-serif",
  direction: "rtl",
};

/* ── Platform badge — real logos for IG / Snap / TikTok, FA icons elsewhere ── */
const PLATFORM_LOGO: Record<string, string> = {
  tiktok:    "/platforms/tiktok-official.png",
  instagram: "/platforms/instagram-official.png",
  snapchat:  "/platforms/snapchat-official.png",
};
function PIcon({ p, size = 14 }: { p: "tiktok"|"instagram"|"snapchat"|"youtube"|"linkedin"|"whatsapp"; size?: number }) {
  const box = size + 10;
  if (PLATFORM_LOGO[p]) {
    return (
      <img src={PLATFORM_LOGO[p]} alt={p}
        style={{ width: box, height: box, objectFit: "contain", flexShrink: 0, display: "inline-block", verticalAlign: "middle" }} />
    );
  }
  const fa = {
    youtube:  { icon: <FaYoutube  size={size} color="#fff" />, bg: YT_C },
    linkedin: { icon: <FaLinkedin size={size} color="#fff" />, bg: LINKEDIN_C },
    whatsapp: { icon: <FaWhatsapp size={size} color="#fff" />, bg: "#25D366" },
  }[p as "youtube"|"linkedin"|"whatsapp"];
  return (
    <span style={{ display:"inline-flex", alignItems:"center", justifyContent:"center",
      width: box, height: box, borderRadius: 6, background: fa.bg, flexShrink: 0 }}>
      {fa.icon}
    </span>
  );
}

export default function SoueastStrategy() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".sm-hero", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: "power4.out", delay: 0.3 });
      gsap.utils.toArray<HTMLElement>(".sm-slide").forEach((el) => {
        gsap.fromTo(el, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".sm-stagger").forEach((el) => {
        gsap.fromTo(el.querySelectorAll(".sm-item"), { y: 40, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 82%", once: true } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  /* ═══ DATA ═══ */

  const objectives: { n: string; title: string; text: string; icon: LucideIcon }[] = [
    { n: "01", title: "Brand Awareness",          text: "Raise & sustain Soueast brand awareness across the Kingdom.", icon: Eye },
    { n: "02", title: "Consideration & Conversion", text: "Drive strong consideration and conversion with the Saudi audience.", icon: Target },
    { n: "03", title: "Lifestyle Positioning",    text: "Associate Soueast with elevated lifestyle, modern living, youth & stylish affordability.", icon: Heart },
    { n: "04", title: "Luxury Driving",           text: "Associate Soueast with the luxury driving experience.", icon: Crown },
  ];

  const tone = [
    { word: "Friendly",     icon: Smile },
    { word: "Casual",       icon: Heart },
    { word: "Trendy",       icon: Sparkles },
    { word: "Knowledgeable",icon: BookOpen },
    { word: "Confident",    icon: Flame },
  ];

  const pillars: { n: string; name: string; desc: string; icon: LucideIcon; img?: string }[] = [
    { n: "01", name: "Team",                 desc: "Sales, mechanics, delivery, engineering — the people behind the brand.", icon: Users, img: "/photos/team.jpg" },
    { n: "02", name: "Celebrations",         desc: "Local & global occasions — National Day, Founding Day, Soueast milestones.", icon: Star, img: "/photos/celebrations.jpg" },
    { n: "03", name: "Our Cars",             desc: "Trims, models and what sets each Soueast apart.", icon: Car, img: "/photos/ourcars.jpg" },
    { n: "04", name: "Testimonials / Collabs / UGC", desc: "Real owners, delivery moments, brand collaborations and user-generated content (UGC).", icon: MessageCircle, img: "/photos/testimonials.jpg" },
    { n: "05", name: "Driving Trends",       desc: "Driving-related trends, road culture and seasonal topics.", icon: TrendingUp, img: "/photos/driving.jpg" },
    { n: "06", name: "Inventory Spotlight",  desc: "Units, colors and trims available in the showroom now.", icon: Tag, img: "/photos/inventory.jpg" },
    { n: "07", name: "Maintenance & Parts",  desc: "Service tips, genuine parts and care guides.", icon: Wrench, img: "/photos/maintenance.jpg" },
    { n: "08", name: "Offers & Activations", desc: "Special offers, test drives, activations and announcements.", icon: Megaphone, img: "/photos/offers.jpg" },
    { n: "09", name: "Behind the Scenes",    desc: "Quality inspection and detail-oriented info.", icon: Camera, img: "/photos/bts1.jpg" },
    { n: "10", name: "Lifestyle",            desc: "The car in real life — modern, youthful, aspirational.", icon: Heart, img: "/photos/lifestyle.jpg" },
  ];

  const platforms: { key: "linkedin"|"instagram"|"tiktok"|"youtube"|"snapchat"; name: string; role: string; brand: string }[] = [
    { key: "instagram", name: "Instagram", role: "Core feed — reels, stories, static & carousel",      brand: INSTA_C    },
    { key: "tiktok",    name: "TikTok",    role: "Short-form reels — reach & discovery",                brand: TIKTOK_C   },
    { key: "youtube",   name: "YouTube",   role: "Long & short video content",                          brand: YT_C       },
    { key: "snapchat",  name: "Snapchat",  role: "IG & TikTok reposts — local reach",                   brand: SNAP_C     },
    { key: "linkedin",  name: "LinkedIn",  role: "Collabs, corporate announcements & celebrations",     brand: LINKEDIN_C },
  ];

  const frequency: { key: "instagram"|"tiktok"|"linkedin"|"snapchat"|"youtube"; name: string; freq: string; note: string }[] = [
    { key: "instagram", name: "Instagram", freq: "8–12 / month",        note: "Reels, stories, static, carousel" },
    { key: "tiktok",    name: "TikTok",    freq: "12–20 / month",       note: "Same as IG + extra TikTok-only posts" },
    { key: "youtube",   name: "YouTube",   freq: "2 long + 2–4 shorts", note: "Long = influencer videos; shorts = cutouts or new" },
    { key: "snapchat",  name: "Snapchat",  freq: "2–3 / week",          note: "TikTok and/or IG reposts (video)" },
    { key: "linkedin",  name: "LinkedIn",  freq: "2–4 / month",         note: "IG reposts — corporate tone" },
  ];

  const contentNature: { key: "instagram"|"tiktok"|"snapchat"|"linkedin"|"youtube"; name: string; formats: string[] }[] = [
    { key: "instagram", name: "Instagram", formats: ["Reels", "Stories", "Static", "Carousel"] },
    { key: "tiktok",    name: "TikTok",    formats: ["Reels"] },
    { key: "snapchat",  name: "Snapchat",  formats: ["IG & TikTok reposts (video only)"] },
    { key: "linkedin",  name: "LinkedIn",  formats: ["Reel", "Static"] },
    { key: "youtube",   name: "YouTube",   formats: ["Long videos", "Short videos"] },
  ];

  /* ═══ RENDER ═══ */
  return (
    <div ref={ref} style={{ background: "#fff", color: D }}>
      <SectionNav />

      {/* ══════════ HERO ══════════ */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: "#fff" }}>
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center">
          <div className="sm-hero opacity-0 mb-8" style={{ paddingTop: 40 }}>
            <img src="/motionmotors/soueast.png" alt="Soueast" className="h-16 md:h-20 mx-auto object-contain" />
          </div>
          <div className="sm-hero opacity-0 text-center mb-3">
            <p className="text-[13px] font-bold" style={{ color: D, opacity: 0.3 }}>2026</p>
          </div>
          <div className="sm-hero opacity-0 text-center mb-4">
            <h1 className="heading" style={{ fontSize: "clamp(38px, 9vw, 88px)", lineHeight: 1.05, color: D }}>
              Social Media<br /><span style={{ color: G }}>Strategy</span>
            </h1>
          </div>
          <div className="sm-hero opacity-0 text-center mb-8">
            <p className="text-lg" style={{ color: D, opacity: 0.45 }}>Kingdom of Saudi Arabia · Brand &amp; Growth</p>
            <p className="text-xl font-bold mt-1 heading" style={{ color: G }}>Motion Motors × Soueast</p>
          </div>

          {/* Stat strip */}
          <div className="sm-hero opacity-0 mb-8 w-full max-w-2xl">
            <div className="flex items-stretch justify-center" style={{ background: "#fff", border: "1px solid #E8E8E8", borderRadius: 16, overflow: "hidden" }}>
              {[
                { n: "5",     l: "Platforms" },
                { n: "10",    l: "Content Pillars" },
                { n: "20–25", l: "Posts / Month" },
                { n: "4",     l: "Objectives" },
              ].map((s, i) => (
                <div key={s.l} className="flex-1 flex flex-col items-center justify-center py-5 px-2 relative" style={{ borderRight: i < 3 ? "1px solid #F0F0F0" : "none" }}>
                  <span className="heading" style={{ fontSize: 22, lineHeight: 1, color: D }}>{s.n}</span>
                  <span className="text-[10px] font-bold mt-1 text-center" style={{ color: D, opacity: 0.3 }}>{s.l}</span>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-t-full" style={{ background: G }} />
                </div>
              ))}
            </div>
          </div>

          {/* Prepared by */}
          <div className="sm-hero opacity-0 grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 w-full max-w-3xl">
            <div className="rounded-[16px] p-5" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
              <p className="text-[10px] font-bold mb-2" style={{ color: G }}>Prepared By</p>
              <p className="text-[14px] font-bold" style={{ color: D }}>Ahmed Ali</p>
              <p className="text-[11px]" style={{ color: D, opacity: 0.4 }}>Head of Digital Product &amp; Growth</p>
              <p className="text-[11px]" style={{ color: D, opacity: 0.3 }}>ahmed.ali@emotiongrp.com</p>
            </div>
            <div className="rounded-[16px] p-5" style={{ background: "#fff", border: "1px solid #EBEBEB" }}>
              <p className="text-[10px] font-bold mb-2" style={{ color: G }}>Prepared By</p>
              <p className="text-[14px] font-bold" style={{ color: D }}>Josef Haddad</p>
              <p className="text-[11px]" style={{ color: D, opacity: 0.4 }}>Creative Director — Emotion</p>
              <p className="text-[11px]" style={{ color: D, opacity: 0.3 }}>josef.haddad@emotiongrp.com</p>
            </div>
            <div className="rounded-[16px] p-5" style={{ background: "#fff", border: `2px solid ${G}` }}>
              <p className="text-[10px] font-bold mb-2" style={{ color: G }}>Presented To</p>
              <p className="text-[14px] font-bold" style={{ color: D }}>Mr. Edgard Tabet</p>
              <p className="text-[11px]" style={{ color: D, opacity: 0.5 }}>Group Managing Director</p>
              <p className="text-[11px]" style={{ color: D, opacity: 0.4 }}>Emotion Group</p>
            </div>
          </div>

          <div className="sm-hero opacity-0 flex flex-col items-center">
            <div style={{ width: 24, height: 38, border: "1.5px solid rgba(0,0,0,0.14)", borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 5 }}>
              <div style={{ width: 3, height: 6, borderRadius: 2, background: G, animation: "scrollSS 1.6s ease-in-out infinite" }} />
            </div>
          </div>
        </div>
        <style>{`@keyframes scrollSS{0%{transform:translateY(0);opacity:1}75%{transform:translateY(9px);opacity:0}76%{transform:translateY(0);opacity:0}100%{opacity:1}}`}</style>
      </section>

      {/* ══════════ THE LINEUP (visual band) ══════════ */}
      <section className="sm-slide opacity-0" style={{ padding: "80px 24px", background: "#fff", borderTop: "1px solid #F0F0F0", borderBottom: "1px solid #F0F0F0" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="heading text-lg mb-2" style={{ color: G }}>The Lineup</p>
            <h2 className="heading text-3xl md:text-4xl" style={{ color: D }}>Soueast <span style={{ color: G }}>Models</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm-stagger">
            {[
              { name: "Soueast S06",    cat: "Comfort", img: "/cars/s06.png" },
              { name: "Soueast S07",    cat: "Comfort", img: "/cars/s07.png" },
              { name: "Soueast S09",    cat: "Luxury",  img: "/cars/s09.png" },
              { name: "Soueast S06 DM", cat: "DM",      img: "/cars/s06.png" },
              { name: "Soueast S08 DM", cat: "DM",      img: "/cars/s08.png" },
            ].map((c) => (
              <div key={c.name} className="sm-item rounded-[18px] overflow-hidden flex flex-col" style={{ background: "#fff", border: `1.5px solid ${G}25` }}>
                <div className="flex items-center justify-center p-4" style={{ minHeight: 120 }}>
                  <img src={c.img} alt={c.name} className="w-full h-auto object-contain" style={{ maxHeight: 110 }} />
                </div>
                <div className="px-4 py-3 flex items-center justify-between" style={{ borderTop: `1px solid ${G}20` }}>
                  <span className="heading text-lg" style={{ color: D }}>{c.name}</span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full" style={{ background: G, color: "#fff" }}>{c.cat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 01 — OBJECTIVES ══════════ */}
      <section id="s01" className="sm-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <SH n="01" title="" accent="Objectives" />
          <p className="text-center mb-12 max-w-xl mx-auto" style={{ color: D, fontSize: 15 }}>
            Four goals shape everything we post and promote.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm-stagger">
            {objectives.map((o) => (
              <div key={o.n} className="sm-item rounded-[22px] p-7 relative overflow-hidden" style={{ background: "#fff", border: `1.5px solid ${G}30` }}>
                {/* watermark number */}
                <span className="heading absolute select-none" style={{ right: 18, top: -6, fontSize: 96, lineHeight: 1, color: G, opacity: 0.08 }}>{o.n}</span>
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: G }}>
                    <o.icon size={24} color="#fff" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: G, color: "#fff" }}>{o.n}</span>
                    <h4 className="heading text-xl" style={{ color: D }}>{o.title}</h4>
                  </div>
                  <p className="text-[14px] leading-relaxed" style={{ color: D, opacity: 0.6 }}>{o.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 02 — AUDIENCE ══════════ */}
      <section id="s02" className="sm-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <SH n="02" title="Target" accent="Audience" />
          <div className="rounded-[24px] overflow-hidden mb-6 relative" style={{ border: `1.5px solid ${G}30` }}>
            <img src="/photos/audience.jpg" alt="Saudi audience" className="w-full object-cover" style={{ height: 520 }} />
            <div className="absolute bottom-0 left-0 right-0 px-6 py-5" style={{ background: G }}>
              <p className="heading text-xl md:text-2xl text-center leading-snug" style={{ color: "#fff" }}>
                Saudi residents — local &amp; expat
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm-stagger">
            {[
              { label: "Gender", value: "Male & Female", icon: Users },
              { label: "Age", value: "20 – 55", icon: Target },
              { label: "Status", value: "Single & Married", icon: Heart },
            ].map((a) => (
              <div key={a.label} className="sm-item rounded-[18px] p-6 text-center" style={{ background: "#fff", border: `1.5px solid ${G}30` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: G }}>
                  <a.icon size={20} color="#fff" />
                </div>
                <p className="text-[11px] font-bold mb-1" style={{ color: G }}>{a.label}</p>
                <p className="heading text-lg" style={{ color: D }}>{a.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 03 — TONE OF VOICE ══════════ */}
      <section id="s03" className="sm-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-4xl mx-auto">
          <SH n="03" title="Tone of" accent="Voice" />
          <div className="flex flex-wrap justify-center gap-4 sm-stagger">
            {tone.map((t) => (
              <div key={t.word} className="sm-item rounded-full px-6 py-4 flex items-center gap-3" style={{ background: "#fff", border: `1.5px solid ${G}40` }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: G }}>
                  <t.icon size={17} color="#fff" />
                </div>
                <span className="heading text-lg" style={{ color: D }}>{t.word}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 04 — CONTENT PILLARS ══════════ */}
      <section id="s04" className="sm-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <SH n="04" title="Content" accent="Pillars" />
          <p className="text-center mb-12 max-w-2xl mx-auto" style={{ color: D, fontSize: 15 }}>
            Ten pillars every post draws from — the content framework for the whole calendar.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm-stagger" style={{ alignItems: "stretch" }}>
            {pillars.map((p) => (
              <div key={p.n} className="sm-item rounded-[18px] overflow-hidden flex flex-col h-full" style={{ background: "#fff", border: `1.5px solid ${G}30` }}>
                {/* uniform image slot for every card */}
                {p.img ? (
                  <img src={p.img} alt={p.name} className="w-full object-cover" style={{ height: 200 }} />
                ) : (
                  <div className="w-full flex items-center justify-center" style={{ height: 200, background: G }}>
                    <p.icon size={56} color="#fff" style={{ opacity: 0.9 }} />
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: G }}>
                      <p.icon size={18} color="#fff" />
                    </div>
                    <span className="heading text-2xl" style={{ color: G }}>{p.n}</span>
                  </div>
                  <h4 className="heading text-[15px] mb-1.5 leading-tight" style={{ color: D }}>{p.name}</h4>
                  <p className="text-[12.5px] leading-snug" style={{ color: D, opacity: 0.6 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 05 — PLATFORMS ══════════ */}
      <section id="s05" className="sm-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <SH n="05" title="" accent="Platforms" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm-stagger">
            {platforms.map((p) => (
              <div key={p.key} className="sm-item rounded-[20px] overflow-hidden" style={{ border: `1.5px solid ${p.brand}30` }}>
                <div className="p-6 flex flex-col items-center text-center" style={{ background: p.brand }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3" style={{ background: "rgba(255,255,255,0.15)" }}>
                    <PIcon p={p.key} size={26} />
                  </div>
                  <p className="heading text-lg" style={{ color: p.key === "snapchat" ? "#000" : "#fff" }}>{p.name}</p>
                </div>
                <div className="p-4" style={{ background: "#fff" }}>
                  <p className="text-[12px] leading-snug" style={{ color: D }}>{p.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 06 — FREQUENCY ══════════ */}
      <section id="s06" className="sm-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <SH n="06" title="Posting" accent="Frequency" />

          <div className="rounded-[20px] overflow-hidden mb-6" style={{ border: "1px solid #E8E8E8" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: G }}>
                  {["Platform", "Frequency", "Notes"].map((h, i) => (
                    <th key={h} style={{ padding: "14px 18px", textAlign: i===0?"left":i===1?"center":"left", fontSize: 11, fontWeight: 700, color: "#fff", fontFamily: "var(--font-bricolage),sans-serif" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {frequency.map((f, i) => (
                  <tr key={f.key} style={{ borderBottom: i < frequency.length-1 ? "1px solid #F0F0F0" : "none" }}>
                    <td style={{ padding: "14px 18px" }}>
                      <span className="inline-flex items-center gap-2">
                        <PIcon p={f.key} size={13} />
                        <span style={{ fontSize: 14, fontWeight: 700, color: D, fontFamily: "var(--font-bricolage),sans-serif" }}>{f.name}</span>
                      </span>
                    </td>
                    <td style={{ padding: "14px 18px", textAlign: "center", fontSize: 14, fontWeight: 700, color: G, fontFamily: "var(--font-bricolage),sans-serif" }}>{f.freq}</td>
                    <td style={{ padding: "14px 18px", fontSize: 12.5, color: D, opacity: 0.6 }}>{f.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total + notes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-[18px] p-6 text-center" style={{ background: G }}>
              <p className="text-[10px] font-bold mb-1" style={{ color: "#fff" }}>TOTAL MONTHLY</p>
              <p className="heading" style={{ fontSize: 34, color: "#fff", lineHeight: 1 }}>20–25</p>
              <p className="text-[11px] mt-1" style={{ color: "#fff" }}>posts / month · reposts not double-counted</p>
            </div>
            <div className="rounded-[18px] p-5 flex items-start gap-3 md:col-span-2" style={{ background: "#fff", border: `1.5px solid ${G}30` }}>
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-start gap-2">
                  <Repeat size={15} color={G} className="flex-shrink-0 mt-0.5" />
                  <p className="text-[13px]" style={{ color: D }}>TikTok &amp; IG posts are the same — TikTok carries an extra batch of TikTok-only posts.</p>
                </div>
                <div className="flex items-start gap-2">
                  <Film size={15} color={G} className="flex-shrink-0 mt-0.5" />
                  <p className="text-[13px]" style={{ color: D }}>Those extra TikTok posts can also run as IG / Snapchat stories.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 07 — CONTENT NATURE ══════════ */}
      <section id="s07" className="sm-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <SH n="07" title="Content" accent="Nature" />
          <p className="text-center mb-12 max-w-xl mx-auto" style={{ color: D, fontSize: 15 }}>
            The formats each platform runs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm-stagger">
            {contentNature.map((c) => (
              <div key={c.key} className="sm-item rounded-[18px] overflow-hidden" style={{ border: `1.5px solid ${G}25` }}>
                <div className="px-4 py-3 flex items-center gap-2" style={{ borderBottom: `1px solid ${G}20` }}>
                  <PIcon p={c.key} size={13} />
                  <p className="heading text-[15px]" style={{ color: D }}>{c.name}</p>
                </div>
                <div className="p-4 flex flex-col gap-2">
                  {c.formats.map((fmt) => (
                    <div key={fmt} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: G }} />
                      <span className="text-[12.5px]" style={{ color: D }}>{fmt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* format legend */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              { label: "Reels", icon: Clapperboard },
              { label: "Stories", icon: Layers },
              { label: "Static", icon: ImageIcon },
              { label: "Carousel", icon: Layers },
              { label: "Long & Short Video", icon: Film },
            ].map((l) => (
              <span key={l.label} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold" style={{ border: `1px solid ${G}30`, color: D }}>
                <l.icon size={13} color={G} /> {l.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 08 — POSTING CALENDAR TEMPLATE ══════════ */}
      <section id="s08" className="sm-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <SH n="08" title="Posting Calendar" accent="Template" />
          <p className="text-center mb-10 max-w-xl mx-auto" style={{ color: D, fontSize: 15 }}>
            Every monthly calendar is built on this structure — one row per post.
          </p>
          <div className="rounded-[20px] overflow-hidden overflow-x-auto" style={{ border: "1px solid #E8E8E8" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
              <thead>
                <tr style={{ background: G }}>
                  {["Post #","Type","Pillar","Date","Image","Caption","Platform","Hashtags"].map((h) => (
                    <th key={h} style={{ padding: "13px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#fff", fontFamily: "var(--font-bricolage),sans-serif", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { n: "1", type: "Reel" }, { n: "2", type: "Static" }, { n: "3", type: "Reel" },
                  { n: "4", type: "Story" }, { n: "5", type: "Video" },
                ].map((r, i) => (
                  <tr key={r.n} style={{ borderBottom: i < 4 ? "1px solid #F0F0F0" : "none" }}>
                    <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 700, color: D, fontFamily: "var(--font-bricolage),sans-serif" }}>{r.n}</td>
                    <td style={{ padding: "12px 14px" }}>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: G, color: "#fff" }}>{r.type}</span>
                    </td>
                    {[0,1,2,3,4,5].map((c) => (
                      <td key={c} style={{ padding: "12px 14px" }}>
                        <span className="inline-block rounded-full" style={{ width: c === 5 ? 70 : 44, height: 7, background: "#EDEDED" }} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[12px] mt-4 text-center" style={{ color: D, opacity: 0.4 }}>
            Initial template — final calendar is set during implementation.
          </p>
        </div>
      </section>

      {/* ══════════ 09 — INFLUENCERS ══════════ */}
      <section id="s09" className="sm-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-4xl mx-auto">
          <SH n="09" title="" accent="Influencers" />
          <div className="rounded-[24px] overflow-hidden mb-6" style={{ border: `1.5px solid ${G}30` }}>
            <img src="/photos/influencer.jpg" alt="Soueast influencer in Riyadh" className="w-full object-cover" style={{ height: 360 }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm-stagger mb-6">
            <div className="sm-item rounded-[20px] p-6" style={{ background: "#fff", border: `1.5px solid ${G}30` }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: G }}>
                <Film size={20} color="#fff" />
              </div>
              <p className="heading text-lg mb-2" style={{ color: D }}>3–5 minute videos</p>
              <p className="text-[13px] leading-relaxed" style={{ color: D, opacity: 0.65 }}>
                Influencer-only and client-provided footage produce long-form videos of 3–5 minutes.
              </p>
            </div>
            <div className="sm-item rounded-[20px] p-6" style={{ background: "#fff", border: `1.5px solid ${G}30` }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: G }}>
                <Clapperboard size={20} color="#fff" />
              </div>
              <p className="heading text-lg mb-2" style={{ color: D }}>Cutouts → shorts</p>
              <p className="text-[13px] leading-relaxed" style={{ color: D, opacity: 0.65 }}>
                Shorter content is cut from those long videos to feed reels, shorts and stories.
              </p>
            </div>
          </div>
          <div className="rounded-[18px] p-6 flex items-start gap-3" style={{ background: G }}>
            <AlertTriangle size={20} color="#fff" className="flex-shrink-0 mt-0.5" />
            <p className="text-[14px] font-bold leading-relaxed" style={{ color: "#fff" }}>
              Influencer budget is outside the agreed SAR 9,000 / month budget.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════ 10 — CAMPAIGN METHODOLOGY ══════════ */}
      <section id="s10" className="sm-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <SH n="10" title="Campaign" accent="Methodology" />
          <p className="text-center mb-12 max-w-xl mx-auto" style={{ color: D, fontSize: 15 }}>
            How every campaign moves from brief to report — six stages.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm-stagger">
            {[
              { n: "01", t: "Objectives", d: "Align with the client on what each campaign should achieve.", icon: Target },
              { n: "02", t: "Campaign Plan", d: "Roadmap, platforms, rollout, phases, timeline & media plan within budget.", icon: Layers },
              { n: "03", t: "Concept Creation", d: "Creative & copy teams develop multiple concepts with rationale + KV sample.", icon: Sparkles },
              { n: "04", t: "Content Creation", d: "Build all visuals, captions, headlines & hashtags — static & video.", icon: Camera },
              { n: "05", t: "Launching", d: "Launch on the agreed media platforms; monitor daily and optimize.", icon: Megaphone },
              { n: "06", t: "Reporting", d: "Daily & weekly reports — impressions, engagement, clicks, CTR, CVR, KPIs + recommendations.", icon: BarChart3 },
            ].map((s) => (
              <div key={s.n} className="sm-item rounded-[18px] p-5" style={{ background: "#fff", border: `1.5px solid ${G}30` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: G }}>
                    <s.icon size={18} color="#fff" />
                  </div>
                  <span className="heading text-2xl" style={{ color: G }}>{s.n}</span>
                </div>
                <h4 className="heading text-[15px] mb-1.5" style={{ color: D }}>{s.t}</h4>
                <p className="text-[12.5px] leading-snug" style={{ color: D, opacity: 0.6 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 11 — SOCIAL LISTENING ══════════ */}
      <section id="s11" className="sm-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-4xl mx-auto">
          <SH n="11" title="Social" accent="Listening" />
          <p className="text-center mb-12 max-w-xl mx-auto" style={{ color: D, fontSize: 15 }}>
            How we monitor sentiment and nurture the Soueast community — six steps.
          </p>
          <div className="flex flex-col gap-3 sm-stagger">
            {[
              { n: "01", t: "Select keywords", d: "Pick relevant keywords, hashtags & topics tied to Soueast.", icon: Search },
              { n: "02", t: "Monitor all platforms", d: "Watch every social platform continuously.", icon: Eye },
              { n: "03", t: "Track mentions", d: "Track Soueast mentions — direct and indirect discussions.", icon: Hash },
              { n: "04", t: "Analyze sentiment", d: "Positive / negative / neutral, plus trends and patterns for insight.", icon: TrendingUp },
              { n: "05", t: "Engage", d: "Join conversations and reply to people who mention Soueast.", icon: MessageCircle },
              { n: "06", t: "Monthly report", d: "Sentiment analysis, engagement, competition tracking & impact of actions.", icon: BarChart3 },
            ].map((s) => (
              <div key={s.n} className="sm-item rounded-[16px] p-5 flex items-start gap-4" style={{ background: "#fff", border: `1.5px solid ${G}25` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: G }}>
                  <s.icon size={18} color="#fff" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="heading text-sm" style={{ color: G }}>{s.n}</span>
                    <h4 className="heading text-[15px]" style={{ color: D }}>{s.t}</h4>
                  </div>
                  <p className="text-[13px]" style={{ color: D, opacity: 0.6 }}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 12 — COMMUNITY MANAGEMENT ══════════ */}
      <section id="s12" className="sm-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <SH n="12" title="Community" accent="Management" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm-stagger mb-6">
            {[
              { t: "Inquiries", d: "Answer from the FAQ sheet. Reply within a maximum of 2 hours. New questions go to the client for input.", icon: MessageCircle },
              { t: "Spam", d: "Ads for other products, offensive or irrelevant content — removed immediately.", icon: Trash2 },
              { t: "Complaints", d: "Ask for the user's name & contact via DM, acknowledge and resolve — then reply publicly with an apology.", icon: MessageSquare },
              { t: "Crisis", d: "A high volume of negative sentiment needs a carefully crafted public statement, not a social reply.", icon: AlertTriangle },
            ].map((c) => (
              <div key={c.t} className="sm-item rounded-[18px] p-6" style={{ background: "#fff", border: `1.5px solid ${G}30` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: G }}>
                    <c.icon size={18} color="#fff" />
                  </div>
                  <h4 className="heading text-lg" style={{ color: D }}>{c.t}</h4>
                </div>
                <p className="text-[13px] leading-relaxed" style={{ color: D, opacity: 0.65 }}>{c.d}</p>
              </div>
            ))}
          </div>
          <div className="rounded-[16px] p-5 flex items-start gap-3" style={{ background: G }}>
            <Clock size={18} color="#fff" className="flex-shrink-0 mt-0.5" />
            <p className="text-[13px] font-bold" style={{ color: "#fff" }}>
              Standard reply window: within 2–3 hours · FAQ-based answers · non-FAQ questions escalated to the client daily.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════ 13 — CRISIS MANAGEMENT ══════════ */}
      <section id="s13" className="sm-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <SH n="13" title="Crisis" accent="Management" />
          <p className="text-center mb-12 max-w-xl mx-auto" style={{ color: D, fontSize: 15 }}>
            Dealing with a community crisis in three steps.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm-stagger mb-8">
            {[
              { n: "01", t: "Understand Issues", time: "2–3 hours", items: ["Identify topic & users", "Analyze the sentiment", "Measure the magnitude", "Understand the backstory"], icon: Search },
              { n: "02", t: "Generate Answers", time: "10–12 hours", items: ["Inform all stakeholders", "Assess the situation", "Stop publishing content", "Craft the right response"], icon: FileText },
              { n: "03", t: "Implement & Moderate", time: "Until it dies down", items: ["Execute the plan of action", "React to feedback", "Monitor & report"], icon: CheckCircle2 },
            ].map((s) => (
              <div key={s.n} className="sm-item rounded-[20px] overflow-hidden" style={{ border: `1.5px solid ${G}30` }}>
                <div className="p-5" style={{ background: G }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="heading text-3xl" style={{ color: "#fff" }}>{s.n}</span>
                    <s.icon size={20} color="#fff" />
                  </div>
                  <h4 className="heading text-lg" style={{ color: "#fff" }}>{s.t}</h4>
                  <p className="text-[11px] font-bold" style={{ color: "#fff" }}>{s.time}</p>
                </div>
                <div className="p-5 flex flex-col gap-2">
                  {s.items.map((it) => (
                    <div key={it} className="flex items-start gap-2">
                      <CheckCircle2 size={13} color={G} className="flex-shrink-0 mt-0.5" />
                      <span className="text-[12.5px]" style={{ color: D }}>{it}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-[16px] p-6 flex items-start gap-3" style={{ background: "#fff", border: `1.5px solid ${G}30` }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: G }}>
              <Users size={18} color="#fff" />
            </div>
            <div>
              <h4 className="heading text-base mb-1" style={{ color: D }}>Crisis Management Team</h4>
              <p className="text-[13px] leading-relaxed" style={{ color: D, opacity: 0.65 }}>
                From community managers up to senior management — aligned on one plan of action, acting consistently internally, on the ground and on social. Always be prepared, communicate, and act fast.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 14 — CLIENT–AGENCY WORKFLOW ══════════ */}
      <section id="s14" className="sm-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <SH n="14" title="Client–Agency" accent="Workflow" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm-stagger">
            {[
              { t: "FAQs", d: "The community manager answers any inquiry available in the FAQ sheet. If not, we refer to the Customer Service sheet.", icon: BookOpen },
              { t: "Customer Service Sheet", d: "Agency sends non-FAQ questions & complaints once a day. Client responds within 2 hours; agency refines and replies.", icon: FileText },
              { t: "Content Development", d: "Agency builds a 1-month content calendar a month ahead. Content goes back and forth with the client until approved.", icon: Camera },
              { t: "SM & Campaigns", d: "After approval, agency posts on the agreed schedule, runs campaigns, reports monthly and optimizes.", icon: Megaphone },
            ].map((w) => (
              <div key={w.t} className="sm-item rounded-[18px] p-6" style={{ background: "#fff", border: `1.5px solid ${G}30` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: G }}>
                    <w.icon size={18} color="#fff" />
                  </div>
                  <h4 className="heading text-lg" style={{ color: D }}>{w.t}</h4>
                </div>
                <p className="text-[13px] leading-relaxed" style={{ color: D, opacity: 0.65 }}>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CLOSING ══════════ */}
      <section className="sm-slide opacity-0" style={{ padding:"80px 24px 60px", background:"#fff" }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="rounded-[24px] p-10 md:p-12" style={{ background:"#fff", border:"1px solid #E8E8E8" }}>
            <img src="/motionmotors/soueast.png" alt="Soueast" className="h-14 mx-auto mb-5 object-contain" />
            <h3 className="heading text-2xl mb-3" style={{ color:D }}>The strategy in one place.</h3>
            <p className="text-[14px] mb-7 max-w-md mx-auto leading-relaxed" style={{ color:D, opacity: 0.55 }}>
              Objectives, audience, tone, the 10 content pillars, 5 platforms, cadence and influencer model — the foundation the content calendar is built on.
            </p>
            <div className="w-full h-px mb-6" style={{ background:"#F0F0F0" }} />
            <p className="text-[11px] font-bold mb-3" style={{ color:G }}>Presented to Mr. Edgard Tabet · Group Managing Director</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <div>
                <p className="text-[14px] font-bold" style={{ color:D }}>Ahmed Ali</p>
                <p className="text-[12px]" style={{ color:G }}>Head of Digital Product &amp; Growth</p>
                <p className="text-[11px] mt-0.5" style={{ color:D, opacity: 0.3 }}>ahmed.ali@emotiongrp.com</p>
              </div>
              <div className="hidden sm:block self-stretch w-px" style={{ background:"#EBEBEB" }} />
              <div>
                <p className="text-[14px] font-bold" style={{ color:D }}>Josef Haddad</p>
                <p className="text-[12px]" style={{ color:G }}>Creative Director — Emotion</p>
                <p className="text-[11px] mt-0.5" style={{ color:D, opacity: 0.3 }}>josef.haddad@emotiongrp.com</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-7">
              <a href="https://wa.me/201011648156" target="_blank" rel="noopener"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold"
                style={{ background:G, color:"#fff", border:`1.5px solid ${G}`, textDecoration:"none" }}>
                <FaWhatsapp size={14} /> WhatsApp
              </a>
              <a href="mailto:ahmed.ali@emotiongrp.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold"
                style={{ background:"#fff", color:D, border:`1.5px solid #E8E8E8`, textDecoration:"none" }}>
                <Send size={14} /> Email
              </a>
            </div>
          </div>
          <p className="text-[11px] mt-6" style={{ color:D, opacity: 0.15 }}>
            &copy; 2026 Motion Motors × Soueast · Social Media Strategy · KSA · Internal
          </p>
        </div>
      </section>
    </div>
  );
}

/* ── Section Header ── */
function SH({ n, title, accent }: { n: string; title: string; accent: string }) {
  return (
    <div className="text-center mb-14">
      <p className="heading text-lg mb-3" style={{ color: "#f58021" }}>Section {n}</p>
      <h2 className="heading text-4xl md:text-5xl mb-4" style={{ color: "#0A0A0A" }}>
        {title} <span style={{ color: "#f58021" }}>{accent}</span>
      </h2>
    </div>
  );
}

/* ═══════════ SIDE NAV + ONBOARDING ═══════════ */

const NAV_ITEMS: { id: string; label: string; tourDesc: string }[] = [
  { id: "s01", label: "Objectives",        tourDesc: "The four goals: awareness, consideration/conversion, lifestyle positioning, and luxury driving." },
  { id: "s02", label: "Audience",          tourDesc: "Saudi residents — local & expat, male & female, 20–55, single & married." },
  { id: "s03", label: "Tone of Voice",     tourDesc: "Friendly, casual, trendy, knowledgeable, confident — how the brand speaks." },
  { id: "s04", label: "Content Pillars",   tourDesc: "The 10 pillars every post draws from — the content framework." },
  { id: "s05", label: "Platforms",         tourDesc: "Five platforms — Instagram, TikTok, YouTube, Snapchat and LinkedIn — and the role of each." },
  { id: "s06", label: "Frequency",         tourDesc: "Per-platform posting cadence — 20–25 posts a month, reposts not double-counted." },
  { id: "s07", label: "Content Nature",    tourDesc: "The formats each platform runs — reels, stories, static, carousel, long & short video." },
  { id: "s08", label: "Calendar Template", tourDesc: "The structure every monthly calendar is built on — one row per post." },
  { id: "s09", label: "Influencers",       tourDesc: "3–5 minute videos, cutouts for shorts — and the influencer budget sits outside the SAR 9,000." },
  { id: "s10", label: "Campaign Method",   tourDesc: "Six stages from objectives to reporting for every campaign." },
  { id: "s11", label: "Social Listening",  tourDesc: "Six steps to monitor sentiment and nurture the Soueast community." },
  { id: "s12", label: "Community Mgmt",    tourDesc: "Handling inquiries, spam, complaints and crisis — with response windows." },
  { id: "s13", label: "Crisis Mgmt",       tourDesc: "Dealing with a crisis in three steps, plus the crisis team structure." },
  { id: "s14", label: "Client–Agency Flow",tourDesc: "FAQs, customer-service sheet, content development and campaigns flow." },
];

const DRAG_NOTE = {
  title: "Move this menu anywhere",
  desc: "Drag the header to place this navigator wherever fits your reading — it remembers where you put it.",
};

function SectionNav() {
  const ORANGE = "#f58021";
  const [active, setActive] = useState<string>("s01");
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [tourIdx, setTourIdx] = useState<number | null>(null);
  const [tipPos, setTipPos] = useState<{ x: number; y: number; placement: "left" | "right" } | null>(null);
  const dragOffset = useRef<{ x: number; y: number } | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const NAV_W = 230;
  const TIP_W = 310;
  const TOUR_LEN = NAV_ITEMS.length + 1;

  useEffect(() => {
    let initial: { x: number; y: number } | null = null;
    try { const saved = localStorage.getItem("ss-nav-pos"); if (saved) initial = JSON.parse(saved); } catch {}
    if (!initial) {
      const h = navRef.current?.offsetHeight ?? 480;
      initial = { x: window.innerWidth - NAV_W - 16, y: Math.max(16, window.innerHeight / 2 - h / 2) };
    }
    const h = navRef.current?.offsetHeight ?? 480;
    initial.x = Math.max(8, Math.min(window.innerWidth - NAV_W - 8, initial.x));
    initial.y = Math.max(8, Math.min(window.innerHeight - h - 8, initial.y));
    setPos(initial);
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[id^='s']");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting && /^s\d\d$/.test(e.target.id)) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    items.forEach((el) => { if (/^s\d\d$/.test(el.id)) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let done = false;
    try { done = localStorage.getItem("ss-tour-done") === "1"; } catch {}
    if (done) return;
    const t = setTimeout(() => setTourIdx(0), 1000);
    return () => clearTimeout(t);
  }, []);

  const finishTour = () => { setTourIdx(null); try { localStorage.setItem("ss-tour-done", "1"); } catch {} };
  const nextTour = () => { if (tourIdx === null) return; if (tourIdx >= TOUR_LEN - 1) finishTour(); else setTourIdx(tourIdx + 1); };

  useEffect(() => {
    if (tourIdx === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") finishTour(); else if (e.key === "ArrowRight" || e.key === "Enter") nextTour(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tourIdx]);

  useEffect(() => {
    if (tourIdx === null || !navRef.current) { setTipPos(null); return; }
    const compute = () => {
      const isDrag = tourIdx === NAV_ITEMS.length;
      const target = isDrag
        ? navRef.current?.querySelector<HTMLElement>("[data-drag-handle]")
        : navRef.current?.querySelector<HTMLElement>(`[data-nav-item="${NAV_ITEMS[tourIdx].id}"]`);
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const placeRight = rect.left < TIP_W + 32;
      const x = placeRight ? rect.right + 16 : rect.left - TIP_W - 16;
      const y = rect.top + rect.height / 2;
      setTipPos({ x, y, placement: placeRight ? "right" : "left" });
    };
    const raf = requestAnimationFrame(compute);
    window.addEventListener("resize", compute);
    window.addEventListener("scroll", compute, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", compute); window.removeEventListener("scroll", compute); };
  }, [tourIdx, pos]);

  const tourHighlightId = tourIdx !== null && tourIdx < NAV_ITEMS.length ? NAV_ITEMS[tourIdx].id : null;
  const isDragStep = tourIdx !== null && tourIdx === NAV_ITEMS.length;
  const tourTitle = isDragStep ? DRAG_NOTE.title : tourIdx !== null ? NAV_ITEMS[tourIdx].label : "";
  const tourDesc  = isDragStep ? DRAG_NOTE.desc  : tourIdx !== null ? NAV_ITEMS[tourIdx].tourDesc : "";

  const handleClick = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pos) return;
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    document.body.style.userSelect = "none";
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragOffset.current || !navRef.current) return;
    const h = navRef.current.offsetHeight;
    setPos({
      x: Math.max(8, Math.min(window.innerWidth - NAV_W - 8, e.clientX - dragOffset.current.x)),
      y: Math.max(8, Math.min(window.innerHeight - h - 8, e.clientY - dragOffset.current.y)),
    });
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragOffset.current) return;
    dragOffset.current = null;
    setDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
    document.body.style.userSelect = "";
    if (pos) { try { localStorage.setItem("ss-nav-pos", JSON.stringify(pos)); } catch {} }
  };

  return (
    <>
      <aside
        ref={navRef}
        aria-label="Section navigation"
        className="fixed z-[65] hidden xl:flex flex-col rounded-[18px] overflow-hidden"
        style={{
          width: NAV_W, left: pos?.x, top: pos?.y, visibility: pos ? "visible" : "hidden",
          background: "rgba(255,255,255,0.97)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          border: `1px solid ${ORANGE}30`,
          boxShadow: dragging ? "0 18px 50px rgba(245,128,33,0.22)" : "0 12px 40px rgba(0,0,0,0.08)",
          transition: dragging ? "none" : "box-shadow 250ms ease",
        }}
      >
        <div
          data-drag-handle
          onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}
          className="px-4 pt-4 pb-3 flex flex-col gap-2 select-none"
          style={{ borderBottom: `1px solid ${ORANGE}20`, cursor: dragging ? "grabbing" : "grab", touchAction: "none", background: ORANGE }}
        >
          <div className="flex items-center justify-center">
            <img src="/motionmotors/soueast.png" alt="Soueast" className="object-contain pointer-events-none" style={{ height: 30, maxWidth: 150, width: "auto", filter: "brightness(0) invert(1)" }} draggable={false} />
          </div>
          <div className="flex items-center justify-center gap-1 pt-1" style={{ opacity: 0.6 }}>
            {[0,1,2,3,4].map((i) => <span key={i} className="block rounded-full" style={{ width: 3, height: 3, background: "#fff" }} />)}
          </div>
        </div>

        <div className="p-1.5 flex flex-col gap-0.5 overflow-y-auto" style={{ maxHeight: "60vh" }}>
          {NAV_ITEMS.map((item, i) => {
            const isActive = active === item.id;
            const isTour = tourHighlightId === item.id;
            const show = isActive || isTour;
            return (
              <button
                key={item.id} data-nav-item={item.id} onClick={() => handleClick(item.id)}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-[10px] text-left cursor-pointer border-0 relative"
                style={{
                  background: isTour ? `${ORANGE}25` : isActive ? `${ORANGE}15` : "transparent",
                  transition: "background 300ms",
                  boxShadow: isTour ? `0 0 0 2px ${ORANGE}` : "none",
                }}
                onMouseEnter={(e) => { if (!show) e.currentTarget.style.background = `${ORANGE}0A`; }}
                onMouseLeave={(e) => { if (!show) e.currentTarget.style.background = "transparent"; }}
              >
                <span className="block rounded-full flex-shrink-0" style={{ width: show ? 8 : 5, height: show ? 8 : 5, background: ORANGE, opacity: show ? 1 : 0.5, transition: "all 300ms" }} />
                <span className="heading text-[11.5px] flex-shrink-0" style={{ color: "#0A0A0A", opacity: show ? 1 : 0.4, width: 16, fontVariantNumeric: "tabular-nums" }}>{String(i + 1).padStart(2, "0")}</span>
                <span className="heading text-[11.5px] truncate flex-1" style={{ color: "#0A0A0A", opacity: show ? 1 : 0.6 }}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {tourIdx !== null && (
        <div className="hidden xl:block fixed inset-0 z-[55]" style={{ background: "rgba(10,10,10,0.45)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }} aria-hidden />
      )}

      {tourIdx !== null && tipPos && (
        <div
          className="hidden xl:flex fixed z-[70] flex-col rounded-[18px] overflow-hidden"
          style={{
            width: TIP_W, left: tipPos.x, top: tipPos.y, transform: "translateY(-50%)",
            background: "#fff", border: `1px solid ${ORANGE}30`, boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
            transition: "left 380ms cubic-bezier(0.4,0,0.2,1), top 380ms cubic-bezier(0.4,0,0.2,1)",
          }}
          role="dialog" aria-label="Onboarding"
        >
          <div className="h-1 w-full" style={{ background: `${ORANGE}1A` }}>
            <div className="h-full" style={{ width: `${((tourIdx + 1) / TOUR_LEN) * 100}%`, background: ORANGE, transition: "width 380ms" }} />
          </div>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="block w-2.5 h-2.5 rounded-full" style={{ background: ORANGE }} />
              <span className="heading text-[10px]" style={{ color: "#0A0A0A", opacity: 0.5 }}>
                {isDragStep ? "Pro tip" : `Step ${String(tourIdx + 1).padStart(2, "0")} of ${String(TOUR_LEN).padStart(2, "0")}`}
              </span>
            </div>
            <h3 className="heading text-lg mb-1.5" style={{ color: "#0A0A0A", lineHeight: 1.2 }}>{tourTitle}</h3>
            <p className="text-[12.5px] leading-relaxed mb-4" style={{ color: "#0A0A0A", opacity: 0.7 }}>{tourDesc}</p>
            <div className="flex items-center gap-2">
              <button onClick={finishTour} className="px-4 py-2.5 rounded-full heading text-[12px] cursor-pointer border-0" style={{ background: "transparent", color: "#0A0A0A", opacity: 0.5 }}>Skip</button>
              <button onClick={nextTour} className="flex-1 py-2.5 rounded-full heading text-[12px] cursor-pointer border-0" style={{ background: ORANGE, color: "#fff" }}>
                {tourIdx >= TOUR_LEN - 1 ? "Got it" : "Next →"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Calendar, TrendingUp, ArrowRight } from "lucide-react";
/* eslint-disable @next/next/no-img-element */

gsap.registerPlugin(ScrollTrigger);

/* Same named ramp as Services, How I Work, Projects and Stats. */
const INK = "#04323A";
const TEAL = "#004D5A";
const MUTED = "#4E717A";
const MINT = "#CFF7EE";
const WASH = "#F4FBF9";

const experiences = [
  {
    role: "Digital Marketing Executive",
    company: "Elite Marketing Services",
    location: "Doha, Qatar",
    flag: "🇶🇦",
    period: "Aug 2025 – Mar 2026",
    type: "Full-time",
    active: false,
    description: "Managed and executed digital marketing strategies for a diverse client portfolio across multiple industries in the MENA region.",
    achievements: [
      "Ran and optimized PPC campaigns across Google Ads, Meta Ads, and TikTok Ads, improving ROAS and reducing CPA",
      "Conducted technical SEO audits and on-page optimization to improve search rankings and organic visibility",
      "Built performance reports using GA4 and Google Tag Manager, delivering data-backed strategic recommendations",
    ],
    tools: ["Google Ads", "Meta Ads", "TikTok Ads", "GA4", "GTM", "SEMrush", "Search Console", "WordPress"],
    toolIcons: [
      "/ext/google-ads-icon.png",
      "https://cdn.simpleicons.org/meta/0081FB",
      "https://cdn.simpleicons.org/tiktok/000000",
      "/ext/google-analytics.png",
      "/ext/gtm.svg",
      "/ext/semrush.png",
      "/ext/gsc.png",
      "/ext/wordpress.svg",
    ],
  },
  {
    role: "Digital Product Manager",
    company: "Omnis Media Group",
    location: "Dubai, UAE",
    flag: "🇦🇪",
    period: "Aug 2025 – Mar 2026",
    type: "Full-time",
    active: false,
    description: "Key digital strategy consultant for Omnis Media Group, MENA's MarTech innovation leader and organizer of Mobile Developers Week, a landmark international tech conference at Abu Dhabi Energy Center with 3,000+ attendees and 60+ global speakers.",
    achievements: [
      "Consulted with senior leadership on digital strategy, ticket sales growth, and audience acquisition for MDW 2025",
      "Led development of AI-powered platforms using React, Next.js, and Firebase, from strategy to launch",
      "Drove growth through performance marketing, technical SEO, and UX optimization across all managed platforms",
    ],
    tools: ["React", "Next.js", "Firebase", "AI", "Google Ads", "Search Console", "GA4"],
    toolIcons: [
      "/ext/react.svg",
      "/ext/nextjs.svg",
      "/ext/firebase.svg",
      "/ext/openai.png",
      "/ext/google-ads-icon.png",
      "/ext/gsc.png",
      "/ext/google-analytics.png",
    ],
  },
  {
    role: "Digital Marketing & Web Projects Specialist",
    company: "Ezz Al-Afaq Company",
    location: "Saudi Arabia",
    flag: "🇸🇦",
    period: "Jan 2024 – Jul 2025",
    type: "Full-time",
    active: false,
    description: "Spearheaded digital marketing campaigns, web design, and SEO for multiple high-value client accounts across diverse industries including hospitality, healthcare, and F&B.",
    achievements: [
      "Developed integrated web systems using WordPress and custom APIs, enhancing functionality and user engagement",
      "Managed Google Ads, Meta Ads, and TikTok Ads campaigns to drive measurable ROI for clients",
      "Built high-converting landing pages optimized for lead generation and CPA reduction",
      "Implemented GA4 and GTM tracking to monitor user behavior and campaign performance",
    ],
    tools: ["Google Ads", "WordPress", "GA4", "GTM", "Meta Ads", "TikTok Ads", "Search Console", "SEMrush"],
    toolIcons: [
      "/ext/google-ads-icon.png",
      "/ext/wordpress.svg",
      "/ext/google-analytics.png",
      "/ext/gtm.svg",
      "https://cdn.simpleicons.org/meta/0081FB",
      "https://cdn.simpleicons.org/tiktok/000000",
      "/ext/gsc.png",
      "/ext/semrush.png",
    ],
  },
  {
    role: "SEO & Web Development Lead",
    company: "Finance & Business Magazine",
    location: "UAE (Remote)",
    flag: "🇦🇪",
    period: "2024 – Feb 2025",
    type: "Contract",
    active: false,
    description: "Built and managed the complete digital presence of Finance & Business, a premier UAE editorial platform for business leaders, with partners including Mohammed BinGhatti and major regional brands.",
    achievements: [
      "Implemented comprehensive SEO strategy (On-Page, Off-Page, Technical). Achieved top-10 Google rankings in 8 months",
      "Integrated analytics and automation tools to track user behavior and inform editorial decisions",
      "Managed content strategy driving sustained organic growth for competitive finance keywords",
    ],
    tools: ["WordPress", "SEO", "GA4", "Search Console"],
    toolIcons: [
      "/ext/wordpress.svg",
      "/ext/semrush.png",
      "/ext/google-analytics.png",
      "/ext/gsc.png",
    ],
  },
  {
    role: "Search Engine Optimization Specialist",
    company: "Binghatti Investments",
    location: "UAE (Remote)",
    flag: "🇦🇪",
    period: "Dec 2022 – Aug 2023",
    type: "Contract · 9 Months",
    active: false,
    description: "Collaborated within the SEO team to execute strategies increasing rankings for high-value real estate keywords for one of Dubai's leading luxury real estate developers.",
    achievements: [
      "Executed SEO strategy increasing rankings for high-value real estate keywords in the UAE market",
      "Monitored and reported on performance using Google Analytics and Search Console",
      "Provided strategic insights for continuous refinement of organic search visibility",
    ],
    tools: ["SEO", "GA4", "Search Console", "GTM"],
    toolIcons: [
      "/ext/semrush.png",
      "/ext/google-analytics.png",
      "/ext/gsc.png",
      "/ext/gtm.svg",
    ],
  },
  {
    role: "Digital Strategy Consultant & Full-Stack Developer",
    company: "Freelance",
    location: "Remote · Worldwide",
    flag: "🌍",
    period: "2020 – Present",
    type: "Freelance",
    active: true,
    description: "Delivering complete digital solutions across Egypt, Saudi Arabia, UAE, and Oman for clients spanning healthcare, real estate, hospitality, legal, e-commerce, and F&B sectors.",
    achievements: [
      "Healthcare: Full digital ecosystems for Om Al-Hamam (Riyadh), Obaid Hospital, Al-Ruqi Medical, RM Clinic (Mecca)",
      "Real Estate: SEO & performance marketing for BinGhatti, Evolution Dubai, Bin Laden UAE",
      "Mobile: Built Maasob Al-Sultan Flutter app with AI chatbot, 5-branch management, shipped in < 1 month",
      "Hospitality: Delivered Wejhat MGT platform and multiple GCC service-sector websites",
      "In Progress: B2B/B2C laundry app, AI-powered educational platform, Masar (personal project, my own product), and RMC nursing training center for student education",
    ],
    tools: ["Flutter", "React", "Next.js", "Firebase", "WordPress", "Google Ads", "Meta Ads", "TikTok Ads", "GA4", "GTM", "SEMrush", "Search Console", "AI"],
    toolIcons: [
      "/ext/flutter.svg",
      "/ext/react.svg",
      "/ext/nextjs.svg",
      "/ext/firebase.svg",
      "/ext/wordpress.svg",
      "/ext/google-ads-icon.png",
      "https://cdn.simpleicons.org/meta/0081FB",
      "https://cdn.simpleicons.org/tiktok/000000",
      "/ext/google-analytics.png",
      "/ext/gtm.svg",
      "/ext/semrush.png",
      "/ext/gsc.png",
      "/ext/openai.png",
    ],
  },
];

/* Key clients */
const keyClients = [
  { name: "Ooredoo", logo: "/logos/ooredoo.png", work: "Technical SEO Audit", flag: "🇶🇦" },
  { name: "QNB", logo: "/logos/qnb.png", work: "UX Analysis", flag: "🇶🇦" },
  { name: "Amazon Egypt", logo: "/logos/amazon.svg", work: "SEO Content Strategy", flag: "🇪🇬" },
  { name: "Saudi Arabian Airlines", logo: "/ext/saudia.svg", work: "Competitor & SWOT Analysis", flag: "🇸🇦" },
  { name: "BinGhatti", logo: "/logos/binghatti.png", work: "SEO & Digital Presence", flag: "🇦🇪" },
  { name: "Chelsea FC", logo: "/logos/chelsea.png", work: "UX Optimization", flag: "🇬🇧" },
  { name: "Elite Marketing", logo: "/ext/elite-qatar.png", work: "Performance Marketing", flag: "🇶🇦" },
  { name: "Omnis Media", logo: "/ext/omnes.svg", work: "AI Platform Development", flag: "🇦🇪" },
  { name: "RM Clinic", logo: "/ext/rmclinic.png", work: "Full Digital Ecosystem", flag: "🇸🇦" },
  { name: "Finance & Business", logo: "/ext/finance-business.png", work: "SEO & Web Platform", flag: "🇦🇪" },
  { name: "MDW", logo: "/ext/mdw.png", work: "Event Digital Strategy", flag: "🇦🇪" },
  { name: "Maasob Al-Sultan", logo: "/ext/masoub.png", work: "Flutter Mobile App", flag: "🇸🇦" },
  { name: "CarTech", logo: "/logos/cartech.png", work: "Digital Marketing", flag: "🇪🇬" },
  { name: "Advert on Click", logo: "/ext/advertonclick.svg", work: "Performance Campaigns", flag: "🇪🇬" },
  { name: "Omnes Influencers", logo: "/ext/omnes-influencers.svg", work: "Influencer Platform", flag: "🇦🇪" },
  { name: "Kadana", logo: "/1.svg", work: "Market Research & Strategy", flag: "🇸🇦" },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".exp-card").forEach((el) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });

      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1, duration: 1.5, ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          }
        );
      }

      // Client logos marquee - row 1 left
      const clientRow1 = sectionRef.current?.querySelector(".client-row-1") as HTMLElement;
      if (clientRow1) {
        const w = clientRow1.scrollWidth / 2;
        gsap.to(clientRow1, { x: -w, duration: 30, ease: "none", repeat: -1 });
      }

      // Client logos marquee - row 2 right
      const clientRow2 = sectionRef.current?.querySelector(".client-row-2") as HTMLElement;
      if (clientRow2) {
        const w = clientRow2.scrollWidth / 2;
        gsap.set(clientRow2, { x: -w });
        gsap.to(clientRow2, { x: 0, duration: 30, ease: "none", repeat: -1 });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative overflow-hidden"
      style={{ background: "#fff", padding: "100px 24px" }}
    >
      {/* A mint radial at 3% opacity used to sit here — invisible on any
          ground, and doubly so on white. Removed rather than left as
          decoration that never arrives. */}

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="script text-xl md:text-2xl mb-3" style={{ color: TEAL }}>Career Path</p>
          <h2 className="heading text-3xl md:text-5xl" style={{ color: INK }}>Where I&apos;ve Made Impact</h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line - desktop */}
          <div
            ref={lineRef}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] origin-top"
            style={{ background: TEAL }}
          />

          {/* Mobile line */}
          <div
            className="md:hidden absolute left-5 top-0 bottom-0 w-[2px]"
            style={{ background: TEAL }}
          />

          <div className="flex flex-col gap-12 md:gap-16">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={i} className="exp-card opacity-0 relative">
                  {/* Desktop layout */}
                  <div className="hidden md:grid grid-cols-[1fr_60px_1fr] items-start">
                    {/* Left content */}
                    <div className={isLeft ? "" : "order-3"}>
                      <ExperienceCard exp={exp} variant={i % 2 === 0 ? "white" : "green"} />
                    </div>

                    {/* Center dot */}
                    <div className="flex justify-center order-2 pt-6">
                      <div className="relative">
                        <div
                          className="w-5 h-5 rounded-full border-[3px] z-10 relative"
                          style={{
                            background: exp.active ? TEAL : MINT,
                            borderColor: TEAL,
                            boxShadow: "none",
                          }}
                        />
                        {/* The active role used to carry a ping ring scaling
                            out of the marker — the last piece of neon on the
                            page. The filled marker already says "current". */}
                      </div>
                    </div>

                    {/* Empty side */}
                    <div className={isLeft ? "order-3" : ""} />
                  </div>

                  {/* Mobile layout */}
                  <div className="md:hidden relative pl-14">
                    <div className="absolute left-[12px] top-6">
                      <div
                        className="w-4 h-4 rounded-full border-[2px]"
                        style={{
                          background: exp.active ? TEAL : MINT,
                          borderColor: TEAL,
                          boxShadow: "none",
                        }}
                      />
                    </div>
                    <ExperienceCard exp={exp} variant={i % 2 === 0 ? "white" : "green"} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Clients Section */}
        <div className="mt-24 -mx-6 px-0">
          <div className="text-center mb-10 px-6">
            <p className="script text-xl md:text-2xl mb-3" style={{ color: TEAL }}>Trusted By</p>
            <h3 className="heading text-2xl md:text-3xl" style={{ color: INK }}>Key Client Highlights</h3>
          </div>

          {/* Row 1 - moves left */}
          <div className="relative overflow-hidden mb-8">
            <div className="absolute left-0 top-0 bottom-0 w-28 z-10" style={{ background: "linear-gradient(to right, #fff, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-28 z-10" style={{ background: "linear-gradient(to left, #fff, transparent)" }} />
            <div className="client-row-1 flex items-center gap-17" style={{ width: "max-content" }}>
              {[...keyClients.slice(0, 8), ...keyClients.slice(0, 8)].map((client, i) => (
                <img
                  key={i}
                  src={(client as any).logo}
                  alt={client.name}
                  className="object-contain flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300"
                  style={{ filter: client.name === "Chelsea FC" ? "none" : "brightness(0)", opacity: client.name === "Chelsea FC" ? 0.85 : 0.4, height: "50px", width: "120px" }}
                />
              ))}
            </div>
          </div>

          {/* Row 2 - moves right */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-28 z-10" style={{ background: "linear-gradient(to right, #fff, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-28 z-10" style={{ background: "linear-gradient(to left, #fff, transparent)" }} />
            <div className="client-row-2 flex items-center gap-17" style={{ width: "max-content" }}>
              {[...keyClients.slice(8), ...keyClients.slice(8)].map((client, i) => (
                <img
                  key={i}
                  src={(client as any).logo}
                  alt={client.name}
                  className="object-contain flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300"
                  style={{ filter: client.name === "Chelsea FC" ? "none" : "brightness(0)", opacity: client.name === "Chelsea FC" ? 0.85 : 0.4, height: "50px", width: "120px" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ exp, variant }: { exp: typeof experiences[0]; variant: "white" | "green" }) {
  const isWhite = variant === "white";
  /* On a white section the white cards had nothing separating them from the
     ground, so the light variant takes the wash. */
  const bg = isWhite ? WASH : MINT;
  /* Every text colour on this card used to be `#04323A` under three different
     names — the description, the achievements and the company all sat at full
     ink weight, so nothing receded. */
  const muted = isWhite ? MUTED : "rgba(4,50,58,0.70)";

  return (
    <div
      className="rounded-[20px] p-6 md:p-7"
      style={{ background: bg, border: `2px solid ${TEAL}`, boxShadow: `5px 5px 0px 0px ${TEAL}` }}
    >
      {/* Top row */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="text-xs font-semibold" style={{ color: muted }}>{exp.company}</span>
        <span
          className="text-[10px] px-2.5 py-0.5 rounded-full font-bold"
          style={{ background: "#fff", color: INK, border: `1.5px solid ${TEAL}` }}
        >
          {exp.active ? "Current" : exp.type}
        </span>
      </div>

      {/* Role */}
      <h3 className="heading text-xl md:text-2xl mb-3" style={{ color: INK, lineHeight: 1.35 }}>{exp.role}</h3>

      {/* Location + Period. These used to be tinted with a per-experience
          `color` field — six unrelated hues (#FF4D4D, #FF8C00, #E67E22,
          #00BFFF, #A855F7) that belonged to no palette on the site. */}
      <div className="flex items-center gap-2.5 mb-4 flex-wrap">
        {[
          { Ico: MapPin, text: exp.location },
          { Ico: Calendar, text: exp.period },
        ].map(({ Ico, text }) => (
          <span
            key={text}
            className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-semibold"
            style={{ background: "#fff", color: INK, border: `1.5px solid ${TEAL}` }}
          >
            <Ico size={10} /> {text}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed mb-5" style={{ color: muted }}>{exp.description}</p>

      {/* Achievements */}
      <div className="flex flex-col gap-2 mb-5">
        {exp.achievements.map((a, j) => (
          <div key={j} className="flex items-start gap-2">
            <TrendingUp size={12} className="mt-0.5 flex-shrink-0" style={{ color: TEAL }} />
            <span className="text-xs" style={{ color: INK }}>{a}</span>
          </div>
        ))}
      </div>

      {/* Tools */}
      <div className="flex items-center gap-3 flex-wrap mb-6">
        {exp.toolIcons.map((icon, j) => (
          <div key={j} className="flex flex-col items-center gap-1">
            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: "#fff", border: `1.5px solid ${TEAL}` }}>
              <img src={icon} alt={exp.tools[j]} width={16} height={16} className="object-contain" />
            </div>
            <span className="text-[9px] font-semibold" style={{ color: muted }}>{exp.tools[j]}</span>
          </div>
        ))}
      </div>

      {/* CTA. On the light cards this was ink-coloured text on a solid teal
          fill — the label was unreadable. Both variants now take a light fill
          with ink type, like every other retro button on the site. */}
      <a
        href="#contact"
        className="inline-flex items-center gap-2 h-10 px-6 rounded-full text-xs font-bold"
        style={{ background: isWhite ? MINT : "#fff", color: INK, border: `2px solid ${TEAL}`, boxShadow: `3px 3px 0px 0px ${TEAL}` }}
      >
        Let&apos;s Talk <ArrowRight size={13} />
      </a>
    </div>
  );
}

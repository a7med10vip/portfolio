"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Sprout, MonitorSmartphone, BrainCircuit, Gauge, Compass } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* Sticker scatter in the site's retro language: 2px ink outline and a hard
   offset shadow with no blur, the same treatment as the CTA buttons and the
   AskAhmed panels. Cards sit at slight angles and overlap; hovering presses
   one flat into the page and straightens it.

   Every card carries the full description and the full tool list. An earlier
   pass varied size by *removing* copy from the small cards, which just made
   three services look half-finished — size varies by width here, and the copy
   stays intact everywhere. */
type Fill = "mint" | "paper";

type ServiceItem = {
  Icon: typeof Target;
  title: string;
  desc: string;
  tools: string[];
  fill: Fill;
  /* Column span on the 12-col bed — this is the only thing that varies the
     card's size, so no service loses content to the layout. */
  span: string;
  rotate: number;
  nudge: number;
  z: number;
};

/* Icons are picked so no two read alike at 20px: the old set paired BarChart3
   with LineChart for two different services, and used a rocket for strategy.
   Target = what the campaigns aim at, Sprout = organic, MonitorSmartphone =
   web *and* mobile in one mark, BrainCircuit = the AI work, Gauge = reading
   instruments rather than another chart, Compass = direction, not liftoff. */
const services: ServiceItem[] = [
  {
    Icon: Target,
    title: "Performance Marketing",
    desc: "Data-driven campaigns across Google, Meta, and TikTok that maximize ROAS and scale revenue. From strategy to execution, I manage ad budgets up to $15K+/month with full tracking and optimization.",
    tools: ["Google Ads", "Meta Ads", "TikTok Ads", "Snapchat Ads"],
    fill: "mint", span: "md:col-span-7", rotate: -1.8, nudge: 0, z: 6,
  },
  {
    Icon: Sprout,
    title: "SEO & Organic Growth",
    desc: "Technical audits, keyword strategy, on-page optimization, and link building that drive organic visibility. I've achieved top-10 rankings for competitive keywords within 8 months.",
    tools: ["Technical SEO", "On-Page", "Off-Page", "Local SEO"],
    fill: "paper", span: "md:col-span-5", rotate: 2.1, nudge: 38, z: 5,
  },
  {
    Icon: MonitorSmartphone,
    title: "Web & Mobile Development",
    desc: "Full-stack applications built with modern frameworks, from landing pages to complex platforms with payment gateways, real-time databases, and AI integrations. Shipped to App Store & Google Play.",
    tools: ["React", "Next.js", "Flutter", "Firebase", "Supabase"],
    fill: "paper", span: "md:col-span-5", rotate: 1.5, nudge: -30, z: 4,
  },
  {
    Icon: BrainCircuit,
    title: "AI Integration & Automation",
    desc: "Custom AI chatbots, automated workflows, and AI-powered products that save time and unlock new capabilities. From Zapier automations to full AI product builds.",
    tools: ["AI Chatbots", "Zapier", "Make", "OpenAI"],
    fill: "mint", span: "md:col-span-7", rotate: -2.3, nudge: 12, z: 3,
  },
  {
    Icon: Gauge,
    title: "Data & Analytics",
    desc: "GA4 setup, Google Tag Manager, conversion tracking, and Looker Studio dashboards. Full tracking infrastructure that turns raw data into actionable growth insights.",
    tools: ["GA4", "GTM", "Looker Studio", "Search Console"],
    fill: "paper", span: "md:col-span-6", rotate: 1.7, nudge: -22, z: 2,
  },
  {
    Icon: Compass,
    title: "Full-Stack Digital Strategy",
    desc: "End-to-end from idea to live product, connecting marketing, product, and technology into one cohesive plan. Strategy, build, launch, grow. All under one roof.",
    tools: ["Strategy", "Branding", "UX", "Growth"],
    fill: "mint", span: "md:col-span-6", rotate: -1.4, nudge: 26, z: 1,
  },
];

/* The outline is per-variant now. On the dark ground the two fills are a
   bright mint sticker and a black one, and a single ink outline would have
   disappeared into the black card entirely. */
const INK = "#04323A";
const MINT = "#CFF7EE";

/* Chips get the same retro outline and hard shadow as the cards, tilted so a
   row of them reads as scattered stickers rather than a tidy tag list. The
   angles cycle from a fixed list rather than Math.random() — random tilts
   would differ between the server render and the client and break hydration. */
const CHIP_TILTS = [-3, 2.2, -1.4, 3, -2.4];
/* Two fills that genuinely differ: a bright mint sticker and a black one.
   On the old white ground the pair was mint and near-white, which read as one
   fill with a rounding error. Each variant carries its own outline, type and
   chip colours so both stay legible. */
const fills: Record<Fill, {
  bg: string; title: string; body: string; outline: string; chipBg: string; chipFg: string; icon: string;
}> = {
  mint: {
    bg: MINT, title: INK, body: "rgba(4,50,58,0.70)",
    outline: "#004D5A", chipBg: "#FFFFFF", chipFg: INK, icon: "#004D5A",
  },
  paper: {
    bg: "#FFFFFF", title: INK, body: "#4E717A",
    outline: "#004D5A", chipBg: MINT, chipFg: INK, icon: "#004D5A",
  },
};

function ServiceSticker({ service }: { service: ServiceItem }) {
  const f = fills[service.fill];

  return (
    <article
      className="service-sticker relative rounded-[20px] p-7 md:p-8 h-full opacity-0"
      data-rotate={service.rotate}
      style={{
        background: f.bg,
        border: `2px solid ${f.outline}`,

        zIndex: service.z,
      }}
    >
      <div className="flex flex-col h-full">
        <div
          className="rounded-[13px] flex items-center justify-center mb-5 w-12 h-12"
          style={{ background: f.chipBg, border: `2px solid ${f.outline}` }}
        >
          <service.Icon size={21} strokeWidth={1.9} style={{ color: f.icon }} />
        </div>

        <h3
          className="heading mb-3"
          style={{ color: f.title, fontSize: "1.35rem", lineHeight: 1.22, letterSpacing: "-0.01em" }}
        >
          {service.title}
        </h3>

        <p className="mb-6" style={{ color: f.body, fontSize: "0.9375rem", lineHeight: 1.68, maxWidth: "50ch" }}>
          {service.desc}
        </p>

        <div className="flex flex-wrap gap-2.5 mt-auto">
          {service.tools.map((t, i) => (
            <span
              key={t}
              className="service-chip rounded-full font-bold"
              style={{
                background: f.chipBg,
                color: f.chipFg,
                border: `1.5px solid ${f.outline}`,

                transform: `rotate(${CHIP_TILTS[i % CHIP_TILTS.length]}deg)`,
                fontSize: "0.6875rem",
                padding: "5px 12px",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".services-header",
        { y: 32, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        }
      );

      /* Stickers drop in and settle onto their resting tilt. That drop is
         the section's only motion — there is no hover state to hand off to. */
      const cards = gsap.utils.toArray<HTMLElement>(".service-sticker");
      cards.forEach((card, i) => {
        const rest = Number(card.dataset.rotate ?? 0);
        gsap.fromTo(
          card,
          { y: 46, opacity: 0, rotate: 0 },
          {
            y: 0, opacity: 1, rotate: rest,
            duration: 0.7, delay: i * 0.09, ease: "back.out(1.4)",
            scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" style={{ background: "#0A0A0A", padding: "100px 0 120px" }}>
      <div className="services-header text-center px-6 mb-14 opacity-0">
        <p className="script text-xl md:text-2xl mb-3" style={{ color: MINT }}>Services</p>
        <h2 className="heading text-3xl md:text-4xl" style={{ color: "#fff" }}>What I Do Best</h2>
      </div>

      {/* 12-column bed. Width comes from the span, the dropped look from the
          per-card nudge — both collapse to a plain stack under md. */}
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-stretch">
          {services.map(service => (
            <div
              key={service.title}
              className={`${service.span} service-sticker-slot`}
              /* Only the variable is set inline — the margin itself is applied
                 in the stylesheet so the md breakpoint can zero it out. An
                 inline margin-top would outrank the mobile reset. */
              style={{ "--nudge": `${service.nudge}px` } as React.CSSProperties}
            >
              <ServiceSticker service={service} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .service-sticker-slot { margin-top: 0; }
        @media (min-width: 768px) {
          .service-sticker-slot { margin-top: var(--nudge, 0px); }
        }
        /* No hover motion: the cards and chips stay exactly where they land.
           The entrance drop is the only movement in the section. */
        .service-sticker { will-change: transform; }
      `}</style>
    </section>
  );
}

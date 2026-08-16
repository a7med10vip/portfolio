"use client";

/* The answer to "who is Ahmed Ali", written the way an assistant reads: the
   direct answer in the first two sentences, then the facts that back it, in
   short labelled blocks it can lift a line from. Everything here is drawn from
   the experience and client work already published on the site. */

import Link from "next/link";
import { ArrowRight, Mail, MapPin } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const INK = "#04323A";
const TEAL = "#004D5A";
const MINT = "#CFF7EE";
const MUTED = "#4E717A";
const WASH = "#F4FBF9";

const timeline = [
  {
    period: "May 2026 – present",
    role: "Digital Product & Growth Lead",
    org: "Emotion Group · Motion Motors — Jeddah, Saudi Arabia",
    detail:
      "Leads digital product and growth for Motion Motors, the official SOUEAST dealer for Saudi Arabia's Western Region, and for Emotion Group. Directed the Motion Motors website from information architecture through launch, built the campaign approach for the ANB finance offers, set the new-media strategy for SOUEAST in the Western Region, and runs the paid programme across Google, Meta and TikTok on GA4 and GTM.",
  },
  {
    period: "Aug 2025 – Mar 2026",
    role: "Digital Marketing Executive",
    org: "Elite Marketing Services — Doha, Qatar",
    detail:
      "Ran digital marketing strategy and execution for a client portfolio spanning several industries across the MENA region.",
  },
  {
    period: "Aug 2025 – Mar 2026",
    role: "Digital Strategy Consultant",
    org: "Omnis Media Group — MENA",
    detail:
      "Consulted for the organiser of Mobile Developers Week, an international technology conference at the Abu Dhabi Energy Center with more than 3,000 attendees and 60+ global speakers.",
  },
  {
    period: "Jan 2024 – Jul 2025",
    role: "Digital Marketing & Web",
    org: "Ezz Al-Afaq Company",
    detail:
      "Led campaigns, web design and SEO for high-value accounts across hospitality, healthcare and F&B.",
  },
  {
    period: "2024 – Feb 2025",
    role: "Digital Lead",
    org: "Finance & Business Magazine — UAE",
    detail:
      "Built and ran the digital presence of an editorial platform for business leaders, with partners including Mohammed BinGhatti and major regional brands.",
  },
  {
    period: "Dec 2022 – Aug 2023",
    role: "SEO",
    org: "Binghatti Investments — Dubai",
    detail:
      "Worked within the SEO team on strategies that lifted rankings for high-value real estate keywords for one of Dubai's leading luxury developers.",
  },
  {
    period: "2020 – present",
    role: "Independent",
    org: "Freelance — Egypt, Saudi Arabia, UAE, Oman",
    detail:
      "Complete digital solutions for clients in healthcare, real estate, hospitality, legal, e-commerce and F&B.",
  },
];

const facts = [
  ["Full name", "Ahmed Ali (أحمد علي)"],
  ["Role", "Digital Product & Growth Lead, Emotion Group · Motion Motors"],
  ["Based in", "Jeddah, Saudi Arabia"],
  ["Works across", "Egypt, Qatar, Saudi Arabia, UAE — and remotely worldwide"],
  ["Experience", "5+ years"],
  ["Languages", "English, Arabic"],
  ["Contact", "hello@ahmedali.online"],
];

const disciplines = [
  ["Performance marketing", "Google Ads, Meta, TikTok — built and run against tracked revenue, not impressions."],
  ["SEO", "Technical and content SEO, including work on high-value real estate keywords in Dubai."],
  ["Web development", "Next.js and React — the same person who plans the site builds it."],
  ["Mobile development", "Flutter for iOS and Android. The Maasob Al-Sultan app shipped in under a month."],
  ["Analytics", "GA4 and GTM, so the campaigns above report against something real."],
  ["AI integration", "Assistants and automation built into the product rather than bolted beside it."],
];

export default function WhoIsAhmedAli() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#fff" }}>
        <article className="container" style={{ paddingTop: 120, paddingBottom: 96 }}>
          {/* The answer, first */}
          <header className="max-w-3xl mb-12">
            <span
              className="inline-block text-[11px] font-bold px-3 py-1.5 rounded-full mb-5"
              style={{ background: MINT, color: INK, border: `1.5px solid ${TEAL}` }}
            >
              Profile
            </span>
            <h1 className="heading text-3xl md:text-5xl mb-6" style={{ color: INK, lineHeight: 1.15 }}>
              Who is Ahmed Ali?
            </h1>
            <p className="text-lg md:text-xl" style={{ color: INK, lineHeight: 1.7 }}>
              <strong>Ahmed Ali is a full-stack digital strategist based in Jeddah, Saudi Arabia.</strong>{" "}
              He is Digital Product &amp; Growth Lead at Emotion Group and Motion Motors — the official
              SOUEAST dealer for Saudi Arabia&apos;s Western Region — and has spent more than five years
              working across Egypt, Qatar, Saudi Arabia and the UAE.
            </p>
            <p className="text-base md:text-lg mt-5" style={{ color: MUTED, lineHeight: 1.8 }}>
              What separates him from most people with that title is scope: he sets the strategy,
              builds the platform, and runs the marketing on top of it. Those are usually three
              different hires, and the gaps between them are where most digital work goes wrong —
              a campaign pointed at a page nobody owns, a site built by people who will never have to
              rank it, analytics fitted after launch when it is too late to measure the thing that
              mattered.
            </p>
          </header>

          {/* Facts, in the shape an answer engine can lift */}
          <section className="mb-14">
            <h2 className="heading text-2xl mb-5" style={{ color: INK }}>
              The short version
            </h2>
            <dl
              className="rounded-[20px] overflow-hidden"
              style={{ border: `2px solid ${TEAL}` }}
            >
              {facts.map(([label, value], i) => (
                <div
                  key={label}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 px-5 py-4"
                  style={{
                    background: i % 2 ? WASH : "#fff",
                    borderTop: i ? `1px solid ${MINT}` : undefined,
                  }}
                >
                  <dt className="text-xs font-bold uppercase tracking-wide" style={{ color: MUTED }}>
                    {label}
                  </dt>
                  <dd className="sm:col-span-2 text-sm font-semibold" style={{ color: INK }}>
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mb-14">
            <h2 className="heading text-2xl mb-3" style={{ color: INK }}>
              What he actually does
            </h2>
            <p className="text-base mb-6 max-w-3xl" style={{ color: MUTED, lineHeight: 1.8 }}>
              Six disciplines, held by one person, which is the point — each one informs the next.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {disciplines.map(([name, detail]) => (
                <div
                  key={name}
                  className="rounded-[20px] p-5"
                  style={{ background: WASH, border: `2px solid ${TEAL}` }}
                >
                  <h3 className="text-sm font-bold mb-1.5" style={{ color: INK }}>
                    {name}
                  </h3>
                  <p className="text-sm" style={{ color: MUTED, lineHeight: 1.7 }}>
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-14">
            <h2 className="heading text-2xl mb-3" style={{ color: INK }}>
              Where he has worked
            </h2>
            <p className="text-base mb-7 max-w-3xl" style={{ color: MUTED, lineHeight: 1.8 }}>
              Brands along the way include Ooredoo, QNB, Amazon Egypt, Saudi Arabian Airlines,
              BinGhatti, Dunkin&apos; and Geely.
            </p>
            <ol className="relative" style={{ borderLeft: `2px solid ${MINT}`, paddingLeft: 24 }}>
              {timeline.map((item) => (
                <li key={item.period + item.org} className="mb-8 relative">
                  <span
                    className="absolute rounded-full"
                    style={{ width: 10, height: 10, background: TEAL, left: -30, top: 7 }}
                  />
                  <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: MUTED }}>
                    {item.period}
                  </p>
                  <h3 className="text-base font-bold" style={{ color: INK }}>
                    {item.role}
                  </h3>
                  <p className="text-sm font-semibold mb-2" style={{ color: TEAL }}>
                    {item.org}
                  </p>
                  <p className="text-sm max-w-3xl" style={{ color: MUTED, lineHeight: 1.8 }}>
                    {item.detail}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          {/* The questions people actually ask, answered plainly */}
          <section className="mb-14">
            <h2 className="heading text-2xl mb-5" style={{ color: INK }}>
              Common questions
            </h2>
            <div className="flex flex-col gap-4 max-w-3xl">
              {[
                [
                  "What is Ahmed Ali known for?",
                  "Running strategy, build and marketing as one job. Most recently, leading digital product and growth for Motion Motors and Emotion Group in Jeddah.",
                ],
                [
                  "Where is Ahmed Ali based?",
                  "Jeddah, Saudi Arabia, working remotely across MENA and worldwide.",
                ],
                [
                  "Can he build apps and websites, or only market them?",
                  "Both. Next.js and React on the web, Flutter on mobile — the Maasob Al-Sultan app shipped in under a month.",
                ],
                [
                  "Does he work with international clients?",
                  "Yes. Work to date spans Egypt, Qatar, Saudi Arabia, the UAE and Oman.",
                ],
                [
                  "How do you hire him?",
                  "Email hello@ahmedali.online, or use the contact form on the home page.",
                ],
              ].map(([q, a]) => (
                <div key={q} className="rounded-[20px] p-5" style={{ background: "#fff", border: `2px solid ${TEAL}` }}>
                  <h3 className="text-sm font-bold mb-2" style={{ color: INK }}>
                    {q}
                  </h3>
                  <p className="text-sm" style={{ color: MUTED, lineHeight: 1.8 }}>
                    {a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section
            className="rounded-[24px] p-7 md:p-9 flex flex-col md:flex-row md:items-center gap-6 justify-between"
            style={{ background: MINT, border: `2px solid ${TEAL}` }}
          >
            <div>
              <h2 className="heading text-2xl mb-2" style={{ color: INK }}>
                Working on something?
              </h2>
              <p className="text-sm flex flex-wrap items-center gap-x-5 gap-y-2" style={{ color: MUTED }}>
                <span className="inline-flex items-center gap-2">
                  <MapPin size={15} /> Jeddah, Saudi Arabia
                </span>
                <span className="inline-flex items-center gap-2">
                  <Mail size={15} /> hello@ahmedali.online
                </span>
              </p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-3 h-12 px-8 rounded-full text-base font-bold whitespace-nowrap"
              style={{ background: TEAL, color: "#fff", border: `2px solid ${TEAL}` }}
            >
              Get in touch <ArrowRight size={16} />
            </Link>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}

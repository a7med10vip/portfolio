"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { APPS, FIGURES, PERMISSIONS, ROLES } from "./data";
import { G, D, LINE, RULE, MONO, tc } from "@/components/soueast-delivery/theme";
import Shot from "@/components/soueast-delivery/Shot";
import DeliveryNav from "@/components/soueast-delivery/DeliveryNav";
import Btn from "@/components/soueast-delivery/Btn";
import Stack from "@/components/soueast-delivery/Stack";
import BrandBand from "@/components/soueast-delivery/BrandBand";
import CarSpin from "@/components/soueast-delivery/CarSpin";
import SystemMap from "@/components/soueast-delivery/SystemMap";
import RouteAtlas from "@/components/soueast-delivery/RouteAtlas";
import BuyJourney from "@/components/soueast-delivery/BuyJourney";
import PermissionMatrix from "@/components/soueast-delivery/PermissionMatrix";
import SchemaWall from "@/components/soueast-delivery/SchemaWall";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════════════════
   Motion Motors × Soueast, the delivery document.

   Everything stated here is either counted from the repository at commit
   f92ea59 or quoted verbatim from it. Where a figure could only come from the
   production database it says so beside itself.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Page() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (calm) {
        gsap.set(".sd-hero, .sd-slide, .sd-item", { opacity: 1, y: 0, scale: 1 });
        gsap.set(".sd-edge", { strokeDashoffset: 0 });
        return;
      }

      gsap.fromTo(".sd-hero",
        { y: 42, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.15, stagger: 0.1, ease: "power4.out", delay: 0.25 });

      gsap.utils.toArray<HTMLElement>(".sd-slide").forEach((el) => {
        gsap.fromTo(el,
          { y: 64, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.95, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true } });
      });

      gsap.utils.toArray<HTMLElement>(".sd-stagger").forEach((el) => {
        gsap.fromTo(el.querySelectorAll(".sd-item"),
          { y: 34, opacity: 0, scale: 0.975 },
          { y: 0, opacity: 1, scale: 1, duration: 0.62, stagger: 0.07, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 84%", once: true } });
      });

      /* The architecture edges draw themselves as the diagram is read, rather
         than arriving finished, the order they draw in is the order the
         paragraph beside them makes its argument. */
      gsap.to(".sd-edge", {
        strokeDashoffset: 0,
        duration: 1.1,
        stagger: 0.14,
        ease: "power2.inOut",
        scrollTrigger: { trigger: "#s03", start: "top 62%", once: true },
      });

      /* The hero car drifts a little slower than the page, which is the whole
         parallax budget for this document. */
      gsap.to(".sd-parallax", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: "#top", start: "top top", end: "bottom top", scrub: 0.5 },
      });

      gsap.utils.toArray<HTMLElement>(".sd-count").forEach((el) => {
        const to = Number(el.dataset.to ?? 0);
        const o = { v: 0 };
        gsap.to(o, {
          v: to, duration: 1.5, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString("en-US"); },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} style={{ background: "#fff", color: D, overflowX: "hidden" }}>
      <DeliveryNav />

      {/* ══ HERO ═══════════════════════════════════════════════════════════ */}
      <section id="top" className="relative" style={{ padding: "74px 24px 64px" }}>
        <div className="max-w-6xl mx-auto">
          <div className="sd-hero opacity-0 flex flex-wrap items-center justify-center gap-4 sm:gap-5 mb-8">
            <img src="/soueast-delivery/brand/motion-motors-logo-en.png" alt="Motion Motors"
                 style={{ width: "min(184px, 38vw)", height: "auto" }} />
            <span style={{ width: 1, height: 24, background: LINE }} />
            <img src="/soueast-delivery/brand/soueast-wordmark-brand.png" alt="Soueast"
                 style={{ width: "min(168px, 34vw)", height: "auto" }} />
          </div>

          <p className="sd-hero opacity-0 text-center text-[11px] font-bold mb-5" style={{ color: G }}>
            DELIVERY · JEDDAH, WESTERN REGION · 24 AUGUST 2026
          </p>

          <h1
            className="sd-hero opacity-0 heading text-center mx-auto"
            style={{ fontSize: "clamp(40px, 8.2vw, 94px)", lineHeight: 1.16, color: D, maxWidth: 1000 }}
          >
            Four Applications.
            <br />
            <span style={{ color: G }}>One Database.</span>
          </h1>

          <p
            className="sd-hero opacity-0 text-center mx-auto mt-8 text-[15px] leading-relaxed"
            style={{ color: D, maxWidth: 620 }}
          >
            The public showroom, the tool the floor uses, the event system and the dashboard
            everything reports into, built over one Supabase project, so that a car reserved on the
            website is gone from the salesperson&apos;s list in the same second.
          </p>

          {/* the car */}
          <div className="sd-hero opacity-0 relative mt-6">
            <img
              className="sd-parallax mx-auto block"
              src="/soueast-delivery/spin/poster-s09.webp"
              alt="Soueast S09 in Mountain Green"
              width={1400}
              height={605}
              fetchPriority="high"
              style={{ width: "min(100%, 940px)", height: "auto" }}
            />
          </div>

          {/* hosts: what it is, then the door to it */}
          <div className="sd-hero opacity-0 flex flex-wrap items-start justify-center gap-x-4 gap-y-6 mt-16 mb-12">
            {APPS.filter((a) => a.key !== "ops").map((a) => (
              <div key={a.key} className="flex flex-col items-center gap-2">
                <span
                  className="text-[9.5px] font-bold px-3 py-1.5 rounded-full"
                  style={{ background: G, color: "#fff" }}
                >
                  {tc(a.name).toUpperCase()}
                </span>
                <Btn href={a.href} small>
                  {a.host}
                </Btn>
              </div>
            ))}
          </div>

          {/* the stat strip, the sibling decks' idiom, carried over */}
          <div
            className="sd-hero opacity-0 flex items-stretch justify-center max-w-3xl mx-auto"
            style={{ background: "#fff", border: `1px solid ${LINE}`, borderRadius: 16, overflow: "hidden" }}
          >
            {(["pages", "tables", "functions", "commits"] as const).map((k, i) => (
              <div
                key={k}
                className="flex-1 flex flex-col items-center justify-center py-5 px-2 relative"
                style={{ borderRight: i < 3 ? `1px solid ${RULE}` : "none" }}
              >
                <span className="heading tabular-nums sd-count" data-to={FIGURES[k].value} style={{ fontSize: 24, lineHeight: 1, color: D }}>
                  0
                </span>
                <span className="text-[9.5px] font-bold mt-1.5 text-center" style={{ color: D }}>
                  {FIGURES[k].label.toUpperCase()}
                </span>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-t-full" style={{ background: G }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <BrandBand />

      {/* ══ 01 · THE HANDOVER ══════════════════════════════════════════════ */}
      <Section id="s01" n="01" title="The" accent="handover">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-[16px] leading-relaxed" style={{ color: D }}>
            This document describes a system that is finished and running. Everything in it was
            checked against the repository or the live database on the day it was written, not
            recalled. Where a number could only come from production, it says so where it stands.
          </p>
        </div>
        <div
          className="sd-item max-w-5xl mx-auto rounded-[22px] overflow-hidden"
          style={{ border: `1px solid ${LINE}` }}
        >
          {/* the masthead */}
          <div
            className="flex items-center justify-between px-7 md:px-9"
            style={{ height: 54, background: G }}
          >
            <span className="flex items-center gap-3">
              <svg width="13" height="16" viewBox="0 0 100 125" aria-hidden>
                <rect width="100" height="27" fill="#fff" />
                <rect y="49" width="100" height="27" fill="#fff" />
                <rect y="98" width="100" height="27" fill="#fff" />
              </svg>
              <span className="text-[10px] font-bold" style={{ color: "#fff" }}>
                DELIVERY DOCUMENT
              </span>
            </span>
            <span className="text-[10px] font-bold" style={{ color: "#fff" }}>
              MOTION MOTORS × SOUEAST
            </span>
          </div>

          <div className="grid md:grid-cols-3">
            <div className="px-7 md:px-9 py-9 md:py-11" style={{ borderRight: `1px solid ${RULE}` }}>
              <p className="text-[9.5px] font-bold mb-5" style={{ color: G }}>
                PREPARED BY
              </p>
              <p className="heading text-[27px] mb-3" style={{ color: D, lineHeight: 1.15 }}>
                Ahmed Ali
              </p>
              <p className="text-[12.5px] leading-relaxed" style={{ color: D }}>
                Head of Digital Product and Growth
                <br />
                Emotion Group
              </p>
            </div>

            <div className="px-7 md:px-9 py-9 md:py-11" style={{ borderRight: `1px solid ${RULE}` }}>
              <p className="text-[9.5px] font-bold mb-5" style={{ color: G }}>
                PRESENTED TO
              </p>
              <p className="heading text-[27px] mb-3" style={{ color: D, lineHeight: 1.15 }}>
                Motion Motors
              </p>
              <p className="text-[12.5px] leading-relaxed" style={{ color: D }}>
                Management, Western Region
                <br />
                Soueast, Jeddah
              </p>
            </div>

            <div className="px-7 md:px-9 py-9 md:py-11">
              <p className="text-[9.5px] font-bold mb-5" style={{ color: G }}>
                PERIOD
              </p>
              <p className="heading text-[27px] mb-4" style={{ color: D, lineHeight: 1.15 }}>
                5 Jun → 24 Aug
              </p>
              <div className="flex gap-6">
                {[
                  { n: "80", l: "DAYS" },
                  { n: "172", l: "COMMITS" },
                  { n: "Live", l: "STATUS" },
                ].map((x) => (
                  <span key={x.l} className="block">
                    <span className="heading block text-[19px]" style={{ color: G, lineHeight: 1 }}>
                      {x.n}
                    </span>
                    <span className="block text-[9px] font-bold mt-1.5" style={{ color: D }}>
                      {x.l}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ══ 02 · WHERE IT RUNS ═════════════════════════════════════════════ */}
      <section id="s02" className="sd-slide opacity-0" style={{ padding: "40px 0 100px" }}>
        <div className="relative">
          <img
            src="/soueast-delivery/exterior.webp"
            alt="The Motion Motors showroom, Jeddah"
            loading="lazy"
            decoding="async"
            width={2400}
            height={1600}
            style={{ width: "100%", height: "min(58vh, 520px)", objectFit: "cover", display: "block" }}
          />
          <div
            className="absolute inset-0 flex items-end"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,.9) 0%, rgba(0,0,0,.62) 38%, rgba(0,0,0,.28) 72%, rgba(0,0,0,.12) 100%)" }}
          >
            <div className="px-6 md:px-14 pb-10 max-w-3xl">
              <p className="text-[10px] font-bold mb-2" style={{ color: "#fff" }}>
                WHERE IT RUNS
              </p>
              <h3 className="heading" style={{ fontSize: "clamp(24px, 4vw, 40px)", color: "#fff", lineHeight: 1.24 }}>
                One Showroom In Jeddah And Everything That Reaches It.
              </h3>
              <p className="text-[13px] mt-3" style={{ color: "#fff" }}>
                Not a product for sale to other dealerships. One dealership, which is what removes
                multi-tenancy, billing, plan tiers and most of what would otherwise have taken the year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 03 · THE SYSTEM ════════════════════════════════════════════════ */}
      <Section id="s03" n="03" title="The" accent="system">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-[15px] leading-relaxed" style={{ color: D }}>
            Three codebases, four hosts, one Postgres. The website is deployed a second time with a
            single environment variable set and that second deployment is the showroom tool, the
            floor and the shopfront cannot drift apart, because they are the same build.
          </p>
        </div>
        <SystemMap />
      </Section>

      <BrandBand />

      {/* ══ 04 · THE FOUR APPLICATIONS ═════════════════════════════════════ */}
      <Section id="s04" n="04" title="The four" accent="applications">
        <div className="space-y-24">
          {APPS.map((a, i) => (
            <div key={a.key} className="sd-slide opacity-0 grid gap-10 lg:grid-cols-2 items-center">
              <div className={i % 2 ? "lg:order-2" : ""}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="heading text-[13px]" style={{ color: G }}>
                    {a.n}
                  </span>
                  <span style={{ width: 26, height: 1, background: `${G}50` }} />
                  <span className="text-[10px] font-bold" style={{ color: D }}>
                    {a.audience.toUpperCase()}
                  </span>
                </div>
                <h3 className="heading text-3xl md:text-4xl mb-3" style={{ color: D, lineHeight: 1.18 }}>
                  {tc(a.name)}
                </h3>
                <div className="mb-6">
                  <Btn href={a.href} small>
                    {a.host}
                  </Btn>
                </div>
                <p className="text-[14px] leading-relaxed mb-6" style={{ color: D }}>
                  {a.blurb}
                </p>
                <ul className="space-y-2.5 mb-6">
                  {a.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[13px] leading-relaxed" style={{ color: D }}>
                      <span style={{ color: G, marginTop: 7, width: 12, height: 2, background: G, flexShrink: 0 }} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-4" style={{ borderTop: `1px solid ${RULE}` }}>
                  <span className="text-[11px]" style={{ color: D }}>
                    <span className="heading" style={{ color: D, fontSize: 15 }}>
                      {a.pages}
                    </span>{" "}
                    {a.pages === 1 ? "screen" : "screens"}
                  </span>
                  <span className="text-[10.5px]" style={{ color: D, fontFamily: MONO }}>
                    {a.stack}
                  </span>
                </div>
              </div>
              <div className={i % 2 ? "lg:order-1" : ""}>
                <Shot name={a.shot!} host={a.host} caption={a.shotCaption} />
                {a.gated && (
                  <p className="text-[11px] mt-3" style={{ color: D }}>
                    {a.gated}, this is as far as a stranger gets and the shot is honest about that.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* the phones */}
        <div className="sd-stagger grid grid-cols-2 md:grid-cols-4 gap-6 mt-24">
          {[
            { n: "site-ar-home-mobile", c: "The site, Arabic, on a phone" },
            { n: "site-en-store-mobile", c: "The shop" },
            { n: "ops-ar-lead-mobile", c: "The stand's own form" },
            { n: "site-ar-park-mobile", c: "Park at Home, the camera page" },
          ].map((s) => (
            <div key={s.n} className="sd-item">
              <Shot name={s.n} caption={s.c} mobile />
            </div>
          ))}
        </div>
      </Section>

      <BrandBand />

      {/* ══ 05 · THE SPIN ══════════════════════════════════════════════════ */}
      <section id="s05" className="sd-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-6xl mx-auto">
          <SH n="05" title="Seventy-two" accent="frames" />
          <div className="max-w-2xl mx-auto text-center mb-10">
            <p className="text-[15px] leading-relaxed" style={{ color: D }}>
              This is not a picture of the product. It is the product, the same turntable the
              showroom tablet plays, pulled from the same storage, at the same frame rate. Drag it.
            </p>
          </div>
          <CarSpin />
          <div className="grid gap-5 md:grid-cols-3 max-w-4xl mx-auto mt-16 sd-stagger">
            {[
              {
                h: "Stills, not a 3D model",
                b: "The factory ships them per paint colour, they look exactly like the brochure and a phone on the floor can play them without a WebGL context.",
              },
              {
                h: "Two resolutions",
                b: "The small tier loads first so the car can be turned almost immediately; the large one replaces it in place, sharing a frame index so nothing jumps.",
              },
              {
                h: "75 MB per colour",
                b: "Which is why they are served from storage rather than committed. Adding a car is not a git commit measured in gigabytes.",
              },
            ].map((c) => (
              <div key={c.h} className="sd-item rounded-[16px] p-5" style={{ border: `1px solid ${LINE}`, background: "#fff" }}>
                <p className="heading text-[15px] mb-2" style={{ color: D }}>
                  {c.h}
                </p>
                <p className="text-[12.5px] leading-relaxed" style={{ color: D }}>
                  {c.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BrandBand />

      {/* ══ 06 · THE ROUTE ATLAS ═══════════════════════════════════════════ */}
      <Section id="s06" n="06" title="The route" accent="atlas">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-[15px] leading-relaxed" style={{ color: D }}>
            Seventy-two pages is a number that proves nothing on its own, thirty screens could be
            thirty variations of one. Here they are, grouped by the question each one answers.
          </p>
        </div>
        <RouteAtlas />
      </Section>

      <BrandBand />

      {/* ══ 07 · BUYING A CAR ══════════════════════════════════════════════ */}
      <section id="s07" style={{ background: "#fff" }}>
        <div className="sd-slide opacity-0" style={{ padding: "100px 24px 40px" }}>
          <div className="max-w-6xl mx-auto">
            <SH n="07" title="When somebody" accent="buys a car" />
            <p className="text-center text-[15px] leading-relaxed max-w-2xl mx-auto" style={{ color: D }}>
              The reason the four applications share one database rather than talking to each other.
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6" style={{ paddingBottom: 100 }}>
          <BuyJourney />
        </div>
      </section>

      <BrandBand />

      {/* ══ 08 · ONE DATABASE ══════════════════════════════════════════════ */}
      <Section id="s08" n="08" title="One" accent="database">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-[15px] leading-relaxed" style={{ color: D }}>
            Forty-five tables, every one with row-level security enabled. Who may read what is decided
            in the database, not in the application that asks, so a stale phone in a pocket cannot
            break a rule that a screen was enforcing.
          </p>
        </div>
        <SchemaWall />
      </Section>

      <BrandBand />

      {/* ══ 09 · PERMISSIONS ═══════════════════════════════════════════════ */}
      <section id="s09" className="sd-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <SH n="09" title="Who may" accent="do what" />
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-[15px] leading-relaxed" style={{ color: D }}>
              {PERMISSIONS.length} permissions across {ROLES.length}{" "}roles. Flat, not hierarchical,
              a person holds several roles and their permissions are the union, because &ldquo;is a
              manager above a finance officer&rdquo; has no answer and &ldquo;who may approve
              finance&rdquo; has exactly one.
            </p>
          </div>
          <PermissionMatrix />
        </div>
      </section>

      <BrandBand />

      {/* ══ COLOPHON ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: "40px 24px 90px" }}>
        <div
          className="sd-slide opacity-0 max-w-5xl mx-auto rounded-[24px] p-8 md:p-14 text-center"
          style={{ border: `1px solid ${LINE}` }}
        >
          <div className="flex items-center justify-center gap-5 mb-8">
            <img src="/soueast-delivery/brand/motion-motors-logo-en.png" alt="Motion Motors"
                 style={{ width: "min(160px, 36vw)", height: "auto" }} />
            <span style={{ width: 1, height: 22, background: LINE }} />
            <img src="/soueast-delivery/brand/soueast-wordmark-brand.png" alt="Soueast"
                 style={{ width: "min(146px, 32vw)", height: "auto" }} />
          </div>

          <p className="text-[11px] font-bold mb-6" style={{ color: G }}>
            BUILT WITH
          </p>
          <div className="mb-10">
            <Stack />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <Btn href="https://wa.me/201011648156" fill>
              WhatsApp
            </Btn>
            <Btn href="mailto:ahmed.ali@emotiongrp.com">ahmed.ali@emotiongrp.com</Btn>
          </div>

          <p className="text-[10px]" style={{ color: D }}>
            © 2026 Motion Motors · Soueast Western Region
          </p>
        </div>
      </section>
    </div>
  );
}

/* ── the section shell the sibling decks established ────────────────────── */

function SH({ n, title, accent }: { n: string; title: string; accent: string }) {
  return (
    <div className="text-center mb-12">
      <p className="heading text-[17px] mb-3" style={{ color: G }}>
        Section {n}
      </p>
      <h2 className="heading text-4xl md:text-5xl mb-4" style={{ color: D, lineHeight: 1.2 }}>
        {tc(title)} <span style={{ color: G }}>{tc(accent)}</span>
      </h2>
      <div className="flex items-center justify-center gap-1 mt-5">
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ width: 22, height: 3, background: G, opacity: 1 - i * 0.3 }} />
        ))}
      </div>
    </div>
  );
}

function Section({
  id, n, title, accent, children,
}: {
  id: string; n: string; title: string; accent: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="sd-slide opacity-0" style={{ padding: "100px 24px", background: "#fff" }}>
      <div className="max-w-6xl mx-auto">
        <SH n={n} title={title} accent={accent} />
        {children}
      </div>
    </section>
  );
}

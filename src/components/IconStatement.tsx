"use client";

/**
 * Icon-convergence pinned scroll story — ported from the Vertex Integra site's
 * IconConvergence section, rebuilt on Ahmed's copy and palette.
 *
 * The pinned sequence: the header fades and rises, three star ornaments rise
 * from the bottom rail, converge on centre and scale down to header size while
 * the ground flips from ink to white, then duplicate into placeholder slots
 * inside a large statement whose segments fade in one at a time.
 *
 * Reduced motion gets the finished statement on white with no scroll-jack.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
/* eslint-disable @next/next/no-img-element */

gsap.registerPlugin(ScrollTrigger);

const INK = "#04323A";
const MINT = "#CFF7EE";
const TEAL = "#004D5A";

/* Ahmed's three coloured ornaments, shown as images rather than painted
   through a mask like the flat marquee stars. The white square each one
   shipped on has been cut away, so what is left is the shape itself — a
   colour fill with its own offset black shadow already drawn in, which is why
   it needs no tile and no CSS shadow behind it. */
const ICONS = [
  "/icons/ornament-purple.png",
  "/icons/ornament-red.png",
  "/icons/ornament-green.png",
];

/* The statement is split into segments so they can fade in independently, and
   the placeholders are the slots the icons fly into — three of them now, one
   per ornament. */
const SEGMENTS = [
  "I don't just build websites —",
  "I build growth systems",
  "across performance marketing,",
  "product development,",
  "and AI automation.",
  "Integrated. Measured. Shipped.",
];

export default function IconStatement() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scope = root.current;
      if (!scope) return;

      const animatedIcons = scope.querySelector<HTMLElement>(".ics-icons");
      const iconElements = scope.querySelectorAll<HTMLElement>(".ics-icon");
      const textSegments = scope.querySelectorAll<HTMLElement>(".ics-seg");
      const placeholders = scope.querySelectorAll<HTMLElement>(".ics-ph");
      const heroHeader = scope.querySelector<HTMLElement>(".ics-header");
      const heroSection = scope.querySelector<HTMLElement>(".ics-hero");
      if (!animatedIcons || !heroHeader || !heroSection) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        textSegments.forEach((s) => gsap.set(s, { opacity: 1 }));
        gsap.set(animatedIcons, { opacity: 0 });
        gsap.set(heroHeader, { opacity: 0 });
        heroSection.style.backgroundColor = "#ffffff";
        return;
      }

      let duplicateIcons: HTMLElement[] | null = null;

      /* The original shuffled the reveal order. On a sentence this long that
         reads as scrambled rather than assembled — the eye keeps jumping back
         to fill holes. Left to right instead, so it reads as it appears. */
      const order = Array.from(textSegments);

      /* Measure the slot rather than hard-coding 60/34: the placeholders are
         sized in `em`, so an ornament that lands at a fixed pixel size would
         sit wrong at any font size but one. */
      const isMobile = window.innerWidth <= 1000;
      const headerIconSize =
        placeholders[0]?.getBoundingClientRect().width || (isMobile ? 34 : 60);
      const currentIconSize = iconElements[0]?.getBoundingClientRect().width || 1;
      const exactScale = headerIconSize / currentIconSize;

      ScrollTrigger.create({
        trigger: heroSection,
        start: "top top",
        /* The original pinned for 8 viewport heights. Four is enough to read
           the whole sequence and costs the page half the scroll. */
        end: `+=${window.innerHeight * 4}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          textSegments.forEach((segment) => gsap.set(segment, { opacity: 0 }));

          if (progress <= 0.3) {
            const moveProgress = progress / 0.3;
            const containerMoveY = -window.innerHeight * 0.3 * moveProgress;

            if (progress <= 0.15) {
              const headerProgress = progress / 0.15;
              gsap.set(heroHeader, {
                transform: `translate(-50%, calc(-50% + ${-50 * headerProgress}px))`,
                opacity: 1 - headerProgress,
              });
            } else {
              gsap.set(heroHeader, { transform: "translate(-50%, calc(-50% + -50px))", opacity: 0 });
            }

            if (duplicateIcons) {
              duplicateIcons.forEach((d) => d.parentNode?.removeChild(d));
              duplicateIcons = null;
            }

            gsap.set(animatedIcons, { x: 0, y: containerMoveY, scale: 1, opacity: 1 });

            iconElements.forEach((icon, index) => {
              const staggerDelay = index * 0.1;
              const iconProgress = gsap.utils.mapRange(staggerDelay, staggerDelay + 0.5, 0, 1, moveProgress);
              const clamped = Math.max(0, Math.min(1, iconProgress));
              gsap.set(icon, { x: 0, y: -containerMoveY * (1 - clamped) });
            });
          } else if (progress <= 0.6) {
            const scaleProgress = (progress - 0.3) / 0.3;
            gsap.set(heroHeader, { transform: "translate(-50%, calc(-50% + -50px))", opacity: 0 });
            /* Ink, not the original's near-black — this is the one moment the
               site goes dark, and it goes dark in its own colour. The original
               snapped at the halfway point; interpolating across the whole
               convergence makes the ground bleach out under the ornaments
               instead of cutting. */
            heroSection.style.backgroundColor = gsap.utils.interpolate(
              MINT,
              "#ffffff",
              gsap.parseEase("power2.in")(scaleProgress)
            ) as string;

            if (duplicateIcons) {
              duplicateIcons.forEach((d) => d.parentNode?.removeChild(d));
              duplicateIcons = null;
            }

            const targetCenterX = window.innerWidth / 2;
            const targetCenterY = window.innerHeight / 2;
            const rect = animatedIcons.getBoundingClientRect();
            const deltaX = (targetCenterX - (rect.left + rect.width / 2)) * scaleProgress;
            const deltaY = (targetCenterY - (rect.top + rect.height / 2)) * scaleProgress;
            const baseY = -window.innerHeight * 0.3;
            const currentScale = 1 + (exactScale - 1) * scaleProgress;

            gsap.set(animatedIcons, { x: deltaX, y: baseY + deltaY, scale: currentScale, opacity: 1 });
            /* A full turn each on the way in, alternating direction. */
            iconElements.forEach((icon, i) =>
              gsap.set(icon, { x: 0, y: 0, rotate: (i % 2 ? -360 : 360) * scaleProgress })
            );
          } else if (progress <= 0.75) {
            const moveProgress = (progress - 0.6) / 0.15;
            gsap.set(heroHeader, { transform: "translate(-50%, calc(-50% + -50px))", opacity: 0 });
            heroSection.style.backgroundColor = "#ffffff";

            const targetCenterX = window.innerWidth / 2;
            const targetCenterY = window.innerHeight / 2;
            const rect = animatedIcons.getBoundingClientRect();
            const deltaX = targetCenterX - (rect.left + rect.width / 2);
            const deltaY = targetCenterY - (rect.top + rect.height / 2);
            const baseY = -window.innerHeight * 0.3;

            gsap.set(animatedIcons, { x: deltaX, y: baseY + deltaY, scale: exactScale, opacity: 0 });
            iconElements.forEach((icon) => gsap.set(icon, { x: 0, y: 0, rotate: 0 }));

            if (!duplicateIcons) {
              duplicateIcons = [];
              iconElements.forEach((icon) => {
                const d = icon.cloneNode(true) as HTMLElement;
                d.className = "ics-dup";
                d.style.position = "absolute";
                d.style.width = headerIconSize + "px";
                d.style.height = headerIconSize + "px";
                document.body.appendChild(d);
                duplicateIcons!.push(d);
              });
            }

            duplicateIcons.forEach((d, index) => {
              if (index >= placeholders.length) return;
              const ir = iconElements[index].getBoundingClientRect();
              const startX = ir.left + ir.width / 2 + window.scrollX;
              const startY = ir.top + ir.height / 2 + window.scrollY;
              const tr = placeholders[index].getBoundingClientRect();
              const tx = tr.left + tr.width / 2 + window.scrollX;
              const ty = tr.top + tr.height / 2 + window.scrollY;
              const moveX = tx - startX;
              const moveY = ty - startY;

              let curX = 0;
              let curY = 0;
              if (moveProgress <= 0.5) {
                curY = moveY * (moveProgress / 0.5);
              } else {
                curY = moveY;
                curX = moveX * ((moveProgress - 0.5) / 0.5);
              }
              d.style.left = startX + curX - headerIconSize / 2 + "px";
              d.style.top = startY + curY - headerIconSize / 2 + "px";
              d.style.opacity = "1";
              d.style.display = "flex";
            });
          } else {
            gsap.set(heroHeader, { transform: "translate(-50%, calc(-50% + -100px))", opacity: 0 });
            heroSection.style.backgroundColor = "#ffffff";
            gsap.set(animatedIcons, { opacity: 0 });

            if (duplicateIcons) {
              duplicateIcons.forEach((d, index) => {
                if (index >= placeholders.length) return;
                const tr = placeholders[index].getBoundingClientRect();
                const tx = tr.left + tr.width / 2 + window.scrollX;
                const ty = tr.top + tr.height / 2 + window.scrollY;
                d.style.left = tx - headerIconSize / 2 + "px";
                d.style.top = ty - headerIconSize / 2 + "px";
                d.style.opacity = "1";
                d.style.display = "flex";
              });
            }

            /* Each segment gets a window twice as long as its stagger, so the
               next one starts before the previous finishes and the sentence
               washes in instead of snapping segment by segment. The old timing
               packed all six into 0.75–0.915 and left the last 8% of the pin
               with nothing happening. */
            const STAGGER = 0.035;
            const WINDOW = 0.07;
            order.forEach((segment, i) => {
              const segStart = 0.76 + i * STAGGER;
              const raw = gsap.utils.mapRange(segStart, segStart + WINDOW, 0, 1, progress);
              const clamped = Math.max(0, Math.min(1, raw));
              gsap.set(segment, { opacity: gsap.parseEase("power2.out")(clamped) });
            });
          }
        },
      });

      return () => {
        duplicateIcons?.forEach((d) => d.parentNode?.removeChild(d));
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <style>{CSS}</style>
      <section className="ics-hero" id="statement">
        <div className="ics-header">
          <h2 className="ics-h heading">Building Products</h2>
          <p className="ics-p script">Growing Businesses.</p>
        </div>

        <div className="ics-icons">
          {ICONS.map((src) => (
            <div className="ics-icon" key={src}>
              <img src={src} alt="" />
            </div>
          ))}
        </div>

        <h2 className="ics-text heading">
          <span className="ics-ph" />
          <span className="ics-seg">{SEGMENTS[0]}</span>
          <span className="ics-seg">{SEGMENTS[1]}</span>
          <span className="ics-ph" />
          <span className="ics-seg">{SEGMENTS[2]}</span>
          <span className="ics-seg">{SEGMENTS[3]}</span>
          <span className="ics-ph" />
          <span className="ics-seg">{SEGMENTS[4]}</span>
          <span className="ics-seg">{SEGMENTS[5]}</span>
        </h2>
      </section>
    </div>
  );
}

const CSS = `
.ics-hero {
  position: relative;
  width: 100%;
  height: 100svh;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${MINT};
  color: ${INK};
  overflow: hidden;
}
.ics-header {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  will-change: transform, opacity;
}
.ics-h {
  font-size: clamp(2.6rem, 7vw, 6rem);
  line-height: 1.1;
  color: ${INK};
  letter-spacing: -0.02em;
}
.ics-p {
  font-size: clamp(1.15rem, 2.4vw, 2rem);
  color: ${TEAL};
}
.ics-icons {
  position: fixed;
  bottom: 1.5rem;
  left: 1.5rem;
  right: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  will-change: transform;
  z-index: 2;
}
/* Fixed width, not flex:1 — with only three tiles, filling the rail would
   make each one a third of the viewport wide. */
.ics-icon {
  flex: 0 0 clamp(150px, 24vw, 320px);
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  will-change: transform;
}
.ics-icon img,
.ics-dup img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  /* No CSS shadow: the artwork already carries its own offset black shape, so
     adding one would double it. */
}
.ics-text {
  position: relative;
  /* Settled between two over-corrections: 46rem stacked the sentence seven
     rows deep, 68rem ran it almost edge to edge in four. This lands on five
     lines that read as a block rather than a column or a banner. */
  max-width: min(88vw, 58rem);
  margin: 0 auto;
  text-align: center;
  text-wrap: balance;
  color: ${INK};
  font-size: clamp(1.45rem, 2.9vw, 2.5rem);
  line-height: 1.32;
  letter-spacing: -0.015em;
}
/* A hair of space either side, not 0.2em — at this size that was opening
   visible holes mid-sentence. */
.ics-seg { opacity: 0; margin: 0 0.12em; }
/* Sized in em so the slot always matches the type, and so the ornament that
   flies into it lands at the right scale on any viewport. */
.ics-ph {
  width: 1.15em;
  height: 1.15em;
  margin: 0 0.1em;
  display: inline-block;
  vertical-align: -0.25em;
  visibility: hidden;
}
@media (max-width: 1000px) {
  .ics-header { top: 42%; width: 100%; }
  /* the rail was overflowing a 360px phone by ~45px */
  .ics-icons { gap: 0.75rem; left: 0.75rem; right: 0.75rem; }
  .ics-text { max-width: 100%; }
  .ics-icon { flex: 0 0 clamp(64px, 24vw, 130px); }
}
`;

"use client";

/**
 * Arabic mirror of IconStatement — the pinned icon-convergence story ported
 * from the Vertex Integra site. Same sequence, same ornaments, Arabic copy.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
/* eslint-disable @next/next/no-img-element */

gsap.registerPlugin(ScrollTrigger);

const INK = "#04323A";
const MINT = "#CFF7EE";
const TEAL = "#004D5A";

const ICONS = [
  "/icons/ornament-purple.png",
  "/icons/ornament-red.png",
  "/icons/ornament-green.png",
];

const SEGMENTS = [
  "أنا لا أبني مواقع فحسب،",
  "أنا أبني أنظمة نمو",
  "عبر التسويق بالأداء،",
  "وتطوير المنتجات،",
  "وأتمتة الذكاء الاصطناعي.",
  "متكامل. مُقاس. مُنجَز.",
];

export default function IconStatementAr() {
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
      const order = Array.from(textSegments);

      const isMobile = window.innerWidth <= 1000;
      const headerIconSize =
        placeholders[0]?.getBoundingClientRect().width || (isMobile ? 34 : 60);
      const currentIconSize = iconElements[0]?.getBoundingClientRect().width || 1;
      const exactScale = headerIconSize / currentIconSize;

      ScrollTrigger.create({
        trigger: heroSection,
        start: "top top",
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
          <h2 className="ics-h ar-heading">نبني منتجات</h2>
          <p className="ics-p ar-script">ونصنع نمواً.</p>
        </div>

        <div className="ics-icons">
          {ICONS.map((src) => (
            <div className="ics-icon" key={src}>
              <img src={src} alt="" />
            </div>
          ))}
        </div>

        <h2 className="ics-text ar-heading">
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
  font-size: clamp(2.4rem, 6.4vw, 5.4rem);
  /* Looser than the Latin build's 1.1 — the Arabic display serif needs it. */
  line-height: 1.35;
  color: ${INK};
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
}
.ics-text {
  position: relative;
  max-width: min(88vw, 58rem);
  margin: 0 auto;
  text-align: center;
  text-wrap: balance;
  color: ${INK};
  font-size: clamp(1.4rem, 2.7vw, 2.35rem);
  line-height: 1.7;
}
.ics-seg { opacity: 0; margin: 0 0.12em; }
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
  .ics-icon { flex: 0 0 clamp(64px, 24vw, 130px); }
  .ics-text { max-width: 100%; }
}
`;

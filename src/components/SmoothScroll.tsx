"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
      prevent: (node: HTMLElement) => {
        // Don't hijack scroll inside the chat widget or any overflow container inside it
        let el: HTMLElement | null = node;
        while (el) {
          if (el.classList?.contains("askahmed-window") || el.classList?.contains("askahmedar-window")) return true;
          el = el.parentElement;
        }
        return false;
      },
    });

    lenisRef.current = lenis;

    // Sync with GSAP ScrollTrigger
    lenis.on("scroll", () => {
      if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).ScrollTrigger) {
        (window as unknown as Record<string, { update: () => void }>).ScrollTrigger.update();
      }
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Stop wheel events inside chat from reaching Lenis
    const onWheel = (e: WheelEvent) => {
      let el = e.target as HTMLElement | null;
      while (el) {
        if (el.classList?.contains("askahmed-window") || el.classList?.contains("askahmedar-window")) {
          e.stopPropagation();
          return;
        }
        el = el.parentElement;
      }
    };
    document.addEventListener("wheel", onWheel, { capture: true, passive: false });

    // Stop touch events inside chat from reaching Lenis
    const onTouch = (e: TouchEvent) => {
      let el = e.target as HTMLElement | null;
      while (el) {
        if (el.classList?.contains("askahmed-window") || el.classList?.contains("askahmedar-window")) {
          e.stopPropagation();
          return;
        }
        el = el.parentElement;
      }
    };
    document.addEventListener("touchmove", onTouch, { capture: true, passive: false });

    // Handle anchor clicks
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (anchor) {
        const id = anchor.getAttribute("href")!.slice(1);
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el, { offset: -80 });
        }
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("wheel", onWheel, { capture: true } as EventListenerOptions);
      document.removeEventListener("touchmove", onTouch, { capture: true } as EventListenerOptions);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

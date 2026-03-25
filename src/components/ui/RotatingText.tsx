"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  type TargetAndTransition,
  type Transition,
} from "framer-motion";

interface RotatingTextProps {
  texts: string[];
  mainClassName?: string;
  staggerFrom?: "first" | "last" | "center" | "random" | number;
  initial?: TargetAndTransition;
  animate?: TargetAndTransition;
  exit?: TargetAndTransition;
  staggerDuration?: number;
  splitLevelClassName?: string;
  transition?: Transition;
  rotationInterval?: number;
}

export default function RotatingText({
  texts,
  mainClassName = "",
  initial = {
    y: "0.7em",
    opacity: 0,
    filter: "blur(12px)",
    rotateX: -70,
    scale: 0.94,
  },
  animate = {
    y: "0em",
    opacity: 1,
    filter: "blur(0px)",
    rotateX: 0,
    scale: 1,
  },
  exit = {
    y: "-0.5em",
    opacity: 0,
    filter: "blur(10px)",
    rotateX: 55,
    scale: 1.03,
  },
  transition = {
    duration: 0.65,
    ease: [0.22, 1, 0.36, 1],
  },
  rotationInterval = 2500,
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const widestText = texts.reduce((longest, text) =>
    text.length > longest.length ? text : longest
  , texts[0] ?? "");

  useEffect(() => {
    if (texts.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, rotationInterval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [texts.length, rotationInterval]);

  return (
    <span
      className={`relative inline-grid align-baseline ${mainClassName}`.trim()}
      style={{ perspective: 1200 }}
      aria-live="polite"
    >
      <span
        aria-hidden
        className="invisible pointer-events-none select-none whitespace-nowrap"
      >
        {widestText}
      </span>

      <AnimatePresence initial={false} mode="sync">
        <motion.span
          key={texts[index]}
          initial={initial}
          animate={animate}
          exit={exit}
          transition={transition}
          className="absolute inset-0 inline-flex items-center whitespace-nowrap"
          style={{
            transformOrigin: "50% 100%",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

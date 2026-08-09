"use client";

import { CSSProperties } from "react";
import { H, W } from "./deck/tokens";
import type { El, Run, Slide } from "./deck/types";

const SANS = "Calibri, 'Segoe UI', sans-serif";
const SERIF = "Cambria, Georgia, serif";
const ALIGN = { l: "left", c: "center", r: "right" } as const;
const VALIGN = { t: "flex-start", m: "center", b: "flex-end" } as const;

/** Cambria has no Light cut, so 'l' falls back to Regular on the serif. */
const weightFor = (ff: "s" | "c", fw: "l" | "r" | "b") =>
  ff === "c" ? (fw === "b" ? 700 : 400) : fw === "l" ? 300 : fw === "b" ? 700 : 400;

function runs(s: string | Run[], baseFF: "s" | "c", baseC: string) {
  if (typeof s === "string") return s;
  return s.map((rn, k) => {
    const ff = rn.ff ?? baseFF;
    return (
      <span
        key={k}
        style={{
          fontFamily: ff === "c" ? SERIF : SANS,
          fontWeight: rn.b ? 700 : undefined,
          fontStyle: rn.i ? "italic" : undefined,
          color: rn.c ?? baseC,
        }}
      >
        {rn.t}
      </span>
    );
  });
}

function Element({ el }: { el: El }) {
  const box: CSSProperties = { position: "absolute", left: el.x, top: el.y, width: el.w, height: el.h };

  if (el.k === "r") {
    return (
      <div
        style={{
          ...box,
          background: el.fill ?? "transparent",
          border: el.line ? `${el.lw ?? 1}px solid ${el.line}` : undefined,
          borderRadius: el.rad ? Math.min(el.rad, Math.min(el.w, el.h) / 2) : undefined,
          // matches the outer shadow written into the pptx
          boxShadow: el.shadow ? "0 6px 20px rgba(14,17,23,0.06)" : undefined,
          boxSizing: "border-box",
        }}
      />
    );
  }

  if (el.k === "i") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={el.src}
        alt=""
        style={{
          ...box,
          objectFit: el.fit ?? "contain",
          objectPosition: el.fit === "cover" ? "center" : ALIGN[el.al ?? "c"],
          borderRadius: el.rad || undefined,
        }}
      />
    );
  }

  const ff = el.ff ?? "s";
  return (
    <div
      style={{
        ...box,
        display: "flex",
        flexDirection: "column",
        justifyContent: VALIGN[el.va ?? "t"],
        fontFamily: ff === "c" ? SERIF : SANS,
        fontSize: el.fs,
        fontWeight: weightFor(ff, el.fw ?? "r"),
        fontStyle: el.it ? "italic" : undefined,
        color: el.c,
        textAlign: ALIGN[el.al ?? "l"],
        lineHeight: `${el.lh ?? el.fs * 1.3}px`,
        letterSpacing: el.ls ? `${el.ls}px` : undefined,
        textTransform: el.caps ? "uppercase" : undefined,
        whiteSpace: el.nowrap ? "pre" : "pre-wrap",
        overflow: "visible",
        fontKerning: "normal",
      }}
    >
      <span>{runs(el.s, ff, el.c)}</span>
    </div>
  );
}

/** One 1920×1080 page. `scale` is the viewer's business; the spec never changes. */
export default function SlideView({ slide, scale = 1 }: { slide: Slide; scale?: number }) {
  return (
    <div
      style={{
        width: W * scale,
        height: H * scale,
        flexShrink: 0,
        overflow: "hidden",
        background: slide.bg ?? "#FFFFFF",
      }}
    >
      <div
        style={{
          width: W,
          height: H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          position: "relative",
          background: slide.bg ?? "#FFFFFF",
        }}
      >
        {slide.els.map((el, k) => (
          <Element key={k} el={el} />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SlideView from "./Slide";
import { SLIDES } from "./deck";
import { H, W } from "./deck/tokens";

export default function TaajeerDeck() {
  const [idx, setIdx] = useState(0);
  const [scale, setScale] = useState(0.5);
  const [navOpen, setNavOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  // The canvas is a fixed 1920×1080. The viewport just scales it — the spec is
  // never responsive, because a PowerPoint slide isn't either.
  useEffect(() => {
    const fit = () => {
      const pad = 96;
      const s = Math.min((window.innerWidth - pad) / W, (window.innerHeight - pad - 56) / H);
      setScale(Math.min(s, 1));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const go = useCallback((n: number) => setIdx((p) => Math.max(0, Math.min(SLIDES.length - 1, n))), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") { e.preventDefault(); go(idx + 1); }
      if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); go(idx - 1); }
      if (e.key === "Home") go(0);
      if (e.key === "End") go(SLIDES.length - 1);
      if (e.key === "Escape") setNavOpen((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, go]);

  const slide = SLIDES[idx];

  return (
    <div
      ref={wrap}
      style={{
        minHeight: "100vh",
        background: "#1A1D21",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Calibri, sans-serif",
        userSelect: "none",
      }}
    >
      <div style={{ boxShadow: "0 24px 80px rgba(0,0,0,.5)" }}>
        <SlideView slide={slide} scale={scale} />
      </div>

      {/* controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginTop: 22,
          color: "#8D96A3",
          fontSize: 14,
          letterSpacing: 0.4,
        }}
      >
        <button onClick={() => go(idx - 1)} disabled={idx === 0} style={btn(idx === 0)}>←</button>
        <span style={{ minWidth: 210, textAlign: "center" }}>
          <b style={{ color: "#fff", fontWeight: 600 }}>{String(idx + 1).padStart(2, "0")}</b>
          <span style={{ opacity: 0.4 }}> / {String(SLIDES.length).padStart(2, "0")}</span>
          <span style={{ opacity: 0.55, marginLeft: 12 }}>{slide.nav}</span>
        </span>
        <button onClick={() => go(idx + 1)} disabled={idx === SLIDES.length - 1} style={btn(idx === SLIDES.length - 1)}>→</button>
        <button onClick={() => setNavOpen((v) => !v)} style={{ ...btn(false), width: "auto", padding: "0 14px", fontSize: 12 }}>
          {navOpen ? "Close" : "All slides"}
        </button>
      </div>

      {navOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(12,14,17,.96)",
            overflowY: "auto",
            padding: 44,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 22,
            zIndex: 50,
          }}
          onClick={() => setNavOpen(false)}
        >
          {SLIDES.map((s, k) => (
            <div key={s.id} onClick={() => { go(k); setNavOpen(false); }} style={{ cursor: "pointer" }}>
              <div style={{ outline: k === idx ? "2px solid #fff" : "1px solid #2B3038", width: 300, height: 168.75, overflow: "hidden" }}>
                <SlideView slide={s} scale={300 / W} />
              </div>
              <div style={{ color: "#8D96A3", fontSize: 12, marginTop: 8 }}>
                {String(k + 1).padStart(2, "0")} · {s.nav}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const btn = (disabled: boolean): React.CSSProperties => ({
  width: 38,
  height: 38,
  borderRadius: 19,
  border: "1px solid #2F343B",
  background: "transparent",
  color: disabled ? "#454B54" : "#E3E7EB",
  cursor: disabled ? "default" : "pointer",
  fontSize: 15,
});

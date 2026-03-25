"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1800);
    const removeTimer = setTimeout(() => setVisible(false), 2500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center"
      style={{
        background: "#0A0A0A",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.7s ease-out",
      }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <div
          className="heading text-5xl md:text-6xl"
          style={{
            color: "#fff",
            animation: "preloaderIn 0.8s ease-out both",
          }}
        >
          Ahmed<span style={{ color: "#4FFFB0" }}>.</span>
        </div>

        {/* Loading bar */}
        <div
          className="w-32 h-[2px] rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              background: "#4FFFB0",
              animation: "preloaderBar 1.6s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes preloaderIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes preloaderBar {
          0% { width: 0%; margin-left: 0; }
          50% { width: 100%; margin-left: 0; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}

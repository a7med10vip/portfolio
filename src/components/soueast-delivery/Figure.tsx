"use client";

import { useState } from "react";
import { FIGURES, STAMP, type FigureDef, type FigureKey } from "@/app/soueast-delivery/data";
import { G, D, LINE, MONO } from "./theme";

/**
 * A number and where it came from.
 *
 * A handover document that states forty figures is asking to be believed forty
 * times. The only honest way to ask that is to show the working, so every figure
 * on this page renders through here and opens its own method on tap.
 */
export default function Figure({
  id,
  size = 34,
  suffix,
  showLabel = false,
}: {
  id: FigureKey;
  size?: number;
  suffix?: string;
  showLabel?: boolean;
}) {
  const f: FigureDef = FIGURES[id];
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="heading cursor-help transition-colors"
        style={{
          fontSize: size,
          lineHeight: 1,
          color: D,
          background: "none",
          border: "none",
          padding: 0,
          borderBottom: `1px dotted ${G}80`,
        }}
        aria-label={`${f.value.toLocaleString("en-US")} ${f.label}, how this was counted`}
      >
        {f.display ?? f.value.toLocaleString("en-US")}
        {suffix}
      </button>
      {showLabel && (
        <span className="block text-[10px] font-bold mt-1" style={{ color: D }}>
          {f.label.toUpperCase()}
        </span>
      )}
      {open && (
        <span
          className="absolute z-50 block text-left"
          style={{
            bottom: "calc(100% + 10px)",
            left: 0,
            width: 340,
            background: "#fff",
            border: `1px solid ${LINE}`,
            borderRadius: 14,
            padding: "14px 16px",
          }}
        >
          <span className="block text-[10px] font-bold mb-2" style={{ color: G }}>
            {f.source === "repo"
              ? "COUNTED FROM THE REPOSITORY"
              : f.source === "db"
                ? "READ FROM THE PRODUCTION DATABASE"
                : "GOOGLE SEARCH CONSOLE"}
          </span>
          <span className="block text-[12.5px] leading-relaxed" style={{ color: D }}>
            {f.method}
          </span>
          {f.command && (
            <span
              className="block mt-3 text-[10.5px] leading-relaxed whitespace-pre-wrap"
              style={{ fontFamily: MONO, color: D, background: "#fff", padding: "8px 10px", borderRadius: 8, border: `1px solid ${LINE}` }}
            >
              {f.command}
            </span>
          )}
          <span className="block mt-3 text-[10px]" style={{ color: D }}>
            commit {STAMP.commit} · {STAMP.countedOn}
          </span>
        </span>
      )}
    </span>
  );
}

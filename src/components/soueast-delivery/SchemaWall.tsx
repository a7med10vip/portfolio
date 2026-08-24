"use client";

import { useState } from "react";
import { DOMAINS } from "@/app/soueast-delivery/data";
import { G, D, LINE, MONO } from "./theme";

/** Forty-five tables, grouped by the question each group answers. */
export default function SchemaWall() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {DOMAINS.map((dom) => (
        <div
          key={dom.name}
          className="rounded-[18px] p-6 transition-all"
          style={{
            border: `1px solid ${LINE}`,
            background: "#fff",
          }}
        >
          <div className="flex items-baseline justify-between mb-1">
            <h4 className="heading text-[17px]" style={{ color: D, lineHeight: 1.25 }}>
              {dom.name}
            </h4>
            <span className="heading text-[15px]" style={{ color: G }}>
              {dom.tables.length}
            </span>
          </div>
          <p className="text-[12px] mb-5 leading-relaxed" style={{ color: D }}>
            {dom.blurb}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {dom.tables.map((t) => (
              <span
                key={t}
                onMouseEnter={() => setHover(t)}
                onMouseLeave={() => setHover(null)}
                className="text-[10.5px] px-2 py-1 rounded-md transition-all"
                style={{
                  fontFamily: MONO,
                  background: hover === t ? G : `${G}12`,
                  color: hover === t ? "#fff" : D,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

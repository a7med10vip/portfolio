"use client";

import { INK, MINT, NIGHT } from "./ui/brand";
import Ico, { STARS } from "./ui/Ico";

const row1 = ["Performance Marketing", "SEO & SEM", "Web Development", "AI Integration", "Google Ads", "Flutter Apps", "Data Analytics"];
const row2 = ["Next.js", "React", "Brand Strategy", "Meta Ads", "WordPress", "Growth Hacking", "Product Design"];

/* Two flat rows on a dark ground, running opposite ways — the original band.
   The tilted crossing version replaced this and cost the page its one dark
   anchor: with everything else on white, this is what gives the top of the
   page a floor to sit on. Same structure as before, brand palette instead of
   black-and-neon. */
function Row({ items, direction }: { items: string[]; direction: "left" | "right" }) {
  const doubled = [...items, ...items, ...items, ...items];
  const animClass = direction === "left" ? "animate-[ml_60s_linear_infinite]" : "animate-[mr_60s_linear_infinite]";

  return (
    <div className="flex overflow-hidden">
      <div className={`flex items-center gap-5 shrink-0 ${animClass}`} style={{ willChange: "transform" }}>
        {doubled.map((s, i) => (
          <span key={i} className="contents">
            <span
              className="shrink-0 text-base md:text-lg px-5 md:px-6 py-2 md:py-2.5 rounded-full whitespace-nowrap"
              style={{ background: MINT, color: INK, fontFamily: "'TAN Headline'", fontWeight: 400 }}
            >
              {s}
            </span>
            {/* the three ornaments cycle so no row repeats a shape */}
            <span className="flex items-center shrink-0 text-2xl md:text-3xl">
              <Ico name={STARS[i % STARS.length]} size="1.15em" color={MINT} opacity={0.9} />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeBand() {
  return (
    <div className="relative" style={{ background: NIGHT, padding: "56px 0", overflow: "hidden" }}>
      <style>{`
        @keyframes ml { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes mr { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
      `}</style>

      {/* the rows fade out at both edges instead of being cut */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none" style={{ background: `linear-gradient(to right, ${NIGHT}, transparent)` }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none" style={{ background: `linear-gradient(to left, ${NIGHT}, transparent)` }} />

      <div className="flex flex-col gap-4">
        <Row items={row1} direction="left" />
        <Row items={row2} direction="right" />
      </div>
    </div>
  );
}
"use client";

import { INK, MINT, TEAL } from "./ui/brand";
import Ico, { STARS } from "./ui/Ico";

const row1 = ["Performance Marketing", "SEO & SEM", "Web Development", "AI Integration", "Google Ads", "Flutter Apps", "Data Analytics"];
const row2 = ["Next.js", "React", "Brand Strategy", "Meta Ads", "WordPress", "Growth Hacking", "Product Design"];

/* Each row is its own band, and the two are tilted the opposite way so they
   cross at the middle of the section — an X rather than two parallel lines. */
const TILT = 7;
/* the bands are wider than the viewport so their ends stay off-screen once tilted */
const OVERHANG = "18%";

function Band({
  items,
  direction,
  angle,
  background,
  color,
  z,
}: {
  items: string[];
  direction: "left" | "right";
  angle: number;
  background: string;
  color: string;
  z: number;
}) {
  const doubled = [...items, ...items, ...items, ...items];
  const animClass = direction === "left" ? "animate-[ml_60s_linear_infinite]" : "animate-[mr_60s_linear_infinite]";

  return (
    <div
      className="absolute left-1/2 top-1/2 overflow-hidden"
      style={{
        width: `calc(100% + ${OVERHANG} * 2)`,
        transform: `translate(-50%,-50%) rotate(${angle}deg)`,
        background,
        zIndex: z,
        boxShadow: "0 10px 30px rgba(4,50,58,0.12)",
      }}
    >
      <div
        className={`flex gap-6 shrink-0 py-3.5 md:py-4 ${animClass}`}
        style={{ willChange: "transform" }}
      >
        {doubled.map((s, i) => (
          <span key={i} className="contents">
            <span
              className="shrink-0 text-base md:text-xl whitespace-nowrap"
              style={{ color, fontFamily: "'TAN Headline'", fontWeight: 400 }}
            >
              {s}
            </span>
            {/* the three ornaments cycle, so the row never repeats one shape.
                Sized in em off the label so it scales with the type. */}
            <span className="flex items-center shrink-0 text-base md:text-xl">
              <Ico name={STARS[i % STARS.length]} size="1.6em" color={color} opacity={0.85} />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeBand() {
  return (
    <div
      className="relative h-[260px] md:h-[400px]"
      style={{ background: "#fff", overflow: "hidden" }}
    >
      <style>{`
        @keyframes ml { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes mr { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
      `}</style>

      <Band items={row2} direction="right" angle={TILT} background={MINT} color={INK} z={1} />
      <Band items={row1} direction="left" angle={-TILT} background={TEAL} color="#fff" z={2} />
    </div>
  );
}

"use client";

import { useState } from "react";
import { G, D, LINE } from "./theme";

/**
 * Four applications over one database, drawn by hand.
 *
 * Not a graph library: there are ten nodes and they never move, so a layout
 * engine would spend a runtime to arrive at a placement that is worse than a
 * considered one. Hand-authored paths also mean each edge can be drawn on with
 * the scroll and can carry a packet travelling along it.
 */

type Focus = null | "website" | "showroom" | "ops" | "admin" | "cron" | "cdn" | "outside";

const APPS = [
  { key: "website", x: 46, label: "The website", host: "motionmotors.me", n: "26 pages", weight: 1 },
  { key: "showroom", x: 320, label: "The showroom tool", host: "showroom.motionmotors.me", n: "4 screens", weight: 0.62 },
  { key: "ops", x: 638, label: "The events system", host: "motion-motors.vercel.app", n: "16 pages", weight: 0.34 },
  { key: "admin", x: 912, label: "The dashboard", host: "live.motionmotors.me", n: "30 pages", weight: 0.14 },
] as const;

const EDGES = [
  { key: "website", d: "M 172 232 C 172 330, 430 340, 470 402", label: "reserve_unit()" },
  { key: "showroom", d: "M 446 232 C 446 320, 540 340, 552 402", label: "reserve_unit_for_customer()" },
  { key: "ops", d: "M 764 232 C 764 320, 690 340, 662 402", label: "record_attribution()" },
  { key: "admin", d: "M 1038 232 C 1038 330, 800 340, 744 402", label: "can('orders:refund')" },
] as const;

export default function SystemMap() {
  const [focus, setFocus] = useState<Focus>(null);
  const dim = (k: string) => (focus && focus !== k ? 0.13 : 1);

  return (
    <div className="w-full" onMouseLeave={() => setFocus(null)}>
      <svg viewBox="0 0 1210 726" className="w-full h-auto" style={{ maxHeight: "78vh" }} role="img"
        aria-label="Four applications over one Postgres database">
        <defs>
          <marker id="sd-arrow" markerWidth="7" markerHeight="7" refX="5.4" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 z" fill={G} />
          </marker>
        </defs>

        {/* one codebase, two deployments, the bracket over the first two */}
        <g style={{ opacity: focus && focus !== "website" && focus !== "showroom" ? 0.13 : 1, transition: "opacity .3s" }}>
          <path d="M 172 44 L 172 30 L 446 30 L 446 44" fill="none" stroke={G} strokeWidth="1" strokeDasharray="3 3" />
          <text x="309" y="22" textAnchor="middle" fontSize="11" fill={G} className="heading">
            one codebase, built twice
          </text>
        </g>

        {/* the applications */}
        {APPS.map((a) => (
          <g
            key={a.key}
            onMouseEnter={() => setFocus(a.key as Focus)}
            style={{ opacity: dim(a.key), transition: "opacity .3s", cursor: "pointer" }}
          >
            <rect x={a.x} y={44} width={252} height={188} rx={18} fill="#fff" stroke={LINE} strokeWidth="1" />
            {/* the Soueast bars, at the weight that tells the four apart */}
            <g opacity={a.weight}>
              <rect x={a.x + 22} y={70} width={40} height={7} fill={G} />
              <rect x={a.x + 22} y={82} width={40} height={7} fill={G} />
              <rect x={a.x + 22} y={94} width={40} height={7} fill={G} />
            </g>
            <text x={a.x + 22} y={132} fontSize="17" fill={D} className="heading">
              {a.label}
            </text>
            <text x={a.x + 22} y={158} fontSize="11.5" fill={D}>
              {a.host}
            </text>
            <line x1={a.x + 22} y1={176} x2={a.x + 230} y2={176} stroke="#F0F0F0" />
            <text x={a.x + 22} y={202} fontSize="12" fill={D} className="heading">
              {a.n}
            </text>
          </g>
        ))}

        {/* the edges down into the database */}
        {EDGES.map((e) => (
          <g key={e.key} style={{ opacity: dim(e.key), transition: "opacity .3s" }}>
            <path
              className="sd-edge"
              d={e.d}
              fill="none"
              stroke={G}
              strokeWidth="1.4"
              markerEnd="url(#sd-arrow)"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset="1"
            />
            <circle r="3.5" fill={G}>
              <animateMotion dur="3.4s" repeatCount="indefinite" path={e.d} />
              <animate attributeName="opacity" values="0;1;1;0" dur="3.4s" repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* The name of the function each wire ends at, haloed in white so it reads
            over the curve rather than fighting it. */}
        <g style={{ opacity: focus ? 0 : 1, transition: "opacity .3s" }} fontFamily="ui-monospace, Menlo, monospace"
           fontSize="10.5" fill={D}  stroke="#fff" strokeWidth="5" paintOrder="stroke">
          <text x="196" y="300">reserve_unit()</text>
          <text x="392" y="352">reserve_unit_for_customer()</text>
          <text x="700" y="300">record_attribution()</text>
          <text x="836" y="352">can(&apos;orders:refund&apos;)</text>
        </g>

        {/* the database */}
        <g
          onMouseEnter={() => setFocus(null)}
          style={{ opacity: focus === "outside" || focus === "cdn" ? 0.35 : 1, transition: "opacity .3s" }}
        >
          <rect x={392} y={404} width={430} height={132} rx={20} fill={D} />
          <text x={607} y={444} textAnchor="middle" fontSize="18" fill="#fff" className="heading">
            One Postgres
          </text>
          <text x={607} y={470} textAnchor="middle" fontSize="11.5" fill="#fff">
            Supabase · row-level security on every table
          </text>
          <g fill="#fff" fontSize="12" className="heading">
            <text x={452} y={508} textAnchor="middle">45</text>
            <text x={545} y={508} textAnchor="middle">126</text>
            <text x={648} y={508} textAnchor="middle">85</text>
            <text x={755} y={508} textAnchor="middle">93</text>
          </g>
          <g fill="#fff" fontSize="8.5" fontWeight="700">
            <text x={452} y={522} textAnchor="middle">TABLES</text>
            <text x={545} y={522} textAnchor="middle">FUNCTIONS</text>
            <text x={648} y={522} textAnchor="middle">POLICIES</text>
            <text x={755} y={522} textAnchor="middle">MIGRATIONS</text>
          </g>
        </g>

        {/* pg_cron, on the left */}
        <g
          onMouseEnter={() => setFocus("cron")}
          style={{ opacity: dim("cron"), transition: "opacity .3s", cursor: "pointer" }}
        >
          <rect x={46} y={430} width={200} height={104} rx={16} fill="#fff" stroke={LINE} />
          <circle cx={82} cy={470} r={13} fill="none" stroke={G} strokeWidth="1.4" />
          <path d="M 82 462 L 82 470 L 88 474" fill="none" stroke={G} strokeWidth="1.4" strokeLinecap="round" />
          <text x={106} y={468} fontSize="14" fill={D} className="heading">pg_cron</text>
          <text x={106} y={487} fontSize="10.5" fill={D}>8 jobs</text>
          <text x={66} y={516} fontSize="10.5" fill={D}>986 runs a day, unattended</text>
          <path className="sd-edge" d="M 246 482 L 386 482" fill="none" stroke={G} strokeWidth="1.4"
            markerEnd="url(#sd-arrow)" pathLength={1} strokeDasharray="1" strokeDashoffset="1" />
        </g>

        {/* outside services, on the right, dashed, because they are the trust boundary */}
        <g
          onMouseEnter={() => setFocus("outside")}
          style={{ opacity: dim("outside"), transition: "opacity .3s", cursor: "pointer" }}
        >
          <rect x={962} y={404} width={202} height={62} rx={14} fill="#fff" stroke={LINE} strokeDasharray="4 4" />
          <text x={984} y={430} fontSize="13" fill={D} className="heading">WATI</text>
          <text x={984} y={449} fontSize="10.5" fill={D}>WhatsApp, codes, receipts</text>

          <rect x={962} y={478} width={202} height={62} rx={14} fill="#fff" stroke={LINE} strokeDasharray="4 4" />
          <text x={984} y={504} fontSize="13" fill={D} className="heading">Gemini 2.5 Flash</text>
          <text x={984} y={523} fontSize="10.5" fill={D}>language only, never a price</text>

          <path className="sd-edge" d="M 828 462 L 956 434" fill="none" stroke={G} strokeWidth="1.2" strokeDasharray="1"
            pathLength={1} strokeDashoffset="1" markerEnd="url(#sd-arrow)" />
          <path className="sd-edge" d="M 828 486 L 956 508" fill="none" stroke={G} strokeWidth="1.2" strokeDasharray="1"
            pathLength={1} strokeDashoffset="1" markerEnd="url(#sd-arrow)" />
        </g>

        {/* the CDN, feeding only the two shopfronts */}
        <g
          onMouseEnter={() => setFocus("cdn")}
          style={{ opacity: dim("cdn"), transition: "opacity .3s", cursor: "pointer" }}
        >
          <rect x={46} y={584} width={300} height={72} rx={16} fill="#fff" stroke={LINE} />
          <text x={70} y={612} fontSize="13" fill={D} className="heading">Supabase Storage</text>
          <text x={70} y={632} fontSize="10.5" fill={D}>
            75 MB of turntable per colour,
          </text>
          <text x={70} y={646} fontSize="10.5" fill={D}>
            kept out of the deploy
          </text>
          {/* Up the left margin into the shopfront, clear of everything else:
              the frames are the only thing that never touches the database. */}
          <path className="sd-edge" d="M 62 584 C 18 512, 18 250, 44 152" fill="none" stroke={G} strokeWidth="1.1"
            strokeOpacity="0.55" strokeDasharray="1" pathLength={1} strokeDashoffset="1" markerEnd="url(#sd-arrow)" />
        </g>

        {/* the line that is the whole argument */}
        <text x={760} y={604} textAnchor="middle" fontSize="13" fill={D}>
          A car reserved on the website is gone from the floor&apos;s list
        </text>
        <text x={760} y={626} textAnchor="middle" fontSize="13" fill={D}>
          in the same second, because there is no second list.
        </text>
      </svg>

      <p className="text-center text-[11px] mt-2" style={{ color: D }}>
        Hover any box to isolate what it touches
      </p>
    </div>
  );
}

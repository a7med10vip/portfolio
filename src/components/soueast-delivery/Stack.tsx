"use client";

import {
  SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiSupabase,
  SiPostgresql, SiGooglegemini, SiWhatsapp, SiGoogleanalytics,
  SiGooglesearchconsole, SiVercel,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { G, D, LINE } from "./theme";

/**
 * What it is built on, in each vendor's own mark and each vendor's own colour.
 *
 * The marks are drawn from react-icons rather than fetched, so nothing here
 * depends on a CDN staying up or on the page's own CSP being widened.
 */
const STACK: { icon: IconType; name: string; role: string; colour: string }[] = [
  { icon: SiNextdotjs, name: "Next.js 16", role: "Three applications, App Router", colour: "#0A0A0A" },
  { icon: SiReact, name: "React 19", role: "Server components by default", colour: "#087EA4" },
  { icon: SiTypescript, name: "TypeScript", role: "Every file, no JavaScript left", colour: "#3178C6" },
  { icon: SiTailwindcss, name: "Tailwind 4", role: "CSS-first, no config file", colour: "#0891B2" },
  { icon: SiSupabase, name: "Supabase", role: "One project under all four", colour: "#1F9E63" },
  { icon: SiPostgresql, name: "PostgreSQL", role: "45 tables, 85 policies, pg_cron", colour: "#4169E1" },
  { icon: SiGooglegemini, name: "Gemini 2.5 Flash", role: "Language only, never a price", colour: "#7A5FA8" },
  { icon: SiWhatsapp, name: "WATI", role: "Sign-in codes and receipts", colour: "#1DA851" },
  { icon: SiGoogleanalytics, name: "GA4 Data API", role: "Read server-side into the dashboard", colour: "#E37400" },
  { icon: SiGooglesearchconsole, name: "Search Console", role: "What people searched to arrive", colour: "#3B7DD8" },
  { icon: SiVercel, name: "Vercel", role: "Four deployments, one repository", colour: "#0A0A0A" },
];

export default function Stack() {
  return (
    <div className="sd-stagger grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-left">
      {STACK.map(({ icon: Icon, name, role, colour }) => (
        <div
          key={name}
          className="sd-item flex items-center gap-3.5 rounded-[14px] px-4 py-3.5"
          style={{ border: `1px solid ${LINE}`, background: "#fff" }}
        >
          <span
            className="grid place-items-center rounded-[10px] shrink-0"
            style={{ width: 38, height: 38, background: `${colour}12` }}
          >
            <Icon size={19} color={colour} aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="heading block text-[14.5px]" style={{ color: D, lineHeight: 1.2 }}>
              {name}
            </span>
            <span className="block text-[11.5px] mt-0.5" style={{ color: D }}>
              {role}
            </span>
          </span>
        </div>
      ))}
      <div
        className="sd-item flex items-center gap-3.5 rounded-[14px] px-4 py-3.5"
        style={{ border: `1px solid ${G}40`, background: "#fff" }}
      >
        <span className="grid place-items-center rounded-[10px] shrink-0" style={{ width: 38, height: 38, background: `${G}14` }}>
          <svg width="19" height="19" viewBox="0 0 100 125" aria-hidden>
            <rect width="100" height="27" fill={G} />
            <rect y="49" width="100" height="27" fill={G} />
            <rect y="98" width="100" height="27" fill={G} />
          </svg>
        </span>
        <span className="min-w-0">
          <span className="heading block text-[14.5px]" style={{ color: D, lineHeight: 1.2 }}>
            Soueast
          </span>
          <span className="block text-[11.5px] mt-0.5" style={{ color: D }}>
            The brand all four of them wear
          </span>
        </span>
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { ROUTES, APPS } from "@/app/soueast-delivery/data";
import { G, D, LINE, MONO, tc } from "./theme";

type Filter = "all" | "public" | "staff" | "dynamic";

const COLUMNS = [
  { app: "website", title: "The website", host: "motionmotors.me" },
  { app: "showroom", title: "The showroom tool", host: "showroom.motionmotors.me" },
  { app: "ops", title: "The events system", host: "motion-motors.vercel.app" },
  { app: "admin", title: "The dashboard", host: "live.motionmotors.me" },
] as const;

/**
 * Seventy-two routes as a map rather than a list.
 *
 * The count on its own says nothing, thirty pages could be thirty variations of
 * one screen. Grouping them by the question each one answers is what turns the
 * number into a claim somebody can check.
 */
export default function RouteAtlas() {
  const [filter, setFilter] = useState<Filter>("all");
  const [q, setQ] = useState("");

  const shown = useMemo(
    () =>
      ROUTES.filter((r) => {
        if (filter === "public" && r.auth) return false;
        if (filter === "staff" && !r.auth) return false;
        if (filter === "dynamic" && !r.dynamic) return false;
        if (q && !r.path.toLowerCase().includes(q.toLowerCase())) return false;
        return true;
      }),
    [filter, q],
  );

  const localised = shown.filter((r) => r.localised).length;

  return (
    <div>
      {/* controls */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {(
          [
            ["all", "Everything"],
            ["public", "Open to anybody"],
            ["staff", "Behind a sign-in"],
            ["dynamic", "One page per row in the database"],
          ] as [Filter, string][]
        ).map(([k, label]) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className="text-[12px] px-3.5 py-2 rounded-full transition-all"
            style={{
              background: filter === k ? G : "#fff",
              color: filter === k ? "#fff" : D,
              border: `1px solid ${filter === k ? G : LINE}`,
              opacity: filter === k ? 1 : 0.7,
            }}
          >
            {label}
          </button>
        ))}
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="filter…"
          className="text-[12px] px-3.5 py-2 rounded-full outline-none"
          style={{ border: `1px solid ${LINE}`, color: D, width: 130, fontFamily: MONO }}
        />
      </div>

      {/* the count, which recomputes */}
      <p className="text-center text-[12px] mb-9" style={{ color: D }}>
        <span className="heading" style={{ color: G, fontSize: 15 }}>
          {shown.length}
        </span>{" "}
        {shown.length === 1 ? "route" : "routes"} · {localised} of them exist in Arabic and English ·{" "}
        {shown.filter((r) => r.auth).length} behind a sign-in
      </p>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {COLUMNS.map((col) => {
          const rows = shown.filter((r) => r.app === col.app);
          const groups = [...new Set(rows.map((r) => r.group))];
          const app = APPS.find((a) => a.key === col.app)!;
          return (
            <div
              key={col.app}
              className="rounded-[18px] p-5"
              style={{ border: `1px solid ${LINE}`, background: "#fff", opacity: rows.length ? 1 : 0.5 }}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="heading text-[15px]" style={{ color: D, lineHeight: 1.2 }}>
                  {tc(col.title)}
                </h4>
                <span className="heading text-[15px] shrink-0" style={{ color: G }}>
                  {rows.length}
                </span>
              </div>
              <p className="text-[10px] mb-4" style={{ color: D, fontFamily: MONO }}>
                {col.host}
              </p>

              {groups.map((g) => (
                <div key={g} className="mb-4 last:mb-0">
                  <p className="text-[9.5px] font-bold mb-1.5" style={{ color: D }}>
                    {g.toUpperCase()}
                  </p>
                  <div style={{ borderLeft: `1px solid ${G}25`, paddingLeft: 10 }}>
                    {rows
                      .filter((r) => r.group === g)
                      .map((r) => (
                        <div key={r.path} className="flex items-center gap-1.5 py-[3px]">
                          <span
                            className="text-[11px] truncate"
                            style={{ color: D, fontFamily: MONO }}
                            title={r.path}
                          >
                            {r.path}
                          </span>
                          {r.dynamic && (
                            <span className="text-[8px] font-bold px-1 rounded shrink-0" style={{ background: `${G}15`, color: G }}>
                              ID
                            </span>
                          )}
                          {r.auth && (
                            <span
                              className="text-[8px] font-bold px-1 rounded shrink-0"
                              style={{ background: "#F4F4F4", color: D }}
                            >
                              LOCK
                            </span>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
              {rows.length === 0 && (
                <p className="text-[11px] py-3" style={{ color: D }}>
                  Nothing here under this filter.
                </p>
              )}
              {app.gated && filter === "all" && !q && (
                <p className="text-[10.5px] mt-4 pt-3" style={{ color: D, borderTop: `1px solid #F0F0F0` }}>
                  {app.gated}.
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

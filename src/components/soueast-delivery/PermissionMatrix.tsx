"use client";

import { useState } from "react";
import { PERMISSIONS, ROLES } from "@/app/soueast-delivery/data";
import { G, D, LINE, MONO } from "./theme";

/**
 * Twenty-five permissions across eight roles, as two hundred squares.
 *
 * The argument the section is making does not need a caption: the Administrator
 * row is solid, Read only is nearly empty and Finance and Marketing do not
 * overlap anywhere. A bar chart would have hidden all three.
 */
export default function PermissionMatrix() {
  const [role, setRole] = useState<string | null>(null);
  const [cell, setCell] = useState<{ r: string; p: string } | null>(null);

  const categories = [...new Set(PERMISSIONS.map((p) => p.category))];
  const active = ROLES.find((r) => r.key === role);

  return (
    <div>
      <div className="overflow-x-auto pb-3 -mx-6 px-6">
        <div style={{ minWidth: 760 }}>
          {/* column headers, grouped by what they touch */}
          <div className="flex" style={{ paddingLeft: 168 }}>
            {categories.map((c) => {
              const n = PERMISSIONS.filter((p) => p.category === c).length;
              return (
                <div
                  key={c}
                  className="text-[9px] font-bold pb-1.5"
                  style={{
                    width: n * 22,
                    color: D,
                    borderBottom: `1px solid ${LINE}`,
                    marginRight: 6,
                  }}
                >
                  {c.toUpperCase()}
                </div>
              );
            })}
          </div>

          {/* rows */}
          {ROLES.map((r) => {
            const dim = role !== null && role !== r.key;
            return (
              <div
                key={r.key}
                className="flex items-center transition-opacity"
                style={{ opacity: dim ? 0.22 : 1, cursor: "pointer" }}
                onMouseEnter={() => setRole(r.key)}
                onMouseLeave={() => setRole(null)}
              >
                <div style={{ width: 168 }} className="pr-4 py-[3px]">
                  <span className="heading text-[12.5px] block" style={{ color: role === r.key ? G : D }}>
                    {r.name}
                  </span>
                  <span className="text-[10px] block" style={{ color: D }}>
                    {r.grants.length} of 25
                  </span>
                </div>
                {categories.map((c) => (
                  <div key={c} className="flex" style={{ marginRight: 6 }}>
                    {PERMISSIONS.filter((p) => p.category === c).map((p) => {
                      const has = r.grants.includes(p.key);
                      return (
                        <div
                          key={p.key}
                          onMouseEnter={() => setCell({ r: r.key, p: p.key })}
                          onMouseLeave={() => setCell(null)}
                          title={`${r.name}, ${p.label}`}
                          style={{
                            width: 18,
                            height: 18,
                            margin: 2,
                            borderRadius: 5,
                            background: has ? G : `${G}12`,
                            border: has && p.sensitive ? `2px solid ${D}` : "none",
                            transform: cell?.r === r.key && cell?.p === p.key ? "scale(1.35)" : "none",
                            transition: "transform .15s",
                          }}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* the readout */}
      <div
        className="mt-8 rounded-[16px] p-5 min-h-[92px]"
        style={{ border: `1px solid ${LINE}`, background: "#fff" }}
      >
        {cell ? (
          <>
            <p className="text-[10px] font-bold mb-1.5" style={{ color: G, fontFamily: MONO }}>
              {PERMISSIONS.find((p) => p.key === cell.p)?.key}
              {PERMISSIONS.find((p) => p.key === cell.p)?.sensitive && " · SENSITIVE"}
            </p>
            <p className="heading text-[16px]" style={{ color: D }}>
              {ROLES.find((r) => r.key === cell.r)?.name}{" "}
              <span style={{ color: G }}>
                {ROLES.find((r) => r.key === cell.r)?.grants.includes(cell.p) ? "may" : "may not"}
              </span>{" "}
              {PERMISSIONS.find((p) => p.key === cell.p)?.label.toLowerCase()}
            </p>
          </>
        ) : active ? (
          <>
            <p className="text-[10px] font-bold mb-1.5" style={{ color: G }}>
              {active.name.toUpperCase()} · {active.arabic}
            </p>
            <p className="text-[13.5px] leading-relaxed" style={{ color: D }}>
              {active.note ?? `${active.grants.length} of the twenty-five permissions.`}
            </p>
          </>
        ) : (
          <p className="text-[13px]" style={{ color: D }}>
            Hover a row to read what that person can do, or a square for the exact permission. The
            squares with a dark ring are the ten marked sensitive, they move money or change who can
            see what and the audit log never omits them.
          </p>
        )}
      </div>
    </div>
  );
}

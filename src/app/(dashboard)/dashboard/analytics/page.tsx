"use client";

import { useEffect, useState } from "react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar } from "recharts";

export default function AnalyticsPage() {
  const [stats, setStats] = useState<{ last7Days: { date: string; views: number }[]; topPages: { path: string; count: number }[]; devices: { device: string; count: number }[]; countries: { country: string; count: number }[]; viewsMonth: number } | null>(null);

  useEffect(() => {
    fetch("/api/dashboard/stats").then((r) => r.json()).then(setStats);
  }, []);

  if (!stats) return <p style={{ color: "rgba(255,255,255,0.4)", padding: "40px" }}>Loading...</p>;

  return (
    <div>
      <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>Analytics</h1>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", marginBottom: "32px" }}>
        {stats.viewsMonth} views this month
      </p>

      {/* Views Chart */}
      <div style={{ background: "#111", borderRadius: "20px", border: "1px solid rgba(79,255,176,0.06)", padding: "24px", marginBottom: "24px" }}>
        <h3 style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: "16px" }}>Page Views (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={stats.last7Days}>
            <defs>
              <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4FFFB0" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#4FFFB0" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => v.slice(5)} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(79,255,176,0.15)", borderRadius: "12px" }} />
            <Area type="monotone" dataKey="views" stroke="#4FFFB0" strokeWidth={2} fill="url(#aGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {/* Top Pages */}
        <div style={{ background: "#111", borderRadius: "20px", border: "1px solid rgba(79,255,176,0.06)", padding: "24px" }}>
          <h3 style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: "16px" }}>Top Pages</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={stats.topPages} layout="vertical">
              <XAxis type="number" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="path" type="category" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} axisLine={false} tickLine={false} width={100} />
              <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(79,255,176,0.15)", borderRadius: "12px" }} />
              <Bar dataKey="count" fill="#4FFFB0" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Countries */}
        <div style={{ background: "#111", borderRadius: "20px", border: "1px solid rgba(79,255,176,0.06)", padding: "24px" }}>
          <h3 style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: "16px" }}>Countries</h3>
          {stats.countries.map((c) => {
            const total = stats.countries.reduce((a, b) => a + b.count, 0);
            const pct = total > 0 ? Math.round((c.count / total) * 100) : 0;
            return (
              <div key={c.country} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", width: "60px" }}>{c.country}</span>
                <div style={{ flex: 1, height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: "#4FFFB0", borderRadius: "3px" }} />
                </div>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#4FFFB0", width: "40px", textAlign: "right" }}>{c.count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

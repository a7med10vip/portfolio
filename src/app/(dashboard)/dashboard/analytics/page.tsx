"use client";

import { useEffect, useState } from "react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar } from "recharts";
import { TrendingUp, Globe } from "lucide-react";
import { hasFlag } from "country-flag-icons";

function CountryFlag({ code }: { code: string }) {
  if (!code || code === "Unknown" || !hasFlag(code)) return <Globe size={16} color="#9CA3AF" />;
  const flag = code.toUpperCase().replace(/./g, (c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65));
  return <span style={{ fontSize: "18px", lineHeight: 1 }}>{flag}</span>;
}

type Stats = {
  last7Days: { date: string; views: number }[];
  topPages: { path: string; count: number }[];
  devices: { device: string; count: number }[];
  countries: { country: string; count: number }[];
  viewsMonth: number;
  viewsTrend: number;
};

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  useEffect(() => { fetch("/api/dashboard/stats").then((r) => r.json()).then(setStats); }, []);
  if (!stats) return <p style={{ color: "#9CA3AF", padding: "40px", textAlign: "center" }}>Loading analytics...</p>;

  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#0F1729", marginBottom: "4px", letterSpacing: "-0.5px" }}>Analytics</h1>
        <p style={{ color: "#9CA3AF", fontSize: "14px", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
          <TrendingUp size={16} color="#16A34A" />
          <span style={{ color: "#16A34A", fontWeight: 600 }}>{stats.viewsMonth.toLocaleString()}</span> views this month
          {stats.viewsTrend !== 0 && (
            <span style={{ color: stats.viewsTrend >= 0 ? "#16A34A" : "#EF4444", fontWeight: 600 }}>
              ({stats.viewsTrend >= 0 ? "+" : ""}{stats.viewsTrend}%)
            </span>
          )}
        </p>
      </div>

      {/* Main chart */}
      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #E5E7EB", padding: "24px", marginBottom: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#0F1729", margin: "0 0 20px" }}>Page Views (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={stats.last7Days}>
            <defs>
              <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4FFFB0" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#4FFFB0" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" tick={{ fill: "#9CA3AF", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => v.slice(5)} />
            <YAxis tick={{ fill: "#9CA3AF", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} />
            <Area type="monotone" dataKey="views" stroke="#4FFFB0" strokeWidth={2.5} fill="url(#ag)" dot={{ r: 4, fill: "#fff", stroke: "#4FFFB0", strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {/* Top Pages */}
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #E5E7EB", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#0F1729", margin: "0 0 20px" }}>Top Pages</h3>
          {stats.topPages.length === 0 ? <p style={{ color: "#9CA3AF", fontSize: "13px" }}>No data</p> : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={stats.topPages} layout="vertical">
                <XAxis type="number" tick={{ fill: "#9CA3AF", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="path" type="category" tick={{ fill: "#374151", fontSize: 11 }} axisLine={false} tickLine={false} width={100} />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} />
                <Bar dataKey="count" fill="#4FFFB0" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Countries */}
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #E5E7EB", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#0F1729", margin: "0 0 20px" }}>Visitor Countries</h3>
          {stats.countries.length === 0 ? <p style={{ color: "#9CA3AF", fontSize: "13px" }}>No data</p> : stats.countries.map((c) => {
            const total = stats.countries.reduce((a, b) => a + b.count, 0);
            const pct = total > 0 ? Math.round((c.count / total) * 100) : 0;
            return (
              <div key={c.country} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                <CountryFlag code={c.country} />
                <span style={{ fontSize: "13px", color: "#374151", fontWeight: 500, width: "50px" }}>{c.country}</span>
                <div style={{ flex: 1, height: "6px", background: "#F3F4F6", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: "#4FFFB0", borderRadius: "3px", transition: "width 0.5s" }} />
                </div>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#0F1729", width: "40px", textAlign: "right" }}>{pct}%</span>
                <span style={{ fontSize: "12px", color: "#9CA3AF", width: "30px", textAlign: "right" }}>{c.count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

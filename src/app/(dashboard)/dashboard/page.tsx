"use client";

import { useEffect, useState } from "react";
import { Eye, Download, MessageSquare, MessagesSquare, TrendingUp, TrendingDown, Globe, Monitor, Smartphone, Tablet } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from "recharts";

type Stats = {
  viewsToday: number;
  viewsMonth: number;
  viewsTrend: number;
  cvDownloads: number;
  totalSubmissions: number;
  chatConversations: number;
  unreadMessages: number;
  last7Days: { date: string; views: number }[];
  recentContact: { id: string; name: string; email: string; subject: string; created_at: string; is_read: boolean }[];
  recentApply: { id: string; name: string; whatsapp: string; urgent: boolean; created_at: string; is_read: boolean }[];
  topPages: { path: string; count: number }[];
  devices: { device: string; count: number }[];
  countries: { country: string; count: number }[];
};

const deviceIcon = (d: string) => {
  if (d === "mobile") return <Smartphone size={14} />;
  if (d === "tablet") return <Tablet size={14} />;
  return <Monitor size={14} />;
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: "#111", borderRadius: "20px", border: "1px solid rgba(79,255,176,0.06)", padding: "24px", ...style }}>
      {children}
    </div>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/stats")
      .then((r) => r.json())
      .then((d) => { setStats(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
        <div style={{ width: "32px", height: "32px", border: "3px solid rgba(79,255,176,0.2)", borderTopColor: "#4FFFB0", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!stats) return <p style={{ color: "rgba(255,255,255,0.5)" }}>Failed to load dashboard data.</p>;

  const statCards = [
    { label: "Page Views (Today)", value: stats.viewsToday, icon: Eye, trend: stats.viewsTrend, color: "#4FFFB0" },
    { label: "CV Downloads", value: stats.cvDownloads, icon: Download, color: "#5227FF" },
    { label: "Submissions", value: stats.totalSubmissions, icon: MessageSquare, badge: stats.unreadMessages, color: "#FF4D00" },
    { label: "Chat Sessions", value: stats.chatConversations, icon: MessagesSquare, color: "#0A66C2" },
  ];

  return (
    <div>
      <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>Dashboard</h1>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", marginBottom: "32px" }}>
        Welcome back, Ahmed. Here&apos;s your portfolio overview.
      </p>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
        {statCards.map((card) => (
          <Card key={card.label}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "16px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: `${card.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <card.icon size={20} color={card.color} />
              </div>
              {card.trend !== undefined && (
                <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 600, color: card.trend >= 0 ? "#4FFFB0" : "#ff6b6b" }}>
                  {card.trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {Math.abs(card.trend)}%
                </div>
              )}
              {card.badge !== undefined && card.badge > 0 && (
                <span style={{ background: "#ff6b6b", color: "#fff", fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "999px" }}>
                  {card.badge} new
                </span>
              )}
            </div>
            <div style={{ fontSize: "32px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>{card.value}</div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{card.label}</div>
          </Card>
        ))}
      </div>

      {/* Chart + Top Pages */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px", marginBottom: "32px" }}>
        <Card>
          <h3 style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: "16px" }}>Views (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={stats.last7Days}>
              <defs>
                <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4FFFB0" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#4FFFB0" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => v.slice(5)} />
              <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(79,255,176,0.15)", borderRadius: "12px", fontSize: "12px" }} labelStyle={{ color: "rgba(255,255,255,0.5)" }} itemStyle={{ color: "#4FFFB0" }} />
              <Area type="monotone" dataKey="views" stroke="#4FFFB0" strokeWidth={2} fill="url(#viewsGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: "16px" }}>Top Pages</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {stats.topPages.length === 0 && <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px" }}>No data yet</p>}
            {stats.topPages.map((p) => (
              <div key={p.path} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "160px" }}>{p.path}</span>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#4FFFB0" }}>{p.count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Devices + Countries */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "32px" }}>
        <Card>
          <h3 style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: "16px" }}>Devices</h3>
          {stats.devices.length === 0 && <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px" }}>No data yet</p>}
          {stats.devices.map((d) => (
            <div key={d.device} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              {deviceIcon(d.device)}
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", flex: 1, textTransform: "capitalize" }}>{d.device}</span>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "#4FFFB0" }}>{d.count}</span>
            </div>
          ))}
        </Card>

        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <Globe size={16} color="rgba(255,255,255,0.6)" />
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.6)", margin: 0 }}>Countries</h3>
          </div>
          {stats.countries.length === 0 && <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px" }}>No data yet</p>}
          {stats.countries.map((c) => (
            <div key={c.country} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>{c.country}</span>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "#4FFFB0" }}>{c.count}</span>
            </div>
          ))}
        </Card>
      </div>

      {/* Recent Submissions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <Card>
          <h3 style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: "16px" }}>Recent Contact Messages</h3>
          {stats.recentContact.length === 0 && <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px" }}>No messages yet</p>}
          {stats.recentContact.map((m) => (
            <div key={m.id} style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#fff" }}>
                  {!m.is_read && <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "#4FFFB0", marginRight: "6px" }} />}
                  {m.name}
                </span>
                <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>{timeAgo(m.created_at)}</span>
              </div>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", margin: 0 }}>{m.subject || m.email}</p>
            </div>
          ))}
        </Card>

        <Card>
          <h3 style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: "16px" }}>Recent Applications</h3>
          {stats.recentApply.length === 0 && <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px" }}>No applications yet</p>}
          {stats.recentApply.map((m) => (
            <div key={m.id} style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#fff" }}>
                  {!m.is_read && <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "#4FFFB0", marginRight: "6px" }} />}
                  {m.name}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {m.urgent && <span style={{ fontSize: "10px", fontWeight: 700, color: "#ff6b6b", background: "rgba(255,75,75,0.1)", padding: "2px 8px", borderRadius: "999px" }}>Urgent</span>}
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>{timeAgo(m.created_at)}</span>
                </div>
              </div>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", margin: 0 }}>{m.whatsapp}</p>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

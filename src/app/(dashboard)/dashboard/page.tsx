"use client";

import { useEffect, useState } from "react";
import { Eye, Download, Inbox, MessagesSquare, TrendingUp, TrendingDown, Globe, Monitor, Smartphone, Tablet, Circle, Zap, Clock } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { hasFlag } from "country-flag-icons";

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

function CountryFlag({ code }: { code: string }) {
  if (!code || code === "Unknown" || !hasFlag(code)) {
    return <Globe size={16} color="#9CA3AF" />;
  }
  const flag = code.toUpperCase().replace(/./g, (c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65));
  return <span style={{ fontSize: "18px", lineHeight: 1 }}>{flag}</span>;
}

const deviceIcons: Record<string, React.ReactNode> = {
  mobile: <Smartphone size={16} color="#8B5CF6" />,
  tablet: <Tablet size={16} color="#F59E0B" />,
  desktop: <Monitor size={16} color="#3B82F6" />,
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={className}
      style={{
        background: "#fff",
        borderRadius: "16px",
        border: "1px solid #E5E7EB",
        padding: "24px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      {children}
    </div>
  );
}

function StatCard({ label, value, icon, trend, color, badge }: { label: string; value: number; icon: React.ReactNode; trend?: number; color: string; badge?: number }) {
  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "20px" }}>
        <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: `${color}12`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {icon}
        </div>
        {trend !== undefined && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: "3px", fontSize: "12px", fontWeight: 600, color: trend >= 0 ? "#16A34A" : "#EF4444", background: trend >= 0 ? "#F0FDF4" : "#FEF2F2", padding: "4px 10px", borderRadius: "999px" }}>
            {trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(trend)}%
          </span>
        )}
        {badge !== undefined && badge > 0 && (
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#fff", background: "#EF4444", padding: "3px 10px", borderRadius: "999px" }}>
            {badge} new
          </span>
        )}
      </div>
      <div style={{ fontSize: "36px", fontWeight: 700, color: "#0F1729", marginBottom: "4px", letterSpacing: "-1px" }}>{value.toLocaleString()}</div>
      <div style={{ fontSize: "13px", color: "#6B7280", fontWeight: 500 }}>{label}</div>
    </Card>
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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh", gap: "12px" }}>
        <div style={{ width: "24px", height: "24px", border: "3px solid #E5E7EB", borderTopColor: "#4FFFB0", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
        <span style={{ color: "#9CA3AF", fontSize: "14px" }}>Loading dashboard...</span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!stats) return <p style={{ color: "#6B7280" }}>Failed to load data.</p>;

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#0F1729", marginBottom: "4px", letterSpacing: "-0.5px" }}>
          Welcome back, Ahmed
        </h1>
        <p style={{ color: "#9CA3AF", fontSize: "14px", margin: 0 }}>
          Here&apos;s what&apos;s happening with your portfolio today.
        </p>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
        <StatCard label="Page Views Today" value={stats.viewsToday} icon={<Eye size={22} color="#4FFFB0" />} trend={stats.viewsTrend} color="#4FFFB0" />
        <StatCard label="CV Downloads" value={stats.cvDownloads} icon={<Download size={22} color="#8B5CF6" />} color="#8B5CF6" />
        <StatCard label="Total Submissions" value={stats.totalSubmissions} icon={<Inbox size={22} color="#F59E0B" />} badge={stats.unreadMessages} color="#F59E0B" />
        <StatCard label="Chat Sessions" value={stats.chatConversations} icon={<MessagesSquare size={22} color="#3B82F6" />} color="#3B82F6" />
      </div>

      {/* Chart + Top Pages */}
      <div style={{ display: "grid", gridTemplateColumns: "5fr 3fr", gap: "16px", marginBottom: "28px" }}>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#0F1729", margin: "0 0 2px" }}>Visitor Trends</h3>
              <p style={{ fontSize: "12px", color: "#9CA3AF", margin: 0 }}>Last 7 days</p>
            </div>
            <span style={{ fontSize: "24px", fontWeight: 700, color: "#0F1729" }}>{stats.viewsMonth.toLocaleString()}</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={stats.last7Days}>
              <defs>
                <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4FFFB0" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#4FFFB0" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fill: "#9CA3AF", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => v.slice(5)} />
              <Tooltip
                contentStyle={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", fontSize: "12px" }}
                labelStyle={{ color: "#6B7280", fontWeight: 600 }}
                itemStyle={{ color: "#0F1729" }}
              />
              <Area type="monotone" dataKey="views" stroke="#4FFFB0" strokeWidth={2.5} fill="url(#viewsGrad)" dot={{ r: 4, fill: "#fff", stroke: "#4FFFB0", strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#0F1729", margin: "0 0 20px" }}>Top Pages</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {stats.topPages.length === 0 && <p style={{ color: "#9CA3AF", fontSize: "13px" }}>No data yet</p>}
            {stats.topPages.map((p, i) => {
              const total = stats.topPages.reduce((a, b) => a + b.count, 0);
              const pct = total > 0 ? Math.round((p.count / total) * 100) : 0;
              return (
                <div key={p.path}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontSize: "13px", color: "#374151", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "180px" }}>{p.path}</span>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#0F1729" }}>{p.count}</span>
                  </div>
                  <div style={{ height: "4px", background: "#F3F4F6", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: i === 0 ? "#4FFFB0" : i === 1 ? "#8B5CF6" : "#3B82F6", borderRadius: "2px", transition: "width 0.5s" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Devices + Countries */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
        <Card>
          <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#0F1729", margin: "0 0 20px" }}>Devices</h3>
          {stats.devices.length === 0 && <p style={{ color: "#9CA3AF", fontSize: "13px" }}>No data yet</p>}
          {stats.devices.map((d) => {
            const total = stats.devices.reduce((a, b) => a + b.count, 0);
            const pct = total > 0 ? Math.round((d.count / total) * 100) : 0;
            return (
              <div key={d.device} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#F9FAFB", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {deviceIcons[d.device] || <Monitor size={16} color="#9CA3AF" />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontSize: "13px", color: "#374151", fontWeight: 500, textTransform: "capitalize" }}>{d.device}</span>
                    <span style={{ fontSize: "12px", color: "#9CA3AF" }}>{pct}%</span>
                  </div>
                  <div style={{ height: "4px", background: "#F3F4F6", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: d.device === "mobile" ? "#8B5CF6" : d.device === "tablet" ? "#F59E0B" : "#3B82F6", borderRadius: "2px" }} />
                  </div>
                </div>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#0F1729", minWidth: "30px", textAlign: "right" }}>{d.count}</span>
              </div>
            );
          })}
        </Card>

        <Card>
          <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#0F1729", margin: "0 0 20px" }}>Countries</h3>
          {stats.countries.length === 0 && <p style={{ color: "#9CA3AF", fontSize: "13px" }}>No data yet</p>}
          {stats.countries.map((c) => (
            <div key={c.country} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <CountryFlag code={c.country} />
              <span style={{ fontSize: "13px", color: "#374151", fontWeight: 500, flex: 1 }}>{c.country}</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#0F1729" }}>{c.count}</span>
            </div>
          ))}
        </Card>
      </div>

      {/* Recent Activity */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
            <Inbox size={18} color="#F59E0B" />
            <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#0F1729", margin: 0 }}>Recent Messages</h3>
          </div>
          {stats.recentContact.length === 0 && <p style={{ color: "#9CA3AF", fontSize: "13px" }}>No messages yet</p>}
          {stats.recentContact.map((m) => (
            <div key={m.id} style={{ display: "flex", alignItems: "start", gap: "12px", padding: "12px 0", borderBottom: "1px solid #F3F4F6" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: m.is_read ? "#F3F4F6" : "#F0FDF4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "14px", fontWeight: 700, color: m.is_read ? "#9CA3AF" : "#16A34A" }}>
                {m.name.charAt(0).toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#0F1729" }}>
                    {!m.is_read && <Circle size={6} fill="#16A34A" color="#16A34A" style={{ marginRight: "6px", verticalAlign: "middle" }} />}
                    {m.name}
                  </span>
                  <span style={{ fontSize: "11px", color: "#9CA3AF", display: "flex", alignItems: "center", gap: "3px" }}>
                    <Clock size={10} />
                    {timeAgo(m.created_at)}
                  </span>
                </div>
                <p style={{ fontSize: "12px", color: "#6B7280", margin: "2px 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.subject || m.email}</p>
              </div>
            </div>
          ))}
        </Card>

        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
            <Zap size={18} color="#8B5CF6" />
            <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#0F1729", margin: 0 }}>Recent Applications</h3>
          </div>
          {stats.recentApply.length === 0 && <p style={{ color: "#9CA3AF", fontSize: "13px" }}>No applications yet</p>}
          {stats.recentApply.map((m) => (
            <div key={m.id} style={{ display: "flex", alignItems: "start", gap: "12px", padding: "12px 0", borderBottom: "1px solid #F3F4F6" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: m.urgent ? "#FEF2F2" : "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "14px", fontWeight: 700, color: m.urgent ? "#EF4444" : "#9CA3AF" }}>
                {m.name.charAt(0).toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#0F1729" }}>
                    {!m.is_read && <Circle size={6} fill="#16A34A" color="#16A34A" style={{ marginRight: "6px", verticalAlign: "middle" }} />}
                    {m.name}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    {m.urgent && <span style={{ fontSize: "10px", fontWeight: 700, color: "#EF4444", background: "#FEF2F2", padding: "2px 8px", borderRadius: "999px" }}>Urgent</span>}
                    <span style={{ fontSize: "11px", color: "#9CA3AF" }}>{timeAgo(m.created_at)}</span>
                  </div>
                </div>
                <p style={{ fontSize: "12px", color: "#6B7280", margin: "2px 0 0" }}>{m.whatsapp}</p>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

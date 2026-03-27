"use client";

import { useEffect, useState } from "react";
import { Mail, FileText, Check, Circle, Clock, Search } from "lucide-react";

type Submission = {
  type: string;
  id: string;
  name: string;
  detail: string;
  urgent?: boolean;
  is_read: boolean;
  created_at: string;
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

export default function SubmissionsPage() {
  const [data, setData] = useState<Submission[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch(`/api/dashboard/submissions?type=${filter}`)
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); });
  };

  useEffect(() => { load(); }, [filter]);

  const markRead = async (id: string, type: string) => {
    await fetch("/api/dashboard/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, type, is_read: true }),
    });
    load();
  };

  const tabs = [
    { key: "all", label: "All", count: data.length },
    { key: "contact", label: "Contact", count: data.filter((d) => d.type === "contact").length },
    { key: "apply", label: "Applications", count: data.filter((d) => d.type === "apply").length },
  ];

  const unread = data.filter((d) => !d.is_read).length;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#0F1729", marginBottom: "4px", letterSpacing: "-0.5px" }}>Submissions</h1>
          <p style={{ color: "#9CA3AF", fontSize: "14px", margin: 0 }}>
            {data.length} total{unread > 0 && <span style={{ color: "#16A34A", fontWeight: 600 }}> ({unread} unread)</span>}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "20px", background: "#F3F4F6", padding: "4px", borderRadius: "12px", width: "fit-content" }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            style={{
              padding: "8px 18px",
              borderRadius: "9px",
              fontSize: "13px",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              background: filter === tab.key ? "#fff" : "transparent",
              color: filter === tab.key ? "#0F1729" : "#6B7280",
              boxShadow: filter === tab.key ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              transition: "all 0.15s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <p style={{ color: "#9CA3AF", padding: "40px", textAlign: "center" }}>Loading...</p>
      ) : data.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #E5E7EB", padding: "60px", textAlign: "center" }}>
          <Search size={32} color="#D1D5DB" style={{ marginBottom: "12px" }} />
          <p style={{ color: "#9CA3AF", fontSize: "14px", margin: 0 }}>No submissions yet.</p>
        </div>
      ) : (
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #E5E7EB", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: "40px 1fr 120px 100px 80px", gap: "16px", padding: "12px 24px", borderBottom: "1px solid #F3F4F6", background: "#F9FAFB" }}>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase" }}></span>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase" }}>Sender</span>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase" }}>Type</span>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase" }}>Time</span>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase" }}>Action</span>
          </div>

          {data.map((item) => (
            <div
              key={item.id}
              style={{
                display: "grid",
                gridTemplateColumns: "40px 1fr 120px 100px 80px",
                gap: "16px",
                padding: "14px 24px",
                alignItems: "center",
                borderBottom: "1px solid #F9FAFB",
                background: item.is_read ? "#fff" : "#FAFFFE",
                transition: "background 0.15s",
              }}
            >
              {/* Avatar */}
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: item.type === "contact" ? "#F0FDF4" : "#F5F3FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: item.type === "contact" ? "#16A34A" : "#7C3AED" }}>
                {item.name.charAt(0).toUpperCase()}
              </div>

              {/* Sender info */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  {!item.is_read && <Circle size={6} fill="#16A34A" color="#16A34A" />}
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#0F1729" }}>{item.name}</span>
                  {item.urgent && <span style={{ fontSize: "10px", fontWeight: 700, color: "#EF4444", background: "#FEF2F2", padding: "2px 8px", borderRadius: "999px" }}>Urgent</span>}
                </div>
                <span style={{ fontSize: "12px", color: "#9CA3AF" }}>{item.detail}</span>
              </div>

              {/* Type */}
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 500, color: item.type === "contact" ? "#16A34A" : "#7C3AED" }}>
                {item.type === "contact" ? <Mail size={13} /> : <FileText size={13} />}
                {item.type === "contact" ? "Contact" : "Application"}
              </span>

              {/* Time */}
              <span style={{ fontSize: "12px", color: "#9CA3AF", display: "flex", alignItems: "center", gap: "4px" }}>
                <Clock size={11} />
                {timeAgo(item.created_at)}
              </span>

              {/* Action */}
              {!item.is_read ? (
                <button
                  onClick={() => markRead(item.id, item.type)}
                  style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "8px", padding: "5px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", fontWeight: 600, color: "#16A34A" }}
                >
                  <Check size={12} /> Read
                </button>
              ) : (
                <span style={{ fontSize: "11px", color: "#D1D5DB" }}>Read</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Mail, FileText, Check, Circle } from "lucide-react";

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
    { key: "all", label: "All" },
    { key: "contact", label: "Contact" },
    { key: "apply", label: "Apply" },
  ];

  return (
    <div>
      <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "24px" }}>Submissions</h1>

      <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            style={{
              padding: "8px 20px",
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              background: filter === tab.key ? "#4FFFB0" : "rgba(255,255,255,0.06)",
              color: filter === tab.key ? "#0A0A0A" : "rgba(255,255,255,0.5)",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: "rgba(255,255,255,0.4)" }}>Loading...</p>
      ) : data.length === 0 ? (
        <p style={{ color: "rgba(255,255,255,0.4)" }}>No submissions yet.</p>
      ) : (
        <div style={{ background: "#111", borderRadius: "20px", border: "1px solid rgba(79,255,176,0.06)", overflow: "hidden" }}>
          {data.map((item, i) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "16px 24px",
                borderBottom: i < data.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                background: item.is_read ? "transparent" : "rgba(79,255,176,0.02)",
              }}
            >
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: item.type === "contact" ? "rgba(79,255,176,0.1)" : "rgba(82,39,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {item.type === "contact" ? <Mail size={16} color="#4FFFB0" /> : <FileText size={16} color="#5227FF" />}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
                  {!item.is_read && <Circle size={8} fill="#4FFFB0" color="#4FFFB0" />}
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>{item.name}</span>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", textTransform: "capitalize", background: "rgba(255,255,255,0.05)", padding: "2px 8px", borderRadius: "999px" }}>{item.type}</span>
                  {item.urgent && <span style={{ fontSize: "10px", fontWeight: 700, color: "#ff6b6b", background: "rgba(255,75,75,0.1)", padding: "2px 8px", borderRadius: "999px" }}>Urgent</span>}
                </div>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{item.detail}</span>
              </div>

              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", flexShrink: 0 }}>{timeAgo(item.created_at)}</span>

              {!item.is_read && (
                <button
                  onClick={() => markRead(item.id, item.type)}
                  style={{ background: "rgba(79,255,176,0.1)", border: "none", borderRadius: "8px", padding: "6px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", fontWeight: 600, color: "#4FFFB0", flexShrink: 0 }}
                >
                  <Check size={12} /> Read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

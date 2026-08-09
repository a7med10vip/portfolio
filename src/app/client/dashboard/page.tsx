"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { LogOut, Bell, Folder, CheckCircle2, Clock, AlertCircle, ChevronRight } from "lucide-react";
import type { ClientProfile, Project, Phase, Notification } from "@/lib/portal-types";

// ── helpers ────────────────────────────────────────────────────────────────────
const PHASE_BADGE = {
  pending: { color: "#9CA3AF", bg: "#F3F4F6" },
  active:  { color: "#D97706", bg: "#FFFBEB" },
  done:    { color: "#16A34A", bg: "#F0FDF4" },
} as const;

function statusIcon(status: Project["status"]) {
  if (status === "active")    return <Clock size={15} color="#D97706" />;
  if (status === "completed") return <CheckCircle2 size={15} color="#16A34A" />;
  return <AlertCircle size={15} color="#9CA3AF" />;
}

function timeAgo(date: string) {
  const d = Date.now() - new Date(date).getTime();
  const m = Math.floor(d / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

// ── page ──────────────────────────────────────────────────────────────────────
export default function ClientDashboard() {
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [projects, setProjects] = useState<(Project & { phases: Phase[] })[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNotifs, setShowNotifs] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { window.location.href = "/client/login"; return; }

      const [profileRes, projectsRes, notifsRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).single(),
        supabase.from("projects").select("*, phases(*)").eq("client_id", user.id).order("created_at", { ascending: false }),
        supabase.from("notifications").select("*").eq("client_id", user.id).order("created_at", { ascending: false }).limit(30),
      ]);

      setProfile(profileRes.data);
      setProjects(projectsRes.data ?? []);
      setNotifications(notifsRes.data ?? []);
      setLoading(false);
    });
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/client/login";
  };

  const markRead = async (id: string) => {
    const supabase = createClient();
    await supabase.from("notifications").update({ read: true }).eq("id", id);
    setNotifications((n) => n.map((x) => x.id === id ? { ...x, read: true } : x));
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 30, height: 30, border: "3px solid #E5E7EB", borderTopColor: "#4FFFB0", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  const unread = notifications.filter((n) => !n.read).length;
  const allPhases = projects.flatMap((p) => p.phases ?? []);
  const activeProjects = projects.filter((p) => p.status === "active").length;
  const donePhases = allPhases.filter((ph) => ph.status === "done").length;

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

      {/* Nav */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 28px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 9, background: "#0F1729", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#4FFFB0", fontWeight: 800, fontSize: 13 }}>A</span>
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#0F1729" }}>
            {profile?.full_name ?? "Client"}<span style={{ color: "#4FFFB0" }}>.</span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Notifications bell */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowNotifs((v) => !v)}
              style={{ position: "relative", padding: "7px 8px", borderRadius: 10, background: unread > 0 ? "#FEF2F2" : "#F9FAFB", border: "1px solid #E5E7EB", cursor: "pointer", display: "flex", alignItems: "center" }}
            >
              <Bell size={16} color={unread > 0 ? "#EF4444" : "#6B7280"} />
              {unread > 0 && (
                <span style={{ position: "absolute", top: 3, right: 3, width: 7, height: 7, borderRadius: "50%", background: "#EF4444", border: "1.5px solid #fff" }} />
              )}
            </button>
            {showNotifs && (
              <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", width: 310, background: "#fff", borderRadius: 14, border: "1px solid #E5E7EB", boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 50, overflow: "hidden" }}>
                <div style={{ padding: "12px 16px", borderBottom: "1px solid #F3F4F6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#0F1729" }}>Notifications</span>
                  {unread > 0 && <span style={{ fontSize: 11, color: "#9CA3AF" }}>{unread} unread</span>}
                </div>
                <div style={{ maxHeight: 300, overflowY: "auto" }}>
                  {notifications.length === 0 ? (
                    <p style={{ padding: 20, textAlign: "center", color: "#9CA3AF", fontSize: 12, margin: 0 }}>No notifications yet</p>
                  ) : notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markRead(n.id)}
                      style={{ padding: "11px 16px", borderBottom: "1px solid #F9FAFB", cursor: "pointer", background: n.read ? "#fff" : "#FAFFF8", display: "flex", gap: 9 }}
                    >
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: n.read ? "#E5E7EB" : "#4FFFB0", marginTop: 5, flexShrink: 0 }} />
                      <div>
                        <p style={{ margin: 0, fontSize: 12, fontWeight: n.read ? 400 : 600, color: "#0F1729" }}>{n.title}</p>
                        {n.message && <p style={{ margin: "2px 0 0", fontSize: 11, color: "#6B7280" }}>{n.message}</p>}
                        <p style={{ margin: "4px 0 0", fontSize: 10, color: "#9CA3AF" }}>{timeAgo(n.created_at)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            style={{ padding: "7px 13px", borderRadius: 10, background: "#F9FAFB", border: "1px solid #E5E7EB", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 500, color: "#6B7280" }}
          >
            <LogOut size={13} /> Sign Out
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 20px" }}>

        {/* Greeting */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0F1729", margin: "0 0 4px" }}>
            Welcome, {profile?.full_name?.split(" ")[0] ?? "Client"} 👋
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 13, margin: 0 }}>Here's an overview of your projects and progress.</p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 28 }}>
          {[
            { label: "Total Projects", value: projects.length, color: "#3B82F6", icon: <Folder size={18} color="#3B82F6" /> },
            { label: "Active Projects", value: activeProjects, color: "#16A34A", icon: <Clock size={18} color="#16A34A" /> },
            { label: "Phases Done", value: `${donePhases} / ${allPhases.length}`, color: "#8B5CF6", icon: <CheckCircle2 size={18} color="#8B5CF6" /> },
          ].map((s) => (
            <div key={s.label} style={{ background: "#fff", borderRadius: 14, border: "1px solid #E5E7EB", padding: "18px 20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: s.color + "15", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>{s.icon}</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: "#0F1729", letterSpacing: "-0.5px", marginBottom: 2 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#6B7280", fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Projects */}
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "#0F1729", margin: "0 0 14px" }}>Your Projects</h2>
        {projects.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #E5E7EB", padding: "48px 24px", textAlign: "center" }}>
            <Folder size={32} color="#E5E7EB" style={{ margin: "0 auto 10px", display: "block" }} />
            <p style={{ color: "#9CA3AF", fontSize: 13, margin: 0 }}>No projects yet. They'll appear here once created.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {projects.map((project) => {
              const sorted = [...(project.phases ?? [])].sort((a, b) => a.ord - b.ord);
              return (
                <a
                  key={project.id}
                  href={`/client/project/${project.id}`}
                  style={{ display: "block", background: "#fff", borderRadius: 14, border: "1px solid #E5E7EB", padding: "18px 20px", textDecoration: "none", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
                >
                  {/* Title row */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    {statusIcon(project.status)}
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#0F1729", flex: 1 }}>{project.title}</span>
                    <ChevronRight size={16} color="#9CA3AF" />
                  </div>

                  {/* Progress bar */}
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 11, color: "#9CA3AF" }}>Progress</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#0F1729" }}>{project.progress}%</span>
                    </div>
                    <div style={{ height: 5, background: "#F3F4F6", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ width: `${project.progress}%`, height: "100%", background: project.progress === 100 ? "#4FFFB0" : "#3B82F6", borderRadius: 3, transition: "width 0.4s" }} />
                    </div>
                  </div>

                  {/* Phase badges */}
                  {sorted.length > 0 && (
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                      {sorted.slice(0, 6).map((ph) => {
                        const pb = PHASE_BADGE[ph.status];
                        return (
                          <span key={ph.id} style={{ fontSize: 10, fontWeight: 600, color: pb.color, background: pb.bg, padding: "2px 8px", borderRadius: 999 }}>{ph.title}</span>
                        );
                      })}
                      {sorted.length > 6 && <span style={{ fontSize: 10, color: "#9CA3AF", padding: "2px 6px" }}>+{sorted.length - 6}</span>}
                    </div>
                  )}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

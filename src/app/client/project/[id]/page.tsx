"use client";

import { use, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, CheckCircle2, Clock, Circle, Upload, FileText, Download, Loader2, Calendar } from "lucide-react";
import type { Project, Phase, FileRecord, ActivityEntry, ClientProfile } from "@/lib/portal-types";

// ── helpers ────────────────────────────────────────────────────────────────────
const PHASE_COLORS = {
  done:    { ring: "#4FFFB0", bg: "#F0FDF4", text: "#16A34A", label: "Completed" },
  active:  { ring: "#F59E0B", bg: "#FFFBEB", text: "#D97706", label: "In Progress" },
  pending: { ring: "#E5E7EB", bg: "#F9FAFB", text: "#9CA3AF", label: "Upcoming" },
} as const;

function PhaseIcon({ status }: { status: Phase["status"] }) {
  if (status === "done")   return <CheckCircle2 size={13} />;
  if (status === "active") return <Clock size={13} />;
  return <Circle size={10} />;
}

function fileSize(bytes: number | null) {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

function actionLabel(action: string, details: Record<string, string> | null): string {
  switch (action) {
    case "project_created":      return `Project created${details?.title ? `: ${details.title}` : ""}`;
    case "phase_status_changed": return `"${details?.phase_title ?? "Phase"}" moved to ${details?.to ?? ""}`;
    default: return action.replace(/_/g, " ");
  }
}

// ── page ──────────────────────────────────────────────────────────────────────
export default function ClientProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [project, setProject] = useState<(Project & { phases: Phase[] }) | null>(null);
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [activity, setActivity] = useState<ActivityEntry[]>([]);
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const refreshFiles = async () => {
    const supabase = createClient();
    const { data } = await supabase.from("files").select("*").eq("project_id", id).order("created_at", { ascending: false });
    setFiles(data ?? []);
  };

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { window.location.href = "/client/login"; return; }

      const [profileRes, projectRes, filesRes, activityRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).single(),
        supabase.from("projects").select("*, phases(*)").eq("id", id).single(),
        supabase.from("files").select("*").eq("project_id", id).order("created_at", { ascending: false }),
        supabase.from("activity_log").select("*").eq("project_id", id).order("created_at", { ascending: false }).limit(20),
      ]);

      // Security: make sure project belongs to this client
      if (projectRes.data && projectRes.data.client_id !== user.id) {
        window.location.href = "/client/dashboard";
        return;
      }

      setProfile(profileRes.data);
      setProject(projectRes.data);
      setFiles(filesRes.data ?? []);
      setActivity(activityRes.data ?? []);
      setLoading(false);
    });
  }, [id]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !project) return;
    setUploading(true);

    const supabase = createClient();
    const path = `${project.id}/client/${Date.now()}-${file.name}`;

    const { error: uploadErr } = await supabase.storage.from("project-files").upload(path, file);
    if (uploadErr) {
      alert("Upload failed: " + uploadErr.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("project-files").getPublicUrl(path);
    await supabase.from("files").insert({
      project_id: project.id,
      name: file.name,
      url: urlData.publicUrl,
      size: file.size,
      mime_type: file.type,
      uploaded_by: "client",
    });

    await refreshFiles();
    setUploading(false);
    e.target.value = "";
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 30, height: 30, border: "3px solid #E5E7EB", borderTopColor: "#4FFFB0", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  if (!project) return null;

  const sorted = [...(project.phases ?? [])].sort((a, b) => a.ord - b.ord);
  const adminFiles = files.filter((f) => f.uploaded_by === "admin");
  const clientFiles = files.filter((f) => f.uploaded_by === "client");

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

      {/* Top bar */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 28px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 20 }}>
        <a href="/client/dashboard" style={{ display: "flex", alignItems: "center", gap: 6, color: "#6B7280", fontSize: 12, textDecoration: "none", fontWeight: 500 }}>
          <ArrowLeft size={14} /> Projects
        </a>
        <span style={{ fontSize: 12, color: "#9CA3AF" }}>{profile?.full_name}</span>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 20px", display: "grid", gridTemplateColumns: "1fr 320px", gap: 20, alignItems: "start" }}>

        {/* ── Left ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

          {/* Project header */}
          <div style={{ background: "#fff", borderRadius: 18, border: "1px solid #E5E7EB", padding: "24px 26px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#0F1729", margin: "0 0 6px" }}>{project.title}</h1>
            {project.description && <p style={{ color: "#6B7280", fontSize: 13, margin: "0 0 16px", lineHeight: 1.5 }}>{project.description}</p>}

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <div style={{ flex: 1, height: 7, background: "#F3F4F6", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: `${project.progress}%`, height: "100%", background: project.progress === 100 ? "#4FFFB0" : "#3B82F6", borderRadius: 4, transition: "width 0.5s" }} />
              </div>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#0F1729", minWidth: 42 }}>{project.progress}%</span>
            </div>

            {project.deadline && (
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 10 }}>
                <Calendar size={12} color="#9CA3AF" />
                <span style={{ fontSize: 12, color: "#9CA3AF" }}>Deadline: {new Date(project.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
              </div>
            )}
          </div>

          {/* Phases timeline */}
          <div style={{ background: "#fff", borderRadius: 18, border: "1px solid #E5E7EB", padding: "24px 26px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "#0F1729", margin: "0 0 22px" }}>Project Phases</h2>
            {sorted.length === 0 ? (
              <p style={{ color: "#9CA3AF", fontSize: 13, margin: 0 }}>No phases defined yet.</p>
            ) : (
              <div>
                {sorted.map((phase, idx) => {
                  const pc = PHASE_COLORS[phase.status];
                  const isLast = idx === sorted.length - 1;
                  return (
                    <div key={phase.id} style={{ display: "flex", gap: 14, position: "relative" }}>
                      {/* Connector */}
                      {!isLast && (
                        <div style={{ position: "absolute", left: 13, top: 28, bottom: 0, width: 2, background: pc.ring + "30" }} />
                      )}
                      {/* Circle */}
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: pc.bg, border: `2px solid ${pc.ring}`, display: "flex", alignItems: "center", justifyContent: "center", color: pc.ring, flexShrink: 0, zIndex: 1, marginTop: 2 }}>
                        <PhaseIcon status={phase.status} />
                      </div>
                      {/* Text */}
                      <div style={{ flex: 1, paddingBottom: isLast ? 0 : 22 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: "#0F1729" }}>{phase.title}</span>
                          <span style={{ fontSize: 10, fontWeight: 700, color: pc.text, background: pc.bg, padding: "1px 7px", borderRadius: 999 }}>{pc.label}</span>
                        </div>
                        {phase.description && <p style={{ fontSize: 12, color: "#6B7280", margin: 0, lineHeight: 1.4 }}>{phase.description}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── Right ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Files from Ahmed */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E5E7EB", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "#0F1729", margin: "0 0 14px" }}>Files from Ahmed</h3>
            {adminFiles.length === 0 ? (
              <p style={{ fontSize: 12, color: "#9CA3AF", margin: 0 }}>No files yet.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {adminFiles.map((f) => (
                  <a
                    key={f.id}
                    href={f.url}
                    target="_blank"
                    rel="noopener"
                    style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 11px", borderRadius: 10, background: "#F9FAFB", border: "1px solid #E5E7EB", textDecoration: "none" }}
                  >
                    <FileText size={14} color="#3B82F6" style={{ flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: 12, fontWeight: 500, color: "#0F1729", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</p>
                      {f.size != null && <p style={{ margin: 0, fontSize: 10, color: "#9CA3AF" }}>{fileSize(f.size)}</p>}
                    </div>
                    <Download size={12} color="#9CA3AF" style={{ flexShrink: 0 }} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Your uploads */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E5E7EB", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "#0F1729", margin: "0 0 14px" }}>Your Files</h3>

            <label style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "9px", borderRadius: 10, border: "1.5px dashed #D1D5DB", cursor: "pointer", color: "#6B7280", fontSize: 12, fontWeight: 500, marginBottom: clientFiles.length > 0 ? 10 : 0 }}>
              <input type="file" onChange={handleUpload} disabled={uploading} style={{ display: "none" }} />
              {uploading ? <Loader2 size={13} style={{ animation: "spin 0.7s linear infinite" }} /> : <Upload size={13} />}
              {uploading ? "Uploading…" : "Upload a file"}
            </label>

            {clientFiles.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {clientFiles.map((f) => (
                  <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 11px", borderRadius: 10, background: "#F9FAFB", border: "1px solid #E5E7EB" }}>
                    <FileText size={14} color="#4FFFB0" style={{ flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: 12, fontWeight: 500, color: "#0F1729", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</p>
                      {f.size != null && <p style={{ margin: 0, fontSize: 10, color: "#9CA3AF" }}>{fileSize(f.size)}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Activity */}
          {activity.length > 0 && (
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E5E7EB", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: "#0F1729", margin: "0 0 14px" }}>Activity</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {activity.map((entry) => (
                  <div key={entry.id} style={{ display: "flex", gap: 9, alignItems: "start" }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4FFFB0", marginTop: 5, flexShrink: 0 }} />
                    <div>
                      <p style={{ margin: 0, fontSize: 12, color: "#374151" }}>{actionLabel(entry.action, entry.details)}</p>
                      <p style={{ margin: "2px 0 0", fontSize: 10, color: "#9CA3AF" }}>{new Date(entry.created_at).toLocaleDateString("en-GB")}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

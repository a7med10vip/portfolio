"use client";

import { use, useEffect, useState, useCallback } from "react";
import {
  ArrowLeft, Plus, Building2, Phone, Mail, Loader2, X,
  ChevronDown, ChevronUp, Check, Clock, Circle, Trash2, ExternalLink,
} from "lucide-react";
import type { ClientWithProjects, Phase, Project } from "@/lib/portal-types";

// ── constants ─────────────────────────────────────────────────────────────────
const PHASE_STYLE = {
  pending: { label: "Pending", color: "#9CA3AF", bg: "#F3F4F6" },
  active:  { label: "Active",  color: "#D97706", bg: "#FFFBEB" },
  done:    { label: "Done",    color: "#16A34A", bg: "#F0FDF4" },
} as const;

const PROJECT_STYLE = {
  active:    { label: "Active",    color: "#16A34A", bg: "#F0FDF4" },
  paused:    { label: "Paused",    color: "#D97706", bg: "#FFFBEB" },
  completed: { label: "Completed", color: "#6B7280", bg: "#F9FAFB" },
  cancelled: { label: "Cancelled", color: "#EF4444", bg: "#FEF2F2" },
} as const;

// ── small components ──────────────────────────────────────────────────────────
function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={onClose}
    >
      <div
        style={{ background: "#fff", borderRadius: 20, padding: 32, width: "100%", maxWidth: 500, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} style={{ padding: "10px 13px", borderRadius: 10, border: "1px solid #E5E7EB", fontSize: 13, outline: "none", width: "100%", boxSizing: "border-box", ...props.style }} />;
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} style={{ padding: "10px 13px", borderRadius: 10, border: "1px solid #E5E7EB", fontSize: 13, outline: "none", width: "100%", boxSizing: "border-box", resize: "vertical", ...props.style }} />;
}

function Label({ children }: { children: React.ReactNode }) {
  return <label style={{ fontSize: 11, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>{children}</label>;
}

function PhaseIcon({ status }: { status: Phase["status"] }) {
  if (status === "done") return <Check size={11} />;
  if (status === "active") return <Clock size={11} />;
  return <Circle size={9} />;
}

// ── page ──────────────────────────────────────────────────────────────────────
export default function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [client, setClient] = useState<ClientWithProjects | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [addProjectOpen, setAddProjectOpen] = useState(false);
  const [addPhaseFor, setAddPhaseFor] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState({ title: "", description: "", deadline: "" });
  const [phaseTitle, setPhaseTitle] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    fetch(`/api/clients/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setClient(d);
        setExpanded(new Set(d.projects?.map((p: Project) => p.id) ?? []));
        setLoading(false);
      });
  }, [id]);

  useEffect(load, [load]);

  const togglePhaseStatus = async (phaseId: string, current: Phase["status"]) => {
    const next: Record<Phase["status"], Phase["status"]> = { pending: "active", active: "done", done: "pending" };
    await fetch(`/api/phases/${phaseId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next[current] }),
    });
    load();
  };

  const setPhaseStatus = async (phaseId: string, status: Phase["status"]) => {
    await fetch(`/api/phases/${phaseId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  };

  const deleteProject = async (projectId: string, title: string) => {
    if (!confirm(`Delete project "${title}"? This cannot be undone.`)) return;
    await fetch(`/api/projects/${projectId}`, { method: "DELETE" });
    load();
  };

  const deletePhase = async (phaseId: string, title: string) => {
    if (!confirm(`Delete phase "${title}"?`)) return;
    await fetch(`/api/phases/${phaseId}`, { method: "DELETE" });
    load();
  };

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ client_id: id, ...projectForm }),
    });
    setAddProjectOpen(false);
    setProjectForm({ title: "", description: "", deadline: "" });
    setSaving(false);
    load();
  };

  const addPhase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addPhaseFor || !phaseTitle.trim()) return;
    setSaving(true);
    const projectPhases = client?.projects.find((p) => p.id === addPhaseFor)?.phases ?? [];
    await fetch("/api/phases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ project_id: addPhaseFor, title: phaseTitle, ord: projectPhases.length }),
    });
    setAddPhaseFor(null);
    setPhaseTitle("");
    setSaving(false);
    load();
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "32px 0", color: "#9CA3AF", fontSize: 13 }}>
        <Loader2 size={18} style={{ animation: "spin 0.7s linear infinite" }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        Loading…
      </div>
    );
  }

  if (!client) return <p style={{ color: "#9CA3AF" }}>Client not found.</p>;

  const initials = (client.full_name || client.email).charAt(0).toUpperCase();

  return (
    <div style={{ maxWidth: 820 }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

      {/* Back */}
      <a href="/dashboard/clients" style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "#6B7280", fontSize: 12, textDecoration: "none", marginBottom: 20, fontWeight: 500 }}>
        <ArrowLeft size={14} /> All Clients
      </a>

      {/* Client Card */}
      <div style={{ background: "#fff", borderRadius: 18, border: "1px solid #E5E7EB", padding: "22px 26px", marginBottom: 28, display: "flex", alignItems: "center", gap: 18, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#4FFFB020", border: "2px solid #4FFFB050", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: "#4FFFB0", flexShrink: 0 }}>
          {initials}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#0F1729", margin: 0 }}>{client.full_name || "—"}</h1>
            {client.username && <span style={{ fontSize: 11, color: "#9CA3AF", background: "#F3F4F6", padding: "2px 9px", borderRadius: 999 }}>@{client.username}</span>}
          </div>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, color: "#6B7280", display: "flex", alignItems: "center", gap: 4 }}><Mail size={12} />{client.email}</span>
            {client.company && <span style={{ fontSize: 12, color: "#6B7280", display: "flex", alignItems: "center", gap: 4 }}><Building2 size={12} />{client.company}</span>}
            {client.phone && <span style={{ fontSize: 12, color: "#6B7280", display: "flex", alignItems: "center", gap: 4 }}><Phone size={12} />{client.phone}</span>}
          </div>
        </div>
        <a
          href="/client/login"
          target="_blank"
          style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 10, background: "#F9FAFB", border: "1px solid #E5E7EB", fontSize: 11, fontWeight: 600, color: "#374151", textDecoration: "none" }}
        >
          <ExternalLink size={12} /> Client Portal
        </a>
      </div>

      {/* Projects header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "#0F1729", margin: 0 }}>Projects ({client.projects?.length ?? 0})</h2>
        <button
          onClick={() => setAddProjectOpen(true)}
          style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 10, background: "#0F1729", color: "#4FFFB0", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600 }}
        >
          <Plus size={13} /> Add Project
        </button>
      </div>

      {/* Projects list */}
      {!client.projects?.length ? (
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #E5E7EB", padding: 40, textAlign: "center" }}>
          <p style={{ color: "#9CA3AF", fontSize: 13, margin: 0 }}>No projects yet.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {client.projects.map((project) => {
            const isExpanded = expanded.has(project.id);
            const ps = PROJECT_STYLE[project.status as keyof typeof PROJECT_STYLE] ?? PROJECT_STYLE.active;
            const sorted = [...(project.phases ?? [])].sort((a, b) => a.ord - b.ord);
            const doneCount = sorted.filter((p) => p.status === "done").length;

            return (
              <div key={project.id} style={{ background: "#fff", borderRadius: 14, border: "1px solid #E5E7EB", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                {/* Project header row */}
                <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#0F1729" }}>{project.title}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: ps.color, background: ps.bg, padding: "2px 8px", borderRadius: 999 }}>{ps.label}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <div style={{ flex: 1, height: 4, background: "#F3F4F6", borderRadius: 2, overflow: "hidden" }}>
                        <div style={{ width: `${project.progress}%`, height: "100%", background: "#4FFFB0", borderRadius: 2, transition: "width 0.4s" }} />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 600, color: "#0F1729", minWidth: 34 }}>{project.progress}%</span>
                      <span style={{ fontSize: 11, color: "#9CA3AF" }}>{doneCount}/{sorted.length}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      onClick={() => setExpanded((s) => { const n = new Set(s); isExpanded ? n.delete(project.id) : n.add(project.id); return n; })}
                      style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 11px", borderRadius: 8, background: "#F9FAFB", border: "1px solid #E5E7EB", cursor: "pointer", color: "#6B7280", fontSize: 11, fontWeight: 600 }}
                    >
                      {isExpanded ? <><ChevronUp size={13} />Hide</> : <><ChevronDown size={13} />Phases</>}
                    </button>
                    <button
                      onClick={() => deleteProject(project.id, project.title)}
                      style={{ padding: "5px 8px", borderRadius: 8, background: "#FEF2F2", border: "none", cursor: "pointer", color: "#EF4444", display: "flex", alignItems: "center" }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>

                {/* Phases */}
                {isExpanded && (
                  <div style={{ borderTop: "1px solid #F3F4F6", padding: "14px 20px" }}>
                    {sorted.length === 0 ? (
                      <p style={{ color: "#9CA3AF", fontSize: 12, margin: "0 0 10px" }}>No phases yet.</p>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
                        {sorted.map((phase, idx) => {
                          const ph = PHASE_STYLE[phase.status];
                          return (
                            <div key={phase.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <span style={{ fontSize: 10, color: "#C4C9D4", fontWeight: 600, minWidth: 18, textAlign: "right" }}>{idx + 1}</span>
                              <div
                                onClick={() => togglePhaseStatus(phase.id, phase.status)}
                                style={{ width: 22, height: 22, borderRadius: "50%", background: ph.bg, border: `2px solid ${ph.color}50`, display: "flex", alignItems: "center", justifyContent: "center", color: ph.color, flexShrink: 0, cursor: "pointer" }}
                                title="Click to advance status"
                              >
                                <PhaseIcon status={phase.status} />
                              </div>
                              <span style={{ flex: 1, fontSize: 13, color: "#374151", fontWeight: 500 }}>{phase.title}</span>
                              <select
                                value={phase.status}
                                onChange={(e) => setPhaseStatus(phase.id, e.target.value as Phase["status"])}
                                style={{ padding: "3px 7px", borderRadius: 7, border: `1px solid ${ph.color}40`, background: ph.bg, color: ph.color, fontSize: 10, fontWeight: 700, cursor: "pointer", outline: "none" }}
                              >
                                <option value="pending">Pending</option>
                                <option value="active">Active</option>
                                <option value="done">Done</option>
                              </select>
                              <button
                                onClick={() => deletePhase(phase.id, phase.title)}
                                style={{ padding: "3px 5px", background: "none", border: "none", cursor: "pointer", color: "#D1D5DB", display: "flex", alignItems: "center" }}
                              >
                                <X size={12} />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <button
                      onClick={() => setAddPhaseFor(project.id)}
                      style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 11px", borderRadius: 8, background: "#F9FAFB", border: "1px dashed #D1D5DB", cursor: "pointer", fontSize: 11, color: "#6B7280" }}
                    >
                      <Plus size={11} /> Add Phase
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add Project Modal */}
      <Modal open={addProjectOpen} onClose={() => setAddProjectOpen(false)}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: "#0F1729", margin: 0 }}>New Project</h2>
          <button onClick={() => setAddProjectOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF" }}><X size={18} /></button>
        </div>
        <form onSubmit={createProject} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <Label>Title *</Label>
            <Input required placeholder="e.g. Website Redesign" value={projectForm.title} onChange={(e) => setProjectForm((f) => ({ ...f, title: e.target.value }))} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <Label>Description</Label>
            <Textarea rows={3} placeholder="Project details…" value={projectForm.description} onChange={(e) => setProjectForm((f) => ({ ...f, description: e.target.value }))} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <Label>Deadline</Label>
            <Input type="date" value={projectForm.deadline} onChange={(e) => setProjectForm((f) => ({ ...f, deadline: e.target.value }))} />
          </div>
          <button type="submit" disabled={saving} style={{ padding: 12, borderRadius: 12, background: "#0F1729", color: "#4FFFB0", border: "none", cursor: saving ? "not-allowed" : "pointer", fontSize: 13, fontWeight: 600, opacity: saving ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginTop: 4 }}>
            {saving ? <><Loader2 size={14} style={{ animation: "spin 0.7s linear infinite" }} />Creating…</> : "Create Project"}
          </button>
        </form>
      </Modal>

      {/* Add Phase Modal */}
      <Modal open={!!addPhaseFor} onClose={() => setAddPhaseFor(null)}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: "#0F1729", margin: 0 }}>Add Phase</h2>
          <button onClick={() => setAddPhaseFor(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF" }}><X size={18} /></button>
        </div>
        <form onSubmit={addPhase} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <Label>Phase Name *</Label>
            <Input required autoFocus placeholder="e.g. Design, Development, Launch…" value={phaseTitle} onChange={(e) => setPhaseTitle(e.target.value)} />
          </div>
          <button type="submit" disabled={saving} style={{ padding: 12, borderRadius: 12, background: "#0F1729", color: "#4FFFB0", border: "none", cursor: saving ? "not-allowed" : "pointer", fontSize: 13, fontWeight: 600, opacity: saving ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginTop: 4 }}>
            {saving ? <><Loader2 size={14} style={{ animation: "spin 0.7s linear infinite" }} />Adding…</> : "Add Phase"}
          </button>
        </form>
      </Modal>
    </div>
  );
}

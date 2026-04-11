"use client";

import { useEffect, useState } from "react";
import { Users, Plus, Building2, Phone, Mail, X, Eye, Trash2, Loader2 } from "lucide-react";
import type { ClientProfile, Project } from "@/lib/portal-types";

type ClientRow = ClientProfile & { projects: Pick<Project, "id" | "status">[] };

// ── helpers ────────────────────────────────────────────────────────────────────
function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={onClose}
    >
      <div
        style={{ background: "#fff", borderRadius: 20, padding: 32, width: "100%", maxWidth: 480, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

function Avatar({ name, size = 44 }: { name: string; size?: number }) {
  const palette = ["#4FFFB0", "#8B5CF6", "#F59E0B", "#3B82F6", "#EF4444", "#06B6D4"];
  const c = palette[name.charCodeAt(0) % palette.length];
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: c + "20", border: `2px solid ${c}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.38, fontWeight: 700, color: c, flexShrink: 0 }}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{ fontSize: 11, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</label>
      {children}
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{ padding: "10px 13px", borderRadius: 10, border: "1px solid #E5E7EB", fontSize: 13, outline: "none", width: "100%", boxSizing: "border-box", ...props.style }}
    />
  );
}

// ── page ──────────────────────────────────────────────────────────────────────
export default function ClientsPage() {
  const [clients, setClients] = useState<ClientRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    full_name: "", email: "", password: "", company: "", phone: "", username: "",
  });

  const load = () => {
    setLoading(true);
    fetch("/api/clients")
      .then((r) => r.json())
      .then((d) => { setClients(Array.isArray(d) ? d : []); setLoading(false); });
  };
  useEffect(load, []);

  const filtered = clients.filter((c) =>
    [c.full_name, c.email, c.company].some((v) =>
      v?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error || "Something went wrong"); setSaving(false); return; }
    setModalOpen(false);
    setForm({ full_name: "", email: "", password: "", company: "", phone: "", username: "" });
    setSaving(false);
    load();
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete client "${name}"? All their projects will be removed.`)) return;
    await fetch(`/api/clients/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#0F1729", margin: "0 0 3px", letterSpacing: "-0.5px" }}>Clients</h1>
          <p style={{ color: "#9CA3AF", fontSize: 13, margin: 0 }}>{clients.length} client{clients.length !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 20px", borderRadius: 12, background: "#0F1729", color: "#4FFFB0", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600 }}
        >
          <Plus size={15} /> New Client
        </button>
      </div>

      {/* Search */}
      <input
        placeholder="Search by name, email or company…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", maxWidth: 380, padding: "9px 14px", borderRadius: 12, border: "1px solid #E5E7EB", fontSize: 13, outline: "none", marginBottom: 20, boxSizing: "border-box" }}
      />

      {/* Content */}
      {loading ? (
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "32px 0", color: "#9CA3AF", fontSize: 13 }}>
          <Loader2 size={18} style={{ animation: "spin 0.7s linear infinite" }} />
          Loading clients…
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "64px 0" }}>
          <Users size={40} color="#E5E7EB" style={{ margin: "0 auto 14px", display: "block" }} />
          <p style={{ color: "#9CA3AF", fontSize: 14, margin: 0 }}>
            {search ? "No clients match your search." : "No clients yet — create the first one."}
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((client) => {
            const active = client.projects?.filter((p) => p.status === "active").length ?? 0;
            const total = client.projects?.length ?? 0;
            const displayName = client.full_name || client.email;
            return (
              <div
                key={client.id}
                style={{ background: "#fff", borderRadius: 14, border: "1px solid #E5E7EB", padding: "18px 22px", display: "flex", alignItems: "center", gap: 14, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
              >
                <Avatar name={displayName} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#0F1729" }}>{displayName}</span>
                    {client.username && (
                      <span style={{ fontSize: 11, color: "#9CA3AF", background: "#F3F4F6", padding: "1px 8px", borderRadius: 999 }}>@{client.username}</span>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 12, color: "#6B7280", display: "flex", alignItems: "center", gap: 3 }}>
                      <Mail size={11} />{client.email}
                    </span>
                    {client.company && (
                      <span style={{ fontSize: 12, color: "#6B7280", display: "flex", alignItems: "center", gap: 3 }}>
                        <Building2 size={11} />{client.company}
                      </span>
                    )}
                    {client.phone && (
                      <span style={{ fontSize: 12, color: "#6B7280", display: "flex", alignItems: "center", gap: 3 }}>
                        <Phone size={11} />{client.phone}
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <div style={{ textAlign: "center", padding: "5px 12px", background: "#F9FAFB", borderRadius: 10 }}>
                    <div style={{ fontSize: 17, fontWeight: 700, color: "#0F1729" }}>{total}</div>
                    <div style={{ fontSize: 9, color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>Projects</div>
                  </div>
                  {active > 0 && (
                    <div style={{ textAlign: "center", padding: "5px 12px", background: "#F0FDF4", borderRadius: 10 }}>
                      <div style={{ fontSize: 17, fontWeight: 700, color: "#16A34A" }}>{active}</div>
                      <div style={{ fontSize: 9, color: "#16A34A", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>Active</div>
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", gap: 6 }}>
                  <a
                    href={`/dashboard/clients/${client.id}`}
                    style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 10, background: "#F9FAFB", border: "1px solid #E5E7EB", fontSize: 12, fontWeight: 600, color: "#374151", textDecoration: "none" }}
                  >
                    <Eye size={13} /> View
                  </a>
                  <button
                    onClick={() => handleDelete(client.id, displayName)}
                    style={{ padding: "7px 9px", borderRadius: 10, background: "#FEF2F2", border: "none", cursor: "pointer", color: "#EF4444", display: "flex", alignItems: "center" }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* New Client Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: "#0F1729", margin: 0 }}>New Client</h2>
          <button onClick={() => setModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF" }}><X size={19} /></button>
        </div>
        <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Field label="Full Name *"><Input required placeholder="Ahmed Mohamed" value={form.full_name} onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))} /></Field>
            <Field label="Username"><Input placeholder="ahmed_m" value={form.username} onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))} /></Field>
          </div>
          <Field label="Email *"><Input required type="email" placeholder="client@example.com" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} /></Field>
          <Field label="Password *"><Input required type="password" placeholder="Min 6 characters" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} /></Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Field label="Company"><Input placeholder="Company name" value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} /></Field>
            <Field label="Phone"><Input placeholder="+20 1XX XXX XXXX" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} /></Field>
          </div>
          {error && <p style={{ margin: 0, fontSize: 12, color: "#EF4444", background: "#FEF2F2", padding: "9px 13px", borderRadius: 10 }}>{error}</p>}
          <button
            type="submit"
            disabled={saving}
            style={{ padding: 12, borderRadius: 12, background: "#0F1729", color: "#4FFFB0", border: "none", cursor: saving ? "not-allowed" : "pointer", fontSize: 14, fontWeight: 600, opacity: saving ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginTop: 4 }}
          >
            {saving ? <><Loader2 size={15} style={{ animation: "spin 0.7s linear infinite" }} />Creating…</> : "Create Client"}
          </button>
        </form>
      </Modal>
    </div>
  );
}

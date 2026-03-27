"use client";

export default function SettingsPage() {
  return (
    <div>
      <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>Settings</h1>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", marginBottom: "32px" }}>
        Manage your dashboard preferences.
      </p>

      <div style={{ background: "#111", borderRadius: "20px", border: "1px solid rgba(79,255,176,0.06)", padding: "24px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#fff", marginBottom: "16px" }}>Quick Links</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <a href="https://vercel.com/dashboard" target="_blank" rel="noopener" style={{ fontSize: "13px", color: "#4FFFB0", textDecoration: "none" }}>Vercel Dashboard</a>
          <a href="https://analytics.google.com" target="_blank" rel="noopener" style={{ fontSize: "13px", color: "#4FFFB0", textDecoration: "none" }}>Google Analytics</a>
          <a href="https://tagmanager.google.com" target="_blank" rel="noopener" style={{ fontSize: "13px", color: "#4FFFB0", textDecoration: "none" }}>Google Tag Manager</a>
          <a href="https://search.google.com/search-console" target="_blank" rel="noopener" style={{ fontSize: "13px", color: "#4FFFB0", textDecoration: "none" }}>Google Search Console</a>
          <a href="https://resend.com" target="_blank" rel="noopener" style={{ fontSize: "13px", color: "#4FFFB0", textDecoration: "none" }}>Resend (Email)</a>
          <a href="https://supabase.com/dashboard" target="_blank" rel="noopener" style={{ fontSize: "13px", color: "#4FFFB0", textDecoration: "none" }}>Supabase Dashboard</a>
        </div>
      </div>
    </div>
  );
}

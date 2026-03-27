"use client";

import { ExternalLink, Globe, BarChart3, Tag, Mail, Database, Zap } from "lucide-react";

const tools = [
  { name: "Google Analytics", desc: "Traffic & behavior analytics", icon: BarChart3, color: "#F59E0B", href: "https://analytics.google.com" },
  { name: "Search Console", desc: "Search performance & indexing", icon: Globe, color: "#16A34A", href: "https://search.google.com/search-console" },
  { name: "Tag Manager", desc: "Tag & event management", icon: Tag, color: "#3B82F6", href: "https://tagmanager.google.com" },
  { name: "Vercel", desc: "Hosting & deployments", icon: Zap, color: "#0F1729", href: "https://vercel.com/dashboard" },
  { name: "Resend", desc: "Email delivery service", icon: Mail, color: "#8B5CF6", href: "https://resend.com" },
  { name: "Supabase", desc: "Database & authentication", icon: Database, color: "#16A34A", href: "https://supabase.com/dashboard" },
];

export default function SettingsPage() {
  return (
    <div>
      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#0F1729", marginBottom: "4px", letterSpacing: "-0.5px" }}>Settings</h1>
      <p style={{ color: "#9CA3AF", fontSize: "14px", margin: "0 0 28px" }}>Tools & integrations</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        {tools.map((tool) => (
          <a
            key={tool.name}
            href={tool.href}
            target="_blank"
            rel="noopener"
            style={{
              background: "#fff",
              borderRadius: "16px",
              border: "1px solid #E5E7EB",
              padding: "24px",
              textDecoration: "none",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              transition: "all 0.15s",
              display: "block",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "16px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: `${tool.color}10`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <tool.icon size={22} color={tool.color} />
              </div>
              <ExternalLink size={16} color="#D1D5DB" />
            </div>
            <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#0F1729", margin: "0 0 4px" }}>{tool.name}</h3>
            <p style={{ fontSize: "13px", color: "#9CA3AF", margin: 0 }}>{tool.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { LayoutDashboard, BarChart3, Inbox, MessagesSquare, Settings, LogOut, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const links = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/submissions", label: "Submissions", icon: Inbox },
  { href: "/dashboard/chat", label: "Chat Logs", icon: MessagesSquare },
];

const quickLinks = [
  { href: "https://analytics.google.com", label: "Google Analytics" },
  { href: "https://search.google.com/search-console", label: "Search Console" },
  { href: "https://vercel.com/dashboard", label: "Vercel" },
  { href: "https://resend.com", label: "Resend" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <aside
      style={{
        width: "260px",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        background: "#fff",
        borderRight: "1px solid #E5E7EB",
        display: "flex",
        flexDirection: "column",
        padding: "28px 16px 20px",
        boxSizing: "border-box",
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <div style={{ padding: "0 12px", marginBottom: "32px" }}>
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <img src="/LOGO-OFF.png" alt="" width={36} height={36} style={{ borderRadius: "10px" }} />
          <div>
            <span style={{ fontSize: "17px", fontWeight: 700, color: "#0F1729", letterSpacing: "-0.3px" }}>
              Ahmed Ali
            </span>
            <span style={{ fontSize: "17px", fontWeight: 700, color: "#4FFFB0" }}>.</span>
            <span style={{ display: "block", fontSize: "11px", color: "#9CA3AF", fontWeight: 500, marginTop: "-1px" }}>Dashboard</span>
          </div>
        </a>
      </div>

      {/* Main nav */}
      <div style={{ marginBottom: "8px", padding: "0 8px" }}>
        <span style={{ fontSize: "10px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "1px", padding: "0 8px" }}>Menu</span>
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "auto" }}>
        {links.map((link) => {
          const active = pathname === link.href || (link.href !== "/dashboard" && pathname?.startsWith(link.href));
          return (
            <a
              key={link.href}
              href={link.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 16px",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: active ? 600 : 500,
                color: active ? "#0F1729" : "#6B7280",
                background: active ? "#F0FDF4" : "transparent",
                textDecoration: "none",
                transition: "all 0.15s",
                borderLeft: active ? "3px solid #4FFFB0" : "3px solid transparent",
              }}
            >
              <link.icon size={18} color={active ? "#16A34A" : "#9CA3AF"} />
              {link.label}
            </a>
          );
        })}
      </nav>

      {/* Quick links */}
      <div style={{ padding: "16px 8px", borderTop: "1px solid #F3F4F6", marginTop: "16px" }}>
        <span style={{ fontSize: "10px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "1px", padding: "0 8px" }}>Quick Links</span>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginTop: "8px" }}>
          {quickLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "7px 16px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 500,
                color: "#9CA3AF",
                textDecoration: "none",
              }}
            >
              <ExternalLink size={12} />
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 16px",
          borderRadius: "10px",
          fontSize: "13px",
          fontWeight: 500,
          color: "#EF4444",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          width: "100%",
          textAlign: "left",
          marginTop: "8px",
        }}
      >
        <LogOut size={16} />
        Sign Out
      </button>
    </aside>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { LayoutDashboard, BarChart3, MessageSquare, MessagesSquare, Settings, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const links = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/submissions", label: "Submissions", icon: MessageSquare },
  { href: "/dashboard/chat", label: "Chat Logs", icon: MessagesSquare },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <aside style={{ width: "240px", height: "100vh", position: "fixed", top: 0, left: 0, background: "#111", borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", padding: "24px 16px", boxSizing: "border-box", zIndex: 50 }}>
      {/* Logo */}
      <a href="/" style={{ textDecoration: "none", marginBottom: "36px", paddingLeft: "8px" }}>
        <span style={{ fontSize: "22px", fontWeight: 800, color: "#fff" }}>Ahmed</span>
        <span style={{ fontSize: "22px", fontWeight: 800, color: "#4FFFB0" }}>.</span>
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", display: "block", marginTop: "2px" }}>Dashboard</span>
      </a>

      {/* Nav */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
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
                padding: "10px 12px",
                borderRadius: "12px",
                fontSize: "13px",
                fontWeight: active ? 600 : 500,
                color: active ? "#0A0A0A" : "rgba(255,255,255,0.5)",
                background: active ? "#4FFFB0" : "transparent",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              <link.icon size={18} />
              {link.label}
            </a>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "12px", fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.4)", background: "transparent", border: "none", cursor: "pointer", width: "100%", textAlign: "left" }}
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}

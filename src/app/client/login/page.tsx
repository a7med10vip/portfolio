"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Lock, Mail } from "lucide-react";

export default function ClientLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    window.location.href = "/client/dashboard";
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, background: "#F8FAFC" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ width: 52, height: 52, borderRadius: 15, background: "#0F1729", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
            <Lock size={22} color="#4FFFB0" />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0F1729", margin: "0 0 5px" }}>Client Portal</h1>
          <p style={{ color: "#9CA3AF", fontSize: 13, margin: 0 }}>Sign in to your workspace</p>
        </div>

        {/* Card */}
        <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #E5E7EB", padding: 32, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Email */}
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>Email</label>
              <div style={{ position: "relative" }}>
                <Mail size={14} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: "100%", padding: "11px 13px 11px 38px", borderRadius: 12, border: "1px solid #E5E7EB", fontSize: 13, outline: "none", boxSizing: "border-box" }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>Password</label>
              <div style={{ position: "relative" }}>
                <Lock size={14} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: "100%", padding: "11px 13px 11px 38px", borderRadius: 12, border: "1px solid #E5E7EB", fontSize: 13, outline: "none", boxSizing: "border-box" }}
                />
              </div>
            </div>

            {error && (
              <div style={{ padding: "10px 13px", borderRadius: 10, background: "#FEF2F2", border: "1px solid #FECACA", fontSize: 13, color: "#EF4444" }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ padding: "12px", borderRadius: 12, background: "#0F1729", color: "#4FFFB0", border: "none", cursor: loading ? "not-allowed" : "pointer", fontSize: 14, fontWeight: 600, opacity: loading ? 0.7 : 1, marginTop: 4 }}
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: "#9CA3AF", marginTop: 20 }}>
          Powered by <strong style={{ color: "#0F1729" }}>Ahmed Ali</strong>
        </p>
      </div>
    </div>
  );
}

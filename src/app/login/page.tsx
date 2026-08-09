"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Lock } from "lucide-react";

export default function LoginPage() {
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

    window.location.href = "/dashboard";
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFB", fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif", padding: "20px" }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: "#fff", border: "1px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <img src="/LOGO-OFF.png" alt="" width={36} height={36} style={{ borderRadius: "10px" }} />
          </div>
          <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#0F1729", margin: "0 0 4px" }}>Welcome back</h1>
          <p style={{ color: "#9CA3AF", fontSize: "14px", margin: 0 }}>Sign in to your dashboard</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            borderRadius: "16px",
            border: "1px solid #E5E7EB",
            padding: "32px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@ahmedali.online"
              style={{ width: "100%", padding: "12px 14px", background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "10px", color: "#0F1729", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "border-color 0.15s" }}
              onFocus={(e) => (e.target.style.borderColor = "#4FFFB0")}
              onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "12px 14px", background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "10px", color: "#0F1729", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "border-color 0.15s" }}
              onFocus={(e) => (e.target.style.borderColor = "#4FFFB0")}
              onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
            />
          </div>

          {error && (
            <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "10px", padding: "10px 14px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Lock size={14} color="#EF4444" />
              <span style={{ fontSize: "13px", color: "#EF4444", fontWeight: 500 }}>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: loading ? "#86EFAC" : "#0F1729",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              border: "none",
              borderRadius: "10px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.15s",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "12px", color: "#9CA3AF", marginTop: "20px" }}>
          Protected area. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  );
}

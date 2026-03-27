"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

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
      setError("Invalid credentials");
      setLoading(false);
      return;
    }

    window.location.href = "/dashboard";
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0A0A0A", fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif", padding: "20px" }}>
      <div style={{ width: "100%", maxWidth: "380px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <span style={{ fontSize: "28px", fontWeight: 800, color: "#fff" }}>Ahmed</span>
          <span style={{ fontSize: "28px", fontWeight: 800, color: "#4FFFB0" }}>.</span>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginTop: "8px" }}>Dashboard Login</p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: "#111", borderRadius: "20px", border: "1px solid rgba(79,255,176,0.08)", padding: "32px" }}>
          <div style={{ height: "3px", background: "linear-gradient(90deg,#4FFFB0,rgba(79,255,176,0.2))", borderRadius: "2px", marginBottom: "28px", marginTop: "-32px", marginLeft: "-32px", marginRight: "-32px" }} />

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#fff", marginBottom: "6px" }}>Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "12px 14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", color: "#fff", fontSize: "14px", outline: "none", boxSizing: "border-box" }} onFocus={(e) => (e.target.style.borderColor = "rgba(79,255,176,0.3)")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#fff", marginBottom: "6px" }}>Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: "12px 14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", color: "#fff", fontSize: "14px", outline: "none", boxSizing: "border-box" }} onFocus={(e) => (e.target.style.borderColor = "rgba(79,255,176,0.3)")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
          </div>

          {error && <p style={{ color: "#ff6b6b", fontSize: "13px", textAlign: "center", marginBottom: "16px" }}>{error}</p>}

          <button type="submit" disabled={loading} style={{ width: "100%", padding: "13px", background: loading ? "rgba(79,255,176,0.5)" : "#4FFFB0", color: "#0A0A0A", fontSize: "14px", fontWeight: 700, border: "none", borderRadius: "999px", cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

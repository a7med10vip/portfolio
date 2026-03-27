"use client";

import { useState, useEffect } from "react";

export default function ApplyPage() {
  const [form, setForm] = useState({ name: "", whatsapp: "", portfolio: "", notes: "", urgent: false });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    if (status === "sent") {
      import("canvas-confetti").then((mod) => {
        const confetti = mod.default;
        // First burst
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ["#4FFFB0", "#fff", "#5227FF"] });
        // Second burst
        setTimeout(() => {
          confetti({ particleCount: 50, spread: 100, origin: { y: 0.5, x: 0.3 }, colors: ["#4FFFB0", "#fff"] });
          confetti({ particleCount: 50, spread: 100, origin: { y: 0.5, x: 0.7 }, colors: ["#4FFFB0", "#5227FF"] });
        }, 300);
      });
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.whatsapp) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", whatsapp: "", portfolio: "", notes: "", urgent: false });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0A0A0A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        fontFamily: "'Ahmed Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
      dir="rtl"
    >
      <div style={{ width: "100%", maxWidth: "480px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <a href="/ar" style={{ textDecoration: "none" }}>
            <span className="heading" style={{ fontSize: "28px", color: "#fff" }}>
              Ahmed Ali
            </span>
            <span className="heading" style={{ fontSize: "28px", color: "#4FFFB0" }}>.</span>
          </a>
        </div>

        {/* Card */}
        <div
          style={{
            background: "#111",
            borderRadius: "24px",
            border: "1px solid rgba(79,255,176,0.08)",
            overflow: "hidden",
          }}
        >
          {/* Green accent bar */}
          <div
            style={{
              height: "3px",
              background: "linear-gradient(90deg, #4FFFB0, rgba(79,255,176,0.2))",
            }}
          />

          <div style={{ padding: "36px 28px" }}>
            {/* Header */}
            <h1
              className="ar-heading"
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#fff",
                margin: "0 0 8px",
              }}
            >
              تقديم طلب
            </h1>
            <p
              className="ar-body"
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.45)",
                margin: "0 0 32px",
                lineHeight: 1.7,
              }}
            >
              املأ البيانات التالية وسنتواصل معك في أقرب وقت.
            </p>

            {status === "sent" ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 20px",
                }}
              >
                {/* Animated checkmark */}
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    background: "rgba(79,255,176,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                    border: "2px solid rgba(79,255,176,0.25)",
                    animation: "scaleIn 0.5s ease-out",
                  }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4FFFB0"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ animation: "drawCheck 0.6s ease-out 0.3s both" }}
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h2
                  className="ar-heading"
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#fff",
                    margin: "0 0 8px",
                    animation: "fadeUp 0.5s ease-out 0.4s both",
                  }}
                >
                  تم الإرسال بنجاح!
                </h2>
                <p
                  className="ar-body"
                  style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.5)",
                    margin: "0 0 28px",
                    animation: "fadeUp 0.5s ease-out 0.5s both",
                  }}
                >
                  شكراً لتقديمك. بنتواصل معاك في أقرب وقت.
                </p>
                <a
                  href="/ar"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "#4FFFB0",
                    color: "#0A0A0A",
                    fontSize: "13px",
                    fontWeight: 700,
                    padding: "12px 28px",
                    borderRadius: "999px",
                    textDecoration: "none",
                    border: "2px solid #0A0A0A",
                    boxShadow: "3px 3px 0px 0px #0A0A0A",
                    animation: "fadeUp 0.5s ease-out 0.6s both",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  الرجوع للموقع
                </a>

                <style>{`
                  @keyframes scaleIn {
                    from { transform: scale(0); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                  }
                  @keyframes drawCheck {
                    from { stroke-dasharray: 30; stroke-dashoffset: 30; }
                    to { stroke-dasharray: 30; stroke-dashoffset: 0; }
                  }
                  @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                  }
                `}</style>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div style={{ marginBottom: "20px" }}>
                  <label
                    className="ar-body"
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.5)",
                      marginBottom: "8px",
                    }}
                  >
                    الاسم الكامل <span style={{ color: "#4FFFB0" }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="مثال: أحمد محمد"
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "14px",
                      color: "#fff",
                      fontSize: "14px",
                      outline: "none",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                      direction: "rtl",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(79,255,176,0.3)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                  />
                </div>

                {/* WhatsApp */}
                <div style={{ marginBottom: "20px" }}>
                  <label
                    className="ar-body"
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.5)",
                      marginBottom: "8px",
                    }}
                  >
                    رقم الواتساب <span style={{ color: "#4FFFB0" }}>*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.whatsapp}
                    onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                    placeholder="+20 10X XXX XXXX"
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "14px",
                      color: "#fff",
                      fontSize: "14px",
                      outline: "none",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                      direction: "ltr",
                      textAlign: "right",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(79,255,176,0.3)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                  />
                </div>

                {/* Portfolio */}
                <div style={{ marginBottom: "20px" }}>
                  <label
                    className="ar-body"
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.5)",
                      marginBottom: "8px",
                    }}
                  >
                    رابط ملف الأعمال
                  </label>
                  <input
                    type="url"
                    value={form.portfolio}
                    onChange={(e) => setForm({ ...form, portfolio: e.target.value })}
                    placeholder="مثال: https://behance.net/username"
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "14px",
                      color: "#fff",
                      fontSize: "14px",
                      outline: "none",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                      direction: "ltr",
                      textAlign: "right",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(79,255,176,0.3)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                  />
                </div>

                {/* Notes */}
                <div style={{ marginBottom: "20px" }}>
                  <label
                    className="ar-body"
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.5)",
                      marginBottom: "8px",
                    }}
                  >
                    ملاحظات إضافية
                  </label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="أي تفاصيل إضافية تحب تشاركها..."
                    rows={4}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "14px",
                      color: "#fff",
                      fontSize: "14px",
                      outline: "none",
                      resize: "vertical",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                      direction: "rtl",
                      lineHeight: 1.7,
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(79,255,176,0.3)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                  />
                </div>

                {/* Urgent checkbox */}
                <div
                  style={{
                    marginBottom: "28px",
                    padding: "14px 16px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "14px",
                    cursor: "pointer",
                  }}
                  onClick={() => setForm({ ...form, urgent: !form.urgent })}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {/* Custom checkbox */}
                    <div
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "7px",
                        border: form.urgent ? "2px solid #4FFFB0" : "2px solid rgba(255,255,255,0.15)",
                        background: form.urgent ? "#4FFFB0" : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s",
                        flexShrink: 0,
                      }}
                    >
                      {form.urgent && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <span
                        className="ar-body"
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#fff",
                          display: "block",
                          marginBottom: "2px",
                        }}
                      >
                        محتاج المشروع يتسلّم خلال 5 أيام
                      </span>
                      <span
                        className="ar-body"
                        style={{
                          fontSize: "11px",
                          color: "rgba(255,255,255,0.35)",
                        }}
                      >
                        فعّل لو عندك deadline قريب
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  style={{
                    width: "100%",
                    padding: "15px",
                    background: status === "sending" ? "rgba(79,255,176,0.5)" : "#4FFFB0",
                    color: "#0A0A0A",
                    fontSize: "15px",
                    fontWeight: 700,
                    border: "2px solid #0A0A0A",
                    borderRadius: "999px",
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                    boxShadow: "4px 4px 0px 0px #0A0A0A",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13" />
                    <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                  {status === "sending" ? "جاري الإرسال..." : "إرسال الطلب"}
                </button>

                {status === "error" && (
                  <p
                    className="ar-body"
                    style={{
                      textAlign: "center",
                      fontSize: "13px",
                      color: "#ff6b6b",
                      marginTop: "12px",
                    }}
                  >
                    حصل خطأ. حاول مرة تانية.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", margin: 0 }}>
            &copy; {new Date().getFullYear()} Ahmed Ali. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </div>
  );
}

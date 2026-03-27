"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { MessagesSquare } from "lucide-react";

type Conversation = {
  id: string;
  session_id: string;
  lang: string;
  created_at: string;
  messages: { role: string; content: string; created_at: string }[];
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    (async () => {
      const { data: convos } = await supabase.from("chat_conversations").select("*").order("created_at", { ascending: false });
      if (convos) {
        const withMessages = await Promise.all(
          convos.map(async (c) => {
            const { data: msgs } = await supabase.from("chat_messages").select("*").eq("conversation_id", c.id).order("created_at", { ascending: true });
            return { ...c, messages: msgs || [] };
          })
        );
        setConversations(withMessages);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>Chat Logs</h1>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", marginBottom: "32px" }}>
        {conversations.length} conversations
      </p>

      {loading ? (
        <p style={{ color: "rgba(255,255,255,0.4)" }}>Loading...</p>
      ) : conversations.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <MessagesSquare size={40} color="rgba(255,255,255,0.15)" style={{ marginBottom: "16px" }} />
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>No chat conversations yet.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px", minHeight: "400px" }}>
          {/* Conversation list */}
          <div style={{ background: "#111", borderRadius: "20px", border: "1px solid rgba(79,255,176,0.06)", overflow: "hidden" }}>
            {conversations.map((c) => {
              const firstMsg = c.messages.find((m) => m.role === "user");
              const isActive = selected?.id === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelected(c)}
                  style={{
                    padding: "14px 18px",
                    cursor: "pointer",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    background: isActive ? "rgba(79,255,176,0.06)" : "transparent",
                    borderLeft: isActive ? "3px solid #4FFFB0" : "3px solid transparent",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#fff" }}>{c.lang === "ar" ? "Arabic" : "English"}</span>
                    <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>{timeAgo(c.created_at)}</span>
                  </div>
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {firstMsg?.content.slice(0, 60) || "..."}
                  </p>
                  <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)" }}>{c.messages.length} messages</span>
                </div>
              );
            })}
          </div>

          {/* Messages */}
          <div style={{ background: "#111", borderRadius: "20px", border: "1px solid rgba(79,255,176,0.06)", padding: "24px", overflowY: "auto", maxHeight: "600px" }}>
            {!selected ? (
              <div style={{ textAlign: "center", padding: "60px", color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>
                Select a conversation
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {selected.messages.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                      maxWidth: "80%",
                      padding: "12px 16px",
                      borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      background: m.role === "user" ? "#4FFFB0" : "rgba(255,255,255,0.06)",
                      color: m.role === "user" ? "#0A0A0A" : "#fff",
                      fontSize: "13px",
                      lineHeight: 1.6,
                    }}
                  >
                    {m.content}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

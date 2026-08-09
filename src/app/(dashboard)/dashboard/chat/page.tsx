"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { MessagesSquare, Clock, User, Bot } from "lucide-react";

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
  if (mins < 1) return "Just now";
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
      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#0F1729", marginBottom: "4px", letterSpacing: "-0.5px" }}>Chat Logs</h1>
      <p style={{ color: "#9CA3AF", fontSize: "14px", margin: "0 0 28px" }}>{conversations.length} conversations</p>

      {loading ? (
        <p style={{ color: "#9CA3AF", textAlign: "center", padding: "40px" }}>Loading...</p>
      ) : conversations.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #E5E7EB", textAlign: "center", padding: "80px 20px" }}>
          <MessagesSquare size={40} color="#D1D5DB" style={{ marginBottom: "12px" }} />
          <p style={{ color: "#9CA3AF", fontSize: "14px" }}>No chat conversations yet.</p>
          <p style={{ color: "#D1D5DB", fontSize: "12px" }}>Conversations will appear here when visitors use the chatbot.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "16px", height: "calc(100vh - 180px)" }}>
          {/* List */}
          <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #E5E7EB", overflow: "auto", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            {conversations.map((c) => {
              const firstMsg = c.messages.find((m) => m.role === "user");
              const isActive = selected?.id === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelected(c)}
                  style={{
                    padding: "16px 20px",
                    cursor: "pointer",
                    borderBottom: "1px solid #F3F4F6",
                    background: isActive ? "#F0FDF4" : "#fff",
                    borderLeft: isActive ? "3px solid #4FFFB0" : "3px solid transparent",
                    transition: "all 0.15s",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#0F1729" }}>
                      {c.lang === "ar" ? "Arabic" : "English"} Chat
                    </span>
                    <span style={{ fontSize: "10px", color: "#9CA3AF", display: "flex", alignItems: "center", gap: "3px" }}>
                      <Clock size={10} />
                      {timeAgo(c.created_at)}
                    </span>
                  </div>
                  <p style={{ fontSize: "12px", color: "#6B7280", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {firstMsg?.content.slice(0, 70) || "..."}
                  </p>
                  <span style={{ fontSize: "10px", color: "#D1D5DB", marginTop: "4px", display: "block" }}>{c.messages.length} messages</span>
                </div>
              );
            })}
          </div>

          {/* Thread */}
          <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #E5E7EB", padding: "24px", overflow: "auto", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            {!selected ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#D1D5DB", fontSize: "14px" }}>
                Select a conversation to view
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {selected.messages.map((m, i) => (
                  <div key={i} style={{ display: "flex", gap: "10px", alignItems: "start" }}>
                    <div style={{
                      width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                      background: m.role === "user" ? "#F3F4F6" : "#F0FDF4",
                    }}>
                      {m.role === "user" ? <User size={14} color="#6B7280" /> : <Bot size={14} color="#16A34A" />}
                    </div>
                    <div style={{
                      flex: 1, padding: "12px 16px", borderRadius: "12px", fontSize: "13px", lineHeight: 1.7,
                      background: m.role === "user" ? "#F9FAFB" : "#F0FDF4",
                      color: "#374151",
                      border: m.role === "user" ? "1px solid #E5E7EB" : "1px solid #BBF7D0",
                    }}>
                      {m.content}
                    </div>
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

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send } from "lucide-react";
/* eslint-disable @next/next/no-img-element */

type Message = {
  role: "user" | "assistant";
  content: string;
};


const QUICK_REPLIES = [
  "Walk me through the strategy",
  "Why these five channels?",
  "How does the Eid play work?",
  "What's the 30-min SLA?",
  "What do you need before April 28?",
  "Show me the timeline",
];

const NUDGE_MESSAGES = [
  "Got questions about the approach? I'm here.",
  "Want me to walk through any section?",
  "Curious about the channel split or the creative pillars? Ask away.",
];

const PLATFORM_LOGOS: { name: string; logo: string }[] = [
  // Order matters — multi-word names first
  { name: "Google Ads", logo: "/platforms/google.png" },
  { name: "Snapchat", logo: "/platforms/snapchat.svg" },
  { name: "TikTok", logo: "/platforms/tiktok.jpg" },
  { name: "Google", logo: "/platforms/google.png" },
  { name: "Meta", logo: "/platforms/meta.jpg" },
];

function injectPlatformLogos(html: string) {
  // Skip injection inside HTML tag attributes (very basic guard)
  for (const p of PLATFORM_LOGOS) {
    // Match the platform name as a whole word, avoiding already-injected occurrences
    const escaped = p.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`(?<!alt="|src="|inject-mark=")\\b(${escaped})\\b(?!"\\s*alt)`, "g");
    html = html.replace(
      re,
      `<span inject-mark="1" style="display:inline-flex;align-items:center;gap:4px;vertical-align:baseline"><img src="${p.logo}" alt="${p.name}" style="width:14px;height:14px;border-radius:3px;object-fit:contain;display:inline-block;vertical-align:middle"/>$1</span>`
    );
  }
  // Standalone X (Twitter)
  html = html.replace(
    /(^|\s|>)X(?=[\s.,;:!?)\]<])/g,
    `$1<span style="display:inline-flex;align-items:center;gap:4px;vertical-align:baseline"><img src="/platforms/x.webp" alt="X" style="width:14px;height:14px;border-radius:3px;object-fit:contain;display:inline-block;vertical-align:middle"/>X</span>`
  );
  // Clean inject markers
  return html.replace(/ inject-mark="1"/g, "");
}

function formatMessage(text: string) {
  let html = text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(
      /(hello@ahmedali\.online)/g,
      '<a href="mailto:$1" style="color:#0A0A0A;font-weight:700;text-decoration:underline">$1</a>'
    );
  html = injectPlatformLogos(html);
  return html
    .replace(/\n/g, "<br>")
    .replace(/(<br>)+$/g, "")
    .trim();
}

function playNotification() {
  try {
    const Ctx = window.AudioContext || (window as unknown as Record<string, typeof AudioContext>).webkitAudioContext;
    const ctx = new Ctx();
    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);
    osc1.type = "sine";
    osc2.type = "sine";
    osc1.frequency.setValueAtTime(587, now);
    osc2.frequency.setValueAtTime(784, now + 0.1);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc1.start(now);
    osc1.stop(now + 0.12);
    osc2.start(now + 0.1);
    osc2.stop(now + 0.25);
  } catch { /* silent fail */ }
}

export default function MotionMotorsChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [hasWelcomed, setHasWelcomed] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [previewMsg, setPreviewMsg] = useState("");
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const nudgeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nudgeIndexRef = useRef(0);
  const isOpenRef = useRef(false);

  useEffect(() => { isOpenRef.current = isOpen; }, [isOpen]);

  // Show greeting bubble after 5s
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowGreeting(true);
        playNotification();
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const resetNudgeTimer = useCallback(() => {
    if (nudgeTimerRef.current) clearTimeout(nudgeTimerRef.current);
    nudgeTimerRef.current = setTimeout(() => {
      if (!isOpenRef.current && nudgeIndexRef.current < NUDGE_MESSAGES.length) {
        const msg = NUDGE_MESSAGES[nudgeIndexRef.current];
        nudgeIndexRef.current++;
        setPreviewMsg(msg);
        setUnreadCount((c) => c + 1);
        playNotification();
        setTimeout(() => setPreviewMsg(""), 8000);
      }
    }, 25000);
  }, []);

  const openChat = useCallback(() => {
    setIsOpen(true);
    setShowGreeting(false);
    setUnreadCount(0);
    setPreviewMsg("");
    if (nudgeTimerRef.current) clearTimeout(nudgeTimerRef.current);
    if (!hasWelcomed) {
      setHasWelcomed(true);
      setTimeout(() => {
        setMessages([
          {
            role: "assistant",
            content: "Hey 👋 I'm Ahmed. Want to walk through any part of the May 2026 approach — strategy, channels, creative, the Eid play, or the timeline?",
          },
        ]);
        playNotification();
      }, 300);
    }
    setTimeout(() => inputRef.current?.focus(), 400);
  }, [hasWelcomed]);

  const closeChat = useCallback(() => {
    setIsOpen(false);
    resetNudgeTimer();
  }, [resetNudgeTimer]);

  const sendMessage = useCallback(async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || isTyping) return;

    setInput("");
    setShowQuickReplies(false);
    if (nudgeTimerRef.current) clearTimeout(nudgeTimerRef.current);

    const newMessages: Message[] = [...messages, { role: "user", content: msg }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat/motionmotors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.reply || "Connection hiccup — message me on WhatsApp at +201011648156.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      playNotification();
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection hiccup — message me on WhatsApp at +201011648156." },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [input, isTyping, messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const now = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const AhmedAvatar = ({ size = 30 }: { size?: number }) => (
    <img
      src="/myphoto-profile.png"
      alt="Ahmed Ali"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        objectFit: "cover",
        flexShrink: 0,
        border: "2px solid #0A0A0A",
      }}
    />
  );

  return (
    <>
      {/* Trigger */}
      {!isOpen && (
        <div className="fixed bottom-7 right-7 z-[97] flex items-end gap-3">
          {(showGreeting || previewMsg) && (
            <div
              className="cursor-pointer"
              onClick={openChat}
              style={{
                background: "#fff",
                border: "2px solid #0A0A0A",
                boxShadow: "4px 4px 0px 0px #0A0A0A",
                borderRadius: "20px 20px 4px 20px",
                padding: "14px 18px",
                maxWidth: "260px",
                fontSize: "13px",
                lineHeight: 1.6,
                color: "#0A0A0A",
                animation: "mmchat-float-in 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
              }}
            >
              {previewMsg ? (
                previewMsg
              ) : (
                <>
                  <span style={{ display: "inline-block", animation: "mmchat-wave 1s infinite", transformOrigin: "70% 70%", fontSize: "16px" }}>👋</span>{" "}
                  Got questions about this approach? Ask me anything within the plan.
                </>
              )}
            </div>
          )}

          <button
            onClick={openChat}
            aria-label="Open chat about the campaign approach"
            className="group relative cursor-pointer"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "#4FFFB0",
              border: "2px solid #0A0A0A",
              boxShadow: "4px 4px 0px 0px #0A0A0A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
            }}
          >
            {unreadCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                  width: "22px",
                  height: "22px",
                  background: "#EF4444",
                  borderRadius: "50%",
                  border: "2px solid #0A0A0A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#fff",
                  zIndex: 2,
                  animation: "mmchat-badge-pop 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                }}
              >
                {unreadCount}
              </span>
            )}
            {unreadCount === 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "3px",
                  right: "3px",
                  width: "12px",
                  height: "12px",
                  background: "#22C55E",
                  borderRadius: "50%",
                  border: "2px solid #0A0A0A",
                }}
              />
            )}
            <MessageCircle size={24} color="#0A0A0A" strokeWidth={2.5} />
          </button>
        </div>
      )}

      {/* Chat Window — askahmed-window class lets Lenis skip wheel/touch inside */}
      <div
        className="fixed bottom-7 right-7 z-[97] flex flex-col mmchat-window askahmed-window"
        style={{
          width: "400px",
          height: "600px",
          maxHeight: "calc(100vh - 80px)",
          background: "#fff",
          border: "2px solid #0A0A0A",
          borderRadius: "28px",
          overflow: "hidden",
          boxShadow: "8px 8px 0px 0px #0A0A0A",
          transform: isOpen ? "scale(1) translateY(0)" : "scale(0.9) translateY(20px)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "all" : "none",
          transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        <div
          style={{
            padding: "16px 20px",
            background: "#4FFFB0",
            borderBottom: "2px solid #0A0A0A",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexShrink: 0,
          }}
        >
          <div style={{ position: "relative" }}>
            <AhmedAvatar size={42} />
            <span
              style={{
                position: "absolute",
                bottom: "0px",
                right: "-2px",
                width: "12px",
                height: "12px",
                background: "#22C55E",
                borderRadius: "50%",
                border: "2px solid #4FFFB0",
              }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'TAN Headline'", fontWeight: 700, fontSize: "15px", color: "#0A0A0A", lineHeight: 1.2 }}>
              Ask Ahmed
            </div>
            <div style={{ fontSize: "11px", color: "rgba(0,0,0,0.55)", marginTop: "2px" }}>
              About the May 2026 Campaign Approach
            </div>
          </div>

          <button
            onClick={closeChat}
            aria-label="Close chat"
            className="cursor-pointer"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "rgba(0,0,0,0.08)",
              border: "none",
              color: "#0A0A0A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
            }}
          >
            <X size={16} />
          </button>
        </div>

        <div
          ref={messagesRef}
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            background: "#FAFAFA",
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "10px",
                flexDirection: msg.role === "user" ? "row-reverse" : "row",
                animation: "mmchat-msg-in 0.3s ease forwards",
              }}
            >
              {msg.role === "assistant" ? (
                <div style={{ marginTop: "2px" }}><AhmedAvatar size={28} /></div>
              ) : (
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "#E4E4E7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#52525B",
                    flexShrink: 0,
                    marginTop: "2px",
                    border: "1px solid #D1D5DB",
                  }}
                >
                  You
                </div>
              )}

              <div style={{ maxWidth: "78%" }}>
                <div
                  style={{
                    padding: "12px 16px",
                    fontSize: "13.5px",
                    lineHeight: 1.65,
                    ...(msg.role === "user"
                      ? {
                          background: "#4FFFB0",
                          color: "#0A0A0A",
                          fontWeight: 500,
                          border: "2px solid #0A0A0A",
                          boxShadow: "3px 3px 0px 0px #0A0A0A",
                          borderRadius: "18px 18px 4px 18px",
                        }
                      : {
                          background: "#fff",
                          color: "#0A0A0A",
                          border: "1px solid #E4E4E7",
                          borderRadius: "18px 18px 18px 4px",
                        }),
                  }}
                  dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                />
                <div
                  style={{
                    fontSize: "10px",
                    color: "#A1A1AA",
                    marginTop: "5px",
                    textAlign: msg.role === "user" ? "right" : "left",
                    paddingLeft: msg.role === "user" ? undefined : "4px",
                    paddingRight: msg.role === "user" ? "4px" : undefined,
                  }}
                >
                  {now()}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
              <AhmedAvatar size={28} />
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #E4E4E7",
                  borderRadius: "18px 18px 18px 4px",
                  padding: "14px 18px",
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                <span className="mmchat-dot" style={{ animationDelay: "0s" }} />
                <span className="mmchat-dot" style={{ animationDelay: "0.2s" }} />
                <span className="mmchat-dot" style={{ animationDelay: "0.4s" }} />
              </div>
            </div>
          )}
        </div>

        {showQuickReplies && messages.length <= 1 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", padding: "0 16px 12px", background: "#FAFAFA" }}>
            {QUICK_REPLIES.map((qr) => (
              <button
                key={qr}
                onClick={() => sendMessage(qr)}
                className="cursor-pointer"
                style={{
                  background: "#fff",
                  border: "1px solid #E4E4E7",
                  borderRadius: "100px",
                  padding: "6px 14px",
                  fontSize: "12px",
                  color: "#52525B",
                  transition: "all 0.2s",
                  fontFamily: "inherit",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#0A0A0A";
                  e.currentTarget.style.color = "#0A0A0A";
                  e.currentTarget.style.boxShadow = "2px 2px 0px 0px #0A0A0A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#E4E4E7";
                  e.currentTarget.style.color = "#52525B";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {qr}
              </button>
            ))}
          </div>
        )}

        <div style={{ padding: "12px 16px 16px", borderTop: "2px solid #E4E4E7", flexShrink: 0, background: "#fff" }}>
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              background: "#fff",
              border: "2px solid #0A0A0A",
              borderRadius: "100px",
              padding: "6px 6px 6px 18px",
              boxShadow: "3px 3px 0px 0px #0A0A0A",
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about the approach..."
              rows={1}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                color: "#0A0A0A",
                fontFamily: "inherit",
                fontSize: "14px",
                resize: "none",
                maxHeight: "60px",
                minHeight: "22px",
                lineHeight: 1.5,
              }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={isTyping || !input.trim()}
              aria-label="Send message"
              className="cursor-pointer"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: input.trim() && !isTyping ? "#4FFFB0" : "#F4F4F5",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                flexShrink: 0,
              }}
            >
              <Send size={16} color={input.trim() && !isTyping ? "#0A0A0A" : "#A1A1AA"} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes mmchat-badge-pop { from { transform: scale(0); } to { transform: scale(1); } }
        @keyframes mmchat-wave { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(20deg); } 75% { transform: rotate(-10deg); } }
        @keyframes mmchat-float-in { from { opacity: 0; transform: scale(0.8) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes mmchat-msg-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes mmchat-typing { 0%, 60%, 100% { transform: translateY(0); opacity: 0.3; } 30% { transform: translateY(-5px); opacity: 1; } }
        .mmchat-dot { width: 6px; height: 6px; background: #A1A1AA; border-radius: 50%; display: inline-block; animation: mmchat-typing 1.2s infinite; }
        .mmchat-window::-webkit-scrollbar { width: 3px; }
        .mmchat-window::-webkit-scrollbar-thumb { background: #E4E4E7; border-radius: 3px; }
        @media (max-width: 480px) {
          .mmchat-window {
            width: calc(100vw - 24px) !important;
            height: calc(100vh - 100px) !important;
            bottom: 12px !important;
            right: 12px !important;
            border-radius: 20px !important;
          }
        }
      `}</style>
    </>
  );
}

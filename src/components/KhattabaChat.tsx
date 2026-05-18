"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send } from "lucide-react";
/* eslint-disable @next/next/no-img-element */

type Message = {
  role: "user" | "assistant";
  content: string;
};

const BRAND = "#30c280";
const DARK = "#0A0A0A";

const QUICK_REPLIES = [
  "اشرحلي المراحل الخمسة",
  "إيه التقنيات المستخدمة؟",
  "كم سعر المشروع؟",
  "إيه الفرق بين الموقع والتطبيق؟",
  "خبرتك في مشاريع شبيهة؟",
  "إيه شغل الشات المراقب؟",
];

const NUDGE_MESSAGES = [
  "عندك أسئلة عن المسار؟ أنا هنا.",
  "تحب أمشيك في أي قسم بالتفصيل؟",
  "محتار في حاجة عن التقنيات أو المراحل؟ اسألني.",
];

function formatMessage(text: string) {
  const html = text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(
      /(hello@ahmedali\.online)/g,
      '<a href="mailto:$1" style="color:#0A0A0A;font-weight:700;text-decoration:underline">$1</a>'
    );
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

const CONTACT_TAG = "[SHOW_CONTACT_BUTTONS]";

function ContactButtons() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
      <a
        href="https://wa.me/201011648156"
        target="_blank"
        rel="noopener"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "8px 14px",
          borderRadius: 999,
          background: BRAND,
          color: DARK,
          border: `2px solid ${DARK}`,
          boxShadow: `3px 3px 0px 0px ${DARK}`,
          textDecoration: "none",
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        <MessageCircle size={13} /> واتساب
      </a>
      <a
        href="mailto:hello@ahmedali.online"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "8px 14px",
          borderRadius: 999,
          background: "#fff",
          color: DARK,
          border: `2px solid ${DARK}`,
          boxShadow: `3px 3px 0px 0px ${DARK}`,
          textDecoration: "none",
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        إيميل
      </a>
    </div>
  );
}

export default function KhattabaChat() {
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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowGreeting(true);
        playNotification();
      }
    }, 6000);
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
    }, 28000);
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
            content: "أهلاً 👋 أنا أحمد. تحب أمشيك في أي جزء من مسار العمل — التقنيات، المراحل، الميزانية، نموذج التسجيل، أو حاجة تانية في الخطة؟",
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
      const res = await fetch("/api/chat/khattaba", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.reply || "في مشكلة اتصال مؤقتة. تواصل معي مباشرة من هنا:\n[SHOW_CONTACT_BUTTONS]";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      playNotification();
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "في مشكلة اتصال مؤقتة. تواصل معي مباشرة من هنا:\n[SHOW_CONTACT_BUTTONS]" },
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
        border: `2px solid ${DARK}`,
      }}
    />
  );

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-7 right-7 z-[97] flex items-end gap-3" dir="rtl">
          {(showGreeting || previewMsg) && (
            <div
              className="cursor-pointer"
              onClick={openChat}
              style={{
                background: "#fff",
                border: `2px solid ${DARK}`,
                boxShadow: `4px 4px 0px 0px ${DARK}`,
                borderRadius: "20px 20px 4px 20px",
                padding: "14px 18px",
                maxWidth: "270px",
                fontSize: "13px",
                lineHeight: 1.7,
                color: DARK,
                fontFamily: "'Ahmed Sans', sans-serif",
                animation: "khchat-float-in 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
              }}
            >
              {previewMsg ? (
                previewMsg
              ) : (
                <>
                  <span style={{ display: "inline-block", animation: "khchat-wave 1s infinite", transformOrigin: "70% 70%", fontSize: "16px" }}>👋</span>{" "}
                  عندك أسئلة عن المسار التفصيلي؟ اسألني في حدود الخطة.
                </>
              )}
            </div>
          )}

          <button
            onClick={openChat}
            aria-label="افتح الشات للسؤال عن مسار العمل"
            className="group relative cursor-pointer"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: BRAND,
              border: `2px solid ${DARK}`,
              boxShadow: `4px 4px 0px 0px ${DARK}`,
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
                  border: `2px solid ${DARK}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#fff",
                  zIndex: 2,
                  animation: "khchat-badge-pop 0.3s cubic-bezier(0.34,1.56,0.64,1)",
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
                  border: `2px solid ${DARK}`,
                }}
              />
            )}
            <MessageCircle size={24} color={DARK} strokeWidth={2.5} />
          </button>
        </div>
      )}

      <div
        dir="rtl"
        className="fixed bottom-7 right-7 z-[97] flex flex-col khchat-window askahmed-window"
        style={{
          width: "400px",
          height: "600px",
          maxHeight: "calc(100vh - 80px)",
          background: "#fff",
          border: `2px solid ${DARK}`,
          borderRadius: "28px",
          overflow: "hidden",
          boxShadow: `8px 8px 0px 0px ${DARK}`,
          transform: isOpen ? "scale(1) translateY(0)" : "scale(0.9) translateY(20px)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "all" : "none",
          transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          fontFamily: "'Ahmed Sans', sans-serif",
        }}
      >
        <div
          style={{
            padding: "16px 20px",
            background: BRAND,
            borderBottom: `2px solid ${DARK}`,
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
                border: `2px solid ${BRAND}`,
              }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: "15px", color: DARK, lineHeight: 1.2 }}>
              اسأل أحمد
            </div>
            <div style={{ fontSize: "11px", color: "rgba(0,0,0,0.55)", marginTop: "2px" }}>
              عن مسار عمل منصة خطابة السعودية الأولى
            </div>
          </div>

          <button
            onClick={closeChat}
            aria-label="غلق الشات"
            className="cursor-pointer"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "rgba(0,0,0,0.08)",
              border: "none",
              color: DARK,
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
          {messages.map((msg, i) => {
            const hasContactTag = msg.role === "assistant" && msg.content.includes(CONTACT_TAG);
            const cleanContent = hasContactTag ? msg.content.replace(CONTACT_TAG, "").trim() : msg.content;
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: msg.role === "user" ? "row-reverse" : "row",
                  animation: "khchat-msg-in 0.3s ease forwards",
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
                    أنت
                  </div>
                )}

                <div style={{ maxWidth: "78%" }}>
                  <div
                    style={{
                      padding: "12px 16px",
                      fontSize: "13.5px",
                      lineHeight: 1.75,
                      ...(msg.role === "user"
                        ? {
                            background: BRAND,
                            color: DARK,
                            fontWeight: 500,
                            border: `2px solid ${DARK}`,
                            boxShadow: `3px 3px 0px 0px ${DARK}`,
                            borderRadius: "18px 18px 4px 18px",
                          }
                        : {
                            background: "#fff",
                            color: DARK,
                            border: "1px solid #E4E4E7",
                            borderRadius: "18px 18px 18px 4px",
                          }),
                    }}
                    dangerouslySetInnerHTML={{ __html: formatMessage(cleanContent) }}
                  />
                  {hasContactTag && <ContactButtons />}
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#A1A1AA",
                      marginTop: "5px",
                      textAlign: msg.role === "user" ? "left" : "right",
                      paddingLeft: msg.role === "user" ? "4px" : undefined,
                      paddingRight: msg.role === "user" ? undefined : "4px",
                    }}
                  >
                    {now()}
                  </div>
                </div>
              </div>
            );
          })}

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
                <span className="khchat-dot" style={{ animationDelay: "0s" }} />
                <span className="khchat-dot" style={{ animationDelay: "0.2s" }} />
                <span className="khchat-dot" style={{ animationDelay: "0.4s" }} />
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
                  e.currentTarget.style.borderColor = DARK;
                  e.currentTarget.style.color = DARK;
                  e.currentTarget.style.boxShadow = `2px 2px 0px 0px ${DARK}`;
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
              border: `2px solid ${DARK}`,
              borderRadius: "100px",
              padding: "6px 18px 6px 6px",
              boxShadow: `3px 3px 0px 0px ${DARK}`,
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="اسأل عن أي جزء في الخطة..."
              rows={1}
              dir="rtl"
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                color: DARK,
                fontFamily: "inherit",
                fontSize: "14px",
                resize: "none",
                maxHeight: "60px",
                minHeight: "22px",
                lineHeight: 1.5,
                textAlign: "right",
              }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={isTyping || !input.trim()}
              aria-label="إرسال"
              className="cursor-pointer"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: input.trim() && !isTyping ? BRAND : "#F4F4F5",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                flexShrink: 0,
                transform: "scaleX(-1)",
              }}
            >
              <Send size={16} color={input.trim() && !isTyping ? DARK : "#A1A1AA"} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes khchat-badge-pop { from { transform: scale(0); } to { transform: scale(1); } }
        @keyframes khchat-wave { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(20deg); } 75% { transform: rotate(-10deg); } }
        @keyframes khchat-float-in { from { opacity: 0; transform: scale(0.8) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes khchat-msg-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes khchat-typing { 0%, 60%, 100% { transform: translateY(0); opacity: 0.3; } 30% { transform: translateY(-5px); opacity: 1; } }
        .khchat-dot { width: 6px; height: 6px; background: #A1A1AA; border-radius: 50%; display: inline-block; animation: khchat-typing 1.2s infinite; }
        .khchat-window::-webkit-scrollbar { width: 3px; }
        .khchat-window::-webkit-scrollbar-thumb { background: #E4E4E7; border-radius: 3px; }
        @media (max-width: 480px) {
          .khchat-window {
            width: calc(100vw - 24px) !important;
            height: calc(100vh - 100px) !important;
            bottom: 12px !important;
            right: 12px !important;
            left: auto !important;
            border-radius: 20px !important;
          }
        }
      `}</style>
    </>
  );
}

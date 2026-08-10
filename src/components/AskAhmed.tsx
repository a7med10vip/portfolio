"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Phone, PhoneOff, Loader2, ArrowLeft, Sparkles, AudioLines, Languages } from "lucide-react";
/* eslint-disable @next/next/no-img-element */

type Message = {
  role: "user" | "assistant";
  content: string;
};

const QUICK_REPLIES = [
  "What services do you offer?",
  "Tell me about your projects",
  "SEO & marketing experience",
  "Mobile app development",
  "Available for hire?",
  "GCC work experience",
];

function hasContactTag(text: string) {
  return text.includes("[SHOW_CONTACT_BUTTONS]");
}

function formatMessage(text: string) {
  return text
    .replace(/\[SHOW_CONTACT_BUTTONS\]/g, "")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(
      /(hello@ahmedali\.online)/g,
      '<a href="mailto:$1" style="color:#04323A;font-weight:700;text-decoration:underline">$1</a>'
    )
    .replace(/\n/g, "<br>")
    .replace(/(<br>)+$/g, "")
    .trim();
}

function ContactButtons() {
  return (
    <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
      <a
        href="https://wa.me/201011648156"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px 16px",
          borderRadius: "100px",
          background: "#25D366",
          color: "#04323A",
          fontSize: "12px",
          fontWeight: 700,
          textDecoration: "none",
          border: "2px solid #004D5A",
          boxShadow: "2px 2px 0px 0px #004D5A",
          transition: "all 0.2s",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        WhatsApp
      </a>
      <a
        href="mailto:hello@ahmedali.online"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px 16px",
          borderRadius: "100px",
          background: "#fff",
          color: "#04323A",
          fontSize: "12px",
          fontWeight: 700,
          textDecoration: "none",
          border: "2px solid #004D5A",
          boxShadow: "2px 2px 0px 0px #004D5A",
          transition: "all 0.2s",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#04323A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        Email
      </a>
    </div>
  );
}

// Notification sound - soft pop like iMessage/WhatsApp
function playNotification() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as Record<string, typeof AudioContext>).webkitAudioContext)();
    const now = ctx.currentTime;

    // Soft pop - two quick tones
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.type = "sine";
    osc2.type = "sine";

    // Two-tone "pop" like a bubble
    osc1.frequency.setValueAtTime(587, now); // D5
    osc2.frequency.setValueAtTime(784, now + 0.1); // G5

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc1.start(now);
    osc1.stop(now + 0.12);
    osc2.start(now + 0.1);
    osc2.stop(now + 0.25);
  } catch { /* silent fail */ }
}

/* Ahmed's own avatar set. Shown as an overlapping cluster on the home
   screen — the people behind the projects, not stock faces. */
const CLIENT_AVATARS = [
  "/avatars/avatar-1.webp",
  "/avatars/avatar-2.webp",
  "/avatars/avatar-3.webp",
  "/avatars/avatar-4.webp",
  "/avatars/avatar-5.webp",
];

/* What the assistant can do. Deliberately NOT cards: the two buttons above
   already carry the outline-and-hard-shadow treatment, and repeating it here
   made five identical boxes where only two of them were pressable. These are
   information, so they get an icon and a hairline and nothing else. */
const HOME_FEATURES = [
  {
    Icon: Sparkles,
    title: "Ask anything",
    desc: "Services, projects, experience and availability — answered instantly.",
    tint: "#CFF7EE",
  },
  {
    Icon: AudioLines,
    title: "Live voice call",
    desc: "Talk to a real-time voice agent. English, no waiting.",
    tint: "#CFF7EE",
  },
  {
    Icon: Languages,
    title: "Arabic or English",
    desc: "Type in either and it replies in the same language.",
    tint: "#CFF7EE",
  },
];

const NUDGE_MESSAGES = [
  "Still here if you need anything, feel free to ask!",
  "Got any questions about my work? I'm happy to help.",
  "Don't be shy, I can tell you about my projects, skills, or availability.",
  "Curious about something? I'm just a message away.",
];

export default function AskAhmed() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [hasWelcomed, setHasWelcomed] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [previewMsg, setPreviewMsg] = useState("");
  /* Live voice call. `call` is the ElevenLabs session; it is kept in a ref
     because ending it must not depend on a re-render having happened. */
  /* The panel opens on a home screen rather than dropping straight into an
     empty thread — a blank chat asks the visitor to think of a question before
     they know what the assistant can answer. */
  const [view, setView] = useState<"home" | "chat">("home");
  /* The visitor gets one of Ahmed's five avatars, picked once per session.
     Chosen in an effect rather than at render: Math.random() during render
     would give the server and the client different faces and break hydration. */
  const [myAvatar, setMyAvatar] = useState(CLIENT_AVATARS[0]);
  const [callState, setCallState] = useState<"idle" | "connecting" | "live" | "error">("idle");
  const callRef = useRef<{ endSession: () => Promise<void> } | null>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const nudgeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nudgeIndexRef = useRef(0);
  const isOpenRef = useRef(false);

  // Keep ref in sync
  const endCall = useCallback(async () => {
    try {
      await callRef.current?.endSession();
    } catch {
      /* already closed */
    }
    callRef.current = null;
    setCallState("idle");
  }, []);

  const startCall = useCallback(async () => {
    if (callState === "connecting" || callState === "live") {
      await endCall();
      return;
    }
    setCallState("connecting");
    try {
      /* Ask for the mic first: if the visitor declines, there is no point
         spending a signed URL, and the browser prompt is clearer here than
         mid-connection. */
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const res = await fetch("/api/assistant/call", { method: "POST" });
      if (!res.ok) throw new Error(`call setup ${res.status}`);
      const { signedUrl } = await res.json();
      if (!signedUrl) throw new Error("no signed url");

      /* Imported on demand so the client bundle stays out of first paint. */
      const { Conversation } = await import("@elevenlabs/client");
      const conv = await Conversation.startSession({
        signedUrl,
        onConnect: () => setCallState("live"),
        onDisconnect: () => {
          callRef.current = null;
          setCallState("idle");
        },
        onError: () => {
          callRef.current = null;
          setCallState("error");
        },
      });
      callRef.current = conv as unknown as { endSession: () => Promise<void> };
    } catch (err) {
      console.error("[voice] could not start call:", err);
      callRef.current = null;
      setCallState("error");
    }
  }, [callState, endCall]);

  /* A call must never outlive the widget. */
  useEffect(() => () => { void callRef.current?.endSession(); }, []);

  useEffect(() => { isOpenRef.current = isOpen; }, [isOpen]);

  // Show greeting bubble after 4s
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowGreeting(true);
        playNotification();
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Auto-scroll
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Nudge timer - when chat is closed and idle for 15s
  const resetNudgeTimer = useCallback(() => {
    if (nudgeTimerRef.current) clearTimeout(nudgeTimerRef.current);
    nudgeTimerRef.current = setTimeout(() => {
      if (!isOpenRef.current && nudgeIndexRef.current < NUDGE_MESSAGES.length) {
        const msg = NUDGE_MESSAGES[nudgeIndexRef.current];
        nudgeIndexRef.current++;
        setPreviewMsg(msg);
        setUnreadCount((c) => c + 1);
        playNotification();
        // Auto-hide preview after 8s
        setTimeout(() => setPreviewMsg(""), 8000);
      }
    }, 15000);
  }, []);

  const openChat = useCallback(() => {
    setIsOpen(true);
    setView("home");
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
            content: "Hey! 👋 Welcome to my portfolio. I'm Ahmed, what's your name so I can help you better?",
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

  /* Other launchers (the floating robot) open the chat by firing this event,
     and mirror our open/closed state off the one we broadcast back. */
  useEffect(() => {
    const onExternalOpen = () => openChat();
    window.addEventListener("askahmed:open", onExternalOpen);
    return () => window.removeEventListener("askahmed:open", onExternalOpen);
  }, [openChat]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("askahmed:state", { detail: { open: isOpen } }));
  }, [isOpen]);

  const sendMessage = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || isTyping) return;

    setInput("");
    setShowQuickReplies(false);
    if (nudgeTimerRef.current) clearTimeout(nudgeTimerRef.current);

    const newMessages: Message[] = [...messages, { role: "user", content: msg }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.reply || "Reach me at hello@ahmedali.online";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      playNotification();
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Couldn't connect. Reach Ahmed at hello@ahmedali.online" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

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
        border: "2px solid #004D5A",
      }}
    />
  );

  return (
    <>
      {/* Trigger */}
      {!isOpen && (
        <div className="fixed bottom-7 right-7 z-[97] flex items-end gap-3">
          {/* Greeting or nudge preview */}
          {(showGreeting || previewMsg) && (
            <div
              className="cursor-pointer"
              onClick={openChat}
              style={{
                background: "#fff",
                border: "2px solid #004D5A",
                boxShadow: "4px 4px 0px 0px #004D5A",
                borderRadius: "20px 20px 4px 20px",
                padding: "14px 18px",
                maxWidth: "260px",
                fontSize: "13px",
                lineHeight: 1.6,
                color: "#04323A",
                animation: "askahmed-float-in 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
              }}
            >
              {previewMsg ? (
                previewMsg
              ) : (
                <>
                  <span style={{ display: "inline-block", animation: "askahmed-wave 1s infinite", transformOrigin: "70% 70%", fontSize: "16px" }}>👋</span>{" "}
                  Ask me anything about Ahmed&apos;s work, skills, or availability.
                </>
              )}
            </div>
          )}

          {/* Chat button */}
          <button
            onClick={openChat}
            aria-label="Open chat with Ahmed"
            className="group relative cursor-pointer"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "#CFF7EE",
              border: "2px solid #004D5A",
              boxShadow: "4px 4px 0px 0px #004D5A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
            }}
          >
            {/* Unread badge */}
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
                  border: "2px solid #004D5A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#04323A",
                  zIndex: 2,
                  animation: "askahmed-badge-pop 0.3s cubic-bezier(0.34,1.56,0.64,1)",
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
                  border: "2px solid #004D5A",
                }}
              />
            )}
            <MessageCircle size={24} color="#04323A" strokeWidth={2.5} />
          </button>
        </div>
      )}

      {/* WhatsApp button - bottom left */}
      <a
        href="https://wa.me/201011648156"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onClick={() => {
          import("@/lib/analytics").then((m) => m.trackEvent("whatsapp_click", { source: "floating_button" }));
        }}
        className="fixed bottom-7 left-7 z-[97]"
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "#25D366",
          border: "2px solid #004D5A",
          boxShadow: "-4px 4px 0px 0px #04323A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s",
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Chat Window */}
      <div
        className="fixed bottom-7 right-7 z-[97] flex flex-col askahmed-window"
        style={{
          width: "400px",
          height: "600px",
          maxHeight: "calc(100vh - 80px)",
          background: "#fff",
          border: "2px solid #004D5A",
          borderRadius: "28px",
          overflow: "hidden",
          boxShadow: "8px 8px 0px 0px #004D5A",
          transform: isOpen ? "scale(1) translateY(0)" : "scale(0.9) translateY(20px)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "all" : "none",
          transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "16px 20px",
            background: "#CFF7EE",
            borderBottom: "2px solid #04323A",
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
                border: "2px solid #004D5A",
              }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'TAN Headline'", fontWeight: 700, fontSize: "15px", color: "#04323A", lineHeight: 1.2, display: "flex", alignItems: "center", gap: "6px" }}>
              {view === "chat" && (
                <button
                  onClick={() => setView("home")}
                  aria-label="Back"
                  className="cursor-pointer"
                  style={{ background: "none", border: "none", padding: 0, display: "flex", color: "#004D5A" }}
                >
                  <ArrowLeft size={16} />
                </button>
              )}
              Ask Ahmed
            </div>
            <div style={{ fontSize: "12px", color: "rgba(0,0,0,0.5)", marginTop: "2px" }}>
              {callState === "live"
                ? "On a call · speak now"
                : callState === "connecting"
                ? "Connecting the call…"
                : callState === "error"
                ? "Call failed · allow the mic and retry"
                : "Online · replies instantly"}
            </div>
          </div>

          {/* Live voice call. Mint while idle, ink while connected, so the
              state reads without needing the label. */}
          <button
            onClick={startCall}
            aria-label={callState === "live" ? "End the call" : "Start a voice call"}
            title={callState === "live" ? "End the call" : "Talk to the assistant"}
            className="cursor-pointer"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              marginRight: "6px",
              background: callState === "live" ? "#04323A" : "#CFF7EE",
              color: callState === "live" ? "#CFF7EE" : "#004D5A",
              border: "2px solid #004D5A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {callState === "connecting" ? (
              <Loader2 size={15} className="animate-spin" />
            ) : callState === "live" ? (
              <PhoneOff size={15} />
            ) : (
              <Phone size={15} />
            )}
          </button>

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
              color: "#04323A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Home — the first thing the visitor sees */}
        {view === "home" && (
          <div style={{ flex: 1, overflowY: "auto", padding: "22px 20px 16px" }}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              {/* The people, not the portrait — an overlapping cluster reads as
                  "a practice with clients" where a single headshot reads as
                  one freelancer. */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "14px" }}>
                {CLIENT_AVATARS.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    style={{
                      width: 52, height: 52, borderRadius: "50%", objectFit: "cover",
                      border: "2px solid #004D5A", background: "#fff",
                      marginLeft: i === 0 ? 0 : -16,
                      position: "relative", zIndex: CLIENT_AVATARS.length - i,
                    }}
                  />
                ))}
              </div>
              <div style={{ fontFamily: "'TAN Headline'", fontSize: "20px", color: "#04323A", lineHeight: 1.3 }}>
                Hi, I&apos;m Ahmed
              </div>
              <div style={{ fontSize: "13px", color: "#4E717A", marginTop: "4px" }}>
                Full-Stack Digital Strategist · Jeddah
              </div>
            </div>

            {/* Primary action */}
            <button
              onClick={() => setView("chat")}
              className="cursor-pointer"
              style={{
                width: "100%", textAlign: "left", padding: "14px 16px", borderRadius: "16px",
                background: "#CFF7EE", border: "2px solid #004D5A",
                boxShadow: "3px 3px 0px 0px #004D5A", marginBottom: "10px",
                display: "flex", alignItems: "center", gap: "12px",
              }}
            >
              <MessageCircle size={20} color="#004D5A" style={{ flexShrink: 0 }} />
              <span style={{ flex: 1 }}>
                <span style={{ display: "block", fontWeight: 700, fontSize: "14px", color: "#04323A" }}>
                  Start a conversation
                </span>
                <span style={{ display: "block", fontSize: "12px", color: "rgba(4,50,58,0.65)", marginTop: "1px" }}>
                  Instant answers, in your language
                </span>
              </span>
            </button>

            {/* Secondary action — same row treatment, lighter fill */}
            <button
              onClick={startCall}
              className="cursor-pointer"
              style={{
                width: "100%", textAlign: "left", padding: "14px 16px", borderRadius: "16px",
                background: "#fff", border: "2px solid #004D5A", marginBottom: "20px",
                display: "flex", alignItems: "center", gap: "12px",
              }}
            >
              {callState === "connecting"
                ? <Loader2 size={20} color="#004D5A" className="animate-spin" style={{ flexShrink: 0 }} />
                : <Phone size={20} color="#004D5A" style={{ flexShrink: 0 }} />}
              <span style={{ flex: 1 }}>
                <span style={{ display: "block", fontWeight: 700, fontSize: "14px", color: "#04323A" }}>
                  {callState === "live" ? "End the call" : "Voice call"}
                </span>
                <span style={{ display: "block", fontSize: "12px", color: "#4E717A", marginTop: "1px" }}>
                  {callState === "connecting" ? "Connecting…"
                    : callState === "live" ? "On a call — speak now"
                    : callState === "error" ? "Allow the microphone and try again"
                    : "Talk in real time · English"}
                </span>
              </span>
            </button>

            {/* What it can do — one panel holding three rows, not three panels.
                An ink ground gives the panel the weight it was missing and
                anchors the screen: everything else here is white or mint, so
                the eye lands on this block first and reads it as one thing. */}
            <div style={{
              display: "flex", flexDirection: "column", gap: "13px",
              marginBottom: "4px", padding: "18px 16px 20px",
              borderRadius: "18px", background: "#04323A",
            }}>
              {HOME_FEATURES.map(({ Icon, title, desc, tint }, i) => (
                <div
                  key={title}
                  style={{
                    display: "flex", gap: "12px", alignItems: "flex-start",
                    paddingTop: i === 0 ? 0 : "12px",
                    borderTop: i === 0 ? "none" : "1px solid rgba(207,247,238,0.18)",
                  }}
                >
                  {/* The disc is the only colour here — filled mint, or ink
                      for the middle one so the row is not three of a kind. */}
                  <span style={{
                    width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                    background: tint,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={15} color="#04323A" strokeWidth={2.2} />
                  </span>
                  <div style={{ paddingTop: "3px" }}>
                    <div style={{ fontWeight: 700, fontSize: "13px", color: "#fff", lineHeight: 1.3 }}>
                      {title}
                    </div>
                    <div style={{ fontSize: "11.5px", color: "rgba(207,247,238,0.75)", lineHeight: 1.55, marginTop: "2px" }}>
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages, quick replies and the composer travel together */}
        {view === "chat" && (
        <>
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
                animation: "askahmed-msg-in 0.3s ease forwards",
              }}
            >
              {msg.role === "assistant" ? (
                <div style={{ marginTop: "2px" }}><AhmedAvatar size={28} /></div>
              ) : (
                <img
                  src={myAvatar}
                  alt=""
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    flexShrink: 0,
                    marginTop: "2px",
                    border: "2px solid #004D5A",
                  }}
                />
              )}

              <div style={{ maxWidth: "78%" }}>
                <div
                  style={{
                    padding: "12px 16px",
                    fontSize: "13.5px",
                    lineHeight: 1.65,
                    ...(msg.role === "user"
                      ? {
                          background: "#CFF7EE",
                          color: "#04323A",
                          fontWeight: 500,
                          border: "2px solid #004D5A",
                          boxShadow: "3px 3px 0px 0px #004D5A",
                          borderRadius: "18px 18px 4px 18px",
                        }
                      : {
                          background: "#fff",
                          color: "#04323A",
                          border: "1px solid #E4E4E7",
                          borderRadius: "18px 18px 18px 4px",
                        }),
                  }}
                  dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                />
                {msg.role === "assistant" && hasContactTag(msg.content) && <ContactButtons />}
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
                <span className="askahmed-dot" style={{ animationDelay: "0s" }} />
                <span className="askahmed-dot" style={{ animationDelay: "0.2s" }} />
                <span className="askahmed-dot" style={{ animationDelay: "0.4s" }} />
              </div>
            </div>
          )}
        </div>

        {/* Quick Replies */}
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
                  e.currentTarget.style.borderColor = "#04323A";
                  e.currentTarget.style.color = "#04323A";
                  e.currentTarget.style.boxShadow = "2px 2px 0px 0px #04323A";
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

        {/* Input */}
        <div style={{ padding: "12px 16px 16px", borderTop: "2px solid #E4E4E7", flexShrink: 0, background: "#fff" }}>
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              background: "#fff",
              border: "2px solid #004D5A",
              borderRadius: "100px",
              padding: "6px 6px 6px 18px",
              boxShadow: "3px 3px 0px 0px #004D5A",
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              rows={1}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                color: "#04323A",
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
                background: input.trim() && !isTyping ? "#CFF7EE" : "#F4F4F5",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                flexShrink: 0,
              }}
            >
              <Send size={16} color={input.trim() && !isTyping ? "#04323A" : "#A1A1AA"} />
            </button>
          </div>
        </div>
        </>
        )}
      </div>

      <style>{`
        @keyframes askahmed-badge-pop {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        @keyframes askahmed-wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-10deg); }
        }
        @keyframes askahmed-float-in {
          from { opacity: 0; transform: scale(0.8) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes askahmed-msg-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes askahmed-typing {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.3; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
        .askahmed-dot {
          width: 6px;
          height: 6px;
          background: #A1A1AA;
          border-radius: 50%;
          display: inline-block;
          animation: askahmed-typing 1.2s infinite;
        }
        .askahmed-window::-webkit-scrollbar { width: 3px; }
        .askahmed-window::-webkit-scrollbar-thumb { background: #E4E4E7; border-radius: 3px; }
        @media (max-width: 480px) {
          .askahmed-window {
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

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const QUICK_REPLIES = [
  "Summarize the strategy",
  "Compare the three brands",
  "What are the joint-page best practices?",
  "Explain the SAR 50K media plan",
  "What should we post for 212?",
  "What are the KPIs?",
];

const NUDGES = [
  "Want a quick walkthrough of the three-brand strategy?",
  "Ask me about Bestune, 212, Motor Souq, media, or KPIs.",
];

const COLORS = { emotion: "#233871", bestune: "#1F242B", b212: "#00543C", souq: "#0C6CB4", ink: "#0E1117" };

function MessageText({ text }: { text: string }) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>
      {parts.map((part, i) => part.startsWith("**") && part.endsWith("**")
        ? <strong key={i}>{part.slice(2, -2)}</strong>
        : <span key={i}>{part}</span>)}
    </p>
  );
}

export default function TaajeerStrategyChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [preview, setPreview] = useState("");
  const [welcomed, setWelcomed] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => { if (!open) setPreview(NUDGES[0]); }, 6000);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, typing]);

  const openChat = useCallback(() => {
    setOpen(true);
    setPreview("");
    if (!welcomed) {
      setWelcomed(true);
      setMessages([{ role: "assistant", content: "Hi — I’m your guide to the Taajeer Automotive strategy. Ask me about Bestune, 212, Motor Souq, the competitor analysis, media plan, or KPIs." }]);
    }
    window.setTimeout(() => inputRef.current?.focus(), 250);
  }, [welcomed]);

  const sendMessage = useCallback(async (preset?: string) => {
    const content = (preset ?? input).trim();
    if (!content || typing) return;
    const next: Message[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setTyping(true);
    try {
      const response = await fetch("/api/chat/taajeer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await response.json();
      if (!response.ok || !data.reply) throw new Error(data.error || "Chat unavailable");
      setMessages((current) => [...current, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((current) => [...current, { role: "assistant", content: "I couldn’t connect right now. Please try again in a moment." }]);
    } finally {
      setTyping(false);
    }
  }, [input, messages, typing]);

  return (
    <>
      {!open && (
        <div className="tj-chat-launcher">
          {preview && <button className="tj-chat-preview" onClick={openChat}>{preview}</button>}
          <button className="tj-chat-trigger" onClick={openChat} aria-label="Open Taajeer strategy assistant">
            <span className="tj-chat-online" />
            <MessageCircle size={25} strokeWidth={2.2} />
          </button>
        </div>
      )}

      <section className={`tj-chat-shell askahmed-window ${open ? "is-open" : ""}`} aria-label="Taajeer strategy assistant" aria-hidden={!open}>
        <header className="tj-chat-header">
          <div className="tj-chat-mark"><img src="/taajeer/brand/emotion.png" alt="Emotion" /></div>
          <div className="tj-chat-heading">
            <strong>Taajeer Strategy Guide</strong>
            <span>Bestune · 212 · Motor Souq</span>
          </div>
          <div className="tj-chat-branddots" aria-hidden="true"><i /><i /><i /></div>
          <button onClick={() => setOpen(false)} aria-label="Close chat"><X size={18} /></button>
        </header>

        <div className="tj-chat-scope">Answers are limited to this strategy document.</div>

        <div className="tj-chat-messages" ref={listRef} aria-live="polite">
          {messages.map((message, index) => (
            <div key={index} className={`tj-chat-row ${message.role}`}>
              {message.role === "assistant" && <div className="tj-chat-avatar"><img src="/taajeer/brand/emotion.png" alt="Emotion" /></div>}
              <div className="tj-chat-bubble"><MessageText text={message.content} /></div>
            </div>
          ))}
          {messages.length <= 1 && (
            <div className="tj-chat-quick">
              {QUICK_REPLIES.map((reply) => <button key={reply} onClick={() => sendMessage(reply)}>{reply}</button>)}
            </div>
          )}
          {typing && <div className="tj-chat-row assistant"><div className="tj-chat-avatar"><img src="/taajeer/brand/emotion.png" alt="" /></div><div className="tj-chat-bubble tj-chat-typing"><i /><i /><i /></div></div>}
        </div>

        <footer className="tj-chat-inputbar">
          <div className="tj-chat-inputwrap">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value.slice(0, 1000))}
              onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage(); } }}
              placeholder="Ask about the strategy…"
              rows={1}
              aria-label="Your question"
            />
            <button onClick={() => sendMessage()} disabled={!input.trim() || typing} aria-label="Send message"><Send size={17} /></button>
          </div>
          <span>AI strategy guide · verify final decisions with the team</span>
        </footer>
      </section>

      <style>{`
        .tj-chat-launcher{position:fixed;left:24px;bottom:24px;z-index:98;display:flex;flex-direction:row-reverse;align-items:flex-end;gap:12px;font-family:var(--font-montserrat),system-ui,sans-serif}
        .tj-chat-preview{max-width:285px;padding:13px 16px;border:1px solid #dfe3ea;border-radius:16px 16px 16px 4px;background:#fff;color:${COLORS.ink};font:600 12px/1.5 inherit;text-align:left;box-shadow:0 12px 36px rgba(14,17,23,.14);cursor:pointer;animation:tjChatIn .35s ease both}
        .tj-chat-trigger{position:relative;width:60px;height:60px;border:0;border-radius:50%;background:${COLORS.emotion};color:#fff;display:grid;place-items:center;cursor:pointer;box-shadow:0 14px 34px rgba(35,56,113,.32);transition:transform .2s ease,box-shadow .2s ease}
        .tj-chat-trigger:hover{transform:translateY(-3px);box-shadow:0 18px 40px rgba(35,56,113,.38)}
        .tj-chat-online{position:absolute;top:3px;right:3px;width:13px;height:13px;border:3px solid #fff;border-radius:50%;background:#20a66a}
        .tj-chat-shell{position:fixed;z-index:99;left:24px;bottom:24px;width:410px;height:min(680px,calc(100svh - 48px));display:flex;flex-direction:column;overflow:hidden;border:1px solid #dfe3ea;border-radius:24px;background:#fff;box-shadow:0 28px 80px rgba(14,17,23,.22);font-family:var(--font-montserrat),system-ui,sans-serif;opacity:0;pointer-events:none;transform:translateY(16px) scale(.97);transform-origin:bottom left;transition:opacity .24s ease,transform .3s cubic-bezier(.2,.8,.2,1)}
        .tj-chat-shell.is-open{opacity:1;pointer-events:auto;transform:none}
        .tj-chat-header{min-height:76px;padding:14px 16px;display:flex;align-items:center;gap:11px;background:${COLORS.emotion};color:#fff}
        .tj-chat-mark{width:48px;height:48px;flex:0 0 48px;border-radius:13px;display:grid;place-items:center;background:#fff;border:1px solid rgba(255,255,255,.55);box-shadow:0 4px 12px rgba(9,19,49,.16);overflow:hidden}.tj-chat-mark img{width:39px;height:39px;display:block;object-fit:contain}
        .tj-chat-heading{display:flex;flex:1;min-width:0;flex-direction:column}.tj-chat-heading strong{font-size:14px}.tj-chat-heading span{margin-top:3px;color:rgba(255,255,255,.68);font-size:10.5px}
        .tj-chat-branddots{display:flex;gap:4px}.tj-chat-branddots i{width:6px;height:18px;border-radius:4px;background:${COLORS.bestune}}.tj-chat-branddots i:nth-child(2){background:${COLORS.b212}}.tj-chat-branddots i:nth-child(3){background:${COLORS.souq}}
        .tj-chat-header>button{width:34px;height:34px;border:0;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.1);color:#fff;cursor:pointer}
        .tj-chat-scope{padding:8px 16px;border-bottom:1px solid #e6e9ed;background:#f6f8fa;color:#707987;font-size:10.5px;text-align:center}
        .tj-chat-messages{flex:1;min-height:0;overflow-y:auto;padding:18px 15px;display:flex;flex-direction:column;gap:14px;background:#fbfcfd;overscroll-behavior:contain}
        .tj-chat-row{display:flex;align-items:flex-end;gap:8px;animation:tjChatIn .22s ease both}.tj-chat-row.user{justify-content:flex-end}
        .tj-chat-avatar{width:30px;height:30px;flex:0 0 30px;border:1px solid #dfe3ea;border-radius:50%;display:grid;place-items:center;background:#fff;overflow:hidden}.tj-chat-avatar img{width:24px;height:24px;object-fit:contain}
        .tj-chat-bubble{max-width:82%;padding:11px 14px;border:1px solid #e1e5ea;border-radius:16px 16px 16px 4px;background:#fff;color:#303846;font-size:12.5px;line-height:1.65;box-shadow:0 3px 12px rgba(14,17,23,.04)}
        .tj-chat-row.user .tj-chat-bubble{border-color:${COLORS.emotion};border-radius:16px 16px 4px 16px;background:${COLORS.emotion};color:#fff;box-shadow:none}
        .tj-chat-typing{display:flex;gap:4px;padding:15px 17px}.tj-chat-typing i{width:5px;height:5px;border-radius:50%;background:#8d96a3;animation:tjDot 1s infinite}.tj-chat-typing i:nth-child(2){animation-delay:.15s}.tj-chat-typing i:nth-child(3){animation-delay:.3s}
        .tj-chat-quick{width:calc(100% - 38px);margin-left:38px;display:flex;flex-wrap:wrap;align-items:flex-start;gap:6px}.tj-chat-quick button{width:auto;max-width:100%;min-height:32px;padding:7px 11px;border:1px solid transparent;border-radius:999px;font-family:inherit;font-size:10px;font-weight:650;line-height:1.2;text-align:left;cursor:pointer;transition:transform .18s ease,box-shadow .18s ease}.tj-chat-quick button:nth-child(1){background:#fff2bd;border-color:#e2bd35;color:#6d5300}.tj-chat-quick button:nth-child(2){background:#fde2df;border-color:#d9675d;color:#8b241b}.tj-chat-quick button:nth-child(3){background:#dfeafc;border-color:#6f96d9;color:#233871}.tj-chat-quick button:nth-child(4){background:#dcefe8;border-color:#57a187;color:#00543c}.tj-chat-quick button:nth-child(5){background:#e1effa;border-color:#64a4d2;color:#0c5e9b}.tj-chat-quick button:nth-child(6){background:#e8e9eb;border-color:#959ba3;color:#1f242b}.tj-chat-quick button:hover{transform:translateY(-1px);box-shadow:0 4px 10px rgba(14,17,23,.08)}
        .tj-chat-inputbar{padding:12px 14px 10px;border-top:1px solid #e6e9ed;background:#fff}.tj-chat-inputwrap{display:flex;align-items:flex-end;gap:8px;padding:6px 6px 6px 14px;border:1px solid #cfd5dd;border-radius:18px;background:#fff;transition:border-color .2s,box-shadow .2s}.tj-chat-inputwrap:focus-within{border-color:${COLORS.emotion};box-shadow:0 0 0 3px rgba(35,56,113,.09)}
        .tj-chat-inputwrap textarea{flex:1;min-height:36px;max-height:90px;padding:7px 0;border:0;outline:0;resize:none;background:transparent;color:${COLORS.ink};font:500 12.5px/1.5 inherit}.tj-chat-inputwrap button{width:38px;height:38px;flex:0 0 38px;border:0;border-radius:13px;display:grid;place-items:center;background:${COLORS.emotion};color:#fff;cursor:pointer}.tj-chat-inputwrap button:disabled{background:#e6e9ed;color:#9ba3ae;cursor:not-allowed}
        .tj-chat-inputbar>span{display:block;margin-top:7px;color:#9ba3ae;font-size:8.5px;text-align:center}
        @keyframes tjChatIn{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}@keyframes tjDot{0%,60%,100%{opacity:.35;transform:none}30%{opacity:1;transform:translateY(-3px)}}
        @media(max-width:600px){.tj-chat-launcher{right:14px;bottom:14px}.tj-chat-preview{display:none}.tj-chat-trigger{width:56px;height:56px}.tj-chat-shell{inset:8px;width:auto;height:auto;max-height:none;border-radius:20px;transform-origin:bottom center}.tj-chat-header{padding-top:max(14px,env(safe-area-inset-top))}.tj-chat-inputbar{padding-bottom:max(10px,env(safe-area-inset-bottom))}.tj-chat-bubble{max-width:86%;font-size:13px}}
        @media(prefers-reduced-motion:reduce){.tj-chat-shell,.tj-chat-trigger,.tj-chat-row,.tj-chat-preview{animation:none;transition:none}}
      `}</style>
    </>
  );
}

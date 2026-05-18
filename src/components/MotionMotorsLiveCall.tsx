"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Mic, MicOff, PhoneOff, Loader2, AudioLines } from "lucide-react";
/* eslint-disable @next/next/no-img-element */

type CallStatus = "idle" | "connecting" | "ready" | "user_speaking" | "thinking" | "ai_speaking" | "ended" | "error";

const VOICES: { id: string; label: string; tone: string }[] = [
  { id: "Aoede", label: "Aoede", tone: "Warm · soft" },
  { id: "Charon", label: "Charon", tone: "Deep · steady" },
  { id: "Fenrir", label: "Fenrir", tone: "Bright · firm" },
  { id: "Kore", label: "Kore", tone: "Clear · neutral" },
  { id: "Leda", label: "Leda", tone: "Light · friendly" },
  { id: "Orus", label: "Orus", tone: "Grounded · low" },
  { id: "Puck", label: "Puck", tone: "Lively · quick" },
  { id: "Zephyr", label: "Zephyr", tone: "Airy · calm" },
];

function base64ToArrayBuffer(b64: string): ArrayBuffer {
  const bin = atob(b64);
  const len = bin.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = bin.charCodeAt(i);
  return bytes.buffer;
}

// Browser SpeechRecognition shim
type SRInstance = {
  start: () => void;
  stop: () => void;
  abort: () => void;
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onstart: ((e: Event) => void) | null;
  onend: ((e: Event) => void) | null;
  onerror: ((e: Event) => void) | null;
  onresult: ((e: { results: ArrayLike<{ 0: { transcript: string }; isFinal: boolean }> }) => void) | null;
};
function getSpeechRecognition(): { new (): SRInstance } | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: { new (): SRInstance }; webkitSpeechRecognition?: { new (): SRInstance } };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

interface MotionMotorsLiveCallProps {
  open: boolean;
  onClose: () => void;
}

export default function MotionMotorsLiveCall({ open, onClose }: MotionMotorsLiveCallProps) {
  const [status, setStatus] = useState<CallStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [voice, setVoice] = useState<string>("Aoede");
  const [showVoicePicker, setShowVoicePicker] = useState(false);
  const [muted, setMuted] = useState(false);
  const [transcript, setTranscript] = useState<{ user: string; ai: string }>({ user: "", ai: "" });
  const [audioLevel, setAudioLevel] = useState(0);

  // Refs that survive re-renders
  const audioContextRef = useRef<AudioContext | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const playerNodeRef = useRef<AudioWorkletNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const recognitionRef = useRef<SRInstance | null>(null);
  const aliveRef = useRef(false);
  const mutedRef = useRef(false);
  const voiceRef = useRef<string>("Aoede");
  const messagesRef = useRef<{ role: "user" | "assistant"; content: string }[]>([]);
  // Set true whenever we send AI audio to the player; player onmessage(idle)
  // clears it and triggers the next listen turn.
  const pendingListenRef = useRef(false);

  useEffect(() => { mutedRef.current = muted; }, [muted]);
  useEffect(() => { voiceRef.current = voice; }, [voice]);

  const teardown = useCallback(() => {
    aliveRef.current = false;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;

    try {
      if (recognitionRef.current) {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.abort();
      }
    } catch {}
    recognitionRef.current = null;

    try { playerNodeRef.current?.port.postMessage("flush"); } catch {}
    try { playerNodeRef.current?.disconnect(); } catch {}
    playerNodeRef.current = null;

    try { analyserRef.current?.disconnect(); } catch {}
    analyserRef.current = null;

    try { micStreamRef.current?.getTracks().forEach((t) => t.stop()); } catch {}
    micStreamRef.current = null;

    try { audioContextRef.current?.close(); } catch {}
    audioContextRef.current = null;
  }, []);

  const endCall = useCallback(() => {
    teardown();
    setStatus("ended");
    setTimeout(() => {
      onClose();
      setStatus("idle");
      setTranscript({ user: "", ai: "" });
      setErrorMsg("");
      messagesRef.current = [];
    }, 250);
  }, [onClose, teardown]);

  // --- Speech Recognition (user speech to text)
  const startListening = useCallback(() => {
    const SR = getSpeechRecognition();
    if (!SR || !aliveRef.current) return;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.abort();
      } catch {}
      recognitionRef.current = null;
    }
    // Pick lang from last AI message context
    const lastAi = [...messagesRef.current].reverse().find((m) => m.role === "assistant");
    const isArabicCtx = /[؀-ۿ]/.test(lastAi?.content || "");

    const recognition = new SR();
    recognition.lang = isArabicCtx ? "ar-SA" : "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    let silenceTimer: ReturnType<typeof setTimeout> | null = null;
    let collected = "";
    let manuallyStopped = false;

    setStatus("ready");

    const finalize = () => {
      if (silenceTimer) { clearTimeout(silenceTimer); silenceTimer = null; }
      const text = collected.trim();
      collected = "";
      try { recognition.stop(); } catch {}
      if (text && !manuallyStopped && aliveRef.current) {
        void handleUserSpoke(text);
      }
    };

    recognition.onstart = () => {
      if (aliveRef.current && !mutedRef.current) setStatus("ready");
    };
    recognition.onend = () => {
      if (collected.trim() && !manuallyStopped && aliveRef.current) {
        void handleUserSpoke(collected.trim());
        collected = "";
      }
    };
    recognition.onerror = () => {
      if (silenceTimer) { clearTimeout(silenceTimer); silenceTimer = null; }
    };
    recognition.onresult = (e) => {
      if (mutedRef.current) return;
      let finalThisRound = "";
      let interimText = "";
      for (let i = 0; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalThisRound += r[0].transcript + " ";
        else interimText += r[0].transcript;
      }
      if (finalThisRound) collected += finalThisRound;
      const display = (collected + interimText).trim();
      if (display) {
        setTranscript((t) => ({ ...t, user: display }));
        setStatus("user_speaking");
      }
      if (silenceTimer) clearTimeout(silenceTimer);
      if (display) silenceTimer = setTimeout(finalize, 1300);
    };

    recognitionRef.current = recognition;
    (recognition as unknown as { _manualStop?: () => void })._manualStop = () => {
      manuallyStopped = true;
      if (silenceTimer) { clearTimeout(silenceTimer); silenceTimer = null; }
      try { recognition.stop(); } catch {}
    };

    try { recognition.start(); } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Send user text to chat API, then TTS
  const handleUserSpoke = useCallback(async (text: string) => {
    if (!aliveRef.current) return;
    setStatus("thinking");
    messagesRef.current = [...messagesRef.current, { role: "user", content: text }];
    setTranscript({ user: text, ai: "" });

    try {
      const chatRes = await fetch("/api/chat/motionmotors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messagesRef.current }),
      });
      if (!chatRes.ok) throw new Error("chat error");
      const chatData = await chatRes.json();
      const reply: string = chatData.reply || "Sorry, something went wrong.";
      if (!aliveRef.current) return;
      messagesRef.current = [...messagesRef.current, { role: "assistant", content: reply }];
      setTranscript((t) => ({ ...t, ai: reply }));

      // TTS
      setStatus("ai_speaking");
      const ttsRes = await fetch("/api/chat/motionmotors/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: reply, voice: voiceRef.current }),
      });
      if (!ttsRes.ok) throw new Error("tts error");
      const ttsData = await ttsRes.json();
      if (!aliveRef.current) return;
      const ab = base64ToArrayBuffer(ttsData.audio);
      const player = playerNodeRef.current;
      if (player) {
        pendingListenRef.current = true;
        try { player.port.postMessage({ pcm: ab }, [ab]); } catch {}
      } else {
        // No player — fall back to listening immediately
        startListening();
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Couldn't reach the AI — try again.");
      if (aliveRef.current) {
        setTimeout(() => { setErrorMsg(""); startListening(); }, 1500);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Initial greeting via TTS only (no chat round-trip)
  const playGreeting = useCallback(async () => {
    const greeting = "Hey, you're on a call about the Motion Motors May 2026 approach. Ask me anything in the plan.";
    messagesRef.current = [...messagesRef.current, { role: "assistant", content: greeting }];
    setTranscript({ user: "", ai: greeting });
    setStatus("ai_speaking");
    try {
      const ttsRes = await fetch("/api/chat/motionmotors/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: greeting, voice: voiceRef.current }),
      });
      if (ttsRes.ok && aliveRef.current) {
        const data = await ttsRes.json();
        const ab = base64ToArrayBuffer(data.audio);
        if (playerNodeRef.current) {
          pendingListenRef.current = true;
          try { playerNodeRef.current.port.postMessage({ pcm: ab }, [ab]); } catch {}
        }
      } else {
        // Fallback — just start listening
        if (aliveRef.current) startListening();
      }
    } catch {
      if (aliveRef.current) startListening();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Set up audio + mic + start the call
  const connect = useCallback(async () => {
    setStatus("connecting");
    setErrorMsg("");
    aliveRef.current = true;
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AC();
      audioContextRef.current = ctx;
      await ctx.audioWorklet.addModule("/audio/player-processor.js");

      // Player node
      const playerNode = new AudioWorkletNode(ctx, "player-processor", {
        processorOptions: { sourceSampleRate: 24000 },
        outputChannelCount: [1],
      });
      playerNode.connect(ctx.destination);
      playerNodeRef.current = playerNode;

      playerNode.port.onmessage = (e) => {
        if (!e.data?.idle) return;
        if (!aliveRef.current) return;
        // Only act on the transition from "playing" to "idle"
        if (!pendingListenRef.current) return;
        pendingListenRef.current = false;
        // Pause briefly to avoid catching tail of AI audio in the mic
        setTimeout(() => {
          if (aliveRef.current && !mutedRef.current) startListening();
        }, 400);
      };

      // Mic + analyser (visualizer only — STT uses its own pipeline)
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
        },
      });
      micStreamRef.current = stream;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      analyserRef.current = analyser;

      const dataArr = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        if (!aliveRef.current || !analyserRef.current) return;
        analyserRef.current.getByteTimeDomainData(dataArr);
        let peak = 0;
        for (let i = 0; i < dataArr.length; i++) {
          const v = Math.abs(dataArr[i] - 128) / 128;
          if (v > peak) peak = v;
        }
        setAudioLevel(peak);
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);

      // Greeting (then auto-listen)
      await playGreeting();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to start call";
      console.error(err);
      setErrorMsg(message);
      setStatus("error");
      teardown();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playGreeting, teardown]);

  // Open / close lifecycle
  useEffect(() => {
    if (open && status === "idle") {
      connect();
    } else if (!open) {
      teardown();
    }
    return () => {
      if (!open) teardown();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // When player goes idle: start listening (handled in onmessage above using current status)
  // We also use a status-effect: once "ai_speaking" transitions away on idle,
  // this picks up and starts STT.
  useEffect(() => {
    if (status === "ai_speaking") return;
    // Start listening only after greeting first transitions away
    // (the player onmessage handles this)
  }, [status]);

  // Visualizer canvas
  useEffect(() => {
    if (!open || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;
    ctx2d.scale(dpr, dpr);

    let running = true;
    const start = performance.now();
    const draw = () => {
      if (!running) return;
      const w = rect.width;
      const h = rect.height;
      ctx2d.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const baseR = Math.min(w, h) * 0.34;
      const t = (performance.now() - start) / 1000;
      const isAi = status === "ai_speaking";
      const level = isAi ? 0.5 + Math.sin(t * 6) * 0.18 : audioLevel;

      for (let ring = 0; ring < 3; ring++) {
        const phase = t * (1.4 + ring * 0.3);
        const radius = baseR + ring * 26 + level * 40 + Math.sin(phase) * 4;
        ctx2d.beginPath();
        ctx2d.arc(cx, cy, radius, 0, Math.PI * 2);
        const alpha = (0.18 - ring * 0.05) * (0.6 + level * 0.8);
        ctx2d.strokeStyle = isAi
          ? `rgba(79,255,176,${alpha})`
          : `rgba(255,255,255,${alpha * 0.7})`;
        ctx2d.lineWidth = 1.5;
        ctx2d.stroke();
      }

      if (analyserRef.current) {
        const bars = 48;
        const data = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(data);
        const slice = Math.floor(data.length / bars);
        const barW = (w * 0.6) / bars;
        const startX = w * 0.2;
        for (let i = 0; i < bars; i++) {
          let avg = 0;
          for (let j = 0; j < slice; j++) avg += data[i * slice + j];
          avg /= slice;
          const norm = avg / 255;
          const barH = 4 + norm * 36;
          ctx2d.fillStyle = isAi
            ? `rgba(79,255,176,${0.22 + norm * 0.5})`
            : `rgba(255,255,255,${0.18 + norm * 0.45})`;
          ctx2d.fillRect(startX + i * barW + 1, h - 64 - barH / 2, barW - 2, barH);
        }
      }

      requestAnimationFrame(draw);
    };
    draw();
    return () => { running = false; };
  }, [open, audioLevel, status]);

  if (!open) return null;

  const statusLabel = (() => {
    switch (status) {
      case "connecting": return "Connecting…";
      case "thinking": return "Thinking…";
      case "ai_speaking": return "Speaking";
      case "user_speaking":
      case "ready": return muted ? "Muted" : "Listening";
      case "ended": return "Call ended";
      case "error": return "Connection error";
      default: return "On call";
    }
  })();

  const statusColor = (() => {
    switch (status) {
      case "ai_speaking": return "#4FFFB0";
      case "thinking": return "#F59E0B";
      case "user_speaking":
      case "ready": return muted ? "#A1A1AA" : "#EF4444";
      case "connecting": return "#F59E0B";
      case "error": return "#EF4444";
      default: return "rgba(255,255,255,0.5)";
    }
  })();

  return (
    <div
      className="fixed inset-0 z-[120] flex flex-col items-center justify-center"
      style={{
        background: "radial-gradient(ellipse at top, #1A1A1A 0%, #050505 100%)",
        animation: "mmlc-fade-in 0.45s ease forwards",
      }}
    >
      {/* Top label */}
      <div className="absolute top-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-2">
          <span
            className="block w-2 h-2 rounded-full"
            style={{
              background: statusColor,
              boxShadow: `0 0 10px ${statusColor}`,
              animation: status === "connecting" || status === "thinking" ? "mmlc-pulse 1s ease-in-out infinite" : "none",
            }}
          />
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase" }}>
            {statusLabel}
          </p>
        </div>
        <p style={{ fontFamily: "'TAN Headline'", fontWeight: 700, fontSize: 22, color: "#fff" }}>Ahmed Ali</p>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Motion Motors × Soueast · May 2026</p>
      </div>

      {/* Visualizer + Avatar */}
      <div className="relative" style={{ width: 360, height: 360 }}>
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
        <div
          className="absolute inset-0 m-auto"
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            overflow: "hidden",
            border: `3px solid ${
              status === "ai_speaking" ? "#4FFFB0" :
              status === "connecting" || status === "thinking" ? "rgba(245,158,11,0.5)" :
              status === "error" ? "rgba(239,68,68,0.6)" :
              muted ? "rgba(161,161,170,0.4)" : "rgba(255,255,255,0.18)"
            }`,
            boxShadow: status === "ai_speaking"
              ? "0 0 80px rgba(79,255,176,0.5)"
              : "0 25px 60px rgba(0,0,0,0.6)",
            transition: "border-color 250ms, box-shadow 400ms",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img
            src="/myphoto-profile.png"
            alt="Ahmed Ali"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Live transcript */}
      <div className="mt-10 px-8 text-center max-w-2xl min-h-[80px]">
        {transcript.user && status !== "ai_speaking" && (
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, fontStyle: "italic", marginBottom: 8 }}>
            you: {transcript.user}
          </p>
        )}
        {transcript.ai && (
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 16, lineHeight: 1.55 }}>
            {transcript.ai}
          </p>
        )}
        {status === "error" && errorMsg && (
          <p style={{ color: "#EF4444", fontSize: 13, marginTop: 8 }}>
            {errorMsg}
          </p>
        )}
      </div>

      {/* Voice picker */}
      {showVoicePicker && (
        <div
          className="absolute"
          style={{
            bottom: 130,
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(20,20,20,0.96)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 18,
            padding: 10,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 6,
            minWidth: 360,
            maxWidth: "90vw",
          }}
        >
          {VOICES.map((v) => {
            const active = v.id === voice;
            return (
              <button
                key={v.id}
                onClick={() => {
                  setVoice(v.id);
                  voiceRef.current = v.id;
                  setShowVoicePicker(false);
                }}
                style={{
                  padding: "10px 12px",
                  borderRadius: 12,
                  background: active ? "rgba(79,255,176,0.15)" : "rgba(255,255,255,0.04)",
                  border: active ? "1px solid #4FFFB0" : "1px solid rgba(255,255,255,0.06)",
                  color: "#fff",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 200ms",
                }}
              >
                <p style={{ fontFamily: "'TAN Headline'", fontWeight: 700, fontSize: 13 }}>{v.label}</p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, marginTop: 2 }}>{v.tone}</p>
              </button>
            );
          })}
        </div>
      )}

      {/* Controls */}
      <div className="absolute bottom-12 flex items-center gap-6">
        <button
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Unmute mic" : "Mute mic"}
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: muted ? "rgba(161,161,170,0.18)" : "rgba(255,255,255,0.08)",
            border: `1px solid ${muted ? "rgba(161,161,170,0.4)" : "rgba(255,255,255,0.15)"}`,
            color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 200ms",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
          }}
        >
          {muted ? <MicOff size={22} color="#A1A1AA" /> : <Mic size={22} color="#fff" />}
        </button>

        <button
          onClick={endCall}
          aria-label="End call"
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "#EF4444",
            border: "none",
            color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 200ms",
            cursor: "pointer",
            boxShadow: "0 8px 30px rgba(239,68,68,0.5)",
          }}
        >
          {status === "connecting" ? <Loader2 size={26} className="animate-spin" /> : <PhoneOff size={26} />}
        </button>

        <button
          onClick={() => setShowVoicePicker((v) => !v)}
          aria-label="Choose voice"
          title={`Voice · ${voice}`}
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: showVoicePicker ? "rgba(79,255,176,0.18)" : "rgba(255,255,255,0.08)",
            border: `1px solid ${showVoicePicker ? "rgba(79,255,176,0.4)" : "rgba(255,255,255,0.15)"}`,
            color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 200ms",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
          }}
        >
          <AudioLines size={22} color={showVoicePicker ? "#4FFFB0" : "#fff"} />
        </button>
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: 1.2, textTransform: "uppercase" }}>
          Voice · {voice}
        </p>
      </div>

      <style>{`
        @keyframes mmlc-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes mmlc-pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
      `}</style>
    </div>
  );
}

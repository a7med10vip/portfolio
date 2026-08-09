import { NextRequest, NextResponse } from "next/server";

const TTS_MODEL = "gemini-2.5-pro-preview-tts";
const VALID_VOICES = new Set([
  "Aoede", "Charon", "Fenrir", "Kore", "Leda", "Orus", "Puck", "Zephyr",
]);

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Server not configured" }, { status: 500 });
    }
    const body = await req.json().catch(() => ({}));
    const text: string = (body.text || "").toString().slice(0, 4000);
    const voice: string = VALID_VOICES.has(body.voice) ? body.voice : "Aoede";
    if (!text.trim()) {
      return NextResponse.json({ error: "No text" }, { status: 400 });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${TTS_MODEL}:generateContent?key=${apiKey}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text }] }],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } },
          },
        },
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("TTS upstream error:", res.status, errText);
      return NextResponse.json({ error: "TTS failed" }, { status: 500 });
    }
    const data = await res.json();
    const parts: Array<{ inlineData?: { data?: string; mimeType?: string } }> =
      data?.candidates?.[0]?.content?.parts || [];
    const audioPart = parts.find((p) => p.inlineData?.mimeType?.startsWith("audio/"));
    const audio = audioPart?.inlineData?.data;
    const mimeType = audioPart?.inlineData?.mimeType || "audio/L16;codec=pcm;rate=24000";
    if (!audio) {
      return NextResponse.json({ error: "No audio returned" }, { status: 500 });
    }

    // Parse sample rate from mime (e.g. "audio/L16;codec=pcm;rate=24000")
    const match = /rate=(\d+)/.exec(mimeType);
    const sampleRate = match ? parseInt(match[1], 10) : 24000;

    return NextResponse.json({ audio, sampleRate, voice });
  } catch (err) {
    const message = err instanceof Error ? err.message : "TTS error";
    console.error("TTS route error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

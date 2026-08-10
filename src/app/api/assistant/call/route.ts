import { VOICE_SYSTEM, VOICE_GREETING } from "@/lib/assistant-knowledge";

export const runtime = "nodejs";

/**
 * Provisions an ElevenLabs Conversational AI agent from the shared knowledge
 * base, then hands the browser a short-lived signed URL so it can open a
 * real-time voice call.
 *
 * English only, on purpose. A single agent asked to switch language mid-call
 * handles it badly, and two agents means two personalities to keep in step.
 * If the caller speaks Arabic the agent says, in English, that this line is
 * English and points them to WhatsApp.
 */

const EL = "https://api.elevenlabs.io/v1/convai";
const VOICE_ID = "dfeOmy6Uay63tNhyO99j";
/* ElevenLabs rejects v2_5 on English agents: "English Agents must use turbo
   or flash v2." */
const MODEL_ID = "eleven_turbo_v2";

/* Cached per lambda instance so a warm container reuses the agent rather than
   creating a new one on every call. */
let agentId: string | null = null;

async function ensureAgent(apiKey: string): Promise<string> {
  if (agentId) return agentId;

  const res = await fetch(`${EL}/agents/create`, {
    method: "POST",
    headers: { "xi-api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Ahmed Ali Portfolio Assistant",
      conversation_config: {
        agent: {
          prompt: { prompt: VOICE_SYSTEM, temperature: 0.3 },
          first_message: VOICE_GREETING,
          language: "en",
        },
        tts: {
          voice_id: VOICE_ID,
          model_id: MODEL_ID,
          stability: 0.4,
          similarity_boost: 0.85,
          speed: 1.0,
        },
      },
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`agent_create ${res.status} ${detail}`);
  }
  const data = await res.json();
  const id = data.agent_id || data.agentId;
  if (!id) throw new Error("no agent_id returned");
  agentId = id;
  return id;
}

export async function POST() {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "not_configured", detail: "ELEVENLABS_API_KEY is not set" },
      { status: 503 }
    );
  }

  try {
    const id = process.env.ELEVENLABS_AGENT_ID || (await ensureAgent(apiKey));

    const res = await fetch(`${EL}/conversation/get-signed-url?agent_id=${id}`, {
      headers: { "xi-api-key": apiKey },
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[assistant/call] signed-url failed:", res.status, detail);
      return Response.json({ error: "signed_url_failed", detail }, { status: 502 });
    }

    const data = await res.json();
    return Response.json(
      { signedUrl: data.signed_url || data.signedUrl },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("[assistant/call] error:", err);
    return Response.json({ error: "call_setup_failed", detail: String(err) }, { status: 500 });
  }
}
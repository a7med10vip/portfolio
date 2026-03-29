import { createServiceClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { sendTikTokEvent } from "@/lib/tiktok";

export async function POST(req: NextRequest) {
  try {
    const { eventName, eventData, sessionId, path } = await req.json();
    const country = req.headers.get("x-vercel-ip-country") || null;
    const userAgent = req.headers.get("user-agent") || "";

    const supabase = createServiceClient();
    await supabase.from("analytics_events").insert({
      event_name: eventName,
      event_data: { ...eventData, country, userAgent, platform: detectPlatform(userAgent) },
      session_id: sessionId,
      path,
    });

    // Track WhatsApp clicks in TikTok too
    if (eventName === "whatsapp_click") {
      sendTikTokEvent({
        event: "Contact",
        context: { user_agent: userAgent, ip: req.headers.get("x-forwarded-for") || "" },
        properties: { content_name: "WhatsApp", content_type: "click" },
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

function detectPlatform(ua: string): string {
  if (!ua) return "unknown";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
  if (/Android/i.test(ua)) return "Android";
  if (/Windows/i.test(ua)) return "Windows";
  if (/Mac/i.test(ua)) return "macOS";
  if (/Linux/i.test(ua)) return "Linux";
  return "other";
}

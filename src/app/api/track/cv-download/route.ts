import { createServiceClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { referrer, userAgent, device, lang, sessionId } = await req.json();
    const country = req.headers.get("x-vercel-ip-country") || null;
    const supabase = createServiceClient();
    await supabase.from("cv_downloads").insert({
      referrer, user_agent: userAgent, country, device, lang, session_id: sessionId,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

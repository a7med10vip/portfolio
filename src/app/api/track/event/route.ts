import { createServiceClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { eventName, eventData, sessionId, path } = await req.json();
    const supabase = createServiceClient();
    await supabase.from("analytics_events").insert({
      event_name: eventName, event_data: eventData || {}, session_id: sessionId, path,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

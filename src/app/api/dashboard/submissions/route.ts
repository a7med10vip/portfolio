import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const type = req.nextUrl.searchParams.get("type") || "all";

  const results: { type: string; id: string; name: string; detail: string; urgent?: boolean; is_read: boolean; created_at: string }[] = [];

  if (type === "all" || type === "contact") {
    const { data } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
    (data || []).forEach((d) => results.push({ type: "contact", id: d.id, name: d.name, detail: d.email, is_read: d.is_read, created_at: d.created_at }));
  }

  if (type === "all" || type === "apply") {
    const { data } = await supabase.from("apply_submissions").select("*").order("created_at", { ascending: false });
    (data || []).forEach((d) => results.push({ type: "apply", id: d.id, name: d.name, detail: d.whatsapp, urgent: d.urgent, is_read: d.is_read, created_at: d.created_at }));
  }

  results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return NextResponse.json(results);
}

export async function PATCH(req: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, type, is_read } = await req.json();
  const table = type === "apply" ? "apply_submissions" : "contact_submissions";
  await supabase.from(table).update({ is_read }).eq("id", id);

  return NextResponse.json({ ok: true });
}

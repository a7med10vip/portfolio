import { createServerSupabaseClient, createServiceClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { project_id, title, description, ord } = await req.json();
  if (!project_id || !title) {
    return NextResponse.json({ error: "project_id and title are required" }, { status: 400 });
  }

  const admin = createServiceClient();
  const { data, error } = await admin
    .from("phases")
    .insert({
      project_id,
      title,
      description: description || null,
      ord: ord ?? 0,
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

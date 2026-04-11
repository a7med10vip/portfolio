import { createServerSupabaseClient, createServiceClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { client_id, title, description, deadline, phases: phasesList } = await req.json();
  if (!client_id || !title) {
    return NextResponse.json({ error: "client_id and title are required" }, { status: 400 });
  }

  const admin = createServiceClient();

  const { data: project, error: pErr } = await admin
    .from("projects")
    .insert({
      client_id,
      title,
      description: description || null,
      deadline: deadline || null,
    })
    .select()
    .single();
  if (pErr) return NextResponse.json({ error: pErr.message }, { status: 500 });

  if (phasesList?.length) {
    const rows = phasesList.map(
      (p: { title: string; description?: string }, i: number) => ({
        project_id: project.id,
        title: p.title,
        description: p.description || null,
        ord: i,
      })
    );
    await admin.from("phases").insert(rows);
  }

  await admin.from("activity_log").insert({
    project_id: project.id,
    client_id,
    actor: "admin",
    action: "project_created",
    details: { title },
  });

  return NextResponse.json(project, { status: 201 });
}

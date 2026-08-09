import { createServerSupabaseClient, createServiceClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const admin = createServiceClient();

  // Fetch current phase + project info before updating
  const { data: oldPhase } = await admin
    .from("phases")
    .select("*, projects(client_id, title)")
    .eq("id", id)
    .single();

  const { data: phase, error } = await admin
    .from("phases")
    .update(body)
    .eq("id", id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // On status change: notify client + log + recalculate project progress
  if (oldPhase && body.status && body.status !== oldPhase.status) {
    const clientId = (oldPhase.projects as { client_id: string; title: string } | null)?.client_id;
    const projectTitle = (oldPhase.projects as { client_id: string; title: string } | null)?.title;

    const statusLabel: Record<string, string> = {
      active: "بدأت",
      done: "اكتملت",
      pending: "معلقة",
    };

    if (clientId) {
      await Promise.all([
        admin.from("notifications").insert({
          client_id: clientId,
          title: `مرحلة ${statusLabel[body.status] ?? body.status}`,
          message: `المرحلة "${phase.title}" في مشروع "${projectTitle}" ${statusLabel[body.status] ?? body.status}`,
        }),
        admin.from("activity_log").insert({
          project_id: phase.project_id,
          client_id: clientId,
          actor: "admin",
          action: "phase_status_changed",
          details: {
            phase_title: phase.title,
            from: oldPhase.status,
            to: body.status,
          },
        }),
      ]);

      // Recalculate project progress
      const { data: allPhases } = await admin
        .from("phases")
        .select("status")
        .eq("project_id", phase.project_id);

      if (allPhases?.length) {
        const done = allPhases.filter((p) => p.status === "done").length;
        const progress = Math.round((done / allPhases.length) * 100);
        await admin.from("projects").update({ progress }).eq("id", phase.project_id);
      }
    }
  }

  return NextResponse.json(phase);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const admin = createServiceClient();
  const { error } = await admin.from("phases").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

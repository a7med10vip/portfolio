import { createServerSupabaseClient, createServiceClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const admin = createServiceClient();
  const { data, error } = await admin
    .from("profiles")
    .select("*, projects(id, title, status, progress)")
    .eq("role", "client")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: Request) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { email, password, full_name, company, phone, username } = await req.json();
  if (!email || !password || !full_name) {
    return NextResponse.json({ error: "email, password and full_name are required" }, { status: 400 });
  }

  const admin = createServiceClient();

  const { data: auth, error: authErr } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role: "client", full_name, username: username || null },
  });
  if (authErr) return NextResponse.json({ error: authErr.message }, { status: 400 });

  // Upsert profile — trigger may already have created it
  const { error: profileErr } = await admin.from("profiles").upsert({
    id: auth.user.id,
    email,
    role: "client",
    full_name,
    username: username || null,
    company: company || null,
    phone: phone || null,
  });
  if (profileErr) return NextResponse.json({ error: profileErr.message }, { status: 500 });

  return NextResponse.json({ id: auth.user.id, email, full_name }, { status: 201 });
}

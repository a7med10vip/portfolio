import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const weekAgo = new Date(now.getTime() - 7 * 86400000).toISOString();
  const monthAgo = new Date(now.getTime() - 30 * 86400000).toISOString();
  const prevMonth = new Date(now.getTime() - 60 * 86400000).toISOString();

  const [views, viewsMonth, viewsPrev, cvTotal, contactTotal, applyTotal, chatTotal, viewsDaily] = await Promise.all([
    supabase.from("page_views").select("id", { count: "exact", head: true }).gte("created_at", today),
    supabase.from("page_views").select("id", { count: "exact", head: true }).gte("created_at", monthAgo),
    supabase.from("page_views").select("id", { count: "exact", head: true }).gte("created_at", prevMonth).lt("created_at", monthAgo),
    supabase.from("cv_downloads").select("id", { count: "exact", head: true }),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
    supabase.from("apply_submissions").select("id", { count: "exact", head: true }),
    supabase.from("chat_conversations").select("id", { count: "exact", head: true }),
    supabase.from("page_views").select("created_at").gte("created_at", weekAgo).order("created_at", { ascending: true }),
  ]);

  // Group daily views for sparkline
  const daily: Record<string, number> = {};
  (viewsDaily.data || []).forEach((v: { created_at: string }) => {
    const day = v.created_at.slice(0, 10);
    daily[day] = (daily[day] || 0) + 1;
  });
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now.getTime() - (6 - i) * 86400000);
    const key = d.toISOString().slice(0, 10);
    return { date: key, views: daily[key] || 0 };
  });

  // Recent submissions
  const [recentContact, recentApply, unreadContact, unreadApply] = await Promise.all([
    supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }).limit(5),
    supabase.from("apply_submissions").select("*").order("created_at", { ascending: false }).limit(5),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("is_read", false),
    supabase.from("apply_submissions").select("id", { count: "exact", head: true }).eq("is_read", false),
  ]);

  // Top pages
  const topPagesData = await supabase.from("page_views").select("path").gte("created_at", monthAgo);
  const pageCounts: Record<string, number> = {};
  (topPagesData.data || []).forEach((v: { path: string }) => {
    pageCounts[v.path] = (pageCounts[v.path] || 0) + 1;
  });
  const topPages = Object.entries(pageCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([path, count]) => ({ path, count }));

  // Device breakdown
  const devicesData = await supabase.from("page_views").select("device").gte("created_at", monthAgo);
  const deviceCounts: Record<string, number> = {};
  (devicesData.data || []).forEach((v: { device: string }) => {
    const d = v.device || "unknown";
    deviceCounts[d] = (deviceCounts[d] || 0) + 1;
  });
  const devices = Object.entries(deviceCounts).map(([device, count]) => ({ device, count }));

  // Countries
  const countriesData = await supabase.from("page_views").select("country").gte("created_at", monthAgo);
  const countryCounts: Record<string, number> = {};
  (countriesData.data || []).forEach((v: { country: string }) => {
    const c = v.country || "Unknown";
    countryCounts[c] = (countryCounts[c] || 0) + 1;
  });
  const countries = Object.entries(countryCounts).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([country, count]) => ({ country, count }));

  const viewsMonthCount = viewsMonth.count || 0;
  const viewsPrevCount = viewsPrev.count || 0;
  const trend = viewsPrevCount > 0 ? Math.round(((viewsMonthCount - viewsPrevCount) / viewsPrevCount) * 100) : 100;

  return NextResponse.json({
    viewsToday: views.count || 0,
    viewsMonth: viewsMonthCount,
    viewsTrend: trend,
    cvDownloads: cvTotal.count || 0,
    contactSubmissions: contactTotal.count || 0,
    applySubmissions: applyTotal.count || 0,
    totalSubmissions: (contactTotal.count || 0) + (applyTotal.count || 0),
    chatConversations: chatTotal.count || 0,
    unreadMessages: (unreadContact.count || 0) + (unreadApply.count || 0),
    last7Days: last7,
    recentContact: recentContact.data || [],
    recentApply: recentApply.data || [],
    topPages,
    devices,
    countries,
  });
}

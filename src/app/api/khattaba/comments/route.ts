import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { put, get } from "@vercel/blob";

/* تعليقات العميل على شاشات لوحة تصميم خطّابة.
 * تُخزَّن كملف JSON خاص (private) في Vercel Blob — الـ token
 * (BLOB_READ_WRITE_TOKEN) يُحقن تلقائياً عند ربط Blob store بالمشروع،
 * والقراءة تتم من السيرفر بالتوكن فلا يظهر الرابط للعميل إطلاقاً. */

const KEY = "khattaba-comments.json";

type KhComment = {
  id: string;
  screen_code: string;
  author: string | null;
  body: string;
  created_at: string;
};

async function readAll(): Promise<KhComment[]> {
  let res;
  try {
    res = await get(KEY, { access: "private", useCache: false });
  } catch (e) {
    // الملف غير موجود = قائمة فارغة؛ أي خطأ آخر (token مفقود) يُمرَّر للأعلى
    if (e instanceof Error && /not ?found|does not exist|404/i.test(`${e.name} ${e.message}`)) return [];
    throw e;
  }
  if (!res || !res.stream) return [];
  try {
    const text = await new Response(res.stream).text();
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeAll(all: KhComment[]) {
  await put(KEY, JSON.stringify(all), {
    access: "private",
    contentType: "application/json",
    allowOverwrite: true,
    addRandomSuffix: false,
  });
}

export async function GET(req: NextRequest) {
  const screen = req.nextUrl.searchParams.get("screen");
  try {
    const all = await readAll();
    const comments = screen ? all.filter((c) => c.screen_code === screen) : all;
    return NextResponse.json({ comments, ready: true });
  } catch {
    return NextResponse.json({ comments: [], ready: false });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { screen_code, author, body } = await req.json();
    if (!screen_code || typeof body !== "string" || !body.trim()) {
      return NextResponse.json({ error: "screen_code و body مطلوبان" }, { status: 400 });
    }
    const all = await readAll().catch(() => [] as KhComment[]);
    const comment: KhComment = {
      id: randomUUID(),
      screen_code: String(screen_code).slice(0, 40),
      author: (author && String(author).trim().slice(0, 80)) || null,
      body: body.trim().slice(0, 2000),
      created_at: new Date().toISOString(),
    };
    all.push(comment);
    await writeAll(all);
    return NextResponse.json({ comment });
  } catch {
    return NextResponse.json({ error: "تعذّر الحفظ — التخزين غير متاح بعد" }, { status: 503 });
  }
}

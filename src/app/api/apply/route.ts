import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { sendTikTokEvent } from "@/lib/tiktok";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "Ahmed Ali <hello@ahmedali.online>";
const TO_EMAIL = "ahmedali.stack@gmail.com";

function applicationEmail({
  name,
  whatsapp,
  portfolio,
  notes,
  urgent,
}: {
  name: string;
  whatsapp: string;
  portfolio: string;
  notes: string;
  urgent: boolean;
}) {
  return `
<!DOCTYPE html>
<html dir="rtl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 20px;">

    <!-- Logo -->
    <div style="text-align:center;margin-bottom:32px;">
      <span style="font-size:28px;font-weight:800;color:#fff;letter-spacing:-0.5px;">Ahmed</span><span style="font-size:28px;font-weight:800;color:#4FFFB0;">.</span>
    </div>

    <!-- Main Card -->
    <div style="background:#111;border-radius:24px;border:1px solid rgba(79,255,176,0.1);overflow:hidden;">

      <!-- Green accent bar -->
      <div style="height:3px;background:linear-gradient(90deg,#4FFFB0,rgba(79,255,176,0.2));"></div>

      <div style="padding:32px;">
        <!-- Badge -->
        <div style="margin-bottom:20px;">
          <span style="display:inline-block;background:rgba(79,255,176,0.1);color:#4FFFB0;font-size:11px;font-weight:700;padding:6px 14px;border-radius:999px;border:1px solid rgba(79,255,176,0.15);text-transform:uppercase;letter-spacing:1px;">طلب تقديم جديد</span>
        </div>

        <h1 style="margin:0 0 24px;font-size:22px;font-weight:700;color:#fff;">تقديم من ${name}</h1>

        <!-- Details -->
        <table cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-bottom:24px;">
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
              <span style="color:rgba(255,255,255,0.35);font-size:12px;font-weight:600;display:block;margin-bottom:4px;">الاسم</span>
              <span style="color:#fff;font-size:15px;font-weight:600;">${name}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
              <span style="color:rgba(255,255,255,0.35);font-size:12px;font-weight:600;display:block;margin-bottom:4px;">واتساب</span>
              <a href="https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}" style="color:#4FFFB0;font-size:15px;font-weight:600;text-decoration:none;">${whatsapp}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
              <span style="color:rgba(255,255,255,0.35);font-size:12px;font-weight:600;display:block;margin-bottom:4px;">ملف الأعمال</span>
              <a href="${portfolio}" style="color:#4FFFB0;font-size:14px;font-weight:600;text-decoration:none;word-break:break-all;">${portfolio}</a>
            </td>
          </tr>
          ${
            notes
              ? `<tr>
            <td style="padding:10px 0;">
              <span style="color:rgba(255,255,255,0.35);font-size:12px;font-weight:600;display:block;margin-bottom:4px;">ملاحظات إضافية</span>
              <div style="background:rgba(79,255,176,0.04);border:1px solid rgba(79,255,176,0.08);border-radius:12px;padding:16px;margin-top:8px;">
                <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.8);line-height:1.8;white-space:pre-wrap;">${notes}</p>
              </div>
            </td>
          </tr>`
              : ""
          }
        </table>

        ${urgent ? `
        <!-- Urgent badge -->
        <div style="margin-top:20px;padding:12px 16px;background:rgba(255,75,75,0.08);border:1px solid rgba(255,75,75,0.15);border-radius:12px;">
          <span style="color:#ff6b6b;font-size:13px;font-weight:700;">⚡ مستعجل — يحتاج تسليم خلال 5 أيام</span>
        </div>` : ""}

        <!-- WhatsApp CTA -->
        <div style="text-align:center;margin-top:24px;">
          <a href="https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}" style="display:inline-block;background:#4FFFB0;color:#0A0A0A;font-size:14px;font-weight:700;padding:14px 32px;border-radius:999px;text-decoration:none;border:2px solid #0A0A0A;">
            تواصل عبر واتساب
          </a>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center;margin-top:24px;">
      <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.2);">تم الإرسال من صفحة التقديم - ahmedali.online</p>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, whatsapp, portfolio, notes, urgent } = body;

    if (!name || !whatsapp) {
      return NextResponse.json(
        { error: "الاسم ورقم الواتساب مطلوبين." },
        { status: 400 }
      );
    }

    // Store in Supabase
    const supabase = createServiceClient();
    await supabase.from("apply_submissions").insert({ name, whatsapp, portfolio: portfolio || "", notes: notes || "", urgent: !!urgent });

    // TikTok Conversion
    sendTikTokEvent({
      event: "SubmitForm",
      context: { user_agent: req.headers.get("user-agent") || "", ip: req.headers.get("x-forwarded-for") || "" },
      properties: { content_name: "Application", content_type: urgent ? "urgent" : "standard" },
    });

    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `${urgent ? "⚡ مستعجل — " : ""}طلب تقديم جديد من ${name}`,
      html: applicationEmail({ name, whatsapp, portfolio: portfolio || "", notes: notes || "", urgent: !!urgent }),
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Apply API error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

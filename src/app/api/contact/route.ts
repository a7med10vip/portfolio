import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "Ahmed Ali <hello@ahmedali.online>";
const TO_EMAIL = "ahmedali.stack@gmail.com";

function notificationEmail({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return `
<!DOCTYPE html>
<html dir="ltr">
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
          <span style="display:inline-block;background:rgba(79,255,176,0.1);color:#4FFFB0;font-size:11px;font-weight:700;padding:6px 14px;border-radius:999px;border:1px solid rgba(79,255,176,0.15);text-transform:uppercase;letter-spacing:1px;">New Message</span>
        </div>

        <h1 style="margin:0 0 24px;font-size:22px;font-weight:700;color:#fff;">Message from ${name}</h1>

        <!-- Details -->
        <div style="margin-bottom:24px;">
          <div style="display:flex;margin-bottom:12px;">
            <span style="color:rgba(255,255,255,0.35);font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;min-width:80px;">From</span>
            <span style="color:#fff;font-size:14px;font-weight:600;">${name}</span>
          </div>
          <div style="display:flex;margin-bottom:12px;">
            <span style="color:rgba(255,255,255,0.35);font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;min-width:80px;">Email</span>
            <a href="mailto:${email}" style="color:#4FFFB0;font-size:14px;font-weight:600;text-decoration:none;">${email}</a>
          </div>
          <div style="display:flex;">
            <span style="color:rgba(255,255,255,0.35);font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;min-width:80px;">Subject</span>
            <span style="color:#fff;font-size:14px;">${subject || "No subject"}</span>
          </div>
        </div>

        <!-- Divider -->
        <div style="height:1px;background:rgba(255,255,255,0.06);margin:0 0 24px;"></div>

        <!-- Message -->
        <div style="background:rgba(79,255,176,0.04);border:1px solid rgba(79,255,176,0.08);border-radius:16px;padding:20px;">
          <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.8);line-height:1.8;white-space:pre-wrap;">${message}</p>
        </div>

        <!-- Reply CTA -->
        <div style="text-align:center;margin-top:28px;">
          <a href="mailto:${email}?subject=Re: ${subject || "Your message"}" style="display:inline-block;background:#4FFFB0;color:#0A0A0A;font-size:14px;font-weight:700;padding:14px 32px;border-radius:999px;text-decoration:none;border:2px solid #0A0A0A;">
            Reply to ${name}
          </a>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center;margin-top:24px;">
      <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.2);">Sent from ahmedali.online contact form</p>
    </div>
  </div>
</body>
</html>`;
}

function thankYouEmail({ name }: { name: string }) {
  return `
<!DOCTYPE html>
<html dir="ltr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 20px;">

    <!-- Logo -->
    <div style="text-align:center;margin-bottom:32px;">
      <span style="font-size:32px;font-weight:800;color:#fff;letter-spacing:-0.5px;">Ahmed</span><span style="font-size:32px;font-weight:800;color:#4FFFB0;">.</span>
    </div>

    <!-- Main Card -->
    <div style="background:#111;border-radius:24px;border:1px solid rgba(79,255,176,0.1);overflow:hidden;">

      <!-- Green accent bar -->
      <div style="height:3px;background:linear-gradient(90deg,#4FFFB0,rgba(79,255,176,0.2));"></div>

      <div style="padding:40px 32px;">

        <!-- Greeting -->
        <h1 style="margin:0 0 8px;font-size:26px;font-weight:700;color:#fff;">Hey ${name}!</h1>
        <p style="margin:0 0 28px;font-size:14px;color:#4FFFB0;font-weight:600;">Thanks for reaching out.</p>

        <p style="font-size:15px;color:rgba(255,255,255,0.65);line-height:1.8;margin:0 0 28px;">
          I've received your message and I'll get back to you within 24 hours. I take every inquiry seriously and look forward to learning more about what you're working on.
        </p>

        <!-- Divider -->
        <div style="height:1px;background:rgba(255,255,255,0.06);margin:0 0 28px;"></div>

        <!-- CTAs -->
        <div style="text-align:center;margin-bottom:28px;">
          <a href="https://ahmedali.online/#projects" style="display:inline-block;background:#4FFFB0;color:#0A0A0A;font-size:13px;font-weight:700;padding:13px 28px;border-radius:999px;text-decoration:none;border:2px solid #0A0A0A;margin:0 4px 8px;">View My Work</a>
          <a href="https://linkedin.com/in/ahmed-alli" style="display:inline-block;background:transparent;color:#fff;font-size:13px;font-weight:700;padding:13px 28px;border-radius:999px;text-decoration:none;border:2px solid rgba(255,255,255,0.15);margin:0 4px 8px;">LinkedIn</a>
          <a href="https://wa.me/201011648156" style="display:inline-block;background:transparent;color:#fff;font-size:13px;font-weight:700;padding:13px 28px;border-radius:999px;text-decoration:none;border:2px solid rgba(255,255,255,0.15);margin:0 4px 8px;">WhatsApp</a>
        </div>

        <!-- Divider -->
        <div style="height:1px;background:rgba(255,255,255,0.06);margin:0 0 28px;"></div>

        <!-- Services -->
        <p style="font-size:10px;font-weight:700;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:1.5px;margin:0 0 12px;">What I Do</p>
        <div>
          ${["Performance Marketing", "SEO & Growth", "Web & Mobile Dev", "AI Integration", "Data Analytics", "Digital Strategy"]
            .map(
              (s) =>
                `<span style="display:inline-block;background:rgba(79,255,176,0.08);color:#4FFFB0;font-size:11px;font-weight:600;padding:6px 14px;border-radius:999px;border:1px solid rgba(79,255,176,0.12);margin:0 4px 6px 0;">${s}</span>`
            )
            .join("")}
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center;margin-top:28px;">
      <p style="margin:0 0 6px;font-size:13px;color:rgba(255,255,255,0.4);">Ahmed Ali</p>
      <p style="margin:0 0 14px;font-size:12px;color:rgba(255,255,255,0.2);">Cairo, Egypt | hello@ahmedali.online</p>
      <div>
        <a href="https://ahmedali.online" style="color:#4FFFB0;font-size:11px;font-weight:600;text-decoration:none;margin:0 8px;">ahmedali.online</a>
        <a href="https://linkedin.com/in/ahmed-alli" style="color:rgba(255,255,255,0.3);font-size:11px;font-weight:600;text-decoration:none;margin:0 8px;">LinkedIn</a>
        <a href="https://wa.me/201011648156" style="color:rgba(255,255,255,0.3);font-size:11px;font-weight:600;text-decoration:none;margin:0 8px;">WhatsApp</a>
      </div>
      <p style="margin:16px 0 0;font-size:10px;color:rgba(255,255,255,0.12);">&copy; ${new Date().getFullYear()} Ahmed Ali. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Send both emails and log errors separately
    const [notifResult, thankResult] = await Promise.allSettled([
      resend.emails.send({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject: `New message from ${name}: ${subject || "No subject"}`,
        replyTo: email,
        html: notificationEmail({ name, email, subject, message }),
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: `Hey ${name}, thanks for reaching out!`,
        html: thankYouEmail({ name }),
      }),
    ]);

    if (notifResult.status === "rejected") {
      console.error("Notification email failed:", notifResult.reason);
    }
    if (thankResult.status === "rejected") {
      console.error("Thank-you email failed:", thankResult.reason);
    }

    // As long as at least one succeeded
    if (notifResult.status === "fulfilled" || thankResult.status === "fulfilled") {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Both emails failed to send" }, { status: 500 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Contact API error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

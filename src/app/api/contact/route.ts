import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "Ahmed Ali <hello@ahmedali.online>";
const TO_EMAIL = "hello@ahmedali.online";

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
<body style="margin:0;padding:0;background:#f4f4f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:#0A0A0A;padding:32px 40px;text-align:center;">
      <h1 style="margin:0;font-size:24px;font-weight:800;color:#fff;letter-spacing:-0.5px;">
        Ahmed<span style="color:#4FFFB0;">.</span>
      </h1>
      <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.5);">New Contact Form Submission</p>
    </div>

    <!-- Body -->
    <div style="padding:32px 40px;">
      <p style="font-size:15px;color:#333;margin:0 0 24px;line-height:1.6;">
        You received a new message from your portfolio contact form.
      </p>

      <!-- Details -->
      <div style="background:#f9f9f9;border-radius:12px;padding:24px;margin-bottom:24px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:8px 0;font-size:12px;font-weight:700;color:#999;text-transform:uppercase;letter-spacing:1px;width:100px;vertical-align:top;">Name</td>
            <td style="padding:8px 0;font-size:15px;color:#0A0A0A;font-weight:600;">${name}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:12px;font-weight:700;color:#999;text-transform:uppercase;letter-spacing:1px;vertical-align:top;">Email</td>
            <td style="padding:8px 0;font-size:15px;color:#0A0A0A;">
              <a href="mailto:${email}" style="color:#0A0A0A;text-decoration:none;border-bottom:1px solid #4FFFB0;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:12px;font-weight:700;color:#999;text-transform:uppercase;letter-spacing:1px;vertical-align:top;">Subject</td>
            <td style="padding:8px 0;font-size:15px;color:#0A0A0A;font-weight:600;">${subject || "No subject"}</td>
          </tr>
        </table>
      </div>

      <!-- Message -->
      <div style="margin-bottom:24px;">
        <p style="font-size:12px;font-weight:700;color:#999;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Message</p>
        <div style="background:#f9f9f9;border-radius:12px;padding:20px;border-left:3px solid #4FFFB0;">
          <p style="font-size:15px;color:#333;margin:0;line-height:1.7;white-space:pre-wrap;">${message}</p>
        </div>
      </div>

      <!-- Quick reply -->
      <div style="text-align:center;padding-top:8px;">
        <a href="mailto:${email}?subject=Re: ${subject || "Your message"}" style="display:inline-block;background:#4FFFB0;color:#0A0A0A;font-size:14px;font-weight:700;padding:14px 32px;border-radius:999px;text-decoration:none;">
          Reply to ${name}
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#0A0A0A;padding:20px 40px;text-align:center;">
      <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.35);">
        Sent from ahmedali.online contact form
      </p>
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
<body style="margin:0;padding:0;background:#f4f4f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:#0A0A0A;padding:40px;text-align:center;">
      <h1 style="margin:0 0 12px;font-size:28px;font-weight:800;color:#fff;letter-spacing:-0.5px;">
        Ahmed<span style="color:#4FFFB0;">.</span>
      </h1>
      <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.6);">Full-Stack Digital Strategist</p>
    </div>

    <!-- Body -->
    <div style="padding:40px;">
      <h2 style="margin:0 0 16px;font-size:22px;color:#0A0A0A;font-weight:700;">
        Thanks for reaching out, ${name}!
      </h2>
      <p style="font-size:15px;color:#555;line-height:1.7;margin:0 0 24px;">
        I've received your message and I'll review it carefully. You can expect to hear back from me within 24 hours.
      </p>
      <p style="font-size:15px;color:#555;line-height:1.7;margin:0 0 32px;">
        In the meantime, feel free to check out my recent work or connect with me on LinkedIn.
      </p>

      <!-- CTA buttons -->
      <div style="text-align:center;margin-bottom:32px;">
        <a href="https://ahmedali.online/#projects" style="display:inline-block;background:#4FFFB0;color:#0A0A0A;font-size:14px;font-weight:700;padding:14px 28px;border-radius:999px;text-decoration:none;margin:0 6px 8px;">
          View My Work
        </a>
        <a href="https://linkedin.com/in/ahmed-alli" style="display:inline-block;background:#0A0A0A;color:#fff;font-size:14px;font-weight:700;padding:14px 28px;border-radius:999px;text-decoration:none;margin:0 6px 8px;">
          Connect on LinkedIn
        </a>
      </div>

      <!-- Divider -->
      <div style="height:1px;background:#eee;margin:0 0 24px;"></div>

      <!-- Services -->
      <p style="font-size:11px;font-weight:700;color:#999;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 12px;">What I do</p>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:24px;">
        ${["Performance Marketing", "SEO & Growth", "Web & Mobile Dev", "AI Integration", "Data Analytics", "Digital Strategy"]
          .map(
            (s) =>
              `<span style="display:inline-block;background:#0A0A0A;color:#4FFFB0;font-size:11px;font-weight:600;padding:6px 14px;border-radius:999px;margin:0 4px 4px 0;">${s}</span>`
          )
          .join("")}
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#0A0A0A;padding:28px 40px;text-align:center;">
      <p style="margin:0 0 8px;font-size:13px;color:rgba(255,255,255,0.6);">
        Ahmed Ali | Cairo, Egypt
      </p>
      <p style="margin:0 0 16px;font-size:12px;color:rgba(255,255,255,0.35);">
        hello@ahmedali.online | +20 101 164 8156
      </p>
      <div style="margin-bottom:12px;">
        <a href="https://ahmedali.online" style="color:#4FFFB0;font-size:12px;font-weight:600;text-decoration:none;">ahmedali.online</a>
        <span style="color:rgba(255,255,255,0.2);margin:0 8px;">|</span>
        <a href="https://linkedin.com/in/ahmed-alli" style="color:#4FFFB0;font-size:12px;font-weight:600;text-decoration:none;">LinkedIn</a>
        <span style="color:rgba(255,255,255,0.2);margin:0 8px;">|</span>
        <a href="https://wa.me/201011648156" style="color:#4FFFB0;font-size:12px;font-weight:600;text-decoration:none;">WhatsApp</a>
      </div>
      <p style="margin:0;font-size:10px;color:rgba(255,255,255,0.2);">
        &copy; ${new Date().getFullYear()} Ahmed Ali. All rights reserved.
      </p>
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

    // Send notification to Ahmed
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `New message from ${name}: ${subject || "No subject"}`,
      replyTo: email,
      html: notificationEmail({ name, email, subject, message }),
    });

    // Send thank-you to the sender
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Thanks for reaching out, " + name + "!",
      html: thankYouEmail({ name }),
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Contact API error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

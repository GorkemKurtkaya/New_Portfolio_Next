export const runtime = "nodejs";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const htmlTemplate = `
<div style="font-family: Arial, sans-serif; max-width: 960px; margin: auto; padding: 0; background-color: #f6fbff;">
  <div style="background: linear-gradient(90deg,#06b6d4,#42e2ff); color: #003744; padding: 14px 20px;">
    <div style="font-size:18px; font-weight:800; letter-spacing:0.4px;">New Message</div>
    <div style="font-size:12px; opacity:.85;">via Portfolio Contact Form</div>
  </div>

  <div style="padding: 20px 20px 8px 20px;">
    <div style="display:flex; gap:12px; flex-wrap:wrap;">
      <div style="flex:1 1 280px; min-width:260px; border:1px solid #d7eef6; background:#ffffff; border-radius:8px; padding:12px;">
        <div style="font-size:12px; color:#0ea5b7; font-weight:700; text-transform:uppercase;">Gönderen</div>
        <div style="font-size:16px; color:#0f172a; font-weight:600; margin-top:4px;">${name}</div>
        <a href="mailto:${email}" style="font-size:13px; color:#0ea5b7; text-decoration:none; margin-top:2px; display:inline-block;">${email}</a>
      </div>

      <div style="flex:2 1 320px; min-width:280px; border:1px solid #d7eef6; background:#ffffff; border-radius:8px; padding:12px;">
        <div style="font-size:12px; color:#0ea5b7; font-weight:700; text-transform:uppercase;">Konu</div>
        <div style="font-size:16px; color:#0f172a; font-weight:600; margin-top:4px;">${subject}</div>
        <div style="margin-top:8px;">
          <span style="display:inline-block; font-size:12px; color:#05566b; background:rgba(6,182,212,0.12); border:1px solid rgba(6,182,212,0.35); padding:5px 10px; border-radius:999px;">Tema: Genel</span>
        </div>
      </div>
    </div>
  </div>

  <div style="padding: 0 20px 20px 20px;">
    <div style="background:#ffffff; border:1px solid #d7eef6; border-radius:8px; padding:16px;">
      <div style="font-size:12px; color:#0ea5b7; font-weight:700; text-transform:uppercase;">Mesaj</div>
      <div style="font-size:15px; color:#0f172a; line-height:1.6; margin-top:6px; white-space:pre-wrap;">${message}</div>
    </div>
    <div style="text-align:center; color:#64748b; font-size:12px; margin-top:12px;">Thank you for using our service!</div>
  </div>
</div>
`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL,
        pass: process.env.NEXT_PUBLIC_PASSWORD,
      },
    });

    await transporter.sendMail({
      to: process.env.NEXT_PUBLIC_EMAIL,
      from: process.env.NEXT_PUBLIC_EMAIL,
      replyTo: email,
      subject: `Mail From ${email}`,
      html: htmlTemplate,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    console.error("/api/contact error", error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
}



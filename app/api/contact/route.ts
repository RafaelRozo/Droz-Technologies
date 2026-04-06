import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "ricardorozo@droztechnologies.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    // 1. Send lead notification to Droz
    await resend.emails.send({
      from: "Droz Website <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      subject: `New Lead: ${name}${company ? ` from ${company}` : ""}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0a0a0a; padding: 32px; border-radius: 12px;">
            <h1 style="color: #fff; font-size: 24px; margin: 0 0 24px;">New Lead from droztechnologies.com</h1>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888; font-size: 13px; width: 120px;">Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #fff; font-size: 15px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888; font-size: 13px;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #fff; font-size: 15px;">
                  <a href="mailto:${email}" style="color: #3B82A0; text-decoration: none;">${email}</a>
                </td>
              </tr>
              ${company ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888; font-size: 13px;">Company</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #fff; font-size: 15px;">${company}</td>
              </tr>` : ""}
              <tr>
                <td style="padding: 12px 0; color: #888; font-size: 13px; vertical-align: top;">Message</td>
                <td style="padding: 12px 0; color: #fff; font-size: 15px; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</td>
              </tr>
            </table>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #222;">
              <p style="color: #666; font-size: 12px; margin: 0;">
                Submitted at ${new Date().toLocaleString("en-CA", { timeZone: "America/Toronto" })} ET
              </p>
              <a href="mailto:${email}" style="display: inline-block; margin-top: 12px; padding: 10px 24px; background: #fff; color: #0a0a0a; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                Reply to ${name.split(" ")[0]}
              </a>
            </div>
          </div>
        </div>
      `,
    });

    // 2. Send personalized auto-reply to the lead
    const firstName = name.split(" ")[0];
    await resend.emails.send({
      from: "Droz Technologies <onboarding@resend.dev>",
      to: email,
      subject: `${firstName}, we received your message — an engineer will follow up`,
      html: `
        <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; color: #222;">
          <div style="padding: 40px 32px;">
            <h1 style="font-size: 28px; font-weight: 400; font-style: italic; margin: 0 0 24px; color: #0a0a0a;">
              Hi ${firstName},
            </h1>

            <p style="font-size: 16px; line-height: 1.7; color: #444; margin: 0 0 16px;">
              Thank you for reaching out to Droz Technologies. We received your message and an engineer from our team will personally follow up within 24 hours.
            </p>

            <p style="font-size: 16px; line-height: 1.7; color: #444; margin: 0 0 16px;">
              Not a sales rep — an actual engineer who understands your industry.
            </p>

            ${company ? `
            <p style="font-size: 16px; line-height: 1.7; color: #444; margin: 0 0 16px;">
              We'll take a look at what ${company} needs and come prepared with relevant experience from our work across five specialized divisions.
            </p>` : ""}

            <div style="background: #f8f8f8; border-radius: 12px; padding: 24px; margin: 32px 0;">
              <p style="font-size: 14px; color: #666; margin: 0 0 8px; font-family: Arial, sans-serif; text-transform: uppercase; letter-spacing: 0.1em;">
                What you told us
              </p>
              <p style="font-size: 15px; line-height: 1.6; color: #333; margin: 0; font-style: italic;">
                "${message.length > 200 ? message.substring(0, 200) + "..." : message}"
              </p>
            </div>

            <p style="font-size: 16px; line-height: 1.7; color: #444; margin: 0 0 24px;">
              In the meantime, you might find these useful:
            </p>

            <div style="margin: 0 0 32px;">
              <a href="https://droztechnologies.com/divisions/predictive-maintenance" style="display: block; padding: 8px 0; color: #3B82A0; text-decoration: none; font-size: 15px;">→ Predictive Maintenance Services</a>
              <a href="https://droztechnologies.com/divisions/software-development" style="display: block; padding: 8px 0; color: #6366A0; text-decoration: none; font-size: 15px;">→ Software Development</a>
              <a href="https://droztechnologies.com/divisions/intelligent-construction" style="display: block; padding: 8px 0; color: #A08B3B; text-decoration: none; font-size: 15px;">→ Smart Construction</a>
              <a href="https://droztechnologies.com/divisions/industrial-manufacturing" style="display: block; padding: 8px 0; color: #7C8B3B; text-decoration: none; font-size: 15px;">→ Industrial Manufacturing</a>
              <a href="https://droztechnologies.com/divisions/ai-consulting" style="display: block; padding: 8px 0; color: #A03B6E; text-decoration: none; font-size: 15px;">→ AI Consulting</a>
            </div>

            <div style="border-top: 1px solid #eee; padding-top: 24px;">
              <p style="font-size: 14px; color: #888; margin: 0 0 4px; font-family: Arial, sans-serif;">
                Droz Technologies Inc.
              </p>
              <p style="font-size: 13px; color: #aaa; margin: 0; font-family: Arial, sans-serif;">
                Burlington, Ontario, Canada<br>
                ricardorozo@droztechnologies.com
              </p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or email us directly." },
      { status: 500 },
    );
  }
}

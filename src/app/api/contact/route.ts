import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Server-side validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    if (!resend) {
      return NextResponse.json(
        { error: 'Server configuration error: RESEND_API_KEY is missing.' },
        { status: 500 }
      );
    }

    // Basic sanitization
    const sanitizedName = String(name).trim().slice(0, 100);
    const sanitizedEmail = String(email).trim().slice(0, 100);
    const sanitizedSubject = String(subject).trim().slice(0, 150);
    const sanitizedMessage = String(message).trim().slice(0, 3000);

    // Send email via Resend
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Resend's default testing domain. In production, verified domain should be used.
      to: 'prateekmmishra0412@gmail.com',
      subject: `New Portfolio Message: ${sanitizedSubject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #333;">New Contact Message from Portfolio</h2>
          <p style="margin-bottom: 5px;"><strong>Name:</strong> ${sanitizedName}</p>
          <p style="margin-bottom: 5px;"><strong>Email:</strong> ${sanitizedEmail}</p>
          <p style="margin-bottom: 20px;"><strong>Subject:</strong> ${sanitizedSubject}</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <p style="margin-bottom: 10px;"><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; color: #555; line-height: 1.5;">${sanitizedMessage}</p>
        </div>
      `,
    });

    if (data.error) {
      return NextResponse.json(
        { error: data.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Contact form API error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}

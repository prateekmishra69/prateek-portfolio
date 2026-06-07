import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    console.log('[Contact API] Request received');

    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    console.log('[Contact API] API Key Exists:', !!apiKey);

    if (!apiKey) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY is missing.' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['prateekmishra0412@gmail.com'],
      subject: `Portfolio Contact: ${subject}`,
      replyTo: email,
      text: `
Name: ${name}

Email: ${email}

Subject: ${subject}

Message:
${message}
      `,
    });

    console.log('[Contact API] Full Resend Response:', result);

    if (result.error) {
      console.error('[Contact API] Resend Error:', result.error);

      return NextResponse.json(
        {
          error: result.error.message || 'Resend failed',
          details: result.error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: result.data?.id,
    });
  } catch (err) {
    console.error('[Contact API] Fatal Error:', err);

    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : 'Unknown server error',
      },
      { status: 500 }
    );
  }
}
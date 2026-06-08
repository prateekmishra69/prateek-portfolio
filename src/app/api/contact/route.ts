import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    console.log('[Contact API] Request received');
    
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Server-side validation
    if (!name || !email || !subject || !message) {
      console.error('[Contact API] Validation failed: Missing fields');
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      console.error('[Contact API] Validation failed: Invalid email format');
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      console.error('[Contact API] Server configuration error: EMAIL_USER or EMAIL_PASS is missing');
      return NextResponse.json(
        { error: 'Server configuration error: Email credentials missing.' },
        { status: 500 }
      );
    }

    // Configure Nodemailer transporter for Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    console.log('[Contact API] Attempting to send email via Nodemailer...');
    
    // Send email
    const info = await transporter.sendMail({
      from: `"${name} (Portfolio)" <${emailUser}>`,
      replyTo: email,
      to: 'prateekmishra0412@gmail.com',
      subject: 'New Portfolio Contact Message',
      text: `Name:\n${name}\n\nEmail:\n${email}\n\nSubject:\n${subject}\n\nMessage:\n${message}`,
    });

    console.log('[Contact API] Email sent successfully:', info.messageId);
    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    console.error('[Contact API] Uncaught server error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send message.' },
      { status: 500 }
    );
  }
}
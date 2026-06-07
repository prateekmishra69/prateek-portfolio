import { Resend } from 'resend';

// Initialize Resend with the API key from environment variables
// It will gracefully fail if the key is missing until the user adds it
export const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

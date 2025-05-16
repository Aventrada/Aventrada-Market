import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    resendApiKey: !!process.env.RESEND_API_KEY,
    emailApiKey: !!process.env.EMAIL_API_KEY,
    gmailEmail: !!process.env.GMAIL_EMAIL,
    gmailAppPassword: !!process.env.GMAIL_APP_PASSWORD,
  })
}

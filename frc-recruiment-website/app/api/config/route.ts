import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    teamMode: process.env.TEAM_MODE === "true",
    registrationDeadline: process.env.REGISTRATION_DEADLINE || process.env.NEXT_PUBLIC_REGISTRATION_DEADLINE,
    clubName: process.env.CLUB_NAME || process.env.NEXT_PUBLIC_CLUB_NAME,
    hcaptchaSiteKey: process.env.HCAPTCHA_SITE_KEY || process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY,
  })
}


import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get("authorization")
    const token = authHeader?.replace("Bearer ", "")
    if (token !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const submissionId = searchParams.get("id")
    const refCode = searchParams.get("refCode")

    if (!submissionId && !refCode) {
      return NextResponse.json(
        { error: "Missing id or refCode parameter" },
        { status: 400 }
      )
    }

    const where: any = submissionId 
      ? { id: submissionId }
      : { refCode: refCode }

    const submission = await prisma.submission.findFirst({
      where,
      include: {
        applicants: {
          orderBy: { isLeader: "desc" },
        },
        team: true,
      },
    })

    if (!submission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ submission })
  } catch (error: any) {
    console.error("Admin detail error:", error)
    return NextResponse.json(
      { error: error.message || "Đã xảy ra lỗi" },
      { status: 500 }
    )
  }
}

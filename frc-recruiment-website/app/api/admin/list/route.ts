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
    const query = searchParams.get("query") || ""
    const page = parseInt(searchParams.get("page") || "1")
    const pageSize = parseInt(searchParams.get("pageSize") || "20")

    // SQLite doesn't support case-insensitive search directly
    // For production with Postgres, use mode: "insensitive"
    const where: any = query
      ? {
          OR: [
            { refCode: { contains: query } },
            {
              applicants: {
                some: {
                  OR: [
                    { fullName: { contains: query } },
                    { email: { contains: query } },
                    { school: { contains: query } },
                  ],
                },
              },
            },
            ...(process.env.DATABASE_URL?.startsWith("postgres")
              ? [{ team: { teamName: { contains: query, mode: "insensitive" } } }]
              : [{ team: { teamName: { contains: query } } }]),
          ],
        }
      : {}

    const [submissions, total] = await Promise.all([
      prisma.submission.findMany({
        where,
        select: {
          id: true,
          refCode: true,
          mode: true,
          createdAt: true,
          applicants: {
            select: {
              id: true,
              fullName: true,
              email: true,
              phone: true,
              school: true,
              major: true,
              studentIdMajor: true,
              isLeader: true,
            },
            orderBy: { isLeader: "desc" },
          },
          team: {
            select: {
              teamName: true,
            },
          },
          surveySource: true,
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.submission.count({ where }),
    ])

    return NextResponse.json({
      submissions,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    })
  } catch (error: any) {
    console.error("Admin list error:", error)
    return NextResponse.json(
      { error: error.message || "Đã xảy ra lỗi" },
      { status: 500 }
    )
  }
}


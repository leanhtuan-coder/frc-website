import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { individualFormSchema, teamFormSchema } from "@/lib/schema"
import { generateRefCode, hashIp, stripHtml } from "@/lib/utils"
import { checkRateLimit } from "@/lib/rate-limit"
import { sendConfirmationEmail } from "@/lib/mailer"
import axios from "axios"

export async function POST(request: NextRequest) {
  try {
    // Check DATABASE_URL first
    if (!process.env.DATABASE_URL) {
      console.error("❌ DATABASE_URL is not set")
      return NextResponse.json(
        { error: "Cấu hình server chưa đúng. Vui lòng liên hệ quản trị viên." },
        { status: 500 }
      )
    }

    // Check deadline
    const deadline = new Date(process.env.REGISTRATION_DEADLINE || "2025-12-31T17:00:00+07:00")
    if (new Date() > deadline) {
      return NextResponse.json(
        { error: "Đã hết hạn đăng ký" },
        { status: 400 }
      )
    }

    // Rate limiting (disabled in development)
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    const ipHash = hashIp(ip)
    
    if (process.env.NODE_ENV === "production") {
      const rateLimit = checkRateLimit(ipHash)
      if (!rateLimit.allowed) {
        return NextResponse.json(
          { error: "Quá nhiều yêu cầu. Vui lòng thử lại sau." },
          { status: 429 }
        )
      }
    }

    let body
    try {
      body = await request.json()
    } catch (error) {
      console.error("Failed to parse request body:", error)
      return NextResponse.json(
        { error: "Dữ liệu không hợp lệ" },
        { status: 400 }
      )
    }

    const userAgent = request.headers.get("user-agent") || ""

    // Validate with Zod
    let validatedData
    try {
      if (body.mode === "TEAM") {
        validatedData = teamFormSchema.parse(body)
      } else {
        validatedData = individualFormSchema.parse(body)
      }
    } catch (error: any) {
      console.error("Validation error:", error)
      if (error.name === "ZodError") {
        return NextResponse.json(
          { error: "Dữ liệu không hợp lệ", details: error.errors },
          { status: 400 }
        )
      }
      throw error
    }

    // Verify hCaptcha (skip if not configured for development)
    if (process.env.HCAPTCHA_SECRET && validatedData.captchaToken && validatedData.captchaToken !== "dev-bypass") {
      try {
        const captchaResponse = await axios.post(
          "https://hcaptcha.com/siteverify",
          new URLSearchParams({
            secret: process.env.HCAPTCHA_SECRET,
            response: validatedData.captchaToken,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )

        if (!captchaResponse.data.success) {
          return NextResponse.json(
            { error: "Xác minh không thành công. Vui lòng thử lại." },
            { status: 400 }
          )
        }
      } catch (error) {
        console.error("Captcha verification error:", error)
        // Allow bypass in development if captcha fails
        if (process.env.NODE_ENV === "production") {
          return NextResponse.json(
            { error: "Lỗi xác minh. Vui lòng thử lại." },
            { status: 500 }
          )
        }
      }
    }

    // Generate ref code
    let refCode = generateRefCode()
    try {
      let exists = await prisma.submission.findUnique({ where: { refCode } })
      let attempts = 0
      while (exists && attempts < 10) {
        refCode = generateRefCode()
        exists = await prisma.submission.findUnique({ where: { refCode } })
        attempts++
      }
    } catch (dbError: any) {
      console.error("Database error when generating ref code:", dbError)
      if (dbError.message?.includes("DATABASE_URL") || dbError.message?.includes("Environment variable")) {
        return NextResponse.json(
          { error: "Lỗi cấu hình database. Vui lòng liên hệ quản trị viên." },
          { status: 500 }
        )
      }
      throw dbError
    }

    // Create submission
    if (validatedData.mode === "INDIVIDUAL") {
      const dob = new Date(
        parseInt(validatedData.dob.year),
        parseInt(validatedData.dob.month) - 1,
        parseInt(validatedData.dob.day)
      )

      let submission
      try {
        submission = await prisma.submission.create({
          data: {
            refCode,
            mode: "INDIVIDUAL",
            consentTruth: validatedData.consentTruth,
            consentRules: validatedData.consentRules,
            consentData: validatedData.consentData,
            surveySource: validatedData.surveySource,
            // New fields
            preferredDepartment1: validatedData.preferredDepartment1 || null,
            preferredDepartment2: validatedData.preferredDepartment2 || null,
            timePerWeek: validatedData.timePerWeek || null,
            expectations: validatedData.expectations ? stripHtml(validatedData.expectations) : null,
            commitmentLevel: validatedData.commitmentLevel || null,
            // Department-specific fields
            techExperience: validatedData.techExperience ? stripHtml(validatedData.techExperience) : null,
            techSkills: validatedData.techSkills ? stripHtml(validatedData.techSkills) : null,
            techProjects: validatedData.techProjects ? stripHtml(validatedData.techProjects) : null,
            techExpectations: validatedData.techExpectations ? stripHtml(validatedData.techExpectations) : null,
            commExperience: validatedData.commExperience ? stripHtml(validatedData.commExperience) : null,
            commSkills: validatedData.commSkills ? stripHtml(validatedData.commSkills) : null,
            commPortfolio: validatedData.commPortfolio ? stripHtml(validatedData.commPortfolio) : null,
            commExpectations: validatedData.commExpectations ? stripHtml(validatedData.commExpectations) : null,
            financeExperience: validatedData.financeExperience ? stripHtml(validatedData.financeExperience) : null,
            financeSkills: validatedData.financeSkills ? stripHtml(validatedData.financeSkills) : null,
            financeExpectations: validatedData.financeExpectations ? stripHtml(validatedData.financeExpectations) : null,
            eventExperience: validatedData.eventExperience ? stripHtml(validatedData.eventExperience) : null,
            eventSkills: validatedData.eventSkills ? stripHtml(validatedData.eventSkills) : null,
            eventExpectations: validatedData.eventExpectations ? stripHtml(validatedData.eventExpectations) : null,
            metaIpHash: ipHash,
            metaUA: userAgent,
            applicants: {
              create: {
                isLeader: true,
                fullName: stripHtml(validatedData.fullName),
                dob,
                email: validatedData.email.toLowerCase(),
                phone: validatedData.phone,
                gender: validatedData.gender || null,
                studentIdMajor: validatedData.studentIdMajor ? stripHtml(validatedData.studentIdMajor) : null,
                school: null, // Legacy field, not used in new form
                major: null, // Legacy field, not used in new form
                facebook: validatedData.facebook ? stripHtml(validatedData.facebook) : null,
                reason: validatedData.reason ? stripHtml(validatedData.reason) : null,
              },
            },
          },
        })
        console.log("Submission created successfully:", refCode)
      } catch (dbError: any) {
        console.error("Database error when creating submission:", dbError)
        if (dbError.message?.includes("DATABASE_URL") || dbError.message?.includes("Environment variable")) {
          return NextResponse.json(
            { error: "Lỗi cấu hình database. Vui lòng liên hệ quản trị viên." },
            { status: 500 }
          )
        }
        return NextResponse.json(
          { error: `Lỗi database: ${dbError.message || "Không thể lưu dữ liệu"}` },
          { status: 500 }
        )
      }

      // Send email (non-blocking)
      sendConfirmationEmail(
        validatedData.email,
        refCode,
        validatedData.fullName,
        process.env.CLUB_NAME || "FPTU Robotics Club (FRC)"
      ).catch((emailError) => {
        console.error("Email sending error (non-critical):", emailError)
      })

      return NextResponse.json({ refCode })
    } else {
      // TEAM mode
      const member1Dob = new Date(
        parseInt(validatedData.member1.dob.year),
        parseInt(validatedData.member1.dob.month) - 1,
        parseInt(validatedData.member1.dob.day)
      )
      const member2Dob = new Date(
        parseInt(validatedData.member2.dob.year),
        parseInt(validatedData.member2.dob.month) - 1,
        parseInt(validatedData.member2.dob.day)
      )
      const member3Dob = validatedData.member3
        ? new Date(
            parseInt(validatedData.member3.dob.year),
            parseInt(validatedData.member3.dob.month) - 1,
            parseInt(validatedData.member3.dob.day)
          )
        : null

      let submission
      try {
        submission = await prisma.submission.create({
          data: {
            refCode,
            mode: "TEAM",
            consentTruth: validatedData.consentTruth,
            consentRules: validatedData.consentRules,
            consentData: validatedData.consentData,
            surveySource: validatedData.surveySource,
            surveySkills: JSON.stringify(validatedData.surveySkills),
            surveyTimeSlots: JSON.stringify(validatedData.surveyTimeSlots),
            notes: validatedData.notes ? stripHtml(validatedData.notes) : null,
            metaIpHash: ipHash,
            metaUA: userAgent,
            team: {
              create: {
                teamName: stripHtml(validatedData.teamName),
              },
            },
            applicants: {
              createMany: {
                data: [
                  {
                    isLeader: true,
                    fullName: stripHtml(validatedData.member1.fullName),
                    dob: member1Dob,
                    email: validatedData.member1.email.toLowerCase(),
                    phone: validatedData.member1.phone,
                    school: stripHtml(validatedData.member1.school),
                    major: stripHtml(validatedData.member1.major),
                    facebook: validatedData.member1.facebook ? stripHtml(validatedData.member1.facebook) : null,
                  },
                  {
                    isLeader: false,
                    fullName: stripHtml(validatedData.member2.fullName),
                    dob: member2Dob,
                    email: validatedData.member2.email.toLowerCase(),
                    phone: validatedData.member2.phone,
                    school: stripHtml(validatedData.member2.school),
                    major: stripHtml(validatedData.member2.major),
                    facebook: validatedData.member2.facebook ? stripHtml(validatedData.member2.facebook) : null,
                  },
                  ...(validatedData.member3 && validatedData.member3.fullName
                    ? [
                        {
                          isLeader: false,
                          fullName: stripHtml(validatedData.member3.fullName),
                          dob: member3Dob!,
                          email: validatedData.member3.email.toLowerCase(),
                          phone: validatedData.member3.phone,
                          school: stripHtml(validatedData.member3.school),
                          major: stripHtml(validatedData.member3.major),
                          facebook: validatedData.member3.facebook ? stripHtml(validatedData.member3.facebook) : null,
                        },
                      ]
                    : []),
                ],
              },
            },
          },
        })
        console.log("✅ Team submission created successfully:", refCode)
      } catch (dbError: any) {
        console.error("❌ Database error when creating team submission:", dbError)
        if (dbError.message?.includes("DATABASE_URL") || dbError.message?.includes("Environment variable")) {
          return NextResponse.json(
            { error: "Lỗi cấu hình database. Vui lòng liên hệ quản trị viên." },
            { status: 500 }
          )
        }
        return NextResponse.json(
          { error: `Lỗi database: ${dbError.message || "Không thể lưu dữ liệu"}` },
          { status: 500 }
        )
      }

      // Send email (non-blocking)
      sendConfirmationEmail(
        validatedData.member1.email,
        refCode,
        validatedData.member1.fullName,
        process.env.CLUB_NAME || "FPTU Robotics Club (FRC)"
      ).catch((emailError) => {
        console.error("Email sending error (non-critical):", emailError)
      })

      return NextResponse.json({ refCode })
    }
  } catch (error: any) {
    console.error("Registration error:", error)
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Dữ liệu không hợp lệ", details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: error.message || "Đã xảy ra lỗi khi đăng ký" },
      { status: 500 }
    )
  }
}


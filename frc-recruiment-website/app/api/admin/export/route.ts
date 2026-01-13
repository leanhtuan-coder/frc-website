import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import * as XLSX from "xlsx"

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

    const submissions = await prisma.submission.findMany({
      include: {
        applicants: true,
        team: true,
      },
      orderBy: { createdAt: "desc" },
    })

    // Prepare data for Excel
    const rows = submissions.flatMap((submission) =>
      submission.applicants.map((applicant) => ({
        "Mã đăng ký": submission.refCode,
        "Ngày đăng ký": new Date(submission.createdAt).toLocaleString("vi-VN"),
        "Tên đội": submission.team?.teamName || "",
        "Họ và tên": applicant.fullName,
        "Email": applicant.email,
        "Số điện thoại": applicant.phone,
        "Ngày sinh": new Date(applicant.dob).toLocaleDateString("vi-VN"),
        "Giới tính": applicant.gender || "",
        "Mã số sinh viên - Chuyên ngành": applicant.studentIdMajor || "",
        "Trường": applicant.school || "",
        "Chuyên ngành": applicant.major || "",
        "Facebook": applicant.facebook || "",
        "Lý do tham gia": applicant.reason || "",
        "Ban ưu tiên 1": submission.preferredDepartment1 || "",
        "Ban ưu tiên 2": submission.preferredDepartment2 || "",
        "Thời gian/tuần": submission.timePerWeek || "",
        "Mức độ cam kết": submission.commitmentLevel ? `${submission.commitmentLevel}/5` : "",
        "Mong muốn": submission.expectations || "",
        "Kinh nghiệm Tech": submission.techExperience || "",
        "Kỹ năng Tech": submission.techSkills || "",
        "Dự án Tech": submission.techProjects || "",
        "Kỳ vọng Tech": submission.techExpectations || "",
        "Kinh nghiệm Comm": submission.commExperience || "",
        "Kỹ năng Comm": submission.commSkills || "",
        "Portfolio Comm": submission.commPortfolio || "",
        "Kỳ vọng Comm": submission.commExpectations || "",
        "Kinh nghiệm Finance": submission.financeExperience || "",
        "Kỹ năng Finance": submission.financeSkills || "",
        "Kỳ vọng Finance": submission.financeExpectations || "",
        "Kinh nghiệm Event": submission.eventExperience || "",
        "Kỹ năng Event": submission.eventSkills || "",
        "Kỳ vọng Event": submission.eventExpectations || "",
        "Nguồn": submission.surveySource || "",
        "Kỹ năng (cũ)": submission.surveySkills ? (() => {
          try {
            const parsed = JSON.parse(submission.surveySkills)
            return Array.isArray(parsed) ? parsed.join("; ") : submission.surveySkills
          } catch {
            return submission.surveySkills
          }
        })() : "",
        "Thời gian (cũ)": submission.surveyTimeSlots ? (() => {
          try {
            const parsed = JSON.parse(submission.surveyTimeSlots)
            return Array.isArray(parsed) ? parsed.join("; ") : submission.surveyTimeSlots
          } catch {
            return submission.surveyTimeSlots
          }
        })() : "",
        "Ghi chú": submission.notes || "",
      }))
    )

    // Create workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(rows)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Đăng ký")

    // Set column widths
    const columnWidths = [
      { wch: 15 }, // Mã đăng ký
      { wch: 20 }, // Ngày đăng ký
      { wch: 20 }, // Tên đội
      { wch: 25 }, // Họ và tên
      { wch: 30 }, // Email
      { wch: 15 }, // Số điện thoại
      { wch: 12 }, // Ngày sinh
      { wch: 10 }, // Giới tính
      { wch: 25 }, // Mã số sinh viên
      { wch: 20 }, // Trường
      { wch: 20 }, // Chuyên ngành
      { wch: 30 }, // Facebook
      { wch: 30 }, // Lý do tham gia
      { wch: 15 }, // Ban ưu tiên 1
      { wch: 15 }, // Ban ưu tiên 2
      { wch: 15 }, // Thời gian/tuần
      { wch: 15 }, // Mức độ cam kết
      { wch: 40 }, // Mong muốn
      { wch: 40 }, // Kinh nghiệm Tech
      { wch: 40 }, // Kỹ năng Tech
      { wch: 40 }, // Dự án Tech
      { wch: 40 }, // Kỳ vọng Tech
      { wch: 40 }, // Kinh nghiệm Comm
      { wch: 40 }, // Kỹ năng Comm
      { wch: 40 }, // Portfolio Comm
      { wch: 40 }, // Kỳ vọng Comm
      { wch: 40 }, // Kinh nghiệm Finance
      { wch: 40 }, // Kỹ năng Finance
      { wch: 40 }, // Kỳ vọng Finance
      { wch: 40 }, // Kinh nghiệm Event
      { wch: 40 }, // Kỹ năng Event
      { wch: 40 }, // Kỳ vọng Event
      { wch: 20 }, // Nguồn
      { wch: 30 }, // Kỹ năng (cũ)
      { wch: 30 }, // Thời gian (cũ)
      { wch: 40 }, // Ghi chú
    ]
    worksheet["!cols"] = columnWidths

    // Generate Excel file buffer
    const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })

    const filename = `dang-ky-${new Date().toISOString().split("T")[0]}.xlsx`

    return new NextResponse(excelBuffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })
  } catch (error: any) {
    console.error("Export error:", error)
    return NextResponse.json(
      { error: error.message || "Đã xảy ra lỗi" },
      { status: 500 }
    )
  }
}


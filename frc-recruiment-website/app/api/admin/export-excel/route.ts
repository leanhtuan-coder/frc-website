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
    const rows: any[] = []

    submissions.forEach((submission) => {
      submission.applicants.forEach((applicant, index) => {
        const row: any = {
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
          "Là trưởng nhóm": applicant.isLeader ? "Có" : "Không",
        }

        // Add survey fields
        row["Nguồn"] = submission.surveySource || ""
        
        if (submission.surveySkills) {
          try {
            const skills = JSON.parse(submission.surveySkills)
            row["Kỹ năng"] = Array.isArray(skills) ? skills.join("; ") : ""
          } catch {
            row["Kỹ năng"] = ""
          }
        } else {
          row["Kỹ năng"] = ""
        }

        if (submission.surveyTimeSlots) {
          try {
            const slots = JSON.parse(submission.surveyTimeSlots)
            row["Khung giờ"] = Array.isArray(slots) ? slots.join("; ") : ""
          } catch {
            row["Khung giờ"] = ""
          }
        } else {
          row["Khung giờ"] = ""
        }

        // Add new form fields
        row["Ban ưu tiên 1"] = submission.preferredDepartment1 || ""
        row["Ban ưu tiên 2"] = submission.preferredDepartment2 || ""
        row["Thời gian/tuần"] = submission.timePerWeek || ""
        row["Mong đợi"] = submission.expectations || ""
        row["Mức độ cam kết"] = submission.commitmentLevel ? `${submission.commitmentLevel}/5` : ""

        // Department-specific fields
        row["Kinh nghiệm Tech"] = submission.techExperience || ""
        row["Kỹ năng Tech"] = submission.techSkills || ""
        row["Dự án Tech"] = submission.techProjects || ""
        row["Mong đợi Tech"] = submission.techExpectations || ""
        
        row["Kinh nghiệm Comm"] = submission.commExperience || ""
        row["Kỹ năng Comm"] = submission.commSkills || ""
        row["Portfolio Comm"] = submission.commPortfolio || ""
        row["Mong đợi Comm"] = submission.commExpectations || ""
        
        row["Kinh nghiệm Finance"] = submission.financeExperience || ""
        row["Kỹ năng Finance"] = submission.financeSkills || ""
        row["Mong đợi Finance"] = submission.financeExpectations || ""
        
        row["Kinh nghiệm Event"] = submission.eventExperience || ""
        row["Kỹ năng Event"] = submission.eventSkills || ""
        row["Mong đợi Event"] = submission.eventExpectations || ""

        row["Ghi chú"] = submission.notes || ""

        rows.push(row)
      })
    })

    // Create workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(rows)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Đăng ký")

    // Set column widths
    const colWidths = [
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
      { wch: 20 }, // Lý do
      { wch: 12 }, // Trưởng nhóm
      { wch: 15 }, // Nguồn
      { wch: 30 }, // Kỹ năng
      { wch: 30 }, // Khung giờ
      { wch: 15 }, // Ban ưu tiên 1
      { wch: 15 }, // Ban ưu tiên 2
      { wch: 15 }, // Thời gian/tuần
      { wch: 40 }, // Mong đợi
      { wch: 15 }, // Cam kết
      { wch: 40 }, // Các trường khác...
    ]
    worksheet["!cols"] = colWidths

    // Generate buffer
    const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })

    // Return Excel file
    return new NextResponse(excelBuffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="dang-ky-${new Date().toISOString().split("T")[0]}.xlsx"`,
      },
    })
  } catch (error: any) {
    console.error("Export Excel error:", error)
    return NextResponse.json(
      { error: error.message || "Đã xảy ra lỗi" },
      { status: 500 }
    )
  }
}


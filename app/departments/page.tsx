"use client"

import { departments } from "@/lib/departments-data"
import { DepartmentCard } from "@/components/department-card"

export default function DepartmentsPage() {
  return (
    <div
      className="min-h-screen relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/background.png')",
        // Fallback gradient nếu ảnh chưa load
        backgroundColor: "#0f172a",
      }}
    >
      {/* Overlay để đảm bảo nội dung dễ đọc (có thể điều chỉnh opacity) */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-blue-900/30 to-teal-900/40"></div>

      {/* Main Content */}
      <section className="relative z-10 min-h-screen py-8 md:py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 md:mb-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 uppercase drop-shadow-lg">
                Các Ban Trong CLB
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
                Tìm hiểu về chức năng, nhiệm vụ và tiêu chí tuyển chọn của từng ban
              </p>
            </div>
          </div>

          {/* Departments Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {departments.map((dept) => (
              <DepartmentCard key={dept.id} department={dept} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}


"use client"

import { GlassCard } from "@/components/glass-card"
import { Countdown } from "@/components/countdown"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  // Set deadline to a future date for testing (adjust as needed)
  const deadline = process.env.NEXT_PUBLIC_REGISTRATION_DEADLINE || "2025-12-31T23:59:59+07:00"
  
  // For development: if deadline is in the past or invalid, set it to 30 days from now
  const deadlineDate = new Date(deadline)
  const now = new Date()
  let finalDeadline = deadline
  if (isNaN(deadlineDate.getTime()) || deadlineDate <= now) {
    // Set to 30 days from now if deadline is invalid or in the past
    const futureDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
    finalDeadline = futureDate.toISOString()
  }

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
      
      {/* Optional: Giữ lại một số abstract shapes nhẹ nếu muốn */}
      {/* Có thể comment out phần này nếu ảnh nền đã đẹp */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-2 h-2 bg-white/30 rounded-full animate-glow"></div>
        <div className="absolute top-32 left-32 w-1.5 h-1.5 bg-white/30 rounded-full animate-glow-delay-1"></div>
        <div className="absolute top-24 left-40 w-1 h-1 bg-white/30 rounded-full animate-glow-delay-2"></div>
      </div> */}

      {/* Main Content */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-2 md:py-4">
        <div className="max-w-4xl w-full relative">
          <GlassCard className="text-center overflow-hidden" showPattern={true}>
            <div className="relative z-10">
              {/* Logo CLB - Đặt ở giữa, phía trên title */}
              <div className="flex justify-center mb-1">
                <img 
                  src="/logo.png" 
                  alt="FPTU Robotics Club Logo" 
                  className="w-24 h-24 md:w-32 md:h-32 object-contain"
                />
              </div>

              {/* Main Title */}
              <div className="space-y-1.5 md:space-y-2 mb-3 md:mb-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 uppercase leading-tight">
                  FPTU ROBOTICS CLUB
                  <br />
                  MỞ ĐƠN TUYỂN THÀNH VIÊN
                </h1>
                
                {/* Welcome Message */}
                <p className="text-sm md:text-base text-gray-700 font-normal max-w-2xl mx-auto leading-relaxed">
                  Chào mừng bạn đến với sân chơi sáng tạo dành cho sinh viên toàn miền Bắc
                </p>
              </div>

              {/* Về cuộc thi Section */}
              <div className="space-y-2 mb-3 md:mb-4">
                <h2 className="text-lg md:text-xl font-bold text-slate-900">
                  Về cuộc thi
                </h2>
                <p className="text-sm md:text-base text-gray-700 font-normal max-w-2xl mx-auto leading-relaxed">
                  Với sứ mệnh khai mở tư duy đột phá và bứt phá giới hạn sáng tạo, FPTU Robotics Club mang đến một sân chơi ý nghĩa nơi các thành viên được tự do thể hiện bản sắc cá nhân qua lĩnh vực Robotics và công nghệ.
                </p>
              </div>

              {/* Thông tin dự thi Section */}
              <div className="space-y-2 mb-3 md:mb-4">
                <h2 className="text-lg md:text-xl font-bold text-slate-900">
                  Thông tin dự thi
                </h2>
                <div className="space-y-1 text-sm md:text-base text-gray-700 font-normal max-w-2xl mx-auto text-left">
                  <p>• Thí sinh đăng ký theo đội nhóm 2-3 thành viên.</p>
                  <p>• Tất cả thông tin đăng ký phải trung thực và chính xác.</p>
                  <p>• Thí sinh cần tuân thủ tuyệt đối các quy định trong Bộ luật của Ban Tổ chức.</p>
                </div>
              </div>

              {/* Countdown Timer Section */}
              <div className="space-y-3 mb-3 md:mb-4">
                <h3 className="text-base md:text-lg font-bold text-slate-900">
                  Thời gian còn lại để đăng ký:
                </h3>
                <div className="flex justify-center">
                  <Countdown deadline={finalDeadline} />
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="mb-0 space-y-3">
                <div>
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-4 md:px-8 md:py-6 text-sm md:text-base font-bold uppercase rounded-2xl shadow-lg transition-all duration-300 w-full sm:w-auto"
                    >
                      Đăng ký tham gia ngay
                    </Button>
                  </Link>
                </div>
                <div>
                  <Link href="/departments">
                    <Button
                      variant="outline"
                      size="lg"
                      className="px-6 py-4 md:px-8 md:py-6 text-sm md:text-base font-semibold rounded-2xl border-2 border-slate-300 hover:border-slate-400 w-full sm:w-auto"
                    >
                      Tìm hiểu về các ban
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  )
}


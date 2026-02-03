"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const refCode = searchParams.get("ref") || "N/A"
  const clubName = process.env.NEXT_PUBLIC_CLUB_NAME || "FPTU Robotics Club (FRC)"

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 via-cyan-400 to-emerald-400 flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full p-8 md:p-12 text-center bg-white/95 backdrop-blur-sm">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="h-20 w-20 text-green-500" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Đăng ký thành công!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Cảm ơn bạn đã đăng ký tham gia <strong>{clubName}</strong>!
        </p>
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6">
          <p className="text-sm text-gray-600 mb-2">Mã đăng ký của bạn:</p>
          <p className="text-2xl md:text-3xl font-bold text-blue-600">{refCode}</p>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Vui lòng kiểm tra email để xác nhận đăng ký. Ban tổ chức sẽ liên hệ với bạn trong thời gian sớm nhất.
        </p>
        <Link href="/">
          <Button size="lg" className="w-full md:w-auto">
            Về trang chủ
          </Button>
        </Link>
      </Card>
    </div>
  )
}


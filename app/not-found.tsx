"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/glass-card"
import { Home, RefreshCcw } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50/50">
            <GlassCard className="max-w-md w-full text-center py-12 px-8">
                <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
                <h2 className="text-xl font-semibold text-slate-800 mb-6">Trang không tồn tại</h2>
                <p className="text-slate-600 mb-8">
                    Có vẻ như đường dẫn bạn đang truy cập không chính xác hoặc trang đã được di chuyển.
                </p>
                <div className="flex flex-col gap-3">
                    <Link href="/">
                        <Button className="w-full bg-slate-900 hover:bg-slate-800 flex items-center justify-center gap-2">
                            <Home className="w-4 h-4" />
                            Quay lại trang chủ
                        </Button>
                    </Link>
                    <Button
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2"
                        onClick={() => window.location.reload()}
                    >
                        <RefreshCcw className="w-4 h-4" />
                        Tải lại trang
                    </Button>
                </div>
            </GlassCard>
        </div>
    )
}

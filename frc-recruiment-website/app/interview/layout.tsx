import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin", "vietnamese"] })

export const metadata: Metadata = {
    title: "Chọn Lịch Phỏng Vấn - FRC",
    description: "Chọn khung giờ phỏng vấn phù hợp với bạn",
}

export default function InterviewLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
}

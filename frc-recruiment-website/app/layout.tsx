import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { Header } from "@/components/header"

const inter = Inter({ subsets: ["latin", "vietnamese"] })

export const metadata: Metadata = {
  title: process.env.SITE_TITLE || "Đơn đăng ký",
  description: process.env.SITE_DESCRIPTION || "Đơn đăng ký thành viên FPTU Robotics Club",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <import { Suspense} from "react" />
        <Suspense fallback={null}>
          <Header />
        </Suspense>
        <main className="pt-16">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}


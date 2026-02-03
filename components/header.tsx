"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
    { href: "/interview", label: "Lịch phỏng vấn" },
]

export function Header() {
    const pathname = usePathname()

    // Hide header on interview page for a standalone experience
    if (pathname === "/interview" || pathname === "/interview/") return null

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <img
                            src="/logo.png"
                            alt="FRC Logo"
                            className="w-10 h-10 object-contain"
                        />
                        <span className="font-bold text-lg text-slate-900 hidden sm:block">
                            FPTU Robotics Club
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="flex items-center gap-1 md:gap-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                    pathname === item.href
                                        ? "bg-blue-100 text-blue-700"
                                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                )}
                            >
                                <span className="hidden md:inline">{item.label}</span>
                                <span className="md:hidden">
                                    {item.href === "/" ? "🏠" : item.href === "/departments" ? "📋" : "📝"}
                                </span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    )
}

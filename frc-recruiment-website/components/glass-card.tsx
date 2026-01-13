"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: ReactNode
  className?: string
  showPattern?: boolean
}

export function GlassCard({ children, className, showPattern = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative bg-white rounded-3xl p-4 md:p-6 lg:p-8 border border-gray-200 shadow-2xl",
        className
      )}
    >
      {/* Pattern Background - Tĩnh, không animation */}
      {showPattern && (
        <>
          {/* SVG Pattern - Subtle Dots */}
          <div 
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='40' cy='40' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          
          {/* Geometric Corner Accents - Top Right */}
          <svg
            className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 opacity-[0.035]"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="0" y1="0" x2="100" y2="0" stroke="currentColor" strokeWidth="2.5" />
            <line x1="0" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="2.5" />
            <line x1="0" y1="100" x2="100" y2="0" stroke="currentColor" strokeWidth="2" />
            <line x1="20" y1="0" x2="100" y2="80" stroke="currentColor" strokeWidth="1.5" />
            <line x1="0" y1="20" x2="80" y2="100" stroke="currentColor" strokeWidth="1.5" />
          </svg>

          {/* Geometric Corner Accents - Bottom Left */}
          <svg
            className="absolute bottom-0 left-0 w-24 h-24 md:w-32 md:h-32 opacity-[0.035]"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="0" y1="100" x2="100" y2="100" stroke="currentColor" strokeWidth="2.5" />
            <line x1="100" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="2.5" />
            <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="2" />
            <line x1="20" y1="100" x2="100" y2="20" stroke="currentColor" strokeWidth="1.5" />
            <line x1="0" y1="80" x2="80" y2="0" stroke="currentColor" strokeWidth="1.5" />
          </svg>

          {/* Subtle Grid Lines - Vertical */}
          <div className="absolute inset-0 opacity-[0.015]">
            <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gray-400"></div>
            <div className="absolute left-2/4 top-0 bottom-0 w-px bg-gray-400"></div>
            <div className="absolute left-3/4 top-0 bottom-0 w-px bg-gray-400"></div>
          </div>

          {/* Subtle Grid Lines - Horizontal */}
          <div className="absolute inset-0 opacity-[0.015]">
            <div className="absolute top-1/4 left-0 right-0 h-px bg-gray-400"></div>
            <div className="absolute top-2/4 left-0 right-0 h-px bg-gray-400"></div>
            <div className="absolute top-3/4 left-0 right-0 h-px bg-gray-400"></div>
          </div>

          {/* Decorative Corner Circles */}
          <div className="absolute top-4 right-4 w-3 h-3 rounded-full border-2 border-gray-300 opacity-20"></div>
          <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full border-2 border-gray-300 opacity-20"></div>
        </>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}


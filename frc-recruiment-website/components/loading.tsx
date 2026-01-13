"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

interface LoadingProps {
  onComplete?: () => void
  duration?: number
}

export function Loading({ onComplete, duration = 2000 }: LoadingProps) {
  const [animationData, setAnimationData] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    let isMounted = true
    let cachedData: any = null

    // Try to get from cache first (simple in-memory cache)
    if (typeof window !== "undefined" && (window as any).__animationCache) {
      cachedData = (window as any).__animationCache
      if (isMounted) {
        setAnimationData(cachedData)
        setIsLoaded(true)
        return
      }
    }

    // Load animation data
    fetch("/animations/blue.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load animation")
        }
        return res.json()
      })
      .then((data) => {
        // Cache the animation data
        if (typeof window !== "undefined") {
          (window as any).__animationCache = data
        }
        if (isMounted) {
          setAnimationData(data)
          setIsLoaded(true)
        }
      })
      .catch((error) => {
        console.error("Failed to load animation:", error)
        if (isMounted) {
          setError(true)
          setIsLoaded(true)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  // Fallback loading state
  if (!isLoaded) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-blue-600">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-white" />
          <p className="text-white text-sm">Đang tải...</p>
        </div>
      </div>
    )
  }

  // Error fallback
  if (error || !animationData) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-blue-600">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-white" />
          <p className="text-white text-sm">Đang tải trang đăng ký...</p>
        </div>
      </div>
    )
  }

  // Main loading with Lottie animation
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-blue-600">
      <div className="flex flex-col items-center gap-4">
        {/* Lottie Animation - Smaller size */}
        <div className="w-24 h-24">
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <p className="text-white text-sm">Đang tải trang đăng ký...</p>
      </div>
    </div>
  )
}


"use client"

import { useEffect, useState, useMemo, memo } from "react"
import { cn } from "@/lib/utils"

interface CountdownProps {
  deadline: string
  className?: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

// Memoized time unit component to prevent unnecessary re-renders
const TimeUnit = memo(({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center bg-white/95 backdrop-blur-sm rounded-xl p-4 md:p-5 min-w-[70px] md:min-w-[80px] border border-white/30 shadow-lg">
    <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-1 md:mb-2">
      {String(value).padStart(2, "0")}
    </div>
    <div className="text-xs md:text-sm text-gray-600 font-medium">
      {label}
    </div>
  </div>
))

TimeUnit.displayName = "TimeUnit"

export function Countdown({ deadline, className }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft | null => {
      const now = new Date().getTime()
      const deadlineTime = new Date(deadline).getTime()
      const difference = deadlineTime - now

      if (difference <= 0) {
        setIsExpired(true)
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      }
    }

    const updateCountdown = () => {
      const newTimeLeft = calculateTimeLeft()
      if (newTimeLeft) {
        setTimeLeft(newTimeLeft)
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [deadline])

  // Memoize time units to prevent recalculation on every render
  const timeUnits = useMemo(() => [
    { value: timeLeft.days, label: "Ngày" },
    { value: timeLeft.hours, label: "Giờ" },
    { value: timeLeft.minutes, label: "Phút" },
    { value: timeLeft.seconds, label: "Giây" },
  ], [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds])

  if (isExpired) {
    return (
      <div className={cn("text-center", className)}>
        <p className="text-xl font-bold text-red-500">Đã hết hạn đăng ký</p>
      </div>
    )
  }

  return (
    <div className={cn("flex gap-3 md:gap-4 justify-center flex-wrap", className)}>
      {timeUnits.map((unit, index) => (
        <TimeUnit key={index} value={unit.value} label={unit.label} />
      ))}
    </div>
  )
}


"use client"

import { cn } from "@/lib/utils"

interface ProgressProps {
  currentStep: number
}

export function FormProgress({ currentStep }: ProgressProps) {
  const steps = [
    {
      number: 1,
      title: "THÔNG TIN CHUNG",
      subtitle: "Bảng câu hỏi thông tin chung",
    },
    {
      number: 2,
      title: "CHỌN BAN",
      subtitle: "Chọn ban ứng tuyển",
    },
    {
      number: 3,
      title: "CÂU HỎI THEO BAN",
      subtitle: "Câu hỏi chuyên môn",
    },
    {
      number: 4,
      title: "CAM KẾT",
      subtitle: "Điều khoản và cam kết",
    },
  ]

  return (
    <div className="w-full pt-4 pb-4 md:pt-6 md:pb-6 px-4">
      {/* Mobile: Vertical List */}
      <div className="flex flex-col gap-3 md:hidden">
        {steps.map((step) => (
          <div key={step.number} className="flex items-start gap-3">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-base font-bold transition-all shrink-0 border-2",
                currentStep === step.number
                  ? "bg-gray-900 text-white border-gray-300"
                  : currentStep > step.number
                  ? "bg-green-500 text-white border-green-300"
                  : "bg-gray-200 text-gray-500 border-gray-300"
              )}
            >
              {step.number}
            </div>
            <div className="flex-1 pt-0.5">
              <p
                className={cn(
                  "text-sm font-bold mb-0.5",
                  currentStep === step.number
                    ? "text-gray-900"
                    : currentStep > step.number
                    ? "text-green-600"
                    : "text-gray-500"
                )}
              >
                {step.title}
              </p>
              <p
                className={cn(
                  "text-xs leading-tight",
                  currentStep === step.number
                    ? "text-gray-700"
                    : "text-gray-400"
                )}
              >
                {step.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: Horizontal */}
      <div className="hidden md:flex items-start justify-center gap-2 lg:gap-4">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center justify-center" style={{ flex: '1 1 0', minWidth: 0 }}>
            <div className="flex flex-col items-center w-full relative">
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all shrink-0 z-10",
                  currentStep === step.number
                    ? "bg-gray-900 text-white shadow-lg scale-110"
                    : currentStep > step.number
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500"
                )}
              >
                {step.number}
              </div>
              <div className="mt-4 text-center w-full px-1">
                <p
                  className={cn(
                    "text-xs font-semibold mb-1.5 leading-tight",
                    currentStep === step.number
                      ? "text-gray-900"
                      : currentStep > step.number
                      ? "text-green-600"
                      : "text-gray-500"
                  )}
                >
                  {step.title}
                </p>
                <p
                  className={cn(
                    "text-xs leading-tight",
                    currentStep === step.number
                      ? "text-gray-700"
                      : "text-gray-400"
                  )}
                >
                  {step.subtitle}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-0.5 flex-1 mx-2 mt-6 transition-all",
                  currentStep > step.number ? "bg-green-500" : "bg-gray-200"
                )}
                style={{ maxWidth: '80px' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}


"use client"

import { MultiStepForm } from "@/components/multi-step-form/multi-step-form"

export default function RegisterPage() {
  return (
    <div 
      className="min-h-screen relative overflow-hidden bg-cover bg-center bg-no-repeat py-8 px-4 md:px-6 lg:px-8"
      style={{
        backgroundImage: "url('/background.png')",
        backgroundColor: "#0f172a",
      }}
    >
      {/* Overlay để đảm bảo form dễ đọc */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-blue-900/40 to-teal-900/50"></div>
      
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm border border-white/30 rounded-lg shadow-2xl">
          {/* Header */}
          <div className="bg-white/90 backdrop-blur-sm px-6 md:px-10 lg:px-12 py-6 border-b border-gray-200/50 rounded-t-lg">
            <div className="flex justify-center items-center">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center">
                ĐƠN ĐĂNG KÝ THÀNH VIÊN
              </h2>
            </div>
            <p className="text-center text-gray-600 text-sm md:text-base mt-2">
              Điền đầy đủ thông tin để hoàn tất đăng ký
            </p>
          </div>
          
          {/* Form content */}
          <div className="px-6 md:px-10 lg:px-12 py-8 bg-white/90 backdrop-blur-sm rounded-b-lg">
            <MultiStepForm />
          </div>
        </div>
      </div>
    </div>
  )
}


"use client"

import { Department } from "@/lib/departments-data"
import { Card } from "@/components/ui/card"
import { Briefcase, CheckCircle2, Target, Award } from "lucide-react"

interface DepartmentCardProps {
  department: Department
}

export function DepartmentCard({ department }: DepartmentCardProps) {
  const sectionConfig = [
    {
      key: "functions",
      title: "Chức năng/Nhiệm vụ",
      icon: Briefcase,
      data: department.functions,
    },
    {
      key: "activities",
      title: "Hoạt động chính",
      icon: CheckCircle2,
      data: department.activities,
    },
    {
      key: "criteria",
      title: "Tiêu chí tuyển chọn",
      icon: Target,
      data: department.criteria,
    },
    {
      key: "benefits",
      title: "Quyền lợi",
      icon: Award,
      data: department.benefits,
    },
  ]

  return (
    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white h-full flex flex-col">
      {/* Header với màu gradient nổi bật */}
      <div className={`${department.color.bg} ${department.color.border} border-b-4 p-6 relative text-center`}>
        <h2 className={`text-xl md:text-2xl font-extrabold ${department.color.text}`}>
          {department.name}
        </h2>
      </div>

      {/* Content Sections - Luôn hiển thị, không accordion */}
      <div className="p-6 space-y-5 flex-1">
        {sectionConfig.map((section) => {
          const Icon = section.icon

          return (
            <div key={section.key} className="space-y-3">
              {/* Section Header */}
              <div className={`flex items-center gap-3 pb-2 border-b-2 ${department.color.border}`}>
                <div className={`p-2 rounded-lg ${department.color.bg}`}>
                  <Icon className={`h-5 w-5 ${department.color.accent}`} />
                </div>
                <h3 className={`text-lg font-bold ${department.color.text}`}>
                  {section.title}
                </h3>
              </div>

              {/* Section Content */}
              <div className="pl-2">
                <ul className="space-y-2.5">
                  {section.data.map((item, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className={`${department.color.accent} flex-shrink-0 text-lg font-bold leading-none pt-0.5`}>▸</span>
                      <span className="text-sm text-gray-700 leading-relaxed flex-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

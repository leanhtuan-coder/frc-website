"use client"

import { UseFormReturn } from "react-hook-form"
import { IndividualFormData } from "@/lib/schema"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const DEPARTMENTS = [
  "Ban Chuyên Môn",
  "Ban Truyền Thông",
  "Ban Tài chính – Đối ngoại",
  "Ban Văn hóa – Sự kiện",
]

export function Step2Department({ form }: { form: UseFormReturn<IndividualFormData> }) {
  const dept1 = form.watch("preferredDepartment1")
  const dept2 = form.watch("preferredDepartment2")

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-lg mb-2">Chọn ban ứng tuyển</h3>
        <p className="text-sm text-gray-600">Vui lòng chọn ban bạn mong muốn tham gia</p>
      </div>

      <FormField
        control={form.control}
        name="preferredDepartment1"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ban mong muốn 1 *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Chọn ban mong muốn 1" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {DEPARTMENTS.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="preferredDepartment2"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ban mong muốn 2 (nếu có)</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={!dept1}
            >
              <FormControl>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Chọn ban mong muốn 2 (tùy chọn)" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {DEPARTMENTS.filter((dept) => dept !== dept1).map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>(Tùy chọn - chỉ chọn nếu bạn muốn ứng tuyển thêm ban thứ 2)</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}


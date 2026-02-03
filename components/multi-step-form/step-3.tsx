"use client"

import { UseFormReturn } from "react-hook-form"
import { IndividualFormData, TeamFormData } from "@/lib/schema"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const SURVEY_SOURCES = [
  "Facebook",
  "Bạn bè",
  "Poster",
  "Sự kiện",
  "Khác",
]

const SURVEY_SKILLS = [
  "Cơ khí",
  "Điện-Điện tử",
  "Lập trình",
  "AI-CV",
  "Tổ chức sự kiện",
  "Truyền thông",
  "Thiết kế đồ hoạ",
]

const SURVEY_TIME_SLOTS = [
  "Sáng (8:00 - 12:00)",
  "Chiều (13:00 - 17:00)",
  "Tối (18:00 - 21:00)",
  "Cuối tuần",
  "Linh hoạt",
]

export function Step3({
  form,
}: {
  form: UseFormReturn<IndividualFormData | TeamFormData>
}) {
  const clubName = process.env.NEXT_PUBLIC_CLUB_NAME || "FPTU Robotics Club (FRC)"

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="surveySource"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Bạn biết tới {clubName} qua đâu? *
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Chọn một phương án" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {SURVEY_SOURCES.map((source) => (
                  <SelectItem key={source} value={source}>
                    {source}
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
        name="surveySkills"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">
                Mảng kỹ năng quan tâm: *
              </FormLabel>
              <FormDescription>
                Chọn ít nhất một mảng kỹ năng
              </FormDescription>
            </div>
            <Card className="p-4 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SURVEY_SKILLS.map((skill) => (
                  <FormField
                    key={skill}
                    control={form.control}
                    name="surveySkills"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={skill}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(skill)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, skill])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== skill
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {skill}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
            </Card>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="surveyTimeSlots"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">
                Khung giờ có thể tham gia: *
              </FormLabel>
              <FormDescription>
                Chọn ít nhất một khung giờ
              </FormDescription>
            </div>
            <Card className="p-4 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SURVEY_TIME_SLOTS.map((slot) => (
                  <FormField
                    key={slot}
                    control={form.control}
                    name="surveyTimeSlots"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={slot}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(slot)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, slot])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== slot
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {slot}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
            </Card>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ghi chú khác</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Nhập ghi chú (nếu có)"
                rows={4}
                className="bg-white"
              />
            </FormControl>
            <FormDescription>(Tùy chọn)</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Captcha - simplified for now, can be enhanced with proper hCaptcha integration */}
      <div className="pt-4">
        <FormField
          control={form.control}
          name="captchaToken"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Xác minh *</FormLabel>
              <FormControl>
                <div className="p-4 border rounded bg-gray-100">
                  <p className="text-sm text-gray-600 mb-2">
                    Để bảo mật, vui lòng hoàn thành xác minh. (hCaptcha sẽ được tích hợp khi có site key)
                  </p>
                  <Input
                    {...field}
                    placeholder="Nhập mã xác minh (tạm thời)"
                    className="bg-white"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}


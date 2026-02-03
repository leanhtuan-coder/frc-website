"use client"

import { UseFormReturn } from "react-hook-form"
import { IndividualFormData } from "@/lib/schema"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"

const GENDER_OPTIONS = ["Nam", "Nữ", "Không muốn nêu cụ thể"]
const SOURCE_OPTIONS = ["Facebook", "Instagram", "Bạn bè"]
const TIME_OPTIONS = ["<3h", "3-5h", ">5h"]

export function Step1Individual({ form }: { form: UseFormReturn<IndividualFormData> }) {
  const commitmentLevel = form.watch("commitmentLevel") || 3

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-lg mb-2">Bảng câu hỏi thông tin chung</h3>
        <p className="text-sm text-gray-600">Vui lòng trả lời các câu hỏi dưới đây một cách chính xác nhất!</p>
      </div>

      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>01. Họ và Tên *</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Ví dụ: Nguyễn Văn A"
                className="bg-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>02. Email *</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="email"
                placeholder="example@email.com"
                className="bg-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel>03. Giới tính *</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex gap-6"
              >
                {GENDER_OPTIONS.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className="font-normal cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>04. Số điện thoại *</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Định dạng: 0xxx xxx xxx"
                className="bg-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="facebook"
        render={({ field }) => (
          <FormItem>
            <FormLabel>04. Facebook cá nhân</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Example: https://www.facebook.com/username"
                className="bg-white"
              />
            </FormControl>
            <FormDescription>(Tùy chọn)</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div>
        <Label className="mb-2 block">05. Ngày sinh *</Label>
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="dob.day"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="dd"
                    maxLength={2}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob.month"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="mm"
                    maxLength={2}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob.year"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="yyyy"
                    maxLength={4}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <FormField
        control={form.control}
        name="studentIdMajor"
        render={({ field }) => (
          <FormItem>
            <FormLabel>06. Mã số sinh viên - Chuyên ngành *</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Nhập mã số sinh viên và chuyên ngành"
                className="bg-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="surveySource"
        render={({ field }) => (
          <FormItem>
            <FormLabel>07. Bạn biết đến đợt tuyển này qua đâu? *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Chọn một phương án" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {SOURCE_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
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
        name="reason"
        render={({ field }) => {
          const currentLength = (field.value || '').trim().length
          const isValid = currentLength >= 50
          return (
            <FormItem>
              <FormLabel>08. Tại sao bạn muốn đăng ký tham gia? *</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Nhập lý do muốn tham gia (ít nhất 50 ký tự)"
                  rows={4}
                  className="bg-white"
                />
              </FormControl>
              <FormDescription>
                <span className={isValid ? 'text-green-600' : 'text-gray-500'}>
                  {currentLength} / 50 ký tự (tối thiểu)
                </span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )
        }}
      />

      <FormField
        control={form.control}
        name="timePerWeek"
        render={({ field }) => (
          <FormItem>
            <FormLabel>09. Bạn có thể dành bao nhiêu thời gian/tuần cho CLB? *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Chọn thời gian" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {TIME_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
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
        name="expectations"
        render={({ field }) => {
          const currentLength = (field.value || '').trim().length
          const isValid = currentLength >= 50
          return (
            <FormItem>
              <FormLabel>10. Bạn mong muốn nhận được điều gì khi tham gia CLB? *</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Nhập mong muốn của bạn (ít nhất 50 ký tự)"
                  rows={4}
                  className="bg-white"
                />
              </FormControl>
              <FormDescription>
                <span className={isValid ? 'text-green-600' : 'text-gray-500'}>
                  {currentLength} / 50 ký tự (tối thiểu)
                </span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )
        }}
      />

      <FormField
        control={form.control}
        name="commitmentLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>11. Mức độ cam kết tham gia hoạt động CLB *</FormLabel>
            <FormControl>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Rất thấp</span>
                  <span className="text-sm text-gray-600">Rất cao</span>
                </div>
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  value={[commitmentLevel]}
                  onValueChange={(value) => field.onChange(value[0])}
                  className="w-full"
                />
                <div className="text-center">
                  <span className="text-2xl font-bold text-blue-600">{commitmentLevel}</span>
                  <span className="text-sm text-gray-600 ml-2">/ 5</span>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

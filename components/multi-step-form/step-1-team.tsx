"use client"

import { UseFormReturn } from "react-hook-form"
import { TeamFormData } from "@/lib/schema"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

function MemberFields({
  form,
  memberPrefix,
  memberLabel,
  isOptional = false,
}: {
  form: UseFormReturn<TeamFormData>
  memberPrefix: "member1" | "member2" | "member3"
  memberLabel: string
  isOptional?: boolean
}) {
  return (
    <Card className="p-6 bg-purple-100/50 border-purple-300">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">{memberLabel}</h3>
      {isOptional && (
        <Alert className="mb-4 bg-yellow-50 border-yellow-200">
          <AlertDescription className="text-sm text-yellow-800">
            Lưu ý: Nếu đội thi chỉ bao gồm 2 thành viên, vui lòng bỏ qua các câu hỏi này!
          </AlertDescription>
        </Alert>
      )}
      <div className="space-y-4">
        <FormField
          control={form.control}
          name={`${memberPrefix}.fullName` as any}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên {memberPrefix === "member1" ? "trưởng nhóm" : memberPrefix.replace("member", "thành viên")}? *</FormLabel>
              <FormControl>
                <Input {...field} placeholder={`Nhập họ và tên ${memberPrefix === "member1" ? "trưởng nhóm" : memberPrefix.replace("member", "thành viên")}`} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Label className="mb-2 block">
            Ngày tháng năm sinh của {memberPrefix === "member1" ? "trưởng nhóm" : memberPrefix.replace("member", "thành viên")}? *
          </Label>
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name={`${memberPrefix}.dob.day` as any}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="dd" maxLength={2} className="bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`${memberPrefix}.dob.month` as any}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="mm" maxLength={2} className="bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`${memberPrefix}.dob.year` as any}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="yyyy" maxLength={4} className="bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name={`${memberPrefix}.email` as any}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email của {memberPrefix === "member1" ? "trưởng nhóm" : memberPrefix.replace("member", "thành viên")}? *</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="example@email.com" className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`${memberPrefix}.phone` as any}
            render={({ field }) => (
              <FormItem>
                <FormLabel>SĐT liên hệ của {memberPrefix === "member1" ? "trưởng nhóm" : memberPrefix.replace("member", "thành viên")} là? *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="0123456789" className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name={`${memberPrefix}.school` as any}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Trường/Đơn vị đang theo học/làm việc của {memberPrefix === "member1" ? "trưởng nhóm" : memberPrefix.replace("member", "thành viên")}? *
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Nhập tên trường/đơn vị" className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`${memberPrefix}.major` as any}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Ngành học/chuyên môn của {memberPrefix === "member1" ? "trưởng nhóm" : memberPrefix.replace("member", "thành viên")} là? *
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Nhập ngành học/chuyên môn" className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`${memberPrefix}.facebook` as any}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link Facebook của {memberPrefix === "member1" ? "trưởng nhóm" : memberPrefix.replace("member", "thành viên")}?</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://facebook.com/username" className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Card>
  )
}

export function Step1Team({ form }: { form: UseFormReturn<TeamFormData> }) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="teamName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tên đội thi của bạn là? *</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Nhập tên đội thi" className="bg-white" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <MemberFields form={form} memberPrefix="member1" memberLabel="Thông tin cá nhân thành viên 1 (Trưởng nhóm)" />
      <MemberFields form={form} memberPrefix="member2" memberLabel="Thông tin cá nhân thành viên 2" />
      <MemberFields form={form} memberPrefix="member3" memberLabel="Thông tin cá nhân thành viên 3 (nếu có)" isOptional />
    </div>
  )
}


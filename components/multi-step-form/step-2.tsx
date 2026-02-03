"use client"

import { UseFormReturn } from "react-hook-form"
import { IndividualFormData, TeamFormData } from "@/lib/schema"
import { Checkbox } from "@/components/ui/checkbox"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"

export function Step2({
  form,
}: {
  form: UseFormReturn<IndividualFormData | TeamFormData>
}) {
  const [rulesOpen, setRulesOpen] = useState(false)
  const [rulesContent, setRulesContent] = useState<string>("")

  const loadRules = async () => {
    try {
      const response = await fetch("/api/rules")
      if (response.ok) {
        const text = await response.text()
        setRulesContent(text)
      } else {
        setRulesContent("Nội quy và điều khoản tham gia sẽ được cập nhật sớm.")
      }
    } catch {
      setRulesContent("Nội quy và điều khoản tham gia sẽ được cập nhật sớm.")
    }
  }

  return (
    <div className="space-y-6">
      <Dialog open={rulesOpen} onOpenChange={setRulesOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              loadRules()
              setRulesOpen(true)
            }}
          >
            Xem nội quy và điều khoản
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nội quy và điều khoản tham gia</DialogTitle>
            <DialogDescription>
              Vui lòng đọc kỹ các điều khoản trước khi đồng ý
            </DialogDescription>
          </DialogHeader>
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-sm">
              {rulesContent || "Đang tải..."}
            </pre>
          </div>
          <Button
            type="button"
            onClick={() => setRulesOpen(false)}
            className="mt-4"
          >
            Tôi đã đọc
          </Button>
        </DialogContent>
      </Dialog>

      <FormField
        control={form.control}
        name="consentTruth"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="font-normal">
                Tôi cam kết thông tin cung cấp là trung thực và chính xác. *
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="consentRules"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="font-normal">
                Tôi đồng ý tuân thủ nội quy của Ban Tổ chức/CLB. *
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="consentData"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="font-normal">
                Tôi đồng ý để CLB sử dụng thông tin cho mục đích tuyển chọn và liên lạc. *
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  )
}


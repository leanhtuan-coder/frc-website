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
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

export function Step3Department({ form }: { form: UseFormReturn<IndividualFormData> }) {
  const dept1 = form.watch("preferredDepartment1")
  const dept2 = form.watch("preferredDepartment2")

  const showTechQuestions = dept1 === "Ban Chuyên Môn" || dept2 === "Ban Chuyên Môn"
  const showCommQuestions = dept1 === "Ban Truyền Thông" || dept2 === "Ban Truyền Thông"
  const showFinanceQuestions = dept1 === "Ban Tài chính – Đối ngoại" || dept2 === "Ban Tài chính – Đối ngoại"
  const showEventQuestions = dept1 === "Ban Văn hóa – Sự kiện" || dept2 === "Ban Văn hóa – Sự kiện"

  return (
    <div className="space-y-6">
      {showTechQuestions && (
        <Card className="p-6 bg-blue-50 border border-blue-200">
          <h3 className="text-xl font-bold mb-4 text-blue-900">BAN CHUYÊN MÔN</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="techExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    01. Bạn đã có kinh nghiệm hoặc kiến thức nào về robotics, lập trình nhúng, hoặc các lĩnh vực kỹ thuật liên quan chưa? Hãy mô tả ngắn gọn.
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Mô tả kinh nghiệm của bạn"
                      rows={4}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormDescription>(Tùy chọn)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="techSkills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    02. Liệt kê những ngôn ngữ lập trình, công cụ hoặc kỹ thuật bạn thành thạo (nếu có).
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Ví dụ: C/C++, Python, Arduino, thiết kế mạch, in 3D..."
                      rows={4}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormDescription>(Tùy chọn)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="techProjects"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    03. Chia sẻ link hoặc mô tả về sản phẩm/dự án công nghệ bạn từng thực hiện (nếu có).
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Mô tả hoặc dán link dự án"
                      rows={4}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormDescription>(Tùy chọn)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="techExpectations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    04. Điều gì ở lĩnh vực robotics/tech thu hút bạn nhất? Bạn kỳ vọng học được gì hoặc đóng góp gì khi tham gia ban Chuyên môn?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Chia sẻ suy nghĩ của bạn"
                      rows={4}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormDescription>(Tùy chọn)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>
      )}

      {showCommQuestions && (
        <Card className="p-6 bg-green-50 border border-green-200">
          <h3 className="text-xl font-bold mb-4 text-green-900">BAN TRUYỀN THÔNG</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="commExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    01. Bạn đã từng tham gia công việc truyền thông nào chưa? (Viết bài, quản lý fanpage, thiết kế poster, làm video,…)?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Nếu có, hãy mô tả kinh nghiệm đó"
                      rows={4}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormDescription>(Tùy chọn)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="commSkills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    02. Bạn có kỹ năng nào liên quan đến truyền thông? (Design, viết content, video editing, photography, etc.)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Liệt kê các kỹ năng của bạn"
                      rows={4}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormDescription>(Tùy chọn)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="commPortfolio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    03. Chia sẻ portfolio hoặc các sản phẩm truyền thông bạn từng làm (nếu có).
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Link hoặc mô tả portfolio"
                      rows={4}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormDescription>(Tùy chọn)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="commExpectations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    04. Bạn kỳ vọng học được gì hoặc đóng góp gì khi tham gia ban Truyền thông?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Chia sẻ suy nghĩ của bạn"
                      rows={4}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormDescription>(Tùy chọn)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>
      )}

      {showFinanceQuestions && (
        <Card className="p-6 bg-yellow-50 border border-yellow-200">
          <h3 className="text-xl font-bold mb-4 text-yellow-900">BAN TÀI CHÍNH - ĐỐI NGOẠI</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="financeExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    01. Bạn đã có kinh nghiệm gì về quản lý tài chính, đối ngoại, hoặc tổ chức sự kiện chưa?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Mô tả kinh nghiệm của bạn"
                      rows={4}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormDescription>(Tùy chọn)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="financeSkills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    02. Bạn có kỹ năng nào liên quan? (Giao tiếp, đàm phán, quản lý ngân sách, etc.)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Liệt kê các kỹ năng"
                      rows={4}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormDescription>(Tùy chọn)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="financeExpectations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    03. Bạn kỳ vọng học được gì hoặc đóng góp gì khi tham gia ban Tài chính - Đối ngoại?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Chia sẻ suy nghĩ của bạn"
                      rows={4}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormDescription>(Tùy chọn)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>
      )}

      {showEventQuestions && (
        <Card className="p-6 bg-purple-50 border border-purple-200">
          <h3 className="text-xl font-bold mb-4 text-purple-900">BAN VĂN HÓA - SỰ KIỆN</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="eventExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    01. Bạn đã có kinh nghiệm tổ chức sự kiện hoặc hoạt động văn hóa nào chưa?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Mô tả kinh nghiệm của bạn"
                      rows={4}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormDescription>(Tùy chọn)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eventSkills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    02. Bạn có kỹ năng nào liên quan? (Tổ chức sự kiện, MC, quản lý thời gian, teamwork, etc.)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Liệt kê các kỹ năng"
                      rows={4}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormDescription>(Tùy chọn)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eventExpectations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    03. Bạn kỳ vọng học được gì hoặc đóng góp gì khi tham gia ban Văn hóa - Sự kiện?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Chia sẻ suy nghĩ của bạn"
                      rows={4}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormDescription>(Tùy chọn)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>
      )}

      {!showTechQuestions && !showCommQuestions && !showFinanceQuestions && !showEventQuestions && (
        <div className="text-center py-8 text-gray-500">
          Vui lòng chọn ban ở bước trước để xem câu hỏi chuyên môn
        </div>
      )}
    </div>
  )
}


import { z } from 'zod'

const dateSchema = z.object({
  day: z.string().min(1, 'Vui lòng nhập ngày').max(2, 'Ngày không hợp lệ'),
  month: z.string().min(1, 'Vui lòng nhập tháng').max(2, 'Tháng không hợp lệ'),
  year: z.string().min(4, 'Vui lòng nhập năm đầy đủ').max(4, 'Năm không hợp lệ'),
}).refine((data) => {
  const day = parseInt(data.day)
  const month = parseInt(data.month)
  const year = parseInt(data.year)
  if (isNaN(day) || isNaN(month) || isNaN(year)) return false
  if (day < 1 || day > 31) return false
  if (month < 1 || month > 12) return false
  if (year < 1950 || year > new Date().getFullYear()) return false
  const date = new Date(year, month - 1, day)
  return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year
}, {
  message: 'Ngày tháng năm sinh không hợp lệ',
})

const applicantSchema = z.object({
  fullName: z.string().min(2, 'Họ và tên phải có ít nhất 2 ký tự').max(100, 'Họ và tên quá dài'),
  dob: dateSchema,
  email: z.string().email('Email không hợp lệ'),
  phone: z.string().min(10, 'Số điện thoại không hợp lệ').regex(/^(\+84|0)[1-9][0-9]{8,9}$/, 'Số điện thoại không đúng định dạng Việt Nam'),
  school: z.string().min(2, 'Vui lòng nhập trường/đơn vị').max(200, 'Tên trường/đơn vị quá dài'),
  major: z.string().min(2, 'Vui lòng nhập ngành học/chuyên môn').max(200, 'Ngành học/chuyên môn quá dài'),
  facebook: z.string().url('Link Facebook không hợp lệ').optional().or(z.literal('')),
  reason: z.string().min(50, 'Lý do phải có ít nhất 50 ký tự').max(500, 'Lý do không được vượt quá 500 ký tự').optional(),
})

const memberSchema = z.object({
  fullName: z.string().min(2, 'Họ và tên phải có ít nhất 2 ký tự').max(100, 'Họ và tên quá dài'),
  dob: dateSchema,
  email: z.string().email('Email không hợp lệ'),
  phone: z.string().min(10, 'Số điện thoại không hợp lệ').regex(/^(\+84|0)[1-9][0-9]{8,9}$/, 'Số điện thoại không đúng định dạng Việt Nam'),
  school: z.string().min(2, 'Vui lòng nhập trường/đơn vị').max(200, 'Tên trường/đơn vị quá dài'),
  major: z.string().min(2, 'Vui lòng nhập ngành học/chuyên môn').max(200, 'Ngành học/chuyên môn quá dài'),
  facebook: z.string().url('Link Facebook không hợp lệ').optional().or(z.literal('')),
})

export const individualFormSchema = z.object({
  mode: z.literal('INDIVIDUAL'),
  // Step 1 - Thông tin chung
  fullName: z.string().min(2, 'Họ và tên phải có ít nhất 2 ký tự').max(100, 'Họ và tên quá dài'),
  email: z.string().email('Email không hợp lệ'),
  gender: z.enum(['Nam', 'Nữ', 'Không muốn nêu cụ thể'], { required_error: 'Vui lòng chọn giới tính' }),
  phone: z.string().min(10, 'Số điện thoại không hợp lệ').regex(/^(\+84|0)[1-9][0-9]{8,9}$/, 'Số điện thoại không đúng định dạng Việt Nam'),
  facebook: z.string().url('Link Facebook không hợp lệ').optional().or(z.literal('')),
  dob: dateSchema,
  studentIdMajor: z.string().min(2, 'Vui lòng nhập mã số sinh viên - chuyên ngành').max(200, 'Thông tin quá dài'),
  surveySource: z.string().min(1, 'Vui lòng chọn một phương án'),
  reason: z.string()
    .transform((val) => val.trim())
    .superRefine((val, ctx) => {
      if (val.length < 50) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 50,
          type: 'string',
          inclusive: true,
          message: `Lý do phải có ít nhất 50 ký tự (hiện tại: ${val.length} ký tự)`,
        })
      }
      if (val.length > 2000) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          maximum: 2000,
          type: 'string',
          inclusive: true,
          message: 'Lý do không được vượt quá 2000 ký tự',
        })
      }
    }),
  timePerWeek: z.string().min(1, 'Vui lòng chọn thời gian có thể dành cho CLB'),
  expectations: z.string()
    .transform((val) => val.trim())
    .superRefine((val, ctx) => {
      if (val.length < 50) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 50,
          type: 'string',
          inclusive: true,
          message: `Vui lòng mô tả mong muốn (ít nhất 50 ký tự, hiện tại: ${val.length} ký tự)`,
        })
      }
      if (val.length > 2000) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          maximum: 2000,
          type: 'string',
          inclusive: true,
          message: 'Mô tả không được vượt quá 2000 ký tự',
        })
      }
    }),
  commitmentLevel: z.number().min(1, 'Vui lòng đánh giá mức độ cam kết').max(5, 'Mức độ cam kết không hợp lệ'),
  // Step 2 - Chọn ban
  preferredDepartment1: z.string().min(1, 'Vui lòng chọn ban mong muốn 1'),
  preferredDepartment2: z.string().optional(),
  // Step 3 - Câu hỏi theo ban (conditional)
  // Ban Chuyên môn
  techExperience: z.string().max(2000, 'Mô tả quá dài').optional(),
  techSkills: z.string().max(2000, 'Mô tả quá dài').optional(),
  techProjects: z.string().max(2000, 'Mô tả quá dài').optional(),
  techExpectations: z.string().max(2000, 'Mô tả quá dài').optional(),
  // Ban Truyền thông
  commExperience: z.string().max(2000, 'Mô tả quá dài').optional(),
  commSkills: z.string().max(2000, 'Mô tả quá dài').optional(),
  commPortfolio: z.string().max(2000, 'Mô tả quá dài').optional(),
  commExpectations: z.string().max(2000, 'Mô tả quá dài').optional(),
  // Ban Tài chính - Đối ngoại
  financeExperience: z.string().max(2000, 'Mô tả quá dài').optional(),
  financeSkills: z.string().max(2000, 'Mô tả quá dài').optional(),
  financeExpectations: z.string().max(2000, 'Mô tả quá dài').optional(),
  // Ban Văn hóa - Sự kiện
  eventExperience: z.string().max(2000, 'Mô tả quá dài').optional(),
  eventSkills: z.string().max(2000, 'Mô tả quá dài').optional(),
  eventExpectations: z.string().max(2000, 'Mô tả quá dài').optional(),
  // Step 4 - Cam kết
  consentTruth: z.boolean().refine((val) => val === true, { message: 'Bạn phải đồng ý với cam kết này' }),
  consentRules: z.boolean().refine((val) => val === true, { message: 'Bạn phải đồng ý với cam kết này' }),
  consentData: z.boolean().refine((val) => val === true, { message: 'Bạn phải đồng ý với cam kết này' }),
  // Captcha
  captchaToken: z.string().min(1, 'Vui lòng hoàn thành xác minh'),
})

export const teamFormSchema = z.object({
  mode: z.literal('TEAM'),
  // Step 1
  teamName: z.string().min(2, 'Tên đội thi phải có ít nhất 2 ký tự').max(100, 'Tên đội thi quá dài'),
  member1: memberSchema,
  member2: memberSchema,
  member3: memberSchema.optional(),
  // Step 2
  consentTruth: z.boolean().refine((val) => val === true, { message: 'Bạn phải đồng ý với cam kết này' }),
  consentRules: z.boolean().refine((val) => val === true, { message: 'Bạn phải đồng ý với cam kết này' }),
  consentData: z.boolean().refine((val) => val === true, { message: 'Bạn phải đồng ý với cam kết này' }),
  // Step 3
  surveySource: z.string().min(1, 'Vui lòng chọn một phương án'),
  surveySkills: z.array(z.string()).min(1, 'Vui lòng chọn ít nhất một mảng kỹ năng'),
  surveyTimeSlots: z.array(z.string()).min(1, 'Vui lòng chọn ít nhất một khung giờ'),
  notes: z.string().max(1000, 'Ghi chú không được vượt quá 1000 ký tự').optional(),
  // Captcha
  captchaToken: z.string().min(1, 'Vui lòng hoàn thành xác minh'),
}).refine((data) => {
  // Ensure unique emails within team
  const emails = [data.member1.email, data.member2.email]
  if (data.member3?.email) {
    emails.push(data.member3.email)
  }
  return new Set(emails).size === emails.length
}, {
  message: 'Email của các thành viên trong đội phải khác nhau',
  path: ['member2', 'email'],
})

export type IndividualFormData = z.infer<typeof individualFormSchema>
export type TeamFormData = z.infer<typeof teamFormSchema>
export type FormData = IndividualFormData | TeamFormData


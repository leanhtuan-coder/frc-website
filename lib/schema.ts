import { z } from 'zod';

// Date validation schema
const dateSchema = z.object({
    day: z.string().min(1, 'Vui lòng nhập ngày').max(2, 'Ngày không hợp lệ'),
    month: z.string().min(1, 'Vui lòng nhập tháng').max(2, 'Tháng không hợp lệ'),
    year: z.string().min(4, 'Vui lòng nhập năm đầy đủ').max(4, 'Năm không hợp lệ'),
}).refine((data) => {
    const day = parseInt(data.day);
    const month = parseInt(data.month);
    const year = parseInt(data.year);
    if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
    if (day < 1 || day > 31) return false;
    if (month < 1 || month > 12) return false;
    if (year < 1950 || year > new Date().getFullYear()) return false;
    const date = new Date(year, month - 1, day);
    return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
}, {
    message: 'Ngày tháng năm sinh không hợp lệ',
});

// Main registration form schema
export const registrationFormSchema = z.object({
    // Step 1: Thông tin chung
    fullName: z.string().min(2, 'Họ và tên phải có ít nhất 2 ký tự').max(100, 'Họ và tên quá dài'),
    email: z.string().email('Email không hợp lệ'),
    gender: z.enum(['Nam', 'Nữ', 'Không muốn nêu cụ thể'], { message: 'Vui lòng chọn giới tính' }),
    phone: z.string().min(10, 'Số điện thoại không hợp lệ').regex(/^(\+84|0)[1-9][0-9]{8,9}$/, 'Số điện thoại không đúng định dạng Việt Nam'),
    facebook: z.string().url('Link Facebook không hợp lệ').optional().or(z.literal('')),
    dob: dateSchema,
    studentIdMajor: z.string().min(2, 'Vui lòng nhập mã số sinh viên - chuyên ngành').max(200, 'Thông tin quá dài'),
    campus: z.string().min(1, 'Vui lòng chọn cơ sở').refine((val) => {
        // Import CAMPUS_OPTIONS to check recruitment status
        const selectedCampus = ['hanoi', 'danang', 'quynhon', 'cantho'].includes(val);
        return selectedCampus;
    }, { message: 'Cơ sở không hợp lệ' }),
    surveySource: z.string().min(1, 'Vui lòng chọn một phương án'),
    reason: z.string().min(50, 'Lý do phải có ít nhất 50 ký tự').max(2000, 'Lý do không được vượt quá 2000 ký tự'),
    timePerWeek: z.string().min(1, 'Vui lòng chọn thời gian có thể dành cho CLB'),
    expectations: z.string().min(50, 'Mong muốn phải có ít nhất 50 ký tự').max(2000, 'Mô tả không được vượt quá 2000 ký tự'),
    commitmentLevel: z.number().min(1, 'Vui lòng đánh giá mức độ cam kết').max(5, 'Mức độ cam kết không hợp lệ'),

    // Step 2: Chọn ban
    preferredDepartment1: z.string().min(1, 'Vui lòng chọn ban mong muốn 1'),
    preferredDepartment2: z.string().optional(),

    // Step 3: Câu hỏi theo ban (conditional - optional vì chỉ validate theo ban đã chọn)
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

    // Step 4: Cam kết
    consentTruth: z.boolean().refine((val) => val === true, { message: 'Bạn phải đồng ý với cam kết này' }),
    consentRules: z.boolean().refine((val) => val === true, { message: 'Bạn phải đồng ý với cam kết này' }),
    consentData: z.boolean().refine((val) => val === true, { message: 'Bạn phải đồng ý với cam kết này' }),
});

export type RegistrationFormData = z.infer<typeof registrationFormSchema>;

// Department options
export const DEPARTMENTS = [
    { value: 'tech', label: 'Ban Chuyên môn' },
    { value: 'comm', label: 'Ban Truyền thông' },
    { value: 'finance', label: 'Ban Tài chính - Đối ngoại' },
    { value: 'event', label: 'Ban Văn hóa - Sự kiện' },
];

// Other options
export const GENDER_OPTIONS = ['Nam', 'Nữ', 'Không muốn nêu cụ thể'] as const;
export const SOURCE_OPTIONS = ['Facebook', 'Instagram', 'Bạn bè', 'Website CLB', 'Khác'];
export const TIME_OPTIONS = ['<3h', '3-5h', '>5h'];

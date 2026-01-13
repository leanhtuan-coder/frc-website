import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { RegistrationFormData, GENDER_OPTIONS, SOURCE_OPTIONS, TIME_OPTIONS } from '../../lib/schema';
import { InputField } from './InputField';
import { SelectField } from './SelectField';
import { Label } from '../ui/Label';
import { RadioGroup, RadioGroupItem } from '../ui/RadioGroup';
import { Slider } from '../ui/Slider';

interface Step1Props {
    form: UseFormReturn<RegistrationFormData>;
}

export const Step1: React.FC<Step1Props> = ({ form }) => {
    const { register, formState: { errors }, watch, setValue } = form;
    const commitmentLevel = watch('commitmentLevel') || 3;
    const reasonLength = (watch('reason') || '').trim().length;
    const expectationsLength = (watch('expectations') || '').trim().length;

    return (
        <div className="space-y-6">
            <div className="bg-purple-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-lg mb-2">Bảng câu hỏi thông tin chung</h3>
                <p className="text-sm text-gray-600">Vui lòng trả lời các câu hỏi dưới đây một cách chính xác nhất!</p>
            </div>

            {/* 01. Họ và tên */}
            <div>
                <Label htmlFor="fullName">01. Họ và Tên *</Label>
                <InputField
                    id="fullName"
                    {...register('fullName')}
                    placeholder="Ví dụ: Nguyễn Văn A"
                    error={errors.fullName?.message}
                />
            </div>

            {/* 02. Email */}
            <div>
                <Label htmlFor="email">02. Email *</Label>
                <InputField
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="example@email.com"
                    error={errors.email?.message}
                />
            </div>

            {/* 03. Giới tính */}
            <div>
                <Label>03. Giới tính *</Label>
                <RadioGroup
                    value={watch('gender')}
                    onValueChange={(value) => setValue('gender', value as any)}
                    className="flex gap-6"
                >
                    {GENDER_OPTIONS.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                            <RadioGroupItem
                                value={option}
                                id={option}
                                checked={watch('gender') === option}
                                onChange={() => setValue('gender', option as any)}
                            />
                            <Label htmlFor={option} className="font-normal cursor-pointer mb-0">
                                {option}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
                {errors.gender && <p className="mt-1 text-xs text-red-500">{errors.gender.message}</p>}
            </div>


            {/* 04. Số điện thoại */}
            <div>
                <Label htmlFor="phone">04. Số điện thoại *</Label>
                <InputField
                    id="phone"
                    {...register('phone')}
                    placeholder="Định dạng: 0xxx xxx xxx"
                    error={errors.phone?.message}
                />
            </div>

            {/* 05. Facebook */}
            <div>
                <Label htmlFor="facebook">05. Facebook cá nhân</Label>
                <InputField
                    id="facebook"
                    {...register('facebook')}
                    placeholder="Example: https://www.facebook.com/username"
                    error={errors.facebook?.message}
                    helperText="(Tùy chọn)"
                />
            </div>

            {/* 06. Ngày sinh */}
            <div>
                <Label className="mb-2 block">06. Ngày sinh *</Label>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <InputField
                            {...register('dob.day')}
                            placeholder="dd"
                            maxLength={2}
                            error={errors.dob?.day?.message}
                        />
                    </div>
                    <div>
                        <InputField
                            {...register('dob.month')}
                            placeholder="mm"
                            maxLength={2}
                            error={errors.dob?.month?.message}
                        />
                    </div>
                    <div>
                        <InputField
                            {...register('dob.year')}
                            placeholder="yyyy"
                            maxLength={4}
                            error={errors.dob?.year?.message}
                        />
                    </div>
                </div>
                {errors.dob?.message && <p className="mt-1 text-xs text-red-500">{errors.dob.message}</p>}
            </div>

            {/* 07. MSSV - Chuyên ngành */}
            <div>
                <Label htmlFor="studentIdMajor">07. Mã số sinh viên - Chuyên ngành *</Label>
                <InputField
                    id="studentIdMajor"
                    {...register('studentIdMajor')}
                    placeholder="Nhập mã số sinh viên và chuyên ngành"
                    error={errors.studentIdMajor?.message}
                />
            </div>

            {/* 08. Cơ sở */}
            <div>
                <Label htmlFor="campus">08. Cơ sở đăng ký *</Label>
                <SelectField
                    id="campus"
                    {...register('campus')}
                    options={[
                        { value: 'hanoi', label: 'Hà Nội' },
                        { value: 'danang', label: 'Đà Nẵng' },
                        { value: 'quynhon', label: 'Quy Nhơn' },
                        { value: 'cantho', label: 'Cần Thơ' }
                    ]}
                    placeholder="Chọn cơ sở"
                    error={errors.campus?.message}
                    onChange={(e) => {
                        const selectedValue = e.target.value;
                        setValue('campus', selectedValue);

                        // Check if campus is recruiting
                        const campusOptions = [
                            { value: 'hanoi', label: 'Hà Nội', isRecruiting: true },
                            { value: 'danang', label: 'Đà Nẵng', isRecruiting: true },
                            { value: 'quynhon', label: 'Quy Nhơn', isRecruiting: true },
                            { value: 'cantho', label: 'Cần Thơ', isRecruiting: true }
                        ];
                        const selected = campusOptions.find(c => c.value === selectedValue);

                        if (selected && !selected.isRecruiting) {
                            alert(`Cơ sở ${selected.label} hiện chưa mở đơn tuyển. Vui lòng chọn cơ sở khác.`);
                            setValue('campus', '');
                        }
                    }}
                />
                <p className="mt-1 text-xs text-gray-500">Chọn cơ sở bạn muốn đăng ký tham gia</p>
            </div>

            {/* 09. Nguồn biết tin */}
            <div>
                <Label htmlFor="surveySource">09. Bạn biết đến đợt tuyển này qua đâu? *</Label>
                <SelectField
                    id="surveySource"
                    {...register('surveySource')}
                    options={SOURCE_OPTIONS.map(opt => ({ value: opt, label: opt }))}
                    placeholder="Chọn một phương án"
                    error={errors.surveySource?.message}
                />
            </div>

            {/* 09. Lý do tham gia */}
            <div>
                <Label htmlFor="reason">10. Tại sao bạn muốn đăng ký tham gia? *</Label>
                <textarea
                    id="reason"
                    {...register('reason')}
                    placeholder="Nhập lý do muốn tham gia (ít nhất 50 ký tự)"
                    rows={4}
                    className="w-full rounded-lg border border-surface-border bg-white px-4 py-3 text-text-main focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-muted shadow-sm resize-none"
                />
                <p className={`mt-1 text-xs ${reasonLength >= 50 ? 'text-green-600' : 'text-gray-500'}`}>
                    {reasonLength} / 50 ký tự (tối thiểu)
                </p>
                {errors.reason && <p className="mt-1 text-xs text-red-500">{errors.reason.message}</p>}
            </div>

            {/* 10. Thời gian dành cho CLB */}
            <div>
                <Label htmlFor="timePerWeek">11. Bạn có thể dành bao nhiêu thời gian/tuần cho CLB? *</Label>
                <SelectField
                    id="timePerWeek"
                    {...register('timePerWeek')}
                    options={TIME_OPTIONS.map(opt => ({ value: opt, label: opt }))}
                    placeholder="Chọn thời gian"
                    error={errors.timePerWeek?.message}
                />
            </div>

            {/* 11. Mong muốn */}
            <div>
                <Label htmlFor="expectations">12. Bạn mong muốn nhận được điều gì khi tham gia CLB? *</Label>
                <textarea
                    id="expectations"
                    {...register('expectations')}
                    placeholder="Nhập mong muốn của bạn (ít nhất 50 ký tự)"
                    rows={4}
                    className="w-full rounded-lg border border-surface-border bg-white px-4 py-3 text-text-main focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-muted shadow-sm resize-none"
                />
                <p className={`mt-1 text-xs ${expectationsLength >= 50 ? 'text-green-600' : 'text-gray-500'}`}>
                    {expectationsLength} / 50 ký tự (tối thiểu)
                </p>
                {errors.expectations && <p className="mt-1 text-xs text-red-500">{errors.expectations.message}</p>}
            </div>

            {/* 12. Mức độ cam kết */}
            <div>
                <Label>13. Mức độ cam kết tham gia hoạt động CLB *</Label>
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
                        onValueChange={(value) => setValue('commitmentLevel', value[0])}
                        className="w-full"
                    />
                    <div className="text-center">
                        <span className="text-2xl font-bold text-blue-600">{commitmentLevel}</span>
                        <span className="text-sm text-gray-600 ml-2">/ 5</span>
                    </div>
                </div>
                {errors.commitmentLevel && <p className="mt-1 text-xs text-red-500">{errors.commitmentLevel.message}</p>}
            </div>
        </div>
    );
};

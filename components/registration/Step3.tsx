import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { RegistrationFormData } from '../../lib/schema';
import { Label } from '../ui/Label';

interface Step3Props {
    form: UseFormReturn<RegistrationFormData>;
}

export const Step3: React.FC<Step3Props> = ({ form }) => {
    const { register, formState: { errors }, watch } = form;
    const selectedDept = watch('preferredDepartment1');

    const renderDepartmentQuestions = () => {
        switch (selectedDept) {
            case 'tech':
                return (
                    <>
                        <div className="bg-purple-50 p-4 rounded-lg mb-6">
                            <h3 className="font-semibold text-lg mb-2">Câu hỏi cho Ban Chuyên môn</h3>
                            <p className="text-sm text-gray-600">Vui lòng chia sẻ kinh nghiệm và kỹ năng kỹ thuật của bạn</p>
                        </div>

                        <div>
                            <Label htmlFor="techExperience">Kinh nghiệm về robotics/lập trình *</Label>
                            <textarea
                                id="techExperience"
                                {...register('techExperience')}
                                placeholder="Mô tả chi tiết kinh nghiệm của bạn"
                                rows={4}
                                className="w-full rounded-lg border border-surface-border bg-white px-4 py-3 text-text-main focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-muted shadow-sm resize-none"
                            />
                            {errors.techExperience && <p className="mt-1 text-xs text-red-500">{errors.techExperience.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="techSkills">Kỹ năng kỹ thuật *</Label>
                            <textarea
                                id="techSkills"
                                {...register('techSkills')}
                                placeholder="Ví dụ: C++, Python, Arduino, ROS, CAD..."
                                rows={3}
                                className="w-full rounded-lg border border-surface-border bg-white px-4 py-3 text-text-main focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-muted shadow-sm resize-none"
                            />
                            {errors.techSkills && <p className="mt-1 text-xs text-red-500">{errors.techSkills.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="techProjects">Dự án đã thực hiện *</Label>
                            <textarea
                                id="techProjects"
                                {...register('techProjects')}
                                placeholder="Mô tả các dự án robotics/kỹ thuật bạn đã tham gia hoặc tự thực hiện"
                                rows={4}
                                className="w-full rounded-lg border border-surface-border bg-white px-4 py-3 text-text-main focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-muted shadow-sm resize-none"
                            />
                            {errors.techProjects && <p className="mt-1 text-xs text-red-500">{errors.techProjects.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="techExpectations">Mong muốn phát triển kỹ năng gì? *</Label>
                            <textarea
                                id="techExpectations"
                                {...register('techExpectations')}
                                placeholder="Bạn muốn học hỏi và phát triển kỹ năng nào tại ban Chuyên môn?"
                                rows={3}
                                className="w-full rounded-lg border border-surface-border bg-white px-4 py-3 text-text-main focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-muted shadow-sm resize-none"
                            />
                            {errors.techExpectations && <p className="mt-1 text-xs text-red-500">{errors.techExpectations.message}</p>}
                        </div>
                    </>
                );

            case 'comm':
                return (
                    <>
                        <div className="bg-pink-50 p-4 rounded-lg mb-6">
                            <h3 className="font-semibold text-lg mb-2">Câu hỏi cho Ban Truyền thông</h3>
                            <p className="text-sm text-gray-600">Vui lòng chia sẻ kinh nghiệm truyền thông và sáng tạo nội dung</p>
                        </div>

                        <div>
                            <Label htmlFor="commExperience">Kinh nghiệm truyền thông/marketing *</Label>
                            <textarea
                                id="commExperience"
                                {...register('commExperience')}
                                placeholder="Mô tả chi tiết kinh nghiệm của bạn"
                                rows={4}
                                className="w-full rounded-lg border border-surface-border bg-white px-4 py-3 text-text-main focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-muted shadow-sm resize-none"
                            />
                            {errors.commExperience && <p className="mt-1 text-xs text-red-500">{errors.commExperience.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="commSkills">Kỹ năng sáng tạo nội dung *</Label>
                            <textarea
                                id="commSkills"
                                {...register('commSkills')}
                                placeholder="Ví dụ: Photoshop, Illustrator, Canva, Video editing, Copywriting..."
                                rows={3}
                                className="w-full rounded-lg border border-surface-border bg-white px-4 py-3 text-text-main focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-muted shadow-sm resize-none"
                            />
                            {errors.commSkills && <p className="mt-1 text-xs text-red-500">{errors.commSkills.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="commPortfolio">Portfolio/Link mẫu công việc *</Label>
                            <textarea
                                id="commPortfolio"
                                {...register('commPortfolio')}
                                placeholder="Link đến portfolio, fanpage, hoặc các sản phẩm bạn đã làm"
                                rows={3}
                                className="w-full rounded-lg border border-surface-border bg-white px-4 py-3 text-text-main focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-muted shadow-sm resize-none"
                            />
                            {errors.commPortfolio && <p className="mt-1 text-xs text-red-500">{errors.commPortfolio.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="commExpectations">Mong muốn phát triển kỹ năng gì? *</Label>
                            <textarea
                                id="commExpectations"
                                {...register('commExpectations')}
                                placeholder="Bạn muốn học hỏi và phát triển kỹ năng nào tại ban Truyền thông?"
                                rows={3}
                                className="w-full rounded-lg border border-surface-border bg-white px-4 py-3 text-text-main focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-muted shadow-sm resize-none"
                            />
                            {errors.commExpectations && <p className="mt-1 text-xs text-red-500">{errors.commExpectations.message}</p>}
                        </div>
                    </>
                );

            case 'finance':
                return (
                    <>
                        <div className="bg-green-50 p-4 rounded-lg mb-6">
                            <h3 className="font-semibold text-lg mb-2">Câu hỏi cho Ban Tài chính - Đối ngoại</h3>
                            <p className="text-sm text-gray-600">Vui lòng chia sẻ kinh nghiệm quản lý tài chính và đối ngoại</p>
                        </div>

                        <div>
                            <Label htmlFor="financeExperience">Kinh nghiệm tài chính/đối ngoại *</Label>
                            <textarea
                                id="financeExperience"
                                {...register('financeExperience')}
                                placeholder="Mô tả chi tiết kinh nghiệm của bạn"
                                rows={4}
                                className="w-full rounded-lg border border-surface-border bg-white px-4 py-3 text-text-main focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-muted shadow-sm resize-none"
                            />
                            {errors.financeExperience && <p className="mt-1 text-xs text-red-500">{errors.financeExperience.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="financeSkills">Kỹ năng liên quan *</Label>
                            <textarea
                                id="financeSkills"
                                {...register('financeSkills')}
                                placeholder="Ví dụ: Excel, Kế toán, Tìm kiếm tài trợ, Giao tiếp đối ngoại..."
                                rows={3}
                                className="w-full rounded-lg border border-surface-border bg-white px-4 py-3 text-text-main focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-muted shadow-sm resize-none"
                            />
                            {errors.financeSkills && <p className="mt-1 text-xs text-red-500">{errors.financeSkills.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="financeExpectations">Mong muốn phát triển kỹ năng gì? *</Label>
                            <textarea
                                id="financeExpectations"
                                {...register('financeExpectations')}
                                placeholder="Bạn muốn học hỏi và phát triển kỹ năng nào tại ban Tài chính - Đối ngoại?"
                                rows={3}
                                className="w-full rounded-lg border border-surface-border bg-white px-4 py-3 text-text-main focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-muted shadow-sm resize-none"
                            />
                            {errors.financeExpectations && <p className="mt-1 text-xs text-red-500">{errors.financeExpectations.message}</p>}
                        </div>
                    </>
                );

            case 'event':
                return (
                    <>
                        <div className="bg-orange-50 p-4 rounded-lg mb-6">
                            <h3 className="font-semibold text-lg mb-2">Câu hỏi cho Ban Văn hóa - Sự kiện</h3>
                            <p className="text-sm text-gray-600">Vui lòng chia sẻ kinh nghiệm tổ chức sự kiện</p>
                        </div>

                        <div>
                            <Label htmlFor="eventExperience">Kinh nghiệm tổ chức sự kiện *</Label>
                            <textarea
                                id="eventExperience"
                                {...register('eventExperience')}
                                placeholder="Mô tả chi tiết kinh nghiệm của bạn"
                                rows={4}
                                className="w-full rounded-lg border border-surface-border bg-white px-4 py-3 text-text-main focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-muted shadow-sm resize-none"
                            />
                            {errors.eventExperience && <p className="mt-1 text-xs text-red-500">{errors.eventExperience.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="eventSkills">Kỹ năng liên quan *</Label>
                            <textarea
                                id="eventSkills"
                                {...register('eventSkills')}
                                placeholder="Ví dụ: Lập kế hoạch, Quản lý thời gian, Làm việc nhóm, Sáng tạo ý tưởng..."
                                rows={3}
                                className="w-full rounded-lg border border-surface-border bg-white px-4 py-3 text-text-main focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-muted shadow-sm resize-none"
                            />
                            {errors.eventSkills && <p className="mt-1 text-xs text-red-500">{errors.eventSkills.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="eventExpectations">Mong muốn phát triển kỹ năng gì? *</Label>
                            <textarea
                                id="eventExpectations"
                                {...register('eventExpectations')}
                                placeholder="Bạn muốn học hỏi và phát triển kỹ năng nào tại ban Văn hóa - Sự kiện?"
                                rows={3}
                                className="w-full rounded-lg border border-surface-border bg-white px-4 py-3 text-text-main focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-muted shadow-sm resize-none"
                            />
                            {errors.eventExpectations && <p className="mt-1 text-xs text-red-500">{errors.eventExpectations.message}</p>}
                        </div>
                    </>
                );

            default:
                return (
                    <div className="bg-gray-50 p-8 rounded-lg text-center">
                        <p className="text-gray-600">Vui lòng chọn ban ở bước trước để xem câu hỏi tương ứng</p>
                    </div>
                );
        }
    };

    return (
        <div className="space-y-6">
            {renderDepartmentQuestions()}
        </div>
    );
};

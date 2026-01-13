import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { RegistrationFormData, DEPARTMENTS } from '../../lib/schema';
import { Label } from '../ui/Label';
import { SelectField } from './SelectField';

interface Step2Props {
    form: UseFormReturn<RegistrationFormData>;
}

export const Step2: React.FC<Step2Props> = ({ form }) => {
    const { register, formState: { errors }, watch } = form;
    const selectedDept1 = watch('preferredDepartment1');

    // Filter out selected department 1 from department 2 options
    const dept2Options = DEPARTMENTS.filter(dept => dept.value !== selectedDept1);

    return (
        <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-lg mb-2">Chọn ban ứng tuyển</h3>
                <p className="text-sm text-gray-600">
                    Vui lòng chọn ban bạn mong muốn tham gia. Bạn có thể chọn tối đa 2 ban theo thứ tự ưu tiên.
                </p>
            </div>

            {/* Ban mong muốn 1 */}
            <div>
                <Label htmlFor="preferredDepartment1">Ban mong muốn 1 *</Label>
                <SelectField
                    id="preferredDepartment1"
                    {...register('preferredDepartment1')}
                    options={DEPARTMENTS}
                    placeholder="Chọn ban"
                    error={errors.preferredDepartment1?.message}
                />
            </div>

            {/* Ban mong muốn 2 */}
            <div>
                <Label htmlFor="preferredDepartment2">Ban mong muốn 2 (Tùy chọn)</Label>
                <SelectField
                    id="preferredDepartment2"
                    {...register('preferredDepartment2')}
                    options={dept2Options}
                    placeholder="Chọn ban (nếu có)"
                    error={errors.preferredDepartment2?.message}
                />
                <p className="mt-1 text-xs text-gray-500">
                    Nếu bạn chỉ muốn ứng tuyển 1 ban, có thể bỏ qua trường này
                </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                <p className="text-sm text-gray-700">
                    <strong>Lưu ý:</strong> Ở bước tiếp theo, bạn sẽ trả lời các câu hỏi chuyên môn liên quan đến ban bạn đã chọn.
                </p>
            </div>
        </div>
    );
};

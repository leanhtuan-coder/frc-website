import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { RegistrationFormData } from '../../lib/schema';
import { Label } from '../ui/Label';
import { Checkbox } from '../ui/Checkbox';

interface Step4Props {
    form: UseFormReturn<RegistrationFormData>;
}

export const Step4: React.FC<Step4Props> = ({ form }) => {
    const { formState: { errors }, watch, setValue } = form;

    return (
        <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-lg mb-2">Cam kết</h3>
                <p className="text-sm text-gray-600">
                    Vui lòng đọc kỹ và đồng ý với các cam kết dưới đây trước khi gửi đăng ký
                </p>
            </div>

            {/* Cam kết 1 */}
            <div className="flex items-start space-x-3 p-4 bg-white border border-surface-border rounded-lg">
                <Checkbox
                    id="consentTruth"
                    checked={watch('consentTruth') || false}
                    onCheckedChange={(checked) => setValue('consentTruth', checked)}
                />
                <div className="flex-1">
                    <Label htmlFor="consentTruth" className="cursor-pointer mb-0">
                        Cam kết thông tin chính xác *
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                        Tôi cam đoan rằng tất cả thông tin tôi cung cấp trong đơn đăng ký này là chính xác và trung thực.
                    </p>
                    {errors.consentTruth && <p className="mt-1 text-xs text-red-500">{errors.consentTruth.message}</p>}
                </div>
            </div>

            {/* Cam kết 2 */}
            <div className="flex items-start space-x-3 p-4 bg-white border border-surface-border rounded-lg">
                <Checkbox
                    id="consentRules"
                    checked={watch('consentRules') || false}
                    onCheckedChange={(checked) => setValue('consentRules', checked)}
                />
                <div className="flex-1">
                    <Label htmlFor="consentRules" className="cursor-pointer mb-0">
                        Cam kết tuân thủ nội quy *
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                        Tôi cam kết tuân thủ đầy đủ nội quy, quy định của CLB và tham gia tích cực vào các hoạt động.
                    </p>
                    {errors.consentRules && <p className="mt-1 text-xs text-red-500">{errors.consentRules.message}</p>}
                </div>
            </div>

            {/* Cam kết 3 */}
            <div className="flex items-start space-x-3 p-4 bg-white border border-surface-border rounded-lg">
                <Checkbox
                    id="consentData"
                    checked={watch('consentData') || false}
                    onCheckedChange={(checked) => setValue('consentData', checked)}
                />
                <div className="flex-1">
                    <Label htmlFor="consentData" className="cursor-pointer mb-0">
                        Đồng ý xử lý dữ liệu cá nhân *
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                        Tôi đồng ý cho CLB thu thập và xử lý thông tin cá nhân của tôi cho mục đích tuyển thành viên và quản lý hoạt động CLB.
                    </p>
                    {errors.consentData && <p className="mt-1 text-xs text-red-500">{errors.consentData.message}</p>}
                </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                <p className="text-sm text-gray-700">
                    <strong>Lưu ý:</strong> Sau khi nhấn "Gửi đăng ký", bạn sẽ nhận được mã đăng ký.
                </p>
            </div>
        </div>
    );
};

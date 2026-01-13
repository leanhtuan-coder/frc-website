import React, { useState } from 'react';
import { RegistrationFormData, SelectOption } from '../types';
import { InputField } from './ui/InputField';
import { SelectField } from './ui/SelectField';

const campusOptions: SelectOption[] = [
  { value: 'hn', label: 'Hà Nội (Hoa Lac)' },
  { value: 'hcm', label: 'TP. Hồ Chí Minh' },
  { value: 'dn', label: 'Đà Nẵng' },
  { value: 'ct', label: 'Cần Thơ' },
  { value: 'qn', label: 'Quy Nhơn' },
];

export const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullname: '',
    studentId: '',
    phone: '',
    email: '',
    campus: '',
    major: '',
    reason: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ sớm.');
  };

  return (
    <section className="w-full max-w-[800px] px-4 md:px-6 py-12">
      <div className="mb-6">
        <a
          href="#"
          className="text-text-secondary hover:text-primary text-sm font-medium flex items-center gap-1 transition-colors w-fit"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>{' '}
          Quay lại trang chủ
        </a>
      </div>

      <div className="bg-surface rounded-xl border border-surface-border shadow-sm p-6 md:p-10">
        <div className="text-center mb-8 border-b border-surface-border pb-6">
          <h1 className="text-3xl font-bold text-primary mb-3">
            Đăng ký Thành viên CLB FRC
          </h1>
          <p className="text-text-secondary max-w-lg mx-auto">
            Chào mừng bạn đến với FPTU Robotics Club. Vui lòng điền đầy đủ thông
            tin bên dưới để hoàn tất hồ sơ gia nhập.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            id="fullname"
            name="fullname"
            label="Họ và tên"
            iconName="person"
            placeholder="Nhập họ và tên đầy đủ"
            required
            className="col-span-1 md:col-span-2"
            value={formData.fullname}
            onChange={handleChange}
          />

          <InputField
            id="studentId"
            name="studentId"
            label="Mã số sinh viên"
            iconName="badge"
            placeholder="VD: HS17xxxx"
            required
            className="col-span-1"
            value={formData.studentId}
            onChange={handleChange}
          />

          <InputField
            id="phone"
            name="phone"
            type="tel"
            label="Số điện thoại"
            iconName="call"
            placeholder="VD: 0987xxxxxx"
            required
            className="col-span-1"
            value={formData.phone}
            onChange={handleChange}
          />

          <InputField
            id="email"
            name="email"
            type="email"
            label="Email nhà trường"
            iconName="mail"
            placeholder="VD: namenvhe17xxxx@fpt.edu.vn"
            required
            helperText="Vui lòng sử dụng email FPT Education."
            className="col-span-1 md:col-span-2"
            value={formData.email}
            onChange={handleChange}
          />

          <SelectField
            id="campus"
            name="campus"
            label="Cơ sở học tập"
            iconName="location_on"
            options={campusOptions}
            placeholder="Chọn cơ sở"
            required
            className="col-span-1"
            value={formData.campus}
            onChange={handleChange}
          />

          <InputField
            id="major"
            name="major"
            label="Ngành học"
            iconName="school"
            placeholder="VD: Kỹ thuật phần mềm"
            required
            className="col-span-1"
            value={formData.major}
            onChange={handleChange}
          />

          <div className="col-span-1 md:col-span-2">
            <label
              htmlFor="reason"
              className="block text-sm font-bold text-text-main mb-2"
            >
              Lý do muốn tham gia CLB <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <textarea
                id="reason"
                name="reason"
                rows={5}
                required
                className="w-full rounded-lg border border-surface-border bg-white px-4 py-3 text-text-main focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-muted shadow-sm resize-none"
                placeholder="Chia sẻ về đam mê, kỹ năng hoặc mong muốn của bạn khi tham gia FRC..."
                value={formData.reason}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 flex flex-col-reverse sm:flex-row items-center justify-end gap-4 mt-6 pt-6 border-t border-surface-border">
            <button
              type="button"
              className="w-full sm:w-auto px-6 py-3 rounded-full text-text-secondary font-bold hover:text-text-main hover:bg-surface-border/50 transition-colors"
              onClick={() =>
                setFormData({
                  fullname: '',
                  studentId: '',
                  phone: '',
                  email: '',
                  campus: '',
                  major: '',
                  reason: '',
                })
              }
            >
              Hủy
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary-dark shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Gửi đăng ký</span>
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

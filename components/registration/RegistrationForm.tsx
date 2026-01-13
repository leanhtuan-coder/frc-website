import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { registrationFormSchema, type RegistrationFormData } from '../../lib/schema';
import { FormProgress } from './FormProgress';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { Step4 } from './Step4';

export const RegistrationForm: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [refCode, setRefCode] = useState('');

    const form = useForm<RegistrationFormData>({
        resolver: zodResolver(registrationFormSchema),
        mode: 'onBlur',
        defaultValues: {
            consentTruth: false,
            consentRules: false,
            consentData: false,
            commitmentLevel: 3,
        },
    });

    // Define which fields to validate for each step
    const stepValidationFields: Record<number, (keyof RegistrationFormData)[]> = {
        1: ['fullName', 'email', 'gender', 'phone', 'dob', 'studentIdMajor', 'surveySource', 'reason', 'timePerWeek', 'expectations', 'commitmentLevel'],
        2: ['preferredDepartment1'],
        3: [], // Conditional fields, optional
        4: ['consentTruth', 'consentRules', 'consentData'],
    };

    const nextStep = async () => {
        const fieldsToValidate = stepValidationFields[currentStep];
        let isValid = true;

        if (fieldsToValidate.length > 0) {
            isValid = await form.trigger(fieldsToValidate as any);
        }

        if (isValid) {
            setCurrentStep((prev) => Math.min(prev + 1, 4));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const onSubmit = async (data: RegistrationFormData) => {
        setIsSubmitting(true);

        try {
            // Google Sheets Apps Script endpoint
            const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwpk9ZppN6NzJi21bp09ZvHGXqwj764ZQxldXJQglE0iHjw4O9rJ3e2ok-GtaYxXyKn0Q/exec';

            console.log('Submitting form data to Google Sheets...', data);

            // Send data to Google Sheets
            const response = await fetch(GOOGLE_SHEETS_URL, {
                method: 'POST',
                mode: 'no-cors', // Required for Google Apps Script
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            // Note: no-cors mode doesn't allow reading response
            // So we generate refCode on client side
            const refCode = `FRC${Date.now().toString().slice(-8)}`;

            console.log('Form submitted successfully!');
            setRefCode(refCode);
            setIsSuccess(true);

        } catch (error) {
            console.error('Registration error:', error);
            alert('Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Success screen
    if (isSuccess) {
        return (
            <section className="w-full max-w-[1200px] px-4 md:px-6 py-12">
                <div className="bg-surface rounded-xl border border-surface-border shadow-sm p-6 md:p-10">
                    <div className="text-center">
                        <div className="flex justify-center mb-6">
                            <CheckCircle2 className="h-20 w-20 text-green-500" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Đăng ký thành công!
                        </h2>
                        <p className="text-lg text-gray-700 mb-6">
                            Cảm ơn bạn đã đăng ký tham gia <strong>FPTU Robotics Club</strong>!
                        </p>
                        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6">
                            <p className="text-sm text-gray-600 mb-2">Mã đăng ký của bạn:</p>
                            <p className="text-2xl md:text-3xl font-bold text-blue-600">{refCode}</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                            <p className="text-base text-gray-700 mb-2">
                                <strong>Đơn đăng ký của bạn đã được gửi thành công!</strong>
                            </p>
                            <p className="text-sm text-gray-600">
                                Chúng tôi đã gửi email xác nhận đến địa chỉ email của bạn. Ban tổ chức sẽ liên hệ với bạn trong thời gian sớm nhất.
                                Vui lòng kiểm tra email và giữ mã đăng ký này để tra cứu sau.
                            </p>
                        </div>
                        <Link
                            to="/"
                            className="inline-block px-8 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary-dark shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                        >
                            Về trang chủ
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    // Main form
    return (
        <section className="w-full max-w-[1200px] px-4 md:px-6 py-12">
            <div className="mb-6">
                <Link
                    to="/"
                    className="text-text-secondary hover:text-primary text-sm font-medium flex items-center gap-1 transition-colors w-fit"
                >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>{' '}
                    Quay lại trang chủ
                </Link>
            </div>

            <div className="bg-surface rounded-xl border border-surface-border shadow-sm p-4 md:p-6 lg:p-10">
                <div className="text-center mb-6 md:mb-8 border-b border-surface-border pb-4 md:pb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2 md:mb-3">
                        FRC - RECRUITMENT | ĐƠN ĐĂNG KÝ THAM GIA
                    </h1>
                    <p className="text-sm md:text-base text-text-secondary max-w-lg mx-auto">
                        Chào mừng bạn đến với FPTU Robotics Club. Vui lòng điền đầy đủ thông tin bên dưới để hoàn tất đơn đăng ký tham gia.
                    </p>
                </div>

                <FormProgress currentStep={currentStep} />

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Step content */}
                    <div className="transition-opacity duration-300">
                        {currentStep === 1 && (
                            <div className="animate-in fade-in duration-300">
                                <h2 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6 text-gray-900">
                                    PHẦN 1: THÔNG TIN CHUNG
                                </h2>
                                <Step1 form={form} />
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="animate-in fade-in duration-300">
                                <h2 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6 text-gray-900">
                                    PHẦN 2: CHỌN BAN ỨNG TUYỂN
                                </h2>
                                <Step2 form={form} />
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="animate-in fade-in duration-300">
                                <h2 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6 text-gray-900">
                                    PHẦN 3: CÂU HỎI THEO BAN
                                </h2>
                                <Step3 form={form} />
                            </div>
                        )}

                        {currentStep === 4 && (
                            <div className="animate-in fade-in duration-300">
                                <h2 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6 text-gray-900">
                                    PHẦN 4: CAM KẾT
                                </h2>
                                <Step4 form={form} />
                            </div>
                        )}
                    </div>

                    {/* Navigation buttons */}
                    <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-surface-border">
                        <button
                            type="button"
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-text-secondary font-bold hover:text-text-main hover:bg-surface-border/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed order-2 sm:order-1"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Trước
                        </button>

                        {currentStep < 4 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary-dark shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all order-1 sm:order-2"
                            >
                                Sau
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary-dark shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
                            >
                                {isSubmitting ? 'Đang gửi...' : 'Gửi đăng ký'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
};

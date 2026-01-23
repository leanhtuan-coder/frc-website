import React from 'react';
import { CountdownTimer } from './CountdownTimer';
import { ArrowDown, Calendar, Users, Clock, CheckCircle } from 'lucide-react';

interface RecruitmentLandingProps {
    onScrollToForm: () => void;
}

export const RecruitmentLanding: React.FC<RecruitmentLandingProps> = ({ onScrollToForm }) => {
    // Recruitment dates
    const applicationDeadline = new Date('2026-01-31T00:00:00');

    const timeline = [
        {
            title: 'Mở đơn đăng ký',
            date: '13/01 - 30/01/2026',
            icon: Calendar,
            status: 'active',
            description: 'Nộp đơn đăng ký online'
        },
        {
            title: 'Vòng phỏng vấn',
            date: '02/02 - 03/02/2026',
            icon: Users,
            status: 'upcoming',
            description: 'Phỏng vấn trực tiếp tại phòng lab FRC'
        },
        {
            title: 'Công bố kết quả',
            date: '05/02/2026',
            icon: CheckCircle,
            status: 'upcoming',
            description: 'Thông báo qua email'
        }
    ];

    return (
        <div className="w-full">
            {/* Info Section */}
            <section className="bg-white py-8 md:py-16">
                <div className="max-w-[1000px] mx-auto px-4 md:px-6">
                    {/* Timeline */}
                    <div className="mb-8 md:mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-12 text-center uppercase tracking-tight">
                            LỊCH TRÌNH TUYỂN THÀNH VIÊN
                        </h2>
                        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                            {timeline.map((item, index) => (
                                <div
                                    key={index}
                                    className={`relative p-5 md:p-6 rounded-lg border-2 transition-all ${item.status === 'active'
                                        ? 'border-primary bg-primary/5 shadow-md'
                                        : 'border-gray-200 bg-gray-50'
                                        }`}
                                >
                                    {item.status === 'active' && (
                                        <span className="absolute -top-3 left-4 bg-primary text-white text-[10px] px-2 py-1 rounded-md font-bold uppercase">
                                            Đang diễn ra
                                        </span>
                                    )}
                                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-3 md:mb-4 ${item.status === 'active' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                                        }`}>
                                        <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-base md:text-lg mb-1">{item.title}</h3>
                                    <p className="text-primary font-bold text-sm md:text-base mb-1 md:mb-2">{item.date}</p>
                                    <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Countdown */}
                    <div className="max-w-[700px] mx-auto mt-8 mb-0">
                        <CountdownTimer targetDate={applicationDeadline} title="Thời gian còn lại để đăng ký" />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-white py-4 md:py-2 pb-8 md:pb-6">
                <div className="max-w-[800px] mx-auto px-4 text-center">
                    <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4 font-medium uppercase tracking-widest">
                        Sẵn sàng để bắt đầu hành trình mới cùng FRC
                    </p>
                    <button
                        onClick={onScrollToForm}
                        className="inline-flex items-center gap-2 bg-primary text-white px-6 md:px-8 py-3 rounded-lg font-bold hover:bg-primary-dark transition-all shadow-lg active:scale-95 text-sm md:text-base"
                    >
                        Điền đơn đăng ký
                        <ArrowDown className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                </div>
            </section>
        </div>
    );
};

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ_ITEMS = [
    {
        question: "CLB có thu phí thành viên không?",
        answer: "Hiện tại CLB sẽ thu phí thành viên vào đầu mỗi kỳ học."
    },
    {
        question: "Tôi không biết gì về robotics, có thể tham gia không?",
        answer: "Hoàn toàn được! CLB chào đón tất cả các bạn có đam mê, không yêu cầu kinh nghiệm trước. Chúng mình sẽ có các workshop đào tạo căn bản cho thành viên mới."
    },
    {
        question: "Thời gian sinh hoạt CLB như thế nào?",
        answer: "CLB thường sinh hoạt 1-2 buổi/tuần, thường vào cuối tuần hoặc buổi tối các ngày trong tuần. Lịch cụ thể sẽ được thông báo và linh hoạt theo lịch học của thành viên."
    },
    {
        question: "Tôi có thể tham gia nhiều ban không?",
        answer: "Bạn nên tập trung vào 1 ban chính để phát huy tối đa năng lực. Tuy nhiên, bạn vẫn có thể hỗ trợ các ban khác khi cần thiết và tham gia các hoạt động chung của CLB."
    },
    {
        question: "Quy trình tuyển thành viên như thế nào?",
        answer: `Quy trình gồm:
                (1) Nộp đơn đăng ký online
                (2) Phỏng vấn với ban chủ nhiệm và trưởng ban
                (3) Thông báo kết quả qua email/điện thoại
                (4) Tham gia buổi onboarding cho thành viên mới`
    },
    {
        question: "Khi nào có kết quả sau khi nộp đơn?",
        answer: `Thông thường trong vòng 1-2 tuần sau khi kết thúc đợt tuyển, chúng mình sẽ liên hệ bạn để sắp xếp lịch phỏng vấn. Kết quả cuối cùng sẽ được thông báo trong 3-5 ngày sau phỏng vấn.`
    }
];

const FAQItem: React.FC<{ item: typeof FAQ_ITEMS[0]; isOpen: boolean; onToggle: () => void }> = ({
    item,
    isOpen,
    onToggle
}) => {
    return (
        <div className="border border-surface-border rounded-lg overflow-hidden bg-white">
            <button
                onClick={onToggle}
                className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
                <span className="font-medium text-gray-900 pr-4">{item.question}</span>
                {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                )}
            </button>
            {isOpen && (
                <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed border-t border-surface-border pt-3 animate-in fade-in duration-200 whitespace-pre-line">
                    {item.answer}
                </div>
            )}
        </div>
    );
};

export const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="w-full max-w-[800px] mx-auto px-4 md:px-6 py-8 md:py-12">
            <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    CÂU HỎI THƯỜNG GẶP
                </h2>
                <p className="text-gray-600">
                    Giải đáp các thắc mắc phổ biến về việc tham gia CLB
                </p>
            </div>

            <div className="space-y-3">
                {FAQ_ITEMS.map((item, index) => (
                    <FAQItem
                        key={index}
                        item={item}
                        isOpen={openIndex === index}
                        onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                    />
                ))}
            </div>
        </section>
    );
};

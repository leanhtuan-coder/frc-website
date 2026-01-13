import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
    targetDate: Date;
    title?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
    targetDate,
    title = "Hạn đăng ký còn"
}) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: false
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const target = targetDate.getTime();
            const difference = target - now;

            if (difference <= 0) {
                return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000),
                isExpired: false
            };
        };

        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (timeLeft.isExpired) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                <p className="text-red-600 font-bold text-lg">Đã hết hạn đăng ký!</p>
            </div>
        );
    }

    const TimeBlock = ({ value, label }: { value: number; label: string }) => (
        <div className="flex flex-col items-center px-2 md:px-8 first:pl-0 last:pr-0">
            <span className="text-4xl md:text-6xl font-bold text-primary tabular-nums tracking-tighter leading-none mb-1 md:mb-2">
                {value.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest font-bold">
                {label}
            </span>
        </div>
    );

    return (
        <div className="py-6 md:py-12 flex flex-col items-center overflow-hidden">
            <div className="flex items-center gap-2 text-gray-400 mb-6 md:mb-8 font-bold text-[9px] md:text-xs uppercase tracking-widest md:tracking-[0.3em] whitespace-nowrap">
                <div className="hidden xs:block w-4 md:w-8 h-[1px] bg-gray-200"></div>
                {title}
                <div className="hidden xs:block w-4 md:w-8 h-[1px] bg-gray-200"></div>
            </div>
            <div className="flex justify-center items-center divide-x divide-gray-100">
                <TimeBlock value={timeLeft.days} label="Ngày" />
                <TimeBlock value={timeLeft.hours} label="Giờ" />
                <TimeBlock value={timeLeft.minutes} label="Phút" />
                <TimeBlock value={timeLeft.seconds} label="Giây" />
            </div>
        </div>
    );
};

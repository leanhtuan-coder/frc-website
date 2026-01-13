import React from 'react';
import { Check } from 'lucide-react';

interface FormProgressProps {
    currentStep: number;
}

const STEPS = [
    { number: 1, label: 'Thông tin chung' },
    { number: 2, label: 'Chọn ban' },
    { number: 3, label: 'Câu hỏi theo ban' },
    { number: 4, label: 'Cam kết' },
];

export const FormProgress: React.FC<FormProgressProps> = ({ currentStep }) => {
    const progressPercentage = ((currentStep - 1) / (STEPS.length - 1)) * 100;

    return (
        <div className="mb-8">
            {/* Percentage indicator */}
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-text-secondary">Tiến độ hoàn thành</span>
                <span className="text-sm font-bold text-primary">{Math.round(progressPercentage)}%</span>
            </div>

            {/* Animated progress bar */}
            <div className="h-2 bg-surface-border rounded-full overflow-hidden mb-6">
                <div
                    className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>

            {/* Step indicators */}
            <div className="flex items-center justify-between">
                {STEPS.map((step, index) => (
                    <React.Fragment key={step.number}>
                        <div className="flex flex-col items-center flex-1">
                            <div
                                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base font-bold transition-all duration-300 ${step.number < currentStep
                                    ? 'bg-primary text-white scale-100'
                                    : step.number === currentStep
                                        ? 'bg-primary text-white ring-2 md:ring-4 ring-primary/20 scale-110'
                                        : 'bg-surface-border text-text-muted scale-100'
                                    }`}
                            >
                                {step.number < currentStep ? (
                                    <Check className="w-4 h-4 md:w-5 md:h-5" />
                                ) : (
                                    step.number
                                )}
                            </div>
                            <span
                                className={`text-xs mt-2 text-center hidden md:block transition-colors duration-300 ${step.number === currentStep
                                    ? 'text-primary font-bold'
                                    : step.number < currentStep
                                        ? 'text-text-secondary'
                                        : 'text-text-muted'
                                    }`}
                            >
                                {step.label}
                            </span>
                        </div>
                        {index < STEPS.length - 1 && (
                            <div className="flex-1 h-0.5 md:h-1 mx-1 md:mx-2 -mt-6 md:-mt-5 overflow-hidden rounded-full bg-surface-border">
                                <div
                                    className={`h-full bg-primary transition-all duration-500 ease-out ${step.number < currentStep ? 'w-full' : 'w-0'
                                        }`}
                                />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

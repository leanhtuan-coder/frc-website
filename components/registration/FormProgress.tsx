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
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between">
                {STEPS.map((step, index) => (
                    <React.Fragment key={step.number}>
                        <div className="flex flex-col items-center flex-1">
                            <div
                                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base font-bold transition-all ${step.number < currentStep
                                    ? 'bg-primary text-white'
                                    : step.number === currentStep
                                        ? 'bg-primary text-white ring-2 md:ring-4 ring-primary/20'
                                        : 'bg-surface-border text-text-muted'
                                    }`}
                            >
                                {step.number < currentStep ? (
                                    <Check className="w-4 h-4 md:w-5 md:h-5" />
                                ) : (
                                    step.number
                                )}
                            </div>
                            <span
                                className={`text-xs mt-2 text-center hidden md:block ${step.number === currentStep
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
                            <div className="flex-1 h-0.5 md:h-1 mx-1 md:mx-2 -mt-6 md:-mt-5">
                                <div
                                    className={`h-full transition-all ${step.number < currentStep ? 'bg-primary' : 'bg-surface-border'
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

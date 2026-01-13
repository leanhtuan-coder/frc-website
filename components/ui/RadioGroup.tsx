import React from 'react';

interface RadioGroupProps {
    value?: string;
    onValueChange: (value: string) => void;
    className?: string;
    children: React.ReactNode;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
    value,
    onValueChange,
    className = '',
    children,
}) => {
    return (
        <div className={className} role="radiogroup">
            {children}
        </div>
    );
};

interface RadioGroupItemProps {
    value: string;
    id: string;
    checked?: boolean;
    onChange?: () => void;
    className?: string;
}

export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({
    value,
    id,
    checked = false,
    onChange,
    className = '',
}) => {
    return (
        <input
            type="radio"
            id={id}
            name="gender-radio-group"
            value={value}
            checked={checked}
            onChange={onChange}
            className={`w-4 h-4 text-primary bg-white border-gray-300 focus:ring-primary focus:ring-2 cursor-pointer ${className}`}
        />
    );
};

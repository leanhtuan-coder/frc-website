import React from 'react';

interface CheckboxProps {
    id: string;
    checked?: boolean;
    onCheckedChange: (checked: boolean) => void;
    className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
    id,
    checked = false,
    onCheckedChange,
    className = '',
}) => {
    return (
        <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={(e) => onCheckedChange(e.target.checked)}
            className={`w-4 h-4 text-primary bg-white border-surface-border rounded focus:ring-primary focus:ring-2 cursor-pointer ${className}`}
        />
    );
};

import React from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
    value: string;
    label: string;
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    iconName?: string;
    options: SelectOption[];
    placeholder?: string;
    error?: string;
}

export const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(({
    iconName,
    id,
    className,
    options,
    placeholder = "Chọn một phương án",
    error,
    ...props
}, ref) => {
    return (
        <div className={className}>
            <div className="relative">
                {iconName && (
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted material-symbols-outlined text-[20px] select-none">
                        {iconName}
                    </span>
                )}
                <select
                    ref={ref}
                    id={id}
                    className={`appearance-none w-full rounded-lg border border-surface-border bg-white ${iconName ? 'pl-11' : 'pl-4'} pr-10 py-3 text-text-main focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm cursor-pointer invalid:text-text-muted ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                        }`}
                    style={{
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                        backgroundImage: 'none'
                    }}
                    {...props}
                >
                    <option disabled value="">
                        {placeholder}
                    </option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value} className="text-text-main">
                            {opt.label}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none w-5 h-5" />
            </div>
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
});

SelectField.displayName = 'SelectField';


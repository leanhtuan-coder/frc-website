import React from 'react';
import { SelectOption } from '../../types';

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  iconName: string;
  options: SelectOption[];
  placeholder?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  iconName,
  id,
  required,
  className,
  options,
  placeholder = "Select option",
  ...props
}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-bold text-text-main mb-2" htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted material-symbols-outlined text-[20px] select-none">
          {iconName}
        </span>
        <select
          id={id}
          required={required}
          className="appearance-none w-full rounded-lg border border-surface-border bg-white pl-11 pr-10 py-3 text-text-main focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm cursor-pointer invalid:text-text-muted"
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
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none material-symbols-outlined text-[20px]">
          expand_more
        </span>
      </div>
    </div>
  );
};
